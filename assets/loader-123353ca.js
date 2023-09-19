import { g as getConfig, i as initI18n, a as instance, o as onChange, p as plugins, c as cleanCSS } from './config-e9f2c23c.js';
import './browser-polyfill-5a5eabde.js';
import './_commonjsHelpers-912bb820.js';

const config = await getConfig();
const activePlugins = () => {
  return plugins().filter((it) => config[it.name]);
};
await initI18n();
if (config.language) {
  await instance.changeLanguage(config.language);
}
console.log("content-script");
activePlugins().filter((it) => it.init?.());
const observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach(async function(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          activePlugins().forEach((it) => it.observer?.());
        }
      });
    }
  });
});
observer.observe(document.body, { childList: true, subtree: true });
onChange((items) => {
  Object.assign(
    config,
    Object.entries(items).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value.newValue }),
      {}
    )
  );
  cleanCSS();
  activePlugins().forEach((it) => it.init?.());
});
