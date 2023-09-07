"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldAutoIndex_js"],{

/***/ 97177:
/*!*******************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldAutoIndexCore.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldAutoIndexCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldAutoIndex
 *
 * An ABFieldAutoIndex defines a AutoIndex field type.
 *
 */



const ABFieldAutoIndexDefaults = {
   key: "AutoIndex",
   // unique key to reference this specific DataField

   description: "Auto Increment Value",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "key",
   // font-awesome icon reference.  (without the 'fa-').  so 'key'  to
   // reference 'fa-key'

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

   menuName: "Auto Index",
   // menuName: what gets displayed in the Editor drop list
   // NOTE: this will be displayed using a Label: L(menuName)

   supportRequire: false,
   // {bool}
   // does this ABField support the Required setting?

   supportUnique: false,
   // {bool}
   // does this ABField support the Unique setting?

   useAsLabel: true,
   // {bool} / {fn}
   // determines if this ABField can be used in the display of an ABObject's
   // label.

   compatibleOrmTypes: ["number"],
   // {array}
   // what types of Sails ORM attributes can be imported into this data type?
   // http://sailsjs.org/documentation/concepts/models-and-orm/attributes#?attribute-options

   compatibleMysqlTypes: ["tinyint", "smallint", "mediumint", "int", "integer"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php
};

// defaultValues: the keys must match a .name of your elements to set it's default value.
const defaultValues = {
   prefix: "",
   delimiter: "none",
   displayLength: 4,
   previewText: "0000",
};

class ABFieldAutoIndexCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldAutoIndexDefaults);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldAutoIndexDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   static getDelimiterSign(text) {
      const delimiterItem = this.delimiterList().filter((item) => {
         return item.id == text;
      })[0];

      return delimiterItem ? delimiterItem.sign : "";
   }

   static delimiterList() {
      let L = this.AB.Label();
      return [
         { id: "none", value: L("None"), sign: "" },
         { id: "comma", value: L("Comma"), sign: ", " },
         { id: "slash", value: L("Slash"), sign: "/" },
         { id: "space", value: L("Space"), sign: " " },
         { id: "dash", value: L("Dash"), sign: "-" },
         { id: "colon", value: L("Colon"), sign: ":" },
      ];
   }

   static setValueToIndex(prefix, delimiter, displayLength, displayNumber) {
      const resultIndex =
         prefix +
         this.getDelimiterSign(delimiter) +
         ("0000000000" + displayNumber).slice(-parseInt(displayLength));

      return resultIndex;
   }

   fromValues(values) {
      super.fromValues(values);

      // text to Int:
      this.settings.displayLength = parseInt(this.settings.displayLength);
   }

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      // Remove every values, then we will use AUTO_INCREMENT of MySQL
      delete values[this.columnName];
   }

   format(rowData) {
      if (!rowData?.[this.columnName]) return "";

      try {
         const resultAutoIndex = this.constructor.setValueToIndex(
            this.settings.prefix,
            this.settings.delimiter,
            this.settings.displayLength,
            rowData[this.columnName]
         );

         return resultAutoIndex;
      } catch (err) {
         return "";
      }
   }
}


/***/ }),

/***/ 99341:
/*!*******************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldAutoIndex.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldAutoIndex)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldAutoIndexCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldAutoIndexCore */ 97177);


class ABFieldAutoIndex extends _core_dataFields_ABFieldAutoIndexCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(values, object) {
   //    super(values, object);
   // }

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

   // return the grid column header definition for this instance of ABFieldAutoIndex
   columnHeader(options) {
      const config = super.columnHeader(options);

      config.editor = null; // read only
      config.css = "textCell";
      config.template = (rowData) => {
         // if this isn't part of a group header display the default format
         if (!rowData.$group) {
            return this.format(rowData);
         } else {
            return "";
         }
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
      return super.formComponent("fieldreadonly");
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
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldAutoIndex_js.d908e7050bdddd914ff7.js.map