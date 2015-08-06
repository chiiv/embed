// Globals
var chiiv = {};

(function() {
	// variables
	var user = false;
	// servers
	var DEBUG = window.DEBUG || ( (window.location.hostname == "localhost") ? true : false );
	if( DEBUG ){
		var url = "//localhost/";
		var cdn = "//localhost/";
	} else {
		var url = "//chiiv.com/";
		var cdn = "//cdn.chiiv.com/";
	}
	// defaults
	var defaults = {
		container: "body"
	}

	// add stylesheet
	var styles = document.createElement("link");
	styles.type = "text/css";
	styles.rel = "stylesheet";
	styles.href = cdn + "assets/css/embed.css";
	document.getElementsByTagName("head")[0].appendChild( styles );

	// initialize when the DOM is loaded
	var loadedStates = ["complete", "interactive"];
	if( loadedStates .indexOf( document.readyState ) > -1 ) {
		init();
	} else {
		window.onload = init;
	}

	function init(){
		// options
	}

	function award(params, callback ){
	};


// Helpers
// - grouping callbacks
function Promise (obj) {
	var args = null;
	var callbacks = [];
	var resolved = false;

	this.add = function(callback) {
		if (resolved) {
			callback.apply(obj, args);
		} else {
			callbacks.push(callback);
		}
	},

	this.resolve = function() {
		if (!resolved) {
			args = arguments;
			resolved = true;

			var callback;
			while (callback = callbacks.shift()) {
				callback.apply(obj, arguments);
			}

			callbacks = null;
		}
	}
};


// - create an ajax request
function ajax( url, callback ){

	//console.log( url );

	var req = new XMLHttpRequest();
	var self = this;

	req.open("GET",url,true);
	req.send(null);
	req.onerror = function(){
		console.log("there was an error with your request");
	};
	req.onload = function(e){
		// graceful parsing
		try{
			var response = JSON.parse(e.target.responseText);
			callback.call(self, response);
		} catch( e ){
			if( DEBUG ) console.log( e );
			callback.call(self, false);
		}
	}

}

// - cookies...
var Cookie = {
	get : function(name) {
		var i,key,value,cookies=document.cookie.split(";");
		for (i=0;i<cookies.length;i++){
			key=cookies[i].substr(0,cookies[i].indexOf("="));
			value=cookies[i].substr(cookies[i].indexOf("=")+1);
			key=key.replace(/^\s+|\s+$/g,"");
			if (key==name){
				return unescape(value);
			}
		}
	},

	set : function(name,val,expiry){
		var date = new Date( ( new Date() ).getTime() + parseInt(expiry) );
		var value=escape(val) + ((expiry==null) ? "" : "; expires="+date.toUTCString());
		document.cookie=name + "=" + value;
	},

	check : function( name ){
		var cookie=this.get( name );
		if (cookie!=null && cookie!=""){
			return true;
		} else {
			return false;
		}
	}

};

// lookup query params
function query(name) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (i=0; i < vars.length; i++) {
		var target = vars[i].split("=");
		if (target[0] == name) {
			return decodeURIComponent( target[1] );
		}
	}
	return false;
}

// Source: http://phpjs.org/functions/ucwords/
function ucwords(str) {
	return (str + '')
		.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
			return $1.toUpperCase();
		});
}

// create a new instance of the lib in the global namespace
//this.chiiv = new Chiiv();

// Public methods
window.chiiv.award = award;


}).call(this);
