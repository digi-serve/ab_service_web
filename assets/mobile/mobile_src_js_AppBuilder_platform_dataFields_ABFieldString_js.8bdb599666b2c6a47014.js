"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldString_js"],{

/***/ 44955:
/*!****************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldStringCore.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldStringCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldString
 *
 * An ABFieldString defines a string field type.
 *
 */



const MAX_CHAR_LENGTH = 255;

const ABFieldStringDefaults = {
   key: "string",
   // unique key to reference this specific DataField

   description: "short string value",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "font",
   // font-awesome icon reference.  (without the 'fa-').  so 'font'  to
   // reference 'fa-font'

   isFilterable: true,
   // {bool} / {fn}
   // determines if the current ABField can be used to filter (FilterComplex
   // or Query) data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => field.setting.something == true

   isSortable: true,
   // {bool} / {fn}
   // determines if the current ABField can be used to Sort data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => true/false

   menuName: "Single line text",
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

   compatibleMysqlTypes: ["char", "varchar", "tinytext"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php

   MAX_CHAR_LENGTH,
   // {integer}
   // The maximum length our ABFieldString can be.
};

const defaultValues = {
   default: "",
   supportMultilingual: 0,
};

class ABFieldStringCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldStringDefaults);

      /*
    	{
			settings: {
				default: 'string',
				supportMultilingual: 1/0
			}
    	}
        */
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldStringDefaults;
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

      // we're responsible for setting up our specific settings:
      this.settings.default = values.settings.default || defaultValues.default;
      this.settings.supportMultilingual =
         values.settings.supportMultilingual + "" ||
         defaultValues.supportMultilingual;

      // text to Int:
      this.settings.supportMultilingual = parseInt(
         this.settings.supportMultilingual
      );

      if (this.settings.supportMultilingual) {
         this.translate(this.settings, this.settings, ["default"]);
      } else this.settings.default = values.settings.default || "";
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

      if (this.settings.supportMultilingual) {
         this.unTranslate(obj.settings, obj.settings, ["default"]);
      } else obj.settings.default = this.settings.default;

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
      // if no default value is set, then don't insert a value.
      if (!values[this.columnName]) {
         // Set default string
         if (this.settings.default) {
            if (this.settings.default.indexOf("{uuid}") >= 0) {
               values[this.columnName] = this.AB.uuid();
            } else {
               values[this.columnName] = this.settings.default;
            }
         }
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

      const L = this.AB.Label();

      if (
         data &&
         data[this.columnName] &&
         data[this.columnName].length > MAX_CHAR_LENGTH
      ) {
         validator.addError(
            this.columnName,
            L("should NOT be longer than {0} characters", [MAX_CHAR_LENGTH])
         );
      }
   }

   /*
    * @property isMultilingual
    * does this field represent multilingual data?
    * @return {bool}
    */
   get isMultilingual() {
      return this.settings.supportMultilingual == 1;
   }
}


/***/ }),

/***/ 56675:
/*!****************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldString.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldString)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldStringCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldStringCore */ 44955);


class ABFieldString extends _core_dataFields_ABFieldStringCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(values, object) {
   //    super(values, object);

   // {
   //   settings: {
   // 	  default: 'string',
   // 	  supportMultilingual: 1/0
   //   }
   // }

   // }

   ///
   /// Working with Actual Object Values:
   ///

   // return the grid column header definition for this instance of ABFieldString
   columnHeader(options) {
      const config = super.columnHeader(options);

      config.editor = "text";
      config.css = "textCell";
      // config.sort   = 'string'
      config.template = (obj, common, value /* , col, ind */) => {
         // if this isn't part of a group header display the default format
         if (!obj.$group) {
            return (value || "").toString().replace(/[<]/g, "&lt;");
         } else {
            return "";
         }
      };

      return config;
   }

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      // if no default value is set, then don't insert a value.
      if (!values[this.columnName]) {
         // Set default string
         if (this.settings.default) {
            if (this.settings.default.indexOf("{uuid}") >= 0) {
               values[this.columnName] = this.AB.uuid();
            } else {
               values[this.columnName] = this.settings.default;
            }
         }
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

      if (data && data[this.columnName]) {
         const max_length = this.constructor.defaults().MAX_CHAR_LENGTH;

         if (data[this.columnName].length > max_length) {
            const L = this.AB.Label();
            validator.addError(
               this.columnName,
               L("should NOT be longer than {0} characters", [max_length])
            );
         }
      }
   }

   /*
    * @property isMultilingual
    * does this field represent multilingual data?
    * @return {bool}
    */
   get isMultilingual() {
      return this.settings.supportMultilingual == 1;
   }

   /**
    * @method formComponent
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
            key: "textbox",
            settings: {
               type: "single",
            },
         };
      };

      return formComponentSetting;
   }

   detailComponent() {
      const detailComponentSetting = super.detailComponent();

      detailComponentSetting.common = () => {
         return {
            key: "detailtext",
         };
      };

      return detailComponentSetting;
   }

   /**
    * @method setValue
    * this function uses for form component and mass update popup
    * to get value of fields that apply custom editor
    *
    * @param {Object} item - Webix element
    * @param {Object} rowData - data of row
    *
    * @return {Object}
    */
   setValue(item, rowData) {
      super.setValue(item, rowData, "");
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldString_js.8bdb599666b2c6a47014.js.map