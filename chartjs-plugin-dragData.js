/*!
 * chartjs-plugin-dragData.js
 * http://chartjs.org/
 * Version: 0.3.0
 * 
 * Copyright 2017 Christoph Pahmeyer
 * Released under the MIT license
 * https://github.com/chrispahm/chartjs-plugin-dragData/blob/master/LICENSE.md
 */
!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,n){return function(){if(l.event){var e=l.event.sourceEvent;f=t.getElementAtEvent(e)[0],d="radar"==t.config.type;var r=d?"_scale":"_yScale";if(f){if(t.data.datasets[f._datasetIndex].dragData===!1||f[r].options.dragData===!1)return void(f=null);h=f[r].id,f._xScale&&(p=f._xScale.id),"function"==typeof n&&f&&n(e,f)===!1&&(f=null)}}}}function o(t,n){return function(){if(f&&l.event){var e=l.event.sourceEvent,r=f._datasetIndex,i=f._index,o=function(t,n){return isNaN(n)?t:Math.round(t*Math.pow(10,n))/Math.pow(10,n)},u=void 0,a=void 0,c=t.data.datasets[r].data[i];if(d){var s=void 0;e.touches?(u=e.touches[0].clientX-t.canvas.getBoundingClientRect().left,a=e.touches[0].clientY-t.canvas.getBoundingClientRect().top):(u=e.clientX-t.canvas.getBoundingClientRect().left,a=e.clientY-t.canvas.getBoundingClientRect().top);var v=t.scales[h],g=Math.sqrt(Math.pow(u-v.xCenter,2)+Math.pow(a-v.yCenter,2)),_=v.drawingArea/(v.max-v.min);s=v.options.ticks.reverse?v.max-g/_:v.min+g/_,s=o(s,t.options.dragDataRound),s=s>t.scale.max?t.scale.max:s,s=s<t.scale.min?t.scale.min:s,c=s}else e.touches?(u=t.scales[p].getValueForPixel(e.touches[0].clientX-t.canvas.getBoundingClientRect().left),a=t.scales[h].getValueForPixel(e.touches[0].clientY-t.canvas.getBoundingClientRect().top)):(u=t.scales[p].getValueForPixel(e.clientX-t.canvas.getBoundingClientRect().left),a=t.scales[h].getValueForPixel(e.clientY-t.canvas.getBoundingClientRect().top)),u=o(u,t.options.dragDataRound),a=o(a,t.options.dragDataRound),u=u>t.scales[p].max?t.scales[p].max:u,u=u<t.scales[p].min?t.scales[p].min:u,a=a>t.scales[h].max?t.scales[h].max:a,a=a<t.scales[h].min?t.scales[h].min:a,void 0!==t.data.datasets[r].data[i].x&&t.options.dragX&&(c.x=u),void 0!==t.data.datasets[r].data[i].y?c.y=a:c=a;"function"==typeof n?n(e,r,i,c)!==!1&&(t.data.datasets[r].data[i]=c,t.update(0)):(t.data.datasets[r].data[i]=c,t.update(0))}}}function u(t,n){return function(){if("function"==typeof n&&f){var e=l.event.sourceEvent,r=f._datasetIndex,i=f._index,o=t.data.datasets[r].data[i];return n(e,r,i,o)}}}Object.defineProperty(n,"__esModule",{value:!0});var a=e(1),c=r(a),s=e(2),l=e(3),f=void 0,h=void 0,p=void 0,d=void 0,v={afterInit:function(t){t.options.dragData&&(0,l.select)(t.chart.canvas).call((0,s.drag)().container(t.chart.canvas).on("start",i(t,t.options.onDragStart)).on("drag",o(t,t.options.onDrag)).on("end",u(t,t.options.onDragEnd)))}};c.default.pluginService.register(v),n.default=v},function(t,n){t.exports=Chart},function(t,n,e){!function(t,r){r(n,e(3),e(4))}(this,function(t,n,e){"use strict";function r(){n.event.stopImmediatePropagation()}function i(){n.event.preventDefault(),n.event.stopImmediatePropagation()}function o(t){var e=t.document.documentElement,r=n.select(t).on("dragstart.drag",i,!0);"onselectstart"in e?r.on("selectstart.drag",i,!0):(e.__noselect=e.style.MozUserSelect,e.style.MozUserSelect="none")}function u(t,e){var r=t.document.documentElement,o=n.select(t).on("dragstart.drag",null);e&&(o.on("click.drag",i,!0),setTimeout(function(){o.on("click.drag",null)},0)),"onselectstart"in r?o.on("selectstart.drag",null):(r.style.MozUserSelect=r.__noselect,delete r.__noselect)}function a(t){return function(){return t}}function c(t,n,e,r,i,o,u,a,c,s){this.target=t,this.type=n,this.subject=e,this.identifier=r,this.active=i,this.x=o,this.y=u,this.dx=a,this.dy=c,this._=s}function s(){return!n.event.button}function l(){return this.parentNode}function f(t){return null==t?{x:n.event.x,y:n.event.y}:t}function h(){return"ontouchstart"in this}function p(){function t(t){t.on("mousedown.drag",p).filter(P).on("touchstart.drag",g).on("touchmove.drag",_).on("touchend.drag touchcancel.drag",m).style("touch-action","none").style("-webkit-tap-highlight-color","rgba(0,0,0,0)")}function p(){if(!b&&E.apply(this,arguments)){var t=y("mouse",S.apply(this,arguments),n.mouse,this,arguments);t&&(n.select(n.event.view).on("mousemove.drag",d,!0).on("mouseup.drag",v,!0),o(n.event.view),r(),A=!1,w=n.event.clientX,x=n.event.clientY,t("start"))}}function d(){if(i(),!A){var t=n.event.clientX-w,e=n.event.clientY-x;A=t*t+e*e>B}C.mouse("drag")}function v(){n.select(n.event.view).on("mousemove.drag mouseup.drag",null),u(n.event.view,A),i(),C.mouse("end")}function g(){if(E.apply(this,arguments)){var t,e,i=n.event.changedTouches,o=S.apply(this,arguments),u=i.length;for(t=0;t<u;++t)(e=y(i[t].identifier,o,n.touch,this,arguments))&&(r(),e("start"))}}function _(){var t,e,r=n.event.changedTouches,o=r.length;for(t=0;t<o;++t)(e=C[r[t].identifier])&&(i(),e("drag"))}function m(){var t,e,i=n.event.changedTouches,o=i.length;for(b&&clearTimeout(b),b=setTimeout(function(){b=null},500),t=0;t<o;++t)(e=C[i[t].identifier])&&(r(),e("end"))}function y(e,r,i,o,u){var a,s,l,f=i(r,e),h=N.copy();if(n.customEvent(new c(t,"beforestart",a,e,D,f[0],f[1],0,0,h),function(){return null!=(n.event.subject=a=M.apply(o,u))&&(s=a.x-f[0]||0,l=a.y-f[1]||0,!0)}))return function p(d){var v,g=f;switch(d){case"start":C[e]=p,v=D++;break;case"end":delete C[e],--D;case"drag":f=i(r,e),v=D}n.customEvent(new c(t,d,a,e,v,f[0]+s,f[1]+l,f[0]-g[0],f[1]-g[1],h),h.apply,h,[d,o,u])}}var w,x,A,b,E=s,S=l,M=f,P=h,C={},N=e.dispatch("start","drag","end"),D=0,B=0;return t.filter=function(n){return arguments.length?(E="function"==typeof n?n:a(!!n),t):E},t.container=function(n){return arguments.length?(S="function"==typeof n?n:a(n),t):S},t.subject=function(n){return arguments.length?(M="function"==typeof n?n:a(n),t):M},t.touchable=function(n){return arguments.length?(P="function"==typeof n?n:a(!!n),t):P},t.on=function(){var n=N.on.apply(N,arguments);return n===N?t:n},t.clickDistance=function(n){return arguments.length?(B=(n=+n)*n,t):Math.sqrt(B)},t}c.prototype.on=function(){var t=this._.on.apply(this._,arguments);return t===this._?this:t},t.drag=p,t.dragDisable=o,t.dragEnable=u,Object.defineProperty(t,"__esModule",{value:!0})})},function(t,n,e){!function(t,e){e(n)}(this,function(t){"use strict";function n(t){var n=t+="",e=n.indexOf(":");return e>=0&&"xmlns"!==(n=t.slice(0,e))&&(t=t.slice(e+1)),Gt.hasOwnProperty(n)?{space:Gt[n],local:t}:t}function e(t){return function(){var n=this.ownerDocument,e=this.namespaceURI;return e===Ht&&n.documentElement.namespaceURI===Ht?n.createElement(t):n.createElementNS(e,t)}}function r(t){return function(){return this.ownerDocument.createElementNS(t.space,t.local)}}function i(t){var i=n(t);return(i.local?r:e)(i)}function o(){}function u(t){return null==t?o:function(){return this.querySelector(t)}}function a(t){"function"!=typeof t&&(t=u(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,a,c=n[i],s=c.length,l=r[i]=new Array(s),f=0;f<s;++f)(o=c[f])&&(a=t.call(o,o.__data__,f,c))&&("__data__"in o&&(a.__data__=o.__data__),l[f]=a);return new Ot(r,this._parents)}function c(){return[]}function s(t){return null==t?c:function(){return this.querySelectorAll(t)}}function l(t){"function"!=typeof t&&(t=s(t));for(var n=this._groups,e=n.length,r=[],i=[],o=0;o<e;++o)for(var u,a=n[o],c=a.length,l=0;l<c;++l)(u=a[l])&&(r.push(t.call(u,u.__data__,l,a)),i.push(u));return new Ot(r,i)}function f(t){"function"!=typeof t&&(t=Qt(t));for(var n=this._groups,e=n.length,r=new Array(e),i=0;i<e;++i)for(var o,u=n[i],a=u.length,c=r[i]=[],s=0;s<a;++s)(o=u[s])&&t.call(o,o.__data__,s,u)&&c.push(o);return new Ot(r,this._parents)}function h(t){return new Array(t.length)}function p(){return new Ot(this._enter||this._groups.map(h),this._parents)}function d(t,n){this.ownerDocument=t.ownerDocument,this.namespaceURI=t.namespaceURI,this._next=null,this._parent=t,this.__data__=n}function v(t){return function(){return t}}function g(t,n,e,r,i,o){for(var u,a=0,c=n.length,s=o.length;a<s;++a)(u=n[a])?(u.__data__=o[a],r[a]=u):e[a]=new d(t,o[a]);for(;a<c;++a)(u=n[a])&&(i[a]=u)}function _(t,n,e,r,i,o,u){var a,c,s,l={},f=n.length,h=o.length,p=new Array(f);for(a=0;a<f;++a)(c=n[a])&&(p[a]=s=Wt+u.call(c,c.__data__,a,n),s in l?i[a]=c:l[s]=c);for(a=0;a<h;++a)s=Wt+u.call(t,o[a],a,o),(c=l[s])?(r[a]=c,c.__data__=o[a],l[s]=null):e[a]=new d(t,o[a]);for(a=0;a<f;++a)(c=n[a])&&l[p[a]]===c&&(i[a]=c)}function m(t,n){if(!t)return p=new Array(this.size()),s=-1,this.each(function(t){p[++s]=t}),p;var e=n?_:g,r=this._parents,i=this._groups;"function"!=typeof t&&(t=v(t));for(var o=i.length,u=new Array(o),a=new Array(o),c=new Array(o),s=0;s<o;++s){var l=r[s],f=i[s],h=f.length,p=t.call(l,l&&l.__data__,s,r),d=p.length,m=a[s]=new Array(d),y=u[s]=new Array(d),w=c[s]=new Array(h);e(l,f,m,y,w,p,n);for(var x,A,b=0,E=0;b<d;++b)if(x=m[b]){for(b>=E&&(E=b+1);!(A=y[E])&&++E<d;);x._next=A||null}}return u=new Ot(u,r),u._enter=a,u._exit=c,u}function y(){return new Ot(this._exit||this._groups.map(h),this._parents)}function w(t){for(var n=this._groups,e=t._groups,r=n.length,i=e.length,o=Math.min(r,i),u=new Array(r),a=0;a<o;++a)for(var c,s=n[a],l=e[a],f=s.length,h=u[a]=new Array(f),p=0;p<f;++p)(c=s[p]||l[p])&&(h[p]=c);for(;a<r;++a)u[a]=n[a];return new Ot(u,this._parents)}function x(){for(var t=this._groups,n=-1,e=t.length;++n<e;)for(var r,i=t[n],o=i.length-1,u=i[o];--o>=0;)(r=i[o])&&(u&&u!==r.nextSibling&&u.parentNode.insertBefore(r,u),u=r);return this}function A(t){function n(n,e){return n&&e?t(n.__data__,e.__data__):!n-!e}t||(t=b);for(var e=this._groups,r=e.length,i=new Array(r),o=0;o<r;++o){for(var u,a=e[o],c=a.length,s=i[o]=new Array(c),l=0;l<c;++l)(u=a[l])&&(s[l]=u);s.sort(n)}return new Ot(i,this._parents).order()}function b(t,n){return t<n?-1:t>n?1:t>=n?0:NaN}function E(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this}function S(){var t=new Array(this.size()),n=-1;return this.each(function(){t[++n]=this}),t}function M(){for(var t=this._groups,n=0,e=t.length;n<e;++n)for(var r=t[n],i=0,o=r.length;i<o;++i){var u=r[i];if(u)return u}return null}function P(){var t=0;return this.each(function(){++t}),t}function C(){return!this.node()}function N(t){for(var n=this._groups,e=0,r=n.length;e<r;++e)for(var i,o=n[e],u=0,a=o.length;u<a;++u)(i=o[u])&&t.call(i,i.__data__,u,o);return this}function D(t){return function(){this.removeAttribute(t)}}function B(t){return function(){this.removeAttributeNS(t.space,t.local)}}function T(t,n){return function(){this.setAttribute(t,n)}}function R(t,n){return function(){this.setAttributeNS(t.space,t.local,n)}}function O(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function k(t,n){return function(){var e=n.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}function L(t,e){var r=n(t);if(arguments.length<2){var i=this.node();return r.local?i.getAttributeNS(r.space,r.local):i.getAttribute(r)}return this.each((null==e?r.local?B:D:"function"==typeof e?r.local?k:O:r.local?R:T)(r,e))}function V(t){return t.ownerDocument&&t.ownerDocument.defaultView||t.document&&t||t.defaultView}function q(t){return function(){this.style.removeProperty(t)}}function I(t,n,e){return function(){this.style.setProperty(t,n,e)}}function X(t,n,e){return function(){var r=n.apply(this,arguments);null==r?this.style.removeProperty(t):this.style.setProperty(t,r,e)}}function j(t,n,e){return arguments.length>1?this.each((null==n?q:"function"==typeof n?X:I)(t,n,null==e?"":e)):Y(this.node(),t)}function Y(t,n){return t.style.getPropertyValue(n)||V(t).getComputedStyle(t,null).getPropertyValue(n)}function z(t){return function(){delete this[t]}}function U(t,n){return function(){this[t]=n}}function F(t,n){return function(){var e=n.apply(this,arguments);null==e?delete this[t]:this[t]=e}}function H(t,n){return arguments.length>1?this.each((null==n?z:"function"==typeof n?F:U)(t,n)):this.node()[t]}function G(t){return t.trim().split(/^|\s+/)}function $(t){return t.classList||new J(t)}function J(t){this._node=t,this._names=G(t.getAttribute("class")||"")}function K(t,n){for(var e=$(t),r=-1,i=n.length;++r<i;)e.add(n[r])}function Q(t,n){for(var e=$(t),r=-1,i=n.length;++r<i;)e.remove(n[r])}function W(t){return function(){K(this,t)}}function Z(t){return function(){Q(this,t)}}function tt(t,n){return function(){(n.apply(this,arguments)?K:Q)(this,t)}}function nt(t,n){var e=G(t+"");if(arguments.length<2){for(var r=$(this.node()),i=-1,o=e.length;++i<o;)if(!r.contains(e[i]))return!1;return!0}return this.each(("function"==typeof n?tt:n?W:Z)(e,n))}function et(){this.textContent=""}function rt(t){return function(){this.textContent=t}}function it(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}function ot(t){return arguments.length?this.each(null==t?et:("function"==typeof t?it:rt)(t)):this.node().textContent}function ut(){this.innerHTML=""}function at(t){return function(){this.innerHTML=t}}function ct(t){return function(){var n=t.apply(this,arguments);this.innerHTML=null==n?"":n}}function st(t){return arguments.length?this.each(null==t?ut:("function"==typeof t?ct:at)(t)):this.node().innerHTML}function lt(){this.nextSibling&&this.parentNode.appendChild(this)}function ft(){return this.each(lt)}function ht(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function pt(){return this.each(ht)}function dt(t){var n="function"==typeof t?t:i(t);return this.select(function(){return this.appendChild(n.apply(this,arguments))})}function vt(){return null}function gt(t,n){var e="function"==typeof t?t:i(t),r=null==n?vt:"function"==typeof n?n:u(n);return this.select(function(){return this.insertBefore(e.apply(this,arguments),r.apply(this,arguments)||null)})}function _t(){var t=this.parentNode;t&&t.removeChild(this)}function mt(){return this.each(_t)}function yt(){return this.parentNode.insertBefore(this.cloneNode(!1),this.nextSibling)}function wt(){return this.parentNode.insertBefore(this.cloneNode(!0),this.nextSibling)}function xt(t){return this.select(t?wt:yt)}function At(t){return arguments.length?this.property("__data__",t):this.node().__data__}function bt(t,n,e){return t=Et(t,n,e),function(n){var e=n.relatedTarget;e&&(e===this||8&e.compareDocumentPosition(this))||t.call(this,n)}}function Et(n,e,r){return function(i){var o=t.event;t.event=i;try{n.call(this,this.__data__,e,r)}finally{t.event=o}}}function St(t){return t.trim().split(/^|\s+/).map(function(t){var n="",e=t.indexOf(".");return e>=0&&(n=t.slice(e+1),t=t.slice(0,e)),{type:t,name:n}})}function Mt(t){return function(){var n=this.__on;if(n){for(var e,r=0,i=-1,o=n.length;r<o;++r)e=n[r],t.type&&e.type!==t.type||e.name!==t.name?n[++i]=e:this.removeEventListener(e.type,e.listener,e.capture);++i?n.length=i:delete this.__on}}}function Pt(t,n,e){var r=Zt.hasOwnProperty(t.type)?bt:Et;return function(i,o,u){var a,c=this.__on,s=r(n,o,u);if(c)for(var l=0,f=c.length;l<f;++l)if((a=c[l]).type===t.type&&a.name===t.name)return this.removeEventListener(a.type,a.listener,a.capture),this.addEventListener(a.type,a.listener=s,a.capture=e),void(a.value=n);this.addEventListener(t.type,s,e),a={type:t.type,name:t.name,value:n,listener:s,capture:e},c?c.push(a):this.__on=[a]}}function Ct(t,n,e){var r,i,o=St(t+""),u=o.length;{if(!(arguments.length<2)){for(a=n?Pt:Mt,null==e&&(e=!1),r=0;r<u;++r)this.each(a(o[r],n,e));return this}var a=this.node().__on;if(a)for(var c,s=0,l=a.length;s<l;++s)for(r=0,c=a[s];r<u;++r)if((i=o[r]).type===c.type&&i.name===c.name)return c.value}}function Nt(n,e,r,i){var o=t.event;n.sourceEvent=t.event,t.event=n;try{return e.apply(r,i)}finally{t.event=o}}function Dt(t,n,e){var r=V(t),i=r.CustomEvent;"function"==typeof i?i=new i(n,e):(i=r.document.createEvent("Event"),e?(i.initEvent(n,e.bubbles,e.cancelable),i.detail=e.detail):i.initEvent(n,!1,!1)),t.dispatchEvent(i)}function Bt(t,n){return function(){return Dt(this,t,n)}}function Tt(t,n){return function(){return Dt(this,t,n.apply(this,arguments))}}function Rt(t,n){return this.each(("function"==typeof n?Tt:Bt)(t,n))}function Ot(t,n){this._groups=t,this._parents=n}function kt(){return new Ot([[document.documentElement]],nn)}function Lt(t){return"string"==typeof t?new Ot([[document.querySelector(t)]],[document.documentElement]):new Ot([[t]],nn)}function Vt(t){return Lt(i(t).call(document.documentElement))}function qt(){return new It}function It(){this._="@"+(++en).toString(36)}function Xt(){for(var n,e=t.event;n=e.sourceEvent;)e=n;return e}function jt(t,n){var e=t.ownerSVGElement||t;if(e.createSVGPoint){var r=e.createSVGPoint();return r.x=n.clientX,r.y=n.clientY,r=r.matrixTransform(t.getScreenCTM().inverse()),[r.x,r.y]}var i=t.getBoundingClientRect();return[n.clientX-i.left-t.clientLeft,n.clientY-i.top-t.clientTop]}function Yt(t){var n=Xt();return n.changedTouches&&(n=n.changedTouches[0]),jt(t,n)}function zt(t){return"string"==typeof t?new Ot([document.querySelectorAll(t)],[document.documentElement]):new Ot([null==t?[]:t],nn)}function Ut(t,n,e){arguments.length<3&&(e=n,n=Xt().changedTouches);for(var r,i=0,o=n?n.length:0;i<o;++i)if((r=n[i]).identifier===e)return jt(t,r);return null}function Ft(t,n){null==n&&(n=Xt().touches);for(var e=0,r=n?n.length:0,i=new Array(r);e<r;++e)i[e]=jt(t,n[e]);return i}var Ht="http://www.w3.org/1999/xhtml",Gt={svg:"http://www.w3.org/2000/svg",xhtml:Ht,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},$t=function(t){return function(){return this.matches(t)}};if("undefined"!=typeof document){var Jt=document.documentElement;if(!Jt.matches){var Kt=Jt.webkitMatchesSelector||Jt.msMatchesSelector||Jt.mozMatchesSelector||Jt.oMatchesSelector;$t=function(t){return function(){return Kt.call(this,t)}}}}var Qt=$t;d.prototype={constructor:d,appendChild:function(t){return this._parent.insertBefore(t,this._next)},insertBefore:function(t,n){return this._parent.insertBefore(t,n)},querySelector:function(t){return this._parent.querySelector(t)},querySelectorAll:function(t){return this._parent.querySelectorAll(t)}};var Wt="$";J.prototype={add:function(t){var n=this._names.indexOf(t);n<0&&(this._names.push(t),this._node.setAttribute("class",this._names.join(" ")))},remove:function(t){var n=this._names.indexOf(t);n>=0&&(this._names.splice(n,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(t){return this._names.indexOf(t)>=0}};var Zt={};if(t.event=null,"undefined"!=typeof document){var tn=document.documentElement;"onmouseenter"in tn||(Zt={mouseenter:"mouseover",mouseleave:"mouseout"})}var nn=[null];Ot.prototype=kt.prototype={constructor:Ot,select:a,selectAll:l,filter:f,data:m,enter:p,exit:y,merge:w,order:x,sort:A,call:E,nodes:S,node:M,size:P,empty:C,each:N,attr:L,style:j,property:H,classed:nt,text:ot,html:st,raise:ft,lower:pt,append:dt,insert:gt,remove:mt,clone:xt,datum:At,on:Ct,dispatch:Rt};var en=0;It.prototype=qt.prototype={constructor:It,get:function(t){for(var n=this._;!(n in t);)if(!(t=t.parentNode))return;return t[n]},set:function(t,n){return t[this._]=n},remove:function(t){return this._ in t&&delete t[this._]},toString:function(){return this._}},t.create=Vt,t.creator=i,t.local=qt,t.matcher=Qt,t.mouse=Yt,t.namespace=n,t.namespaces=Gt,t.clientPoint=jt,t.select=Lt,t.selectAll=zt,t.selection=kt,t.selector=u,t.selectorAll=s,t.style=Y,t.touch=Ut,t.touches=Ft,t.window=V,t.customEvent=Nt,Object.defineProperty(t,"__esModule",{value:!0})})},function(t,n,e){!function(t,e){e(n)}(this,function(t){"use strict";function n(){for(var t,n=0,r=arguments.length,i={};n<r;++n){if(!(t=arguments[n]+"")||t in i)throw new Error("illegal type: "+t);i[t]=[]}return new e(i)}function e(t){this._=t}function r(t,n){return t.trim().split(/^|\s+/).map(function(t){var e="",r=t.indexOf(".");if(r>=0&&(e=t.slice(r+1),t=t.slice(0,r)),t&&!n.hasOwnProperty(t))throw new Error("unknown type: "+t);return{type:t,name:e}})}function i(t,n){for(var e,r=0,i=t.length;r<i;++r)if((e=t[r]).name===n)return e.value}function o(t,n,e){for(var r=0,i=t.length;r<i;++r)if(t[r].name===n){t[r]=u,t=t.slice(0,r).concat(t.slice(r+1));break}return null!=e&&t.push({name:n,value:e}),t}var u={value:function(){}};e.prototype=n.prototype={constructor:e,on:function(t,n){var e,u=this._,a=r(t+"",u),c=-1,s=a.length;{if(!(arguments.length<2)){if(null!=n&&"function"!=typeof n)throw new Error("invalid callback: "+n);for(;++c<s;)if(e=(t=a[c]).type)u[e]=o(u[e],t.name,n);else if(null==n)for(e in u)u[e]=o(u[e],t.name,null);return this}for(;++c<s;)if((e=(t=a[c]).type)&&(e=i(u[e],t.name)))return e}},copy:function(){var t={},n=this._;for(var r in n)t[r]=n[r].slice();return new e(t)},call:function(t,n){if((e=arguments.length-2)>0)for(var e,r,i=new Array(e),o=0;o<e;++o)i[o]=arguments[o+2];if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(r=this._[t],o=0,e=r.length;o<e;++o)r[o].value.apply(n,i)},apply:function(t,n,e){if(!this._.hasOwnProperty(t))throw new Error("unknown type: "+t);for(var r=this._[t],i=0,o=r.length;i<o;++i)r[i].value.apply(n,e)}},t.dispatch=n,Object.defineProperty(t,"__esModule",{value:!0})})}]);