"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABField_js"],{

/***/ 81314:
/*!**********************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldCore.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldCore)
/* harmony export */ });
/* harmony import */ var _platform_ABMLClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ABMLClass */ 46148);
/*
 * ABFieldCore
 *
 * ABFieldBase defines the common ABField structure that is shared between
 * the client and the server.  Mostly how it manages it's internal data, and
 * how it is related to the ABObject classes.
 *
 */
// const ABEmitter = require("../../platform/ABEmitter");


class ABFieldCore extends _platform_ABMLClass__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object, fieldDefaults) {
      super(["label"], object.AB);

      // NOTE: setup this first so later we can use .fieldType(), .fieldIcon()
      this.defaults = fieldDefaults || {};

      /*
  		{
  			id:'uuid',					// uuid value for this obj
  			key:'fieldKey',				// unique key for this Field
  			icon:'font',				// fa-[icon] reference for an icon for this Field Type
  			label:'',					// pulled from translation
			columnName:'column_name',	// a valid mysql table.column name
			isImported: 1/0,			// flag to mark is import from other object
			settings: {					// unique settings for the type of field
				showIcon:true/false,	// only useful in Object Workspace DataTable
				isImported: 1/0,		// flag to mark is import from other object
				required: 1/0,			// field allows does not allow NULL or it does allow NULL
				width: {int}			// width of display column

				// specific for dataField
			},
			translations:[]
  		}
  		*/

      this.object = object;

