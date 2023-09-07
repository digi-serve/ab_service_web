"use strict";
(globalThis["webpackChunkappbuilder_pwa"] = globalThis["webpackChunkappbuilder_pwa"] || []).push([["src_js_AppBuilder_platform_dataFields_ABFieldFile_js"],{

/***/ 27007:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/core/dataFields/ABFieldFileCore.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldFileCore)
/* harmony export */ });
/* harmony import */ var _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../platform/dataFields/ABField */ 38817);
/*
 * ABFieldFile
 *
 * An ABFieldFile defines a File field type.
 *
 */



const ABFieldFileDefaults = {
   key: "file",
   // unique key to reference this specific DataField

   description: "Attach a File to this object.",
   // description: what gets displayed in the Editor description.
   // NOTE: this will be displayed using a Label: L(description)

   icon: "file",
   // font-awesome icon reference.  (without the 'fa-').  so 'file'  to
   // reference 'fa-file'

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

   menuName: "File Attachment",
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
   removeExistingData: 0,
   fileSize: 0,
   fileType: "",
};

class ABFieldFileCore extends _platform_dataFields_ABField__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object, ABFieldFileDefaults);
   }

   // return the default values for this DataField
   static defaults() {
      return ABFieldFileDefaults;
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
      this.settings.fileSize = parseInt(this.settings.fileSize);
      this.settings.limitFileSize = parseInt(this.settings.limitFileSize);
      this.settings.limitFileType = parseInt(this.settings.limitFileType);
      this.settings.removeExistingData = parseInt(
         this.settings.removeExistingData
      );
   }

   /**
    * @method dataValue
    * return the file data stored as part of this field.
    *
    * An ABFieldFile column contains a json structure that contains
    *  .uuid : {string} a file uuid reference
    *  .filename : {string} the name of the file that was uploaded.
    *
    * This will return the json object.
    * @param {obj} values a key=>value hash of the current values.
    * @return {obj} { uuid, filename }, or {} if empty.
    */
   dataValue(rowData) {
      const propName = `${this.alias || this.object.name}.${this.columnName}`;

      let result = rowData[this.columnName] || rowData[propName] || {};
      if (typeof result == "string") {
         try {
            result = JSON.parse(result);
         } catch (err) {
            // ignore error
         }
      }

      return result;
   }

   /**
    * @method defaultValue
    * insert a key=>value pair that represent the default value
    * for this field.
    *
    * An ABFieldFile expects a json structure that contains
    *  .uuid : {string} a file uuid reference
    *  .filename : {string} the name of the file that was uploaded.
    *
    * For a default value, we return an empty json object: "{}"
    * @param {obj} values a key=>value hash of the current values.
    */
   defaultValue(values) {
      values[this.columnName] = "{}";
   }

   format(rowData) {
      let result = this.dataValue(rowData);
      if (result) {
         if (typeof result == "string") {
            try {
               result = JSON.parse(result);
            } catch (err) {
               // ignore error.
            }
         }

         // return file name
         return result ? result.filename || "" : "";
      } else {
         return "";
      }
   }

   /**
    * @method requestParam
    * return the entry in the given input that relates to this field.
    * @param {obj} allParameters  a key=>value hash of the inputs to parse.
    * @return {obj} or undefined
    */
   requestParam(allParameters) {
      const myParameter = super.requestParam(allParameters);

      // if we have our default empty object, then remove the entry
      // and let the DB insert a null value.
      if (myParameter?.[this.columnName] == "{}") {
         delete myParameter[this.columnName];
      }

      return myParameter;
   }
}


/***/ }),

/***/ 5833:
/*!**************************************************************!*\
  !*** ./src/js/AppBuilder/platform/dataFields/ABFieldFile.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABFieldFile)
/* harmony export */ });
/* harmony import */ var _core_dataFields_ABFieldFileCore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/dataFields/ABFieldFileCore */ 27007);


