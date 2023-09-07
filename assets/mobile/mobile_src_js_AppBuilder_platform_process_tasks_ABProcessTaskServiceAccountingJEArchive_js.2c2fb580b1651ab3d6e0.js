"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingJEArchive_js"],{

/***/ 96974:
/*!*********************************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceAccountingJEArchiveCore.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingJEArchiveCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


let AccountingJEArchiveDefaults = {
   category: null,
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "archive", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "AccountingJEArchive",
   // key: {string}
   // unique key to reference this specific Task

   settings: [
      "processBatchValue",
      "objectBatch",
      "objectBalance",
      "objectJE",
      "objectJEArchive",

      "fieldBatchFiscalMonth",
      "fieldJeAccount",
      "fieldJeRC",
      "fieldJeArchiveBalance",
      "fieldBrFiscalMonth",
      "fieldBrAccount",
      "fieldBrRC",
      "fieldsMatch",
   ],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class AccountingJEArchiveCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type =
         attributes.type || "process.task.service.accounting.jeArchive";
      super(attributes, process, AB, AccountingJEArchiveDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return AccountingJEArchiveDefaults;
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

/***/ 87512:
/*!*********************************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskServiceAccountingJEArchive.js ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AccountingJEArchive)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceAccountingJEArchiveCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceAccountingJEArchiveCore.js */ 96974);


