/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RPNTransform)
/* harmony export */ });
/* harmony import */ var _stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


const opList = ['+', '-', '*', '/'];
const leftScope = ['(', '[', '{'];
const rightScope = [')', ']', '}'];
const opPriority = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
}

function RPNTransform(str){
  const arr = str.split();
  let opStr = '';
  let stack = new _stack__WEBPACK_IMPORTED_MODULE_0__.default();
  arr.reduce((acc, cur) => {
    if([...opList, ...leftScope, ...rightScope].indexOf(cur) !== -1){
      if(acc !== ''){
        opStr += `${cur} `;
      }
      if(stack.isEmpty()){
        stack.push(acc);
      }
      else{
        const indexRight = rightScope.indexOf(cur);
        if(indexRight !== -1){
          let topEle = stack.pop();
          while(topEle !== leftScope[indexRight]){
            opStr += `${topEle} `;
          }
        }
        else if(leftScope.indexOf(cur) !== -1 || opPriority[stack.getTopEle()] <= opPriority[cur]){
          stack.push(acc);
        }
        else{
          let topEle = stack.pop();
          while(leftScope.indexOf(topEle) !== -1){
            opStr += `${topEle} `
          }
          stack.push(acc)
        }
      }
    }
    else{
      acc += cur;
    }
    console.log(acc, '---acc');
    console.log(opStr, '--- RPNStr');
  }, '')
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stack)
/* harmony export */ });
class Stack{
  _top = -1;
  _MAX_LENGTH = null;
  _arr = [];

  constructor(length){
    this._MAX_LENGTH = length;
    this._arr = new Array(length);
  }

  push(ele){
    if(this.top === this._MAX_LENGTH - 1){
      console.error('栈已满');
      return;
    }
    this._top++;
    this._arr[this._top] = ele;
  }

  pop(ele){
    if(this.top === -1){
      console.error('栈为空');
      return;
    }
    const e = this._arr[this._top];
    this._arr[this._top] = undefined;
    this._top--;
    return e;
  }

  getTopEle(){
    if(this._top === -1){
      console.error('空栈');
      return;
    }
    return this._arr[this._top];
  }

  isEmpty(){
    return this._top === -1;
  }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _quadrature__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const str = document.getElementById('input').value;
document.getElementById('main-btn').onclick = (0,_quadrature__WEBPACK_IMPORTED_MODULE_0__.default)(str);

})();

/******/ })()
;
//# sourceMappingURL=main.js.map