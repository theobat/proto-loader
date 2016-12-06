'use strict';

//let fs = require('fs');
let protobuf = require('protobufjs');
let protoTarget = require('protobufjs/cli/targets/json');
//let protoUtil = require('protobufjs/cli/util');
//let path = require("path");
let loaderUtils = require('loader-utils');

module.exports = function (source) {
	let options = loaderUtils.parseQuery(this.query) || {};
	//let self = this;

    let callback = this.async();

    if (!callback) {
      throw 'proto-loader currently only supports async mode.';
    }
    
	if (this.cacheable()) {
		this.cacheable();
	}

    new protobuf.Root().load(this.resourcePath,function(err, root) {
       if(err) return callback(err);
        
       protoTarget(root,options,callback);
    });
};
