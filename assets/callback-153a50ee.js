import { b as client, j as jsxRuntimeExports, u as useMount, w as wait } from './useMount-6f7d0db3.js';

const CallbackView = () => {
  function init() {
    const p = new URLSearchParams(location.search);
    window.postMessage(
      {
        type: "FROM_PAGE",
        data: {
          code: p.get("code"),
          state: JSON.parse(p.get("state"))
        }
      },
      "*"
    );
  }
  useMount(async () => {
    console.log("page mount");
    await wait(() => !!document.body.dataset.contentScript);
    init();
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "callback" });
};
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(CallbackView, {})
);
