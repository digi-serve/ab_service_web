"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_ql_ABQLSetSave_js"],{

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
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_ql_ABQLSetSave_js.bf32895210437227604b.js.map