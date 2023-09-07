"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_ql_ABQLSetFirst_js"],{

/***/ 50051:
/*!**********************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLRow.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQLRowUpdate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQLRowUpdate.js */ 35011);
/* harmony import */ var _platform_ql_ABQLRowSave__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../platform/ql/ABQLRowSave */ 83937);
/* harmony import */ var _platform_ql_ABQLRowPluck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../platform/ql/ABQLRowPluck */ 87215);
/*
 * ABQLRow
 *
 * Defines all the QL operations that can be performed on a Row of data. This is a
 * Single row/instance of an object.
 *
 */





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([_platform_ql_ABQLRowUpdate_js__WEBPACK_IMPORTED_MODULE_0__["default"], _platform_ql_ABQLRowSave__WEBPACK_IMPORTED_MODULE_1__["default"], _platform_ql_ABQLRowPluck__WEBPACK_IMPORTED_MODULE_2__["default"]]);


/***/ }),

/***/ 95285:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLRowPluckCore.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQLSetPluck_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQLSetPluck.js */ 66966);
/* harmony import */ var _platform_ql_ABQLRowUpdate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../platform/ql/ABQLRowUpdate.js */ 35011);
/* harmony import */ var _platform_ql_ABQLRowSave_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../platform/ql/ABQLRowSave.js */ 83937);
/*
/*
 * ABQLRowPluckCore
 *
 * An ABQLRowPluckCore can process a value of data and puck out a specified
 * field to then make an object of values that only contain that field.
 *
 */

// const ABQLValue = require("./ABQLValue.js");
// const ABQLSet = require("./ABQLSet.js");
// import ABQLSet from "./ABQLSet";




class ABQLRowPluckCore extends _platform_ql_ABQLSetPluck_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // Dynamic NextQLOps
   get NextQLOps() {
      let nextQLOps = [];

      const field = this.field ?? this.object.fieldByID(this.fieldID) ?? null;

      // Update .NextQLOps WARN: update to static it affects to every ABQLRowPluck instances.
      switch (field?.key) {
         // M:1 M:N connect field, then set ABQLSet to next steps
         case "connectObject":
            if (field.settings.linkType === "many") {
               // NOTE: Could not require("./ABQLSet.js") on the top. It returns an empty object. Why ><
               const ABQLSet = __webpack_require__(/*! ./ABQLSet.js */ 71598);

               nextQLOps = ABQLSet;

               break;
            }

            // return ABQLRow.js
            nextQLOps = this.prevOP.constructor.NextQLOps.filter(
               (NextQLOp) =>
                  NextQLOp.key === this.constructor.key ||
                  NextQLOp.key === _platform_ql_ABQLRowUpdate_js__WEBPACK_IMPORTED_MODULE_1__["default"].key
            );

            break;

         case "user":
            // TODO set this up corectlys
            if (
               field.settings.linkType === "many" ||
               field.settings.isMultiple // may be unnessicary
            ) {
               // NOTE: Could not require("./ABQLSet.js") on the top. It returns an empty object. Why ><
               const ABQLSet = __webpack_require__(/*! ./ABQLSet.js */ 71598);

               nextQLOps = ABQLSet;

               break;
            }

            // default
            nextQLOps = this.prevOP.constructor.NextQLOps.filter(
               (NextQLOp) =>
                  NextQLOp.key === this.constructor.key ||
                  NextQLOp.key === _platform_ql_ABQLRowUpdate_js__WEBPACK_IMPORTED_MODULE_1__["default"].key ||
                  NextQLOp.key === _platform_ql_ABQLRowSave_js__WEBPACK_IMPORTED_MODULE_2__["default"].key
            );

            break;

         default:
            // Normal field and _PK
            nextQLOps = this.prevOP.constructor.NextQLOps.filter(
               (NextQLOp) => NextQLOp.key === _platform_ql_ABQLRowSave_js__WEBPACK_IMPORTED_MODULE_2__["default"].key
            );

            break;
      }

      return nextQLOps;
   }
}

ABQLRowPluckCore.key = "row_pluck";
ABQLRowPluckCore.label = "Read the value from the field";
ABQLRowPluckCore.NextQLOps = []; // Static NextQLOps

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowPluckCore);


/***/ }),

/***/ 18844:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLRowSaveCore.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQLSetSave_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQLSetSave.js */ 68879);
/*
/*
 * ABQLRowSaveCore
 *
 * An ABQLRowSave can store the current Data set into the Process Task it is
 * in, so that this data can be made available to other Process Tasks.
 *
 */



class ABQLRowSaveCore extends _platform_ql_ABQLSetSave_js__WEBPACK_IMPORTED_MODULE_0__["default"] {}

