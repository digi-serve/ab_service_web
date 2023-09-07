"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldList_js"],{

/***/ 75124:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldListCore.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldListCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldListCore
 *
 * An ABFieldList defines a select list field type.
 *
 */

// const ABFieldSelectivity = require("../../platform/dataFields/ABFieldSelectivity");


const ABFieldListDefaults = {
   key: "list",
   // unique key to reference this specific DataField

   description:
      "Select list allows you to select predefined options below from a dropdown.",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "th-list",
   // font-awesome icon reference.  (without the 'fa-').  so 'th-list'  to
   // reference 'fa-th-list'

   isFilterable: (field) => {
      if (field.settings.isMultiple) {
         return false;
      } else {
         return true;
      }
   },
   // {bool} / {fn}
   // determines if the current ABField can be used to filter (FilterComplex
   // or Query) data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => field.setting.something == true

   isSortable: (field) => {
      if (field.settings.isMultiple) {
         return false;
      } else {
         return true;
      }
   },
   // {bool} / {fn}
   // determines if the current ABField can be used to Sort data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => true/false

   menuName: "Select list",
   // menuName: what gets displayed in the Editor drop list
   // NOTE: this will be displayed using a Label: L(menuName)

   supportRequire: true,
   // {bool}
   // does this ABField support the Required setting?

   supportUnique: false,
   // {bool}
   // does this ABField support the Unique setting?

   useAsLabel: true,
   // {bool} / {fn}
   // determines if this ABField can be used in the display of an ABObject's
   // label.

   compatibleOrmTypes: ["string"],
   // {array}
   // what types of Sails ORM attributes can be imported into this data type?
   // http://sailsjs.org/documentation/concepts/models-and-orm/attributes#?attribute-options

   compatibleMysqlTypes: [
      "char",
      "varchar",
      "tinytext" /* "text", "mediumtext" */,
   ],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php

   hasColors: (field) => {
      if (field.settings.hasColors) {
         return true;
      } else {
         return false;
      }
   },
};

const defaultValues = {
   isMultiple: 0,
   // {bool}
   // can multiple values be selected?

   hasColors: 0,
   // {bool}
   // are we to display our values in colors?

   options: [],
   // {array}
   // The options defined for this list:
   // [ { id, text, hex, translations },...]
   //    .id {string} a unique id for this value
   //    .text {string} the displayed text of this value
   //    .hex {string} a color hex definition for this value
   //    .translations {obj} the multilingual definitions for this value.

   default: "none",
   multipleDefault: [],
};

class ABFieldListCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldListDefaults);

      this.pendingDeletions = [];
      // {array}
      // a list of pending option deletions that need to be processed
      // when this is saved.
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldListDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   ///
   /// Instance Methods
   ///

   /**
    * @method fromValues()
    *
    * initialze this object with the given set of values.
    * @param {obj} values
    */
   fromValues(values) {
      super.fromValues(values);

      // translate options list
      if (this.settings.options && this.settings.options.length > 0) {
         this.settings.options.forEach((opt) => {
            this.translate(opt, opt, ["text"]);
         });
      }

      this.settings.isMultiple = parseInt(this.settings.isMultiple);
      this.settings.hasColors = parseInt(this.settings.hasColors);
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
      const obj = super.toObj();

      // Un-translate options list
      obj.settings.options.forEach((opt) => {
         this.unTranslate(opt, opt, ["text"]);
      });

      return obj;
   }

   ///
   /// Working with Actual Object Values:
   ///

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      // Multiple select list
      if (this.settings.isMultiple == true) {
         let defaultVals = [];
         this.settings.multipleDefault.forEach((def) => {
            this.settings.options.forEach((opt) => {
               if (opt.id == def.text) {
                  defaultVals.push(opt);
               }
            });
         });
         values[this.columnName] = defaultVals || [];
      }
      // Single select list
      else if (this.settings.default && this.settings.default != "") {
         values[this.columnName] = this.settings.default;
      }
   }

   /**
    * @method isValidData
    * Parse through the given data and return an error if this field's
    * data seems invalid.
    * @param {obj} data  a key=>value hash of the inputs to parse.
    * @param {OPValidator} validator  provided Validator fn
    * @return {array}
    */
   isValidData(data, validator) {
      super.isValidData(data, validator);
   }

   /**
    * @method options
    * Return an array of [{ id, text }] options defined by this field.
    * @return {array}
    */
   options() {
      return this.settings.options.map((opt) => {
         return {
            id: opt.id,
            text: opt.text,
            hex: opt.hex ? opt.hex : "",
            translations: opt.translations ? opt.translations : "",
         };
      });
   }

   format(rowData, options = {}) {
      let val = this.dataValue(rowData) || [];

      if (typeof val == "string") {
         try {
            val = JSON.parse(val);
         } catch (e) {
            // continue regardless of error
         }
      }

      // Convert to array
      if (!Array.isArray(val)) val = [val];

      const displayOpts = this.settings.options
         .filter((opt) => val.filter((v) => (v.id || v) == opt.id).length > 0)
         .map((opt) => {
            let text = opt.text;
            const languageCode = options.languageCode || "en";

            // Pull text of option with specify language code
            const optTran = (opt.translations || []).filter(
               (o) => o.language_code == languageCode
            )[0];
            if (optTran) text = optTran.text;

            return text;
         });

      return displayOpts.join(", ");
   }
}


