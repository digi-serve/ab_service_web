"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldUser_js"],{

/***/ 75498:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldUserCore.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldUserCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABFieldConnect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABFieldConnect */ 30289);
/*
 * ABFieldUser
 *
 * An ABFieldUser defines a user field type.
 *
 */



const ABFieldUserDefaults = {
   key: "user",
   // unique key to reference this specific DataField

   description: "Add users to a record.",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "user-o",
   // font-awesome icon reference.  (without the 'fa-').  so 'user-o'  to
   // reference 'fa-user-o'

   isFilterable: true,
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

   menuName: "User",
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

   compatibleMysqlTypes: ["char", "varchar", "tinytext"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php

   USERNAME_FIELD_ID: "5760560b-c078-47ca-98bf-e18ac492a561",
   // {string} .uuid
   // the ABField.id of the SiteUser.username field.  This is what other
   // objects will link to in their ABFieldUser connections.
};

const defaultValues = {
   editable: 1,
   isMultiple: 0,
   isCurrentUser: 0,
   isShowProfileImage: 0,
   isShowUsername: 1,
};

class ABFieldUserCore extends _platform_dataFields_ABFieldConnect__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldUserDefaults);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldUserDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   ///
   /// Instance Methods
   ///

   fromValues(values) {
      super.fromValues(values);

      this.settings.editable = parseInt(this.settings.editable);
      this.settings.isMultiple = parseInt(this.settings.isMultiple);
      this.settings.isCurrentUser = parseInt(this.settings.isCurrentUser);
      this.settings.isShowProfileImage = parseInt(
         this.settings.isShowProfileImage
      );
      this.settings.isShowUsername = parseInt(this.settings.isShowUsername);
   }

   ///
   /// Working with Actual Object Values:
   ///

   format(rowData) {
      let val = this.dataValue(rowData) || [];

      if (val && !Array.isArray(val)) val = [val];
      if (!val) val = [];

      return val.map((v) => v.username || v).join(", ");
   }
}


/***/ }),

/***/ 21391:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldUser.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldUser)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldConnectCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldConnectCore */ 65129);
/* harmony import */ var _core_dataFields_ABFieldUserCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/dataFields/ABFieldUserCore */ 75498);



class ABFieldUser extends _core_dataFields_ABFieldUserCore__WEBPACK_IMPORTED_MODULE_1__["default"] {
   constructor(values, object, fieldDefaults) {
      super(values, object, fieldDefaults);
   }

   ///
   /// Working with Actual Object Values:
   ///

   async save() {
      // Add new
      if (this.id == null) {
         const SiteUser = this.AB.objectUser();
         const Defaults = _core_dataFields_ABFieldUserCore__WEBPACK_IMPORTED_MODULE_1__["default"].defaults();

         this.settings.linkObject = SiteUser.id;
         this.settings.isCustomFK = 1;

         if (this.settings.isMultiple) {
            this.settings.indexField2 = Defaults.USERNAME_FIELD_ID;
            this.settings.linkType = "many";
            this.settings.linkViaType = "many";
            this.settings.isSource = 1;
         } else {
            this.settings.indexField = Defaults.USERNAME_FIELD_ID;
            this.settings.linkType = "one";
            this.settings.linkViaType = "many";
            this.settings.isSource = 1;
         }

         // TODO: .fieldCustomNew() for saving "local" changes.
         // NOTE: The Object adding this Field sees it's data as a ABFieldUser
         //       connection.
         //       However, the SiteUser will see the data as a ABFieldConnect
         //       connection
         const linkCol = SiteUser.fieldNew({
            key: _core_dataFields_ABFieldConnectCore__WEBPACK_IMPORTED_MODULE_0__["default"].defaults().key,
            columnName: `${this.object.name}_${this.label}`,
            label: this.object.label,
            settings: {
               showIcon: this.settings.showIcon,
               linkObject: this.object.id,
               linkType: this.settings.linkViaType,
               linkViaType: this.settings.linkType,
               isCustomFK: this.settings.isCustomFK,
               indexField: this.settings.indexField,
               indexField2: this.settings.indexField2,
               isSource: 0,
            },
         });

         // // Create definitions of the connected fields
         // // NOTE: skip directly to the ABMLClass.save() to avoid the
         // // migrations caused during the ABField.save() operations.
         // await ABFieldUserCore.prototype.save.call(this);

         // linkCol.settings.linkColumn = this.id;
         // await ABFieldUserCore.prototype.save.call(linkCol);

         // // Update the id value of linked field to connect together
         // this.settings.linkColumn = linkCol.id;
         // await ABFieldUserCore.prototype.save.call(this);

         let newDef = await this.toDefinition().save();
         this.id = newDef.id;

         linkCol.settings.linkColumn = this.id;
         let newLinkDef = await linkCol.toDefinition().save();
         linkCol.id = newLinkDef.id;

         this.settings.linkColumn = linkCol.id;
         await this.toDefinition().save();

         // Add fields to Objects
         await this.object.fieldAdd(this);

         await SiteUser.fieldAdd(linkCol);

         // Create column to DB
         await this.migrateCreate();

         await linkCol.migrateCreate();

         return this;
      } else {
         return super.save();
      }
   }

   // return the grid column header definition for this instance of ABFieldUser

   columnHeader(options) {
      // debugger;
      options = this.setDisplayOptions(options);
      return super.columnHeader(options);
   }

   /**
    * @function customDisplay
    * perform any custom display modifications for this field.
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *             unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   // customDisplay(row, App, node, options = {}) {
   //    debugger;
   //    options = this.setDisplayOptions(options);
   //
   //    return super.customDisplay(row, App, node, options);
   // }

   setDisplayOptions(options) {
      options = options || {};
      options.editable =
         this.settings.editable != null ? this.settings.editable : true;

      options.isLabelHidden =
         this.settings.isShowUsername != null
            ? !this.settings.isShowUsername
            : false;

      options.additionalText = (opt) => {
         if (!this.settings.isShowProfileImage) return "";

         if (opt.image_id)
            return `<img src='/file/${opt.image_id}' style='border-radius:100%; object-fit: cover; margin: 0 5px 0 -10px;' width='28' height='28' />`;
         else return '<i style="opacity: 0.6;" class="fa fa-user"></i> ';
      };

      return options;
   }

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      if (this.settings.isCurrentUser) {
         if (this.settings.isMultiple) {
            values[this.columnName] = [
               {
                  id: this.AB.Account.username(),
                  text: this.AB.Account.username(),
               },
            ];
         } else {
            values[this.columnName] = this.AB.Account.username();
         }
      }
   }

   getValue(item) {
      let val = super.getValue(item);

      if (val) {
         if (typeof val == "string")
            val = val.replace(/ab-current-user/g, this.AB.Account.username());
         else if (Array.isArray(val))
            val = val.map((v) =>
               (v.username ?? v.uuid ?? v.id ?? v)?.replace(
                  /ab-current-user/g,
                  this.AB.Account.username()
               )
            );
      }

      return val;
   }

   setValue(item, rowData) {
      let val = rowData[this.columnName];
      // Select "[Current user]" to update
      if (val == "ab-current-user") val = this.AB.Account.username();

      rowData[this.columnName] = val;

      super.setValue(item, rowData);
   }

   getUsers() {
      return this.AB.Account.userList().map((u) => {
         const result = {
            id: u.username,
            image: u.image_id,
         };

         if (this.settings.isMultiple) {
            result.text = u.username;
         } else {
            result.value = u.username;
         }

         return result;
      });
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldUser_js.64f603781a76a6ad4e63.js.map