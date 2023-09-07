"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_process_tasks_ABProcessGatewayExclusive_js"],{

/***/ 89670:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/core/process/tasks/ABProcessGatewayExclusiveCore.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessGatewayExclusiveCore)
/* harmony export */ });
/* harmony import */ var _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../platform/process/tasks/ABProcessElement.js */ 50138);


var ABProcessGatewayExclusiveDefaults = {
   category: "gateway",
   // category: {string} | null
   // if this Element should show up on one of the popup replace menus, then
   // specify one of the categories of elements it should be an option for.
   // Available choices: [ "start", "gateway", "task", "end" ].
   //
   // if it shouldn't show up under the popup menu, then leave this null

   icon: "check-circle",
   // icon: {string}
   // font-awesome icon reference.  (without the 'fa-').  so 'user'  to
   // reference 'fa-user'

   instanceValues: [],
   // instanceValues: {array}
   // a list of values this element tracks as it is operating in a process.

   key: "GatewayExclusive",
   // key: {string}
   // unique key to reference this specific Task

   settings: ["conditions"],
   // settings: {array}
   // a list of internal setting values this Element tracks. These are the
   // values set by the platform .propertiesStash()
};

class ABProcessGatewayExclusiveCore extends _platform_process_tasks_ABProcessElement_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(attributes, process, AB) {
      attributes.type = attributes.type || "process.gateway.exclusive";
      super(attributes, process, AB, ABProcessGatewayExclusiveDefaults);

      // listen
   }

   // return the default values for this DataField
   static defaults() {
      return ABProcessGatewayExclusiveDefaults;
   }

   static DiagramReplace() {
      return {
         label: "Exclusive Gateway",
         actionName: "replace-with-exclusive-gateway",
         className: "bpmn-icon-gateway-xor",
         target: {
            type: "bpmn:ExclusiveGateway",
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

      this.conditions = this.conditions || {};
   }

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
   /*
    toObj() {
        var data = super.toObj();

        ABProcessGatewayExclusiveDefaults.fields.forEach((f) => {
            data[f] = this[f];
        });

        return data;
    }
    */

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
        var myDefaults = {
            userFormID: null,
            userFormResponse: null
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
   /*
    processDataFields() {
        // in this Task, we can return the Response to the UserForm
        return [
            {
                key: `${this.id}.userFormResponse`,
                label: `${this.label}->Response`
            }
        ];
    }
    */

   /**
    * processData()
    * return the current value requested for the given data key.
    * @param {obj} instance
    * @return {mixed} | null
    */
   /*
    processData(instance, key) {
        var parts = key.split(".");
        if (parts[0] == this.id) {
            var myState = this.myState(instance);
            return myState[parts[1]];
        }
        return null;
    }
    */
}


/***/ }),

/***/ 33401:
/*!*******************************************************************************!*\
  !*** ./src/js/AppBuilder/platform/process/tasks/ABProcessGatewayExclusive.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABProcessGatewayExclusive)
/* harmony export */ });
/* harmony import */ var _core_process_tasks_ABProcessGatewayExclusiveCore_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../core/process/tasks/ABProcessGatewayExclusiveCore.js */ 89670);


class ABProcessGatewayExclusive extends _core_process_tasks_ABProcessGatewayExclusiveCore_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
   ////
   //// Process Instance Methods
   ////

   /**
    * diagramProperties()
    * return a set of values for the XML shape definition based upon
    * the current values of this object.
    * @return {json}
    */
   diagramProperties() {
      // the first entry is for the gateway element itself
      var properties = super.diagramProperties();
      /*[
         {
            id: this.diagramID,
            def: {
               name: this.name,
            },
         },
      ];
      */

      // now add any additional updates for each of our connections:
      var myOutgoingConnections = this.process.connectionsOutgoing(
         this.diagramID
      );
      myOutgoingConnections.forEach((conn) => {
         properties.push({
            id: conn.id,
            def: {
               name: this.conditions[conn.id]?.label ?? "",
            },
         });
      });
      return properties;
   }

   warningsEval() {
      super.warningsEval();

      // make sure we have > 1 connection.
      const myOutgoingConnections = this.process.connectionsOutgoing(
         this.diagramID
      );
      if (myOutgoingConnections.length < 2) {
         this.warningMessage("should have multiple outgoing connections");
      }

      // make sure there is no more then 1 connection that doesn't have
      // a condition:
      let numCondWithOne = 0;
      myOutgoingConnections.forEach((c) => {
         if ((this.conditions[c.id]?.filterValue.rules?.length ?? 0) == 0) {
            numCondWithOne++;
         }
      });

      if (numCondWithOne > 1) {
         this.warningMessage(
            "should not have more than 1 unfiltered connection."
         );
      }
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_process_tasks_ABProcessGatewayExclusive_js.9c475d57511a88c367ce.js.map