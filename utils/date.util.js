const { FORMAT } = require('../constants/date.const');

const getSplittedDate = date => {
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const year = date.getFullYear();

  return { day, month, year };
};

const getIsoDate = (date = new Date()) => {
  return date.toISOString();
};

const getInternationalDate = date => {
  const { day, month, year } = getSplittedDate(date);

  return `${year}-${month}-${day}`;
};

const getIndonesiaDate = date => {
  const { day, month, year } = getSplittedDate(date);

  return `${day}-${month}-${year}`;
};

const transformDate = (date, format) => {
  const validDate = new Date(date);

  switch (format) {
    case FORMAT.indonesia:
      return getIndonesiaDate(validDate);

    case FORMAT.international:
      return getInternationalDate(validDate);

    case FORMAT.iso:
      return getIsoDate(validDate);

    default:
      return '';
  }
};

module.exports = { getIsoDate, transformDate };