ABQLRowSaveCore.key = "row_save";
ABQLRowSaveCore.label = "Save the value as";
ABQLRowSaveCore.NextQLOps = [];
// NOTE: currently, this is an ending step. but it doesn't have to be...

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowSaveCore);


/***/ }),

/***/ 58910:
/*!********************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLRowUpdateCore.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/*
 * ABQLRowUpdateCore
 *
 * An ABQLRow Update allows you to update the values on the current
 * Row of data.
 *
 */


// const ABQLRow = require("./ABQLRow.js");

const ParameterDefinitions = [
   {
      type: "objectValues",
      name: "values",
   },
];

class ABQLRowUpdateCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, prevOP, task, AB) {
      super(attributes, ParameterDefinitions, prevOP, task, AB);

      // #Hack! : when an Operation provides the same .NextQlOps that it
      // was defined in, we can't require it again ==> circular dependency.
      // so we manually set it here from the operation that created us:
      this.constructor.NextQLOps = prevOP.constructor.NextQLOps;
   }

   ///
   /// Instance Methods
   ///
}

ABQLRowUpdateCore.key = "update";
ABQLRowUpdateCore.label = "Update this record";
ABQLRowUpdateCore.NextQLOps = [];
// NOTE: .NextQLOps => see the #Hack in the constructor

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowUpdateCore);


/***/ }),

/***/ 31663:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLSetFirstCore.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/* harmony import */ var _ABQLRow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ABQLRow.js */ 50051);
/*
/*
 * ABQLSetFirstCore
 *
 * An ABQLFind depends on a BASE QL object (Object, Datacollection, Query)
 * and can perform a DB query based upon that BASE object.
 *
 */



// {array} of {ABQLxxx} options
// this is an array of what possible next Operations can come after an
// ABQLSetFirst task is complete.  In this case the {ABQLRow} operations come
// next.  {ABQLRow} operations work on a single row of data.

class ABQLSetFirstCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, prevOP, task, AB) {
      super(attributes, [], prevOP, task, AB);
   }

   ///
   /// Instance Methods
   ///
}

ABQLSetFirstCore.key = "first";
ABQLSetFirstCore.label = "Select the first record";
ABQLSetFirstCore.NextQLOps = _ABQLRow_js__WEBPACK_IMPORTED_MODULE_1__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetFirstCore);


/***/ }),

/***/ 14154:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLSetPluckCore.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/*
/*
 * ABQLSetPluckCore
 *
 * An ABQLSetPluck can process a set (array) of data and puck out a specified
 * field to then make an array of values that only contain that field.
 *
 */


// const ABQLSet = require("./ABQLSet.js");

const ParameterDefinitions = [
   {
      type: "objectFields",
      name: "fieldID",
   },
];

class ABQLSetPluckCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, prevOP, task, AB) {
      super(attributes, ParameterDefinitions, prevOP, task, AB);
   }

   ///
   /// Instance Methods
   ///

   fromAttributes(attributes) {
      // #Hack! : when an Operation provides the same .NextQlOps that it
      // was defined in, we can't require it again ==> circular dependency.
      // so we manually set it here from the operation that created us:
      this.constructor.NextQLOps = this.prevOP.constructor.NextQLOps;

      // we need to gather our .field and .objectOut before we
      // allow our base class to continue forward:

      this.fieldID = attributes.fieldID;
      this.field = this.object?.fieldByID(this.fieldID);

      //// TODO: figure out how to dynamically update the next row of options
      //// based upon the current choice of field.
      // // based upon the type of field, we now configure what next steps
      // // are available.
      // if (this.field) {
      //    // if connected, then we can stay with same .NextQLOps
      //    // so we can just leave what we did above.

      //    // if a discreet value, then we need to remove SetPluck
      //    if (!this.field.isConnection) {
      //       this.constructor.NextQLOps = [
      //          ...this.prevOP.constructor.NextQLOps,
      //       ].filter((o) => o.key != this.constructor.key);
      //    }
      // }

      if (attributes.objectOutID)
         this.objectOut = this.objectLookup(attributes.objectOutID);

      super.fromAttributes(attributes);
   }

   toObj() {
      const obj = super.toObj();

      if (this.fieldID) {
         obj.fieldID = this.fieldID;

         if (this.objectOut) obj.objectOutID = this.objectOut.id;
      } else {
         obj.fieldID = this.params.field || null;

         const field = this.object.fieldByID(obj.fieldID);

         if (field?.isConnection) obj.objectOutID = field.datasourceLink.id;
      }

      return obj;
   }
}

ABQLSetPluckCore.key = "set_pluck";
ABQLSetPluckCore.label = "Read the value from the field";
ABQLSetPluckCore.NextQLOps = [];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetPluckCore);


