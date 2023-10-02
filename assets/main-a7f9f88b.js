import { c as commonjsGlobal, g as getDefaultExportFromCjs, a as getAugmentedNamespace, j as jsxRuntimeExports, r as reactExports, u as useMount, b as client, R as React } from './useMount-a1dc8ba6.js';

const consoleLogger = {
  type: 'logger',
  log(args) {
    this.output('log', args);
  },
  warn(args) {
    this.output('warn', args);
  },
  error(args) {
    this.output('error', args);
  },
  output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};
class Logger {
  constructor(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.init(concreteLogger, options);
  }
  init(concreteLogger) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.prefix = options.prefix || 'i18next:';
    this.logger = concreteLogger || consoleLogger;
    this.options = options;
    this.debug = options.debug;
  }
  log() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.forward(args, 'log', '', true);
  }
  warn() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.forward(args, 'warn', '', true);
  }
  error() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.forward(args, 'error', '');
  }
  deprecate() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
  }
  forward(args, lvl, prefix, debugOnly) {
    if (debugOnly && !this.debug) return null;
    if (typeof args[0] === 'string') args[0] = `${prefix}${this.prefix} ${args[0]}`;
    return this.logger[lvl](args);
  }
  create(moduleName) {
    return new Logger(this.logger, {
      ...{
        prefix: `${this.prefix}:${moduleName}:`
      },
      ...this.options
    });
  }
  clone(options) {
    options = options || this.options;
    options.prefix = options.prefix || this.prefix;
    return new Logger(this.logger, options);
  }
}
var baseLogger = new Logger();

class EventEmitter {
  constructor() {
    this.observers = {};
  }
  on(events, listener) {
    events.split(' ').forEach(event => {
      this.observers[event] = this.observers[event] || [];
      this.observers[event].push(listener);
    });
    return this;
  }
  off(event, listener) {
    if (!this.observers[event]) return;
    if (!listener) {
      delete this.observers[event];
      return;
    }
    this.observers[event] = this.observers[event].filter(l => l !== listener);
  }
  emit(event) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (this.observers[event]) {
      const cloned = [].concat(this.observers[event]);
      cloned.forEach(observer => {
        observer(...args);
      });
    }
    if (this.observers['*']) {
      const cloned = [].concat(this.observers['*']);
      cloned.forEach(observer => {
        observer.apply(observer, [event, ...args]);
      });
    }
  }
}

function defer() {
  let res;
  let rej;
  const promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy$1(a, s, t) {
  a.forEach(m => {
    if (s[m]) t[m] = s[m];
  });
}
function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }
  const stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    const key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }
  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}
function setPath(object, path, newValue) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  const {
    obj,
    k
  } = getLastOfPath(object, path, Object);
  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  const {
    obj,
    k
  } = getLastOfPath(object, path);
  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  const value = getPath(data, key);
  if (value !== undefined) {
    return value;
  }
  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (const prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, s => _entityMap[s]);
  }
  return data;
}
const chars = [' ', ',', '?', '!', ';'];
function looksLikeObjectPath(key, nsSeparator, keySeparator) {
  nsSeparator = nsSeparator || '';
  keySeparator = keySeparator || '';
  const possibleChars = chars.filter(c => nsSeparator.indexOf(c) < 0 && keySeparator.indexOf(c) < 0);
  if (possibleChars.length === 0) return true;
  const r = new RegExp(`(${possibleChars.map(c => c === '?' ? '\\?' : c).join('|')})`);
  let matched = !r.test(key);
  if (!matched) {
    const ki = key.indexOf(keySeparator);
    if (ki > 0 && !r.test(key.substring(0, ki))) {
      matched = true;
    }
  }
  return matched;
}
function deepFind(obj, path) {
  let keySeparator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  if (!obj) return undefined;
  if (obj[path]) return obj[path];
  const paths = path.split(keySeparator);
  let current = obj;
  for (let i = 0; i < paths.length; ++i) {
    if (!current) return undefined;
    if (typeof current[paths[i]] === 'string' && i + 1 < paths.length) {
      return undefined;
    }
    if (current[paths[i]] === undefined) {
      let j = 2;
      let p = paths.slice(i, i + j).join(keySeparator);
      let mix = current[p];
      while (mix === undefined && paths.length > i + j) {
        j++;
        p = paths.slice(i, i + j).join(keySeparator);
        mix = current[p];
      }
      if (mix === undefined) return undefined;
      if (mix === null) return null;
      if (path.endsWith(p)) {
        if (typeof mix === 'string') return mix;
        if (p && typeof mix[p] === 'string') return mix[p];
      }
      const joinedPath = paths.slice(i + j).join(keySeparator);
      if (joinedPath) return deepFind(mix, joinedPath, keySeparator);
      return undefined;
    }
    current = current[paths[i]];
  }
  return current;
}
function getCleanedCode(code) {
  if (code && code.indexOf('_') > 0) return code.replace('_', '-');
  return code;
}

