"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingFPClose_js"],{

/***/ 35137:
/*!*******************************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceAccountingFPCloseCore.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingFPCloseCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


var AccountingFPCloseDefaults = {
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

   key: "AccountingFPClose",
   // key: {string}
   // unique key to reference this specific Task

   settings: [
      "processFPValue",
      "objectFP",
      "objectGL",
      "objectAcc",
      "fieldFPStart",
      "fieldFPOpen",
      "fieldFPStatus",
      "fieldFPActive",
      "fieldGLStarting",
      "fieldGLRunning",
      "fieldGLAccount",
      "fieldGLRc",
      "fieldGLDebit",
      "fieldGLCredit",
      "fieldAccType",
      "fieldAccAsset",
      "fieldAccExpense",
      "fieldAccLiabilities",
      "fieldAccEquity",
      "fieldAccIncome",
   ],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class AccountingFPCloseCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type =
         attributes.type || "process.task.service.accounting.fpClose";
      super(attributes, process, AB, AccountingFPCloseDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return AccountingFPCloseDefaults;
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

        AccountingFPCloseDefaults.settings.forEach((f) => {
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

        AccountingFPCloseDefaults.settings.forEach((f) => {
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

/***/ 29084:
/*!*******************************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskServiceAccountingFPClose.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingFPClose)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceAccountingFPCloseCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceAccountingFPCloseCore.js */ 35137);


