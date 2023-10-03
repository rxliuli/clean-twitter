import { r as reactExports, b as client, j as jsxRuntimeExports, u as useMount } from './useMount-a1dc8ba6.js';

function on(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (obj && obj.addEventListener) {
        obj.addEventListener.apply(obj, args);
    }
}
function off(obj) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (obj && obj.removeEventListener) {
        obj.removeEventListener.apply(obj, args);
    }
}
var isBrowser = typeof window !== 'undefined';

var defaultTarget = isBrowser ? window : null;
var isListenerType1 = function (target) {
    return !!target.addEventListener;
};
var isListenerType2 = function (target) {
    return !!target.on;
};
var useEvent = function (name, handler, target, options) {
    if (target === void 0) { target = defaultTarget; }
    reactExports.useEffect(function () {
        if (!handler) {
            return;
        }
        if (!target) {
            return;
        }
        if (isListenerType1(target)) {
            on(target, name, handler, options);
        }
        else if (isListenerType2(target)) {
            target.on(name, handler, options);
        }
        return function () {
            if (isListenerType1(target)) {
                off(target, name, handler, options);
            }
            else if (isListenerType2(target)) {
                target.off(name, handler, options);
            }
        };
    }, [name, handler, target, JSON.stringify(options)]);
};
const useEvent$1 = useEvent;

const CallbackView = () => {
  useEvent$1("load", () => {
    console.log("onLoad");
  });
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
