"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskService_js"],{

/***/ 74351:
/*!**************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceCore.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskServiceCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
/**
 * ABProcessTaskServiceCore
 *
 * This defines the base Service Task element that can be placed on a BPMN
 * diagram.  In our system, we will let the designer choose a sub class
 * to make active for this element.
 *
 * Currently a ServiceTask performs a dedicated operation on the server.
 *  - performing a query, looking up data, etc...
 *
 */


var ABProcessTaskServiceDefaults = {
   category: "task",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "check-circle", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "TaskService",
   // key: {string}
   // unique key to reference this specific Task

   settings: [],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessTaskServiceCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.service";
      super(attributes, process, AB, ABProcessTaskServiceDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskServiceDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Service Task",
         actionName: "replace-with-service-task",
         className: "bpmn-icon-service",
         target: {
            type: "bpmn:ServiceTask",
         },
      };
   }

   /*
    fromValues(attributes) {
        /*
        {
            id: uuid(),
            name: 'name',
            type: 'xxxxx',
            json: "{json}"
        }
        * /
        super.fromValues(attributes);

        ABProcessTaskServiceDefaults.fields.forEach((f) => {
            this[f] = attributes[f];
        });
    }
    */

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
   /*
    toObj() {
        var data = super.toObj();

        ABProcessTaskServiceDefaults.fields.forEach((f) => {
            data[f] = this[f];
        });

        return data;
    }
    */

   ////
   //// Process Instance Methods
   ////

   /**
    * initState()
    * setup this task's initial state variables
    * @param {obj} context  the context data of the process instance
    * @param {obj} val  any values to override the default state
    */
   /*
    initState(context, val) {
        var myDefaults = {
            userFormID: null,
            userFormResponse: null
        };

        super.initState(context, myDefaults, val);
    }
    */

   /**
    * processDataFields()
    * return an array of avaiable data fields that this element
    * can provide to other ProcessElements.
    * Different Process Elements can make data available to other
    * process Elements.
    * @return {array} | null
    */
   /*
    processDataFields() {
        // in this Task, we can return the Response to the UserForm
        return [
            {
                key: `${this.id}.userFormResponse`,
                label: `${this.label}->Response`
            }
        ];
    }
    */

   /**
    * processData()
    * return the current value requested for the given data key.
    * @param {obj} instance
    * @return {mixed} | null
    */
   /*
    processData(instance, key) {
        var parts = key.split(".");
        if (parts[0] == this.id) {
            var myState = this.myState(instance);
            return myState[parts[1]];
        }
        return null;
    }
    */
}


/***/ }),

/***/ 66859:
/*!**************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskService.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskService)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceCore.js */ 74351);


class ABProcessTaskService extends _core_process_tasks_ABProcessTaskServiceCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskService_js.da69a8553b889d7be097.js.map