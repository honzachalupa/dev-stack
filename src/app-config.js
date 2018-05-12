module.exports = {
    name: 'Webpack Dev-Stack',
    nameShort: 'Webpack Dev-Stack',
    description: 'Some description.',
    accentColor: '#ff5252', // Will be injected into SCSS and ready to use as $accent-color.
    caching: { // Remove this if you don't want to use caching.
        strategy: 'staleWhileRevalidate' // This strategy will quickly return a cached version of a resource while it goes to the network to fetch an updated version if there is one. This is a good strategy for content that rarely changes.
    }
};
