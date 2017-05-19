'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var loaded = [];

var types = {
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch',
    PRECONNECT: 'preconnect'
};

var createLink = function createLink(rel, href) {
    var link = document.createElement('link');
    Object.assign(link, { rel: rel, href: href });
    return link;
};

var removeOnLoad = function removeOnLoad(_ref) {
    var type = _ref.type,
        target = _ref.target;

    target.parentNode.removeChild(target);

    if (type === 'error') {
        console.info('\'' + target.href + '\' could not be prefetched');
    }
};

var createPrefetchLink = function createPrefetchLink(type, src) {
    if (loaded.indexOf(src) < 0) {
        var link = createLink(type, src);
        link.addEventListener('load', removeOnLoad);
        link.addEventListener('error', removeOnLoad);
        document.head.appendChild(link);

        // move it to the list of already loaded sources
        loaded.push(src);
    }
};

var prefetch = exports.prefetch = createPrefetchLink.bind(null, types.PREFETCH);
var preload = exports.preload = createPrefetchLink.bind(null, types.PRELOAD);
var prerender = exports.prerender = createPrefetchLink.bind(null, types.PRERENDER);
var prefetchDns = exports.prefetchDns = createPrefetchLink.bind(null, types.DNS_PREFETCH);
var preconnect = exports.preconnect = createPrefetchLink.bind(null, types.PRECONNECT);

exports.default = {
    prefetch: prefetch,
    preload: preload,
    prerender: prerender,
    prefetchDns: prefetchDns,
    preconnect: preconnect
};
