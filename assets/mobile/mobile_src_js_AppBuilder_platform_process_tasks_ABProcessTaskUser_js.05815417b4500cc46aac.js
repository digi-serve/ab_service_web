"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskUser_js"],{

/***/ 29564:
/*!***********************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskUserCore.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskUserCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
/**
 * ABProcessTaskUserCore
 *
 * This defines the base User Task element that can be placed on a BPMN
 * diagram.  In our system, we will let the designer choose a sub class
 * to make active for this element.
 *
 * Currently a UserTask expects a human user to perform an action.  These
 * actions are in the possible forms:
 *  - confirm offline action
 *  - approve data
 *  - fill out a form
 *
 */



var ABProcessTaskUserDefaults = {
   category: "task",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "user", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "TaskUser",
   // key: {string}
   // unique key to reference this specific Task

   settings: [],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessTaskUserCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.user";
      super(attributes, process, AB, ABProcessTaskUserDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskUserDefaults;
   }

   static DiagramReplace() {
      // taken from "bpmn-js/lib/features/replace/ReplaceOptions"
      return {
         label: "User Task",
         actionName: "replace-with-user-task",
         className: "bpmn-icon-user",
         target: {
            type: "bpmn:UserTask",
         },
      };
   }

   ////
   //// Process Instance Methods
   ////

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
   //         // for testing:
   //         var myState = this.myState(instance);
   //         myState.status = "completed";
   //         this.log(instance, "Email Sent successfully");
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
         roles: [],
         ui: null,
      };

      super.initState(context, myDefaults, val);
   }
}


/***/ }),

/***/ 67429:
/*!***********************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskUser.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskUser)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskUserCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskUserCore.js */ 29564);


class ABProcessTaskUser extends _core_process_tasks_ABProcessTaskUserCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskUser_js.05815417b4500cc46aac.js.map