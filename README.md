# prefetcher

A small JavaScript library which can be used to asynchronously prefetch
resources on a web page.

[more info](https://css-tricks.com/prefetching-preloading-prebrowsing/)

[browser support](http://caniuse.com/#search=Resource%20Hints)

Note: The Lazyload hint is not part of this library, yet.

## Installation

```
npm i @mightyplow/prefetcher
```

## Usage

### ES6 module

The library can be imported via ES6 imports.

To get the whole object which holds all methods you can call
```
import prefetcher from '@mightyplow/prefetcher';
```

You can also import specific methods by calling

```
import { prefetch, preload, prerender, prefetchDns, preconnect } from '@mightyplow/prefetcher';
```

### standalone

You can also use the library directly in your html document. All you have to do, is
to load the prefetcher[.min].js file from the dist folder.

It will create a global object call prefetcher, which contains all the available methods.

### methods

Following methods are available:
- prefetch(src)
- preload(src)
- prerender(src)
- prefetchDns(src)
- preconnect(src)

All methods take the url of the resource which should be loaded. Internally they get stored
in an array, so the prefetch request is only done once.

You can then call one of the methods to add the prefetch link tag to the head of the web page.
After the resource has been loaded, the tag gets removed automatically.

```
prefetch('http://mydomain.tld/foobar');
```