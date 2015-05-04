var here = window.location.href;
var pathArray = window.location.pathname.split( '/' );

var rootFinder = "";

for (i = 0; i < pathArray.length; i++) {
  rootFinder += "/";
  rootFinder += pathArray[i];
}