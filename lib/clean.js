"use strict";

module.exports = exports = clean;

exports.usage = 'Removes the entire folder containing the compiled .node module';

var fs = require('fs');
var rm = require('rimraf');
var exists = require('fs').exists || require('path').exists;
var versioning = require('./util/versioning.js');
var napi = require('./util/napi.js');

function clean (gyp, argv, callback) {
    var package_json = JSON.parse(fs.readFileSync('./package.json'));
    var napi_build_version = napi.get_napi_build_version_from_command_args(argv);
    var opts = versioning.evaluate(package_json, gyp.opts, napi_build_version);
    var to_delete = opts.module_path;
    exists(to_delete, function(found) {
        if (found) {
            if (!gyp.opts.silent_clean) console.log('['+package_json.name+'] Removing "%s"', to_delete);
            return rm(to_delete, callback);
        }
        return callback();
    });
}
