const createElement = document.createElement.bind(document);

const loaded = [];

const types = {
    PREFETCH: 'prefetch',
    PRELOAD: 'preload',
    PRERENDER: 'prerender',
    DNS_PREFETCH: 'dns-prefetch'
};

const createLink = (rel, href) => {
    const link = createElement('link');
    Object.assign(link, {rel, href});
    return link;
};

const removeOnLoad = src => ({ target }) => {
    target.parentNode.removeChild(target);
    loaded.push(src);
};

const createPrefetchLink = (type, src) => {
    if (loaded.indexOf(src) < 0) {
        const link = createLink('prefetch', src);
        link.addEventListener('load', removeOnLoad(src));
        document.head.appendChild(link);
    }
};

export const prefetch = createPrefetchLink.bind(null, types.PREFETCH);
export const preload = createPrefetchLink.bind(null, types.PRELOAD);
export const prerender = createPrefetchLink.bind(null, types.PRERENDER);
export const prefetchDns = createPrefetchLink.bind(null, types.DNS_PREFETCH);

export default {
    prefetch,
    preload,
    prerender,
    prefetchDns
};