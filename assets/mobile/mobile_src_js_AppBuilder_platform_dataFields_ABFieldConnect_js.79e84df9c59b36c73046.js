"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldConnect_js"],{

/***/ 65129:
/*!*****************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldConnectCore.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldConnectCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldConnect
 *
 * An ABFieldConnect defines a connect to other object field type.
 *
 */



const ABFieldConnectDefaults = {
   key: "connectObject",
   // unique key to reference this specific DataField

   description: "Connect two data objects together",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "external-link",
   // font-awesome icon reference.  (without the 'fa-').  so 'external-link'  to
   // reference 'fa-external-link'

   isFilterable: true,
   // {bool} / {fn}
   // determines if the current ABField can be used to filter (FilterComplex
   // or Query) data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => field.setting.something == true

   isSortable: (field) => {
      const linkType = `${field?.settings?.linkType}:${field?.settings?.linkViaType}`;
      return ["one:many", "one:one"].indexOf(linkType) > -1;
   },
   // {bool} / {fn}
   // determines if the current ABField can be used to Sort data.
   // if a {fn} is provided, it will be called with the ABField as a parameter:
   //  (field) => true/false

   menuName: "Connect to another record",
   // menuName: what gets displayed in the Editor drop list
   // NOTE: this will be displayed using a Label: L(menuName)

   supportRequire: false,
   // {bool}
   // does this ABField support the Required setting?

   supportUnique: false,
   // {bool}
   // does this ABField support the Unique setting?

   useAsLabel: false,
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
};

const defaultValues = {
   linkObject: "", // ABObject.id
   // the .id of the ABObject we are connected to

   linkType: "one", // [one, many]
   // 'one' : this object can have only 1 of our linkObject
   // 'many': this object can have MANY of our linkObject

   linkViaType: "many", // [one, many]
   // 'one' : the linkedObject can only have 1 of me
   // 'many' : the linkedObject can have many of me

   linkColumn: "", // ABField.id
   // the .id of the field in the linkedObject that is our
   // connected field.

   isSource: null, // bit : 1,0
   // isSource indicates that this object is the source of the connection:
   // if linkType==one, and isSource=1, then the value in this object's field
   // 		is the connected object's id
   // if linkType == one, and isSource = 0, then the linkObject has this obj.id
   //  	in it's connected field (linkColumn)

   // the next 3 Fields are concerning how we connect to other ABObjects when
   // we are NOT using the .uuid as the connecting Value. Instead, there is an
   // ABIndex setting we are connecting with.
   isCustomFK: 0,
   // {bool} truthy [0,1, etc...]
   // indicates that this connection is using 1 or more custom foreign keys
   // for the data it is storing in it's relationship.

   indexField: "", // ABField.id
   // {string} {ABField.id}
   // In a Connection defined between A --> B, this field represents the ABField
   // that is used for the data being stored.
   // In 1:1,  1:M  or M:1  relationships, .indexField always refers to the
   //       field we are pulling the Data FROM.
   // In M:N relationships:  this will refer to the A.Field.id that is a custom
   //       key (if any).

   indexField2: "", // ABField.id
   // {string}  {ABField.id}
   // In the M:N relationship: this field refers to the B.Field.id that is a
   //       custom Key for the data we are storing.
};

class ABFieldConnectCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object, fieldDefaults = ABFieldConnectDefaults) {
      super(values, object, fieldDefaults);

      this.isConnection = true;
      // {bool}
      // is this an ABFieldConnect type of field.
      // this is a simplified helper to identify if an ABField is a type
      // of connect field.  Since this is the only place it is defined,
      // all other field types will be falsy

      // // text to Int:
      // this.settings.isSource = parseInt(this.settings.isSource || 0);
      // this.settings.isCustomFK = parseInt(this.settings.isCustomFK || 0);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldConnectDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   ///
   /// Instance Methods
   ///