class ResourceStore extends EventEmitter {
  constructor(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };
    super();
    this.data = data || {};
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    if (this.options.ignoreJSONStructure === undefined) {
      this.options.ignoreJSONStructure = true;
    }
  }
  addNamespaces(ns) {
    if (this.options.ns.indexOf(ns) < 0) {
      this.options.ns.push(ns);
    }
  }
  removeNamespaces(ns) {
    const index = this.options.ns.indexOf(ns);
    if (index > -1) {
      this.options.ns.splice(index, 1);
    }
  }
  getResource(lng, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const ignoreJSONStructure = options.ignoreJSONStructure !== undefined ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let path = [lng, ns];
    if (key && typeof key !== 'string') path = path.concat(key);
    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
    }
    const result = getPath(this.data, path);
    if (result || !ignoreJSONStructure || typeof key !== 'string') return result;
    return deepFind(this.data && this.data[lng] && this.data[lng][ns], key, keySeparator);
  }
  addResource(lng, ns, key, value) {
    let options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
      silent: false
    };
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let path = [lng, ns];
    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      value = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    setPath(this.data, path, value);
    if (!options.silent) this.emit('added', lng, ns, key, value);
  }
  addResources(lng, ns, resources) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
      silent: false
    };
    for (const m in resources) {
      if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
        silent: true
      });
    }
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  addResourceBundle(lng, ns, resources, deep, overwrite) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
      silent: false
    };
    let path = [lng, ns];
    if (lng.indexOf('.') > -1) {
      path = lng.split('.');
      deep = resources;
      resources = ns;
      ns = path[1];
    }
    this.addNamespaces(ns);
    let pack = getPath(this.data, path) || {};
    if (deep) {
      deepExtend(pack, resources, overwrite);
    } else {
      pack = {
        ...pack,
        ...resources
      };
    }
    setPath(this.data, path, pack);
    if (!options.silent) this.emit('added', lng, ns, resources);
  }
  removeResourceBundle(lng, ns) {
    if (this.hasResourceBundle(lng, ns)) {
      delete this.data[lng][ns];
    }
    this.removeNamespaces(ns);
    this.emit('removed', lng, ns);
  }
  hasResourceBundle(lng, ns) {
    return this.getResource(lng, ns) !== undefined;
  }
  getResourceBundle(lng, ns) {
    if (!ns) ns = this.options.defaultNS;
    if (this.options.compatibilityAPI === 'v1') return {
      ...{},
      ...this.getResource(lng, ns)
    };
    return this.getResource(lng, ns);
  }
  getDataByLanguage(lng) {
    return this.data[lng];
  }
  hasLanguageSomeTranslations(lng) {
    const data = this.getDataByLanguage(lng);
    const n = data && Object.keys(data) || [];
    return !!n.find(v => data[v] && Object.keys(data[v]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}

var postProcessor = {
  processors: {},
  addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle(processors, value, key, options, translator) {
    processors.forEach(processor => {
      if (this.processors[processor]) value = this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

const checkedLoadedFor = {};
class Translator extends EventEmitter {
  constructor(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    super();
    copy$1(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, this);
    this.options = options;
    if (this.options.keySeparator === undefined) {
      this.options.keySeparator = '.';
    }
    this.logger = baseLogger.create('translator');
  }
  changeLanguage(lng) {
    if (lng) this.language = lng;
  }
  exists(key) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    if (key === undefined || key === null) {
      return false;
    }
    const resolved = this.resolve(key, options);
    return resolved && resolved.res !== undefined;
  }
  extractFromKey(key, options) {
    let nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
    if (nsSeparator === undefined) nsSeparator = ':';
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    let namespaces = options.ns || this.options.defaultNS || [];
    const wouldCheckForNsInKey = nsSeparator && key.indexOf(nsSeparator) > -1;
    const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !options.keySeparator && !this.options.userDefinedNsSeparator && !options.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
    if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
      const m = key.match(this.interpolator.nestingRegexp);
      if (m && m.length > 0) {
        return {
          key,
          namespaces
        };
      }
      const parts = key.split(nsSeparator);
      if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
      key = parts.join(keySeparator);
    }
    if (typeof namespaces === 'string') namespaces = [namespaces];
    return {
      key,
      namespaces
    };
  }
  translate(keys, options, lastKey) {
    if (typeof options !== 'object' && this.options.overloadTranslationOptionHandler) {
      options = this.options.overloadTranslationOptionHandler(arguments);
    }
    if (typeof options === 'object') options = {
      ...options
    };
    if (!options) options = {};
    if (keys === undefined || keys === null) return '';
    if (!Array.isArray(keys)) keys = [String(keys)];
    const returnDetails = options.returnDetails !== undefined ? options.returnDetails : this.options.returnDetails;
    const keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
    const {
      key,
      namespaces
    } = this.extractFromKey(keys[keys.length - 1], options);
    const namespace = namespaces[namespaces.length - 1];
    const lng = options.lng || this.language;
    const appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (lng && lng.toLowerCase() === 'cimode') {
      if (appendNamespaceToCIMode) {
        const nsSeparator = options.nsSeparator || this.options.nsSeparator;
        if (returnDetails) {
          return {
            res: `${namespace}${nsSeparator}${key}`,
            usedKey: key,
            exactUsedKey: key,
            usedLng: lng,
            usedNS: namespace
          };
        }
        return `${namespace}${nsSeparator}${key}`;
      }
      if (returnDetails) {
        return {
          res: key,
          usedKey: key,
          exactUsedKey: key,
          usedLng: lng,
          usedNS: namespace
        };
      }
      return key;
    }
    const resolved = this.resolve(keys, options);
    let res = resolved && resolved.res;
    const resUsedKey = resolved && resolved.usedKey || key;
    const resExactUsedKey = resolved && resolved.exactUsedKey || key;
    const resType = Object.prototype.toString.apply(res);
    const noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
    const joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
    const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
    const handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';
    if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
      if (!options.returnObjects && !this.options.returnObjects) {
        if (!this.options.returnedObjectHandler) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
        }
        const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, {
          ...options,
          ns: namespaces
        }) : `key '${key} (${this.language})' returned an object instead of string.`;
        if (returnDetails) {
          resolved.res = r;
          return resolved;
        }
        return r;
      }
      if (keySeparator) {
        const resTypeIsArray = resType === '[object Array]';
        const copy = resTypeIsArray ? [] : {};
        const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
        for (const m in res) {
          if (Object.prototype.hasOwnProperty.call(res, m)) {
            const deepKey = `${newKeyToUse}${keySeparator}${m}`;
            copy[m] = this.translate(deepKey, {
              ...options,
              ...{
                joinArrays: false,
                ns: namespaces
              }
            });
            if (copy[m] === deepKey) copy[m] = res[m];
          }
        }
        res = copy;
      }
    } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
      res = res.join(joinArrays);
      if (res) res = this.extendTranslation(res, keys, options, lastKey);
    } else {
      let usedDefault = false;
      let usedKey = false;
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const hasDefaultValue = Translator.hasDefaultValue(options);
      const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, options) : '';
      const defaultValueSuffixOrdinalFallback = options.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count, {
        ordinal: false
      }) : '';
      const defaultValue = options[`defaultValue${defaultValueSuffix}`] || options[`defaultValue${defaultValueSuffixOrdinalFallback}`] || options.defaultValue;
      if (!this.isValidLookup(res) && hasDefaultValue) {
        usedDefault = true;
        res = defaultValue;
      }
      if (!this.isValidLookup(res)) {
        usedKey = true;
        res = key;
      }
      const missingKeyNoValueFallbackToKey = options.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey;
      const resForMissing = missingKeyNoValueFallbackToKey && usedKey ? undefined : res;
      const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
      if (usedKey || usedDefault || updateMissing) {
        this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);
        if (keySeparator) {
          const fk = this.resolve(key, {
            ...options,
            keySeparator: false
          });
          if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
        }
        let lngs = [];
        const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
        if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
          for (let i = 0; i < fallbackLngs.length; i++) {
            lngs.push(fallbackLngs[i]);
          }
        } else if (this.options.saveMissingTo === 'all') {
          lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
        } else {
          lngs.push(options.lng || this.language);
        }
        const send = (l, k, specificDefaultValue) => {
          const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
          if (this.options.missingKeyHandler) {
            this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, options);
          } else if (this.backendConnector && this.backendConnector.saveMissing) {
            this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, options);
          }
          this.emit('missingKey', l, namespace, k, res);
        };
        if (this.options.saveMissing) {
          if (this.options.saveMissingPlurals && needsPluralHandling) {
            lngs.forEach(language => {
              this.pluralResolver.getSuffixes(language, options).forEach(suffix => {
                send([language], key + suffix, options[`defaultValue${suffix}`] || defaultValue);
              });
            });
          } else {
            send(lngs, key, defaultValue);
          }
        }
      }
      res = this.extendTranslation(res, keys, options, resolved, lastKey);
      if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}:${key}`;
      if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) {
        if (this.options.compatibilityAPI !== 'v1') {
          res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}:${key}` : key, usedDefault ? res : undefined);
        } else {
          res = this.options.parseMissingKeyHandler(res);
        }
      }
    }
    if (returnDetails) {
      resolved.res = res;
      return resolved;
    }
    return res;
  }
  extendTranslation(res, key, options, resolved, lastKey) {
    var _this = this;
    if (this.i18nFormat && this.i18nFormat.parse) {
      res = this.i18nFormat.parse(res, {
        ...this.options.interpolation.defaultVariables,
        ...options
      }, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
        resolved
      });
    } else if (!options.skipInterpolation) {
      if (options.interpolation) this.interpolator.init({
        ...options,
        ...{
          interpolation: {
            ...this.options.interpolation,
            ...options.interpolation
          }
        }
      });
      const skipOnVariables = typeof res === 'string' && (options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let nestBef;
      if (skipOnVariables) {
        const nb = res.match(this.interpolator.nestingRegexp);
        nestBef = nb && nb.length;
      }
      let data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
      if (this.options.interpolation.defaultVariables) data = {
        ...this.options.interpolation.defaultVariables,
        ...data
      };
      res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
      if (skipOnVariables) {
        const na = res.match(this.interpolator.nestingRegexp);
        const nestAft = na && na.length;
        if (nestBef < nestAft) options.nest = false;
      }
      if (!options.lng && this.options.compatibilityAPI !== 'v1' && resolved && resolved.res) options.lng = resolved.usedLng;
      if (options.nest !== false) res = this.interpolator.nest(res, function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (lastKey && lastKey[0] === args[0] && !options.context) {
          _this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
          return null;
        }
        return _this.translate(...args, key);
      }, options);
      if (options.interpolation) this.interpolator.reset();
    }
    const postProcess = options.postProcess || this.options.postProcess;
    const postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;
    if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
      res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
        i18nResolved: resolved,
        ...options
      } : options, this);
    }
    return res;
  }
  resolve(keys) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let found;
    let usedKey;
    let exactUsedKey;
    let usedLng;
    let usedNS;
    if (typeof keys === 'string') keys = [keys];
    keys.forEach(k => {
      if (this.isValidLookup(found)) return;
      const extracted = this.extractFromKey(k, options);
      const key = extracted.key;
      usedKey = key;
      let namespaces = extracted.namespaces;
      if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
      const needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
      const needsZeroSuffixLookup = needsPluralHandling && !options.ordinal && options.count === 0 && this.pluralResolver.shouldUseIntlApi();
      const needsContextHandling = options.context !== undefined && (typeof options.context === 'string' || typeof options.context === 'number') && options.context !== '';
      const codes = options.lngs ? options.lngs : this.languageUtils.toResolveHierarchy(options.lng || this.language, options.fallbackLng);
      namespaces.forEach(ns => {
        if (this.isValidLookup(found)) return;
        usedNS = ns;
        if (!checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(usedNS)) {
          checkedLoadedFor[`${codes[0]}-${ns}`] = true;
          this.logger.warn(`key "${usedKey}" for languages "${codes.join(', ')}" won't get resolved as namespace "${usedNS}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        }
        codes.forEach(code => {
          if (this.isValidLookup(found)) return;
          usedLng = code;
          const finalKeys = [key];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys) {
            this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
          } else {
            let pluralSuffix;
            if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, options.count, options);
            const zeroSuffix = `${this.options.pluralSeparator}zero`;
            const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (needsPluralHandling) {
              finalKeys.push(key + pluralSuffix);
              if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
              }
              if (needsZeroSuffixLookup) {
                finalKeys.push(key + zeroSuffix);
              }
            }
            if (needsContextHandling) {
              const contextKey = `${key}${this.options.contextSeparator}${options.context}`;
              finalKeys.push(contextKey);
              if (needsPluralHandling) {
                finalKeys.push(contextKey + pluralSuffix);
                if (options.ordinal && pluralSuffix.indexOf(ordinalPrefix) === 0) {
                  finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
                }
                if (needsZeroSuffixLookup) {
                  finalKeys.push(contextKey + zeroSuffix);
                }
              }
            }
          }
          let possibleKey;
          while (possibleKey = finalKeys.pop()) {
            if (!this.isValidLookup(found)) {
              exactUsedKey = possibleKey;
              found = this.getResource(code, ns, possibleKey, options);
            }
          }
        });
      });
    });
    return {
      res: found,
      usedKey,
      exactUsedKey,
      usedLng,
      usedNS
    };
  }
  isValidLookup(res) {
    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
  }
  getResource(code, ns, key) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
    return this.resourceStore.getResource(code, ns, key, options);
  }
  static hasDefaultValue(options) {
    const prefix = 'defaultValue';
    for (const option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
        return true;
      }
    }
    return false;
  }
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
class LanguageUtil {
  constructor(options) {
    this.options = options;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }
  getScriptPartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return null;
    const p = code.split('-');
    if (p.length === 2) return null;
    p.pop();
    if (p[p.length - 1].toLowerCase() === 'x') return null;
    return this.formatLanguageCode(p.join('-'));
  }
  getLanguagePartFromCode(code) {
    code = getCleanedCode(code);
    if (!code || code.indexOf('-') < 0) return code;
    const p = code.split('-');
    return this.formatLanguageCode(p[0]);
  }
  formatLanguageCode(code) {
    if (typeof code === 'string' && code.indexOf('-') > -1) {
      const specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
      let p = code.split('-');
      if (this.options.lowerCaseLng) {
        p = p.map(part => part.toLowerCase());
      } else if (p.length === 2) {
        p[0] = p[0].toLowerCase();
        p[1] = p[1].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
      } else if (p.length === 3) {
        p[0] = p[0].toLowerCase();
        if (p[1].length === 2) p[1] = p[1].toUpperCase();
        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
      }
      return p.join('-');
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
  }
  isSupportedCode(code) {
    if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
      code = this.getLanguagePartFromCode(code);
    }
    return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
  }
  getBestMatchFromCodes(codes) {
    if (!codes) return null;
    let found;
    codes.forEach(code => {
      if (found) return;
      const cleanedLng = this.formatLanguageCode(code);
      if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
    });
    if (!found && this.options.supportedLngs) {
      codes.forEach(code => {
        if (found) return;
        const lngOnly = this.getLanguagePartFromCode(code);
        if (this.isSupportedCode(lngOnly)) return found = lngOnly;
        found = this.options.supportedLngs.find(supportedLng => {
          if (supportedLng === lngOnly) return supportedLng;
          if (supportedLng.indexOf('-') < 0 && lngOnly.indexOf('-') < 0) return;
          if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
        });
      });
    }
    if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
    return found;
  }
  getFallbackCodes(fallbacks, code) {
    if (!fallbacks) return [];
    if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
    if (typeof fallbacks === 'string') fallbacks = [fallbacks];
    if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
    if (!code) return fallbacks.default || [];
    let found = fallbacks[code];
    if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
    if (!found) found = fallbacks[this.formatLanguageCode(code)];
    if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
    if (!found) found = fallbacks.default;
    return found || [];
  }
  toResolveHierarchy(code, fallbackCode) {
    const fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
    const codes = [];
    const addCode = c => {
      if (!c) return;
      if (this.isSupportedCode(c)) {
        codes.push(c);
      } else {
        this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
      }
    };
    if (typeof code === 'string' && (code.indexOf('-') > -1 || code.indexOf('_') > -1)) {
      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
      if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
    } else if (typeof code === 'string') {
      addCode(this.formatLanguageCode(code));
    }
    fallbackCodes.forEach(fc => {
      if (codes.indexOf(fc) < 0) addCode(this.formatLanguageCode(fc));
    });
    return codes;
  }
}

let sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kk', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
let _rulesPluralsTypes = {
  1: function (n) {
    return Number(n > 1);
  },
  2: function (n) {
    return Number(n != 1);
  },
  3: function (n) {
    return 0;
  },
  4: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function (n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function (n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function (n) {
    return Number(n >= 2);
  },
  10: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function (n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function (n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function (n) {
    return Number(n !== 0);
  },
  14: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function (n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function (n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function (n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function (n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function (n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function (n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
const nonIntlVersions = ['v1', 'v2', 'v3'];
const intlVersions = ['v4'];
const suffixesOrder = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function createRules() {
  const rules = {};
  sets.forEach(set => {
    set.lngs.forEach(l => {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}
class PluralResolver {
  constructor(languageUtils) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    if ((!this.options.compatibilityJSON || intlVersions.includes(this.options.compatibilityJSON)) && (typeof Intl === 'undefined' || !Intl.PluralRules)) {
      this.options.compatibilityJSON = 'v3';
      this.logger.error('Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.');
    }
    this.rules = createRules();
  }
  addRule(lng, obj) {
    this.rules[lng] = obj;
  }
  getRule(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (this.shouldUseIntlApi()) {
      try {
        return new Intl.PluralRules(getCleanedCode(code), {
          type: options.ordinal ? 'ordinal' : 'cardinal'
        });
      } catch {
        return;
      }
    }
    return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
  }
  needsPlural(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (this.shouldUseIntlApi()) {
      return rule && rule.resolvedOptions().pluralCategories.length > 1;
    }
    return rule && rule.numbers.length > 1;
  }
  getPluralFormsOfKey(code, key) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return this.getSuffixes(code, options).map(suffix => `${key}${suffix}`);
  }
  getSuffixes(code) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const rule = this.getRule(code, options);
    if (!rule) {
      return [];
    }
    if (this.shouldUseIntlApi()) {
      return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map(pluralCategory => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${pluralCategory}`);
    }
    return rule.numbers.map(number => this.getSuffix(code, number, options));
  }
  getSuffix(code, count) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const rule = this.getRule(code, options);
    if (rule) {
      if (this.shouldUseIntlApi()) {
        return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ''}${rule.select(count)}`;
      }
      return this.getSuffixRetroCompatible(rule, count);
    }
    this.logger.warn(`no plural rule found for: ${code}`);
    return '';
  }
  getSuffixRetroCompatible(rule, count) {
    const idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
    let suffix = rule.numbers[idx];
    if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      if (suffix === 2) {
        suffix = 'plural';
      } else if (suffix === 1) {
        suffix = '';
      }
    }
    const returnSuffix = () => this.options.prepend && suffix.toString() ? this.options.prepend + suffix.toString() : suffix.toString();
    if (this.options.compatibilityJSON === 'v1') {
      if (suffix === 1) return '';
      if (typeof suffix === 'number') return `_plural_${suffix.toString()}`;
      return returnSuffix();
    } else if (this.options.compatibilityJSON === 'v2') {
      return returnSuffix();
    } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
      return returnSuffix();
    }
    return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
  }
  shouldUseIntlApi() {
    return !nonIntlVersions.includes(this.options.compatibilityJSON);
  }
}

function deepFindWithDefaults(data, defaultData, key) {
  let keySeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '.';
  let ignoreJSONStructure = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  let path = getPathWithDefaults(data, defaultData, key);
  if (!path && ignoreJSONStructure && typeof key === 'string') {
    path = deepFind(data, key, keySeparator);
    if (path === undefined) path = deepFind(defaultData, key, keySeparator);
  }
  return path;
}
class Interpolator {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('interpolator');
    this.options = options;
    this.format = options.interpolation && options.interpolation.format || (value => value);
    this.init(options);
  }
  init() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (!options.interpolation) options.interpolation = {
      escapeValue: true
    };
    const iOpts = options.interpolation;
    this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
    this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
    this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
    this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
    this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
    this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
    this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
    this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
    this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
    this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
    this.resetRegExp();
  }
  reset() {
    if (this.options) this.init(this.options);
  }
  resetRegExp() {
    const regexpStr = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(regexpStr, 'g');
    const regexpUnescapeStr = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
    const nestingRegexpStr = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
  }
  interpolate(str, data, lng, options) {
    let match;
    let value;
    let replaces;
    const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function regexSafe(val) {
      return val.replace(/\$/g, '$$$$');
    }
    const handleFormat = key => {
      if (key.indexOf(this.formatSeparator) < 0) {
        const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(path, undefined, lng, {
          ...options,
          ...data,
          interpolationkey: key
        }) : path;
      }
      const p = key.split(this.formatSeparator);
      const k = p.shift().trim();
      const f = p.join(this.formatSeparator).trim();
      return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
        ...options,
        ...data,
        interpolationkey: k
      });
    };
    this.resetRegExp();
    const missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
    const skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables !== undefined ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    const todos = [{
      regex: this.regexpUnescape,
      safeValue: val => regexSafe(val)
    }, {
      regex: this.regexp,
      safeValue: val => this.escapeValue ? regexSafe(this.escape(val)) : regexSafe(val)
    }];
    todos.forEach(todo => {
      replaces = 0;
      while (match = todo.regex.exec(str)) {
        const matchedVar = match[1].trim();
        value = handleFormat(matchedVar);
        if (value === undefined) {
          if (typeof missingInterpolationHandler === 'function') {
            const temp = missingInterpolationHandler(str, match, options);
            value = typeof temp === 'string' ? temp : '';
          } else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) {
            value = '';
          } else if (skipOnVariables) {
            value = match[0];
            continue;
          } else {
            this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
            value = '';
          }
        } else if (typeof value !== 'string' && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        const safeValue = todo.safeValue(value);
        str = str.replace(match[0], safeValue);
        if (skipOnVariables) {
          todo.regex.lastIndex += value.length;
          todo.regex.lastIndex -= match[0].length;
        } else {
          todo.regex.lastIndex = 0;
        }
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
    });
    return str;
  }
  nest(str, fc) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let match;
    let value;
    let clonedOptions;
    function handleHasOptions(key, inheritedOptions) {
      const sep = this.nestingOptionsSeparator;
      if (key.indexOf(sep) < 0) return key;
      const c = key.split(new RegExp(`${sep}[ ]*{`));
      let optionsString = `{${c[1]}`;
      key = c[0];
      optionsString = this.interpolate(optionsString, clonedOptions);
      const matchedSingleQuotes = optionsString.match(/'/g);
      const matchedDoubleQuotes = optionsString.match(/"/g);
      if (matchedSingleQuotes && matchedSingleQuotes.length % 2 === 0 && !matchedDoubleQuotes || matchedDoubleQuotes.length % 2 !== 0) {
        optionsString = optionsString.replace(/'/g, '"');
      }
      try {
        clonedOptions = JSON.parse(optionsString);
        if (inheritedOptions) clonedOptions = {
          ...inheritedOptions,
          ...clonedOptions
        };
      } catch (e) {
        this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
        return `${key}${sep}${optionsString}`;
      }
      delete clonedOptions.defaultValue;
      return key;
    }
    while (match = this.nestingRegexp.exec(str)) {
      let formatters = [];
      clonedOptions = {
        ...options
      };
      clonedOptions = clonedOptions.replace && typeof clonedOptions.replace !== 'string' ? clonedOptions.replace : clonedOptions;
      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;
      let doReduce = false;
      if (match[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(match[1])) {
        const r = match[1].split(this.formatSeparator).map(elem => elem.trim());
        match[1] = r.shift();
        formatters = r;
        doReduce = true;
      }
      value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
      if (value && match[0] === str && typeof value !== 'string') return value;
      if (typeof value !== 'string') value = makeString(value);
      if (!value) {
        this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
        value = '';
      }
      if (doReduce) {
        value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
          ...options,
          interpolationkey: match[1].trim()
        }), value.trim());
      }
      str = str.replace(match[0], value);
      this.regexp.lastIndex = 0;
    }
    return str;
  }
}

function parseFormatStr(formatStr) {
  let formatName = formatStr.toLowerCase().trim();
  const formatOptions = {};
  if (formatStr.indexOf('(') > -1) {
    const p = formatStr.split('(');
    formatName = p[0].toLowerCase().trim();
    const optStr = p[1].substring(0, p[1].length - 1);
    if (formatName === 'currency' && optStr.indexOf(':') < 0) {
      if (!formatOptions.currency) formatOptions.currency = optStr.trim();
    } else if (formatName === 'relativetime' && optStr.indexOf(':') < 0) {
      if (!formatOptions.range) formatOptions.range = optStr.trim();
    } else {
      const opts = optStr.split(';');
      opts.forEach(opt => {
        if (!opt) return;
        const [key, ...rest] = opt.split(':');
        const val = rest.join(':').trim().replace(/^'+|'+$/g, '');
        if (!formatOptions[key.trim()]) formatOptions[key.trim()] = val;
        if (val === 'false') formatOptions[key.trim()] = false;
        if (val === 'true') formatOptions[key.trim()] = true;
        if (!isNaN(val)) formatOptions[key.trim()] = parseInt(val, 10);
      });
    }
  }
  return {
    formatName,
    formatOptions
  };
}
function createCachedFormatter(fn) {
  const cache = {};
  return function invokeFormatter(val, lng, options) {
    const key = lng + JSON.stringify(options);
    let formatter = cache[key];
    if (!formatter) {
      formatter = fn(lng, options);
      cache[key] = formatter;
    }
    return formatter(val);
  };
}
class Formatter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.logger = baseLogger.create('formatter');
    this.options = options;
    this.formats = {
      number: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      currency: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.NumberFormat(lng, {
          ...opt,
          style: 'currency'
        });
        return val => formatter.format(val);
      }),
      datetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.DateTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      }),
      relativetime: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.RelativeTimeFormat(lng, {
          ...opt
        });
        return val => formatter.format(val, opt.range || 'day');
      }),
      list: createCachedFormatter((lng, opt) => {
        const formatter = new Intl.ListFormat(lng, {
          ...opt
        });
        return val => formatter.format(val);
      })
    };
    this.init(options);
  }
  init(services) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      interpolation: {}
    };
    const iOpts = options.interpolation;
    this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
  }
  add(name, fc) {
    this.formats[name.toLowerCase().trim()] = fc;
  }
  addCached(name, fc) {
    this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
  }
  format(value, format, lng) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    const formats = format.split(this.formatSeparator);
    const result = formats.reduce((mem, f) => {
      const {
        formatName,
        formatOptions
      } = parseFormatStr(f);
      if (this.formats[formatName]) {
        let formatted = mem;
        try {
          const valOptions = options && options.formatParams && options.formatParams[options.interpolationkey] || {};
          const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
          formatted = this.formats[formatName](mem, l, {
            ...formatOptions,
            ...options,
            ...valOptions
          });
        } catch (error) {
          this.logger.warn(error);
        }
        return formatted;
      } else {
        this.logger.warn(`there was no format function for ${formatName}`);
      }
      return mem;
    }, value);
    return result;
  }
}

function removePending(q, name) {
  if (q.pending[name] !== undefined) {
    delete q.pending[name];
    q.pendingCount--;
  }
}
class Connector extends EventEmitter {
  constructor(backend, store, services) {
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    super();
    this.backend = backend;
    this.store = store;
    this.services = services;
    this.languageUtils = services.languageUtils;
    this.options = options;
    this.logger = baseLogger.create('backendConnector');
    this.waitingReads = [];
    this.maxParallelReads = options.maxParallelReads || 10;
    this.readingCalls = 0;
    this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
    this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
    this.state = {};
    this.queue = [];
    if (this.backend && this.backend.init) {
      this.backend.init(services, options.backend, options);
    }
  }
  queueLoad(languages, namespaces, options, callback) {
    const toLoad = {};
    const pending = {};
    const toLoadLanguages = {};
    const toLoadNamespaces = {};
    languages.forEach(lng => {
      let hasAllNamespaces = true;
      namespaces.forEach(ns => {
        const name = `${lng}|${ns}`;
        if (!options.reload && this.store.hasResourceBundle(lng, ns)) {
          this.state[name] = 2;
        } else if (this.state[name] < 0) ; else if (this.state[name] === 1) {
          if (pending[name] === undefined) pending[name] = true;
        } else {
          this.state[name] = 1;
          hasAllNamespaces = false;
          if (pending[name] === undefined) pending[name] = true;
          if (toLoad[name] === undefined) toLoad[name] = true;
          if (toLoadNamespaces[ns] === undefined) toLoadNamespaces[ns] = true;
        }
      });
      if (!hasAllNamespaces) toLoadLanguages[lng] = true;
    });
    if (Object.keys(toLoad).length || Object.keys(pending).length) {
      this.queue.push({
        pending,
        pendingCount: Object.keys(pending).length,
        loaded: {},
        errors: [],
        callback
      });
    }
    return {
      toLoad: Object.keys(toLoad),
      pending: Object.keys(pending),
      toLoadLanguages: Object.keys(toLoadLanguages),
      toLoadNamespaces: Object.keys(toLoadNamespaces)
    };
  }
  loaded(name, err, data) {
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    if (err) this.emit('failedLoading', lng, ns, err);
    if (data) {
      this.store.addResourceBundle(lng, ns, data);
    }
    this.state[name] = err ? -1 : 2;
    const loaded = {};
    this.queue.forEach(q => {
      pushPath(q.loaded, [lng], ns);
      removePending(q, name);
      if (err) q.errors.push(err);
      if (q.pendingCount === 0 && !q.done) {
        Object.keys(q.loaded).forEach(l => {
          if (!loaded[l]) loaded[l] = {};
          const loadedKeys = q.loaded[l];
          if (loadedKeys.length) {
            loadedKeys.forEach(n => {
              if (loaded[l][n] === undefined) loaded[l][n] = true;
            });
          }
        });
        q.done = true;
        if (q.errors.length) {
          q.callback(q.errors);
        } else {
          q.callback();
        }
      }
    });
    this.emit('loaded', loaded);
    this.queue = this.queue.filter(q => !q.done);
  }
  read(lng, ns, fcName) {
    let tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.retryTimeout;
    let callback = arguments.length > 5 ? arguments[5] : undefined;
    if (!lng.length) return callback(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng,
        ns,
        fcName,
        tried,
        wait,
        callback
      });
      return;
    }
    this.readingCalls++;
    const resolver = (err, data) => {
      this.readingCalls--;
      if (this.waitingReads.length > 0) {
        const next = this.waitingReads.shift();
        this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
      }
      if (err && data && tried < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, lng, ns, fcName, tried + 1, wait * 2, callback);
        }, wait);
        return;
      }
      callback(err, data);
    };
    const fc = this.backend[fcName].bind(this.backend);
    if (fc.length === 2) {
      try {
        const r = fc(lng, ns);
        if (r && typeof r.then === 'function') {
          r.then(data => resolver(null, data)).catch(resolver);
        } else {
          resolver(null, r);
        }
      } catch (err) {
        resolver(err);
      }
      return;
    }
    return fc(lng, ns, resolver);
  }
  prepareLoading(languages, namespaces) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let callback = arguments.length > 3 ? arguments[3] : undefined;
    if (!this.backend) {
      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
      return callback && callback();
    }
    if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
    if (typeof namespaces === 'string') namespaces = [namespaces];
    const toLoad = this.queueLoad(languages, namespaces, options, callback);
    if (!toLoad.toLoad.length) {
      if (!toLoad.pending.length) callback();
      return null;
    }
    toLoad.toLoad.forEach(name => {
      this.loadOne(name);
    });
  }
  load(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {}, callback);
  }
  reload(languages, namespaces, callback) {
    this.prepareLoading(languages, namespaces, {
      reload: true
    }, callback);
  }
  loadOne(name) {
    let prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    const s = name.split('|');
    const lng = s[0];
    const ns = s[1];
    this.read(lng, ns, 'read', undefined, undefined, (err, data) => {
      if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
      if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
      this.loaded(name, err, data);
    });
  }
  saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
    let clb = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : () => {};
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
      this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
      return;
    }
    if (key === undefined || key === null || key === '') return;
    if (this.backend && this.backend.create) {
      const opts = {
        ...options,
        isUpdate
      };
      const fc = this.backend.create.bind(this.backend);
      if (fc.length < 6) {
        try {
          let r;
          if (fc.length === 5) {
            r = fc(languages, namespace, key, fallbackValue, opts);
          } else {
            r = fc(languages, namespace, key, fallbackValue);
          }
          if (r && typeof r.then === 'function') {
            r.then(data => clb(null, data)).catch(clb);
          } else {
            clb(null, r);
          }
        } catch (err) {
          clb(err);
        }
      } else {
        fc(languages, namespace, key, fallbackValue, clb, opts);
      }
    }
    if (!languages || !languages[0]) return;
    this.store.addResource(languages[0], namespace, key, fallbackValue);
  }
}

function get$1() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: false,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      let ret = {};
      if (typeof args[1] === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];
      if (typeof args[2] === 'object' || typeof args[3] === 'object') {
        const options = args[3] || args[2];
        Object.keys(options).forEach(key => {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: (value, format, lng, options) => value,
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: true
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];
  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }
  return options;
}

function noop$1() {}
function bindMemberFunctions(inst) {
  const mems = Object.getOwnPropertyNames(Object.getPrototypeOf(inst));
  mems.forEach(mem => {
    if (typeof inst[mem] === 'function') {
      inst[mem] = inst[mem].bind(inst);
    }
  });
}
class I18n extends EventEmitter {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    super();
    this.options = transformOptions(options);
    this.services = {};
    this.logger = baseLogger;
    this.modules = {
      external: []
    };
    bindMemberFunctions(this);
    if (callback && !this.isInitialized && !options.isClone) {
      if (!this.options.initImmediate) {
        this.init(options, callback);
        return this;
      }
      setTimeout(() => {
        this.init(options, callback);
      }, 0);
    }
  }
  init() {
    var _this = this;
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    if (!options.defaultNS && options.defaultNS !== false && options.ns) {
      if (typeof options.ns === 'string') {
        options.defaultNS = options.ns;
      } else if (options.ns.indexOf('translation') < 0) {
        options.defaultNS = options.ns[0];
      }
    }
    const defOpts = get$1();
    this.options = {
      ...defOpts,
      ...this.options,
      ...transformOptions(options)
    };
    if (this.options.compatibilityAPI !== 'v1') {
      this.options.interpolation = {
        ...defOpts.interpolation,
        ...this.options.interpolation
      };
    }
    if (options.keySeparator !== undefined) {
      this.options.userDefinedKeySeparator = options.keySeparator;
    }
    if (options.nsSeparator !== undefined) {
      this.options.userDefinedNsSeparator = options.nsSeparator;
    }
    function createClassOnDemand(ClassOrObject) {
      if (!ClassOrObject) return null;
      if (typeof ClassOrObject === 'function') return new ClassOrObject();
      return ClassOrObject;
    }
    if (!this.options.isClone) {
      if (this.modules.logger) {
        baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
      } else {
        baseLogger.init(null, this.options);
      }
      let formatter;
      if (this.modules.formatter) {
        formatter = this.modules.formatter;
      } else if (typeof Intl !== 'undefined') {
        formatter = Formatter;
      }
      const lu = new LanguageUtil(this.options);
      this.store = new ResourceStore(this.options.resources, this.options);
      const s = this.services;
      s.logger = baseLogger;
      s.resourceStore = this.store;
      s.languageUtils = lu;
      s.pluralResolver = new PluralResolver(lu, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      });
      if (formatter && (!this.options.interpolation.format || this.options.interpolation.format === defOpts.interpolation.format)) {
        s.formatter = createClassOnDemand(formatter);
        s.formatter.init(s, this.options);
        this.options.interpolation.format = s.formatter.format.bind(s.formatter);
      }
      s.interpolator = new Interpolator(this.options);
      s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      };
      s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
      s.backendConnector.on('*', function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }
        _this.emit(event, ...args);
      });
      if (this.modules.languageDetector) {
        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
        if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
      }
      if (this.modules.i18nFormat) {
        s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
        if (s.i18nFormat.init) s.i18nFormat.init(this);
      }
      this.translator = new Translator(this.services, this.options);
      this.translator.on('*', function (event) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }
        _this.emit(event, ...args);
      });
      this.modules.external.forEach(m => {
        if (m.init) m.init(this);
      });
    }
    this.format = this.options.interpolation.format;
    if (!callback) callback = noop$1;
    if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
    }
    if (!this.services.languageDetector && !this.options.lng) {
      this.logger.warn('init: no languageDetector is used and no lng is defined');
    }
    const storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
    storeApi.forEach(fcName => {
      this[fcName] = function () {
        return _this.store[fcName](...arguments);
      };
    });
    const storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
    storeApiChained.forEach(fcName => {
      this[fcName] = function () {
        _this.store[fcName](...arguments);
        return _this;
      };
    });
    const deferred = defer();
    const load = () => {
      const finish = (err, t) => {
        if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn('init: i18next is already initialized. You should call init just once!');
        this.isInitialized = true;
        if (!this.options.isClone) this.logger.log('initialized', this.options);
        this.emit('initialized', this.options);
        deferred.resolve(t);
        callback(err, t);
      };
      if (this.languages && this.options.compatibilityAPI !== 'v1' && !this.isInitialized) return finish(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, finish);
    };
    if (this.options.resources || !this.options.initImmediate) {
      load();
    } else {
      setTimeout(load, 0);
    }
    return deferred;
  }
  loadResources(language) {
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$1;
    let usedCallback = callback;
    const usedLng = typeof language === 'string' ? language : this.language;
    if (typeof language === 'function') usedCallback = language;
    if (!this.options.resources || this.options.partialBundledLanguages) {
      if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
      const toLoad = [];
      const append = lng => {
        if (!lng) return;
        const lngs = this.services.languageUtils.toResolveHierarchy(lng);
        lngs.forEach(l => {
          if (toLoad.indexOf(l) < 0) toLoad.push(l);
        });
      };
      if (!usedLng) {
        const fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        fallbacks.forEach(l => append(l));
      } else {
        append(usedLng);
      }
      if (this.options.preload) {
        this.options.preload.forEach(l => append(l));
      }
      this.services.backendConnector.load(toLoad, this.options.ns, e => {
        if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
        usedCallback(e);
      });
    } else {
      usedCallback(null);
    }
  }
  reloadResources(lngs, ns, callback) {
    const deferred = defer();
    if (!lngs) lngs = this.languages;
    if (!ns) ns = this.options.ns;
    if (!callback) callback = noop$1;
    this.services.backendConnector.reload(lngs, ns, err => {
      deferred.resolve();
      callback(err);
    });
    return deferred;
  }
  use(module) {
    if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
    if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');
    if (module.type === 'backend') {
      this.modules.backend = module;
    }
    if (module.type === 'logger' || module.log && module.warn && module.error) {
      this.modules.logger = module;
    }
    if (module.type === 'languageDetector') {
      this.modules.languageDetector = module;
    }
    if (module.type === 'i18nFormat') {
      this.modules.i18nFormat = module;
    }
    if (module.type === 'postProcessor') {
      postProcessor.addPostProcessor(module);
    }
    if (module.type === 'formatter') {
      this.modules.formatter = module;
    }
    if (module.type === '3rdParty') {
      this.modules.external.push(module);
    }
    return this;
  }
  setResolvedLanguage(l) {
    if (!l || !this.languages) return;
    if (['cimode', 'dev'].indexOf(l) > -1) return;
    for (let li = 0; li < this.languages.length; li++) {
      const lngInLngs = this.languages[li];
      if (['cimode', 'dev'].indexOf(lngInLngs) > -1) continue;
      if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
        this.resolvedLanguage = lngInLngs;
        break;
      }
    }
  }
  changeLanguage(lng, callback) {
    var _this2 = this;
    this.isLanguageChangingTo = lng;
    const deferred = defer();
    this.emit('languageChanging', lng);
    const setLngProps = l => {
      this.language = l;
      this.languages = this.services.languageUtils.toResolveHierarchy(l);
      this.resolvedLanguage = undefined;
      this.setResolvedLanguage(l);
    };
    const done = (err, l) => {
      if (l) {
        setLngProps(l);
        this.translator.changeLanguage(l);
        this.isLanguageChangingTo = undefined;
        this.emit('languageChanged', l);
        this.logger.log('languageChanged', l);
      } else {
        this.isLanguageChangingTo = undefined;
      }
      deferred.resolve(function () {
        return _this2.t(...arguments);
      });
      if (callback) callback(err, function () {
        return _this2.t(...arguments);
      });
    };
    const setLng = lngs => {
      if (!lng && !lngs && this.services.languageDetector) lngs = [];
      const l = typeof lngs === 'string' ? lngs : this.services.languageUtils.getBestMatchFromCodes(lngs);
      if (l) {
        if (!this.language) {
          setLngProps(l);
        }
        if (!this.translator.language) this.translator.changeLanguage(l);
        if (this.services.languageDetector && this.services.languageDetector.cacheUserLanguage) this.services.languageDetector.cacheUserLanguage(l);
      }
      this.loadResources(l, err => {
        done(err, l);
      });
    };
    if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
      setLng(this.services.languageDetector.detect());
    } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
      if (this.services.languageDetector.detect.length === 0) {
        this.services.languageDetector.detect().then(setLng);
      } else {
        this.services.languageDetector.detect(setLng);
      }
    } else {
      setLng(lng);
    }
    return deferred;
  }
  getFixedT(lng, ns, keyPrefix) {
    var _this3 = this;
    const fixedT = function (key, opts) {
      let options;
      if (typeof opts !== 'object') {
        for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          rest[_key3 - 2] = arguments[_key3];
        }
        options = _this3.options.overloadTranslationOptionHandler([key, opts].concat(rest));
      } else {
        options = {
          ...opts
        };
      }
      options.lng = options.lng || fixedT.lng;
      options.lngs = options.lngs || fixedT.lngs;
      options.ns = options.ns || fixedT.ns;
      options.keyPrefix = options.keyPrefix || keyPrefix || fixedT.keyPrefix;
      const keySeparator = _this3.options.keySeparator || '.';
      let resultKey;
      if (options.keyPrefix && Array.isArray(key)) {
        resultKey = key.map(k => `${options.keyPrefix}${keySeparator}${k}`);
      } else {
        resultKey = options.keyPrefix ? `${options.keyPrefix}${keySeparator}${key}` : key;
      }
      return _this3.t(resultKey, options);
    };
    if (typeof lng === 'string') {
      fixedT.lng = lng;
    } else {
      fixedT.lngs = lng;
    }
    fixedT.ns = ns;
    fixedT.keyPrefix = keyPrefix;
    return fixedT;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(ns) {
    this.options.defaultNS = ns;
  }
  hasLoadedNamespace(ns) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!this.isInitialized) {
      this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
      return false;
    }
    if (!this.languages || !this.languages.length) {
      this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
      return false;
    }
    const lng = options.lng || this.resolvedLanguage || this.languages[0];
    const fallbackLng = this.options ? this.options.fallbackLng : false;
    const lastLng = this.languages[this.languages.length - 1];
    if (lng.toLowerCase() === 'cimode') return true;
    const loadNotPending = (l, n) => {
      const loadState = this.services.backendConnector.state[`${l}|${n}`];
      return loadState === -1 || loadState === 2;
    };
    if (options.precheck) {
      const preResult = options.precheck(this, loadNotPending);
      if (preResult !== undefined) return preResult;
    }
    if (this.hasResourceBundle(lng, ns)) return true;
    if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
    if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
    return false;
  }
  loadNamespaces(ns, callback) {
    const deferred = defer();
    if (!this.options.ns) {
      if (callback) callback();
      return Promise.resolve();
    }
    if (typeof ns === 'string') ns = [ns];
    ns.forEach(n => {
      if (this.options.ns.indexOf(n) < 0) this.options.ns.push(n);
    });
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  loadLanguages(lngs, callback) {
    const deferred = defer();
    if (typeof lngs === 'string') lngs = [lngs];
    const preloaded = this.options.preload || [];
    const newLngs = lngs.filter(lng => preloaded.indexOf(lng) < 0);
    if (!newLngs.length) {
      if (callback) callback();
      return Promise.resolve();
    }
    this.options.preload = preloaded.concat(newLngs);
    this.loadResources(err => {
      deferred.resolve();
      if (callback) callback(err);
    });
    return deferred;
  }
  dir(lng) {
    if (!lng) lng = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language);
    if (!lng) return 'rtl';
    const rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam', 'ckb'];
    const languageUtils = this.services && this.services.languageUtils || new LanguageUtil(get$1());
    return rtlLngs.indexOf(languageUtils.getLanguagePartFromCode(lng)) > -1 || lng.toLowerCase().indexOf('-arab') > 1 ? 'rtl' : 'ltr';
  }
  static createInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 ? arguments[1] : undefined;
    return new I18n(options, callback);
  }
  cloneInstance() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop$1;
    const forkResourceStore = options.forkResourceStore;
    if (forkResourceStore) delete options.forkResourceStore;
    const mergedOptions = {
      ...this.options,
      ...options,
      ...{
        isClone: true
      }
    };
    const clone = new I18n(mergedOptions);
    if (options.debug !== undefined || options.prefix !== undefined) {
      clone.logger = clone.logger.clone(options);
    }
    const membersToCopy = ['store', 'services', 'language'];
    membersToCopy.forEach(m => {
      clone[m] = this[m];
    });
    clone.services = {
      ...this.services
    };
    clone.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    if (forkResourceStore) {
      clone.store = new ResourceStore(this.store.data, mergedOptions);
      clone.services.resourceStore = clone.store;
    }
    clone.translator = new Translator(clone.services, mergedOptions);
    clone.translator.on('*', function (event) {
      for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        args[_key4 - 1] = arguments[_key4];
      }
      clone.emit(event, ...args);
    });
    clone.init(mergedOptions, callback);
    clone.translator.options = mergedOptions;
    clone.translator.backendConnector.services.utils = {
      hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
    };
    return clone;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const instance = I18n.createInstance();
instance.createInstance = I18n.createInstance;

instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
const t$1 = instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;

const example$3 = "example";
const enUS = {
	"symbol.TimelineConversation": "Timeline: Conversation",
	"symbol.DiscoverMore": "Discover more",
	"symbol.SourcedFromAcrossTwitter": "Sourced from across Twitter",
	"symbol.MoreTween": "Show more replies",
	"symbol.VerifiedAccount": "Get Verified",
	"symbol.CommunitiesNewItems": "Communities (New items)",
	"symbol.Communities": "Communities",
	"symbol.TwitterBlue": "Twitter Blue",
	"symbol.Verified": "Verified",
	"symbol.TimelineTrendingNow": "Timeline: Trending now",
	"symbol.WhoToFollow": "Who to follow",
	"symbol.SearchAndExplore": "Search and explore",
	"symbol.TimelineExplore": "Timeline: Explore",
	"symbol.HomeTimeline": "Home timeline",
	"symbol.VerifiedOrganizations": "Verified Organizations",
	"symbol.Trending": "Trending",
	"symbol.Toolbar.reply": "Reply",
	"symbol.Toolbar.Retweet": "Retweet",
	"symbol.Toolbar.likes": "Like",
	"symbol.Toolbar.ViewTweetAnalytics": "View Tweet analytics",
	"symbol.Image": "Image",
	"symbol.ProfileTimelines": "Profile timelines",
	"config.title": "Configuration",
	"config.language": "Language",
	"plugin.hideHomeTabs.name": "Hide home tabs",
	"plugin.hideBlueBadge.name": "Hide blue badge",
	"plugin.hideDiscoverMore.name": "Hide discover more",
	"plugin.hideRightSidebar.name": "Hide right sidebar",
	"plugin.hideSearchAndExplore.name": "Hide search and explore",
	"plugin.hideTimelineExplore.name": "Hide timeline: Explore",
	"plugin.hideViewTweetAnalytics.name": "Hide view Tweet analytics",
	"plugin.hideOther.name": "Hide other",
	"plugin.hideLive.name": "Hide live",
	"plugin.restoreLogo.name": "Restore the logo",
	"plugin.hideBlockTweet.name": "Hide block tweet",
	"plugin.restoreShareLink.name": "Restore share link",
	example: example$3
};

const example$2 = "example";
const zhCN = {
	"symbol.TimelineConversation": "时间线：对话",
	"symbol.DiscoverMore": "发现更多",
	"symbol.SourcedFromAcrossTwitter": "源自于整个 Twitter",
	"symbol.MoreTween": "显示更多回复",
	"symbol.VerifiedAccount": "获得认证",
	"symbol.CommunitiesNewItems": "Communities (New items)",
	"symbol.Communities": "社群",
	"symbol.TwitterBlue": "Twitter Blue",
	"symbol.Verified": "已认证",
	"symbol.TimelineTrendingNow": "时间线：当前趋势",
	"symbol.WhoToFollow": "推荐关注",
	"symbol.SearchAndExplore": "搜索和发现",
	"symbol.TimelineExplore": "时间线：探索",
	"symbol.HomeTimeline": "主页时间线",
	"symbol.VerifiedOrganizations": "Verified Organizations",
	"symbol.Trending": "当前趋势",
	"symbol.Toolbar.reply": "回复",
	"symbol.Toolbar.Retweet": "转推",
	"symbol.Toolbar.likes": "喜欢",
	"symbol.Toolbar.ViewTweetAnalytics": "查看推文分析",
	"symbol.Image": "图像",
	"symbol.ProfileTimelines": "个人资料时间线",
	"config.title": "配置",
	"config.language": "Twitter 使用的语言",
	"plugin.hideHomeTabs.name": "隐藏首页的标签页",
	"plugin.hideRightSidebar.name": "隐藏主页右侧边栏",
	"plugin.hideSearchAndExplore.name": "隐藏搜索和发现",
	"plugin.hideBlueBadge.name": "隐藏获得认证的广告",
	"plugin.hideDiscoverMore.name": "隐藏发现更多",
	"plugin.hideTimelineExplore.name": "隐藏搜索页面的推荐",
	"plugin.hideViewTweetAnalytics.name": "隐藏查看推文分析链接",
	"plugin.hideOther.name": "隐藏其他的广告",
	"plugin.hideLive.name": "隐藏直播",
	"plugin.restoreLogo.name": "恢复 Twitter 的 Logo",
	"plugin.hideBlockTweet.name": "屏蔽诈骗推文",
	"plugin.restoreShareLink.name": "恢复分享链接",
	example: example$2
};

const example$1 = "example";
const zhTW = {
	"symbol.TimelineConversation": "時間軸：對話",
	"symbol.DiscoverMore": "探索更多",
	"symbol.SourcedFromAcrossTwitter": "來自整個 Twitter",
	"symbol.MoreTween": "顯示更多回覆",
	"symbol.VerifiedAccount": "獲得認證",
	"symbol.CommunitiesNewItems": "Communities (New items)",
	"symbol.Communities": "社群",
	"symbol.TwitterBlue": "Twitter Blue",
	"symbol.Verified": "已認證",
	"symbol.TimelineTrendingNow": "時間軸：流行趨勢",
	"symbol.WhoToFollow": "跟隨誰",
	"symbol.SearchAndExplore": "搜尋和探索",
	"symbol.TimelineExplore": "時間軸：探索",
	"symbol.HomeTimeline": "首頁時間軸",
	"symbol.VerifiedOrganizations": "Verified Organizations",
	"symbol.Trending": "流行趨勢",
	"symbol.Toolbar.reply": "回覆",
	"symbol.Toolbar.Retweet": "轉推",
	"symbol.Toolbar.likes": "喜歡",
	"symbol.Toolbar.ViewTweetAnalytics": "查看推文分析",
	"symbol.Image": "圖片",
	"symbol.ProfileTimelines": "個人資料時間軸",
	example: example$1
};

const example = "example";
const jaJP = {
	"symbol.TimelineConversation": "タイムライン: 会話",
	"symbol.DiscoverMore": "もっと見つける",
	"symbol.SourcedFromAcrossTwitter": "Twitter から",
	"symbol.MoreTween": "返信をさらに表示",
	"symbol.VerifiedAccount": "認証を受ける",
	"symbol.CommunitiesNewItems": "Communities (New items)",
	"symbol.Communities": "コミュニティ",
	"symbol.TwitterBlue": "Twitter Blue",
	"symbol.Verified": "認証済み",
	"symbol.TimelineTrendingNow": "タイムライン: トレンド",
	"symbol.WhoToFollow": "おすすめユーザー",
	"symbol.SearchAndExplore": "調べたいものを検索",
	"symbol.TimelineExplore": "タイムライン: 話題を検索",
	"symbol.HomeTimeline": "ホームタイムライン",
	"symbol.VerifiedOrganizations": "Verified Organizations",
	"symbol.Trending": "トレンド",
	"symbol.Toolbar.reply": "返信",
	"symbol.Toolbar.Retweet": "のリツイート",
	"symbol.Toolbar.likes": "いいね",
	"symbol.Toolbar.ViewTweetAnalytics": "ツイートアナリティクスを表示",
	"symbol.Image": "画像",
	"symbol.ProfileTimelines": "プロフィールタイムライン",
	example: example
};

const langList = [
  {
    value: "ar-SA",
    label: "العربية (المملكة العربية السعودية)"
  },
  {
    value: "bn-BD",
    label: "বাংলা (বাংলাদেশ)"
  },
  {
    value: "bn-IN",
    label: "বাংলা (ভারত)"
  },
  {
    value: "cs-CZ",
    label: "čeština (Česká republika)"
  },
  {
    value: "da-DK",
    label: "dansk (Danmark)"
  },
  {
    value: "de-AT",
    label: "Österreichisches Deutsch"
  },
  {
    value: "de-CH",
    label: "Schweizer Hochdeutsch"
  },
  {
    value: "de-DE",
    label: "Standarddeutsch (wie es in Deutschland gesprochen wird)"
  },
  {
    value: "el-GR",
    label: "Νέα Ελληνικά (Ελλάδα)"
  },
  {
    value: "en-AU",
    label: "Australian English"
  },
  {
    value: "en-CA",
    label: "Canadian English"
  },
  {
    value: "en-GB",
    label: "British English"
  },
  {
    value: "en-IE",
    label: "Irish English"
  },
  {
    value: "en-IN",
    label: "Indian English"
  },
  {
    value: "en-NZ",
    label: "New Zealand English"
  },
  {
    value: "en-US",
    label: "English"
  },
  {
    value: "en-ZA",
    label: "English (South Africa)"
  },
  {
    value: "es-AR",
    label: "Español de Argentina"
  },
  {
    value: "es-CL",
    label: "Español de Chile"
  },
  {
    value: "es-CO",
    label: "Español de Colombia"
  },
  {
    value: "es-ES",
    label: "Español de España"
  },
  {
    value: "es-MX",
    label: "Español de México"
  },
  {
    value: "es-US",
    label: "Español de Estados Unidos"
  },
  {
    value: "fi-FI",
    label: "Suomi (Suomi)"
  },
  {
    value: "fr-BE",
    label: "français de Belgique"
  },
  {
    value: "fr-CA",
    label: "français canadien"
  },
  {
    value: "fr-CH",
    label: "français suisse"
  },
  {
    value: "fr-FR",
    label: "français standard (surtout en France)"
  },
  {
    value: "he-IL",
    label: "עברית (ישראל)"
  },
  {
    value: "hi-IN",
    label: "हिन्दी (भारत)"
  },
  {
    value: "hu-HU",
    label: "Magyar (Magyarország)"
  },
  {
    value: "id-ID",
    label: "Bahasa Indonesia (Indonesia)"
  },
  {
    value: "it-CH",
    label: "Italiano svizzero"
  },
  {
    value: "it-IT",
    label: "Italiano standard (come si parla in Italia)"
  },
  {
    value: "ja-JP",
    label: "日本語 (日本)"
  },
  {
    value: "ko-KR",
    label: "한국어 (대한민국)"
  },
  {
    value: "nl-BE",
    label: "Nederlands van België"
  },
  {
    value: "nl-NL",
    label: "Standaard Nederlands (zoals gesproken in Nederland)"
  },
  {
    value: "no-NO",
    label: "Norsk (Norge)"
  },
  {
    value: "pl-PL",
    label: "Polski (Polska)"
  },
  {
    value: "pt-BR",
    label: "Português do Brasil"
  },
  {
    value: "pt-PT",
    label: "Português europeu (como escrito e falado em Portugal)"
  },
  {
    value: "ro-RO",
    label: "Română (România)"
  },
  {
    value: "ru-RU",
    label: "Русский (Россия)"
  },
  {
    value: "sk-SK",
    label: "Slovenčina (Slovenská republika)"
  },
  {
    value: "sv-SE",
    label: "Svenska (Sverige)"
  },
  {
    value: "ta-IN",
    label: "தமிழ் (இந்தியா)"
  },
  {
    value: "ta-LK",
    label: "தமிழ் (இலங்கை)"
  },
  {
    value: "th-TH",
    label: "ไทย (ประเทศไทย)"
  },
  {
    value: "tr-TR",
    label: "Türkçe (Türkiye)"
  },
  {
    value: "zh-CN",
    label: "简体中文（中国大陆）"
  },
  {
    value: "zh-HK",
    label: "繁體中文（香港特別行政區）"
  },
  {
    value: "zh-TW",
    label: "繁體中文（台灣）"
  }
];

var browserPolyfill = {exports: {}};

(function (module, exports) {
	(function (global, factory) {
	  {
	    factory(module);
	  }
	})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function (module) {

	  if (!globalThis.chrome?.runtime?.id) {
	    throw new Error("This script should only be loaded in a browser extension.");
	  }

	  if (typeof globalThis.browser === "undefined" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
	    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received."; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
	    // optimization for Firefox. Since Spidermonkey does not fully parse the
	    // contents of a function until the first time it's called, and since it will
	    // never actually need to be called, this allows the polyfill to be included
	    // in Firefox nearly for free.

	    const wrapAPIs = extensionAPIs => {
	      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
	      // at build time by replacing the following "include" with the content of the
	      // JSON file.
	      const apiMetadata = {
	        "alarms": {
	          "clear": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "clearAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "get": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "bookmarks": {
	          "create": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "get": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getChildren": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getRecent": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getSubTree": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getTree": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "move": {
	            "minArgs": 2,
	            "maxArgs": 2
	          },
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeTree": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "search": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "update": {
	            "minArgs": 2,
	            "maxArgs": 2
	          }
	        },
	        "browserAction": {
	          "disable": {
	            "minArgs": 0,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "enable": {
	            "minArgs": 0,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "getBadgeBackgroundColor": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getBadgeText": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getPopup": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getTitle": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "openPopup": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "setBadgeBackgroundColor": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "setBadgeText": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "setIcon": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "setPopup": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "setTitle": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          }
	        },
	        "browsingData": {
	          "remove": {
	            "minArgs": 2,
	            "maxArgs": 2
	          },
	          "removeCache": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeCookies": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeDownloads": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeFormData": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeHistory": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeLocalStorage": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removePasswords": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removePluginData": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "settings": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "commands": {
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "contextMenus": {
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "update": {
	            "minArgs": 2,
	            "maxArgs": 2
	          }
	        },
	        "cookies": {
	          "get": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getAll": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getAllCookieStores": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "set": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "devtools": {
	          "inspectedWindow": {
	            "eval": {
	              "minArgs": 1,
	              "maxArgs": 2,
	              "singleCallbackArg": false
	            }
	          },
	          "panels": {
	            "create": {
	              "minArgs": 3,
	              "maxArgs": 3,
	              "singleCallbackArg": true
	            },
	            "elements": {
	              "createSidebarPane": {
	                "minArgs": 1,
	                "maxArgs": 1
	              }
	            }
	          }
	        },
	        "downloads": {
	          "cancel": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "download": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "erase": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getFileIcon": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "open": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "pause": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeFile": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "resume": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "search": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "show": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          }
	        },
	        "extension": {
	          "isAllowedFileSchemeAccess": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "isAllowedIncognitoAccess": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "history": {
	          "addUrl": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "deleteAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "deleteRange": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "deleteUrl": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getVisits": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "search": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "i18n": {
	          "detectLanguage": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getAcceptLanguages": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "identity": {
	          "launchWebAuthFlow": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "idle": {
	          "queryState": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "management": {
	          "get": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "getSelf": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "setEnabled": {
	            "minArgs": 2,
	            "maxArgs": 2
	          },
	          "uninstallSelf": {
	            "minArgs": 0,
	            "maxArgs": 1
	          }
	        },
	        "notifications": {
	          "clear": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "create": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "getPermissionLevel": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "update": {
	            "minArgs": 2,
	            "maxArgs": 2
	          }
	        },
	        "pageAction": {
	          "getPopup": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getTitle": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "hide": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "setIcon": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "setPopup": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "setTitle": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          },
	          "show": {
	            "minArgs": 1,
	            "maxArgs": 1,
	            "fallbackToNoCallback": true
	          }
	        },
	        "permissions": {
	          "contains": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "request": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "runtime": {
	          "getBackgroundPage": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "getPlatformInfo": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "openOptionsPage": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "requestUpdateCheck": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "sendMessage": {
	            "minArgs": 1,
	            "maxArgs": 3
	          },
	          "sendNativeMessage": {
	            "minArgs": 2,
	            "maxArgs": 2
	          },
	          "setUninstallURL": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "sessions": {
	          "getDevices": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "getRecentlyClosed": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "restore": {
	            "minArgs": 0,
	            "maxArgs": 1
	          }
	        },
	        "storage": {
	          "local": {
	            "clear": {
	              "minArgs": 0,
	              "maxArgs": 0
	            },
	            "get": {
	              "minArgs": 0,
	              "maxArgs": 1
	            },
	            "getBytesInUse": {
	              "minArgs": 0,
	              "maxArgs": 1
	            },
	            "remove": {
	              "minArgs": 1,
	              "maxArgs": 1
	            },
	            "set": {
	              "minArgs": 1,
	              "maxArgs": 1
	            }
	          },
	          "managed": {
	            "get": {
	              "minArgs": 0,
	              "maxArgs": 1
	            },
	            "getBytesInUse": {
	              "minArgs": 0,
	              "maxArgs": 1
	            }
	          },
	          "sync": {
	            "clear": {
	              "minArgs": 0,
	              "maxArgs": 0
	            },
	            "get": {
	              "minArgs": 0,
	              "maxArgs": 1
	            },
	            "getBytesInUse": {
	              "minArgs": 0,
	              "maxArgs": 1
	            },
	            "remove": {
	              "minArgs": 1,
	              "maxArgs": 1
	            },
	            "set": {
	              "minArgs": 1,
	              "maxArgs": 1
	            }
	          }
	        },
	        "tabs": {
	          "captureVisibleTab": {
	            "minArgs": 0,
	            "maxArgs": 2
	          },
	          "create": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "detectLanguage": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "discard": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "duplicate": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "executeScript": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "get": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getCurrent": {
	            "minArgs": 0,
	            "maxArgs": 0
	          },
	          "getZoom": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "getZoomSettings": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "goBack": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "goForward": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "highlight": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "insertCSS": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "move": {
	            "minArgs": 2,
	            "maxArgs": 2
	          },
	          "query": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "reload": {
	            "minArgs": 0,
	            "maxArgs": 2
	          },
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "removeCSS": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "sendMessage": {
	            "minArgs": 2,
	            "maxArgs": 3
	          },
	          "setZoom": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "setZoomSettings": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "update": {
	            "minArgs": 1,
	            "maxArgs": 2
	          }
	        },
	        "topSites": {
	          "get": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "webNavigation": {
	          "getAllFrames": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "getFrame": {
	            "minArgs": 1,
	            "maxArgs": 1
	          }
	        },
	        "webRequest": {
	          "handlerBehaviorChanged": {
	            "minArgs": 0,
	            "maxArgs": 0
	          }
	        },
	        "windows": {
	          "create": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "get": {
	            "minArgs": 1,
	            "maxArgs": 2
	          },
	          "getAll": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "getCurrent": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "getLastFocused": {
	            "minArgs": 0,
	            "maxArgs": 1
	          },
	          "remove": {
	            "minArgs": 1,
	            "maxArgs": 1
	          },
	          "update": {
	            "minArgs": 2,
	            "maxArgs": 2
	          }
	        }
	      };

	      if (Object.keys(apiMetadata).length === 0) {
	        throw new Error("api-metadata.json has not been included in browser-polyfill");
	      }
	      /**
	       * A WeakMap subclass which creates and stores a value for any key which does
	       * not exist when accessed, but behaves exactly as an ordinary WeakMap
	       * otherwise.
	       *
	       * @param {function} createItem
	       *        A function which will be called in order to create the value for any
	       *        key which does not exist, the first time it is accessed. The
	       *        function receives, as its only argument, the key being created.
	       */


	      class DefaultWeakMap extends WeakMap {
	        constructor(createItem, items = undefined) {
	          super(items);
	          this.createItem = createItem;
	        }

	        get(key) {
	          if (!this.has(key)) {
	            this.set(key, this.createItem(key));
	          }

	          return super.get(key);
	        }

	      }
	      /**
	       * Returns true if the given object is an object with a `then` method, and can
	       * therefore be assumed to behave as a Promise.
	       *
	       * @param {*} value The value to test.
	       * @returns {boolean} True if the value is thenable.
	       */


	      const isThenable = value => {
	        return value && typeof value === "object" && typeof value.then === "function";
	      };
	      /**
	       * Creates and returns a function which, when called, will resolve or reject
	       * the given promise based on how it is called:
	       *
	       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
	       *   the promise is rejected with that value.
	       * - If the function is called with exactly one argument, the promise is
	       *   resolved to that value.
	       * - Otherwise, the promise is resolved to an array containing all of the
	       *   function's arguments.
	       *
	       * @param {object} promise
	       *        An object containing the resolution and rejection functions of a
	       *        promise.
	       * @param {function} promise.resolve
	       *        The promise's resolution function.
	       * @param {function} promise.reject
	       *        The promise's rejection function.
	       * @param {object} metadata
	       *        Metadata about the wrapped method which has created the callback.
	       * @param {boolean} metadata.singleCallbackArg
	       *        Whether or not the promise is resolved with only the first
	       *        argument of the callback, alternatively an array of all the
	       *        callback arguments is resolved. By default, if the callback
	       *        function is invoked with only a single argument, that will be
	       *        resolved to the promise, while all arguments will be resolved as
	       *        an array if multiple are given.
	       *
	       * @returns {function}
	       *        The generated callback function.
	       */


	      const makeCallback = (promise, metadata) => {
	        return (...callbackArgs) => {
	          if (extensionAPIs.runtime.lastError) {
	            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
	          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
	            promise.resolve(callbackArgs[0]);
	          } else {
	            promise.resolve(callbackArgs);
	          }
	        };
	      };

	      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
	      /**
	       * Creates a wrapper function for a method with the given name and metadata.
	       *
	       * @param {string} name
	       *        The name of the method which is being wrapped.
	       * @param {object} metadata
	       *        Metadata about the method being wrapped.
	       * @param {integer} metadata.minArgs
	       *        The minimum number of arguments which must be passed to the
	       *        function. If called with fewer than this number of arguments, the
	       *        wrapper will raise an exception.
	       * @param {integer} metadata.maxArgs
	       *        The maximum number of arguments which may be passed to the
	       *        function. If called with more than this number of arguments, the
	       *        wrapper will raise an exception.
	       * @param {boolean} metadata.singleCallbackArg
	       *        Whether or not the promise is resolved with only the first
	       *        argument of the callback, alternatively an array of all the
	       *        callback arguments is resolved. By default, if the callback
	       *        function is invoked with only a single argument, that will be
	       *        resolved to the promise, while all arguments will be resolved as
	       *        an array if multiple are given.
	       *
	       * @returns {function(object, ...*)}
	       *       The generated wrapper function.
	       */


	      const wrapAsyncFunction = (name, metadata) => {
	        return function asyncFunctionWrapper(target, ...args) {
	          if (args.length < metadata.minArgs) {
	            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
	          }

	          if (args.length > metadata.maxArgs) {
	            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
	          }

	          return new Promise((resolve, reject) => {
	            if (metadata.fallbackToNoCallback) {
	              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
	              // and so the polyfill will try to call it with a callback first, and it will fallback
	              // to not passing the callback if the first call fails.
	              try {
	                target[name](...args, makeCallback({
	                  resolve,
	                  reject
	                }, metadata));
	              } catch (cbError) {
	                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
	                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
	                // use the unsupported callback anymore.

	                metadata.fallbackToNoCallback = false;
	                metadata.noCallback = true;
	                resolve();
	              }
	            } else if (metadata.noCallback) {
	              target[name](...args);
	              resolve();
	            } else {
	              target[name](...args, makeCallback({
	                resolve,
	                reject
	              }, metadata));
	            }
	          });
	        };
	      };
	      /**
	       * Wraps an existing method of the target object, so that calls to it are
	       * intercepted by the given wrapper function. The wrapper function receives,
	       * as its first argument, the original `target` object, followed by each of
	       * the arguments passed to the original method.
	       *
	       * @param {object} target
	       *        The original target object that the wrapped method belongs to.
	       * @param {function} method
	       *        The method being wrapped. This is used as the target of the Proxy
	       *        object which is created to wrap the method.
	       * @param {function} wrapper
	       *        The wrapper function which is called in place of a direct invocation
	       *        of the wrapped method.
	       *
	       * @returns {Proxy<function>}
	       *        A Proxy object for the given method, which invokes the given wrapper
	       *        method in its place.
	       */


	      const wrapMethod = (target, method, wrapper) => {
	        return new Proxy(method, {
	          apply(targetMethod, thisObj, args) {
	            return wrapper.call(thisObj, target, ...args);
	          }

	        });
	      };

	      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
	      /**
	       * Wraps an object in a Proxy which intercepts and wraps certain methods
	       * based on the given `wrappers` and `metadata` objects.
	       *
	       * @param {object} target
	       *        The target object to wrap.
	       *
	       * @param {object} [wrappers = {}]
	       *        An object tree containing wrapper functions for special cases. Any
	       *        function present in this object tree is called in place of the
	       *        method in the same location in the `target` object tree. These
	       *        wrapper methods are invoked as described in {@see wrapMethod}.
	       *
	       * @param {object} [metadata = {}]
	       *        An object tree containing metadata used to automatically generate
	       *        Promise-based wrapper functions for asynchronous. Any function in
	       *        the `target` object tree which has a corresponding metadata object
	       *        in the same location in the `metadata` tree is replaced with an
	       *        automatically-generated wrapper function, as described in
	       *        {@see wrapAsyncFunction}
	       *
	       * @returns {Proxy<object>}
	       */

	      const wrapObject = (target, wrappers = {}, metadata = {}) => {
	        let cache = Object.create(null);
	        let handlers = {
	          has(proxyTarget, prop) {
	            return prop in target || prop in cache;
	          },

	          get(proxyTarget, prop, receiver) {
	            if (prop in cache) {
	              return cache[prop];
	            }

	            if (!(prop in target)) {
	              return undefined;
	            }

	            let value = target[prop];

	            if (typeof value === "function") {
	              // This is a method on the underlying object. Check if we need to do
	              // any wrapping.
	              if (typeof wrappers[prop] === "function") {
	                // We have a special-case wrapper for this method.
	                value = wrapMethod(target, target[prop], wrappers[prop]);
	              } else if (hasOwnProperty(metadata, prop)) {
	                // This is an async method that we have metadata for. Create a
	                // Promise wrapper for it.
	                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
	                value = wrapMethod(target, target[prop], wrapper);
	              } else {
	                // This is a method that we don't know or care about. Return the
	                // original method, bound to the underlying object.
	                value = value.bind(target);
	              }
	            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
	              // This is an object that we need to do some wrapping for the children
	              // of. Create a sub-object wrapper for it with the appropriate child
	              // metadata.
	              value = wrapObject(value, wrappers[prop], metadata[prop]);
	            } else if (hasOwnProperty(metadata, "*")) {
	              // Wrap all properties in * namespace.
	              value = wrapObject(value, wrappers[prop], metadata["*"]);
	            } else {
	              // We don't need to do any wrapping for this property,
	              // so just forward all access to the underlying object.
	              Object.defineProperty(cache, prop, {
	                configurable: true,
	                enumerable: true,

	                get() {
	                  return target[prop];
	                },

	                set(value) {
	                  target[prop] = value;
	                }

	              });
	              return value;
	            }

	            cache[prop] = value;
	            return value;
	          },

	          set(proxyTarget, prop, value, receiver) {
	            if (prop in cache) {
	              cache[prop] = value;
	            } else {
	              target[prop] = value;
	            }

	            return true;
	          },

	          defineProperty(proxyTarget, prop, desc) {
	            return Reflect.defineProperty(cache, prop, desc);
	          },

	          deleteProperty(proxyTarget, prop) {
	            return Reflect.deleteProperty(cache, prop);
	          }

	        }; // Per contract of the Proxy API, the "get" proxy handler must return the
	        // original value of the target if that value is declared read-only and
	        // non-configurable. For this reason, we create an object with the
	        // prototype set to `target` instead of using `target` directly.
	        // Otherwise we cannot return a custom object for APIs that
	        // are declared read-only and non-configurable, such as `chrome.devtools`.
	        //
	        // The proxy handlers themselves will still use the original `target`
	        // instead of the `proxyTarget`, so that the methods and properties are
	        // dereferenced via the original targets.

	        let proxyTarget = Object.create(target);
	        return new Proxy(proxyTarget, handlers);
	      };
	      /**
	       * Creates a set of wrapper functions for an event object, which handles
	       * wrapping of listener functions that those messages are passed.
	       *
	       * A single wrapper is created for each listener function, and stored in a
	       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
	       * retrieve the original wrapper, so that  attempts to remove a
	       * previously-added listener work as expected.
	       *
	       * @param {DefaultWeakMap<function, function>} wrapperMap
	       *        A DefaultWeakMap object which will create the appropriate wrapper
	       *        for a given listener function when one does not exist, and retrieve
	       *        an existing one when it does.
	       *
	       * @returns {object}
	       */


	      const wrapEvent = wrapperMap => ({
	        addListener(target, listener, ...args) {
	          target.addListener(wrapperMap.get(listener), ...args);
	        },

	        hasListener(target, listener) {
	          return target.hasListener(wrapperMap.get(listener));
	        },

	        removeListener(target, listener) {
	          target.removeListener(wrapperMap.get(listener));
	        }

	      });

	      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
	        if (typeof listener !== "function") {
	          return listener;
	        }
	        /**
	         * Wraps an onRequestFinished listener function so that it will return a
	         * `getContent()` property which returns a `Promise` rather than using a
	         * callback API.
	         *
	         * @param {object} req
	         *        The HAR entry object representing the network request.
	         */


	        return function onRequestFinished(req) {
	          const wrappedReq = wrapObject(req, {}
	          /* wrappers */
	          , {
	            getContent: {
	              minArgs: 0,
	              maxArgs: 0
	            }
	          });
	          listener(wrappedReq);
	        };
	      });
	      const onMessageWrappers = new DefaultWeakMap(listener => {
	        if (typeof listener !== "function") {
	          return listener;
	        }
	        /**
	         * Wraps a message listener function so that it may send responses based on
	         * its return value, rather than by returning a sentinel value and calling a
	         * callback. If the listener function returns a Promise, the response is
	         * sent when the promise either resolves or rejects.
	         *
	         * @param {*} message
	         *        The message sent by the other end of the channel.
	         * @param {object} sender
	         *        Details about the sender of the message.
	         * @param {function(*)} sendResponse
	         *        A callback which, when called with an arbitrary argument, sends
	         *        that value as a response.
	         * @returns {boolean}
	         *        True if the wrapped listener returned a Promise, which will later
	         *        yield a response. False otherwise.
	         */


	        return function onMessage(message, sender, sendResponse) {
	          let didCallSendResponse = false;
	          let wrappedSendResponse;
	          let sendResponsePromise = new Promise(resolve => {
	            wrappedSendResponse = function (response) {
	              didCallSendResponse = true;
	              resolve(response);
	            };
	          });
	          let result;

	          try {
	            result = listener(message, sender, wrappedSendResponse);
	          } catch (err) {
	            result = Promise.reject(err);
	          }

	          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
	          // wrappedSendResponse synchronously, we can exit earlier
	          // because there will be no response sent from this listener.

	          if (result !== true && !isResultThenable && !didCallSendResponse) {
	            return false;
	          } // A small helper to send the message if the promise resolves
	          // and an error if the promise rejects (a wrapped sendMessage has
	          // to translate the message into a resolved promise or a rejected
	          // promise).


	          const sendPromisedResult = promise => {
	            promise.then(msg => {
	              // send the message value.
	              sendResponse(msg);
	            }, error => {
	              // Send a JSON representation of the error if the rejected value
	              // is an instance of error, or the object itself otherwise.
	              let message;

	              if (error && (error instanceof Error || typeof error.message === "string")) {
	                message = error.message;
	              } else {
	                message = "An unexpected error occurred";
	              }

	              sendResponse({
	                __mozWebExtensionPolyfillReject__: true,
	                message
	              });
	            }).catch(err => {
	              // Print an error on the console if unable to send the response.
	              console.error("Failed to send onMessage rejected reply", err);
	            });
	          }; // If the listener returned a Promise, send the resolved value as a
	          // result, otherwise wait the promise related to the wrappedSendResponse
	          // callback to resolve and send it as a response.


	          if (isResultThenable) {
	            sendPromisedResult(result);
	          } else {
	            sendPromisedResult(sendResponsePromise);
	          } // Let Chrome know that the listener is replying.


	          return true;
	        };
	      });

	      const wrappedSendMessageCallback = ({
	        reject,
	        resolve
	      }, reply) => {
	        if (extensionAPIs.runtime.lastError) {
	          // Detect when none of the listeners replied to the sendMessage call and resolve
	          // the promise to undefined as in Firefox.
	          // See https://github.com/mozilla/webextension-polyfill/issues/130
	          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
	            resolve();
	          } else {
	            reject(new Error(extensionAPIs.runtime.lastError.message));
	          }
	        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
	          // Convert back the JSON representation of the error into
	          // an Error instance.
	          reject(new Error(reply.message));
	        } else {
	          resolve(reply);
	        }
	      };

	      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
	        if (args.length < metadata.minArgs) {
	          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
	        }

	        if (args.length > metadata.maxArgs) {
	          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
	        }

	        return new Promise((resolve, reject) => {
	          const wrappedCb = wrappedSendMessageCallback.bind(null, {
	            resolve,
	            reject
	          });
	          args.push(wrappedCb);
	          apiNamespaceObj.sendMessage(...args);
	        });
	      };

	      const staticWrappers = {
	        devtools: {
	          network: {
	            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
	          }
	        },
	        runtime: {
	          onMessage: wrapEvent(onMessageWrappers),
	          onMessageExternal: wrapEvent(onMessageWrappers),
	          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
	            minArgs: 1,
	            maxArgs: 3
	          })
	        },
	        tabs: {
	          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
	            minArgs: 2,
	            maxArgs: 3
	          })
	        }
	      };
	      const settingMetadata = {
	        clear: {
	          minArgs: 1,
	          maxArgs: 1
	        },
	        get: {
	          minArgs: 1,
	          maxArgs: 1
	        },
	        set: {
	          minArgs: 1,
	          maxArgs: 1
	        }
	      };
	      apiMetadata.privacy = {
	        network: {
	          "*": settingMetadata
	        },
	        services: {
	          "*": settingMetadata
	        },
	        websites: {
	          "*": settingMetadata
	        }
	      };
	      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
	    }; // The build process adds a UMD wrapper around this file, which makes the
	    // `module` variable available.


	    module.exports = wrapAPIs(chrome);
	  } else {
	    module.exports = globalThis.browser;
	  }
	});
	
} (browserPolyfill));

var browserPolyfillExports = browserPolyfill.exports;
const Browser = /*@__PURE__*/getDefaultExportFromCjs(browserPolyfillExports);

const langs = langList.filter(
  (it) => ["en-US", "zh-CN", "zh-TW", "ja-JP"].includes(it.value)
);
const initI18n = async () => await instance.init({
  lng: (await Browser.storage.sync.get("language")).language,
  fallbackLng: "en-US",
  debug: true,
  resources: {
    "en-US": { translation: enUS },
    "zh-CN": { translation: zhCN },
    "zh-TW": { translation: zhTW },
    "ja-JP": { translation: jaJP }
  },
  keySeparator: false
});
function t(...args) {
  return instance.t(args[0], args[1]);
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/AsyncArray.ts
var ActionTypeEnum = /* @__PURE__ */ ((ActionTypeEnum2) => {
  ActionTypeEnum2["Filter"] = "filter";
  ActionTypeEnum2["Map"] = "map";
  ActionTypeEnum2["ForEach"] = "forEach";
  ActionTypeEnum2["Reduce"] = "reduce";
  ActionTypeEnum2["FlatMap"] = "flatMap";
  return ActionTypeEnum2;
})(ActionTypeEnum || {});
var Action = class {
  constructor(type, args) {
    this.type = type;
    this.args = args;
    this.type = type;
    this.args = args;
  }
};
__publicField(Action, "Type", ActionTypeEnum);
var AsyncArray = class {
  constructor(arr) {
    this.arr = arr;
  }
  static reduce(arr, fn, res) {
    return arr.reduce(
      (res2, item, index) => res2.then((r) => fn(r, item, index)),
      Promise.resolve(res)
    );
  }
  static map(arr, fn) {
    return Promise.all(arr.map((item, index) => fn(item, index)));
  }
  static async filter(arr, fn) {
    const res = [];
    await AsyncArray.map(arr, async (item, index) => {
      if (await fn(item, index)) {
        res.push(item);
      }
    });
    return res;
  }
  static async flatMap(arr, fn) {
    return (await Promise.all(arr.map((item, index) => fn(item, index)))).flatMap((r) => r);
  }
  static async forEach(arr, fn) {
    await AsyncArray.map(arr, fn);
  }
  tasks = [];
  map(fn) {
    this.tasks.push(new Action("map" /* Map */, [fn]));
    return this;
  }
  flatMap(fn) {
    this.tasks.push(new Action("flatMap" /* FlatMap */, [fn]));
    return this;
  }
  filter(fn) {
    this.tasks.push(new Action("filter" /* Filter */, [fn]));
    return this;
  }
  async forEach(fn) {
    this.tasks.push(new Action("map" /* Map */, [fn]));
    await this;
  }
  then(resolve, reject) {
    const res = this.value();
    res.then((r) => {
      resolve && resolve(res);
      return r;
    }).catch((e) => {
      reject && reject(e);
      throw e;
    });
    return res;
  }
  async value() {
    let res = this.arr;
    for (const task of this.tasks) {
      switch (task.type) {
        case "filter" /* Filter */:
          res = await AsyncArray.filter(res, task.args[0]);
          break;
        case "map" /* Map */:
          res = await AsyncArray.map(res, task.args[0]);
          break;
        case "flatMap" /* FlatMap */:
          res = await AsyncArray.flatMap(res, task.args[0]);
          break;
        case "forEach" /* ForEach */:
          await AsyncArray.forEach(res, task.args[0]);
          return;
        case "reduce" /* Reduce */:
          return await AsyncArray.reduce(res, task.args[0], task.args[1]);
      }
    }
    return res;
  }
};

const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return (idbProxyableTypes ||
        (idbProxyableTypes = [
            IDBDatabase,
            IDBObjectStore,
            IDBIndex,
            IDBCursor,
            IDBTransaction,
        ]));
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return (cursorAdvanceMethods ||
        (cursorAdvanceMethods = [
            IDBCursor.prototype.advance,
            IDBCursor.prototype.continue,
            IDBCursor.prototype.continuePrimaryKey,
        ]));
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise
        .then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
        // Catching to avoid "Uncaught Promise exceptions"
    })
        .catch(() => { });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error || new DOMException('AbortError', 'AbortError'));
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1]
                    ? undefined
                    : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    set(target, prop, value) {
        target[prop] = value;
        return true;
    },
    has(target, prop) {
        if (target instanceof IDBTransaction &&
            (prop === 'done' || prop === 'store')) {
            return true;
        }
        return prop in target;
    },
};
function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
        });
    }
    if (blocked) {
        request.addEventListener('blocked', (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion, event.newVersion, event));
    }
    openPromise
        .then((db) => {
        if (terminated)
            db.addEventListener('close', () => terminated());
        if (blocking) {
            db.addEventListener('versionchange', (event) => blocking(event.oldVersion, event.newVersion, event));
        }
    })
        .catch(() => { });
    return openPromise;
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string')) {
        return;
    }
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName))) {
        return;
    }
    const method = async function (storeName, ...args) {
        // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        // Must reject if op rejects.
        // If it's a write operation, must reject if tx.done rejects.
        // Must reject with op rejection first.
        // Must resolve with op value.
        // Must handle both promises (no unhandled rejections)
        return (await Promise.all([
            target[targetFuncName](...args),
            isWrite && tx.done,
        ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
}
replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));

const initIndexeddb = async () => await openDB("clean-twitter-0.5.4", 1, {
  upgrade(db) {
    const names = db.objectStoreNames;
    if (!names.contains("config")) {
      db.createObjectStore("config", {
        keyPath: "key"
      });
    }
    if (!names.contains("tweet")) {
      const store = db.createObjectStore("tweet", {
        keyPath: "id"
      });
      store.createIndex("userId", "userId");
      store.createIndex("username", "username");
    }
    if (!names.contains("block")) {
      const store = db.createObjectStore("block", {
        keyPath: "id"
      });
      store.createIndex("username", "username");
    }
  }
});

function getUserAgent() {
    if (typeof navigator === "object" && "userAgent" in navigator) {
        return navigator.userAgent;
    }
    if (typeof process === "object" && "version" in process) {
        return `Node.js/${process.version.substr(1)} (${process.platform}; ${process.arch})`;
    }
    return "<environment undetectable>";
}

const distWeb$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getUserAgent
}, Symbol.toStringTag, { value: 'Module' }));

var beforeAfterHook = {exports: {}};

var register_1 = register$1;

function register$1(state, name, method, options) {
  if (typeof method !== "function") {
    throw new Error("method for before hook must be a function");
  }

  if (!options) {
    options = {};
  }

  if (Array.isArray(name)) {
    return name.reverse().reduce(function (callback, name) {
      return register$1.bind(null, state, name, callback, options);
    }, method)();
  }

  return Promise.resolve().then(function () {
    if (!state.registry[name]) {
      return method(options);
    }

    return state.registry[name].reduce(function (method, registered) {
      return registered.hook.bind(null, method, options);
    }, method)();
  });
}

var add = addHook$1;

function addHook$1(state, kind, name, hook) {
  var orig = hook;
  if (!state.registry[name]) {
    state.registry[name] = [];
  }

  if (kind === "before") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(orig.bind(null, options))
        .then(method.bind(null, options));
    };
  }

  if (kind === "after") {
    hook = function (method, options) {
      var result;
      return Promise.resolve()
        .then(method.bind(null, options))
        .then(function (result_) {
          result = result_;
          return orig(result, options);
        })
        .then(function () {
          return result;
        });
    };
  }

  if (kind === "error") {
    hook = function (method, options) {
      return Promise.resolve()
        .then(method.bind(null, options))
        .catch(function (error) {
          return orig(error, options);
        });
    };
  }

  state.registry[name].push({
    hook: hook,
    orig: orig,
  });
}

var remove = removeHook$1;

function removeHook$1(state, name, method) {
  if (!state.registry[name]) {
    return;
  }

  var index = state.registry[name]
    .map(function (registered) {
      return registered.orig;
    })
    .indexOf(method);

  if (index === -1) {
    return;
  }

  state.registry[name].splice(index, 1);
}

var register = register_1;
var addHook = add;
var removeHook = remove;

// bind with array of arguments: https://stackoverflow.com/a/21792913
var bind = Function.bind;
var bindable = bind.bind(bind);

function bindApi(hook, state, name) {
  var removeHookRef = bindable(removeHook, null).apply(
    null,
    name ? [state, name] : [state]
  );
  hook.api = { remove: removeHookRef };
  hook.remove = removeHookRef;
  ["before", "error", "after", "wrap"].forEach(function (kind) {
    var args = name ? [state, kind, name] : [state, kind];
    hook[kind] = hook.api[kind] = bindable(addHook, null).apply(null, args);
  });
}

function HookSingular() {
  var singularHookName = "h";
  var singularHookState = {
    registry: {},
  };
  var singularHook = register.bind(null, singularHookState, singularHookName);
  bindApi(singularHook, singularHookState, singularHookName);
  return singularHook;
}

function HookCollection() {
  var state = {
    registry: {},
  };

  var hook = register.bind(null, state);
  bindApi(hook, state);

  return hook;
}

var collectionHookDeprecationMessageDisplayed = false;
function Hook() {
  if (!collectionHookDeprecationMessageDisplayed) {
    console.warn(
      '[before-after-hook]: "Hook()" repurposing warning, use "Hook.Collection()". Read more: https://git.io/upgrade-before-after-hook-to-1.4'
    );
    collectionHookDeprecationMessageDisplayed = true;
  }
  return HookCollection();
}

Hook.Singular = HookSingular.bind();
Hook.Collection = HookCollection.bind();

beforeAfterHook.exports = Hook;
// expose constructors as a named property for TypeScript
beforeAfterHook.exports.Hook = Hook;
beforeAfterHook.exports.Singular = Hook.Singular;
var Collection = beforeAfterHook.exports.Collection = Hook.Collection;

/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

function isObject$1(o) {
  return Object.prototype.toString.call(o) === '[object Object]';
}

function isPlainObject(o) {
  var ctor,prot;

  if (isObject$1(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (ctor === undefined) return true;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObject$1(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

// pkg/dist-src/defaults.js

// pkg/dist-src/version.js
var VERSION$d = "9.0.0";

// pkg/dist-src/defaults.js
var userAgent = `octokit-endpoint.js/${VERSION$d} ${getUserAgent()}`;
var DEFAULTS = {
  method: "GET",
  baseUrl: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
    "user-agent": userAgent
  },
  mediaType: {
    format: ""
  }
};

// pkg/dist-src/util/lowercase-keys.js
function lowercaseKeys(object) {
  if (!object) {
    return {};
  }
  return Object.keys(object).reduce((newObj, key) => {
    newObj[key.toLowerCase()] = object[key];
    return newObj;
  }, {});
}
function mergeDeep(defaults, options) {
  const result = Object.assign({}, defaults);
  Object.keys(options).forEach((key) => {
    if (isPlainObject(options[key])) {
      if (!(key in defaults))
        Object.assign(result, { [key]: options[key] });
      else
        result[key] = mergeDeep(defaults[key], options[key]);
    } else {
      Object.assign(result, { [key]: options[key] });
    }
  });
  return result;
}

// pkg/dist-src/util/remove-undefined-properties.js
function removeUndefinedProperties(obj) {
  for (const key in obj) {
    if (obj[key] === void 0) {
      delete obj[key];
    }
  }
  return obj;
}

// pkg/dist-src/merge.js
function merge(defaults, route, options) {
  if (typeof route === "string") {
    let [method, url] = route.split(" ");
    options = Object.assign(url ? { method, url } : { url: method }, options);
  } else {
    options = Object.assign({}, route);
  }
  options.headers = lowercaseKeys(options.headers);
  removeUndefinedProperties(options);
  removeUndefinedProperties(options.headers);
  const mergedOptions = mergeDeep(defaults || {}, options);
  if (options.url === "/graphql") {
    if (defaults && defaults.mediaType.previews?.length) {
      mergedOptions.mediaType.previews = defaults.mediaType.previews.filter(
        (preview) => !mergedOptions.mediaType.previews.includes(preview)
      ).concat(mergedOptions.mediaType.previews);
    }
    mergedOptions.mediaType.previews = (mergedOptions.mediaType.previews || []).map((preview) => preview.replace(/-preview/, ""));
  }
  return mergedOptions;
}

// pkg/dist-src/util/add-query-parameters.js
function addQueryParameters(url, parameters) {
  const separator = /\?/.test(url) ? "&" : "?";
  const names = Object.keys(parameters);
  if (names.length === 0) {
    return url;
  }
  return url + separator + names.map((name) => {
    if (name === "q") {
      return "q=" + parameters.q.split("+").map(encodeURIComponent).join("+");
    }
    return `${name}=${encodeURIComponent(parameters[name])}`;
  }).join("&");
}

// pkg/dist-src/util/extract-url-variable-names.js
var urlVariableRegex = /\{[^}]+\}/g;
function removeNonChars(variableName) {
  return variableName.replace(/^\W+|\W+$/g, "").split(/,/);
}
function extractUrlVariableNames(url) {
  const matches = url.match(urlVariableRegex);
  if (!matches) {
    return [];
  }
  return matches.map(removeNonChars).reduce((a, b) => a.concat(b), []);
}

// pkg/dist-src/util/omit.js
function omit(object, keysToOmit) {
  return Object.keys(object).filter((option) => !keysToOmit.includes(option)).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
}

// pkg/dist-src/util/url-template.js
function encodeReserved(str) {
  return str.split(/(%[0-9A-Fa-f]{2})/g).map(function(part) {
    if (!/%[0-9A-Fa-f]/.test(part)) {
      part = encodeURI(part).replace(/%5B/g, "[").replace(/%5D/g, "]");
    }
    return part;
  }).join("");
}
function encodeUnreserved(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeValue(operator, value, key) {
  value = operator === "+" || operator === "#" ? encodeReserved(value) : encodeUnreserved(value);
  if (key) {
    return encodeUnreserved(key) + "=" + value;
  } else {
    return value;
  }
}
function isDefined(value) {
  return value !== void 0 && value !== null;
}
function isKeyOperator(operator) {
  return operator === ";" || operator === "&" || operator === "?";
}
function getValues(context, operator, key, modifier) {
  var value = context[key], result = [];
  if (isDefined(value) && value !== "") {
    if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      value = value.toString();
      if (modifier && modifier !== "*") {
        value = value.substring(0, parseInt(modifier, 10));
      }
      result.push(
        encodeValue(operator, value, isKeyOperator(operator) ? key : "")
      );
    } else {
      if (modifier === "*") {
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            result.push(
              encodeValue(operator, value2, isKeyOperator(operator) ? key : "")
            );
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              result.push(encodeValue(operator, value[k], k));
            }
          });
        }
      } else {
        const tmp = [];
        if (Array.isArray(value)) {
          value.filter(isDefined).forEach(function(value2) {
            tmp.push(encodeValue(operator, value2));
          });
        } else {
          Object.keys(value).forEach(function(k) {
            if (isDefined(value[k])) {
              tmp.push(encodeUnreserved(k));
              tmp.push(encodeValue(operator, value[k].toString()));
            }
          });
        }
        if (isKeyOperator(operator)) {
          result.push(encodeUnreserved(key) + "=" + tmp.join(","));
        } else if (tmp.length !== 0) {
          result.push(tmp.join(","));
        }
      }
    }
  } else {
    if (operator === ";") {
      if (isDefined(value)) {
        result.push(encodeUnreserved(key));
      }
    } else if (value === "" && (operator === "&" || operator === "?")) {
      result.push(encodeUnreserved(key) + "=");
    } else if (value === "") {
      result.push("");
    }
  }
  return result;
}
function parseUrl(template) {
  return {
    expand: expand.bind(null, template)
  };
}
function expand(template, context) {
  var operators = ["+", "#", ".", "/", ";", "?", "&"];
  return template.replace(
    /\{([^\{\}]+)\}|([^\{\}]+)/g,
    function(_, expression, literal) {
      if (expression) {
        let operator = "";
        const values = [];
        if (operators.indexOf(expression.charAt(0)) !== -1) {
          operator = expression.charAt(0);
          expression = expression.substr(1);
        }
        expression.split(/,/g).forEach(function(variable) {
          var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
          values.push(getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
        });
        if (operator && operator !== "+") {
          var separator = ",";
          if (operator === "?") {
            separator = "&";
          } else if (operator !== "#") {
            separator = operator;
          }
          return (values.length !== 0 ? operator : "") + values.join(separator);
        } else {
          return values.join(",");
        }
      } else {
        return encodeReserved(literal);
      }
    }
  );
}

// pkg/dist-src/parse.js
function parse(options) {
  let method = options.method.toUpperCase();
  let url = (options.url || "/").replace(/:([a-z]\w+)/g, "{$1}");
  let headers = Object.assign({}, options.headers);
  let body;
  let parameters = omit(options, [
    "method",
    "baseUrl",
    "url",
    "headers",
    "request",
    "mediaType"
  ]);
  const urlVariableNames = extractUrlVariableNames(url);
  url = parseUrl(url).expand(parameters);
  if (!/^http/.test(url)) {
    url = options.baseUrl + url;
  }
  const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat("baseUrl");
  const remainingParameters = omit(parameters, omittedParameters);
  const isBinaryRequest = /application\/octet-stream/i.test(headers.accept);
  if (!isBinaryRequest) {
    if (options.mediaType.format) {
      headers.accept = headers.accept.split(/,/).map(
        (format) => format.replace(
          /application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/,
          `application/vnd$1$2.${options.mediaType.format}`
        )
      ).join(",");
    }
    if (url.endsWith("/graphql")) {
      if (options.mediaType.previews?.length) {
        const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || [];
        headers.accept = previewsFromAcceptHeader.concat(options.mediaType.previews).map((preview) => {
          const format = options.mediaType.format ? `.${options.mediaType.format}` : "+json";
          return `application/vnd.github.${preview}-preview${format}`;
        }).join(",");
      }
    }
  }
  if (["GET", "HEAD"].includes(method)) {
    url = addQueryParameters(url, remainingParameters);
  } else {
    if ("data" in remainingParameters) {
      body = remainingParameters.data;
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters;
      }
    }
  }
  if (!headers["content-type"] && typeof body !== "undefined") {
    headers["content-type"] = "application/json; charset=utf-8";
  }
  if (["PATCH", "PUT"].includes(method) && typeof body === "undefined") {
    body = "";
  }
  return Object.assign(
    { method, url, headers },
    typeof body !== "undefined" ? { body } : null,
    options.request ? { request: options.request } : null
  );
}

// pkg/dist-src/endpoint-with-defaults.js
function endpointWithDefaults(defaults, route, options) {
  return parse(merge(defaults, route, options));
}

// pkg/dist-src/with-defaults.js
function withDefaults$2(oldDefaults, newDefaults) {
  const DEFAULTS2 = merge(oldDefaults, newDefaults);
  const endpoint2 = endpointWithDefaults.bind(null, DEFAULTS2);
  return Object.assign(endpoint2, {
    DEFAULTS: DEFAULTS2,
    defaults: withDefaults$2.bind(null, DEFAULTS2),
    merge: merge.bind(null, DEFAULTS2),
    parse
  });
}

// pkg/dist-src/index.js
var endpoint = withDefaults$2(null, DEFAULTS);

class Deprecation extends Error {
  constructor(message) {
    super(message); // Maintains proper stack trace (only available on V8)

    /* istanbul ignore next */

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    this.name = 'Deprecation';
  }

}

var once$2 = {exports: {}};

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
var wrappy_1 = wrappy$1;
function wrappy$1 (fn, cb) {
  if (fn && cb) return wrappy$1(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k];
  });

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    var ret = fn.apply(this, args);
    var cb = args[args.length-1];
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k];
      });
    }
    return ret
  }
}

var wrappy = wrappy_1;
once$2.exports = wrappy(once);
once$2.exports.strict = wrappy(onceStrict);

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  });

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  });
});

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  f.called = false;
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true;
    return f.value = fn.apply(this, arguments)
  };
  var name = fn.name || 'Function wrapped with `once`';
  f.onceError = name + " shouldn't be called more than once";
  f.called = false;
  return f
}

var onceExports = once$2.exports;
const once$1 = /*@__PURE__*/getDefaultExportFromCjs(onceExports);

// pkg/dist-src/index.js
var logOnceCode = once$1((deprecation) => console.warn(deprecation));
var logOnceHeaders = once$1((deprecation) => console.warn(deprecation));
var RequestError = class extends Error {
  constructor(message, statusCode, options) {
    super(message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
    this.name = "HttpError";
    this.status = statusCode;
    let headers;
    if ("headers" in options && typeof options.headers !== "undefined") {
      headers = options.headers;
    }
    if ("response" in options) {
      this.response = options.response;
      headers = options.response.headers;
    }
    const requestCopy = Object.assign({}, options.request);
    if (options.request.headers.authorization) {
      requestCopy.headers = Object.assign({}, options.request.headers, {
        authorization: options.request.headers.authorization.replace(
          / .*$/,
          " [REDACTED]"
        )
      });
    }
    requestCopy.url = requestCopy.url.replace(/\bclient_secret=\w+/g, "client_secret=[REDACTED]").replace(/\baccess_token=\w+/g, "access_token=[REDACTED]");
    this.request = requestCopy;
    Object.defineProperty(this, "code", {
      get() {
        logOnceCode(
          new Deprecation(
            "[@octokit/request-error] `error.code` is deprecated, use `error.status`."
          )
        );
        return statusCode;
      }
    });
    Object.defineProperty(this, "headers", {
      get() {
        logOnceHeaders(
          new Deprecation(
            "[@octokit/request-error] `error.headers` is deprecated, use `error.response.headers`."
          )
        );
        return headers || {};
      }
    });
  }
};

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$c = "8.1.1";

// pkg/dist-src/get-buffer-response.js
function getBufferResponse(response) {
  return response.arrayBuffer();
}

// pkg/dist-src/fetch-wrapper.js
function fetchWrapper(requestOptions) {
  const log = requestOptions.request && requestOptions.request.log ? requestOptions.request.log : console;
  const parseSuccessResponseBody = requestOptions.request?.parseSuccessResponseBody !== false;
  if (isPlainObject(requestOptions.body) || Array.isArray(requestOptions.body)) {
    requestOptions.body = JSON.stringify(requestOptions.body);
  }
  let headers = {};
  let status;
  let url;
  let { fetch } = globalThis;
  if (requestOptions.request?.fetch) {
    fetch = requestOptions.request.fetch;
  }
  if (!fetch) {
    throw new Error(
      "fetch is not set. Please pass a fetch implementation as new Octokit({ request: { fetch }}). Learn more at https://github.com/octokit/octokit.js/#fetch-missing"
    );
  }
  return fetch(requestOptions.url, {
    method: requestOptions.method,
    body: requestOptions.body,
    headers: requestOptions.headers,
    signal: requestOptions.request?.signal,
    // duplex must be set if request.body is ReadableStream or Async Iterables.
    // See https://fetch.spec.whatwg.org/#dom-requestinit-duplex.
    ...requestOptions.body && { duplex: "half" }
  }).then(async (response) => {
    url = response.url;
    status = response.status;
    for (const keyAndValue of response.headers) {
      headers[keyAndValue[0]] = keyAndValue[1];
    }
    if ("deprecation" in headers) {
      const matches = headers.link && headers.link.match(/<([^>]+)>; rel="deprecation"/);
      const deprecationLink = matches && matches.pop();
      log.warn(
        `[@octokit/request] "${requestOptions.method} ${requestOptions.url}" is deprecated. It is scheduled to be removed on ${headers.sunset}${deprecationLink ? `. See ${deprecationLink}` : ""}`
      );
    }
    if (status === 204 || status === 205) {
      return;
    }
    if (requestOptions.method === "HEAD") {
      if (status < 400) {
        return;
      }
      throw new RequestError(response.statusText, status, {
        response: {
          url,
          status,
          headers,
          data: void 0
        },
        request: requestOptions
      });
    }
    if (status === 304) {
      throw new RequestError("Not modified", status, {
        response: {
          url,
          status,
          headers,
          data: await getResponseData(response)
        },
        request: requestOptions
      });
    }
    if (status >= 400) {
      const data = await getResponseData(response);
      const error = new RequestError(toErrorMessage(data), status, {
        response: {
          url,
          status,
          headers,
          data
        },
        request: requestOptions
      });
      throw error;
    }
    return parseSuccessResponseBody ? await getResponseData(response) : response.body;
  }).then((data) => {
    return {
      status,
      url,
      headers,
      data
    };
  }).catch((error) => {
    if (error instanceof RequestError)
      throw error;
    else if (error.name === "AbortError")
      throw error;
    throw new RequestError(error.message, 500, {
      request: requestOptions
    });
  });
}
async function getResponseData(response) {
  const contentType = response.headers.get("content-type");
  if (/application\/json/.test(contentType)) {
    return response.json();
  }
  if (!contentType || /^text\/|charset=utf-8$/.test(contentType)) {
    return response.text();
  }
  return getBufferResponse(response);
}
function toErrorMessage(data) {
  if (typeof data === "string")
    return data;
  if ("message" in data) {
    if (Array.isArray(data.errors)) {
      return `${data.message}: ${data.errors.map(JSON.stringify).join(", ")}`;
    }
    return data.message;
  }
  return `Unknown error: ${JSON.stringify(data)}`;
}

// pkg/dist-src/with-defaults.js
function withDefaults$1(oldEndpoint, newDefaults) {
  const endpoint2 = oldEndpoint.defaults(newDefaults);
  const newApi = function(route, parameters) {
    const endpointOptions = endpoint2.merge(route, parameters);
    if (!endpointOptions.request || !endpointOptions.request.hook) {
      return fetchWrapper(endpoint2.parse(endpointOptions));
    }
    const request2 = (route2, parameters2) => {
      return fetchWrapper(
        endpoint2.parse(endpoint2.merge(route2, parameters2))
      );
    };
    Object.assign(request2, {
      endpoint: endpoint2,
      defaults: withDefaults$1.bind(null, endpoint2)
    });
    return endpointOptions.request.hook(request2, endpointOptions);
  };
  return Object.assign(newApi, {
    endpoint: endpoint2,
    defaults: withDefaults$1.bind(null, endpoint2)
  });
}

// pkg/dist-src/index.js
var request = withDefaults$1(endpoint, {
  headers: {
    "user-agent": `octokit-request.js/${VERSION$c} ${getUserAgent()}`
  }
});

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$b = "7.0.1";

// pkg/dist-src/error.js
function _buildMessageForResponseErrors(data) {
  return `Request failed due to following response errors:
` + data.errors.map((e) => ` - ${e.message}`).join("\n");
}
var GraphqlResponseError = class extends Error {
  constructor(request2, headers, response) {
    super(_buildMessageForResponseErrors(response));
    this.request = request2;
    this.headers = headers;
    this.response = response;
    this.name = "GraphqlResponseError";
    this.errors = response.errors;
    this.data = response.data;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// pkg/dist-src/graphql.js
var NON_VARIABLE_OPTIONS = [
  "method",
  "baseUrl",
  "url",
  "headers",
  "request",
  "query",
  "mediaType"
];
var FORBIDDEN_VARIABLE_OPTIONS = ["query", "method", "url"];
var GHES_V3_SUFFIX_REGEX = /\/api\/v3\/?$/;
function graphql(request2, query, options) {
  if (options) {
    if (typeof query === "string" && "query" in options) {
      return Promise.reject(
        new Error(`[@octokit/graphql] "query" cannot be used as variable name`)
      );
    }
    for (const key in options) {
      if (!FORBIDDEN_VARIABLE_OPTIONS.includes(key))
        continue;
      return Promise.reject(
        new Error(
          `[@octokit/graphql] "${key}" cannot be used as variable name`
        )
      );
    }
  }
  const parsedOptions = typeof query === "string" ? Object.assign({ query }, options) : query;
  const requestOptions = Object.keys(
    parsedOptions
  ).reduce((result, key) => {
    if (NON_VARIABLE_OPTIONS.includes(key)) {
      result[key] = parsedOptions[key];
      return result;
    }
    if (!result.variables) {
      result.variables = {};
    }
    result.variables[key] = parsedOptions[key];
    return result;
  }, {});
  const baseUrl = parsedOptions.baseUrl || request2.endpoint.DEFAULTS.baseUrl;
  if (GHES_V3_SUFFIX_REGEX.test(baseUrl)) {
    requestOptions.url = baseUrl.replace(GHES_V3_SUFFIX_REGEX, "/api/graphql");
  }
  return request2(requestOptions).then((response) => {
    if (response.data.errors) {
      const headers = {};
      for (const key of Object.keys(response.headers)) {
        headers[key] = response.headers[key];
      }
      throw new GraphqlResponseError(
        requestOptions,
        headers,
        response.data
      );
    }
    return response.data.data;
  });
}

// pkg/dist-src/with-defaults.js
function withDefaults(request2, newDefaults) {
  const newRequest = request2.defaults(newDefaults);
  const newApi = (query, options) => {
    return graphql(newRequest, query, options);
  };
  return Object.assign(newApi, {
    defaults: withDefaults.bind(null, newRequest),
    endpoint: newRequest.endpoint
  });
}

// pkg/dist-src/index.js
withDefaults(request, {
  headers: {
    "user-agent": `octokit-graphql.js/${VERSION$b} ${getUserAgent()}`
  },
  method: "POST",
  url: "/graphql"
});
function withCustomRequest(customRequest) {
  return withDefaults(customRequest, {
    method: "POST",
    url: "/graphql"
  });
}

// pkg/dist-src/auth.js
var REGEX_IS_INSTALLATION_LEGACY = /^v1\./;
var REGEX_IS_INSTALLATION = /^ghs_/;
var REGEX_IS_USER_TO_SERVER = /^ghu_/;
async function auth$4(token) {
  const isApp = token.split(/\./).length === 3;
  const isInstallation = REGEX_IS_INSTALLATION_LEGACY.test(token) || REGEX_IS_INSTALLATION.test(token);
  const isUserToServer = REGEX_IS_USER_TO_SERVER.test(token);
  const tokenType = isApp ? "app" : isInstallation ? "installation" : isUserToServer ? "user-to-server" : "oauth";
  return {
    type: "token",
    token,
    tokenType
  };
}

// pkg/dist-src/with-authorization-prefix.js
function withAuthorizationPrefix(token) {
  if (token.split(/\./).length === 3) {
    return `bearer ${token}`;
  }
  return `token ${token}`;
}

// pkg/dist-src/hook.js
async function hook$4(token, request, route, parameters) {
  const endpoint = request.endpoint.merge(
    route,
    parameters
  );
  endpoint.headers.authorization = withAuthorizationPrefix(token);
  return request(endpoint);
}

// pkg/dist-src/index.js
var createTokenAuth = function createTokenAuth2(token) {
  if (!token) {
    throw new Error("[@octokit/auth-token] No token passed to createTokenAuth");
  }
  if (typeof token !== "string") {
    throw new Error(
      "[@octokit/auth-token] Token passed to createTokenAuth is not a string"
    );
  }
  token = token.replace(/^(token|bearer) +/i, "");
  return Object.assign(auth$4.bind(null, token), {
    hook: hook$4.bind(null, token)
  });
};

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$a = "5.0.0";

// pkg/dist-src/index.js
var Octokit$1 = class Octokit {
  static {
    this.VERSION = VERSION$a;
  }
  static defaults(defaults) {
    const OctokitWithDefaults = class extends this {
      constructor(...args) {
        const options = args[0] || {};
        if (typeof defaults === "function") {
          super(defaults(options));
          return;
        }
        super(
          Object.assign(
            {},
            defaults,
            options,
            options.userAgent && defaults.userAgent ? {
              userAgent: `${options.userAgent} ${defaults.userAgent}`
            } : null
          )
        );
      }
    };
    return OctokitWithDefaults;
  }
  static {
    this.plugins = [];
  }
  /**
   * Attach a plugin (or many) to your Octokit instance.
   *
   * @example
   * const API = Octokit.plugin(plugin1, plugin2, plugin3, ...)
   */
  static plugin(...newPlugins) {
    const currentPlugins = this.plugins;
    const NewOctokit = class extends this {
      static {
        this.plugins = currentPlugins.concat(
          newPlugins.filter((plugin) => !currentPlugins.includes(plugin))
        );
      }
    };
    return NewOctokit;
  }
  constructor(options = {}) {
    const hook = new Collection();
    const requestDefaults = {
      baseUrl: request.endpoint.DEFAULTS.baseUrl,
      headers: {},
      request: Object.assign({}, options.request, {
        // @ts-ignore internal usage only, no need to type
        hook: hook.bind(null, "request")
      }),
      mediaType: {
        previews: [],
        format: ""
      }
    };
    requestDefaults.headers["user-agent"] = [
      options.userAgent,
      `octokit-core.js/${VERSION$a} ${getUserAgent()}`
    ].filter(Boolean).join(" ");
    if (options.baseUrl) {
      requestDefaults.baseUrl = options.baseUrl;
    }
    if (options.previews) {
      requestDefaults.mediaType.previews = options.previews;
    }
    if (options.timeZone) {
      requestDefaults.headers["time-zone"] = options.timeZone;
    }
    this.request = request.defaults(requestDefaults);
    this.graphql = withCustomRequest(this.request).defaults(requestDefaults);
    this.log = Object.assign(
      {
        debug: () => {
        },
        info: () => {
        },
        warn: console.warn.bind(console),
        error: console.error.bind(console)
      },
      options.log
    );
    this.hook = hook;
    if (!options.authStrategy) {
      if (!options.auth) {
        this.auth = async () => ({
          type: "unauthenticated"
        });
      } else {
        const auth = createTokenAuth(options.auth);
        hook.wrap("request", auth.hook);
        this.auth = auth;
      }
    } else {
      const { authStrategy, ...otherOptions } = options;
      const auth = authStrategy(
        Object.assign(
          {
            request: this.request,
            log: this.log,
            // we pass the current octokit instance as well as its constructor options
            // to allow for authentication strategies that return a new octokit instance
            // that shares the same internal state as the current one. The original
            // requirement for this was the "event-octokit" authentication strategy
            // of https://github.com/probot/octokit-auth-probot.
            octokit: this,
            octokitOptions: otherOptions
          },
          options.auth
        )
      );
      hook.wrap("request", auth.hook);
      this.auth = auth;
    }
    const classConstructor = this.constructor;
    classConstructor.plugins.forEach((plugin) => {
      Object.assign(this, plugin(this, options));
    });
  }
};

const distWeb$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  Octokit: Octokit$1
}, Symbol.toStringTag, { value: 'Module' }));

// pkg/dist-src/version.js
var VERSION$9 = "8.0.0";

// pkg/dist-src/normalize-paginated-list-response.js
function normalizePaginatedListResponse(response) {
  if (!response.data) {
    return {
      ...response,
      data: []
    };
  }
  const responseNeedsNormalization = "total_count" in response.data && !("url" in response.data);
  if (!responseNeedsNormalization)
    return response;
  const incompleteResults = response.data.incomplete_results;
  const repositorySelection = response.data.repository_selection;
  const totalCount = response.data.total_count;
  delete response.data.incomplete_results;
  delete response.data.repository_selection;
  delete response.data.total_count;
  const namespaceKey = Object.keys(response.data)[0];
  const data = response.data[namespaceKey];
  response.data = data;
  if (typeof incompleteResults !== "undefined") {
    response.data.incomplete_results = incompleteResults;
  }
  if (typeof repositorySelection !== "undefined") {
    response.data.repository_selection = repositorySelection;
  }
  response.data.total_count = totalCount;
  return response;
}

// pkg/dist-src/iterator.js
function iterator(octokit, route, parameters) {
  const options = typeof route === "function" ? route.endpoint(parameters) : octokit.request.endpoint(route, parameters);
  const requestMethod = typeof route === "function" ? route : octokit.request;
  const method = options.method;
  const headers = options.headers;
  let url = options.url;
  return {
    [Symbol.asyncIterator]: () => ({
      async next() {
        if (!url)
          return { done: true };
        try {
          const response = await requestMethod({ method, url, headers });
          const normalizedResponse = normalizePaginatedListResponse(response);
          url = ((normalizedResponse.headers.link || "").match(
            /<([^>]+)>;\s*rel="next"/
          ) || [])[1];
          return { value: normalizedResponse };
        } catch (error) {
          if (error.status !== 409)
            throw error;
          url = "";
          return {
            value: {
              status: 200,
              headers: {},
              data: []
            }
          };
        }
      }
    })
  };
}

// pkg/dist-src/paginate.js
function paginate(octokit, route, parameters, mapFn) {
  if (typeof parameters === "function") {
    mapFn = parameters;
    parameters = void 0;
  }
  return gather(
    octokit,
    [],
    iterator(octokit, route, parameters)[Symbol.asyncIterator](),
    mapFn
  );
}
function gather(octokit, results, iterator2, mapFn) {
  return iterator2.next().then((result) => {
    if (result.done) {
      return results;
    }
    let earlyExit = false;
    function done() {
      earlyExit = true;
    }
    results = results.concat(
      mapFn ? mapFn(result.value, done) : result.value.data
    );
    if (earlyExit) {
      return results;
    }
    return gather(octokit, results, iterator2, mapFn);
  });
}

// pkg/dist-src/compose-paginate.js
Object.assign(paginate, {
  iterator
});

// pkg/dist-src/index.js
function paginateRest(octokit) {
  return {
    paginate: Object.assign(paginate.bind(null, octokit), {
      iterator: iterator.bind(null, octokit)
    })
  };
}
paginateRest.VERSION = VERSION$9;

// pkg/dist-src/index.js

// pkg/dist-src/errors.js
var generateMessage = (path, cursorValue) => `The cursor at "${path.join(
  ","
)}" did not change its value "${cursorValue}" after a page transition. Please make sure your that your query is set up correctly.`;
var MissingCursorChange = class extends Error {
  constructor(pageInfo, cursorValue) {
    super(generateMessage(pageInfo.pathInQuery, cursorValue));
    this.pageInfo = pageInfo;
    this.cursorValue = cursorValue;
    this.name = "MissingCursorChangeError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};
var MissingPageInfo = class extends Error {
  constructor(response) {
    super(
      `No pageInfo property found in response. Please make sure to specify the pageInfo in your query. Response-Data: ${JSON.stringify(
        response,
        null,
        2
      )}`
    );
    this.response = response;
    this.name = "MissingPageInfo";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
};

// pkg/dist-src/object-helpers.js
var isObject = (value) => Object.prototype.toString.call(value) === "[object Object]";
function findPaginatedResourcePath(responseData) {
  const paginatedResourcePath = deepFindPathToProperty(
    responseData,
    "pageInfo"
  );
  if (paginatedResourcePath.length === 0) {
    throw new MissingPageInfo(responseData);
  }
  return paginatedResourcePath;
}
var deepFindPathToProperty = (object, searchProp, path = []) => {
  for (const key of Object.keys(object)) {
    const currentPath = [...path, key];
    const currentValue = object[key];
    if (currentValue.hasOwnProperty(searchProp)) {
      return currentPath;
    }
    if (isObject(currentValue)) {
      const result = deepFindPathToProperty(
        currentValue,
        searchProp,
        currentPath
      );
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
};
var get = (object, path) => {
  return path.reduce((current, nextProperty) => current[nextProperty], object);
};
var set = (object, path, mutator) => {
  const lastProperty = path[path.length - 1];
  const parentPath = [...path].slice(0, -1);
  const parent = get(object, parentPath);
  if (typeof mutator === "function") {
    parent[lastProperty] = mutator(parent[lastProperty]);
  } else {
    parent[lastProperty] = mutator;
  }
};

// pkg/dist-src/extract-page-info.js
var extractPageInfos = (responseData) => {
  const pageInfoPath = findPaginatedResourcePath(responseData);
  return {
    pathInQuery: pageInfoPath,
    pageInfo: get(responseData, [...pageInfoPath, "pageInfo"])
  };
};

// pkg/dist-src/page-info.js
var isForwardSearch = (givenPageInfo) => {
  return givenPageInfo.hasOwnProperty("hasNextPage");
};
var getCursorFrom = (pageInfo) => isForwardSearch(pageInfo) ? pageInfo.endCursor : pageInfo.startCursor;
var hasAnotherPage = (pageInfo) => isForwardSearch(pageInfo) ? pageInfo.hasNextPage : pageInfo.hasPreviousPage;

// pkg/dist-src/iterator.js
var createIterator = (octokit) => {
  return (query, initialParameters = {}) => {
    let nextPageExists = true;
    let parameters = { ...initialParameters };
    return {
      [Symbol.asyncIterator]: () => ({
        async next() {
          if (!nextPageExists)
            return { done: true, value: {} };
          const response = await octokit.graphql(
            query,
            parameters
          );
          const pageInfoContext = extractPageInfos(response);
          const nextCursorValue = getCursorFrom(pageInfoContext.pageInfo);
          nextPageExists = hasAnotherPage(pageInfoContext.pageInfo);
          if (nextPageExists && nextCursorValue === parameters.cursor) {
            throw new MissingCursorChange(pageInfoContext, nextCursorValue);
          }
          parameters = {
            ...parameters,
            cursor: nextCursorValue
          };
          return { done: false, value: response };
        }
      })
    };
  };
};

// pkg/dist-src/merge-responses.js
var mergeResponses = (response1, response2) => {
  if (Object.keys(response1).length === 0) {
    return Object.assign(response1, response2);
  }
  const path = findPaginatedResourcePath(response1);
  const nodesPath = [...path, "nodes"];
  const newNodes = get(response2, nodesPath);
  if (newNodes) {
    set(response1, nodesPath, (values) => {
      return [...values, ...newNodes];
    });
  }
  const edgesPath = [...path, "edges"];
  const newEdges = get(response2, edgesPath);
  if (newEdges) {
    set(response1, edgesPath, (values) => {
      return [...values, ...newEdges];
    });
  }
  const pageInfoPath = [...path, "pageInfo"];
  set(response1, pageInfoPath, get(response2, pageInfoPath));
  return response1;
};

// pkg/dist-src/paginate.js
var createPaginate = (octokit) => {
  const iterator = createIterator(octokit);
  return async (query, initialParameters = {}) => {
    let mergedResponse = {};
    for await (const response of iterator(
      query,
      initialParameters
    )) {
      mergedResponse = mergeResponses(mergedResponse, response);
    }
    return mergedResponse;
  };
};

// pkg/dist-src/index.js
function paginateGraphql(octokit) {
  octokit.graphql;
  return {
    graphql: Object.assign(octokit.graphql, {
      paginate: Object.assign(createPaginate(octokit), {
        iterator: createIterator(octokit)
      })
    })
  };
}

// pkg/dist-src/version.js
var VERSION$8 = "9.0.0";

// pkg/dist-src/generated/endpoints.js
var Endpoints = {
  actions: {
    addCustomLabelsToSelfHostedRunnerForOrg: [
      "POST /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    addCustomLabelsToSelfHostedRunnerForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    addSelectedRepoToRequiredWorkflow: [
      "PUT /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories/{repository_id}"
    ],
    approveWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve"
    ],
    cancelWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel"
    ],
    createEnvironmentVariable: [
      "POST /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    createOrUpdateEnvironmentSecret: [
      "PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    createOrUpdateOrgSecret: ["PUT /orgs/{org}/actions/secrets/{secret_name}"],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    createOrgVariable: ["POST /orgs/{org}/actions/variables"],
    createRegistrationTokenForOrg: [
      "POST /orgs/{org}/actions/runners/registration-token"
    ],
    createRegistrationTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/registration-token"
    ],
    createRemoveTokenForOrg: ["POST /orgs/{org}/actions/runners/remove-token"],
    createRemoveTokenForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/remove-token"
    ],
    createRepoVariable: ["POST /repos/{owner}/{repo}/actions/variables"],
    createRequiredWorkflow: ["POST /orgs/{org}/actions/required_workflows"],
    createWorkflowDispatch: [
      "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches"
    ],
    deleteActionsCacheById: [
      "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}"
    ],
    deleteActionsCacheByKey: [
      "DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}"
    ],
    deleteArtifact: [
      "DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"
    ],
    deleteEnvironmentSecret: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    deleteEnvironmentVariable: [
      "DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/actions/secrets/{secret_name}"],
    deleteOrgVariable: ["DELETE /orgs/{org}/actions/variables/{name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}"
    ],
    deleteRepoVariable: [
      "DELETE /repos/{owner}/{repo}/actions/variables/{name}"
    ],
    deleteRequiredWorkflow: [
      "DELETE /orgs/{org}/actions/required_workflows/{required_workflow_id}"
    ],
    deleteSelfHostedRunnerFromOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}"
    ],
    deleteSelfHostedRunnerFromRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    deleteWorkflowRun: ["DELETE /repos/{owner}/{repo}/actions/runs/{run_id}"],
    deleteWorkflowRunLogs: [
      "DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    disableSelectedRepositoryGithubActionsOrganization: [
      "DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    disableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable"
    ],
    downloadArtifact: [
      "GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}"
    ],
    downloadJobLogsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs"
    ],
    downloadWorkflowRunAttemptLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs"
    ],
    downloadWorkflowRunLogs: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs"
    ],
    enableSelectedRepositoryGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories/{repository_id}"
    ],
    enableWorkflow: [
      "PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable"
    ],
    generateRunnerJitconfigForOrg: [
      "POST /orgs/{org}/actions/runners/generate-jitconfig"
    ],
    generateRunnerJitconfigForRepo: [
      "POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig"
    ],
    getActionsCacheList: ["GET /repos/{owner}/{repo}/actions/caches"],
    getActionsCacheUsage: ["GET /repos/{owner}/{repo}/actions/cache/usage"],
    getActionsCacheUsageByRepoForOrg: [
      "GET /orgs/{org}/actions/cache/usage-by-repository"
    ],
    getActionsCacheUsageForOrg: ["GET /orgs/{org}/actions/cache/usage"],
    getAllowedActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/selected-actions"
    ],
    getAllowedActionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    getArtifact: ["GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}"],
    getEnvironmentPublicKey: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key"
    ],
    getEnvironmentSecret: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}"
    ],
    getEnvironmentVariable: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    getGithubActionsDefaultWorkflowPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions/workflow"
    ],
    getGithubActionsDefaultWorkflowPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    getGithubActionsPermissionsOrganization: [
      "GET /orgs/{org}/actions/permissions"
    ],
    getGithubActionsPermissionsRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions"
    ],
    getJobForWorkflowRun: ["GET /repos/{owner}/{repo}/actions/jobs/{job_id}"],
    getOrgPublicKey: ["GET /orgs/{org}/actions/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/actions/secrets/{secret_name}"],
    getOrgVariable: ["GET /orgs/{org}/actions/variables/{name}"],
    getPendingDeploymentsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    getRepoPermissions: [
      "GET /repos/{owner}/{repo}/actions/permissions",
      {},
      { renamed: ["actions", "getGithubActionsPermissionsRepository"] }
    ],
    getRepoPublicKey: ["GET /repos/{owner}/{repo}/actions/secrets/public-key"],
    getRepoRequiredWorkflow: [
      "GET /repos/{org}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}"
    ],
    getRepoRequiredWorkflowUsage: [
      "GET /repos/{org}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}/timing"
    ],
    getRepoSecret: ["GET /repos/{owner}/{repo}/actions/secrets/{secret_name}"],
    getRepoVariable: ["GET /repos/{owner}/{repo}/actions/variables/{name}"],
    getRequiredWorkflow: [
      "GET /orgs/{org}/actions/required_workflows/{required_workflow_id}"
    ],
    getReviewsForRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals"
    ],
    getSelfHostedRunnerForOrg: ["GET /orgs/{org}/actions/runners/{runner_id}"],
    getSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}"
    ],
    getWorkflow: ["GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}"],
    getWorkflowAccessToRepository: [
      "GET /repos/{owner}/{repo}/actions/permissions/access"
    ],
    getWorkflowRun: ["GET /repos/{owner}/{repo}/actions/runs/{run_id}"],
    getWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}"
    ],
    getWorkflowRunUsage: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing"
    ],
    getWorkflowUsage: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing"
    ],
    listArtifactsForRepo: ["GET /repos/{owner}/{repo}/actions/artifacts"],
    listEnvironmentSecrets: [
      "GET /repositories/{repository_id}/environments/{environment_name}/secrets"
    ],
    listEnvironmentVariables: [
      "GET /repositories/{repository_id}/environments/{environment_name}/variables"
    ],
    listJobsForWorkflowRun: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs"
    ],
    listJobsForWorkflowRunAttempt: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs"
    ],
    listLabelsForSelfHostedRunnerForOrg: [
      "GET /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    listLabelsForSelfHostedRunnerForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    listOrgSecrets: ["GET /orgs/{org}/actions/secrets"],
    listOrgVariables: ["GET /orgs/{org}/actions/variables"],
    listRepoOrganizationSecrets: [
      "GET /repos/{owner}/{repo}/actions/organization-secrets"
    ],
    listRepoOrganizationVariables: [
      "GET /repos/{owner}/{repo}/actions/organization-variables"
    ],
    listRepoRequiredWorkflows: [
      "GET /repos/{org}/{repo}/actions/required_workflows"
    ],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/actions/secrets"],
    listRepoVariables: ["GET /repos/{owner}/{repo}/actions/variables"],
    listRepoWorkflows: ["GET /repos/{owner}/{repo}/actions/workflows"],
    listRequiredWorkflowRuns: [
      "GET /repos/{owner}/{repo}/actions/required_workflows/{required_workflow_id_for_repo}/runs"
    ],
    listRequiredWorkflows: ["GET /orgs/{org}/actions/required_workflows"],
    listRunnerApplicationsForOrg: ["GET /orgs/{org}/actions/runners/downloads"],
    listRunnerApplicationsForRepo: [
      "GET /repos/{owner}/{repo}/actions/runners/downloads"
    ],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    listSelectedReposForOrgVariable: [
      "GET /orgs/{org}/actions/variables/{name}/repositories"
    ],
    listSelectedRepositoriesEnabledGithubActionsOrganization: [
      "GET /orgs/{org}/actions/permissions/repositories"
    ],
    listSelectedRepositoriesRequiredWorkflow: [
      "GET /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories"
    ],
    listSelfHostedRunnersForOrg: ["GET /orgs/{org}/actions/runners"],
    listSelfHostedRunnersForRepo: ["GET /repos/{owner}/{repo}/actions/runners"],
    listWorkflowRunArtifacts: [
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts"
    ],
    listWorkflowRuns: [
      "GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs"
    ],
    listWorkflowRunsForRepo: ["GET /repos/{owner}/{repo}/actions/runs"],
    reRunJobForWorkflowRun: [
      "POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun"
    ],
    reRunWorkflow: ["POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun"],
    reRunWorkflowFailedJobs: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    removeAllCustomLabelsFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    removeCustomLabelFromSelfHostedRunnerForOrg: [
      "DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeCustomLabelFromSelfHostedRunnerForRepo: [
      "DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgVariable: [
      "DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromRequiredWorkflow: [
      "DELETE /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories/{repository_id}"
    ],
    reviewCustomGatesForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule"
    ],
    reviewPendingDeploymentsForRun: [
      "POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments"
    ],
    setAllowedActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/selected-actions"
    ],
    setAllowedActionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/selected-actions"
    ],
    setCustomLabelsForSelfHostedRunnerForOrg: [
      "PUT /orgs/{org}/actions/runners/{runner_id}/labels"
    ],
    setCustomLabelsForSelfHostedRunnerForRepo: [
      "PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels"
    ],
    setGithubActionsDefaultWorkflowPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/workflow"
    ],
    setGithubActionsDefaultWorkflowPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/workflow"
    ],
    setGithubActionsPermissionsOrganization: [
      "PUT /orgs/{org}/actions/permissions"
    ],
    setGithubActionsPermissionsRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/actions/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgVariable: [
      "PUT /orgs/{org}/actions/variables/{name}/repositories"
    ],
    setSelectedReposToRequiredWorkflow: [
      "PUT /orgs/{org}/actions/required_workflows/{required_workflow_id}/repositories"
    ],
    setSelectedRepositoriesEnabledGithubActionsOrganization: [
      "PUT /orgs/{org}/actions/permissions/repositories"
    ],
    setWorkflowAccessToRepository: [
      "PUT /repos/{owner}/{repo}/actions/permissions/access"
    ],
    updateEnvironmentVariable: [
      "PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}"
    ],
    updateOrgVariable: ["PATCH /orgs/{org}/actions/variables/{name}"],
    updateRepoVariable: [
      "PATCH /repos/{owner}/{repo}/actions/variables/{name}"
    ],
    updateRequiredWorkflow: [
      "PATCH /orgs/{org}/actions/required_workflows/{required_workflow_id}"
    ]
  },
  activity: {
    checkRepoIsStarredByAuthenticatedUser: ["GET /user/starred/{owner}/{repo}"],
    deleteRepoSubscription: ["DELETE /repos/{owner}/{repo}/subscription"],
    deleteThreadSubscription: [
      "DELETE /notifications/threads/{thread_id}/subscription"
    ],
    getFeeds: ["GET /feeds"],
    getRepoSubscription: ["GET /repos/{owner}/{repo}/subscription"],
    getThread: ["GET /notifications/threads/{thread_id}"],
    getThreadSubscriptionForAuthenticatedUser: [
      "GET /notifications/threads/{thread_id}/subscription"
    ],
    listEventsForAuthenticatedUser: ["GET /users/{username}/events"],
    listNotificationsForAuthenticatedUser: ["GET /notifications"],
    listOrgEventsForAuthenticatedUser: [
      "GET /users/{username}/events/orgs/{org}"
    ],
    listPublicEvents: ["GET /events"],
    listPublicEventsForRepoNetwork: ["GET /networks/{owner}/{repo}/events"],
    listPublicEventsForUser: ["GET /users/{username}/events/public"],
    listPublicOrgEvents: ["GET /orgs/{org}/events"],
    listReceivedEventsForUser: ["GET /users/{username}/received_events"],
    listReceivedPublicEventsForUser: [
      "GET /users/{username}/received_events/public"
    ],
    listRepoEvents: ["GET /repos/{owner}/{repo}/events"],
    listRepoNotificationsForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/notifications"
    ],
    listReposStarredByAuthenticatedUser: ["GET /user/starred"],
    listReposStarredByUser: ["GET /users/{username}/starred"],
    listReposWatchedByUser: ["GET /users/{username}/subscriptions"],
    listStargazersForRepo: ["GET /repos/{owner}/{repo}/stargazers"],
    listWatchedReposForAuthenticatedUser: ["GET /user/subscriptions"],
    listWatchersForRepo: ["GET /repos/{owner}/{repo}/subscribers"],
    markNotificationsAsRead: ["PUT /notifications"],
    markRepoNotificationsAsRead: ["PUT /repos/{owner}/{repo}/notifications"],
    markThreadAsRead: ["PATCH /notifications/threads/{thread_id}"],
    setRepoSubscription: ["PUT /repos/{owner}/{repo}/subscription"],
    setThreadSubscription: [
      "PUT /notifications/threads/{thread_id}/subscription"
    ],
    starRepoForAuthenticatedUser: ["PUT /user/starred/{owner}/{repo}"],
    unstarRepoForAuthenticatedUser: ["DELETE /user/starred/{owner}/{repo}"]
  },
  apps: {
    addRepoToInstallation: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "addRepoToInstallationForAuthenticatedUser"] }
    ],
    addRepoToInstallationForAuthenticatedUser: [
      "PUT /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    checkToken: ["POST /applications/{client_id}/token"],
    createFromManifest: ["POST /app-manifests/{code}/conversions"],
    createInstallationAccessToken: [
      "POST /app/installations/{installation_id}/access_tokens"
    ],
    deleteAuthorization: ["DELETE /applications/{client_id}/grant"],
    deleteInstallation: ["DELETE /app/installations/{installation_id}"],
    deleteToken: ["DELETE /applications/{client_id}/token"],
    getAuthenticated: ["GET /app"],
    getBySlug: ["GET /apps/{app_slug}"],
    getInstallation: ["GET /app/installations/{installation_id}"],
    getOrgInstallation: ["GET /orgs/{org}/installation"],
    getRepoInstallation: ["GET /repos/{owner}/{repo}/installation"],
    getSubscriptionPlanForAccount: [
      "GET /marketplace_listing/accounts/{account_id}"
    ],
    getSubscriptionPlanForAccountStubbed: [
      "GET /marketplace_listing/stubbed/accounts/{account_id}"
    ],
    getUserInstallation: ["GET /users/{username}/installation"],
    getWebhookConfigForApp: ["GET /app/hook/config"],
    getWebhookDelivery: ["GET /app/hook/deliveries/{delivery_id}"],
    listAccountsForPlan: ["GET /marketplace_listing/plans/{plan_id}/accounts"],
    listAccountsForPlanStubbed: [
      "GET /marketplace_listing/stubbed/plans/{plan_id}/accounts"
    ],
    listInstallationReposForAuthenticatedUser: [
      "GET /user/installations/{installation_id}/repositories"
    ],
    listInstallationRequestsForAuthenticatedApp: [
      "GET /app/installation-requests"
    ],
    listInstallations: ["GET /app/installations"],
    listInstallationsForAuthenticatedUser: ["GET /user/installations"],
    listPlans: ["GET /marketplace_listing/plans"],
    listPlansStubbed: ["GET /marketplace_listing/stubbed/plans"],
    listReposAccessibleToInstallation: ["GET /installation/repositories"],
    listSubscriptionsForAuthenticatedUser: ["GET /user/marketplace_purchases"],
    listSubscriptionsForAuthenticatedUserStubbed: [
      "GET /user/marketplace_purchases/stubbed"
    ],
    listWebhookDeliveries: ["GET /app/hook/deliveries"],
    redeliverWebhookDelivery: [
      "POST /app/hook/deliveries/{delivery_id}/attempts"
    ],
    removeRepoFromInstallation: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}",
      {},
      { renamed: ["apps", "removeRepoFromInstallationForAuthenticatedUser"] }
    ],
    removeRepoFromInstallationForAuthenticatedUser: [
      "DELETE /user/installations/{installation_id}/repositories/{repository_id}"
    ],
    resetToken: ["PATCH /applications/{client_id}/token"],
    revokeInstallationAccessToken: ["DELETE /installation/token"],
    scopeToken: ["POST /applications/{client_id}/token/scoped"],
    suspendInstallation: ["PUT /app/installations/{installation_id}/suspended"],
    unsuspendInstallation: [
      "DELETE /app/installations/{installation_id}/suspended"
    ],
    updateWebhookConfigForApp: ["PATCH /app/hook/config"]
  },
  billing: {
    getGithubActionsBillingOrg: ["GET /orgs/{org}/settings/billing/actions"],
    getGithubActionsBillingUser: [
      "GET /users/{username}/settings/billing/actions"
    ],
    getGithubPackagesBillingOrg: ["GET /orgs/{org}/settings/billing/packages"],
    getGithubPackagesBillingUser: [
      "GET /users/{username}/settings/billing/packages"
    ],
    getSharedStorageBillingOrg: [
      "GET /orgs/{org}/settings/billing/shared-storage"
    ],
    getSharedStorageBillingUser: [
      "GET /users/{username}/settings/billing/shared-storage"
    ]
  },
  checks: {
    create: ["POST /repos/{owner}/{repo}/check-runs"],
    createSuite: ["POST /repos/{owner}/{repo}/check-suites"],
    get: ["GET /repos/{owner}/{repo}/check-runs/{check_run_id}"],
    getSuite: ["GET /repos/{owner}/{repo}/check-suites/{check_suite_id}"],
    listAnnotations: [
      "GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations"
    ],
    listForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-runs"],
    listForSuite: [
      "GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs"
    ],
    listSuitesForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/check-suites"],
    rerequestRun: [
      "POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest"
    ],
    rerequestSuite: [
      "POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest"
    ],
    setSuitesPreferences: [
      "PATCH /repos/{owner}/{repo}/check-suites/preferences"
    ],
    update: ["PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}"]
  },
  codeScanning: {
    deleteAnalysis: [
      "DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}"
    ],
    getAlert: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}",
      {},
      { renamedParameters: { alert_id: "alert_number" } }
    ],
    getAnalysis: [
      "GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}"
    ],
    getCodeqlDatabase: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}"
    ],
    getDefaultSetup: ["GET /repos/{owner}/{repo}/code-scanning/default-setup"],
    getSarif: ["GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}"],
    listAlertInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/code-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/code-scanning/alerts"],
    listAlertsInstances: [
      "GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances",
      {},
      { renamed: ["codeScanning", "listAlertInstances"] }
    ],
    listCodeqlDatabases: [
      "GET /repos/{owner}/{repo}/code-scanning/codeql/databases"
    ],
    listRecentAnalyses: ["GET /repos/{owner}/{repo}/code-scanning/analyses"],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}"
    ],
    updateDefaultSetup: [
      "PATCH /repos/{owner}/{repo}/code-scanning/default-setup"
    ],
    uploadSarif: ["POST /repos/{owner}/{repo}/code-scanning/sarifs"]
  },
  codesOfConduct: {
    getAllCodesOfConduct: ["GET /codes_of_conduct"],
    getConductCode: ["GET /codes_of_conduct/{key}"]
  },
  codespaces: {
    addRepositoryForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    codespaceMachinesForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/machines"
    ],
    createForAuthenticatedUser: ["POST /user/codespaces"],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    createOrUpdateSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}"
    ],
    createWithPrForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces"
    ],
    createWithRepoForAuthenticatedUser: [
      "POST /repos/{owner}/{repo}/codespaces"
    ],
    deleteCodespacesBillingUsers: [
      "DELETE /orgs/{org}/codespaces/billing/selected_users"
    ],
    deleteForAuthenticatedUser: ["DELETE /user/codespaces/{codespace_name}"],
    deleteFromOrganization: [
      "DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/codespaces/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    deleteSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}"
    ],
    exportForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/exports"
    ],
    getCodespacesForUserInOrg: [
      "GET /orgs/{org}/members/{username}/codespaces"
    ],
    getExportDetailsForAuthenticatedUser: [
      "GET /user/codespaces/{codespace_name}/exports/{export_id}"
    ],
    getForAuthenticatedUser: ["GET /user/codespaces/{codespace_name}"],
    getOrgPublicKey: ["GET /orgs/{org}/codespaces/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/codespaces/secrets/{secret_name}"],
    getPublicKeyForAuthenticatedUser: [
      "GET /user/codespaces/secrets/public-key"
    ],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}"
    ],
    getSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}"
    ],
    listDevcontainersInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/devcontainers"
    ],
    listForAuthenticatedUser: ["GET /user/codespaces"],
    listInOrganization: [
      "GET /orgs/{org}/codespaces",
      {},
      { renamedParameters: { org_id: "org" } }
    ],
    listInRepositoryForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces"
    ],
    listOrgSecrets: ["GET /orgs/{org}/codespaces/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/codespaces/secrets"],
    listRepositoriesForSecretForAuthenticatedUser: [
      "GET /user/codespaces/secrets/{secret_name}/repositories"
    ],
    listSecretsForAuthenticatedUser: ["GET /user/codespaces/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    preFlightWithRepoForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/new"
    ],
    publishForAuthenticatedUser: [
      "POST /user/codespaces/{codespace_name}/publish"
    ],
    removeRepositoryForSecretForAuthenticatedUser: [
      "DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}"
    ],
    repoMachinesForAuthenticatedUser: [
      "GET /repos/{owner}/{repo}/codespaces/machines"
    ],
    setCodespacesBilling: ["PUT /orgs/{org}/codespaces/billing"],
    setCodespacesBillingUsers: [
      "POST /orgs/{org}/codespaces/billing/selected_users"
    ],
    setRepositoriesForSecretForAuthenticatedUser: [
      "PUT /user/codespaces/secrets/{secret_name}/repositories"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories"
    ],
    startForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/start"],
    stopForAuthenticatedUser: ["POST /user/codespaces/{codespace_name}/stop"],
    stopInOrganization: [
      "POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop"
    ],
    updateForAuthenticatedUser: ["PATCH /user/codespaces/{codespace_name}"]
  },
  dependabot: {
    addSelectedRepoToOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    createOrUpdateOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}"
    ],
    createOrUpdateRepoSecret: [
      "PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    deleteOrgSecret: ["DELETE /orgs/{org}/dependabot/secrets/{secret_name}"],
    deleteRepoSecret: [
      "DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    getAlert: ["GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"],
    getOrgPublicKey: ["GET /orgs/{org}/dependabot/secrets/public-key"],
    getOrgSecret: ["GET /orgs/{org}/dependabot/secrets/{secret_name}"],
    getRepoPublicKey: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/public-key"
    ],
    getRepoSecret: [
      "GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/dependabot/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/dependabot/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/dependabot/alerts"],
    listOrgSecrets: ["GET /orgs/{org}/dependabot/secrets"],
    listRepoSecrets: ["GET /repos/{owner}/{repo}/dependabot/secrets"],
    listSelectedReposForOrgSecret: [
      "GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    removeSelectedRepoFromOrgSecret: [
      "DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}"
    ],
    setSelectedReposForOrgSecret: [
      "PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}"
    ]
  },
  dependencyGraph: {
    createRepositorySnapshot: [
      "POST /repos/{owner}/{repo}/dependency-graph/snapshots"
    ],
    diffRange: [
      "GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}"
    ],
    exportSbom: ["GET /repos/{owner}/{repo}/dependency-graph/sbom"]
  },
  emojis: { get: ["GET /emojis"] },
  gists: {
    checkIsStarred: ["GET /gists/{gist_id}/star"],
    create: ["POST /gists"],
    createComment: ["POST /gists/{gist_id}/comments"],
    delete: ["DELETE /gists/{gist_id}"],
    deleteComment: ["DELETE /gists/{gist_id}/comments/{comment_id}"],
    fork: ["POST /gists/{gist_id}/forks"],
    get: ["GET /gists/{gist_id}"],
    getComment: ["GET /gists/{gist_id}/comments/{comment_id}"],
    getRevision: ["GET /gists/{gist_id}/{sha}"],
    list: ["GET /gists"],
    listComments: ["GET /gists/{gist_id}/comments"],
    listCommits: ["GET /gists/{gist_id}/commits"],
    listForUser: ["GET /users/{username}/gists"],
    listForks: ["GET /gists/{gist_id}/forks"],
    listPublic: ["GET /gists/public"],
    listStarred: ["GET /gists/starred"],
    star: ["PUT /gists/{gist_id}/star"],
    unstar: ["DELETE /gists/{gist_id}/star"],
    update: ["PATCH /gists/{gist_id}"],
    updateComment: ["PATCH /gists/{gist_id}/comments/{comment_id}"]
  },
  git: {
    createBlob: ["POST /repos/{owner}/{repo}/git/blobs"],
    createCommit: ["POST /repos/{owner}/{repo}/git/commits"],
    createRef: ["POST /repos/{owner}/{repo}/git/refs"],
    createTag: ["POST /repos/{owner}/{repo}/git/tags"],
    createTree: ["POST /repos/{owner}/{repo}/git/trees"],
    deleteRef: ["DELETE /repos/{owner}/{repo}/git/refs/{ref}"],
    getBlob: ["GET /repos/{owner}/{repo}/git/blobs/{file_sha}"],
    getCommit: ["GET /repos/{owner}/{repo}/git/commits/{commit_sha}"],
    getRef: ["GET /repos/{owner}/{repo}/git/ref/{ref}"],
    getTag: ["GET /repos/{owner}/{repo}/git/tags/{tag_sha}"],
    getTree: ["GET /repos/{owner}/{repo}/git/trees/{tree_sha}"],
    listMatchingRefs: ["GET /repos/{owner}/{repo}/git/matching-refs/{ref}"],
    updateRef: ["PATCH /repos/{owner}/{repo}/git/refs/{ref}"]
  },
  gitignore: {
    getAllTemplates: ["GET /gitignore/templates"],
    getTemplate: ["GET /gitignore/templates/{name}"]
  },
  interactions: {
    getRestrictionsForAuthenticatedUser: ["GET /user/interaction-limits"],
    getRestrictionsForOrg: ["GET /orgs/{org}/interaction-limits"],
    getRestrictionsForRepo: ["GET /repos/{owner}/{repo}/interaction-limits"],
    getRestrictionsForYourPublicRepos: [
      "GET /user/interaction-limits",
      {},
      { renamed: ["interactions", "getRestrictionsForAuthenticatedUser"] }
    ],
    removeRestrictionsForAuthenticatedUser: ["DELETE /user/interaction-limits"],
    removeRestrictionsForOrg: ["DELETE /orgs/{org}/interaction-limits"],
    removeRestrictionsForRepo: [
      "DELETE /repos/{owner}/{repo}/interaction-limits"
    ],
    removeRestrictionsForYourPublicRepos: [
      "DELETE /user/interaction-limits",
      {},
      { renamed: ["interactions", "removeRestrictionsForAuthenticatedUser"] }
    ],
    setRestrictionsForAuthenticatedUser: ["PUT /user/interaction-limits"],
    setRestrictionsForOrg: ["PUT /orgs/{org}/interaction-limits"],
    setRestrictionsForRepo: ["PUT /repos/{owner}/{repo}/interaction-limits"],
    setRestrictionsForYourPublicRepos: [
      "PUT /user/interaction-limits",
      {},
      { renamed: ["interactions", "setRestrictionsForAuthenticatedUser"] }
    ]
  },
  issues: {
    addAssignees: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    addLabels: ["POST /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    checkUserCanBeAssigned: ["GET /repos/{owner}/{repo}/assignees/{assignee}"],
    checkUserCanBeAssignedToIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}"
    ],
    create: ["POST /repos/{owner}/{repo}/issues"],
    createComment: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/comments"
    ],
    createLabel: ["POST /repos/{owner}/{repo}/labels"],
    createMilestone: ["POST /repos/{owner}/{repo}/milestones"],
    deleteComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}"
    ],
    deleteLabel: ["DELETE /repos/{owner}/{repo}/labels/{name}"],
    deleteMilestone: [
      "DELETE /repos/{owner}/{repo}/milestones/{milestone_number}"
    ],
    get: ["GET /repos/{owner}/{repo}/issues/{issue_number}"],
    getComment: ["GET /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    getEvent: ["GET /repos/{owner}/{repo}/issues/events/{event_id}"],
    getLabel: ["GET /repos/{owner}/{repo}/labels/{name}"],
    getMilestone: ["GET /repos/{owner}/{repo}/milestones/{milestone_number}"],
    list: ["GET /issues"],
    listAssignees: ["GET /repos/{owner}/{repo}/assignees"],
    listComments: ["GET /repos/{owner}/{repo}/issues/{issue_number}/comments"],
    listCommentsForRepo: ["GET /repos/{owner}/{repo}/issues/comments"],
    listEvents: ["GET /repos/{owner}/{repo}/issues/{issue_number}/events"],
    listEventsForRepo: ["GET /repos/{owner}/{repo}/issues/events"],
    listEventsForTimeline: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline"
    ],
    listForAuthenticatedUser: ["GET /user/issues"],
    listForOrg: ["GET /orgs/{org}/issues"],
    listForRepo: ["GET /repos/{owner}/{repo}/issues"],
    listLabelsForMilestone: [
      "GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels"
    ],
    listLabelsForRepo: ["GET /repos/{owner}/{repo}/labels"],
    listLabelsOnIssue: [
      "GET /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    listMilestones: ["GET /repos/{owner}/{repo}/milestones"],
    lock: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    removeAllLabels: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels"
    ],
    removeAssignees: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees"
    ],
    removeLabel: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}"
    ],
    setLabels: ["PUT /repos/{owner}/{repo}/issues/{issue_number}/labels"],
    unlock: ["DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock"],
    update: ["PATCH /repos/{owner}/{repo}/issues/{issue_number}"],
    updateComment: ["PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}"],
    updateLabel: ["PATCH /repos/{owner}/{repo}/labels/{name}"],
    updateMilestone: [
      "PATCH /repos/{owner}/{repo}/milestones/{milestone_number}"
    ]
  },
  licenses: {
    get: ["GET /licenses/{license}"],
    getAllCommonlyUsed: ["GET /licenses"],
    getForRepo: ["GET /repos/{owner}/{repo}/license"]
  },
  markdown: {
    render: ["POST /markdown"],
    renderRaw: [
      "POST /markdown/raw",
      { headers: { "content-type": "text/plain; charset=utf-8" } }
    ]
  },
  meta: {
    get: ["GET /meta"],
    getAllVersions: ["GET /versions"],
    getOctocat: ["GET /octocat"],
    getZen: ["GET /zen"],
    root: ["GET /"]
  },
  migrations: {
    cancelImport: ["DELETE /repos/{owner}/{repo}/import"],
    deleteArchiveForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/archive"
    ],
    deleteArchiveForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/archive"
    ],
    downloadArchiveForOrg: [
      "GET /orgs/{org}/migrations/{migration_id}/archive"
    ],
    getArchiveForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/archive"
    ],
    getCommitAuthors: ["GET /repos/{owner}/{repo}/import/authors"],
    getImportStatus: ["GET /repos/{owner}/{repo}/import"],
    getLargeFiles: ["GET /repos/{owner}/{repo}/import/large_files"],
    getStatusForAuthenticatedUser: ["GET /user/migrations/{migration_id}"],
    getStatusForOrg: ["GET /orgs/{org}/migrations/{migration_id}"],
    listForAuthenticatedUser: ["GET /user/migrations"],
    listForOrg: ["GET /orgs/{org}/migrations"],
    listReposForAuthenticatedUser: [
      "GET /user/migrations/{migration_id}/repositories"
    ],
    listReposForOrg: ["GET /orgs/{org}/migrations/{migration_id}/repositories"],
    listReposForUser: [
      "GET /user/migrations/{migration_id}/repositories",
      {},
      { renamed: ["migrations", "listReposForAuthenticatedUser"] }
    ],
    mapCommitAuthor: ["PATCH /repos/{owner}/{repo}/import/authors/{author_id}"],
    setLfsPreference: ["PATCH /repos/{owner}/{repo}/import/lfs"],
    startForAuthenticatedUser: ["POST /user/migrations"],
    startForOrg: ["POST /orgs/{org}/migrations"],
    startImport: ["PUT /repos/{owner}/{repo}/import"],
    unlockRepoForAuthenticatedUser: [
      "DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    unlockRepoForOrg: [
      "DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock"
    ],
    updateImport: ["PATCH /repos/{owner}/{repo}/import"]
  },
  orgs: {
    addSecurityManagerTeam: [
      "PUT /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    blockUser: ["PUT /orgs/{org}/blocks/{username}"],
    cancelInvitation: ["DELETE /orgs/{org}/invitations/{invitation_id}"],
    checkBlockedUser: ["GET /orgs/{org}/blocks/{username}"],
    checkMembershipForUser: ["GET /orgs/{org}/members/{username}"],
    checkPublicMembershipForUser: ["GET /orgs/{org}/public_members/{username}"],
    convertMemberToOutsideCollaborator: [
      "PUT /orgs/{org}/outside_collaborators/{username}"
    ],
    createInvitation: ["POST /orgs/{org}/invitations"],
    createWebhook: ["POST /orgs/{org}/hooks"],
    delete: ["DELETE /orgs/{org}"],
    deleteWebhook: ["DELETE /orgs/{org}/hooks/{hook_id}"],
    enableOrDisableSecurityProductOnAllOrgRepos: [
      "POST /orgs/{org}/{security_product}/{enablement}"
    ],
    get: ["GET /orgs/{org}"],
    getMembershipForAuthenticatedUser: ["GET /user/memberships/orgs/{org}"],
    getMembershipForUser: ["GET /orgs/{org}/memberships/{username}"],
    getWebhook: ["GET /orgs/{org}/hooks/{hook_id}"],
    getWebhookConfigForOrg: ["GET /orgs/{org}/hooks/{hook_id}/config"],
    getWebhookDelivery: [
      "GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    list: ["GET /organizations"],
    listAppInstallations: ["GET /orgs/{org}/installations"],
    listBlockedUsers: ["GET /orgs/{org}/blocks"],
    listFailedInvitations: ["GET /orgs/{org}/failed_invitations"],
    listForAuthenticatedUser: ["GET /user/orgs"],
    listForUser: ["GET /users/{username}/orgs"],
    listInvitationTeams: ["GET /orgs/{org}/invitations/{invitation_id}/teams"],
    listMembers: ["GET /orgs/{org}/members"],
    listMembershipsForAuthenticatedUser: ["GET /user/memberships/orgs"],
    listOutsideCollaborators: ["GET /orgs/{org}/outside_collaborators"],
    listPatGrantRepositories: [
      "GET /organizations/{org}/personal-access-tokens/{pat_id}/repositories"
    ],
    listPatGrantRequestRepositories: [
      "GET /organizations/{org}/personal-access-token-requests/{pat_request_id}/repositories"
    ],
    listPatGrantRequests: [
      "GET /organizations/{org}/personal-access-token-requests"
    ],
    listPatGrants: ["GET /organizations/{org}/personal-access-tokens"],
    listPendingInvitations: ["GET /orgs/{org}/invitations"],
    listPublicMembers: ["GET /orgs/{org}/public_members"],
    listSecurityManagerTeams: ["GET /orgs/{org}/security-managers"],
    listWebhookDeliveries: ["GET /orgs/{org}/hooks/{hook_id}/deliveries"],
    listWebhooks: ["GET /orgs/{org}/hooks"],
    pingWebhook: ["POST /orgs/{org}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeMember: ["DELETE /orgs/{org}/members/{username}"],
    removeMembershipForUser: ["DELETE /orgs/{org}/memberships/{username}"],
    removeOutsideCollaborator: [
      "DELETE /orgs/{org}/outside_collaborators/{username}"
    ],
    removePublicMembershipForAuthenticatedUser: [
      "DELETE /orgs/{org}/public_members/{username}"
    ],
    removeSecurityManagerTeam: [
      "DELETE /orgs/{org}/security-managers/teams/{team_slug}"
    ],
    reviewPatGrantRequest: [
      "POST /organizations/{org}/personal-access-token-requests/{pat_request_id}"
    ],
    reviewPatGrantRequestsInBulk: [
      "POST /organizations/{org}/personal-access-token-requests"
    ],
    setMembershipForUser: ["PUT /orgs/{org}/memberships/{username}"],
    setPublicMembershipForAuthenticatedUser: [
      "PUT /orgs/{org}/public_members/{username}"
    ],
    unblockUser: ["DELETE /orgs/{org}/blocks/{username}"],
    update: ["PATCH /orgs/{org}"],
    updateMembershipForAuthenticatedUser: [
      "PATCH /user/memberships/orgs/{org}"
    ],
    updatePatAccess: [
      "POST /organizations/{org}/personal-access-tokens/{pat_id}"
    ],
    updatePatAccesses: ["POST /organizations/{org}/personal-access-tokens"],
    updateWebhook: ["PATCH /orgs/{org}/hooks/{hook_id}"],
    updateWebhookConfigForOrg: ["PATCH /orgs/{org}/hooks/{hook_id}/config"]
  },
  packages: {
    deletePackageForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}"
    ],
    deletePackageForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    deletePackageForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}"
    ],
    deletePackageVersionForAuthenticatedUser: [
      "DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForOrg: [
      "DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    deletePackageVersionForUser: [
      "DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getAllPackageVersionsForAPackageOwnedByAnOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions",
      {},
      { renamed: ["packages", "getAllPackageVersionsForPackageOwnedByOrg"] }
    ],
    getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions",
      {},
      {
        renamed: [
          "packages",
          "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"
        ]
      }
    ],
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByOrg: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions"
    ],
    getAllPackageVersionsForPackageOwnedByUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions"
    ],
    getPackageForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}"
    ],
    getPackageForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}"
    ],
    getPackageForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}"
    ],
    getPackageVersionForAuthenticatedUser: [
      "GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForOrganization: [
      "GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    getPackageVersionForUser: [
      "GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}"
    ],
    listDockerMigrationConflictingPackagesForAuthenticatedUser: [
      "GET /user/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForOrganization: [
      "GET /orgs/{org}/docker/conflicts"
    ],
    listDockerMigrationConflictingPackagesForUser: [
      "GET /users/{username}/docker/conflicts"
    ],
    listPackagesForAuthenticatedUser: ["GET /user/packages"],
    listPackagesForOrganization: ["GET /orgs/{org}/packages"],
    listPackagesForUser: ["GET /users/{username}/packages"],
    restorePackageForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}"
    ],
    restorePackageVersionForAuthenticatedUser: [
      "POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForOrg: [
      "POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ],
    restorePackageVersionForUser: [
      "POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore"
    ]
  },
  projects: {
    addCollaborator: ["PUT /projects/{project_id}/collaborators/{username}"],
    createCard: ["POST /projects/columns/{column_id}/cards"],
    createColumn: ["POST /projects/{project_id}/columns"],
    createForAuthenticatedUser: ["POST /user/projects"],
    createForOrg: ["POST /orgs/{org}/projects"],
    createForRepo: ["POST /repos/{owner}/{repo}/projects"],
    delete: ["DELETE /projects/{project_id}"],
    deleteCard: ["DELETE /projects/columns/cards/{card_id}"],
    deleteColumn: ["DELETE /projects/columns/{column_id}"],
    get: ["GET /projects/{project_id}"],
    getCard: ["GET /projects/columns/cards/{card_id}"],
    getColumn: ["GET /projects/columns/{column_id}"],
    getPermissionForUser: [
      "GET /projects/{project_id}/collaborators/{username}/permission"
    ],
    listCards: ["GET /projects/columns/{column_id}/cards"],
    listCollaborators: ["GET /projects/{project_id}/collaborators"],
    listColumns: ["GET /projects/{project_id}/columns"],
    listForOrg: ["GET /orgs/{org}/projects"],
    listForRepo: ["GET /repos/{owner}/{repo}/projects"],
    listForUser: ["GET /users/{username}/projects"],
    moveCard: ["POST /projects/columns/cards/{card_id}/moves"],
    moveColumn: ["POST /projects/columns/{column_id}/moves"],
    removeCollaborator: [
      "DELETE /projects/{project_id}/collaborators/{username}"
    ],
    update: ["PATCH /projects/{project_id}"],
    updateCard: ["PATCH /projects/columns/cards/{card_id}"],
    updateColumn: ["PATCH /projects/columns/{column_id}"]
  },
  pulls: {
    checkIfMerged: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    create: ["POST /repos/{owner}/{repo}/pulls"],
    createReplyForReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies"
    ],
    createReview: ["POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    createReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    deletePendingReview: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    deleteReviewComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ],
    dismissReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals"
    ],
    get: ["GET /repos/{owner}/{repo}/pulls/{pull_number}"],
    getReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    getReviewComment: ["GET /repos/{owner}/{repo}/pulls/comments/{comment_id}"],
    list: ["GET /repos/{owner}/{repo}/pulls"],
    listCommentsForReview: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/commits"],
    listFiles: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/files"],
    listRequestedReviewers: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    listReviewComments: [
      "GET /repos/{owner}/{repo}/pulls/{pull_number}/comments"
    ],
    listReviewCommentsForRepo: ["GET /repos/{owner}/{repo}/pulls/comments"],
    listReviews: ["GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews"],
    merge: ["PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge"],
    removeRequestedReviewers: [
      "DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    requestReviewers: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers"
    ],
    submitReview: [
      "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events"
    ],
    update: ["PATCH /repos/{owner}/{repo}/pulls/{pull_number}"],
    updateBranch: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch"
    ],
    updateReview: [
      "PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}"
    ],
    updateReviewComment: [
      "PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}"
    ]
  },
  rateLimit: { get: ["GET /rate_limit"] },
  reactions: {
    createForCommitComment: [
      "POST /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    createForIssue: [
      "POST /repos/{owner}/{repo}/issues/{issue_number}/reactions"
    ],
    createForIssueComment: [
      "POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    createForPullRequestReviewComment: [
      "POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    createForRelease: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    createForTeamDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    createForTeamDiscussionInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ],
    deleteForCommitComment: [
      "DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForIssue: [
      "DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}"
    ],
    deleteForIssueComment: [
      "DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForPullRequestComment: [
      "DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}"
    ],
    deleteForRelease: [
      "DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussion: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}"
    ],
    deleteForTeamDiscussionComment: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}"
    ],
    listForCommitComment: [
      "GET /repos/{owner}/{repo}/comments/{comment_id}/reactions"
    ],
    listForIssue: ["GET /repos/{owner}/{repo}/issues/{issue_number}/reactions"],
    listForIssueComment: [
      "GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions"
    ],
    listForPullRequestReviewComment: [
      "GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions"
    ],
    listForRelease: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/reactions"
    ],
    listForTeamDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions"
    ],
    listForTeamDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions"
    ]
  },
  repos: {
    acceptInvitation: [
      "PATCH /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "acceptInvitationForAuthenticatedUser"] }
    ],
    acceptInvitationForAuthenticatedUser: [
      "PATCH /user/repository_invitations/{invitation_id}"
    ],
    addAppAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    addCollaborator: ["PUT /repos/{owner}/{repo}/collaborators/{username}"],
    addStatusCheckContexts: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    addTeamAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    addUserAccessRestrictions: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    checkCollaborator: ["GET /repos/{owner}/{repo}/collaborators/{username}"],
    checkVulnerabilityAlerts: [
      "GET /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    codeownersErrors: ["GET /repos/{owner}/{repo}/codeowners/errors"],
    compareCommits: ["GET /repos/{owner}/{repo}/compare/{base}...{head}"],
    compareCommitsWithBasehead: [
      "GET /repos/{owner}/{repo}/compare/{basehead}"
    ],
    createAutolink: ["POST /repos/{owner}/{repo}/autolinks"],
    createCommitComment: [
      "POST /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    createCommitSignatureProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    createCommitStatus: ["POST /repos/{owner}/{repo}/statuses/{sha}"],
    createDeployKey: ["POST /repos/{owner}/{repo}/keys"],
    createDeployment: ["POST /repos/{owner}/{repo}/deployments"],
    createDeploymentBranchPolicy: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    createDeploymentProtectionRule: [
      "POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    createDeploymentStatus: [
      "POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    createDispatchEvent: ["POST /repos/{owner}/{repo}/dispatches"],
    createForAuthenticatedUser: ["POST /user/repos"],
    createFork: ["POST /repos/{owner}/{repo}/forks"],
    createInOrg: ["POST /orgs/{org}/repos"],
    createOrUpdateEnvironment: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    createOrUpdateFileContents: ["PUT /repos/{owner}/{repo}/contents/{path}"],
    createOrgRuleset: ["POST /orgs/{org}/rulesets"],
    createPagesDeployment: ["POST /repos/{owner}/{repo}/pages/deployment"],
    createPagesSite: ["POST /repos/{owner}/{repo}/pages"],
    createRelease: ["POST /repos/{owner}/{repo}/releases"],
    createRepoRuleset: ["POST /repos/{owner}/{repo}/rulesets"],
    createTagProtection: ["POST /repos/{owner}/{repo}/tags/protection"],
    createUsingTemplate: [
      "POST /repos/{template_owner}/{template_repo}/generate"
    ],
    createWebhook: ["POST /repos/{owner}/{repo}/hooks"],
    declineInvitation: [
      "DELETE /user/repository_invitations/{invitation_id}",
      {},
      { renamed: ["repos", "declineInvitationForAuthenticatedUser"] }
    ],
    declineInvitationForAuthenticatedUser: [
      "DELETE /user/repository_invitations/{invitation_id}"
    ],
    delete: ["DELETE /repos/{owner}/{repo}"],
    deleteAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    deleteAdminBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    deleteAnEnvironment: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    deleteAutolink: ["DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    deleteBranchProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    deleteCommitComment: ["DELETE /repos/{owner}/{repo}/comments/{comment_id}"],
    deleteCommitSignatureProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    deleteDeployKey: ["DELETE /repos/{owner}/{repo}/keys/{key_id}"],
    deleteDeployment: [
      "DELETE /repos/{owner}/{repo}/deployments/{deployment_id}"
    ],
    deleteDeploymentBranchPolicy: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    deleteFile: ["DELETE /repos/{owner}/{repo}/contents/{path}"],
    deleteInvitation: [
      "DELETE /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    deleteOrgRuleset: ["DELETE /orgs/{org}/rulesets/{ruleset_id}"],
    deletePagesSite: ["DELETE /repos/{owner}/{repo}/pages"],
    deletePullRequestReviewProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    deleteRelease: ["DELETE /repos/{owner}/{repo}/releases/{release_id}"],
    deleteReleaseAsset: [
      "DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    deleteRepoRuleset: ["DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    deleteTagProtection: [
      "DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}"
    ],
    deleteWebhook: ["DELETE /repos/{owner}/{repo}/hooks/{hook_id}"],
    disableAutomatedSecurityFixes: [
      "DELETE /repos/{owner}/{repo}/automated-security-fixes"
    ],
    disableDeploymentProtectionRule: [
      "DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    disableLfsForRepo: ["DELETE /repos/{owner}/{repo}/lfs"],
    disableVulnerabilityAlerts: [
      "DELETE /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    downloadArchive: [
      "GET /repos/{owner}/{repo}/zipball/{ref}",
      {},
      { renamed: ["repos", "downloadZipballArchive"] }
    ],
    downloadTarballArchive: ["GET /repos/{owner}/{repo}/tarball/{ref}"],
    downloadZipballArchive: ["GET /repos/{owner}/{repo}/zipball/{ref}"],
    enableAutomatedSecurityFixes: [
      "PUT /repos/{owner}/{repo}/automated-security-fixes"
    ],
    enableLfsForRepo: ["PUT /repos/{owner}/{repo}/lfs"],
    enableVulnerabilityAlerts: [
      "PUT /repos/{owner}/{repo}/vulnerability-alerts"
    ],
    generateReleaseNotes: [
      "POST /repos/{owner}/{repo}/releases/generate-notes"
    ],
    get: ["GET /repos/{owner}/{repo}"],
    getAccessRestrictions: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions"
    ],
    getAdminBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    getAllDeploymentProtectionRules: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules"
    ],
    getAllEnvironments: ["GET /repos/{owner}/{repo}/environments"],
    getAllStatusCheckContexts: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts"
    ],
    getAllTopics: ["GET /repos/{owner}/{repo}/topics"],
    getAppsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps"
    ],
    getAutolink: ["GET /repos/{owner}/{repo}/autolinks/{autolink_id}"],
    getBranch: ["GET /repos/{owner}/{repo}/branches/{branch}"],
    getBranchProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    getBranchRules: ["GET /repos/{owner}/{repo}/rules/branches/{branch}"],
    getClones: ["GET /repos/{owner}/{repo}/traffic/clones"],
    getCodeFrequencyStats: ["GET /repos/{owner}/{repo}/stats/code_frequency"],
    getCollaboratorPermissionLevel: [
      "GET /repos/{owner}/{repo}/collaborators/{username}/permission"
    ],
    getCombinedStatusForRef: ["GET /repos/{owner}/{repo}/commits/{ref}/status"],
    getCommit: ["GET /repos/{owner}/{repo}/commits/{ref}"],
    getCommitActivityStats: ["GET /repos/{owner}/{repo}/stats/commit_activity"],
    getCommitComment: ["GET /repos/{owner}/{repo}/comments/{comment_id}"],
    getCommitSignatureProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures"
    ],
    getCommunityProfileMetrics: ["GET /repos/{owner}/{repo}/community/profile"],
    getContent: ["GET /repos/{owner}/{repo}/contents/{path}"],
    getContributorsStats: ["GET /repos/{owner}/{repo}/stats/contributors"],
    getCustomDeploymentProtectionRule: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}"
    ],
    getDeployKey: ["GET /repos/{owner}/{repo}/keys/{key_id}"],
    getDeployment: ["GET /repos/{owner}/{repo}/deployments/{deployment_id}"],
    getDeploymentBranchPolicy: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    getDeploymentStatus: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}"
    ],
    getEnvironment: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}"
    ],
    getLatestPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/latest"],
    getLatestRelease: ["GET /repos/{owner}/{repo}/releases/latest"],
    getOrgRuleset: ["GET /orgs/{org}/rulesets/{ruleset_id}"],
    getOrgRulesets: ["GET /orgs/{org}/rulesets"],
    getPages: ["GET /repos/{owner}/{repo}/pages"],
    getPagesBuild: ["GET /repos/{owner}/{repo}/pages/builds/{build_id}"],
    getPagesHealthCheck: ["GET /repos/{owner}/{repo}/pages/health"],
    getParticipationStats: ["GET /repos/{owner}/{repo}/stats/participation"],
    getPullRequestReviewProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    getPunchCardStats: ["GET /repos/{owner}/{repo}/stats/punch_card"],
    getReadme: ["GET /repos/{owner}/{repo}/readme"],
    getReadmeInDirectory: ["GET /repos/{owner}/{repo}/readme/{dir}"],
    getRelease: ["GET /repos/{owner}/{repo}/releases/{release_id}"],
    getReleaseAsset: ["GET /repos/{owner}/{repo}/releases/assets/{asset_id}"],
    getReleaseByTag: ["GET /repos/{owner}/{repo}/releases/tags/{tag}"],
    getRepoRuleset: ["GET /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    getRepoRulesets: ["GET /repos/{owner}/{repo}/rulesets"],
    getStatusChecksProtection: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    getTeamsWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams"
    ],
    getTopPaths: ["GET /repos/{owner}/{repo}/traffic/popular/paths"],
    getTopReferrers: ["GET /repos/{owner}/{repo}/traffic/popular/referrers"],
    getUsersWithAccessToProtectedBranch: [
      "GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users"
    ],
    getViews: ["GET /repos/{owner}/{repo}/traffic/views"],
    getWebhook: ["GET /repos/{owner}/{repo}/hooks/{hook_id}"],
    getWebhookConfigForRepo: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    getWebhookDelivery: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}"
    ],
    listAutolinks: ["GET /repos/{owner}/{repo}/autolinks"],
    listBranches: ["GET /repos/{owner}/{repo}/branches"],
    listBranchesForHeadCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head"
    ],
    listCollaborators: ["GET /repos/{owner}/{repo}/collaborators"],
    listCommentsForCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/comments"
    ],
    listCommitCommentsForRepo: ["GET /repos/{owner}/{repo}/comments"],
    listCommitStatusesForRef: [
      "GET /repos/{owner}/{repo}/commits/{ref}/statuses"
    ],
    listCommits: ["GET /repos/{owner}/{repo}/commits"],
    listContributors: ["GET /repos/{owner}/{repo}/contributors"],
    listCustomDeploymentRuleIntegrations: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps"
    ],
    listDeployKeys: ["GET /repos/{owner}/{repo}/keys"],
    listDeploymentBranchPolicies: [
      "GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies"
    ],
    listDeploymentStatuses: [
      "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses"
    ],
    listDeployments: ["GET /repos/{owner}/{repo}/deployments"],
    listForAuthenticatedUser: ["GET /user/repos"],
    listForOrg: ["GET /orgs/{org}/repos"],
    listForUser: ["GET /users/{username}/repos"],
    listForks: ["GET /repos/{owner}/{repo}/forks"],
    listInvitations: ["GET /repos/{owner}/{repo}/invitations"],
    listInvitationsForAuthenticatedUser: ["GET /user/repository_invitations"],
    listLanguages: ["GET /repos/{owner}/{repo}/languages"],
    listPagesBuilds: ["GET /repos/{owner}/{repo}/pages/builds"],
    listPublic: ["GET /repositories"],
    listPullRequestsAssociatedWithCommit: [
      "GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls"
    ],
    listReleaseAssets: [
      "GET /repos/{owner}/{repo}/releases/{release_id}/assets"
    ],
    listReleases: ["GET /repos/{owner}/{repo}/releases"],
    listTagProtection: ["GET /repos/{owner}/{repo}/tags/protection"],
    listTags: ["GET /repos/{owner}/{repo}/tags"],
    listTeams: ["GET /repos/{owner}/{repo}/teams"],
    listWebhookDeliveries: [
      "GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries"
    ],
    listWebhooks: ["GET /repos/{owner}/{repo}/hooks"],
    merge: ["POST /repos/{owner}/{repo}/merges"],
    mergeUpstream: ["POST /repos/{owner}/{repo}/merge-upstream"],
    pingWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/pings"],
    redeliverWebhookDelivery: [
      "POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts"
    ],
    removeAppAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    removeCollaborator: [
      "DELETE /repos/{owner}/{repo}/collaborators/{username}"
    ],
    removeStatusCheckContexts: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    removeStatusCheckProtection: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    removeTeamAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    removeUserAccessRestrictions: [
      "DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    renameBranch: ["POST /repos/{owner}/{repo}/branches/{branch}/rename"],
    replaceAllTopics: ["PUT /repos/{owner}/{repo}/topics"],
    requestPagesBuild: ["POST /repos/{owner}/{repo}/pages/builds"],
    setAdminBranchProtection: [
      "POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins"
    ],
    setAppAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps",
      {},
      { mapToData: "apps" }
    ],
    setStatusCheckContexts: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts",
      {},
      { mapToData: "contexts" }
    ],
    setTeamAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams",
      {},
      { mapToData: "teams" }
    ],
    setUserAccessRestrictions: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users",
      {},
      { mapToData: "users" }
    ],
    testPushWebhook: ["POST /repos/{owner}/{repo}/hooks/{hook_id}/tests"],
    transfer: ["POST /repos/{owner}/{repo}/transfer"],
    update: ["PATCH /repos/{owner}/{repo}"],
    updateBranchProtection: [
      "PUT /repos/{owner}/{repo}/branches/{branch}/protection"
    ],
    updateCommitComment: ["PATCH /repos/{owner}/{repo}/comments/{comment_id}"],
    updateDeploymentBranchPolicy: [
      "PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}"
    ],
    updateInformationAboutPagesSite: ["PUT /repos/{owner}/{repo}/pages"],
    updateInvitation: [
      "PATCH /repos/{owner}/{repo}/invitations/{invitation_id}"
    ],
    updateOrgRuleset: ["PUT /orgs/{org}/rulesets/{ruleset_id}"],
    updatePullRequestReviewProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews"
    ],
    updateRelease: ["PATCH /repos/{owner}/{repo}/releases/{release_id}"],
    updateReleaseAsset: [
      "PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}"
    ],
    updateRepoRuleset: ["PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}"],
    updateStatusCheckPotection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks",
      {},
      { renamed: ["repos", "updateStatusCheckProtection"] }
    ],
    updateStatusCheckProtection: [
      "PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks"
    ],
    updateWebhook: ["PATCH /repos/{owner}/{repo}/hooks/{hook_id}"],
    updateWebhookConfigForRepo: [
      "PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config"
    ],
    uploadReleaseAsset: [
      "POST /repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}",
      { baseUrl: "https://uploads.github.com" }
    ]
  },
  search: {
    code: ["GET /search/code"],
    commits: ["GET /search/commits"],
    issuesAndPullRequests: ["GET /search/issues"],
    labels: ["GET /search/labels"],
    repos: ["GET /search/repositories"],
    topics: ["GET /search/topics"],
    users: ["GET /search/users"]
  },
  secretScanning: {
    getAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ],
    listAlertsForEnterprise: [
      "GET /enterprises/{enterprise}/secret-scanning/alerts"
    ],
    listAlertsForOrg: ["GET /orgs/{org}/secret-scanning/alerts"],
    listAlertsForRepo: ["GET /repos/{owner}/{repo}/secret-scanning/alerts"],
    listLocationsForAlert: [
      "GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations"
    ],
    updateAlert: [
      "PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}"
    ]
  },
  securityAdvisories: {
    createPrivateVulnerabilityReport: [
      "POST /repos/{owner}/{repo}/security-advisories/reports"
    ],
    createRepositoryAdvisory: [
      "POST /repos/{owner}/{repo}/security-advisories"
    ],
    getRepositoryAdvisory: [
      "GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ],
    listRepositoryAdvisories: ["GET /repos/{owner}/{repo}/security-advisories"],
    updateRepositoryAdvisory: [
      "PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}"
    ]
  },
  teams: {
    addOrUpdateMembershipForUserInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    addOrUpdateProjectPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    addOrUpdateRepoPermissionsInOrg: [
      "PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    checkPermissionsForProjectInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    checkPermissionsForRepoInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    create: ["POST /orgs/{org}/teams"],
    createDiscussionCommentInOrg: [
      "POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    createDiscussionInOrg: ["POST /orgs/{org}/teams/{team_slug}/discussions"],
    deleteDiscussionCommentInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    deleteDiscussionInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    deleteInOrg: ["DELETE /orgs/{org}/teams/{team_slug}"],
    getByName: ["GET /orgs/{org}/teams/{team_slug}"],
    getDiscussionCommentInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    getDiscussionInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    getMembershipForUserInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    list: ["GET /orgs/{org}/teams"],
    listChildInOrg: ["GET /orgs/{org}/teams/{team_slug}/teams"],
    listDiscussionCommentsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments"
    ],
    listDiscussionsInOrg: ["GET /orgs/{org}/teams/{team_slug}/discussions"],
    listForAuthenticatedUser: ["GET /user/teams"],
    listMembersInOrg: ["GET /orgs/{org}/teams/{team_slug}/members"],
    listPendingInvitationsInOrg: [
      "GET /orgs/{org}/teams/{team_slug}/invitations"
    ],
    listProjectsInOrg: ["GET /orgs/{org}/teams/{team_slug}/projects"],
    listReposInOrg: ["GET /orgs/{org}/teams/{team_slug}/repos"],
    removeMembershipForUserInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}"
    ],
    removeProjectInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}"
    ],
    removeRepoInOrg: [
      "DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}"
    ],
    updateDiscussionCommentInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}"
    ],
    updateDiscussionInOrg: [
      "PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}"
    ],
    updateInOrg: ["PATCH /orgs/{org}/teams/{team_slug}"]
  },
  users: {
    addEmailForAuthenticated: [
      "POST /user/emails",
      {},
      { renamed: ["users", "addEmailForAuthenticatedUser"] }
    ],
    addEmailForAuthenticatedUser: ["POST /user/emails"],
    addSocialAccountForAuthenticatedUser: ["POST /user/social_accounts"],
    block: ["PUT /user/blocks/{username}"],
    checkBlocked: ["GET /user/blocks/{username}"],
    checkFollowingForUser: ["GET /users/{username}/following/{target_user}"],
    checkPersonIsFollowedByAuthenticated: ["GET /user/following/{username}"],
    createGpgKeyForAuthenticated: [
      "POST /user/gpg_keys",
      {},
      { renamed: ["users", "createGpgKeyForAuthenticatedUser"] }
    ],
    createGpgKeyForAuthenticatedUser: ["POST /user/gpg_keys"],
    createPublicSshKeyForAuthenticated: [
      "POST /user/keys",
      {},
      { renamed: ["users", "createPublicSshKeyForAuthenticatedUser"] }
    ],
    createPublicSshKeyForAuthenticatedUser: ["POST /user/keys"],
    createSshSigningKeyForAuthenticatedUser: ["POST /user/ssh_signing_keys"],
    deleteEmailForAuthenticated: [
      "DELETE /user/emails",
      {},
      { renamed: ["users", "deleteEmailForAuthenticatedUser"] }
    ],
    deleteEmailForAuthenticatedUser: ["DELETE /user/emails"],
    deleteGpgKeyForAuthenticated: [
      "DELETE /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "deleteGpgKeyForAuthenticatedUser"] }
    ],
    deleteGpgKeyForAuthenticatedUser: ["DELETE /user/gpg_keys/{gpg_key_id}"],
    deletePublicSshKeyForAuthenticated: [
      "DELETE /user/keys/{key_id}",
      {},
      { renamed: ["users", "deletePublicSshKeyForAuthenticatedUser"] }
    ],
    deletePublicSshKeyForAuthenticatedUser: ["DELETE /user/keys/{key_id}"],
    deleteSocialAccountForAuthenticatedUser: ["DELETE /user/social_accounts"],
    deleteSshSigningKeyForAuthenticatedUser: [
      "DELETE /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    follow: ["PUT /user/following/{username}"],
    getAuthenticated: ["GET /user"],
    getByUsername: ["GET /users/{username}"],
    getContextForUser: ["GET /users/{username}/hovercard"],
    getGpgKeyForAuthenticated: [
      "GET /user/gpg_keys/{gpg_key_id}",
      {},
      { renamed: ["users", "getGpgKeyForAuthenticatedUser"] }
    ],
    getGpgKeyForAuthenticatedUser: ["GET /user/gpg_keys/{gpg_key_id}"],
    getPublicSshKeyForAuthenticated: [
      "GET /user/keys/{key_id}",
      {},
      { renamed: ["users", "getPublicSshKeyForAuthenticatedUser"] }
    ],
    getPublicSshKeyForAuthenticatedUser: ["GET /user/keys/{key_id}"],
    getSshSigningKeyForAuthenticatedUser: [
      "GET /user/ssh_signing_keys/{ssh_signing_key_id}"
    ],
    list: ["GET /users"],
    listBlockedByAuthenticated: [
      "GET /user/blocks",
      {},
      { renamed: ["users", "listBlockedByAuthenticatedUser"] }
    ],
    listBlockedByAuthenticatedUser: ["GET /user/blocks"],
    listEmailsForAuthenticated: [
      "GET /user/emails",
      {},
      { renamed: ["users", "listEmailsForAuthenticatedUser"] }
    ],
    listEmailsForAuthenticatedUser: ["GET /user/emails"],
    listFollowedByAuthenticated: [
      "GET /user/following",
      {},
      { renamed: ["users", "listFollowedByAuthenticatedUser"] }
    ],
    listFollowedByAuthenticatedUser: ["GET /user/following"],
    listFollowersForAuthenticatedUser: ["GET /user/followers"],
    listFollowersForUser: ["GET /users/{username}/followers"],
    listFollowingForUser: ["GET /users/{username}/following"],
    listGpgKeysForAuthenticated: [
      "GET /user/gpg_keys",
      {},
      { renamed: ["users", "listGpgKeysForAuthenticatedUser"] }
    ],
    listGpgKeysForAuthenticatedUser: ["GET /user/gpg_keys"],
    listGpgKeysForUser: ["GET /users/{username}/gpg_keys"],
    listPublicEmailsForAuthenticated: [
      "GET /user/public_emails",
      {},
      { renamed: ["users", "listPublicEmailsForAuthenticatedUser"] }
    ],
    listPublicEmailsForAuthenticatedUser: ["GET /user/public_emails"],
    listPublicKeysForUser: ["GET /users/{username}/keys"],
    listPublicSshKeysForAuthenticated: [
      "GET /user/keys",
      {},
      { renamed: ["users", "listPublicSshKeysForAuthenticatedUser"] }
    ],
    listPublicSshKeysForAuthenticatedUser: ["GET /user/keys"],
    listSocialAccountsForAuthenticatedUser: ["GET /user/social_accounts"],
    listSocialAccountsForUser: ["GET /users/{username}/social_accounts"],
    listSshSigningKeysForAuthenticatedUser: ["GET /user/ssh_signing_keys"],
    listSshSigningKeysForUser: ["GET /users/{username}/ssh_signing_keys"],
    setPrimaryEmailVisibilityForAuthenticated: [
      "PATCH /user/email/visibility",
      {},
      { renamed: ["users", "setPrimaryEmailVisibilityForAuthenticatedUser"] }
    ],
    setPrimaryEmailVisibilityForAuthenticatedUser: [
      "PATCH /user/email/visibility"
    ],
    unblock: ["DELETE /user/blocks/{username}"],
    unfollow: ["DELETE /user/following/{username}"],
    updateAuthenticated: ["PATCH /user"]
  }
};
var endpoints_default = Endpoints;

