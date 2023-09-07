"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingBatchProcessing_js"],{

/***/ 80281:
/*!***************************************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceAccountingBatchProcessingCore.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingBatchProcessingCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


var AccountingBatchProcessingDefaults = {
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

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "AccountingBatchProcessing",
   // key: {string}
   // unique key to reference this specific Task

   settings: [
      "objectBatch",
      "processBatchValue",
      "fieldBatchEntries",
      "fieldBatchFinancialPeriod",
      "objectJE",
      "fieldJEAccount",
      "fieldJERC",
      "fieldJEStatus",
      "fieldJEStatusComplete",
      "objectBR",
      "fieldBRFinancialPeriod",
      "fieldBRAccount",
      "fieldBRRC",
      "fieldBREntries",
   ],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class AccountingBatchProcessingCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type =
         attributes.type || "process.task.service.accounting.batchProcessing";
      super(attributes, process, AB, AccountingBatchProcessingDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return AccountingBatchProcessingDefaults;
   }

   static DiagramReplace() {
      return null;
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

        AccountingBatchProcessingDefaults.settings.forEach((f) => {
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

        AccountingBatchProcessingDefaults.settings.forEach((f) => {
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
            instanceVariable1: null,
            instanceVariable2: null
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
                key: `${this.id}.[someInstanceVariableHere]`,
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

/***/ 55048:
/*!***************************************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskServiceAccountingBatchProcessing.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingBatchProcessing)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceAccountingBatchProcessingCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceAccountingBatchProcessingCore.js */ 80281);


