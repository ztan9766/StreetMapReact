export function initMap () {
  return new Promise(function(resolve, reject) {
    window.initMap = function() {
      resolve(window.google)
    }
    let script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//maps.googleapis.com/maps/api/js?key=AIzaSyD6dbvPfkTcnBq7EiQ_R7_rAyE5kqm4HAg&callback=initMap"
    script.onerror = reject
    document.head.appendChild(script)
  })
}