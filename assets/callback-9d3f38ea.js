import { b as client, j as jsxRuntimeExports, u as useMount } from './useMount-a1dc8ba6.js';

const CallbackView = () => {
  useMount(() => {
    console.log("onMount");
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
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "callback" });
};
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(CallbackView, {})
);
