if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,a)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const o=e=>n(e,c),u={module:{uri:c},exports:i,require:o};s[c]=Promise.all(t.map((e=>u[e]||o(e)))).then((e=>(a(...e),i)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/0e5ce63c-53b06bc0fba6caa2.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/221-4861261d3f489df4.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/468-8147cfe7b5016367.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/504-96a7ca6d012fa931.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/518-7a68b80d329ae1b3.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/564-5e222904bdb947e0.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/579-97f2f3749c037e40.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/665-01c155fe5cd47d43.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/733-e1f2636c862f0139.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/795d4814-dd21cc543a82cca7.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/8e1d74a4-7263d6c71608880d.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/936-386d28a514be7e88.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/94730671-77e5c92b4d94d808.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/985-dd0e5f6d5ae8e655.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/9c4e2130-91eeb6dfe770739b.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/auth/(auth)/page-dce9d47c2baff979.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/contracts/new/page-54c6b13e6f962349.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/contracts/page-4c4e3fc3e2a300f2.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/home/page-8d0d01573f469016.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/layout-468f77f1bfc35b9d.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/not-found-078d8ca1aa8af95f.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/obligations/%5B%5B...id%5D%5D/page-0e43b62249fdfe14.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/app/page-595f3ca0eb050a64.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/e37a0b60-5541a0d26c7244e0.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/eec3d76d-0c1ba2736d323f55.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/fcfb803e-f83fdcd0ee047b37.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/fd9d1056-b5137f45b4b35ab7.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/framework-aec844d2ccbe7592.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/main-af9c1a1269f19acb.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/main-app-3c860e2d272729c6.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/pages/_app-75f6107b0260711c.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/pages/_error-9a890acb1e81c3fc.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-b40d1308d19753c7.js",revision:"xB1O8OMkUUZPLoyd7uPLI"},{url:"/_next/static/css/a60a8421c42fd817.css",revision:"a60a8421c42fd817"},{url:"/_next/static/xB1O8OMkUUZPLoyd7uPLI/_buildManifest.js",revision:"e0a21c7d7f93d89dce16df0231dc76f2"},{url:"/_next/static/xB1O8OMkUUZPLoyd7uPLI/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/manifest.json",revision:"5e70c2c3e6a20d132720ec601c0c7d22"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.png",revision:"a86fc70ec968d3a91a516e7eed6d2f73"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:n})=>"1"===e.headers.get("RSC")&&n&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));