// pkg/dist-src/endpoints-to-methods.js
var endpointMethodsMap = /* @__PURE__ */ new Map();
for (const [scope, endpoints] of Object.entries(endpoints_default)) {
  for (const [methodName, endpoint] of Object.entries(endpoints)) {
    const [route, defaults, decorations] = endpoint;
    const [method, url] = route.split(/ /);
    const endpointDefaults = Object.assign(
      {
        method,
        url
      },
      defaults
    );
    if (!endpointMethodsMap.has(scope)) {
      endpointMethodsMap.set(scope, /* @__PURE__ */ new Map());
    }
    endpointMethodsMap.get(scope).set(methodName, {
      scope,
      methodName,
      endpointDefaults,
      decorations
    });
  }
}
var handler = {
  get({ octokit, scope, cache }, methodName) {
    if (cache[methodName]) {
      return cache[methodName];
    }
    const { decorations, endpointDefaults } = endpointMethodsMap.get(scope).get(methodName);
    if (decorations) {
      cache[methodName] = decorate(
        octokit,
        scope,
        methodName,
        endpointDefaults,
        decorations
      );
    } else {
      cache[methodName] = octokit.request.defaults(endpointDefaults);
    }
    return cache[methodName];
  }
};
function endpointsToMethods(octokit) {
  const newMethods = {};
  for (const scope of endpointMethodsMap.keys()) {
    newMethods[scope] = new Proxy({ octokit, scope, cache: {} }, handler);
  }
  return newMethods;
}
function decorate(octokit, scope, methodName, defaults, decorations) {
  const requestWithDefaults = octokit.request.defaults(defaults);
  function withDecorations(...args) {
    let options = requestWithDefaults.endpoint.merge(...args);
    if (decorations.mapToData) {
      options = Object.assign({}, options, {
        data: options[decorations.mapToData],
        [decorations.mapToData]: void 0
      });
      return requestWithDefaults(options);
    }
    if (decorations.renamed) {
      const [newScope, newMethodName] = decorations.renamed;
      octokit.log.warn(
        `octokit.${scope}.${methodName}() has been renamed to octokit.${newScope}.${newMethodName}()`
      );
    }
    if (decorations.deprecated) {
      octokit.log.warn(decorations.deprecated);
    }
    if (decorations.renamedParameters) {
      const options2 = requestWithDefaults.endpoint.merge(...args);
      for (const [name, alias] of Object.entries(
        decorations.renamedParameters
      )) {
        if (name in options2) {
          octokit.log.warn(
            `"${name}" parameter is deprecated for "octokit.${scope}.${methodName}()". Use "${alias}" instead`
          );
          if (!(alias in options2)) {
            options2[alias] = options2[name];
          }
          delete options2[name];
        }
      }
      return requestWithDefaults(options2);
    }
    return requestWithDefaults(...args);
  }
  return Object.assign(withDecorations, requestWithDefaults);
}

