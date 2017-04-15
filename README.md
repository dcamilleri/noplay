# [![emitta](/images/tile.jpg)](https://github.com/dcamilleri/noplay)

> 🛑 Video autoplay blocked, for good (Chrome Extension)

`noplay` is a Google Chrome extension. It aims to **disable** the autoplaying behavior of videos on your favorite websites.

## How does it work ?

`noplay` removes the HTML5 `autoplay` attribute on the `<video>` and `<audio>` tags. It also listens to DOM changes with the [MutationObserver API](https://developer.mozilla.org/fr/docs/Web/API/MutationObserver) in order to prevent lazyloading new autoplaying videos.

`noplay` also deletes the `autoplay=1` query string in the Youtube `iframe` videos.

⚠️ `noplay` tweaks `video` and `iframe` tags, but cannot prevent videos from being played programmatically. 

👋 Your thoughts and ideas are welcome! Submit an issue [here](https://github.com/dcamilleri/noplay/issues)

## What about Facebook or Twitter ?

Facebook, Twitter and probably other websites already allow **disabling video autoplay** in their settings. It was not worth implementing a solution for them.

**Disable autoplay on Facebook:**

_Go to Settings > Videos > Video autoplay (No)_

**Disable autoplay on Twitter:**

_Go to Settings > Acessibility > Video autoplay (uncheck the box)_

## Installation

You can download the extension on the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/noplay/pcopajakflaeckhkfhalneeeicbgnmcp)

## Bug report

Report bugs by [filing an issue](https://github.com/dcamilleri/noplay/issues)

## Contribute

Pull requests are welcome!

## License

MIT © [Dorian Camilleri](https://github.com/dcamilleri)