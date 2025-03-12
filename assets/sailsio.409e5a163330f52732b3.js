(self["webpackChunkab_platform_web"] = self["webpackChunkab_platform_web"] || []).push([["sailsio"],{

/***/ 40968:
/*!*************************!*\
  !*** ./init/sailsIo.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sails_io_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sails.io.js */ 2402);
/* harmony import */ var sails_io_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sails_io_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! socket.io-client */ 11004);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_1__);


window.io = sails_io_js__WEBPACK_IMPORTED_MODULE_0___default()((socket_io_client__WEBPACK_IMPORTED_MODULE_1___default()));
io.sails.reconnection = true;
// {bool}
// by default, sails.io will not reconnect.  setting this to true will
// tell it to auto reconnect.

window.__AB_socketReady_resolve();


/***/ }),

/***/ 25660:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor-node_modules_sails_io_js_sails_io_js-node_modules_socket_io-client_lib_index_js"], () => (__webpack_exec__(40968)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sailsio.409e5a163330f52732b3.js.map