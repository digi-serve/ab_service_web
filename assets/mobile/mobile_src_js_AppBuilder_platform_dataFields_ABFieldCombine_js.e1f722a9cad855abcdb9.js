"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldCombine_js"],{

/***/ 84898:
/*!*****************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldCombineCore.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldCombineCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldCombine
 *
 * An ABFieldCombine defines a combined field type.
 *
 */



const ABFieldCombinedDefaults = {
   key: "combined",
   // unique key to reference this specific DataField

   description: "Combined Value",
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

   isSortable: false,
   // {bool} / {fn}
   // determines if the current ABField can be used to Sort data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => true/false

   menuName: "Combined Field",
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

   compatibleOrmTypes: ["string"],
   // {array}
   // what types of Sails ORM attributes can be imported into this data type?
   // http://sailsjs.org/documentation/concepts/models-and-orm/attributes#?attribute-options

   compatibleMysqlTypes: ["text", "mediumtext", "longtext"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php
};

// defaultValues: the keys must match a .name of your elements to set it's default value.
const defaultValues = {
   combinedFields: "",
   // {string} "field's uuid1, field's uuid2, field's uuid3, ..."
   // This tells us what fields will be combined.
   // if we don't have this, the old value which we filled out won't be cleared when we do "Add field" this type again.

   delimiter: "plus", // plus, space, dash, period
};

class ABFieldCombineCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldCombinedDefaults);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldCombinedDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   fromValues(values) {
      super.fromValues(values);

      this.settings.delimiter =
         values.settings.delimiter || defaultValues.delimiter;
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
}


/***/ }),

/***/ 71331:
/*!*****************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldCombine.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldCombine)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldCombineCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldCombineCore */ 84898);


class ABFieldCombine extends _core_dataFields_ABFieldCombineCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object);
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

   // return the grid column header definition for this instance of ABFieldCombine
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

   warningsEval() {
      super.warningsEval();

      (this.settings.combinedFields.split(",") || []).forEach((id) => {
         var field = this.object.fieldByID(id);
         if (!field) {
            this.warningsMessage(`dependent field[${id}] not found.`, {
               fieldID: id,
               combinedFields: this.settings.combinedFields,
            });
         }
      });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldCombine_js.e1f722a9cad855abcdb9.js.map