/***/ }),

/***/ 23122:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldList.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldList)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldListCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldListCore */ 75124);


class ABFieldList extends _core_dataFields_ABFieldListCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object);

      // this._Selectivity = new ABFieldSelectivity(values, object);
   }

   ///
   /// Instance Methods
   ///

   save() {
      return super.save().then(() => {
         // Now we want to clear out any entries that had values == to item removed from our list:
         if (this.pendingDeletions.length) {
            const model = this.object.model();

            if (this.settings.isMultiple == true) {
               // find all the entries that have one of the deleted values:
               // use Promise to prevent issues with data being loaded before it is deleted on client side
               return new Promise((resolve, reject) => {
                  let numDone = 0;
                  let numToDo = 0;

                  model
                     .findAll({})
                     .then((list) => {
                        list = list.data || list;

                        // for each list item
                        list.forEach((item) => {
                           if (Array.isArray(item[this.columnName])) {
                              // get fields not in pendingDeletions
                              let remainingFields = item[
                                 this.columnName
                              ].filter((i) => {
                                 return (
                                    this.pendingDeletions.indexOf(i.id) == -1
                                 );
                              });

                              if (
                                 remainingFields.length !=
                                 item[this.columnName].length
                              ) {
                                 numToDo++;

                                 // update value to new field list
                                 if (remainingFields.length == 0) {
                                    remainingFields = "";
                                 }
                                 const value = {};
                                 value[this.columnName] = remainingFields;
                                 model.update(item.id, value).then(() => {
                                    // if ($$(node) && $$(node).updateItem)
                                    //    $$(node).updateItem(value.id, value);
                                    numDone++;
                                    if (numDone >= numToDo) {
                                       resolve();
                                    }
                                 });
                              }
                           }
                        });
                        if (numToDo == 0) {
                           resolve();
                        }
                     })
                     .catch(reject);
               });
            } else {
               // find all the entries that have one of the deleted values:
               const where = {};
               where[this.columnName] = this.pendingDeletions;
               return new Promise((resolve, reject) => {
                  let numDone = 0;

                  model
                     .findAll(where)
                     .then((list) => {
                        // make sure we just work with the { data:[] } that was returned
                        list = list.data || list;

                        // for each one, set the value to ''
                        // NOTE: jQuery ajax routines filter out null values, so we can't
                        // set them to null. :(
                        // const numDone = 0;
                        const value = {};
                        value[this.columnName] = "";

                        list.forEach((item) => {
                           model.update(item.id, value).then(() => {
                              numDone++;
                              if (numDone >= list.length) {
                                 resolve();
                              }
                           });
                        });
                        if (list.length == 0) {
                           resolve();
                        }
                     })
                     .catch(reject);
               });
            }
         }
      });
   }

   isValid() {
      const validator = super.isValid();

      // validator.addError('columnName', L('ab.validation.object.name.unique', 'Field columnName must be unique (#name# already used in this Application)').replace('#name#', this.name) );

      return validator;
   }

   ///
   /// Working with Actual Object Values:
   ///

   // return the grid column header definition for this instance of ABFieldList
   columnHeader(options) {
      options = options || {};
      var L = this.AB.Label();

      const config = super.columnHeader(options);
      const field = this;
      const App = field.AB._App;

      var formClass = "";
      var placeHolder = "";
      if (options.editable) {
         formClass = " form-entry";
         placeHolder = `<span style='color: #CCC; padding: 0 5px;'>${L(
            "Select item"
         )}</span>`;
      }
      var isRemovable = options.editable && !this.settings.required;

      config.editFormat = (value) => {
         return this.editFormat(value);
      };
      config.editParse = (value) => {
         return this.editParse(value);
      };

      config.template = (rowData) => {
         let selectedData = rowData[this.columnName];
         if (selectedData == null) return "";
         if (this.settings.isMultiple) {
            selectedData = _getSelectedOptions(this, rowData);
         }
         var values = [];
         values.push('<div class="badgeContainer">');
         let hasCustomColor = "";
         let optionHex = "";
         if (
            selectedData &&
            Array.isArray(selectedData) &&
            selectedData.length
         ) {
            selectedData.forEach((val) => {
               if (this.settings.hasColors && val.hex) {
                  hasCustomColor = "hascustomcolor";
                  optionHex = `background: ${val.hex};`;
               }
               if (val.text) {
                  values.push(
                     `<div style="${optionHex}" class='webix_multicombo_value ${hasCustomColor}'><span>${val.text}</span><!-- span data-uuid="${val.id}" class="webix_multicombo_delete" role="button" aria-label="Remove item"></span --></div>`
                  );
               }
            });
            if (selectedData.length > 1) {
               values.push(
                  `<span class="webix_badge selectivityBadge">${selectedData.length}</span>`
               );
            }
         } else if (selectedData) {
            let selectedObj = selectedData;
            if (typeof selectedData == "string") {
               selectedObj = this.getItemFromVal(selectedData);
            }
            if (!selectedObj) return "";
            if (this.settings.hasColors && selectedObj.hex) {
               hasCustomColor = "hascustomcolor";
               optionHex = `background: ${selectedObj.hex};`;
            }
            if (selectedObj.text) {
               let clear = "";
               if (options.editable && !this.settings.required) {
                  clear = `<span class="webix_multicombo_delete clear-combo-value" role="button" aria-label="Remove item"></span>`;
               }
               values.push(
                  `<div style="${optionHex}" class='webix_multicombo_value ${hasCustomColor}'>${clear}<span class="ellip">${selectedObj.text}</span></div>`
               );
            }
         } else {
            return "";
         }
         values.push("</div>");
         return values.join("");
      };
      config.editor = this.settings.isMultiple ? "multiselect" : "combo";
      config.suggest = {
         button: true,
         data: this.settings.options.map(function (opt) {
            return {
               id: opt.id,
               value: opt.text,
               hex: opt.hex,
            };
         }),
      };
      if (this.settings.isMultiple) {
         config.suggest.view = "checksuggest";
      }

      return config;
   }

   /*
    * @function customDisplay
    * perform any custom display modifications for this field.
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *             unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   customDisplay(row, App, node, options) {
      // sanity check.
      if (!node) {
         return;
      }

      options = options || {};

      if (!node.querySelector) return;

      var clearButton = node.querySelector(
         ".selectivity-single-selected-item-remove"
      );
      if (clearButton) {
         clearButton.addEventListener("click", (e) => {
            e.stopPropagation();
            var values = {};
            values[this.columnName] = "";
            this.object
               .model()
               .update(row.id, values)
               .then(() => {
                  // update the client side data object as well so other data changes won't cause this save to be reverted
                  $$(node)?.updateItem?.(row.id, values);
               })
               .catch((err) => {
                  node.classList.add("webix_invalid");
                  node.classList.add("webix_invalid_cell");

                  this.AB.notify.developer(err, {
                     message: "Error updating our entry.",
                     row: row,
                     values: "",
                     field: this.toObj(),
                  });
               });
         });
      }
   }

   /*
    * @function customEdit
    *
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *             unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   // customEdit(row, App, node) {
   //    return super.customEdit(row, App, node);
   // }

   /*
    * @funciton formComponent
    * returns a drag and droppable component that is used on the UI
    * interface builder to place form components related to this ABField.
    *
    * an ABField defines which form component is used to edit it's contents.
    * However, what is returned here, needs to be able to create an instance of
    * the component that will be stored with the ABViewForm.
    */
   formComponent() {
      // NOTE: what is being returned here needs to mimic an ABView CLASS.
      // primarily the .common() and .newInstance() methods.
      const formComponentSetting = super.formComponent();

      // .common() is used to create the display in the list
      formComponentSetting.common = () => {
         return {
            key: this.settings.isMultiple ? "selectmultiple" : "selectsingle",
            settings: {
               options: this.settings.options.map(function (opt) {
                  return {
                     id: opt.id,
                     value: opt.text,
                     hex: opt.hex,
                  };
               }),
            },
         };
      };

      return formComponentSetting;
   }

   detailComponent() {
      const detailComponentSetting = super.detailComponent();

      detailComponentSetting.common = () => {
         return {
            key: this.settings.isMultiple ? "detailtext" : "detailtext",
         };
      };

      return detailComponentSetting;
   }

   editFormat(value) {
      if (!value) return "";
      let vals = [];
      if (Array.isArray(value)) {
         value.forEach((val) => {
            if (typeof val == "object") {
               vals.push(val.id);
            } else {
               let itemObj = this.getItemFromVal(val);
               vals.push(itemObj.id);
            }
         });
      } else {
         if (typeof value == "object") {
            vals.push(value.id);
         } else {
            let itemObj = this.getItemFromVal(value);
            if (itemObj && itemObj.id) {
               vals.push(itemObj.id);
            }
         }
      }
      return vals.join();
   }

   editParse(value) {
      if (this.settings.isMultiple) {
         let returnVals = [];
         let vals = value.split(",");
         vals.forEach((val) => {
            returnVals.push(this.getItemFromVal(val));
         });
         return returnVals;
      } else {
         return value;
      }
   }

   getItemFromVal(val) {
      let item;
      let options = this.options();
      if (options.length > 1) {
         options.forEach((option) => {
            if (option.id == val) {
               item = option;
               return false;
            }
         });
         return item;
      } else {
         return "";
      }
   }

   getValue(item, rowData) {
      return this.editParse(item.getValue());
   }

   getSelectedOptions(field, rowData = {}) {
      let result = [];
      if (rowData[this.columnName] != null) {
         result = rowData[this.columnName];
      } else if (rowData) {
         if (Array.isArray(rowData)) {
            result = rowData;
         } else {
            result.push(rowData);
         }
      }
      if (result.length) {
         if (typeof result == "string") result = JSON.parse(result);

         // Pull text with current language
         if (this.settings) {
            result = (this.settings.options || []).filter((opt) => {
               return (
                  (result || []).filter((v) => (opt.id || opt) == (v.id || v))
                     .length > 0
               );
            });
         }
      }

      return result;
   }

   setValue(item, rowData) {
      if (!item) return;

      if (this.settings.isMultiple) {
         // do we need anything here?
      } else {
         super.setValue(item, rowData);
      }
   }
}

// == Private methods ==
function _getSelectedOptions(field, rowData = {}) {
   let result = [];
   if (rowData[field.columnName] != null) {
      result = rowData[field.columnName];

      if (typeof result == "string") result = JSON.parse(result);

      // Pull text with current language
      if (field.settings) {
         result = (field.settings.options || []).filter((opt) => {
            return (
               (result || []).filter((v) => (opt.id || opt) == (v.id || v))
                  .length > 0
            );
         });
      }
   }

   return result;
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldList_js.6f34fdb8877773fe4632.js.map