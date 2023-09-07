"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTrigger_js"],{

/***/ 63438:
/*!**********************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTriggerCore.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTriggerCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


var ABProcessTriggerDefaults = {
   category: "start",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   fields: [],
   // fields: {array}
   // a list of internal setting values this Element tracks

   icon: "key", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   key: "Trigger",
   // key: {string}
   // unique key to reference this specific Task
};

class ABProcessTriggerCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "trigger";
      super(attributes, process, AB, ABProcessTriggerDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTriggerDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Signal Start Event",
         actionName: "replace-with-signal-start",
         className: "bpmn-icon-start-event-signal",
         target: {
            type: "bpmn:StartEvent",
            // type: {string} the general bpmn category
            //      "StartEvent", "Task", "EndEvent", "ExclusiveGateway"
            eventDefinitionType: "bpmn:SignalEventDefinition",
         },
      };
   }

   fromValues(attributes) {
      super.fromValues(attributes);

      this.triggerKey = attributes.triggerKey || "triggerKey.??";
   }

   /**
    * @method toObj()
    *
    * properly compile the current state of this ABApplication instance
    * into the values needed for saving to the DB.
    *
    * Most of the instance data is stored in .json field, so be sure to
    * update that from all the current values of our child fields.
    *
    * @return {json}
    */
   toObj() {
      var data = super.toObj();

      data.triggerKey = this.triggerKey;

      return data;
   }
}


/***/ }),

/***/ 50135:
/*!**********************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTrigger.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTrigger)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTriggerCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTriggerCore.js */ 63438);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


class ABProcessTrigger extends _core_process_tasks_ABProcessTriggerCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTrigger_js.97fd01db578f34860af5.js.map