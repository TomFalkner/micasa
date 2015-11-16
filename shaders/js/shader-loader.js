var shaderLoader = (function() {

  var loader = {};
  var result = {};
  var count = 0;
  var callback;

  loader.load = function(items, callbackFn) {
    callback = callbackFn;
    for (item in items) {
      if (items.hasOwnProperty(item)) {
	count++;
	getItem(items[item], item);
      }
    }
  }

  function getItem (source, name) {
    var request = new XMLHttpRequest();
    request.open("GET", source, true);
    request.onreadystatechange = function () {
      if (request.readyState !== 4 || request.status !== 200) return;
      result[name] = request.responseText;
      count--;
      if (count <= 0) {
	loadComplete();
      }
    }
    request.send();
  }

  function loadComplete() {
    callback.call(null, result);
  }
  
  return loader;
})();
