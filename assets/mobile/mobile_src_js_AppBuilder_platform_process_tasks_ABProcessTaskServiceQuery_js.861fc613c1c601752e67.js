"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceQuery_js"],{

/***/ 79078:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskServiceQueryCore.js ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskServiceQueryCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
/* harmony import */ var _platform_ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../platform/ql/ABQLManager.js */ 66586);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_platform_ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__]);
_platform_ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const ABProcessTaskServiceQueryDefaults = {
   category: null,
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "check-circle", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "TaskServiceQuery",
   // key: {string}
   // unique key to reference this specific Task

   settings: ["qlObj"],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessTaskServiceQueryCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.service.query";
      super(attributes, process, AB, ABProcessTaskServiceQueryDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskServiceQueryDefaults;
   }

   static DiagramReplace() {
      return null;
   }

   fromValues(attributes) {
      super.fromValues(attributes);

      // Before we make instances of qlObj:
      this._datasources = [];

      // comvert our qlObj into an ABQLxxx instance.
      if (this.qlObj) {
         this.qlObj = _platform_ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__["default"].fromAttributes(this.qlObj, this, this.AB);
      }
   }

   /**
    * @method toObj()
    * properly compile the current state of this object instance
    * into the values needed for saving to the DB.
    * @return {json}
    */
   toObj() {
      const data = super.toObj();

      // convert qlObj into obj format:
      if (this.qlObj) data.qlObj = this.qlObj.toObj();

      return data;
   }

   registerDatasource(obj) {
      this._datasources.push(obj);
   }

   ////
   //// Process Instance Methods
   ////

   /**
    * initState()
    * setup this task's initial state variables
    * @param {obj} context  the context data of the process instance
    * @param {obj} val  any values to override the default state
    */
   /*
    initState(context, val) {
        const myDefaults = {
            instanceVariable1: null,
            instanceVariable2: null
        };

        super.initState(context, myDefaults, val);
    }
    */

   /**
    * processDataFields()
    * return an array of avaiable data fields that this element
    * can provide to other ProcessElements.
    * Different Process Elements can make data available to other
    * process Elements.
    * @return {array} | null
    */
   processDataFields() {
      // in this Task, we can return the Response to the UserForm
      let fields = null;

      if (this._datasources.length > 0) {
         fields = [];

         this._datasources.forEach((s) => {
            const param = s.processDataField(this.id, this.label);

            if (param) {
               fields.push(param);
            }
         });
      }

      return fields;
   }

   /**
    * processData()
    * return the current value requested for the given data key.
    * @param {obj} instance
    * @return {mixed} | null
    */
   processData(instance, key) {
      const parts = key.split(".");

      if (parts[0] === this.id) {
         const myState = this.myState(instance);

         return myState[parts[1]];
      }

      return null;
   }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 95223:
/*!***********************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLCore.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ABEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ABEmitter */ 4025);
/*
 * ABQL
 *
 * An ABQL defines the base class for our AB Query Language Objects.
 * These classes share a common way to
 *   - parse input strings for commands
 *
 *
 */

class ABQLCore extends _platform_ABEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, parameterDefinitions, prevOP, task, AB) {
      super();

      // manage the incoming Parameter Definitions
      if (!Array.isArray(parameterDefinitions)) {
         parameterDefinitions = [parameterDefinitions];
      }

      this.parameterDefinitions = parameterDefinitions;

      this.object = prevOP ? prevOP.object : null;
      // {ABObject}
      // The current {ABObject} the current Query Language Operation is associated
      // with.

      // if the previous Operation defined an .objectOut then our .object is THAT
      // one.
      if (prevOP && prevOP.objectOut) this.object = prevOP.objectOut;

      this.prevOP = prevOP;
      this.task = task;
      // {ABProcessTaskxxx}
      // This is running under a specific ABProcessTaskServiceQuery.  When
      // searching for data from the Process, we must go through this.task
      // to do so.

      this.AB = AB;
      this.next = null;

