/*global Date:true*/

Date = (function (OriginalDate) {
  function Date (year, month, day, hours, minutes, seconds, ms) {
    var date

    switch (arguments.length) {
      case 0:
        date = new OriginalDate(0)
        break

      case 1:
        date = new OriginalDate(year)
        break

      default:
        day = day || 1
        hours = hours || 0
        minutes = minutes || 0
        seconds = seconds || 0
        ms = ms || 0
        date = new OriginalDate(year, month, day, hours, minutes, seconds, ms)
        break
    }

    return date
  }

  Date.parse = OriginalDate.parse
  Date.UTC = OriginalDate.UTC
  Date.toString = OriginalDate.toString
  Date.prototype = OriginalDate.prototype

  Date.now = function () {
    return 0
  }

  return Date
})(Date)
