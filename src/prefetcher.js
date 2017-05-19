const loaded = [];

const types = {
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch',
    PRECONNECT: 'preconnect'
};

const createLink = (rel, href) => {
    const link = document.createElement('link');
    Object.assign(link, {rel, href});
    return link;
};

const removeOnLoad = ({ type, target }) => {
    target.parentNode.removeChild(target);

    if (type === 'error') {
        console.info(`'${target.href}' could not be prefetched`);
    }
};

const createPrefetchLink = (type, src) => {
    if (loaded.indexOf(src) < 0) {
        const link = createLink(type, src);
        link.addEventListener('load', removeOnLoad);
        link.addEventListener('error', removeOnLoad);
        document.head.appendChild(link);

        // move it to the list of already loaded sources
        loaded.push(src);
    }
};

export const prefetch = createPrefetchLink.bind(null, types.PREFETCH);
export const preload = createPrefetchLink.bind(null, types.PRELOAD);
export const prerender = createPrefetchLink.bind(null, types.PRERENDER);
export const prefetchDns = createPrefetchLink.bind(null, types.DNS_PREFETCH);
export const preconnect = createPrefetchLink.bind(null, types.PRECONNECT);

export default {
    prefetch,
    preload,
    prerender,
    prefetchDns,
    preconnect
};