      this.fromAttributes(attributes);
   }

   ///
   /// Instance Methods
   ///
   initObject(attributes) {}

   fromAttributes(attributes) {
      /*
        {
            id: uuid(),
            name: 'name',
            type: 'xxxxx',
            json: "{json}"
        }
        */

      // super.fromValues(attributes);
      this.key = this.constructor.key ?? null;

      // this.entryComplete = attributes.entryComplete || false;
      this.params = attributes.params ?? {};
      // {hash}
      // The configuration values entered by the AppBuilder UI for this
      // operation.

      this.objectID = attributes.objectID || null;

      // be sure to do a hard lookup if an objectID was saved:
      if (this.objectID) this.object = this.objectLookup(this.objectID);

      this.initObject(attributes);

      // at least dump a warning here:
      if (this.objectID && !this.object)
         this.AB.notify.developer(
            new Error(
               `ABQLCore.fromAttributes(): unable to initialize ABObject [${this.objectID}]`
            ),
            {
               attributes,
               objectID: this.objectID,
            }
         );

      if (attributes.next) {
         let nextOP = null;

         (this.NextQLOps ?? this.constructor.NextQLOps).forEach((OP) => {
            if (OP.key === attributes.next.key) nextOP = OP;
         });

         if (nextOP) {
            // exact match, so add next:
            const qlOP = new nextOP(attributes.next, this, this.task, this.AB);

            this.next = qlOP;
         }
      }
   }

   /**
    * @method objectLookup()
    * return a matching {ABObject} that is represented by the given id.
    * NOTE: we will try to match on: our initial .objectID first, then
    * the given objID.
    * NOTE: this will match an object.id as well as object.label
    * @param {string} objID
    */
   objectLookup(objID) {
      return this.AB.objects((o) => {
         const quotedLabel = `"${o.label}"`;

         return (
            // o.id === this.objectID ||
            o.id === objID || quotedLabel.indexOf(objID) === 0
         );
      })[0];
   }

   /**
    * @method availableProcessDataFieldsHash()
    * return a { "field.key" => {processFieldDef} } hash of the currently
    * available fields in the process.
    * @return {obj}
    */
   availableProcessDataFieldsHash() {
      const availableProcessDataFields =
         this.task.process.processDataFields(this.task) ?? [];
      const hashFieldIDs = {};

      availableProcessDataFields.forEach((f) => {
         if (f.field) {
            hashFieldIDs[f.field.id] = f;
         } else {
            hashFieldIDs[f.key] = f;
         }
      });

      return hashFieldIDs;
   }

   /*
    * @method paramChanged()
    * respond to an update to the given parameter.
    * NOTE: the value will ALREADY be saved in this.params[pDef.name].
    * @param {obj} pDef
    *        the this.parameterDefinition entry of the parameter that was
    *        changed.
    */
   paramChanged(pDef) {}

   /**
    * @method toObj()
    * properly compile the current state of this ABQL instance
    * into the values needed for saving to the DB.
    * @return {json}
    */
   toObj() {
      const obj = {
         key: this.constructor.key,
         // entryComplete: this.entryComplete,
         params: this.params,
         // currQuery: this.currQuery,
         // queryValid: this.queryValid,
         objectID: this.object?.id ?? null,
      };

      if (this.next) {
         obj.next = this.next.toObj();
      }

      return obj;
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLCore);


/***/ }),

/***/ 83854:
/*!***************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLFindCore.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/* harmony import */ var _ABQLSet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ABQLSet.js */ 71598);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_ABQLSet_js__WEBPACK_IMPORTED_MODULE_1__]);
_ABQLSet_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * ABQLFindCore
 *
 * An ABQLFind depends on a BASE QL object (Object, Datacollection, Query)
 * and can perform a DB query based upon that BASE object.
 *
 */



// {array} of {ABQLxxx} options
// this is an array of what possible next Operations can come after an
// ABQLFind task is complete.  In this case the {ABQLSet} operations come
// next.  {ABQLSet} operations work on a Set|{Array} or data results.

const ParameterDefinitions = [
   {
      type: "objectConditions",
      name: "cond",
   },
];

class ABQLFindCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, prevOP, task, AB) {
      super(attributes, ParameterDefinitions, prevOP, task, AB);
   }

   ///
   /// Instance Methods
   ///
}

ABQLFindCore.key = "find";
ABQLFindCore.label = "find";
ABQLFindCore.NextQLOps = _ABQLSet_js__WEBPACK_IMPORTED_MODULE_1__["default"];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLFindCore);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 43455:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLManagerCore.js ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQLRootObject.js */ 93556);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_platform_ql_ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_0__]);
_platform_ql_ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * ABQLManagerCore
 *
 * An interface for managing the different ABQL Operations available in our
 * AppBuilder.
 *
 */


const QLOps = [_platform_ql_ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_0__["default"]];

const ABQLManagerCore = {
   /**
    * @method fromAttributes()
    * return an {ABQL} object that represents the given attributes that
    * were saved from the previous .toObj()
    * @param {object} attributes
    *		  the values returned from the previous .toObj() call
    * @param {ABProcessTask***} task
    *		  the current ABProcessTaskServiceQuery that contains this QL
    * @param {ABFactory} AB
    *		  the current ABFactory we are operating under.
    * @return {ABQL} | null
    */
   fromAttributes: function (attributes, task, AB) {
      if (!attributes) return null;

      const matchingOPs = [];

      ABQLManagerCore.QLOps.forEach((Op) => {
         if (Op.key === attributes.key) matchingOPs.push(Op);
      });

      if (matchingOPs.length === 1) {
         // let this Operation initialize and return the last OP
         // in the chain
         const qlOP = new matchingOPs[0](attributes, task, AB);

         return qlOP;
      } else return null;
   },

   /**
    * @array QLOps
    * An array of the root QL Operations.
    */
   QLOps: QLOps,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLManagerCore);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 24325:
/*!*********************************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLRootObjectCore.js ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/ql/ABQL.js */ 33262);
/* harmony import */ var _platform_ql_ABQLFind_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../platform/ql/ABQLFind.js */ 88794);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_platform_ql_ABQLFind_js__WEBPACK_IMPORTED_MODULE_1__]);
_platform_ql_ABQLFind_js__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * ABQLRootObjectCore
 *
 * An ABQL defines a Query Language Operation. A QL Operation
 * is intended to be evaluated at run time and return a value that can be
 * assigned to form value or an object.
 *
 *
 */


// Define the Operations that can be performed off of a RootObject.
// Each Root Object might have a different set of Operations, so we
// define them here.

const NextQLOps = [_platform_ql_ABQLFind_js__WEBPACK_IMPORTED_MODULE_1__["default"]];

