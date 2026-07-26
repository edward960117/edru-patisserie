"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_lib_prisma_ts";
exports.ids = ["_rsc_lib_prisma_ts"];
exports.modules = {

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _prisma_adapter_neon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @prisma/adapter-neon */ \"(rsc)/./node_modules/@prisma/adapter-neon/dist/index.mjs\");\n\n\nlet prismaClient;\nconst connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL || \"\";\ntry {\n    if (connectionString) {\n        const adapter = new _prisma_adapter_neon__WEBPACK_IMPORTED_MODULE_1__.PrismaNeonHttp(connectionString, {});\n        prismaClient = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n            adapter\n        });\n    } else {\n        prismaClient = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n    }\n} catch  {\n    prismaClient = new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n}\nconst prisma = global.prisma ?? prismaClient;\nif (true) {\n    global.prisma = prisma;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBOEM7QUFDUTtBQU90RCxJQUFJRTtBQUVKLE1BQU1DLG1CQUFtQkMsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLElBQUlGLFFBQVFDLEdBQUcsQ0FBQ0UsVUFBVSxJQUFJO0FBRS9FLElBQUk7SUFDRixJQUFJSixrQkFBa0I7UUFDcEIsTUFBTUssVUFBVSxJQUFJUCxnRUFBY0EsQ0FBQ0Usa0JBQWtCLENBQUM7UUFDdERELGVBQWUsSUFBSUYsd0RBQVlBLENBQUM7WUFBRVE7UUFBUTtJQUM1QyxPQUFPO1FBQ0xOLGVBQWUsSUFBSUYsd0RBQVlBO0lBQ2pDO0FBQ0YsRUFBRSxPQUFNO0lBQ05FLGVBQWUsSUFBSUYsd0RBQVlBO0FBQ2pDO0FBRU8sTUFBTVMsU0FBU0MsT0FBT0QsTUFBTSxJQUFJUCxhQUFhO0FBRXBELElBQUlFLElBQXFDLEVBQUU7SUFDekNNLE9BQU9ELE1BQU0sR0FBR0E7QUFDbEIiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcdWlmNTAxMzNcXGVkcnUtcGF0aXNzZXJpZVxcbGliXFxwcmlzbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCI7XHJcbmltcG9ydCB7IFByaXNtYU5lb25IdHRwIH0gZnJvbSBcIkBwcmlzbWEvYWRhcHRlci1uZW9uXCI7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXZhclxyXG4gIHZhciBwcmlzbWE6IFByaXNtYUNsaWVudCB8IHVuZGVmaW5lZDtcclxufVxyXG5cclxubGV0IHByaXNtYUNsaWVudDogUHJpc21hQ2xpZW50O1xyXG5cclxuY29uc3QgY29ubmVjdGlvblN0cmluZyA9IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTCB8fCBwcm9jZXNzLmVudi5ESVJFQ1RfVVJMIHx8IFwiXCI7XHJcblxyXG50cnkge1xyXG4gIGlmIChjb25uZWN0aW9uU3RyaW5nKSB7XHJcbiAgICBjb25zdCBhZGFwdGVyID0gbmV3IFByaXNtYU5lb25IdHRwKGNvbm5lY3Rpb25TdHJpbmcsIHt9KTtcclxuICAgIHByaXNtYUNsaWVudCA9IG5ldyBQcmlzbWFDbGllbnQoeyBhZGFwdGVyIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwcmlzbWFDbGllbnQgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbiAgfVxyXG59IGNhdGNoIHtcclxuICBwcmlzbWFDbGllbnQgPSBuZXcgUHJpc21hQ2xpZW50KCk7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWwucHJpc21hID8/IHByaXNtYUNsaWVudDtcclxuXHJcbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcclxuICBnbG9iYWwucHJpc21hID0gcHJpc21hO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJQcmlzbWFOZW9uSHR0cCIsInByaXNtYUNsaWVudCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwiRElSRUNUX1VSTCIsImFkYXB0ZXIiLCJwcmlzbWEiLCJnbG9iYWwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;