      this.fromValues(values);
   }

   ///
   /// Static Methods
   ///
   /// Available to the Class level object.  These methods are not dependent
   /// on the instance values of the Application.
   ///
   static get reservedNames() {
      return [
         "id",
         "created_at",
         "updated_at",
         "properties",
         "createdAt",
         "updatedAt",
      ];
   }

   static defaultValues() {
      return {};
   }

   // unique key to reference this specific DataField
   fieldKey() {
      return this.defaults.key;
   }

   /**
    * Sails ORM data types that can be imported to this DataField
    * @return {Array}
    */
   fieldOrmTypes() {
      if (this.defaults.compatibleOrmTypes) {
         if (Array.isArray(this.defaults.compatibleOrmTypes)) {
            return this.defaults.compatibleOrmTypes;
         } else {
            return [this.defaults.compatibleOrmTypes];
         }
      } else {
         return [];
      }
   }

   /**
    * Mysql data types that can be imported to this DataField
    * @return {Array}
    */
   fieldMysqlTypes() {
      if (this.defaults.compatibleMysqlTypes) {
         if (Array.isArray(this.defaults.compatibleMysqlTypes)) {
            return this.defaults.compatibleMysqlTypes;
         } else {
            return [this.defaults.compatibleMysqlTypes];
         }
      } else {
         return [];
      }
   }

   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   fieldIcon() {
      return this.defaults.icon;
   }

   // the multilingual text for the name of this data field.
   fieldMenuName() {
      return this.defaults.menuName;
   }

   // the multilingual text for the name of this data field.
   fieldDescription() {
      return this.defaults.description;
   }

   // the flag to set when checking if field should be filterable
   fieldIsFilterable() {
      if (this.defaults.isFilterable != null) {
         if (typeof this.defaults.isFilterable === "function") {
            return this.defaults.isFilterable(this);
         } else {
            return this.defaults.isFilterable;
         }
      }

      return 1;
   }

   // the flag to set when checking if field should be sortable
   fieldIsSortable() {
      if (this.defaults.isSortable != null) {
         if (typeof this.defaults.isSortable === "function") {
            return this.defaults.isSortable(this);
         } else {
            return this.defaults.isSortable;
         }
      }

      return 1;
   }

   // the flag to set when checking if the field should be used as a label
   fieldUseAsLabel() {
      if (this.defaults.useAsLabel != null) {
         if (typeof this.defaults.useAsLabel === "function") {
            return this.defaults.useAsLabel(this);
         } else {
            return this.defaults.useAsLabel;
         }
      }

      return 1;
   }

   fieldSupportRequire() {
      if (this.defaults.supportRequire) return this.defaults.supportRequire;
      // default
      else return true;
   }

   fieldSupportQuery() {
      if (this.defaults.supportQuery != null) {
         if (typeof this.defaults.supportQuery === "function") {
            return this.defaults.supportQuery(this);
         } else {
            return this.defaults.supportQuery;
         }
      }

      return true;
   }

   ///
   /// Instance Methods
   ///

   /// ABApplication data methods

   /**
    * @method toObj()
    *
    * properly compile the current state of this ABField instance
    * into the values needed for saving to the DB.
    *
    * @return {json}
    */
   toObj() {
      const obj = super.toObj();

      return {
         id: this.id,
         type: this.type || "field",
         key: this.key,
         icon: this.icon,
         isImported: this.isImported,
         columnName: this.columnName,
         settings: this.settings,
         translations: obj.translations,
      };
   }

   defaultCheck(val, defaultVal) {
      let returnVal = defaultVal;
      if (typeof val != "undefined") {
         returnVal = val;
      }
      return returnVal;
   }

   /**
    * @method fromValues()
    *
    * initialze this object with the given set of values.
    * @param {obj} values
    */
   fromValues(values) {
      if (!this.id) this.id = values.id; // NOTE: only exists after .save()
      this.type == values.type || "field";
      this.key = values.key || this.fieldKey();
      this.icon = values.icon || this.fieldIcon();

      values.settings = values.settings || {};

      // if this is being instantiated on a read from the Property UI,
      // .label is coming in under .settings.label
      this.label = values.label || values.settings.label || "?label?";

      this.columnName = values.columnName || "";

      this.isImported = values.isImported || 0;

      this.settings = values.settings;
      this.settings.showIcon = this.defaultCheck(values.settings.showIcon, "1");
      this.settings.required = this.defaultCheck(values.settings.required, "0");
      this.settings.width = this.defaultCheck(values.settings.width, "0");

      // convert from "0" => 0
      this.isImported = parseInt(this.isImported);
      this.settings.showIcon = parseInt(this.settings.showIcon);
      this.settings.required = parseInt(this.settings.required);
      this.settings.unique = parseInt(this.settings.unique || 0);
      this.settings.width = parseInt(this.settings.width);

      // we're responsible for setting up our specific settings:
      const defaultValues = this.constructor.defaultValues() || {};
      for (const dv in defaultValues) {
         this.settings[dv] = this.defaultCheck(
            values.settings[dv],
            defaultValues[dv]
         );
      }

      // const the MLClass now process the Translations
      super.fromValues(values);

      // final validity check: columnName really should have a value:
      this.columnName = this.columnName || this.label;

      // knex does not like .(dot) in table and column names
      // https://github.com/knex/knex/issues/2762
      this.columnName = this.columnName.replace(/[^a-zA-Z0-9_ ]/gi, "");
   }

   /**
    * @method urlPointer()
    * return a string pointer to decode this object from the root application
    * object.
    * @return {string} pointer reference
    */
   urlPointer() {
      return this.object.urlField() + this.id;
   }

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      values[this.columnName] = "";
   }

   /**
    * @method isValidData
    * Parse through the given data and return an error if this field's
    * data seems invalid.
    * @param {obj} data  a key=>value hash of the inputs to parse.
    */
   isValidData(data, validator) {
      // console.error('!!! Field ['+this.fieldKey()+'] has not implemented .isValidData()!!!');
      if (
         this.settings.required &&
         (data[this.columnName] == null || data[this.columnName] == "") &&
         data[this.columnName] != 0
      ) {
         validator.addError(this.columnName, "This is a required field.");
      }
   }

   /*
    * @property isMultilingual
    * does this field represent multilingual data?
    * @return {bool}
    */
   get isMultilingual() {
      return false;
   }

   dataValue(rowData) {
      const propName = `${this.alias || this.object.name}.${this.columnName}`;

      let result = "";
      if (rowData?.[this.columnName] != null) {
         result = rowData[this.columnName];
      } else if (rowData?.[propName] != null) {
         result = rowData[propName];
      }

      return result;
   }

   /**
    * @method format
    * return display text to detail comonent and define label of object
    *
    * @param {Object} rowData - data
    */
   format(rowData) {
      if (rowData) {
         return this.dataValue(rowData);
      } else return "";
   }

   /**
    * @method toDefinition()
    *
    * convert this instance into an ABDefinition object.
    *
    * @return {ABDefinition}
    */
   toDefinition() {
      const myDef = super.toDefinition();

      // attempt to provide a more descriptive name:
      // [obj]->[fieldName]
      if (myDef.name == "") {
         myDef.name =
            myDef.json.name || myDef.json.label || myDef.json.columnName;
      }
      if (this.object && this.object.name) {
         myDef.name = `${this.object.name}->${myDef.name}`;
      }
      return myDef;
   }
}


