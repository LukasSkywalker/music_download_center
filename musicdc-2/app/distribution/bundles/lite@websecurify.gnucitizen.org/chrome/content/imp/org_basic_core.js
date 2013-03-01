// copyright GNUCITIZEN, all rights reserved
// attribution, noncommercial, noderivatives license
(function(e){function j(a){this.list=a;this.listLength=a.length;this.index=0}function d(){this.list=[];if(arguments.length==1&&arguments[0]instanceof Array)for(var a=0;a<arguments[0].length;a+=1)this.list.push(arguments[0][a]);else for(a=0;a<arguments.length;a+=1)this.list.push(arguments[a])}function k(a){this.keys=[];for(var b in a)a.hasOwnProperty(b)&&this.keys.push(b);this.keysLength=this.keys.length;this.index=0}function l(){this.map={}}function f(a){this.groups=a}function n(a,b){this.regexp=
a;this.input=b;this.match=this.regexp.exec(this.input)}function s(a,b){this.regexp=a;this.input=b}function c(a,b){this.pattern=a;this.flags=b;this.regexp=RegExp(this.pattern,this.flags)}function t(){}function o(){}function h(){}function g(){}function p(){}function u(){}function q(){}function i(){c.prototype.test=i.wrapTimeFunction(c.prototype.test,"RegularExpression.prototype.test","","arguments[0].substring(0, 20)");c.prototype.match=i.wrapTimeFunction(c.prototype.match,"RegularExpression.prototype.match",
"","arguments[0].substring(0, 20)");c.prototype.find=function(a){return function(){var b=this.pattern,c=a.apply(this,arguments);c.iterator=function(a){return function(){var c=a.apply(this,arguments);c.next=i.wrapTimeFunction(c.next,"RegularExpression.prototype.find.iterator.next",b,"this.input.substring(0, 20)");return c}}(c.iterator);return c}}(c.prototype.find)}var r=require("./org_basic_specific.js"),v=require("./org_basic_support.js"),m=r.log;String.prototype.startsWith=function(a){return this.indexOf(a)==
0};String.prototype.endsWith=function(a){return this.indexOf(a)>=0&&this.indexOf(a)+a.length==this.length};String.prototype.equals=function(a){return this==a};String.prototype.isEmpty=function(){return this.length==0};j.prototype.hasNext=function(){return this.index<this.listLength};j.prototype.next=function(){if(this.index>=this.listLength)throw Error("no such element");else return this.list[this.index++]};j.prototype.remove=function(){throw Error("cannot remove element");};d.prototype.iterator=
function(){return new j(this.list)};d.prototype.size=function(){return this.list.length};d.prototype.add=function(a){this.list.push(a)};d.prototype.remove=function(a){a=this.list.indexOf(a);a>=0&&this.list.splice(a,1)};d.prototype.push=function(a){this.list.push(a)};d.prototype.pop=function(){return this.list.pop()};d.prototype.retrieve=function(a){return this.list[a]};d.prototype.insert=function(a,b){return this.list.splice(a,0,b)};d.prototype.replace=function(a,b){this.list[a]=b};d.prototype.erase=
function(a){return this.list.splice(a,1)};d.prototype.clear=function(){this.list=[]};d.prototype.reverse=function(){this.list.reverse()};d.prototype.contains=function(a){for(var b=0;b<this.list.length;b+=1)if(this.list[b]==a)return!0;return!1};d.prototype.shuffle=function(){for(var a=this.list,b,c,d=a.length;d;b=parseInt(Math.random()*d),c=a[--d],a[d]=a[b],a[b]=c);};d.prototype.reflect=function(){for(var a=[],b=0;b<this.list.length;b+=1)a.push(this.list[b]);b=new d;b.list=a;return b};k.prototype.hasNext=
function(){return this.index<this.keysLength};k.prototype.next=function(){if(this.index>=this.keysLength)throw Error("no such element");else return this.keys[this.index++]};k.prototype.remove=function(){throw Error("cannot remove element");};l.prototype.iterator=function(){return new k(this.map)};l.prototype.get=function(a){a=this.map[a];return a!=void 0?a:null};l.prototype.set=function(a,b){this.map[a]=b};f.prototype.match=function(){return this.groups[0]};f.prototype.group=function(a){return this.groups[a]};
f.prototype.groupCount=function(){return this.groups.length};f.prototype.any=function(){for(var a=1;a<this.groups.length;a+=1){var b=this.groups[a];if(b!=void 0)return b}return null};f.prototype.some=function(a){var b=this.any();return b==null?a:b};n.prototype.hasNext=function(){return this.match!=null};n.prototype.next=function(){var a=this.match;this.match=this.regexp.exec(this.input);return new f(a)};s.prototype.iterator=function(){return new n(this.regexp,this.input)};c.prototype.test=function(a){return eval("new RegExp(this.regexp)").test(a)};
c.prototype.match=function(a){return(a=eval("new RegExp(this.regexp)").exec(a))?new f(a):null};c.prototype.find=function(a){var b=this.flags?this.flags:"g",b=b.indexOf("g")>=0?b:"g"+b;return new s(RegExp(this.pattern,b),a)};c.prototype.split=function(a){return a.split(this.regexp)};c.prototype.replace=function(a,b){return a.replace(this.regexp,b)};c.prototype.count=function(){throw Error("not implemented");};c.escapeRegularExpression=new c("([.*+?|()\\[\\]{}\\\\])","g");c.escape=function(a){return c.escapeRegularExpression.replace(a,
"\\$1")};c.makeLiteral=function(a){return a.replace(/\$/g,"\\$")};t.sha1="sha1"in r?r.sha1:v.sha1;o.escapeHtmlComponent=function(a){return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")};o.unescapeHtmlComponent=function(a){return a.split("&amp;").join("&").split("&lt;").join("<").split("&gt;").join(">")};h.escapeHtmlComponent=function(a){return a.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;")};h.unescapeHtmlComponent=function(a){return a.split("&amp;").join("&").split("&lt;").join("<").split("&gt;").join(">")};
h.escapeXmlComponentForAttribute=function(){return component.split('"').join("&quot;").split("'").join("&#x27;")};h.unescapeXmlComponentForAttribute=function(){return component.split("&#x27;").join("'").split("&quot;").join('"')};g.recordMessage=function(a){m("[*] "+a)};g.recordWarning=function(a){m("[-] "+a)};g.recordError=function(a){m("[x] "+a)};g.recordException=function(a,b){m("[x] "+a+": "+b)};p.round=function(a){return Math.round(a)};p.random=function(a,b){return a+Math.floor(Math.random()*
(b+1))};u.parseInteger=function(a){a=parseInt(a,10);if(isNaN(a))throw Error("cannot parse integer");else return a};q.escapeUriComponent=function(a){return encodeURIComponent(a)};q.unescapeUriComponent=function(a){return decodeURIComponent(a)};i.wrapTimeFunction=function(a,b,c,d){return function(){g.recordMessage(b+": start"+(c?" "+c:""));var e=(new Date).getTime(),f=a.apply(this,arguments),e=(new Date).getTime()-e;g.recordMessage(b+": completed in "+e+" seconds");g.recordMessage(b+": stop");d&&g.recordMessage(b+
": expression "+eval(d));return f}};e.ListContainer=d;e.MapContainer=l;e.SetContainer=function(){throw Error("not implemented");};e.RegularMatch=f;e.RegularExpression=c;e.HashUtils=t;e.HtmlUtils=o;e.XmlUtils=h;e.LogUtils=g;e.MathUtils=p;e.NumberUtils=u;e.UriUtils=q;e.hookDebugRoutines=i})(exports);