// pkg/dist-src/index.js
function restEndpointMethods(octokit) {
  const api = endpointsToMethods(octokit);
  return {
    rest: api
  };
}
restEndpointMethods.VERSION = VERSION$8;

var light = {exports: {}};

/**
  * This file contains the Bottleneck library (MIT), compiled to ES2017, and without Clustering support.
  * https://github.com/SGrondin/bottleneck
  */

(function (module, exports) {
	(function (global, factory) {
		module.exports = factory() ;
	}(commonjsGlobal, (function () {
		var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

		function getCjsExportFromNamespace (n) {
			return n && n['default'] || n;
		}

		var load = function(received, defaults, onto = {}) {
		  var k, ref, v;
		  for (k in defaults) {
		    v = defaults[k];
		    onto[k] = (ref = received[k]) != null ? ref : v;
		  }
		  return onto;
		};

		var overwrite = function(received, defaults, onto = {}) {
		  var k, v;
		  for (k in received) {
		    v = received[k];
		    if (defaults[k] !== void 0) {
		      onto[k] = v;
		    }
		  }
		  return onto;
		};

		var parser = {
			load: load,
			overwrite: overwrite
		};

		var DLList;

		DLList = class DLList {
		  constructor(incr, decr) {
		    this.incr = incr;
		    this.decr = decr;
		    this._first = null;
		    this._last = null;
		    this.length = 0;
		  }

		  push(value) {
		    var node;
		    this.length++;
		    if (typeof this.incr === "function") {
		      this.incr();
		    }
		    node = {
		      value,
		      prev: this._last,
		      next: null
		    };
		    if (this._last != null) {
		      this._last.next = node;
		      this._last = node;
		    } else {
		      this._first = this._last = node;
		    }
		    return void 0;
		  }

		  shift() {
		    var value;
		    if (this._first == null) {
		      return;
		    } else {
		      this.length--;
		      if (typeof this.decr === "function") {
		        this.decr();
		      }
		    }
		    value = this._first.value;
		    if ((this._first = this._first.next) != null) {
		      this._first.prev = null;
		    } else {
		      this._last = null;
		    }
		    return value;
		  }

		  first() {
		    if (this._first != null) {
		      return this._first.value;
		    }
		  }

		  getArray() {
		    var node, ref, results;
		    node = this._first;
		    results = [];
		    while (node != null) {
		      results.push((ref = node, node = node.next, ref.value));
		    }
		    return results;
		  }

		  forEachShift(cb) {
		    var node;
		    node = this.shift();
		    while (node != null) {
		      (cb(node), node = this.shift());
		    }
		    return void 0;
		  }

		  debug() {
		    var node, ref, ref1, ref2, results;
		    node = this._first;
		    results = [];
		    while (node != null) {
		      results.push((ref = node, node = node.next, {
		        value: ref.value,
		        prev: (ref1 = ref.prev) != null ? ref1.value : void 0,
		        next: (ref2 = ref.next) != null ? ref2.value : void 0
		      }));
		    }
		    return results;
		  }

		};

		var DLList_1 = DLList;

		var Events;

		Events = class Events {
		  constructor(instance) {
		    this.instance = instance;
		    this._events = {};
		    if ((this.instance.on != null) || (this.instance.once != null) || (this.instance.removeAllListeners != null)) {
		      throw new Error("An Emitter already exists for this object");
		    }
		    this.instance.on = (name, cb) => {
		      return this._addListener(name, "many", cb);
		    };
		    this.instance.once = (name, cb) => {
		      return this._addListener(name, "once", cb);
		    };
		    this.instance.removeAllListeners = (name = null) => {
		      if (name != null) {
		        return delete this._events[name];
		      } else {
		        return this._events = {};
		      }
		    };
		  }

		  _addListener(name, status, cb) {
		    var base;
		    if ((base = this._events)[name] == null) {
		      base[name] = [];
		    }
		    this._events[name].push({cb, status});
		    return this.instance;
		  }

		  listenerCount(name) {
		    if (this._events[name] != null) {
		      return this._events[name].length;
		    } else {
		      return 0;
		    }
		  }

		  async trigger(name, ...args) {
		    var e, promises;
		    try {
		      if (name !== "debug") {
		        this.trigger("debug", `Event triggered: ${name}`, args);
		      }
		      if (this._events[name] == null) {
		        return;
		      }
		      this._events[name] = this._events[name].filter(function(listener) {
		        return listener.status !== "none";
		      });
		      promises = this._events[name].map(async(listener) => {
		        var e, returned;
		        if (listener.status === "none") {
		          return;
		        }
		        if (listener.status === "once") {
		          listener.status = "none";
		        }
		        try {
		          returned = typeof listener.cb === "function" ? listener.cb(...args) : void 0;
		          if (typeof (returned != null ? returned.then : void 0) === "function") {
		            return (await returned);
		          } else {
		            return returned;
		          }
		        } catch (error) {
		          e = error;
		          {
		            this.trigger("error", e);
		          }
		          return null;
		        }
		      });
		      return ((await Promise.all(promises))).find(function(x) {
		        return x != null;
		      });
		    } catch (error) {
		      e = error;
		      {
		        this.trigger("error", e);
		      }
		      return null;
		    }
		  }

		};

		var Events_1 = Events;

		var DLList$1, Events$1, Queues;

		DLList$1 = DLList_1;

		Events$1 = Events_1;

		Queues = class Queues {
		  constructor(num_priorities) {
		    this.Events = new Events$1(this);
		    this._length = 0;
		    this._lists = (function() {
		      var j, ref, results;
		      results = [];
		      for (j = 1, ref = num_priorities; (1 <= ref ? j <= ref : j >= ref); 1 <= ref ? ++j : --j) {
		        results.push(new DLList$1((() => {
		          return this.incr();
		        }), (() => {
		          return this.decr();
		        })));
		      }
		      return results;
		    }).call(this);
		  }

		  incr() {
		    if (this._length++ === 0) {
		      return this.Events.trigger("leftzero");
		    }
		  }

		  decr() {
		    if (--this._length === 0) {
		      return this.Events.trigger("zero");
		    }
		  }

		  push(job) {
		    return this._lists[job.options.priority].push(job);
		  }

		  queued(priority) {
		    if (priority != null) {
		      return this._lists[priority].length;
		    } else {
		      return this._length;
		    }
		  }

		  shiftAll(fn) {
		    return this._lists.forEach(function(list) {
		      return list.forEachShift(fn);
		    });
		  }

		  getFirst(arr = this._lists) {
		    var j, len, list;
		    for (j = 0, len = arr.length; j < len; j++) {
		      list = arr[j];
		      if (list.length > 0) {
		        return list;
		      }
		    }
		    return [];
		  }

		  shiftLastFrom(priority) {
		    return this.getFirst(this._lists.slice(priority).reverse()).shift();
		  }

		};

		var Queues_1 = Queues;

		var BottleneckError;

		BottleneckError = class BottleneckError extends Error {};

		var BottleneckError_1 = BottleneckError;

		var BottleneckError$1, DEFAULT_PRIORITY, Job, NUM_PRIORITIES, parser$1;

		NUM_PRIORITIES = 10;

		DEFAULT_PRIORITY = 5;

		parser$1 = parser;

		BottleneckError$1 = BottleneckError_1;

		Job = class Job {
		  constructor(task, args, options, jobDefaults, rejectOnDrop, Events, _states, Promise) {
		    this.task = task;
		    this.args = args;
		    this.rejectOnDrop = rejectOnDrop;
		    this.Events = Events;
		    this._states = _states;
		    this.Promise = Promise;
		    this.options = parser$1.load(options, jobDefaults);
		    this.options.priority = this._sanitizePriority(this.options.priority);
		    if (this.options.id === jobDefaults.id) {
		      this.options.id = `${this.options.id}-${this._randomIndex()}`;
		    }
		    this.promise = new this.Promise((_resolve, _reject) => {
		      this._resolve = _resolve;
		      this._reject = _reject;
		    });
		    this.retryCount = 0;
		  }

		  _sanitizePriority(priority) {
		    var sProperty;
		    sProperty = ~~priority !== priority ? DEFAULT_PRIORITY : priority;
		    if (sProperty < 0) {
		      return 0;
		    } else if (sProperty > NUM_PRIORITIES - 1) {
		      return NUM_PRIORITIES - 1;
		    } else {
		      return sProperty;
		    }
		  }

		  _randomIndex() {
		    return Math.random().toString(36).slice(2);
		  }

		  doDrop({error, message = "This job has been dropped by Bottleneck"} = {}) {
		    if (this._states.remove(this.options.id)) {
		      if (this.rejectOnDrop) {
		        this._reject(error != null ? error : new BottleneckError$1(message));
		      }
		      this.Events.trigger("dropped", {args: this.args, options: this.options, task: this.task, promise: this.promise});
		      return true;
		    } else {
		      return false;
		    }
		  }

		  _assertStatus(expected) {
		    var status;
		    status = this._states.jobStatus(this.options.id);
		    if (!(status === expected || (expected === "DONE" && status === null))) {
		      throw new BottleneckError$1(`Invalid job status ${status}, expected ${expected}. Please open an issue at https://github.com/SGrondin/bottleneck/issues`);
		    }
		  }

		  doReceive() {
		    this._states.start(this.options.id);
		    return this.Events.trigger("received", {args: this.args, options: this.options});
		  }

		  doQueue(reachedHWM, blocked) {
		    this._assertStatus("RECEIVED");
		    this._states.next(this.options.id);
		    return this.Events.trigger("queued", {args: this.args, options: this.options, reachedHWM, blocked});
		  }

		  doRun() {
		    if (this.retryCount === 0) {
		      this._assertStatus("QUEUED");
		      this._states.next(this.options.id);
		    } else {
		      this._assertStatus("EXECUTING");
		    }
		    return this.Events.trigger("scheduled", {args: this.args, options: this.options});
		  }

		  async doExecute(chained, clearGlobalState, run, free) {
		    var error, eventInfo, passed;
		    if (this.retryCount === 0) {
		      this._assertStatus("RUNNING");
		      this._states.next(this.options.id);
		    } else {
		      this._assertStatus("EXECUTING");
		    }
		    eventInfo = {args: this.args, options: this.options, retryCount: this.retryCount};
		    this.Events.trigger("executing", eventInfo);
		    try {
		      passed = (await (chained != null ? chained.schedule(this.options, this.task, ...this.args) : this.task(...this.args)));
		      if (clearGlobalState()) {
		        this.doDone(eventInfo);
		        await free(this.options, eventInfo);
		        this._assertStatus("DONE");
		        return this._resolve(passed);
		      }
		    } catch (error1) {
		      error = error1;
		      return this._onFailure(error, eventInfo, clearGlobalState, run, free);
		    }
		  }

		  doExpire(clearGlobalState, run, free) {
		    var error, eventInfo;
		    if (this._states.jobStatus(this.options.id === "RUNNING")) {
		      this._states.next(this.options.id);
		    }
		    this._assertStatus("EXECUTING");
		    eventInfo = {args: this.args, options: this.options, retryCount: this.retryCount};
		    error = new BottleneckError$1(`This job timed out after ${this.options.expiration} ms.`);
		    return this._onFailure(error, eventInfo, clearGlobalState, run, free);
		  }

		  async _onFailure(error, eventInfo, clearGlobalState, run, free) {
		    var retry, retryAfter;
		    if (clearGlobalState()) {
		      retry = (await this.Events.trigger("failed", error, eventInfo));
		      if (retry != null) {
		        retryAfter = ~~retry;
		        this.Events.trigger("retry", `Retrying ${this.options.id} after ${retryAfter} ms`, eventInfo);
		        this.retryCount++;
		        return run(retryAfter);
		      } else {
		        this.doDone(eventInfo);
		        await free(this.options, eventInfo);
		        this._assertStatus("DONE");
		        return this._reject(error);
		      }
		    }
		  }

		  doDone(eventInfo) {
		    this._assertStatus("EXECUTING");
		    this._states.next(this.options.id);
		    return this.Events.trigger("done", eventInfo);
		  }

		};

		var Job_1 = Job;

		var BottleneckError$2, LocalDatastore, parser$2;

		parser$2 = parser;

		BottleneckError$2 = BottleneckError_1;

		LocalDatastore = class LocalDatastore {
		  constructor(instance, storeOptions, storeInstanceOptions) {
		    this.instance = instance;
		    this.storeOptions = storeOptions;
		    this.clientId = this.instance._randomIndex();
		    parser$2.load(storeInstanceOptions, storeInstanceOptions, this);
		    this._nextRequest = this._lastReservoirRefresh = this._lastReservoirIncrease = Date.now();
		    this._running = 0;
		    this._done = 0;
		    this._unblockTime = 0;
		    this.ready = this.Promise.resolve();
		    this.clients = {};
		    this._startHeartbeat();
		  }

		  _startHeartbeat() {
		    var base;
		    if ((this.heartbeat == null) && (((this.storeOptions.reservoirRefreshInterval != null) && (this.storeOptions.reservoirRefreshAmount != null)) || ((this.storeOptions.reservoirIncreaseInterval != null) && (this.storeOptions.reservoirIncreaseAmount != null)))) {
		      return typeof (base = (this.heartbeat = setInterval(() => {
		        var amount, incr, maximum, now, reservoir;
		        now = Date.now();
		        if ((this.storeOptions.reservoirRefreshInterval != null) && now >= this._lastReservoirRefresh + this.storeOptions.reservoirRefreshInterval) {
		          this._lastReservoirRefresh = now;
		          this.storeOptions.reservoir = this.storeOptions.reservoirRefreshAmount;
		          this.instance._drainAll(this.computeCapacity());
		        }
		        if ((this.storeOptions.reservoirIncreaseInterval != null) && now >= this._lastReservoirIncrease + this.storeOptions.reservoirIncreaseInterval) {
		          ({
		            reservoirIncreaseAmount: amount,
		            reservoirIncreaseMaximum: maximum,
		            reservoir
		          } = this.storeOptions);
		          this._lastReservoirIncrease = now;
		          incr = maximum != null ? Math.min(amount, maximum - reservoir) : amount;
		          if (incr > 0) {
		            this.storeOptions.reservoir += incr;
		            return this.instance._drainAll(this.computeCapacity());
		          }
		        }
		      }, this.heartbeatInterval))).unref === "function" ? base.unref() : void 0;
		    } else {
		      return clearInterval(this.heartbeat);
		    }
		  }

		  async __publish__(message) {
		    await this.yieldLoop();
		    return this.instance.Events.trigger("message", message.toString());
		  }

		  async __disconnect__(flush) {
		    await this.yieldLoop();
		    clearInterval(this.heartbeat);
		    return this.Promise.resolve();
		  }

		  yieldLoop(t = 0) {
		    return new this.Promise(function(resolve, reject) {
		      return setTimeout(resolve, t);
		    });
		  }

		  computePenalty() {
		    var ref;
		    return (ref = this.storeOptions.penalty) != null ? ref : (15 * this.storeOptions.minTime) || 5000;
		  }

		  async __updateSettings__(options) {
		    await this.yieldLoop();
		    parser$2.overwrite(options, options, this.storeOptions);
		    this._startHeartbeat();
		    this.instance._drainAll(this.computeCapacity());
		    return true;
		  }

		  async __running__() {
		    await this.yieldLoop();
		    return this._running;
		  }

		  async __queued__() {
		    await this.yieldLoop();
		    return this.instance.queued();
		  }

		  async __done__() {
		    await this.yieldLoop();
		    return this._done;
		  }

		  async __groupCheck__(time) {
		    await this.yieldLoop();
		    return (this._nextRequest + this.timeout) < time;
		  }

		  computeCapacity() {
		    var maxConcurrent, reservoir;
		    ({maxConcurrent, reservoir} = this.storeOptions);
		    if ((maxConcurrent != null) && (reservoir != null)) {
		      return Math.min(maxConcurrent - this._running, reservoir);
		    } else if (maxConcurrent != null) {
		      return maxConcurrent - this._running;
		    } else if (reservoir != null) {
		      return reservoir;
		    } else {
		      return null;
		    }
		  }

		  conditionsCheck(weight) {
		    var capacity;
		    capacity = this.computeCapacity();
		    return (capacity == null) || weight <= capacity;
		  }

		  async __incrementReservoir__(incr) {
		    var reservoir;
		    await this.yieldLoop();
		    reservoir = this.storeOptions.reservoir += incr;
		    this.instance._drainAll(this.computeCapacity());
		    return reservoir;
		  }

		  async __currentReservoir__() {
		    await this.yieldLoop();
		    return this.storeOptions.reservoir;
		  }

		  isBlocked(now) {
		    return this._unblockTime >= now;
		  }

		  check(weight, now) {
		    return this.conditionsCheck(weight) && (this._nextRequest - now) <= 0;
		  }

		  async __check__(weight) {
		    var now;
		    await this.yieldLoop();
		    now = Date.now();
		    return this.check(weight, now);
		  }

		  async __register__(index, weight, expiration) {
		    var now, wait;
		    await this.yieldLoop();
		    now = Date.now();
		    if (this.conditionsCheck(weight)) {
		      this._running += weight;
		      if (this.storeOptions.reservoir != null) {
		        this.storeOptions.reservoir -= weight;
		      }
		      wait = Math.max(this._nextRequest - now, 0);
		      this._nextRequest = now + wait + this.storeOptions.minTime;
		      return {
		        success: true,
		        wait,
		        reservoir: this.storeOptions.reservoir
		      };
		    } else {
		      return {
		        success: false
		      };
		    }
		  }

		  strategyIsBlock() {
		    return this.storeOptions.strategy === 3;
		  }

		  async __submit__(queueLength, weight) {
		    var blocked, now, reachedHWM;
		    await this.yieldLoop();
		    if ((this.storeOptions.maxConcurrent != null) && weight > this.storeOptions.maxConcurrent) {
		      throw new BottleneckError$2(`Impossible to add a job having a weight of ${weight} to a limiter having a maxConcurrent setting of ${this.storeOptions.maxConcurrent}`);
		    }
		    now = Date.now();
		    reachedHWM = (this.storeOptions.highWater != null) && queueLength === this.storeOptions.highWater && !this.check(weight, now);
		    blocked = this.strategyIsBlock() && (reachedHWM || this.isBlocked(now));
		    if (blocked) {
		      this._unblockTime = now + this.computePenalty();
		      this._nextRequest = this._unblockTime + this.storeOptions.minTime;
		      this.instance._dropAllQueued();
		    }
		    return {
		      reachedHWM,
		      blocked,
		      strategy: this.storeOptions.strategy
		    };
		  }

		  async __free__(index, weight) {
		    await this.yieldLoop();
		    this._running -= weight;
		    this._done += weight;
		    this.instance._drainAll(this.computeCapacity());
		    return {
		      running: this._running
		    };
		  }

		};

		var LocalDatastore_1 = LocalDatastore;

		var BottleneckError$3, States;

		BottleneckError$3 = BottleneckError_1;

		States = class States {
		  constructor(status1) {
		    this.status = status1;
		    this._jobs = {};
		    this.counts = this.status.map(function() {
		      return 0;
		    });
		  }

		  next(id) {
		    var current, next;
		    current = this._jobs[id];
		    next = current + 1;
		    if ((current != null) && next < this.status.length) {
		      this.counts[current]--;
		      this.counts[next]++;
		      return this._jobs[id]++;
		    } else if (current != null) {
		      this.counts[current]--;
		      return delete this._jobs[id];
		    }
		  }

		  start(id) {
		    var initial;
		    initial = 0;
		    this._jobs[id] = initial;
		    return this.counts[initial]++;
		  }

		  remove(id) {
		    var current;
		    current = this._jobs[id];
		    if (current != null) {
		      this.counts[current]--;
		      delete this._jobs[id];
		    }
		    return current != null;
		  }

		  jobStatus(id) {
		    var ref;
		    return (ref = this.status[this._jobs[id]]) != null ? ref : null;
		  }

		  statusJobs(status) {
		    var k, pos, ref, results, v;
		    if (status != null) {
		      pos = this.status.indexOf(status);
		      if (pos < 0) {
		        throw new BottleneckError$3(`status must be one of ${this.status.join(', ')}`);
		      }
		      ref = this._jobs;
		      results = [];
		      for (k in ref) {
		        v = ref[k];
		        if (v === pos) {
		          results.push(k);
		        }
		      }
		      return results;
		    } else {
		      return Object.keys(this._jobs);
		    }
		  }

		  statusCounts() {
		    return this.counts.reduce(((acc, v, i) => {
		      acc[this.status[i]] = v;
		      return acc;
		    }), {});
		  }

		};

		var States_1 = States;

		var DLList$2, Sync;

		DLList$2 = DLList_1;

		Sync = class Sync {
		  constructor(name, Promise) {
		    this.schedule = this.schedule.bind(this);
		    this.name = name;
		    this.Promise = Promise;
		    this._running = 0;
		    this._queue = new DLList$2();
		  }

		  isEmpty() {
		    return this._queue.length === 0;
		  }

		  async _tryToRun() {
		    var args, cb, error, reject, resolve, returned, task;
		    if ((this._running < 1) && this._queue.length > 0) {
		      this._running++;
		      ({task, args, resolve, reject} = this._queue.shift());
		      cb = (await (async function() {
		        try {
		          returned = (await task(...args));
		          return function() {
		            return resolve(returned);
		          };
		        } catch (error1) {
		          error = error1;
		          return function() {
		            return reject(error);
		          };
		        }
		      })());
		      this._running--;
		      this._tryToRun();
		      return cb();
		    }
		  }

		  schedule(task, ...args) {
		    var promise, reject, resolve;
		    resolve = reject = null;
		    promise = new this.Promise(function(_resolve, _reject) {
		      resolve = _resolve;
		      return reject = _reject;
		    });
		    this._queue.push({task, args, resolve, reject});
		    this._tryToRun();
		    return promise;
		  }

		};

		var Sync_1 = Sync;

		var version = "2.19.5";
		var version$1 = {
			version: version
		};

		var version$2 = /*#__PURE__*/Object.freeze({
			version: version,
			default: version$1
		});

		var require$$2 = () => console.log('You must import the full version of Bottleneck in order to use this feature.');

		var require$$3 = () => console.log('You must import the full version of Bottleneck in order to use this feature.');

		var require$$4 = () => console.log('You must import the full version of Bottleneck in order to use this feature.');

		var Events$2, Group, IORedisConnection$1, RedisConnection$1, Scripts$1, parser$3;

		parser$3 = parser;

		Events$2 = Events_1;

		RedisConnection$1 = require$$2;

		IORedisConnection$1 = require$$3;

		Scripts$1 = require$$4;

		Group = (function() {
		  class Group {
		    constructor(limiterOptions = {}) {
		      this.deleteKey = this.deleteKey.bind(this);
		      this.limiterOptions = limiterOptions;
		      parser$3.load(this.limiterOptions, this.defaults, this);
		      this.Events = new Events$2(this);
		      this.instances = {};
		      this.Bottleneck = Bottleneck_1;
		      this._startAutoCleanup();
		      this.sharedConnection = this.connection != null;
		      if (this.connection == null) {
		        if (this.limiterOptions.datastore === "redis") {
		          this.connection = new RedisConnection$1(Object.assign({}, this.limiterOptions, {Events: this.Events}));
		        } else if (this.limiterOptions.datastore === "ioredis") {
		          this.connection = new IORedisConnection$1(Object.assign({}, this.limiterOptions, {Events: this.Events}));
		        }
		      }
		    }

		    key(key = "") {
		      var ref;
		      return (ref = this.instances[key]) != null ? ref : (() => {
		        var limiter;
		        limiter = this.instances[key] = new this.Bottleneck(Object.assign(this.limiterOptions, {
		          id: `${this.id}-${key}`,
		          timeout: this.timeout,
		          connection: this.connection
		        }));
		        this.Events.trigger("created", limiter, key);
		        return limiter;
		      })();
		    }

		    async deleteKey(key = "") {
		      var deleted, instance;
		      instance = this.instances[key];
		      if (this.connection) {
		        deleted = (await this.connection.__runCommand__(['del', ...Scripts$1.allKeys(`${this.id}-${key}`)]));
		      }
		      if (instance != null) {
		        delete this.instances[key];
		        await instance.disconnect();
		      }
		      return (instance != null) || deleted > 0;
		    }

		    limiters() {
		      var k, ref, results, v;
		      ref = this.instances;
		      results = [];
		      for (k in ref) {
		        v = ref[k];
		        results.push({
		          key: k,
		          limiter: v
		        });
		      }
		      return results;
		    }

		    keys() {
		      return Object.keys(this.instances);
		    }

		    async clusterKeys() {
		      var cursor, end, found, i, k, keys, len, next, start;
		      if (this.connection == null) {
		        return this.Promise.resolve(this.keys());
		      }
		      keys = [];
		      cursor = null;
		      start = `b_${this.id}-`.length;
		      end = "_settings".length;
		      while (cursor !== 0) {
		        [next, found] = (await this.connection.__runCommand__(["scan", cursor != null ? cursor : 0, "match", `b_${this.id}-*_settings`, "count", 10000]));
		        cursor = ~~next;
		        for (i = 0, len = found.length; i < len; i++) {
		          k = found[i];
		          keys.push(k.slice(start, -end));
		        }
		      }
		      return keys;
		    }

		    _startAutoCleanup() {
		      var base;
		      clearInterval(this.interval);
		      return typeof (base = (this.interval = setInterval(async() => {
		        var e, k, ref, results, time, v;
		        time = Date.now();
		        ref = this.instances;
		        results = [];
		        for (k in ref) {
		          v = ref[k];
		          try {
		            if ((await v._store.__groupCheck__(time))) {
		              results.push(this.deleteKey(k));
		            } else {
		              results.push(void 0);
		            }
		          } catch (error) {
		            e = error;
		            results.push(v.Events.trigger("error", e));
		          }
		        }
		        return results;
		      }, this.timeout / 2))).unref === "function" ? base.unref() : void 0;
		    }

		    updateSettings(options = {}) {
		      parser$3.overwrite(options, this.defaults, this);
		      parser$3.overwrite(options, options, this.limiterOptions);
		      if (options.timeout != null) {
		        return this._startAutoCleanup();
		      }
		    }

		    disconnect(flush = true) {
		      var ref;
		      if (!this.sharedConnection) {
		        return (ref = this.connection) != null ? ref.disconnect(flush) : void 0;
		      }
		    }

		  }
		  Group.prototype.defaults = {
		    timeout: 1000 * 60 * 5,
		    connection: null,
		    Promise: Promise,
		    id: "group-key"
		  };

		  return Group;

		}).call(commonjsGlobal$1);

		var Group_1 = Group;

		var Batcher, Events$3, parser$4;

		parser$4 = parser;

		Events$3 = Events_1;

		Batcher = (function() {
		  class Batcher {
		    constructor(options = {}) {
		      this.options = options;
		      parser$4.load(this.options, this.defaults, this);
		      this.Events = new Events$3(this);
		      this._arr = [];
		      this._resetPromise();
		      this._lastFlush = Date.now();
		    }

		    _resetPromise() {
		      return this._promise = new this.Promise((res, rej) => {
		        return this._resolve = res;
		      });
		    }

		    _flush() {
		      clearTimeout(this._timeout);
		      this._lastFlush = Date.now();
		      this._resolve();
		      this.Events.trigger("batch", this._arr);
		      this._arr = [];
		      return this._resetPromise();
		    }

		    add(data) {
		      var ret;
		      this._arr.push(data);
		      ret = this._promise;
		      if (this._arr.length === this.maxSize) {
		        this._flush();
		      } else if ((this.maxTime != null) && this._arr.length === 1) {
		        this._timeout = setTimeout(() => {
		          return this._flush();
		        }, this.maxTime);
		      }
		      return ret;
		    }

		  }
		  Batcher.prototype.defaults = {
		    maxTime: null,
		    maxSize: null,
		    Promise: Promise
		  };

		  return Batcher;

		}).call(commonjsGlobal$1);

		var Batcher_1 = Batcher;

		var require$$4$1 = () => console.log('You must import the full version of Bottleneck in order to use this feature.');

		var require$$8 = getCjsExportFromNamespace(version$2);

		var Bottleneck, DEFAULT_PRIORITY$1, Events$4, Job$1, LocalDatastore$1, NUM_PRIORITIES$1, Queues$1, RedisDatastore$1, States$1, Sync$1, parser$5,
		  splice = [].splice;

		NUM_PRIORITIES$1 = 10;

		DEFAULT_PRIORITY$1 = 5;

		parser$5 = parser;

		Queues$1 = Queues_1;

		Job$1 = Job_1;

		LocalDatastore$1 = LocalDatastore_1;

		RedisDatastore$1 = require$$4$1;

		Events$4 = Events_1;

		States$1 = States_1;

		Sync$1 = Sync_1;

		Bottleneck = (function() {
		  class Bottleneck {
		    constructor(options = {}, ...invalid) {
		      var storeInstanceOptions, storeOptions;
		      this._addToQueue = this._addToQueue.bind(this);
		      this._validateOptions(options, invalid);
		      parser$5.load(options, this.instanceDefaults, this);
		      this._queues = new Queues$1(NUM_PRIORITIES$1);
		      this._scheduled = {};
		      this._states = new States$1(["RECEIVED", "QUEUED", "RUNNING", "EXECUTING"].concat(this.trackDoneStatus ? ["DONE"] : []));
		      this._limiter = null;
		      this.Events = new Events$4(this);
		      this._submitLock = new Sync$1("submit", this.Promise);
		      this._registerLock = new Sync$1("register", this.Promise);
		      storeOptions = parser$5.load(options, this.storeDefaults, {});
		      this._store = (function() {
		        if (this.datastore === "redis" || this.datastore === "ioredis" || (this.connection != null)) {
		          storeInstanceOptions = parser$5.load(options, this.redisStoreDefaults, {});
		          return new RedisDatastore$1(this, storeOptions, storeInstanceOptions);
		        } else if (this.datastore === "local") {
		          storeInstanceOptions = parser$5.load(options, this.localStoreDefaults, {});
		          return new LocalDatastore$1(this, storeOptions, storeInstanceOptions);
		        } else {
		          throw new Bottleneck.prototype.BottleneckError(`Invalid datastore type: ${this.datastore}`);
		        }
		      }).call(this);
		      this._queues.on("leftzero", () => {
		        var ref;
		        return (ref = this._store.heartbeat) != null ? typeof ref.ref === "function" ? ref.ref() : void 0 : void 0;
		      });
		      this._queues.on("zero", () => {
		        var ref;
		        return (ref = this._store.heartbeat) != null ? typeof ref.unref === "function" ? ref.unref() : void 0 : void 0;
		      });
		    }

		    _validateOptions(options, invalid) {
		      if (!((options != null) && typeof options === "object" && invalid.length === 0)) {
		        throw new Bottleneck.prototype.BottleneckError("Bottleneck v2 takes a single object argument. Refer to https://github.com/SGrondin/bottleneck#upgrading-to-v2 if you're upgrading from Bottleneck v1.");
		      }
		    }

		    ready() {
		      return this._store.ready;
		    }

		    clients() {
		      return this._store.clients;
		    }

		    channel() {
		      return `b_${this.id}`;
		    }

		    channel_client() {
		      return `b_${this.id}_${this._store.clientId}`;
		    }

		    publish(message) {
		      return this._store.__publish__(message);
		    }

		    disconnect(flush = true) {
		      return this._store.__disconnect__(flush);
		    }

		    chain(_limiter) {
		      this._limiter = _limiter;
		      return this;
		    }

		    queued(priority) {
		      return this._queues.queued(priority);
		    }

		    clusterQueued() {
		      return this._store.__queued__();
		    }

		    empty() {
		      return this.queued() === 0 && this._submitLock.isEmpty();
		    }

		    running() {
		      return this._store.__running__();
		    }

		    done() {
		      return this._store.__done__();
		    }

		    jobStatus(id) {
		      return this._states.jobStatus(id);
		    }

		    jobs(status) {
		      return this._states.statusJobs(status);
		    }

		    counts() {
		      return this._states.statusCounts();
		    }

		    _randomIndex() {
		      return Math.random().toString(36).slice(2);
		    }

		    check(weight = 1) {
		      return this._store.__check__(weight);
		    }

		    _clearGlobalState(index) {
		      if (this._scheduled[index] != null) {
		        clearTimeout(this._scheduled[index].expiration);
		        delete this._scheduled[index];
		        return true;
		      } else {
		        return false;
		      }
		    }

		    async _free(index, job, options, eventInfo) {
		      var e, running;
		      try {
		        ({running} = (await this._store.__free__(index, options.weight)));
		        this.Events.trigger("debug", `Freed ${options.id}`, eventInfo);
		        if (running === 0 && this.empty()) {
		          return this.Events.trigger("idle");
		        }
		      } catch (error1) {
		        e = error1;
		        return this.Events.trigger("error", e);
		      }
		    }

		    _run(index, job, wait) {
		      var clearGlobalState, free, run;
		      job.doRun();
		      clearGlobalState = this._clearGlobalState.bind(this, index);
		      run = this._run.bind(this, index, job);
		      free = this._free.bind(this, index, job);
		      return this._scheduled[index] = {
		        timeout: setTimeout(() => {
		          return job.doExecute(this._limiter, clearGlobalState, run, free);
		        }, wait),
		        expiration: job.options.expiration != null ? setTimeout(function() {
		          return job.doExpire(clearGlobalState, run, free);
		        }, wait + job.options.expiration) : void 0,
		        job: job
		      };
		    }

		    _drainOne(capacity) {
		      return this._registerLock.schedule(() => {
		        var args, index, next, options, queue;
		        if (this.queued() === 0) {
		          return this.Promise.resolve(null);
		        }
		        queue = this._queues.getFirst();
		        ({options, args} = next = queue.first());
		        if ((capacity != null) && options.weight > capacity) {
		          return this.Promise.resolve(null);
		        }
		        this.Events.trigger("debug", `Draining ${options.id}`, {args, options});
		        index = this._randomIndex();
		        return this._store.__register__(index, options.weight, options.expiration).then(({success, wait, reservoir}) => {
		          var empty;
		          this.Events.trigger("debug", `Drained ${options.id}`, {success, args, options});
		          if (success) {
		            queue.shift();
		            empty = this.empty();
		            if (empty) {
		              this.Events.trigger("empty");
		            }
		            if (reservoir === 0) {
		              this.Events.trigger("depleted", empty);
		            }
		            this._run(index, next, wait);
		            return this.Promise.resolve(options.weight);
		          } else {
		            return this.Promise.resolve(null);
		          }
		        });
		      });
		    }

		    _drainAll(capacity, total = 0) {
		      return this._drainOne(capacity).then((drained) => {
		        var newCapacity;
		        if (drained != null) {
		          newCapacity = capacity != null ? capacity - drained : capacity;
		          return this._drainAll(newCapacity, total + drained);
		        } else {
		          return this.Promise.resolve(total);
		        }
		      }).catch((e) => {
		        return this.Events.trigger("error", e);
		      });
		    }

		    _dropAllQueued(message) {
		      return this._queues.shiftAll(function(job) {
		        return job.doDrop({message});
		      });
		    }

		    stop(options = {}) {
		      var done, waitForExecuting;
		      options = parser$5.load(options, this.stopDefaults);
		      waitForExecuting = (at) => {
		        var finished;
		        finished = () => {
		          var counts;
		          counts = this._states.counts;
		          return (counts[0] + counts[1] + counts[2] + counts[3]) === at;
		        };
		        return new this.Promise((resolve, reject) => {
		          if (finished()) {
		            return resolve();
		          } else {
		            return this.on("done", () => {
		              if (finished()) {
		                this.removeAllListeners("done");
		                return resolve();
		              }
		            });
		          }
		        });
		      };
		      done = options.dropWaitingJobs ? (this._run = function(index, next) {
		        return next.doDrop({
		          message: options.dropErrorMessage
		        });
		      }, this._drainOne = () => {
		        return this.Promise.resolve(null);
		      }, this._registerLock.schedule(() => {
		        return this._submitLock.schedule(() => {
		          var k, ref, v;
		          ref = this._scheduled;
		          for (k in ref) {
		            v = ref[k];
		            if (this.jobStatus(v.job.options.id) === "RUNNING") {
		              clearTimeout(v.timeout);
		              clearTimeout(v.expiration);
		              v.job.doDrop({
		                message: options.dropErrorMessage
		              });
		            }
		          }
		          this._dropAllQueued(options.dropErrorMessage);
		          return waitForExecuting(0);
		        });
		      })) : this.schedule({
		        priority: NUM_PRIORITIES$1 - 1,
		        weight: 0
		      }, () => {
		        return waitForExecuting(1);
		      });
		      this._receive = function(job) {
		        return job._reject(new Bottleneck.prototype.BottleneckError(options.enqueueErrorMessage));
		      };
		      this.stop = () => {
		        return this.Promise.reject(new Bottleneck.prototype.BottleneckError("stop() has already been called"));
		      };
		      return done;
		    }

		    async _addToQueue(job) {
		      var args, blocked, error, options, reachedHWM, shifted, strategy;
		      ({args, options} = job);
		      try {
		        ({reachedHWM, blocked, strategy} = (await this._store.__submit__(this.queued(), options.weight)));
		      } catch (error1) {
		        error = error1;
		        this.Events.trigger("debug", `Could not queue ${options.id}`, {args, options, error});
		        job.doDrop({error});
		        return false;
		      }
		      if (blocked) {
		        job.doDrop();
		        return true;
		      } else if (reachedHWM) {
		        shifted = strategy === Bottleneck.prototype.strategy.LEAK ? this._queues.shiftLastFrom(options.priority) : strategy === Bottleneck.prototype.strategy.OVERFLOW_PRIORITY ? this._queues.shiftLastFrom(options.priority + 1) : strategy === Bottleneck.prototype.strategy.OVERFLOW ? job : void 0;
		        if (shifted != null) {
		          shifted.doDrop();
		        }
		        if ((shifted == null) || strategy === Bottleneck.prototype.strategy.OVERFLOW) {
		          if (shifted == null) {
		            job.doDrop();
		          }
		          return reachedHWM;
		        }
		      }
		      job.doQueue(reachedHWM, blocked);
		      this._queues.push(job);
		      await this._drainAll();
		      return reachedHWM;
		    }

		    _receive(job) {
		      if (this._states.jobStatus(job.options.id) != null) {
		        job._reject(new Bottleneck.prototype.BottleneckError(`A job with the same id already exists (id=${job.options.id})`));
		        return false;
		      } else {
		        job.doReceive();
		        return this._submitLock.schedule(this._addToQueue, job);
		      }
		    }

		    submit(...args) {
		      var cb, fn, job, options, ref, ref1, task;
		      if (typeof args[0] === "function") {
		        ref = args, [fn, ...args] = ref, [cb] = splice.call(args, -1);
		        options = parser$5.load({}, this.jobDefaults);
		      } else {
		        ref1 = args, [options, fn, ...args] = ref1, [cb] = splice.call(args, -1);
		        options = parser$5.load(options, this.jobDefaults);
		      }
		      task = (...args) => {
		        return new this.Promise(function(resolve, reject) {
		          return fn(...args, function(...args) {
		            return (args[0] != null ? reject : resolve)(args);
		          });
		        });
		      };
		      job = new Job$1(task, args, options, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);
		      job.promise.then(function(args) {
		        return typeof cb === "function" ? cb(...args) : void 0;
		      }).catch(function(args) {
		        if (Array.isArray(args)) {
		          return typeof cb === "function" ? cb(...args) : void 0;
		        } else {
		          return typeof cb === "function" ? cb(args) : void 0;
		        }
		      });
		      return this._receive(job);
		    }

		    schedule(...args) {
		      var job, options, task;
		      if (typeof args[0] === "function") {
		        [task, ...args] = args;
		        options = {};
		      } else {
		        [options, task, ...args] = args;
		      }
		      job = new Job$1(task, args, options, this.jobDefaults, this.rejectOnDrop, this.Events, this._states, this.Promise);
		      this._receive(job);
		      return job.promise;
		    }

		    wrap(fn) {
		      var schedule, wrapped;
		      schedule = this.schedule.bind(this);
		      wrapped = function(...args) {
		        return schedule(fn.bind(this), ...args);
		      };
		      wrapped.withOptions = function(options, ...args) {
		        return schedule(options, fn, ...args);
		      };
		      return wrapped;
		    }

		    async updateSettings(options = {}) {
		      await this._store.__updateSettings__(parser$5.overwrite(options, this.storeDefaults));
		      parser$5.overwrite(options, this.instanceDefaults, this);
		      return this;
		    }

		    currentReservoir() {
		      return this._store.__currentReservoir__();
		    }

		    incrementReservoir(incr = 0) {
		      return this._store.__incrementReservoir__(incr);
		    }

		  }
		  Bottleneck.default = Bottleneck;

		  Bottleneck.Events = Events$4;

		  Bottleneck.version = Bottleneck.prototype.version = require$$8.version;

		  Bottleneck.strategy = Bottleneck.prototype.strategy = {
		    LEAK: 1,
		    OVERFLOW: 2,
		    OVERFLOW_PRIORITY: 4,
		    BLOCK: 3
		  };

		  Bottleneck.BottleneckError = Bottleneck.prototype.BottleneckError = BottleneckError_1;

		  Bottleneck.Group = Bottleneck.prototype.Group = Group_1;

		  Bottleneck.RedisConnection = Bottleneck.prototype.RedisConnection = require$$2;

		  Bottleneck.IORedisConnection = Bottleneck.prototype.IORedisConnection = require$$3;

		  Bottleneck.Batcher = Bottleneck.prototype.Batcher = Batcher_1;

		  Bottleneck.prototype.jobDefaults = {
		    priority: DEFAULT_PRIORITY$1,
		    weight: 1,
		    expiration: null,
		    id: "<no-id>"
		  };

		  Bottleneck.prototype.storeDefaults = {
		    maxConcurrent: null,
		    minTime: 0,
		    highWater: null,
		    strategy: Bottleneck.prototype.strategy.LEAK,
		    penalty: null,
		    reservoir: null,
		    reservoirRefreshInterval: null,
		    reservoirRefreshAmount: null,
		    reservoirIncreaseInterval: null,
		    reservoirIncreaseAmount: null,
		    reservoirIncreaseMaximum: null
		  };

		  Bottleneck.prototype.localStoreDefaults = {
		    Promise: Promise,
		    timeout: null,
		    heartbeatInterval: 250
		  };

		  Bottleneck.prototype.redisStoreDefaults = {
		    Promise: Promise,
		    timeout: null,
		    heartbeatInterval: 5000,
		    clientTimeout: 10000,
		    Redis: null,
		    clientOptions: {},
		    clusterNodes: null,
		    clearDatastore: false,
		    connection: null
		  };

		  Bottleneck.prototype.instanceDefaults = {
		    datastore: "local",
		    connection: null,
		    id: "<no-id>",
		    rejectOnDrop: true,
		    trackDoneStatus: false,
		    Promise: Promise
		  };

		  Bottleneck.prototype.stopDefaults = {
		    enqueueErrorMessage: "This limiter has been stopped and cannot accept new jobs.",
		    dropWaitingJobs: true,
		    dropErrorMessage: "This limiter has been stopped."
		  };

		  return Bottleneck;

		}).call(commonjsGlobal$1);

		var Bottleneck_1 = Bottleneck;

		var lib = Bottleneck_1;

		return lib;

	}))); 
} (light));