class ABFieldFile extends _core_dataFields_ABFieldFileCore__WEBPACK_IMPORTED_MODULE_0__["default"] {
   constructor(values, object) {
      super(values, object);
   }

   ///
   /// Instance Methods
   ///

   isValid() {
      const validator = super.isValid();

      // validator.addError('columnName', L('ab.validation.object.name.unique', 'Field columnName must be unique (#name# already used in this Application)').replace('#name#', this.name) );

      return validator;
   }

   /**
    * @function destroy
    * On a destroy operation, ask if the user wants to keep the related file.
    */
   async destroy() {
      var L = this.AB.Label();
      return new Promise((resolve, reject) => {
         // verify we have been .save()d before:
         if (!this.id) {
            resolve();
            return;
         }

         // Ask the user what to do about the existing file:
         webix.confirm({
            title: L("Keep Files?"),
            message: L("Do you want to keep the files referenced by {0}?", [
               this.label,
            ]),
            callback: async (result) => {
               // update this setting so the server can respond correctly in
               // ABFieldFile.migrateDrop()
               this.settings.removeExistingData = result ? 0 : 1;

               try {
                  await this.save();

                  // TODO: a reminder that you still got alot on the server to do!
                  webix.alert({
                     title: "!! TODO !!",
                     text: "Tell a Developer to actually pay attention to this!",
                  });

                  // now the default .destroy()
                  await super.destroy();

                  resolve();
               } catch (err) {
                  reject(err);
               }
            },
         });
      });
   }

   ///
   /// Working with Actual Object Values:
   ///

