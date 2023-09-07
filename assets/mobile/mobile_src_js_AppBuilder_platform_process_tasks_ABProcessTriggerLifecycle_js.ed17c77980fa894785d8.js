"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTriggerLifecycle_js"],{

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

/***/ 58448:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTriggerLifecycleCore.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTriggerLifecycle)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessTrigger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessTrigger.js */ 50135);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


var ABProcessTaskTriggerLifecycleDefaults = {
   category: "start",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   fields: [
      "objectID",
      "lifecycleKey" /* , "triggerKey" is tracked in ABProcessTrigger */,
   ],
   // fields: {array}
   // a list of internal setting values this Element tracks

   icon: "key",
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   key: "TriggerLifecycle",
   // key: {string}
   // unique key to reference this specific Task
};

class ABProcessTriggerLifecycle extends _platform_process_tasks_ABProcessTrigger_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "trigger";
      super(attributes, process, AB, ABProcessTaskTriggerLifecycleDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskTriggerLifecycleDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Object Lifecycle Trigger",
         actionName: "replace-with-signal-lifecycle-start",
         // type: {string} a unique key to reference this element
         className: "bpmn-icon-start-event-signal",
         target: {
            type: "bpmn:StartEvent",
            // type: {string} the general bpmn category
            //      "StartEvent", "Task", "EndEvent", "ExclusiveGateway"
            eventDefinitionType: "ab:SignalLifecycle",
         },
      };
   }

   fromValues(attributes) {
      super.fromValues(attributes);

      this.objectID = attributes.objectID || "objID.??";
      this.lifecycleKey = attributes.lifecycleKey || "lifecycle.key??";
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

      data.objectID = this.objectID;
      data.lifecycleKey = this.lifecycleKey;
      return data;
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
      var fields = null;
      if (this.objectID) {
         fields = [];
         var object = this.AB.objectByID(this.objectID);
         if (object) {
            var myID = this.diagramID;
            object.fields().forEach((field) => {
               fields.push({
                  key: `${myID}.${field.id}`,
                  label: `${this.label}->${object.label}->${field.label}`,
                  field,
                  object,
               });
            });
            fields.push({
               key: `${myID}.uuid`,
               label: `${this.label}->${object.label}`,
               field: null,
               object,
            });
         } else {
            // OK, so we have an this.objectID defined, but we can't find it.
            // that's something we need to alert:
            var error = new Error(
               `ABProcessTriggerLifecycleCore.processDataFields():TaskID[${this.id}]: could not find referenced object by ID [${this.objectID}]`
            );
            this.AB.notify.builder(error, {
               task: this.id,
               objID: this.objectID,
            });
         }
      }
      return fields;
   }

   /**
    * processData()
    * return the current value requested for the given data key.
    * @param {obj} instance
    * @return {mixed} | null
    */
   processData(instance, key) {
      var parts = key.split(".");
      if (parts[0] == this.diagramID) {
         var myState = this.myState(instance);
         if (myState["data"]) {
            var object = this.AB.objectByID(this.objectID);
            var field = object.fields((f) => {
               return f.id == parts[1];
            })[0];
            if (field) {
               if (parts[2]) {
                  return field[parts[2]].call(field, myState["data"]);
               } else {
                  // instance.context.data[field.column_name];
                  // if field is "calculate" or "TextFormula" data is not stored
                  // in data base and we need to run format method
                  if (["calculate", "TextFormula"].indexOf(field.key) != -1) {
                     return field.format(myState["data"]);
                  } else if (
                     field.key == "connectObject" ||
                     field.key == "user"
                  ) {
                     return (
                        myState["data"][field.relationName()] ||
                        myState["data"][field.columnName]
                     );
                  } else {
                     return myState["data"][field.columnName];
                  }
               }
            } else if (parts[1] == "uuid") {
               return myState["data"]["uuid"];
            } else {
               // parts[1] should be a field.id
               var object = this.AB.objectByID(this.objectID);
               var field = object.fields((f) => {
                  return f.id == parts[1];
               })[0];
               if (field) {
                  if (parts[2]) {
                     return field[parts[2]].call(field, myState["data"]);
                  } else {
                     // instance.context.data[field.column_name];
                     return myState["data"][field.columnName];
                  }
               }
            }
         }
      }
      return null;
   }

   /**
    * processDataObjects()
    * return an array of avaiable ABObjects that this element
    * can provide to other ProcessElements.
    * @return {array} | null
    */
   processDataObjects() {
      var objects = null;
      if (this.objectID) {
         objects = [this.AB.objectByID(this.objectID)];
      }
      return objects;
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


/***/ }),

/***/ 82712:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTriggerLifecycle.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTriggerLifecycle)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTriggerLifecycleCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTriggerLifecycleCore.js */ 58448);


class ABProcessTriggerLifecycle extends _core_process_tasks_ABProcessTriggerLifecycleCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTriggerLifecycle_js.ed17c77980fa894785d8.js.map