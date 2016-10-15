webpackHotUpdate(0,{

/***/ 314:
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var FETCH = "hangperson/user/FETCH";
	var FETCH_SUCCESS = "hangperson/user/FETCH_SUCCESS";
	var FETCH_FAIL = "hangperson/user/FETCH_FAIL";
	var LOG_OUT = "hangperson/user/LOG_OUT";
	var LOG_OUT_SUCCESS = "hangperson/user/LOG_OUT_SUCCESS";
	var LOG_OUT_FAIL = "hangperson/user/LOG_OUT_FAIL";
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	  var action = arguments[1];
	
	  switch (action.type) {
	    case LOGGED_IN:
	      var user = action.payload.data;
	      return user;
	    case LOGGED_OUT:
	      return {};
	    default:
	      return state;
	  }
	};
	
	var logOut = exports.logOut = function logOut() {
	  return {
	    type: [LOG_OUT, LOG_OUT_SUCCESS, LOG_OUT_FAIL],
	    promise: axios.delete("/api/session")
	  };
	};
	
	var getCurrentUser = exports.getCurrentUser = function getCurrentUser() {
	  return {
	    type: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
	    promise: axios.get("/api/user/current")
	  };
	};

/***/ }

})
//# sourceMappingURL=0.1e81c3ddf053a65e7f11.hot-update.js.map