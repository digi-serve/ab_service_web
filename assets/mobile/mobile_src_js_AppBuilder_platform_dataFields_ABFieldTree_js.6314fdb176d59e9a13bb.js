"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldTree_js"],{

/***/ 13299:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldTreeCore.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldTreeCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABFieldSelectivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABFieldSelectivity */ 55522);
/*
 * ABFieldTreeCore
 *
 * An ABFieldTree defines a select list field type.
 *
 */



const ABFieldTreeDefaults = {
   key: "tree",
   // unique key to reference this specific DataField

   description:
      "Data tree allows you to build a hierarchical set of selectable data. (ex: Categories and sub-categories)",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "sitemap",
   // font-awesome icon reference.  (without the 'fa-').  so 'sitemap'  to
   // reference 'fa-sitemap'

   isFilterable: false,
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

   menuName: "Data Tree",
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

   compatibleMysqlTypes: ["text", "mediumtext", "longtext"],
   // {array}
   // what types of MySql column types can be imported into this data type?
   // https://www.techonthenet.com/mysql/datatypes.php
};

const defaultValues = {
   options: [],
};

class ABFieldTreeCore extends _platform_dataFields_ABFieldSelectivity__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldTreeDefaults);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldTreeDefaults;
   }

   static defaultValues() {
      return defaultValues;
   }

   ///
   /// Instance Methods
   ///

   /**
    * @method fromValues()
    *
    * initialze this object with the given set of values.
    * @param {obj} values
    */
   fromValues(values) {
      super.fromValues(values);

      // translate options list
      if (this.settings.options && this.settings.options.length > 0) {
         this.settings.options.forEach((opt) => {
            this.translate(opt, opt, ["text"]);
         });
      }
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
   toObj() {
      const obj = super.toObj();

      // Un-translate options list
      if (obj.settings.options && obj.settings.options.length > 0) {
         obj.settings.options.forEach((opt) => {
            this.unTranslate(opt, opt, ["text"]);
         });
      }

      return obj;
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
   defaultValue(values) {}

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
}


/***/ }),

/***/ 32001:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldTree.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldTree)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldTreeCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldTreeCore */ 13299);


