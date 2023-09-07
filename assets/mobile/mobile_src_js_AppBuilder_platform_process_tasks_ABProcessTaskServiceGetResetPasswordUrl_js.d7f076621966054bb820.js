"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceGetResetPasswordUrl_js"],{

/***/ 25418:
/*!*********************************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceGetResetPasswordUrlCore.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskGetResetPasswordUrlCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


const ABProcessTaskGetResetPasswordUrlDefaults = {
   category: null,
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "plus-circle", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "GetResetPasswordUrl",
   // key: {string}
   // unique key to reference this specific Task

   settings: ["email"],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessTaskGetResetPasswordUrlCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type =
         attributes.type || "process.task.service.getResetPasswordUrl";
      super(attributes, process, AB, ABProcessTaskGetResetPasswordUrlDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskGetResetPasswordUrlDefaults;
   }

   static DiagramReplace() {
      return null;
   }

   /**
    * processDataFields()
    * return an array of avaiable data fields that this element
    * can provide to other ProcessElements.
    * Different Process Elements can make data available to other
    * process Elements.
    * @return {array} | null
    */
   processDataFields() {
      return {
         key: `${this.id}.url`,
         label: `${this.label}->URL`,
      };
   }
}


/***/ }),

/***/ 47995:
/*!*********************************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskServiceGetResetPasswordUrl.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskServiceGetResetPasswordUrl)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceGetResetPasswordUrlCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceGetResetPasswordUrlCore.js */ 25418);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


class ABProcessTaskServiceGetResetPasswordUrl extends _core_process_tasks_ABProcessTaskServiceGetResetPasswordUrlCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   warningsEval() {
      super.warningsEval();

      if (!this.email) {
         this.warningMessage("is missing the email address.");
      }

      const processData = (this.process.processDataFields(this) ?? [])
         .filter((item) => item.field?.key == "email")
         .map((item) => {
            return {
               id: item.key,
               value: item.label,
            };
         });

      if (processData.length == 0) {
         this.warningMessage("has no previous tasks exporting email fields.");
      }
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceGetResetPasswordUrl_js.d7f076621966054bb820.js.map