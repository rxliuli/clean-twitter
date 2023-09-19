import { _ as __vitePreload } from './_commonjsHelpers-912bb820.js';
import { B as Browser } from './browser-polyfill-5a5eabde.js';

const hijackXHR = "/assets/injectHijackXHR.ts-77c8fda6.js";

const script = document.createElement("script");
script.src = Browser.runtime.getURL(hijackXHR);
script.type = "module";
document.head.prepend(script);
__vitePreload(() => import('./loader-123353ca.js'),true?["./loader-123353ca.js","./config-e9f2c23c.js","./browser-polyfill-5a5eabde.js","./_commonjsHelpers-912bb820.js"]:void 0,import.meta.url);
