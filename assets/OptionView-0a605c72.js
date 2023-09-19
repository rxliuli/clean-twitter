import { r as reactExports, j as jsxRuntimeExports } from './index.html-09709b8f.js';
import { t, l as langs, p as plugins, d as defaultConfig, s as setConfig, g as getConfig, i as initI18n, a as instance } from './config-e9f2c23c.js';
import './_commonjsHelpers-912bb820.js';
import './browser-polyfill-5a5eabde.js';

var useEffectOnce = function (effect) {
    reactExports.useEffect(effect, []);
};
const useEffectOnce$1 = useEffectOnce;

var useMount = function (fn) {
    useEffectOnce$1(function () {
        fn();
    });
};
const useMount$1 = useMount;

function useConfig() {
  const [v, set] = reactExports.useState(defaultConfig);
  useMount$1(async () => {
    const result = await getConfig();
    await initI18n();
    await instance.changeLanguage(result.language);
    set(result);
  });
  return [
    v,
    async (newV) => {
      set({ ...v, ...newV });
      await setConfig(newV);
    }
  ];
}
function OptionView() {
  const [config, setConfig2] = useConfig();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "min-w-[400px] space-y-4 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "flex-grow text-lg font-bold", children: t("config.title") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { htmlFor: "language", className: "font-bold", children: [
        t("config.language"),
        ":",
        " "
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "language",
          value: config.language,
          onChange: async (ev) => {
            await setConfig2({ language: ev.target.value });
            location.reload();
          },
          className: "rounded bg-white px-2 text-black dark:bg-black dark:text-white outline-none",
          children: langs.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: it.value, children: it.label }, it.value))
        }
      )
    ] }),
    plugins().map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          id: it.name,
          checked: config[it.name],
          onChange: (ev) => setConfig2({ [it.name]: ev.target.checked }),
          className: "border border-gray-300 rounded-md p-2"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: it.name, className: "font-bold", children: it.description })
    ] }, it.name))
  ] });
}

export { OptionView, OptionView as default };