const ParameterDefinitions = [
   {
      type: "objectName",
      name: "name",
   },
];

class ABQLObjectCore extends _platform_ql_ABQL_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, task, AB) {
      // NOTE: keep this so we can insert the prevOp == null
      super(attributes, ParameterDefinitions, null, task, AB);
   }

   ///
   /// Instance Methods
   ///
   initObject(attributes) {
      if (!this.object && this.params) {
         const objNameDef = this.parameterDefinitions.find((pDef) => {
            return pDef.type === "objectName";
         });

         if (objNameDef) {
            this.objectID = this.params[objNameDef.name];
            this.object = this.objectLookup(this.objectID);
         }

         if (!this.object) {
            this.warningMessage("has no object set.", {
               objectID: this.objectID,
            });
         }
      }
   }

   toObj() {
      const obj = super.toObj();

      // if we don't have an objectID, but we have an objectName parameter
      // definition then save that as our objectID
      if (!obj.objectID && this.params) {
         const objNameDef = this.parameterDefinitions.find((pDef) => {
            return pDef.type === "objectName";
         });

         if (objNameDef) obj.objectID = this.params[objNameDef.name];
      }

      return obj;
   }
}

ABQLObjectCore.key = "object";
ABQLObjectCore.label = "object";
ABQLObjectCore.NextQLOps = NextQLOps;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLObjectCore);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 71598:
/*!**********************************************!*\
  !*** ./src/js/AppBuilder/core/ql/ABQLSet.js ***!
  \**********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * ABQLSet
 *
 * Here we define the group of operations that can be performed on a SET of data.
 * A SET is an array of objects/row data.
 *
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([
   await __webpack_require__.e(/*! import() */ "src_js_AppBuilder_platform_ql_ABQLSetFirst_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../platform/ql/ABQLSetFirst.js */ 1454)),
   await __webpack_require__.e(/*! import() */ "src_js_AppBuilder_platform_ql_ABQLSetPluck_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../platform/ql/ABQLSetPluck.js */ 66966)),
   await __webpack_require__.e(/*! import() */ "src_js_AppBuilder_platform_ql_ABQLSetSave_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../platform/ql/ABQLSetSave.js */ 68879)),
]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 76061:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskServiceQuery.js ***!
  \*******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskServiceQuery)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskServiceQueryCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskServiceQueryCore.js */ 79078);
/* harmony import */ var _ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ql/ABQLManager.js */ 66586);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_process_tasks_ABProcessTaskServiceQueryCore_js__WEBPACK_IMPORTED_MODULE_0__, _ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__]);
([_core_process_tasks_ABProcessTaskServiceQueryCore_js__WEBPACK_IMPORTED_MODULE_0__, _ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




class ABProcessTaskServiceQuery extends _core_process_tasks_ABProcessTaskServiceQueryCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      super(attributes, process, AB);

      this.attributes = attributes;
   }

   ABQLManager() {
      return _ql_ABQLManager_js__WEBPACK_IMPORTED_MODULE_1__["default"];
   }

   warnings() {
      // first get all our embedded QL Command warnings
      let qlWarnings = [];
      if (this.qlObj) {
         qlWarnings = qlWarnings.concat(this.qlObj.warnings());
      }
      // run the QL Warnings through our .warningMessage() to get a message
      // that includes this task's name:
      qlWarnings.forEach((w) => {
         if (w?.message) this.warningMessage(w.message);
      });
      let myWarnings = super.warnings();
      return myWarnings.filter((w) => w); // filter out any undefined.
   }

   warningsEval() {
      super.warningsEval();
      if (this.qlObj) {
         this.qlObj.warningsEval();
      } else {
         this.warningMessage(`has no Query defined.`);
      }

      if (!this.name) {
         this.warningMessage("does not have a name.", {
            attributes: this.attributes,
         });
      }

      let hasSave = false;
      let curr = this.qlObj;
      while (curr) {
         if (curr.key === "row_save" || curr.key === "set_save") {
            hasSave = true;
            curr = null; // just stop here.
         } else {
            curr = curr.next;
         }
      }

      if (!hasSave) {
         this.warningMessage("requires at least one Save operation.");
      }
   }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 33262:
/*!***********************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQL.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLCore.js */ 95223);
/*
 * ABQL
 *
 * An ABQL defines the base class for our AB Query Language Objects.
 * These classes share a common way to
 *   - parse input strings for commands
 *
 *
 */

// import RowUpdater from "../RowUpdater.js";

class ABQL extends _core_ql_ABQLCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, parameterDefinitions, prevOP, task, AB) {
      super(attributes, parameterDefinitions, prevOP, task, AB);

