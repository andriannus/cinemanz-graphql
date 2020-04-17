const bcrypt = require('bcryptjs');
const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  avatar: String,
  email: String,
  level: {
    default: 'user',
    enum: ['admin', 'user'],
    type: String
  },
  name: String,
  password: String,
  username: String
});

userSchema.pre('save', function encrypt(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(salt);

    bcrypt.hash(user.password, salt, (fault, hash) => {
      if (fault) next(fault);

      user.password = hash;
      next();
    });
  });
});

userSchema.method('comparePassword', function compare(
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) callback(err);

    callback(null, isMatch);
  });
});

const User = model('User', userSchema, 'user');

module.exports = User;