/***/ }),

/***/ 38817:
/*!**********************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABField.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABField)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldCore */ 81314);
/*
 * ABField
 *
 * An ABField defines a single unique Field/Column in a ABObject.
 *
 */



class ABField extends _core_dataFields_ABFieldCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object, fieldDefaults) {
      super(values, object, fieldDefaults);

      this.AB.on("ab.abdefinition.update", (def) => {
         if (def.id == this.id) {
            this.emit("definition.updated", this);
         }
      });

      //  	// NOTE: setup this first so later we can use .fieldType(), .fieldIcon()
      //  	this.defaults = fieldDefaults;

      // 	{
      // 		id:'uuid',					// uuid value for this obj
      // 		key:'fieldKey',				// unique key for this Field
      // 		icon:'font',				// fa-[icon] reference for an icon for this Field Type
      // 		label:'',					// pulled from translation
      // 		columnName:'column_name',	// a valid mysql table.column name
      //		settings: {					// unique settings for the type of field
      // 			showIcon:true/false,	// only useful in Object Workspace DataTable
      // 			isImported: 1/0,		// flag to mark is import from other object
      // 			required: 1/0,			// field allows does not allow NULL or it does allow NULL
      // 			width: {int}			// width of display column

      // 		// specific for dataField
      // 		},
      // 		translations:[]
      // 	}

      // 	this.fromValues(values);