class AccountingJEArchive extends _core_process_tasks_ABProcessTaskServiceAccountingJEArchiveCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   ////
   //// Process Instance Methods
   ////

   propertyIDs(id) {
      return {
         name: `${id}_name`,
         processBatchValue: `${id}_processBatchValue`,
         objectBatch: `${id}_objectBatch`,
         objectBalance: `${id}_objectBalance`,
         objectJE: `${id}_objectJE`,
         objectJEArchive: `${id}_objectJEArchive`,

         fieldBatchFiscalMonth: `${id}_fieldBatchFiscalMonth`,
         fieldJeAccount: `${id}_fieldJeAccount`,
         fieldJeRC: `${id}_fieldJeRC`,
         fieldJeArchiveBalance: `${id}_fieldJeArchiveBalance`,
         fieldBrFiscalMonth: `${id}_fieldBrFiscalMonth`,
         fieldBrAccount: `${id}_fieldBrAccount`,
         fieldBrRC: `${id}_fieldBrRC`,

         fieldsMatch: `${id}_fieldsMatch`,
      };
   }

   /**
    * propertiesShow()
    * display the properties panel for this Process Element.
    * @param {string} id
    *        the webix $$(id) of the properties panel area.
    */
   propertiesShow(id) {
      let ids = this.propertyIDs(id);
      var L = this.AB.Label();

      let processValues = [{ id: 0, value: L("Select a Process Value") }];
      let processDataFields = this.process.processDataFields(this);
      (processDataFields || []).forEach((row) => {
         processValues.push({ id: row.key, value: row.label });
      });

      let objectList = this.AB.objects().map((o) => {
         return { id: o.id, value: o.label || o.name, object: o };
      });

      objectList.unshift({
         id: 0,
         value: L("Select an Object"),
      });

      let getConnectFieldOptions = (objectId) => {
         let object = this.AB.objectByID(objectId);
         if (!object) return [];

         let options = object
            .fields((f) => f.isConnection)
            .map((f) => {
               return {
                  id: f.id,
                  value: f.label,
               };
            });

         options.unshift({
            id: 0,
            value: L("Select a Field"),
         });

         return options;
      };

      let updateFields = (fieldPickers, fieldValues) => {
         fieldPickers.forEach((fp) => {
            var picker = $$(fp);
            if (picker) {
               picker.define("options", fieldValues);
               picker.refresh();
               picker.show();
            }
         });
      };

      let refreshBatchFields = (objectId) => {
         let options = getConnectFieldOptions(objectId);
         updateFields([ids.fieldBatchFiscalMonth], options);
      };

      let refreshBRFields = (objectId) => {
         let options = getConnectFieldOptions(objectId);
         updateFields(
            [ids.fieldBrAccount, ids.fieldBrFiscalMonth, ids.fieldBrRC],
            options
         );
      };

      let refreshJeFields = (objectId) => {
         let options = getConnectFieldOptions(objectId);
         updateFields([ids.fieldJeAccount, ids.fieldJeRC], options);
      };

      let refreshJeArchiveFields = (objectId) => {
         let options = getConnectFieldOptions(objectId);
         updateFields([ids.fieldJeArchiveBalance], options);
      };

      let refreshFieldsMatch = () => {
         let $fieldsMatch = $$(ids.fieldsMatch);
         if (!$fieldsMatch) return;

         // clear form
         webix.ui([], $fieldsMatch);

         let JEObj = this.AB.objectByID(this.objectJE);
         if (!JEObj) return;

         let JEArchiveObj = this.AB.objectByID(this.objectJEArchive);
         if (!JEArchiveObj) return;

         // create JE acrhive field options to the form
         JEArchiveObj.fields().forEach((f) => {
            let jeFields = [];

            if (f.isConnection) {
               jeFields = JEObj.fields((fJe) => {
                  return (
                     fJe.isConnection &&
                     fJe.settings &&
                     f.settings &&
                     fJe.settings.linkObject == f.settings.linkObject &&
                     fJe.settings.linkType == f.settings.linkType &&
                     fJe.settings.linkViaType == f.settings.linkViaType &&
                     fJe.settings.isCustomFK == f.settings.isCustomFK
                  );
               });
            } else {
               jeFields = JEObj.fields((fJe) => fJe.key == f.key);
            }

            jeFields = jeFields.map((fJe) => {
               return {
                  id: fJe.id,
                  value: fJe.label,
               };
            });

            $fieldsMatch.addView({
               view: "select",
               name: f.id,
               label: f.label,
               options: jeFields,
            });
         });

         $fieldsMatch.setValues(this.fieldsMatch || {});
      };

      let fieldBatchList = getConnectFieldOptions(this.objectBatch);
      let fieldBalanceList = getConnectFieldOptions(this.objectBalance);
      let fieldJeList = getConnectFieldOptions(this.objectJE);
      let fieldJeArchiveList = getConnectFieldOptions(this.objectJEArchive);

      let ui = {
         id: id,
         view: "form",
         elementsConfig: {
            labelWidth: 180,
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
                  onChange: (newVal) => {
                     this.objectBatch = newVal;
                     refreshBatchFields(newVal);
                  },
               },
            },
            {
               id: ids.fieldBatchFiscalMonth,
               view: "select",
               label: L("Batch -> Fiscal Month"),
               value: this.fieldBatchFiscalMonth,
               name: "fieldBatchFiscalMonth",
               options: fieldBatchList,
            },
            {
               id: ids.objectBalance,
               view: "select",
               label: L("BR Object"),
               value: this.objectBalance,
               name: "objectBalance",
               options: objectList,
               on: {
                  onChange: (newVal) => {
                     this.objectBalance = newVal;
                     refreshBRFields(newVal);
                  },
               },
            },
            {
               id: ids.fieldBrFiscalMonth,
               view: "select",
               label: L("BR -> Fiscal Month"),
               value: this.fieldBrFiscalMonth,
               name: "fieldBrFiscalMonth",
               options: fieldBalanceList,
            },
            {
               id: ids.fieldBrAccount,
               view: "select",
               label: L("BR -> Account"),
               value: this.fieldBrAccount,
               name: "fieldBrAccount",
               options: fieldBalanceList,
            },
            {
               id: ids.fieldBrRC,
               view: "select",
               label: L("BR -> RC"),
               value: this.fieldBrRC,
               name: "fieldBrRC",
               options: fieldBalanceList,
            },
            {
               id: ids.objectJE,
               view: "select",
               label: L("JE Object"),
               value: this.objectJE,
               name: "objectJE",
               options: objectList,
               on: {
                  onChange: (newVal) => {
                     this.objectJE = newVal;
                     refreshJeFields(newVal);
                     refreshFieldsMatch();
                  },
               },
            },
            {
               id: ids.fieldJeAccount,
               view: "select",
               label: L("JE -> Account"),
               value: this.fieldJeAccount,
               name: "fieldJeAccount",
               options: fieldJeList,
            },
            {
               id: ids.fieldJeRC,
               view: "select",
               label: L("JE -> RC"),
               value: this.fieldJeRC,
               name: "fieldJeRC",
               options: fieldJeList,
            },
            {
               id: ids.objectJEArchive,
               view: "select",
               label: L("JE Archive Object"),
               value: this.objectJEArchive,
               name: "objectJEArchive",
               options: objectList,
               on: {
                  onChange: (newVal) => {
                     this.objectJEArchive = newVal;
                     refreshJeArchiveFields(newVal);
                     refreshFieldsMatch();
                  },
               },
            },
            {
               id: ids.fieldJeArchiveBalance,
               view: "select",
               label: L("JE Archive -> BR"),
               value: this.fieldJeArchiveBalance,
               name: "fieldJeArchiveBalance",
               options: fieldJeArchiveList,
            },
            {
               view: "fieldset",
               label: "Fields Matching",
               body: {
                  id: ids.fieldsMatch,
                  view: "form",
                  borderless: true,
                  elements: [],
               },
            },
         ],
      };

      webix.ui(ui, $$(id));

      $$(id).show();

      refreshFieldsMatch();
   }

   /**
    * propertiesStash()
    * pull our values from our property panel.
    * @param {string} id
    *        the webix $$(id) of the properties panel area.
    */
   propertiesStash(id) {
      let ids = this.propertyIDs(id);
      this.name = this.property(ids.name);

      // TIP: keep the .settings entries == ids[s] keys and this will
      // remain simple:
      this.defaults.settings.forEach((s) => {
         if (s === "fieldsMatch") {
            this[s] = $$(ids.fieldsMatch).getValues();
         } else {
            this[s] = this.property(ids[s]);
         }
      });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceAccountingJEArchive_js.2c2fb580b1651ab3d6e0.js.map