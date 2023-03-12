/** @format */

function getTime(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";
    return Math.round(elapsed / 1000) + "s";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + "min";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + "h";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + "d";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + "m";
  } else {
    return Math.round(elapsed / msPerYear) + "y";
  }
}
export default getTime;

// <span className='event_time'>{timeDifference(new Date(), new Date(event.createdAt))}</span>