class ABFieldTree extends _core_dataFields_ABFieldTreeCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   // constructor(values, object) {
   //    super(values, object);
   // }

   ///
   /// Instance Methods
   ///

   // isValid() {
   //    const validator = super.isValid();

   //    // validator.addError('columnName', L('ab.validation.object.name.unique', 'Field columnName must be unique (#name# already used in this Application)').replace('#name#', this.name) );

   //    return validator;
   // }

   ///
   /// Working with Actual Object Values:
   ///

   idCustomContainer(obj) {
      return `${this.columnName.replace(/ /g, "_")}-${obj.id}-tree`;
   }

   // return the grid column header definition for this instance of ABFieldTree
   columnHeader(options) {
      options = options || {};
      const L = this.AB.Label();

      const config = super.columnHeader(options);
      const field = this;

      let formClass = "";
      let placeHolder = "";
      if (options.isForm) {
         formClass = " form-entry";
         placeHolder =
            "<span style='color: #CCC; padding: 0 5px;'>" +
            L("Select items") +
            "</span>";
      }

      const width = options.width;

      config.template = (obj) => {
         if (obj.$group) return obj[field.columnName];

         const branches = [];
         let selectOptions = this.AB.cloneDeep(field.settings.options);
         selectOptions = new webix.TreeCollection({
            data: selectOptions,
         });

         let values = obj;
         if (obj[field.columnName] != null) {
            values = obj[field.columnName];
         }

         selectOptions.data.each(function (obj) {
            if (
               typeof values.indexOf != "undefined" &&
               values.indexOf(obj.id) != -1
            ) {
               let html = "";

               let rootid = obj.id;
               while (this.getParentId(rootid)) {
                  selectOptions.data.each(function (par) {
                     if (selectOptions.data.getParentId(rootid) == par.id) {
                        html = par.text + ": " + html;
                     }
                  });
                  rootid = this.getParentId(rootid);
               }

               html += obj.text;
               branches.push(html);
            }
         });

         const myHex = "#4CAF50";
         let nodeHTML = "";
         nodeHTML += "<div class='list-data-values'>";
         if (branches.length == 0) {
            nodeHTML += placeHolder;
         } else {
            branches.forEach(function (item) {
               nodeHTML +=
                  '<span class="selectivity-multiple-selected-item rendered" style="background-color:' +
                  myHex +
                  ' !important;">' +
                  item +
                  "</span>";
            });
         }
         nodeHTML += "</div>";

         // field.setBadge(node, App, row);

         if (width) {
            return (
               '<div style="margin-left: ' +
               width +
               'px;" class="list-data-values' +
               formClass +
               '">' +
               nodeHTML +
               "</div>"
            );
         } else {
            return (
               '<div class="list-data-values' +
               formClass +
               '">' +
               nodeHTML +
               "</div>"
            );
         }
      };

      return config;
   }

   /*
    * @function customDisplay
    * perform any custom display modifications for this field.
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *					unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   customDisplay(row, App, node, options) {
      // sanity check.
      if (!node) {
         return;
      }

      options = options || {};
      const L = this.AB.Label();

      const field = this;

      if (options.isForm) {
         if (!row || row.length == 0) {
            node.innerHTML =
               "<div class='list-data-values form-entry'><span style='color: #CCC; padding: 0 5px;'>" +
               L("Select items") +
               "</span></div>";
            return;
         }

         const branches = [];
         options = this.AB.cloneDeep(field.settings.options);
         options = new webix.TreeCollection({
            data: options,
         });

         let values = row;
         if (row[field.columnName] != null) {
            values = row[field.columnName];
         }

         options.data.each(function (obj) {
            if (
               typeof values.indexOf != "undefined" &&
               values.indexOf(obj.id) != -1
            ) {
               let html = "";

               let rootid = obj.id;
               while (this.getParentId(rootid)) {
                  options.data.each(function (par) {
                     if (options.data.getParentId(rootid) == par.id) {
                        html = par.text + ": " + html;
                     }
                  });
                  rootid = this.getParentId(rootid);
               }

               html += obj.text;
               branches.push(html);
            }
         });

         const myHex = "#4CAF50";
         let nodeHTML = "";
         nodeHTML += "<div class='list-data-values form-entry'>";
         branches.forEach(function (item) {
            nodeHTML +=
               '<span class="selectivity-multiple-selected-item rendered" style="background-color:' +
               myHex +
               ' !important;">' +
               item +
               "</span>";
         });
         nodeHTML += "</div>";

         node.innerHTML = nodeHTML;
      }

      field.setBadge(node, App, row);
   }

   /*
    * @function customEdit
    *
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *					unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   customEdit(row, App, node, component) {
      const idBase = App.unique(this.idCustomContainer(row));
      const idPopup = `${idBase}-popup`;
      const idTree = `${idBase}-tree`;
      const view = $$(node);
      const field = this;
      const parentComponent = component;
      let values = {};
      let firstRender = true;

      function getValues(field, row) {
         let values = {};
         if (
            typeof field != "undefined" &&
            typeof field.columnName != "undefined" &&
            typeof row[field.columnName] != "undefined"
         ) {
            values = row[field.columnName];
         }
         return values;
      }

      function populateTree(field, vals) {
         values = getValues(field, vals);

         const $Tree = $$(idTree);
         $Tree.blockEvent(); // prevents endless loop

         const options = field.AB.cloneDeep(field.settings.options);
         $Tree.clearAll();
         $Tree.parse(options);
         $Tree.refresh();
         $Tree.uncheckAll();
         $Tree.openAll();

         if (values != null && values.length) {
            values.forEach(function (id) {
               if ($Tree.exists(id)) {
                  $Tree.checkItem(id);
                  const dom = $Tree.getItemNode(id);
                  dom.classList.add("selected");
               }
            });
         }
         $Tree.unblockEvent();
      }

      if ($$(idPopup)) {
         $$(idPopup).show();
         populateTree(this, row);
      } else {
         webix
            .ui({
               id: idPopup,
               view: "popup",
               width: 500,
               height: 400,
               on: {
                  onShow: () => {
                     if (firstRender == true) populateTree(this, row);

                     firstRender = false;
                  },
               },
               body: {
                  id: idTree,
                  view: "tree",
                  css: "ab-data-tree",
                  template: function (obj, common) {
                     return (
                        "<label>" +
                        common.checkbox(obj, common) +
                        "&nbsp;" +
                        obj.text +
                        "</label>"
                     );
                  },
                  on: {
                     onItemCheck: async function (id, value, event) {
                        const dom = this.getItemNode(id);
                        const tree = this;
                        if (value == true) {
                           dom.classList.add("selected");
                        } else {
                           dom.classList.remove("selected");
                        }
                        // works for the same-level children only
                        // except root items
                        if (this.getParentId(id)) {
                           tree.blockEvent(); // prevents endless loop

                           let rootid = id;
                           while (this.getParentId(rootid)) {
                              rootid = this.getParentId(rootid);
                              if (rootid != id) tree.uncheckItem(rootid);
                           }

                           this.data.eachSubItem(rootid, function (item) {
                              if (item.id != id) tree.uncheckItem(item.id);
                           });

                           tree.unblockEvent();
                        } else {
                           tree.blockEvent(); // prevents endless loop
                           this.data.eachSubItem(id, function (obj) {
                              if (obj.id != id) tree.uncheckItem(obj.id);
                           });
                           tree.unblockEvent();
                        }
                        const values = {};
                        values[field.columnName] = $$(idTree).getChecked();

                        if (row.id) {
                           // pass null because it could not put empty array in REST api
                           if (values[field.columnName].length == 0)
                              values[field.columnName] = "";

                           try {
                              await field.object.model().update(row.id, values);

                              // update the client side data object as well so other data changes won't cause this save to be reverted
                              if (view && view.updateItem) {
                                 view.updateItem(row.id, values);
                              }
                           } catch (err) {
                              node.classList.add("webix_invalid");
                              node.classList.add("webix_invalid_cell");

                              this.AB.notify.developer(err, {
                                 message: "Error updating our entry.",
                                 row: row,
                                 values: values,
                              });
                           }
                        } else {
                           const rowData = {};
                           rowData[field.columnName] = $$(idTree).getChecked();

                           field.setValue($$(parentComponent.ui.id), rowData);
                        }
                     },
                  },
               },
            })
            .show(node, {
               x: -7,
            });
      }
      return false;
   }

   setBadge(domNode, row) {
      const field = this;
      domNode = domNode.querySelector(".list-data-values");
      const innerHeight = domNode.scrollHeight;
      const outerHeight = domNode.parentElement.clientHeight;
      if (innerHeight - outerHeight > 5) {
         let count = 0;
         if (row[field.columnName] && row[field.columnName].length)
            count = row[field.columnName].length;
         else count = 0;

         if (count > 1) {
            const badge = domNode.querySelector(
               ".webix_badge.selectivityBadge"
            );
            if (badge != null) {
               badge.innerHTML = count;
            } else {
               const anchor = document.createElement("A");
               anchor.href = "javascript:void(0);";
               anchor.addEventListener("click", function (event) {
                  // v2: this was just saving the new height to the
                  // field properties. We don't do that anymore:
                  // App.actions.onRowResizeAuto(row.id, innerHeight);
                  event.stopPropagation();
               });
               const node = document.createElement("SPAN");
               const textnode = document.createTextNode(count);
               node.classList.add("webix_badge", "selectivityBadge");
               node.appendChild(textnode);
               anchor.appendChild(node);
               domNode.appendChild(anchor);
            }
         }
      }
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
      return super.formComponent("formtree");
   }

   detailComponent() {
      const detailComponentSetting = super.detailComponent();

      detailComponentSetting.common = () => {
         return {
            key: "detailtree",
         };
      };

      return detailComponentSetting;
   }

   getValue(item, rowData) {
      let values = {};
      values = item.getValues();
      return values;
   }

   setValue(item, rowData) {
      if (!item) return false;

      const val = rowData[this.columnName] || [];

      item.setValues(val);
      // get dom
      const dom = item.$view.querySelector(".list-data-values");

      if (!dom) return false;

      // set value to selectivity
      this.customDisplay(val, this.App, dom, {
         editable: true,
         isForm: true,
      });

      setTimeout(function () {
         let height = 33;
         if (dom.scrollHeight > 33) {
            height = dom.scrollHeight;
         }
         item.config.height = height + 5;
         item.resize();
      }, 200);
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldTree_js.6314fdb176d59e9a13bb.js.map