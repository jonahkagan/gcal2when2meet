---
title: gcal2when2meet
template: index.jade
---

## I'M SICK OF SWITCHING TABS TO LOOK AT MY GOOGLE CALENDAR WHEN I FILL OUT A WHEN2MEET AND YOU SHOULD BE TOO.

So here's a bookmarklet to import your Google Calendar events into a when2meet.

### Instructions

To use, simply drag the link below to your bookmarks bar.

<a class="btn btn-large btn-primary" name="gcal2when2meet"
href="javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://raw.github.com/jonahkagan/gcal2when2meet/master/gcal2when2meet.js';})();">
gcal2when2meet
</a>

Then go to any when2meet, log in to the when2meet with your name, and then click the bookmark. A popup message will ask you to authorize access to your Google Calendar. (You may need to turn off your popup blocker.)

Any calendars that are hidden on your Google Calendar won't be imported.

If you don't like dragging, you can make a browser bookmark with the following code as the url:

```
javascript:(function(){document.body.appendChild(document.createElement(
'script')).src='https://raw.github.com/jonahkagan/gcal2when2meet/master/
gcal2when2meet.js';})();
```

### Plans for the Future

- Support when2meets that have days of the week instead of specific dates
- Ask which calendars you want to import
- Support events that go off the edge of the time frame/wrap around

### Feedback

Please let me know if you have any issues or feature requests on the [issues page](https://github.com/jonahkagan/gcal2when2meet/issues).

### About

Made by [Jonah Kagan](http://jonahkagan.me). Source is open on [Github](https://github.com/jonahkagan/gcal2when2meet).
