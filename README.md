# I'M SICK OF SWITCHING TABS TO LOOK AT MY GOOGLE CALENDAR WHEN I'M FILLING IN A WHEN2MEET AND YOU SHOULD BE TOO.

So here's a bookmarklet to import your Google Calendar events into a when2meet.

## Instructions

To use, simply make a browser bookmark with the following code as the url.

```
javascript:(function(){document.body.appendChild(document.createElement('script')).src=
'https://raw.github.com/jonahkagan/gcal2when2meet/master/gcal2when2meet.js';})();
```

Then go to any when2meet, log in to the when2meet with your name, and then
click the bookmark.

## Plans for the Future

- Support when2meets that have days of the week instead of specific dates
- Ask which calendars you want to import
- Support events that go off the edge of the time frame/wrap around

## Feedback

Please let me know if you have any issues or feature requests on the [issues page](https://github.com/jonahkagan/gcal2when2meet/issues).
