"use strict";
(self["webpackChunkab_platform_web"] = self["webpackChunkab_platform_web"] || []).push([["tinymce-js_webix_extras_tinymce_js"],{

/***/ 76041:
/*!************************************!*\
  !*** ./js/webix/extras/tinymce.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tinymce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tinymce */ 18607);
/* harmony import */ var tinymce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tinymce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tinymce/icons/default */ 28183);
/* harmony import */ var tinymce_icons_default__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tinymce_icons_default__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tinymce/themes/silver */ 65717);
/* harmony import */ var tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tinymce_themes_silver__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tinymce/plugins/link */ 54327);
/* harmony import */ var tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tinymce_plugins_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tinymce_skins_ui_oxide_skin_min_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tinymce/skins/ui/oxide/skin.min.css */ 94654);
/* harmony import */ var tinymce_skins_ui_oxide_content_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tinymce/skins/ui/oxide/content.css */ 71884);
/* harmony import */ var tinymce_skins_content_default_content_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tinymce/skins/content/default/content.min.css */ 78841);





 // content.min.css ?


webix.protoUI(
   {
      name: "tinymce-editor",
      defaults: {
         config: { theme: "silver", statusbar: false },
         value: "",
      },
      $init: function () {
         webix.html.addStyle(".tox-tinymce{ border:0px !important}");

         this._mce_id = "webix_mce_" + (this.config.id || webix.uid());
         this.$view.innerHTML =
            "<textarea id='" +
            this._mce_id +
            "' style='width:100%; height:100%'></textarea>";

         this._waitEditor = webix.promise.defer();

         this.$ready.push(this._require_tinymce_once);
      },
      render: function () {
         this._set_inner_size();
      },
      _require_tinymce_once: function () {
         var c = this.config;

         if (c.cdn === false || window.tinymce) {
            this._init_tinymce_once();
            return;
         }

         var apiKey = c.apiKey ? c.apiKey : "no-api-key";
         var cdn =
            c.cdn ||
            "https://cdn.tiny.cloud/1/" + apiKey + "/tinymce/5.0.14-54";

         //path to tinymce codebase
         window.tinyMCEPreInit = {
            query: "",
            base: cdn,
            suffix: ".min",
         };

         webix
            .require([cdn + "/tinymce.min.js"])
            .then(webix.bind(this._init_tinymce_once, this))
            .catch(function (e) {
               console.log(e);
            });
      },
      _init_tinymce_once: function () {
         if (!(tinymce__WEBPACK_IMPORTED_MODULE_0___default().dom.Event.domLoaded)) {
            // woraround event logic in tinymce
            (tinymce__WEBPACK_IMPORTED_MODULE_0___default().dom.Event.domLoaded) = true;
         }

         var editor_config = webix.copy(this.config.config || {});
         webix.extend(
            editor_config,
            {
               selector: "#" + this._mce_id,
               resize: false,
            },
            true
         );

         var custom_setup = editor_config.setup;
         editor_config.setup = webix.bind(function (editor) {
            if (custom_setup) custom_setup(editor);
            editor.on("init", webix.bind(this._mce_editor_ready, this), true);
         }, this);

         webix.delay(function () {
            tinymce__WEBPACK_IMPORTED_MODULE_0___default().init(editor_config);
         }, this);
      },
      _mce_editor_ready: function (event) {
         this._editor = event.target;

         this.setValue(this.config.value);
         this._set_inner_size();
         this._waitEditor.resolve(this._editor);
      },
      _set_inner_size: function () {
         if (this._editor) {
            this.$view.querySelector(".tox-tinymce").style.height =
               this.$height + "px";
         }
      },
      $setSize: function (x, y) {
         if (webix.ui.view.prototype.$setSize.call(this, x, y)) {
            this._set_inner_size();
         }
      },
      setValue: function (value) {
         this.config.value = value;
         this._waitEditor.then(function (editor) {
            editor.setContent(value);
         });
      },
      getValue: function () {
         return this._editor ? this._editor.getContent() : this.config.value;
      },
      focus: function () {
         this._waitEditor.then(function (editor) {
            editor.focus();
         });
      },
      getEditor: function (wait) {
         return wait ? this._waitEditor : this._editor;
      },
   },
   webix.ui.view
);


/***/ })

}]);
//# sourceMappingURL=tinymce.tinymce-js_webix_extras_tinymce_js.d626df0630b9c8bd3a09.js.map