'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var createElement = document.createElement.bind(document);

var loaded = [];

var types = {
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch'
};

var createLink = function createLink(rel, href) {
    var link = createElement('link');
    Object.assign(link, { rel: rel, href: href });
    return link;
};

var removeOnLoad = function removeOnLoad(src) {
    return function (_ref) {
        var target = _ref.target;

        target.parentNode.removeChild(target);
        loaded.push(src);
    };
};

var createPrefetchLink = function createPrefetchLink(type, src) {
    if (loaded.indexOf(src) < 0) {
        var link = createLink('prefetch', src);
        link.addEventListener('load', removeOnLoad(src));
        document.head.appendChild(link);
    }
};

var prefetch = exports.prefetch = createPrefetchLink.bind(null, types.PREFETCH);
var preload = exports.preload = createPrefetchLink.bind(null, types.PRELOAD);
var prerender = exports.prerender = createPrefetchLink.bind(null, types.PRERENDER);
var prefetchDns = exports.prefetchDns = createPrefetchLink.bind(null, types.DNS_PREFETCH);

exports.default = {
    prefetch: prefetch,
    preload: preload,
    prerender: prerender,
    prefetchDns: prefetchDns
};
