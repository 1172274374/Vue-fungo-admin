(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["routes"],{"015e":function(t,e,a){},"1eac":function(t,e,a){"use strict";
/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */t.exports=o,t.exports.format=l,t.exports.parse=c;var i=/\B(?=(\d{3})+(?!\d))/g,s=/(?:\.0*|(\.[^0]+)0+)$/,n={b:1,kb:1024,mb:1<<20,gb:1<<30,tb:Math.pow(1024,4),pb:Math.pow(1024,5)},r=/^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;function o(t,e){return"string"===typeof t?c(t):"number"===typeof t?l(t,e):null}function l(t,e){if(!Number.isFinite(t))return null;var a=Math.abs(t),r=e&&e.thousandsSeparator||"",o=e&&e.unitSeparator||"",l=e&&void 0!==e.decimalPlaces?e.decimalPlaces:2,c=Boolean(e&&e.fixedDecimals),u=e&&e.unit||"";u&&n[u.toLowerCase()]||(u=a>=n.pb?"PB":a>=n.tb?"TB":a>=n.gb?"GB":a>=n.mb?"MB":a>=n.kb?"KB":"B");var d=t/n[u.toLowerCase()],h=d.toFixed(l);return c||(h=h.replace(s,"$1")),r&&(h=h.split(".").map((function(t,e){return 0===e?t.replace(i,r):t})).join(".")),h+o+u}function c(t){if("number"===typeof t&&!isNaN(t))return t;if("string"!==typeof t)return null;var e,a=r.exec(t),i="b";return a?(e=parseFloat(a[1]),i=a[4].toLowerCase()):(e=parseInt(t,10),i="b"),isNaN(e)?null:Math.floor(n[i]*e)}},2341:function(t,e,a){"use strict";a.r(e);a("8b8b");var i=a("b7c5"),s=a("2689"),n=a("7c3f"),r=a("e883"),o=r["default"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),l=a("2ecf"),c=Object(l["a"])(s["a"],n["a"],o).extend({name:"v-alert",props:{dismissible:Boolean,icon:String,outline:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}}},computed:{computedColor:function(){return this.type&&!this.color?this.type:this.color||"error"},computedIcon:function(){if(this.icon||!this.type)return this.icon;switch(this.type){case"info":return"$vuetify.icons.info";case"error":return"$vuetify.icons.error";case"success":return"$vuetify.icons.success";case"warning":return"$vuetify.icons.warning"}}},methods:{genIcon:function(){return this.computedIcon?this.$createElement(i["a"],{class:"v-alert__icon"},this.computedIcon):null},genDismissible:function(){var t=this;return this.dismissible?this.$createElement("a",{class:"v-alert__dismissible",on:{click:function(){t.isActive=!1}}},[this.$createElement(i["a"],{props:{right:!0}},"$vuetify.icons.cancel")]):null}},render:function(t){var e=[this.genIcon(),t("div",this.$slots.default),this.genDismissible()],a=this.outline?this.setTextColor:this.setBackgroundColor,i=t("div",a(this.computedColor,{staticClass:"v-alert",class:{"v-alert--outline":this.outline},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),e);return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[i]):i}}),u=a("8692"),d=a("5855"),h=a("d7b9"),p=a("d181"),f=a("c6bf"),m=a("b364"),v=a("e1c0"),g=a("61f6"),b=a("932a"),_=a("5087"),y=a("beb5"),w=a("e65c"),C=a("f060"),x=function(){var t=this,e=t._self._c;return e(f["a"],{staticClass:"pa-0 mail-reply",attrs:{fluid:"","fill-height":"",id:"mailReply"}},[e(b["a"],{staticClass:"mail-reply--layout",attrs:{column:""}},[e(w["a"],{staticClass:"mail-reply--toolbar",attrs:{flat:"",fixed:"",app:""}},[e(C["b"],[e(u["a"],{attrs:{size:"32"}},[e("img",{attrs:{src:t.mail.from.avatar}})]),e("span",[t._v(" "+t._s(t.mail.from.name))])],1),e(_["a"]),e(_["a"]),e(d["a"],{attrs:{icon:""}},[e(g["a"],{attrs:{color:"yellow",small:""}},[t._v("star")])],1),e("div",{staticClass:"caption"},[t._v(t._s(t.formatDate(t.mail.created_at)))]),e(d["a"],{attrs:{icon:"",small:""}},[e(g["a"],{attrs:{small:""}},[t._v("reply")])],1),e(d["a"],{attrs:{icon:"",small:""}},[e(g["a"],{attrs:{small:""}},[t._v("reply_all")])],1),e(d["a"],{attrs:{icon:"",small:""}},[e(g["a"],{attrs:{small:""}},[t._v("delete")])],1),e(d["a"],{attrs:{icon:"",small:""}},[e(g["a"],{attrs:{small:""}},[t._v("expand_more")])],1)],1),e(v["a"],{staticClass:"mail-reply--content"},[e("vue-perfect-scrollbar",{staticClass:"mail-reply--scrollbar"},[e(h["a"],[e(p["b"],{staticClass:"pa-4"},[e("div",{staticClass:"mail-reply--item"},[e("div",{staticClass:"layout column"},[e("h3",{staticClass:"headline"},[t._v("Hi Michael")]),e("div",{staticClass:"text--secondary my-4",domProps:{innerHTML:t._s(t.mail.content)}}),e("h4",[t._v(" "+t._s(t.mail.from.name)+", "),e("br"),t._v(" Thanks ")]),e(m["a"],{staticClass:"my-4"}),e("div",{staticClass:"py-3"},[e(c,{attrs:{outline:"",color:"primary",icon:"attach_file",value:!0}},[t._v(" Weekly Report ")])],1),e(h["a"],[e(p["b"],{staticClass:"pa-0"},[e(y["a"],{attrs:{counter:"",placeholder:"Your reply here","full-width":"","multi-line":""}})],1),e(w["a"],{attrs:{dense:"",flat:""}},[e(d["a"],{attrs:{icon:""}},[e(g["a"],[t._v("attach_file")])],1),e(d["a"],{attrs:{icon:""}},[e(g["a"],[t._v("link")])],1),e(d["a"],{attrs:{icon:""}},[e(g["a"],[t._v("camera")])],1),e(_["a"]),e(d["a"],{attrs:{flat:"",icon:""}},[e(g["a"],[t._v("send")])],1)],1)],1)],1)])])],1)],1)],1)],1)],1)},k=[],O=a("2a9b"),A=a.n(O),S=a("7e82"),$={components:{VuePerfectScrollbar:A.a},data:()=>({selected:[2],mailActions:[{href:"#",title:"Delete",click:t=>{console.log(t)}},{href:"Mark as read",title:"Mark as read",click:t=>{console.log(t)}},{href:"Spam",title:"Spam",click:t=>{console.log(t)}}]}),computed:{mail(){return Object(S["c"])(this.$route.params.uuid)}},created(){window.AppMail=this},methods:{computeMailPath(t){return"/mail/0/"+t},formatDate(t){return new Date(t).toLocaleDateString()}}},I=$,B=a("76b2"),j=Object(B["a"])(I,x,k,!1,null,null,null);e["default"]=j.exports},"260e":function(t,e,a){"use strict";var i=a("e883"),s=a("77f4");e["a"]=i["default"].extend({name:"comparable",props:{valueComparator:{type:Function,default:s["g"]}}})},"381c":function(t,e,a){},"3b99":function(t,e,a){},"4b25":function(t,e,a){"use strict";a("381c")},5306:function(t,e,a){"use strict";a("9130");var i=a("2ecf"),s=a("b7c5"),n=a("2689"),r=a("3272"),o=a("7c3f"),l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e["a"]=Object(i["a"])(n["a"],r["a"],o["a"]).extend({name:"v-chip",props:{close:Boolean,disabled:Boolean,label:Boolean,outline:Boolean,selected:Boolean,small:Boolean,textColor:String,value:{type:Boolean,default:!0}},computed:{classes:function(){return l({"v-chip--disabled":this.disabled,"v-chip--selected":this.selected&&!this.disabled,"v-chip--label":this.label,"v-chip--outline":this.outline,"v-chip--small":this.small,"v-chip--removable":this.close},this.themeClasses)}},methods:{genClose:function(t){var e=this,a={staticClass:"v-chip__close",on:{click:function(t){t.stopPropagation(),e.$emit("input",!1)}}};return t("div",a,[t(s["a"],"$vuetify.icons.delete")])},genContent:function(t){return t("span",{staticClass:"v-chip__content"},[this.$slots.default,this.close&&this.genClose(t)])}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-chip",class:this.classes,attrs:{tabindex:this.disabled?-1:0},directives:[{name:"show",value:this.isActive}],on:this.$listeners}),a=this.textColor||this.outline&&this.color;return t("span",this.setTextColor(a,e),[this.genContent(t)])}})},"6a36":function(t,e,a){},"89b1":function(t,e,a){"use strict";a.r(e);var i=a("5855"),s=(a("6a36"),a("0453")),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},r=s["a"].extend({name:"v-btn-toggle",props:{activeClass:{type:String,default:"v-btn--active"}},computed:{classes:function(){return n({},s["a"].options.computed.classes.call(this),{"v-btn-toggle":!0,"v-btn-toggle--only-child":1===this.selectedItems.length,"v-btn-toggle--selected":this.selectedItems.length>0})}}}),o=a("d7b9"),l=a("ce70"),c=a("c6bf"),u=a("b364"),d=a("e1c0"),h=a("61f6"),p=a("932a"),f=a("d91e"),m=a("db57"),v=a("5c9a"),g=a("20aa"),b=a("ea3f"),_=a("5087"),y=a("e65c"),w=function(){var t=this,e=t._self._c;return e("div",{staticClass:"media",attrs:{id:"media"}},[e(y["a"],{staticClass:"elevation-0 transparent media-toolbar"},[e(r,[e(i["a"],{attrs:{flat:""}},[e(h["a"],{attrs:{color:"primary"}},[t._v("cloud_upload")]),t._v("  Upload ")],1),e(i["a"],{attrs:{flat:""}},[e(h["a"],{attrs:{color:"primary"}},[t._v("folder")]),t._v("   Add Folder ")],1)],1),e(_["a"]),e(r,{model:{value:t.view,callback:function(e){t.view=e},expression:"view"}},[e(i["a"],{attrs:{flat:"",value:"list"}},[e(h["a"],{attrs:{color:"primary"}},[t._v("view_headline")])],1),e(i["a"],{attrs:{flat:"",value:"grid"}},[e(h["a"],{attrs:{color:"primary"}},[t._v("view_list")])],1)],1)],1),e(u["a"]),e("div",{staticClass:"layout row media-layout"},[e("div",{staticClass:"media-content flex transparent"},[e("vue-perfect-scrollbar",{staticClass:"media-content--warp"},["grid"===t.view?e(c["a"],{attrs:{fluid:""}},[e(p["a"],{staticClass:"x-grid-lg",attrs:{row:"",wrap:""}},[t._l(t.folders,(function(a,i){return e(d["a"],{key:"folder"+i,staticClass:"pa-2",attrs:{lg4:"",sm12:"",xs12:""}},[e(o["a"],{attrs:{flat:"",tile:""}},[e(b["a"],{attrs:{height:"150px"}},[e(h["a"],{staticClass:"mx-auto",attrs:{size:"135",color:"indigo"}},[t._v("folder")])],1),e(u["a"]),e(l["a"],[t._v(" "+t._s(a.name)+" ")])],1)],1)})),t._l(t.files,(function(a,i){return e(d["a"],{key:i,staticClass:"pa-2",attrs:{lg4:"",sm12:"",xs12:""}},[e("a",{staticClass:"d-flex",on:{click:function(e){return t.showDetail(a)}}},[e(o["a"],{attrs:{flat:"",tile:""}},[e(b["a"],{attrs:{height:"150px",width:"150px"}},[t.isImage(a)?e("img",{attrs:{src:a.path,alt:""}}):e(h["a"],{staticClass:"mx-auto",attrs:{size:"135"}},[t._v("insert_drive_file")])],1),e(u["a"]),e(l["a"],[t._v(" "+t._s(a.fileName)+" ")])],1)],1)])}))],2)],1):e(p["a"],{attrs:{column:""}},[e(f["a"],{staticClass:"transparent",attrs:{dense:""}},t._l(t.files,(function(a,i){return e(m["a"],{key:"list-file-"+i,attrs:{avatar:""},on:{click:function(e){return t.showDetail(a)}}},[e(v["a"],[e(h["a"],[t._v(t._s(t.mimeIcons(a)))])],1),e(g["b"],[e("div",{staticClass:"container pl-0"},[e("div",{staticClass:"layout row"},[e("div",{staticClass:"flex"},[t._v(t._s(a.fileName))]),e(_["a"]),e("div",{staticClass:"caption"},[t._v(" "+t._s(a?t.formateDate(a.ctime):"")+" ")])],1)])])],1)})),1)],1)],1)],1)])],1)},C=[],x=a("1eac"),k=a.n(x),O=a("3f5e"),A=a("2a9b"),S=a.n(A),$={components:{VuePerfectScrollbar:S.a},props:{type:{type:String,default:"image"}},data:()=>({size:"lg",view:"grid",selectedFile:{path:"/static/icon/empty_file.svg"},imageMime:["image/jpeg","image/png","image/svg+xml"],folders:[{name:"bg",lastModified:"2018-03-03"},{name:"cards",lastModified:"2018-03-03"},{name:"avatar",lastModified:"2018-03-03"}]}),computed:{mediaMenu(){return O["b"]},files(){return Object(O["a"])()}},methods:{isImage(t){return this.imageMime.includes(t.fileType)},mimeIcons(t){return this.imageMime.includes(t.fileType)?"image":"insert_drive_file"},showDetail(t){this.selectedFile=t},fileSize(t){return k.a.format(t)},formateDate(t){return t?new Date(t).toLocaleDateString():""},computeFileImage(t){return this.isImage(t)?t.path:"/static/icon/file_empty.svg"}}},I=$,B=(a("4b25"),a("76b2")),j=Object(B["a"])(I,w,C,!1,null,"8397bcf2",null);e["default"]=j.exports},"8b8b":function(t,e,a){},9130:function(t,e,a){},b132:function(t,e,a){"use strict";a("015e");var i=a("b7c5"),s=a("3c53"),n=a("feda"),r=a("e883"),o=r["default"].extend({name:"rippleable",directives:{Ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),t.on=Object.assign({click:this.onChange},this.$listeners),this.$createElement("div",t)):null},onChange:function(){}}}),l=a("260e"),c=s["a"].extend({name:"selectable",mixins:[o,l["a"]],model:{prop:"inputValue",event:"change"},props:{color:{type:String,default:"accent"},id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(t){return{lazyValue:t.inputValue}},computed:{computedColor:function(){return this.isActive?this.color:this.validationState},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return t.valueComparator(a,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive}},watch:{inputValue:function(t){this.lazyValue=t}},methods:{genLabel:function(){if(!this.hasLabel)return null;var t=s["a"].options.methods.genLabel.call(this);return t.data.on={click:this.onChange},t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-label":this.label,"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.id,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown},ref:"input"})},onBlur:function(){this.isFocused=!1},onChange:function(){var t=this;if(!this.isDisabled){var e=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var i=a.length;a=a.filter((function(a){return!t.valueComparator(a,e)})),a.length===i&&a.push(e)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(a,e)?null:e:!a;this.validate(!0,a),this.internalValue=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}}),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};e["a"]={name:"v-checkbox",mixins:[c],props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$vuetify.icons.checkboxIndeterminate"},onIcon:{type:String,default:"$vuetify.icons.checkboxOn"},offIcon:{type:String,default:"$vuetify.icons.checkboxOff"}},data:function(t){return{inputIndeterminate:t.indeterminate}},computed:{classes:function(){return{"v-input--selection-controls":!0,"v-input--checkbox":!0}},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon}},watch:{indeterminate:function(t){this.inputIndeterminate=t}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",u({},this.$attrs,{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.computedColor)),this.$createElement(i["a"],this.setTextColor(this.computedColor,{props:{dark:this.dark,light:this.light}}),this.computedIcon)])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}}},beb5:function(t,e,a){"use strict";a.d(e,"a",(function(){return c}));var i=a("ebe6"),s=(a("3b99"),a("0b2e")),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t},r={name:"v-textarea",extends:i["a"],props:{autoGrow:Boolean,noResize:Boolean,outline:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return n({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},i["a"].options.computed.classes.call(this,null))},dynamicHeight:function(){return this.autoGrow?this.inputHeight:"auto"},isEnclosed:function(){return this.textarea||i["a"].options.computed.isEnclosed.call(this)},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){!this.internalChange&&this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0),this.autoGrow&&this.noResize&&Object(s["b"])('"no-resize" is now implied when using "auto-grow", and can be removed',this)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height=0;var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=i["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){i["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.internalChange=!0,this.$emit("keydown",t)}}},o=a("d74b"),l=a("8eb6"),c={functional:!0,$_wrapperFor:i["a"],props:{textarea:Boolean,multiLine:Boolean},render:function(t,e){var a=e.props,n=e.data,u=e.slots,d=e.parent;Object(l["a"])(n);var h=Object(o["a"])(u(),t);return a.textarea&&Object(s["d"])("<v-text-field textarea>","<v-textarea outline>",c,d),a.multiLine&&Object(s["d"])("<v-text-field multi-line>","<v-textarea>",c,d),a.textarea||a.multiLine?(n.attrs.outline=a.textarea,t(r,n,h)):t(i["a"],n,h)}}},da6d:function(t,e,a){},e9d2:function(t,e,a){"use strict";a.r(e);var i=a("8692"),s=a("5855"),n=a("b132"),r=a("c6bf"),o=a("b364"),l=a("e1c0"),c=a("61f6"),u=a("932a"),d=a("d91e"),h=a("db57"),p=a("0729"),f=a("20aa"),m=a("5c9a"),v=a("ba73"),g=a("5087"),b=a("f8c9"),_=a("9cb7"),y=a("e65c"),w=function(){var t=this,e=t._self._c;return e(r["a"],{staticClass:"pa-0 mail-list",attrs:{fluid:"","fill-height":"",id:"mailList"}},[e(u["a"],{staticClass:"mail-list--layout",attrs:{column:""}},[e(y["a"],{staticClass:"elevation-1 mail-list--toolbar",attrs:{fixed:"",app:""}},[e(n["a"],{staticClass:"check-all",attrs:{row:"","hide-details":""}}),e(v["a"],{attrs:{"offset-y":"",origin:"center center","nudge-bottom":0,transition:"scale-transition"}},[e(s["a"],{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[e(i["a"],{attrs:{size:"32px"}},[e(c["a"],[t._v("arrow_drop_down")])],1)],1),e(d["a"],{staticClass:"pa-0"},t._l(t.mailActions,(function(a,i){return e(h["a"],{key:i,attrs:{to:a.href?null:{name:a.name},href:a.href,ripple:"ripple",disabled:a.disabled,target:a.target,rel:"noopener"},on:{click:a.click}},[a.icon?e(p["a"],[e(c["a"],[t._v(t._s(a.icon))])],1):t._e(),e(f["b"],[e(f["d"],[t._v(t._s(a.title))])],1)],1)})),1)],1),e(g["a"]),e(s["a"],{attrs:{icon:"",flat:""}},[e(c["a"],[t._v("refresh")])],1),e(s["a"],{attrs:{icon:"",flat:""}},[e(c["a"],[t._v("keyboard_arrow_left")])],1),e(s["a"],{attrs:{icon:"",flat:""}},[e(c["a"],[t._v("keyboard_arrow_right")])],1)],1),e("vue-perfect-scrollbar",{staticClass:"mail-list--scrollbar"},[e(l["a"],{staticClass:"mail-content white"},[e(_["a"],{attrs:{"fixed-tabs":"",grow:""}},[e(b["a"],[t._v(" Primary ")]),e(b["a"],[t._v(" Social ")]),e(b["a"],[t._v(" Promotions ")])],1),e(d["a"],{staticClass:"mail-list--list",attrs:{"two-line":""}},[t._l(t.mails,(function(a,i){return[e(h["a"],{key:i,attrs:{avatar:"",ripple:"",to:t.computeMailPath(a.uuid)}},[e(p["a"],[e(n["a"])],1),e(m["a"],[e("img",{attrs:{src:a.from.avatar}})]),e(f["b"],[e(f["d"],[t._v(t._s(a.from.name))]),e(f["c"],[t._v(t._s(a.title))])],1),e(p["a"],[e(f["a"],[t._v(t._s(t.formatDate(a.created_at)))]),t.selected.indexOf(i)<0?e(c["a"],{attrs:{color:"grey lighten-1"},on:{click:function(e){return t.toggle(i)}}},[t._v("star_border")]):e(c["a"],{attrs:{color:"yellow darken-2"}},[t._v("star")])],1)],1),e(o["a"],{key:"divider"+i})]}))],2)],1)],1)],1)],1)},C=[],x=(a("c9c8"),a("2a9b")),k=a.n(x),O=a("7e82"),A={components:{VuePerfectScrollbar:k.a},props:{mailType:{type:String,default:"All"}},data:()=>({selected:[2],mailActions:[{href:"#",title:"Delete",click:t=>{console.log(t)}},{href:"Mark as read",title:"Mark as read",click:t=>{console.log(t)}},{href:"Spam",title:"Spam",click:t=>{console.log(t)}}]}),computed:{mails(){return Object(O["d"])(this.$route.params.mailType)}},created(){this.$on("MAIL_REPLY_DIALOG_CLOSE",()=>{this.replayDialog=!1}),window.AppMail=this},methods:{computeMailPath(t){return{path:"/mail/0/"+t}},formatDate(t){return new Date(t).toLocaleString()},toggle(t){const e=this.selected.indexOf(t);e>-1?this.selected.splice(e,1):this.selected.push(t)}}},S=A,$=a("76b2"),I=Object($["a"])(S,w,C,!1,null,null,null);e["default"]=I.exports},ebf0:function(t,e,a){"use strict";a.r(e);var i=a("d92c"),s=a("8692"),n=a("5855"),r=a("4a3a"),o=(a("da6d"),a("258d")),l=a("b1b6"),c=a("b912"),u=a("4bcb"),d=a("7cda"),h=a("7c3f"),p=a("e10f"),f=a("77f4"),m=a("33ac"),v=a("0b2e"),g=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var i in a)Object.prototype.hasOwnProperty.call(a,i)&&(t[i]=a[i])}return t};function b(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var _={name:"v-dialog",directives:{ClickOutside:p["a"]},mixins:[o["a"],l["a"],c["a"],u["a"],d["a"],h["a"]],props:{disabled:Boolean,persistent:Boolean,fullscreen:Boolean,fullWidth:Boolean,noClickAnimation:Boolean,light:Boolean,dark:Boolean,maxWidth:{type:[String,Number],default:"none"},origin:{type:String,default:"center center"},width:{type:[String,Number],default:"auto"},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"}},data:function(){return{animate:!1,animateTimeout:null,stackClass:"v-dialog__content--active",stackMinZIndex:200}},computed:{classes:function(){var t;return t={},b(t,("v-dialog "+this.contentClass).trim(),!0),b(t,"v-dialog--active",this.isActive),b(t,"v-dialog--persistent",this.persistent),b(t,"v-dialog--fullscreen",this.fullscreen),b(t,"v-dialog--scrollable",this.scrollable),b(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):this.removeOverlay()},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},mounted:function(){"v-slot"===Object(f["l"])(this,"activator",!0)&&Object(v["a"])("v-dialog's activator slot must be bound, try '<template #activator=\"data\"><v-btn v-on=\"data.on>'",this)},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,clearTimeout(t.animateTimeout),t.animateTimeout=setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(t.target))&&(this.persistent?(this.noClickAnimation||this.overlay!==t.target||this.animateClick(),!1):this.activeZIndex>=this.getMaxZIndex())},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):c["a"].options.methods.hideScroll.call(this)},show:function(){!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$refs.content.focus()},onKeydown:function(t){if(t.keyCode===f["p"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},getActivator:function(t){if(this.$refs.activator)return this.$refs.activator.children.length>0?this.$refs.activator.children[0]:this.$refs.activator;if(t&&(this.activatedBy=t.currentTarget||t.target),this.activatedBy)return this.activatedBy;if(this.activatorNode){var e=Array.isArray(this.activatorNode)?this.activatorNode[0]:this.activatorNode,a=e&&e.elm;if(a)return a}return null},genActivator:function(){var t=this;if(!this.hasActivator)return null;var e=this.disabled?{}:{click:function(e){e.stopPropagation(),t.getActivator(e),t.disabled||(t.isActive=!t.isActive)}};if("scoped"===Object(f["l"])(this,"activator")){var a=this.$scopedSlots.activator({on:e});return this.activatorNode=a,a}return this.$createElement("div",{staticClass:"v-dialog__activator",class:{"v-dialog__activator--disabled":this.disabled},ref:"activator",on:e},this.$slots.activator)}},render:function(t){var e=this,a=[],i={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:function(){e.isActive=!1},args:{closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],on:{click:function(t){t.stopPropagation()}}};this.fullscreen||(i.style={maxWidth:"none"===this.maxWidth?void 0:Object(f["c"])(this.maxWidth),width:"auto"===this.width?void 0:Object(f["c"])(this.width)}),a.push(this.genActivator());var s=t("div",i,this.showLazyContent(this.$slots.default));return this.transition&&(s=t("transition",{props:{name:this.transition,origin:this.origin}},[s])),a.push(t("div",{class:this.contentClasses,attrs:g({tabIndex:"-1"},this.getScopeIdAttrs()),on:{keydown:this.onKeydown},style:{zIndex:this.activeZIndex},ref:"content"},[this.$createElement(m["a"],{props:{root:!0,light:this.light,dark:this.dark}},[s])])),t("div",{staticClass:"v-dialog__container",style:{display:!this.hasActivator||this.fullWidth?"block":"inline-block"}},a)}},y=a("b364"),w=a("e1c0"),C=a("61f6"),x=a("932a"),k=a("d91e"),O=a("db57"),A=a("0729"),S=a("20aa"),$=a("ba73"),I=a("6586"),B=a("5087"),j=a("618e"),M=a("beb5"),D=a("e65c"),P=a("38af"),L=a("f060"),V=function(){var t=this,e=t._self._c;return e(i["a"],{staticClass:"mail",attrs:{id:"mail"}},[e(D["a"],{staticClass:"mail-toolbar",attrs:{fixed:"",app:"",flat:"",dark:"",color:"indigo","clipped-left":"",id:"topbar"}},[e(P["a"],{staticClass:"hidden-sm-and-up",on:{click:t.toggleDrawer}}),e(s["a"],{staticClass:"hidden-sm-and-down"},[e("img",{attrs:{src:"/static/m.png",alt:"Vue Material Mail"}})]),e(L["b"],{staticClass:"ml-0 pl-3"},[e("span",{staticClass:"hidden-sm-and-down"},[t._v("Mail")])]),e(B["a"]),e(M["a"],{staticClass:"hidden-sm-and-down",attrs:{flat:"","solo-inverted":"","prepend-icon":"search",label:"What are you looking for?"}}),e(n["a"],{attrs:{icon:""}},[e(C["a"],[t._v("notifications")])],1),e($["a"],{attrs:{"offset-y":"",origin:"center center","nudge-bottom":10,transition:"scale-transition"}},[e(n["a"],{attrs:{slot:"activator",icon:"",large:"",flat:""},slot:"activator"},[e(s["a"],{attrs:{size:"32px"}},[e("img",{attrs:{src:"https://randomuser.me/api/portraits/men/1.jpg"}})])],1),e(k["a"],{staticClass:"pa-0"},t._l(t.items,(function(a,i){return e(O["a"],{key:i,attrs:{to:a.href?null:{name:a.name},href:a.href,ripple:"ripple",disabled:a.disabled,target:a.target,rel:"noopener"},on:{click:a.click}},[a.icon?e(A["a"],[e(C["a"],[t._v(t._s(a.icon))])],1):t._e(),e(S["b"],[e(S["d"],[t._v(t._s(a.title))])],1)],1)})),1)],1)],1),e(I["a"],{staticClass:"mail-drawer",attrs:{fixed:"",clipped:"",app:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[e("div",{staticClass:"layout column pa-3"},[e(n["a"],{attrs:{large:"",block:"",color:"red",dark:""},on:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[t._v(" + COMPOSE")])],1),e(k["a"],{staticClass:"mail-list",attrs:{dense:""}},[t._l(t.menus,(function(a){return[a.heading?e(x["a"],{key:a.heading,attrs:{row:"","align-center":""}},[e(w["a"],{attrs:{xs12:""}},[a.heading?e(j["a"],[t._v(" "+t._s(a.heading)+" ")]):t._e(),e(y["a"])],1)],1):e(O["a"],{key:a.text,attrs:{to:a.to}},[a.icon?e(A["a"],[e(C["a"],{attrs:{color:a.iconColor,small:a.iconSize}},[t._v(t._s(a.icon))])],1):t._e(),e(S["b"],[e(S["d"],[t._v(t._s(a.title))])],1)],1)]}))],2)],1),e(r["a"],[e("transition",[e("router-view")],1)],1),e(_,{attrs:{"max-width":"640px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[e("compose")],1)],1)},T=[],N=(a("c9c8"),a("7e82")),z=a("d7b9"),E=a("5306"),F=a("c6bf"),H=function(){var t=this,e=t._self._c;return e(z["a"],[e(D["a"],{attrs:{color:"primary",dark:""}},[e(C["a"],{attrs:{color:"white"}},[t._v("arrow_back")]),e(L["b"],[t._v("Compose")]),e(B["a"]),e(n["a"],{attrs:{icon:""}},[e(C["a"],{attrs:{color:"white"}},[t._v("send")])],1)],1),e(F["a"],{staticClass:"pa-0 mt-2",attrs:{fluid:""}},[e(x["a"],{attrs:{wrap:""}},[e(w["a"],{attrs:{xs2:""}},[e(j["a"],[t._v("To")])],1),e(w["a"],{staticClass:"text-xs-right",attrs:{xs10:""}},[e(E["a"],[e(s["a"],[e("img",{attrs:{src:"https://randomuser.me/api/portraits/men/92.jpg"}})]),t._v(" Trevor Hansen ")],1),e(E["a"],[e(s["a"],[e("img",{attrs:{src:"https://randomuser.me/api/portraits/men/91.jpg"}})]),t._v(" Alex Nelson ")],1)],1),e(y["a"]),e(w["a"],{attrs:{xs2:""}},[e(j["a"],[t._v("CC")])],1),e(w["a"],{staticClass:"text-xs-right",attrs:{xs10:""}},[e(E["a"],[e(s["a"],[e("img",{attrs:{src:"https://randomuser.me/api/portraits/men/92.jpg"}})]),t._v(" John Doe ")],1)],1),e(w["a"],{attrs:{xs12:""}},[e(y["a"]),e(M["a"],{attrs:{label:"Subject",value:"Plans for the weekend","single-line":"","full-width":"","hide-details":""}})],1),e(w["a"],{attrs:{xs12:""}},[e(y["a"]),e(M["a"],{attrs:{label:"Message",counter:"",max:"120","full-width":"","multi-line":"","single-line":""},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1)],1)],1)],1)},R=[],G={data:()=>({title:"Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa"})},W=G,K=a("76b2"),Z=Object(K["a"])(W,H,R,!1,null,null,null),J=Z.exports,Y={components:{Compose:J},props:{source:String},data:()=>({selected:[2],dialog:null,drawer:null,replayDialog:null,menus:N["a"],items:[{icon:"account_circle",href:"#",title:"Profile",click:t=>{console.log(t)}},{icon:"settings",href:"#",title:"Settings",click:t=>{console.log(t)}},{icon:"fullscreen_exit",href:"#",title:"Logout",click:t=>{console.log(t)}}],mailActions:[{href:"#",title:"Delete",click:t=>{console.log(t)}},{href:"Mark as read",title:"Mark as read",click:t=>{console.log(t)}},{href:"Spam",title:"Spam",click:t=>{console.log(t)}}]}),created(){this.$on("MAIL_REPLY_DIALOG_CLOSE",()=>{this.replayDialog=!1}),window.AppMail=this},methods:{handleClick(t){console.log(t)},goBack(){this.$router.go(-1)},toggleDrawer(){this.drawer=!this.drawer},toggle(t){const e=this.selected.indexOf(t);e>-1?this.selected.splice(e,1):this.selected.push(t)}}},U=Y,q=Object(K["a"])(U,V,T,!1,null,null,null);e["default"]=q.exports}}]);
//# sourceMappingURL=routes.b38b78e1.js.map