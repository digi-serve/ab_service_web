"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessEnd_js"],{

/***/ 15728:
/*!******************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessEndCore.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskEndCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


var ABProcessTaskEndDefaults = {
   category: "end",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   fields: [],
   // fields: {array}
   // a list of internal setting values this Element tracks

   icon: "stop",
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to
   // reference 'fa-user'

   key: "End",
   // key: {string}
   // unique key to reference this specific Task
};

class ABProcessTaskEndCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.end";
      super(attributes, process, AB, ABProcessTaskEndDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskEndDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Terminate End Event",
         actionName: "replace-with-terminate-end",
         className: "bpmn-icon-end-event-terminate",
         target: {
            type: "bpmn:EndEvent",
            eventDefinitionType: "bpmn:TerminateEventDefinition",
         },
      };
   }

   /**
    * do()
    * this method actually performs the action for this task.
    * @param {obj} instance  the instance data of the running process
    * @return {Promise}
    *      resolve(true/false) : true if the task is completed.
    *                            false if task is still waiting
    */
   // do(instance) {
   //     return new Promise((resolve, reject) => {
   //         // An End Event doesn't perform any other actions
   //         // than to signal it has successfully completed.
   //         // But it provides no Additional Tasks to work on.
   //         // for testing:
   //         this.stateCompleted(instance);
   //         this.log(instance, "End Event Reached");
   //         resolve(true);
   //     });
   // }

   /**
    * initState()
    * setup this task's initial state variables
    * @param {obj} context  the context data of the process instance
    * @param {obj} val  any values to override the default state
    */
   initState(context, val) {
      var myDefaults = {
         triggered: false,
      };

      super.initState(context, myDefaults, val);
   }

   /*
    * @function isEndTask
    * return true if the current type of task is an End task. False otherwise.
    * @return {bool}
    */
   isEndTask() {
      return true;
   }

   /**
    * nextTasks()
    * return the next tasks to be run after this task is complete.
    * @param {obj} instance  the instance data of the running process
    * @return {Promise}
    *      resolve([])
    */
   nextTasks(instance) {
      // I'm an End Event.  There are no nextTasks()
      return [];
   }
}


/***/ }),

/***/ 76975:
/*!******************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessEnd.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessEnd)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessEndCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessEndCore.js */ 15728);


class ABProcessEnd extends _core_process_tasks_ABProcessEndCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   /**
    * do()
    * this method actually performs the action for this task.
    * @param {obj} instance  the instance data of the running process
    * @return {Promise}
    *      resolve(true/false) : true if the task is completed.
    *                            false if task is still waiting
    */
   // do(instance) {
   //     return new Promise((resolve, reject) => {
   //         // An End Event doesn't perform any other actions
   //         // than to signal it has successfully completed.
   //         // But it provides no Additional Tasks to work on.
   //         // for testing:
   //         this.stateCompleted(instance);
   //         this.log(instance, "End Event Reached");
   //         resolve(true);
   //     });
   // }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessEnd_js.a75d9217953395a11c9d.js.map