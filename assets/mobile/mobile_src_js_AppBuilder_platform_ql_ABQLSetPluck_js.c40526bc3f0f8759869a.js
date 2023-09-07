"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_ql_ABQLSetPluck_js"],{

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


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_ql_ABQLSetPluck_js.c40526bc3f0f8759869a.js.map