/***/ }),

/***/ 83044:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLSetSaveCore.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/*
/*
 * ABQLSetSaveCore
 *
 * An ABQLSetSave can store the current Data set into the Process Task it is
 * in, so that this data can be made available to other Process Tasks.
 *
 */



const ParameterDefinitions = [
   {
      type: "taskParam",
      name: "task_param",
   },
];

class ABQLSetSaveCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, prevOP, task, AB) {
      super(attributes, ParameterDefinitions, prevOP, task, AB);

      // TODO: register with the task that we can provide data.
      if (this.taskParam) {
         task.registerDatasource(this);
         this.registered = true;
      }
   }

   ///
   /// Instance Methods
   ///

   fromAttributes(attributes) {
      // #Hack! : when an Operation provides the same .NextQlOps that it
      // was defined in, we can't require it again ==> circular dependency.
      // so we manually set it here from the operation that created us:
      this.constructor.NextQLOps = this.prevOP.constructor.NextQLOps;

      super.fromAttributes(attributes);

      this.taskParam = attributes.taskParam || this.params.task_param;
   }

   toObj() {
      const obj = super.toObj();

      obj.taskParam = this.taskParam || this.params.task_param;

      return obj;
   }

   processDataField(id, label) {
      // we have to report back on:
      // key:  id.taskParam
      // label: label->taskParam
      // object: ABObject
      // field: ABField
      // set : {bool}

      let field = null;
      // {ABField}
      // if the value being stored is NOT a connectObject, then it is
      // a particular field in the previous object.

      // if we are saving a specific field of an Object, pass that
      // ABField along:
      if (this.prevOP?.field?.key !== "connectObject")
         field = this?.prevOP?.field;

      return {
         key: `${id}.${this.taskParam || this.params.task_param}`,
         label: `${label}->${this.taskParam || this.params.task_param}`,
         field: field,
         object: this.object,
         set: true,
      };
   }
}

ABQLSetSaveCore.key = "set_save";
ABQLSetSaveCore.label = "Save the value as";
ABQLSetSaveCore.NextQLOps = [];
// NOTE: currently, this is an ending step. but it doesn't have to be...

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetSaveCore);


/***/ }),

/***/ 87215:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLRowPluck.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLRowPluckCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLRowPluckCore.js */ 95285);


class ABQLRowPluck extends _core_ql_ABQLRowPluckCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   /*
    * @method paramChanged()
    * respond to an update to the given parameter.
    * NOTE: the value will ALREADY be saved in this.params[pDef.name].
    * @param {obj} pDef
    *        the this.parameterDefinition entry of the parameter that was
    *        changed.
    */
   paramChanged(pDef, id) {
      super.paramChanged(pDef);

      // Re-generate next select options
      if (pDef.name === "fieldID") this.uiNextRowSelectorRefresh(id);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowPluck);


/***/ }),

/***/ 83937:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLRowSave.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLRowSaveCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLRowSaveCore.js */ 18844);
/*
 * ABQLRowSave
 *
 * An ABQLRowSave can store the current Data set into the Process Task it is
 * in, so that this data can be made available to other Process Tasks.
 *
 */



class ABQLRowSave extends _core_ql_ABQLRowSaveCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   paramChanged(pDef, id) {
      super.paramChanged(pDef);
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowSave);


/***/ }),

/***/ 35011:
/*!********************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLRowUpdate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLRowUpdateCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLRowUpdateCore.js */ 58910);
/*
 * ABQLRowUpdate
 *
 * An ABQLRow Update allows you to update the values on the current
 * Row of data.
 *
 */



class ABQLRowUpdate extends _core_ql_ABQLRowUpdateCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, prevOP, task, application) {
   //     super(attributes, ParameterDefinitions, prevOP, task, application);
   //     // #Hack! : when an Operation provides the same .NextQlOps that it
   //     // was defined in, we can't require it again ==> circular dependency.
   //     // so we manually set it here from the operation that created us:
   //     this.constructor.NextQLOps = prevOP.constructor.NextQLOps;
   // }
   ///
   /// Instance Methods
   ///
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLRowUpdate);


/***/ }),

/***/ 1454:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLSetFirst.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLSetFirstCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLSetFirstCore.js */ 31663);
/*
 * ABQLSetFirst
 *
 * An ABQLFind depends on a BASE QL object (Object, Datacollection, Query)
 * and can perform a DB query based upon that BASE object.
 *
 */



class ABQLSetFirst extends _core_ql_ABQLSetFirstCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, prevOP, task, application) {
   //     super(attributes, [], prevOP, task, application);
   // }
   ///
   /// Instance Methods
   ///
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetFirst);


/***/ }),

