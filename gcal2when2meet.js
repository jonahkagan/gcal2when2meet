(function () {

document.body.appendChild(document.createElement('script')).src = 
  "http://code.jquery.com/jquery-1.9.0.min.js";
document.body.appendChild(document.createElement('script')).src =
  "https://apis.google.com/js/client.js?onload=GCAL";

// when2meet
var clientId = "928220966147.apps.googleusercontent.com";
// localhost
//var clientId = "928220966147-mt5jcobiop2nh0461sa5iochjslrjg8f.apps.googleusercontent.com";
var apiKey = "AIzaSyDSR5w4amX6UDxyuR0xylGj9hKh4jjKtZQ";
var scopes = "https://www.googleapis.com/auth/calendar.readonly";

function load() {
  console.log("load");
  gapi.client.setApiKey(apiKey);
  gapi.auth.init(function () {
    gapi.client.load('calendar', 'v3', function () {
      reqCalendarList().then(function (calendars) {
        calendars = calendars.filter(function (c) { return c.selected; });
        return whenArray(calendars.map(reqEvents));
      }).done(function (events) {
        events = events.filter(function (es) { return es; });
        //console.log("events", flatten(events));
        selectAll();
        flatten(events).forEach(deselectEvent);
      });
    });
  });
}

function reqCalendarList() {
  var deferred = $.Deferred();

  gapi.client.calendar.calendarList.list().execute(function (res) {
    console.log(res);
    if (res.code === 401) {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes
      }, function () {
        reqCalendarList().then(deferred.resolve);
      });
    } else {
      console.log("authorized!");
      deferred.resolve(res.items);
    }
  });

  return deferred.promise();
}

var events = [];

function reqEvents(calendar) {
  var deferred = $.Deferred();

  gapi.client.calendar.events.list({
    calendarId: calendar.id,
    singleEvents: true, // expand recurring events
    timeMin: new Date(TimeOfSlot[0] * 1000).toISOString(),
    timeMax: new Date(TimeOfSlot[TimeOfSlot.length-1] * 1000).toISOString()
  }).execute(function (res) {
    events.push(res);
    console.log(res);
    deferred.resolve(res.items);
  });

  return deferred.promise();
}

var errors = [];

function deselectEvent(event) {
  try {
    var startTime = convertTime(event.start.dateTime);
    var endTime = convertTime(event.end.dateTime) - 900;
    toggleRange(startTime, endTime, false);
  } catch (e) {
    errors.push(e);
  }
}

function selectAll() {
  toggleRange(TimeOfSlot[0], TimeOfSlot[TimeOfSlot.length-1], true);
}

function toggleRange(startTime, endTime, makeAvailable) {
  try {
    SelectFromHere(startTime);
    SelectToHere(endTime);
    ChangeToAvailable = makeAvailable;
    SelectStop();
  } catch (e) {
    errors.push(e);
  }
}

function flatten(arrs) {
  // reduce was overridden by Prototype.js so use reduceRight
  return arrs.reduceRight(function (a1, a2) { return a1.concat(a2); });
}

function whenArray(promiseArr) {
  return $.when.apply($, promiseArr).then(function () {
    return Array.prototype.slice.call(arguments);
  });
}

function convertTime(gcalTime) {
  var d = new Date(gcalTime);
  // if not on a quarter hour increment
  if (d.getMinutes() % 15 !== 0) {
    // round to the nearest half hour
    var m = (Math.round(d.getMinutes() / 30) * 30) % 60;
    var h = d.getMinutes() > 45 ? d.getHours() + 1 : d.getHours();
    d.setMinutes(m);
    d.setHours(h);
  }
  return d.getTime() / 1000;
}

window.GCAL = load;
window.GCAL.errors = errors;
window.GCAL.events = events;

}());