var lightExports = light.exports;
const BottleneckLight = /*@__PURE__*/getDefaultExportFromCjs(lightExports);

// pkg/dist-src/index.js

// pkg/dist-src/error-request.js
async function errorRequest(state, octokit, error, options) {
  if (!error.request || !error.request.request) {
    throw error;
  }
  if (error.status >= 400 && !state.doNotRetry.includes(error.status)) {
    const retries = options.request.retries != null ? options.request.retries : state.retries;
    const retryAfter = Math.pow((options.request.retryCount || 0) + 1, 2);
    throw octokit.retry.retryRequest(error, retries, retryAfter);
  }
  throw error;
}
async function wrapRequest$1(state, octokit, request, options) {
  const limiter = new BottleneckLight();
  limiter.on("failed", function(error, info) {
    const maxRetries = ~~error.request.request.retries;
    const after = ~~error.request.request.retryAfter;
    options.request.retryCount = info.retryCount + 1;
    if (maxRetries > info.retryCount) {
      return after * state.retryAfterBaseValue;
    }
  });
  return limiter.schedule(
    requestWithGraphqlErrorHandling.bind(null, state, octokit, request),
    options
  );
}
async function requestWithGraphqlErrorHandling(state, octokit, request, options) {
  const response = await request(request, options);
  if (response.data && response.data.errors && /Something went wrong while executing your query/.test(
    response.data.errors[0].message
  )) {
    const error = new RequestError(response.data.errors[0].message, 500, {
      request: options,
      response
    });
    return errorRequest(state, octokit, error, options);
  }
  return response;
}