   fromValues(values) {
      super.fromValues(values);

      // text to Int:
      this.settings.isSource = parseInt(this.settings.isSource || 0);
      this.settings.isCustomFK = parseInt(this.settings.isCustomFK || 0);
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
   defaultValue(/* values */) {}

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

   relationName() {
      // there is object name - {objectName}.{columnName}
      if (this.columnName.indexOf(".") > -1) {
         const names = this.columnName.split(".");
         return `${names[0]}.${this.AB.rules.toFieldRelationFormat(names[1])}`;
      } else {
         return this.AB.rules.toFieldRelationFormat(this.columnName);
      }
   }

   /**
    * @method datasourceLink
    * return the ABObject that this field connection links to
    * @return {ABObject}
    */
   get datasourceLink() {
      const linkObj = this.AB.objectByID(this.settings.linkObject);
      if (!linkObj) {
         const configError = new Error(
            `ConnectField[${this.label}][${this.id}] unable to find linkObject[${this.settings.linkObject}]`
         );
         this.AB.notify.builder(configError, {
            field: this,
            linkObject: this.settings.linkObject,
         });
      }
      return linkObj;
   }

   /**
    * @method fieldLink
    * return the ABField that we are linked to.
    * @return {ABDataField}  or undefined if not found.
    */
   get fieldLink() {
      const objectLink = this.datasourceLink;
      if (!objectLink) return null; // note: already Notified

      const linkColumn = objectLink.fieldByID(this.settings.linkColumn);
      if (!linkColumn) {
         const configError = new Error(
            `ConnectField[${this.label}][${this.id}] unable to find linkColumn[${this.settings.linkColumn}]`
         );
         this.AB.notify.builder(configError, {
            field: this,
            linkColumn: this.settings.linkColumn,
         });
      }
      return linkColumn;
   }

   /**
    * @method pullRelationValues
    * Return the data values for this field entry in the provided data row.
    * @param {*} row
    * @return {array}
    */
   pullRelationValues(row) {
      let selectedData;

      // Get linked object
      const linkedObject = this.datasourceLink;

      let data = this.dataValue(row);
      if (data && linkedObject) {
         // convert to JSON
         if (typeof data == "string") {
            try {
               data = JSON.parse(data);
            } catch (e) {
               // must be a UUID
               // so just set that to selectedData:
               selectedData = data;
            }
         }

         selectedData = data;
      }

      return selectedData;
   }

   dataValue(rowData) {
      if (rowData == null) return "";

      const propName = `${this.object.name}.${this.relationName()}`;

      return (
         rowData[this.relationName()] ||
         rowData[propName] ||
         rowData[this.columnName] ||
         ""
      );
   }

   format(rowData) {
      const val = this.pullRelationValues(rowData);
      const linkedObject = this.datasourceLink;

      // array
      if (Array.isArray(val))
         return val
            .map((v) => {
               if (v.text == null) return linkedObject.displayData(v) || "";
               else return v.text || "";
            })
            .join(", ");
      // string
      else if (val) {
         if (val.text == null) return linkedObject.displayData(rowData) || "";
         else if (val.text) return val.text || "";
      }
      // empty string
      else return "";
   }

   /**
    * @method linkType
    * return the type of connection we have to our connected object
    * @return {string}
    */
   linkType() {
      return this.settings.linkType;
   }

   /**
    * @method linkType
    * return the type of connection we have to our connected object
    * @return {string}
    */
   linkViaType() {
      return this.settings.linkViaType;
   }

   /**
    * @method isSource
    * does this object contain the .id of the remote object (in case of linkType : one )
    * @return {bool}
    */
   isSource() {
      return this.settings.isSource;
   }

   /**
    * @property indexField
    * @return {ABField}
    */
   get indexField() {
      if (!this.settings.isCustomFK || !this.settings.indexField) {
         return null;
      }
      const linkType = `${this.settings.linkType}:${this.settings.linkViaType}`;
      // 1:M
      if (linkType === "one:many") {
         return this.datasourceLink.fieldByID(this.settings.indexField);
      }
      // 1:1
      else if (linkType === "one:one") {
         if (this.settings.isSource) {
            return this.datasourceLink.fieldByID(this.settings.indexField);
         } else {
            return this.object.fieldByID(this.settings.indexField);
         }
      }
      // M:1
      else if (linkType === "many:one") {
         return this.object.fieldByID(this.settings.indexField);
      }
      // M:N
      else if (linkType === "many:many") {
         let indexField = this.object.fieldByID(this.settings.indexField);

         if (indexField == null)
            indexField = this.datasourceLink.fieldByID(
               this.settings.indexField
            );

         return indexField;
      }

      return null;
   }

   /**
    * @property indexField2
    * @return {ABField}
    */
   get indexField2() {
      if (!this.settings.isCustomFK || !this.settings.indexField2) {
         return null;
      }

      let indexField;

      // M:N only
      if (
         this.settings.linkType == "many" &&
         this.settings.linkViaType == "many"
      ) {
         indexField = this.object.fieldByID(this.settings.indexField2);

         if (indexField == null)
            indexField = this.datasourceLink.fieldByID(
               this.settings.indexField2
            );
      }

      return indexField;
   }

   /**
    * @method getRelationValue
    * pull values for update connect data
    * @param {Object} rowData
    * @param {Object} options - {
    *                               forUpdate: boolean
    *                           }
    * @return {Object}
    */
   getRelationValue(rowData, options = {}) {
      if (rowData == null) return;
      let colName;
      const indexField = this.indexField;
      const datasourceLink = this.datasourceLink;

      const linkType = `${this.settings.linkType}:${this.settings.linkViaType}`;

      // custom index
      // M:N
      if (linkType === "many:many") {
         const indexField2 = this.indexField2;

         if (indexField && indexField.object.id == datasourceLink.id) {
            colName = indexField.columnName;
         } else if (indexField2 && indexField2.object.id == datasourceLink.id) {
            colName = indexField2.columnName;
         }
      }
      // 1:M, 1:1 isSource = true
      else if (
         indexField &&
         (linkType === "one:many" ||
            (linkType === "one:one" && this.settings.isSource))
      ) {
         colName = indexField.columnName;
      }
      // M:1
      else if (linkType === "many:one") {
         // NOTE: M:1 has special case
         // it uses different value for search and update.
         // UPDATE uses row id
         // SEARCH uses custom index value
         if (options.forUpdate) {
            colName = datasourceLink.PK();
         } else {
            colName = indexField
               ? indexField.columnName
               : this.fieldLink.columnName;
         }
      }
      // NO CUSTOM INDEX
      else if (datasourceLink) {
         colName = datasourceLink.PK();
      }

      let result =
         rowData[colName] ||
         rowData[this.object?.PK()] ||
         rowData.id ||
         rowData;

      if (colName == "id") {
         result = parseInt(result);
      }

      return result;
   }
}


/***/ }),