      // this.object = object;
   }

   ///
   /// Static Methods
   ///
   /// Available to the Class level object.  These methods are not dependent
   /// on the instance values of the Application.
   ///

   static editorValues(settings) {
      const obj = {
         label: settings.label,
         columnName: settings.columnName,
         settings: settings,
      };

      delete settings.label;
      delete settings.columnName;

      return obj;
   }

   addValidation(ids, settings) {
      let L = this.AB.Label();
      const App = this.object.application.App;
      const Filter = this.AB.filterComplexNew(
         `${this.id}_field_validation_rules`
      );
      $$(ids.filterComplex).addView({
         view: "form",
         css: "abValidationForm",
         cols: [
            {
               rows: [
                  {
                     view: "text",
                     name: "invalidMessage",
                     labelWidth: this.AB.UISettings.config().labelWidthLarge,
                     value:
                        settings && settings.invalidMessage
                           ? settings.invalidMessage
                           : "",
                     label: L("Invalid Message"),
                  },
                  Filter.ui,
               ],
            },
            {
               view: "button",
               css: "webix_danger",
               icon: "fa fa-trash",
               type: "icon",
               autowidth: true,
               click: function () {
                  const $viewCond = this.getParentView();
                  $$(ids.filterComplex).removeView($viewCond);
               },
            },
         ],
      });
      $$(Filter.ids.save).hide();
      // Filter.applicationLoad(this.object.application);
      Filter.fieldsLoad(this.object.fields());
      if (settings && settings.rules) Filter.setValue(settings.rules);
   }

   /*
    * @method isValid
    * check the current values to make sure they are valid.
    * Here we check the default values provided by ABField.
    *
    * @return null or [{OP.Validation.validator()}] objects.
    */
   isValid() {
      let L = this.AB.Label();
      const validator = this.AB.Validation.validator();

      // .columnName must be unique among fileds on the same object
      const isNameUnique =
         this.object.fields((f) => {
            return (
               f.id != this.id &&
               f.columnName.toLowerCase() == this.columnName.toLowerCase()
            );
         }).length == 0;
      if (!isNameUnique) {
         validator.addError(
            "columnName",
            L(
               "Field columnName must be unique ({0} already used in this Object)",
               [this.columnName]
            )
         );
      }

      return validator;
   }

   ///
   /// Instance Methods
   ///

   /// ABApplication data methods

   /**
    * @method destroy()
    *
    * destroy the current instance of ABApplication
    *
    * also remove it from our _AllApplications
    *
    * @return {Promise}
    */
   async destroy() {
      // verify we have been .save() before:
      if (!this.id) return;

      // NOTE: our .migrateXXX() routines expect the object to currently exist
      // in the DB before we perform the DB operations.  So we need to
      // .migrateDrop()  before we actually .objectDestroy() this.
      await this.migrateDrop();

      // the server still references an ABField in relationship to it's
      // ABObject, so we need to destroy the Field 1st, then remove it
      // from it's object.
      await super.destroy();

      await this.object.fieldRemove(this);
   }

   /**
    * @method save()
    *
    * persist this instance of ABField with it's parent ABObject
    *
    *
    * @return {Promise}
    *						.resolve( {this} )
    */
   async save() {
      let isAdd = false;
      // if this is our initial save()
      if (!this.id) {
         isAdd = true;
      }

      // Whenever we update our settings, make sure any
      // existing rows that have NULL values for this field
      // are updated to have our current .default value.
      if (!isAdd && this.settings.required && this.settings.default) {
         const model = this.object.model();

         // pull rows that has null value
         const result = await model.findAll({
            where: {
               glue: "and",
               rules: [
                  {
                     key: this.id,
                     rule: "is_null",
                  },
               ],
            },
         });

         const tasks = [];

         // updating ...
         result.data.forEach((d) => {
            if (!d[this.columnName]) d[this.columnName] = this.settings.default;

            tasks.push(model.update(d.id, d));
         });

         await Promise.all(tasks);
      }

      // New ABDefinition method of saving:
      // when this is done, we now have an .id
      await super.save();

      // incase this was an ADD operation, make sure the
      // parent Obj now includes this object:
      // NOTE: must be done after the .save() so we have an .id
      await this.object.fieldAdd(this);

      // perform any server side migrations for this Field:

      // but not connectObject fields:
      // ABFieldConnect.migrateXXX() gets called from the UI popupNewDataField
      // in order to handle the timings of the 2 fields that need to be created
      if (!this.isConnection) {
         const fnMigrate = isAdd ? this.migrateCreate() : this.migrateUpdate();
         await fnMigrate;
      }

      return this;
   }

   ///
   /// DB Migrations
   ///

   migrateCreate() {
      return this.AB.Network.post({
         url: `/definition/migrate/object/${this.object.id}/field/${this.id}`,
      });
   }

   migrateUpdate() {
      return this.AB.Network.put({
         url: `/definition/migrate/object/${this.object.id}/field/${this.id}`,
      });
   }

   migrateDrop() {
      return this.AB.Network["delete"]({
         url: `/definition/migrate/object/${this.object.id}/field/${this.id}`,
      });
   }

   ///
   /// Working with Actual Object Values:
   ///

   /**
    * @function columnHeader
    * Return the column header for a webix grid component for this specific
    * data field.
    * @param {Object} options
    * {
    *    isObjectWorkspace: {bool},  is this being used in the Object workspace.
    *    width: {int},
    *    height: {int},
    *    editable: {bool}
    * }
    * @return {obj}  configuration obj
    */
   columnHeader(options) {
      options = options || {};

      const config = {
         id: this.columnName, // this.id,
         header: this.label,
      };

      if (options.isObjectWorkspace && this.settings.showIcon) {
         config.header = `<span class="webix_icon fa fa-${this.fieldIcon()}"></span>${
            config.header
         }`;
      }

      return config;
   }

   /*
    * @function customDisplay
    * perform any custom display modifications for this field.  If this isn't
    * a standard value display (think image, Map, graph, etc...) then use this
    * method to create the display in the table/grid cell.
    * @param {object} row
    *        is the {name=>value} hash of the current row of data.
    * @param {App} App
    *        the shared ui App object useful more making globally
    *			 unique id references.
    * @param {HtmlDOM} node
    *        the HTML Dom object for this field's display.
    * @param {object} options
    *        option of additional settings
    */
   customDisplay(row, App, node, options) {}

   /*
    * @function customEdit
    *
    *
    *
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *					unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   customEdit(row, App, node) {
      return true;
   }

   /**
    * @method getValue
    * this function uses for form component and mass update popup
    * to get value of fields that apply custom editor
    *
    * @param {Object} item - Webix element
    * @param {Object} rowData - data of row
    *
    * @return {Object}
    */
   getValue(item, rowData) {
      return item.getValue();
   }

   /**
    * @method setValue
    * this function uses for form component and mass update popup
    * to get value of fields that apply custom editor
    *
    * @param {Object} item - Webix element
    * @param {Object} rowData - data of row
    *
    */
   setValue(item, rowData, defaultValue) {
      if (!item) return;

      let val;

      if (
         (rowData == null || rowData[this.columnName] == null) &&
         defaultValue != null
      ) {
         val = defaultValue;
      } else if (rowData && rowData[this.columnName] != null) {
         val = rowData[this.columnName];
      } else {
         val = rowData;
      }

      item.setValue(val);
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
   formComponent(formKey) {
      // NOTE: what is being returned here needs to mimic an ABView CLASS.
      // primarily the .common() and .newInstance() methods.

      return {
         // .common() is used to create the display in the list
         common: () => {
            return {
               key: formKey,

               // // but since this is a common place holder: use the
               // // multilingual label here:
               // labelKey: 'ab.abfield.labelPlaceholder',
               // icon:  'square'
            };
         },

         // .newInstance() is used to create the view instance when the component
         // 		is dropped onto the ABView list.
         newInstance: (application, parent) => {
            application = application ?? this.AB._mockApp;

            // NOTE: in case you were wondering, the base ABField
            // 		 will just return a label with 'ABFieldPlaceholder'
            // 		 as the text.  Any sub class of ABField should overwrite
            // 		 this and return an actual Form Component.

            // store object id and field id to field component
            const values = this.formComponent().common();
            values.settings = values.settings || {};
            values.settings.objectId = this.object.id;
            values.settings.fieldId = this.id;

            const ABFieldPlaceholder = application.viewNew(
               values,
               application,
               parent
            ); // ABViewManager.newView(values, application, parent);
            // ABFieldPlaceholder.formatTitle();
            // ABFieldPlaceholder.text = "ABFieldPlaceholder";

            return ABFieldPlaceholder;
         },
      };
   }

   /**
    * @method detailComponent
    */
   detailComponent() {
      return {
         common: () => {
            return {
               icon: "square",
            };
         },

         // .newInstance() is used to create the view instance when the component
         // 		is dropped onto the ABView list.
         newInstance: (application, parent) => {
            application = application ?? this.AB._mockApp;

            // store object id and field id to field component
            const values = this.detailComponent().common();
            values.settings = values.settings || {};
            values.settings.objectId = this.object.id;
            values.settings.fieldId = this.id;

            const ABFieldPlaceholder = application.viewNew(
               values,
               application,
               parent
            ); // ABViewManager.newView(values, application, parent);

            return ABFieldPlaceholder;
         },
      };
   }

   /**
    * @method getSettings()
    * return a copy of this.settings.
    * @return {object}
    */
   getSettings() {
      return Object.assign({}, this.settings);
   }

   /**
    * @method warningsMessage()
    * generate a commonly formatted warning message for this ABField.
    * This is expected to be called from within a .warningsEval()
    * method when generating warnings.
    * @param {string} msg
    *        the warning string to display
    * @param {json} data
    *        any relevant additional information for a developer to refer to.
    */
   warningsMessage(msg, data = {}) {
      let message = `${this.fieldKey()}[${this.label}]: ${msg}`;
      this._warnings.push({ message, data });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABField_js.85953cccb1dba7df7137.js.map