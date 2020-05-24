const getIsoDate = (date = new Date()) => {
  return date.toISOString();
};

module.exports = { getIsoDate };