/***/ 66966:
/*!*******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLSetPluck.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLSetPluckCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLSetPluckCore.js */ 14154);
/*
 * ABQLSetPluck
 *
 * An ABQLSetPluck can process a set (array) of data and pluck out a specified
 * field from each row to then make an array of values that only contain that 
 * field.
 * 
 * Example: 
array = [
 {
	name: "Neo",
	email: "neo@thematrix.com",
	relationships: [ { morpheous}, {trinity} ]
 },
 {
	name: "trinity",
	email: "trinity@thematrix.com",
	relationships: [ {neo}, {morpheous} ]
 },
 {
	name: "morpheous",
	email: "morpheous@thematrix.com",
	relationships: [ {neo}, {trinity}]
 }

]

pluck("email") :
	[
		"neo@thematrix.com",
		"trinity@thematrix.com",
		"morpheous@thematrix.com"
	]

pluck("relationships"):
	[
		{neo},
		{trinity},
		{morpheous}
	]
 *
 */



class ABQLSetPluck extends _core_ql_ABQLSetPluckCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, prevOP, task, application) {
   //     super(attributes, [], prevOP, task, application);
   // }
   ///
   /// Instance Methods
   ///

   /*
    * @method paramChanged()
    * respond to an update to the given parameter.
    * NOTE: the value will ALREADY be saved in this.params[pDef.name].
    * @param {obj} pDef
    *        the this.parameterDefinition entry of the parameter that was
    *        changed.
    */
   paramChanged(pDef) {
      if (pDef.name === "fieldID") {
         // debugger;
         this.fieldID = this.params[pDef.name];
         // v2 method:
         // this.field = this.object.fieldByID(this.fieldID);
         this.field = this.object.fieldByID(this.fieldID);

         // v2 method:
         // if (this.field && this.field.isConnected) {
         if (this.field && this.field.key === "connectObject") {
            this.objectOut = this.field.datasourceLink;
            this.objectOutID = this.objectOut.id;

            // ?? is this correct?
            // if we already have created a .next operation, and we have
            // just changed our .object, pass that information forward.
            if (this.next) this.next.object = this.objectOut;
         }
      }
   }

   /**
    * @method parseRow()
    * When it is time to pull the information from the properties panel,
    * use this fn to get the current Row of data.
    *
    * This fn() will populate the this.params with the values for each
    * of our .parameterDefinitions.
    *
    * NOTE: in this process our .object and .objectOut isn't as simple
    * as the other QL node types.  We'll have to interpolate our values
    * from the given fieldID in our property panel.
    *
    * @param {webixNode} row
    *        the current webix node that contains the ROW defining the
    *        operation and it's parameters.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    */
   parseRow(row, id) {
      super.parseRow(row, id);

      this.fieldID = this.params.fieldID;

      // we now have to build backwards from the current fieldID to set our
      // relevant .object and .objectOut
      this.AB.objects((o) => {
         if (!this.field) {
            // const field = o.fieldByID(this.fieldID);
            const field = o.fieldByID(this.fieldID);

            if (field) this.field = field;
         }
      });

      if (this.field) {
         this.object = this.field.object;

         // v2 method:
         // if (this.field.isConnected) {
         if (this.field && this.field.key === "connectObject") {
            this.objectOut = this.field.datasourceLink;
            this.objectOutID = this.objectOut.id;
         }
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetPluck);


/***/ }),

/***/ 68879:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLSetSave.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLSetSaveCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLSetSaveCore.js */ 83044);
/*
 * ABQLSetSave
 *
 * An ABQLSetSave can store the current Data set into the Process Task it is
 * in, so that this data can be made available to other Process Tasks.
 *
 */



class ABQLSetSave extends _core_ql_ABQLSetSaveCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, prevOP, task, application) {
   //     super(attributes, [], prevOP, task, application);
   // }
   ///
   /// Instance Methods
   ///

   /*
    * @method paramChanged()
    * respond to an update to the given parameter.
    * NOTE: the value will ALREADY be saved in this.params[pDef.name].
    * @param {obj} pDef
    *        the this.parameterDefinition entry of the parameter that was
    *        changed.
    */
   paramChanged(pDef) {
      if (pDef.name === "task_param") {
         this.taskParam = this.params[pDef.name];
      }
   }

   parseRow(row, id) {
      super.parseRow(row, id);

      this.taskParam = this.params["task_param"];

      if (!this.registered) {
         this.task.registerDatasource(this);
         this.registered = true;
      }
   }

   warningsEval() {
      super.warningsEval();
      if (!this.taskParam || this.taskParam === "") {
         this.warningMessage("requires a name to save our data as.");
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLSetSave);


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_ql_ABQLSetFirst_js.f632de965c4fbbf79954.js.map