// pkg/dist-src/index.js
var VERSION$7 = "6.0.0";
function retry(octokit, octokitOptions) {
  const state = Object.assign(
    {
      enabled: true,
      retryAfterBaseValue: 1e3,
      doNotRetry: [400, 401, 403, 404, 422, 451],
      retries: 3
    },
    octokitOptions.retry
  );
  if (state.enabled) {
    octokit.hook.error("request", errorRequest.bind(null, state, octokit));
    octokit.hook.wrap("request", wrapRequest$1.bind(null, state, octokit));
  }
  return {
    retry: {
      retryRequest: (error, retries, retryAfter) => {
        error.request.request = Object.assign({}, error.request.request, {
          retries,
          retryAfter
        });
        return error;
      }
    }
  };
}
retry.VERSION = VERSION$7;

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$6 = "7.0.0";

// pkg/dist-src/wrap-request.js
var noop = () => Promise.resolve();
function wrapRequest(state, request, options) {
  return state.retryLimiter.schedule(doRequest, state, request, options);
}
async function doRequest(state, request, options) {
  const isWrite = options.method !== "GET" && options.method !== "HEAD";
  const { pathname } = new URL(options.url, "http://github.test");
  const isSearch = options.method === "GET" && pathname.startsWith("/search/");
  const isGraphQL = pathname.startsWith("/graphql");
  const retryCount = ~~request.retryCount;
  const jobOptions = retryCount > 0 ? { priority: 0, weight: 0 } : {};
  if (state.clustering) {
    jobOptions.expiration = 1e3 * 60;
  }
  if (isWrite || isGraphQL) {
    await state.write.key(state.id).schedule(jobOptions, noop);
  }
  if (isWrite && state.triggersNotification(pathname)) {
    await state.notifications.key(state.id).schedule(jobOptions, noop);
  }
  if (isSearch) {
    await state.search.key(state.id).schedule(jobOptions, noop);
  }
  const req = state.global.key(state.id).schedule(jobOptions, request, options);
  if (isGraphQL) {
    const res = await req;
    if (res.data.errors != null && // @ts-expect-error
    res.data.errors.some((error) => error.type === "RATE_LIMITED")) {
      const error = Object.assign(new Error("GraphQL Rate Limit Exceeded"), {
        response: res,
        data: res.data
      });
      throw error;
    }
  }
  return req;
}