      this.on("warning", (message, data) => {
         this._warnings.push({ message, data });
      });
   }

   ///
   /// Instance Methods
   ///

   /**
    * @method parseRow()
    * When it is time to pull the information from the properties panel,
    * use this fn to get the current Row of data.
    *
    * This fn() will populate the this.params with the values for each
    * of our .parameterDefinitions.
    *
    * @param {webixNode} row
    *        the current webix node that contains the ROW defining the
    *        operation and it's parameters.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    */
   parseRow(row, id) {
      // const allColumns = row.getChildViews();
      // allColumns.shift(); // remove selector
      this.parameterDefinitions.forEach((pDef) => {
         // const col = allColumns.shift();
         const myID = this.uiID(id);

         this.ids = this.toIDs(myID);
         this.params = this.params ?? {};

         let $uiCondition = null;

         switch (pDef.type) {
            case "objectFields":
               this.params[pDef.name] = $$(this.ids.objectfields).getValue();

               break;

            case "objectName":
               this.params[pDef.name] = $$(this.ids.objectname).getValue();

               break;

            case "objectConditions":
            case "objectValues":
               $uiCondition = $$(this.ids.condition);

               if ($uiCondition) {
                  const condition = $uiCondition.getValue();

                  if (condition && condition !== "") {
                     this.params[pDef.name] = JSON.parse(condition);
                  }
               }

               break;

            case "taskParam":
               this.params[pDef.name] = $$(this.ids.taskparam).getValue();

               break;
         }
      });
   }

   /*
    * @method toIDs()
    * generate a set of unique webix ids to use for our UI.
    * @param {string} myID
    *        the unique id generated by .uiID()
    */
   toIDs(myID) {
      return {
         condition: `${myID}_condition`,
         objectfields: `${myID}_objectfields`,
         objectname: `${myID}_objname`,
         popup: `${myID}_popup`,
         select: `${myID}_select`,
         shorthand: `${myID}_shorthand`,
         taskparam: `${myID}_taskparam`,
         spacer: `${myID}_spacer`,
      };
   }

   /**
    * @method uiAddParamForDef()
    * Add an operation parameter for each parameterDefinition we have defined.
    * @param {obj} pDef
    *        the current parameterDefinition entry we are creating the UI
    *        for.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @param {obj} ui
    *        the current webix ui definition we are building.
    */
   uiAddParamForDef(pDef, id, ui) {
      // params are added to a .col[] definition.
      // if our ui isn't down to the current .col element, then drill down
      if (!ui.cols) {
         if (ui.rows) {
            for (let i = 0; i < ui.rows.length; i++)
               if (ui.rows[i].cols) {
                  this.uiAddParamForDef(pDef, id, ui.rows[i]);

                  break;
               }
         } else throw new Error("provided ui is not able to add a parameter!");

         return;
      }

      const paramUI = this.uiParamUI(pDef, id);

      if (paramUI) {
         // if we only have 1 param
         if (this.parameterDefinitions.length === 1) {
            ui.cols.pop();
            ui.cols.push(paramUI);
         }
         // if we haven't already added a parameter
         else {
            // create a row stack of parameters:
            if (ui.cols.length < 3)
               ui.cols.push({
                  rows: [paramUI],
               });
            // add to the current stack of parameters
            else ui.cols[2].rows.push(paramUI);
         }
      }
   }

   /**
    * @method uiAddNext()
    * Add the next row selector for this operation:
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @param {obj} ui
    *        the current webix ui definition we are building.
    */
   uiAddNext(id, ui) {
      const uiRow = this.uiNextRow(id);

      // if we have a next operation defined, then add on the ui definitions
      // for that operation:
      if (this.next) {
         this.next.uiAddParams(id, uiRow);
         ui.rows.push(uiRow);
         this.next.uiAddNext(id, ui);
      }
      // otherwise we just leave the selector:
      else ui.rows.push(uiRow);
   }

   /**
    * @method uiAddParams()
    * Add operation parameter(s) for each parameterDefinition we have defined.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @param {obj} ui
    *        the current webix ui definition we are building.
    */
   uiAddParams(id, ui) {
      this.parameterDefinitions.forEach((pDef) => {
         this.uiAddParamForDef(pDef, id, ui);
      });
   }

   /*
    * @method uiID()
    * generate a unique webix id for this operation.
    * @param {string} id
    *        the webix id of the base property.query holder
    */
   uiID(id) {
      if (this.prevOP) return `${this.prevOP.uiID(id)}_${this.constructor.key}`;

      return `${id}_${this.constructor.key}`;
   }

   /*
    * uiXXX Operations:
    * are UI building operations that are performed BEFORE the webix UI
    * is generated.  They work by filling out a {ui} object definition
    * that webix will eventually create into the DOM.
    *
    * viewXXX Operations:
    * are UI building operations that are performed AFTER the webix UI
    * is generated. They work by adding in child views to an existing
    * DOM.
    */

   /**
    * @method uiNextRow()
    * return the webix UI definition for the next of UI chaining.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @return {obj}
    */
   uiNextRow(id) {
      const options = this.constructor.NextQLOps.map((op) => {
         return { id: op.key, value: op.label };
      });
      var L = this.AB.Label();

      options.unshift({ id: 0, value: L("choose next operation") });

      const myID = this.uiID(id);
      const ids = this.toIDs(myID);

      const uiRow = {
         cols: [
            {
               id: ids.select,
               view: "select",
               value: this.next ? this.next.constructor.key : 0,
               options: options,
               on: {
                  onChange: (newValue, oldValue) => {
                     const resetValue = () => {
                        const select = $$(ids.select);

                        select.blockEvent();
                        select.setValue(oldValue);
                        select.unblockEvent();
                     };

                     if (newValue === oldValue) return;

                     const newOP = this.constructor.NextQLOps.find(
                        (op) => op.key === newValue
                     );

                     if (!newOP) {
                        resetValue();

                        return;
                     }

                     const thisRow = $$(ids.select).getParentView();
                     const thisQuery = thisRow.getParentView();
                     const addOP = () => {
                        if (newOP) {
                           const nextOP = new newOP(
                              {},
                              this,
                              this.task,
                              this.AB
                           );

                           this.next = nextOP;

                           nextOP.viewAddParams(id, thisRow);
                           nextOP.viewAddNext(id, thisQuery);
                        }
                     };

                     // if there are rows after this one, then warn
                     // about changing
                     const allRows = thisQuery.getChildViews();

                     if (allRows.length - 1 > allRows.indexOf(thisRow))
                        webix.confirm({
                           title: L("continue?"),
                           text: L(
                              "changing this rule will reset any following rules."
                           ),
                           ok: L("Yes"),
                           cancel: L("No"),
                           callback: (result) => {
                              if (result) {
                                 // remove the current additional Rows:
                                 let ir = allRows.length - 1;

                                 while (
                                    allRows[ir].config.id !== thisRow.config.id
                                 ) {
                                    thisQuery.removeView(allRows[ir]);
                                    ir--;
                                 }

                                 // now remove the parameters
                                 const allCols = thisRow.getChildViews();

                                 let ic = allCols.length;

                                 while (ic > 1) {
                                    thisRow.removeView(allCols[ic - 1]);
                                    ic--;
                                 }

                                 addOP();
                              } else resetValue();
                           },
                        });
                     else addOP();
                  },
               },
            },
            {
               id: ids.spacer,
            },
         ],
      };

      return uiRow;
   }

   uiNextRowSelectorRefresh(id) {
      const $select = $$(this.ids.select);

      if (!$select) return;

      const uiNextRow = this.uiNextRow(id);

      const uiNextCol =
         uiNextRow.cols.filter((c) => c.id == $select.config.id)[0] ??
         uiNextRow.cols[1];

      if (uiNextCol) AB.Webix.ui(uiNextCol, $select);
   }

   /**
    * @method uiParamUI()
    * return the webix UI definition for the parameter entry of this current
    * operation.
    * @param {obj} pDef
    *        the current parameterDefinition entry we are creating the UI
    *        for.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @return {obj}
    */
   uiParamUI(pDef, id) {
      const uiConfig = AB.Config.uiSettings();
      var L = this.AB.Label();

      let myID = this.uiID(id);

      this.ids = this.toIDs(myID);

      let paramUI = null;
      let options = null;
      let Filter = null;
      let hashFieldIDs = null;
      let initialCond = null;
      let displayLabel = null;
      let initialValue = null;
      let Updater = null;
      let popUp = null;

      // now add the parameter
      switch (pDef.type) {
         case "objectFields":
            // an objectFields parameter returns a select list of fields
            // available on an Object.
            if (this.object)
               options = this.object.fields().map((f) => {
                  return { id: f.id, value: f.label, icon: `fa fa-${f.icon}` };
               });

            options.unshift({
               id: "_PK",
               value: "[PK]",
            });

            // if not set, default .fieldID to the 1st entry in options
            // so we will have a default.  In use, if a user sees the
            // 1st item and continues on, then we will have chosen it.
            if (!this.fieldID && options.length > 0) {
               // act like it was selected:
               this.params[pDef.name] = options[0].id;
               this.paramChanged(pDef, id);
            }

            paramUI = {
               id: this.ids.objectfields,
               view: "richselect",
               label: L("Field"),
               labelWidth: 70,
               value: this.fieldID,
               options: options,
               on: {
                  onChange: (newValue, oldValue) => {
                     // this.params = this.params ?? {};
                     if (newValue !== this.params[pDef.name]) {
                        this.params[pDef.name] = newValue;
                        this.paramChanged(pDef, id);
                     }
                  },
               },
            };

            break;

         case "objectName":
            // an objectName parameter returns a select list of available
            // objects in this ABFactory.
            options = this.AB.objects().map((o) => {
               return { id: o.id, value: o.label };
            });

            if (!this.objectID && options.length > 0) {
               this.objectID = options[0].id;
               this.params[pDef.name] = this.objectID;
               this.paramChanged(pDef);
            }

            paramUI = {
               id: this.ids.objectname,
               view: "select",
               label: L("Data Source"),
               labelWidth: uiConfig.labelWidthLarge,
               value: this.objectID,
               options: options,
               on: {
                  onChange: (newValue /*, oldValue */) => {
                     this.params = this.params ?? {};

                     if (newValue !== this.params[pDef.name]) {
                        this.params[pDef.name] = newValue;
                        this.paramChanged(pDef);
                     }
                  },
               },
            };

            break;

         case "objectConditions":
            // objectConditions: returns a filter text summary, that when
            // clicked, pops up a Filter Entry Popup.
            // the actual value is stored in a hidden field.

            // we will create a new FilterComplex() object to use for our
            // filtering.
            // Our goal is to create a special filter entry for each avaiable
            // process data value that is available.
            // A filter entry needs to look like:
            // {
            //     id: `{string}`,      // A unique id selector for this filter
            //     name: `{string}`,    // the operation name displayed
            //     type, {obj}          // an object defining the editor to show
            //     fn: ()=>{}           // a function used for filtering elements
            // }
            //
            // In our filters, we are assigning filters to EACH field by the
            // field.id.  So the type definition needs to look like:
            // {
            //     "uniqueID of the field (field.id)" : {webixUI definition}
            // }

            Filter = this.AB.filterComplexNew(id);
            hashFieldIDs = this.availableProcessDataFieldsHash();

            if (this.object) {
               Filter.fieldsLoad(this.object.fields(), this.object);
               // NOTE: this will create default filters based upon the
               // object fields() and their types

               // Now we need to add in the Process Data Fields:
               // for each Process Data Field that matches our same object
               const foundFields = Object.keys(hashFieldIDs).map(
                  (f) => hashFieldIDs[f]
               );

               Filter.processFieldsLoad(foundFields);
               /*
               (foundFields ?? []).forEach((processField) => {
                  const type = {};
                  if (processField.field) {
                     type[processField.field.id] = {
                        view: "select",
                        options: [
                           {
                              id: "empty",
                              value: "choose option"
                           },
                           {
                              id: processField.key,
                              value: `context(${processField.label})`
                           }
                        ]
                     };
                  } else {
                     // if there is no .field, it is probably an embedded special field
                     // like: .uuid
                     const key = processField.key.split(".").pop();
                     type[key] = {
                        view: "select",
                        options: [
                           {
                              id: "empty",
                              value: "choose option"
                           },
                           {
                              id: processField.key,
                              value: `context(${processField.label})`
                           }
                        ]
                     };
                  }

                  // add an "equals" and "not equals" filter for each:
                  Filter.filterAdd([
                     {
                        id: `context_equals`,
                        name: `equals`,
                        type,
                        fn: (a, b) => {
                           return a === b;
                        }
                     },
                     {
                        id: `context_not_equal`,
                        name: `not equals`,
                        type,
                        fn: (a, b) => {
                           return a !== b;
                        }
                     }
                  ]);
                  
               }); */
            }

            // every time the Filter "saves" it's data, it emits this event:
            // take the given condition and store it in our hidden element.
            Filter.on("save", (condition) => {
               // @param {obj} condition an object describing the filter
               // condition.

               this.params = this.params ?? {};
               this.params[pDef.name] = condition;

               const shortHand = $$(this.ids.shorthand);

               shortHand.define({
                  label: Filter.toShortHand(),
               });
               shortHand.refresh();

               // NOTE: the hidden element is a text field, so convert the
               // {condition object} => a string
               const elCondition = $$(this.ids.condition);

               elCondition.define({
                  value: JSON.stringify(this.params[pDef.name]),
               });
               elCondition.refresh();
            });

            // create the initial condition value from our inputs.
            initialCond = "";

            if (this.params && this.params[pDef.name]) {
               Filter.setValue(this.params[pDef.name]);
               initialCond = JSON.stringify(this.params[pDef.name]);
            }

            // what we show on the panel, is a text representation
            // of the current condition.
            displayLabel = Filter.toShortHand();

            paramUI = {
               rows: [
                  {
                     id: this.ids.shorthand,
                     view: "button",
                     label: displayLabel,
                     on: {
                        onItemClick: () => {
                           Filter.popUp($$(this.ids.shorthand), null, {
                              pos: "center",
                           });
                        },
                     },
                  },
                  // have a hidden field to contain the condition
                  // value we will parse out later
                  {
                     id: this.ids.condition,
                     view: "text",
                     value: initialCond,
                     hidden: true,
                  },
               ],
            };

            break;

         case "objectValues":
            // objectValues : shows a condenced textual representation of the
            // field => value changes.  Clicking on the text will show a popup
            // that allows you to add/remove additional field updates for
            // the current object.

            initialValue = "";
            Updater = new RowUpdater(myID, this.AB);

            if (this.object) Updater.objectLoad(this.object);

            // Set processed data key to value options
            Updater.setExtendedOptions(
               (this.task.process.processDataFields(this.task) ?? []).map(
                  (item) => {
                     return {
                        id: item.key,
                        value: item.label,
                     };
                  }
               )
            );

            // NOTE: .setValue() must be called once the RowUpdater is already
            // displayed.  See the end of popUp() below:
            if (this.params && this.params[pDef.name]) {
               Updater.setValue(this.params[pDef.name]);
               initialValue = JSON.stringify(this.params[pDef.name]);
            }

            popUp = () => {
               // show the RowUpdater in a popup:
               const ui = {
                  id: this.ids.popup,
                  view: "popup",
                  position: "center",
                  minWidth: 700,
                  modal: true,
                  resize: true,
                  body: {
                     rows: [
                        {
                           height: 30,
                           borderless: true,
                           cols: [
                              { fillspace: true },
                              {
                                 view: "button",
                                 value: "X",
                                 width: 30,
                                 click: () => {
                                    $$(this.ids.popup).hide();
                                 },
                              },
                           ],
                        },
                        Updater.ui(),
                        {
                           view: "button",
                           value: L("Save"),
                           css: "webix_primary",
                           click: () => {
                              this.params = this.params ?? {};
                              this.params[pDef.name] = Updater.getValue();
                              const sh = $$(this.ids.shorthand);

                              sh.define({
                                 badge: this.params[pDef.name].length,
                              });
                              sh.refresh();

                              const cond = $$(this.ids.condition);

                              cond.define({
                                 value: JSON.stringify(this.params[pDef.name]),
                              });
                              cond.refresh();

                              $$(this.ids.popup).hide();
                           },
                        },
                     ],
                  },
               };

               // create and show the popup
               this._myPopup = webix.ui(ui);
               this._myPopup.show();

               // NOTE: on a RowUpdater, the values need to be set
               // AFTER it is displayed:
               if (this.params && this.params[pDef.name])
                  Updater.setValue(this.params[pDef.name]);
            };

            paramUI = {
               rows: [
                  // the textual shorthand for these values
                  {
                     id: this.ids.shorthand,
                     view: "button",
                     label: L("Update Popout"),
                     badge: this.params[pDef.name]?.length,
                     on: {
                        onItemClick: () => {
                           popUp();
                        },
                     },
                  },
                  // the hidden field that contains the results
                  {
                     id: this.ids.condition,
                     view: "text",
                     value: initialValue,
                     hidden: true,
                  },
               ],
            };

            break;

         case "taskParam":
            paramUI = {
               id: this.ids.taskparam,
               view: "text",
               label: L("Variable"),
               labelWidth: 70,
               value: this.params[pDef.name],
               placeholder: L("Enter parameter name"),
               on: {
                  onChange: (newValue, oldValue) => {
                     // this.params = this.params ?? {};
                     if (newValue !== this.params[pDef.name]) {
                        this.params[pDef.name] = newValue;
                        this.paramChanged(pDef, id);
                     }
                  },
               },
            };

            break;
      }

      return paramUI;
   }

   /**
    * @method viewAddNext()
    * Add the next selector row After this Operation:
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @param {webixNode} topView
    *        the current webix node that needs this view added to
    *        NOTE: this should be the top container that is adding a new
    *        row for each operation.
    */
   viewAddNext(id, topView) {
      const uiRow = this.uiNextRow(id);

      topView.addView(uiRow);
   }

   /**
    * @method viewAddParams()
    * Add operation parameter(s) for each parameterDefinition we have defined.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    * @param {webixNode} rowView
    *        the current webix node that needs this view added to
    *        NOTE: this should be the ROW that the parameters are added to
    */
   viewAddParams(id, rowView) {
      const params = [];

      this.parameterDefinitions.forEach((pDef) => {
         // get the definition from .uiParamUI()
         params.push(this.uiParamUI(pDef, id));
      });

      let toInsert = null;

      // stack parameters in a row if there are more than 1
      if (params.length > 1)
         toInsert = {
            rows: params,
         };
      else toInsert = params.pop();

      if (toInsert) {
         rowView.removeView(rowView.getChildViews()[1]);
         rowView.addView(toInsert);
      }
   }

   warnings() {
      let myWarnings = this._warnings || [];
      if (this.next)
         myWarnings = myWarnings.concat(this.next.warnings()).filter((w) => w);
      return this.AB.uniq(myWarnings);
   }

   warningsEval() {
      this._warnings = [];
      if (this.next) this.next.warningsEval();
   }

   // warningsAll() {
   //    let myWarnings = this.warnings();
   //    if (this.next) {
   //       myWarnings = myWarnings.concat(this.next.warningsAll());
   //    }
   //    return myWarnings;
   // }

   /**
    * @method warningMessage(message)
    * Save a warning message in a common format for our ProcessTasks.
    */
   warningMessage(message) {
      // this.emit("warning", `${this.key}: ${message}`);
      this._warnings = this._warnings || [];
      this._warnings.push({ message: `${this.key}: ${message}` });
   }

   ////
   //// QueryString Parser routines:
   ////
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQL);


