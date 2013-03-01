// copyright GNUCITIZEN, all rights reserved
// attribution, noncommercial, noderivatives license
(function(){})();function getFileContents(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.overrideMimeType("plain/text");b.send(null);return b.responseText}function getModuleContents(a){return getFileContents(a)}function evalInScope(a,b){eval("(function (exports) {"+b+"})(arguments[0]);")}
function require(a){if(!("__modules__"in arguments.callee))arguments.callee.__modules__={};if(!(a in arguments.callee.__modules__)){var b={};evalInScope(b,getModuleContents(a));arguments.callee.__modules__[a]=b}return arguments.callee.__modules__[a]};
