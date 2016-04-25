var zoomLogic = function() {
  var zoomRatio = parseFloat(document.body.parentElement.style.zoom || "100%") / 100

  var desiredWidth = document.body.scrollWidth / zoomRatio
  var windowWidth = window.innerWidth

  window.minDesiredWidth = Math.min(window.minDesiredWidth || 1920, desiredWidth)

  if (windowWidth < minDesiredWidth) {
    zoomRatio = windowWidth / minDesiredWidth
  } else {
    zoomRatio = 1.0
  }
    
  var zoomPercentage = zoomRatio * 100
  document.body.parentElement.style.zoom = zoomPercentage + "%";
};

function zoom() {
  zoomLogic();
}

var observer = new window.MutationObserver(function(mutations, observer) {
  mutations.forEach(function(mutation) {
    if (mutation.addedNodes.length == 1 && mutation.addedNodes[0].nodeName == "BODY") {
      zoom();
      observer.disconnect();
    }
  });
});

observer.observe(document, {
  childList: true,
  subtree: true
});

window.onresize = function() {
  zoom();
}