/***/ }),

/***/ 88794:
/*!***************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLFind.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLFindCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLFindCore.js */ 83854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_ql_ABQLFindCore_js__WEBPACK_IMPORTED_MODULE_0__]);
_core_ql_ABQLFindCore_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * ABQLFind
 *
 * An ABQLFind depends on a BASE QL object (Object, Datacollection, Query)
 * and can perform a DB query based upon that BASE object.
 *
 */


class ABQLFind extends _core_ql_ABQLFindCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, prevOP, task, application) {
   //     super(attributes, ParameterDefinitions, prevOP, task, application);
   // }
   ///
   /// Instance Methods
   ///
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLFind);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 66586:
/*!******************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLManager.js ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLManagerCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLManagerCore.js */ 43455);
/* harmony import */ var _ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ABQLRootObject.js */ 93556);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_ql_ABQLManagerCore_js__WEBPACK_IMPORTED_MODULE_0__, _ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_1__]);
([_core_ql_ABQLManagerCore_js__WEBPACK_IMPORTED_MODULE_0__, _ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_1__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/*
 * ABQLManager
 *
 * An interface for managing the different ABQL Operations available in our
 * AppBuilder.
 *
 */




const ABQLManager = {
   /**
    * @method fromAttributes()
    * return an {ABQL} object that represents the given attributes that
    * were saved from the previous .toObj()
    * @param {object} attributes
    *		  the values returned from the previous .toObj() call
    * @param {ABProcessTask***} task
    *		  the current ABProcessTaskServiceQuery that contains this QL
    * @param {ABFactory} AB
    *		  the current {ABFactory} active for this interface.
    * @return {ABQL} | null
    */
   fromAttributes: _core_ql_ABQLManagerCore_js__WEBPACK_IMPORTED_MODULE_0__["default"].fromAttributes,

   /**
    * @method ids()
    * return a set of unique webix ids for the ui portions of this object.
    * @param {string} id
    *		  the webix base id of the parameters panel.
    * @return {object}
    */
   ids: (id) => {
      return {
         root: `${id}_root`,
         select: `${id}_root_select`,
         options: `${id}_root_options`,
      };
   },

   /**
    * @method builder
    * return a UI component like object that will display the QL builder.
    * The component will support:
    *		.ui(id) : returns a webix ui definition for the current builder
    *		.init(id) : performs any special actions to prepare the webix ui
    * @param {object} rootOP
    *		  the root ABQLxxxx operation
    * @param {ABProcessTask***} task
    *		  the current Process Task that is requesting the data.
    * @param {ABFactory} AB
    *		  the {ABFactory} active for this display.
    * @return {object}
    */
   builder: (rootOP, task, AB) => {
      // const rootOP = this.fromAttributes(attributes, task, AB);
      // const L = (...params) => AB.Multilingual.label(...params);

      return {
         ui: (id) => {
            rootOP = rootOP ?? new _ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_1__["default"]({}, task, AB);

            const ids = ABQLManager.ids(id);
            const ui = {
               rows: [
                  {
                     id: ids.root,
                     cols: [],
                  },
               ],
            };

            rootOP.uiAddParams(id, ui);
            rootOP.uiAddNext(id, ui);

            return ui;
         },
         init: (id) => {},
      };
   },

   /**
    * @method parse
    * step through the current properties panel and decode the QL objects
    * and their parameters.
    * Return the .toOBJ() attributes definition as a result.
    * @param {string} id
    *		  the webix base id of the parameters panel.
    * @param {ABProcessTask***} task
    *		  the current Process Task that is requesting the data.
    * @param {ABFactory} AB
    *		  the {ABFactory} object that is currently active.
    * @return {object}
    */
   parse: (id, task, AB) => {
      const ids = ABQLManager.ids(id);
      const root = $$(ids.root);

      if (!root) {
         console.warn("ABQLManager.parse(): unable to find root element");

         return;
      }

      // get all the input rows
      const rows = root.getParentView().getChildViews();

      const parseCurrent = (rows, options, prevOP) => {
         if (rows.length === 0) return null;

         const row = rows.shift();

         // get which operation was selected
         // find the operation selector (skip any indents)
         const views = row.getChildViews();

         let selector = views.shift();

         while (!selector?.getValue) selector = views.shift();

         const value = selector.getValue();

         // figure out the QLOP object
         const OP = options.find((o) => {
            return o.key === value || o.key === _ABQLRootObject_js__WEBPACK_IMPORTED_MODULE_1__["default"].key;
         });

         if (OP) {
            let currOP = null;

            if (prevOP) currOP = new OP({}, prevOP, task, AB);
            else currOP = new OP({}, task, AB);

            // now get currOP to initialize from it's parameters:
            currOP.parseRow(row, id);

            // carry forward any .object info if not already established
            // by the .parseRow():
            if (!currOP.object && prevOP) {
               currOP.object = prevOP.object;
               currOP.objectID = currOP.object?.id ?? null;
            }

            const nextRow = parseCurrent(
               rows,
               currOP.constructor.NextQLOps,
               currOP
            );

            currOP.next = nextRow;

            return currOP;
         }

         return null;
      };

      const operation = parseCurrent(rows, _core_ql_ABQLManagerCore_js__WEBPACK_IMPORTED_MODULE_0__["default"].QLOps, null);

      return operation;
   },
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLManager);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 93556:
/*!*********************************************************!*\
  !*** ./src/js/AppBuilder/platform/ql/ABQLRootObject.js ***!
  \*********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_ql_ABQLRootObjectCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/ql/ABQLRootObjectCore.js */ 24325);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_core_ql_ABQLRootObjectCore_js__WEBPACK_IMPORTED_MODULE_0__]);
