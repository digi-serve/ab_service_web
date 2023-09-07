"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldLongText_js"],{

/***/ 78557:
/*!******************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldLongTextCore.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldLongText)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldLongText
 *
 * An ABFieldLongText defines a LongText field type.
 *
 */



const MAX_CHAR_LENGTH = 5000;

function L(key, altText) {
   // TODO:
   return altText; // AD.lang.label.getLabel(key) || altText;
}

const ABFieldLongTextDefaults = {
   key: "LongText", // unique key to reference this specific DataField

   description: "Multiple lines of text",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "align-right",
   // font-awesome icon reference.  (without the 'fa-').  so 'align-right'  to
   // reference 'fa-align-right'

   isFilterable: true,
   // {bool} / {fn}
   // determines if the current ABField can be used to filter (FilterComplex
   // or Query) data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => field.setting.something == true

   isSortable: false,
   // {bool} / {fn}
   // determines if the current ABField can be used to Sort data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => true/false

   menuName: "Long text",
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

   compatibleOrmTypes: ["longtext", "mediumtext", "text"],
   // {array}
   // what types of Sails ORM attributes can be imported into this data type?
   // http://sailsjs.org/documentation/concepts/models-and-orm/attributes#?attribute-options

   compatibleMysqlTypes: ["text", "mediumtext", "longtext"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php

   MAX_CHAR_LENGTH,
   // {integer}
   // The maximum length our ABFieldLongText can be.
};

// defaultValues: the keys must match a .name of your elements to set it's default value.
const defaultValues = {
   default: "",
   supportMultilingual: 0,
};

class ABFieldLongText extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldLongTextDefaults);

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
      return ABFieldLongTextDefaults;
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

      this.settings.default = values.settings.default || "";

      // we're responsible for setting up our specific settings:
      this.settings.supportMultilingual =
         values.settings.supportMultilingual + "" ||
         defaultValues.supportMultilingual;

      // text to Int:
      this.settings.supportMultilingual = parseInt(
         this.settings.supportMultilingual
      );

      if (this.settings.supportMultilingual) {
         if (this.object)
            this.object.translate(this.settings, this.settings, ["default"]);
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

      if (this.settings.supportMultilingual)
         if (this.object)
            this.object.unTranslate(obj.settings, obj.settings, ["default"]);
         else obj.settings.default = this.settings.default;

      return obj;
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
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      if (values[this.columnName] == null) {
         if (typeof this.settings.default == "string") {
            values[this.columnName] = this.settings.default;
         } else {
            values[this.columnName] = "";
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

      if (
         data &&
         data[this.columnName] &&
         data[this.columnName].length > MAX_CHAR_LENGTH
      ) {
         validator.addError(
            this.columnName,
            `should NOT be longer than ${MAX_CHAR_LENGTH} characters`
         );
      }
   }
}


/***/ }),

/***/ 33482:
/*!******************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldLongText.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldLongText)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldLongTextCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldLongTextCore */ 78557);


class ABFieldLongText extends _core_dataFields_ABFieldLongTextCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object);

      /*
		{
			settings: {
				default: 'string',
				supportMultilingual: 1/0
			}
		}
		*/
   }

   ///
   /// Instance Methods
   ///

   isValid() {
      const validator = super.isValid();

      // validator.addError('columnName', L('ab.validation.object.name.unique', 'Field columnName must be unique (#name# already used in this Application)').replace('#name#', this.name) );

      return validator;
   }

   ///
   /// Working with Actual Object Values:
   ///

   // return the grid column header definition for this instance of ABFieldLongText
   columnHeader(options) {
      const config = super.columnHeader(options);

      config.editor = "text"; // '[edit_type]'   for your unique situation
      // config.sort = 'string' // '[sort_type]'   for your unique situation
      config.template = (obj, common, value, col, ind) => {
         return (value || "").toString().replace(/[<]/g, "&lt;");
      };

      return config;
   }

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
            key: "textbox",
            settings: {
               type: "multiple",
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
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldLongText_js.1c34939abafdf19c4d20.js.map