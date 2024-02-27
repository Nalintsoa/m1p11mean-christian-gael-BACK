const getNumberDaysInMonth = (year, month) => {

    const date1 = new Date(year, month - 1);
    const date2 = new Date(year, month);

    const differenceMs = date2 - date1;

    const differenceDays = differenceMs / (1000 * 60 * 60 * 24);

    return differenceDays
}

module.exports = getNumberDaysInMonth;