_core_ql_ABQLRootObjectCore_js__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/*
 * ABQLRootObject
 *
 * An ABQL defines a Query Language Operation. A QL Operation
 * is intended to be evaluated at run time and return a value that can be
 * assigned to form value or an object.
 *
 *
 */



class ABQLObject extends _core_ql_ABQLRootObjectCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(attributes, task, application) {
   //     // NOTE: keep this so we can insert the prevOp === null
   //     super(attributes, ParameterDefinitions, null, task, application);
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
      if (pDef.name === "name") {
         this.objectID = this.params[pDef.name];
         this.object = this.objectLookup(this.objectID);

         // ?? is this correct?
         // if we already have created a .next operation, and we have
         // just changed our .object, pass that information forward.
         if (this.next) this.next.object = this.object;
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
    * @param {webixNode} row
    *        the current webix node that contains the ROW defining the
    *        operation and it's parameters.
    * @param {string} id
    *        the unique id for where the properties panel is displayed.
    */
   parseRow(row, id) {
      super.parseRow(row, id);

      // for an Object operation, we need to set our .objectID after
      // the values are parsed.

      if (this.params.name) {
         this.objectID = this.params.name;
         this.object = this.objectLookup(this.params.name);
      }
   }

   warningsEval() {
      super.warningsEval();
      if (!this.object) {
         this.warningMessage("has no object set.", {
            objectID: this.objectID,
         });
      }
   }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABQLObject);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskServiceQuery_js.861fc613c1c601752e67.js.map