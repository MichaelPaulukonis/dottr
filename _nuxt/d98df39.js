(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{165:function(t,e,n){var content=n(182);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("0013d457",content,!0,{sourceMap:!1})},166:function(t,e,n){var content=n(184);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("2c602d7e",content,!0,{sourceMap:!1})},167:function(t,e,n){var content=n(186);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(65).default)("6759f5ab",content,!0,{sourceMap:!1})},175:function(t,e,n){function r(t,e,n,r,c,l,f,d){var m,v,x,O,M,y=l,S=d,k=t,E=e,w=n,P=r,_=c;Math.abs(y)<1e-4?m=w+_:Math.abs(y)>.9999?m=k+_:(v=(E-k)*Math.abs(S),m=w-Math.abs(v),x=Math.abs(_/f),O=new h(w,E,w,k),M=new h(P,E,P,k)),this.getNextLine=function(){if(Math.abs(y)<1e-4){if(m<P){var line=[m,k,m,E];return m+=_,line}}else if(Math.abs(y)>.9999){if(m<E){line=[w,m,P,m];return m+=_,line}}else{var t=m-v/2,e=m+v/2,n=E,r=k;if(m<P+v){for(;t<w&&e<w||t>P&&e>P;)if(t=(m+=x)-v/2,e=m+v/2,m>P+v)return null;var s=new h(t,n,e,r);return s.compare(O)==o.INTERSECTS&&(t=s.getIntersectionX(),n=s.getIntersectionY()),s.compare(M)==o.INTERSECTS&&(e=s.getIntersectionX(),r=s.getIntersectionY()),S>0&&(t=P-(t-w),e=P-(e-w)),m+=x,line=[t,n,e,r]}}return null}}function h(t,e,n,r){var a,b,h,c,l=t,f=e,d=n,m=r,v=Number.MAX_VALUE,x=Number.MAX_VALUE;b=l-d,h=d*f-l*m,c=0==(a=m-f)&&0==b&&0==h,this.compare=function(t){if(this.isUndefined()||t.isUndefined())return o.UNDEFINED;var e=Number.MAX_VALUE,n=Number.MAX_VALUE,r=0,c=0;return Math.abs(b)>1e-5&&(e=-a/b,r=-h/b),Math.abs(t.getB())>1e-5&&(n=-t.getA()/t.getB(),c=-t.getC()/t.getB()),e==Number.MAX_VALUE?n==Number.MAX_VALUE?-h/a!=-t.getC()/t.getA()?o.SEPARATE:f>=Math.min(t.getPy1(),t.getPy2())&&f<=Math.max(t.getPy1(),t.getPy2())?(v=l,x=f,o.INTERSECTS):m>=Math.min(t.getPy1(),t.getPy2())&&m<=Math.max(t.getPy1(),t.getPy2())?(v=d,x=m,o.INTERSECTS):o.SEPARATE:(f-(x=n*(v=l)+c))*(x-m)<-1e-5||(t.getPy1()-x)*(x-t.getPy2())<-1e-5||Math.abs(t.getA())<1e-5&&(t.getPx1()-v)*(v-t.getPx2())<-1e-5?o.SEPARATE:o.INTERSECTS:n==Number.MAX_VALUE?(v=t.getPx1(),x=e*v+r,(t.getPy1()-x)*(x-t.getPy2())<-1e-5||(f-x)*(x-m)<-1e-5||Math.abs(a)<1e-5&&(l-v)*(v-d)<-1e-5?o.SEPARATE:o.INTERSECTS):e==n?r!=c?o.SEPARATE:l>=Math.min(t.getPx1(),t.getPx2())&&l<=Math.max(t.getPy1(),t.getPy2())?(v=l,x=f,o.INTERSECTS):d>=Math.min(t.getPx1(),t.getPx2())&&d<=Math.max(t.getPx1(),t.getPx2())?(v=d,x=m,o.INTERSECTS):o.SEPARATE:(x=e*(v=(c-r)/(e-n))+r,(l-v)*(v-d)<-1e-5||(t.getPx1()-v)*(v-t.getPx2())<-1e-5?o.SEPARATE:o.INTERSECTS)},this.getPx1=function(){return l},this.getPy1=function(){return f},this.getPx2=function(){return d},this.getPy2=function(){return m},this.isUndefined=function(){return c},this.getA=function(){return a},this.getB=function(){return b},this.getC=function(){return h},this.getIntersectionX=function(){return v},this.getIntersectionY=function(){return x},this.getLength=function(t,e,n,r){var h=n-t,o=r-e;return Math.sqrt(h*h+o*o)}}n(176);var o={LEFT:1,RIGHT:2,INTERSECTS:3,AHEAD:4,BEHIND:5,SEPARATE:6,UNDEFINED:7};t.exports=function(p){this.sketch=p||window,this.bowing=1,this.roughness=1,this.maxOffset=2,this.numEllipseSteps=9,this.ellipseInc=2*Math.PI/this.numEllipseSteps,this.getOffset=function(t,e){return this.roughness*(this.sketch.random()*(e-t)+t)},this.buildEllipse=function(t,e,n,r,h,o){var c=this.getOffset(-.5,.5)-Math.PI/2;this.sketch.beginShape(),this.sketch.curveVertex(this.getOffset(-h,h)+t+.9*n*Math.cos(c-this.ellipseInc),this.getOffset(-h,h)+e+.9*r*Math.sin(c-this.ellipseInc));for(var l=c;l<2*Math.PI+c-.01;l+=this.ellipseInc)this.sketch.curveVertex(this.getOffset(-h,h)+t+n*Math.cos(l),this.getOffset(-h,h)+e+r*Math.sin(l));this.sketch.curveVertex(this.getOffset(-h,h)+t+n*Math.cos(c+2*Math.PI+.5*o),this.getOffset(-h,h)+e+r*Math.sin(c+2*Math.PI+.5*o)),this.sketch.curveVertex(this.getOffset(-h,h)+t+.98*n*Math.cos(c+o),this.getOffset(-h,h)+e+.98*r*Math.sin(c+o)),this.sketch.curveVertex(this.getOffset(-h,h)+t+.9*n*Math.cos(c+.5*o),this.getOffset(-h,h)+e+.9*r*Math.sin(c+.5*o)),this.sketch.endShape()},this.getIntersectingLines=function(t,e,n){for(var r=[],c=new h(t[0],t[1],t[2],t[3]),i=0;i<e.length;i++){var l=new h(e[i],n[i],e[(i+1)%e.length],n[(i+1)%e.length]);c.compare(l)==o.INTERSECTS&&r.push([c.getIntersectionX(),c.getIntersectionY()])}return r},this.scribbleLine=function(t,e,n,r){var h=(t-n)*(t-n)+(e-r)*(e-r),o=this.maxOffset;this.maxOffset*this.maxOffset*100>h&&(o=Math.sqrt(h)/10);var c=o/2,l=.2+.2*this.sketch.random(),f=this.bowing*this.maxOffset*(r-e)/200,d=this.bowing*this.maxOffset*(t-n)/200;f=this.getOffset(-f,f),d=this.getOffset(-d,d),this.sketch.noFill(),this.sketch.beginShape(),this.sketch.vertex(t+this.getOffset(-o,o),e+this.getOffset(-o,o)),this.sketch.curveVertex(t+this.getOffset(-o,o),e+this.getOffset(-o,o)),this.sketch.curveVertex(f+t+(n-t)*l+this.getOffset(-o,o),d+e+(r-e)*l+this.getOffset(-o,o)),this.sketch.curveVertex(f+t+2*(n-t)*l+this.getOffset(-o,o),d+e+2*(r-e)*l+this.getOffset(-o,o)),this.sketch.curveVertex(n+this.getOffset(-o,o),r+this.getOffset(-o,o)),this.sketch.vertex(n+this.getOffset(-o,o),r+this.getOffset(-o,o)),this.sketch.endShape(),this.sketch.beginShape(),this.sketch.vertex(t+this.getOffset(-c,c),e+this.getOffset(-c,c)),this.sketch.curveVertex(t+this.getOffset(-c,c),e+this.getOffset(-c,c)),this.sketch.curveVertex(f+t+(n-t)*l+this.getOffset(-c,c),d+e+(r-e)*l+this.getOffset(-c,c)),this.sketch.curveVertex(f+t+2*(n-t)*l+this.getOffset(-c,c),d+e+2*(r-e)*l+this.getOffset(-c,c)),this.sketch.curveVertex(n+this.getOffset(-c,c),r+this.getOffset(-c,c)),this.sketch.vertex(n+this.getOffset(-c,c),r+this.getOffset(-c,c)),this.sketch.endShape()},this.scribbleCurve=function(t,e,n,r,h,o,c,l){this.sketch.bezier(t+this.getOffset(-2,2),e+this.getOffset(-2,2),h+this.getOffset(-4,4),o+this.getOffset(-3,3),c+this.getOffset(-3,3),l+this.getOffset(-3,3),n+this.getOffset(-1,1),r+this.getOffset(-1,1)),this.sketch.bezier(t+this.getOffset(-2,2),e+this.getOffset(-2,2),h+this.getOffset(-3,3),o+this.getOffset(-3,3),c+this.getOffset(-3,3),l+this.getOffset(-4,4),n+this.getOffset(-2,2),r+this.getOffset(-2,2))},this.scribbleRect=function(t,e,n,r){var h=n/2,o=r/2,c=Math.min(t-h,t+h),l=Math.max(t-h,t+h),f=Math.min(e-o,e+o),d=Math.max(e-o,e+o);this.scribbleLine(c,f,l,f),this.scribbleLine(l,f,l,d),this.scribbleLine(l,d,c,d),this.scribbleLine(c,d,c,f)},this.scribbleRoundedRect=function(t,e,n,r,h){var o=n/2,c=r/2;if(0==h||h>o||h>c)this.scribbleRect(t,e,n,r);else{var l=Math.min(t-o,t+o),f=Math.max(t-o,t+o),d=Math.min(e-c,e+c),m=Math.max(e-c,e+c);this.scribbleLine(l+h,d,f-h,d,1.5),this.scribbleLine(f,d+h,f,m-h,1.5),this.scribbleLine(f-h,m,l+h,m,1.5),this.scribbleLine(l,m-h,l,d+h,1.5),this.scribbleCurve(l+h,d,l,d+h,l+.1*h,d+.1*h,l+.1*h,d+.1*h),this.scribbleCurve(f-h,d,f,d+h,f-.1*h,d+.1*h,f-.1*h,d+.1*h),this.scribbleCurve(l+h,m,l,m-h,l+.1*h,m-.1*h,l+.1*h,m-.1*h),this.scribbleCurve(f-h,m,f,m-h,f-.1*h,m-.1*h,f-.1*h,m-.1*h)}},this.scribbleEllipse=function(t,e,n,r){var h=Math.abs(n/2),o=Math.abs(r/2);h+=this.getOffset(.05*-h,.05*h),o+=this.getOffset(.05*-o,.05*o),this.buildEllipse(t,e,h,o,1,this.ellipseInc*this.getOffset(.1,this.getOffset(.4,1))),this.buildEllipse(t,e,h,o,1.5,0)},this.scribbleFilling=function(t,e,n,h){if(null!=t&&null!=e&&0!=t.length&&0!=e.length){for(var o=this.sketch.radians(h%180),c=Math.cos(o),l=Math.sin(o),f=Math.tan(o),d=t[0],m=t[0],v=e[0],x=e[0],i=1;i<t.length;i++)d=Math.min(d,t[i]),m=Math.max(m,t[i]),v=Math.min(v,e[i]),x=Math.max(x,e[i]);for(var O=new r(v-1,x+1,d-1,m+1,n,l,c,f),M=null;null!=(M=O.getNextLine());){var y=this.getIntersectingLines(M,t,e);for(i=0;i<y.length;i+=2)if(i<y.length-1){var S=y[i],k=y[i+1];this.scribbleLine(S[0],S[1],k[0],k[1],2)}}}}}},179:function(t,e,n){t.exports=n.p+"img/ciltone.07d6782.jpeg"},181:function(t,e,n){"use strict";n(165)},182:function(t,e,n){var r=n(64)(!1);r.push([t.i,"#helpbox[data-v-6ce8384f]{margin:10px}.key[data-v-6ce8384f]{font-family:monospace}",""]),t.exports=r},183:function(t,e,n){"use strict";n(166)},184:function(t,e,n){var r=n(64)(!1);r.push([t.i,"#about[data-v-543c0052]{margin:10px}",""]),t.exports=r},185:function(t,e,n){"use strict";n(167)},186:function(t,e,n){var r=n(64)(!1);r.push([t.i,"#title{background:linear-gradient(90deg,#7fff00,#fb33db);line-height:1.5em;font-weight:600;width:25vw;letter-spacing:.1em;margin-bottom:1em;padding:1rem;font-size:1.65em}.parent{max-width:100vw;max-height:75vh}#defaultCanvas0{position:relative;top:40px;left:40px;right:40px;transform-origin:left top}#app>button{display:inline-block;padding:1rem 2rem;margin:0 1rem 1rem 0;height:3rem;background-color:#6c5cff;text-decoration:none;color:#fff;cursor:pointer;border:0;text-align:center;transition:background .25s ease-in-out,transform .15s ease;-webkit-appearance:none;-moz-appearance:none}button:hover{background-color:#574bc1}button:focus{outline:none}button:active{transform:scale(.99)}",""]),t.exports=r},187:function(t,e,n){"use strict";n.r(e);var r=n(168),h=n.n(r),o=(n(36),n(24),n(31),n(49),n(50),n(9)),c=n(20),l=(n(35),n(32),n(169),n(30),n(171)),f=n.n(l),d=(n(172),n(174)),m=n.n(d),v=n(175),x=n.n(v);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function M(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var y=function(t){var e=function(){},r=null,h="#000",c="#fff",l={pixels:7,inset:25,margin:50},d={ground:h,square:!1,circle:!0,dirty:!0,fast:!0,scribble:!1,img:null,image:{data:null,name:""},canvas:null,pixelizationSlider:null,insetSlider:null,marginSlider:null,margin:0},v=function(t){return!t},O=function(){d.dirty=!1;var e=Math.floor(d.image.data.width/d.pixelizationSlider.value()),image=d.image.data,n=d.marginSlider.value(),h=Math.floor(image.width/e)*e+2*n,c=Math.floor(image.height/e)*e+2*n;t.resizeCanvas(h,c),d.image.data.loadPixels(),t.background(d.ground);var l=e-e*(d.insetSlider.value()/100)||e;t.push(),t.translate(n,n);var f=function(t){var e=t.pixelSize,img=t.img,n=Math.floor(img.width/e),r=Math.floor(img.height/e);return{pixels:new Array(n*r).fill({}).map((function(p,i){return{x:Math.floor(i/r),y:i%r}})),width:n,height:r}}({pixelSize:e,img:image});f.pixels.forEach((function(p){var n=null;if(d.fast)n=function(e){var img=e.img,n=e.x,r=e.y,h=e.pixelSize,i=4*(n*h+r*h*img.width),c=img.pixels.slice(i,i+4)||[0,0,0,0],l=Object(o.a)(c,4),f=l[0],g=l[1],b=l[2],a=l[3];return t.color(f,g,b,a)}({img:d.image.data,x:p.x,y:p.y,pixelSize:e});else{var h=Math.floor(e/2),c=p.x*e+h,f=p.y*e+h;n=function(img,e,n,r){for(var h=0,g=0,b=0,c=0,l=e-r;l<e+r;l++)for(var f=n-r;f<n+r;f++)if(!(l<0||l>=img.width||f<0||f>=img.height||t.dist(e,n,l,f)>h)){var d=4*(l+f*img.width),m=img.pixels.slice(d,d+4)||[0,0,0,0],v=Object(o.a)(m,3),x=v[0],O=v[1],M=v[2];h+=x*x,g+=O*O,b+=M*M,c++}return t.color(Math.sqrt(h/c),Math.sqrt(g/c),Math.sqrt(b/c))}(d.image.data,c,f,h)}t.fill(n),d.square&&t.square(p.x*e+(e-l)/2,p.y*e+(e-l)/2,l),d.circle&&(d.scribble?r.scribbleEllipse(p.x*e+e/2,p.y*e+e/2,l,l):t.circle(p.x*e+e/2,p.y*e+e/2,l))})),t.pop()},y=function(){var n,r,h,o,c,l,m,v,x,canvas,O;console.log("saving canvas: "),n="dottr.".concat(d.image.name,".").concat((h=new Date,o=h.getFullYear(),c=String(h.getMonth()+1).padStart(2,"0"),l=String(h.getDate()).padStart(2,"0"),m=String(h.getHours()).padStart(2,"0"),v=String(h.getMinutes()).padStart(2,"0"),x=String(h.getSeconds()).padStart(2,"0"),"".concat(o).concat(c).concat(l).concat(m).concat(v).concat(x))),r=0,e=function(){var t="".concat(n,"-").concat(String(r).padStart(6,"0"));return r+=1,t},canvas=t.drawingContext.canvas,O=e()+".png",canvas.toBlob((function(t){return f()(t,O)}))},S=function(e){d.image.data.loadPixels(),d.image.size={width:d.image.data.width,height:d.image.data.height};var n=d.canvas.elt.parentElement.parentElement,r=Math.min(.8*window.innerWidth/d.image.data.width,.8*n.offsetHeight/d.image.data.height);t.resizeCanvas(d.image.data.width,d.image.data.height),d.canvas.elt.style.transform="scale(".concat(r<1?r:1,")"),d.imageLoaded=!0,O()},k=function(e){e&&"image"===e.type?(d.imageLoaded=!1,d.image.data=t.loadImage(e.data,S),d.image.name=e.name):console.log("Not an image file!")};t.preload=function(){d.image.data=t.loadImage(n(179)),d.image.name="ciltone"},t.setup=function(){var canvas=t.createCanvas(d.image.data.width,d.image.data.height);canvas.parent("#sketch-holder"),canvas.drop(k),d.canvas=canvas,r=new x.a(t),t.pixelDensity(1),t.image(d.image.data,0,0,d.image.data.width,d.image.data.height),t.noStroke(),d.pixelizationSlider=t.createSlider(2,100,l.pixels,1).parent("simple-gui").style("width","200px").input(m()(O,200)),d.insetSlider=t.createSlider(0,99,l.inset,1).parent("simple-gui").style("width","200px").input(m()(O,200)),d.marginSlider=t.createSlider(0,200,l.margin,1).parent("simple-gui").style("width","200px").input(m()(O,200))},t.keyTyped=function(){var e,n,r,o;return"1"===t.key?(d.square=v(d.square),d.dirty=!0):"2"===t.key?(d.circle=v(d.circle),d.dirty=!0):"b"===t.key?(d.ground=d.ground===c?h:c,d.dirty=!0):"d"===t.key?(n=(e={sliders:l}).newParams,r=void 0===n?{}:n,o=e.sliders,(d=M(M({},d),r)).pixelizationSlider.elt.value=o.pixels,d.insetSlider.elt.value=o.inset,d.marginSlider.elt.value=o.margin,d.dirty=!0):"f"===t.key?(d.fast=!d.fast,d.dirty=!0):"z"===t.key?(d.scribble=!d.scribble,d.dirty=!0):"s"===t.key&&y(),!1},t.draw=function(){d.dirty&&O()}},S=n(180),k=n.n(S),E=[{keys:["1"],note:"Toggle square pixels"},{keys:["2"],note:"Toggle circle pixels"},{keys:["b"],note:"Toggle background black | white"},{keys:["d"],note:"Reset sliders to initial state"},{keys:["s"],note:"Save"}],w={data:function(){return{keymap:E}}},P=(n(181),n(33)),_=Object(P.a)(w,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"helpbox"}},[n("p",[t._v("Move sliders to change parameters")]),n("p",[t._v("Drag-n-drop image onto canvas for a new one")]),n("h3",[t._v("Keys")]),t._l(t.keymap,(function(e){return n("div",{key:e.key,attrs:{id:"keys"}},[n("span",[n("span",{staticClass:"key"},[t._v(t._s(e.keys.join(", "))+" ")]),t._v(" "+t._s(e.note))])])}))],2)}),[],!1,null,"6ce8384f",null).exports,A={},I=(n(183),Object(P.a)(A,(function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"about"}},[n("h1",[t._v("A maker of pixels, round and square")]),n("h2",[n("a",{attrs:{href:"http://michaelpaulukonis.github.io"}},[t._v("Michael Paulukonis")])]),n("h1",{attrs:{id:"sources"}},[t._v("Source code: "),n("a",{attrs:{href:"https://github.com/MichaelPaulukonis/dottr5"}},[t._v("GitHub")])]),n("h3",[t._v("More "),n("a",{attrs:{href:"https://michaelpaulukonis.github.io/sketches/"}},[t._v("Web Sketches")])]),n("h1",[t._v("Built with "),n("a",{attrs:{href:"https://p5js.org/"}},[t._v("P5")]),t._v(" and "),n("a",{attrs:{href:"https://nuxtjs.org"}},[t._v("Nuxt")])])])}],!1,null,"543c0052",null).exports),T={components:{VModal:k.a,Help:_,About:I},mounted:function(){new h.a((function(t){new y(t)}),"sketch-holder")},methods:{canvas:function(){return document.getElementsByTagName("canvas")[0]},about:function(){this.$modal.show("about")},help:function(){this.$modal.show("help")}}},N=(n(185),Object(P.a)(T,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"title"}},[t._v("pixel8r")]),n("modal",{attrs:{name:"about"}},[n("About")],1),n("modal",{attrs:{name:"help",height:"auto",draggable:!0}},[n("Help")],1),n("button",{on:{click:t.help}},[t._v("help")]),n("button",{on:{click:t.about}},[t._v("About")]),t._m(0)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"simple-gui"}}),n("div",{staticClass:"parent"},[n("div",{attrs:{id:"sketch-holder"}})]),n("noscript",[n("p",[t._v("JavaScript is required to view the contents of this page.")])])])}],!1,null,null,null));e.default=N.exports}}]);