// pkg/dist-src/generated/triggers-notification-paths.js
var triggers_notification_paths_default = [
  "/orgs/{org}/invitations",
  "/orgs/{org}/invitations/{invitation_id}",
  "/orgs/{org}/teams/{team_slug}/discussions",
  "/orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments",
  "/repos/{owner}/{repo}/collaborators/{username}",
  "/repos/{owner}/{repo}/commits/{commit_sha}/comments",
  "/repos/{owner}/{repo}/issues",
  "/repos/{owner}/{repo}/issues/{issue_number}/comments",
  "/repos/{owner}/{repo}/pulls",
  "/repos/{owner}/{repo}/pulls/{pull_number}/comments",
  "/repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies",
  "/repos/{owner}/{repo}/pulls/{pull_number}/merge",
  "/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers",
  "/repos/{owner}/{repo}/pulls/{pull_number}/reviews",
  "/repos/{owner}/{repo}/releases",
  "/teams/{team_id}/discussions",
  "/teams/{team_id}/discussions/{discussion_number}/comments"
];

// pkg/dist-src/route-matcher.js
function routeMatcher(paths) {
  const regexes = paths.map(
    (path) => path.split("/").map((c) => c.startsWith("{") ? "(?:.+?)" : c).join("/")
  );
  const regex2 = `^(?:${regexes.map((r) => `(?:${r})`).join("|")})[^/]*$`;
  return new RegExp(regex2, "i");
}

// pkg/dist-src/index.js
var regex = routeMatcher(triggers_notification_paths_default);
var triggersNotification = regex.test.bind(regex);
var groups = {};
var createGroups = function(Bottleneck, common) {
  groups.global = new Bottleneck.Group({
    id: "octokit-global",
    maxConcurrent: 10,
    ...common
  });
  groups.search = new Bottleneck.Group({
    id: "octokit-search",
    maxConcurrent: 1,
    minTime: 2e3,
    ...common
  });
  groups.write = new Bottleneck.Group({
    id: "octokit-write",
    maxConcurrent: 1,
    minTime: 1e3,
    ...common
  });
  groups.notifications = new Bottleneck.Group({
    id: "octokit-notifications",
    maxConcurrent: 1,
    minTime: 3e3,
    ...common
  });
};
function throttling(octokit, octokitOptions) {
  const {
    enabled = true,
    Bottleneck = BottleneckLight,
    id = "no-id",
    timeout = 1e3 * 60 * 2,
    // Redis TTL: 2 minutes
    connection
  } = octokitOptions.throttle || {};
  if (!enabled) {
    return {};
  }
  const common = { connection, timeout };
  if (groups.global == null) {
    createGroups(Bottleneck, common);
  }
  const state = Object.assign(
    {
      clustering: connection != null,
      triggersNotification,
      fallbackSecondaryRateRetryAfter: 60,
      retryAfterBaseValue: 1e3,
      retryLimiter: new Bottleneck(),
      id,
      ...groups
    },
    octokitOptions.throttle
  );
  if (typeof state.onSecondaryRateLimit !== "function" || typeof state.onRateLimit !== "function") {
    throw new Error(`octokit/plugin-throttling error:
        You must pass the onSecondaryRateLimit and onRateLimit error handlers.
        See https://octokit.github.io/rest.js/#throttling

        const octokit = new Octokit({
          throttle: {
            onSecondaryRateLimit: (retryAfter, options) => {/* ... */},
            onRateLimit: (retryAfter, options) => {/* ... */}
          }
        })
    `);
  }
  const events = {};
  const emitter = new Bottleneck.Events(events);
  events.on("secondary-limit", state.onSecondaryRateLimit);
  events.on("rate-limit", state.onRateLimit);
  events.on(
    "error",
    (e) => octokit.log.warn("Error in throttling-plugin limit handler", e)
  );
  state.retryLimiter.on("failed", async function(error, info) {
    const [state2, request, options] = info.args;
    const { pathname } = new URL(options.url, "http://github.test");
    const shouldRetryGraphQL = pathname.startsWith("/graphql") && error.status !== 401;
    if (!(shouldRetryGraphQL || error.status === 403)) {
      return;
    }
    const retryCount = ~~request.retryCount;
    request.retryCount = retryCount;
    options.request.retryCount = retryCount;
    const { wantRetry, retryAfter = 0 } = await async function() {
      if (/\bsecondary rate\b/i.test(error.message)) {
        const retryAfter2 = Number(error.response.headers["retry-after"]) || state2.fallbackSecondaryRateRetryAfter;
        const wantRetry2 = await emitter.trigger(
          "secondary-limit",
          retryAfter2,
          options,
          octokit,
          retryCount
        );
        return { wantRetry: wantRetry2, retryAfter: retryAfter2 };
      }
      if (error.response.headers != null && error.response.headers["x-ratelimit-remaining"] === "0") {
        const rateLimitReset = new Date(
          ~~error.response.headers["x-ratelimit-reset"] * 1e3
        ).getTime();
        const retryAfter2 = Math.max(
          Math.ceil((rateLimitReset - Date.now()) / 1e3),
          0
        );
        const wantRetry2 = await emitter.trigger(
          "rate-limit",
          retryAfter2,
          options,
          octokit,
          retryCount
        );
        return { wantRetry: wantRetry2, retryAfter: retryAfter2 };
      }
      return {};
    }();
    if (wantRetry) {
      request.retryCount++;
      return retryAfter * state2.retryAfterBaseValue;
    }
  });
  octokit.hook.wrap("request", wrapRequest.bind(null, state));
  return {};
}
throttling.VERSION = VERSION$6;
throttling.triggersNotification = triggersNotification;

const require$$2 = /*@__PURE__*/getAugmentedNamespace(distWeb$4);

var btoaBrowser = function _btoa(str) {
  return btoa(str)
};

const btoa2 = /*@__PURE__*/getDefaultExportFromCjs(btoaBrowser);

const VERSION$5 = "4.0.0";

// pkg/dist-src/index.js
function oauthAuthorizationUrl(options) {
  const clientType = options.clientType || "oauth-app";
  const baseUrl = options.baseUrl || "https://github.com";
  const result = {
    clientType,
    allowSignup: options.allowSignup === false ? false : true,
    clientId: options.clientId,
    login: options.login || null,
    redirectUrl: options.redirectUrl || null,
    state: options.state || Math.random().toString(36).substr(2),
    url: ""
  };
  if (clientType === "oauth-app") {
    const scopes = "scopes" in options ? options.scopes : [];
    result.scopes = typeof scopes === "string" ? scopes.split(/[,\s]+/).filter(Boolean) : scopes;
  }
  result.url = urlBuilderAuthorize(`${baseUrl}/login/oauth/authorize`, result);
  return result;
}
function urlBuilderAuthorize(base, options) {
  const map = {
    allowSignup: "allow_signup",
    clientId: "client_id",
    login: "login",
    redirectUrl: "redirect_uri",
    scopes: "scope",
    state: "state"
  };
  let url = base;
  Object.keys(map).filter((k) => options[k] !== null).filter((k) => {
    if (k !== "scopes")
      return true;
    if (options.clientType === "github-app")
      return false;
    return !Array.isArray(options[k]) || options[k].length > 0;
  }).map((key) => [map[key], `${options[key]}`]).forEach(([key, value], index) => {
    url += index === 0 ? `?` : "&";
    url += `${key}=${encodeURIComponent(value)}`;
  });
  return url;
}

function requestToOAuthBaseUrl(request) {
  const endpointDefaults = request.endpoint.DEFAULTS;
  return /^https:\/\/(api\.)?github\.com$/.test(endpointDefaults.baseUrl) ? "https://github.com" : endpointDefaults.baseUrl.replace("/api/v3", "");
}
async function oauthRequest(request, route, parameters) {
  const withOAuthParameters = {
    baseUrl: requestToOAuthBaseUrl(request),
    headers: {
      accept: "application/json"
    },
    ...parameters
  };
  const response = await request(route, withOAuthParameters);
  if ("error" in response.data) {
    const error = new RequestError(
      `${response.data.error_description} (${response.data.error}, ${response.data.error_uri})`,
      400,
      {
        request: request.endpoint.merge(
          route,
          withOAuthParameters
        ),
        headers: response.headers
      }
    );
    error.response = response;
    throw error;
  }
  return response;
}

function getWebFlowAuthorizationUrl({
  request: request$1 = request,
  ...options
}) {
  const baseUrl = requestToOAuthBaseUrl(request$1);
  return oauthAuthorizationUrl({
    ...options,
    baseUrl
  });
}

async function exchangeWebFlowCode(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const response = await oauthRequest(
    request$1,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      client_secret: options.clientSecret,
      code: options.code,
      redirect_uri: options.redirectUrl
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.access_token,
    scopes: response.data.scope.split(/\s+/).filter(Boolean)
  };
  if (options.clientType === "github-app") {
    if ("refresh_token" in response.data) {
      const apiTimeInMs = new Date(response.headers.date).getTime();
      authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp$2(
        apiTimeInMs,
        response.data.expires_in
      ), authentication.refreshTokenExpiresAt = toTimestamp$2(
        apiTimeInMs,
        response.data.refresh_token_expires_in
      );
    }
    delete authentication.scopes;
  }
  return { ...response, authentication };
}
function toTimestamp$2(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

async function createDeviceCode(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const parameters = {
    client_id: options.clientId
  };
  if ("scopes" in options && Array.isArray(options.scopes)) {
    parameters.scope = options.scopes.join(" ");
  }
  return oauthRequest(request$1, "POST /login/device/code", parameters);
}

async function exchangeDeviceCode(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const response = await oauthRequest(
    request$1,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      device_code: options.code,
      grant_type: "urn:ietf:params:oauth:grant-type:device_code"
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    token: response.data.access_token,
    scopes: response.data.scope.split(/\s+/).filter(Boolean)
  };
  if ("clientSecret" in options) {
    authentication.clientSecret = options.clientSecret;
  }
  if (options.clientType === "github-app") {
    if ("refresh_token" in response.data) {
      const apiTimeInMs = new Date(response.headers.date).getTime();
      authentication.refreshToken = response.data.refresh_token, authentication.expiresAt = toTimestamp$1(
        apiTimeInMs,
        response.data.expires_in
      ), authentication.refreshTokenExpiresAt = toTimestamp$1(
        apiTimeInMs,
        response.data.refresh_token_expires_in
      );
    }
    delete authentication.scopes;
  }
  return { ...response, authentication };
}
function toTimestamp$1(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

async function checkToken(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const response = await request$1("POST /applications/{client_id}/token", {
    headers: {
      authorization: `basic ${btoa2(
        `${options.clientId}:${options.clientSecret}`
      )}`
    },
    client_id: options.clientId,
    access_token: options.token
  });
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: options.token,
    scopes: response.data.scopes
  };
  if (response.data.expires_at)
    authentication.expiresAt = response.data.expires_at;
  if (options.clientType === "github-app") {
    delete authentication.scopes;
  }
  return { ...response, authentication };
}

async function refreshToken(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const response = await oauthRequest(
    request$1,
    "POST /login/oauth/access_token",
    {
      client_id: options.clientId,
      client_secret: options.clientSecret,
      grant_type: "refresh_token",
      refresh_token: options.refreshToken
    }
  );
  const apiTimeInMs = new Date(response.headers.date).getTime();
  const authentication = {
    clientType: "github-app",
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.access_token,
    refreshToken: response.data.refresh_token,
    expiresAt: toTimestamp(apiTimeInMs, response.data.expires_in),
    refreshTokenExpiresAt: toTimestamp(
      apiTimeInMs,
      response.data.refresh_token_expires_in
    )
  };
  return { ...response, authentication };
}
function toTimestamp(apiTimeInMs, expirationInSeconds) {
  return new Date(apiTimeInMs + expirationInSeconds * 1e3).toISOString();
}

async function scopeToken(options) {
  const {
    request: optionsRequest,
    clientType,
    clientId,
    clientSecret,
    token,
    ...requestOptions
  } = options;
  const request$1 = optionsRequest || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const response = await request$1(
    "POST /applications/{client_id}/token/scoped",
    {
      headers: {
        authorization: `basic ${btoa2(`${clientId}:${clientSecret}`)}`
      },
      client_id: clientId,
      access_token: token,
      ...requestOptions
    }
  );
  const authentication = Object.assign(
    {
      clientType,
      clientId,
      clientSecret,
      token: response.data.token
    },
    response.data.expires_at ? { expiresAt: response.data.expires_at } : {}
  );
  return { ...response, authentication };
}

async function resetToken(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const auth = btoa2(`${options.clientId}:${options.clientSecret}`);
  const response = await request$1(
    "PATCH /applications/{client_id}/token",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
  const authentication = {
    clientType: options.clientType,
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    token: response.data.token,
    scopes: response.data.scopes
  };
  if (response.data.expires_at)
    authentication.expiresAt = response.data.expires_at;
  if (options.clientType === "github-app") {
    delete authentication.scopes;
  }
  return { ...response, authentication };
}

async function deleteToken(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const auth = btoa2(`${options.clientId}:${options.clientSecret}`);
  return request$1(
    "DELETE /applications/{client_id}/token",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
}

async function deleteAuthorization(options) {
  const request$1 = options.request || /* istanbul ignore next: we always pass a custom request in tests */
  request;
  const auth = btoa2(`${options.clientId}:${options.clientSecret}`);
  return request$1(
    "DELETE /applications/{client_id}/grant",
    {
      headers: {
        authorization: `basic ${auth}`
      },
      client_id: options.clientId,
      access_token: options.token
    }
  );
}

const distSrc = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  VERSION: VERSION$5,
  checkToken,
  createDeviceCode,
  deleteAuthorization,
  deleteToken,
  exchangeDeviceCode,
  exchangeWebFlowCode,
  getWebFlowAuthorizationUrl,
  refreshToken,
  resetToken,
  scopeToken
}, Symbol.toStringTag, { value: 'Module' }));

// pkg/dist-src/index.js
async function getOAuthAccessToken(state, options) {
  const cachedAuthentication = getCachedAuthentication(state, options.auth);
  if (cachedAuthentication)
    return cachedAuthentication;
  const { data: verification } = await createDeviceCode({
    clientType: state.clientType,
    clientId: state.clientId,
    request: options.request || state.request,
    // @ts-expect-error the extra code to make TS happy is not worth it
    scopes: options.auth.scopes || state.scopes
  });
  await state.onVerification(verification);
  const authentication = await waitForAccessToken(
    options.request || state.request,
    state.clientId,
    state.clientType,
    verification
  );
  state.authentication = authentication;
  return authentication;
}
function getCachedAuthentication(state, auth2) {
  if (auth2.refresh === true)
    return false;
  if (!state.authentication)
    return false;
  if (state.clientType === "github-app") {
    return state.authentication;
  }
  const authentication = state.authentication;
  const newScope = ("scopes" in auth2 && auth2.scopes || state.scopes).join(
    " "
  );
  const currentScope = authentication.scopes.join(" ");
  return newScope === currentScope ? authentication : false;
}
async function wait(seconds) {
  await new Promise((resolve) => setTimeout(resolve, seconds * 1e3));
}
async function waitForAccessToken(request, clientId, clientType, verification) {
  try {
    const options = {
      clientId,
      request,
      code: verification.device_code
    };
    const { authentication } = clientType === "oauth-app" ? await exchangeDeviceCode({
      ...options,
      clientType: "oauth-app"
    }) : await exchangeDeviceCode({
      ...options,
      clientType: "github-app"
    });
    return {
      type: "token",
      tokenType: "oauth",
      ...authentication
    };
  } catch (error) {
    if (!error.response)
      throw error;
    const errorType = error.response.data.error;
    if (errorType === "authorization_pending") {
      await wait(verification.interval);
      return waitForAccessToken(request, clientId, clientType, verification);
    }
    if (errorType === "slow_down") {
      await wait(verification.interval + 5);
      return waitForAccessToken(request, clientId, clientType, verification);
    }
    throw error;
  }
}

// pkg/dist-src/auth.js
async function auth$3(state, authOptions) {
  return getOAuthAccessToken(state, {
    auth: authOptions
  });
}

// pkg/dist-src/hook.js
async function hook$3(state, request, route, parameters) {
  let endpoint = request.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint.url)) {
    return request(endpoint);
  }
  const { token } = await getOAuthAccessToken(state, {
    request,
    auth: { type: "oauth" }
  });
  endpoint.headers.authorization = `token ${token}`;
  return request(endpoint);
}

// pkg/dist-src/version.js
var VERSION$4 = "6.0.0";

// pkg/dist-src/index.js
function createOAuthDeviceAuth(options) {
  const requestWithDefaults = options.request || request.defaults({
    headers: {
      "user-agent": `octokit-auth-oauth-device.js/${VERSION$4} ${getUserAgent()}`
    }
  });
  const { request: request$1 = requestWithDefaults, ...otherOptions } = options;
  const state = options.clientType === "github-app" ? {
    ...otherOptions,
    clientType: "github-app",
    request: request$1
  } : {
    ...otherOptions,
    clientType: "oauth-app",
    request: request$1,
    scopes: options.scopes || []
  };
  if (!options.clientId) {
    throw new Error(
      '[@octokit/auth-oauth-device] "clientId" option must be set (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  }
  if (!options.onVerification) {
    throw new Error(
      '[@octokit/auth-oauth-device] "onVerification" option must be a function (https://github.com/octokit/auth-oauth-device.js#usage)'
    );
  }
  return Object.assign(auth$3.bind(null, state), {
    hook: hook$3.bind(null, state)
  });
}

// pkg/dist-src/index.js

// pkg/dist-src/version.js
var VERSION$3 = "4.0.0";
async function getAuthentication(state) {
  if ("code" in state.strategyOptions) {
    const { authentication } = await exchangeWebFlowCode({
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions,
      request: state.request
    });
    return {
      type: "token",
      tokenType: "oauth",
      ...authentication
    };
  }
  if ("onVerification" in state.strategyOptions) {
    const deviceAuth = createOAuthDeviceAuth({
      clientType: state.clientType,
      clientId: state.clientId,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions,
      request: state.request
    });
    const authentication = await deviceAuth({
      type: "oauth"
    });
    return {
      clientSecret: state.clientSecret,
      ...authentication
    };
  }
  if ("token" in state.strategyOptions) {
    return {
      type: "token",
      tokenType: "oauth",
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      onTokenCreated: state.onTokenCreated,
      ...state.strategyOptions
    };
  }
  throw new Error("[@octokit/auth-oauth-user] Invalid strategy options");
}
async function auth$2(state, options = {}) {
  if (!state.authentication) {
    state.authentication = state.clientType === "oauth-app" ? await getAuthentication(state) : await getAuthentication(state);
  }
  if (state.authentication.invalid) {
    throw new Error("[@octokit/auth-oauth-user] Token is invalid");
  }
  const currentAuthentication = state.authentication;
  if ("expiresAt" in currentAuthentication) {
    if (options.type === "refresh" || new Date(currentAuthentication.expiresAt) < /* @__PURE__ */ new Date()) {
      const { authentication } = await refreshToken({
        clientType: "github-app",
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        refreshToken: currentAuthentication.refreshToken,
        request: state.request
      });
      state.authentication = {
        tokenType: "oauth",
        type: "token",
        ...authentication
      };
    }
  }
  if (options.type === "refresh") {
    if (state.clientType === "oauth-app") {
      throw new Error(
        "[@octokit/auth-oauth-user] OAuth Apps do not support expiring tokens"
      );
    }
    if (!currentAuthentication.hasOwnProperty("expiresAt")) {
      throw new Error("[@octokit/auth-oauth-user] Refresh token missing");
    }
    await state.onTokenCreated?.(state.authentication, {
      type: options.type
    });
  }
  if (options.type === "check" || options.type === "reset") {
    const method = options.type === "check" ? checkToken : resetToken;
    try {
      const { authentication } = await method({
        // @ts-expect-error making TS happy would require unnecessary code so no
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: state.authentication.token,
        request: state.request
      });
      state.authentication = {
        tokenType: "oauth",
        type: "token",
        // @ts-expect-error TBD
        ...authentication
      };
      if (options.type === "reset") {
        await state.onTokenCreated?.(state.authentication, {
          type: options.type
        });
      }
      return state.authentication;
    } catch (error) {
      if (error.status === 404) {
        error.message = "[@octokit/auth-oauth-user] Token is invalid";
        state.authentication.invalid = true;
      }
      throw error;
    }
  }
  if (options.type === "delete" || options.type === "deleteAuthorization") {
    const method = options.type === "delete" ? deleteToken : deleteAuthorization;
    try {
      await method({
        // @ts-expect-error making TS happy would require unnecessary code so no
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: state.authentication.token,
        request: state.request
      });
    } catch (error) {
      if (error.status !== 404)
        throw error;
    }
    state.authentication.invalid = true;
    return state.authentication;
  }
  return state.authentication;
}

// pkg/dist-src/requires-basic-auth.js
var ROUTES_REQUIRING_BASIC_AUTH = /\/applications\/[^/]+\/(token|grant)s?/;
function requiresBasicAuth(url) {
  return url && ROUTES_REQUIRING_BASIC_AUTH.test(url);
}

// pkg/dist-src/hook.js
async function hook$2(state, request, route, parameters = {}) {
  const endpoint = request.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint.url)) {
    return request(endpoint);
  }
  if (requiresBasicAuth(endpoint.url)) {
    const credentials = btoa2(`${state.clientId}:${state.clientSecret}`);
    endpoint.headers.authorization = `basic ${credentials}`;
    return request(endpoint);
  }
  const { token } = state.clientType === "oauth-app" ? await auth$2({ ...state, request }) : await auth$2({ ...state, request });
  endpoint.headers.authorization = "token " + token;
  return request(endpoint);
}

// pkg/dist-src/index.js
function createOAuthUserAuth({
  clientId,
  clientSecret,
  clientType = "oauth-app",
  request: request$1 = request.defaults({
    headers: {
      "user-agent": `octokit-auth-oauth-app.js/${VERSION$3} ${getUserAgent()}`
    }
  }),
  onTokenCreated,
  ...strategyOptions
}) {
  const state = Object.assign({
    clientType,
    clientId,
    clientSecret,
    onTokenCreated,
    strategyOptions,
    request: request$1
  });
  return Object.assign(auth$2.bind(null, state), {
    // @ts-expect-error not worth the extra code needed to appease TS
    hook: hook$2.bind(null, state)
  });
}
createOAuthUserAuth.VERSION = VERSION$3;

const distWeb$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createOAuthUserAuth,
  requiresBasicAuth
}, Symbol.toStringTag, { value: 'Module' }));

// pkg/dist-src/index.js
async function auth$1(state, authOptions) {
  if (authOptions.type === "oauth-app") {
    return {
      type: "oauth-app",
      clientId: state.clientId,
      clientSecret: state.clientSecret,
      clientType: state.clientType,
      headers: {
        authorization: `basic ${btoa2(
          `${state.clientId}:${state.clientSecret}`
        )}`
      }
    };
  }
  if ("factory" in authOptions) {
    const { type, ...options } = {
      ...authOptions,
      ...state
    };
    return authOptions.factory(options);
  }
  const common = {
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.request,
    ...authOptions
  };
  const userAuth = state.clientType === "oauth-app" ? await createOAuthUserAuth({
    ...common,
    clientType: state.clientType
  }) : await createOAuthUserAuth({
    ...common,
    clientType: state.clientType
  });
  return userAuth();
}
async function hook$1(state, request2, route, parameters) {
  let endpoint = request2.endpoint.merge(
    route,
    parameters
  );
  if (/\/login\/(oauth\/access_token|device\/code)$/.test(endpoint.url)) {
    return request2(endpoint);
  }
  if (state.clientType === "github-app" && !requiresBasicAuth(endpoint.url)) {
    throw new Error(
      `[@octokit/auth-oauth-app] GitHub Apps cannot use their client ID/secret for basic authentication for endpoints other than "/applications/{client_id}/**". "${endpoint.method} ${endpoint.url}" is not supported.`
    );
  }
  const credentials = btoa2(`${state.clientId}:${state.clientSecret}`);
  endpoint.headers.authorization = `basic ${credentials}`;
  try {
    return await request2(endpoint);
  } catch (error) {
    if (error.status !== 401)
      throw error;
    error.message = `[@octokit/auth-oauth-app] "${endpoint.method} ${endpoint.url}" does not support clientId/clientSecret basic authentication.`;
    throw error;
  }
}

// pkg/dist-src/version.js
var VERSION$2 = "7.0.0";
function createOAuthAppAuth(options) {
  const state = Object.assign(
    {
      request: request.defaults({
        headers: {
          "user-agent": `octokit-auth-oauth-app.js/${VERSION$2} ${getUserAgent()}`
        }
      }),
      clientType: "oauth-app"
    },
    options
  );
  return Object.assign(auth$1.bind(null, state), {
    hook: hook$1.bind(null, state)
  });
}

const distWeb$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createOAuthAppAuth,
  createOAuthUserAuth
}, Symbol.toStringTag, { value: 'Module' }));

const require$$0 = /*@__PURE__*/getAugmentedNamespace(distWeb$1);

const require$$3 = /*@__PURE__*/getAugmentedNamespace(distWeb$2);

const require$$1 = /*@__PURE__*/getAugmentedNamespace(distWeb$3);

const require$$4 = /*@__PURE__*/getAugmentedNamespace(distSrc);

// pkg/dist-src/auth.js
async function auth(reason) {
  return {
    type: "unauthenticated",
    reason
  };
}
function isRateLimitError(error) {
  if (error.status !== 403) {
    return false;
  }
  if (!error.response) {
    return false;
  }
  return error.response.headers["x-ratelimit-remaining"] === "0";
}
var REGEX_ABUSE_LIMIT_MESSAGE = /\babuse\b/i;
function isAbuseLimitError(error) {
  if (error.status !== 403) {
    return false;
  }
  return REGEX_ABUSE_LIMIT_MESSAGE.test(error.message);
}

// pkg/dist-src/hook.js
async function hook(reason, request, route, parameters) {
  const endpoint = request.endpoint.merge(
    route,
    parameters
  );
  return request(endpoint).catch((error) => {
    if (error.status === 404) {
      error.message = `Not found. May be due to lack of authentication. Reason: ${reason}`;
      throw error;
    }
    if (isRateLimitError(error)) {
      error.message = `API rate limit exceeded. This maybe caused by the lack of authentication. Reason: ${reason}`;
      throw error;
    }
    if (isAbuseLimitError(error)) {
      error.message = `You have triggered an abuse detection mechanism. This maybe caused by the lack of authentication. Reason: ${reason}`;
      throw error;
    }
    if (error.status === 401) {
      error.message = `Unauthorized. "${endpoint.method} ${endpoint.url}" failed most likely due to lack of authentication. Reason: ${reason}`;
      throw error;
    }
    if (error.status >= 400 && error.status < 500) {
      error.message = error.message.replace(
        /\.?$/,
        `. May be caused by lack of authentication (${reason}).`
      );
    }
    throw error;
  });
}

// pkg/dist-src/index.js
var createUnauthenticatedAuth = function createUnauthenticatedAuth2(options) {
  if (!options || !options.reason) {
    throw new Error(
      "[@octokit/auth-unauthenticated] No reason passed to createUnauthenticatedAuth"
    );
  }
  return Object.assign(auth.bind(null, options.reason), {
    hook: hook.bind(null, options.reason)
  });
};

const distWeb = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  createUnauthenticatedAuth
}, Symbol.toStringTag, { value: 'Module' }));

const require$$5 = /*@__PURE__*/getAugmentedNamespace(distWeb);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// pkg/dist-src/index.js
var dist_src_exports = {};
__export(dist_src_exports, {
  OAuthApp: () => OAuthApp$1,
  createAWSLambdaAPIGatewayV2Handler: () => createAWSLambdaAPIGatewayV2Handler,
  createNodeMiddleware: () => createNodeMiddleware,
  createWebWorkerHandler: () => createWebWorkerHandler,
  handleRequest: () => handleRequest,
  sendNodeResponse: () => sendResponse,
  unknownRouteResponse: () => unknownRouteResponse
});
var distNode = __toCommonJS(dist_src_exports);
var import_auth_oauth_app = require$$0;

// pkg/dist-src/version.js
var VERSION$1 = "6.0.0";

// pkg/dist-src/add-event-handler.js
function addEventHandler(state, eventName, eventHandler) {
  if (Array.isArray(eventName)) {
    for (const singleEventName of eventName) {
      addEventHandler(state, singleEventName, eventHandler);
    }
    return;
  }
  if (!state.eventHandlers[eventName]) {
    state.eventHandlers[eventName] = [];
  }
  state.eventHandlers[eventName].push(eventHandler);
}

// pkg/dist-src/oauth-app-octokit.js
var import_core = require$$1;
var import_universal_user_agent = require$$2;
var OAuthAppOctokit = import_core.Octokit.defaults({
  userAgent: `octokit-oauth-app.js/${VERSION$1} ${(0, import_universal_user_agent.getUserAgent)()}`
});

// pkg/dist-src/methods/get-user-octokit.js
var import_auth_oauth_user = require$$3;

// pkg/dist-src/emit-event.js
async function emitEvent(state, context) {
  const { name, action } = context;
  if (state.eventHandlers[`${name}.${action}`]) {
    for (const eventHandler of state.eventHandlers[`${name}.${action}`]) {
      await eventHandler(context);
    }
  }
  if (state.eventHandlers[name]) {
    for (const eventHandler of state.eventHandlers[name]) {
      await eventHandler(context);
    }
  }
}

// pkg/dist-src/methods/get-user-octokit.js
async function getUserOctokitWithState(state, options) {
  return state.octokit.auth({
    type: "oauth-user",
    ...options,
    async factory(options2) {
      const octokit = new state.Octokit({
        authStrategy: import_auth_oauth_user.createOAuthUserAuth,
        auth: options2
      });
      const authentication = await octokit.auth({
        type: "get"
      });
      await emitEvent(state, {
        name: "token",
        action: "created",
        token: authentication.token,
        scopes: authentication.scopes,
        authentication,
        octokit
      });
      return octokit;
    }
  });
}

