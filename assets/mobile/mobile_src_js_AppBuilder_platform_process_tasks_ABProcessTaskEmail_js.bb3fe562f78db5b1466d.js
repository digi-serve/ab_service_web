"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessTaskEmail_js"],{

/***/ 95316:
/*!************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessTaskEmailCore.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskEmailCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


var ABProcessTaskEmailDefaults = {
   category: "task",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   fields: [
      "to",
      "from",
      "subject",
      "message",
      "toCustom",
      "fromCustom",
      "toUsers",
      "fromUsers",
      "toCustomFields",
      "fromCustomFields",
   ],
   // fields: {array}
   // a list of internal setting values this Element tracks

   icon: "email", // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to reference 'fa-user'

   key: "Email",
   // key: {string}
   // unique key to reference this specific Task
};

class ABProcessTaskEmailCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.task.email";
      super(attributes, process, AB, ABProcessTaskEmailDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessTaskEmailDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Send Task",
         actionName: "replace-with-send-task",
         className: "bpmn-icon-send",
         target: {
            type: "bpmn:SendTask",
         },
      };
   }

   fromValues(attributes) {
      /*
        {
            id: uuid(),
            name: 'name',
            type: 'xxxxx',
            json: "{json}"
        }
        */
      super.fromValues(attributes);

      ABProcessTaskEmailDefaults.fields.forEach((f) => {
         this[f] = attributes[f];
      });
   }

   /**
    * onProcessReady()
    * Perform our warnings checks once the parent Process is ready
    */

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
      var data = super.toObj();

      ABProcessTaskEmailDefaults.fields.forEach((f) => {
         data[f] = this[f];
      });

      return data;
   }

   ////
   //// Process Instance Methods
   ////

   /**
    * do()
    * this method actually performs the action for this task.
    * @param {obj} instance  the instance data of the running process
    * @return {Promise}
    *      resolve(true/false) : true if the task is completed.
    *                            false if task is still waiting
    */
   // do(instance) {
   //     return new Promise((resolve, reject) => {
   //         // for testing:
   //         var myState = this.myState(instance);
   //         myState.status = "completed";
   //         this.log(instance, "Email Sent successfully");
   //         resolve(true);
   //     });
   // }

   /**
    * initState()
    * setup this task's initial state variables
    * @param {obj} context  the context data of the process instance
    * @param {obj} val  any values to override the default state
    */
   initState(context, val) {
      var myDefaults = {
         to: [],
         from: [],
         subject: this.subject,
         message: this.message,
      };

      super.initState(context, myDefaults, val);
   }
}


/***/ }),

/***/ 21297:
/*!************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessTaskEmail.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessTaskEmail)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessTaskEmailCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessTaskEmailCore.js */ 95316);
// import ABApplication from "./ABApplication"
// const ABApplication = require("./ABApplication"); // NOTE: change to require()


class ABProcessTaskEmail extends _core_process_tasks_ABProcessTaskEmailCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   ////
   //// Process Instance Methods
   ////

   warningsEval() {
      super.warningsEval();

      // check for warnings:

      if (!this.subject) {
         this.warningMessage("is missing a subject");
      }

      if (!this.message) {
         this.warningMessage("is missing a message");
      }

      this.verifySetting("to");
      this.verifySetting("from");
      this.verifyNextLane("to");
      if (this.from == "0") {
         let thisLane = this.myLane();
         if (!thisLane) {
            this.warningMessage(
               "can not resolve the lane participant for [.from] field."
            );
         }
      }
      this.verifyRoleAccount("to", "toUsers");
      this.verifyRoleAccount("from", "fromUsers");
   }

   /**
    * @method verifySetting()
    * make sure the given field key has a value assigned.
    * @param {string} key
    *        the property of this object to check. (to, from)
    */
   verifySetting(key) {
      if (this[key] == "") {
         this.warningMessage(`does not have a [${key}] setting.`);
      }
   }

   /**
    * @method verifyNextLane()
    * make sure we can access a Lane for the given property key.
    * The "to" field can reference the "Next Participant". This checks to
    * see if we can reference a lane for the next task.
    * @param {string} key
    *        the property that has the value for Next Participant. [to]
    */
   verifyNextLane(key) {
      if (this[key] === "0") {
         // Next Participant
         // we need to resolve our next task and see if we can pull the participant info from it.

         let nextTasks = this.process.connectionNextTask(this);
         let nextLanesResolved = true;
         nextTasks.forEach((t) => {
            let lane = t.myLane();
            if (!lane) {
               nextLanesResolved = false;
            }
         });
         if (!nextLanesResolved || nextTasks.length == 0) {
            this.warningMessage(
               `can not resolve next lane participant for [${key}] field.`
            );
         }
      }
   }

   /**
    * @method verifyRoleAccount()
    * Check to see if the provided property is set to use a Role/Account for
    * the email, and make sure there are values set for what is chosen.
    * @param {string} key
    *        the property we are currently validating.
    * @param {string} valKey
    *        the property that contains the specific value object.
    */
   verifyRoleAccount(key, valKey) {
      if (this[key] == "1") {
         if (this[valKey]) {
            if (this[valKey].useRole) {
               if (this[valKey].role.length == 0) {
                  this.warningMessage(`can not resolve [${key}] Role setting.`);
               }
            }
            if (this[valKey].useAccount) {
               if (this[valKey].account.length == 0) {
                  this.warningMessage(
                     `can not resolve [${key}] Account setting.`
                  );
               }
            }
            // TODO:
            // if (this[valKey].userFields.length > 0) {
            //    // how to know if this is a problem?
            // }
         }
      }
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessTaskEmail_js.bb3fe562f78db5b1466d.js.map