import i18next from 'i18next';
import { getConfig, onChange } from '../constants/config';
import { plugins } from './plugins';
import { cleanCSS } from '../utils/css';
import { initI18n } from '../constants/i18n';

export async function loadPlugin() {
  const config = await getConfig();

  const activePlugins = () => {
    return plugins().filter((it) => (config as any)[it.name]);
  };

  await initI18n();
  if (config.language) {
    await i18next.changeLanguage(config.language);
  }

  console.log('content-script');
  // init
  activePlugins().filter((it) => it.init?.());
  // observer
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(async function (node) {
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
        {} as any
      )
    );
    cleanCSS();
    activePlugins().forEach((it) => it.init?.());
  });
}
