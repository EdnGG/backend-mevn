(function(e){function t(t){for(var o,u,i=t[0],c=t[1],s=t[2],l=0,d=[];l<i.length;l++)u=i[l],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&d.push(r[u][0]),r[u]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);f&&f(t);while(d.length)d.shift()();return a.push.apply(a,s||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],o=!0,u=1;u<n.length;u++){var c=n[u];0!==r[c]&&(o=!1)}o&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},r={app:0},a=[];function u(e){return i.p+"js/"+({about:"about"}[e]||e)+"."+{about:"b6d26ef7"}[e]+".js"}function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,o){n=r[e]=[t,o]}));t.push(n[2]=o);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=u(e);var s=new Error;a=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+o+": "+a+")",s.name="ChunkLoadError",s.type=o,s.request=a,n[1](s)}r[e]=void 0}};var l=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(t)},i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/",i.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],s=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var f=s;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"3a63":function(e,t,n){"use strict";n("6fd8")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",[n("b-navbar",{attrs:{toggleable:"md",type:"dark",variant:"dark"}},[n("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),n("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",[e.estaActivo?n("b-nav-item",{attrs:{to:"/"}},[e._v("Profile")]):e._e(),e.estaActivo?e._e():n("b-nav-item",{attrs:{to:"/signup"}},[e._v("Sign Up")]),e.estaActivo?e._e():n("b-nav-item",{attrs:{to:"/login"}},[e._v("Login")]),e.estaActivo?n("b-nav-item",{attrs:{to:"/notas"}},[e._v("Notes")]):e._e()],1),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-nav-form"),e.estaActivo?n("b-nav-item-dropdown",{attrs:{right:""},scopedSlots:e._u([{key:"button-content",fn:function(){return[n("em",[e._v(e._s(e.usuarioDB.data.nombre))])]},proxy:!0}],null,!1,3899396116)},[n("b-dropdown-item",{attrs:{to:"/"}},[e._v("Profile")]),n("b-dropdown-item",{on:{click:function(t){return e.cerrarSesion()}}},[e._v("Sign Out")])],1):e._e()],1)],1)],1)],1),n("router-view")],1)},a=[],u=n("5530"),i=n("2f62"),c={methods:Object(u["a"])({},Object(i["b"])(["cerrarSesion","leerToken"])),computed:Object(u["a"])(Object(u["a"])({},Object(i["c"])(["estaActivo"])),Object(i["d"])(["usuarioDB"])),created:function(){this.leerToken()}},s=c,l=(n("034f"),n("2877")),f=Object(l["a"])(s,r,a,!1,null,null,null),d=f.exports,p=(n("45fc"),n("d3b7"),n("8c4f")),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("b-img",e._b({staticClass:"mt-5 mb-2",attrs:{center:"",src:"https://picsum.photos/125/125/?image=55",rounded:"circle",alt:"Center image"}},"b-img",e.mainProps,!1)),n("br"),n("h1",[e._v(e._s(e.usuarioDB.data.nombre))]),n("h2",[e._v(e._s(e.usuarioDB.data.email))]),n("br"),n("h3",[e._v("Role: "+e._s(e.usuarioDB.data.role))]),n("p",[e._v("Role: "+e._s(e.usuarioDB))]),n("p"),n("div",[n("p",{staticClass:"home__date--member"},[e._v("Member sice: "+e._s(e.usuarioDB.data.date))])])],1)},b=[],v={data:function(){return{mainProps:{width:300,height:300}}},computed:Object(u["a"])({},Object(i["d"])(["usuarioDB"])),methods:{}},h=v,g=(n("3a63"),Object(l["a"])(h,m,b,!1,null,"5c2d1f86",null)),_=g.exports,y=n("1232");o["default"].use(i["a"]);var O=new i["a"].Store({state:{token:localStorage.getItem("token")||"",usuarioDB:""},mutations:{obtenerUsuario:function(e,t){e.token=t,e.usuarioDB=""===t?"":Object(y["a"])(t)}},actions:{guardarUsuario:function(e,t){var n=e.commit;localStorage.setItem("token",t),n("obtenerUsuario",t)},cerrarSesion:function(e){var t=e.commit;t("obtenerUsuario",""),localStorage.removeItem("token"),w.push({name:"login"})},leerToken:function(e){var t=e.commit,n=localStorage.getItem("token");t("obtenerUsuario",n||"")}},modules:{},getters:{estaActivo:function(e){return!!e.token}}});o["default"].use(p["a"]);var j=[{path:"/",name:"Home",component:_},{path:"/signup",name:"signup",component:function(){return n.e("about").then(n.bind(null,"5c9c"))}},{path:"/notas",name:"notas",component:function(){return n.e("about").then(n.bind(null,"c93e"))},meta:{requireAuth:!0}},{path:"/login",name:"login",component:function(){return n.e("about").then(n.bind(null,"a55b"))}}],k=new p["a"]({mode:"history",base:"/",routes:j});k.beforeEach((function(e,t,n){console.log(n());var o=e.matched.some((function(e){return e.meta.requireAuth}));return o&&""===O.state.token?(console.log("login"),n({name:"login"})):(console.log("next"),n())}));var w=k,S=n("bc3a"),P=n.n(S),x=n("2106"),A=n.n(x),B=n("5f5b");n("f9e3"),n("2dd8");o["default"].use(A.a,P.a),P.a.defaults.baseURL="https://mevn-eden.herokuapp.com/api",o["default"].use(B["a"]),o["default"].config.productionTip=!1,new o["default"]({router:w,store:O,render:function(e){return e(d)}}).$mount("#app")},"6fd8":function(e,t,n){},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.cae822b4.js.map