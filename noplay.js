/*
 * removeAutoPlay
 * - Deletes all the audio and video autoplay attribute
 *   This function is run after the DOM is rendered and loaded
 */
function removeAutoPlay () {
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

    if (!iframeSrc.match(/autoplay=1/)) {
      continue
    }

    iframe.src = iframeSrc.replace('autoplay=1', '')
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
 *  It will also prevent adding the autoload attribute on the fly
 * - Implements a fallback for older browsers (<IE11)
 */
function registerObserver () {
  if (typeof window.MutationObserver !== 'function') {
    return window.setInterval(removeAutoPlay, 200)
  }

  var addedNodesObserver = new window.MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i]
      if (!mutation.addedNodes) {
        continue
      }

      for (var j = 0; j < mutation.addedNodes.length; j++) {
        var addedNode = mutation.addedNodes[j]

        if (addedNode.tagName.match(/VIDEO|AUDIO/)) {
          addedNode.removeAttribute('autoplay')
        }
      }
    }
  })

  addedNodesObserver.observe(document.body, {
    childList: true,
    attributes: false,
    characterData: false,
    subtree: true
  })
}

/*
 * Initialize Noplay
 */
function init () {
  removeAutoPlay()

  registerObserver()

  pauseAllPlayingItems()

  removeYoutubeAutoplay()
}

init()
