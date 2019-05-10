/**
 *
 * @param date {Date}: The date to convert from UTC to local Timezone
 * @returns {Date}: The date converted to local Timezone
 */
function convertDate(date) {
    let newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
    let offs = date.getTimezoneOffset() / 60;
    let hours = date.getHours();
    newDate.setHours(hours - offs);
    return newDate;
}

module.exports = convertDate;