(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.prefetcher = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});