/***/ 30289:
/*!*****************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldConnect.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldConnect)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldConnectCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldConnectCore */ 65129);


class ABFieldConnect extends _core_dataFields_ABFieldConnectCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object, fieldDefaults) {
      super(values, object, fieldDefaults);
   }

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
      // verify we have been .save()d before:
      if (!this.id) return Promise.resolve();

      // NOTE: our .migrateXXX() routines expect the object to currently exist
      // in the DB before we perform the DB operations.  So we need to
      // .migrateDrop()  before we actually .objectDestroy() this.
      // this.migrateDrop()
      //    // .then(() => {
      //    //    // NOTE : prevent recursive remove connected fields
      //    //    // - remove this field from JSON
      //    //    this.object._fields = this.object.fields((f) => {
      //    //       return f.id != this.id;
      //    //    });
      //    // })
      //    .then(() => {
      //       // Save JSON of the object
      //       return this.object.fieldRemove(this);
      //    })
      await super.destroy();

      // Now we need to remove our linked Object->field

      const linkObject = this.datasourceLink;
      if (!linkObject) return Promise.resolve(); // already notified

      const linkField = this.fieldLink;
      if (!linkField) return Promise.resolve(); // already notified

      // destroy linked field
      return linkField.destroy();
   }

   ///
   /// Working with Actual Object Values:
   ///

   /**
    * @method pullRelationValues
    *
    * On the Web client, we want our returned relation values to be
    * ready for Webix objects that require a .text and .value field.
    *
    * @param {*} row
    * @return {array}
    */
   pullRelationValues(row) {
      let selectedData = [];

      const data = super.pullRelationValues(row);
      const linkedObject = this.datasourceLink;

      if (data && linkedObject) {
         // if this select value is array
         if (Array.isArray(data)) {
            selectedData = data.map(function (d) {
               // display label in format
               if (d) {
                  d.text = d.text || linkedObject.displayData(d);
                  d.value = d.text;
               }

               return d;
            });
         } else if (data.id || data.uuid) {
            selectedData = data;
            selectedData.text =
               selectedData.text || linkedObject.displayData(selectedData);
            selectedData.value = selectedData.text;
         } else if (typeof data == "string") {
            selectedData = { text: data };
         }
      }

      return selectedData;
   }

   columnHeader(options) {
      options = options || {};
      const config = super.columnHeader(options);
      const field = this;
      const App = field.AB._App;

      if (options.filters == null) {
         options.filters = {};
      }

      var multiselect = this.settings.linkType == "many";

      config.editor = multiselect ? "multiselect" : "combo";
      config.editFormat = (value) => {
         return this.editFormat(value);
      };
      config.editParse = (value) => {
         return this.editParse(value);
      };
      config.template = (row) => {
         var selectedData = field.pullRelationValues(row);
         var values = [];
         values.push('<div class="badgeContainer">');
         if (
            selectedData &&
            Array.isArray(selectedData) &&
            selectedData.length
         ) {
            selectedData.forEach((val) => {
               values.push(
                  `<div class='webix_multicombo_value'><span>${val.value}</span><!-- span data-uuid="${val.id}" class="webix_multicombo_delete" role="button" aria-label="Remove item"></span --></div>`
               );
            });
            if (selectedData.length > 1) {
               values.push(
                  `<span class="webix_badge selectivityBadge">${selectedData.length}</span>`
               );
            }
         } else if (selectedData.value) {
            let clear = "";
            if (options.editable) {
               clear = `<span class="webix_multicombo_delete clear-combo-value" role="button" aria-label="Remove item"></span>`;
            }
            values.push(
               `<div class='webix_multicombo_value'>${clear}<span class="ellip">${selectedData.value}</span></div>`
            );
         } else {
            return "";
         }
         values.push("</div>");
         return values.join("");
      };

      config.suggest = {
         on: {
            onBeforeShow: function () {
               field.openOptions(this);
            },
         },

         // Support partial matches
         filter: ({ value }, search) =>
            (value ?? "").toLowerCase().includes((search ?? "").toLowerCase()),
      };

      if (multiselect) {
         config.suggest.view = "checksuggest";
         config.suggest.button = true;
      }

      return config;
   }

   openOptions($suggest) {
      // PREVENT repeatedly pull data:
      // If not a x->1 relation and the options list was populated, then skip
      const $list = $suggest.getList();
      if (this.settings.linkViaType != "one") {
         if (($list?.find({}) ?? []).length) return;
      }

      // Listen create/update events of the linked object, then clear data list to re-populate
      ["create", "update"].forEach((key) => {
         if (this[`_dc_${key}_event`]) return;

         this[`_dc_${key}_event`] = this.AB.on(
            `ab.datacollection.${key}`,
            (res) => {
               if (this.datasourceLink.id == res.objectId) $list.clearAll();
            }
         );
      });

      this.getAndPopulateOptions($suggest, null, this);
   }

   /*
    * @function customEdit
    *
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *             unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */

   //// NOTE: why do we pass in row, App, and node?  is this something we do in our external components?
   ////       are these values present when this Object is instanciated? Can't we just pass these into the
   ////       object constructor and have it internally track these things?
   customEdit(row, /*App,*/ node) {
      // var selectedData = this.pullRelationValues(row);
      // this._selectedData = selectedData;
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
      return super.formComponent("connect");
   }

   detailComponent() {
      const detailComponentSetting = super.detailComponent();

      detailComponentSetting.common = () => {
         return {
            key: "detailconnect",
         };
      };

      return detailComponentSetting;
   }

   /**
    * @method getOptions
    * show options list in selectivity
    *
    * @return {Promise}
    */
   getOptions(whereClause, term, sort, editor) {
      const theEditor = editor;
      return new Promise((resolve, reject) => {
         let haveResolved = false;
         // {bool}
         // have we already passed back a result?

         const respond = (options) => {
            // filter the raw lookup with the provided search term
            options = options.filter((item) => {
               if (item.text.toLowerCase().includes(term.toLowerCase())) {
                  return true;
               }
            });

            if (!haveResolved) {
               haveResolved = true;
               resolve(options);
            } else {
               // if we have already resolved() then .emit() that we have
               // updated "option.data".
               this.emit("option.data", options);
            }
         };

         // Prepare Where clause

         const where = this.AB.cloneDeep(whereClause || {});
         sort = sort || [];

         if (!where.glue) where.glue = "and";

         if (!where.rules) where.rules = [];

         term = term || "";

         // check if linked object value is not define, should return a empty array
         if (!this.settings.linkObject) return [];

         // if options was cached
         // if (this._options != null) return resolve(this._options);

         const linkedObj = this.datasourceLink;

         // System could not found the linked object - It may be deleted ?
         if (linkedObj == null) throw new Error("No linked object");

         const linkedCol = this.fieldLink;

         // System could not found the linked field - It may be deleted ?
         if (linkedCol == null) throw new Error("No linked column");

         // Get linked object model
         const linkedModel = linkedObj.model();

         // M:1 - get data that's only empty relation value
         if (
            this.settings.linkType == "many" &&
            this.settings.linkViaType == "one" &&
            editor?.config?.showAllOptions != true
         ) {
            where.rules.push({
               key: linkedCol.id,
               rule: "is_null",
            });
            // where[linkedCol.columnName] = null;
         }
         // 1:1
         else if (
            this.settings.linkType == "one" &&
            this.settings.linkViaType == "one" &&
            editor?.config?.showAllOptions != true
         ) {
            // 1:1 - get data is not match link id that we have
            if (this.settings.isSource == true) {
               // NOTE: make sure "haveNoRelation" shows up as an operator
               // the value ":0" doesn't matter, we just need 'haveNoRelation' as an operator.
               // newRule[linkedCol.id] = { 'haveNoRelation': 0 };
               where.rules.push({
                  key: linkedCol.id,
                  rule: "have_no_relation",
               });
            }
            // 1:1 - get data that's only empty relation value by query null value from link table
            else {
               where.rules.push({
                  key: linkedCol.id,
                  rule: "is_null",
               });
               // newRule[linkedCol.id] = 'null';
               // where[linkedCol.id] = null;
            }
         }

         const storageID = this.getStorageID(where);

         Promise.resolve()
            .then(async () => {
               // Mar 23, 2023 disabling local storage of options because users
               // were reporting not seeing the correct options list with either
               // new, updated or deleted records that should or should not appear
               return false;
               // Get Local Storage unless xxx->one connected field
               if (this?.settings?.linkViaType != "one") {
                  // We store the .findAll() results locally and return that for a
                  // quick response:
                  return await this.AB.Storage.get(storageID);
               }
            })
            .then(async (storedOptions) => {
               if (storedOptions) {
                  // immediately respond with our stored options.
                  this._options = storedOptions;
                  return respond(this._options);
               }
               // Pull linked object data
               let options = function () {
                  return linkedModel.findAll({
                     where: where,
                     sort: sort,
                     populate: false,
                  });
               };

               // placeholder for selected options
               let selected = function () {
                  return new Promise((resolve, reject) => {
                     // empty data array to pass to all()
                     resolve({ data: [] });
                  });
               };

               // we also need to get selected values of xxx->one connections
               // if we are looking at a field in a form we look at linkViaOneValues
               // if we are looking at a grid we are editing we look at theEditor?.config?.value
               if (
                  this?.settings?.linkViaType == "one" &&
                  (this?.linkViaOneValues || theEditor?.config?.value)
               ) {
                  let values = "";
                  // determine if we are looking in a grid or at a form field
                  if (
                     (theEditor?.config?.view == "multicombo" ||
                        theEditor?.config?.view == "combo") &&
                     this?.linkViaOneValues
                  ) {
                     values = this?.linkViaOneValues;
                  } else if (theEditor?.config?.value) {
                     if (Array.isArray(theEditor.config.value)) {
                        values = theEditor?.config?.value.join();
                     } else {
                        values = theEditor?.config?.value;
                     }
                  }
                  let whereRels = {};
                  let sortRels = [];

                  whereRels.glue = "or";
                  whereRels.rules = [];

                  values.split(",").forEach((v) => {
                     whereRels.rules.push({
                        key: "uuid",
                        rule: "equals",
                        value: v,
                     });
                  });
                  selected = function () {
                     return linkedModel.findAll({
                        where: whereRels,
                        sort: sortRels,
                        populate: false,
                     });
                  };
               }
               try {
                  const results = await Promise.all([options(), selected()]);

                  // combine options and selected items and
                  // put the selected options at the top of the list
                  const result = results[1].data.concat(results[0].data);

                  // store results in _options
                  this._options = result.data || result || [];

                  // populate display text
                  (this._options || []).forEach((opt) => {
                     opt.text = linkedObj.displayData(opt);
                     opt.value = opt.text;
                  });

                  // cache options if not a xxx->one connection
                  if (this?.settings?.linkViaType != "one") {
                     this.AB.Storage.set(storageID, this._options);
                  }
                  return respond(this._options);
               } catch (err) {
                  this.AB.notify.developer(err, {
                     context:
                        "ABFieldConnect:getOptions(): unable to retrieve options from server",
                     field: this.toObj(),
                     where,
                  });

                  haveResolved = true;
                  throw err;
               }
            });
      });
   }

   getStorageID(where) {
      return `${this.id}-${JSON.stringify(where)}`;
   }

   async clearStorage(where) {
      const storageID = this.getStorageID(where);
      await this.AB.Storage.set(storageID, null);
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
      var multiselect = this.settings.linkType == "many";
      if (multiselect) {
         if (!value) {
            return [];
         } else {
            let returnVals = [];
            let vals = value.split(",");
            vals.forEach((val) => {
               returnVals.push(this.getItemFromVal(val));
            });
            return returnVals;
         }
      } else {
         let item = this.getItemFromVal(value);
         return item;
      }
   }

   getAndPopulateOptions(editor, options, field, form) {
      const theEditor = editor;
      // if editor has options and is xxx->one store the options on the field
      if (
         this?.settings?.linkViaType == "one" &&
         theEditor.getValue() &&
         !field.linkViaOneValues
      ) {
         field.linkViaOneValues = theEditor.getValue();
      }

      // if we are filtering based off another selectivity's value we
      // need to do it on fetch each time because the value can change
      // copy the filters so we don't add to them every time there is a change
      const combineFilters = options?.filters
         ? Object.assign({}, options.filters)
         : { glue: "and", rules: [] };

      if (options?.filterByConnectValues) {
         const parseFilterByConnectValues = (conditions, values, depth = 0) => {
            const valuesByDepth = values.filter((e) => e?.depth === depth);

            return [
               ...conditions.rules.map((e) => {
                  if (e.glue)
                     return {
                        glue: e.glue,
                        rules: parseFilterByConnectValues(e, values, depth + 1),
                     };

                  const value = valuesByDepth.filter(
                     (ef) => ef.key === e.key && ef.value === e.value
                  )[0];

                  if (!value) return e;

                  const $parentField = value?.filterValue?.config.id
                     ? $$(value.filterValue.config.id)
                     : null;

                  if (!$parentField)
                     throw Error(
                        "Some parent field's view components don't exist"
                     );

                  const parentValue = value?.filterValue
                     ? $parentField.getValue() ?? ""
                     : "";

                  let newVal = "";

                  if (parentValue) {
                     if (value.filterColumn) {
                        if (
                           field.object
                              .fieldByID(value.filterValue.config.dataFieldId)
                              .getItemFromVal(parentValue)
                        ) {
                           newVal = field.object
                              .fieldByID(value.filterValue.config.dataFieldId)
                              .getItemFromVal(parentValue)[value.filterColumn];
                        } else {
                           newVal = parentValue;
                        }
                     } else {
                        newVal = parentValue;
                     }
                  }

                  return {
                     key: e.key,
                     rule: "equals",
                     value: newVal,
                  };
               }),
            ];
         };

         combineFilters.rules = parseFilterByConnectValues(
            combineFilters,
            options.filterByConnectValues
         );
      }

      const handlerOptionData = (data) => {
         if (theEditor.$destructed) {
            this.removeListener("option.data", handlerOptionData);
            return;
         }
         this.populateOptions(theEditor, data, field, form, true);
      };

      // try to make sure we don't continually add up listeners.
      this.removeListener("option.data", handlerOptionData).once(
         "option.data",
         handlerOptionData
      );

      return new Promise((resolve, reject) => {
         this.getOptions(
            combineFilters,
            "",
            options?.sort ?? "",
            theEditor
         ).then((data) => {
            this.populateOptions(theEditor, data, field, form, true);
            resolve(data);
         });
      });
   }

   populateOptions(theEditor, data, field, form, addCy) {
      if (theEditor == null || theEditor.$destructed) return;

      theEditor.blockEvent();
      theEditor.getList().clearAll();
      theEditor.getList().define("data", data);
      if (addCy) {
         this.populateOptionsDataCy(theEditor, field, form);
      }
      if (theEditor.getValue && theEditor.getValue()) {
         theEditor.setValue(theEditor.getValue());
         // } else if (this._selectedData && this._selectedData.length) {
         //    theEditor.setValue(this.editFormat(this._selectedData));
      }
      theEditor.unblockEvent();
   }

   populateOptionsDataCy(theEditor, field, form) {
      if (theEditor?.$destructed) return;

      // Add data-cy attributes
      if (theEditor?.getList) {
         if (!theEditor.getPopup) return;
         var popup = theEditor.getPopup();
         if (!popup) return;
         theEditor.getList().data.each((option) => {
            if (!option) return;
            var node = popup.$view.querySelector(
               "[webix_l_id='" + option.id + "']"
            );
            if (!node) return;
            node.setAttribute(
               "data-cy",
               `${field.key} options ${option.id} ${field.id} ${form?.id}`
            );
         });
      }
   }

   getItemFromVal(val) {
      let item;
      let options = this._options || [];
      if (options.length > 0) {
         for (let i = 0; i < options.length; i++) {
            if (
               this.indexField &&
               options[i][this.indexField.object.PK()] == val
            ) {
               item = options[i];
               break;
            } else if (
               this.indexField2 &&
               options[i][this.indexField2.object.PK()] == val
            ) {
               item = options[i];
               break;
            } else {
               if (
                  options[i].id == val ||
                  options[i].value == val ||
                  options[i][this.indexField?.columnName ?? ""] == val ||
                  options[i][this.indexField2?.columnName ?? ""] == val
               ) {
                  item = options[i];
                  break;
               }
            }
         }
         return item;
      } else {
         return "";
      }
   }

   getValue(item) {
      var multiselect = this.settings.linkType == "many";
      if (multiselect) {
         let vals = [];
         if (item.getValue()) {
            let val = item.getValue().split(",");
            val.forEach((record) => {
               vals.push(item.getList().getItem(record));
            });
         }
         return vals;
      } else {
         if (item.getValue()) {
            return item.getList().getItem(item.getValue());
         } else {
            return "";
         }
      }
   }

   setValue(item, rowData) {
      if (!item) return;
      // if (AB.isEmpty(rowData)) return; removed because sometimes we will
      // want to set this to empty
      let val = this.pullRelationValues(rowData);
      // put in current values as options so we can display them before
      // the rest of the options are fetched when field is clicked
      if (item.getList && item.getList().count() == 0) {
         if (this.settings.linkType !== "one" && !Array.isArray(val)) {
            val = [val];
         }

         const $list = item.getList();

         $list.define("data", val);
         $list.refresh();
      }

      item.setValue(
         Array.isArray(val)
            ? val.map((e) => e.id ?? e.uuid ?? e).join(",")
            : val.id ?? val.uuid ?? val
      );
   }

   /**
    * @method pullRecordRelationValues
    *
    * On the Web client, we want our returned relation values to be
    * ready for Webix objects that require a .text and .value field.
    *
    * @param {*} row
    * @return {array}
    */
   pullRecordRelationValues(record) {
      var selectedData = [];

      var data = record;
      var linkedObject = this.datasourceLink;

      if (data && linkedObject) {
         // if this select value is array
         if (Array.isArray(data)) {
            selectedData = data.map(function (d) {
               // display label in format
               if (d) {
                  d.text = d.text || linkedObject.displayData(d);
                  d.value = d.text;
               }

               return d;
            });
         } else if (data.id || data.uuid) {
            selectedData = data;
            selectedData.text =
               selectedData.text || linkedObject.displayData(selectedData);
            selectedData.value = selectedData.text;
         }
      }

      return selectedData;
   }

   warningsEval() {
      super.warningsEval();

      var linkField = this.fieldLink;
      if (!linkField) {
         this.warningsMessage(
            `is unable to find linked field[${this.settings.linkColumn}]`,
            {
               linkColumn: this.settings.linkColumn,
            }
         );
      }

      let linkObj = this.datasourceLink;
      if (!linkObj) {
         this.warningsMessage(
            `is unable to find linked object[${this.settings.linkObject}]`,
            {
               linkObject: this.settings.linkObject,
            }
         );
      }
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldConnect_js.79e84df9c59b36c73046.js.map