// pkg/dist-src/methods/get-web-flow-authorization-url.js
var OAuthMethods = __toESM(require$$4);
function getWebFlowAuthorizationUrlWithState(state, options) {
  const optionsWithDefaults = {
    clientId: state.clientId,
    request: state.octokit.request,
    ...options,
    allowSignup: state.allowSignup ?? options.allowSignup,
    redirectUrl: options.redirectUrl ?? state.redirectUrl,
    scopes: options.scopes ?? state.defaultScopes
  };
  return OAuthMethods.getWebFlowAuthorizationUrl({
    clientType: state.clientType,
    ...optionsWithDefaults
  });
}

// pkg/dist-src/methods/create-token.js
var OAuthAppAuth = __toESM(require$$0);
async function createTokenWithState(state, options) {
  const authentication = await state.octokit.auth({
    type: "oauth-user",
    ...options
  });
  await emitEvent(state, {
    name: "token",
    action: "created",
    token: authentication.token,
    scopes: authentication.scopes,
    authentication,
    octokit: new state.Octokit({
      authStrategy: OAuthAppAuth.createOAuthUserAuth,
      auth: {
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: authentication.token,
        scopes: authentication.scopes,
        refreshToken: authentication.refreshToken,
        expiresAt: authentication.expiresAt,
        refreshTokenExpiresAt: authentication.refreshTokenExpiresAt
      }
    })
  });
  return { authentication };
}

// pkg/dist-src/methods/check-token.js
var OAuthMethods2 = __toESM(require$$4);
async function checkTokenWithState(state, options) {
  const result = await OAuthMethods2.checkToken({
    // @ts-expect-error not worth the extra code to appease TS
    clientType: state.clientType,
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    ...options
  });
  Object.assign(result.authentication, { type: "token", tokenType: "oauth" });
  return result;
}

// pkg/dist-src/methods/reset-token.js
var OAuthMethods3 = __toESM(require$$4);
var import_auth_oauth_user2 = require$$3;
async function resetTokenWithState(state, options) {
  const optionsWithDefaults = {
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    ...options
  };
  if (state.clientType === "oauth-app") {
    const response2 = await OAuthMethods3.resetToken({
      clientType: "oauth-app",
      ...optionsWithDefaults
    });
    const authentication2 = Object.assign(response2.authentication, {
      type: "token",
      tokenType: "oauth"
    });
    await emitEvent(state, {
      name: "token",
      action: "reset",
      token: response2.authentication.token,
      scopes: response2.authentication.scopes || void 0,
      authentication: authentication2,
      octokit: new state.Octokit({
        authStrategy: import_auth_oauth_user2.createOAuthUserAuth,
        auth: {
          clientType: state.clientType,
          clientId: state.clientId,
          clientSecret: state.clientSecret,
          token: response2.authentication.token,
          scopes: response2.authentication.scopes
        }
      })
    });
    return { ...response2, authentication: authentication2 };
  }
  const response = await OAuthMethods3.resetToken({
    clientType: "github-app",
    ...optionsWithDefaults
  });
  const authentication = Object.assign(response.authentication, {
    type: "token",
    tokenType: "oauth"
  });
  await emitEvent(state, {
    name: "token",
    action: "reset",
    token: response.authentication.token,
    authentication,
    octokit: new state.Octokit({
      authStrategy: import_auth_oauth_user2.createOAuthUserAuth,
      auth: {
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: response.authentication.token
      }
    })
  });
  return { ...response, authentication };
}

// pkg/dist-src/methods/refresh-token.js
var OAuthMethods4 = __toESM(require$$4);
var import_auth_oauth_user3 = require$$3;
async function refreshTokenWithState(state, options) {
  if (state.clientType === "oauth-app") {
    throw new Error(
      "[@octokit/oauth-app] app.refreshToken() is not supported for OAuth Apps"
    );
  }
  const response = await OAuthMethods4.refreshToken({
    clientType: "github-app",
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    refreshToken: options.refreshToken
  });
  const authentication = Object.assign(response.authentication, {
    type: "token",
    tokenType: "oauth"
  });
  await emitEvent(state, {
    name: "token",
    action: "refreshed",
    token: response.authentication.token,
    authentication,
    octokit: new state.Octokit({
      authStrategy: import_auth_oauth_user3.createOAuthUserAuth,
      auth: {
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: response.authentication.token
      }
    })
  });
  return { ...response, authentication };
}

// pkg/dist-src/methods/scope-token.js
var OAuthMethods5 = __toESM(require$$4);
var import_auth_oauth_user4 = require$$3;
async function scopeTokenWithState(state, options) {
  if (state.clientType === "oauth-app") {
    throw new Error(
      "[@octokit/oauth-app] app.scopeToken() is not supported for OAuth Apps"
    );
  }
  const response = await OAuthMethods5.scopeToken({
    clientType: "github-app",
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    ...options
  });
  const authentication = Object.assign(response.authentication, {
    type: "token",
    tokenType: "oauth"
  });
  await emitEvent(state, {
    name: "token",
    action: "scoped",
    token: response.authentication.token,
    authentication,
    octokit: new state.Octokit({
      authStrategy: import_auth_oauth_user4.createOAuthUserAuth,
      auth: {
        clientType: state.clientType,
        clientId: state.clientId,
        clientSecret: state.clientSecret,
        token: response.authentication.token
      }
    })
  });
  return { ...response, authentication };
}

// pkg/dist-src/methods/delete-token.js
var OAuthMethods6 = __toESM(require$$4);
var import_auth_unauthenticated = require$$5;
async function deleteTokenWithState(state, options) {
  const optionsWithDefaults = {
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    ...options
  };
  const response = state.clientType === "oauth-app" ? await OAuthMethods6.deleteToken({
    clientType: "oauth-app",
    ...optionsWithDefaults
  }) : (
    // istanbul ignore next
    await OAuthMethods6.deleteToken({
      clientType: "github-app",
      ...optionsWithDefaults
    })
  );
  await emitEvent(state, {
    name: "token",
    action: "deleted",
    token: options.token,
    octokit: new state.Octokit({
      authStrategy: import_auth_unauthenticated.createUnauthenticatedAuth,
      auth: {
        reason: `Handling "token.deleted" event. The access for the token has been revoked.`
      }
    })
  });
  return response;
}

// pkg/dist-src/methods/delete-authorization.js
var OAuthMethods7 = __toESM(require$$4);
var import_auth_unauthenticated2 = require$$5;
async function deleteAuthorizationWithState(state, options) {
  const optionsWithDefaults = {
    clientId: state.clientId,
    clientSecret: state.clientSecret,
    request: state.octokit.request,
    ...options
  };
  const response = state.clientType === "oauth-app" ? await OAuthMethods7.deleteAuthorization({
    clientType: "oauth-app",
    ...optionsWithDefaults
  }) : (
    // istanbul ignore next
    await OAuthMethods7.deleteAuthorization({
      clientType: "github-app",
      ...optionsWithDefaults
    })
  );
  await emitEvent(state, {
    name: "token",
    action: "deleted",
    token: options.token,
    octokit: new state.Octokit({
      authStrategy: import_auth_unauthenticated2.createUnauthenticatedAuth,
      auth: {
        reason: `Handling "token.deleted" event. The access for the token has been revoked.`
      }
    })
  });
  await emitEvent(state, {
    name: "authorization",
    action: "deleted",
    token: options.token,
    octokit: new state.Octokit({
      authStrategy: import_auth_unauthenticated2.createUnauthenticatedAuth,
      auth: {
        reason: `Handling "authorization.deleted" event. The access for the app has been revoked.`
      }
    })
  });
  return response;
}

// pkg/dist-src/middleware/unknown-route-response.js
function unknownRouteResponse(request) {
  return {
    status: 404,
    headers: { "content-type": "application/json" },
    text: JSON.stringify({
      error: `Unknown route: ${request.method} ${request.url}`
    })
  };
}

// pkg/dist-src/middleware/handle-request.js
async function handleRequest(app, { pathPrefix = "/api/github/oauth" }, request) {
  if (request.method === "OPTIONS") {
    return {
      status: 200,
      headers: {
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "*",
        "access-control-allow-headers": "Content-Type, User-Agent, Authorization"
      }
    };
  }
  let { pathname } = new URL(request.url, "http://localhost");
  if (!pathname.startsWith(`${pathPrefix}/`)) {
    return void 0;
  }
  pathname = pathname.slice(pathPrefix.length + 1);
  const route = [request.method, pathname].join(" ");
  const routes = {
    getLogin: `GET login`,
    getCallback: `GET callback`,
    createToken: `POST token`,
    getToken: `GET token`,
    patchToken: `PATCH token`,
    patchRefreshToken: `PATCH refresh-token`,
    scopeToken: `POST token/scoped`,
    deleteToken: `DELETE token`,
    deleteGrant: `DELETE grant`
  };
  if (!Object.values(routes).includes(route)) {
    return unknownRouteResponse(request);
  }
  let json;
  try {
    const text = await request.text();
    json = text ? JSON.parse(text) : {};
  } catch (error) {
    return {
      status: 400,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      },
      text: JSON.stringify({
        error: "[@octokit/oauth-app] request error"
      })
    };
  }
  const { searchParams } = new URL(request.url, "http://localhost");
  const query = Object.fromEntries(searchParams);
  const headers = request.headers;
  try {
    if (route === routes.getLogin) {
      const { url } = app.getWebFlowAuthorizationUrl({
        state: query.state,
        scopes: query.scopes ? query.scopes.split(",") : void 0,
        allowSignup: query.allowSignup ? query.allowSignup === "true" : void 0,
        redirectUrl: query.redirectUrl
      });
      return { status: 302, headers: { location: url } };
    }
    if (route === routes.getCallback) {
      if (query.error) {
        throw new Error(
          `[@octokit/oauth-app] ${query.error} ${query.error_description}`
        );
      }
      if (!query.code) {
        throw new Error('[@octokit/oauth-app] "code" parameter is required');
      }
      const {
        authentication: { token: token2 }
      } = await app.createToken({
        code: query.code
      });
      return {
        status: 200,
        headers: {
          "content-type": "text/html"
        },
        text: `<h1>Token created successfully</h1>

<p>Your token is: <strong>${token2}</strong>. Copy it now as it cannot be shown again.</p>`
      };
    }
    if (route === routes.createToken) {
      const { code, redirectUrl } = json;
      if (!code) {
        throw new Error('[@octokit/oauth-app] "code" parameter is required');
      }
      const result = await app.createToken({
        code,
        redirectUrl
      });
      delete result.authentication.clientSecret;
      return {
        status: 201,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        },
        text: JSON.stringify(result)
      };
    }
    if (route === routes.getToken) {
      const token2 = headers.authorization?.substr("token ".length);
      if (!token2) {
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      }
      const result = await app.checkToken({
        token: token2
      });
      delete result.authentication.clientSecret;
      return {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        },
        text: JSON.stringify(result)
      };
    }
    if (route === routes.patchToken) {
      const token2 = headers.authorization?.substr("token ".length);
      if (!token2) {
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      }
      const result = await app.resetToken({ token: token2 });
      delete result.authentication.clientSecret;
      return {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        },
        text: JSON.stringify(result)
      };
    }
    if (route === routes.patchRefreshToken) {
      const token2 = headers.authorization?.substr("token ".length);
      if (!token2) {
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      }
      const { refreshToken: refreshToken2 } = json;
      if (!refreshToken2) {
        throw new Error(
          "[@octokit/oauth-app] refreshToken must be sent in request body"
        );
      }
      const result = await app.refreshToken({ refreshToken: refreshToken2 });
      delete result.authentication.clientSecret;
      return {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        },
        text: JSON.stringify(result)
      };
    }
    if (route === routes.scopeToken) {
      const token2 = headers.authorization?.substr("token ".length);
      if (!token2) {
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      }
      const result = await app.scopeToken({
        token: token2,
        ...json
      });
      delete result.authentication.clientSecret;
      return {
        status: 200,
        headers: {
          "content-type": "application/json",
          "access-control-allow-origin": "*"
        },
        text: JSON.stringify(result)
      };
    }
    if (route === routes.deleteToken) {
      const token2 = headers.authorization?.substr("token ".length);
      if (!token2) {
        throw new Error(
          '[@octokit/oauth-app] "Authorization" header is required'
        );
      }
      await app.deleteToken({
        token: token2
      });
      return {
        status: 204,
        headers: { "access-control-allow-origin": "*" }
      };
    }
    const token = headers.authorization?.substr("token ".length);
    if (!token) {
      throw new Error(
        '[@octokit/oauth-app] "Authorization" header is required'
      );
    }
    await app.deleteAuthorization({
      token
    });
    return {
      status: 204,
      headers: { "access-control-allow-origin": "*" }
    };
  } catch (error) {
    return {
      status: 400,
      headers: {
        "content-type": "application/json",
        "access-control-allow-origin": "*"
      },
      text: JSON.stringify({ error: error.message })
    };
  }
}

// pkg/dist-src/middleware/node/parse-request.js
function parseRequest(request) {
  const { method, url, headers } = request;
  async function text() {
    const text2 = await new Promise((resolve, reject) => {
      let bodyChunks = [];
      request.on("error", reject).on("data", (chunk) => bodyChunks.push(chunk)).on("end", () => resolve(Buffer.concat(bodyChunks).toString()));
    });
    return text2;
  }
  return { method, url, headers, text };
}

// pkg/dist-src/middleware/node/send-response.js
function sendResponse(octokitResponse, response) {
  response.writeHead(octokitResponse.status, octokitResponse.headers);
  response.end(octokitResponse.text);
}

// pkg/dist-src/middleware/node/index.js
function createNodeMiddleware(app, options = {}) {
  return async function(request, response, next) {
    const octokitRequest = await parseRequest(request);
    const octokitResponse = await handleRequest(app, options, octokitRequest);
    if (octokitResponse) {
      sendResponse(octokitResponse, response);
      return true;
    } else {
      next?.();
      return false;
    }
  };
}

// pkg/dist-src/middleware/web-worker/parse-request.js
function parseRequest2(request) {
  const headers = Object.fromEntries(request.headers.entries());
  return {
    method: request.method,
    url: request.url,
    headers,
    text: () => request.text()
  };
}

// pkg/dist-src/middleware/web-worker/send-response.js
function sendResponse2(octokitResponse) {
  return new Response(octokitResponse.text, {
    status: octokitResponse.status,
    headers: octokitResponse.headers
  });
}

// pkg/dist-src/middleware/web-worker/index.js
function createWebWorkerHandler(app, options = {}) {
  return async function(request) {
    const octokitRequest = await parseRequest2(request);
    const octokitResponse = await handleRequest(app, options, octokitRequest);
    return octokitResponse ? sendResponse2(octokitResponse) : void 0;
  };
}

// pkg/dist-src/middleware/aws-lambda/api-gateway-v2-parse-request.js
function parseRequest3(request) {
  const { method } = request.requestContext.http;
  let url = request.rawPath;
  const { stage } = request.requestContext;
  if (url.startsWith("/" + stage))
    url = url.substring(stage.length + 1);
  if (request.rawQueryString)
    url += "?" + request.rawQueryString;
  const headers = request.headers;
  const text = async () => request.body || "";
  return { method, url, headers, text };
}

// pkg/dist-src/middleware/aws-lambda/api-gateway-v2-send-response.js
function sendResponse3(octokitResponse) {
  return {
    statusCode: octokitResponse.status,
    headers: octokitResponse.headers,
    body: octokitResponse.text
  };
}

// pkg/dist-src/middleware/aws-lambda/api-gateway-v2.js
function createAWSLambdaAPIGatewayV2Handler(app, options = {}) {
  return async function(event) {
    const request = parseRequest3(event);
    const response = await handleRequest(app, options, request);
    return response ? sendResponse3(response) : void 0;
  };
}

// pkg/dist-src/index.js
var OAuthApp$1 = class OAuthApp {
  static {
    this.VERSION = VERSION$1;
  }
  static defaults(defaults) {
    const OAuthAppWithDefaults = class extends this {
      constructor(...args) {
        super({
          ...defaults,
          ...args[0]
        });
      }
    };
    return OAuthAppWithDefaults;
  }
  constructor(options) {
    const Octokit2 = options.Octokit || OAuthAppOctokit;
    this.type = options.clientType || "oauth-app";
    const octokit = new Octokit2({
      authStrategy: import_auth_oauth_app.createOAuthAppAuth,
      auth: {
        clientType: this.type,
        clientId: options.clientId,
        clientSecret: options.clientSecret
      }
    });
    const state = {
      clientType: this.type,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      // @ts-expect-error defaultScopes not permitted for GitHub Apps
      defaultScopes: options.defaultScopes || [],
      allowSignup: options.allowSignup,
      baseUrl: options.baseUrl,
      redirectUrl: options.redirectUrl,
      log: options.log,
      Octokit: Octokit2,
      octokit,
      eventHandlers: {}
    };
    this.on = addEventHandler.bind(null, state);
    this.octokit = octokit;
    this.getUserOctokit = getUserOctokitWithState.bind(null, state);
    this.getWebFlowAuthorizationUrl = getWebFlowAuthorizationUrlWithState.bind(
      null,
      state
    );
    this.createToken = createTokenWithState.bind(
      null,
      state
    );
    this.checkToken = checkTokenWithState.bind(
      null,
      state
    );
    this.resetToken = resetTokenWithState.bind(
      null,
      state
    );
    this.refreshToken = refreshTokenWithState.bind(
      null,
      state
    );
    this.scopeToken = scopeTokenWithState.bind(
      null,
      state
    );
    this.deleteToken = deleteTokenWithState.bind(null, state);
    this.deleteAuthorization = deleteAuthorizationWithState.bind(null, state);
  }
};

// pkg/dist-src/octokit.js

// pkg/dist-src/version.js
var VERSION = "3.1.0";
var Octokit = Octokit$1.plugin(
  restEndpointMethods,
  paginateRest,
  paginateGraphql,
  retry,
  throttling
).defaults({
  userAgent: `octokit.js/${VERSION}`,
  throttle: {
    onRateLimit,
    onSecondaryRateLimit
  }
});
function onRateLimit(retryAfter, options, octokit) {
  octokit.log.warn(
    `Request quota exhausted for request ${options.method} ${options.url}`
  );
  if (options.request.retryCount === 0) {
    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
    return true;
  }
}
function onSecondaryRateLimit(retryAfter, options, octokit) {
  octokit.log.warn(
    `SecondaryRateLimit detected for request ${options.method} ${options.url}`
  );
  if (options.request.retryCount === 0) {
    octokit.log.info(`Retrying after ${retryAfter} seconds!`);
    return true;
  }
}
var OAuthApp = distNode.OAuthApp.defaults({ Octokit });

const oAuthApp = new OAuthApp({
  clientId: "67cbeee99525d33512c3",
  clientSecret: "42894be74a63f4ad7d6536dcef849593dd7dfb6b",
  redirectUrl: "http://localhost:8080/callback/"
});

function get_cookie(cname) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; ++i) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
async function blockUser(id) {
  const p = new URLSearchParams([["user_id", id]]);
  await fetch("https://twitter.com/i/api/1.1/blocks/create.json", {
    headers: {
      authorization: "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
      "content-type": "application/x-www-form-urlencoded",
      "X-Csrf-Token": get_cookie("ct0"),
      "x-twitter-active-user": "yes",
      "x-twitter-auth-type": "OAuth2Session"
    },
    body: p.toString(),
    method: "POST"
  });
}

function extractUsernameFromTweet(elements) {
  const avatar = elements.querySelector(
    '[data-testid^="UserAvatar-Container-"]'
  );
  if (!avatar) {
    return;
  }
  const username = avatar.dataset.testid?.slice("UserAvatar-Container-".length);
  return username;
}
async function hideTweet(elements) {
  const db = await initIndexeddb();
  const list = await AsyncArray.filter(elements, async (it) => {
    if (it.style.display) {
      return false;
    }
    const username = extractUsernameFromTweet(it);
    if (!username) {
      return false;
    }
    const r = await db.countFromIndex("block", "username", username) > 0;
    return r;
  });
  if (list.length === 0) {
    return;
  }
  console.log("blockTweets: ", list);
  list.forEach((it) => it.style.display = "none");
}
function parseQuotesLink(quotesLink) {
  const u = new URL(quotesLink);
  const tweetId = u.pathname.split("/")[3];
  const username = u.pathname.split("/")[1];
  const link = quotesLink.slice(0, quotesLink.lastIndexOf("/"));
  return { link, tweetId, username };
}
async function createBlockIssue(tweet) {
  const auth = await Browser.storage.local.get(["refreshToken", "accessToken"]);
  if (!auth.refreshToken) {
    globalThis.open(
      oAuthApp.getWebFlowAuthorizationUrl({
        state: JSON.stringify(tweet)
      }).url,
      "_blank"
    );
    return;
  }
  const octokit = new Octokit({ auth: auth.accessToken });
  const owner = ({}).VITE_GITHUB_BLOCKLIST_OWNER;
  const repo = ({}).VITE_GITHUB_BLOCKLIST_REPO;
  const issues = await octokit.rest.search.issuesAndPullRequests({
    q: `repo:${owner}/${repo} ${tweet.userId} in:title type:issue`
  });
  if (issues.data.total_count > 0) {
    console.log("issue is exist");
    return;
  }
  await octokit.rest.issues.create({
    owner,
    repo,
    title: `Block ${tweet.userId} ${tweet.username}`,
    body: "```json\n" + JSON.stringify(tweet, void 0, 2) + `
\`\`\`
${tweet.link}`
  });
  console.log("issue created");
}
async function addBlockButton() {
  if (document.getElementById("block-and-report")) {
    return;
  }
  const menu = document.querySelector('[role="menu"]');
  if (!menu) {
    return;
  }
  const blockButton = menu.querySelector(
    '[role="menu"] [role="menuitem"][data-testid="block"]'
  );
  if (!blockButton) {
    return;
  }
  const newNode = blockButton.cloneNode(true);
  newNode.querySelector("div > div > span").textContent = "Block and report";
  newNode.id = "block-and-report";
  newNode.addEventListener("click", async (ev) => {
    const quotesLink = menu.querySelector(
      '[role="menuitem"][data-testid="tweetEngagements"]'
    ).href;
    const db = await initIndexeddb();
    const parsed = parseQuotesLink(quotesLink);
    const tweet = await db.get("tweet", parsed.tweetId);
    console.log("click", parsed, tweet);
    if (!tweet) {
      throw new Error("not found tweet");
    }
    if (await db.get("block", tweet.userId)) {
      console.log("block user exist");
      menu.parentElement.firstElementChild.click();
      return;
    }
    await Promise.all([
      blockUser(tweet.userId),
      createBlockIssue({
        ...tweet,
        link: parsed.link
      })
    ]);
    [...document.querySelectorAll('[data-testid="tweet"]')].forEach((it) => {
      const username = extractUsernameFromTweet(it);
      if (!username) {
        return;
      }
      if (username === tweet.username) {
        it.style.display = "none";
      }
    });
    alert("block success");
    menu.parentElement.firstElementChild.click();
  });
  const p = blockButton.parentElement;
  p.insertBefore(newNode, p.firstChild);
}
function hideBlockTweet() {
  return {
    name: "hideBlockTweet",
    description: t("plugin.hideBlockTweet.name"),
    default: true,
    async observer() {
      if (!/^\/.*\/status\/.*/.test(location.pathname)) {
        return;
      }
      const elements = [
        ...document.querySelectorAll('[data-testid="cellInnerDiv"]')
      ];
      if (elements.length === 0) {
        return;
      }
      await Promise.all([hideTweet(elements), addBlockButton()]);
    }
  };
}

function addCSS(css, tag = "") {
  const style = document.createElement("style");
  style.dataset.cleanTwitter = tag;
  style.textContent = css;
  document.head.appendChild(style);
}
function generateHideCSS(...selector) {
  return `${selector.join(",")}{ display: none !important; }`;
}
function cleanCSS(tag) {
  const selector = tag ? `style[data-clean-twitter="${tag}"]` : "style[data-clean-twitter]";
  [...document.querySelectorAll(selector)].forEach((it) => it.remove());
}

function hideBlueBadge() {
  return {
    name: "hideBlueBadge",
    description: t("plugin.hideBlueBadge.name"),
    default: true,
    init() {
      addCSS(
        generateHideCSS(
          `[aria-label="${t("symbol.Trending")}"] *:has(> [aria-label="${t(
            "symbol.VerifiedAccount"
          )}"])`,
          `[role="dialog"] *:has(> [href="/i/twitter_blue_sign_up"])`
        )
      );
    }
  };
}

function hideDiscoverMore() {
  return {
    name: "hideDiscoverMore",
    description: t("plugin.hideDiscoverMore.name"),
    default: true,
    // observer() {
    //   _hideDiscoverMore()
    // },
    init() {
      addCSS(
        generateHideCSS(
          `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div)`,
          `section div[data-testid=cellInnerDiv]:has(h2[role="heading"] + div) ~ div`
        )
      );
    }
  };
}

function hideSelectedFollowingTab() {
  addCSS(
    generateHideCSS('[role="tablist"]:has([href="/home"][role="tab"])'),
    "hideHomeTabs"
  );
  addCSS(
    `
    @media (max-width: 500px) {
      header[role="banner"] > * {
        height: 54px !important;
      }
    }
  `,
    "hideHomeTabs"
  );
}
function selectedFollowingTab() {
  const tabs = [
    ...document.querySelectorAll('[href="/home"][role="tab"]')
  ];
  if (tabs.length === 2 && tabs[1].getAttribute("aria-selected") === "false") {
    tabs[1].click();
  }
}
function hideTabs() {
  if (window.location.pathname !== "/home") {
    cleanCSS("hideHomeTabs");
    return;
  }
  if (!document.querySelector('style[data-clean-twitter="hideHomeTabs"]')) {
    hideSelectedFollowingTab();
  }
  selectedFollowingTab();
}
function hideHomeTabs() {
  return {
    name: "hideHomeTabs",
    description: t("plugin.hideHomeTabs.name"),
    default: true,
    init: hideTabs,
    observer: hideTabs
  };
}

function hideLive() {
  return {
    name: "hideLive",
    description: t("plugin.hideLive.name"),
    default: false,
    init() {
      addCSS(
        generateHideCSS(
          '[role="grid"]:has( > div > [aria-live="polite"] [data-testid="placementTracking"])'
        ),
        "hideLive"
      );
    }
  };
}

function hideOther() {
  return {
    name: "hideOther",
    description: t("plugin.hideOther.name"),
    default: true,
    init() {
      addCSS(
        generateHideCSS(
          `[aria-label="${t("symbol.CommunitiesNewItems")}"]`,
          `[aria-label="${t("symbol.Communities")}"]`,
          `[aria-label="${t("symbol.TwitterBlue")}"]`,
          `[aria-label="${t("symbol.Verified")}"]`,
          `[aria-label="${t("symbol.TimelineTrendingNow")}"]`,
          `[aria-label="${t("symbol.Trending")}"] *:has(> [aria-label="${t("symbol.WhoToFollow")}"])`,
          // `[aria-label="${t('symbol.SearchAndExplore')}"]`,
          `[aria-label="${t("symbol.VerifiedOrganizations")}"]`,
          // submean
          '* > [href="/i/verified-orgs-signup"]',
          '* > [href="/i/blue_sign_up"]',
          '* > [href="/i/verified-choose"]',
          '* > [href="/settings/monetization"]',
          // sidebar
          `[aria-label="${t("symbol.Trending")}"] > * > *:nth-child(3):not([aria-label="${t("symbol.Trending")}"] *:has(> [aria-label="${t(
            "symbol.VerifiedAccount"
          )}"]))`,
          `[aria-label="${t("symbol.Trending")}"] > * > *:nth-child(4)`,
          `[aria-label="${t("symbol.Trending")}"] > * > *:nth-child(5)`,
          // "Verified" tab
          '[role="presentation"]:has(> [href="/notifications/verified"][role="tab"])'
        )
      );
    }
  };
}

function hideRightSidebar() {
  return {
    name: "hideRightSidebar",
    description: t$1("plugin.hideRightSidebar.name"),
    default: false,
    init() {
      addCSS(
        generateHideCSS(
          // sidebar
          `[data-testid="sidebarColumn"]:has([aria-label="${t$1(
            "symbol.Trending"
          )}"])`
        )
      );
      addCSS(`
        /* Timeline */
        main *:has(> [aria-label="${t$1("symbol.HomeTimeline")}"]),
        [aria-label="${t$1("symbol.HomeTimeline")}"] > *:last-child
        {
            max-width: initial;
        }
        /* Toolbar */
        [data-testid="tweet"] [role="group"]:has([aria-label*="${t$1(
        "symbol.Toolbar.reply"
      )}"]):has([aria-label*="${t$1(
        "symbol.Toolbar.Retweet"
      )}"]):has([aria-label*="${t$1("symbol.Toolbar.likes")}"]) {
            max-width: initial;
        }
        /* Image */
        [data-testid="tweet"] div:has(> div> div > div > a[role="link"] > div [aria-label="${t$1(
        "symbol.Image"
      )}"]),
        [data-testid="tweet"] a[role="link"] > div:has([aria-label="${t$1(
        "symbol.Image"
      )}"]) {
            width: 100% !important;
            height: 100% !important;
        }
        /* Profile */
        div:has(> nav[aria-label="${t$1("symbol.ProfileTimelines")}"]) {
          max-width: initial;
        }
      `);
    }
  };
}

function hideSearchAndExplore() {
  return {
    name: "hideSearchAndExplore",
    description: t("plugin.hideSearchAndExplore.name"),
    default: false,
    init() {
      addCSS(generateHideCSS(`[aria-label="${t("symbol.SearchAndExplore")}"]`));
    }
  };
}

function hideTimelineExplore() {
  return {
    name: "hideTimelineExplore",
    description: t("plugin.hideTimelineExplore.name"),
    default: true,
    observer() {
      if (location.pathname !== "/explore") {
        cleanCSS("hideTimelineExplore");
        return;
      }
      if (document.querySelector(
        'style[data-clean-twitter="hideTimelineExplore"]'
      )) {
        return;
      }
      addCSS(
        generateHideCSS(
          `[aria-label="${t("symbol.HomeTimeline")}"] [aria-label="${t(
            "symbol.TimelineExplore"
          )}"]`,
          `[role="tablist"]:has(> [role="presentation"])`
        ),
        "hideTimelineExplore"
      );
    }
  };
}

function hideViewTweetAnalytics() {
  return {
    name: "hideViewTweetAnalytics",
    description: t("plugin.hideViewTweetAnalytics.name"),
    default: false,
    init() {
      addCSS(
        generateHideCSS(
          `[data-testid="tweet"] [role="group"]:has([aria-label*="${t(
            "symbol.Toolbar.reply"
          )}"]):has([aria-label*="${t(
            "symbol.Toolbar.likes"
          )}"]) div:has(> [href^="/"][href*="/status/"][href$="/analytics"])`
        )
      );
    }
  };
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 30px; height: 30px;" xml:space="preserve" viewBox="0 0 248 204">
<path fill="#1d9bf0" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
</svg>`;
function restoreLogo() {
  return {
    name: "restoreLogo",
    default: false,
    description: t("plugin.restoreLogo.name"),
    init: () => {
      const $logo = document.querySelector(
        'svg path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"]'
      );
      if ($logo) {
        $logo.outerHTML = svg;
      }
      const $ico = document.querySelector(`head>link[rel="shortcut icon"]`);
      if ($ico) {
        $ico.href = "//abs.twimg.com/favicons/twitter.ico";
      }
    },
    observer() {
      this.init?.();
    }
  };
}

var toggleSelection = function () {
  var selection = document.getSelection();
  if (!selection.rangeCount) {
    return function () {};
  }
  var active = document.activeElement;

  var ranges = [];
  for (var i = 0; i < selection.rangeCount; i++) {
    ranges.push(selection.getRangeAt(i));
  }

  switch (active.tagName.toUpperCase()) { // .toUpperCase handles XHTML
    case 'INPUT':
    case 'TEXTAREA':
      active.blur();
      break;

    default:
      active = null;
      break;
  }

  selection.removeAllRanges();
  return function () {
    selection.type === 'Caret' &&
    selection.removeAllRanges();

    if (!selection.rangeCount) {
      ranges.forEach(function(range) {
        selection.addRange(range);
      });
    }

    active &&
    active.focus();
  };
};

var deselectCurrent = toggleSelection;

var clipboardToIE11Formatting = {
  "text/plain": "Text",
  "text/html": "Url",
  "default": "Text"
};

var defaultMessage = "Copy to clipboard: #{key}, Enter";

function format(message) {
  var copyKey = (/mac os x/i.test(navigator.userAgent) ? "⌘" : "Ctrl") + "+C";
  return message.replace(/#{\s*key\s*}/g, copyKey);
}

function copy(text, options) {
  var debug,
    message,
    reselectPrevious,
    range,
    selection,
    mark,
    success = false;
  if (!options) {
    options = {};
  }
  debug = options.debug || false;
  try {
    reselectPrevious = deselectCurrent();

    range = document.createRange();
    selection = document.getSelection();

    mark = document.createElement("span");
    mark.textContent = text;
    // avoid screen readers from reading out loud the text
    mark.ariaHidden = "true";
    // reset user styles for span element
    mark.style.all = "unset";
    // prevents scrolling to the end of the page
    mark.style.position = "fixed";
    mark.style.top = 0;
    mark.style.clip = "rect(0, 0, 0, 0)";
    // used to preserve spaces and line breaks
    mark.style.whiteSpace = "pre";
    // do not inherit user-select (it may be `none`)
    mark.style.webkitUserSelect = "text";
    mark.style.MozUserSelect = "text";
    mark.style.msUserSelect = "text";
    mark.style.userSelect = "text";
    mark.addEventListener("copy", function(e) {
      e.stopPropagation();
      if (options.format) {
        e.preventDefault();
        if (typeof e.clipboardData === "undefined") { // IE 11
          debug && console.warn("unable to use e.clipboardData");
          debug && console.warn("trying IE specific stuff");
          window.clipboardData.clearData();
          var format = clipboardToIE11Formatting[options.format] || clipboardToIE11Formatting["default"];
          window.clipboardData.setData(format, text);
        } else { // all other browsers
          e.clipboardData.clearData();
          e.clipboardData.setData(options.format, text);
        }
      }
      if (options.onCopy) {
        e.preventDefault();
        options.onCopy(e.clipboardData);
      }
    });

    document.body.appendChild(mark);

    range.selectNodeContents(mark);
    selection.addRange(range);

    var successful = document.execCommand("copy");
    if (!successful) {
      throw new Error("copy command was unsuccessful");
    }
    success = true;
  } catch (err) {
    debug && console.error("unable to copy using execCommand: ", err);
    debug && console.warn("trying IE specific stuff");
    try {
      window.clipboardData.setData(options.format || "text", text);
      options.onCopy && options.onCopy(window.clipboardData);
      success = true;
    } catch (err) {
      debug && console.error("unable to copy using clipboardData: ", err);
      debug && console.error("falling back to prompt");
      message = format("message" in options ? options.message : defaultMessage);
      window.prompt(message, text);
    }
  } finally {
    if (selection) {
      if (typeof selection.removeRange == "function") {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }

    if (mark) {
      document.body.removeChild(mark);
    }
    reselectPrevious();
  }

  return success;
}

var copyToClipboard = copy;

const writeText = /*@__PURE__*/getDefaultExportFromCjs(copyToClipboard);

let lastClickShareTweet;
function listenTweetShareClick(tweet) {
  if (tweet.querySelector('[role="group"] [data-restore-share-link="true"]')) {
    return;
  }
  const shareButton = tweet.querySelector(
    '[role="group"]  div + svg:has(path[d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"],path[d="M17 4c-1.1 0-2 .9-2 2 0 .33.08.65.22.92C15.56 7.56 16.23 8 17 8c1.1 0 2-.9 2-2s-.9-2-2-2zm-4 2c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4c-1.17 0-2.22-.5-2.95-1.3l-4.16 2.37c.07.3.11.61.11.93s-.04.63-.11.93l4.16 2.37c.73-.8 1.78-1.3 2.95-1.3 2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4c0-.32.04-.63.11-.93L8.95 14.7C8.22 15.5 7.17 16 6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4c1.17 0 2.22.5 2.95 1.3l4.16-2.37c-.07-.3-.11-.61-.11-.93zm-7 4c-1.1 0-2 .9-2 2s.9 2 2 2c.77 0 1.44-.44 1.78-1.08.14-.27.22-.59.22-.92s-.08-.65-.22-.92C7.44 10.44 6.77 10 6 10zm11 6c-.77 0-1.44.44-1.78 1.08-.14.27-.22.59-.22.92 0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2z"])'
  );
  if (!shareButton) {
    return;
  }
  shareButton.dataset.restoreShareLink = "true";
  const link = tweet.querySelector(
    'a[role="link"][href*="/status/"]:has(time)'
  );
  const shareLink = link.href;
  shareButton.addEventListener("click", () => {
    lastClickShareTweet = shareLink;
  });
}
function addShareLink() {
  if (!lastClickShareTweet) {
    return;
  }
  if (document.getElementById("clone-share-link")) {
    return;
  }
  const menu = document.querySelector('[role="menu"]');
  if (!menu) {
    return;
  }
  const shareButton = menu.querySelector(
    '[role="menuitem"]:has([d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"])'
  );
  if (!shareButton) {
    return;
  }
  shareButton.addEventListener("click", async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    console.log("copy link", lastClickShareTweet, writeText(lastClickShareTweet));
  });
}
function restoreShareLink() {
  return {
    name: "restoreShareLink",
    description: t("plugin.restoreShareLink.name"),
    default: false,
    observer() {
      const elements = [
        ...document.querySelectorAll('[data-testid="cellInnerDiv"]')
      ];
      if (elements.length === 0) {
        return;
      }
      elements.forEach(listenTweetShareClick);
      addShareLink();
    }
  };
}

const plugins = () => [
  hideBlueBadge(),
  hideDiscoverMore(),
  hideHomeTabs(),
  hideRightSidebar(),
  hideSearchAndExplore(),
  hideTimelineExplore(),
  hideViewTweetAnalytics(),
  hideOther(),
  hideLive(),
  restoreLogo(),
  hideBlockTweet(),
  restoreShareLink()
];

const defaultConfig = plugins().reduce(
  (acc, it) => ({ ...acc, [it.name]: it.default }),
  {
    language: navigator.language
  }
);
async function getConfig() {
  return {
    ...defaultConfig,
    ...await Browser.storage.sync.get([
      ...plugins().map((it) => it.name),
      "language"
    ])
  };
}
async function setConfig(config) {
  await Browser.storage.sync.set(config);
}

function useConfig() {
  const [v, set] = reactExports.useState(defaultConfig);
  useMount(async () => {
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
function App() {
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

const index = '';

client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
