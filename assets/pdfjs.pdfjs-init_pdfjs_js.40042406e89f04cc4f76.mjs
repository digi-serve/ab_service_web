"use strict";
(self["webpackChunkab_platform_web"] = self["webpackChunkab_platform_web"] || []).push([["pdfjs-init_pdfjs_js"],{

/***/ 12555:
/*!***********************!*\
  !*** ./init/pdfjs.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var pdfjs_dist_build_pdf_worker_mjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pdfjs-dist/build/pdf.worker.mjs */ 98013);
/**
 * pdfJS - load the pdfjs dependcies including the web worker. This is a
 * seperate file so we dynamically import it where needed, reducing the inital
 * size of the app.
 */


// import pdfjs from "pdfjs-dist/build/pdf.mjs";
const load = __webpack_require__.e(/*! import() */ "pdfjs-vendors-node_modules_pdfjs-dist_build_pdf_mjs").then(__webpack_require__.bind(__webpack_require__, /*! pdfjs-dist/build/pdf.mjs */ 28541));
const pdfjs = await load;
// const pdfjs = require("pdfjs-dist/build/pdf.mjs");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pdfjs);

// import * as pdfjsLib from "pdfjs-dist";
// import * as pdfWorker from "pdfjs-dist/build/pdf.worker.mjs";

// // Setting worker path to worker bundle.
// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// export { pdfjsLib };

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

}]);
//# sourceMappingURL=pdfjs.pdfjs-init_pdfjs_js.40042406e89f04cc4f76.mjs.map