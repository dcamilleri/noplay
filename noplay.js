/*
 * removeVideoAutoPlay
 * - Deletes all the audio and video autoplay attribute
 *   This function is run after the DOM is rendered and loaded
 */
function removeVideoAutoPlay () {
  var autoPlayItems = document.querySelectorAll('video[autoplay], audio[autoplay]')

  for (var i = 0; i < autoPlayItems.length; i++) {
    autoPlayItems[i].pause()
    autoPlayItems[i].removeAttribute('autoplay')
  }
}

/*
 * removeYoutubeAutoplay
 * - Removes the autoplay=1 query param on the Youtube Iframes src
 */
function removeYoutubeAutoplay () {
  var youtubeIframes = document.querySelectorAll('iframe')

  for (var i = 0; i < youtubeIframes.length; i++) {
    var iframe = youtubeIframes[i]
    var iframeSrc = iframe.src

    if (iframeSrc.match(/autoplay=1/)) {
      iframe.src = iframeSrc.replace('autoplay=1', '')
    }
  }
}

/*
 * pauseAllPlayingItems
 * - Pauses all the audio and videos in the document
 */
function pauseAllPlayingItems () {
  var items = document.querySelectorAll('video, audio')

  for (var i = 0; i < items.length; i++) {
    items[i].pause()
  }
}

/*
 * registerObserver
 * - Registers a MutationObserver (ie DOM Node observer)
 *  It will detect new video and audio nodes added to the DOM (lazyloading)
 *  And automatically remove their autoplay attribute
 *  It will also prevent adding the Youtube autoplay=1 attribute on the fly
 * - Implements a fallback for older browsers (<IE11)
 */
function registerObserver () {
  if (typeof window.MutationObserver !== 'function') {
    return window.setInterval(function () {
      removeVideoAutoPlay()
      removeYoutubeAutoplay()
    }, 200)
  }

  var observer = new window.MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i]

      // Prevent adding autoplay on the fly
      if (mutation.attributeName === 'src' &&
        mutation.target &&
        mutation.target.tagName.match(/IFRAME/) &&
        mutation.target.src.match(/autoplay=1/)) {
        mutation.target.src = mutation.target.src.replace('autoplay=1', '')
      }

      if (!mutation.addedNodes) {
        continue
      }

      for (var j = 0; j < mutation.addedNodes.length; j++) {
        var addedNode = mutation.addedNodes[j]

        if (!addedNode.tagName) {
          continue
        }

        // Block lazyladed iframes
        if (addedNode.tagName.match(/IFRAME/)) {
          addedNode.src = addedNode.src.replace('autoplay=1', '')
        }

        // Block lazyladed video/audio
        if (addedNode.tagName.match(/VIDEO|AUDIO/)) {
          addedNode.removeAttribute('autoplay')
        }
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    attributes: true,
    characterData: false,
    subtree: true
  })
}

/*
 * Initialize Noplay
 */
function init () {
  removeVideoAutoPlay()

  registerObserver()

  pauseAllPlayingItems()

  removeYoutubeAutoplay()
}

init()