class AccountingBatchProcessing extends _core_process_tasks_ABProcessTaskServiceAccountingBatchProcessingCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   ////
   //// Process Instance Methods
   ////

   propertyIDs(id) {
      return {
         name: `${id}_name`,
         processBatchValue: `${id}_processBatchValue`,
         objectBatch: `${id}_objectBatch`,
         fieldBatchEntries: `${id}_fieldBatchEntries`,
         fieldBatchFinancialPeriod: `${id}_fieldBatchFinancialPeriod`,
         objectJE: `${id}_objectJE`,
         fieldJEAccount: `${id}_fieldJEAccount`,
         fieldJERC: `${id}_fieldJERC`,
         fieldJEStatus: `${id}_fieldJEStatus`,
         fieldJEStatusComplete: `${id}_fieldJEStatusComplete`,
         objectBR: `${id}_objectBR`,
         fieldBRFinancialPeriod: `${id}_fieldBRFinancialPeriod`,
         fieldBRAccount: `${id}_fieldBRAccount`,
         fieldBRRC: `${id}_fieldBRRC`,
         fieldBREntries: `${id}_fieldBREntries`,
      };
   }

   /**
    * propertiesShow()
    * display the properties panel for this Process Element.
    * @param {string} id
    *        the webix $$(id) of the properties panel area.
    */
   propertiesShow(id) {
      var ids = this.propertyIDs(id);
      var L = this.AB.Label();

      var processValues = [{ id: 0, value: L("Select a Process Value") }];
      var processDataFields = this.process.processDataFields(this);
      (processDataFields || []).forEach((row) => {
         processValues.push({ id: row.key, value: row.label });
      });

      var objectList = this.AB.objects().map((o) => {
         return { id: o.id, value: o.label || o.name, object: o };
      });
      objectList.unshift({
         id: 0,
         value: L("Select an Object"),
      });

      //
      // set up field settings:
      //

      var blankField = {
         id: 0,
         value: L("Select a Field"),
      };
      // blankField : generic Select a field entry

      function defaultFields(objID) {
         // create a new options array of Field Choices for the given obj.id

         var fields = [blankField];
         if (objID) {
            var entry = objectList.find((o) => o.id == objID);
            if (entry && entry.object) {
               entry.object.fields().forEach((f) => {
                  fields.push({ id: f.id, value: f.label, field: f });
               });
            }
         }
         return fields;
      }

      function updateFields(fieldPickers, fieldValues, defaultValue) {
         // update the list of field select choices with the new field choices

         fieldPickers.forEach((fp) => {
            var picker = $$(fp);
            if (picker) {
               picker.define("options", fieldValues);
               // if (defaultValue) {
               //    picker.define("value", defaultValue);
               // } else {
               //    picker.define("value", fieldValues[0].value);
               // }
               picker.refresh();
               picker.show();
            }
         });
      }

      var batchFields = defaultFields(this.objectBatch);
      // batchFields : the default list of fields for the Batch Object

      var fieldPickersBatch = [
         ids.fieldBatchEntries,
         ids.fieldBatchFinancialPeriod,
      ];
      // fieldPickersBatch : the list of field selects to update for the Batch
      //      object.

      var jeFields = defaultFields(this.objectJE);
      // jeFields : the default list of fields for the Journal Entry Object

      var fieldPickersJE = [
         ids.fieldJEAccount,
         ids.fieldJERC,
         ids.fieldJEStatus,
      ];
      // fieldPickersJE : the list of field selects to update for the Journal Entry
      //      object.

      function compileStatusValues(statusField) {
         var values = [{ id: 0, value: L("Select the Complete Value") }];
         if (statusField && statusField.options) {
            statusField.options().forEach((o) => {
               values.push({ id: o.id, value: o.text });
            });
         }
         return values;
      }

      function updatePickerStatusComplete(values) {
         var wbxComplete = $$(ids.fieldJEStatusComplete);
         if (wbxComplete) {
            // update fieldJEStatusComplete options
            wbxComplete.define("options", values);
            wbxComplete.refresh();
            // show fieldJEStatusComplete
            wbxComplete.show();
         }
      }

      function onStatusComplete(newVal) {
         // pull the ABField object from newValue
         var jeEntryID = $$(ids.objectJE).getValue();
         var jeEntry = objectList.find((o) => o.id == jeEntryID);
         if (jeEntry && jeEntry.object) {
            var statusField = jeEntry.object.fieldByID(newVal);
            if (statusField && statusField.options) {
               // get the options as an []
               jeFieldStatusValues = compileStatusValues(statusField);

               updatePickerStatusComplete(jeFieldStatusValues);
            }
         }
      }

      var jeFieldStatusValues = compileStatusValues();
      // jeFieldStatusValues : the list of status options from the fieldJEStatus
      //      selected entry.

      var brFields = defaultFields(this.objectBR);
      // jeFields : the default list of fields for the Journal Entry Object

      var fieldPickersBR = [
         ids.fieldBRFinancialPeriod,
         ids.fieldBRAccount,
         ids.fieldBRRC,
         ids.fieldBREntries,
      ];
      // fieldPickersBR : the list of field selects to update for the Balance Record
      //      object.

      var ui = {
         id: id,
         view: "form",
         elements: [
            {
               id: ids.name,
               view: "text",
               label: L("Name"),
               name: "name",
               value: this.name,
            },
            {
               id: ids.processBatchValue,
               view: "select",
               label: L("Process Batch Value"),
               value: this.processBatchValue,
               name: "processBatchValue",
               options: processValues,
            },
            {
               id: ids.objectBatch,
               view: "select",
               label: L("Batch Object"),
               value: this.objectBatch,
               name: "objectBatch",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        // gather new set of batchFields
                        batchFields = defaultFields(newVal);
                        // rebuild the associated list of Fields to pick
                        updateFields(fieldPickersBatch, batchFields);
                     }
                  },
               },
            },
            {
               id: ids.fieldBatchEntries,
               view: "select",
               label: L("Batch->JE[]"),
               value: this.fieldBatchEntries,
               name: "fieldBatchEntries",
               options: batchFields,
               hidden: true,
            },
            {
               id: ids.fieldBatchFinancialPeriod,
               view: "select",
               label: L("Batch->FinancialPeriod"),
               value: this.fieldBatchFinancialPeriod,
               name: "fieldBatchFinancialPeriod",
               options: batchFields,
               hidden: true,
            },
            {
               id: ids.objectJE,
               view: "select",
               label: L("Journal Entry Object"),
               value: this.objectJE,
               name: "objectJE",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        // gather new set of jeFields
                        jeFields = defaultFields(newVal);
                        // rebuild the associated list of Fields to pick
                        updateFields(fieldPickersJE, jeFields);
                     }
                  },
               },
            },
            {
               id: ids.fieldJEAccount,
               view: "select",
               label: L("JE->Account"),
               value: this.fieldJEAccount,
               name: "fieldJEAccount",
               options: jeFields,
               hidden: true,
            },
            {
               id: ids.fieldJERC,
               view: "select",
               label: L("JE->RC"),
               value: this.fieldJERC,
               name: "fieldJERC",
               options: jeFields,
               hidden: true,
            },
            {
               id: ids.fieldJEStatus,
               view: "select",
               label: L("JE->Status"),
               value: this.fieldJEStatus,
               name: "fieldJEStatus",
               options: jeFields,
               hidden: true,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        onStatusComplete(newVal);
                     }
                  },
               },
            },
            {
               id: ids.fieldJEStatusComplete,
               view: "select",
               label: L("JE->Status->Complete"),
               value: this.fieldJEStatusComplete,
               name: "fieldJEStatusComplete",
               options: jeFieldStatusValues,
               hidden: true,
            },
            {
               id: ids.objectBR,
               view: "select",
               label: L("Balance Record"),
               value: this.objectBR,
               name: "objectBR",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        // gather new set of jeFields
                        brFields = defaultFields(newVal);
                        // rebuild the associated list of Fields to pick
                        updateFields(fieldPickersBR, brFields);
                     }
                  },
               },
            },
            {
               id: ids.fieldBRFinancialPeriod,
               view: "select",
               label: L("BR->FP"),
               value: this.fieldBRFinancialPeriod,
               name: "fieldBRFinancialPeriod",
               options: brFields,
               hidden: true,
            },
            {
               id: ids.fieldBRAccount,
               view: "select",
               label: L("BR->Account"),
               value: this.fieldBRAccount,
               name: "fieldBRAccount",
               options: brFields,
               hidden: true,
            },
            {
               id: ids.fieldBRRC,
               view: "select",
               label: L("BR->RC"),
               value: this.fieldBRRC,
               name: "fieldBRRC",
               options: brFields,
               hidden: true,
            },
            {
               id: ids.fieldBREntries,
               view: "select",
               label: L("BR->Entries"),
               value: this.fieldBREntries,
               name: "fieldBREntries",
               options: brFields,
               hidden: true,
            },
         ],
      };

      webix.ui(ui, $$(id));

      // if there are already default values for our Objects,
      // unhide the field selectors:
      if (this.objectBatch && this.objectBatch != 0) {
         updateFields(fieldPickersBatch, batchFields);
      }

      if (this.objectJE && this.objectJE != 0) {
         updateFields(fieldPickersJE, jeFields);
      }

      if (this.fieldJEStatus) {
         onStatusComplete(this.fieldJEStatus);
      }

      if (this.objectBR && this.objectBR != 0) {
         updateFields(fieldPickersBR, brFields);
      }

      $$(id).show();
   }

   /**
    * propertiesStash()
    * pull our values from our property panel.
    * @param {string} id
    *        the webix $$(id) of the properties panel area.
    */
   propertiesStash(id) {
      var ids = this.propertyIDs(id);
      this.name = this.property(ids.name);

      this.defaults.settings.forEach((s) => {
         this[s] = this.property(ids[s]);
      });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingBatchProcessing_js.eea0d1e14fd6d61153ee.js.map