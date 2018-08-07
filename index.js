/**
 * 替换 html 内的非标准的资源属性
 * @author ydr.me
 * @create 2016-01-12 21:27
 */


'use strict';

var object = require('blear.utils.object');

var pkg = require('./package.json');

var defaults = {
    attributeName: 'data-original',
    tagName: 'img',
    progress: 'pre-html'
};
var COOLIE_IGNORE = 'coolieignore';

module.exports = function (configs) {
    configs = object.assign({}, defaults, configs);

    var mid = function (options) {
        if (options.progress !== configs.progress) {
            return options;
        }

        var coolie = this;

        options.code = coolie.matchHTML(options.code, {
            tag: configs.tagName
        }, function (node) {
            if (!node.attrs[configs.attributeName]) {
                return node;
            }

            // coolieignore
            if (node.attrs[COOLIE_IGNORE]) {
                node.attrs[COOLIE_IGNORE] = null;
                return node;
            }

            var url = node.attrs[configs.attributeName];
            var ret = coolie.buildResPath(url, options.file);
            node.attrs[configs.attributeName] = ret.url;
            return node;
        });

        return options;
    };

    mid.package = pkg;
    return mid;
};

module.exports.defaults = defaults;
