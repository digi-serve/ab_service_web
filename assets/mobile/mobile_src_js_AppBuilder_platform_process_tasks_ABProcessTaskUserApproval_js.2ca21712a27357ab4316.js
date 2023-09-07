"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskUserApproval_js"],{

/***/ 45383:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskUserApprovalCore.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskUserApprovalCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
/* harmony import */ var _platform_dataFields_ABFieldList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../platform/dataFields/ABFieldList.js */ 23122);




var ABProcessTaskApprovalDefaults = {
   category: null,
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "check-circle", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: ["userFormID", "userFormResponse"],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "Approval",
   // key: {string}
   // unique key to reference this specific Task

   settings: ["who", "toUsers", "formBuilder"],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessTaskUserApprovalCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.user.approval";
      super(attributes, process, AB, ABProcessTaskApprovalDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskApprovalDefaults;
   }

   static DiagramReplace() {
      return null;
   }

   fromValues(attributes) {
      /*
        {
            id: uuid(),
            name: 'name',
            type: 'xxxxx',
            json: "{json}"
        }
        */
      super.fromValues(attributes);

      function fixBoolean(obj) {
         if (obj) {
            Object.keys(obj).forEach((k) => {
               if (obj[k] == "false") {
                  obj[k] = false;
               } else if (obj[k] == "true") {
                  obj[k] = true;
               } else if (typeof obj[k] == "object") {
                  fixBoolean(obj[k]);
               }
            });
         }
      }
      fixBoolean(this.formBuilder);
   }

   /**
    * @method toObj()
    * properly compile the current state of this object instance
    * into the values needed for saving to the DB.
    * @return {json}
    */
   /*     
    toObj() {
        var data = super.toObj();

        ABProcessTaskApprovalDefaults.fields.forEach((f) => {
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
        var myDefaults = {};
        ABProcessTaskApprovalDefaults.instanceValues.forEach((v) => {
            myDefaults[v] = null;
        });

        super.initState(context, myDefaults, val);
    }
*/

   /*
    * preProcessFormIOComponents()
    * we need to parse the form.io components to ensure the proper columnName
    * and labels are being used. We also will translate the columnNames at this
    * point in the code
    */
   preProcessFormIOComponents() {
      var fields = this.process.processDataFields(this);
      if (fields && this.formBuilder && this.formBuilder.components) {
         this.formBuilder.components.forEach((c) => {
            if (c.abFieldID) {
               fields.filter((entry) => {
                  if (entry.field?.id == c.abFieldID) {
                     c.label = entry.field.label;
                     c.key = entry.key;
                     if (c.data?.values && entry.field.settings.options) {
                        var vals = [];
                        entry.field.settings.options.forEach((opt) => {
                           vals.push({
                              label: opt.text,
                              value: opt.id,
                           });
                        });
                        c.data.values = vals;
                     }
                  }
               });
            } else if (c.components && c.components.length) {
               c.key = c.path;
               c.components.forEach((o) => {
                  if (o.abFieldID) {
                     // these are plucked conneted values
                     // gather up all their fields to be used
                     var pluck = fields.filter((f) => {
                        return f.key == c.path;
                     })[0];
                     if (!pluck) return;
                     pluck.object.fields().filter((entry) => {
                        if (entry?.id == o.abFieldID) {
                           o.label = entry.label;
                           o.key = entry.columnName;
                           if (o.data?.values && entry.settings.options) {
                              var vals = [];
                              entry.settings.options.forEach((opt) => {
                                 vals.push({
                                    label: opt.text,
                                    value: opt.id,
                                 });
                              });
                              o.data.values = vals;
                           }
                        }
                     });
                  }
               });
            }
         });
      }
      return this.formBuilder;
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
      // we need to get the button events defined by the form.io formBuilder
      var options = [];
      this.formBuilder.components.forEach((comp) => {
         if (comp.type == "button" && comp.action == "event" && comp.event) {
            options.push({
               id: comp.event,
               text: comp.label,
            });
         }
      });
      // in this Task, we can return the Response to the UserForm
      // The Response can be in the form of a List Field, with one or more
      // return options.

      var myID = this.diagramID;

      // create an ABFieldList object:
      // make sure the options follow what is currently defined for our
      // responses:
      var myObj = this.AB.objectNew({});
      var listField = new _platform_dataFields_ABFieldList_js__WEBPACK_IMPORTED_MODULE_1__["default"](
         {
            id: `${myID}.userFormResponse`,
            label: `${this.label}->Response`,
            columnName: `${myID}.userFormResponse`,
            settings: {
               options: options,
            },
         },
         myObj
      );

      return [
         {
            key: `${myID}.userFormResponse`,
            label: `${this.label}->Response`,
            field: listField,
            object: null,
         },
      ];
   }

   /**
    * processData()
    * return the current value requested for the given data key.
    * @param {obj} instance
    * @return {mixed} | null
    */
   processData(instance, key) {
      if (key) {
         var parts = key.split(".");
         if (parts[0] == this.diagramID) {
            var myState = this.myState(instance);
            return myState[parts[1]];
         }
      }
      return null;
   }
}


/***/ }),

/***/ 70852:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskUserApproval.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskUserApproval)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskUserApprovalCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskUserApprovalCore.js */ 45383);


class ABProcessTaskUserApproval extends _core_process_tasks_ABProcessTaskUserApprovalCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskUserApproval_js.2ca21712a27357ab4316.js.map