   // return the grid column header definition for this instance of ABFieldFile
   columnHeader(options) {
      options = options || {};

      const config = super.columnHeader(options);

      config.editor = false;

      const editable = options.editable;

      // populate our default template:
      config.template = (obj) => {
         if (obj.$group) return this.dataValue(obj);

         const fileDiv = [
            '<div class="ab-file-data-field" style="float: left;">',
            '<div class="webix_view ab-file-holder">',
            '<div class="webix_template">',
            this.fileTemplate(obj, editable),
            "</div>",
            "</div>",
            "</div>",
         ].join("");

         return fileDiv;
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
      var L = this.AB.Label();

      let typesList = [];
      let maximumSize = 0;

      if (this.settings.limitFileType && this.settings.fileType) {
         typesList = this.settings.fileType.split(",");
      }

      if (this.settings.limitFileSize && this.settings.fileSize) {
         maximumSize = this.settings.fileSize;
      }

      // 		// safety check:
      // 		// webix seems to crash if you specify a .container that doesn't exists:
      // 		// Note: when the template is first created, we don't have App.unique()
      const parentContainer = node.querySelector(".ab-file-holder");
      if (parentContainer) {
         parentContainer.innerHTML = "";
         // parentContainer.id = idBase;	// change it to the unique one.

         // 			// use a webix component for displaying the content.
         // 			// do this so I can use the progress spinner

         const webixContainer = webix.ui({
            view: "template",
            container: parentContainer,

            template: this.fileTemplate(row, options.editable),

            borderless: true,
            width: 160,
            height: 60,
         });
         webix.extend(webixContainer, webix.ProgressBar);

         // 			////
         // 			//// Prepare the Uploader
         // 			////

         if (!options.editable) {
            const domNode = parentContainer.querySelector(".delete-image");
            if (domNode) domNode.style.display = "none";

            return;
         }

         const url = this.urlUpload(true);

         const uploader = webix.ui({
            view: "uploader",
            apiOnly: true,
            upload: url,
            inputName: "file",
            multiple: false,
            on: {
               // when a file is added to the uploader
               onBeforeFileAdd: function (item) {
                  node.classList.remove("webix_invalid");
                  node.classList.remove("webix_invalid_cell");

                  // verify file type
                  const acceptableTypes = typesList;
                  if (acceptableTypes && acceptableTypes != "") {
                     const type = item.type.toLowerCase();
                     if (acceptableTypes.indexOf(type) == -1) {
                        webix.message(
                           L("Only [{0}] files are supported", [
                              acceptableTypes.join(", "),
                           ])
                        );
                        return false;
                     }
                  }

                  //verify file size
                  //Convert to MegaBytes
                  if (maximumSize > 0) {
                     const acceptableSizes = maximumSize * 1000000;
                     if (item.size > acceptableSizes) {
                        webix.message(
                           L("Maximum file size is {0}MB", [maximumSize])
                        );
                        return false;
                     }
                  }

                  // start progress indicator
                  webixContainer.showProgress({
                     type: "icon",
                     delay: 2000,
                  });
               },

               // when upload is complete:
               onFileUpload: async (item, response) => {
                  webixContainer.hideProgress();
                  // this.showFile(idBase, response.data.uuid);

                  const values = {};
                  values[this.columnName] = {};
                  values[this.columnName].uuid = response.data.uuid;
                  values[this.columnName].filename = item.name;

                  // update just this value on our current object.model
                  if (row.id) {
                     try {
                        await this.object.model().update(row.id, values);

                        // update the client side data object as well so other data changes won't cause this save to be reverted
                        if ($$(node) && $$(node).updateItem)
                           $$(node).updateItem(row.id, values);
                     } catch (err) {
                        node.classList.add("webix_invalid");
                        node.classList.add("webix_invalid_cell");

                        this.AB.notify.developer(err, {
                           context:
                              "ABFieldFile.onFileUpload(): Error updating our entry.",
                           row: row,
                           values: values,
                        });
                     }
                  }

                  // update value in the form component
                  this.setValue($$(node), values);
               },

               // if an error was returned
               onFileUploadError: (item, response) => {
                  this.AB.notify.developer(new Error("Error loading file"), {
                     message: "Error loading file",
                     response,
                  });
                  webixContainer.hideProgress();
               },
            },
         });
         uploader.addDropZone(webixContainer.$view);

         // store upload id into html element (it will be used in .customEdit)
         node.dataset["uploaderId"] = uploader.config.id;

         // open file upload dialog when's click
         node.addEventListener("click", (e) => {
            if (e.target.className.indexOf("delete-image") > -1) {
               this.deleteFile = true;
            }
         });
      }
   }

   /*
    * @function customEdit
    *
    * @param {object} row is the {name=>value} hash of the current row of data.
    * @param {App} App the shared ui App object useful more making globally
    *					unique id references.
    * @param {HtmlDOM} node  the HTML Dom object for this field's display.
    */
   customEdit(row, App, node) {
      var L = this.AB.Label();
      if (this.deleteFile == true) {
         // remove the property because it is only needed to prevent the file dialog from showing
         delete this.deleteFile;

         // Ask the user if they really want to delete the photo
         webix.confirm({
            title: "",
            message: L("Are you sure you want to remove this file?"),
            callback: async (result) => {
               const confirmDelete = result ? 1 : 0;
               if (confirmDelete) {
                  // update just this value on our current object.model
                  const values = {};
                  values[this.columnName] = "";

                  if (row.id) {
                     try {
                        await this.object.model().update(row.id, values);

                        // update the client side data object as well so other data changes won't cause this save to be reverted
                        if ($$(node) && $$(node).updateItem)
                           $$(node).updateItem(row.id, values);
                     } catch (err) {
                        node.classList.add("webix_invalid");
                        node.classList.add("webix_invalid_cell");

                        this.AB.notify.developer(err, {
                           message: "Error updating our entry.",
                           row: row,
                           values: values,
                        });
                     }
                  }
                  // update value in the form component
                  else {
                     this.setValue($$(node), values);
                  }
               }
            },
         });
      } else {
         const rowData = this.dataValue(row);
         if (!rowData || !rowData.uuid) {
            const uploaderId = node.dataset["uploaderId"],
               uploader = $$(uploaderId);

            if (uploader && uploader.fileDialog)
               uploader.fileDialog({ rowid: row.id });
         }
      }

      return false;
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
      return super.formComponent("fieldcustom");
   }

   detailComponent() {
      const detailComponentSetting = super.detailComponent();

      detailComponentSetting.common = () => {
         return {
            key: "detailcustom",
         };
      };

      return detailComponentSetting;
   }

   //File Template

   fileTemplate(obj, editable) {
      let L = this.AB.Label();
      let iconDisplay = "";
      let fileDisplay = "display:none;";
      let fileURL = "";

      let value = "";
      let name = "";

      const rowData = this.dataValue(obj);
      if (rowData) {
         value = rowData.uuid;
         name = rowData.filename;
      }

      if (value && name) {
         iconDisplay = "display:none;";
         fileDisplay = "";
         fileURL = "/file/" + value;
      }

      const html = [
         `<div class="file-data-field-icon" style="text-align: center; height: inherit; display: table-cell; vertical-align: middle; border: 2px dotted #CCC; background: #FFF; border-radius: 10px; font-size: 11px; line-height: 13px; padding: 0 10px; ${iconDisplay}"><i class="fa fa-file fa-2x" style="opacity: 0.6; font-size: 32px; margin-top: 3px; margin-bottom: 5px;"></i>${
            editable ? `<br/>${L("Drag and drop or click here")}` : ""
         }</div>`,
         `<div class="file-data-field-name" style=" width:100%; height:100%; position:relative; "><a target="_blank" href="${fileURL}">${
            name || ""
         }</a>${
            editable
               ? `<a style="${fileDisplay}" class="ab-delete-photo" href="javascript:void(0);"><i class="fa fa-times delete-image"></i></a>`
               : ""
         }</div>`,
      ].join("");

      return html;
   }

   getValue(item, rowData) {
      const file = item.$view.querySelector(".file-data-field-name");
      const fileLink = file.querySelector("a");

      return {
         uuid: file.getAttribute("file-uuid"),
         filename: fileLink.innerHTML,
      };
   }

   setValue(item, rowData) {
      if (!item) return;

      const domNode = item.$view;
      if (!domNode) return;

      let val = null;
      if (rowData) {
         val = this.dataValue(rowData);

         // if (val == null) {
         // 	// assume they just sent us a single value
         // 	val = rowData;
         // }
      }

      const fileicon = domNode.querySelector(".file-data-field-icon");
      if (fileicon) fileicon.style.display = val && val.uuid ? "none" : "block";

      const file = domNode.querySelector(".file-data-field-name");
      if (file) {
         const fileDeleteIcon = file.querySelector(".ab-delete-photo");
         if (fileDeleteIcon)
            fileDeleteIcon.style.display = val && val.uuid ? "block" : "none";

         file.style.display = val && val.uuid ? "block" : "none";
         if (val && val.uuid) file.setAttribute("file-uuid", val.uuid);
         else file.removeAttribute("file-uuid");

         const fileLink = file.querySelector("a");
         const fileURL = "/file/" + (val ? val.uuid : "");
         fileLink.href = fileURL;
         fileLink.innerHTML = val ? val.filename : "";
      }
   }

   /**
    * @method urlUpload()
    * return the url for uploading a file.
    * When used in a webix widget, the response is different than our normal
    * API, so we can pass in a param to indicate a response compatible with
    * webix.
    * @param {bool} isWebix
    *        Is this url being used by a webix component?
    * @return {string}
    */
   urlUpload(isWebix = true) {
      return `/file/upload/${this.object.id}/${this.id}/${isWebix ? "1" : "0"}`;
   }

   /**
    * @method urlFile
    * return the url to use to reference the file by it's id.
    * @param {string} id uuid reference of this file.
    * @return {string}
    */
   urlFile(id) {
      return `/file/${id}`;
   }
}


/***/ })

}]);
//# sourceMappingURL=mobile_src_js_AppBuilder_platform_dataFields_ABFieldFile_js.8be437db974bbde982e9.js.map