(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["carousel-component"],{3693:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"carousel-container"},[s("h1",[e._v(e._s(e.title))]),s("div",{staticClass:"carousel-grid"},[s("a",{staticClass:"carousel-btn--prev",on:{click:function(t){return e.prevSlides()}}},[s("span",{staticClass:"carousel-images__btn"},[e._v("❮")])]),s("div",{staticClass:"carousel-images no-scrollbar",attrs:{id:"carousel-images"}},e._l(e.items,(function(t,a){return s("div",{key:a,staticClass:"carousel-item"},[s("h4",{staticClass:"carousel-item__heading"},[e._v(" "+e._s(t.year)+" ")]),s("img",{staticClass:"carousel-item__image",attrs:{id:e.setId(a),src:e.getImage(e.images[a]),alt:e.images[a]}}),s("div",{staticClass:"carousel-item__text"},e._l(t.keyProjects,(function(t,a){return s("p",{key:a},[e._v(" "+e._s(t)+" ")])})),0),s("p",{staticClass:"carousel-item__footer"},[e._v(" Tech: "+e._s(t.technologies)+" ")])])})),0),s("a",{staticClass:"carousel-btn--next",on:{click:function(t){return e.nextSlides()}}},[s("span",{staticClass:"carousel-images__btn"},[e._v("❯")])])])])},n=[],i={name:"Carousel",props:{title:{type:String,required:!1,default:""},items:{type:Array,required:!1,default:function(){return[]}}},data:function(){return{images:["nature","water","earth","wind","air","fire","space","galaxy","universe","people"]}},methods:{getImage:function(e){return"https://source.unsplash.com/daily?".concat(e)},setId:function(e){return"myImg".concat(e)},prevSlides:function(){var e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;document.getElementById("carousel-images").scrollLeft-=e},nextSlides:function(){var e=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;document.getElementById("carousel-images").scrollLeft+=e}}},c=i,r=s("0c7c"),l=Object(r["a"])(c,a,n,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=carousel-component.21212f48.js.map