class AccountingFPClose extends _core_process_tasks_ABProcessTaskServiceAccountingFPCloseCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   ////
   //// Process Instance Methods
   ////

   propertyIDs(id) {
      return {
         name: `${id}_name`,
         processFPValue: `${id}_processFPValue`,
         objectFP: `${id}_objectFP`,
         objectGL: `${id}_objectGL`,
         objectAcc: `${id}_objectAcc`,
         fieldFPStart: `${id}_fieldFPStart`,
         fieldFPOpen: `${id}_fieldFPOpen`,
         fieldFPStatus: `${id}_fieldFPStatus`,
         fieldFPActive: `${id}_fieldFPActive`,
         fieldGLStarting: `${id}_fieldGLStarting`,
         fieldGLRunning: `${id}_fieldGLRunning`,
         fieldGLAccount: `${id}_fieldGLAccount`,
         fieldGLRc: `${id}_fieldGLRc`,
         fieldGLDebit: `${id}fieldGLDebit`,
         fieldGLCredit: `${id}_fieldGLCredit`,
         fieldAccType: `${id}_fieldAccType`,
         fieldAccAsset: `${id}_fieldAccAsset`,
         fieldAccExpense: `${id}_fieldAccExpense`,
         fieldAccLiabilities: `${id}_fieldAccLiabilities`,
         fieldAccEquity: `${id}_fieldAccEquity`,
         fieldAccIncome: `${id}_fieldAccIncome`,
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

      let getFieldOptions = (objID) => {
         let fields = [
            {
               id: 0,
               value: L("Select a Field"),
            },
         ];

         if (objID) {
            var entry = objectList.find((o) => o.id == objID);
            if (entry && entry.object) {
               entry.object.fields().forEach((f) => {
                  fields.push({ id: f.id, value: f.label, field: f });
               });
            }
         }
         return fields;
      };

      let getStatusFieldOptions = (statusFieldId) => {
         let result = [];
         let fpObject = this.AB.objectByID(this.objectFP);
         if (!fpObject) return result;

         let fpStatusField = fpObject.fieldByID(statusFieldId);
         if (
            !fpStatusField ||
            !fpStatusField.settings ||
            !fpStatusField.settings.options
         )
            return result;

         result = (fpStatusField.settings.options || []).map((opt) => {
            return {
               id: opt.id,
               value: opt.text,
            };
         });

         return result;
      };

      let updateFPFields = (fpFields) => {
         [ids.fieldFPStart, ids.fieldFPOpen, ids.fieldFPStatus].forEach(
            (fieldGLElem) => {
               $$(fieldGLElem).define("options", fpFields);
               $$(fieldGLElem).refresh();
            }
         );
      };

      let updateFPStatusFields = (fpStatusOptions) => {
         $$(ids.fieldFPActive).define("options", fpStatusOptions);
         $$(ids.fieldFPActive).refresh();
      };

      let updateGLFields = (glFields) => {
         [
            ids.fieldGLRunning,
            ids.fieldGLAccount,
            ids.fieldGLRc,
            ids.fieldGLDebit,
            ids.fieldGLCredit,
         ].forEach((fieldGLElem) => {
            $$(fieldGLElem).define("options", glFields);
            $$(fieldGLElem).refresh();
         });
      };

      let updateAccFields = (accFields) => {
         $$(ids.fieldAccType).define("options", accFields);
         $$(ids.fieldAccType).refresh();
      };

      let updateAccTypeOptions = (accTypeOptions) => {
         [
            ids.fieldAccAsset,
            ids.fieldAccExpense,
            ids.fieldAccLiabilities,
            ids.fieldAccEquity,
            ids.fieldAccIncome,
         ].forEach((fieldGLElem) => {
            $$(fieldGLElem).define("options", accTypeOptions);
            $$(fieldGLElem).refresh();
         });
      };

      let getListOptions = (objectId, fieldId) => {
         let result = [];
         let object = this.AB.objectByID(objectId);
         if (!object) return result;

         let fpStatusField = object.fieldByID(fieldId);
         if (
            !fpStatusField ||
            !fpStatusField.settings ||
            !fpStatusField.settings.options
         )
            return result;

         result = (fpStatusField.settings.options || []).map((opt) => {
            return {
               id: opt.id,
               value: opt.text,
            };
         });

         return result;
      };

      let fpFields = getFieldOptions(this.objectFP);
      let glFields = getFieldOptions(this.objectGL);
      let accFields = getFieldOptions(this.objectAcc);
      let fpStatusFields = getStatusFieldOptions(this.fieldFPStatus);
      let accTypeOptions = getListOptions(this.objectAcc, this.fieldAccType);

      var ui = {
         id: id,
         view: "form",
         elementsConfig: {
            labelWidth: 200,
         },
         elements: [
            {
               id: ids.name,
               view: "text",
               label: L("Name"),
               name: "name",
               value: this.name,
            },
            {
               id: ids.processFPValue,
               view: "select",
               label: L("Process Fiscal Period Value"),
               value: this.processFPValue,
               name: "processFPValue",
               options: processValues,
            },
            {
               id: ids.objectFP,
               view: "select",
               label: L("FP Object"),
               value: this.objectFP,
               name: "objectFP",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        // gather new set of batchFields
                        fpFields = getFieldOptions(newVal);
                        // rebuild the associated list of Fields to pick
                        updateFPFields(fpFields);
                     }
                  },
               },
            },
            {
               id: ids.objectGL,
               view: "select",
               label: L("GL Object"),
               value: this.objectGL,
               name: "objectGL",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        // gather new set of batchFields
                        glFields = getFieldOptions(newVal);
                        // rebuild the associated list of Fields to pick
                        updateGLFields(glFields);
                     }
                  },
               },
            },
            {
               id: ids.objectAcc,
               view: "select",
               label: L("Account Object"),
               value: this.objectAcc,
               name: "objectAcc",
               options: objectList,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        accFields = getFieldOptions(newVal);
                        updateAccFields(accFields);
                     }
                  },
               },
            },
            {
               id: ids.fieldFPStart,
               view: "select",
               label: L("FP -> Start"),
               value: this.fieldFPStart,
               name: "fieldFPStart",
               options: fpFields,
            },
            {
               id: ids.fieldFPOpen,
               view: "select",
               label: L("FP -> Open"),
               value: this.fieldFPOpen,
               name: "fieldFPOpen",
               options: fpFields,
            },
            {
               id: ids.fieldFPStatus,
               view: "select",
               label: L("FP -> Status"),
               value: this.fieldFPStatus,
               name: "fieldFPStatus",
               options: fpFields,
               on: {
                  onChange(newVal, oldVal) {
                     if (newVal != oldVal) {
                        fpStatusFields = getStatusFieldOptions(newVal);
                        updateFPStatusFields(fpStatusFields);
                     }
                  },
               },
            },
            {
               id: ids.fieldFPActive,
               view: "select",
               label: L("FP -> Active"),
               value: this.fieldFPActive,
               name: "fieldFPActive",
               options: fpStatusFields,
            },
            {
               id: ids.fieldGLStarting,
               view: "select",
               label: L("GL -> Starting BL"),
               value: this.fieldGLStarting,
               name: "fieldGLStarting",
               options: glFields,
            },
            {
               id: ids.fieldGLRunning,
               view: "select",
               label: L("GL -> Running BL"),
               value: this.fieldGLRunning,
               name: "fieldGLRunning",
               options: glFields,
            },
            {
               id: ids.fieldGLAccount,
               view: "select",
               label: L("GL -> Account"),
               value: this.fieldGLAccount,
               name: "fieldGLAccount",
               options: glFields,
            },
            {
               id: ids.fieldGLRc,
               view: "select",
               label: L("GL -> RC"),
               value: this.fieldGLRc,
               name: "fieldGLRc",
               options: glFields,
            },
            {
               id: ids.fieldGLDebit,
               view: "select",
               label: L("GL -> Debit"),
               value: this.fieldGLDebit,
               name: "fieldGLDebit",
               options: glFields,
            },
            {
               id: ids.fieldGLCredit,
               view: "select",
               label: L("GL -> Credit"),
               value: this.fieldGLCredit,
               name: "fieldGLCredit",
               options: glFields,
            },
            {
               id: ids.fieldAccType,
               view: "select",
               label: L("Acc -> Type"),
               value: this.fieldAccType,
               name: "fieldAccType",
               options: accFields,
               on: {
                  onChange: (newVal, oldVal) => {
                     if (newVal != oldVal) {
                        accTypeOptions = getListOptions(
                           this.objectAcc || $$(ids.objectAcc).getValue(),
                           newVal
                        );
                        updateAccTypeOptions(accTypeOptions);
                     }
                  },
               },
            },
            {
               id: ids.fieldAccAsset,
               view: "select",
               label: L("Acc -> Asset"),
               value: this.fieldAccAsset,
               name: "fieldAccAsset",
               options: accTypeOptions,
            },
            {
               id: ids.fieldAccExpense,
               view: "select",
               label: L("Acc -> Expense"),
               value: this.fieldAccExpense,
               name: "fieldAccExpense",
               options: accTypeOptions,
            },
            {
               id: ids.fieldAccLiabilities,
               view: "select",
               label: L("Acc -> Liabilities"),
               value: this.fieldAccLiabilities,
               name: "fieldAccLiabilities",
               options: accTypeOptions,
            },
            {
               id: ids.fieldAccEquity,
               view: "select",
               label: L("Acc -> Equity"),
               value: this.fieldAccEquity,
               name: "fieldAccEquity",
               options: accTypeOptions,
            },
            {
               id: ids.fieldAccIncome,
               view: "select",
               label: L("Acc -> Income"),
               value: this.fieldAccIncome,
               name: "fieldAccIncome",
               options: accTypeOptions,
            },
         ],
      };

      webix.ui(ui, $$(id));

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

      // TIP: keep the .settings entries == ids[s] keys and this will
      // remain simple:
      this.defaults.settings.forEach((s) => {
         this[s] = this.property(ids[s]);
      });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingFPClose_js.af5a93441e3ed687a962.js.map