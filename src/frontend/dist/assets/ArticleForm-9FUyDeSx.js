var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
import { r as reactExports, a0 as useComposedRefs, j as jsxRuntimeExports, o as cn, aa as commonjsGlobal, ab as getDefaultExportFromCjs, R as React2, B as Button, z as Link$1, ac as InlineError, m as ExternalBlob } from "./index-DFD0n_pv.js";
import { I as Input$1 } from "./input-Crts3Czv.js";
import { L as Label } from "./label-Cinostae.js";
import { a as useControllableState, P as Primitive, b as composeEventHandlers, d as createContextScope } from "./index-DFU6Mb5z.js";
import { a as usePrevious, u as useSize } from "./index-DJ2rq8KF.js";
import { A as ArrowLeft, X } from "./x-BNp8OIQ4.js";
import { I as Image$2, U as Upload } from "./upload-CX98jBth.js";
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
var nativeObjectToString$1 = objectProto$f.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$c.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$e = Object.prototype;
var nativeObjectToString = objectProto$e.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isArray = Array.isArray;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$d = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$b = objectProto$d.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$b).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap$1 = getNative(root, "WeakMap");
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var setToString = shortOut(baseSetToString);
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$c = Object.prototype;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$a.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var objectProto$b = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$b;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$3 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$3;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$9 = objectProto$a.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$9.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var argsTag$2 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", errorTag$2 = "[object Error]", funcTag$1 = "[object Function]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$2] = typedArrayTags[arrayTag$2] = typedArrayTags[arrayBufferTag$3] = typedArrayTags[boolTag$3] = typedArrayTags[dataViewTag$4] = typedArrayTags[dateTag$3] = typedArrayTags[errorTag$2] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$5] = typedArrayTags[numberTag$3] = typedArrayTags[objectTag$4] = typedArrayTags[regexpTag$3] = typedArrayTags[setTag$5] = typedArrayTags[stringTag$3] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var objectProto$9 = Object.prototype;
var hasOwnProperty$8 = objectProto$9.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$8.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$7.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$6.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$5.call(data, key) ? data[key] : void 0;
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root, "Map");
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$4 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$3.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$3 = Object.prototype;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
var DataView = getNative(root, "DataView");
var Promise$1 = getNative(root, "Promise");
var Set$1 = getNative(root, "Set");
var mapTag$4 = "[object Map]", objectTag$2 = "[object Object]", promiseTag = "[object Promise]", setTag$4 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$3 = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag$3 || Map$1 && getTag(new Map$1()) != mapTag$4 || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$4 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$3;
        case mapCtorString:
          return mapTag$4;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$4;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$2.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$1 = root.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = cloneArrayBuffer(dataView.buffer);
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf$1 = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$2:
      return cloneArrayBuffer(object);
    case boolTag$2:
    case dateTag$2:
      return new Ctor(+object);
    case dataViewTag$2:
      return cloneDataView(object);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$3:
      return new Ctor();
    case numberTag$2:
    case stringTag$2:
      return new Ctor(object);
    case regexpTag$2:
      return cloneRegExp(object);
    case setTag$3:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
var mapTag$2 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag$2;
}
var nodeIsMap = nodeUtil && nodeUtil.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
var setTag$2 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag$2;
}
var nodeIsSet = nodeUtil && nodeUtil.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
var CLONE_DEEP_FLAG$1 = 1;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag$1 = "[object Map]", numberTag$1 = "[object Number]", objectTag$1 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$1 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$1] = cloneableTags[arrayTag$1] = cloneableTags[arrayBufferTag$1] = cloneableTags[dataViewTag$1] = cloneableTags[boolTag$1] = cloneableTags[dateTag$1] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag$1] = cloneableTags[numberTag$1] = cloneableTags[objectTag$1] = cloneableTags[regexpTag$1] = cloneableTags[setTag$1] = cloneableTags[stringTag$1] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag$1] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1;
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
  } else {
    var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag$1 || tag == argsTag$1 || isFunc && !object) {
      result = isFunc ? {} : initCloneObject(value);
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = getAllKeys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep$1(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache, key) {
  return cache.has(key);
}
var COMPARE_PARTIAL_FLAG$3 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$1 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
function mapToArray(map) {
  var index = -1, result = Array(map.size);
  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$2 = 1, COMPARE_UNORDERED_FLAG = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]";
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag:
      var convert = mapToArray;
    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
var COMPARE_PARTIAL_FLAG$1 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var COMPARE_PARTIAL_FLAG = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
function isEqual$2(value, other) {
  return baseIsEqual(value, other);
}
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var Scope = /* @__PURE__ */ ((Scope2) => (Scope2[Scope2.TYPE = 3] = "TYPE", Scope2[Scope2.LEVEL = 12] = "LEVEL", Scope2[Scope2.ATTRIBUTE = 13] = "ATTRIBUTE", Scope2[Scope2.BLOT = 14] = "BLOT", Scope2[Scope2.INLINE = 7] = "INLINE", Scope2[Scope2.BLOCK = 11] = "BLOCK", Scope2[Scope2.BLOCK_BLOT = 10] = "BLOCK_BLOT", Scope2[Scope2.INLINE_BLOT = 6] = "INLINE_BLOT", Scope2[Scope2.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", Scope2[Scope2.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", Scope2[Scope2.ANY = 15] = "ANY", Scope2))(Scope || {});
class Attributor {
  constructor(attrName, keyName, options = {}) {
    this.attrName = attrName, this.keyName = keyName;
    const attributeBit = Scope.TYPE & Scope.ATTRIBUTE;
    this.scope = options.scope != null ? (
      // Ignore type bits, force attribute bit
      options.scope & Scope.LEVEL | attributeBit
    ) : Scope.ATTRIBUTE, options.whitelist != null && (this.whitelist = options.whitelist);
  }
  static keys(node) {
    return Array.from(node.attributes).map((item) => item.name);
  }
  add(node, value) {
    return this.canAdd(node, value) ? (node.setAttribute(this.keyName, value), true) : false;
  }
  canAdd(_node, value) {
    return this.whitelist == null ? true : typeof value == "string" ? this.whitelist.indexOf(value.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(value) > -1;
  }
  remove(node) {
    node.removeAttribute(this.keyName);
  }
  value(node) {
    const value = node.getAttribute(this.keyName);
    return this.canAdd(node, value) && value ? value : "";
  }
}
class ParchmentError extends Error {
  constructor(message) {
    message = "[Parchment] " + message, super(message), this.message = message, this.name = this.constructor.name;
  }
}
const _Registry = class _Registry2 {
  constructor() {
    this.attributes = {}, this.classes = {}, this.tags = {}, this.types = {};
  }
  static find(node, bubble = false) {
    if (node == null)
      return null;
    if (this.blots.has(node))
      return this.blots.get(node) || null;
    if (bubble) {
      let parentNode = null;
      try {
        parentNode = node.parentNode;
      } catch {
        return null;
      }
      return this.find(parentNode, bubble);
    }
    return null;
  }
  create(scroll, input, value) {
    const match2 = this.query(input);
    if (match2 == null)
      throw new ParchmentError(`Unable to create ${input} blot`);
    const blotClass = match2, node = (
      // @ts-expect-error Fix me later
      input instanceof Node || input.nodeType === Node.TEXT_NODE ? input : blotClass.create(value)
    ), blot = new blotClass(scroll, node, value);
    return _Registry2.blots.set(blot.domNode, blot), blot;
  }
  find(node, bubble = false) {
    return _Registry2.find(node, bubble);
  }
  query(query, scope = Scope.ANY) {
    let match2;
    return typeof query == "string" ? match2 = this.types[query] || this.attributes[query] : query instanceof Text || query.nodeType === Node.TEXT_NODE ? match2 = this.types.text : typeof query == "number" ? query & Scope.LEVEL & Scope.BLOCK ? match2 = this.types.block : query & Scope.LEVEL & Scope.INLINE && (match2 = this.types.inline) : query instanceof Element && ((query.getAttribute("class") || "").split(/\s+/).some((name) => (match2 = this.classes[name], !!match2)), match2 = match2 || this.tags[query.tagName]), match2 == null ? null : "scope" in match2 && scope & Scope.LEVEL & match2.scope && scope & Scope.TYPE & match2.scope ? match2 : null;
  }
  register(...definitions) {
    return definitions.map((definition) => {
      const isBlot = "blotName" in definition, isAttr = "attrName" in definition;
      if (!isBlot && !isAttr)
        throw new ParchmentError("Invalid definition");
      if (isBlot && definition.blotName === "abstract")
        throw new ParchmentError("Cannot register abstract class");
      const key = isBlot ? definition.blotName : isAttr ? definition.attrName : void 0;
      return this.types[key] = definition, isAttr ? typeof definition.keyName == "string" && (this.attributes[definition.keyName] = definition) : isBlot && (definition.className && (this.classes[definition.className] = definition), definition.tagName && (Array.isArray(definition.tagName) ? definition.tagName = definition.tagName.map((tagName) => tagName.toUpperCase()) : definition.tagName = definition.tagName.toUpperCase(), (Array.isArray(definition.tagName) ? definition.tagName : [definition.tagName]).forEach((tag) => {
        (this.tags[tag] == null || definition.className == null) && (this.tags[tag] = definition);
      }))), definition;
    });
  }
};
_Registry.blots = /* @__PURE__ */ new WeakMap();
let Registry = _Registry;
function match(node, prefix) {
  return (node.getAttribute("class") || "").split(/\s+/).filter((name) => name.indexOf(`${prefix}-`) === 0);
}
class ClassAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute("class") || "").split(/\s+/).map((name) => name.split("-").slice(0, -1).join("-"));
  }
  add(node, value) {
    return this.canAdd(node, value) ? (this.remove(node), node.classList.add(`${this.keyName}-${value}`), true) : false;
  }
  remove(node) {
    match(node, this.keyName).forEach((name) => {
      node.classList.remove(name);
    }), node.classList.length === 0 && node.removeAttribute("class");
  }
  value(node) {
    const value = (match(node, this.keyName)[0] || "").slice(this.keyName.length + 1);
    return this.canAdd(node, value) ? value : "";
  }
}
const ClassAttributor$1 = ClassAttributor;
function camelize(name) {
  const parts = name.split("-"), rest = parts.slice(1).map((part) => part[0].toUpperCase() + part.slice(1)).join("");
  return parts[0] + rest;
}
class StyleAttributor extends Attributor {
  static keys(node) {
    return (node.getAttribute("style") || "").split(";").map((value) => value.split(":")[0].trim());
  }
  add(node, value) {
    return this.canAdd(node, value) ? (node.style[camelize(this.keyName)] = value, true) : false;
  }
  remove(node) {
    node.style[camelize(this.keyName)] = "", node.getAttribute("style") || node.removeAttribute("style");
  }
  value(node) {
    const value = node.style[camelize(this.keyName)];
    return this.canAdd(node, value) ? value : "";
  }
}
const StyleAttributor$1 = StyleAttributor;
class AttributorStore {
  constructor(domNode) {
    this.attributes = {}, this.domNode = domNode, this.build();
  }
  attribute(attribute, value) {
    value ? attribute.add(this.domNode, value) && (attribute.value(this.domNode) != null ? this.attributes[attribute.attrName] = attribute : delete this.attributes[attribute.attrName]) : (attribute.remove(this.domNode), delete this.attributes[attribute.attrName]);
  }
  build() {
    this.attributes = {};
    const blot = Registry.find(this.domNode);
    if (blot == null)
      return;
    const attributes = Attributor.keys(this.domNode), classes = ClassAttributor$1.keys(this.domNode), styles = StyleAttributor$1.keys(this.domNode);
    attributes.concat(classes).concat(styles).forEach((name) => {
      const attr = blot.scroll.query(name, Scope.ATTRIBUTE);
      attr instanceof Attributor && (this.attributes[attr.attrName] = attr);
    });
  }
  copy(target) {
    Object.keys(this.attributes).forEach((key) => {
      const value = this.attributes[key].value(this.domNode);
      target.format(key, value);
    });
  }
  move(target) {
    this.copy(target), Object.keys(this.attributes).forEach((key) => {
      this.attributes[key].remove(this.domNode);
    }), this.attributes = {};
  }
  values() {
    return Object.keys(this.attributes).reduce(
      (attributes, name) => (attributes[name] = this.attributes[name].value(this.domNode), attributes),
      {}
    );
  }
}
const AttributorStore$1 = AttributorStore, _ShadowBlot = class _ShadowBlot2 {
  constructor(scroll, domNode) {
    this.scroll = scroll, this.domNode = domNode, Registry.blots.set(domNode, this), this.prev = null, this.next = null;
  }
  static create(rawValue) {
    if (this.tagName == null)
      throw new ParchmentError("Blot definition missing tagName");
    let node, value;
    return Array.isArray(this.tagName) ? (typeof rawValue == "string" ? (value = rawValue.toUpperCase(), parseInt(value, 10).toString() === value && (value = parseInt(value, 10))) : typeof rawValue == "number" && (value = rawValue), typeof value == "number" ? node = document.createElement(this.tagName[value - 1]) : value && this.tagName.indexOf(value) > -1 ? node = document.createElement(value) : node = document.createElement(this.tagName[0])) : node = document.createElement(this.tagName), this.className && node.classList.add(this.className), node;
  }
  // Hack for accessing inherited static methods
  get statics() {
    return this.constructor;
  }
  attach() {
  }
  clone() {
    const domNode = this.domNode.cloneNode(false);
    return this.scroll.create(domNode);
  }
  detach() {
    this.parent != null && this.parent.removeChild(this), Registry.blots.delete(this.domNode);
  }
  deleteAt(index, length) {
    this.isolate(index, length).remove();
  }
  formatAt(index, length, name, value) {
    const blot = this.isolate(index, length);
    if (this.scroll.query(name, Scope.BLOT) != null && value)
      blot.wrap(name, value);
    else if (this.scroll.query(name, Scope.ATTRIBUTE) != null) {
      const parent = this.scroll.create(this.statics.scope);
      blot.wrap(parent), parent.format(name, value);
    }
  }
  insertAt(index, value, def) {
    const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def), ref = this.split(index);
    this.parent.insertBefore(blot, ref || void 0);
  }
  isolate(index, length) {
    const target = this.split(index);
    if (target == null)
      throw new Error("Attempt to isolate at end");
    return target.split(length), target;
  }
  length() {
    return 1;
  }
  offset(root2 = this.parent) {
    return this.parent == null || this === root2 ? 0 : this.parent.children.offset(this) + this.parent.offset(root2);
  }
  optimize(_context) {
    this.statics.requiredContainer && !(this.parent instanceof this.statics.requiredContainer) && this.wrap(this.statics.requiredContainer.blotName);
  }
  remove() {
    this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
  }
  replaceWith(name, value) {
    const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
    return this.parent != null && (this.parent.insertBefore(replacement, this.next || void 0), this.remove()), replacement;
  }
  split(index, _force) {
    return index === 0 ? this : this.next;
  }
  update(_mutations, _context) {
  }
  wrap(name, value) {
    const wrapper = typeof name == "string" ? this.scroll.create(name, value) : name;
    if (this.parent != null && this.parent.insertBefore(wrapper, this.next || void 0), typeof wrapper.appendChild != "function")
      throw new ParchmentError(`Cannot wrap ${name}`);
    return wrapper.appendChild(this), wrapper;
  }
};
_ShadowBlot.blotName = "abstract";
let ShadowBlot = _ShadowBlot;
const _LeafBlot = class _LeafBlot2 extends ShadowBlot {
  /**
   * Returns the value represented by domNode if it is this Blot's type
   * No checking that domNode can represent this Blot type is required so
   * applications needing it should check externally before calling.
   */
  static value(_domNode) {
    return true;
  }
  /**
   * Given location represented by node and offset from DOM Selection Range,
   * return index to that location.
   */
  index(node, offset) {
    return this.domNode === node || this.domNode.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(offset, 1) : -1;
  }
  /**
   * Given index to location within blot, return node and offset representing
   * that location, consumable by DOM Selection Range
   */
  position(index, _inclusive) {
    let offset = Array.from(this.parent.domNode.childNodes).indexOf(this.domNode);
    return index > 0 && (offset += 1), [this.parent.domNode, offset];
  }
  /**
   * Return value represented by this blot
   * Should not change without interaction from API or
   * user change detectable by update()
   */
  value() {
    return {
      [this.statics.blotName]: this.statics.value(this.domNode) || true
    };
  }
};
_LeafBlot.scope = Scope.INLINE_BLOT;
let LeafBlot = _LeafBlot;
const LeafBlot$1 = LeafBlot;
class LinkedList {
  constructor() {
    this.head = null, this.tail = null, this.length = 0;
  }
  append(...nodes) {
    if (this.insertBefore(nodes[0], null), nodes.length > 1) {
      const rest = nodes.slice(1);
      this.append(...rest);
    }
  }
  at(index) {
    const next = this.iterator();
    let cur = next();
    for (; cur && index > 0; )
      index -= 1, cur = next();
    return cur;
  }
  contains(node) {
    const next = this.iterator();
    let cur = next();
    for (; cur; ) {
      if (cur === node)
        return true;
      cur = next();
    }
    return false;
  }
  indexOf(node) {
    const next = this.iterator();
    let cur = next(), index = 0;
    for (; cur; ) {
      if (cur === node)
        return index;
      index += 1, cur = next();
    }
    return -1;
  }
  insertBefore(node, refNode) {
    node != null && (this.remove(node), node.next = refNode, refNode != null ? (node.prev = refNode.prev, refNode.prev != null && (refNode.prev.next = node), refNode.prev = node, refNode === this.head && (this.head = node)) : this.tail != null ? (this.tail.next = node, node.prev = this.tail, this.tail = node) : (node.prev = null, this.head = this.tail = node), this.length += 1);
  }
  offset(target) {
    let index = 0, cur = this.head;
    for (; cur != null; ) {
      if (cur === target)
        return index;
      index += cur.length(), cur = cur.next;
    }
    return -1;
  }
  remove(node) {
    this.contains(node) && (node.prev != null && (node.prev.next = node.next), node.next != null && (node.next.prev = node.prev), node === this.head && (this.head = node.next), node === this.tail && (this.tail = node.prev), this.length -= 1);
  }
  iterator(curNode = this.head) {
    return () => {
      const ret = curNode;
      return curNode != null && (curNode = curNode.next), ret;
    };
  }
  find(index, inclusive = false) {
    const next = this.iterator();
    let cur = next();
    for (; cur; ) {
      const length = cur.length();
      if (index < length || inclusive && index === length && (cur.next == null || cur.next.length() !== 0))
        return [cur, index];
      index -= length, cur = next();
    }
    return [null, 0];
  }
  forEach(callback) {
    const next = this.iterator();
    let cur = next();
    for (; cur; )
      callback(cur), cur = next();
  }
  forEachAt(index, length, callback) {
    if (length <= 0)
      return;
    const [startNode, offset] = this.find(index);
    let curIndex = index - offset;
    const next = this.iterator(startNode);
    let cur = next();
    for (; cur && curIndex < index + length; ) {
      const curLength = cur.length();
      index > curIndex ? callback(
        cur,
        index - curIndex,
        Math.min(length, curIndex + curLength - index)
      ) : callback(cur, 0, Math.min(curLength, index + length - curIndex)), curIndex += curLength, cur = next();
    }
  }
  map(callback) {
    return this.reduce((memo, cur) => (memo.push(callback(cur)), memo), []);
  }
  reduce(callback, memo) {
    const next = this.iterator();
    let cur = next();
    for (; cur; )
      memo = callback(memo, cur), cur = next();
    return memo;
  }
}
function makeAttachedBlot(node, scroll) {
  const found = scroll.find(node);
  if (found)
    return found;
  try {
    return scroll.create(node);
  } catch {
    const blot = scroll.create(Scope.INLINE);
    return Array.from(node.childNodes).forEach((child) => {
      blot.domNode.appendChild(child);
    }), node.parentNode && node.parentNode.replaceChild(blot.domNode, node), blot.attach(), blot;
  }
}
const _ParentBlot = class _ParentBlot2 extends ShadowBlot {
  constructor(scroll, domNode) {
    super(scroll, domNode), this.uiNode = null, this.build();
  }
  appendChild(other) {
    this.insertBefore(other);
  }
  attach() {
    super.attach(), this.children.forEach((child) => {
      child.attach();
    });
  }
  attachUI(node) {
    this.uiNode != null && this.uiNode.remove(), this.uiNode = node, _ParentBlot2.uiClass && this.uiNode.classList.add(_ParentBlot2.uiClass), this.uiNode.setAttribute("contenteditable", "false"), this.domNode.insertBefore(this.uiNode, this.domNode.firstChild);
  }
  /**
   * Called during construction, should fill its own children LinkedList.
   */
  build() {
    this.children = new LinkedList(), Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode).reverse().forEach((node) => {
      try {
        const child = makeAttachedBlot(node, this.scroll);
        this.insertBefore(child, this.children.head || void 0);
      } catch (err) {
        if (err instanceof ParchmentError)
          return;
        throw err;
      }
    });
  }
  deleteAt(index, length) {
    if (index === 0 && length === this.length())
      return this.remove();
    this.children.forEachAt(index, length, (child, offset, childLength) => {
      child.deleteAt(offset, childLength);
    });
  }
  descendant(criteria, index = 0) {
    const [child, offset] = this.children.find(index);
    return criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria ? [child, offset] : child instanceof _ParentBlot2 ? child.descendant(criteria, offset) : [null, -1];
  }
  descendants(criteria, index = 0, length = Number.MAX_VALUE) {
    let descendants = [], lengthLeft = length;
    return this.children.forEachAt(
      index,
      length,
      (child, childIndex, childLength) => {
        (criteria.blotName == null && criteria(child) || criteria.blotName != null && child instanceof criteria) && descendants.push(child), child instanceof _ParentBlot2 && (descendants = descendants.concat(
          child.descendants(criteria, childIndex, lengthLeft)
        )), lengthLeft -= childLength;
      }
    ), descendants;
  }
  detach() {
    this.children.forEach((child) => {
      child.detach();
    }), super.detach();
  }
  enforceAllowedChildren() {
    let done = false;
    this.children.forEach((child) => {
      done || this.statics.allowedChildren.some(
        (def) => child instanceof def
      ) || (child.statics.scope === Scope.BLOCK_BLOT ? (child.next != null && this.splitAfter(child), child.prev != null && this.splitAfter(child.prev), child.parent.unwrap(), done = true) : child instanceof _ParentBlot2 ? child.unwrap() : child.remove());
    });
  }
  formatAt(index, length, name, value) {
    this.children.forEachAt(index, length, (child, offset, childLength) => {
      child.formatAt(offset, childLength, name, value);
    });
  }
  insertAt(index, value, def) {
    const [child, offset] = this.children.find(index);
    if (child)
      child.insertAt(offset, value, def);
    else {
      const blot = def == null ? this.scroll.create("text", value) : this.scroll.create(value, def);
      this.appendChild(blot);
    }
  }
  insertBefore(childBlot, refBlot) {
    childBlot.parent != null && childBlot.parent.children.remove(childBlot);
    let refDomNode = null;
    this.children.insertBefore(childBlot, refBlot || null), childBlot.parent = this, refBlot != null && (refDomNode = refBlot.domNode), (this.domNode.parentNode !== childBlot.domNode || this.domNode.nextSibling !== refDomNode) && this.domNode.insertBefore(childBlot.domNode, refDomNode), childBlot.attach();
  }
  length() {
    return this.children.reduce((memo, child) => memo + child.length(), 0);
  }
  moveChildren(targetParent, refNode) {
    this.children.forEach((child) => {
      targetParent.insertBefore(child, refNode);
    });
  }
  optimize(context) {
    if (super.optimize(context), this.enforceAllowedChildren(), this.uiNode != null && this.uiNode !== this.domNode.firstChild && this.domNode.insertBefore(this.uiNode, this.domNode.firstChild), this.children.length === 0)
      if (this.statics.defaultChild != null) {
        const child = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(child);
      } else
        this.remove();
  }
  path(index, inclusive = false) {
    const [child, offset] = this.children.find(index, inclusive), position = [[this, index]];
    return child instanceof _ParentBlot2 ? position.concat(child.path(offset, inclusive)) : (child != null && position.push([child, offset]), position);
  }
  removeChild(child) {
    this.children.remove(child);
  }
  replaceWith(name, value) {
    const replacement = typeof name == "string" ? this.scroll.create(name, value) : name;
    return replacement instanceof _ParentBlot2 && this.moveChildren(replacement), super.replaceWith(replacement);
  }
  split(index, force = false) {
    if (!force) {
      if (index === 0)
        return this;
      if (index === this.length())
        return this.next;
    }
    const after = this.clone();
    return this.parent && this.parent.insertBefore(after, this.next || void 0), this.children.forEachAt(index, this.length(), (child, offset, _length) => {
      const split = child.split(offset, force);
      split != null && after.appendChild(split);
    }), after;
  }
  splitAfter(child) {
    const after = this.clone();
    for (; child.next != null; )
      after.appendChild(child.next);
    return this.parent && this.parent.insertBefore(after, this.next || void 0), after;
  }
  unwrap() {
    this.parent && this.moveChildren(this.parent, this.next || void 0), this.remove();
  }
  update(mutations, _context) {
    const addedNodes = [], removedNodes = [];
    mutations.forEach((mutation) => {
      mutation.target === this.domNode && mutation.type === "childList" && (addedNodes.push(...mutation.addedNodes), removedNodes.push(...mutation.removedNodes));
    }), removedNodes.forEach((node) => {
      if (node.parentNode != null && // @ts-expect-error Fix me later
      node.tagName !== "IFRAME" && document.body.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY)
        return;
      const blot = this.scroll.find(node);
      blot != null && (blot.domNode.parentNode == null || blot.domNode.parentNode === this.domNode) && blot.detach();
    }), addedNodes.filter((node) => node.parentNode === this.domNode && node !== this.uiNode).sort((a, b) => a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1).forEach((node) => {
      let refBlot = null;
      node.nextSibling != null && (refBlot = this.scroll.find(node.nextSibling));
      const blot = makeAttachedBlot(node, this.scroll);
      (blot.next !== refBlot || blot.next == null) && (blot.parent != null && blot.parent.removeChild(this), this.insertBefore(blot, refBlot || void 0));
    }), this.enforceAllowedChildren();
  }
};
_ParentBlot.uiClass = "";
let ParentBlot = _ParentBlot;
const ParentBlot$1 = ParentBlot;
function isEqual$1(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length)
    return false;
  for (const prop in obj1)
    if (obj1[prop] !== obj2[prop])
      return false;
  return true;
}
const _InlineBlot = class _InlineBlot2 extends ParentBlot$1 {
  static create(value) {
    return super.create(value);
  }
  static formats(domNode, scroll) {
    const match2 = scroll.query(_InlineBlot2.blotName);
    if (!(match2 != null && domNode.tagName === match2.tagName)) {
      if (typeof this.tagName == "string")
        return true;
      if (Array.isArray(this.tagName))
        return domNode.tagName.toLowerCase();
    }
  }
  constructor(scroll, domNode) {
    super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
  }
  format(name, value) {
    if (name === this.statics.blotName && !value)
      this.children.forEach((child) => {
        child instanceof _InlineBlot2 || (child = child.wrap(_InlineBlot2.blotName, true)), this.attributes.copy(child);
      }), this.unwrap();
    else {
      const format = this.scroll.query(name, Scope.INLINE);
      if (format == null)
        return;
      format instanceof Attributor ? this.attributes.attribute(format, value) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value);
    }
  }
  formats() {
    const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
    return format != null && (formats[this.statics.blotName] = format), formats;
  }
  formatAt(index, length, name, value) {
    this.formats()[name] != null || this.scroll.query(name, Scope.ATTRIBUTE) ? this.isolate(index, length).format(name, value) : super.formatAt(index, length, name, value);
  }
  optimize(context) {
    super.optimize(context);
    const formats = this.formats();
    if (Object.keys(formats).length === 0)
      return this.unwrap();
    const next = this.next;
    next instanceof _InlineBlot2 && next.prev === this && isEqual$1(formats, next.formats()) && (next.moveChildren(this), next.remove());
  }
  replaceWith(name, value) {
    const replacement = super.replaceWith(name, value);
    return this.attributes.copy(replacement), replacement;
  }
  update(mutations, context) {
    super.update(mutations, context), mutations.some(
      (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
    ) && this.attributes.build();
  }
  wrap(name, value) {
    const wrapper = super.wrap(name, value);
    return wrapper instanceof _InlineBlot2 && this.attributes.move(wrapper), wrapper;
  }
};
_InlineBlot.allowedChildren = [_InlineBlot, LeafBlot$1], _InlineBlot.blotName = "inline", _InlineBlot.scope = Scope.INLINE_BLOT, _InlineBlot.tagName = "SPAN";
let InlineBlot = _InlineBlot;
const InlineBlot$1 = InlineBlot, _BlockBlot = class _BlockBlot2 extends ParentBlot$1 {
  static create(value) {
    return super.create(value);
  }
  static formats(domNode, scroll) {
    const match2 = scroll.query(_BlockBlot2.blotName);
    if (!(match2 != null && domNode.tagName === match2.tagName)) {
      if (typeof this.tagName == "string")
        return true;
      if (Array.isArray(this.tagName))
        return domNode.tagName.toLowerCase();
    }
  }
  constructor(scroll, domNode) {
    super(scroll, domNode), this.attributes = new AttributorStore$1(this.domNode);
  }
  format(name, value) {
    const format = this.scroll.query(name, Scope.BLOCK);
    format != null && (format instanceof Attributor ? this.attributes.attribute(format, value) : name === this.statics.blotName && !value ? this.replaceWith(_BlockBlot2.blotName) : value && (name !== this.statics.blotName || this.formats()[name] !== value) && this.replaceWith(name, value));
  }
  formats() {
    const formats = this.attributes.values(), format = this.statics.formats(this.domNode, this.scroll);
    return format != null && (formats[this.statics.blotName] = format), formats;
  }
  formatAt(index, length, name, value) {
    this.scroll.query(name, Scope.BLOCK) != null ? this.format(name, value) : super.formatAt(index, length, name, value);
  }
  insertAt(index, value, def) {
    if (def == null || this.scroll.query(value, Scope.INLINE) != null)
      super.insertAt(index, value, def);
    else {
      const after = this.split(index);
      if (after != null) {
        const blot = this.scroll.create(value, def);
        after.parent.insertBefore(blot, after);
      } else
        throw new Error("Attempt to insertAt after block boundaries");
    }
  }
  replaceWith(name, value) {
    const replacement = super.replaceWith(name, value);
    return this.attributes.copy(replacement), replacement;
  }
  update(mutations, context) {
    super.update(mutations, context), mutations.some(
      (mutation) => mutation.target === this.domNode && mutation.type === "attributes"
    ) && this.attributes.build();
  }
};
_BlockBlot.blotName = "block", _BlockBlot.scope = Scope.BLOCK_BLOT, _BlockBlot.tagName = "P", _BlockBlot.allowedChildren = [
  InlineBlot$1,
  _BlockBlot,
  LeafBlot$1
];
let BlockBlot = _BlockBlot;
const BlockBlot$1 = BlockBlot, _ContainerBlot = class _ContainerBlot2 extends ParentBlot$1 {
  checkMerge() {
    return this.next !== null && this.next.statics.blotName === this.statics.blotName;
  }
  deleteAt(index, length) {
    super.deleteAt(index, length), this.enforceAllowedChildren();
  }
  formatAt(index, length, name, value) {
    super.formatAt(index, length, name, value), this.enforceAllowedChildren();
  }
  insertAt(index, value, def) {
    super.insertAt(index, value, def), this.enforceAllowedChildren();
  }
  optimize(context) {
    super.optimize(context), this.children.length > 0 && this.next != null && this.checkMerge() && (this.next.moveChildren(this), this.next.remove());
  }
};
_ContainerBlot.blotName = "container", _ContainerBlot.scope = Scope.BLOCK_BLOT;
let ContainerBlot = _ContainerBlot;
const ContainerBlot$1 = ContainerBlot;
class EmbedBlot extends LeafBlot$1 {
  static formats(_domNode, _scroll) {
  }
  format(name, value) {
    super.formatAt(0, this.length(), name, value);
  }
  formatAt(index, length, name, value) {
    index === 0 && length === this.length() ? this.format(name, value) : super.formatAt(index, length, name, value);
  }
  formats() {
    return this.statics.formats(this.domNode, this.scroll);
  }
}
const EmbedBlot$1 = EmbedBlot, OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true
}, MAX_OPTIMIZE_ITERATIONS = 100, _ScrollBlot = class _ScrollBlot2 extends ParentBlot$1 {
  constructor(registry, node) {
    super(null, node), this.registry = registry, this.scroll = this, this.build(), this.observer = new MutationObserver((mutations) => {
      this.update(mutations);
    }), this.observer.observe(this.domNode, OBSERVER_CONFIG), this.attach();
  }
  create(input, value) {
    return this.registry.create(this, input, value);
  }
  find(node, bubble = false) {
    const blot = this.registry.find(node, bubble);
    return blot ? blot.scroll === this ? blot : bubble ? this.find(blot.scroll.domNode.parentNode, true) : null : null;
  }
  query(query, scope = Scope.ANY) {
    return this.registry.query(query, scope);
  }
  register(...definitions) {
    return this.registry.register(...definitions);
  }
  build() {
    this.scroll != null && super.build();
  }
  detach() {
    super.detach(), this.observer.disconnect();
  }
  deleteAt(index, length) {
    this.update(), index === 0 && length === this.length() ? this.children.forEach((child) => {
      child.remove();
    }) : super.deleteAt(index, length);
  }
  formatAt(index, length, name, value) {
    this.update(), super.formatAt(index, length, name, value);
  }
  insertAt(index, value, def) {
    this.update(), super.insertAt(index, value, def);
  }
  optimize(mutations = [], context = {}) {
    super.optimize(context);
    const mutationsMap = context.mutationsMap || /* @__PURE__ */ new WeakMap();
    let records = Array.from(this.observer.takeRecords());
    for (; records.length > 0; )
      mutations.push(records.pop());
    const mark = (blot, markParent = true) => {
      blot == null || blot === this || blot.domNode.parentNode != null && (mutationsMap.has(blot.domNode) || mutationsMap.set(blot.domNode, []), markParent && mark(blot.parent));
    }, optimize = (blot) => {
      mutationsMap.has(blot.domNode) && (blot instanceof ParentBlot$1 && blot.children.forEach(optimize), mutationsMap.delete(blot.domNode), blot.optimize(context));
    };
    let remaining = mutations;
    for (let i = 0; remaining.length > 0; i += 1) {
      if (i >= MAX_OPTIMIZE_ITERATIONS)
        throw new Error("[Parchment] Maximum optimize iterations reached");
      for (remaining.forEach((mutation) => {
        const blot = this.find(mutation.target, true);
        blot != null && (blot.domNode === mutation.target && (mutation.type === "childList" ? (mark(this.find(mutation.previousSibling, false)), Array.from(mutation.addedNodes).forEach((node) => {
          const child = this.find(node, false);
          mark(child, false), child instanceof ParentBlot$1 && child.children.forEach((grandChild) => {
            mark(grandChild, false);
          });
        })) : mutation.type === "attributes" && mark(blot.prev)), mark(blot));
      }), this.children.forEach(optimize), remaining = Array.from(this.observer.takeRecords()), records = remaining.slice(); records.length > 0; )
        mutations.push(records.pop());
    }
  }
  update(mutations, context = {}) {
    mutations = mutations || this.observer.takeRecords();
    const mutationsMap = /* @__PURE__ */ new WeakMap();
    mutations.map((mutation) => {
      const blot = this.find(mutation.target, true);
      return blot == null ? null : mutationsMap.has(blot.domNode) ? (mutationsMap.get(blot.domNode).push(mutation), null) : (mutationsMap.set(blot.domNode, [mutation]), blot);
    }).forEach((blot) => {
      blot != null && blot !== this && mutationsMap.has(blot.domNode) && blot.update(mutationsMap.get(blot.domNode) || [], context);
    }), context.mutationsMap = mutationsMap, mutationsMap.has(this.domNode) && super.update(mutationsMap.get(this.domNode), context), this.optimize(mutations, context);
  }
};
_ScrollBlot.blotName = "scroll", _ScrollBlot.defaultChild = BlockBlot$1, _ScrollBlot.allowedChildren = [BlockBlot$1, ContainerBlot$1], _ScrollBlot.scope = Scope.BLOCK_BLOT, _ScrollBlot.tagName = "DIV";
let ScrollBlot = _ScrollBlot;
const ScrollBlot$1 = ScrollBlot, _TextBlot = class _TextBlot2 extends LeafBlot$1 {
  static create(value) {
    return document.createTextNode(value);
  }
  static value(domNode) {
    return domNode.data;
  }
  constructor(scroll, node) {
    super(scroll, node), this.text = this.statics.value(this.domNode);
  }
  deleteAt(index, length) {
    this.domNode.data = this.text = this.text.slice(0, index) + this.text.slice(index + length);
  }
  index(node, offset) {
    return this.domNode === node ? offset : -1;
  }
  insertAt(index, value, def) {
    def == null ? (this.text = this.text.slice(0, index) + value + this.text.slice(index), this.domNode.data = this.text) : super.insertAt(index, value, def);
  }
  length() {
    return this.text.length;
  }
  optimize(context) {
    super.optimize(context), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof _TextBlot2 && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
  }
  position(index, _inclusive = false) {
    return [this.domNode, index];
  }
  split(index, force = false) {
    if (!force) {
      if (index === 0)
        return this;
      if (index === this.length())
        return this.next;
    }
    const after = this.scroll.create(this.domNode.splitText(index));
    return this.parent.insertBefore(after, this.next || void 0), this.text = this.statics.value(this.domNode), after;
  }
  update(mutations, _context) {
    mutations.some((mutation) => mutation.type === "characterData" && mutation.target === this.domNode) && (this.text = this.statics.value(this.domNode));
  }
  value() {
    return this.text;
  }
};
_TextBlot.blotName = "text", _TextBlot.scope = Scope.INLINE_BLOT;
let TextBlot = _TextBlot;
const TextBlot$1 = TextBlot;
const Parchment = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Attributor,
  AttributorStore: AttributorStore$1,
  BlockBlot: BlockBlot$1,
  ClassAttributor: ClassAttributor$1,
  ContainerBlot: ContainerBlot$1,
  EmbedBlot: EmbedBlot$1,
  InlineBlot: InlineBlot$1,
  LeafBlot: LeafBlot$1,
  ParentBlot: ParentBlot$1,
  Registry,
  Scope,
  ScrollBlot: ScrollBlot$1,
  StyleAttributor: StyleAttributor$1,
  TextBlot: TextBlot$1
}, Symbol.toStringTag, { value: "Module" }));
var Delta$1 = { exports: {} };
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;
function diff_main(text1, text2, cursor_pos, cleanup, _fix_unicode) {
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }
  if (cursor_pos != null) {
    var editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
    if (editdiff) {
      return editdiff;
    }
  }
  var commonlength = diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);
  commonlength = diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);
  var diffs = diff_compute_(text1, text2);
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diff_cleanupMerge(diffs, _fix_unicode);
  if (cleanup) {
    diff_cleanupSemantic(diffs);
  }
  return diffs;
}
function diff_compute_(text1, text2) {
  var diffs;
  if (!text1) {
    return [[DIFF_INSERT, text2]];
  }
  if (!text2) {
    return [[DIFF_DELETE, text1]];
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i !== -1) {
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)]
    ];
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }
  if (shorttext.length === 1) {
    return [
      [DIFF_DELETE, text1],
      [DIFF_INSERT, text2]
    ];
  }
  var hm = diff_halfMatch_(text1, text2);
  if (hm) {
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    var diffs_a = diff_main(text1_a, text2_a);
    var diffs_b = diff_main(text1_b, text2_b);
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }
  return diff_bisect_(text1, text2);
}
function diff_bisect_(text1, text2) {
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  var front = delta % 2 !== 0;
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        k1end += 2;
      } else if (y1 > text2_length) {
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        k2end += 2;
      } else if (y2 > text2_length) {
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          x2 = text1_length - x2;
          if (x1 >= x2) {
            return diff_bisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  return [
    [DIFF_DELETE, text1],
    [DIFF_INSERT, text2]
  ];
}
function diff_bisectSplit_(text1, text2, x, y) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);
  var diffs = diff_main(text1a, text2a);
  var diffsb = diff_main(text1b, text2b);
  return diffs.concat(diffsb);
}
function diff_commonPrefix(text1, text2) {
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  }
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  if (is_surrogate_pair_start(text1.charCodeAt(pointermid - 1))) {
    pointermid--;
  }
  return pointermid;
}
function diff_commonOverlap_(text1, text2) {
  var text1_length = text1.length;
  var text2_length = text2.length;
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  if (text1 == text2) {
    return text_length;
  }
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
}
function diff_commonSuffix(text1, text2) {
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  }
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  if (is_surrogate_pair_end(text1.charCodeAt(text1.length - pointermid))) {
    pointermid--;
  }
  return pointermid;
}
function diff_halfMatch_(text1, text2) {
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;
  }
  function diff_halfMatchI_(longtext2, shorttext2, i) {
    var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
    var j = -1;
    var best_common = "";
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext2.indexOf(seed, j + 1)) !== -1) {
      var prefixLength = diff_commonPrefix(
        longtext2.substring(i),
        shorttext2.substring(j)
      );
      var suffixLength = diff_commonSuffix(
        longtext2.substring(0, i),
        shorttext2.substring(0, j)
      );
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext2.substring(j - suffixLength, j) + shorttext2.substring(j, j + prefixLength);
        best_longtext_a = longtext2.substring(0, i - suffixLength);
        best_longtext_b = longtext2.substring(i + prefixLength);
        best_shorttext_a = shorttext2.substring(0, j - suffixLength);
        best_shorttext_b = shorttext2.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext2.length) {
      return [
        best_longtext_a,
        best_longtext_b,
        best_shorttext_a,
        best_shorttext_b,
        best_common
      ];
    } else {
      return null;
    }
  }
  var hm1 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 4)
  );
  var hm2 = diff_halfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 2)
  );
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
}
function diff_cleanupSemantic(diffs) {
  var changes = false;
  var equalities = [];
  var equalitiesLength = 0;
  var lastequality = null;
  var pointer = 0;
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = diffs[pointer][1];
    } else {
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      if (lastequality && lastequality.length <= Math.max(length_insertions1, length_deletions1) && lastequality.length <= Math.max(length_insertions2, length_deletions2)) {
        diffs.splice(equalities[equalitiesLength - 1], 0, [
          DIFF_DELETE,
          lastequality
        ]);
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    diff_cleanupMerge(diffs);
  }
  diff_cleanupSemanticLossless(diffs);
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
          diffs.splice(pointer, 0, [
            DIFF_EQUAL,
            insertion.substring(0, overlap_length1)
          ]);
          diffs[pointer - 1][1] = deletion.substring(
            0,
            deletion.length - overlap_length1
          );
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
          diffs.splice(pointer, 0, [
            DIFF_EQUAL,
            deletion.substring(0, overlap_length2)
          ]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] = insertion.substring(
            0,
            insertion.length - overlap_length2
          );
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] = deletion.substring(overlap_length2);
          pointer++;
        }
      }
      pointer++;
    }
    pointer++;
  }
}
var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
var whitespaceRegex_ = /\s/;
var linebreakRegex_ = /[\r\n]/;
var blanklineEndRegex_ = /\n\r?\n$/;
var blanklineStartRegex_ = /^\r?\n\r?\n/;
function diff_cleanupSemanticLossless(diffs) {
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      return 6;
    }
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
    var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
    var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
    var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
    var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);
    if (blankLine1 || blankLine2) {
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      return 3;
    } else if (whitespace1 || whitespace2) {
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      return 1;
    }
    return 0;
  }
  var pointer = 1;
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];
      var commonOffset = diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }
      if (diffs[pointer - 1][1] != bestEquality1) {
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
}
function diff_cleanupMerge(diffs, fix_unicode) {
  diffs.push([DIFF_EQUAL, ""]);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = "";
  var text_insert = "";
  var commonlength;
  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        var previous_equality = pointer - count_insert - count_delete - 1;
        if (fix_unicode) {
          if (previous_equality >= 0 && ends_with_pair_start(diffs[previous_equality][1])) {
            var stray = diffs[previous_equality][1].slice(-1);
            diffs[previous_equality][1] = diffs[previous_equality][1].slice(
              0,
              -1
            );
            text_delete = stray + text_delete;
            text_insert = stray + text_insert;
            if (!diffs[previous_equality][1]) {
              diffs.splice(previous_equality, 1);
              pointer--;
              var k = previous_equality - 1;
              if (diffs[k] && diffs[k][0] === DIFF_INSERT) {
                count_insert++;
                text_insert = diffs[k][1] + text_insert;
                k--;
              }
              if (diffs[k] && diffs[k][0] === DIFF_DELETE) {
                count_delete++;
                text_delete = diffs[k][1] + text_delete;
                k--;
              }
              previous_equality = k;
            }
          }
          if (starts_with_pair_end(diffs[pointer][1])) {
            var stray = diffs[pointer][1].charAt(0);
            diffs[pointer][1] = diffs[pointer][1].slice(1);
            text_delete += stray;
            text_insert += stray;
          }
        }
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          diffs.splice(pointer, 1);
          break;
        }
        if (text_delete.length > 0 || text_insert.length > 0) {
          if (text_delete.length > 0 && text_insert.length > 0) {
            commonlength = diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if (previous_equality >= 0) {
                diffs[previous_equality][1] += text_insert.substring(
                  0,
                  commonlength
                );
              } else {
                diffs.splice(0, 0, [
                  DIFF_EQUAL,
                  text_insert.substring(0, commonlength)
                ]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            commonlength = diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(
                0,
                text_insert.length - commonlength
              );
              text_delete = text_delete.substring(
                0,
                text_delete.length - commonlength
              );
            }
          }
          var n = count_insert + count_delete;
          if (text_delete.length === 0 && text_insert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (text_delete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, text_insert]);
            pointer = pointer - n + 1;
          } else if (text_insert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, text_delete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(
              pointer - n,
              n,
              [DIFF_DELETE, text_delete],
              [DIFF_INSERT, text_insert]
            );
            pointer = pointer - n + 2;
          }
        }
        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = "";
        text_insert = "";
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === "") {
    diffs.pop();
  }
  var changes = false;
  pointer = 1;
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] === DIFF_EQUAL && diffs[pointer + 1][0] === DIFF_EQUAL) {
      if (diffs[pointer][1].substring(
        diffs[pointer][1].length - diffs[pointer - 1][1].length
      ) === diffs[pointer - 1][1]) {
        diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(
          0,
          diffs[pointer][1].length - diffs[pointer - 1][1].length
        );
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  if (changes) {
    diff_cleanupMerge(diffs, fix_unicode);
  }
}
function is_surrogate_pair_start(charCode) {
  return charCode >= 55296 && charCode <= 56319;
}
function is_surrogate_pair_end(charCode) {
  return charCode >= 56320 && charCode <= 57343;
}
function starts_with_pair_end(str) {
  return is_surrogate_pair_end(str.charCodeAt(0));
}
function ends_with_pair_start(str) {
  return is_surrogate_pair_start(str.charCodeAt(str.length - 1));
}
function remove_empty_tuples(tuples) {
  var ret = [];
  for (var i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }
  return ret;
}
function make_edit_splice(before, oldMiddle, newMiddle, after) {
  if (ends_with_pair_start(before) || starts_with_pair_end(after)) {
    return null;
  }
  return remove_empty_tuples([
    [DIFF_EQUAL, before],
    [DIFF_DELETE, oldMiddle],
    [DIFF_INSERT, newMiddle],
    [DIFF_EQUAL, after]
  ]);
}
function find_cursor_edit_diff(oldText, newText, cursor_pos) {
  var oldRange = typeof cursor_pos === "number" ? { index: cursor_pos, length: 0 } : cursor_pos.oldRange;
  var newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
  var oldLength = oldText.length;
  var newLength = newText.length;
  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    var oldCursor = oldRange.index;
    var oldBefore = oldText.slice(0, oldCursor);
    var oldAfter = oldText.slice(oldCursor);
    var maybeNewCursor = newRange ? newRange.index : null;
    editBefore: {
      var newCursor = oldCursor + newLength - oldLength;
      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }
      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }
      var newBefore = newText.slice(0, newCursor);
      var newAfter = newText.slice(newCursor);
      if (newAfter !== oldAfter) {
        break editBefore;
      }
      var prefixLength = Math.min(oldCursor, newCursor);
      var oldPrefix = oldBefore.slice(0, prefixLength);
      var newPrefix = newBefore.slice(0, prefixLength);
      if (oldPrefix !== newPrefix) {
        break editBefore;
      }
      var oldMiddle = oldBefore.slice(prefixLength);
      var newMiddle = newBefore.slice(prefixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }
    editAfter: {
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }
      var cursor = oldCursor;
      var newBefore = newText.slice(0, cursor);
      var newAfter = newText.slice(cursor);
      if (newBefore !== oldBefore) {
        break editAfter;
      }
      var suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      var oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
      var newSuffix = newAfter.slice(newAfter.length - suffixLength);
      if (oldSuffix !== newSuffix) {
        break editAfter;
      }
      var oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
      var newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
      return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
    }
  }
  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      var oldPrefix = oldText.slice(0, oldRange.index);
      var oldSuffix = oldText.slice(oldRange.index + oldRange.length);
      var prefixLength = oldPrefix.length;
      var suffixLength = oldSuffix.length;
      if (newLength < prefixLength + suffixLength) {
        break replaceRange;
      }
      var newPrefix = newText.slice(0, prefixLength);
      var newSuffix = newText.slice(newLength - suffixLength);
      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
        break replaceRange;
      }
      var oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
      var newMiddle = newText.slice(prefixLength, newLength - suffixLength);
      return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
    }
  }
  return null;
}
function diff(text1, text2, cursor_pos, cleanup) {
  return diff_main(text1, text2, cursor_pos, cleanup, true);
}
diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;
var diff_1 = diff;
var lodash_clonedeep = { exports: {} };
lodash_clonedeep.exports;
(function(module2, exports$1) {
  var LARGE_ARRAY_SIZE2 = 200;
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", weakMapTag2 = "[object WeakMap]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reFlags2 = /\w*$/;
  var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
  var reIsUint2 = /^(?:0|[1-9]\d*)$/;
  var cloneableTags2 = {};
  cloneableTags2[argsTag2] = cloneableTags2[arrayTag2] = cloneableTags2[arrayBufferTag2] = cloneableTags2[dataViewTag2] = cloneableTags2[boolTag2] = cloneableTags2[dateTag2] = cloneableTags2[float32Tag2] = cloneableTags2[float64Tag2] = cloneableTags2[int8Tag2] = cloneableTags2[int16Tag2] = cloneableTags2[int32Tag2] = cloneableTags2[mapTag2] = cloneableTags2[numberTag2] = cloneableTags2[objectTag2] = cloneableTags2[regexpTag2] = cloneableTags2[setTag2] = cloneableTags2[stringTag2] = cloneableTags2[symbolTag2] = cloneableTags2[uint8Tag2] = cloneableTags2[uint8ClampedTag2] = cloneableTags2[uint16Tag2] = cloneableTags2[uint32Tag2] = true;
  cloneableTags2[errorTag2] = cloneableTags2[funcTag2] = cloneableTags2[weakMapTag2] = false;
  var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  var freeExports2 = exports$1 && !exports$1.nodeType && exports$1;
  var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  function addMapEntry(map, pair) {
    map.set(pair[0], pair[1]);
    return map;
  }
  function addSetEntry(set, value) {
    set.add(value);
    return set;
  }
  function arrayEach2(array, iteratee) {
    var index = -1, length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  function arrayPush2(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arrayReduce(array, iteratee, accumulator, initAccum) {
    var index = -1, length = array ? array.length : 0;
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  function baseTimes2(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function getValue2(object, key) {
    return object == null ? void 0 : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {
      }
    }
    return result;
  }
  function mapToArray2(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg2(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray2(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto2 = Array.prototype, funcProto2 = Function.prototype, objectProto2 = Object.prototype;
  var coreJsData2 = root2["__core-js_shared__"];
  var maskSrcKey2 = function() {
    var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var objectToString2 = objectProto2.toString;
  var reIsNative2 = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer3 = moduleExports2 ? root2.Buffer : void 0, Symbol2 = root2.Symbol, Uint8Array2 = root2.Uint8Array, getPrototype2 = overArg2(Object.getPrototypeOf, Object), objectCreate2 = Object.create, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice;
  var nativeGetSymbols2 = Object.getOwnPropertySymbols, nativeIsBuffer2 = Buffer3 ? Buffer3.isBuffer : void 0, nativeKeys2 = overArg2(Object.keys, Object);
  var DataView2 = getNative2(root2, "DataView"), Map2 = getNative2(root2, "Map"), Promise2 = getNative2(root2, "Promise"), Set2 = getNative2(root2, "Set"), WeakMap2 = getNative2(root2, "WeakMap"), nativeCreate2 = getNative2(Object, "create");
  var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function Hash2(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear2() {
    this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
  }
  function hashDelete2(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet2(key) {
    var data = this.__data__;
    if (nativeCreate2) {
      var result = data[key];
      return result === HASH_UNDEFINED2 ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas2(key) {
    var data = this.__data__;
    return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  function hashSet2(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  Hash2.prototype.clear = hashClear2;
  Hash2.prototype["delete"] = hashDelete2;
  Hash2.prototype.get = hashGet2;
  Hash2.prototype.has = hashHas2;
  Hash2.prototype.set = hashSet2;
  function ListCache2(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear2() {
    this.__data__ = [];
  }
  function listCacheDelete2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice2.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas2(key) {
    return assocIndexOf2(this.__data__, key) > -1;
  }
  function listCacheSet2(key, value) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache2.prototype.clear = listCacheClear2;
  ListCache2.prototype["delete"] = listCacheDelete2;
  ListCache2.prototype.get = listCacheGet2;
  ListCache2.prototype.has = listCacheHas2;
  ListCache2.prototype.set = listCacheSet2;
  function MapCache2(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear2() {
    this.__data__ = {
      "hash": new Hash2(),
      "map": new (Map2 || ListCache2)(),
      "string": new Hash2()
    };
  }
  function mapCacheDelete2(key) {
    return getMapData2(this, key)["delete"](key);
  }
  function mapCacheGet2(key) {
    return getMapData2(this, key).get(key);
  }
  function mapCacheHas2(key) {
    return getMapData2(this, key).has(key);
  }
  function mapCacheSet2(key, value) {
    getMapData2(this, key).set(key, value);
    return this;
  }
  MapCache2.prototype.clear = mapCacheClear2;
  MapCache2.prototype["delete"] = mapCacheDelete2;
  MapCache2.prototype.get = mapCacheGet2;
  MapCache2.prototype.has = mapCacheHas2;
  MapCache2.prototype.set = mapCacheSet2;
  function Stack2(entries) {
    this.__data__ = new ListCache2(entries);
  }
  function stackClear2() {
    this.__data__ = new ListCache2();
  }
  function stackDelete2(key) {
    return this.__data__["delete"](key);
  }
  function stackGet2(key) {
    return this.__data__.get(key);
  }
  function stackHas2(key) {
    return this.__data__.has(key);
  }
  function stackSet2(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache2) {
      var pairs = cache.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
        pairs.push([key, value]);
        return this;
      }
      cache = this.__data__ = new MapCache2(pairs);
    }
    cache.set(key, value);
    return this;
  }
  Stack2.prototype.clear = stackClear2;
  Stack2.prototype["delete"] = stackDelete2;
  Stack2.prototype.get = stackGet2;
  Stack2.prototype.has = stackHas2;
  Stack2.prototype.set = stackSet2;
  function arrayLikeKeys2(value, inherited) {
    var result = isArray2(value) || isArguments2(value) ? baseTimes2(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for (var key in value) {
      if (hasOwnProperty2.call(value, key) && !(skipIndexes && (key == "length" || isIndex2(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assignValue2(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === void 0 && !(key in object)) {
      object[key] = value;
    }
  }
  function assocIndexOf2(array, key) {
    var length = array.length;
    while (length--) {
      if (eq2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseAssign(object, source) {
    return object && copyObject2(source, keys2(source), object);
  }
  function baseClone2(value, isDeep, isFull, customizer, key, object, stack) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result = initCloneArray2(value);
      if (!isDeep) {
        return copyArray2(value, result);
      }
    } else {
      var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
      if (isBuffer2(value)) {
        return cloneBuffer2(value, isDeep);
      }
      if (tag == objectTag2 || tag == argsTag2 || isFunc && !object) {
        if (isHostObject(value)) {
          return object ? value : {};
        }
        result = initCloneObject2(isFunc ? {} : value);
        if (!isDeep) {
          return copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags2[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag2(value, tag, baseClone2, isDeep);
      }
    }
    stack || (stack = new Stack2());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (!isArr) {
      var props = isFull ? getAllKeys2(value) : keys2(value);
    }
    arrayEach2(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue2(result, key2, baseClone2(subValue, isDeep, isFull, customizer, key2, value, stack));
    });
    return result;
  }
  function baseCreate2(proto) {
    return isObject2(proto) ? objectCreate2(proto) : {};
  }
  function baseGetAllKeys2(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush2(result, symbolsFunc(object));
  }
  function baseGetTag2(value) {
    return objectToString2.call(value);
  }
  function baseIsNative2(value) {
    if (!isObject2(value) || isMasked2(value)) {
      return false;
    }
    var pattern = isFunction2(value) || isHostObject(value) ? reIsNative2 : reIsHostCtor2;
    return pattern.test(toSource2(value));
  }
  function baseKeys2(object) {
    if (!isPrototype2(object)) {
      return nativeKeys2(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }
  function cloneArrayBuffer2(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
    return result;
  }
  function cloneDataView2(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  function cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(mapToArray2(map), true) : mapToArray2(map);
    return arrayReduce(array, addMapEntry, new map.constructor());
  }
  function cloneRegExp2(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags2.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  function cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(setToArray2(set), true) : setToArray2(set);
    return arrayReduce(array, addSetEntry, new set.constructor());
  }
  function cloneSymbol2(symbol) {
    return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
  }
  function cloneTypedArray2(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  function copyArray2(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  function copyObject2(source, props, object, customizer) {
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = void 0;
      assignValue2(object, key, newValue === void 0 ? source[key] : newValue);
    }
    return object;
  }
  function copySymbols(source, object) {
    return copyObject2(source, getSymbols2(source), object);
  }
  function getAllKeys2(object) {
    return baseGetAllKeys2(object, keys2, getSymbols2);
  }
  function getMapData2(map, key) {
    var data = map.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative2(object, key) {
    var value = getValue2(object, key);
    return baseIsNative2(value) ? value : void 0;
  }
  var getSymbols2 = nativeGetSymbols2 ? overArg2(nativeGetSymbols2, Object) : stubArray2;
  var getTag2 = baseGetTag2;
  if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
    getTag2 = function(value) {
      var result = objectToString2.call(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : void 0;
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString2:
            return dataViewTag2;
          case mapCtorString2:
            return mapTag2;
          case promiseCtorString2:
            return promiseTag2;
          case setCtorString2:
            return setTag2;
          case weakMapCtorString2:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  function initCloneArray2(array) {
    var length = array.length, result = array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  function initCloneObject2(object) {
    return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate2(getPrototype2(object)) : {};
  }
  function initCloneByTag2(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer2(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag2:
        return cloneDataView2(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray2(object, isDeep);
      case mapTag2:
        return cloneMap(object, isDeep, cloneFunc);
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp2(object);
      case setTag2:
        return cloneSet(object, isDeep, cloneFunc);
      case symbolTag2:
        return cloneSymbol2(object);
    }
  }
  function isIndex2(value, length) {
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable2(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked2(func) {
    return !!maskSrcKey2 && maskSrcKey2 in func;
  }
  function isPrototype2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
    return value === proto;
  }
  function toSource2(func) {
    if (func != null) {
      try {
        return funcToString2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function cloneDeep2(value) {
    return baseClone2(value, true, true);
  }
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isArguments2(value) {
    return isArrayLikeObject2(value) && hasOwnProperty2.call(value, "callee") && (!propertyIsEnumerable2.call(value, "callee") || objectToString2.call(value) == argsTag2);
  }
  var isArray2 = Array.isArray;
  function isArrayLike2(value) {
    return value != null && isLength2(value.length) && !isFunction2(value);
  }
  function isArrayLikeObject2(value) {
    return isObjectLike2(value) && isArrayLike2(value);
  }
  var isBuffer2 = nativeIsBuffer2 || stubFalse2;
  function isFunction2(value) {
    var tag = isObject2(value) ? objectToString2.call(value) : "";
    return tag == funcTag2 || tag == genTag2;
  }
  function isLength2(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  function isObject2(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike2(value) {
    return !!value && typeof value == "object";
  }
  function keys2(object) {
    return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
  }
  function stubArray2() {
    return [];
  }
  function stubFalse2() {
    return false;
  }
  module2.exports = cloneDeep2;
})(lodash_clonedeep, lodash_clonedeep.exports);
var lodash_clonedeepExports = lodash_clonedeep.exports;
var lodash_isequal = { exports: {} };
lodash_isequal.exports;
(function(module2, exports$1) {
  var LARGE_ARRAY_SIZE2 = 200;
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", asyncTag2 = "[object AsyncFunction]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", nullTag2 = "[object Null]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", proxyTag2 = "[object Proxy]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", undefinedTag2 = "[object Undefined]", weakMapTag2 = "[object WeakMap]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
  var reIsUint2 = /^(?:0|[1-9]\d*)$/;
  var typedArrayTags2 = {};
  typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
  typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
  var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  var freeExports2 = exports$1 && !exports$1.nodeType && exports$1;
  var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess2 = moduleExports2 && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
    } catch (e) {
    }
  }();
  var nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
  function arrayFilter2(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function arrayPush2(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  function arraySome2(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  function baseTimes2(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  function baseUnary2(func) {
    return function(value) {
      return func(value);
    };
  }
  function cacheHas2(cache, key) {
    return cache.has(key);
  }
  function getValue2(object, key) {
    return object == null ? void 0 : object[key];
  }
  function mapToArray2(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  function overArg2(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  function setToArray2(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  var arrayProto2 = Array.prototype, funcProto2 = Function.prototype, objectProto2 = Object.prototype;
  var coreJsData2 = root2["__core-js_shared__"];
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var maskSrcKey2 = function() {
    var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  var nativeObjectToString2 = objectProto2.toString;
  var reIsNative2 = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  var Buffer3 = moduleExports2 ? root2.Buffer : void 0, Symbol2 = root2.Symbol, Uint8Array2 = root2.Uint8Array, propertyIsEnumerable2 = objectProto2.propertyIsEnumerable, splice2 = arrayProto2.splice, symToStringTag2 = Symbol2 ? Symbol2.toStringTag : void 0;
  var nativeGetSymbols2 = Object.getOwnPropertySymbols, nativeIsBuffer2 = Buffer3 ? Buffer3.isBuffer : void 0, nativeKeys2 = overArg2(Object.keys, Object);
  var DataView2 = getNative2(root2, "DataView"), Map2 = getNative2(root2, "Map"), Promise2 = getNative2(root2, "Promise"), Set2 = getNative2(root2, "Set"), WeakMap2 = getNative2(root2, "WeakMap"), nativeCreate2 = getNative2(Object, "create");
  var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function Hash2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear2() {
    this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
    this.size = 0;
  }
  function hashDelete2(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  function hashGet2(key) {
    var data = this.__data__;
    if (nativeCreate2) {
      var result = data[key];
      return result === HASH_UNDEFINED2 ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  function hashHas2(key) {
    var data = this.__data__;
    return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  function hashSet2(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  Hash2.prototype.clear = hashClear2;
  Hash2.prototype["delete"] = hashDelete2;
  Hash2.prototype.get = hashGet2;
  Hash2.prototype.has = hashHas2;
  Hash2.prototype.set = hashSet2;
  function ListCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear2() {
    this.__data__ = [];
    this.size = 0;
  }
  function listCacheDelete2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice2.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas2(key) {
    return assocIndexOf2(this.__data__, key) > -1;
  }
  function listCacheSet2(key, value) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache2.prototype.clear = listCacheClear2;
  ListCache2.prototype["delete"] = listCacheDelete2;
  ListCache2.prototype.get = listCacheGet2;
  ListCache2.prototype.has = listCacheHas2;
  ListCache2.prototype.set = listCacheSet2;
  function MapCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear2() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash2(),
      "map": new (Map2 || ListCache2)(),
      "string": new Hash2()
    };
  }
  function mapCacheDelete2(key) {
    var result = getMapData2(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet2(key) {
    return getMapData2(this, key).get(key);
  }
  function mapCacheHas2(key) {
    return getMapData2(this, key).has(key);
  }
  function mapCacheSet2(key, value) {
    var data = getMapData2(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  MapCache2.prototype.clear = mapCacheClear2;
  MapCache2.prototype["delete"] = mapCacheDelete2;
  MapCache2.prototype.get = mapCacheGet2;
  MapCache2.prototype.has = mapCacheHas2;
  MapCache2.prototype.set = mapCacheSet2;
  function SetCache2(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache2();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  function setCacheAdd2(value) {
    this.__data__.set(value, HASH_UNDEFINED2);
    return this;
  }
  function setCacheHas2(value) {
    return this.__data__.has(value);
  }
  SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
  SetCache2.prototype.has = setCacheHas2;
  function Stack2(entries) {
    var data = this.__data__ = new ListCache2(entries);
    this.size = data.size;
  }
  function stackClear2() {
    this.__data__ = new ListCache2();
    this.size = 0;
  }
  function stackDelete2(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet2(key) {
    return this.__data__.get(key);
  }
  function stackHas2(key) {
    return this.__data__.has(key);
  }
  function stackSet2(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache2) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache2(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  Stack2.prototype.clear = stackClear2;
  Stack2.prototype["delete"] = stackDelete2;
  Stack2.prototype.get = stackGet2;
  Stack2.prototype.has = stackHas2;
  Stack2.prototype.set = stackSet2;
  function arrayLikeKeys2(value, inherited) {
    var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes2(value.length, String) : [], length = result.length;
    for (var key in value) {
      if (hasOwnProperty2.call(value, key) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex2(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  function assocIndexOf2(array, key) {
    var length = array.length;
    while (length--) {
      if (eq2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseGetAllKeys2(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush2(result, symbolsFunc(object));
  }
  function baseGetTag2(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag2 : nullTag2;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag2(value) : objectToString2(value);
  }
  function baseIsArguments2(value) {
    return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
  }
  function baseIsEqual2(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
  }
  function baseIsEqualDeep2(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag2(object), othTag = othIsArr ? arrayTag2 : getTag2(other);
    objTag = objTag == argsTag2 ? objectTag2 : objTag;
    othTag = othTag == argsTag2 ? objectTag2 : othTag;
    var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack2());
      return objIsArr || isTypedArray2(object) ? equalArrays2(object, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG2)) {
      var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack2());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack2());
    return equalObjects2(object, other, bitmask, customizer, equalFunc, stack);
  }
  function baseIsNative2(value) {
    if (!isObject2(value) || isMasked2(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
    return pattern.test(toSource2(value));
  }
  function baseIsTypedArray2(value) {
    return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
  }
  function baseKeys2(object) {
    if (!isPrototype2(object)) {
      return nativeKeys2(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function equalArrays2(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG2 ? new SetCache2() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome2(other, function(othValue2, othIndex) {
          if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  function equalByTag2(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag2:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag2:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
          return false;
        }
        return true;
      case boolTag2:
      case dateTag2:
      case numberTag2:
        return eq2(+object, +other);
      case errorTag2:
        return object.name == other.name && object.message == other.message;
      case regexpTag2:
      case stringTag2:
        return object == other + "";
      case mapTag2:
        var convert = mapToArray2;
      case setTag2:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
        convert || (convert = setToArray2);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG2;
        stack.set(object, other);
        var result = equalArrays2(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag2:
        if (symbolValueOf2) {
          return symbolValueOf2.call(object) == symbolValueOf2.call(other);
        }
    }
    return false;
  }
  function equalObjects2(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, objProps = getAllKeys2(object), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
        return false;
      }
    }
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) {
      return stacked == other;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  function getAllKeys2(object) {
    return baseGetAllKeys2(object, keys2, getSymbols2);
  }
  function getMapData2(map, key) {
    var data = map.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function getNative2(object, key) {
    var value = getValue2(object, key);
    return baseIsNative2(value) ? value : void 0;
  }
  function getRawTag2(value) {
    var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
    try {
      value[symToStringTag2] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString2.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag2] = tag;
      } else {
        delete value[symToStringTag2];
      }
    }
    return result;
  }
  var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter2(nativeGetSymbols2(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  var getTag2 = baseGetTag2;
  if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
    getTag2 = function(value) {
      var result = baseGetTag2(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString2:
            return dataViewTag2;
          case mapCtorString2:
            return mapTag2;
          case promiseCtorString2:
            return promiseTag2;
          case setCtorString2:
            return setTag2;
          case weakMapCtorString2:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  function isIndex2(value, length) {
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (typeof value == "number" || reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  function isKeyable2(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function isMasked2(func) {
    return !!maskSrcKey2 && maskSrcKey2 in func;
  }
  function isPrototype2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
    return value === proto;
  }
  function objectToString2(value) {
    return nativeObjectToString2.call(value);
  }
  function toSource2(func) {
    if (func != null) {
      try {
        return funcToString2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  var isArguments2 = baseIsArguments2(/* @__PURE__ */ function() {
    return arguments;
  }()) ? baseIsArguments2 : function(value) {
    return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
  };
  var isArray2 = Array.isArray;
  function isArrayLike2(value) {
    return value != null && isLength2(value.length) && !isFunction2(value);
  }
  var isBuffer2 = nativeIsBuffer2 || stubFalse2;
  function isEqual2(value, other) {
    return baseIsEqual2(value, other);
  }
  function isFunction2(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag2(value);
    return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
  }
  function isLength2(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  function isObjectLike2(value) {
    return value != null && typeof value == "object";
  }
  var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
  function keys2(object) {
    return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
  }
  function stubArray2() {
    return [];
  }
  function stubFalse2() {
    return false;
  }
  module2.exports = isEqual2;
})(lodash_isequal, lodash_isequal.exports);
var lodash_isequalExports = lodash_isequal.exports;
var AttributeMap$1 = {};
Object.defineProperty(AttributeMap$1, "__esModule", { value: true });
const cloneDeep = lodash_clonedeepExports;
const isEqual = lodash_isequalExports;
var AttributeMap;
(function(AttributeMap2) {
  function compose(a = {}, b = {}, keepNull = false) {
    if (typeof a !== "object") {
      a = {};
    }
    if (typeof b !== "object") {
      b = {};
    }
    let attributes = cloneDeep(b);
    if (!keepNull) {
      attributes = Object.keys(attributes).reduce((copy, key) => {
        if (attributes[key] != null) {
          copy[key] = attributes[key];
        }
        return copy;
      }, {});
    }
    for (const key in a) {
      if (a[key] !== void 0 && b[key] === void 0) {
        attributes[key] = a[key];
      }
    }
    return Object.keys(attributes).length > 0 ? attributes : void 0;
  }
  AttributeMap2.compose = compose;
  function diff2(a = {}, b = {}) {
    if (typeof a !== "object") {
      a = {};
    }
    if (typeof b !== "object") {
      b = {};
    }
    const attributes = Object.keys(a).concat(Object.keys(b)).reduce((attrs, key) => {
      if (!isEqual(a[key], b[key])) {
        attrs[key] = b[key] === void 0 ? null : b[key];
      }
      return attrs;
    }, {});
    return Object.keys(attributes).length > 0 ? attributes : void 0;
  }
  AttributeMap2.diff = diff2;
  function invert(attr = {}, base = {}) {
    attr = attr || {};
    const baseInverted = Object.keys(base).reduce((memo, key) => {
      if (base[key] !== attr[key] && attr[key] !== void 0) {
        memo[key] = base[key];
      }
      return memo;
    }, {});
    return Object.keys(attr).reduce((memo, key) => {
      if (attr[key] !== base[key] && base[key] === void 0) {
        memo[key] = null;
      }
      return memo;
    }, baseInverted);
  }
  AttributeMap2.invert = invert;
  function transform(a, b, priority = false) {
    if (typeof a !== "object") {
      return b;
    }
    if (typeof b !== "object") {
      return void 0;
    }
    if (!priority) {
      return b;
    }
    const attributes = Object.keys(b).reduce((attrs, key) => {
      if (a[key] === void 0) {
        attrs[key] = b[key];
      }
      return attrs;
    }, {});
    return Object.keys(attributes).length > 0 ? attributes : void 0;
  }
  AttributeMap2.transform = transform;
})(AttributeMap || (AttributeMap = {}));
AttributeMap$1.default = AttributeMap;
var Op$1 = {};
Object.defineProperty(Op$1, "__esModule", { value: true });
var Op;
(function(Op2) {
  function length(op) {
    if (typeof op.delete === "number") {
      return op.delete;
    } else if (typeof op.retain === "number") {
      return op.retain;
    } else if (typeof op.retain === "object" && op.retain !== null) {
      return 1;
    } else {
      return typeof op.insert === "string" ? op.insert.length : 1;
    }
  }
  Op2.length = length;
})(Op || (Op = {}));
Op$1.default = Op;
var OpIterator = {};
Object.defineProperty(OpIterator, "__esModule", { value: true });
const Op_1 = Op$1;
class Iterator {
  constructor(ops) {
    this.ops = ops;
    this.index = 0;
    this.offset = 0;
  }
  hasNext() {
    return this.peekLength() < Infinity;
  }
  next(length) {
    if (!length) {
      length = Infinity;
    }
    const nextOp = this.ops[this.index];
    if (nextOp) {
      const offset = this.offset;
      const opLength = Op_1.default.length(nextOp);
      if (length >= opLength - offset) {
        length = opLength - offset;
        this.index += 1;
        this.offset = 0;
      } else {
        this.offset += length;
      }
      if (typeof nextOp.delete === "number") {
        return { delete: length };
      } else {
        const retOp = {};
        if (nextOp.attributes) {
          retOp.attributes = nextOp.attributes;
        }
        if (typeof nextOp.retain === "number") {
          retOp.retain = length;
        } else if (typeof nextOp.retain === "object" && nextOp.retain !== null) {
          retOp.retain = nextOp.retain;
        } else if (typeof nextOp.insert === "string") {
          retOp.insert = nextOp.insert.substr(offset, length);
        } else {
          retOp.insert = nextOp.insert;
        }
        return retOp;
      }
    } else {
      return { retain: Infinity };
    }
  }
  peek() {
    return this.ops[this.index];
  }
  peekLength() {
    if (this.ops[this.index]) {
      return Op_1.default.length(this.ops[this.index]) - this.offset;
    } else {
      return Infinity;
    }
  }
  peekType() {
    const op = this.ops[this.index];
    if (op) {
      if (typeof op.delete === "number") {
        return "delete";
      } else if (typeof op.retain === "number" || typeof op.retain === "object" && op.retain !== null) {
        return "retain";
      } else {
        return "insert";
      }
    }
    return "retain";
  }
  rest() {
    if (!this.hasNext()) {
      return [];
    } else if (this.offset === 0) {
      return this.ops.slice(this.index);
    } else {
      const offset = this.offset;
      const index = this.index;
      const next = this.next();
      const rest = this.ops.slice(this.index);
      this.offset = offset;
      this.index = index;
      return [next].concat(rest);
    }
  }
}
OpIterator.default = Iterator;
(function(module2, exports$1) {
  Object.defineProperty(exports$1, "__esModule", { value: true });
  exports$1.AttributeMap = exports$1.OpIterator = exports$1.Op = void 0;
  const diff2 = diff_1;
  const cloneDeep2 = lodash_clonedeepExports;
  const isEqual2 = lodash_isequalExports;
  const AttributeMap_1 = AttributeMap$1;
  exports$1.AttributeMap = AttributeMap_1.default;
  const Op_12 = Op$1;
  exports$1.Op = Op_12.default;
  const OpIterator_1 = OpIterator;
  exports$1.OpIterator = OpIterator_1.default;
  const NULL_CHARACTER = String.fromCharCode(0);
  const getEmbedTypeAndData = (a, b) => {
    if (typeof a !== "object" || a === null) {
      throw new Error(`cannot retain a ${typeof a}`);
    }
    if (typeof b !== "object" || b === null) {
      throw new Error(`cannot retain a ${typeof b}`);
    }
    const embedType = Object.keys(a)[0];
    if (!embedType || embedType !== Object.keys(b)[0]) {
      throw new Error(`embed types not matched: ${embedType} != ${Object.keys(b)[0]}`);
    }
    return [embedType, a[embedType], b[embedType]];
  };
  class Delta2 {
    constructor(ops) {
      if (Array.isArray(ops)) {
        this.ops = ops;
      } else if (ops != null && Array.isArray(ops.ops)) {
        this.ops = ops.ops;
      } else {
        this.ops = [];
      }
    }
    static registerEmbed(embedType, handler) {
      this.handlers[embedType] = handler;
    }
    static unregisterEmbed(embedType) {
      delete this.handlers[embedType];
    }
    static getHandler(embedType) {
      const handler = this.handlers[embedType];
      if (!handler) {
        throw new Error(`no handlers for embed type "${embedType}"`);
      }
      return handler;
    }
    insert(arg, attributes) {
      const newOp = {};
      if (typeof arg === "string" && arg.length === 0) {
        return this;
      }
      newOp.insert = arg;
      if (attributes != null && typeof attributes === "object" && Object.keys(attributes).length > 0) {
        newOp.attributes = attributes;
      }
      return this.push(newOp);
    }
    delete(length) {
      if (length <= 0) {
        return this;
      }
      return this.push({ delete: length });
    }
    retain(length, attributes) {
      if (typeof length === "number" && length <= 0) {
        return this;
      }
      const newOp = { retain: length };
      if (attributes != null && typeof attributes === "object" && Object.keys(attributes).length > 0) {
        newOp.attributes = attributes;
      }
      return this.push(newOp);
    }
    push(newOp) {
      let index = this.ops.length;
      let lastOp = this.ops[index - 1];
      newOp = cloneDeep2(newOp);
      if (typeof lastOp === "object") {
        if (typeof newOp.delete === "number" && typeof lastOp.delete === "number") {
          this.ops[index - 1] = { delete: lastOp.delete + newOp.delete };
          return this;
        }
        if (typeof lastOp.delete === "number" && newOp.insert != null) {
          index -= 1;
          lastOp = this.ops[index - 1];
          if (typeof lastOp !== "object") {
            this.ops.unshift(newOp);
            return this;
          }
        }
        if (isEqual2(newOp.attributes, lastOp.attributes)) {
          if (typeof newOp.insert === "string" && typeof lastOp.insert === "string") {
            this.ops[index - 1] = { insert: lastOp.insert + newOp.insert };
            if (typeof newOp.attributes === "object") {
              this.ops[index - 1].attributes = newOp.attributes;
            }
            return this;
          } else if (typeof newOp.retain === "number" && typeof lastOp.retain === "number") {
            this.ops[index - 1] = { retain: lastOp.retain + newOp.retain };
            if (typeof newOp.attributes === "object") {
              this.ops[index - 1].attributes = newOp.attributes;
            }
            return this;
          }
        }
      }
      if (index === this.ops.length) {
        this.ops.push(newOp);
      } else {
        this.ops.splice(index, 0, newOp);
      }
      return this;
    }
    chop() {
      const lastOp = this.ops[this.ops.length - 1];
      if (lastOp && typeof lastOp.retain === "number" && !lastOp.attributes) {
        this.ops.pop();
      }
      return this;
    }
    filter(predicate) {
      return this.ops.filter(predicate);
    }
    forEach(predicate) {
      this.ops.forEach(predicate);
    }
    map(predicate) {
      return this.ops.map(predicate);
    }
    partition(predicate) {
      const passed = [];
      const failed = [];
      this.forEach((op) => {
        const target = predicate(op) ? passed : failed;
        target.push(op);
      });
      return [passed, failed];
    }
    reduce(predicate, initialValue) {
      return this.ops.reduce(predicate, initialValue);
    }
    changeLength() {
      return this.reduce((length, elem) => {
        if (elem.insert) {
          return length + Op_12.default.length(elem);
        } else if (elem.delete) {
          return length - elem.delete;
        }
        return length;
      }, 0);
    }
    length() {
      return this.reduce((length, elem) => {
        return length + Op_12.default.length(elem);
      }, 0);
    }
    slice(start = 0, end = Infinity) {
      const ops = [];
      const iter = new OpIterator_1.default(this.ops);
      let index = 0;
      while (index < end && iter.hasNext()) {
        let nextOp;
        if (index < start) {
          nextOp = iter.next(start - index);
        } else {
          nextOp = iter.next(end - index);
          ops.push(nextOp);
        }
        index += Op_12.default.length(nextOp);
      }
      return new Delta2(ops);
    }
    compose(other) {
      const thisIter = new OpIterator_1.default(this.ops);
      const otherIter = new OpIterator_1.default(other.ops);
      const ops = [];
      const firstOther = otherIter.peek();
      if (firstOther != null && typeof firstOther.retain === "number" && firstOther.attributes == null) {
        let firstLeft = firstOther.retain;
        while (thisIter.peekType() === "insert" && thisIter.peekLength() <= firstLeft) {
          firstLeft -= thisIter.peekLength();
          ops.push(thisIter.next());
        }
        if (firstOther.retain - firstLeft > 0) {
          otherIter.next(firstOther.retain - firstLeft);
        }
      }
      const delta = new Delta2(ops);
      while (thisIter.hasNext() || otherIter.hasNext()) {
        if (otherIter.peekType() === "insert") {
          delta.push(otherIter.next());
        } else if (thisIter.peekType() === "delete") {
          delta.push(thisIter.next());
        } else {
          const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
          const thisOp = thisIter.next(length);
          const otherOp = otherIter.next(length);
          if (otherOp.retain) {
            const newOp = {};
            if (typeof thisOp.retain === "number") {
              newOp.retain = typeof otherOp.retain === "number" ? length : otherOp.retain;
            } else {
              if (typeof otherOp.retain === "number") {
                if (thisOp.retain == null) {
                  newOp.insert = thisOp.insert;
                } else {
                  newOp.retain = thisOp.retain;
                }
              } else {
                const action = thisOp.retain == null ? "insert" : "retain";
                const [embedType, thisData, otherData] = getEmbedTypeAndData(thisOp[action], otherOp.retain);
                const handler = Delta2.getHandler(embedType);
                newOp[action] = {
                  [embedType]: handler.compose(thisData, otherData, action === "retain")
                };
              }
            }
            const attributes = AttributeMap_1.default.compose(thisOp.attributes, otherOp.attributes, typeof thisOp.retain === "number");
            if (attributes) {
              newOp.attributes = attributes;
            }
            delta.push(newOp);
            if (!otherIter.hasNext() && isEqual2(delta.ops[delta.ops.length - 1], newOp)) {
              const rest = new Delta2(thisIter.rest());
              return delta.concat(rest).chop();
            }
          } else if (typeof otherOp.delete === "number" && (typeof thisOp.retain === "number" || typeof thisOp.retain === "object" && thisOp.retain !== null)) {
            delta.push(otherOp);
          }
        }
      }
      return delta.chop();
    }
    concat(other) {
      const delta = new Delta2(this.ops.slice());
      if (other.ops.length > 0) {
        delta.push(other.ops[0]);
        delta.ops = delta.ops.concat(other.ops.slice(1));
      }
      return delta;
    }
    diff(other, cursor) {
      if (this.ops === other.ops) {
        return new Delta2();
      }
      const strings = [this, other].map((delta) => {
        return delta.map((op) => {
          if (op.insert != null) {
            return typeof op.insert === "string" ? op.insert : NULL_CHARACTER;
          }
          const prep = delta === other ? "on" : "with";
          throw new Error("diff() called " + prep + " non-document");
        }).join("");
      });
      const retDelta = new Delta2();
      const diffResult = diff2(strings[0], strings[1], cursor, true);
      const thisIter = new OpIterator_1.default(this.ops);
      const otherIter = new OpIterator_1.default(other.ops);
      diffResult.forEach((component) => {
        let length = component[1].length;
        while (length > 0) {
          let opLength = 0;
          switch (component[0]) {
            case diff2.INSERT:
              opLength = Math.min(otherIter.peekLength(), length);
              retDelta.push(otherIter.next(opLength));
              break;
            case diff2.DELETE:
              opLength = Math.min(length, thisIter.peekLength());
              thisIter.next(opLength);
              retDelta.delete(opLength);
              break;
            case diff2.EQUAL:
              opLength = Math.min(thisIter.peekLength(), otherIter.peekLength(), length);
              const thisOp = thisIter.next(opLength);
              const otherOp = otherIter.next(opLength);
              if (isEqual2(thisOp.insert, otherOp.insert)) {
                retDelta.retain(opLength, AttributeMap_1.default.diff(thisOp.attributes, otherOp.attributes));
              } else {
                retDelta.push(otherOp).delete(opLength);
              }
              break;
          }
          length -= opLength;
        }
      });
      return retDelta.chop();
    }
    eachLine(predicate, newline = "\n") {
      const iter = new OpIterator_1.default(this.ops);
      let line = new Delta2();
      let i = 0;
      while (iter.hasNext()) {
        if (iter.peekType() !== "insert") {
          return;
        }
        const thisOp = iter.peek();
        const start = Op_12.default.length(thisOp) - iter.peekLength();
        const index = typeof thisOp.insert === "string" ? thisOp.insert.indexOf(newline, start) - start : -1;
        if (index < 0) {
          line.push(iter.next());
        } else if (index > 0) {
          line.push(iter.next(index));
        } else {
          if (predicate(line, iter.next(1).attributes || {}, i) === false) {
            return;
          }
          i += 1;
          line = new Delta2();
        }
      }
      if (line.length() > 0) {
        predicate(line, {}, i);
      }
    }
    invert(base) {
      const inverted = new Delta2();
      this.reduce((baseIndex, op) => {
        if (op.insert) {
          inverted.delete(Op_12.default.length(op));
        } else if (typeof op.retain === "number" && op.attributes == null) {
          inverted.retain(op.retain);
          return baseIndex + op.retain;
        } else if (op.delete || typeof op.retain === "number") {
          const length = op.delete || op.retain;
          const slice = base.slice(baseIndex, baseIndex + length);
          slice.forEach((baseOp) => {
            if (op.delete) {
              inverted.push(baseOp);
            } else if (op.retain && op.attributes) {
              inverted.retain(Op_12.default.length(baseOp), AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
            }
          });
          return baseIndex + length;
        } else if (typeof op.retain === "object" && op.retain !== null) {
          const slice = base.slice(baseIndex, baseIndex + 1);
          const baseOp = new OpIterator_1.default(slice.ops).next();
          const [embedType, opData, baseOpData] = getEmbedTypeAndData(op.retain, baseOp.insert);
          const handler = Delta2.getHandler(embedType);
          inverted.retain({ [embedType]: handler.invert(opData, baseOpData) }, AttributeMap_1.default.invert(op.attributes, baseOp.attributes));
          return baseIndex + 1;
        }
        return baseIndex;
      }, 0);
      return inverted.chop();
    }
    transform(arg, priority = false) {
      priority = !!priority;
      if (typeof arg === "number") {
        return this.transformPosition(arg, priority);
      }
      const other = arg;
      const thisIter = new OpIterator_1.default(this.ops);
      const otherIter = new OpIterator_1.default(other.ops);
      const delta = new Delta2();
      while (thisIter.hasNext() || otherIter.hasNext()) {
        if (thisIter.peekType() === "insert" && (priority || otherIter.peekType() !== "insert")) {
          delta.retain(Op_12.default.length(thisIter.next()));
        } else if (otherIter.peekType() === "insert") {
          delta.push(otherIter.next());
        } else {
          const length = Math.min(thisIter.peekLength(), otherIter.peekLength());
          const thisOp = thisIter.next(length);
          const otherOp = otherIter.next(length);
          if (thisOp.delete) {
            continue;
          } else if (otherOp.delete) {
            delta.push(otherOp);
          } else {
            const thisData = thisOp.retain;
            const otherData = otherOp.retain;
            let transformedData = typeof otherData === "object" && otherData !== null ? otherData : length;
            if (typeof thisData === "object" && thisData !== null && typeof otherData === "object" && otherData !== null) {
              const embedType = Object.keys(thisData)[0];
              if (embedType === Object.keys(otherData)[0]) {
                const handler = Delta2.getHandler(embedType);
                if (handler) {
                  transformedData = {
                    [embedType]: handler.transform(thisData[embedType], otherData[embedType], priority)
                  };
                }
              }
            }
            delta.retain(transformedData, AttributeMap_1.default.transform(thisOp.attributes, otherOp.attributes, priority));
          }
        }
      }
      return delta.chop();
    }
    transformPosition(index, priority = false) {
      priority = !!priority;
      const thisIter = new OpIterator_1.default(this.ops);
      let offset = 0;
      while (thisIter.hasNext() && offset <= index) {
        const length = thisIter.peekLength();
        const nextType = thisIter.peekType();
        thisIter.next();
        if (nextType === "delete") {
          index -= Math.min(length, index - offset);
          continue;
        } else if (nextType === "insert" && (offset < index || !priority)) {
          index += length;
        }
        offset += length;
      }
      return index;
    }
  }
  Delta2.Op = Op_12.default;
  Delta2.OpIterator = OpIterator_1.default;
  Delta2.AttributeMap = AttributeMap_1.default;
  Delta2.handlers = {};
  exports$1.default = Delta2;
  {
    module2.exports = Delta2;
    module2.exports.default = Delta2;
  }
})(Delta$1, Delta$1.exports);
var DeltaExports = Delta$1.exports;
const Delta = /* @__PURE__ */ getDefaultExportFromCjs(DeltaExports);
class Break extends EmbedBlot$1 {
  static value() {
    return void 0;
  }
  optimize() {
    if (this.prev || this.next) {
      this.remove();
    }
  }
  length() {
    return 0;
  }
  value() {
    return "";
  }
}
Break.blotName = "break";
Break.tagName = "BR";
let Text$1 = class Text2 extends TextBlot$1 {
};
const entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
function escapeText(text) {
  return text.replace(/[&<>"']/g, (s) => entityMap[s]);
}
const _Inline = class _Inline extends InlineBlot$1 {
  static compare(self2, other) {
    const selfIndex = _Inline.order.indexOf(self2);
    const otherIndex = _Inline.order.indexOf(other);
    if (selfIndex >= 0 || otherIndex >= 0) {
      return selfIndex - otherIndex;
    }
    if (self2 === other) {
      return 0;
    }
    if (self2 < other) {
      return -1;
    }
    return 1;
  }
  formatAt(index, length, name, value) {
    if (_Inline.compare(this.statics.blotName, name) < 0 && this.scroll.query(name, Scope.BLOT)) {
      const blot = this.isolate(index, length);
      if (value) {
        blot.wrap(name, value);
      }
    } else {
      super.formatAt(index, length, name, value);
    }
  }
  optimize(context) {
    super.optimize(context);
    if (this.parent instanceof _Inline && _Inline.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
      const parent = this.parent.isolate(this.offset(), this.length());
      this.moveChildren(parent);
      parent.wrap(this);
    }
  }
};
__publicField(_Inline, "allowedChildren", [_Inline, Break, EmbedBlot$1, Text$1]);
// Lower index means deeper in the DOM tree, since not found (-1) is for embeds
__publicField(_Inline, "order", [
  "cursor",
  "inline",
  // Must be lower
  "link",
  // Chrome wants <a> to be lower
  "underline",
  "strike",
  "italic",
  "bold",
  "script",
  "code"
  // Must be higher
]);
let Inline = _Inline;
const NEWLINE_LENGTH = 1;
class Block extends BlockBlot$1 {
  constructor() {
    super(...arguments);
    __publicField(this, "cache", {});
  }
  delta() {
    if (this.cache.delta == null) {
      this.cache.delta = blockDelta(this);
    }
    return this.cache.delta;
  }
  deleteAt(index, length) {
    super.deleteAt(index, length);
    this.cache = {};
  }
  formatAt(index, length, name, value) {
    if (length <= 0) return;
    if (this.scroll.query(name, Scope.BLOCK)) {
      if (index + length === this.length()) {
        this.format(name, value);
      }
    } else {
      super.formatAt(index, Math.min(length, this.length() - index - 1), name, value);
    }
    this.cache = {};
  }
  insertAt(index, value, def) {
    if (def != null) {
      super.insertAt(index, value, def);
      this.cache = {};
      return;
    }
    if (value.length === 0) return;
    const lines = value.split("\n");
    const text = lines.shift();
    if (text.length > 0) {
      if (index < this.length() - 1 || this.children.tail == null) {
        super.insertAt(Math.min(index, this.length() - 1), text);
      } else {
        this.children.tail.insertAt(this.children.tail.length(), text);
      }
      this.cache = {};
    }
    let block = this;
    lines.reduce((lineIndex, line) => {
      block = block.split(lineIndex, true);
      block.insertAt(0, line);
      return line.length;
    }, index + text.length);
  }
  insertBefore(blot, ref) {
    const {
      head
    } = this.children;
    super.insertBefore(blot, ref);
    if (head instanceof Break) {
      head.remove();
    }
    this.cache = {};
  }
  length() {
    if (this.cache.length == null) {
      this.cache.length = super.length() + NEWLINE_LENGTH;
    }
    return this.cache.length;
  }
  moveChildren(target, ref) {
    super.moveChildren(target, ref);
    this.cache = {};
  }
  optimize(context) {
    super.optimize(context);
    this.cache = {};
  }
  path(index) {
    return super.path(index, true);
  }
  removeChild(child) {
    super.removeChild(child);
    this.cache = {};
  }
  split(index) {
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (force && (index === 0 || index >= this.length() - NEWLINE_LENGTH)) {
      const clone = this.clone();
      if (index === 0) {
        this.parent.insertBefore(clone, this);
        return this;
      }
      this.parent.insertBefore(clone, this.next);
      return clone;
    }
    const next = super.split(index, force);
    this.cache = {};
    return next;
  }
}
Block.blotName = "block";
Block.tagName = "P";
Block.defaultChild = Break;
Block.allowedChildren = [Break, Inline, EmbedBlot$1, Text$1];
class BlockEmbed extends EmbedBlot$1 {
  attach() {
    super.attach();
    this.attributes = new AttributorStore$1(this.domNode);
  }
  delta() {
    return new Delta().insert(this.value(), {
      ...this.formats(),
      ...this.attributes.values()
    });
  }
  format(name, value) {
    const attribute = this.scroll.query(name, Scope.BLOCK_ATTRIBUTE);
    if (attribute != null) {
      this.attributes.attribute(attribute, value);
    }
  }
  formatAt(index, length, name, value) {
    this.format(name, value);
  }
  insertAt(index, value, def) {
    if (def != null) {
      super.insertAt(index, value, def);
      return;
    }
    const lines = value.split("\n");
    const text = lines.pop();
    const blocks = lines.map((line) => {
      const block = this.scroll.create(Block.blotName);
      block.insertAt(0, line);
      return block;
    });
    const ref = this.split(index);
    blocks.forEach((block) => {
      this.parent.insertBefore(block, ref);
    });
    if (text) {
      this.parent.insertBefore(this.scroll.create("text", text), ref);
    }
  }
}
BlockEmbed.scope = Scope.BLOCK_BLOT;
function blockDelta(blot) {
  let filter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  return blot.descendants(LeafBlot$1).reduce((delta, leaf) => {
    if (leaf.length() === 0) {
      return delta;
    }
    return delta.insert(leaf.value(), bubbleFormats(leaf, {}, filter));
  }, new Delta()).insert("\n", bubbleFormats(blot));
}
function bubbleFormats(blot) {
  let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  let filter = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  if (blot == null) return formats;
  if ("formats" in blot && typeof blot.formats === "function") {
    formats = {
      ...formats,
      ...blot.formats()
    };
    if (filter) {
      delete formats["code-token"];
    }
  }
  if (blot.parent == null || blot.parent.statics.blotName === "scroll" || blot.parent.statics.scope !== blot.statics.scope) {
    return formats;
  }
  return bubbleFormats(blot.parent, formats, filter);
}
const _Cursor = class _Cursor extends EmbedBlot$1 {
  // Zero width no break space
  static value() {
    return void 0;
  }
  constructor(scroll, domNode, selection) {
    super(scroll, domNode);
    this.selection = selection;
    this.textNode = document.createTextNode(_Cursor.CONTENTS);
    this.domNode.appendChild(this.textNode);
    this.savedLength = 0;
  }
  detach() {
    if (this.parent != null) this.parent.removeChild(this);
  }
  format(name, value) {
    if (this.savedLength !== 0) {
      super.format(name, value);
      return;
    }
    let target = this;
    let index = 0;
    while (target != null && target.statics.scope !== Scope.BLOCK_BLOT) {
      index += target.offset(target.parent);
      target = target.parent;
    }
    if (target != null) {
      this.savedLength = _Cursor.CONTENTS.length;
      target.optimize();
      target.formatAt(index, _Cursor.CONTENTS.length, name, value);
      this.savedLength = 0;
    }
  }
  index(node, offset) {
    if (node === this.textNode) return 0;
    return super.index(node, offset);
  }
  length() {
    return this.savedLength;
  }
  position() {
    return [this.textNode, this.textNode.data.length];
  }
  remove() {
    super.remove();
    this.parent = null;
  }
  restore() {
    if (this.selection.composing || this.parent == null) return null;
    const range = this.selection.getNativeRange();
    while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
      this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
    }
    const prevTextBlot = this.prev instanceof Text$1 ? this.prev : null;
    const prevTextLength = prevTextBlot ? prevTextBlot.length() : 0;
    const nextTextBlot = this.next instanceof Text$1 ? this.next : null;
    const nextText = nextTextBlot ? nextTextBlot.text : "";
    const {
      textNode
    } = this;
    const newText = textNode.data.split(_Cursor.CONTENTS).join("");
    textNode.data = _Cursor.CONTENTS;
    let mergedTextBlot;
    if (prevTextBlot) {
      mergedTextBlot = prevTextBlot;
      if (newText || nextTextBlot) {
        prevTextBlot.insertAt(prevTextBlot.length(), newText + nextText);
        if (nextTextBlot) {
          nextTextBlot.remove();
        }
      }
    } else if (nextTextBlot) {
      mergedTextBlot = nextTextBlot;
      nextTextBlot.insertAt(0, newText);
    } else {
      const newTextNode = document.createTextNode(newText);
      mergedTextBlot = this.scroll.create(newTextNode);
      this.parent.insertBefore(mergedTextBlot, this);
    }
    this.remove();
    if (range) {
      const remapOffset = (node, offset) => {
        if (prevTextBlot && node === prevTextBlot.domNode) {
          return offset;
        }
        if (node === textNode) {
          return prevTextLength + offset - 1;
        }
        if (nextTextBlot && node === nextTextBlot.domNode) {
          return prevTextLength + newText.length + offset;
        }
        return null;
      };
      const start = remapOffset(range.start.node, range.start.offset);
      const end = remapOffset(range.end.node, range.end.offset);
      if (start !== null && end !== null) {
        return {
          startNode: mergedTextBlot.domNode,
          startOffset: start,
          endNode: mergedTextBlot.domNode,
          endOffset: end
        };
      }
    }
    return null;
  }
  update(mutations, context) {
    if (mutations.some((mutation) => {
      return mutation.type === "characterData" && mutation.target === this.textNode;
    })) {
      const range = this.restore();
      if (range) context.range = range;
    }
  }
  // Avoid .ql-cursor being a descendant of `<a/>`.
  // The reason is Safari pushes down `<a/>` on text insertion.
  // That will cause DOM nodes not sync with the model.
  //
  // For example ({I} is the caret), given the markup:
  //    <a><span class="ql-cursor">\uFEFF{I}</span></a>
  // When typing a char "x", `<a/>` will be pushed down inside the `<span>` first:
  //    <span class="ql-cursor"><a>\uFEFF{I}</a></span>
  // And then "x" will be inserted after `<a/>`:
  //    <span class="ql-cursor"><a>\uFEFF</a>d{I}</span>
  optimize(context) {
    super.optimize(context);
    let {
      parent
    } = this;
    while (parent) {
      if (parent.domNode.tagName === "A") {
        this.savedLength = _Cursor.CONTENTS.length;
        parent.isolate(this.offset(parent), this.length()).unwrap();
        this.savedLength = 0;
        break;
      }
      parent = parent.parent;
    }
  }
  value() {
    return "";
  }
};
__publicField(_Cursor, "blotName", "cursor");
__publicField(_Cursor, "className", "ql-cursor");
__publicField(_Cursor, "tagName", "span");
__publicField(_Cursor, "CONTENTS", "\uFEFF");
let Cursor = _Cursor;
var eventemitter3 = { exports: {} };
(function(module2) {
  var has = Object.prototype.hasOwnProperty, prefix = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new Events().__proto__) prefix = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
    else emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for (name in events = this._events) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
              args[j - 1] = arguments[j];
            }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
      else clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt]) clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix;
  EventEmitter2.EventEmitter = EventEmitter2;
  {
    module2.exports = EventEmitter2;
  }
})(eventemitter3);
var eventemitter3Exports = eventemitter3.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
const instances = /* @__PURE__ */ new WeakMap();
const levels = ["error", "warn", "log", "info"];
let level = "warn";
function debug$6(method) {
  if (level) {
    if (levels.indexOf(method) <= levels.indexOf(level)) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      console[method](...args);
    }
  }
}
function namespace(ns) {
  return levels.reduce((logger, method) => {
    logger[method] = debug$6.bind(console, method, ns);
    return logger;
  }, {});
}
namespace.level = (newLevel) => {
  level = newLevel;
};
debug$6.level = namespace.level;
const debug$5 = namespace("quill:events");
const EVENTS = ["selectionchange", "mousedown", "mouseup", "click"];
EVENTS.forEach((eventName) => {
  document.addEventListener(eventName, function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    Array.from(document.querySelectorAll(".ql-container")).forEach((node) => {
      const quill = instances.get(node);
      if (quill && quill.emitter) {
        quill.emitter.handleDOM(...args);
      }
    });
  });
});
class Emitter extends EventEmitter {
  constructor() {
    super();
    this.domListeners = {};
    this.on("error", debug$5.error);
  }
  emit() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    debug$5.log.call(debug$5, ...args);
    return super.emit(...args);
  }
  handleDOM(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    (this.domListeners[event.type] || []).forEach((_ref) => {
      let {
        node,
        handler
      } = _ref;
      if (event.target === node || node.contains(event.target)) {
        handler(event, ...args);
      }
    });
  }
  listenDOM(eventName, node, handler) {
    if (!this.domListeners[eventName]) {
      this.domListeners[eventName] = [];
    }
    this.domListeners[eventName].push({
      node,
      handler
    });
  }
}
__publicField(Emitter, "events", {
  EDITOR_CHANGE: "editor-change",
  SCROLL_BEFORE_UPDATE: "scroll-before-update",
  SCROLL_BLOT_MOUNT: "scroll-blot-mount",
  SCROLL_BLOT_UNMOUNT: "scroll-blot-unmount",
  SCROLL_OPTIMIZE: "scroll-optimize",
  SCROLL_UPDATE: "scroll-update",
  SCROLL_EMBED_UPDATE: "scroll-embed-update",
  SELECTION_CHANGE: "selection-change",
  TEXT_CHANGE: "text-change",
  COMPOSITION_BEFORE_START: "composition-before-start",
  COMPOSITION_START: "composition-start",
  COMPOSITION_BEFORE_END: "composition-before-end",
  COMPOSITION_END: "composition-end"
});
__publicField(Emitter, "sources", {
  API: "api",
  SILENT: "silent",
  USER: "user"
});
const debug$4 = namespace("quill:selection");
class Range {
  constructor(index) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    this.index = index;
    this.length = length;
  }
}
class Selection {
  constructor(scroll, emitter) {
    this.emitter = emitter;
    this.scroll = scroll;
    this.composing = false;
    this.mouseDown = false;
    this.root = this.scroll.domNode;
    this.cursor = this.scroll.create("cursor", this);
    this.savedRange = new Range(0, 0);
    this.lastRange = this.savedRange;
    this.lastNative = null;
    this.handleComposition();
    this.handleDragging();
    this.emitter.listenDOM("selectionchange", document, () => {
      if (!this.mouseDown && !this.composing) {
        setTimeout(this.update.bind(this, Emitter.sources.USER), 1);
      }
    });
    this.emitter.on(Emitter.events.SCROLL_BEFORE_UPDATE, () => {
      if (!this.hasFocus()) return;
      const native = this.getNativeRange();
      if (native == null) return;
      if (native.start.node === this.cursor.textNode) return;
      this.emitter.once(Emitter.events.SCROLL_UPDATE, (source, mutations) => {
        try {
          if (this.root.contains(native.start.node) && this.root.contains(native.end.node)) {
            this.setNativeRange(native.start.node, native.start.offset, native.end.node, native.end.offset);
          }
          const triggeredByTyping = mutations.some((mutation) => mutation.type === "characterData" || mutation.type === "childList" || mutation.type === "attributes" && mutation.target === this.root);
          this.update(triggeredByTyping ? Emitter.sources.SILENT : source);
        } catch (ignored) {
        }
      });
    });
    this.emitter.on(Emitter.events.SCROLL_OPTIMIZE, (mutations, context) => {
      if (context.range) {
        const {
          startNode,
          startOffset,
          endNode,
          endOffset
        } = context.range;
        this.setNativeRange(startNode, startOffset, endNode, endOffset);
        this.update(Emitter.sources.SILENT);
      }
    });
    this.update(Emitter.sources.SILENT);
  }
  handleComposition() {
    this.emitter.on(Emitter.events.COMPOSITION_BEFORE_START, () => {
      this.composing = true;
    });
    this.emitter.on(Emitter.events.COMPOSITION_END, () => {
      this.composing = false;
      if (this.cursor.parent) {
        const range = this.cursor.restore();
        if (!range) return;
        setTimeout(() => {
          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
        }, 1);
      }
    });
  }
  handleDragging() {
    this.emitter.listenDOM("mousedown", document.body, () => {
      this.mouseDown = true;
    });
    this.emitter.listenDOM("mouseup", document.body, () => {
      this.mouseDown = false;
      this.update(Emitter.sources.USER);
    });
  }
  focus() {
    if (this.hasFocus()) return;
    this.root.focus({
      preventScroll: true
    });
    this.setRange(this.savedRange);
  }
  format(format, value) {
    this.scroll.update();
    const nativeRange = this.getNativeRange();
    if (nativeRange == null || !nativeRange.native.collapsed || this.scroll.query(format, Scope.BLOCK)) return;
    if (nativeRange.start.node !== this.cursor.textNode) {
      const blot = this.scroll.find(nativeRange.start.node, false);
      if (blot == null) return;
      if (blot instanceof LeafBlot$1) {
        const after = blot.split(nativeRange.start.offset);
        blot.parent.insertBefore(this.cursor, after);
      } else {
        blot.insertBefore(this.cursor, nativeRange.start.node);
      }
      this.cursor.attach();
    }
    this.cursor.format(format, value);
    this.scroll.optimize();
    this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
    this.update();
  }
  getBounds(index) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    const scrollLength = this.scroll.length();
    index = Math.min(index, scrollLength - 1);
    length = Math.min(index + length, scrollLength - 1) - index;
    let node;
    let [leaf, offset] = this.scroll.leaf(index);
    if (leaf == null) return null;
    if (length > 0 && offset === leaf.length()) {
      const [next] = this.scroll.leaf(index + 1);
      if (next) {
        const [line] = this.scroll.line(index);
        const [nextLine] = this.scroll.line(index + 1);
        if (line === nextLine) {
          leaf = next;
          offset = 0;
        }
      }
    }
    [node, offset] = leaf.position(offset, true);
    const range = document.createRange();
    if (length > 0) {
      range.setStart(node, offset);
      [leaf, offset] = this.scroll.leaf(index + length);
      if (leaf == null) return null;
      [node, offset] = leaf.position(offset, true);
      range.setEnd(node, offset);
      return range.getBoundingClientRect();
    }
    let side = "left";
    let rect;
    if (node instanceof Text) {
      if (!node.data.length) {
        return null;
      }
      if (offset < node.data.length) {
        range.setStart(node, offset);
        range.setEnd(node, offset + 1);
      } else {
        range.setStart(node, offset - 1);
        range.setEnd(node, offset);
        side = "right";
      }
      rect = range.getBoundingClientRect();
    } else {
      if (!(leaf.domNode instanceof Element)) return null;
      rect = leaf.domNode.getBoundingClientRect();
      if (offset > 0) side = "right";
    }
    return {
      bottom: rect.top + rect.height,
      height: rect.height,
      left: rect[side],
      right: rect[side],
      top: rect.top,
      width: 0
    };
  }
  getNativeRange() {
    const selection = document.getSelection();
    if (selection == null || selection.rangeCount <= 0) return null;
    const nativeRange = selection.getRangeAt(0);
    if (nativeRange == null) return null;
    const range = this.normalizeNative(nativeRange);
    debug$4.info("getNativeRange", range);
    return range;
  }
  getRange() {
    const root2 = this.scroll.domNode;
    if ("isConnected" in root2 && !root2.isConnected) {
      return [null, null];
    }
    const normalized = this.getNativeRange();
    if (normalized == null) return [null, null];
    const range = this.normalizedToRange(normalized);
    return [range, normalized];
  }
  hasFocus() {
    return document.activeElement === this.root || document.activeElement != null && contains(this.root, document.activeElement);
  }
  normalizedToRange(range) {
    const positions = [[range.start.node, range.start.offset]];
    if (!range.native.collapsed) {
      positions.push([range.end.node, range.end.offset]);
    }
    const indexes = positions.map((position) => {
      const [node, offset] = position;
      const blot = this.scroll.find(node, true);
      const index = blot.offset(this.scroll);
      if (offset === 0) {
        return index;
      }
      if (blot instanceof LeafBlot$1) {
        return index + blot.index(node, offset);
      }
      return index + blot.length();
    });
    const end = Math.min(Math.max(...indexes), this.scroll.length() - 1);
    const start = Math.min(end, ...indexes);
    return new Range(start, end - start);
  }
  normalizeNative(nativeRange) {
    if (!contains(this.root, nativeRange.startContainer) || !nativeRange.collapsed && !contains(this.root, nativeRange.endContainer)) {
      return null;
    }
    const range = {
      start: {
        node: nativeRange.startContainer,
        offset: nativeRange.startOffset
      },
      end: {
        node: nativeRange.endContainer,
        offset: nativeRange.endOffset
      },
      native: nativeRange
    };
    [range.start, range.end].forEach((position) => {
      let {
        node,
        offset
      } = position;
      while (!(node instanceof Text) && node.childNodes.length > 0) {
        if (node.childNodes.length > offset) {
          node = node.childNodes[offset];
          offset = 0;
        } else if (node.childNodes.length === offset) {
          node = node.lastChild;
          if (node instanceof Text) {
            offset = node.data.length;
          } else if (node.childNodes.length > 0) {
            offset = node.childNodes.length;
          } else {
            offset = node.childNodes.length + 1;
          }
        } else {
          break;
        }
      }
      position.node = node;
      position.offset = offset;
    });
    return range;
  }
  rangeToNative(range) {
    const scrollLength = this.scroll.length();
    const getPosition = (index, inclusive) => {
      index = Math.min(scrollLength - 1, index);
      const [leaf, leafOffset] = this.scroll.leaf(index);
      return leaf ? leaf.position(leafOffset, inclusive) : [null, -1];
    };
    return [...getPosition(range.index, false), ...getPosition(range.index + range.length, true)];
  }
  setNativeRange(startNode, startOffset) {
    let endNode = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : startNode;
    let endOffset = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : startOffset;
    let force = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
    debug$4.info("setNativeRange", startNode, startOffset, endNode, endOffset);
    if (startNode != null && (this.root.parentNode == null || startNode.parentNode == null || // @ts-expect-error Fix me later
    endNode.parentNode == null)) {
      return;
    }
    const selection = document.getSelection();
    if (selection == null) return;
    if (startNode != null) {
      if (!this.hasFocus()) this.root.focus({
        preventScroll: true
      });
      const {
        native
      } = this.getNativeRange() || {};
      if (native == null || force || startNode !== native.startContainer || startOffset !== native.startOffset || endNode !== native.endContainer || endOffset !== native.endOffset) {
        if (startNode instanceof Element && startNode.tagName === "BR") {
          startOffset = Array.from(startNode.parentNode.childNodes).indexOf(startNode);
          startNode = startNode.parentNode;
        }
        if (endNode instanceof Element && endNode.tagName === "BR") {
          endOffset = Array.from(endNode.parentNode.childNodes).indexOf(endNode);
          endNode = endNode.parentNode;
        }
        const range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      selection.removeAllRanges();
      this.root.blur();
    }
  }
  setRange(range) {
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Emitter.sources.API;
    if (typeof force === "string") {
      source = force;
      force = false;
    }
    debug$4.info("setRange", range);
    if (range != null) {
      const args = this.rangeToNative(range);
      this.setNativeRange(...args, force);
    } else {
      this.setNativeRange(null);
    }
    this.update(source);
  }
  update() {
    let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Emitter.sources.USER;
    const oldRange = this.lastRange;
    const [lastRange, nativeRange] = this.getRange();
    this.lastRange = lastRange;
    this.lastNative = nativeRange;
    if (this.lastRange != null) {
      this.savedRange = this.lastRange;
    }
    if (!isEqual$2(oldRange, this.lastRange)) {
      if (!this.composing && nativeRange != null && nativeRange.native.collapsed && nativeRange.start.node !== this.cursor.textNode) {
        const range = this.cursor.restore();
        if (range) {
          this.setNativeRange(range.startNode, range.startOffset, range.endNode, range.endOffset);
        }
      }
      const args = [Emitter.events.SELECTION_CHANGE, cloneDeep$1(this.lastRange), cloneDeep$1(oldRange), source];
      this.emitter.emit(Emitter.events.EDITOR_CHANGE, ...args);
      if (source !== Emitter.sources.SILENT) {
        this.emitter.emit(...args);
      }
    }
  }
}
function contains(parent, descendant) {
  try {
    descendant.parentNode;
  } catch (e) {
    return false;
  }
  return parent.contains(descendant);
}
const ASCII = /^[ -~]*$/;
class Editor {
  constructor(scroll) {
    this.scroll = scroll;
    this.delta = this.getDelta();
  }
  applyDelta(delta) {
    this.scroll.update();
    let scrollLength = this.scroll.length();
    this.scroll.batchStart();
    const normalizedDelta = normalizeDelta(delta);
    const deleteDelta = new Delta();
    const normalizedOps = splitOpLines(normalizedDelta.ops.slice());
    normalizedOps.reduce((index, op) => {
      const length = DeltaExports.Op.length(op);
      let attributes = op.attributes || {};
      let isImplicitNewlinePrepended = false;
      let isImplicitNewlineAppended = false;
      if (op.insert != null) {
        deleteDelta.retain(length);
        if (typeof op.insert === "string") {
          const text = op.insert;
          isImplicitNewlineAppended = !text.endsWith("\n") && (scrollLength <= index || !!this.scroll.descendant(BlockEmbed, index)[0]);
          this.scroll.insertAt(index, text);
          const [line, offset] = this.scroll.line(index);
          let formats = merge({}, bubbleFormats(line));
          if (line instanceof Block) {
            const [leaf] = line.descendant(LeafBlot$1, offset);
            if (leaf) {
              formats = merge(formats, bubbleFormats(leaf));
            }
          }
          attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {};
        } else if (typeof op.insert === "object") {
          const key = Object.keys(op.insert)[0];
          if (key == null) return index;
          const isInlineEmbed = this.scroll.query(key, Scope.INLINE) != null;
          if (isInlineEmbed) {
            if (scrollLength <= index || !!this.scroll.descendant(BlockEmbed, index)[0]) {
              isImplicitNewlineAppended = true;
            }
          } else if (index > 0) {
            const [leaf, offset] = this.scroll.descendant(LeafBlot$1, index - 1);
            if (leaf instanceof Text$1) {
              const text = leaf.value();
              if (text[offset] !== "\n") {
                isImplicitNewlinePrepended = true;
              }
            } else if (leaf instanceof EmbedBlot$1 && leaf.statics.scope === Scope.INLINE_BLOT) {
              isImplicitNewlinePrepended = true;
            }
          }
          this.scroll.insertAt(index, key, op.insert[key]);
          if (isInlineEmbed) {
            const [leaf] = this.scroll.descendant(LeafBlot$1, index);
            if (leaf) {
              const formats = merge({}, bubbleFormats(leaf));
              attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {};
            }
          }
        }
        scrollLength += length;
      } else {
        deleteDelta.push(op);
        if (op.retain !== null && typeof op.retain === "object") {
          const key = Object.keys(op.retain)[0];
          if (key == null) return index;
          this.scroll.updateEmbedAt(index, key, op.retain[key]);
        }
      }
      Object.keys(attributes).forEach((name) => {
        this.scroll.formatAt(index, length, name, attributes[name]);
      });
      const prependedLength = isImplicitNewlinePrepended ? 1 : 0;
      const addedLength = isImplicitNewlineAppended ? 1 : 0;
      scrollLength += prependedLength + addedLength;
      deleteDelta.retain(prependedLength);
      deleteDelta.delete(addedLength);
      return index + length + prependedLength + addedLength;
    }, 0);
    deleteDelta.reduce((index, op) => {
      if (typeof op.delete === "number") {
        this.scroll.deleteAt(index, op.delete);
        return index;
      }
      return index + DeltaExports.Op.length(op);
    }, 0);
    this.scroll.batchEnd();
    this.scroll.optimize();
    return this.update(normalizedDelta);
  }
  deleteText(index, length) {
    this.scroll.deleteAt(index, length);
    return this.update(new Delta().retain(index).delete(length));
  }
  formatLine(index, length) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    this.scroll.update();
    Object.keys(formats).forEach((format) => {
      this.scroll.lines(index, Math.max(length, 1)).forEach((line) => {
        line.format(format, formats[format]);
      });
    });
    this.scroll.optimize();
    const delta = new Delta().retain(index).retain(length, cloneDeep$1(formats));
    return this.update(delta);
  }
  formatText(index, length) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    Object.keys(formats).forEach((format) => {
      this.scroll.formatAt(index, length, format, formats[format]);
    });
    const delta = new Delta().retain(index).retain(length, cloneDeep$1(formats));
    return this.update(delta);
  }
  getContents(index, length) {
    return this.delta.slice(index, index + length);
  }
  getDelta() {
    return this.scroll.lines().reduce((delta, line) => {
      return delta.concat(line.delta());
    }, new Delta());
  }
  getFormat(index) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    let lines = [];
    let leaves = [];
    if (length === 0) {
      this.scroll.path(index).forEach((path) => {
        const [blot] = path;
        if (blot instanceof Block) {
          lines.push(blot);
        } else if (blot instanceof LeafBlot$1) {
          leaves.push(blot);
        }
      });
    } else {
      lines = this.scroll.lines(index, length);
      leaves = this.scroll.descendants(LeafBlot$1, index, length);
    }
    const [lineFormats, leafFormats] = [lines, leaves].map((blots) => {
      const blot = blots.shift();
      if (blot == null) return {};
      let formats = bubbleFormats(blot);
      while (Object.keys(formats).length > 0) {
        const blot2 = blots.shift();
        if (blot2 == null) return formats;
        formats = combineFormats(bubbleFormats(blot2), formats);
      }
      return formats;
    });
    return {
      ...lineFormats,
      ...leafFormats
    };
  }
  getHTML(index, length) {
    const [line, lineOffset] = this.scroll.line(index);
    if (line) {
      const lineLength = line.length();
      const isWithinLine = line.length() >= lineOffset + length;
      if (isWithinLine && !(lineOffset === 0 && length === lineLength)) {
        return convertHTML(line, lineOffset, length, true);
      }
      return convertHTML(this.scroll, index, length, true);
    }
    return "";
  }
  getText(index, length) {
    return this.getContents(index, length).filter((op) => typeof op.insert === "string").map((op) => op.insert).join("");
  }
  insertContents(index, contents) {
    const normalizedDelta = normalizeDelta(contents);
    const change = new Delta().retain(index).concat(normalizedDelta);
    this.scroll.insertContents(index, normalizedDelta);
    return this.update(change);
  }
  insertEmbed(index, embed, value) {
    this.scroll.insertAt(index, embed, value);
    return this.update(new Delta().retain(index).insert({
      [embed]: value
    }));
  }
  insertText(index, text) {
    let formats = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    this.scroll.insertAt(index, text);
    Object.keys(formats).forEach((format) => {
      this.scroll.formatAt(index, text.length, format, formats[format]);
    });
    return this.update(new Delta().retain(index).insert(text, cloneDeep$1(formats)));
  }
  isBlank() {
    if (this.scroll.children.length === 0) return true;
    if (this.scroll.children.length > 1) return false;
    const blot = this.scroll.children.head;
    if ((blot == null ? void 0 : blot.statics.blotName) !== Block.blotName) return false;
    const block = blot;
    if (block.children.length > 1) return false;
    return block.children.head instanceof Break;
  }
  removeFormat(index, length) {
    const text = this.getText(index, length);
    const [line, offset] = this.scroll.line(index + length);
    let suffixLength = 0;
    let suffix = new Delta();
    if (line != null) {
      suffixLength = line.length() - offset;
      suffix = line.delta().slice(offset, offset + suffixLength - 1).insert("\n");
    }
    const contents = this.getContents(index, length + suffixLength);
    const diff2 = contents.diff(new Delta().insert(text).concat(suffix));
    const delta = new Delta().retain(index).concat(diff2);
    return this.applyDelta(delta);
  }
  update(change) {
    let mutations = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    let selectionInfo = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0;
    const oldDelta = this.delta;
    if (mutations.length === 1 && mutations[0].type === "characterData" && // @ts-expect-error Fix me later
    mutations[0].target.data.match(ASCII) && this.scroll.find(mutations[0].target)) {
      const textBlot = this.scroll.find(mutations[0].target);
      const formats = bubbleFormats(textBlot);
      const index = textBlot.offset(this.scroll);
      const oldValue = mutations[0].oldValue.replace(Cursor.CONTENTS, "");
      const oldText = new Delta().insert(oldValue);
      const newText = new Delta().insert(textBlot.value());
      const relativeSelectionInfo = selectionInfo && {
        oldRange: shiftRange$1(selectionInfo.oldRange, -index),
        newRange: shiftRange$1(selectionInfo.newRange, -index)
      };
      const diffDelta = new Delta().retain(index).concat(oldText.diff(newText, relativeSelectionInfo));
      change = diffDelta.reduce((delta, op) => {
        if (op.insert) {
          return delta.insert(op.insert, formats);
        }
        return delta.push(op);
      }, new Delta());
      this.delta = oldDelta.compose(change);
    } else {
      this.delta = this.getDelta();
      if (!change || !isEqual$2(oldDelta.compose(change), this.delta)) {
        change = oldDelta.diff(this.delta, selectionInfo);
      }
    }
    return change;
  }
}
function convertListHTML(items, lastIndent, types) {
  if (items.length === 0) {
    const [endTag2] = getListType(types.pop());
    if (lastIndent <= 0) {
      return `</li></${endTag2}>`;
    }
    return `</li></${endTag2}>${convertListHTML([], lastIndent - 1, types)}`;
  }
  const [{
    child,
    offset,
    length,
    indent,
    type
  }, ...rest] = items;
  const [tag, attribute] = getListType(type);
  if (indent > lastIndent) {
    types.push(type);
    if (indent === lastIndent + 1) {
      return `<${tag}><li${attribute}>${convertHTML(child, offset, length)}${convertListHTML(rest, indent, types)}`;
    }
    return `<${tag}><li>${convertListHTML(items, lastIndent + 1, types)}`;
  }
  const previousType = types[types.length - 1];
  if (indent === lastIndent && type === previousType) {
    return `</li><li${attribute}>${convertHTML(child, offset, length)}${convertListHTML(rest, indent, types)}`;
  }
  const [endTag] = getListType(types.pop());
  return `</li></${endTag}>${convertListHTML(items, lastIndent - 1, types)}`;
}
function convertHTML(blot, index, length) {
  let isRoot = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if ("html" in blot && typeof blot.html === "function") {
    return blot.html(index, length);
  }
  if (blot instanceof Text$1) {
    const escapedText = escapeText(blot.value().slice(index, index + length));
    return escapedText.replaceAll(" ", "&nbsp;");
  }
  if (blot instanceof ParentBlot$1) {
    if (blot.statics.blotName === "list-container") {
      const items = [];
      blot.children.forEachAt(index, length, (child, offset, childLength) => {
        const formats = "formats" in child && typeof child.formats === "function" ? child.formats() : {};
        items.push({
          child,
          offset,
          length: childLength,
          indent: formats.indent || 0,
          type: formats.list
        });
      });
      return convertListHTML(items, -1, []);
    }
    const parts = [];
    blot.children.forEachAt(index, length, (child, offset, childLength) => {
      parts.push(convertHTML(child, offset, childLength));
    });
    if (isRoot || blot.statics.blotName === "list") {
      return parts.join("");
    }
    const {
      outerHTML,
      innerHTML
    } = blot.domNode;
    const [start, end] = outerHTML.split(`>${innerHTML}<`);
    if (start === "<table") {
      return `<table style="border: 1px solid #000;">${parts.join("")}<${end}`;
    }
    return `${start}>${parts.join("")}<${end}`;
  }
  return blot.domNode instanceof Element ? blot.domNode.outerHTML : "";
}
function combineFormats(formats, combined) {
  return Object.keys(combined).reduce((merged, name) => {
    if (formats[name] == null) return merged;
    const combinedValue = combined[name];
    if (combinedValue === formats[name]) {
      merged[name] = combinedValue;
    } else if (Array.isArray(combinedValue)) {
      if (combinedValue.indexOf(formats[name]) < 0) {
        merged[name] = combinedValue.concat([formats[name]]);
      } else {
        merged[name] = combinedValue;
      }
    } else {
      merged[name] = [combinedValue, formats[name]];
    }
    return merged;
  }, {});
}
function getListType(type) {
  const tag = type === "ordered" ? "ol" : "ul";
  switch (type) {
    case "checked":
      return [tag, ' data-list="checked"'];
    case "unchecked":
      return [tag, ' data-list="unchecked"'];
    default:
      return [tag, ""];
  }
}
function normalizeDelta(delta) {
  return delta.reduce((normalizedDelta, op) => {
    if (typeof op.insert === "string") {
      const text = op.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      return normalizedDelta.insert(text, op.attributes);
    }
    return normalizedDelta.push(op);
  }, new Delta());
}
function shiftRange$1(_ref, amount) {
  let {
    index,
    length
  } = _ref;
  return new Range(index + amount, length);
}
function splitOpLines(ops) {
  const split = [];
  ops.forEach((op) => {
    if (typeof op.insert === "string") {
      const lines = op.insert.split("\n");
      lines.forEach((line, index) => {
        if (index) split.push({
          insert: "\n",
          attributes: op.attributes
        });
        if (line) split.push({
          insert: line,
          attributes: op.attributes
        });
      });
    } else {
      split.push(op);
    }
  });
  return split;
}
class Module {
  constructor(quill) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.quill = quill;
    this.options = options;
  }
}
__publicField(Module, "DEFAULTS", {});
const GUARD_TEXT = "\uFEFF";
class Embed extends EmbedBlot$1 {
  constructor(scroll, node) {
    super(scroll, node);
    this.contentNode = document.createElement("span");
    this.contentNode.setAttribute("contenteditable", "false");
    Array.from(this.domNode.childNodes).forEach((childNode) => {
      this.contentNode.appendChild(childNode);
    });
    this.leftGuard = document.createTextNode(GUARD_TEXT);
    this.rightGuard = document.createTextNode(GUARD_TEXT);
    this.domNode.appendChild(this.leftGuard);
    this.domNode.appendChild(this.contentNode);
    this.domNode.appendChild(this.rightGuard);
  }
  index(node, offset) {
    if (node === this.leftGuard) return 0;
    if (node === this.rightGuard) return 1;
    return super.index(node, offset);
  }
  restore(node) {
    let range = null;
    let textNode;
    const text = node.data.split(GUARD_TEXT).join("");
    if (node === this.leftGuard) {
      if (this.prev instanceof Text$1) {
        const prevLength = this.prev.length();
        this.prev.insertAt(prevLength, text);
        range = {
          startNode: this.prev.domNode,
          startOffset: prevLength + text.length
        };
      } else {
        textNode = document.createTextNode(text);
        this.parent.insertBefore(this.scroll.create(textNode), this);
        range = {
          startNode: textNode,
          startOffset: text.length
        };
      }
    } else if (node === this.rightGuard) {
      if (this.next instanceof Text$1) {
        this.next.insertAt(0, text);
        range = {
          startNode: this.next.domNode,
          startOffset: text.length
        };
      } else {
        textNode = document.createTextNode(text);
        this.parent.insertBefore(this.scroll.create(textNode), this.next);
        range = {
          startNode: textNode,
          startOffset: text.length
        };
      }
    }
    node.data = GUARD_TEXT;
    return range;
  }
  update(mutations, context) {
    mutations.forEach((mutation) => {
      if (mutation.type === "characterData" && (mutation.target === this.leftGuard || mutation.target === this.rightGuard)) {
        const range = this.restore(mutation.target);
        if (range) context.range = range;
      }
    });
  }
}
class Composition {
  constructor(scroll, emitter) {
    __publicField(this, "isComposing", false);
    this.scroll = scroll;
    this.emitter = emitter;
    this.setupListeners();
  }
  setupListeners() {
    this.scroll.domNode.addEventListener("compositionstart", (event) => {
      if (!this.isComposing) {
        this.handleCompositionStart(event);
      }
    });
    this.scroll.domNode.addEventListener("compositionend", (event) => {
      if (this.isComposing) {
        queueMicrotask(() => {
          this.handleCompositionEnd(event);
        });
      }
    });
  }
  handleCompositionStart(event) {
    const blot = event.target instanceof Node ? this.scroll.find(event.target, true) : null;
    if (blot && !(blot instanceof Embed)) {
      this.emitter.emit(Emitter.events.COMPOSITION_BEFORE_START, event);
      this.scroll.batchStart();
      this.emitter.emit(Emitter.events.COMPOSITION_START, event);
      this.isComposing = true;
    }
  }
  handleCompositionEnd(event) {
    this.emitter.emit(Emitter.events.COMPOSITION_BEFORE_END, event);
    this.scroll.batchEnd();
    this.emitter.emit(Emitter.events.COMPOSITION_END, event);
    this.isComposing = false;
  }
}
const _Theme = class _Theme {
  constructor(quill, options) {
    __publicField(this, "modules", {});
    this.quill = quill;
    this.options = options;
  }
  init() {
    Object.keys(this.options.modules).forEach((name) => {
      if (this.modules[name] == null) {
        this.addModule(name);
      }
    });
  }
  addModule(name) {
    const ModuleClass = this.quill.constructor.import(`modules/${name}`);
    this.modules[name] = new ModuleClass(this.quill, this.options.modules[name] || {});
    return this.modules[name];
  }
};
__publicField(_Theme, "DEFAULTS", {
  modules: {}
});
__publicField(_Theme, "themes", {
  default: _Theme
});
let Theme = _Theme;
const getParentElement = (element) => element.parentElement || element.getRootNode().host || null;
const getElementRect = (element) => {
  const rect = element.getBoundingClientRect();
  const scaleX = "offsetWidth" in element && Math.abs(rect.width) / element.offsetWidth || 1;
  const scaleY = "offsetHeight" in element && Math.abs(rect.height) / element.offsetHeight || 1;
  return {
    top: rect.top,
    right: rect.left + element.clientWidth * scaleX,
    bottom: rect.top + element.clientHeight * scaleY,
    left: rect.left
  };
};
const paddingValueToInt = (value) => {
  const number = parseInt(value, 10);
  return Number.isNaN(number) ? 0 : number;
};
const getScrollDistance = (targetStart, targetEnd, scrollStart, scrollEnd, scrollPaddingStart, scrollPaddingEnd) => {
  if (targetStart < scrollStart && targetEnd > scrollEnd) {
    return 0;
  }
  if (targetStart < scrollStart) {
    return -(scrollStart - targetStart + scrollPaddingStart);
  }
  if (targetEnd > scrollEnd) {
    return targetEnd - targetStart > scrollEnd - scrollStart ? targetStart + scrollPaddingStart - scrollStart : targetEnd - scrollEnd + scrollPaddingEnd;
  }
  return 0;
};
const scrollRectIntoView = (root2, targetRect) => {
  var _a2, _b, _c;
  const document2 = root2.ownerDocument;
  let rect = targetRect;
  let current = root2;
  while (current) {
    const isDocumentBody = current === document2.body;
    const bounding = isDocumentBody ? {
      top: 0,
      right: ((_a2 = window.visualViewport) == null ? void 0 : _a2.width) ?? document2.documentElement.clientWidth,
      bottom: ((_b = window.visualViewport) == null ? void 0 : _b.height) ?? document2.documentElement.clientHeight,
      left: 0
    } : getElementRect(current);
    const style = getComputedStyle(current);
    const scrollDistanceX = getScrollDistance(rect.left, rect.right, bounding.left, bounding.right, paddingValueToInt(style.scrollPaddingLeft), paddingValueToInt(style.scrollPaddingRight));
    const scrollDistanceY = getScrollDistance(rect.top, rect.bottom, bounding.top, bounding.bottom, paddingValueToInt(style.scrollPaddingTop), paddingValueToInt(style.scrollPaddingBottom));
    if (scrollDistanceX || scrollDistanceY) {
      if (isDocumentBody) {
        (_c = document2.defaultView) == null ? void 0 : _c.scrollBy(scrollDistanceX, scrollDistanceY);
      } else {
        const {
          scrollLeft,
          scrollTop
        } = current;
        if (scrollDistanceY) {
          current.scrollTop += scrollDistanceY;
        }
        if (scrollDistanceX) {
          current.scrollLeft += scrollDistanceX;
        }
        const scrolledLeft = current.scrollLeft - scrollLeft;
        const scrolledTop = current.scrollTop - scrollTop;
        rect = {
          left: rect.left - scrolledLeft,
          top: rect.top - scrolledTop,
          right: rect.right - scrolledLeft,
          bottom: rect.bottom - scrolledTop
        };
      }
    }
    current = isDocumentBody || style.position === "fixed" ? null : getParentElement(current);
  }
};
const MAX_REGISTER_ITERATIONS = 100;
const CORE_FORMATS = ["block", "break", "cursor", "inline", "scroll", "text"];
const createRegistryWithFormats = (formats, sourceRegistry, debug2) => {
  const registry = new Registry();
  CORE_FORMATS.forEach((name) => {
    const coreBlot = sourceRegistry.query(name);
    if (coreBlot) registry.register(coreBlot);
  });
  formats.forEach((name) => {
    let format = sourceRegistry.query(name);
    if (!format) {
      debug2.error(`Cannot register "${name}" specified in "formats" config. Are you sure it was registered?`);
    }
    let iterations = 0;
    while (format) {
      registry.register(format);
      format = "blotName" in format ? format.requiredContainer ?? null : null;
      iterations += 1;
      if (iterations > MAX_REGISTER_ITERATIONS) {
        debug2.error(`Cycle detected in registering blot requiredContainer: "${name}"`);
        break;
      }
    }
  });
  return registry;
};
const debug$3 = namespace("quill");
const globalRegistry = new Registry();
ParentBlot$1.uiClass = "ql-ui";
const _Quill = class _Quill {
  static debug(limit) {
    if (limit === true) {
      limit = "log";
    }
    namespace.level(limit);
  }
  static find(node) {
    let bubble = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    return instances.get(node) || globalRegistry.find(node, bubble);
  }
  static import(name) {
    if (this.imports[name] == null) {
      debug$3.error(`Cannot import ${name}. Are you sure it was registered?`);
    }
    return this.imports[name];
  }
  static register() {
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) !== "string") {
      const target = arguments.length <= 0 ? void 0 : arguments[0];
      const overwrite = !!(arguments.length <= 1 ? void 0 : arguments[1]);
      const name = "attrName" in target ? target.attrName : target.blotName;
      if (typeof name === "string") {
        this.register(`formats/${name}`, target, overwrite);
      } else {
        Object.keys(target).forEach((key) => {
          this.register(key, target[key], overwrite);
        });
      }
    } else {
      const path = arguments.length <= 0 ? void 0 : arguments[0];
      const target = arguments.length <= 1 ? void 0 : arguments[1];
      const overwrite = !!(arguments.length <= 2 ? void 0 : arguments[2]);
      if (this.imports[path] != null && !overwrite) {
        debug$3.warn(`Overwriting ${path} with`, target);
      }
      this.imports[path] = target;
      if ((path.startsWith("blots/") || path.startsWith("formats/")) && target && typeof target !== "boolean" && target.blotName !== "abstract") {
        globalRegistry.register(target);
      }
      if (typeof target.register === "function") {
        target.register(globalRegistry);
      }
    }
  }
  constructor(container) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.options = expandConfig(container, options);
    this.container = this.options.container;
    if (this.container == null) {
      debug$3.error("Invalid Quill container", container);
      return;
    }
    if (this.options.debug) {
      _Quill.debug(this.options.debug);
    }
    const html = this.container.innerHTML.trim();
    this.container.classList.add("ql-container");
    this.container.innerHTML = "";
    instances.set(this.container, this);
    this.root = this.addContainer("ql-editor");
    this.root.classList.add("ql-blank");
    this.emitter = new Emitter();
    const scrollBlotName = ScrollBlot$1.blotName;
    const ScrollBlot2 = this.options.registry.query(scrollBlotName);
    if (!ScrollBlot2 || !("blotName" in ScrollBlot2)) {
      throw new Error(`Cannot initialize Quill without "${scrollBlotName}" blot`);
    }
    this.scroll = new ScrollBlot2(this.options.registry, this.root, {
      emitter: this.emitter
    });
    this.editor = new Editor(this.scroll);
    this.selection = new Selection(this.scroll, this.emitter);
    this.composition = new Composition(this.scroll, this.emitter);
    this.theme = new this.options.theme(this, this.options);
    this.keyboard = this.theme.addModule("keyboard");
    this.clipboard = this.theme.addModule("clipboard");
    this.history = this.theme.addModule("history");
    this.uploader = this.theme.addModule("uploader");
    this.theme.addModule("input");
    this.theme.addModule("uiNode");
    this.theme.init();
    this.emitter.on(Emitter.events.EDITOR_CHANGE, (type) => {
      if (type === Emitter.events.TEXT_CHANGE) {
        this.root.classList.toggle("ql-blank", this.editor.isBlank());
      }
    });
    this.emitter.on(Emitter.events.SCROLL_UPDATE, (source, mutations) => {
      const oldRange = this.selection.lastRange;
      const [newRange] = this.selection.getRange();
      const selectionInfo = oldRange && newRange ? {
        oldRange,
        newRange
      } : void 0;
      modify.call(this, () => this.editor.update(null, mutations, selectionInfo), source);
    });
    this.emitter.on(Emitter.events.SCROLL_EMBED_UPDATE, (blot, delta) => {
      const oldRange = this.selection.lastRange;
      const [newRange] = this.selection.getRange();
      const selectionInfo = oldRange && newRange ? {
        oldRange,
        newRange
      } : void 0;
      modify.call(this, () => {
        const change = new Delta().retain(blot.offset(this)).retain({
          [blot.statics.blotName]: delta
        });
        return this.editor.update(change, [], selectionInfo);
      }, _Quill.sources.USER);
    });
    if (html) {
      const contents = this.clipboard.convert({
        html: `${html}<p><br></p>`,
        text: "\n"
      });
      this.setContents(contents);
    }
    this.history.clear();
    if (this.options.placeholder) {
      this.root.setAttribute("data-placeholder", this.options.placeholder);
    }
    if (this.options.readOnly) {
      this.disable();
    }
    this.allowReadOnlyEdits = false;
  }
  addContainer(container) {
    let refNode = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    if (typeof container === "string") {
      const className = container;
      container = document.createElement("div");
      container.classList.add(className);
    }
    this.container.insertBefore(container, refNode);
    return container;
  }
  blur() {
    this.selection.setRange(null);
  }
  deleteText(index, length, source) {
    [index, length, , source] = overload(index, length, source);
    return modify.call(this, () => {
      return this.editor.deleteText(index, length);
    }, source, index, -1 * length);
  }
  disable() {
    this.enable(false);
  }
  editReadOnly(modifier) {
    this.allowReadOnlyEdits = true;
    const value = modifier();
    this.allowReadOnlyEdits = false;
    return value;
  }
  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    this.scroll.enable(enabled);
    this.container.classList.toggle("ql-disabled", !enabled);
  }
  focus() {
    let options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.selection.focus();
    if (!options.preventScroll) {
      this.scrollSelectionIntoView();
    }
  }
  format(name, value) {
    let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Emitter.sources.API;
    return modify.call(this, () => {
      const range = this.getSelection(true);
      let change = new Delta();
      if (range == null) return change;
      if (this.scroll.query(name, Scope.BLOCK)) {
        change = this.editor.formatLine(range.index, range.length, {
          [name]: value
        });
      } else if (range.length === 0) {
        this.selection.format(name, value);
        return change;
      } else {
        change = this.editor.formatText(range.index, range.length, {
          [name]: value
        });
      }
      this.setSelection(range, Emitter.sources.SILENT);
      return change;
    }, source);
  }
  formatLine(index, length, name, value, source) {
    let formats;
    [index, length, formats, source] = overload(
      index,
      length,
      // @ts-expect-error
      name,
      value,
      source
    );
    return modify.call(this, () => {
      return this.editor.formatLine(index, length, formats);
    }, source, index, 0);
  }
  formatText(index, length, name, value, source) {
    let formats;
    [index, length, formats, source] = overload(
      // @ts-expect-error
      index,
      length,
      name,
      value,
      source
    );
    return modify.call(this, () => {
      return this.editor.formatText(index, length, formats);
    }, source, index, 0);
  }
  getBounds(index) {
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    let bounds = null;
    if (typeof index === "number") {
      bounds = this.selection.getBounds(index, length);
    } else {
      bounds = this.selection.getBounds(index.index, index.length);
    }
    if (!bounds) return null;
    const containerBounds = this.container.getBoundingClientRect();
    return {
      bottom: bounds.bottom - containerBounds.top,
      height: bounds.height,
      left: bounds.left - containerBounds.left,
      right: bounds.right - containerBounds.left,
      top: bounds.top - containerBounds.top,
      width: bounds.width
    };
  }
  getContents() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - index;
    [index, length] = overload(index, length);
    return this.editor.getContents(index, length);
  }
  getFormat() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(true);
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (typeof index === "number") {
      return this.editor.getFormat(index, length);
    }
    return this.editor.getFormat(index.index, index.length);
  }
  getIndex(blot) {
    return blot.offset(this.scroll);
  }
  getLength() {
    return this.scroll.length();
  }
  getLeaf(index) {
    return this.scroll.leaf(index);
  }
  getLine(index) {
    return this.scroll.line(index);
  }
  getLines() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    if (typeof index !== "number") {
      return this.scroll.lines(index.index, index.length);
    }
    return this.scroll.lines(index, length);
  }
  getModule(name) {
    return this.theme.modules[name];
  }
  getSelection() {
    let focus = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (focus) this.focus();
    this.update();
    return this.selection.getRange()[0];
  }
  getSemanticHTML() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 ? arguments[1] : void 0;
    if (typeof index === "number") {
      length = length ?? this.getLength() - index;
    }
    [index, length] = overload(index, length);
    return this.editor.getHTML(index, length);
  }
  getText() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 ? arguments[1] : void 0;
    if (typeof index === "number") {
      length = length ?? this.getLength() - index;
    }
    [index, length] = overload(index, length);
    return this.editor.getText(index, length);
  }
  hasFocus() {
    return this.selection.hasFocus();
  }
  insertEmbed(index, embed, value) {
    let source = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : _Quill.sources.API;
    return modify.call(this, () => {
      return this.editor.insertEmbed(index, embed, value);
    }, source, index);
  }
  insertText(index, text, name, value, source) {
    let formats;
    [index, , formats, source] = overload(index, 0, name, value, source);
    return modify.call(this, () => {
      return this.editor.insertText(index, text, formats);
    }, source, index, text.length);
  }
  isEnabled() {
    return this.scroll.isEnabled();
  }
  off() {
    return this.emitter.off(...arguments);
  }
  on() {
    return this.emitter.on(...arguments);
  }
  once() {
    return this.emitter.once(...arguments);
  }
  removeFormat(index, length, source) {
    [index, length, , source] = overload(index, length, source);
    return modify.call(this, () => {
      return this.editor.removeFormat(index, length);
    }, source, index);
  }
  scrollRectIntoView(rect) {
    scrollRectIntoView(this.root, rect);
  }
  /**
   * @deprecated Use Quill#scrollSelectionIntoView() instead.
   */
  scrollIntoView() {
    console.warn("Quill#scrollIntoView() has been deprecated and will be removed in the near future. Please use Quill#scrollSelectionIntoView() instead.");
    this.scrollSelectionIntoView();
  }
  /**
   * Scroll the current selection into the visible area.
   * If the selection is already visible, no scrolling will occur.
   */
  scrollSelectionIntoView() {
    const range = this.selection.lastRange;
    const bounds = range && this.selection.getBounds(range.index, range.length);
    if (bounds) {
      this.scrollRectIntoView(bounds);
    }
  }
  setContents(delta) {
    let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API;
    return modify.call(this, () => {
      delta = new Delta(delta);
      const length = this.getLength();
      const delete1 = this.editor.deleteText(0, length);
      const applied = this.editor.insertContents(0, delta);
      const delete2 = this.editor.deleteText(this.getLength() - 1, 1);
      return delete1.compose(applied).compose(delete2);
    }, source);
  }
  setSelection(index, length, source) {
    if (index == null) {
      this.selection.setRange(null, length || _Quill.sources.API);
    } else {
      [index, length, , source] = overload(index, length, source);
      this.selection.setRange(new Range(Math.max(0, index), length), source);
      if (source !== Emitter.sources.SILENT) {
        this.scrollSelectionIntoView();
      }
    }
  }
  setText(text) {
    let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API;
    const delta = new Delta().insert(text);
    return this.setContents(delta, source);
  }
  update() {
    let source = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : Emitter.sources.USER;
    const change = this.scroll.update(source);
    this.selection.update(source);
    return change;
  }
  updateContents(delta) {
    let source = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Emitter.sources.API;
    return modify.call(this, () => {
      delta = new Delta(delta);
      return this.editor.applyDelta(delta);
    }, source, true);
  }
};
__publicField(_Quill, "DEFAULTS", {
  bounds: null,
  modules: {
    clipboard: true,
    keyboard: true,
    history: true,
    uploader: true
  },
  placeholder: "",
  readOnly: false,
  registry: globalRegistry,
  theme: "default"
});
__publicField(_Quill, "events", Emitter.events);
__publicField(_Quill, "sources", Emitter.sources);
__publicField(_Quill, "version", "2.0.3");
__publicField(_Quill, "imports", {
  delta: Delta,
  parchment: Parchment,
  "core/module": Module,
  "core/theme": Theme
});
let Quill = _Quill;
function resolveSelector(selector) {
  return typeof selector === "string" ? document.querySelector(selector) : selector;
}
function expandModuleConfig(config2) {
  return Object.entries(config2 ?? {}).reduce((expanded, _ref) => {
    let [key, value] = _ref;
    return {
      ...expanded,
      [key]: value === true ? {} : value
    };
  }, {});
}
function omitUndefinedValuesFromOptions(obj) {
  return Object.fromEntries(Object.entries(obj).filter((entry) => entry[1] !== void 0));
}
function expandConfig(containerOrSelector, options) {
  const container = resolveSelector(containerOrSelector);
  if (!container) {
    throw new Error("Invalid Quill container");
  }
  const shouldUseDefaultTheme = !options.theme || options.theme === Quill.DEFAULTS.theme;
  const theme = shouldUseDefaultTheme ? Theme : Quill.import(`themes/${options.theme}`);
  if (!theme) {
    throw new Error(`Invalid theme ${options.theme}. Did you register it?`);
  }
  const {
    modules: quillModuleDefaults,
    ...quillDefaults
  } = Quill.DEFAULTS;
  const {
    modules: themeModuleDefaults,
    ...themeDefaults
  } = theme.DEFAULTS;
  let userModuleOptions = expandModuleConfig(options.modules);
  if (userModuleOptions != null && userModuleOptions.toolbar && userModuleOptions.toolbar.constructor !== Object) {
    userModuleOptions = {
      ...userModuleOptions,
      toolbar: {
        container: userModuleOptions.toolbar
      }
    };
  }
  const modules = merge({}, expandModuleConfig(quillModuleDefaults), expandModuleConfig(themeModuleDefaults), userModuleOptions);
  const config2 = {
    ...quillDefaults,
    ...omitUndefinedValuesFromOptions(themeDefaults),
    ...omitUndefinedValuesFromOptions(options)
  };
  let registry = options.registry;
  if (registry) {
    if (options.formats) {
      debug$3.warn('Ignoring "formats" option because "registry" is specified');
    }
  } else {
    registry = options.formats ? createRegistryWithFormats(options.formats, config2.registry, debug$3) : config2.registry;
  }
  return {
    ...config2,
    registry,
    container,
    theme,
    modules: Object.entries(modules).reduce((modulesWithDefaults, _ref2) => {
      let [name, value] = _ref2;
      if (!value) return modulesWithDefaults;
      const moduleClass = Quill.import(`modules/${name}`);
      if (moduleClass == null) {
        debug$3.error(`Cannot load ${name} module. Are you sure you registered it?`);
        return modulesWithDefaults;
      }
      return {
        ...modulesWithDefaults,
        // @ts-expect-error
        [name]: merge({}, moduleClass.DEFAULTS || {}, value)
      };
    }, {}),
    bounds: resolveSelector(config2.bounds)
  };
}
function modify(modifier, source, index, shift) {
  if (!this.isEnabled() && source === Emitter.sources.USER && !this.allowReadOnlyEdits) {
    return new Delta();
  }
  let range = index == null ? null : this.getSelection();
  const oldDelta = this.editor.delta;
  const change = modifier();
  if (range != null) {
    if (index === true) {
      index = range.index;
    }
    if (shift == null) {
      range = shiftRange(range, change, source);
    } else if (shift !== 0) {
      range = shiftRange(range, index, shift, source);
    }
    this.setSelection(range, Emitter.sources.SILENT);
  }
  if (change.length() > 0) {
    const args = [Emitter.events.TEXT_CHANGE, change, oldDelta, source];
    this.emitter.emit(Emitter.events.EDITOR_CHANGE, ...args);
    if (source !== Emitter.sources.SILENT) {
      this.emitter.emit(...args);
    }
  }
  return change;
}
function overload(index, length, name, value, source) {
  let formats = {};
  if (typeof index.index === "number" && typeof index.length === "number") {
    if (typeof length !== "number") {
      source = value;
      value = name;
      name = length;
      length = index.length;
      index = index.index;
    } else {
      length = index.length;
      index = index.index;
    }
  } else if (typeof length !== "number") {
    source = value;
    value = name;
    name = length;
    length = 0;
  }
  if (typeof name === "object") {
    formats = name;
    source = value;
  } else if (typeof name === "string") {
    if (value != null) {
      formats[name] = value;
    } else {
      source = name;
    }
  }
  source = source || Emitter.sources.API;
  return [index, length, formats, source];
}
function shiftRange(range, index, lengthOrSource, source) {
  const length = typeof lengthOrSource === "number" ? lengthOrSource : 0;
  if (range == null) return null;
  let start;
  let end;
  if (index && typeof index.transformPosition === "function") {
    [start, end] = [range.index, range.index + range.length].map((pos) => (
      // @ts-expect-error -- TODO: add a better type guard around `index`
      index.transformPosition(pos, source !== Emitter.sources.USER)
    ));
  } else {
    [start, end] = [range.index, range.index + range.length].map((pos) => {
      if (pos < index || pos === index && source === Emitter.sources.USER) return pos;
      if (length >= 0) {
        return pos + length;
      }
      return Math.max(index, pos + length);
    });
  }
  return new Range(start, end - start);
}
class Container extends ContainerBlot$1 {
}
function isLine$1(blot) {
  return blot instanceof Block || blot instanceof BlockEmbed;
}
function isUpdatable(blot) {
  return typeof blot.updateContent === "function";
}
class Scroll extends ScrollBlot$1 {
  constructor(registry, domNode, _ref) {
    let {
      emitter
    } = _ref;
    super(registry, domNode);
    this.emitter = emitter;
    this.batch = false;
    this.optimize();
    this.enable();
    this.domNode.addEventListener("dragstart", (e) => this.handleDragStart(e));
  }
  batchStart() {
    if (!Array.isArray(this.batch)) {
      this.batch = [];
    }
  }
  batchEnd() {
    if (!this.batch) return;
    const mutations = this.batch;
    this.batch = false;
    this.update(mutations);
  }
  emitMount(blot) {
    this.emitter.emit(Emitter.events.SCROLL_BLOT_MOUNT, blot);
  }
  emitUnmount(blot) {
    this.emitter.emit(Emitter.events.SCROLL_BLOT_UNMOUNT, blot);
  }
  emitEmbedUpdate(blot, change) {
    this.emitter.emit(Emitter.events.SCROLL_EMBED_UPDATE, blot, change);
  }
  deleteAt(index, length) {
    const [first, offset] = this.line(index);
    const [last] = this.line(index + length);
    super.deleteAt(index, length);
    if (last != null && first !== last && offset > 0) {
      if (first instanceof BlockEmbed || last instanceof BlockEmbed) {
        this.optimize();
        return;
      }
      const ref = last.children.head instanceof Break ? null : last.children.head;
      first.moveChildren(last, ref);
      first.remove();
    }
    this.optimize();
  }
  enable() {
    let enabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
    this.domNode.setAttribute("contenteditable", enabled ? "true" : "false");
  }
  formatAt(index, length, format, value) {
    super.formatAt(index, length, format, value);
    this.optimize();
  }
  insertAt(index, value, def) {
    if (index >= this.length()) {
      if (def == null || this.scroll.query(value, Scope.BLOCK) == null) {
        const blot = this.scroll.create(this.statics.defaultChild.blotName);
        this.appendChild(blot);
        if (def == null && value.endsWith("\n")) {
          blot.insertAt(0, value.slice(0, -1), def);
        } else {
          blot.insertAt(0, value, def);
        }
      } else {
        const embed = this.scroll.create(value, def);
        this.appendChild(embed);
      }
    } else {
      super.insertAt(index, value, def);
    }
    this.optimize();
  }
  insertBefore(blot, ref) {
    if (blot.statics.scope === Scope.INLINE_BLOT) {
      const wrapper = this.scroll.create(this.statics.defaultChild.blotName);
      wrapper.appendChild(blot);
      super.insertBefore(wrapper, ref);
    } else {
      super.insertBefore(blot, ref);
    }
  }
  insertContents(index, delta) {
    const renderBlocks = this.deltaToRenderBlocks(delta.concat(new Delta().insert("\n")));
    const last = renderBlocks.pop();
    if (last == null) return;
    this.batchStart();
    const first = renderBlocks.shift();
    if (first) {
      const shouldInsertNewlineChar = first.type === "block" && (first.delta.length() === 0 || !this.descendant(BlockEmbed, index)[0] && index < this.length());
      const delta2 = first.type === "block" ? first.delta : new Delta().insert({
        [first.key]: first.value
      });
      insertInlineContents(this, index, delta2);
      const newlineCharLength = first.type === "block" ? 1 : 0;
      const lineEndIndex = index + delta2.length() + newlineCharLength;
      if (shouldInsertNewlineChar) {
        this.insertAt(lineEndIndex - 1, "\n");
      }
      const formats = bubbleFormats(this.line(index)[0]);
      const attributes = DeltaExports.AttributeMap.diff(formats, first.attributes) || {};
      Object.keys(attributes).forEach((name) => {
        this.formatAt(lineEndIndex - 1, 1, name, attributes[name]);
      });
      index = lineEndIndex;
    }
    let [refBlot, refBlotOffset] = this.children.find(index);
    if (renderBlocks.length) {
      if (refBlot) {
        refBlot = refBlot.split(refBlotOffset);
        refBlotOffset = 0;
      }
      renderBlocks.forEach((renderBlock) => {
        if (renderBlock.type === "block") {
          const block = this.createBlock(renderBlock.attributes, refBlot || void 0);
          insertInlineContents(block, 0, renderBlock.delta);
        } else {
          const blockEmbed = this.create(renderBlock.key, renderBlock.value);
          this.insertBefore(blockEmbed, refBlot || void 0);
          Object.keys(renderBlock.attributes).forEach((name) => {
            blockEmbed.format(name, renderBlock.attributes[name]);
          });
        }
      });
    }
    if (last.type === "block" && last.delta.length()) {
      const offset = refBlot ? refBlot.offset(refBlot.scroll) + refBlotOffset : this.length();
      insertInlineContents(this, offset, last.delta);
    }
    this.batchEnd();
    this.optimize();
  }
  isEnabled() {
    return this.domNode.getAttribute("contenteditable") === "true";
  }
  leaf(index) {
    const last = this.path(index).pop();
    if (!last) {
      return [null, -1];
    }
    const [blot, offset] = last;
    return blot instanceof LeafBlot$1 ? [blot, offset] : [null, -1];
  }
  line(index) {
    if (index === this.length()) {
      return this.line(index - 1);
    }
    return this.descendant(isLine$1, index);
  }
  lines() {
    let index = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
    let length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
    const getLines = (blot, blotIndex, blotLength) => {
      let lines = [];
      let lengthLeft = blotLength;
      blot.children.forEachAt(blotIndex, blotLength, (child, childIndex, childLength) => {
        if (isLine$1(child)) {
          lines.push(child);
        } else if (child instanceof ContainerBlot$1) {
          lines = lines.concat(getLines(child, childIndex, lengthLeft));
        }
        lengthLeft -= childLength;
      });
      return lines;
    };
    return getLines(this, index, length);
  }
  optimize() {
    let mutations = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.batch) return;
    super.optimize(mutations, context);
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_OPTIMIZE, mutations, context);
    }
  }
  path(index) {
    return super.path(index).slice(1);
  }
  remove() {
  }
  update(mutations) {
    if (this.batch) {
      if (Array.isArray(mutations)) {
        this.batch = this.batch.concat(mutations);
      }
      return;
    }
    let source = Emitter.sources.USER;
    if (typeof mutations === "string") {
      source = mutations;
    }
    if (!Array.isArray(mutations)) {
      mutations = this.observer.takeRecords();
    }
    mutations = mutations.filter((_ref2) => {
      let {
        target
      } = _ref2;
      const blot = this.find(target, true);
      return blot && !isUpdatable(blot);
    });
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_BEFORE_UPDATE, source, mutations);
    }
    super.update(mutations.concat([]));
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_UPDATE, source, mutations);
    }
  }
  updateEmbedAt(index, key, change) {
    const [blot] = this.descendant((b) => b instanceof BlockEmbed, index);
    if (blot && blot.statics.blotName === key && isUpdatable(blot)) {
      blot.updateContent(change);
    }
  }
  handleDragStart(event) {
    event.preventDefault();
  }
  deltaToRenderBlocks(delta) {
    const renderBlocks = [];
    let currentBlockDelta = new Delta();
    delta.forEach((op) => {
      const insert = op == null ? void 0 : op.insert;
      if (!insert) return;
      if (typeof insert === "string") {
        const splitted = insert.split("\n");
        splitted.slice(0, -1).forEach((text) => {
          currentBlockDelta.insert(text, op.attributes);
          renderBlocks.push({
            type: "block",
            delta: currentBlockDelta,
            attributes: op.attributes ?? {}
          });
          currentBlockDelta = new Delta();
        });
        const last = splitted[splitted.length - 1];
        if (last) {
          currentBlockDelta.insert(last, op.attributes);
        }
      } else {
        const key = Object.keys(insert)[0];
        if (!key) return;
        if (this.query(key, Scope.INLINE)) {
          currentBlockDelta.push(op);
        } else {
          if (currentBlockDelta.length()) {
            renderBlocks.push({
              type: "block",
              delta: currentBlockDelta,
              attributes: {}
            });
          }
          currentBlockDelta = new Delta();
          renderBlocks.push({
            type: "blockEmbed",
            key,
            value: insert[key],
            attributes: op.attributes ?? {}
          });
        }
      }
    });
    if (currentBlockDelta.length()) {
      renderBlocks.push({
        type: "block",
        delta: currentBlockDelta,
        attributes: {}
      });
    }
    return renderBlocks;
  }
  createBlock(attributes, refBlot) {
    let blotName;
    const formats = {};
    Object.entries(attributes).forEach((_ref3) => {
      let [key, value] = _ref3;
      const isBlockBlot = this.query(key, Scope.BLOCK & Scope.BLOT) != null;
      if (isBlockBlot) {
        blotName = key;
      } else {
        formats[key] = value;
      }
    });
    const block = this.create(blotName || this.statics.defaultChild.blotName, blotName ? attributes[blotName] : void 0);
    this.insertBefore(block, refBlot || void 0);
    const length = block.length();
    Object.entries(formats).forEach((_ref4) => {
      let [key, value] = _ref4;
      block.formatAt(0, length, key, value);
    });
    return block;
  }
}
__publicField(Scroll, "blotName", "scroll");
__publicField(Scroll, "className", "ql-editor");
__publicField(Scroll, "tagName", "DIV");
__publicField(Scroll, "defaultChild", Block);
__publicField(Scroll, "allowedChildren", [Block, BlockEmbed, Container]);
function insertInlineContents(parent, index, inlineContents) {
  inlineContents.reduce((index2, op) => {
    const length = DeltaExports.Op.length(op);
    let attributes = op.attributes || {};
    if (op.insert != null) {
      if (typeof op.insert === "string") {
        const text = op.insert;
        parent.insertAt(index2, text);
        const [leaf] = parent.descendant(LeafBlot$1, index2);
        const formats = bubbleFormats(leaf);
        attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {};
      } else if (typeof op.insert === "object") {
        const key = Object.keys(op.insert)[0];
        if (key == null) return index2;
        parent.insertAt(index2, key, op.insert[key]);
        const isInlineEmbed = parent.scroll.query(key, Scope.INLINE) != null;
        if (isInlineEmbed) {
          const [leaf] = parent.descendant(LeafBlot$1, index2);
          const formats = bubbleFormats(leaf);
          attributes = DeltaExports.AttributeMap.diff(formats, attributes) || {};
        }
      }
    }
    Object.keys(attributes).forEach((key) => {
      parent.formatAt(index2, length, key, attributes[key]);
    });
    return index2 + length;
  }, index);
}
const config$2 = {
  scope: Scope.BLOCK,
  whitelist: ["right", "center", "justify"]
};
const AlignAttribute = new Attributor("align", "align", config$2);
const AlignClass = new ClassAttributor$1("align", "ql-align", config$2);
const AlignStyle = new StyleAttributor$1("align", "text-align", config$2);
class ColorAttributor extends StyleAttributor$1 {
  value(domNode) {
    let value = super.value(domNode);
    if (!value.startsWith("rgb(")) return value;
    value = value.replace(/^[^\d]+/, "").replace(/[^\d]+$/, "");
    const hex = value.split(",").map((component) => `00${parseInt(component, 10).toString(16)}`.slice(-2)).join("");
    return `#${hex}`;
  }
}
const ColorClass = new ClassAttributor$1("color", "ql-color", {
  scope: Scope.INLINE
});
const ColorStyle = new ColorAttributor("color", "color", {
  scope: Scope.INLINE
});
const BackgroundClass = new ClassAttributor$1("background", "ql-bg", {
  scope: Scope.INLINE
});
const BackgroundStyle = new ColorAttributor("background", "background-color", {
  scope: Scope.INLINE
});
class CodeBlockContainer extends Container {
  static create(value) {
    const domNode = super.create(value);
    domNode.setAttribute("spellcheck", "false");
    return domNode;
  }
  code(index, length) {
    return this.children.map((child) => child.length() <= 1 ? "" : child.domNode.innerText).join("\n").slice(index, index + length);
  }
  html(index, length) {
    return `<pre>
${escapeText(this.code(index, length))}
</pre>`;
  }
}
class CodeBlock extends Block {
  static register() {
    Quill.register(CodeBlockContainer);
  }
}
__publicField(CodeBlock, "TAB", "  ");
class Code extends Inline {
}
Code.blotName = "code";
Code.tagName = "CODE";
CodeBlock.blotName = "code-block";
CodeBlock.className = "ql-code-block";
CodeBlock.tagName = "DIV";
CodeBlockContainer.blotName = "code-block-container";
CodeBlockContainer.className = "ql-code-block-container";
CodeBlockContainer.tagName = "DIV";
CodeBlockContainer.allowedChildren = [CodeBlock];
CodeBlock.allowedChildren = [Text$1, Break, Cursor];
CodeBlock.requiredContainer = CodeBlockContainer;
const config$1 = {
  scope: Scope.BLOCK,
  whitelist: ["rtl"]
};
const DirectionAttribute = new Attributor("direction", "dir", config$1);
const DirectionClass = new ClassAttributor$1("direction", "ql-direction", config$1);
const DirectionStyle = new StyleAttributor$1("direction", "direction", config$1);
const config = {
  scope: Scope.INLINE,
  whitelist: ["serif", "monospace"]
};
const FontClass = new ClassAttributor$1("font", "ql-font", config);
class FontStyleAttributor extends StyleAttributor$1 {
  value(node) {
    return super.value(node).replace(/["']/g, "");
  }
}
const FontStyle = new FontStyleAttributor("font", "font-family", config);
const SizeClass = new ClassAttributor$1("size", "ql-size", {
  scope: Scope.INLINE,
  whitelist: ["small", "large", "huge"]
});
const SizeStyle = new StyleAttributor$1("size", "font-size", {
  scope: Scope.INLINE,
  whitelist: ["10px", "18px", "32px"]
});
const debug$2 = namespace("quill:keyboard");
const SHORTKEY = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
class Keyboard extends Module {
  static match(evt, binding) {
    if (["altKey", "ctrlKey", "metaKey", "shiftKey"].some((key) => {
      return !!binding[key] !== evt[key] && binding[key] !== null;
    })) {
      return false;
    }
    return binding.key === evt.key || binding.key === evt.which;
  }
  constructor(quill, options) {
    super(quill, options);
    this.bindings = {};
    Object.keys(this.options.bindings).forEach((name) => {
      if (this.options.bindings[name]) {
        this.addBinding(this.options.bindings[name]);
      }
    });
    this.addBinding({
      key: "Enter",
      shiftKey: null
    }, this.handleEnter);
    this.addBinding({
      key: "Enter",
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, () => {
    });
    if (/Firefox/i.test(navigator.userAgent)) {
      this.addBinding({
        key: "Backspace"
      }, {
        collapsed: true
      }, this.handleBackspace);
      this.addBinding({
        key: "Delete"
      }, {
        collapsed: true
      }, this.handleDelete);
    } else {
      this.addBinding({
        key: "Backspace"
      }, {
        collapsed: true,
        prefix: /^.?$/
      }, this.handleBackspace);
      this.addBinding({
        key: "Delete"
      }, {
        collapsed: true,
        suffix: /^.?$/
      }, this.handleDelete);
    }
    this.addBinding({
      key: "Backspace"
    }, {
      collapsed: false
    }, this.handleDeleteRange);
    this.addBinding({
      key: "Delete"
    }, {
      collapsed: false
    }, this.handleDeleteRange);
    this.addBinding({
      key: "Backspace",
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: true,
      offset: 0
    }, this.handleBackspace);
    this.listen();
  }
  addBinding(keyBinding) {
    let context = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    let handler = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const binding = normalize$2(keyBinding);
    if (binding == null) {
      debug$2.warn("Attempted to add invalid keyboard binding", binding);
      return;
    }
    if (typeof context === "function") {
      context = {
        handler: context
      };
    }
    if (typeof handler === "function") {
      handler = {
        handler
      };
    }
    const keys2 = Array.isArray(binding.key) ? binding.key : [binding.key];
    keys2.forEach((key) => {
      const singleBinding = {
        ...binding,
        key,
        ...context,
        ...handler
      };
      this.bindings[singleBinding.key] = this.bindings[singleBinding.key] || [];
      this.bindings[singleBinding.key].push(singleBinding);
    });
  }
  listen() {
    this.quill.root.addEventListener("keydown", (evt) => {
      if (evt.defaultPrevented || evt.isComposing) return;
      const isComposing = evt.keyCode === 229 && (evt.key === "Enter" || evt.key === "Backspace");
      if (isComposing) return;
      const bindings = (this.bindings[evt.key] || []).concat(this.bindings[evt.which] || []);
      const matches = bindings.filter((binding) => Keyboard.match(evt, binding));
      if (matches.length === 0) return;
      const blot = Quill.find(evt.target, true);
      if (blot && blot.scroll !== this.quill.scroll) return;
      const range = this.quill.getSelection();
      if (range == null || !this.quill.hasFocus()) return;
      const [line, offset] = this.quill.getLine(range.index);
      const [leafStart, offsetStart] = this.quill.getLeaf(range.index);
      const [leafEnd, offsetEnd] = range.length === 0 ? [leafStart, offsetStart] : this.quill.getLeaf(range.index + range.length);
      const prefixText = leafStart instanceof TextBlot$1 ? leafStart.value().slice(0, offsetStart) : "";
      const suffixText = leafEnd instanceof TextBlot$1 ? leafEnd.value().slice(offsetEnd) : "";
      const curContext = {
        collapsed: range.length === 0,
        // @ts-expect-error Fix me later
        empty: range.length === 0 && line.length() <= 1,
        format: this.quill.getFormat(range),
        line,
        offset,
        prefix: prefixText,
        suffix: suffixText,
        event: evt
      };
      const prevented = matches.some((binding) => {
        if (binding.collapsed != null && binding.collapsed !== curContext.collapsed) {
          return false;
        }
        if (binding.empty != null && binding.empty !== curContext.empty) {
          return false;
        }
        if (binding.offset != null && binding.offset !== curContext.offset) {
          return false;
        }
        if (Array.isArray(binding.format)) {
          if (binding.format.every((name) => curContext.format[name] == null)) {
            return false;
          }
        } else if (typeof binding.format === "object") {
          if (!Object.keys(binding.format).every((name) => {
            if (binding.format[name] === true) return curContext.format[name] != null;
            if (binding.format[name] === false) return curContext.format[name] == null;
            return isEqual$2(binding.format[name], curContext.format[name]);
          })) {
            return false;
          }
        }
        if (binding.prefix != null && !binding.prefix.test(curContext.prefix)) {
          return false;
        }
        if (binding.suffix != null && !binding.suffix.test(curContext.suffix)) {
          return false;
        }
        return binding.handler.call(this, range, curContext, binding) !== true;
      });
      if (prevented) {
        evt.preventDefault();
      }
    });
  }
  handleBackspace(range, context) {
    const length = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(context.prefix) ? 2 : 1;
    if (range.index === 0 || this.quill.getLength() <= 1) return;
    let formats = {};
    const [line] = this.quill.getLine(range.index);
    let delta = new Delta().retain(range.index - length).delete(length);
    if (context.offset === 0) {
      const [prev] = this.quill.getLine(range.index - 1);
      if (prev) {
        const isPrevLineEmpty = prev.statics.blotName === "block" && prev.length() <= 1;
        if (!isPrevLineEmpty) {
          const curFormats = line.formats();
          const prevFormats = this.quill.getFormat(range.index - 1, 1);
          formats = DeltaExports.AttributeMap.diff(curFormats, prevFormats) || {};
          if (Object.keys(formats).length > 0) {
            const formatDelta = new Delta().retain(range.index + line.length() - 2).retain(1, formats);
            delta = delta.compose(formatDelta);
          }
        }
      }
    }
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.focus();
  }
  handleDelete(range, context) {
    const length = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(context.suffix) ? 2 : 1;
    if (range.index >= this.quill.getLength() - length) return;
    let formats = {};
    const [line] = this.quill.getLine(range.index);
    let delta = new Delta().retain(range.index).delete(length);
    if (context.offset >= line.length() - 1) {
      const [next] = this.quill.getLine(range.index + 1);
      if (next) {
        const curFormats = line.formats();
        const nextFormats = this.quill.getFormat(range.index, 1);
        formats = DeltaExports.AttributeMap.diff(curFormats, nextFormats) || {};
        if (Object.keys(formats).length > 0) {
          delta = delta.retain(next.length() - 1).retain(1, formats);
        }
      }
    }
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.focus();
  }
  handleDeleteRange(range) {
    deleteRange({
      range,
      quill: this.quill
    });
    this.quill.focus();
  }
  handleEnter(range, context) {
    const lineFormats = Object.keys(context.format).reduce((formats, format) => {
      if (this.quill.scroll.query(format, Scope.BLOCK) && !Array.isArray(context.format[format])) {
        formats[format] = context.format[format];
      }
      return formats;
    }, {});
    const delta = new Delta().retain(range.index).delete(range.length).insert("\n", lineFormats);
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
    this.quill.focus();
  }
}
const defaultOptions = {
  bindings: {
    bold: makeFormatHandler("bold"),
    italic: makeFormatHandler("italic"),
    underline: makeFormatHandler("underline"),
    indent: {
      // highlight tab or tab at beginning of list, indent or blockquote
      key: "Tab",
      format: ["blockquote", "indent", "list"],
      handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format("indent", "+1", Quill.sources.USER);
        return false;
      }
    },
    outdent: {
      key: "Tab",
      shiftKey: true,
      format: ["blockquote", "indent", "list"],
      // highlight tab or tab at beginning of list, indent or blockquote
      handler(range, context) {
        if (context.collapsed && context.offset !== 0) return true;
        this.quill.format("indent", "-1", Quill.sources.USER);
        return false;
      }
    },
    "outdent backspace": {
      key: "Backspace",
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler(range, context) {
        if (context.format.indent != null) {
          this.quill.format("indent", "-1", Quill.sources.USER);
        } else if (context.format.list != null) {
          this.quill.format("list", false, Quill.sources.USER);
        }
      }
    },
    "indent code-block": makeCodeBlockHandler(true),
    "outdent code-block": makeCodeBlockHandler(false),
    "remove tab": {
      key: "Tab",
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler(range) {
        this.quill.deleteText(range.index - 1, 1, Quill.sources.USER);
      }
    },
    tab: {
      key: "Tab",
      handler(range, context) {
        if (context.format.table) return true;
        this.quill.history.cutoff();
        const delta = new Delta().retain(range.index).delete(range.length).insert("	");
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        return false;
      }
    },
    "blockquote empty enter": {
      key: "Enter",
      collapsed: true,
      format: ["blockquote"],
      empty: true,
      handler() {
        this.quill.format("blockquote", false, Quill.sources.USER);
      }
    },
    "list empty enter": {
      key: "Enter",
      collapsed: true,
      format: ["list"],
      empty: true,
      handler(range, context) {
        const formats = {
          list: false
        };
        if (context.format.indent) {
          formats.indent = false;
        }
        this.quill.formatLine(range.index, range.length, formats, Quill.sources.USER);
      }
    },
    "checklist enter": {
      key: "Enter",
      collapsed: true,
      format: {
        list: "checked"
      },
      handler(range) {
        const [line, offset] = this.quill.getLine(range.index);
        const formats = {
          // @ts-expect-error Fix me later
          ...line.formats(),
          list: "checked"
        };
        const delta = new Delta().retain(range.index).insert("\n", formats).retain(line.length() - offset - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.quill.scrollSelectionIntoView();
      }
    },
    "header enter": {
      key: "Enter",
      collapsed: true,
      format: ["header"],
      suffix: /^$/,
      handler(range, context) {
        const [line, offset] = this.quill.getLine(range.index);
        const delta = new Delta().retain(range.index).insert("\n", context.format).retain(line.length() - offset - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
        this.quill.scrollSelectionIntoView();
      }
    },
    "table backspace": {
      key: "Backspace",
      format: ["table"],
      collapsed: true,
      offset: 0,
      handler() {
      }
    },
    "table delete": {
      key: "Delete",
      format: ["table"],
      collapsed: true,
      suffix: /^$/,
      handler() {
      }
    },
    "table enter": {
      key: "Enter",
      shiftKey: null,
      format: ["table"],
      handler(range) {
        const module2 = this.quill.getModule("table");
        if (module2) {
          const [table, row, cell, offset] = module2.getTable(range);
          const shift = tableSide(table, row, cell, offset);
          if (shift == null) return;
          let index = table.offset();
          if (shift < 0) {
            const delta = new Delta().retain(index).insert("\n");
            this.quill.updateContents(delta, Quill.sources.USER);
            this.quill.setSelection(range.index + 1, range.length, Quill.sources.SILENT);
          } else if (shift > 0) {
            index += table.length();
            const delta = new Delta().retain(index).insert("\n");
            this.quill.updateContents(delta, Quill.sources.USER);
            this.quill.setSelection(index, Quill.sources.USER);
          }
        }
      }
    },
    "table tab": {
      key: "Tab",
      shiftKey: null,
      format: ["table"],
      handler(range, context) {
        const {
          event,
          line: cell
        } = context;
        const offset = cell.offset(this.quill.scroll);
        if (event.shiftKey) {
          this.quill.setSelection(offset - 1, Quill.sources.USER);
        } else {
          this.quill.setSelection(offset + cell.length(), Quill.sources.USER);
        }
      }
    },
    "list autofill": {
      key: " ",
      shiftKey: null,
      collapsed: true,
      format: {
        "code-block": false,
        blockquote: false,
        table: false
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler(range, context) {
        if (this.quill.scroll.query("list") == null) return true;
        const {
          length
        } = context.prefix;
        const [line, offset] = this.quill.getLine(range.index);
        if (offset > length) return true;
        let value;
        switch (context.prefix.trim()) {
          case "[]":
          case "[ ]":
            value = "unchecked";
            break;
          case "[x]":
            value = "checked";
            break;
          case "-":
          case "*":
            value = "bullet";
            break;
          default:
            value = "ordered";
        }
        this.quill.insertText(range.index, " ", Quill.sources.USER);
        this.quill.history.cutoff();
        const delta = new Delta().retain(range.index - offset).delete(length + 1).retain(line.length() - 2 - offset).retain(1, {
          list: value
        });
        this.quill.updateContents(delta, Quill.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(range.index - length, Quill.sources.SILENT);
        return false;
      }
    },
    "code exit": {
      key: "Enter",
      collapsed: true,
      format: ["code-block"],
      prefix: /^$/,
      suffix: /^\s*$/,
      handler(range) {
        const [line, offset] = this.quill.getLine(range.index);
        let numLines = 2;
        let cur = line;
        while (cur != null && cur.length() <= 1 && cur.formats()["code-block"]) {
          cur = cur.prev;
          numLines -= 1;
          if (numLines <= 0) {
            const delta = new Delta().retain(range.index + line.length() - offset - 2).retain(1, {
              "code-block": null
            }).delete(1);
            this.quill.updateContents(delta, Quill.sources.USER);
            this.quill.setSelection(range.index - 1, Quill.sources.SILENT);
            return false;
          }
        }
        return true;
      }
    },
    "embed left": makeEmbedArrowHandler("ArrowLeft", false),
    "embed left shift": makeEmbedArrowHandler("ArrowLeft", true),
    "embed right": makeEmbedArrowHandler("ArrowRight", false),
    "embed right shift": makeEmbedArrowHandler("ArrowRight", true),
    "table down": makeTableArrowHandler(false),
    "table up": makeTableArrowHandler(true)
  }
};
Keyboard.DEFAULTS = defaultOptions;
function makeCodeBlockHandler(indent) {
  return {
    key: "Tab",
    shiftKey: !indent,
    format: {
      "code-block": true
    },
    handler(range, _ref) {
      let {
        event
      } = _ref;
      const CodeBlock2 = this.quill.scroll.query("code-block");
      const {
        TAB
      } = CodeBlock2;
      if (range.length === 0 && !event.shiftKey) {
        this.quill.insertText(range.index, TAB, Quill.sources.USER);
        this.quill.setSelection(range.index + TAB.length, Quill.sources.SILENT);
        return;
      }
      const lines = range.length === 0 ? this.quill.getLines(range.index, 1) : this.quill.getLines(range);
      let {
        index,
        length
      } = range;
      lines.forEach((line, i) => {
        if (indent) {
          line.insertAt(0, TAB);
          if (i === 0) {
            index += TAB.length;
          } else {
            length += TAB.length;
          }
        } else if (line.domNode.textContent.startsWith(TAB)) {
          line.deleteAt(0, TAB.length);
          if (i === 0) {
            index -= TAB.length;
          } else {
            length -= TAB.length;
          }
        }
      });
      this.quill.update(Quill.sources.USER);
      this.quill.setSelection(index, length, Quill.sources.SILENT);
    }
  };
}
function makeEmbedArrowHandler(key, shiftKey) {
  const where = key === "ArrowLeft" ? "prefix" : "suffix";
  return {
    key,
    shiftKey,
    altKey: null,
    [where]: /^$/,
    handler(range) {
      let {
        index
      } = range;
      if (key === "ArrowRight") {
        index += range.length + 1;
      }
      const [leaf] = this.quill.getLeaf(index);
      if (!(leaf instanceof EmbedBlot$1)) return true;
      if (key === "ArrowLeft") {
        if (shiftKey) {
          this.quill.setSelection(range.index - 1, range.length + 1, Quill.sources.USER);
        } else {
          this.quill.setSelection(range.index - 1, Quill.sources.USER);
        }
      } else if (shiftKey) {
        this.quill.setSelection(range.index, range.length + 1, Quill.sources.USER);
      } else {
        this.quill.setSelection(range.index + range.length + 1, Quill.sources.USER);
      }
      return false;
    }
  };
}
function makeFormatHandler(format) {
  return {
    key: format[0],
    shortKey: true,
    handler(range, context) {
      this.quill.format(format, !context.format[format], Quill.sources.USER);
    }
  };
}
function makeTableArrowHandler(up) {
  return {
    key: up ? "ArrowUp" : "ArrowDown",
    collapsed: true,
    format: ["table"],
    handler(range, context) {
      const key = up ? "prev" : "next";
      const cell = context.line;
      const targetRow = cell.parent[key];
      if (targetRow != null) {
        if (targetRow.statics.blotName === "table-row") {
          let targetCell = targetRow.children.head;
          let cur = cell;
          while (cur.prev != null) {
            cur = cur.prev;
            targetCell = targetCell.next;
          }
          const index = targetCell.offset(this.quill.scroll) + Math.min(context.offset, targetCell.length() - 1);
          this.quill.setSelection(index, 0, Quill.sources.USER);
        }
      } else {
        const targetLine = cell.table()[key];
        if (targetLine != null) {
          if (up) {
            this.quill.setSelection(targetLine.offset(this.quill.scroll) + targetLine.length() - 1, 0, Quill.sources.USER);
          } else {
            this.quill.setSelection(targetLine.offset(this.quill.scroll), 0, Quill.sources.USER);
          }
        }
      }
      return false;
    }
  };
}
function normalize$2(binding) {
  if (typeof binding === "string" || typeof binding === "number") {
    binding = {
      key: binding
    };
  } else if (typeof binding === "object") {
    binding = cloneDeep$1(binding);
  } else {
    return null;
  }
  if (binding.shortKey) {
    binding[SHORTKEY] = binding.shortKey;
    delete binding.shortKey;
  }
  return binding;
}
function deleteRange(_ref2) {
  let {
    quill,
    range
  } = _ref2;
  const lines = quill.getLines(range);
  let formats = {};
  if (lines.length > 1) {
    const firstFormats = lines[0].formats();
    const lastFormats = lines[lines.length - 1].formats();
    formats = DeltaExports.AttributeMap.diff(lastFormats, firstFormats) || {};
  }
  quill.deleteText(range, Quill.sources.USER);
  if (Object.keys(formats).length > 0) {
    quill.formatLine(range.index, 1, formats, Quill.sources.USER);
  }
  quill.setSelection(range.index, Quill.sources.SILENT);
}
function tableSide(_table, row, cell, offset) {
  if (row.prev == null && row.next == null) {
    if (cell.prev == null && cell.next == null) {
      return offset === 0 ? -1 : 1;
    }
    return cell.prev == null ? -1 : 1;
  }
  if (row.prev == null) {
    return -1;
  }
  if (row.next == null) {
    return 1;
  }
  return null;
}
const normalWeightRegexp = /font-weight:\s*normal/;
const blockTagNames = ["P", "OL", "UL"];
const isBlockElement = (element) => {
  return element && blockTagNames.includes(element.tagName);
};
const normalizeEmptyLines = (doc) => {
  Array.from(doc.querySelectorAll("br")).filter((br) => isBlockElement(br.previousElementSibling) && isBlockElement(br.nextElementSibling)).forEach((br) => {
    var _a2;
    (_a2 = br.parentNode) == null ? void 0 : _a2.removeChild(br);
  });
};
const normalizeFontWeight = (doc) => {
  Array.from(doc.querySelectorAll('b[style*="font-weight"]')).filter((node) => {
    var _a2;
    return (_a2 = node.getAttribute("style")) == null ? void 0 : _a2.match(normalWeightRegexp);
  }).forEach((node) => {
    var _a2;
    const fragment = doc.createDocumentFragment();
    fragment.append(...node.childNodes);
    (_a2 = node.parentNode) == null ? void 0 : _a2.replaceChild(fragment, node);
  });
};
function normalize$1(doc) {
  if (doc.querySelector('[id^="docs-internal-guid-"]')) {
    normalizeFontWeight(doc);
    normalizeEmptyLines(doc);
  }
}
const ignoreRegexp = /\bmso-list:[^;]*ignore/i;
const idRegexp = /\bmso-list:[^;]*\bl(\d+)/i;
const indentRegexp = /\bmso-list:[^;]*\blevel(\d+)/i;
const parseListItem = (element, html) => {
  const style = element.getAttribute("style");
  const idMatch = style == null ? void 0 : style.match(idRegexp);
  if (!idMatch) {
    return null;
  }
  const id = Number(idMatch[1]);
  const indentMatch = style == null ? void 0 : style.match(indentRegexp);
  const indent = indentMatch ? Number(indentMatch[1]) : 1;
  const typeRegexp = new RegExp(`@list l${id}:level${indent}\\s*\\{[^\\}]*mso-level-number-format:\\s*([\\w-]+)`, "i");
  const typeMatch = html.match(typeRegexp);
  const type = typeMatch && typeMatch[1] === "bullet" ? "bullet" : "ordered";
  return {
    id,
    indent,
    type,
    element
  };
};
const normalizeListItem = (doc) => {
  var _a2, _b;
  const msoList = Array.from(doc.querySelectorAll("[style*=mso-list]"));
  const ignored = [];
  const others = [];
  msoList.forEach((node) => {
    const shouldIgnore = (node.getAttribute("style") || "").match(ignoreRegexp);
    if (shouldIgnore) {
      ignored.push(node);
    } else {
      others.push(node);
    }
  });
  ignored.forEach((node) => {
    var _a3;
    return (_a3 = node.parentNode) == null ? void 0 : _a3.removeChild(node);
  });
  const html = doc.documentElement.innerHTML;
  const listItems = others.map((element) => parseListItem(element, html)).filter((parsed) => parsed);
  while (listItems.length) {
    const childListItems = [];
    let current = listItems.shift();
    while (current) {
      childListItems.push(current);
      current = listItems.length && ((_a2 = listItems[0]) == null ? void 0 : _a2.element) === current.element.nextElementSibling && // Different id means the next item doesn't belong to this group.
      listItems[0].id === current.id ? listItems.shift() : null;
    }
    const ul = document.createElement("ul");
    childListItems.forEach((listItem) => {
      const li = document.createElement("li");
      li.setAttribute("data-list", listItem.type);
      if (listItem.indent > 1) {
        li.setAttribute("class", `ql-indent-${listItem.indent - 1}`);
      }
      li.innerHTML = listItem.element.innerHTML;
      ul.appendChild(li);
    });
    const element = (_b = childListItems[0]) == null ? void 0 : _b.element;
    const {
      parentNode
    } = element ?? {};
    if (element) {
      parentNode == null ? void 0 : parentNode.replaceChild(ul, element);
    }
    childListItems.slice(1).forEach((_ref) => {
      let {
        element: e
      } = _ref;
      parentNode == null ? void 0 : parentNode.removeChild(e);
    });
  }
};
function normalize(doc) {
  if (doc.documentElement.getAttribute("xmlns:w") === "urn:schemas-microsoft-com:office:word") {
    normalizeListItem(doc);
  }
}
const NORMALIZERS = [normalize, normalize$1];
const normalizeExternalHTML = (doc) => {
  if (doc.documentElement) {
    NORMALIZERS.forEach((normalize2) => {
      normalize2(doc);
    });
  }
};
const debug$1 = namespace("quill:clipboard");
const CLIPBOARD_CONFIG = [[Node.TEXT_NODE, matchText], [Node.TEXT_NODE, matchNewline], ["br", matchBreak], [Node.ELEMENT_NODE, matchNewline], [Node.ELEMENT_NODE, matchBlot], [Node.ELEMENT_NODE, matchAttributor], [Node.ELEMENT_NODE, matchStyles], ["li", matchIndent], ["ol, ul", matchList], ["pre", matchCodeBlock], ["tr", matchTable], ["b", createMatchAlias("bold")], ["i", createMatchAlias("italic")], ["strike", createMatchAlias("strike")], ["style", matchIgnore]];
const ATTRIBUTE_ATTRIBUTORS = [AlignAttribute, DirectionAttribute].reduce((memo, attr) => {
  memo[attr.keyName] = attr;
  return memo;
}, {});
const STYLE_ATTRIBUTORS = [AlignStyle, BackgroundStyle, ColorStyle, DirectionStyle, FontStyle, SizeStyle].reduce((memo, attr) => {
  memo[attr.keyName] = attr;
  return memo;
}, {});
class Clipboard extends Module {
  constructor(quill, options) {
    super(quill, options);
    this.quill.root.addEventListener("copy", (e) => this.onCaptureCopy(e, false));
    this.quill.root.addEventListener("cut", (e) => this.onCaptureCopy(e, true));
    this.quill.root.addEventListener("paste", this.onCapturePaste.bind(this));
    this.matchers = [];
    CLIPBOARD_CONFIG.concat(this.options.matchers ?? []).forEach((_ref) => {
      let [selector, matcher] = _ref;
      this.addMatcher(selector, matcher);
    });
  }
  addMatcher(selector, matcher) {
    this.matchers.push([selector, matcher]);
  }
  convert(_ref2) {
    let {
      html,
      text
    } = _ref2;
    let formats = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (formats[CodeBlock.blotName]) {
      return new Delta().insert(text || "", {
        [CodeBlock.blotName]: formats[CodeBlock.blotName]
      });
    }
    if (!html) {
      return new Delta().insert(text || "", formats);
    }
    const delta = this.convertHTML(html);
    if (deltaEndsWith(delta, "\n") && (delta.ops[delta.ops.length - 1].attributes == null || formats.table)) {
      return delta.compose(new Delta().retain(delta.length() - 1).delete(1));
    }
    return delta;
  }
  normalizeHTML(doc) {
    normalizeExternalHTML(doc);
  }
  convertHTML(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    this.normalizeHTML(doc);
    const container = doc.body;
    const nodeMatches = /* @__PURE__ */ new WeakMap();
    const [elementMatchers, textMatchers] = this.prepareMatching(container, nodeMatches);
    return traverse(this.quill.scroll, container, elementMatchers, textMatchers, nodeMatches);
  }
  dangerouslyPasteHTML(index, html) {
    let source = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : Quill.sources.API;
    if (typeof index === "string") {
      const delta = this.convert({
        html: index,
        text: ""
      });
      this.quill.setContents(delta, html);
      this.quill.setSelection(0, Quill.sources.SILENT);
    } else {
      const paste = this.convert({
        html,
        text: ""
      });
      this.quill.updateContents(new Delta().retain(index).concat(paste), source);
      this.quill.setSelection(index + paste.length(), Quill.sources.SILENT);
    }
  }
  onCaptureCopy(e) {
    var _a2, _b;
    let isCut = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (e.defaultPrevented) return;
    e.preventDefault();
    const [range] = this.quill.selection.getRange();
    if (range == null) return;
    const {
      html,
      text
    } = this.onCopy(range, isCut);
    (_a2 = e.clipboardData) == null ? void 0 : _a2.setData("text/plain", text);
    (_b = e.clipboardData) == null ? void 0 : _b.setData("text/html", html);
    if (isCut) {
      deleteRange({
        range,
        quill: this.quill
      });
    }
  }
  /*
   * https://www.iana.org/assignments/media-types/text/uri-list
   */
  normalizeURIList(urlList) {
    return urlList.split(/\r?\n/).filter((url) => url[0] !== "#").join("\n");
  }
  onCapturePaste(e) {
    var _a2, _b, _c, _d, _e;
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    e.preventDefault();
    const range = this.quill.getSelection(true);
    if (range == null) return;
    const html = (_a2 = e.clipboardData) == null ? void 0 : _a2.getData("text/html");
    let text = (_b = e.clipboardData) == null ? void 0 : _b.getData("text/plain");
    if (!html && !text) {
      const urlList = (_c = e.clipboardData) == null ? void 0 : _c.getData("text/uri-list");
      if (urlList) {
        text = this.normalizeURIList(urlList);
      }
    }
    const files = Array.from(((_d = e.clipboardData) == null ? void 0 : _d.files) || []);
    if (!html && files.length > 0) {
      this.quill.uploader.upload(range, files);
      return;
    }
    if (html && files.length > 0) {
      const doc = new DOMParser().parseFromString(html, "text/html");
      if (doc.body.childElementCount === 1 && ((_e = doc.body.firstElementChild) == null ? void 0 : _e.tagName) === "IMG") {
        this.quill.uploader.upload(range, files);
        return;
      }
    }
    this.onPaste(range, {
      html,
      text
    });
  }
  onCopy(range) {
    const text = this.quill.getText(range);
    const html = this.quill.getSemanticHTML(range);
    return {
      html,
      text
    };
  }
  onPaste(range, _ref3) {
    let {
      text,
      html
    } = _ref3;
    const formats = this.quill.getFormat(range.index);
    const pastedDelta = this.convert({
      text,
      html
    }, formats);
    debug$1.log("onPaste", pastedDelta, {
      text,
      html
    });
    const delta = new Delta().retain(range.index).delete(range.length).concat(pastedDelta);
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.setSelection(delta.length() - range.length, Quill.sources.SILENT);
    this.quill.scrollSelectionIntoView();
  }
  prepareMatching(container, nodeMatches) {
    const elementMatchers = [];
    const textMatchers = [];
    this.matchers.forEach((pair) => {
      const [selector, matcher] = pair;
      switch (selector) {
        case Node.TEXT_NODE:
          textMatchers.push(matcher);
          break;
        case Node.ELEMENT_NODE:
          elementMatchers.push(matcher);
          break;
        default:
          Array.from(container.querySelectorAll(selector)).forEach((node) => {
            if (nodeMatches.has(node)) {
              const matches = nodeMatches.get(node);
              matches == null ? void 0 : matches.push(matcher);
            } else {
              nodeMatches.set(node, [matcher]);
            }
          });
          break;
      }
    });
    return [elementMatchers, textMatchers];
  }
}
__publicField(Clipboard, "DEFAULTS", {
  matchers: []
});
function applyFormat(delta, format, value, scroll) {
  if (!scroll.query(format)) {
    return delta;
  }
  return delta.reduce((newDelta, op) => {
    if (!op.insert) return newDelta;
    if (op.attributes && op.attributes[format]) {
      return newDelta.push(op);
    }
    const formats = value ? {
      [format]: value
    } : {};
    return newDelta.insert(op.insert, {
      ...formats,
      ...op.attributes
    });
  }, new Delta());
}
function deltaEndsWith(delta, text) {
  let endText = "";
  for (let i = delta.ops.length - 1; i >= 0 && endText.length < text.length; --i) {
    const op = delta.ops[i];
    if (typeof op.insert !== "string") break;
    endText = op.insert + endText;
  }
  return endText.slice(-1 * text.length) === text;
}
function isLine(node, scroll) {
  if (!(node instanceof Element)) return false;
  const match2 = scroll.query(node);
  if (match2 && match2.prototype instanceof EmbedBlot$1) return false;
  return ["address", "article", "blockquote", "canvas", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "iframe", "li", "main", "nav", "ol", "output", "p", "pre", "section", "table", "td", "tr", "ul", "video"].includes(node.tagName.toLowerCase());
}
function isBetweenInlineElements(node, scroll) {
  return node.previousElementSibling && node.nextElementSibling && !isLine(node.previousElementSibling, scroll) && !isLine(node.nextElementSibling, scroll);
}
const preNodes = /* @__PURE__ */ new WeakMap();
function isPre(node) {
  if (node == null) return false;
  if (!preNodes.has(node)) {
    if (node.tagName === "PRE") {
      preNodes.set(node, true);
    } else {
      preNodes.set(node, isPre(node.parentNode));
    }
  }
  return preNodes.get(node);
}
function traverse(scroll, node, elementMatchers, textMatchers, nodeMatches) {
  if (node.nodeType === node.TEXT_NODE) {
    return textMatchers.reduce((delta, matcher) => {
      return matcher(node, delta, scroll);
    }, new Delta());
  }
  if (node.nodeType === node.ELEMENT_NODE) {
    return Array.from(node.childNodes || []).reduce((delta, childNode) => {
      let childrenDelta = traverse(scroll, childNode, elementMatchers, textMatchers, nodeMatches);
      if (childNode.nodeType === node.ELEMENT_NODE) {
        childrenDelta = elementMatchers.reduce((reducedDelta, matcher) => {
          return matcher(childNode, reducedDelta, scroll);
        }, childrenDelta);
        childrenDelta = (nodeMatches.get(childNode) || []).reduce((reducedDelta, matcher) => {
          return matcher(childNode, reducedDelta, scroll);
        }, childrenDelta);
      }
      return delta.concat(childrenDelta);
    }, new Delta());
  }
  return new Delta();
}
function createMatchAlias(format) {
  return (_node, delta, scroll) => {
    return applyFormat(delta, format, true, scroll);
  };
}
function matchAttributor(node, delta, scroll) {
  const attributes = Attributor.keys(node);
  const classes = ClassAttributor$1.keys(node);
  const styles = StyleAttributor$1.keys(node);
  const formats = {};
  attributes.concat(classes).concat(styles).forEach((name) => {
    let attr = scroll.query(name, Scope.ATTRIBUTE);
    if (attr != null) {
      formats[attr.attrName] = attr.value(node);
      if (formats[attr.attrName]) return;
    }
    attr = ATTRIBUTE_ATTRIBUTORS[name];
    if (attr != null && (attr.attrName === name || attr.keyName === name)) {
      formats[attr.attrName] = attr.value(node) || void 0;
    }
    attr = STYLE_ATTRIBUTORS[name];
    if (attr != null && (attr.attrName === name || attr.keyName === name)) {
      attr = STYLE_ATTRIBUTORS[name];
      formats[attr.attrName] = attr.value(node) || void 0;
    }
  });
  return Object.entries(formats).reduce((newDelta, _ref4) => {
    let [name, value] = _ref4;
    return applyFormat(newDelta, name, value, scroll);
  }, delta);
}
function matchBlot(node, delta, scroll) {
  const match2 = scroll.query(node);
  if (match2 == null) return delta;
  if (match2.prototype instanceof EmbedBlot$1) {
    const embed = {};
    const value = match2.value(node);
    if (value != null) {
      embed[match2.blotName] = value;
      return new Delta().insert(embed, match2.formats(node, scroll));
    }
  } else {
    if (match2.prototype instanceof BlockBlot$1 && !deltaEndsWith(delta, "\n")) {
      delta.insert("\n");
    }
    if ("blotName" in match2 && "formats" in match2 && typeof match2.formats === "function") {
      return applyFormat(delta, match2.blotName, match2.formats(node, scroll), scroll);
    }
  }
  return delta;
}
function matchBreak(node, delta) {
  if (!deltaEndsWith(delta, "\n")) {
    delta.insert("\n");
  }
  return delta;
}
function matchCodeBlock(node, delta, scroll) {
  const match2 = scroll.query("code-block");
  const language = match2 && "formats" in match2 && typeof match2.formats === "function" ? match2.formats(node, scroll) : true;
  return applyFormat(delta, "code-block", language, scroll);
}
function matchIgnore() {
  return new Delta();
}
function matchIndent(node, delta, scroll) {
  const match2 = scroll.query(node);
  if (match2 == null || // @ts-expect-error
  match2.blotName !== "list" || !deltaEndsWith(delta, "\n")) {
    return delta;
  }
  let indent = -1;
  let parent = node.parentNode;
  while (parent != null) {
    if (["OL", "UL"].includes(parent.tagName)) {
      indent += 1;
    }
    parent = parent.parentNode;
  }
  if (indent <= 0) return delta;
  return delta.reduce((composed, op) => {
    if (!op.insert) return composed;
    if (op.attributes && typeof op.attributes.indent === "number") {
      return composed.push(op);
    }
    return composed.insert(op.insert, {
      indent,
      ...op.attributes || {}
    });
  }, new Delta());
}
function matchList(node, delta, scroll) {
  const element = node;
  let list = element.tagName === "OL" ? "ordered" : "bullet";
  const checkedAttr = element.getAttribute("data-checked");
  if (checkedAttr) {
    list = checkedAttr === "true" ? "checked" : "unchecked";
  }
  return applyFormat(delta, "list", list, scroll);
}
function matchNewline(node, delta, scroll) {
  if (!deltaEndsWith(delta, "\n")) {
    if (isLine(node, scroll) && (node.childNodes.length > 0 || node instanceof HTMLParagraphElement)) {
      return delta.insert("\n");
    }
    if (delta.length() > 0 && node.nextSibling) {
      let nextSibling = node.nextSibling;
      while (nextSibling != null) {
        if (isLine(nextSibling, scroll)) {
          return delta.insert("\n");
        }
        const match2 = scroll.query(nextSibling);
        if (match2 && match2.prototype instanceof BlockEmbed) {
          return delta.insert("\n");
        }
        nextSibling = nextSibling.firstChild;
      }
    }
  }
  return delta;
}
function matchStyles(node, delta, scroll) {
  var _a2;
  const formats = {};
  const style = node.style || {};
  if (style.fontStyle === "italic") {
    formats.italic = true;
  }
  if (style.textDecoration === "underline") {
    formats.underline = true;
  }
  if (style.textDecoration === "line-through") {
    formats.strike = true;
  }
  if (((_a2 = style.fontWeight) == null ? void 0 : _a2.startsWith("bold")) || // @ts-expect-error Fix me later
  parseInt(style.fontWeight, 10) >= 700) {
    formats.bold = true;
  }
  delta = Object.entries(formats).reduce((newDelta, _ref5) => {
    let [name, value] = _ref5;
    return applyFormat(newDelta, name, value, scroll);
  }, delta);
  if (parseFloat(style.textIndent || 0) > 0) {
    return new Delta().insert("	").concat(delta);
  }
  return delta;
}
function matchTable(node, delta, scroll) {
  var _a2, _b;
  const table = ((_a2 = node.parentElement) == null ? void 0 : _a2.tagName) === "TABLE" ? node.parentElement : (_b = node.parentElement) == null ? void 0 : _b.parentElement;
  if (table != null) {
    const rows = Array.from(table.querySelectorAll("tr"));
    const row = rows.indexOf(node) + 1;
    return applyFormat(delta, "table", row, scroll);
  }
  return delta;
}
function matchText(node, delta, scroll) {
  var _a2;
  let text = node.data;
  if (((_a2 = node.parentElement) == null ? void 0 : _a2.tagName) === "O:P") {
    return delta.insert(text.trim());
  }
  if (!isPre(node)) {
    if (text.trim().length === 0 && text.includes("\n") && !isBetweenInlineElements(node, scroll)) {
      return delta;
    }
    text = text.replace(/[^\S\u00a0]/g, " ");
    text = text.replace(/ {2,}/g, " ");
    if (node.previousSibling == null && node.parentElement != null && isLine(node.parentElement, scroll) || node.previousSibling instanceof Element && isLine(node.previousSibling, scroll)) {
      text = text.replace(/^ /, "");
    }
    if (node.nextSibling == null && node.parentElement != null && isLine(node.parentElement, scroll) || node.nextSibling instanceof Element && isLine(node.nextSibling, scroll)) {
      text = text.replace(/ $/, "");
    }
    text = text.replaceAll(" ", " ");
  }
  return delta.insert(text);
}
class History extends Module {
  constructor(quill, options) {
    super(quill, options);
    __publicField(this, "lastRecorded", 0);
    __publicField(this, "ignoreChange", false);
    __publicField(this, "stack", {
      undo: [],
      redo: []
    });
    __publicField(this, "currentRange", null);
    this.quill.on(Quill.events.EDITOR_CHANGE, (eventName, value, oldValue, source) => {
      if (eventName === Quill.events.SELECTION_CHANGE) {
        if (value && source !== Quill.sources.SILENT) {
          this.currentRange = value;
        }
      } else if (eventName === Quill.events.TEXT_CHANGE) {
        if (!this.ignoreChange) {
          if (!this.options.userOnly || source === Quill.sources.USER) {
            this.record(value, oldValue);
          } else {
            this.transform(value);
          }
        }
        this.currentRange = transformRange(this.currentRange, value);
      }
    });
    this.quill.keyboard.addBinding({
      key: "z",
      shortKey: true
    }, this.undo.bind(this));
    this.quill.keyboard.addBinding({
      key: ["z", "Z"],
      shortKey: true,
      shiftKey: true
    }, this.redo.bind(this));
    if (/Win/i.test(navigator.platform)) {
      this.quill.keyboard.addBinding({
        key: "y",
        shortKey: true
      }, this.redo.bind(this));
    }
    this.quill.root.addEventListener("beforeinput", (event) => {
      if (event.inputType === "historyUndo") {
        this.undo();
        event.preventDefault();
      } else if (event.inputType === "historyRedo") {
        this.redo();
        event.preventDefault();
      }
    });
  }
  change(source, dest) {
    if (this.stack[source].length === 0) return;
    const item = this.stack[source].pop();
    if (!item) return;
    const base = this.quill.getContents();
    const inverseDelta = item.delta.invert(base);
    this.stack[dest].push({
      delta: inverseDelta,
      range: transformRange(item.range, inverseDelta)
    });
    this.lastRecorded = 0;
    this.ignoreChange = true;
    this.quill.updateContents(item.delta, Quill.sources.USER);
    this.ignoreChange = false;
    this.restoreSelection(item);
  }
  clear() {
    this.stack = {
      undo: [],
      redo: []
    };
  }
  cutoff() {
    this.lastRecorded = 0;
  }
  record(changeDelta, oldDelta) {
    if (changeDelta.ops.length === 0) return;
    this.stack.redo = [];
    let undoDelta = changeDelta.invert(oldDelta);
    let undoRange = this.currentRange;
    const timestamp = Date.now();
    if (
      // @ts-expect-error Fix me later
      this.lastRecorded + this.options.delay > timestamp && this.stack.undo.length > 0
    ) {
      const item = this.stack.undo.pop();
      if (item) {
        undoDelta = undoDelta.compose(item.delta);
        undoRange = item.range;
      }
    } else {
      this.lastRecorded = timestamp;
    }
    if (undoDelta.length() === 0) return;
    this.stack.undo.push({
      delta: undoDelta,
      range: undoRange
    });
    if (this.stack.undo.length > this.options.maxStack) {
      this.stack.undo.shift();
    }
  }
  redo() {
    this.change("redo", "undo");
  }
  transform(delta) {
    transformStack(this.stack.undo, delta);
    transformStack(this.stack.redo, delta);
  }
  undo() {
    this.change("undo", "redo");
  }
  restoreSelection(stackItem) {
    if (stackItem.range) {
      this.quill.setSelection(stackItem.range, Quill.sources.USER);
    } else {
      const index = getLastChangeIndex(this.quill.scroll, stackItem.delta);
      this.quill.setSelection(index, Quill.sources.USER);
    }
  }
}
__publicField(History, "DEFAULTS", {
  delay: 1e3,
  maxStack: 100,
  userOnly: false
});
function transformStack(stack, delta) {
  let remoteDelta = delta;
  for (let i = stack.length - 1; i >= 0; i -= 1) {
    const oldItem = stack[i];
    stack[i] = {
      delta: remoteDelta.transform(oldItem.delta, true),
      range: oldItem.range && transformRange(oldItem.range, remoteDelta)
    };
    remoteDelta = oldItem.delta.transform(remoteDelta);
    if (stack[i].delta.length() === 0) {
      stack.splice(i, 1);
    }
  }
}
function endsWithNewlineChange(scroll, delta) {
  const lastOp = delta.ops[delta.ops.length - 1];
  if (lastOp == null) return false;
  if (lastOp.insert != null) {
    return typeof lastOp.insert === "string" && lastOp.insert.endsWith("\n");
  }
  if (lastOp.attributes != null) {
    return Object.keys(lastOp.attributes).some((attr) => {
      return scroll.query(attr, Scope.BLOCK) != null;
    });
  }
  return false;
}
function getLastChangeIndex(scroll, delta) {
  const deleteLength = delta.reduce((length, op) => {
    return length + (op.delete || 0);
  }, 0);
  let changeIndex = delta.length() - deleteLength;
  if (endsWithNewlineChange(scroll, delta)) {
    changeIndex -= 1;
  }
  return changeIndex;
}
function transformRange(range, delta) {
  if (!range) return range;
  const start = delta.transformPosition(range.index);
  const end = delta.transformPosition(range.index + range.length);
  return {
    index: start,
    length: end - start
  };
}
class Uploader extends Module {
  constructor(quill, options) {
    super(quill, options);
    quill.root.addEventListener("drop", (e) => {
      var _a2;
      e.preventDefault();
      let native = null;
      if (document.caretRangeFromPoint) {
        native = document.caretRangeFromPoint(e.clientX, e.clientY);
      } else if (document.caretPositionFromPoint) {
        const position = document.caretPositionFromPoint(e.clientX, e.clientY);
        native = document.createRange();
        native.setStart(position.offsetNode, position.offset);
        native.setEnd(position.offsetNode, position.offset);
      }
      const normalized = native && quill.selection.normalizeNative(native);
      if (normalized) {
        const range = quill.selection.normalizedToRange(normalized);
        if ((_a2 = e.dataTransfer) == null ? void 0 : _a2.files) {
          this.upload(range, e.dataTransfer.files);
        }
      }
    });
  }
  upload(range, files) {
    const uploads = [];
    Array.from(files).forEach((file) => {
      var _a2;
      if (file && ((_a2 = this.options.mimetypes) == null ? void 0 : _a2.includes(file.type))) {
        uploads.push(file);
      }
    });
    if (uploads.length > 0) {
      this.options.handler.call(this, range, uploads);
    }
  }
}
Uploader.DEFAULTS = {
  mimetypes: ["image/png", "image/jpeg"],
  handler(range, files) {
    if (!this.quill.scroll.query("image")) {
      return;
    }
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });
    Promise.all(promises).then((images) => {
      const update = images.reduce((delta, image) => {
        return delta.insert({
          image
        });
      }, new Delta().retain(range.index).delete(range.length));
      this.quill.updateContents(update, Emitter.sources.USER);
      this.quill.setSelection(range.index + images.length, Emitter.sources.SILENT);
    });
  }
};
const INSERT_TYPES = ["insertText", "insertReplacementText"];
class Input extends Module {
  constructor(quill, options) {
    super(quill, options);
    quill.root.addEventListener("beforeinput", (event) => {
      this.handleBeforeInput(event);
    });
    if (!/Android/i.test(navigator.userAgent)) {
      quill.on(Quill.events.COMPOSITION_BEFORE_START, () => {
        this.handleCompositionStart();
      });
    }
  }
  deleteRange(range) {
    deleteRange({
      range,
      quill: this.quill
    });
  }
  replaceText(range) {
    let text = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    if (range.length === 0) return false;
    if (text) {
      const formats = this.quill.getFormat(range.index, 1);
      this.deleteRange(range);
      this.quill.updateContents(new Delta().retain(range.index).insert(text, formats), Quill.sources.USER);
    } else {
      this.deleteRange(range);
    }
    this.quill.setSelection(range.index + text.length, 0, Quill.sources.SILENT);
    return true;
  }
  handleBeforeInput(event) {
    if (this.quill.composition.isComposing || event.defaultPrevented || !INSERT_TYPES.includes(event.inputType)) {
      return;
    }
    const staticRange = event.getTargetRanges ? event.getTargetRanges()[0] : null;
    if (!staticRange || staticRange.collapsed === true) {
      return;
    }
    const text = getPlainTextFromInputEvent(event);
    if (text == null) {
      return;
    }
    const normalized = this.quill.selection.normalizeNative(staticRange);
    const range = normalized ? this.quill.selection.normalizedToRange(normalized) : null;
    if (range && this.replaceText(range, text)) {
      event.preventDefault();
    }
  }
  handleCompositionStart() {
    const range = this.quill.getSelection();
    if (range) {
      this.replaceText(range);
    }
  }
}
function getPlainTextFromInputEvent(event) {
  var _a2;
  if (typeof event.data === "string") {
    return event.data;
  }
  if ((_a2 = event.dataTransfer) == null ? void 0 : _a2.types.includes("text/plain")) {
    return event.dataTransfer.getData("text/plain");
  }
  return null;
}
const isMac = /Mac/i.test(navigator.platform);
const TTL_FOR_VALID_SELECTION_CHANGE = 100;
const canMoveCaretBeforeUINode = (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight" || // RTL scripts or moving from the end of the previous line
  event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "Home") {
    return true;
  }
  if (isMac && event.key === "a" && event.ctrlKey === true) {
    return true;
  }
  return false;
};
class UINode extends Module {
  constructor(quill, options) {
    super(quill, options);
    __publicField(this, "isListening", false);
    __publicField(this, "selectionChangeDeadline", 0);
    this.handleArrowKeys();
    this.handleNavigationShortcuts();
  }
  handleArrowKeys() {
    this.quill.keyboard.addBinding({
      key: ["ArrowLeft", "ArrowRight"],
      offset: 0,
      shiftKey: null,
      handler(range, _ref) {
        let {
          line,
          event
        } = _ref;
        if (!(line instanceof ParentBlot$1) || !line.uiNode) {
          return true;
        }
        const isRTL = getComputedStyle(line.domNode)["direction"] === "rtl";
        if (isRTL && event.key !== "ArrowRight" || !isRTL && event.key !== "ArrowLeft") {
          return true;
        }
        this.quill.setSelection(range.index - 1, range.length + (event.shiftKey ? 1 : 0), Quill.sources.USER);
        return false;
      }
    });
  }
  handleNavigationShortcuts() {
    this.quill.root.addEventListener("keydown", (event) => {
      if (!event.defaultPrevented && canMoveCaretBeforeUINode(event)) {
        this.ensureListeningToSelectionChange();
      }
    });
  }
  /**
   * We only listen to the `selectionchange` event when
   * there is an intention of moving the caret to the beginning using shortcuts.
   * This is primarily implemented to prevent infinite loops, as we are changing
   * the selection within the handler of a `selectionchange` event.
   */
  ensureListeningToSelectionChange() {
    this.selectionChangeDeadline = Date.now() + TTL_FOR_VALID_SELECTION_CHANGE;
    if (this.isListening) return;
    this.isListening = true;
    const listener = () => {
      this.isListening = false;
      if (Date.now() <= this.selectionChangeDeadline) {
        this.handleSelectionChange();
      }
    };
    document.addEventListener("selectionchange", listener, {
      once: true
    });
  }
  handleSelectionChange() {
    const selection = document.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    if (range.collapsed !== true || range.startOffset !== 0) return;
    const line = this.quill.scroll.find(range.startContainer);
    if (!(line instanceof ParentBlot$1) || !line.uiNode) return;
    const newRange = document.createRange();
    newRange.setStartAfter(line.uiNode);
    newRange.setEndAfter(line.uiNode);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}
Quill.register({
  "blots/block": Block,
  "blots/block/embed": BlockEmbed,
  "blots/break": Break,
  "blots/container": Container,
  "blots/cursor": Cursor,
  "blots/embed": Embed,
  "blots/inline": Inline,
  "blots/scroll": Scroll,
  "blots/text": Text$1,
  "modules/clipboard": Clipboard,
  "modules/history": History,
  "modules/keyboard": Keyboard,
  "modules/uploader": Uploader,
  "modules/input": Input,
  "modules/uiNode": UINode
});
class IndentAttributor extends ClassAttributor$1 {
  add(node, value) {
    let normalizedValue = 0;
    if (value === "+1" || value === "-1") {
      const indent = this.value(node) || 0;
      normalizedValue = value === "+1" ? indent + 1 : indent - 1;
    } else if (typeof value === "number") {
      normalizedValue = value;
    }
    if (normalizedValue === 0) {
      this.remove(node);
      return true;
    }
    return super.add(node, normalizedValue.toString());
  }
  canAdd(node, value) {
    return super.canAdd(node, value) || super.canAdd(node, parseInt(value, 10));
  }
  value(node) {
    return parseInt(super.value(node), 10) || void 0;
  }
}
const IndentClass = new IndentAttributor("indent", "ql-indent", {
  scope: Scope.BLOCK,
  // @ts-expect-error
  whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
});
class Blockquote extends Block {
}
__publicField(Blockquote, "blotName", "blockquote");
__publicField(Blockquote, "tagName", "blockquote");
class Header extends Block {
  static formats(domNode) {
    return this.tagName.indexOf(domNode.tagName) + 1;
  }
}
__publicField(Header, "blotName", "header");
__publicField(Header, "tagName", ["H1", "H2", "H3", "H4", "H5", "H6"]);
class ListContainer extends Container {
}
ListContainer.blotName = "list-container";
ListContainer.tagName = "OL";
class ListItem extends Block {
  static create(value) {
    const node = super.create();
    node.setAttribute("data-list", value);
    return node;
  }
  static formats(domNode) {
    return domNode.getAttribute("data-list") || void 0;
  }
  static register() {
    Quill.register(ListContainer);
  }
  constructor(scroll, domNode) {
    super(scroll, domNode);
    const ui = domNode.ownerDocument.createElement("span");
    const listEventHandler = (e) => {
      if (!scroll.isEnabled()) return;
      const format = this.statics.formats(domNode, scroll);
      if (format === "checked") {
        this.format("list", "unchecked");
        e.preventDefault();
      } else if (format === "unchecked") {
        this.format("list", "checked");
        e.preventDefault();
      }
    };
    ui.addEventListener("mousedown", listEventHandler);
    ui.addEventListener("touchstart", listEventHandler);
    this.attachUI(ui);
  }
  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute("data-list", value);
    } else {
      super.format(name, value);
    }
  }
}
ListItem.blotName = "list";
ListItem.tagName = "LI";
ListContainer.allowedChildren = [ListItem];
ListItem.requiredContainer = ListContainer;
class Bold extends Inline {
  static create() {
    return super.create();
  }
  static formats() {
    return true;
  }
  optimize(context) {
    super.optimize(context);
    if (this.domNode.tagName !== this.statics.tagName[0]) {
      this.replaceWith(this.statics.blotName);
    }
  }
}
__publicField(Bold, "blotName", "bold");
__publicField(Bold, "tagName", ["STRONG", "B"]);
class Italic extends Bold {
}
__publicField(Italic, "blotName", "italic");
__publicField(Italic, "tagName", ["EM", "I"]);
class Link extends Inline {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("href", this.sanitize(value));
    node.setAttribute("rel", "noopener noreferrer");
    node.setAttribute("target", "_blank");
    return node;
  }
  static formats(domNode) {
    return domNode.getAttribute("href");
  }
  static sanitize(url) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }
  format(name, value) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      this.domNode.setAttribute("href", this.constructor.sanitize(value));
    }
  }
}
__publicField(Link, "blotName", "link");
__publicField(Link, "tagName", "A");
__publicField(Link, "SANITIZED_URL", "about:blank");
__publicField(Link, "PROTOCOL_WHITELIST", ["http", "https", "mailto", "tel", "sms"]);
function sanitize(url, protocols) {
  const anchor = document.createElement("a");
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(":"));
  return protocols.indexOf(protocol) > -1;
}
class Script extends Inline {
  static create(value) {
    if (value === "super") {
      return document.createElement("sup");
    }
    if (value === "sub") {
      return document.createElement("sub");
    }
    return super.create(value);
  }
  static formats(domNode) {
    if (domNode.tagName === "SUB") return "sub";
    if (domNode.tagName === "SUP") return "super";
    return void 0;
  }
}
__publicField(Script, "blotName", "script");
__publicField(Script, "tagName", ["SUB", "SUP"]);
class Strike extends Bold {
}
__publicField(Strike, "blotName", "strike");
__publicField(Strike, "tagName", ["S", "STRIKE"]);
class Underline extends Inline {
}
__publicField(Underline, "blotName", "underline");
__publicField(Underline, "tagName", "U");
class Formula extends Embed {
  static create(value) {
    if (window.katex == null) {
      throw new Error("Formula module requires KaTeX.");
    }
    const node = super.create(value);
    if (typeof value === "string") {
      window.katex.render(value, node, {
        throwOnError: false,
        errorColor: "#f00"
      });
      node.setAttribute("data-value", value);
    }
    return node;
  }
  static value(domNode) {
    return domNode.getAttribute("data-value");
  }
  html() {
    const {
      formula
    } = this.value();
    return `<span>${formula}</span>`;
  }
}
__publicField(Formula, "blotName", "formula");
__publicField(Formula, "className", "ql-formula");
__publicField(Formula, "tagName", "SPAN");
const ATTRIBUTES$1 = ["alt", "height", "width"];
let Image$1 = (_a = class extends EmbedBlot$1 {
  static create(value) {
    const node = super.create(value);
    if (typeof value === "string") {
      node.setAttribute("src", this.sanitize(value));
    }
    return node;
  }
  static formats(domNode) {
    return ATTRIBUTES$1.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  static match(url) {
    return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url);
  }
  static sanitize(url) {
    return sanitize(url, ["http", "https", "data"]) ? url : "//:0";
  }
  static value(domNode) {
    return domNode.getAttribute("src");
  }
  format(name, value) {
    if (ATTRIBUTES$1.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}, __publicField(_a, "blotName", "image"), __publicField(_a, "tagName", "IMG"), _a);
const ATTRIBUTES = ["height", "width"];
class Video extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", "true");
    node.setAttribute("src", this.sanitize(value));
    return node;
  }
  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }
  static sanitize(url) {
    return Link.sanitize(url);
  }
  static value(domNode) {
    return domNode.getAttribute("src");
  }
  format(name, value) {
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
  html() {
    const {
      video
    } = this.value();
    return `<a href="${video}">${video}</a>`;
  }
}
__publicField(Video, "blotName", "video");
__publicField(Video, "className", "ql-video");
__publicField(Video, "tagName", "IFRAME");
const TokenAttributor = new ClassAttributor$1("code-token", "hljs", {
  scope: Scope.INLINE
});
class CodeToken extends Inline {
  static formats(node, scroll) {
    while (node != null && node !== scroll.domNode) {
      if (node.classList && node.classList.contains(CodeBlock.className)) {
        return super.formats(node, scroll);
      }
      node = node.parentNode;
    }
    return void 0;
  }
  constructor(scroll, domNode, value) {
    super(scroll, domNode, value);
    TokenAttributor.add(this.domNode, value);
  }
  format(format, value) {
    if (format !== CodeToken.blotName) {
      super.format(format, value);
    } else if (value) {
      TokenAttributor.add(this.domNode, value);
    } else {
      TokenAttributor.remove(this.domNode);
      this.domNode.classList.remove(this.statics.className);
    }
  }
  optimize() {
    super.optimize(...arguments);
    if (!TokenAttributor.value(this.domNode)) {
      this.unwrap();
    }
  }
}
CodeToken.blotName = "code-token";
CodeToken.className = "ql-token";
class SyntaxCodeBlock extends CodeBlock {
  static create(value) {
    const domNode = super.create(value);
    if (typeof value === "string") {
      domNode.setAttribute("data-language", value);
    }
    return domNode;
  }
  static formats(domNode) {
    return domNode.getAttribute("data-language") || "plain";
  }
  static register() {
  }
  // Syntax module will register
  format(name, value) {
    if (name === this.statics.blotName && value) {
      this.domNode.setAttribute("data-language", value);
    } else {
      super.format(name, value);
    }
  }
  replaceWith(name, value) {
    this.formatAt(0, this.length(), CodeToken.blotName, false);
    return super.replaceWith(name, value);
  }
}
class SyntaxCodeBlockContainer extends CodeBlockContainer {
  attach() {
    super.attach();
    this.forceNext = false;
    this.scroll.emitMount(this);
  }
  format(name, value) {
    if (name === SyntaxCodeBlock.blotName) {
      this.forceNext = true;
      this.children.forEach((child) => {
        child.format(name, value);
      });
    }
  }
  formatAt(index, length, name, value) {
    if (name === SyntaxCodeBlock.blotName) {
      this.forceNext = true;
    }
    super.formatAt(index, length, name, value);
  }
  highlight(highlight2) {
    let forced = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (this.children.head == null) return;
    const nodes = Array.from(this.domNode.childNodes).filter((node) => node !== this.uiNode);
    const text = `${nodes.map((node) => node.textContent).join("\n")}
`;
    const language = SyntaxCodeBlock.formats(this.children.head.domNode);
    if (forced || this.forceNext || this.cachedText !== text) {
      if (text.trim().length > 0 || this.cachedText == null) {
        const oldDelta = this.children.reduce((delta2, child) => {
          return delta2.concat(blockDelta(child, false));
        }, new Delta());
        const delta = highlight2(text, language);
        oldDelta.diff(delta).reduce((index, _ref) => {
          let {
            retain,
            attributes
          } = _ref;
          if (!retain) return index;
          if (attributes) {
            Object.keys(attributes).forEach((format) => {
              if ([SyntaxCodeBlock.blotName, CodeToken.blotName].includes(format)) {
                this.formatAt(index, retain, format, attributes[format]);
              }
            });
          }
          return index + retain;
        }, 0);
      }
      this.cachedText = text;
      this.forceNext = false;
    }
  }
  html(index, length) {
    const [codeBlock] = this.children.find(index);
    const language = codeBlock ? SyntaxCodeBlock.formats(codeBlock.domNode) : "plain";
    return `<pre data-language="${language}">
${escapeText(this.code(index, length))}
</pre>`;
  }
  optimize(context) {
    super.optimize(context);
    if (this.parent != null && this.children.head != null && this.uiNode != null) {
      const language = SyntaxCodeBlock.formats(this.children.head.domNode);
      if (language !== this.uiNode.value) {
        this.uiNode.value = language;
      }
    }
  }
}
SyntaxCodeBlockContainer.allowedChildren = [SyntaxCodeBlock];
SyntaxCodeBlock.requiredContainer = SyntaxCodeBlockContainer;
SyntaxCodeBlock.allowedChildren = [CodeToken, Cursor, Text$1, Break];
const highlight = (lib, language, text) => {
  if (typeof lib.versionString === "string") {
    const majorVersion = lib.versionString.split(".")[0];
    if (parseInt(majorVersion, 10) >= 11) {
      return lib.highlight(text, {
        language
      }).value;
    }
  }
  return lib.highlight(language, text).value;
};
class Syntax extends Module {
  static register() {
    Quill.register(CodeToken, true);
    Quill.register(SyntaxCodeBlock, true);
    Quill.register(SyntaxCodeBlockContainer, true);
  }
  constructor(quill, options) {
    super(quill, options);
    if (this.options.hljs == null) {
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    }
    this.languages = this.options.languages.reduce((memo, _ref2) => {
      let {
        key
      } = _ref2;
      memo[key] = true;
      return memo;
    }, {});
    this.highlightBlot = this.highlightBlot.bind(this);
    this.initListener();
    this.initTimer();
  }
  initListener() {
    this.quill.on(Quill.events.SCROLL_BLOT_MOUNT, (blot) => {
      if (!(blot instanceof SyntaxCodeBlockContainer)) return;
      const select = this.quill.root.ownerDocument.createElement("select");
      this.options.languages.forEach((_ref3) => {
        let {
          key,
          label
        } = _ref3;
        const option = select.ownerDocument.createElement("option");
        option.textContent = label;
        option.setAttribute("value", key);
        select.appendChild(option);
      });
      select.addEventListener("change", () => {
        blot.format(SyntaxCodeBlock.blotName, select.value);
        this.quill.root.focus();
        this.highlight(blot, true);
      });
      if (blot.uiNode == null) {
        blot.attachUI(select);
        if (blot.children.head) {
          select.value = SyntaxCodeBlock.formats(blot.children.head.domNode);
        }
      }
    });
  }
  initTimer() {
    let timer = null;
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.highlight();
        timer = null;
      }, this.options.interval);
    });
  }
  highlight() {
    let blot = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    let force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (this.quill.selection.composing) return;
    this.quill.update(Quill.sources.USER);
    const range = this.quill.getSelection();
    const blots = blot == null ? this.quill.scroll.descendants(SyntaxCodeBlockContainer) : [blot];
    blots.forEach((container) => {
      container.highlight(this.highlightBlot, force);
    });
    this.quill.update(Quill.sources.SILENT);
    if (range != null) {
      this.quill.setSelection(range, Quill.sources.SILENT);
    }
  }
  highlightBlot(text) {
    let language = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "plain";
    language = this.languages[language] ? language : "plain";
    if (language === "plain") {
      return escapeText(text).split("\n").reduce((delta, line, i) => {
        if (i !== 0) {
          delta.insert("\n", {
            [CodeBlock.blotName]: language
          });
        }
        return delta.insert(line);
      }, new Delta());
    }
    const container = this.quill.root.ownerDocument.createElement("div");
    container.classList.add(CodeBlock.className);
    container.innerHTML = highlight(this.options.hljs, language, text);
    return traverse(this.quill.scroll, container, [(node, delta) => {
      const value = TokenAttributor.value(node);
      if (value) {
        return delta.compose(new Delta().retain(delta.length(), {
          [CodeToken.blotName]: value
        }));
      }
      return delta;
    }], [(node, delta) => {
      return node.data.split("\n").reduce((memo, nodeText, i) => {
        if (i !== 0) memo.insert("\n", {
          [CodeBlock.blotName]: language
        });
        return memo.insert(nodeText);
      }, delta);
    }], /* @__PURE__ */ new WeakMap());
  }
}
Syntax.DEFAULTS = {
  hljs: (() => {
    return window.hljs;
  })(),
  interval: 1e3,
  languages: [{
    key: "plain",
    label: "Plain"
  }, {
    key: "bash",
    label: "Bash"
  }, {
    key: "cpp",
    label: "C++"
  }, {
    key: "cs",
    label: "C#"
  }, {
    key: "css",
    label: "CSS"
  }, {
    key: "diff",
    label: "Diff"
  }, {
    key: "xml",
    label: "HTML/XML"
  }, {
    key: "java",
    label: "Java"
  }, {
    key: "javascript",
    label: "JavaScript"
  }, {
    key: "markdown",
    label: "Markdown"
  }, {
    key: "php",
    label: "PHP"
  }, {
    key: "python",
    label: "Python"
  }, {
    key: "ruby",
    label: "Ruby"
  }, {
    key: "sql",
    label: "SQL"
  }]
};
const _TableCell = class _TableCell extends Block {
  static create(value) {
    const node = super.create();
    if (value) {
      node.setAttribute("data-row", value);
    } else {
      node.setAttribute("data-row", tableId());
    }
    return node;
  }
  static formats(domNode) {
    if (domNode.hasAttribute("data-row")) {
      return domNode.getAttribute("data-row");
    }
    return void 0;
  }
  cellOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  format(name, value) {
    if (name === _TableCell.blotName && value) {
      this.domNode.setAttribute("data-row", value);
    } else {
      super.format(name, value);
    }
  }
  row() {
    return this.parent;
  }
  rowOffset() {
    if (this.row()) {
      return this.row().rowOffset();
    }
    return -1;
  }
  table() {
    return this.row() && this.row().table();
  }
};
__publicField(_TableCell, "blotName", "table");
__publicField(_TableCell, "tagName", "TD");
let TableCell = _TableCell;
class TableRow extends Container {
  checkMerge() {
    if (super.checkMerge() && this.next.children.head != null) {
      const thisHead = this.children.head.formats();
      const thisTail = this.children.tail.formats();
      const nextHead = this.next.children.head.formats();
      const nextTail = this.next.children.tail.formats();
      return thisHead.table === thisTail.table && thisHead.table === nextHead.table && thisHead.table === nextTail.table;
    }
    return false;
  }
  optimize(context) {
    super.optimize(context);
    this.children.forEach((child) => {
      if (child.next == null) return;
      const childFormats = child.formats();
      const nextFormats = child.next.formats();
      if (childFormats.table !== nextFormats.table) {
        const next = this.splitAfter(child);
        if (next) {
          next.optimize();
        }
        if (this.prev) {
          this.prev.optimize();
        }
      }
    });
  }
  rowOffset() {
    if (this.parent) {
      return this.parent.children.indexOf(this);
    }
    return -1;
  }
  table() {
    return this.parent && this.parent.parent;
  }
}
__publicField(TableRow, "blotName", "table-row");
__publicField(TableRow, "tagName", "TR");
class TableBody extends Container {
}
__publicField(TableBody, "blotName", "table-body");
__publicField(TableBody, "tagName", "TBODY");
class TableContainer extends Container {
  balanceCells() {
    const rows = this.descendants(TableRow);
    const maxColumns = rows.reduce((max, row) => {
      return Math.max(row.children.length, max);
    }, 0);
    rows.forEach((row) => {
      new Array(maxColumns - row.children.length).fill(0).forEach(() => {
        let value;
        if (row.children.head != null) {
          value = TableCell.formats(row.children.head.domNode);
        }
        const blot = this.scroll.create(TableCell.blotName, value);
        row.appendChild(blot);
        blot.optimize();
      });
    });
  }
  cells(column) {
    return this.rows().map((row) => row.children.at(column));
  }
  deleteColumn(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null) return;
    body.children.forEach((row) => {
      const cell = row.children.at(index);
      if (cell != null) {
        cell.remove();
      }
    });
  }
  insertColumn(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null) return;
    body.children.forEach((row) => {
      const ref = row.children.at(index);
      const value = TableCell.formats(row.children.head.domNode);
      const cell = this.scroll.create(TableCell.blotName, value);
      row.insertBefore(cell, ref);
    });
  }
  insertRow(index) {
    const [body] = this.descendant(TableBody);
    if (body == null || body.children.head == null) return;
    const id = tableId();
    const row = this.scroll.create(TableRow.blotName);
    body.children.head.children.forEach(() => {
      const cell = this.scroll.create(TableCell.blotName, id);
      row.appendChild(cell);
    });
    const ref = body.children.at(index);
    body.insertBefore(row, ref);
  }
  rows() {
    const body = this.children.head;
    if (body == null) return [];
    return body.children.map((row) => row);
  }
}
__publicField(TableContainer, "blotName", "table-container");
__publicField(TableContainer, "tagName", "TABLE");
TableContainer.allowedChildren = [TableBody];
TableBody.requiredContainer = TableContainer;
TableBody.allowedChildren = [TableRow];
TableRow.requiredContainer = TableBody;
TableRow.allowedChildren = [TableCell];
TableCell.requiredContainer = TableRow;
function tableId() {
  const id = Math.random().toString(36).slice(2, 6);
  return `row-${id}`;
}
class Table extends Module {
  static register() {
    Quill.register(TableCell);
    Quill.register(TableRow);
    Quill.register(TableBody);
    Quill.register(TableContainer);
  }
  constructor() {
    super(...arguments);
    this.listenBalanceCells();
  }
  balanceTables() {
    this.quill.scroll.descendants(TableContainer).forEach((table) => {
      table.balanceCells();
    });
  }
  deleteColumn() {
    const [table, , cell] = this.getTable();
    if (cell == null) return;
    table.deleteColumn(cell.cellOffset());
    this.quill.update(Quill.sources.USER);
  }
  deleteRow() {
    const [, row] = this.getTable();
    if (row == null) return;
    row.remove();
    this.quill.update(Quill.sources.USER);
  }
  deleteTable() {
    const [table] = this.getTable();
    if (table == null) return;
    const offset = table.offset();
    table.remove();
    this.quill.update(Quill.sources.USER);
    this.quill.setSelection(offset, Quill.sources.SILENT);
  }
  getTable() {
    let range = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.quill.getSelection();
    if (range == null) return [null, null, null, -1];
    const [cell, offset] = this.quill.getLine(range.index);
    if (cell == null || cell.statics.blotName !== TableCell.blotName) {
      return [null, null, null, -1];
    }
    const row = cell.parent;
    const table = row.parent.parent;
    return [table, row, cell, offset];
  }
  insertColumn(offset) {
    const range = this.quill.getSelection();
    if (!range) return;
    const [table, row, cell] = this.getTable(range);
    if (cell == null) return;
    const column = cell.cellOffset();
    table.insertColumn(column + offset);
    this.quill.update(Quill.sources.USER);
    let shift = row.rowOffset();
    if (offset === 0) {
      shift += 1;
    }
    this.quill.setSelection(range.index + shift, range.length, Quill.sources.SILENT);
  }
  insertColumnLeft() {
    this.insertColumn(0);
  }
  insertColumnRight() {
    this.insertColumn(1);
  }
  insertRow(offset) {
    const range = this.quill.getSelection();
    if (!range) return;
    const [table, row, cell] = this.getTable(range);
    if (cell == null) return;
    const index = row.rowOffset();
    table.insertRow(index + offset);
    this.quill.update(Quill.sources.USER);
    if (offset > 0) {
      this.quill.setSelection(range, Quill.sources.SILENT);
    } else {
      this.quill.setSelection(range.index + row.children.length, range.length, Quill.sources.SILENT);
    }
  }
  insertRowAbove() {
    this.insertRow(0);
  }
  insertRowBelow() {
    this.insertRow(1);
  }
  insertTable(rows, columns) {
    const range = this.quill.getSelection();
    if (range == null) return;
    const delta = new Array(rows).fill(0).reduce((memo) => {
      const text = new Array(columns).fill("\n").join("");
      return memo.insert(text, {
        table: tableId()
      });
    }, new Delta().retain(range.index));
    this.quill.updateContents(delta, Quill.sources.USER);
    this.quill.setSelection(range.index, Quill.sources.SILENT);
    this.balanceTables();
  }
  listenBalanceCells() {
    this.quill.on(Quill.events.SCROLL_OPTIMIZE, (mutations) => {
      mutations.some((mutation) => {
        if (["TD", "TR", "TBODY", "TABLE"].includes(mutation.target.tagName)) {
          this.quill.once(Quill.events.TEXT_CHANGE, (delta, old, source) => {
            if (source !== Quill.sources.USER) return;
            this.balanceTables();
          });
          return true;
        }
        return false;
      });
    });
  }
}
const debug = namespace("quill:toolbar");
class Toolbar extends Module {
  constructor(quill, options) {
    var _a2, _b;
    super(quill, options);
    if (Array.isArray(this.options.container)) {
      const container = document.createElement("div");
      container.setAttribute("role", "toolbar");
      addControls(container, this.options.container);
      (_b = (_a2 = quill.container) == null ? void 0 : _a2.parentNode) == null ? void 0 : _b.insertBefore(container, quill.container);
      this.container = container;
    } else if (typeof this.options.container === "string") {
      this.container = document.querySelector(this.options.container);
    } else {
      this.container = this.options.container;
    }
    if (!(this.container instanceof HTMLElement)) {
      debug.error("Container required for toolbar", this.options);
      return;
    }
    this.container.classList.add("ql-toolbar");
    this.controls = [];
    this.handlers = {};
    if (this.options.handlers) {
      Object.keys(this.options.handlers).forEach((format) => {
        var _a3;
        const handler = (_a3 = this.options.handlers) == null ? void 0 : _a3[format];
        if (handler) {
          this.addHandler(format, handler);
        }
      });
    }
    Array.from(this.container.querySelectorAll("button, select")).forEach((input) => {
      this.attach(input);
    });
    this.quill.on(Quill.events.EDITOR_CHANGE, () => {
      const [range] = this.quill.selection.getRange();
      this.update(range);
    });
  }
  addHandler(format, handler) {
    this.handlers[format] = handler;
  }
  attach(input) {
    let format = Array.from(input.classList).find((className) => {
      return className.indexOf("ql-") === 0;
    });
    if (!format) return;
    format = format.slice("ql-".length);
    if (input.tagName === "BUTTON") {
      input.setAttribute("type", "button");
    }
    if (this.handlers[format] == null && this.quill.scroll.query(format) == null) {
      debug.warn("ignoring attaching to nonexistent format", format, input);
      return;
    }
    const eventName = input.tagName === "SELECT" ? "change" : "click";
    input.addEventListener(eventName, (e) => {
      let value;
      if (input.tagName === "SELECT") {
        if (input.selectedIndex < 0) return;
        const selected = input.options[input.selectedIndex];
        if (selected.hasAttribute("selected")) {
          value = false;
        } else {
          value = selected.value || false;
        }
      } else {
        if (input.classList.contains("ql-active")) {
          value = false;
        } else {
          value = input.value || !input.hasAttribute("value");
        }
        e.preventDefault();
      }
      this.quill.focus();
      const [range] = this.quill.selection.getRange();
      if (this.handlers[format] != null) {
        this.handlers[format].call(this, value);
      } else if (
        // @ts-expect-error
        this.quill.scroll.query(format).prototype instanceof EmbedBlot$1
      ) {
        value = prompt(`Enter ${format}`);
        if (!value) return;
        this.quill.updateContents(new Delta().retain(range.index).delete(range.length).insert({
          [format]: value
        }), Quill.sources.USER);
      } else {
        this.quill.format(format, value, Quill.sources.USER);
      }
      this.update(range);
    });
    this.controls.push([format, input]);
  }
  update(range) {
    const formats = range == null ? {} : this.quill.getFormat(range);
    this.controls.forEach((pair) => {
      const [format, input] = pair;
      if (input.tagName === "SELECT") {
        let option = null;
        if (range == null) {
          option = null;
        } else if (formats[format] == null) {
          option = input.querySelector("option[selected]");
        } else if (!Array.isArray(formats[format])) {
          let value = formats[format];
          if (typeof value === "string") {
            value = value.replace(/"/g, '\\"');
          }
          option = input.querySelector(`option[value="${value}"]`);
        }
        if (option == null) {
          input.value = "";
          input.selectedIndex = -1;
        } else {
          option.selected = true;
        }
      } else if (range == null) {
        input.classList.remove("ql-active");
        input.setAttribute("aria-pressed", "false");
      } else if (input.hasAttribute("value")) {
        const value = formats[format];
        const isActive = value === input.getAttribute("value") || value != null && value.toString() === input.getAttribute("value") || value == null && !input.getAttribute("value");
        input.classList.toggle("ql-active", isActive);
        input.setAttribute("aria-pressed", isActive.toString());
      } else {
        const isActive = formats[format] != null;
        input.classList.toggle("ql-active", isActive);
        input.setAttribute("aria-pressed", isActive.toString());
      }
    });
  }
}
Toolbar.DEFAULTS = {};
function addButton(container, format, value) {
  const input = document.createElement("button");
  input.setAttribute("type", "button");
  input.classList.add(`ql-${format}`);
  input.setAttribute("aria-pressed", "false");
  if (value != null) {
    input.value = value;
    input.setAttribute("aria-label", `${format}: ${value}`);
  } else {
    input.setAttribute("aria-label", format);
  }
  container.appendChild(input);
}
function addControls(container, groups) {
  if (!Array.isArray(groups[0])) {
    groups = [groups];
  }
  groups.forEach((controls) => {
    const group = document.createElement("span");
    group.classList.add("ql-formats");
    controls.forEach((control) => {
      if (typeof control === "string") {
        addButton(group, control);
      } else {
        const format = Object.keys(control)[0];
        const value = control[format];
        if (Array.isArray(value)) {
          addSelect(group, format, value);
        } else {
          addButton(group, format, value);
        }
      }
    });
    container.appendChild(group);
  });
}
function addSelect(container, format, values) {
  const input = document.createElement("select");
  input.classList.add(`ql-${format}`);
  values.forEach((value) => {
    const option = document.createElement("option");
    if (value !== false) {
      option.setAttribute("value", String(value));
    } else {
      option.setAttribute("selected", "selected");
    }
    input.appendChild(option);
  });
  container.appendChild(input);
}
Toolbar.DEFAULTS = {
  container: null,
  handlers: {
    clean() {
      const range = this.quill.getSelection();
      if (range == null) return;
      if (range.length === 0) {
        const formats = this.quill.getFormat();
        Object.keys(formats).forEach((name) => {
          if (this.quill.scroll.query(name, Scope.INLINE) != null) {
            this.quill.format(name, false, Quill.sources.USER);
          }
        });
      } else {
        this.quill.removeFormat(range.index, range.length, Quill.sources.USER);
      }
    },
    direction(value) {
      const {
        align
      } = this.quill.getFormat();
      if (value === "rtl" && align == null) {
        this.quill.format("align", "right", Quill.sources.USER);
      } else if (!value && align === "right") {
        this.quill.format("align", false, Quill.sources.USER);
      }
      this.quill.format("direction", value, Quill.sources.USER);
    },
    indent(value) {
      const range = this.quill.getSelection();
      const formats = this.quill.getFormat(range);
      const indent = parseInt(formats.indent || 0, 10);
      if (value === "+1" || value === "-1") {
        let modifier = value === "+1" ? 1 : -1;
        if (formats.direction === "rtl") modifier *= -1;
        this.quill.format("indent", indent + modifier, Quill.sources.USER);
      }
    },
    link(value) {
      if (value === true) {
        value = prompt("Enter link URL:");
      }
      this.quill.format("link", value, Quill.sources.USER);
    },
    list(value) {
      const range = this.quill.getSelection();
      const formats = this.quill.getFormat(range);
      if (value === "check") {
        if (formats.list === "checked" || formats.list === "unchecked") {
          this.quill.format("list", false, Quill.sources.USER);
        } else {
          this.quill.format("list", "unchecked", Quill.sources.USER);
        }
      } else {
        this.quill.format("list", value, Quill.sources.USER);
      }
    }
  }
};
const alignLeftIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"/></svg>';
const alignCenterIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"/><line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"/></svg>';
const alignRightIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"/></svg>';
const alignJustifyIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="15" x2="3" y1="14" y2="14"/><line class="ql-stroke" x1="15" x2="3" y1="4" y2="4"/></svg>';
const backgroundIcon = '<svg viewbox="0 0 18 18"><g class="ql-fill ql-color-label"><polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"/><rect height="1" width="1" x="4" y="4"/><polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"/><rect height="1" width="1" x="2" y="6"/><rect height="1" width="1" x="3" y="5"/><rect height="1" width="1" x="4" y="7"/><polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"/><rect height="1" width="1" x="2" y="12"/><rect height="1" width="1" x="2" y="9"/><rect height="1" width="1" x="2" y="15"/><polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"/><rect height="1" width="1" x="3" y="8"/><path d="M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z"/><path d="M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z"/><path d="M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z"/><rect height="1" width="1" x="12" y="2"/><rect height="1" width="1" x="11" y="3"/><path d="M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z"/><rect height="1" width="1" x="2" y="3"/><rect height="1" width="1" x="6" y="2"/><rect height="1" width="1" x="3" y="2"/><rect height="1" width="1" x="5" y="3"/><rect height="1" width="1" x="9" y="2"/><rect height="1" width="1" x="15" y="14"/><polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"/><rect height="1" width="1" x="13" y="7"/><rect height="1" width="1" x="15" y="5"/><rect height="1" width="1" x="14" y="6"/><rect height="1" width="1" x="15" y="8"/><rect height="1" width="1" x="14" y="9"/><path d="M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z"/><rect height="1" width="1" x="14" y="3"/><polygon points="12 6.868 12 6 11.62 6 12 6.868"/><rect height="1" width="1" x="15" y="2"/><rect height="1" width="1" x="12" y="5"/><rect height="1" width="1" x="13" y="4"/><polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"/><rect height="1" width="1" x="9" y="14"/><rect height="1" width="1" x="8" y="15"/><path d="M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z"/><rect height="1" width="1" x="5" y="15"/><path d="M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z"/><rect height="1" width="1" x="11" y="15"/><path d="M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z"/><rect height="1" width="1" x="14" y="15"/><rect height="1" width="1" x="15" y="11"/></g><polyline class="ql-stroke" points="5.5 13 9 5 12.5 13"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="11" y2="11"/></svg>';
const blockquoteIcon = '<svg viewbox="0 0 18 18"><rect class="ql-fill ql-stroke" height="3" width="3" x="4" y="5"/><rect class="ql-fill ql-stroke" height="3" width="3" x="11" y="5"/><path class="ql-even ql-fill ql-stroke" d="M7,8c0,4.031-3,5-3,5"/><path class="ql-even ql-fill ql-stroke" d="M14,8c0,4.031-3,5-3,5"/></svg>';
const boldIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"/><path class="ql-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"/></svg>';
const cleanIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="5" x2="13" y1="3" y2="3"/><line class="ql-stroke" x1="6" x2="9.35" y1="12" y2="3"/><line class="ql-stroke" x1="11" x2="15" y1="11" y2="15"/><line class="ql-stroke" x1="15" x2="11" y1="11" y2="15"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"/></svg>';
const codeIcon = '<svg viewbox="0 0 18 18"><polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"/><polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"/><line class="ql-stroke" x1="10" x2="8" y1="5" y2="13"/></svg>';
const colorIcon = '<svg viewbox="0 0 18 18"><line class="ql-color-label ql-stroke ql-transparent" x1="3" x2="15" y1="15" y2="15"/><polyline class="ql-stroke" points="5.5 11 9 3 12.5 11"/><line class="ql-stroke" x1="11.63" x2="6.38" y1="9" y2="9"/></svg>';
const directionLeftToRightIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"/><line class="ql-stroke ql-fill" x1="15" x2="11" y1="4" y2="4"/><path class="ql-fill" d="M11,3a3,3,0,0,0,0,6h1V3H11Z"/><rect class="ql-fill" height="11" width="1" x="11" y="4"/><rect class="ql-fill" height="11" width="1" x="13" y="4"/></svg>';
const directionRightToLeftIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"/><line class="ql-stroke ql-fill" x1="9" x2="5" y1="4" y2="4"/><path class="ql-fill" d="M5,3A3,3,0,0,0,5,9H6V3H5Z"/><rect class="ql-fill" height="11" width="1" x="5" y="4"/><rect class="ql-fill" height="11" width="1" x="7" y="4"/></svg>';
const formulaIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z"/><rect class="ql-fill" height="1.6" rx="0.8" ry="0.8" width="5" x="5.15" y="6.2"/><path class="ql-fill" d="M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z"/></svg>';
const headerIcon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/></svg>';
const header2Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
const header3Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
const header4Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm7.05371,7.96582v.38477c0,.39648-.165.60547-.46191.60547h-.47314v1.29785a.54085.54085,0,0,1-.605.60547h-.69336a.54085.54085,0,0,1-.605-.60547V12.95605H11.333a.5412.5412,0,0,1-.60547-.60547v-.15332a1.199,1.199,0,0,1,.22021-.748l2.56348-4.05957a.7819.7819,0,0,1,.72607-.39648h1.27637a.54085.54085,0,0,1,.605.60547v3.7627h.33008A.54055.54055,0,0,1,17.05371,11.96582ZM14.28125,8.7207h-.022a4.18969,4.18969,0,0,1-.38525.81348l-1.188,1.80469v.02246h1.5293V9.60059A7.04058,7.04058,0,0,1,14.28125,8.7207Z"/></svg>';
const header5Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M16.74023,12.18555a2.75131,2.75131,0,0,1-2.91553,2.80566,3.908,3.908,0,0,1-2.25537-.68164.54809.54809,0,0,1-.13184-.8252L11.73438,13c.209-.34082.48389-.36328.8252-.1543a2.23757,2.23757,0,0,0,1.1001.33008,1.01827,1.01827,0,0,0,1.1001-.96777c0-.61621-.53906-.97949-1.25439-.97949a2.15554,2.15554,0,0,0-.64893.09961,1.15209,1.15209,0,0,1-.814.01074l-.12109-.04395a.64116.64116,0,0,1-.45117-.71484l.231-3.00391a.56666.56666,0,0,1,.62744-.583H15.541a.54085.54085,0,0,1,.605.60547v.43945a.54085.54085,0,0,1-.605.60547H13.41748l-.04395.72559a1.29306,1.29306,0,0,1-.04395.30859h.022a2.39776,2.39776,0,0,1,.57227-.07715A2.53266,2.53266,0,0,1,16.74023,12.18555ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/></svg>';
const header6Icon = '<svg viewBox="0 0 18 18"><path class="ql-fill" d="M14.51758,9.64453a1.85627,1.85627,0,0,0-1.24316.38477H13.252a1.73532,1.73532,0,0,1,1.72754-1.4082,2.66491,2.66491,0,0,1,.5498.06641c.35254.05469.57227.01074.70508-.40723l.16406-.5166a.53393.53393,0,0,0-.373-.75977,4.83723,4.83723,0,0,0-1.17773-.14258c-2.43164,0-3.7627,2.17773-3.7627,4.43359,0,2.47559,1.60645,3.69629,3.19043,3.69629A2.70585,2.70585,0,0,0,16.96,12.19727,2.43861,2.43861,0,0,0,14.51758,9.64453Zm-.23047,3.58691c-.67187,0-1.22168-.81445-1.22168-1.45215,0-.47363.30762-.583.72559-.583.96875,0,1.27734.59375,1.27734,1.12207A.82182.82182,0,0,1,14.28711,13.23145ZM10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Z"/></svg>';
const italicIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="13" y1="4" y2="4"/><line class="ql-stroke" x1="5" x2="11" y1="14" y2="14"/><line class="ql-stroke" x1="8" x2="10" y1="14" y2="4"/></svg>';
const imageIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="10" width="12" x="3" y="4"/><circle class="ql-fill" cx="6" cy="7" r="1"/><polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"/></svg>';
const indentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"/></svg>';
const outdentIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="3" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="5 7 5 11 3 9 5 7"/></svg>';
const linkIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="11" y1="7" y2="11"/><path class="ql-even ql-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"/><path class="ql-even ql-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"/></svg>';
const listBulletIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="6" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="6" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="6" x2="15" y1="14" y2="14"/><line class="ql-stroke" x1="3" x2="3" y1="4" y2="4"/><line class="ql-stroke" x1="3" x2="3" y1="9" y2="9"/><line class="ql-stroke" x1="3" x2="3" y1="14" y2="14"/></svg>';
const listCheckIcon = '<svg class="" viewbox="0 0 18 18"><line class="ql-stroke" x1="9" x2="15" y1="4" y2="4"/><polyline class="ql-stroke" points="3 4 4 5 6 3"/><line class="ql-stroke" x1="9" x2="15" y1="14" y2="14"/><polyline class="ql-stroke" points="3 14 4 15 6 13"/><line class="ql-stroke" x1="9" x2="15" y1="9" y2="9"/><polyline class="ql-stroke" points="3 9 4 10 6 8"/></svg>';
const listOrderedIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke" x1="7" x2="15" y1="4" y2="4"/><line class="ql-stroke" x1="7" x2="15" y1="9" y2="9"/><line class="ql-stroke" x1="7" x2="15" y1="14" y2="14"/><line class="ql-stroke ql-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"/><path class="ql-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"/><path class="ql-stroke ql-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"/><path class="ql-stroke ql-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"/></svg>';
const subscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z"/><path class="ql-fill" d="M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z"/></svg>';
const superscriptIcon = '<svg viewbox="0 0 18 18"><path class="ql-fill" d="M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z"/><path class="ql-fill" d="M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z"/></svg>';
const strikeIcon = '<svg viewbox="0 0 18 18"><line class="ql-stroke ql-thin" x1="15.5" x2="2.5" y1="8.5" y2="9.5"/><path class="ql-fill" d="M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z"/><path class="ql-fill" d="M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z"/></svg>';
const tableIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="2" width="3" x="5" y="5"/><rect class="ql-fill" height="2" width="4" x="9" y="5"/><g class="ql-fill ql-transparent"><rect height="2" width="3" x="5" y="8"/><rect height="2" width="4" x="9" y="8"/><rect height="2" width="3" x="5" y="11"/><rect height="2" width="4" x="9" y="11"/></g></svg>';
const underlineIcon = '<svg viewbox="0 0 18 18"><path class="ql-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"/><rect class="ql-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"/></svg>';
const videoIcon = '<svg viewbox="0 0 18 18"><rect class="ql-stroke" height="12" width="12" x="3" y="3"/><rect class="ql-fill" height="12" width="1" x="5" y="3"/><rect class="ql-fill" height="12" width="1" x="12" y="3"/><rect class="ql-fill" height="2" width="8" x="5" y="8"/><rect class="ql-fill" height="1" width="3" x="3" y="5"/><rect class="ql-fill" height="1" width="3" x="3" y="7"/><rect class="ql-fill" height="1" width="3" x="3" y="10"/><rect class="ql-fill" height="1" width="3" x="3" y="12"/><rect class="ql-fill" height="1" width="3" x="12" y="5"/><rect class="ql-fill" height="1" width="3" x="12" y="7"/><rect class="ql-fill" height="1" width="3" x="12" y="10"/><rect class="ql-fill" height="1" width="3" x="12" y="12"/></svg>';
const Icons = {
  align: {
    "": alignLeftIcon,
    center: alignCenterIcon,
    right: alignRightIcon,
    justify: alignJustifyIcon
  },
  background: backgroundIcon,
  blockquote: blockquoteIcon,
  bold: boldIcon,
  clean: cleanIcon,
  code: codeIcon,
  "code-block": codeIcon,
  color: colorIcon,
  direction: {
    "": directionLeftToRightIcon,
    rtl: directionRightToLeftIcon
  },
  formula: formulaIcon,
  header: {
    "1": headerIcon,
    "2": header2Icon,
    "3": header3Icon,
    "4": header4Icon,
    "5": header5Icon,
    "6": header6Icon
  },
  italic: italicIcon,
  image: imageIcon,
  indent: {
    "+1": indentIcon,
    "-1": outdentIcon
  },
  link: linkIcon,
  list: {
    bullet: listBulletIcon,
    check: listCheckIcon,
    ordered: listOrderedIcon
  },
  script: {
    sub: subscriptIcon,
    super: superscriptIcon
  },
  strike: strikeIcon,
  table: tableIcon,
  underline: underlineIcon,
  video: videoIcon
};
const DropdownIcon = '<svg viewbox="0 0 18 18"><polygon class="ql-stroke" points="7 11 9 13 11 11 7 11"/><polygon class="ql-stroke" points="7 7 9 5 11 7 7 7"/></svg>';
let optionsCounter = 0;
function toggleAriaAttribute(element, attribute) {
  element.setAttribute(attribute, `${!(element.getAttribute(attribute) === "true")}`);
}
class Picker {
  constructor(select) {
    this.select = select;
    this.container = document.createElement("span");
    this.buildPicker();
    this.select.style.display = "none";
    this.select.parentNode.insertBefore(this.container, this.select);
    this.label.addEventListener("mousedown", () => {
      this.togglePicker();
    });
    this.label.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Enter":
          this.togglePicker();
          break;
        case "Escape":
          this.escape();
          event.preventDefault();
          break;
      }
    });
    this.select.addEventListener("change", this.update.bind(this));
  }
  togglePicker() {
    this.container.classList.toggle("ql-expanded");
    toggleAriaAttribute(this.label, "aria-expanded");
    toggleAriaAttribute(this.options, "aria-hidden");
  }
  buildItem(option) {
    const item = document.createElement("span");
    item.tabIndex = "0";
    item.setAttribute("role", "button");
    item.classList.add("ql-picker-item");
    const value = option.getAttribute("value");
    if (value) {
      item.setAttribute("data-value", value);
    }
    if (option.textContent) {
      item.setAttribute("data-label", option.textContent);
    }
    item.addEventListener("click", () => {
      this.selectItem(item, true);
    });
    item.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "Enter":
          this.selectItem(item, true);
          event.preventDefault();
          break;
        case "Escape":
          this.escape();
          event.preventDefault();
          break;
      }
    });
    return item;
  }
  buildLabel() {
    const label = document.createElement("span");
    label.classList.add("ql-picker-label");
    label.innerHTML = DropdownIcon;
    label.tabIndex = "0";
    label.setAttribute("role", "button");
    label.setAttribute("aria-expanded", "false");
    this.container.appendChild(label);
    return label;
  }
  buildOptions() {
    const options = document.createElement("span");
    options.classList.add("ql-picker-options");
    options.setAttribute("aria-hidden", "true");
    options.tabIndex = "-1";
    options.id = `ql-picker-options-${optionsCounter}`;
    optionsCounter += 1;
    this.label.setAttribute("aria-controls", options.id);
    this.options = options;
    Array.from(this.select.options).forEach((option) => {
      const item = this.buildItem(option);
      options.appendChild(item);
      if (option.selected === true) {
        this.selectItem(item);
      }
    });
    this.container.appendChild(options);
  }
  buildPicker() {
    Array.from(this.select.attributes).forEach((item) => {
      this.container.setAttribute(item.name, item.value);
    });
    this.container.classList.add("ql-picker");
    this.label = this.buildLabel();
    this.buildOptions();
  }
  escape() {
    this.close();
    setTimeout(() => this.label.focus(), 1);
  }
  close() {
    this.container.classList.remove("ql-expanded");
    this.label.setAttribute("aria-expanded", "false");
    this.options.setAttribute("aria-hidden", "true");
  }
  selectItem(item) {
    let trigger = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    const selected = this.container.querySelector(".ql-selected");
    if (item === selected) return;
    if (selected != null) {
      selected.classList.remove("ql-selected");
    }
    if (item == null) return;
    item.classList.add("ql-selected");
    this.select.selectedIndex = Array.from(item.parentNode.children).indexOf(item);
    if (item.hasAttribute("data-value")) {
      this.label.setAttribute("data-value", item.getAttribute("data-value"));
    } else {
      this.label.removeAttribute("data-value");
    }
    if (item.hasAttribute("data-label")) {
      this.label.setAttribute("data-label", item.getAttribute("data-label"));
    } else {
      this.label.removeAttribute("data-label");
    }
    if (trigger) {
      this.select.dispatchEvent(new Event("change"));
      this.close();
    }
  }
  update() {
    let option;
    if (this.select.selectedIndex > -1) {
      const item = (
        // @ts-expect-error Fix me later
        this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex]
      );
      option = this.select.options[this.select.selectedIndex];
      this.selectItem(item);
    } else {
      this.selectItem(null);
    }
    const isActive = option != null && option !== this.select.querySelector("option[selected]");
    this.label.classList.toggle("ql-active", isActive);
  }
}
class ColorPicker extends Picker {
  constructor(select, label) {
    super(select);
    this.label.innerHTML = label;
    this.container.classList.add("ql-color-picker");
    Array.from(this.container.querySelectorAll(".ql-picker-item")).slice(0, 7).forEach((item) => {
      item.classList.add("ql-primary");
    });
  }
  buildItem(option) {
    const item = super.buildItem(option);
    item.style.backgroundColor = option.getAttribute("value") || "";
    return item;
  }
  selectItem(item, trigger) {
    super.selectItem(item, trigger);
    const colorLabel = this.label.querySelector(".ql-color-label");
    const value = item ? item.getAttribute("data-value") || "" : "";
    if (colorLabel) {
      if (colorLabel.tagName === "line") {
        colorLabel.style.stroke = value;
      } else {
        colorLabel.style.fill = value;
      }
    }
  }
}
class IconPicker extends Picker {
  constructor(select, icons) {
    super(select);
    this.container.classList.add("ql-icon-picker");
    Array.from(this.container.querySelectorAll(".ql-picker-item")).forEach((item) => {
      item.innerHTML = icons[item.getAttribute("data-value") || ""];
    });
    this.defaultItem = this.container.querySelector(".ql-selected");
    this.selectItem(this.defaultItem);
  }
  selectItem(target, trigger) {
    super.selectItem(target, trigger);
    const item = target || this.defaultItem;
    if (item != null) {
      if (this.label.innerHTML === item.innerHTML) return;
      this.label.innerHTML = item.innerHTML;
    }
  }
}
const isScrollable = (el) => {
  const {
    overflowY
  } = getComputedStyle(el, null);
  return overflowY !== "visible" && overflowY !== "clip";
};
class Tooltip {
  constructor(quill, boundsContainer) {
    this.quill = quill;
    this.boundsContainer = boundsContainer || document.body;
    this.root = quill.addContainer("ql-tooltip");
    this.root.innerHTML = this.constructor.TEMPLATE;
    if (isScrollable(this.quill.root)) {
      this.quill.root.addEventListener("scroll", () => {
        this.root.style.marginTop = `${-1 * this.quill.root.scrollTop}px`;
      });
    }
    this.hide();
  }
  hide() {
    this.root.classList.add("ql-hidden");
  }
  position(reference) {
    const left = reference.left + reference.width / 2 - this.root.offsetWidth / 2;
    const top = reference.bottom + this.quill.root.scrollTop;
    this.root.style.left = `${left}px`;
    this.root.style.top = `${top}px`;
    this.root.classList.remove("ql-flip");
    const containerBounds = this.boundsContainer.getBoundingClientRect();
    const rootBounds = this.root.getBoundingClientRect();
    let shift = 0;
    if (rootBounds.right > containerBounds.right) {
      shift = containerBounds.right - rootBounds.right;
      this.root.style.left = `${left + shift}px`;
    }
    if (rootBounds.left < containerBounds.left) {
      shift = containerBounds.left - rootBounds.left;
      this.root.style.left = `${left + shift}px`;
    }
    if (rootBounds.bottom > containerBounds.bottom) {
      const height = rootBounds.bottom - rootBounds.top;
      const verticalShift = reference.bottom - reference.top + height;
      this.root.style.top = `${top - verticalShift}px`;
      this.root.classList.add("ql-flip");
    }
    return shift;
  }
  show() {
    this.root.classList.remove("ql-editing");
    this.root.classList.remove("ql-hidden");
  }
}
const ALIGNS = [false, "center", "right", "justify"];
const COLORS = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
const FONTS = [false, "serif", "monospace"];
const HEADERS = ["1", "2", "3", false];
const SIZES = ["small", false, "large", "huge"];
class BaseTheme extends Theme {
  constructor(quill, options) {
    super(quill, options);
    const listener = (e) => {
      if (!document.body.contains(quill.root)) {
        document.body.removeEventListener("click", listener);
        return;
      }
      if (this.tooltip != null && // @ts-expect-error
      !this.tooltip.root.contains(e.target) && // @ts-expect-error
      document.activeElement !== this.tooltip.textbox && !this.quill.hasFocus()) {
        this.tooltip.hide();
      }
      if (this.pickers != null) {
        this.pickers.forEach((picker) => {
          if (!picker.container.contains(e.target)) {
            picker.close();
          }
        });
      }
    };
    quill.emitter.listenDOM("click", document.body, listener);
  }
  addModule(name) {
    const module2 = super.addModule(name);
    if (name === "toolbar") {
      this.extendToolbar(module2);
    }
    return module2;
  }
  buildButtons(buttons, icons) {
    Array.from(buttons).forEach((button) => {
      const className = button.getAttribute("class") || "";
      className.split(/\s+/).forEach((name) => {
        if (!name.startsWith("ql-")) return;
        name = name.slice("ql-".length);
        if (icons[name] == null) return;
        if (name === "direction") {
          button.innerHTML = icons[name][""] + icons[name].rtl;
        } else if (typeof icons[name] === "string") {
          button.innerHTML = icons[name];
        } else {
          const value = button.value || "";
          if (value != null && icons[name][value]) {
            button.innerHTML = icons[name][value];
          }
        }
      });
    });
  }
  buildPickers(selects, icons) {
    this.pickers = Array.from(selects).map((select) => {
      if (select.classList.contains("ql-align")) {
        if (select.querySelector("option") == null) {
          fillSelect(select, ALIGNS);
        }
        if (typeof icons.align === "object") {
          return new IconPicker(select, icons.align);
        }
      }
      if (select.classList.contains("ql-background") || select.classList.contains("ql-color")) {
        const format = select.classList.contains("ql-background") ? "background" : "color";
        if (select.querySelector("option") == null) {
          fillSelect(select, COLORS, format === "background" ? "#ffffff" : "#000000");
        }
        return new ColorPicker(select, icons[format]);
      }
      if (select.querySelector("option") == null) {
        if (select.classList.contains("ql-font")) {
          fillSelect(select, FONTS);
        } else if (select.classList.contains("ql-header")) {
          fillSelect(select, HEADERS);
        } else if (select.classList.contains("ql-size")) {
          fillSelect(select, SIZES);
        }
      }
      return new Picker(select);
    });
    const update = () => {
      this.pickers.forEach((picker) => {
        picker.update();
      });
    };
    this.quill.on(Emitter.events.EDITOR_CHANGE, update);
  }
}
BaseTheme.DEFAULTS = merge({}, Theme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula() {
          this.quill.theme.tooltip.edit("formula");
        },
        image() {
          let fileInput = this.container.querySelector("input.ql-image[type=file]");
          if (fileInput == null) {
            fileInput = document.createElement("input");
            fileInput.setAttribute("type", "file");
            fileInput.setAttribute("accept", this.quill.uploader.options.mimetypes.join(", "));
            fileInput.classList.add("ql-image");
            fileInput.addEventListener("change", () => {
              const range = this.quill.getSelection(true);
              this.quill.uploader.upload(range, fileInput.files);
              fileInput.value = "";
            });
            this.container.appendChild(fileInput);
          }
          fileInput.click();
        },
        video() {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
class BaseTooltip extends Tooltip {
  constructor(quill, boundsContainer) {
    super(quill, boundsContainer);
    this.textbox = this.root.querySelector('input[type="text"]');
    this.listen();
  }
  listen() {
    this.textbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.save();
        event.preventDefault();
      } else if (event.key === "Escape") {
        this.cancel();
        event.preventDefault();
      }
    });
  }
  cancel() {
    this.hide();
    this.restoreFocus();
  }
  edit() {
    let mode = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link";
    let preview = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    this.root.classList.remove("ql-hidden");
    this.root.classList.add("ql-editing");
    if (this.textbox == null) return;
    if (preview != null) {
      this.textbox.value = preview;
    } else if (mode !== this.root.getAttribute("data-mode")) {
      this.textbox.value = "";
    }
    const bounds = this.quill.getBounds(this.quill.selection.savedRange);
    if (bounds != null) {
      this.position(bounds);
    }
    this.textbox.select();
    this.textbox.setAttribute("placeholder", this.textbox.getAttribute(`data-${mode}`) || "");
    this.root.setAttribute("data-mode", mode);
  }
  restoreFocus() {
    this.quill.focus({
      preventScroll: true
    });
  }
  save() {
    let {
      value
    } = this.textbox;
    switch (this.root.getAttribute("data-mode")) {
      case "link": {
        const {
          scrollTop
        } = this.quill.root;
        if (this.linkRange) {
          this.quill.formatText(this.linkRange, "link", value, Emitter.sources.USER);
          delete this.linkRange;
        } else {
          this.restoreFocus();
          this.quill.format("link", value, Emitter.sources.USER);
        }
        this.quill.root.scrollTop = scrollTop;
        break;
      }
      case "video": {
        value = extractVideoUrl(value);
      }
      case "formula": {
        if (!value) break;
        const range = this.quill.getSelection(true);
        if (range != null) {
          const index = range.index + range.length;
          this.quill.insertEmbed(
            index,
            // @ts-expect-error Fix me later
            this.root.getAttribute("data-mode"),
            value,
            Emitter.sources.USER
          );
          if (this.root.getAttribute("data-mode") === "formula") {
            this.quill.insertText(index + 1, " ", Emitter.sources.USER);
          }
          this.quill.setSelection(index + 2, Emitter.sources.USER);
        }
        break;
      }
    }
    this.textbox.value = "";
    this.hide();
  }
}
function extractVideoUrl(url) {
  let match2 = url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || url.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
  if (match2) {
    return `${match2[1] || "https"}://www.youtube.com/embed/${match2[2]}?showinfo=0`;
  }
  if (match2 = url.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
    return `${match2[1] || "https"}://player.vimeo.com/video/${match2[2]}/`;
  }
  return url;
}
function fillSelect(select, values) {
  let defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  values.forEach((value) => {
    const option = document.createElement("option");
    if (value === defaultValue) {
      option.setAttribute("selected", "selected");
    } else {
      option.setAttribute("value", String(value));
    }
    select.appendChild(option);
  });
}
const TOOLBAR_CONFIG$1 = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
class BubbleTooltip extends BaseTooltip {
  constructor(quill, bounds) {
    super(quill, bounds);
    this.quill.on(Emitter.events.EDITOR_CHANGE, (type, range, oldRange, source) => {
      if (type !== Emitter.events.SELECTION_CHANGE) return;
      if (range != null && range.length > 0 && source === Emitter.sources.USER) {
        this.show();
        this.root.style.left = "0px";
        this.root.style.width = "";
        this.root.style.width = `${this.root.offsetWidth}px`;
        const lines = this.quill.getLines(range.index, range.length);
        if (lines.length === 1) {
          const bounds2 = this.quill.getBounds(range);
          if (bounds2 != null) {
            this.position(bounds2);
          }
        } else {
          const lastLine = lines[lines.length - 1];
          const index = this.quill.getIndex(lastLine);
          const length = Math.min(lastLine.length() - 1, range.index + range.length - index);
          const indexBounds = this.quill.getBounds(new Range(index, length));
          if (indexBounds != null) {
            this.position(indexBounds);
          }
        }
      } else if (document.activeElement !== this.textbox && this.quill.hasFocus()) {
        this.hide();
      }
    });
  }
  listen() {
    super.listen();
    this.root.querySelector(".ql-close").addEventListener("click", () => {
      this.root.classList.remove("ql-editing");
    });
    this.quill.on(Emitter.events.SCROLL_OPTIMIZE, () => {
      setTimeout(() => {
        if (this.root.classList.contains("ql-hidden")) return;
        const range = this.quill.getSelection();
        if (range != null) {
          const bounds = this.quill.getBounds(range);
          if (bounds != null) {
            this.position(bounds);
          }
        }
      }, 1);
    });
  }
  cancel() {
    this.show();
  }
  position(reference) {
    const shift = super.position(reference);
    const arrow = this.root.querySelector(".ql-tooltip-arrow");
    arrow.style.marginLeft = "";
    if (shift !== 0) {
      arrow.style.marginLeft = `${-1 * shift - arrow.offsetWidth / 2}px`;
    }
    return shift;
  }
}
__publicField(BubbleTooltip, "TEMPLATE", ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""));
class BubbleTheme extends BaseTheme {
  constructor(quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG$1;
    }
    super(quill, options);
    this.quill.container.classList.add("ql-bubble");
  }
  extendToolbar(toolbar) {
    this.tooltip = new BubbleTooltip(this.quill, this.options.bounds);
    if (toolbar.container != null) {
      this.tooltip.root.appendChild(toolbar.container);
      this.buildButtons(toolbar.container.querySelectorAll("button"), Icons);
      this.buildPickers(toolbar.container.querySelectorAll("select"), Icons);
    }
  }
}
BubbleTheme.DEFAULTS = merge({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (!value) {
            this.quill.format("link", false, Quill.sources.USER);
          } else {
            this.quill.theme.tooltip.edit();
          }
        }
      }
    }
  }
});
const TOOLBAR_CONFIG = [[{
  header: ["1", "2", "3", false]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
class SnowTooltip extends BaseTooltip {
  constructor() {
    super(...arguments);
    __publicField(this, "preview", this.root.querySelector("a.ql-preview"));
  }
  listen() {
    super.listen();
    this.root.querySelector("a.ql-action").addEventListener("click", (event) => {
      if (this.root.classList.contains("ql-editing")) {
        this.save();
      } else {
        this.edit("link", this.preview.textContent);
      }
      event.preventDefault();
    });
    this.root.querySelector("a.ql-remove").addEventListener("click", (event) => {
      if (this.linkRange != null) {
        const range = this.linkRange;
        this.restoreFocus();
        this.quill.formatText(range, "link", false, Emitter.sources.USER);
        delete this.linkRange;
      }
      event.preventDefault();
      this.hide();
    });
    this.quill.on(Emitter.events.SELECTION_CHANGE, (range, oldRange, source) => {
      if (range == null) return;
      if (range.length === 0 && source === Emitter.sources.USER) {
        const [link, offset] = this.quill.scroll.descendant(Link, range.index);
        if (link != null) {
          this.linkRange = new Range(range.index - offset, link.length());
          const preview = Link.formats(link.domNode);
          this.preview.textContent = preview;
          this.preview.setAttribute("href", preview);
          this.show();
          const bounds = this.quill.getBounds(this.linkRange);
          if (bounds != null) {
            this.position(bounds);
          }
          return;
        }
      } else {
        delete this.linkRange;
      }
      this.hide();
    });
  }
  show() {
    super.show();
    this.root.removeAttribute("data-mode");
  }
}
__publicField(SnowTooltip, "TEMPLATE", ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""));
class SnowTheme extends BaseTheme {
  constructor(quill, options) {
    if (options.modules.toolbar != null && options.modules.toolbar.container == null) {
      options.modules.toolbar.container = TOOLBAR_CONFIG;
    }
    super(quill, options);
    this.quill.container.classList.add("ql-snow");
  }
  extendToolbar(toolbar) {
    if (toolbar.container != null) {
      toolbar.container.classList.add("ql-snow");
      this.buildButtons(toolbar.container.querySelectorAll("button"), Icons);
      this.buildPickers(toolbar.container.querySelectorAll("select"), Icons);
      this.tooltip = new SnowTooltip(this.quill, this.options.bounds);
      if (toolbar.container.querySelector(".ql-link")) {
        this.quill.keyboard.addBinding({
          key: "k",
          shortKey: true
        }, (_range, context) => {
          toolbar.handlers.link.call(toolbar, !context.format.link);
        });
      }
    }
  }
}
SnowTheme.DEFAULTS = merge({}, BaseTheme.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link(value) {
          if (value) {
            const range = this.quill.getSelection();
            if (range == null || range.length === 0) return;
            let preview = this.quill.getText(range);
            if (/^\S+@\S+\.\S+$/.test(preview) && preview.indexOf("mailto:") !== 0) {
              preview = `mailto:${preview}`;
            }
            const {
              tooltip
            } = this.quill.theme;
            tooltip.edit("link", preview);
          } else {
            this.quill.format("link", false, Quill.sources.USER);
          }
        }
      }
    }
  }
});
Quill.register({
  "attributors/attribute/direction": DirectionAttribute,
  "attributors/class/align": AlignClass,
  "attributors/class/background": BackgroundClass,
  "attributors/class/color": ColorClass,
  "attributors/class/direction": DirectionClass,
  "attributors/class/font": FontClass,
  "attributors/class/size": SizeClass,
  "attributors/style/align": AlignStyle,
  "attributors/style/background": BackgroundStyle,
  "attributors/style/color": ColorStyle,
  "attributors/style/direction": DirectionStyle,
  "attributors/style/font": FontStyle,
  "attributors/style/size": SizeStyle
}, true);
Quill.register({
  "formats/align": AlignClass,
  "formats/direction": DirectionClass,
  "formats/indent": IndentClass,
  "formats/background": BackgroundStyle,
  "formats/color": ColorStyle,
  "formats/font": FontClass,
  "formats/size": SizeClass,
  "formats/blockquote": Blockquote,
  "formats/code-block": CodeBlock,
  "formats/header": Header,
  "formats/list": ListItem,
  "formats/bold": Bold,
  "formats/code": Code,
  "formats/italic": Italic,
  "formats/link": Link,
  "formats/script": Script,
  "formats/strike": Strike,
  "formats/underline": Underline,
  "formats/formula": Formula,
  "formats/image": Image$1,
  "formats/video": Video,
  "modules/syntax": Syntax,
  "modules/table": Table,
  "modules/toolbar": Toolbar,
  "themes/bubble": BubbleTheme,
  "themes/snow": SnowTheme,
  "ui/icons": Icons,
  "ui/picker": Picker,
  "ui/icon-picker": IconPicker,
  "ui/color-picker": ColorPicker,
  "ui/tooltip": Tooltip
}, true);
class ReactQuill extends React2.Component {
  constructor(props) {
    super(props);
    this.editingAreaRef = reactExports.createRef();
    this.dirtyProps = [
      "modules",
      "formats",
      "bounds",
      "theme",
      "children"
    ];
    this.cleanProps = [
      "id",
      "className",
      "style",
      "placeholder",
      "tabIndex",
      "onChange",
      "onChangeSelection",
      "onFocus",
      "onBlur",
      "onKeyPress",
      "onKeyDown",
      "onKeyUp"
    ];
    this.state = {
      generation: 0
    };
    this.selection = null;
    this.onEditorChange = (eventName, rangeOrDelta, oldRangeOrDelta, source) => {
      var _a2, _b;
      if (eventName === "text-change") {
        (_a2 = this.onEditorChangeText) == null ? void 0 : _a2.call(this, this.editor.root.innerHTML, rangeOrDelta, source, this.unprivilegedEditor);
      } else if (eventName === "selection-change") {
        (_b = this.onEditorChangeSelection) == null ? void 0 : _b.call(this, rangeOrDelta, source, this.unprivilegedEditor);
      }
    };
    const value = this.isControlled() ? props.value : props.defaultValue;
    this.value = value ?? "";
  }
  validateProps(props) {
    if (React2.Children.count(props.children) > 1)
      throw new Error("The Quill editing area can only be composed of a single React element.");
    if (React2.Children.count(props.children)) {
      const child = React2.Children.only(props.children);
      if ((child == null ? void 0 : child.type) === "textarea")
        throw new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
    }
    if (this.lastDeltaChangeSet && props.value === this.lastDeltaChangeSet)
      throw new Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas");
  }
  shouldComponentUpdate(nextProps, nextState) {
    this.validateProps(nextProps);
    if (!this.editor || this.state.generation !== nextState.generation) {
      return true;
    }
    if ("value" in nextProps) {
      const prevContents = this.getEditorContents();
      const nextContents = nextProps.value ?? "";
      if (!this.isEqualValue(nextContents, prevContents)) {
        this.setEditorContents(this.editor, nextContents);
      }
    }
    if (nextProps.readOnly !== this.props.readOnly) {
      this.setEditorReadOnly(this.editor, nextProps.readOnly);
    }
    return [...this.cleanProps, ...this.dirtyProps].some((prop) => {
      return !isEqual$2(nextProps[prop], this.props[prop]);
    });
  }
  shouldComponentRegenerate(nextProps) {
    return this.dirtyProps.some((prop) => {
      return !isEqual$2(nextProps[prop], this.props[prop]);
    });
  }
  componentDidMount() {
    this.instantiateEditor();
    this.setEditorContents(this.editor, this.getEditorContents());
  }
  componentWillUnmount() {
    this.destroyEditor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.editor && this.shouldComponentRegenerate(prevProps)) {
      const delta = this.editor.getContents();
      const selection = this.editor.getSelection();
      this.regenerationSnapshot = { delta, selection };
      this.setState({ generation: this.state.generation + 1 });
      this.destroyEditor();
    }
    if (this.state.generation !== prevState.generation) {
      const { delta, selection } = this.regenerationSnapshot;
      delete this.regenerationSnapshot;
      this.instantiateEditor();
      const editor = this.editor;
      editor.setContents(delta);
      postpone(() => this.setEditorSelection(editor, selection));
    }
  }
  instantiateEditor() {
    if (this.editor) {
      this.hookEditor(this.editor);
    } else {
      this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig());
    }
  }
  destroyEditor() {
    var _a2;
    if (!this.editor)
      return;
    this.unhookEditor(this.editor);
    const toolbar = (_a2 = this.props.modules) == null ? void 0 : _a2.toolbar;
    const usingExternalToolbar = typeof toolbar === "object" && toolbar && "container" in toolbar && typeof toolbar.container === "string" || typeof toolbar === "string";
    if (!usingExternalToolbar) {
      const leftOverToolbar = document.querySelector(".ql-toolbar");
      if (leftOverToolbar) {
        leftOverToolbar.remove();
      }
    }
    delete this.editor;
  }
  /*
  We consider the component to be controlled if `value` is being sent in props.
  */
  isControlled() {
    return "value" in this.props;
  }
  getEditorConfig() {
    return {
      bounds: this.props.bounds,
      formats: this.props.formats,
      modules: this.props.modules,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      tabIndex: this.props.tabIndex,
      theme: this.props.theme
    };
  }
  getEditor() {
    if (!this.editor)
      throw new Error("Accessing non-instantiated editor");
    return this.editor;
  }
  /**
  Creates an editor on the given element. The editor will be passed the
  configuration, have its events bound,
  */
  createEditor(element, config2) {
    const editor = new Quill(element, config2);
    if (config2.tabIndex != null) {
      this.setEditorTabIndex(editor, config2.tabIndex);
    }
    this.hookEditor(editor);
    return editor;
  }
  hookEditor(editor) {
    this.unprivilegedEditor = this.makeUnprivilegedEditor(editor);
    editor.on("editor-change", this.onEditorChange);
  }
  unhookEditor(editor) {
    editor.off("editor-change", this.onEditorChange);
  }
  getEditorContents() {
    return this.value;
  }
  getEditorSelection() {
    return this.selection;
  }
  /*
  True if the value is a Delta instance or a Delta look-alike.
  */
  isDelta(value) {
    return value && value.ops;
  }
  /*
  Special comparison function that knows how to compare Deltas.
  */
  isEqualValue(value, nextValue) {
    if (this.isDelta(value) && this.isDelta(nextValue)) {
      return isEqual$2(value.ops, nextValue.ops);
    } else {
      return isEqual$2(value, nextValue);
    }
  }
  /*
  Replace the contents of the editor, but keep the previous selection hanging
  around so that the cursor won't move.
  */
  setEditorContents(editor, value) {
    this.value = value;
    const sel = this.getEditorSelection();
    if (typeof value === "string") {
      editor.setContents(editor.clipboard.convert({ html: value }));
    } else {
      editor.setContents(value);
    }
    postpone(() => this.setEditorSelection(editor, sel));
  }
  setEditorSelection(editor, range) {
    this.selection = range;
    if (range) {
      const length = editor.getLength();
      range.index = Math.max(0, Math.min(range.index, length - 1));
      range.length = Math.max(0, Math.min(range.length, length - 1 - range.index));
      editor.setSelection(range);
    }
  }
  setEditorTabIndex(editor, tabIndex) {
    var _a2;
    if ((_a2 = editor == null ? void 0 : editor.scroll) == null ? void 0 : _a2.domNode) {
      editor.scroll.domNode.tabIndex = tabIndex;
    }
  }
  setEditorReadOnly(editor, value) {
    if (value) {
      editor.disable();
    } else {
      editor.enable();
    }
  }
  /*
  Returns a weaker, unprivileged proxy object that only exposes read-only
  accessors found on the editor instance, without any state-modifying methods.
  */
  makeUnprivilegedEditor(editor) {
    const e = editor;
    return {
      getHTML: () => e.root.innerHTML,
      getSemanticHTML: e.getSemanticHTML.bind(e),
      getLength: e.getLength.bind(e),
      getText: e.getText.bind(e),
      getContents: e.getContents.bind(e),
      getSelection: e.getSelection.bind(e),
      getBounds: e.getBounds.bind(e)
    };
  }
  getEditingArea() {
    const element = this.editingAreaRef.current;
    if (!element) {
      throw new Error("Cannot find element for editing area");
    }
    if (element.nodeType === 3) {
      throw new Error("Editing area cannot be a text node");
    }
    return element;
  }
  /*
  Renders an editor area, unless it has been provided one to clone.
  */
  renderEditingArea() {
    const { children, preserveWhitespace } = this.props;
    const { generation } = this.state;
    const properties = {
      key: generation,
      ref: this.editingAreaRef
    };
    if (React2.Children.count(children)) {
      return React2.cloneElement(React2.Children.only(children), properties);
    }
    return preserveWhitespace ? React2.createElement("pre", { ...properties }) : React2.createElement("div", { ...properties });
  }
  render() {
    return React2.createElement("div", { id: this.props.id, style: this.props.style, key: this.state.generation, className: `quill ${this.props.className ?? ""}`, onKeyPress: this.props.onKeyPress, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp }, this.renderEditingArea());
  }
  onEditorChangeText(value, delta, source, editor) {
    var _a2, _b;
    if (!this.editor)
      return;
    const nextContents = this.isDelta(this.value) ? editor.getContents() : editor.getHTML();
    if (nextContents !== this.getEditorContents()) {
      this.lastDeltaChangeSet = delta;
      this.value = nextContents;
      (_b = (_a2 = this.props).onChange) == null ? void 0 : _b.call(_a2, value, delta, source, editor);
    }
  }
  onEditorChangeSelection(nextSelection, source, editor) {
    var _a2, _b, _c, _d, _e, _f;
    if (!this.editor)
      return;
    const currentSelection = this.getEditorSelection();
    const hasGainedFocus = !currentSelection && nextSelection;
    const hasLostFocus = currentSelection && !nextSelection;
    if (isEqual$2(nextSelection, currentSelection))
      return;
    this.selection = nextSelection;
    (_b = (_a2 = this.props).onChangeSelection) == null ? void 0 : _b.call(_a2, nextSelection, source, editor);
    if (hasGainedFocus) {
      (_d = (_c = this.props).onFocus) == null ? void 0 : _d.call(_c, nextSelection, source, editor);
    } else if (hasLostFocus) {
      (_f = (_e = this.props).onBlur) == null ? void 0 : _f.call(_e, currentSelection, source, editor);
    }
  }
  focus() {
    if (!this.editor)
      return;
    this.editor.focus();
  }
  blur() {
    if (!this.editor)
      return;
    this.selection = null;
    this.editor.blur();
  }
}
ReactQuill.displayName = "React Quill";
ReactQuill.Quill = Quill;
ReactQuill.defaultProps = {
  theme: "snow",
  modules: {},
  readOnly: false
};
function postpone(fn) {
  Promise.resolve().then(fn);
}
var imageResize_min = { exports: {} };
(function(module2, exports$1) {
  !function(t, e) {
    module2.exports = e();
  }(commonjsGlobal, function() {
    return function(t) {
      function e(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = { i: r, l: false, exports: {} };
        return t[r].call(o.exports, o, o.exports, e), o.l = true, o.exports;
      }
      var n = {};
      return e.m = t, e.c = n, e.i = function(t2) {
        return t2;
      }, e.d = function(t2, n2, r) {
        e.o(t2, n2) || Object.defineProperty(t2, n2, { configurable: false, enumerable: true, get: r });
      }, e.n = function(t2) {
        var n2 = t2 && t2.__esModule ? function() {
          return t2.default;
        } : function() {
          return t2;
        };
        return e.d(n2, "a", n2), n2;
      }, e.o = function(t2, e2) {
        return Object.prototype.hasOwnProperty.call(t2, e2);
      }, e.p = "", e(e.s = 41);
    }([function(t, e) {
      function n(t2) {
        var e2 = typeof t2;
        return null != t2 && ("object" == e2 || "function" == e2);
      }
      t.exports = n;
    }, function(t, e, n) {
      var r = n(23), o = "object" == typeof self && self && self.Object === Object && self, i = r || o || Function("return this")();
      t.exports = i;
    }, function(t, e) {
      function n(t2) {
        return null != t2 && "object" == typeof t2;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = -1, n2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < n2; ) {
          var r2 = t2[e2];
          this.set(r2[0], r2[1]);
        }
      }
      var o = n(82), i = n(83), l = n(84), a = n(85), s = n(86);
      r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = l, r.prototype.has = a, r.prototype.set = s, t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        for (var n2 = t2.length; n2--; ) if (o(t2[n2][0], e2)) return n2;
        return -1;
      }
      var o = n(8);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return null == t2 ? void 0 === t2 ? s : a : u && u in Object(t2) ? i(t2) : l(t2);
      }
      var o = n(17), i = n(71), l = n(94), a = "[object Null]", s = "[object Undefined]", u = o ? o.toStringTag : void 0;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = t2.__data__;
        return o(e2) ? n2["string" == typeof e2 ? "string" : "hash"] : n2.map;
      }
      var o = n(80);
      t.exports = r;
    }, function(t, e, n) {
      var r = n(11), o = r(Object, "create");
      t.exports = o;
    }, function(t, e) {
      function n(t2, e2) {
        return t2 === e2 || t2 !== t2 && e2 !== e2;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2) {
        if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
      }
      n.d(e, "a", function() {
        return o;
      });
      var o = function t2(e2) {
        r(this, t2), this.onCreate = function() {
        }, this.onDestroy = function() {
        }, this.onUpdate = function() {
        }, this.overlay = e2.overlay, this.img = e2.img, this.options = e2.options, this.requestUpdate = e2.onUpdate;
      };
    }, function(t, e, n) {
      function r(t2, e2, n2) {
        "__proto__" == e2 && o ? o(t2, e2, { configurable: true, enumerable: true, value: n2, writable: true }) : t2[e2] = n2;
      }
      var o = n(22);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = i(t2, e2);
        return o(n2) ? n2 : void 0;
      }
      var o = n(55), i = n(72);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return null != t2 && i(t2.length) && !o(t2);
      }
      var o = n(13), i = n(32);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        if (!i(t2)) return false;
        var e2 = o(t2);
        return e2 == a || e2 == s || e2 == l || e2 == u;
      }
      var o = n(5), i = n(0), l = "[object AsyncFunction]", a = "[object Function]", s = "[object GeneratorFunction]", u = "[object Proxy]";
      t.exports = r;
    }, function(t, e) {
      t.exports = function(t2) {
        return t2.webpackPolyfill || (t2.deprecate = function() {
        }, t2.paths = [], t2.children || (t2.children = []), Object.defineProperty(t2, "loaded", { enumerable: true, get: function() {
          return t2.l;
        } }), Object.defineProperty(t2, "id", { enumerable: true, get: function() {
          return t2.i;
        } }), t2.webpackPolyfill = 1), t2;
      };
    }, function(t, e, n) {
      (function(e2) {
        /*!
        * Quill Editor v1.3.6
        * https://quilljs.com/
        * Copyright (c) 2014, Jason Chen
        * Copyright (c) 2013, salesforce.com
        */
        !function(e3, n2) {
          t.exports = n2();
        }("undefined" != typeof self && self, function() {
          return function(t2) {
            function e3(r) {
              if (n2[r]) return n2[r].exports;
              var o = n2[r] = { i: r, l: false, exports: {} };
              return t2[r].call(o.exports, o, o.exports, e3), o.l = true, o.exports;
            }
            var n2 = {};
            return e3.m = t2, e3.c = n2, e3.d = function(t3, n3, r) {
              e3.o(t3, n3) || Object.defineProperty(t3, n3, { configurable: false, enumerable: true, get: r });
            }, e3.n = function(t3) {
              var n3 = t3 && t3.__esModule ? function() {
                return t3.default;
              } : function() {
                return t3;
              };
              return e3.d(n3, "a", n3), n3;
            }, e3.o = function(t3, e4) {
              return Object.prototype.hasOwnProperty.call(t3, e4);
            }, e3.p = "", e3(e3.s = 109);
          }([function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true });
            var r = n2(17), o = n2(18), i = n2(19), l = n2(45), a = n2(46), s = n2(47), u = n2(48), c = n2(49), f = n2(12), h = n2(32), p = n2(33), d = n2(31), y = n2(1), v = { Scope: y.Scope, create: y.create, find: y.find, query: y.query, register: y.register, Container: r.default, Format: o.default, Leaf: i.default, Embed: u.default, Scroll: l.default, Block: s.default, Inline: a.default, Text: c.default, Attributor: { Attribute: f.default, Class: h.default, Style: p.default, Store: d.default } };
            e3.default = v;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              var n3 = i(t3);
              if (null == n3) throw new s("Unable to create " + t3 + " blot");
              var r2 = n3;
              return new r2(t3 instanceof Node || t3.nodeType === Node.TEXT_NODE ? t3 : r2.create(e4), e4);
            }
            function o(t3, n3) {
              return void 0 === n3 && (n3 = false), null == t3 ? null : null != t3[e3.DATA_KEY] ? t3[e3.DATA_KEY].blot : n3 ? o(t3.parentNode, n3) : null;
            }
            function i(t3, e4) {
              void 0 === e4 && (e4 = p.ANY);
              var n3;
              if ("string" == typeof t3) n3 = h[t3] || u[t3];
              else if (t3 instanceof Text || t3.nodeType === Node.TEXT_NODE) n3 = h.text;
              else if ("number" == typeof t3) t3 & p.LEVEL & p.BLOCK ? n3 = h.block : t3 & p.LEVEL & p.INLINE && (n3 = h.inline);
              else if (t3 instanceof HTMLElement) {
                var r2 = (t3.getAttribute("class") || "").split(/\s+/);
                for (var o2 in r2) if (n3 = c[r2[o2]]) break;
                n3 = n3 || f[t3.tagName];
              }
              return null == n3 ? null : e4 & p.LEVEL & n3.scope && e4 & p.TYPE & n3.scope ? n3 : null;
            }
            function l() {
              for (var t3 = [], e4 = 0; e4 < arguments.length; e4++) t3[e4] = arguments[e4];
              if (t3.length > 1) return t3.map(function(t4) {
                return l(t4);
              });
              var n3 = t3[0];
              if ("string" != typeof n3.blotName && "string" != typeof n3.attrName) throw new s("Invalid definition");
              if ("abstract" === n3.blotName) throw new s("Cannot register abstract class");
              if (h[n3.blotName || n3.attrName] = n3, "string" == typeof n3.keyName) u[n3.keyName] = n3;
              else if (null != n3.className && (c[n3.className] = n3), null != n3.tagName) {
                Array.isArray(n3.tagName) ? n3.tagName = n3.tagName.map(function(t4) {
                  return t4.toUpperCase();
                }) : n3.tagName = n3.tagName.toUpperCase();
                var r2 = Array.isArray(n3.tagName) ? n3.tagName : [n3.tagName];
                r2.forEach(function(t4) {
                  null != f[t4] && null != n3.className || (f[t4] = n3);
                });
              }
              return n3;
            }
            var a = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var s = function(t3) {
              function e4(e5) {
                var n3 = this;
                return e5 = "[Parchment] " + e5, n3 = t3.call(this, e5) || this, n3.message = e5, n3.name = n3.constructor.name, n3;
              }
              return a(e4, t3), e4;
            }(Error);
            e3.ParchmentError = s;
            var u = {}, c = {}, f = {}, h = {};
            e3.DATA_KEY = "__blot";
            var p;
            !function(t3) {
              t3[t3.TYPE = 3] = "TYPE", t3[t3.LEVEL = 12] = "LEVEL", t3[t3.ATTRIBUTE = 13] = "ATTRIBUTE", t3[t3.BLOT = 14] = "BLOT", t3[t3.INLINE = 7] = "INLINE", t3[t3.BLOCK = 11] = "BLOCK", t3[t3.BLOCK_BLOT = 10] = "BLOCK_BLOT", t3[t3.INLINE_BLOT = 6] = "INLINE_BLOT", t3[t3.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", t3[t3.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", t3[t3.ANY = 15] = "ANY";
            }(p = e3.Scope || (e3.Scope = {})), e3.create = r, e3.find = o, e3.query = i, e3.register = l;
          }, function(t2, e3, n2) {
            var r = n2(51), o = n2(11), i = n2(3), l = n2(20), a = String.fromCharCode(0), s = function(t3) {
              Array.isArray(t3) ? this.ops = t3 : null != t3 && Array.isArray(t3.ops) ? this.ops = t3.ops : this.ops = [];
            };
            s.prototype.insert = function(t3, e4) {
              var n3 = {};
              return 0 === t3.length ? this : (n3.insert = t3, null != e4 && "object" == typeof e4 && Object.keys(e4).length > 0 && (n3.attributes = e4), this.push(n3));
            }, s.prototype.delete = function(t3) {
              return t3 <= 0 ? this : this.push({ delete: t3 });
            }, s.prototype.retain = function(t3, e4) {
              if (t3 <= 0) return this;
              var n3 = { retain: t3 };
              return null != e4 && "object" == typeof e4 && Object.keys(e4).length > 0 && (n3.attributes = e4), this.push(n3);
            }, s.prototype.push = function(t3) {
              var e4 = this.ops.length, n3 = this.ops[e4 - 1];
              if (t3 = i(true, {}, t3), "object" == typeof n3) {
                if ("number" == typeof t3.delete && "number" == typeof n3.delete) return this.ops[e4 - 1] = { delete: n3.delete + t3.delete }, this;
                if ("number" == typeof n3.delete && null != t3.insert && (e4 -= 1, "object" != typeof (n3 = this.ops[e4 - 1]))) return this.ops.unshift(t3), this;
                if (o(t3.attributes, n3.attributes)) {
                  if ("string" == typeof t3.insert && "string" == typeof n3.insert) return this.ops[e4 - 1] = { insert: n3.insert + t3.insert }, "object" == typeof t3.attributes && (this.ops[e4 - 1].attributes = t3.attributes), this;
                  if ("number" == typeof t3.retain && "number" == typeof n3.retain) return this.ops[e4 - 1] = { retain: n3.retain + t3.retain }, "object" == typeof t3.attributes && (this.ops[e4 - 1].attributes = t3.attributes), this;
                }
              }
              return e4 === this.ops.length ? this.ops.push(t3) : this.ops.splice(e4, 0, t3), this;
            }, s.prototype.chop = function() {
              var t3 = this.ops[this.ops.length - 1];
              return t3 && t3.retain && !t3.attributes && this.ops.pop(), this;
            }, s.prototype.filter = function(t3) {
              return this.ops.filter(t3);
            }, s.prototype.forEach = function(t3) {
              this.ops.forEach(t3);
            }, s.prototype.map = function(t3) {
              return this.ops.map(t3);
            }, s.prototype.partition = function(t3) {
              var e4 = [], n3 = [];
              return this.forEach(function(r2) {
                (t3(r2) ? e4 : n3).push(r2);
              }), [e4, n3];
            }, s.prototype.reduce = function(t3, e4) {
              return this.ops.reduce(t3, e4);
            }, s.prototype.changeLength = function() {
              return this.reduce(function(t3, e4) {
                return e4.insert ? t3 + l.length(e4) : e4.delete ? t3 - e4.delete : t3;
              }, 0);
            }, s.prototype.length = function() {
              return this.reduce(function(t3, e4) {
                return t3 + l.length(e4);
              }, 0);
            }, s.prototype.slice = function(t3, e4) {
              t3 = t3 || 0, "number" != typeof e4 && (e4 = 1 / 0);
              for (var n3 = [], r2 = l.iterator(this.ops), o2 = 0; o2 < e4 && r2.hasNext(); ) {
                var i2;
                o2 < t3 ? i2 = r2.next(t3 - o2) : (i2 = r2.next(e4 - o2), n3.push(i2)), o2 += l.length(i2);
              }
              return new s(n3);
            }, s.prototype.compose = function(t3) {
              for (var e4 = l.iterator(this.ops), n3 = l.iterator(t3.ops), r2 = new s(); e4.hasNext() || n3.hasNext(); ) if ("insert" === n3.peekType()) r2.push(n3.next());
              else if ("delete" === e4.peekType()) r2.push(e4.next());
              else {
                var o2 = Math.min(e4.peekLength(), n3.peekLength()), i2 = e4.next(o2), a2 = n3.next(o2);
                if ("number" == typeof a2.retain) {
                  var u = {};
                  "number" == typeof i2.retain ? u.retain = o2 : u.insert = i2.insert;
                  var c = l.attributes.compose(i2.attributes, a2.attributes, "number" == typeof i2.retain);
                  c && (u.attributes = c), r2.push(u);
                } else "number" == typeof a2.delete && "number" == typeof i2.retain && r2.push(a2);
              }
              return r2.chop();
            }, s.prototype.concat = function(t3) {
              var e4 = new s(this.ops.slice());
              return t3.ops.length > 0 && (e4.push(t3.ops[0]), e4.ops = e4.ops.concat(t3.ops.slice(1))), e4;
            }, s.prototype.diff = function(t3, e4) {
              if (this.ops === t3.ops) return new s();
              var n3 = [this, t3].map(function(e5) {
                return e5.map(function(n4) {
                  if (null != n4.insert) return "string" == typeof n4.insert ? n4.insert : a;
                  var r2 = e5 === t3 ? "on" : "with";
                  throw new Error("diff() called " + r2 + " non-document");
                }).join("");
              }), i2 = new s(), u = r(n3[0], n3[1], e4), c = l.iterator(this.ops), f = l.iterator(t3.ops);
              return u.forEach(function(t4) {
                for (var e5 = t4[1].length; e5 > 0; ) {
                  var n4 = 0;
                  switch (t4[0]) {
                    case r.INSERT:
                      n4 = Math.min(f.peekLength(), e5), i2.push(f.next(n4));
                      break;
                    case r.DELETE:
                      n4 = Math.min(e5, c.peekLength()), c.next(n4), i2.delete(n4);
                      break;
                    case r.EQUAL:
                      n4 = Math.min(c.peekLength(), f.peekLength(), e5);
                      var a2 = c.next(n4), s2 = f.next(n4);
                      o(a2.insert, s2.insert) ? i2.retain(n4, l.attributes.diff(a2.attributes, s2.attributes)) : i2.push(s2).delete(n4);
                  }
                  e5 -= n4;
                }
              }), i2.chop();
            }, s.prototype.eachLine = function(t3, e4) {
              e4 = e4 || "\n";
              for (var n3 = l.iterator(this.ops), r2 = new s(), o2 = 0; n3.hasNext(); ) {
                if ("insert" !== n3.peekType()) return;
                var i2 = n3.peek(), a2 = l.length(i2) - n3.peekLength(), u = "string" == typeof i2.insert ? i2.insert.indexOf(e4, a2) - a2 : -1;
                if (u < 0) r2.push(n3.next());
                else if (u > 0) r2.push(n3.next(u));
                else {
                  if (false === t3(r2, n3.next(1).attributes || {}, o2)) return;
                  o2 += 1, r2 = new s();
                }
              }
              r2.length() > 0 && t3(r2, {}, o2);
            }, s.prototype.transform = function(t3, e4) {
              if (e4 = !!e4, "number" == typeof t3) return this.transformPosition(t3, e4);
              for (var n3 = l.iterator(this.ops), r2 = l.iterator(t3.ops), o2 = new s(); n3.hasNext() || r2.hasNext(); ) if ("insert" !== n3.peekType() || !e4 && "insert" === r2.peekType()) if ("insert" === r2.peekType()) o2.push(r2.next());
              else {
                var i2 = Math.min(n3.peekLength(), r2.peekLength()), a2 = n3.next(i2), u = r2.next(i2);
                if (a2.delete) continue;
                u.delete ? o2.push(u) : o2.retain(i2, l.attributes.transform(a2.attributes, u.attributes, e4));
              }
              else o2.retain(l.length(n3.next()));
              return o2.chop();
            }, s.prototype.transformPosition = function(t3, e4) {
              e4 = !!e4;
              for (var n3 = l.iterator(this.ops), r2 = 0; n3.hasNext() && r2 <= t3; ) {
                var o2 = n3.peekLength(), i2 = n3.peekType();
                n3.next(), "delete" !== i2 ? ("insert" === i2 && (r2 < t3 || !e4) && (t3 += o2), r2 += o2) : t3 -= Math.min(o2, t3 - r2);
              }
              return t3;
            }, t2.exports = s;
          }, function(t2, e3) {
            var n2 = Object.prototype.hasOwnProperty, r = Object.prototype.toString, o = function(t3) {
              return "function" == typeof Array.isArray ? Array.isArray(t3) : "[object Array]" === r.call(t3);
            }, i = function(t3) {
              if (!t3 || "[object Object]" !== r.call(t3)) return false;
              var e4 = n2.call(t3, "constructor"), o2 = t3.constructor && t3.constructor.prototype && n2.call(t3.constructor.prototype, "isPrototypeOf");
              if (t3.constructor && !e4 && !o2) return false;
              var i2;
              for (i2 in t3) ;
              return void 0 === i2 || n2.call(t3, i2);
            };
            t2.exports = function t3() {
              var e4, n3, r2, l, a, s, u = arguments[0], c = 1, f = arguments.length, h = false;
              for ("boolean" == typeof u && (h = u, u = arguments[1] || {}, c = 2), (null == u || "object" != typeof u && "function" != typeof u) && (u = {}); c < f; ++c) if (null != (e4 = arguments[c])) for (n3 in e4) r2 = u[n3], l = e4[n3], u !== l && (h && l && (i(l) || (a = o(l))) ? (a ? (a = false, s = r2 && o(r2) ? r2 : []) : s = r2 && i(r2) ? r2 : {}, u[n3] = t3(h, s, l)) : void 0 !== l && (u[n3] = l));
              return u;
            };
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function a(t3) {
              var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              return null == t3 ? e4 : ("function" == typeof t3.formats && (e4 = (0, f.default)(e4, t3.formats())), null == t3.parent || "scroll" == t3.parent.blotName || t3.parent.statics.scope !== t3.statics.scope ? e4 : a(t3.parent, e4));
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.BlockEmbed = e3.bubbleFormats = void 0;
            var s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), u = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, c = n2(3), f = r(c), h = n2(2), p = r(h), d = n2(0), y = r(d), v = n2(16), b = r(v), g = n2(6), m = r(g), _ = n2(7), O = r(_), w = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), s(e4, [{ key: "attach", value: function() {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "attach", this).call(this), this.attributes = new y.default.Attributor.Store(this.domNode);
              } }, { key: "delta", value: function() {
                return new p.default().insert(this.value(), (0, f.default)(this.formats(), this.attributes.values()));
              } }, { key: "format", value: function(t4, e5) {
                var n3 = y.default.query(t4, y.default.Scope.BLOCK_ATTRIBUTE);
                null != n3 && this.attributes.attribute(n3, e5);
              } }, { key: "formatAt", value: function(t4, e5, n3, r2) {
                this.format(n3, r2);
              } }, { key: "insertAt", value: function(t4, n3, r2) {
                if ("string" == typeof n3 && n3.endsWith("\n")) {
                  var o2 = y.default.create(x.blotName);
                  this.parent.insertBefore(o2, 0 === t4 ? this : this.next), o2.insertAt(0, n3.slice(0, -1));
                } else u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertAt", this).call(this, t4, n3, r2);
              } }]), e4;
            }(y.default.Embed);
            w.scope = y.default.Scope.BLOCK_BLOT;
            var x = function(t3) {
              function e4(t4) {
                o(this, e4);
                var n3 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return n3.cache = {}, n3;
              }
              return l(e4, t3), s(e4, [{ key: "delta", value: function() {
                return null == this.cache.delta && (this.cache.delta = this.descendants(y.default.Leaf).reduce(function(t4, e5) {
                  return 0 === e5.length() ? t4 : t4.insert(e5.value(), a(e5));
                }, new p.default()).insert("\n", a(this))), this.cache.delta;
              } }, { key: "deleteAt", value: function(t4, n3) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "deleteAt", this).call(this, t4, n3), this.cache = {};
              } }, { key: "formatAt", value: function(t4, n3, r2, o2) {
                n3 <= 0 || (y.default.query(r2, y.default.Scope.BLOCK) ? t4 + n3 === this.length() && this.format(r2, o2) : u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "formatAt", this).call(this, t4, Math.min(n3, this.length() - t4 - 1), r2, o2), this.cache = {});
              } }, { key: "insertAt", value: function(t4, n3, r2) {
                if (null != r2) return u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertAt", this).call(this, t4, n3, r2);
                if (0 !== n3.length) {
                  var o2 = n3.split("\n"), i2 = o2.shift();
                  i2.length > 0 && (t4 < this.length() - 1 || null == this.children.tail ? u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertAt", this).call(this, Math.min(t4, this.length() - 1), i2) : this.children.tail.insertAt(this.children.tail.length(), i2), this.cache = {});
                  var l2 = this;
                  o2.reduce(function(t5, e5) {
                    return l2 = l2.split(t5, true), l2.insertAt(0, e5), e5.length;
                  }, t4 + i2.length);
                }
              } }, { key: "insertBefore", value: function(t4, n3) {
                var r2 = this.children.head;
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertBefore", this).call(this, t4, n3), r2 instanceof b.default && r2.remove(), this.cache = {};
              } }, { key: "length", value: function() {
                return null == this.cache.length && (this.cache.length = u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "length", this).call(this) + 1), this.cache.length;
              } }, { key: "moveChildren", value: function(t4, n3) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "moveChildren", this).call(this, t4, n3), this.cache = {};
              } }, { key: "optimize", value: function(t4) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4), this.cache = {};
              } }, { key: "path", value: function(t4) {
                return u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "path", this).call(this, t4, true);
              } }, { key: "removeChild", value: function(t4) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "removeChild", this).call(this, t4), this.cache = {};
              } }, { key: "split", value: function(t4) {
                var n3 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                if (n3 && (0 === t4 || t4 >= this.length() - 1)) {
                  var r2 = this.clone();
                  return 0 === t4 ? (this.parent.insertBefore(r2, this), this) : (this.parent.insertBefore(r2, this.next), r2);
                }
                var o2 = u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "split", this).call(this, t4, n3);
                return this.cache = {}, o2;
              } }]), e4;
            }(y.default.Block);
            x.blotName = "block", x.tagName = "P", x.defaultChild = "break", x.allowedChildren = [m.default, y.default.Embed, O.default], e3.bubbleFormats = a, e3.BlockEmbed = w, e3.default = x;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              if (e4 = (0, A.default)(true, { container: t3, modules: { clipboard: true, keyboard: true, history: true } }, e4), e4.theme && e4.theme !== q.DEFAULTS.theme) {
                if (e4.theme = q.import("themes/" + e4.theme), null == e4.theme) throw new Error("Invalid theme " + e4.theme + ". Did you register it?");
              } else e4.theme = S.default;
              var n3 = (0, A.default)(true, {}, e4.theme.DEFAULTS);
              [n3, e4].forEach(function(t4) {
                t4.modules = t4.modules || {}, Object.keys(t4.modules).forEach(function(e5) {
                  true === t4.modules[e5] && (t4.modules[e5] = {});
                });
              });
              var r2 = Object.keys(n3.modules).concat(Object.keys(e4.modules)), o2 = r2.reduce(function(t4, e5) {
                var n4 = q.import("modules/" + e5);
                return null == n4 ? P.error("Cannot load " + e5 + " module. Are you sure you registered it?") : t4[e5] = n4.DEFAULTS || {}, t4;
              }, {});
              return null != e4.modules && e4.modules.toolbar && e4.modules.toolbar.constructor !== Object && (e4.modules.toolbar = { container: e4.modules.toolbar }), e4 = (0, A.default)(true, {}, q.DEFAULTS, { modules: o2 }, n3, e4), ["bounds", "container", "scrollingContainer"].forEach(function(t4) {
                "string" == typeof e4[t4] && (e4[t4] = document.querySelector(e4[t4]));
              }), e4.modules = Object.keys(e4.modules).reduce(function(t4, n4) {
                return e4.modules[n4] && (t4[n4] = e4.modules[n4]), t4;
              }, {}), e4;
            }
            function a(t3, e4, n3, r2) {
              if (this.options.strict && !this.isEnabled() && e4 === g.default.sources.USER) return new d.default();
              var o2 = null == n3 ? null : this.getSelection(), i2 = this.editor.delta, l2 = t3();
              if (null != o2 && (true === n3 && (n3 = o2.index), null == r2 ? o2 = u(o2, l2, e4) : 0 !== r2 && (o2 = u(o2, n3, r2, e4)), this.setSelection(o2, g.default.sources.SILENT)), l2.length() > 0) {
                var a2, s2 = [g.default.events.TEXT_CHANGE, l2, i2, e4];
                if ((a2 = this.emitter).emit.apply(a2, [g.default.events.EDITOR_CHANGE].concat(s2)), e4 !== g.default.sources.SILENT) {
                  var c2;
                  (c2 = this.emitter).emit.apply(c2, s2);
                }
              }
              return l2;
            }
            function s(t3, e4, n3, r2, o2) {
              var i2 = {};
              return "number" == typeof t3.index && "number" == typeof t3.length ? "number" != typeof e4 ? (o2 = r2, r2 = n3, n3 = e4, e4 = t3.length, t3 = t3.index) : (e4 = t3.length, t3 = t3.index) : "number" != typeof e4 && (o2 = r2, r2 = n3, n3 = e4, e4 = 0), "object" === (void 0 === n3 ? "undefined" : c(n3)) ? (i2 = n3, o2 = r2) : "string" == typeof n3 && (null != r2 ? i2[n3] = r2 : o2 = n3), o2 = o2 || g.default.sources.API, [t3, e4, i2, o2];
            }
            function u(t3, e4, n3, r2) {
              if (null == t3) return null;
              var o2 = void 0, i2 = void 0;
              if (e4 instanceof d.default) {
                var l2 = [t3.index, t3.index + t3.length].map(function(t4) {
                  return e4.transformPosition(t4, r2 !== g.default.sources.USER);
                }), a2 = f(l2, 2);
                o2 = a2[0], i2 = a2[1];
              } else {
                var s2 = [t3.index, t3.index + t3.length].map(function(t4) {
                  return t4 < e4 || t4 === e4 && r2 === g.default.sources.USER ? t4 : n3 >= 0 ? t4 + n3 : Math.max(e4, t4 + n3);
                }), u2 = f(s2, 2);
                o2 = u2[0], i2 = u2[1];
              }
              return new x.Range(o2, i2 - o2);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.overload = e3.expandConfig = void 0;
            var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, f = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), h = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }();
            n2(50);
            var p = n2(2), d = r(p), y = n2(14), v = r(y), b = n2(8), g = r(b), m = n2(9), _ = r(m), O = n2(0), w = r(O), x = n2(15), E = r(x), k = n2(3), A = r(k), j = n2(10), N = r(j), T = n2(34), S = r(T), P = (0, N.default)("quill"), q = function() {
              function t3(e4) {
                var n3 = this, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (i(this, t3), this.options = l(e4, r2), this.container = this.options.container, null == this.container) return P.error("Invalid Quill container", e4);
                this.options.debug && t3.debug(this.options.debug);
                var o2 = this.container.innerHTML.trim();
                this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", false), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new g.default(), this.scroll = w.default.create(this.root, { emitter: this.emitter, whitelist: this.options.formats }), this.editor = new v.default(this.scroll), this.selection = new E.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(g.default.events.EDITOR_CHANGE, function(t4) {
                  t4 === g.default.events.TEXT_CHANGE && n3.root.classList.toggle("ql-blank", n3.editor.isBlank());
                }), this.emitter.on(g.default.events.SCROLL_UPDATE, function(t4, e5) {
                  var r3 = n3.selection.lastRange, o3 = r3 && 0 === r3.length ? r3.index : void 0;
                  a.call(n3, function() {
                    return n3.editor.update(null, e5, o3);
                  }, t4);
                });
                var s2 = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + o2 + "<p><br></p></div>");
                this.setContents(s2), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
              }
              return h(t3, null, [{ key: "debug", value: function(t4) {
                true === t4 && (t4 = "log"), N.default.level(t4);
              } }, { key: "find", value: function(t4) {
                return t4.__quill || w.default.find(t4);
              } }, { key: "import", value: function(t4) {
                return null == this.imports[t4] && P.error("Cannot import " + t4 + ". Are you sure it was registered?"), this.imports[t4];
              } }, { key: "register", value: function(t4, e4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                if ("string" != typeof t4) {
                  var o2 = t4.attrName || t4.blotName;
                  "string" == typeof o2 ? this.register("formats/" + o2, t4, e4) : Object.keys(t4).forEach(function(r3) {
                    n3.register(r3, t4[r3], e4);
                  });
                } else null == this.imports[t4] || r2 || P.warn("Overwriting " + t4 + " with", e4), this.imports[t4] = e4, (t4.startsWith("blots/") || t4.startsWith("formats/")) && "abstract" !== e4.blotName ? w.default.register(e4) : t4.startsWith("modules") && "function" == typeof e4.register && e4.register();
              } }]), h(t3, [{ key: "addContainer", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                if ("string" == typeof t4) {
                  var n3 = t4;
                  t4 = document.createElement("div"), t4.classList.add(n3);
                }
                return this.container.insertBefore(t4, e4), t4;
              } }, { key: "blur", value: function() {
                this.selection.setRange(null);
              } }, { key: "deleteText", value: function(t4, e4, n3) {
                var r2 = this, o2 = s(t4, e4, n3), i2 = f(o2, 4);
                return t4 = i2[0], e4 = i2[1], n3 = i2[3], a.call(this, function() {
                  return r2.editor.deleteText(t4, e4);
                }, n3, t4, -1 * e4);
              } }, { key: "disable", value: function() {
                this.enable(false);
              } }, { key: "enable", value: function() {
                var t4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.scroll.enable(t4), this.container.classList.toggle("ql-disabled", !t4);
              } }, { key: "focus", value: function() {
                var t4 = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = t4, this.scrollIntoView();
              } }, { key: "format", value: function(t4, e4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : g.default.sources.API;
                return a.call(this, function() {
                  var r3 = n3.getSelection(true), i2 = new d.default();
                  if (null == r3) return i2;
                  if (w.default.query(t4, w.default.Scope.BLOCK)) i2 = n3.editor.formatLine(r3.index, r3.length, o({}, t4, e4));
                  else {
                    if (0 === r3.length) return n3.selection.format(t4, e4), i2;
                    i2 = n3.editor.formatText(r3.index, r3.length, o({}, t4, e4));
                  }
                  return n3.setSelection(r3, g.default.sources.SILENT), i2;
                }, r2);
              } }, { key: "formatLine", value: function(t4, e4, n3, r2, o2) {
                var i2 = this, l2 = void 0, u2 = s(t4, e4, n3, r2, o2), c2 = f(u2, 4);
                return t4 = c2[0], e4 = c2[1], l2 = c2[2], o2 = c2[3], a.call(this, function() {
                  return i2.editor.formatLine(t4, e4, l2);
                }, o2, t4, 0);
              } }, { key: "formatText", value: function(t4, e4, n3, r2, o2) {
                var i2 = this, l2 = void 0, u2 = s(t4, e4, n3, r2, o2), c2 = f(u2, 4);
                return t4 = c2[0], e4 = c2[1], l2 = c2[2], o2 = c2[3], a.call(this, function() {
                  return i2.editor.formatText(t4, e4, l2);
                }, o2, t4, 0);
              } }, { key: "getBounds", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n3 = void 0;
                n3 = "number" == typeof t4 ? this.selection.getBounds(t4, e4) : this.selection.getBounds(t4.index, t4.length);
                var r2 = this.container.getBoundingClientRect();
                return { bottom: n3.bottom - r2.top, height: n3.height, left: n3.left - r2.left, right: n3.right - r2.left, top: n3.top - r2.top, width: n3.width };
              } }, { key: "getContents", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - t4, n3 = s(t4, e4), r2 = f(n3, 2);
                return t4 = r2[0], e4 = r2[1], this.editor.getContents(t4, e4);
              } }, { key: "getFormat", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getSelection(true), e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
                return "number" == typeof t4 ? this.editor.getFormat(t4, e4) : this.editor.getFormat(t4.index, t4.length);
              } }, { key: "getIndex", value: function(t4) {
                return t4.offset(this.scroll);
              } }, { key: "getLength", value: function() {
                return this.scroll.length();
              } }, { key: "getLeaf", value: function(t4) {
                return this.scroll.leaf(t4);
              } }, { key: "getLine", value: function(t4) {
                return this.scroll.line(t4);
              } }, { key: "getLines", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                return "number" != typeof t4 ? this.scroll.lines(t4.index, t4.length) : this.scroll.lines(t4, e4);
              } }, { key: "getModule", value: function(t4) {
                return this.theme.modules[t4];
              } }, { key: "getSelection", value: function() {
                return arguments.length > 0 && void 0 !== arguments[0] && arguments[0] && this.focus(), this.update(), this.selection.getRange()[0];
              } }, { key: "getText", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.getLength() - t4, n3 = s(t4, e4), r2 = f(n3, 2);
                return t4 = r2[0], e4 = r2[1], this.editor.getText(t4, e4);
              } }, { key: "hasFocus", value: function() {
                return this.selection.hasFocus();
              } }, { key: "insertEmbed", value: function(e4, n3, r2) {
                var o2 = this, i2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : t3.sources.API;
                return a.call(this, function() {
                  return o2.editor.insertEmbed(e4, n3, r2);
                }, i2, e4);
              } }, { key: "insertText", value: function(t4, e4, n3, r2, o2) {
                var i2 = this, l2 = void 0, u2 = s(t4, 0, n3, r2, o2), c2 = f(u2, 4);
                return t4 = c2[0], l2 = c2[2], o2 = c2[3], a.call(this, function() {
                  return i2.editor.insertText(t4, e4, l2);
                }, o2, t4, e4.length);
              } }, { key: "isEnabled", value: function() {
                return !this.container.classList.contains("ql-disabled");
              } }, { key: "off", value: function() {
                return this.emitter.off.apply(this.emitter, arguments);
              } }, { key: "on", value: function() {
                return this.emitter.on.apply(this.emitter, arguments);
              } }, { key: "once", value: function() {
                return this.emitter.once.apply(this.emitter, arguments);
              } }, { key: "pasteHTML", value: function(t4, e4, n3) {
                this.clipboard.dangerouslyPasteHTML(t4, e4, n3);
              } }, { key: "removeFormat", value: function(t4, e4, n3) {
                var r2 = this, o2 = s(t4, e4, n3), i2 = f(o2, 4);
                return t4 = i2[0], e4 = i2[1], n3 = i2[3], a.call(this, function() {
                  return r2.editor.removeFormat(t4, e4);
                }, n3, t4);
              } }, { key: "scrollIntoView", value: function() {
                this.selection.scrollIntoView(this.scrollingContainer);
              } }, { key: "setContents", value: function(t4) {
                var e4 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : g.default.sources.API;
                return a.call(this, function() {
                  t4 = new d.default(t4);
                  var n4 = e4.getLength(), r2 = e4.editor.deleteText(0, n4), o2 = e4.editor.applyDelta(t4), i2 = o2.ops[o2.ops.length - 1];
                  return null != i2 && "string" == typeof i2.insert && "\n" === i2.insert[i2.insert.length - 1] && (e4.editor.deleteText(e4.getLength() - 1, 1), o2.delete(1)), r2.compose(o2);
                }, n3);
              } }, { key: "setSelection", value: function(e4, n3, r2) {
                if (null == e4) this.selection.setRange(null, n3 || t3.sources.API);
                else {
                  var o2 = s(e4, n3, r2), i2 = f(o2, 4);
                  e4 = i2[0], n3 = i2[1], r2 = i2[3], this.selection.setRange(new x.Range(e4, n3), r2), r2 !== g.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
              } }, { key: "setText", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : g.default.sources.API, n3 = new d.default().insert(t4);
                return this.setContents(n3, e4);
              } }, { key: "update", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : g.default.sources.USER, e4 = this.scroll.update(t4);
                return this.selection.update(t4), e4;
              } }, { key: "updateContents", value: function(t4) {
                var e4 = this, n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : g.default.sources.API;
                return a.call(this, function() {
                  return t4 = new d.default(t4), e4.editor.applyDelta(t4, n3);
                }, n3, true);
              } }]), t3;
            }();
            q.DEFAULTS = { bounds: null, formats: null, modules: {}, placeholder: "", readOnly: false, scrollingContainer: null, strict: true, theme: "default" }, q.events = g.default.events, q.sources = g.default.sources, q.version = "1.3.6", q.imports = { delta: d.default, parchment: w.default, "core/module": _.default, "core/theme": S.default }, e3.expandConfig = l, e3.overload = s, e3.default = q;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(7), c = r(u), f = n2(0), h = r(f), p = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), a(e4, [{ key: "formatAt", value: function(t4, n3, r2, o2) {
                if (e4.compare(this.statics.blotName, r2) < 0 && h.default.query(r2, h.default.Scope.BLOT)) {
                  var i2 = this.isolate(t4, n3);
                  o2 && i2.wrap(r2, o2);
                } else s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "formatAt", this).call(this, t4, n3, r2, o2);
              } }, { key: "optimize", value: function(t4) {
                if (s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4), this.parent instanceof e4 && e4.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                  var n3 = this.parent.isolate(this.offset(), this.length());
                  this.moveChildren(n3), n3.wrap(this);
                }
              } }], [{ key: "compare", value: function(t4, n3) {
                var r2 = e4.order.indexOf(t4), o2 = e4.order.indexOf(n3);
                return r2 >= 0 || o2 >= 0 ? r2 - o2 : t4 === n3 ? 0 : t4 < n3 ? -1 : 1;
              } }]), e4;
            }(h.default.Inline);
            p.allowedChildren = [p, h.default.Embed, c.default], p.order = ["cursor", "inline", "underline", "strike", "italic", "bold", "script", "link", "code"], e3.default = p;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = n2(0), a = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(l), s = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), e4;
            }(a.default.Text);
            e3.default = s;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(54), c = r(u), f = n2(10), h = r(f), p = (0, h.default)("quill:events");
            ["selectionchange", "mousedown", "mouseup", "click"].forEach(function(t3) {
              document.addEventListener(t3, function() {
                for (var t4 = arguments.length, e4 = Array(t4), n3 = 0; n3 < t4; n3++) e4[n3] = arguments[n3];
                [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(t5) {
                  if (t5.__quill && t5.__quill.emitter) {
                    var n4;
                    (n4 = t5.__quill.emitter).handleDOM.apply(n4, e4);
                  }
                });
              });
            });
            var d = function(t3) {
              function e4() {
                o(this, e4);
                var t4 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this));
                return t4.listeners = {}, t4.on("error", p.error), t4;
              }
              return l(e4, t3), a(e4, [{ key: "emit", value: function() {
                p.log.apply(p, arguments), s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "emit", this).apply(this, arguments);
              } }, { key: "handleDOM", value: function(t4) {
                for (var e5 = arguments.length, n3 = Array(e5 > 1 ? e5 - 1 : 0), r2 = 1; r2 < e5; r2++) n3[r2 - 1] = arguments[r2];
                (this.listeners[t4.type] || []).forEach(function(e6) {
                  var r3 = e6.node, o2 = e6.handler;
                  (t4.target === r3 || r3.contains(t4.target)) && o2.apply(void 0, [t4].concat(n3));
                });
              } }, { key: "listenDOM", value: function(t4, e5, n3) {
                this.listeners[t4] || (this.listeners[t4] = []), this.listeners[t4].push({ node: e5, handler: n3 });
              } }]), e4;
            }(c.default);
            d.events = { EDITOR_CHANGE: "editor-change", SCROLL_BEFORE_UPDATE: "scroll-before-update", SCROLL_OPTIMIZE: "scroll-optimize", SCROLL_UPDATE: "scroll-update", SELECTION_CHANGE: "selection-change", TEXT_CHANGE: "text-change" }, d.sources = { API: "api", SILENT: "silent", USER: "user" }, e3.default = d;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = function t3(e4) {
              var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              r(this, t3), this.quill = e4, this.options = n3;
            };
            o.DEFAULTS = {}, e3.default = o;
          }, function(t2, e3, n2) {
            function r(t3) {
              if (i.indexOf(t3) <= i.indexOf(l)) {
                for (var e4, n3 = arguments.length, r2 = Array(n3 > 1 ? n3 - 1 : 0), o2 = 1; o2 < n3; o2++) r2[o2 - 1] = arguments[o2];
                (e4 = console)[t3].apply(e4, r2);
              }
            }
            function o(t3) {
              return i.reduce(function(e4, n3) {
                return e4[n3] = r.bind(console, n3, t3), e4;
              }, {});
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var i = ["error", "warn", "log", "info"], l = "warn";
            r.level = o.level = function(t3) {
              l = t3;
            }, e3.default = o;
          }, function(t2, e3, n2) {
            function r(t3) {
              return null === t3 || void 0 === t3;
            }
            function o(t3) {
              return !(!t3 || "object" != typeof t3 || "number" != typeof t3.length) && ("function" == typeof t3.copy && "function" == typeof t3.slice && !(t3.length > 0 && "number" != typeof t3[0]));
            }
            function i(t3, e4, n3) {
              var i2, c;
              if (r(t3) || r(e4)) return false;
              if (t3.prototype !== e4.prototype) return false;
              if (s(t3)) return !!s(e4) && (t3 = l.call(t3), e4 = l.call(e4), u(t3, e4, n3));
              if (o(t3)) {
                if (!o(e4)) return false;
                if (t3.length !== e4.length) return false;
                for (i2 = 0; i2 < t3.length; i2++) if (t3[i2] !== e4[i2]) return false;
                return true;
              }
              try {
                var f = a(t3), h = a(e4);
              } catch (t4) {
                return false;
              }
              if (f.length != h.length) return false;
              for (f.sort(), h.sort(), i2 = f.length - 1; i2 >= 0; i2--) if (f[i2] != h[i2]) return false;
              for (i2 = f.length - 1; i2 >= 0; i2--) if (c = f[i2], !u(t3[c], e4[c], n3)) return false;
              return typeof t3 == typeof e4;
            }
            var l = Array.prototype.slice, a = n2(52), s = n2(53), u = t2.exports = function(t3, e4, n3) {
              return n3 || (n3 = {}), t3 === e4 || (t3 instanceof Date && e4 instanceof Date ? t3.getTime() === e4.getTime() : !t3 || !e4 || "object" != typeof t3 && "object" != typeof e4 ? n3.strict ? t3 === e4 : t3 == e4 : i(t3, e4, n3));
            };
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true });
            var r = n2(1), o = function() {
              function t3(t4, e4, n3) {
                void 0 === n3 && (n3 = {}), this.attrName = t4, this.keyName = e4;
                var o2 = r.Scope.TYPE & r.Scope.ATTRIBUTE;
                null != n3.scope ? this.scope = n3.scope & r.Scope.LEVEL | o2 : this.scope = r.Scope.ATTRIBUTE, null != n3.whitelist && (this.whitelist = n3.whitelist);
              }
              return t3.keys = function(t4) {
                return [].map.call(t4.attributes, function(t5) {
                  return t5.name;
                });
              }, t3.prototype.add = function(t4, e4) {
                return !!this.canAdd(t4, e4) && (t4.setAttribute(this.keyName, e4), true);
              }, t3.prototype.canAdd = function(t4, e4) {
                return null != r.query(t4, r.Scope.BLOT & (this.scope | r.Scope.TYPE)) && (null == this.whitelist || ("string" == typeof e4 ? this.whitelist.indexOf(e4.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e4) > -1));
              }, t3.prototype.remove = function(t4) {
                t4.removeAttribute(this.keyName);
              }, t3.prototype.value = function(t4) {
                var e4 = t4.getAttribute(this.keyName);
                return this.canAdd(t4, e4) && e4 ? e4 : "";
              }, t3;
            }();
            e3.default = o;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.Code = void 0;
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), u = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, c = n2(2), f = r(c), h = n2(0), p = r(h), d = n2(4), y = r(d), v = n2(6), b = r(v), g = n2(7), m = r(g), _ = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), e4;
            }(b.default);
            _.blotName = "code", _.tagName = "CODE";
            var O = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), s(e4, [{ key: "delta", value: function() {
                var t4 = this, e5 = this.domNode.textContent;
                return e5.endsWith("\n") && (e5 = e5.slice(0, -1)), e5.split("\n").reduce(function(e6, n3) {
                  return e6.insert(n3).insert("\n", t4.formats());
                }, new f.default());
              } }, { key: "format", value: function(t4, n3) {
                if (t4 !== this.statics.blotName || !n3) {
                  var r2 = this.descendant(m.default, this.length() - 1), o2 = a(r2, 1), i2 = o2[0];
                  null != i2 && i2.deleteAt(i2.length() - 1, 1), u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3);
                }
              } }, { key: "formatAt", value: function(t4, n3, r2, o2) {
                if (0 !== n3 && null != p.default.query(r2, p.default.Scope.BLOCK) && (r2 !== this.statics.blotName || o2 !== this.statics.formats(this.domNode))) {
                  var i2 = this.newlineIndex(t4);
                  if (!(i2 < 0 || i2 >= t4 + n3)) {
                    var l2 = this.newlineIndex(t4, true) + 1, a2 = i2 - l2 + 1, s2 = this.isolate(l2, a2), u2 = s2.next;
                    s2.format(r2, o2), u2 instanceof e4 && u2.formatAt(0, t4 - l2 + n3 - a2, r2, o2);
                  }
                }
              } }, { key: "insertAt", value: function(t4, e5, n3) {
                if (null == n3) {
                  var r2 = this.descendant(m.default, t4), o2 = a(r2, 2), i2 = o2[0], l2 = o2[1];
                  i2.insertAt(l2, e5);
                }
              } }, { key: "length", value: function() {
                var t4 = this.domNode.textContent.length;
                return this.domNode.textContent.endsWith("\n") ? t4 : t4 + 1;
              } }, { key: "newlineIndex", value: function(t4) {
                if (arguments.length > 1 && void 0 !== arguments[1] && arguments[1]) return this.domNode.textContent.slice(0, t4).lastIndexOf("\n");
                var e5 = this.domNode.textContent.slice(t4).indexOf("\n");
                return e5 > -1 ? t4 + e5 : -1;
              } }, { key: "optimize", value: function(t4) {
                this.domNode.textContent.endsWith("\n") || this.appendChild(p.default.create("text", "\n")), u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4);
                var n3 = this.next;
                null != n3 && n3.prev === this && n3.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === n3.statics.formats(n3.domNode) && (n3.optimize(t4), n3.moveChildren(this), n3.remove());
              } }, { key: "replace", value: function(t4) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "replace", this).call(this, t4), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(t5) {
                  var e5 = p.default.find(t5);
                  null == e5 ? t5.parentNode.removeChild(t5) : e5 instanceof p.default.Embed ? e5.remove() : e5.unwrap();
                });
              } }], [{ key: "create", value: function(t4) {
                var n3 = u(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
                return n3.setAttribute("spellcheck", false), n3;
              } }, { key: "formats", value: function() {
                return true;
              } }]), e4;
            }(y.default);
            O.blotName = "code-block", O.tagName = "PRE", O.TAB = "  ", e3.Code = _, e3.default = O;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              return Object.keys(e4).reduce(function(n3, r2) {
                return null == t3[r2] ? n3 : (e4[r2] === t3[r2] ? n3[r2] = e4[r2] : Array.isArray(e4[r2]) ? e4[r2].indexOf(t3[r2]) < 0 && (n3[r2] = e4[r2].concat([t3[r2]])) : n3[r2] = [e4[r2], t3[r2]], n3);
              }, {});
            }
            function a(t3) {
              return t3.reduce(function(t4, e4) {
                if (1 === e4.insert) {
                  var n3 = (0, A.default)(e4.attributes);
                  return delete n3.image, t4.insert({ image: e4.attributes.image }, n3);
                }
                if (null == e4.attributes || true !== e4.attributes.list && true !== e4.attributes.bullet || (e4 = (0, A.default)(e4), e4.attributes.list ? e4.attributes.list = "ordered" : (e4.attributes.list = "bullet", delete e4.attributes.bullet)), "string" == typeof e4.insert) {
                  var r2 = e4.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
                  return t4.insert(r2, e4.attributes);
                }
                return t4.push(e4);
              }, new h.default());
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), c = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), f = n2(2), h = r(f), p = n2(20), d = r(p), y = n2(0), v = r(y), b = n2(13), g = r(b), m = n2(24), _ = r(m), O = n2(4), w = r(O), x = n2(16), E = r(x), k = n2(21), A = r(k), j = n2(11), N = r(j), T = n2(3), S = r(T), P = /^[ -~]*$/, q = function() {
              function t3(e4) {
                i(this, t3), this.scroll = e4, this.delta = this.getDelta();
              }
              return c(t3, [{ key: "applyDelta", value: function(t4) {
                var e4 = this, n3 = false;
                this.scroll.update();
                var r2 = this.scroll.length();
                return this.scroll.batchStart(), t4 = a(t4), t4.reduce(function(t5, o2) {
                  var i2 = o2.retain || o2.delete || o2.insert.length || 1, l2 = o2.attributes || {};
                  if (null != o2.insert) {
                    if ("string" == typeof o2.insert) {
                      var a2 = o2.insert;
                      a2.endsWith("\n") && n3 && (n3 = false, a2 = a2.slice(0, -1)), t5 >= r2 && !a2.endsWith("\n") && (n3 = true), e4.scroll.insertAt(t5, a2);
                      var c2 = e4.scroll.line(t5), f2 = u(c2, 2), h2 = f2[0], p2 = f2[1], y2 = (0, S.default)({}, (0, O.bubbleFormats)(h2));
                      if (h2 instanceof w.default) {
                        var b2 = h2.descendant(v.default.Leaf, p2), g2 = u(b2, 1), m2 = g2[0];
                        y2 = (0, S.default)(y2, (0, O.bubbleFormats)(m2));
                      }
                      l2 = d.default.attributes.diff(y2, l2) || {};
                    } else if ("object" === s(o2.insert)) {
                      var _2 = Object.keys(o2.insert)[0];
                      if (null == _2) return t5;
                      e4.scroll.insertAt(t5, _2, o2.insert[_2]);
                    }
                    r2 += i2;
                  }
                  return Object.keys(l2).forEach(function(n4) {
                    e4.scroll.formatAt(t5, i2, n4, l2[n4]);
                  }), t5 + i2;
                }, 0), t4.reduce(function(t5, n4) {
                  return "number" == typeof n4.delete ? (e4.scroll.deleteAt(t5, n4.delete), t5) : t5 + (n4.retain || n4.insert.length || 1);
                }, 0), this.scroll.batchEnd(), this.update(t4);
              } }, { key: "deleteText", value: function(t4, e4) {
                return this.scroll.deleteAt(t4, e4), this.update(new h.default().retain(t4).delete(e4));
              } }, { key: "formatLine", value: function(t4, e4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return this.scroll.update(), Object.keys(r2).forEach(function(o2) {
                  if (null == n3.scroll.whitelist || n3.scroll.whitelist[o2]) {
                    var i2 = n3.scroll.lines(t4, Math.max(e4, 1)), l2 = e4;
                    i2.forEach(function(e5) {
                      var i3 = e5.length();
                      if (e5 instanceof g.default) {
                        var a2 = t4 - e5.offset(n3.scroll), s2 = e5.newlineIndex(a2 + l2) - a2 + 1;
                        e5.formatAt(a2, s2, o2, r2[o2]);
                      } else e5.format(o2, r2[o2]);
                      l2 -= i3;
                    });
                  }
                }), this.scroll.optimize(), this.update(new h.default().retain(t4).retain(e4, (0, A.default)(r2)));
              } }, { key: "formatText", value: function(t4, e4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return Object.keys(r2).forEach(function(o2) {
                  n3.scroll.formatAt(t4, e4, o2, r2[o2]);
                }), this.update(new h.default().retain(t4).retain(e4, (0, A.default)(r2)));
              } }, { key: "getContents", value: function(t4, e4) {
                return this.delta.slice(t4, t4 + e4);
              } }, { key: "getDelta", value: function() {
                return this.scroll.lines().reduce(function(t4, e4) {
                  return t4.concat(e4.delta());
                }, new h.default());
              } }, { key: "getFormat", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n3 = [], r2 = [];
                0 === e4 ? this.scroll.path(t4).forEach(function(t5) {
                  var e5 = u(t5, 1), o3 = e5[0];
                  o3 instanceof w.default ? n3.push(o3) : o3 instanceof v.default.Leaf && r2.push(o3);
                }) : (n3 = this.scroll.lines(t4, e4), r2 = this.scroll.descendants(v.default.Leaf, t4, e4));
                var o2 = [n3, r2].map(function(t5) {
                  if (0 === t5.length) return {};
                  for (var e5 = (0, O.bubbleFormats)(t5.shift()); Object.keys(e5).length > 0; ) {
                    var n4 = t5.shift();
                    if (null == n4) return e5;
                    e5 = l((0, O.bubbleFormats)(n4), e5);
                  }
                  return e5;
                });
                return S.default.apply(S.default, o2);
              } }, { key: "getText", value: function(t4, e4) {
                return this.getContents(t4, e4).filter(function(t5) {
                  return "string" == typeof t5.insert;
                }).map(function(t5) {
                  return t5.insert;
                }).join("");
              } }, { key: "insertEmbed", value: function(t4, e4, n3) {
                return this.scroll.insertAt(t4, e4, n3), this.update(new h.default().retain(t4).insert(o({}, e4, n3)));
              } }, { key: "insertText", value: function(t4, e4) {
                var n3 = this, r2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return e4 = e4.replace(/\r\n/g, "\n").replace(/\r/g, "\n"), this.scroll.insertAt(t4, e4), Object.keys(r2).forEach(function(o2) {
                  n3.scroll.formatAt(t4, e4.length, o2, r2[o2]);
                }), this.update(new h.default().retain(t4).insert(e4, (0, A.default)(r2)));
              } }, { key: "isBlank", value: function() {
                if (0 == this.scroll.children.length) return true;
                if (this.scroll.children.length > 1) return false;
                var t4 = this.scroll.children.head;
                return t4.statics.blotName === w.default.blotName && (!(t4.children.length > 1) && t4.children.head instanceof E.default);
              } }, { key: "removeFormat", value: function(t4, e4) {
                var n3 = this.getText(t4, e4), r2 = this.scroll.line(t4 + e4), o2 = u(r2, 2), i2 = o2[0], l2 = o2[1], a2 = 0, s2 = new h.default();
                null != i2 && (a2 = i2 instanceof g.default ? i2.newlineIndex(l2) - l2 + 1 : i2.length() - l2, s2 = i2.delta().slice(l2, l2 + a2 - 1).insert("\n"));
                var c2 = this.getContents(t4, e4 + a2), f2 = c2.diff(new h.default().insert(n3).concat(s2)), p2 = new h.default().retain(t4).concat(f2);
                return this.applyDelta(p2);
              } }, { key: "update", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : void 0, r2 = this.delta;
                if (1 === e4.length && "characterData" === e4[0].type && e4[0].target.data.match(P) && v.default.find(e4[0].target)) {
                  var o2 = v.default.find(e4[0].target), i2 = (0, O.bubbleFormats)(o2), l2 = o2.offset(this.scroll), a2 = e4[0].oldValue.replace(_.default.CONTENTS, ""), s2 = new h.default().insert(a2), u2 = new h.default().insert(o2.value());
                  t4 = new h.default().retain(l2).concat(s2.diff(u2, n3)).reduce(function(t5, e5) {
                    return e5.insert ? t5.insert(e5.insert, i2) : t5.push(e5);
                  }, new h.default()), this.delta = r2.compose(t4);
                } else this.delta = this.getDelta(), t4 && (0, N.default)(r2.compose(t4), this.delta) || (t4 = r2.diff(this.delta, n3));
                return t4;
              } }]), t3;
            }();
            e3.default = q;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3) {
              if (Array.isArray(t3)) {
                for (var e4 = 0, n3 = Array(t3.length); e4 < t3.length; e4++) n3[e4] = t3[e4];
                return n3;
              }
              return Array.from(t3);
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              try {
                e4.parentNode;
              } catch (t4) {
                return false;
              }
              return e4 instanceof Text && (e4 = e4.parentNode), t3.contains(e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.Range = void 0;
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), u = n2(0), c = r(u), f = n2(21), h = r(f), p = n2(11), d = r(p), y = n2(8), v = r(y), b = n2(10), g = r(b), m = (0, g.default)("quill:selection"), _ = function t3(e4) {
              var n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              i(this, t3), this.index = e4, this.length = n3;
            }, O = function() {
              function t3(e4, n3) {
                var r2 = this;
                i(this, t3), this.emitter = n3, this.scroll = e4, this.composing = false, this.mouseDown = false, this.root = this.scroll.domNode, this.cursor = c.default.create("cursor", this), this.lastRange = this.savedRange = new _(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                  r2.mouseDown || setTimeout(r2.update.bind(r2, v.default.sources.USER), 1);
                }), this.emitter.on(v.default.events.EDITOR_CHANGE, function(t4, e5) {
                  t4 === v.default.events.TEXT_CHANGE && e5.length() > 0 && r2.update(v.default.sources.SILENT);
                }), this.emitter.on(v.default.events.SCROLL_BEFORE_UPDATE, function() {
                  if (r2.hasFocus()) {
                    var t4 = r2.getNativeRange();
                    null != t4 && t4.start.node !== r2.cursor.textNode && r2.emitter.once(v.default.events.SCROLL_UPDATE, function() {
                      try {
                        r2.setNativeRange(t4.start.node, t4.start.offset, t4.end.node, t4.end.offset);
                      } catch (t5) {
                      }
                    });
                  }
                }), this.emitter.on(v.default.events.SCROLL_OPTIMIZE, function(t4, e5) {
                  if (e5.range) {
                    var n4 = e5.range, o2 = n4.startNode, i2 = n4.startOffset, l2 = n4.endNode, a2 = n4.endOffset;
                    r2.setNativeRange(o2, i2, l2, a2);
                  }
                }), this.update(v.default.sources.SILENT);
              }
              return s(t3, [{ key: "handleComposition", value: function() {
                var t4 = this;
                this.root.addEventListener("compositionstart", function() {
                  t4.composing = true;
                }), this.root.addEventListener("compositionend", function() {
                  if (t4.composing = false, t4.cursor.parent) {
                    var e4 = t4.cursor.restore();
                    if (!e4) return;
                    setTimeout(function() {
                      t4.setNativeRange(e4.startNode, e4.startOffset, e4.endNode, e4.endOffset);
                    }, 1);
                  }
                });
              } }, { key: "handleDragging", value: function() {
                var t4 = this;
                this.emitter.listenDOM("mousedown", document.body, function() {
                  t4.mouseDown = true;
                }), this.emitter.listenDOM("mouseup", document.body, function() {
                  t4.mouseDown = false, t4.update(v.default.sources.USER);
                });
              } }, { key: "focus", value: function() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
              } }, { key: "format", value: function(t4, e4) {
                if (null == this.scroll.whitelist || this.scroll.whitelist[t4]) {
                  this.scroll.update();
                  var n3 = this.getNativeRange();
                  if (null != n3 && n3.native.collapsed && !c.default.query(t4, c.default.Scope.BLOCK)) {
                    if (n3.start.node !== this.cursor.textNode) {
                      var r2 = c.default.find(n3.start.node, false);
                      if (null == r2) return;
                      if (r2 instanceof c.default.Leaf) {
                        var o2 = r2.split(n3.start.offset);
                        r2.parent.insertBefore(this.cursor, o2);
                      } else r2.insertBefore(this.cursor, n3.start.node);
                      this.cursor.attach();
                    }
                    this.cursor.format(t4, e4), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                  }
                }
              } }, { key: "getBounds", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, n3 = this.scroll.length();
                t4 = Math.min(t4, n3 - 1), e4 = Math.min(t4 + e4, n3 - 1) - t4;
                var r2 = void 0, o2 = this.scroll.leaf(t4), i2 = a(o2, 2), l2 = i2[0], s2 = i2[1];
                if (null == l2) return null;
                var u2 = l2.position(s2, true), c2 = a(u2, 2);
                r2 = c2[0], s2 = c2[1];
                var f2 = document.createRange();
                if (e4 > 0) {
                  f2.setStart(r2, s2);
                  var h2 = this.scroll.leaf(t4 + e4), p2 = a(h2, 2);
                  if (l2 = p2[0], s2 = p2[1], null == l2) return null;
                  var d2 = l2.position(s2, true), y2 = a(d2, 2);
                  return r2 = y2[0], s2 = y2[1], f2.setEnd(r2, s2), f2.getBoundingClientRect();
                }
                var v2 = "left", b2 = void 0;
                return r2 instanceof Text ? (s2 < r2.data.length ? (f2.setStart(r2, s2), f2.setEnd(r2, s2 + 1)) : (f2.setStart(r2, s2 - 1), f2.setEnd(r2, s2), v2 = "right"), b2 = f2.getBoundingClientRect()) : (b2 = l2.domNode.getBoundingClientRect(), s2 > 0 && (v2 = "right")), { bottom: b2.top + b2.height, height: b2.height, left: b2[v2], right: b2[v2], top: b2.top, width: 0 };
              } }, { key: "getNativeRange", value: function() {
                var t4 = document.getSelection();
                if (null == t4 || t4.rangeCount <= 0) return null;
                var e4 = t4.getRangeAt(0);
                if (null == e4) return null;
                var n3 = this.normalizeNative(e4);
                return m.info("getNativeRange", n3), n3;
              } }, { key: "getRange", value: function() {
                var t4 = this.getNativeRange();
                return null == t4 ? [null, null] : [this.normalizedToRange(t4), t4];
              } }, { key: "hasFocus", value: function() {
                return document.activeElement === this.root;
              } }, { key: "normalizedToRange", value: function(t4) {
                var e4 = this, n3 = [[t4.start.node, t4.start.offset]];
                t4.native.collapsed || n3.push([t4.end.node, t4.end.offset]);
                var r2 = n3.map(function(t5) {
                  var n4 = a(t5, 2), r3 = n4[0], o2 = n4[1], i3 = c.default.find(r3, true), l3 = i3.offset(e4.scroll);
                  return 0 === o2 ? l3 : i3 instanceof c.default.Container ? l3 + i3.length() : l3 + i3.index(r3, o2);
                }), i2 = Math.min(Math.max.apply(Math, o(r2)), this.scroll.length() - 1), l2 = Math.min.apply(Math, [i2].concat(o(r2)));
                return new _(l2, i2 - l2);
              } }, { key: "normalizeNative", value: function(t4) {
                if (!l(this.root, t4.startContainer) || !t4.collapsed && !l(this.root, t4.endContainer)) return null;
                var e4 = { start: { node: t4.startContainer, offset: t4.startOffset }, end: { node: t4.endContainer, offset: t4.endOffset }, native: t4 };
                return [e4.start, e4.end].forEach(function(t5) {
                  for (var e5 = t5.node, n3 = t5.offset; !(e5 instanceof Text) && e5.childNodes.length > 0; ) if (e5.childNodes.length > n3) e5 = e5.childNodes[n3], n3 = 0;
                  else {
                    if (e5.childNodes.length !== n3) break;
                    e5 = e5.lastChild, n3 = e5 instanceof Text ? e5.data.length : e5.childNodes.length + 1;
                  }
                  t5.node = e5, t5.offset = n3;
                }), e4;
              } }, { key: "rangeToNative", value: function(t4) {
                var e4 = this, n3 = t4.collapsed ? [t4.index] : [t4.index, t4.index + t4.length], r2 = [], o2 = this.scroll.length();
                return n3.forEach(function(t5, n4) {
                  t5 = Math.min(o2 - 1, t5);
                  var i2 = void 0, l2 = e4.scroll.leaf(t5), s2 = a(l2, 2), u2 = s2[0], c2 = s2[1], f2 = u2.position(c2, 0 !== n4), h2 = a(f2, 2);
                  i2 = h2[0], c2 = h2[1], r2.push(i2, c2);
                }), r2.length < 2 && (r2 = r2.concat(r2)), r2;
              } }, { key: "scrollIntoView", value: function(t4) {
                var e4 = this.lastRange;
                if (null != e4) {
                  var n3 = this.getBounds(e4.index, e4.length);
                  if (null != n3) {
                    var r2 = this.scroll.length() - 1, o2 = this.scroll.line(Math.min(e4.index, r2)), i2 = a(o2, 1), l2 = i2[0], s2 = l2;
                    if (e4.length > 0) {
                      var u2 = this.scroll.line(Math.min(e4.index + e4.length, r2));
                      s2 = a(u2, 1)[0];
                    }
                    if (null != l2 && null != s2) {
                      var c2 = t4.getBoundingClientRect();
                      n3.top < c2.top ? t4.scrollTop -= c2.top - n3.top : n3.bottom > c2.bottom && (t4.scrollTop += n3.bottom - c2.bottom);
                    }
                  }
                }
              } }, { key: "setNativeRange", value: function(t4, e4) {
                var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t4, r2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : e4, o2 = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
                if (m.info("setNativeRange", t4, e4, n3, r2), null == t4 || null != this.root.parentNode && null != t4.parentNode && null != n3.parentNode) {
                  var i2 = document.getSelection();
                  if (null != i2) if (null != t4) {
                    this.hasFocus() || this.root.focus();
                    var l2 = (this.getNativeRange() || {}).native;
                    if (null == l2 || o2 || t4 !== l2.startContainer || e4 !== l2.startOffset || n3 !== l2.endContainer || r2 !== l2.endOffset) {
                      "BR" == t4.tagName && (e4 = [].indexOf.call(t4.parentNode.childNodes, t4), t4 = t4.parentNode), "BR" == n3.tagName && (r2 = [].indexOf.call(n3.parentNode.childNodes, n3), n3 = n3.parentNode);
                      var a2 = document.createRange();
                      a2.setStart(t4, e4), a2.setEnd(n3, r2), i2.removeAllRanges(), i2.addRange(a2);
                    }
                  } else i2.removeAllRanges(), this.root.blur(), document.body.focus();
                }
              } }, { key: "setRange", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : v.default.sources.API;
                if ("string" == typeof e4 && (n3 = e4, e4 = false), m.info("setRange", t4), null != t4) {
                  var r2 = this.rangeToNative(t4);
                  this.setNativeRange.apply(this, o(r2).concat([e4]));
                } else this.setNativeRange(null);
                this.update(n3);
              } }, { key: "update", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : v.default.sources.USER, e4 = this.lastRange, n3 = this.getRange(), r2 = a(n3, 2), o2 = r2[0], i2 = r2[1];
                if (this.lastRange = o2, null != this.lastRange && (this.savedRange = this.lastRange), !(0, d.default)(e4, this.lastRange)) {
                  var l2;
                  !this.composing && null != i2 && i2.native.collapsed && i2.start.node !== this.cursor.textNode && this.cursor.restore();
                  var s2 = [v.default.events.SELECTION_CHANGE, (0, h.default)(this.lastRange), (0, h.default)(e4), t4];
                  if ((l2 = this.emitter).emit.apply(l2, [v.default.events.EDITOR_CHANGE].concat(s2)), t4 !== v.default.sources.SILENT) {
                    var u2;
                    (u2 = this.emitter).emit.apply(u2, s2);
                  }
                }
              } }]), t3;
            }();
            e3.Range = _, e3.default = O;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(0), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "insertInto", value: function(t4, n3) {
                0 === t4.children.length ? a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertInto", this).call(this, t4, n3) : this.remove();
              } }, { key: "length", value: function() {
                return 0;
              } }, { key: "value", value: function() {
                return "";
              } }], [{ key: "value", value: function() {
              } }]), e4;
            }(u.default.Embed);
            c.blotName = "break", c.tagName = "BR", e3.default = c;
          }, function(t2, e3, n2) {
            function r(t3) {
              var e4 = a.find(t3);
              if (null == e4) try {
                e4 = a.create(t3);
              } catch (n3) {
                e4 = a.create(a.Scope.INLINE), [].slice.call(t3.childNodes).forEach(function(t4) {
                  e4.domNode.appendChild(t4);
                }), t3.parentNode && t3.parentNode.replaceChild(e4.domNode, t3), e4.attach();
              }
              return e4;
            }
            var o = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var i = n2(44), l = n2(30), a = n2(1), s = function(t3) {
              function e4(e5) {
                var n3 = t3.call(this, e5) || this;
                return n3.build(), n3;
              }
              return o(e4, t3), e4.prototype.appendChild = function(t4) {
                this.insertBefore(t4);
              }, e4.prototype.attach = function() {
                t3.prototype.attach.call(this), this.children.forEach(function(t4) {
                  t4.attach();
                });
              }, e4.prototype.build = function() {
                var t4 = this;
                this.children = new i.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(e5) {
                  try {
                    var n3 = r(e5);
                    t4.insertBefore(n3, t4.children.head || void 0);
                  } catch (t5) {
                    if (t5 instanceof a.ParchmentError) return;
                    throw t5;
                  }
                });
              }, e4.prototype.deleteAt = function(t4, e5) {
                if (0 === t4 && e5 === this.length()) return this.remove();
                this.children.forEachAt(t4, e5, function(t5, e6, n3) {
                  t5.deleteAt(e6, n3);
                });
              }, e4.prototype.descendant = function(t4, n3) {
                var r2 = this.children.find(n3), o2 = r2[0], i2 = r2[1];
                return null == t4.blotName && t4(o2) || null != t4.blotName && o2 instanceof t4 ? [o2, i2] : o2 instanceof e4 ? o2.descendant(t4, i2) : [null, -1];
              }, e4.prototype.descendants = function(t4, n3, r2) {
                void 0 === n3 && (n3 = 0), void 0 === r2 && (r2 = Number.MAX_VALUE);
                var o2 = [], i2 = r2;
                return this.children.forEachAt(n3, r2, function(n4, r3, l2) {
                  (null == t4.blotName && t4(n4) || null != t4.blotName && n4 instanceof t4) && o2.push(n4), n4 instanceof e4 && (o2 = o2.concat(n4.descendants(t4, r3, i2))), i2 -= l2;
                }), o2;
              }, e4.prototype.detach = function() {
                this.children.forEach(function(t4) {
                  t4.detach();
                }), t3.prototype.detach.call(this);
              }, e4.prototype.formatAt = function(t4, e5, n3, r2) {
                this.children.forEachAt(t4, e5, function(t5, e6, o2) {
                  t5.formatAt(e6, o2, n3, r2);
                });
              }, e4.prototype.insertAt = function(t4, e5, n3) {
                var r2 = this.children.find(t4), o2 = r2[0], i2 = r2[1];
                if (o2) o2.insertAt(i2, e5, n3);
                else {
                  var l2 = null == n3 ? a.create("text", e5) : a.create(e5, n3);
                  this.appendChild(l2);
                }
              }, e4.prototype.insertBefore = function(t4, e5) {
                if (null != this.statics.allowedChildren && !this.statics.allowedChildren.some(function(e6) {
                  return t4 instanceof e6;
                })) throw new a.ParchmentError("Cannot insert " + t4.statics.blotName + " into " + this.statics.blotName);
                t4.insertInto(this, e5);
              }, e4.prototype.length = function() {
                return this.children.reduce(function(t4, e5) {
                  return t4 + e5.length();
                }, 0);
              }, e4.prototype.moveChildren = function(t4, e5) {
                this.children.forEach(function(n3) {
                  t4.insertBefore(n3, e5);
                });
              }, e4.prototype.optimize = function(e5) {
                if (t3.prototype.optimize.call(this, e5), 0 === this.children.length) if (null != this.statics.defaultChild) {
                  var n3 = a.create(this.statics.defaultChild);
                  this.appendChild(n3), n3.optimize(e5);
                } else this.remove();
              }, e4.prototype.path = function(t4, n3) {
                void 0 === n3 && (n3 = false);
                var r2 = this.children.find(t4, n3), o2 = r2[0], i2 = r2[1], l2 = [[this, t4]];
                return o2 instanceof e4 ? l2.concat(o2.path(i2, n3)) : (null != o2 && l2.push([o2, i2]), l2);
              }, e4.prototype.removeChild = function(t4) {
                this.children.remove(t4);
              }, e4.prototype.replace = function(n3) {
                n3 instanceof e4 && n3.moveChildren(this), t3.prototype.replace.call(this, n3);
              }, e4.prototype.split = function(t4, e5) {
                if (void 0 === e5 && (e5 = false), !e5) {
                  if (0 === t4) return this;
                  if (t4 === this.length()) return this.next;
                }
                var n3 = this.clone();
                return this.parent.insertBefore(n3, this.next), this.children.forEachAt(t4, this.length(), function(t5, r2, o2) {
                  t5 = t5.split(r2, e5), n3.appendChild(t5);
                }), n3;
              }, e4.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, e4.prototype.update = function(t4, e5) {
                var n3 = this, o2 = [], i2 = [];
                t4.forEach(function(t5) {
                  t5.target === n3.domNode && "childList" === t5.type && (o2.push.apply(o2, t5.addedNodes), i2.push.apply(i2, t5.removedNodes));
                }), i2.forEach(function(t5) {
                  if (!(null != t5.parentNode && "IFRAME" !== t5.tagName && document.body.compareDocumentPosition(t5) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var e6 = a.find(t5);
                    null != e6 && (null != e6.domNode.parentNode && e6.domNode.parentNode !== n3.domNode || e6.detach());
                  }
                }), o2.filter(function(t5) {
                  return t5.parentNode == n3.domNode;
                }).sort(function(t5, e6) {
                  return t5 === e6 ? 0 : t5.compareDocumentPosition(e6) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(t5) {
                  var e6 = null;
                  null != t5.nextSibling && (e6 = a.find(t5.nextSibling));
                  var o3 = r(t5);
                  o3.next == e6 && null != o3.next || (null != o3.parent && o3.parent.removeChild(n3), n3.insertBefore(o3, e6 || void 0));
                });
              }, e4;
            }(l.default);
            e3.default = s;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(12), i = n2(31), l = n2(17), a = n2(1), s = function(t3) {
              function e4(e5) {
                var n3 = t3.call(this, e5) || this;
                return n3.attributes = new i.default(n3.domNode), n3;
              }
              return r(e4, t3), e4.formats = function(t4) {
                return "string" == typeof this.tagName || (Array.isArray(this.tagName) ? t4.tagName.toLowerCase() : void 0);
              }, e4.prototype.format = function(t4, e5) {
                var n3 = a.query(t4);
                n3 instanceof o.default ? this.attributes.attribute(n3, e5) : e5 && (null == n3 || t4 === this.statics.blotName && this.formats()[t4] === e5 || this.replaceWith(t4, e5));
              }, e4.prototype.formats = function() {
                var t4 = this.attributes.values(), e5 = this.statics.formats(this.domNode);
                return null != e5 && (t4[this.statics.blotName] = e5), t4;
              }, e4.prototype.replaceWith = function(e5, n3) {
                var r2 = t3.prototype.replaceWith.call(this, e5, n3);
                return this.attributes.copy(r2), r2;
              }, e4.prototype.update = function(e5, n3) {
                var r2 = this;
                t3.prototype.update.call(this, e5, n3), e5.some(function(t4) {
                  return t4.target === r2.domNode && "attributes" === t4.type;
                }) && this.attributes.build();
              }, e4.prototype.wrap = function(n3, r2) {
                var o2 = t3.prototype.wrap.call(this, n3, r2);
                return o2 instanceof e4 && o2.statics.scope === this.statics.scope && this.attributes.move(o2), o2;
              }, e4;
            }(l.default);
            e3.default = s;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(30), i = n2(1), l = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return r(e4, t3), e4.value = function(t4) {
                return true;
              }, e4.prototype.index = function(t4, e5) {
                return this.domNode === t4 || this.domNode.compareDocumentPosition(t4) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(e5, 1) : -1;
              }, e4.prototype.position = function(t4, e5) {
                var n3 = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return t4 > 0 && (n3 += 1), [this.parent.domNode, n3];
              }, e4.prototype.value = function() {
                return t4 = {}, t4[this.statics.blotName] = this.statics.value(this.domNode) || true, t4;
                var t4;
              }, e4.scope = i.Scope.INLINE_BLOT, e4;
            }(o.default);
            e3.default = l;
          }, function(t2, e3, n2) {
            function r(t3) {
              this.ops = t3, this.index = 0, this.offset = 0;
            }
            var o = n2(11), i = n2(3), l = { attributes: { compose: function(t3, e4, n3) {
              "object" != typeof t3 && (t3 = {}), "object" != typeof e4 && (e4 = {});
              var r2 = i(true, {}, e4);
              n3 || (r2 = Object.keys(r2).reduce(function(t4, e5) {
                return null != r2[e5] && (t4[e5] = r2[e5]), t4;
              }, {}));
              for (var o2 in t3) void 0 !== t3[o2] && void 0 === e4[o2] && (r2[o2] = t3[o2]);
              return Object.keys(r2).length > 0 ? r2 : void 0;
            }, diff: function(t3, e4) {
              "object" != typeof t3 && (t3 = {}), "object" != typeof e4 && (e4 = {});
              var n3 = Object.keys(t3).concat(Object.keys(e4)).reduce(function(n4, r2) {
                return o(t3[r2], e4[r2]) || (n4[r2] = void 0 === e4[r2] ? null : e4[r2]), n4;
              }, {});
              return Object.keys(n3).length > 0 ? n3 : void 0;
            }, transform: function(t3, e4, n3) {
              if ("object" != typeof t3) return e4;
              if ("object" == typeof e4) {
                if (!n3) return e4;
                var r2 = Object.keys(e4).reduce(function(n4, r3) {
                  return void 0 === t3[r3] && (n4[r3] = e4[r3]), n4;
                }, {});
                return Object.keys(r2).length > 0 ? r2 : void 0;
              }
            } }, iterator: function(t3) {
              return new r(t3);
            }, length: function(t3) {
              return "number" == typeof t3.delete ? t3.delete : "number" == typeof t3.retain ? t3.retain : "string" == typeof t3.insert ? t3.insert.length : 1;
            } };
            r.prototype.hasNext = function() {
              return this.peekLength() < 1 / 0;
            }, r.prototype.next = function(t3) {
              t3 || (t3 = 1 / 0);
              var e4 = this.ops[this.index];
              if (e4) {
                var n3 = this.offset, r2 = l.length(e4);
                if (t3 >= r2 - n3 ? (t3 = r2 - n3, this.index += 1, this.offset = 0) : this.offset += t3, "number" == typeof e4.delete) return { delete: t3 };
                var o2 = {};
                return e4.attributes && (o2.attributes = e4.attributes), "number" == typeof e4.retain ? o2.retain = t3 : "string" == typeof e4.insert ? o2.insert = e4.insert.substr(n3, t3) : o2.insert = e4.insert, o2;
              }
              return { retain: 1 / 0 };
            }, r.prototype.peek = function() {
              return this.ops[this.index];
            }, r.prototype.peekLength = function() {
              return this.ops[this.index] ? l.length(this.ops[this.index]) - this.offset : 1 / 0;
            }, r.prototype.peekType = function() {
              return this.ops[this.index] ? "number" == typeof this.ops[this.index].delete ? "delete" : "number" == typeof this.ops[this.index].retain ? "retain" : "insert" : "retain";
            }, t2.exports = l;
          }, function(t2, n2) {
            var r = function() {
              function t3(t4, e3) {
                return null != e3 && t4 instanceof e3;
              }
              function n3(r3, o2, i2, l2, f) {
                function h(r4, i3) {
                  if (null === r4) return null;
                  if (0 === i3) return r4;
                  var v, b;
                  if ("object" != typeof r4) return r4;
                  if (t3(r4, s)) v = new s();
                  else if (t3(r4, u)) v = new u();
                  else if (t3(r4, c)) v = new c(function(t4, e3) {
                    r4.then(function(e4) {
                      t4(h(e4, i3 - 1));
                    }, function(t5) {
                      e3(h(t5, i3 - 1));
                    });
                  });
                  else if (n3.__isArray(r4)) v = [];
                  else if (n3.__isRegExp(r4)) v = new RegExp(r4.source, a(r4)), r4.lastIndex && (v.lastIndex = r4.lastIndex);
                  else if (n3.__isDate(r4)) v = new Date(r4.getTime());
                  else {
                    if (y && e2.isBuffer(r4)) return v = new e2(r4.length), r4.copy(v), v;
                    t3(r4, Error) ? v = Object.create(r4) : void 0 === l2 ? (b = Object.getPrototypeOf(r4), v = Object.create(b)) : (v = Object.create(l2), b = l2);
                  }
                  if (o2) {
                    var g = p.indexOf(r4);
                    if (-1 != g) return d[g];
                    p.push(r4), d.push(v);
                  }
                  t3(r4, s) && r4.forEach(function(t4, e3) {
                    var n4 = h(e3, i3 - 1), r5 = h(t4, i3 - 1);
                    v.set(n4, r5);
                  }), t3(r4, u) && r4.forEach(function(t4) {
                    var e3 = h(t4, i3 - 1);
                    v.add(e3);
                  });
                  for (var m in r4) {
                    var _;
                    b && (_ = Object.getOwnPropertyDescriptor(b, m)), _ && null == _.set || (v[m] = h(r4[m], i3 - 1));
                  }
                  if (Object.getOwnPropertySymbols) for (var O = Object.getOwnPropertySymbols(r4), m = 0; m < O.length; m++) {
                    var w = O[m], x = Object.getOwnPropertyDescriptor(r4, w);
                    (!x || x.enumerable || f) && (v[w] = h(r4[w], i3 - 1), x.enumerable || Object.defineProperty(v, w, { enumerable: false }));
                  }
                  if (f) for (var E = Object.getOwnPropertyNames(r4), m = 0; m < E.length; m++) {
                    var k = E[m], x = Object.getOwnPropertyDescriptor(r4, k);
                    x && x.enumerable || (v[k] = h(r4[k], i3 - 1), Object.defineProperty(v, k, { enumerable: false }));
                  }
                  return v;
                }
                "object" == typeof o2 && (i2 = o2.depth, l2 = o2.prototype, f = o2.includeNonEnumerable, o2 = o2.circular);
                var p = [], d = [], y = void 0 !== e2;
                return void 0 === o2 && (o2 = true), void 0 === i2 && (i2 = 1 / 0), h(r3, i2);
              }
              function r2(t4) {
                return Object.prototype.toString.call(t4);
              }
              function o(t4) {
                return "object" == typeof t4 && "[object Date]" === r2(t4);
              }
              function i(t4) {
                return "object" == typeof t4 && "[object Array]" === r2(t4);
              }
              function l(t4) {
                return "object" == typeof t4 && "[object RegExp]" === r2(t4);
              }
              function a(t4) {
                var e3 = "";
                return t4.global && (e3 += "g"), t4.ignoreCase && (e3 += "i"), t4.multiline && (e3 += "m"), e3;
              }
              var s;
              try {
                s = Map;
              } catch (t4) {
                s = function() {
                };
              }
              var u;
              try {
                u = Set;
              } catch (t4) {
                u = function() {
                };
              }
              var c;
              try {
                c = Promise;
              } catch (t4) {
                c = function() {
                };
              }
              return n3.clonePrototype = function(t4) {
                if (null === t4) return null;
                var e3 = function() {
                };
                return e3.prototype = t4, new e3();
              }, n3.__objToStr = r2, n3.__isDate = o, n3.__isArray = i, n3.__isRegExp = l, n3.__getRegExpFlags = a, n3;
            }();
            "object" == typeof t2 && t2.exports && (t2.exports = r);
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function a(t3) {
              return t3 instanceof v.default || t3 instanceof y.BlockEmbed;
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), c = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, f = n2(0), h = r(f), p = n2(8), d = r(p), y = n2(4), v = r(y), b = n2(16), g = r(b), m = n2(13), _ = r(m), O = n2(25), w = r(O), x = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return r2.emitter = n3.emitter, Array.isArray(n3.whitelist) && (r2.whitelist = n3.whitelist.reduce(function(t5, e5) {
                  return t5[e5] = true, t5;
                }, {})), r2.domNode.addEventListener("DOMNodeInserted", function() {
                }), r2.optimize(), r2.enable(), r2;
              }
              return l(e4, t3), u(e4, [{ key: "batchStart", value: function() {
                this.batch = true;
              } }, { key: "batchEnd", value: function() {
                this.batch = false, this.optimize();
              } }, { key: "deleteAt", value: function(t4, n3) {
                var r2 = this.line(t4), o2 = s(r2, 2), i2 = o2[0], l2 = o2[1], a2 = this.line(t4 + n3), u2 = s(a2, 1), f2 = u2[0];
                if (c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "deleteAt", this).call(this, t4, n3), null != f2 && i2 !== f2 && l2 > 0) {
                  if (i2 instanceof y.BlockEmbed || f2 instanceof y.BlockEmbed) return void this.optimize();
                  if (i2 instanceof _.default) {
                    var h2 = i2.newlineIndex(i2.length(), true);
                    if (h2 > -1 && (i2 = i2.split(h2 + 1)) === f2) return void this.optimize();
                  } else if (f2 instanceof _.default) {
                    var p2 = f2.newlineIndex(0);
                    p2 > -1 && f2.split(p2 + 1);
                  }
                  var d2 = f2.children.head instanceof g.default ? null : f2.children.head;
                  i2.moveChildren(f2, d2), i2.remove();
                }
                this.optimize();
              } }, { key: "enable", value: function() {
                var t4 = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
                this.domNode.setAttribute("contenteditable", t4);
              } }, { key: "formatAt", value: function(t4, n3, r2, o2) {
                (null == this.whitelist || this.whitelist[r2]) && (c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "formatAt", this).call(this, t4, n3, r2, o2), this.optimize());
              } }, { key: "insertAt", value: function(t4, n3, r2) {
                if (null == r2 || null == this.whitelist || this.whitelist[n3]) {
                  if (t4 >= this.length()) if (null == r2 || null == h.default.query(n3, h.default.Scope.BLOCK)) {
                    var o2 = h.default.create(this.statics.defaultChild);
                    this.appendChild(o2), null == r2 && n3.endsWith("\n") && (n3 = n3.slice(0, -1)), o2.insertAt(0, n3, r2);
                  } else {
                    var i2 = h.default.create(n3, r2);
                    this.appendChild(i2);
                  }
                  else c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertAt", this).call(this, t4, n3, r2);
                  this.optimize();
                }
              } }, { key: "insertBefore", value: function(t4, n3) {
                if (t4.statics.scope === h.default.Scope.INLINE_BLOT) {
                  var r2 = h.default.create(this.statics.defaultChild);
                  r2.appendChild(t4), t4 = r2;
                }
                c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertBefore", this).call(this, t4, n3);
              } }, { key: "leaf", value: function(t4) {
                return this.path(t4).pop() || [null, -1];
              } }, { key: "line", value: function(t4) {
                return t4 === this.length() ? this.line(t4 - 1) : this.descendant(a, t4);
              } }, { key: "lines", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : Number.MAX_VALUE;
                return function t5(e6, n3, r2) {
                  var o2 = [], i2 = r2;
                  return e6.children.forEachAt(n3, r2, function(e7, n4, r3) {
                    a(e7) ? o2.push(e7) : e7 instanceof h.default.Container && (o2 = o2.concat(t5(e7, n4, i2))), i2 -= r3;
                  }), o2;
                }(this, t4, e5);
              } }, { key: "optimize", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [], n3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                true !== this.batch && (c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4, n3), t4.length > 0 && this.emitter.emit(d.default.events.SCROLL_OPTIMIZE, t4, n3));
              } }, { key: "path", value: function(t4) {
                return c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "path", this).call(this, t4).slice(1);
              } }, { key: "update", value: function(t4) {
                if (true !== this.batch) {
                  var n3 = d.default.sources.USER;
                  "string" == typeof t4 && (n3 = t4), Array.isArray(t4) || (t4 = this.observer.takeRecords()), t4.length > 0 && this.emitter.emit(d.default.events.SCROLL_BEFORE_UPDATE, n3, t4), c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "update", this).call(this, t4.concat([])), t4.length > 0 && this.emitter.emit(d.default.events.SCROLL_UPDATE, n3, t4);
                }
              } }]), e4;
            }(h.default.Scroll);
            x.blotName = "scroll", x.className = "ql-editor", x.tagName = "DIV", x.defaultChild = "block", x.allowedChildren = [v.default, y.BlockEmbed, w.default], e3.default = x;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function a(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function s(t3, e4) {
              var n3, r2 = t3 === D.keys.LEFT ? "prefix" : "suffix";
              return n3 = { key: t3, shiftKey: e4, altKey: null }, o(n3, r2, /^$/), o(n3, "handler", function(n4) {
                var r3 = n4.index;
                t3 === D.keys.RIGHT && (r3 += n4.length + 1);
                var o2 = this.quill.getLeaf(r3);
                return !(b(o2, 1)[0] instanceof S.default.Embed) || (t3 === D.keys.LEFT ? e4 ? this.quill.setSelection(n4.index - 1, n4.length + 1, q.default.sources.USER) : this.quill.setSelection(n4.index - 1, q.default.sources.USER) : e4 ? this.quill.setSelection(n4.index, n4.length + 1, q.default.sources.USER) : this.quill.setSelection(n4.index + n4.length + 1, q.default.sources.USER), false);
              }), n3;
            }
            function u(t3, e4) {
              if (!(0 === t3.index || this.quill.getLength() <= 1)) {
                var n3 = this.quill.getLine(t3.index), r2 = b(n3, 1), o2 = r2[0], i2 = {};
                if (0 === e4.offset) {
                  var l2 = this.quill.getLine(t3.index - 1), a2 = b(l2, 1), s2 = a2[0];
                  if (null != s2 && s2.length() > 1) {
                    var u2 = o2.formats(), c2 = this.quill.getFormat(t3.index - 1, 1);
                    i2 = N.default.attributes.diff(u2, c2) || {};
                  }
                }
                var f2 = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e4.prefix) ? 2 : 1;
                this.quill.deleteText(t3.index - f2, f2, q.default.sources.USER), Object.keys(i2).length > 0 && this.quill.formatLine(t3.index - f2, f2, i2, q.default.sources.USER), this.quill.focus();
              }
            }
            function c(t3, e4) {
              var n3 = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e4.suffix) ? 2 : 1;
              if (!(t3.index >= this.quill.getLength() - n3)) {
                var r2 = {}, o2 = 0, i2 = this.quill.getLine(t3.index), l2 = b(i2, 1), a2 = l2[0];
                if (e4.offset >= a2.length() - 1) {
                  var s2 = this.quill.getLine(t3.index + 1), u2 = b(s2, 1), c2 = u2[0];
                  if (c2) {
                    var f2 = a2.formats(), h2 = this.quill.getFormat(t3.index, 1);
                    r2 = N.default.attributes.diff(f2, h2) || {}, o2 = c2.length();
                  }
                }
                this.quill.deleteText(t3.index, n3, q.default.sources.USER), Object.keys(r2).length > 0 && this.quill.formatLine(t3.index + o2 - 1, n3, r2, q.default.sources.USER);
              }
            }
            function f(t3) {
              var e4 = this.quill.getLines(t3), n3 = {};
              if (e4.length > 1) {
                var r2 = e4[0].formats(), o2 = e4[e4.length - 1].formats();
                n3 = N.default.attributes.diff(o2, r2) || {};
              }
              this.quill.deleteText(t3, q.default.sources.USER), Object.keys(n3).length > 0 && this.quill.formatLine(t3.index, 1, n3, q.default.sources.USER), this.quill.setSelection(t3.index, q.default.sources.SILENT), this.quill.focus();
            }
            function h(t3, e4) {
              var n3 = this;
              t3.length > 0 && this.quill.scroll.deleteAt(t3.index, t3.length);
              var r2 = Object.keys(e4.format).reduce(function(t4, n4) {
                return S.default.query(n4, S.default.Scope.BLOCK) && !Array.isArray(e4.format[n4]) && (t4[n4] = e4.format[n4]), t4;
              }, {});
              this.quill.insertText(t3.index, "\n", r2, q.default.sources.USER), this.quill.setSelection(t3.index + 1, q.default.sources.SILENT), this.quill.focus(), Object.keys(e4.format).forEach(function(t4) {
                null == r2[t4] && (Array.isArray(e4.format[t4]) || "link" !== t4 && n3.quill.format(t4, e4.format[t4], q.default.sources.USER));
              });
            }
            function p(t3) {
              return { key: D.keys.TAB, shiftKey: !t3, format: { "code-block": true }, handler: function(e4) {
                var n3 = S.default.query("code-block"), r2 = e4.index, o2 = e4.length, i2 = this.quill.scroll.descendant(n3, r2), l2 = b(i2, 2), a2 = l2[0], s2 = l2[1];
                if (null != a2) {
                  var u2 = this.quill.getIndex(a2), c2 = a2.newlineIndex(s2, true) + 1, f2 = a2.newlineIndex(u2 + s2 + o2), h2 = a2.domNode.textContent.slice(c2, f2).split("\n");
                  s2 = 0, h2.forEach(function(e5, i3) {
                    t3 ? (a2.insertAt(c2 + s2, n3.TAB), s2 += n3.TAB.length, 0 === i3 ? r2 += n3.TAB.length : o2 += n3.TAB.length) : e5.startsWith(n3.TAB) && (a2.deleteAt(c2 + s2, n3.TAB.length), s2 -= n3.TAB.length, 0 === i3 ? r2 -= n3.TAB.length : o2 -= n3.TAB.length), s2 += e5.length + 1;
                  }), this.quill.update(q.default.sources.USER), this.quill.setSelection(r2, o2, q.default.sources.SILENT);
                }
              } };
            }
            function d(t3) {
              return { key: t3[0].toUpperCase(), shortKey: true, handler: function(e4, n3) {
                this.quill.format(t3, !n3.format[t3], q.default.sources.USER);
              } };
            }
            function y(t3) {
              if ("string" == typeof t3 || "number" == typeof t3) return y({ key: t3 });
              if ("object" === (void 0 === t3 ? "undefined" : v(t3)) && (t3 = (0, _.default)(t3, false)), "string" == typeof t3.key) if (null != D.keys[t3.key.toUpperCase()]) t3.key = D.keys[t3.key.toUpperCase()];
              else {
                if (1 !== t3.key.length) return null;
                t3.key = t3.key.toUpperCase().charCodeAt(0);
              }
              return t3.shortKey && (t3[I] = t3.shortKey, delete t3.shortKey), t3;
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.SHORTKEY = e3.default = void 0;
            var v = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, b = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), g = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), m = n2(21), _ = r(m), O = n2(11), w = r(O), x = n2(3), E = r(x), k = n2(2), A = r(k), j = n2(20), N = r(j), T = n2(0), S = r(T), P = n2(5), q = r(P), C = n2(10), L = r(C), R = n2(9), M = r(R), B = (0, L.default)("quill:keyboard"), I = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", D = function(t3) {
              function e4(t4, n3) {
                i(this, e4);
                var r2 = l(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.bindings = {}, Object.keys(r2.options.bindings).forEach(function(e5) {
                  ("list autofill" !== e5 || null == t4.scroll.whitelist || t4.scroll.whitelist.list) && r2.options.bindings[e5] && r2.addBinding(r2.options.bindings[e5]);
                }), r2.addBinding({ key: e4.keys.ENTER, shiftKey: null }, h), r2.addBinding({ key: e4.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
                }), /Firefox/i.test(navigator.userAgent) ? (r2.addBinding({ key: e4.keys.BACKSPACE }, { collapsed: true }, u), r2.addBinding({ key: e4.keys.DELETE }, { collapsed: true }, c)) : (r2.addBinding({ key: e4.keys.BACKSPACE }, { collapsed: true, prefix: /^.?$/ }, u), r2.addBinding({ key: e4.keys.DELETE }, { collapsed: true, suffix: /^.?$/ }, c)), r2.addBinding({ key: e4.keys.BACKSPACE }, { collapsed: false }, f), r2.addBinding({ key: e4.keys.DELETE }, { collapsed: false }, f), r2.addBinding({ key: e4.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: true, offset: 0 }, u), r2.listen(), r2;
              }
              return a(e4, t3), g(e4, null, [{ key: "match", value: function(t4, e5) {
                return e5 = y(e5), !["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(n3) {
                  return !!e5[n3] !== t4[n3] && null !== e5[n3];
                }) && e5.key === (t4.which || t4.keyCode);
              } }]), g(e4, [{ key: "addBinding", value: function(t4) {
                var e5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, r2 = y(t4);
                if (null == r2 || null == r2.key) return B.warn("Attempted to add invalid keyboard binding", r2);
                "function" == typeof e5 && (e5 = { handler: e5 }), "function" == typeof n3 && (n3 = { handler: n3 }), r2 = (0, E.default)(r2, e5, n3), this.bindings[r2.key] = this.bindings[r2.key] || [], this.bindings[r2.key].push(r2);
              } }, { key: "listen", value: function() {
                var t4 = this;
                this.quill.root.addEventListener("keydown", function(n3) {
                  if (!n3.defaultPrevented) {
                    var r2 = n3.which || n3.keyCode, o2 = (t4.bindings[r2] || []).filter(function(t5) {
                      return e4.match(n3, t5);
                    });
                    if (0 !== o2.length) {
                      var i2 = t4.quill.getSelection();
                      if (null != i2 && t4.quill.hasFocus()) {
                        var l2 = t4.quill.getLine(i2.index), a2 = b(l2, 2), s2 = a2[0], u2 = a2[1], c2 = t4.quill.getLeaf(i2.index), f2 = b(c2, 2), h2 = f2[0], p2 = f2[1], d2 = 0 === i2.length ? [h2, p2] : t4.quill.getLeaf(i2.index + i2.length), y2 = b(d2, 2), g2 = y2[0], m2 = y2[1], _2 = h2 instanceof S.default.Text ? h2.value().slice(0, p2) : "", O2 = g2 instanceof S.default.Text ? g2.value().slice(m2) : "", x2 = { collapsed: 0 === i2.length, empty: 0 === i2.length && s2.length() <= 1, format: t4.quill.getFormat(i2), offset: u2, prefix: _2, suffix: O2 };
                        o2.some(function(e5) {
                          if (null != e5.collapsed && e5.collapsed !== x2.collapsed) return false;
                          if (null != e5.empty && e5.empty !== x2.empty) return false;
                          if (null != e5.offset && e5.offset !== x2.offset) return false;
                          if (Array.isArray(e5.format)) {
                            if (e5.format.every(function(t5) {
                              return null == x2.format[t5];
                            })) return false;
                          } else if ("object" === v(e5.format) && !Object.keys(e5.format).every(function(t5) {
                            return true === e5.format[t5] ? null != x2.format[t5] : false === e5.format[t5] ? null == x2.format[t5] : (0, w.default)(e5.format[t5], x2.format[t5]);
                          })) return false;
                          return !(null != e5.prefix && !e5.prefix.test(x2.prefix)) && (!(null != e5.suffix && !e5.suffix.test(x2.suffix)) && true !== e5.handler.call(t4, i2, x2));
                        }) && n3.preventDefault();
                      }
                    }
                  }
                });
              } }]), e4;
            }(M.default);
            D.keys = { BACKSPACE: 8, TAB: 9, ENTER: 13, ESCAPE: 27, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, DELETE: 46 }, D.DEFAULTS = { bindings: { bold: d("bold"), italic: d("italic"), underline: d("underline"), indent: { key: D.keys.TAB, format: ["blockquote", "indent", "list"], handler: function(t3, e4) {
              if (e4.collapsed && 0 !== e4.offset) return true;
              this.quill.format("indent", "+1", q.default.sources.USER);
            } }, outdent: { key: D.keys.TAB, shiftKey: true, format: ["blockquote", "indent", "list"], handler: function(t3, e4) {
              if (e4.collapsed && 0 !== e4.offset) return true;
              this.quill.format("indent", "-1", q.default.sources.USER);
            } }, "outdent backspace": { key: D.keys.BACKSPACE, collapsed: true, shiftKey: null, metaKey: null, ctrlKey: null, altKey: null, format: ["indent", "list"], offset: 0, handler: function(t3, e4) {
              null != e4.format.indent ? this.quill.format("indent", "-1", q.default.sources.USER) : null != e4.format.list && this.quill.format("list", false, q.default.sources.USER);
            } }, "indent code-block": p(true), "outdent code-block": p(false), "remove tab": { key: D.keys.TAB, shiftKey: true, collapsed: true, prefix: /\t$/, handler: function(t3) {
              this.quill.deleteText(t3.index - 1, 1, q.default.sources.USER);
            } }, tab: { key: D.keys.TAB, handler: function(t3) {
              this.quill.history.cutoff();
              var e4 = new A.default().retain(t3.index).delete(t3.length).insert("	");
              this.quill.updateContents(e4, q.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t3.index + 1, q.default.sources.SILENT);
            } }, "list empty enter": { key: D.keys.ENTER, collapsed: true, format: ["list"], empty: true, handler: function(t3, e4) {
              this.quill.format("list", false, q.default.sources.USER), e4.format.indent && this.quill.format("indent", false, q.default.sources.USER);
            } }, "checklist enter": { key: D.keys.ENTER, collapsed: true, format: { list: "checked" }, handler: function(t3) {
              var e4 = this.quill.getLine(t3.index), n3 = b(e4, 2), r2 = n3[0], o2 = n3[1], i2 = (0, E.default)({}, r2.formats(), { list: "checked" }), l2 = new A.default().retain(t3.index).insert("\n", i2).retain(r2.length() - o2 - 1).retain(1, { list: "unchecked" });
              this.quill.updateContents(l2, q.default.sources.USER), this.quill.setSelection(t3.index + 1, q.default.sources.SILENT), this.quill.scrollIntoView();
            } }, "header enter": { key: D.keys.ENTER, collapsed: true, format: ["header"], suffix: /^$/, handler: function(t3, e4) {
              var n3 = this.quill.getLine(t3.index), r2 = b(n3, 2), o2 = r2[0], i2 = r2[1], l2 = new A.default().retain(t3.index).insert("\n", e4.format).retain(o2.length() - i2 - 1).retain(1, { header: null });
              this.quill.updateContents(l2, q.default.sources.USER), this.quill.setSelection(t3.index + 1, q.default.sources.SILENT), this.quill.scrollIntoView();
            } }, "list autofill": { key: " ", collapsed: true, format: { list: false }, prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/, handler: function(t3, e4) {
              var n3 = e4.prefix.length, r2 = this.quill.getLine(t3.index), o2 = b(r2, 2), i2 = o2[0], l2 = o2[1];
              if (l2 > n3) return true;
              var a2 = void 0;
              switch (e4.prefix.trim()) {
                case "[]":
                case "[ ]":
                  a2 = "unchecked";
                  break;
                case "[x]":
                  a2 = "checked";
                  break;
                case "-":
                case "*":
                  a2 = "bullet";
                  break;
                default:
                  a2 = "ordered";
              }
              this.quill.insertText(t3.index, " ", q.default.sources.USER), this.quill.history.cutoff();
              var s2 = new A.default().retain(t3.index - l2).delete(n3 + 1).retain(i2.length() - 2 - l2).retain(1, { list: a2 });
              this.quill.updateContents(s2, q.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection(t3.index - n3, q.default.sources.SILENT);
            } }, "code exit": { key: D.keys.ENTER, collapsed: true, format: ["code-block"], prefix: /\n\n$/, suffix: /^\s+$/, handler: function(t3) {
              var e4 = this.quill.getLine(t3.index), n3 = b(e4, 2), r2 = n3[0], o2 = n3[1], i2 = new A.default().retain(t3.index + r2.length() - o2 - 2).retain(1, { "code-block": null }).delete(1);
              this.quill.updateContents(i2, q.default.sources.USER);
            } }, "embed left": s(D.keys.LEFT, false), "embed left shift": s(D.keys.LEFT, true), "embed right": s(D.keys.RIGHT, false), "embed right shift": s(D.keys.RIGHT, true) } }, e3.default = D, e3.SHORTKEY = I;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), c = n2(0), f = r(c), h = n2(7), p = r(h), d = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return r2.selection = n3, r2.textNode = document.createTextNode(e4.CONTENTS), r2.domNode.appendChild(r2.textNode), r2._length = 0, r2;
              }
              return l(e4, t3), u(e4, null, [{ key: "value", value: function() {
              } }]), u(e4, [{ key: "detach", value: function() {
                null != this.parent && this.parent.removeChild(this);
              } }, { key: "format", value: function(t4, n3) {
                if (0 !== this._length) return s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3);
                for (var r2 = this, o2 = 0; null != r2 && r2.statics.scope !== f.default.Scope.BLOCK_BLOT; ) o2 += r2.offset(r2.parent), r2 = r2.parent;
                null != r2 && (this._length = e4.CONTENTS.length, r2.optimize(), r2.formatAt(o2, e4.CONTENTS.length, t4, n3), this._length = 0);
              } }, { key: "index", value: function(t4, n3) {
                return t4 === this.textNode ? 0 : s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "index", this).call(this, t4, n3);
              } }, { key: "length", value: function() {
                return this._length;
              } }, { key: "position", value: function() {
                return [this.textNode, this.textNode.data.length];
              } }, { key: "remove", value: function() {
                s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "remove", this).call(this), this.parent = null;
              } }, { key: "restore", value: function() {
                if (!this.selection.composing && null != this.parent) {
                  var t4 = this.textNode, n3 = this.selection.getNativeRange(), r2 = void 0, o2 = void 0, i2 = void 0;
                  if (null != n3 && n3.start.node === t4 && n3.end.node === t4) {
                    var l2 = [t4, n3.start.offset, n3.end.offset];
                    r2 = l2[0], o2 = l2[1], i2 = l2[2];
                  }
                  for (; null != this.domNode.lastChild && this.domNode.lastChild !== this.textNode; ) this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                  if (this.textNode.data !== e4.CONTENTS) {
                    var s2 = this.textNode.data.split(e4.CONTENTS).join("");
                    this.next instanceof p.default ? (r2 = this.next.domNode, this.next.insertAt(0, s2), this.textNode.data = e4.CONTENTS) : (this.textNode.data = s2, this.parent.insertBefore(f.default.create(this.textNode), this), this.textNode = document.createTextNode(e4.CONTENTS), this.domNode.appendChild(this.textNode));
                  }
                  if (this.remove(), null != o2) {
                    var u2 = [o2, i2].map(function(t5) {
                      return Math.max(0, Math.min(r2.data.length, t5 - 1));
                    }), c2 = a(u2, 2);
                    return o2 = c2[0], i2 = c2[1], { startNode: r2, startOffset: o2, endNode: r2, endOffset: i2 };
                  }
                }
              } }, { key: "update", value: function(t4, e5) {
                var n3 = this;
                if (t4.some(function(t5) {
                  return "characterData" === t5.type && t5.target === n3.textNode;
                })) {
                  var r2 = this.restore();
                  r2 && (e5.range = r2);
                }
              } }, { key: "value", value: function() {
                return "";
              } }]), e4;
            }(f.default.Embed);
            d.blotName = "cursor", d.className = "ql-cursor", d.tagName = "span", d.CONTENTS = "\uFEFF", e3.default = d;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = n2(0), s = r(a), u = n2(4), c = r(u), f = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), e4;
            }(s.default.Container);
            f.allowedChildren = [c.default, u.BlockEmbed, f], e3.default = f;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.ColorStyle = e3.ColorClass = e3.ColorAttributor = void 0;
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(0), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "value", value: function(t4) {
                var n3 = a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "value", this).call(this, t4);
                return n3.startsWith("rgb(") ? (n3 = n3.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + n3.split(",").map(function(t5) {
                  return ("00" + parseInt(t5).toString(16)).slice(-2);
                }).join("")) : n3;
              } }]), e4;
            }(u.default.Attributor.Style), f = new u.default.Attributor.Class("color", "ql-color", { scope: u.default.Scope.INLINE }), h = new c("color", "color", { scope: u.default.Scope.INLINE });
            e3.ColorAttributor = c, e3.ColorClass = f, e3.ColorStyle = h;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function l(t3, e4) {
              var n3 = document.createElement("a");
              n3.href = t3;
              var r2 = n3.href.slice(0, n3.href.indexOf(":"));
              return e4.indexOf(r2) > -1;
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.sanitize = e3.default = void 0;
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(6), c = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(u), f = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), a(e4, [{ key: "format", value: function(t4, n3) {
                if (t4 !== this.statics.blotName || !n3) return s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3);
                n3 = this.constructor.sanitize(n3), this.domNode.setAttribute("href", n3);
              } }], [{ key: "create", value: function(t4) {
                var n3 = s(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
                return t4 = this.sanitize(t4), n3.setAttribute("href", t4), n3.setAttribute("target", "_blank"), n3;
              } }, { key: "formats", value: function(t4) {
                return t4.getAttribute("href");
              } }, { key: "sanitize", value: function(t4) {
                return l(t4, this.PROTOCOL_WHITELIST) ? t4 : this.SANITIZED_URL;
              } }]), e4;
            }(c.default);
            f.blotName = "link", f.tagName = "A", f.SANITIZED_URL = "about:blank", f.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"], e3.default = f, e3.sanitize = l;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              t3.setAttribute(e4, !("true" === t3.getAttribute(e4)));
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = n2(23), u = r(s), c = n2(107), f = r(c), h = 0, p = function() {
              function t3(e4) {
                var n3 = this;
                o(this, t3), this.select = e4, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                  n3.togglePicker();
                }), this.label.addEventListener("keydown", function(t4) {
                  switch (t4.keyCode) {
                    case u.default.keys.ENTER:
                      n3.togglePicker();
                      break;
                    case u.default.keys.ESCAPE:
                      n3.escape(), t4.preventDefault();
                  }
                }), this.select.addEventListener("change", this.update.bind(this));
              }
              return a(t3, [{ key: "togglePicker", value: function() {
                this.container.classList.toggle("ql-expanded"), i(this.label, "aria-expanded"), i(this.options, "aria-hidden");
              } }, { key: "buildItem", value: function(t4) {
                var e4 = this, n3 = document.createElement("span");
                return n3.tabIndex = "0", n3.setAttribute("role", "button"), n3.classList.add("ql-picker-item"), t4.hasAttribute("value") && n3.setAttribute("data-value", t4.getAttribute("value")), t4.textContent && n3.setAttribute("data-label", t4.textContent), n3.addEventListener("click", function() {
                  e4.selectItem(n3, true);
                }), n3.addEventListener("keydown", function(t5) {
                  switch (t5.keyCode) {
                    case u.default.keys.ENTER:
                      e4.selectItem(n3, true), t5.preventDefault();
                      break;
                    case u.default.keys.ESCAPE:
                      e4.escape(), t5.preventDefault();
                  }
                }), n3;
              } }, { key: "buildLabel", value: function() {
                var t4 = document.createElement("span");
                return t4.classList.add("ql-picker-label"), t4.innerHTML = f.default, t4.tabIndex = "0", t4.setAttribute("role", "button"), t4.setAttribute("aria-expanded", "false"), this.container.appendChild(t4), t4;
              } }, { key: "buildOptions", value: function() {
                var t4 = this, e4 = document.createElement("span");
                e4.classList.add("ql-picker-options"), e4.setAttribute("aria-hidden", "true"), e4.tabIndex = "-1", e4.id = "ql-picker-options-" + h, h += 1, this.label.setAttribute("aria-controls", e4.id), this.options = e4, [].slice.call(this.select.options).forEach(function(n3) {
                  var r2 = t4.buildItem(n3);
                  e4.appendChild(r2), true === n3.selected && t4.selectItem(r2);
                }), this.container.appendChild(e4);
              } }, { key: "buildPicker", value: function() {
                var t4 = this;
                [].slice.call(this.select.attributes).forEach(function(e4) {
                  t4.container.setAttribute(e4.name, e4.value);
                }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
              } }, { key: "escape", value: function() {
                var t4 = this;
                this.close(), setTimeout(function() {
                  return t4.label.focus();
                }, 1);
              } }, { key: "close", value: function() {
                this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
              } }, { key: "selectItem", value: function(t4) {
                var e4 = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], n3 = this.container.querySelector(".ql-selected");
                if (t4 !== n3 && (null != n3 && n3.classList.remove("ql-selected"), null != t4 && (t4.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(t4.parentNode.children, t4), t4.hasAttribute("data-value") ? this.label.setAttribute("data-value", t4.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t4.hasAttribute("data-label") ? this.label.setAttribute("data-label", t4.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e4))) {
                  if ("function" == typeof Event) this.select.dispatchEvent(new Event("change"));
                  else if ("object" === ("undefined" == typeof Event ? "undefined" : l(Event))) {
                    var r2 = document.createEvent("Event");
                    r2.initEvent("change", true, true), this.select.dispatchEvent(r2);
                  }
                  this.close();
                }
              } }, { key: "update", value: function() {
                var t4 = void 0;
                if (this.select.selectedIndex > -1) {
                  var e4 = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                  t4 = this.select.options[this.select.selectedIndex], this.selectItem(e4);
                } else this.selectItem(null);
                var n3 = null != t4 && t4 !== this.select.querySelector("option[selected]");
                this.label.classList.toggle("ql-active", n3);
              } }]), t3;
            }();
            e3.default = p;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(0), i = r(o), l = n2(5), a = r(l), s = n2(4), u = r(s), c = n2(16), f = r(c), h = n2(25), p = r(h), d = n2(24), y = r(d), v = n2(35), b = r(v), g = n2(6), m = r(g), _ = n2(22), O = r(_), w = n2(7), x = r(w), E = n2(55), k = r(E), A = n2(42), j = r(A), N = n2(23), T = r(N);
            a.default.register({ "blots/block": u.default, "blots/block/embed": s.BlockEmbed, "blots/break": f.default, "blots/container": p.default, "blots/cursor": y.default, "blots/embed": b.default, "blots/inline": m.default, "blots/scroll": O.default, "blots/text": x.default, "modules/clipboard": k.default, "modules/history": j.default, "modules/keyboard": T.default }), i.default.register(u.default, f.default, y.default, m.default, O.default, x.default), e3.default = a.default;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true });
            var r = n2(1), o = function() {
              function t3(t4) {
                this.domNode = t4, this.domNode[r.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(t3.prototype, "statics", { get: function() {
                return this.constructor;
              }, enumerable: true, configurable: true }), t3.create = function(t4) {
                if (null == this.tagName) throw new r.ParchmentError("Blot definition missing tagName");
                var e4;
                return Array.isArray(this.tagName) ? ("string" == typeof t4 && (t4 = t4.toUpperCase(), parseInt(t4).toString() === t4 && (t4 = parseInt(t4))), e4 = "number" == typeof t4 ? document.createElement(this.tagName[t4 - 1]) : this.tagName.indexOf(t4) > -1 ? document.createElement(t4) : document.createElement(this.tagName[0])) : e4 = document.createElement(this.tagName), this.className && e4.classList.add(this.className), e4;
              }, t3.prototype.attach = function() {
                null != this.parent && (this.scroll = this.parent.scroll);
              }, t3.prototype.clone = function() {
                var t4 = this.domNode.cloneNode(false);
                return r.create(t4);
              }, t3.prototype.detach = function() {
                null != this.parent && this.parent.removeChild(this), delete this.domNode[r.DATA_KEY];
              }, t3.prototype.deleteAt = function(t4, e4) {
                this.isolate(t4, e4).remove();
              }, t3.prototype.formatAt = function(t4, e4, n3, o2) {
                var i = this.isolate(t4, e4);
                if (null != r.query(n3, r.Scope.BLOT) && o2) i.wrap(n3, o2);
                else if (null != r.query(n3, r.Scope.ATTRIBUTE)) {
                  var l = r.create(this.statics.scope);
                  i.wrap(l), l.format(n3, o2);
                }
              }, t3.prototype.insertAt = function(t4, e4, n3) {
                var o2 = null == n3 ? r.create("text", e4) : r.create(e4, n3), i = this.split(t4);
                this.parent.insertBefore(o2, i);
              }, t3.prototype.insertInto = function(t4, e4) {
                void 0 === e4 && (e4 = null), null != this.parent && this.parent.children.remove(this);
                var n3 = null;
                t4.children.insertBefore(this, e4), null != e4 && (n3 = e4.domNode), this.domNode.parentNode == t4.domNode && this.domNode.nextSibling == n3 || t4.domNode.insertBefore(this.domNode, n3), this.parent = t4, this.attach();
              }, t3.prototype.isolate = function(t4, e4) {
                var n3 = this.split(t4);
                return n3.split(e4), n3;
              }, t3.prototype.length = function() {
                return 1;
              }, t3.prototype.offset = function(t4) {
                return void 0 === t4 && (t4 = this.parent), null == this.parent || this == t4 ? 0 : this.parent.children.offset(this) + this.parent.offset(t4);
              }, t3.prototype.optimize = function(t4) {
                null != this.domNode[r.DATA_KEY] && delete this.domNode[r.DATA_KEY].mutations;
              }, t3.prototype.remove = function() {
                null != this.domNode.parentNode && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, t3.prototype.replace = function(t4) {
                null != t4.parent && (t4.parent.insertBefore(this, t4.next), t4.remove());
              }, t3.prototype.replaceWith = function(t4, e4) {
                var n3 = "string" == typeof t4 ? r.create(t4, e4) : t4;
                return n3.replace(this), n3;
              }, t3.prototype.split = function(t4, e4) {
                return 0 === t4 ? this : this.next;
              }, t3.prototype.update = function(t4, e4) {
              }, t3.prototype.wrap = function(t4, e4) {
                var n3 = "string" == typeof t4 ? r.create(t4, e4) : t4;
                return null != this.parent && this.parent.insertBefore(n3, this.next), n3.appendChild(this), n3;
              }, t3.blotName = "abstract", t3;
            }();
            e3.default = o;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true });
            var r = n2(12), o = n2(32), i = n2(33), l = n2(1), a = function() {
              function t3(t4) {
                this.attributes = {}, this.domNode = t4, this.build();
              }
              return t3.prototype.attribute = function(t4, e4) {
                e4 ? t4.add(this.domNode, e4) && (null != t4.value(this.domNode) ? this.attributes[t4.attrName] = t4 : delete this.attributes[t4.attrName]) : (t4.remove(this.domNode), delete this.attributes[t4.attrName]);
              }, t3.prototype.build = function() {
                var t4 = this;
                this.attributes = {};
                var e4 = r.default.keys(this.domNode), n3 = o.default.keys(this.domNode), a2 = i.default.keys(this.domNode);
                e4.concat(n3).concat(a2).forEach(function(e5) {
                  var n4 = l.query(e5, l.Scope.ATTRIBUTE);
                  n4 instanceof r.default && (t4.attributes[n4.attrName] = n4);
                });
              }, t3.prototype.copy = function(t4) {
                var e4 = this;
                Object.keys(this.attributes).forEach(function(n3) {
                  var r2 = e4.attributes[n3].value(e4.domNode);
                  t4.format(n3, r2);
                });
              }, t3.prototype.move = function(t4) {
                var e4 = this;
                this.copy(t4), Object.keys(this.attributes).forEach(function(t5) {
                  e4.attributes[t5].remove(e4.domNode);
                }), this.attributes = {};
              }, t3.prototype.values = function() {
                var t4 = this;
                return Object.keys(this.attributes).reduce(function(e4, n3) {
                  return e4[n3] = t4.attributes[n3].value(t4.domNode), e4;
                }, {});
              }, t3;
            }();
            e3.default = a;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              return (t3.getAttribute("class") || "").split(/\s+/).filter(function(t4) {
                return 0 === t4.indexOf(e4 + "-");
              });
            }
            var o = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var i = n2(12), l = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return o(e4, t3), e4.keys = function(t4) {
                return (t4.getAttribute("class") || "").split(/\s+/).map(function(t5) {
                  return t5.split("-").slice(0, -1).join("-");
                });
              }, e4.prototype.add = function(t4, e5) {
                return !!this.canAdd(t4, e5) && (this.remove(t4), t4.classList.add(this.keyName + "-" + e5), true);
              }, e4.prototype.remove = function(t4) {
                r(t4, this.keyName).forEach(function(e5) {
                  t4.classList.remove(e5);
                }), 0 === t4.classList.length && t4.removeAttribute("class");
              }, e4.prototype.value = function(t4) {
                var e5 = r(t4, this.keyName)[0] || "", n3 = e5.slice(this.keyName.length + 1);
                return this.canAdd(t4, n3) ? n3 : "";
              }, e4;
            }(i.default);
            e3.default = l;
          }, function(t2, e3, n2) {
            function r(t3) {
              var e4 = t3.split("-"), n3 = e4.slice(1).map(function(t4) {
                return t4[0].toUpperCase() + t4.slice(1);
              }).join("");
              return e4[0] + n3;
            }
            var o = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var i = n2(12), l = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return o(e4, t3), e4.keys = function(t4) {
                return (t4.getAttribute("style") || "").split(";").map(function(t5) {
                  return t5.split(":")[0].trim();
                });
              }, e4.prototype.add = function(t4, e5) {
                return !!this.canAdd(t4, e5) && (t4.style[r(this.keyName)] = e5, true);
              }, e4.prototype.remove = function(t4) {
                t4.style[r(this.keyName)] = "", t4.getAttribute("style") || t4.removeAttribute("style");
              }, e4.prototype.value = function(t4) {
                var e5 = t4.style[r(this.keyName)];
                return this.canAdd(t4, e5) ? e5 : "";
              }, e4;
            }(i.default);
            e3.default = l;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), i = function() {
              function t3(e4, n3) {
                r(this, t3), this.quill = e4, this.options = n3, this.modules = {};
              }
              return o(t3, [{ key: "init", value: function() {
                var t4 = this;
                Object.keys(this.options.modules).forEach(function(e4) {
                  null == t4.modules[e4] && t4.addModule(e4);
                });
              } }, { key: "addModule", value: function(t4) {
                var e4 = this.quill.constructor.import("modules/" + t4);
                return this.modules[t4] = new e4(this.quill, this.options.modules[t4] || {}), this.modules[t4];
              } }]), t3;
            }();
            i.DEFAULTS = { modules: {} }, i.themes = { default: i }, e3.default = i;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(0), c = r(u), f = n2(7), h = r(f), p = "\uFEFF", d = function(t3) {
              function e4(t4) {
                o(this, e4);
                var n3 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return n3.contentNode = document.createElement("span"), n3.contentNode.setAttribute("contenteditable", false), [].slice.call(n3.domNode.childNodes).forEach(function(t5) {
                  n3.contentNode.appendChild(t5);
                }), n3.leftGuard = document.createTextNode(p), n3.rightGuard = document.createTextNode(p), n3.domNode.appendChild(n3.leftGuard), n3.domNode.appendChild(n3.contentNode), n3.domNode.appendChild(n3.rightGuard), n3;
              }
              return l(e4, t3), a(e4, [{ key: "index", value: function(t4, n3) {
                return t4 === this.leftGuard ? 0 : t4 === this.rightGuard ? 1 : s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "index", this).call(this, t4, n3);
              } }, { key: "restore", value: function(t4) {
                var e5 = void 0, n3 = void 0, r2 = t4.data.split(p).join("");
                if (t4 === this.leftGuard) if (this.prev instanceof h.default) {
                  var o2 = this.prev.length();
                  this.prev.insertAt(o2, r2), e5 = { startNode: this.prev.domNode, startOffset: o2 + r2.length };
                } else n3 = document.createTextNode(r2), this.parent.insertBefore(c.default.create(n3), this), e5 = { startNode: n3, startOffset: r2.length };
                else t4 === this.rightGuard && (this.next instanceof h.default ? (this.next.insertAt(0, r2), e5 = { startNode: this.next.domNode, startOffset: r2.length }) : (n3 = document.createTextNode(r2), this.parent.insertBefore(c.default.create(n3), this.next), e5 = { startNode: n3, startOffset: r2.length }));
                return t4.data = p, e5;
              } }, { key: "update", value: function(t4, e5) {
                var n3 = this;
                t4.forEach(function(t5) {
                  if ("characterData" === t5.type && (t5.target === n3.leftGuard || t5.target === n3.rightGuard)) {
                    var r2 = n3.restore(t5.target);
                    r2 && (e5.range = r2);
                  }
                });
              } }]), e4;
            }(c.default.Embed);
            e3.default = d;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true }), e3.AlignStyle = e3.AlignClass = e3.AlignAttribute = void 0;
            var r = n2(0), o = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(r), i = { scope: o.default.Scope.BLOCK, whitelist: ["right", "center", "justify"] }, l = new o.default.Attributor.Attribute("align", "align", i), a = new o.default.Attributor.Class("align", "ql-align", i), s = new o.default.Attributor.Style("align", "text-align", i);
            e3.AlignAttribute = l, e3.AlignClass = a, e3.AlignStyle = s;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true }), e3.BackgroundStyle = e3.BackgroundClass = void 0;
            var r = n2(0), o = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(r), i = n2(26), l = new o.default.Attributor.Class("background", "ql-bg", { scope: o.default.Scope.INLINE }), a = new i.ColorAttributor("background", "background-color", { scope: o.default.Scope.INLINE });
            e3.BackgroundClass = l, e3.BackgroundStyle = a;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true }), e3.DirectionStyle = e3.DirectionClass = e3.DirectionAttribute = void 0;
            var r = n2(0), o = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(r), i = { scope: o.default.Scope.BLOCK, whitelist: ["rtl"] }, l = new o.default.Attributor.Attribute("direction", "dir", i), a = new o.default.Attributor.Class("direction", "ql-direction", i), s = new o.default.Attributor.Style("direction", "direction", i);
            e3.DirectionAttribute = l, e3.DirectionClass = a, e3.DirectionStyle = s;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.FontClass = e3.FontStyle = void 0;
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(0), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = { scope: u.default.Scope.INLINE, whitelist: ["serif", "monospace"] }, f = new u.default.Attributor.Class("font", "ql-font", c), h = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "value", value: function(t4) {
                return a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "value", this).call(this, t4).replace(/["']/g, "");
              } }]), e4;
            }(u.default.Attributor.Style), p = new h("font", "font-family", c);
            e3.FontStyle = p, e3.FontClass = f;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true }), e3.SizeStyle = e3.SizeClass = void 0;
            var r = n2(0), o = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(r), i = new o.default.Attributor.Class("size", "ql-size", { scope: o.default.Scope.INLINE, whitelist: ["small", "large", "huge"] }), l = new o.default.Attributor.Style("size", "font-size", { scope: o.default.Scope.INLINE, whitelist: ["10px", "18px", "32px"] });
            e3.SizeClass = i, e3.SizeStyle = l;
          }, function(t2, e3, n2) {
            t2.exports = { align: { "": n2(76), center: n2(77), right: n2(78), justify: n2(79) }, background: n2(80), blockquote: n2(81), bold: n2(82), clean: n2(83), code: n2(58), "code-block": n2(58), color: n2(84), direction: { "": n2(85), rtl: n2(86) }, float: { center: n2(87), full: n2(88), left: n2(89), right: n2(90) }, formula: n2(91), header: { 1: n2(92), 2: n2(93) }, italic: n2(94), image: n2(95), indent: { "+1": n2(96), "-1": n2(97) }, link: n2(98), list: { ordered: n2(99), bullet: n2(100), check: n2(101) }, script: { sub: n2(102), super: n2(103) }, strike: n2(104), underline: n2(105), video: n2(106) };
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function a(t3) {
              var e4 = t3.ops[t3.ops.length - 1];
              return null != e4 && (null != e4.insert ? "string" == typeof e4.insert && e4.insert.endsWith("\n") : null != e4.attributes && Object.keys(e4.attributes).some(function(t4) {
                return null != f.default.query(t4, f.default.Scope.BLOCK);
              }));
            }
            function s(t3) {
              var e4 = t3.reduce(function(t4, e5) {
                return t4 += e5.delete || 0;
              }, 0), n3 = t3.length() - e4;
              return a(t3) && (n3 -= 1), n3;
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.getLastChangeIndex = e3.default = void 0;
            var u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), c = n2(0), f = r(c), h = n2(5), p = r(h), d = n2(9), y = r(d), v = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.lastRecorded = 0, r2.ignoreChange = false, r2.clear(), r2.quill.on(p.default.events.EDITOR_CHANGE, function(t5, e5, n4, o2) {
                  t5 !== p.default.events.TEXT_CHANGE || r2.ignoreChange || (r2.options.userOnly && o2 !== p.default.sources.USER ? r2.transform(e5) : r2.record(e5, n4));
                }), r2.quill.keyboard.addBinding({ key: "Z", shortKey: true }, r2.undo.bind(r2)), r2.quill.keyboard.addBinding({ key: "Z", shortKey: true, shiftKey: true }, r2.redo.bind(r2)), /Win/i.test(navigator.platform) && r2.quill.keyboard.addBinding({ key: "Y", shortKey: true }, r2.redo.bind(r2)), r2;
              }
              return l(e4, t3), u(e4, [{ key: "change", value: function(t4, e5) {
                if (0 !== this.stack[t4].length) {
                  var n3 = this.stack[t4].pop();
                  this.stack[e5].push(n3), this.lastRecorded = 0, this.ignoreChange = true, this.quill.updateContents(n3[t4], p.default.sources.USER), this.ignoreChange = false;
                  var r2 = s(n3[t4]);
                  this.quill.setSelection(r2);
                }
              } }, { key: "clear", value: function() {
                this.stack = { undo: [], redo: [] };
              } }, { key: "cutoff", value: function() {
                this.lastRecorded = 0;
              } }, { key: "record", value: function(t4, e5) {
                if (0 !== t4.ops.length) {
                  this.stack.redo = [];
                  var n3 = this.quill.getContents().diff(e5), r2 = Date.now();
                  if (this.lastRecorded + this.options.delay > r2 && this.stack.undo.length > 0) {
                    var o2 = this.stack.undo.pop();
                    n3 = n3.compose(o2.undo), t4 = o2.redo.compose(t4);
                  } else this.lastRecorded = r2;
                  this.stack.undo.push({ redo: t4, undo: n3 }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
                }
              } }, { key: "redo", value: function() {
                this.change("redo", "undo");
              } }, { key: "transform", value: function(t4) {
                this.stack.undo.forEach(function(e5) {
                  e5.undo = t4.transform(e5.undo, true), e5.redo = t4.transform(e5.redo, true);
                }), this.stack.redo.forEach(function(e5) {
                  e5.undo = t4.transform(e5.undo, true), e5.redo = t4.transform(e5.redo, true);
                });
              } }, { key: "undo", value: function() {
                this.change("undo", "redo");
              } }]), e4;
            }(y.default);
            v.DEFAULTS = { delay: 1e3, maxStack: 100, userOnly: false }, e3.default = v, e3.getLastChangeIndex = s;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function a(t3) {
              var e4 = t3.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || t3.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
              return e4 ? (e4[1] || "https") + "://www.youtube.com/embed/" + e4[2] + "?showinfo=0" : (e4 = t3.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (e4[1] || "https") + "://player.vimeo.com/video/" + e4[2] + "/" : t3;
            }
            function s(t3, e4) {
              var n3 = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
              e4.forEach(function(e5) {
                var r2 = document.createElement("option");
                e5 === n3 ? r2.setAttribute("selected", "selected") : r2.setAttribute("value", e5), t3.appendChild(r2);
              });
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.BaseTooltip = void 0;
            var u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), c = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, f = n2(3), h = r(f), p = n2(2), d = r(p), y = n2(8), v = r(y), b = n2(23), g = r(b), m = n2(34), _ = r(m), O = n2(59), w = r(O), x = n2(60), E = r(x), k = n2(28), A = r(k), j = n2(61), N = r(j), T = [false, "center", "right", "justify"], S = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], P = [false, "serif", "monospace"], q = ["1", "2", "3", false], C = ["small", false, "large", "huge"], L = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3)), l2 = function e5(n4) {
                  if (!document.body.contains(t4.root)) return document.body.removeEventListener("click", e5);
                  null == r2.tooltip || r2.tooltip.root.contains(n4.target) || document.activeElement === r2.tooltip.textbox || r2.quill.hasFocus() || r2.tooltip.hide(), null != r2.pickers && r2.pickers.forEach(function(t5) {
                    t5.container.contains(n4.target) || t5.close();
                  });
                };
                return t4.emitter.listenDOM("click", document.body, l2), r2;
              }
              return l(e4, t3), u(e4, [{ key: "addModule", value: function(t4) {
                var n3 = c(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "addModule", this).call(this, t4);
                return "toolbar" === t4 && this.extendToolbar(n3), n3;
              } }, { key: "buildButtons", value: function(t4, e5) {
                t4.forEach(function(t5) {
                  (t5.getAttribute("class") || "").split(/\s+/).forEach(function(n3) {
                    if (n3.startsWith("ql-") && (n3 = n3.slice("ql-".length), null != e5[n3])) if ("direction" === n3) t5.innerHTML = e5[n3][""] + e5[n3].rtl;
                    else if ("string" == typeof e5[n3]) t5.innerHTML = e5[n3];
                    else {
                      var r2 = t5.value || "";
                      null != r2 && e5[n3][r2] && (t5.innerHTML = e5[n3][r2]);
                    }
                  });
                });
              } }, { key: "buildPickers", value: function(t4, e5) {
                var n3 = this;
                this.pickers = t4.map(function(t5) {
                  if (t5.classList.contains("ql-align")) return null == t5.querySelector("option") && s(t5, T), new E.default(t5, e5.align);
                  if (t5.classList.contains("ql-background") || t5.classList.contains("ql-color")) {
                    var n4 = t5.classList.contains("ql-background") ? "background" : "color";
                    return null == t5.querySelector("option") && s(t5, S, "background" === n4 ? "#ffffff" : "#000000"), new w.default(t5, e5[n4]);
                  }
                  return null == t5.querySelector("option") && (t5.classList.contains("ql-font") ? s(t5, P) : t5.classList.contains("ql-header") ? s(t5, q) : t5.classList.contains("ql-size") && s(t5, C)), new A.default(t5);
                });
                var r2 = function() {
                  n3.pickers.forEach(function(t5) {
                    t5.update();
                  });
                };
                this.quill.on(v.default.events.EDITOR_CHANGE, r2);
              } }]), e4;
            }(_.default);
            L.DEFAULTS = (0, h.default)(true, {}, _.default.DEFAULTS, { modules: { toolbar: { handlers: { formula: function() {
              this.quill.theme.tooltip.edit("formula");
            }, image: function() {
              var t3 = this, e4 = this.container.querySelector("input.ql-image[type=file]");
              null == e4 && (e4 = document.createElement("input"), e4.setAttribute("type", "file"), e4.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), e4.classList.add("ql-image"), e4.addEventListener("change", function() {
                if (null != e4.files && null != e4.files[0]) {
                  var n3 = new FileReader();
                  n3.onload = function(n4) {
                    var r2 = t3.quill.getSelection(true);
                    t3.quill.updateContents(new d.default().retain(r2.index).delete(r2.length).insert({ image: n4.target.result }), v.default.sources.USER), t3.quill.setSelection(r2.index + 1, v.default.sources.SILENT), e4.value = "";
                  }, n3.readAsDataURL(e4.files[0]);
                }
              }), this.container.appendChild(e4)), e4.click();
            }, video: function() {
              this.quill.theme.tooltip.edit("video");
            } } } } });
            var R = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.textbox = r2.root.querySelector('input[type="text"]'), r2.listen(), r2;
              }
              return l(e4, t3), u(e4, [{ key: "listen", value: function() {
                var t4 = this;
                this.textbox.addEventListener("keydown", function(e5) {
                  g.default.match(e5, "enter") ? (t4.save(), e5.preventDefault()) : g.default.match(e5, "escape") && (t4.cancel(), e5.preventDefault());
                });
              } }, { key: "cancel", value: function() {
                this.hide();
              } }, { key: "edit", value: function() {
                var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "link", e5 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), null != e5 ? this.textbox.value = e5 : t4 !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + t4) || ""), this.root.setAttribute("data-mode", t4);
              } }, { key: "restoreFocus", value: function() {
                var t4 = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = t4;
              } }, { key: "save", value: function() {
                var t4 = this.textbox.value;
                switch (this.root.getAttribute("data-mode")) {
                  case "link":
                    var e5 = this.quill.root.scrollTop;
                    this.linkRange ? (this.quill.formatText(this.linkRange, "link", t4, v.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", t4, v.default.sources.USER)), this.quill.root.scrollTop = e5;
                    break;
                  case "video":
                    t4 = a(t4);
                  case "formula":
                    if (!t4) break;
                    var n3 = this.quill.getSelection(true);
                    if (null != n3) {
                      var r2 = n3.index + n3.length;
                      this.quill.insertEmbed(r2, this.root.getAttribute("data-mode"), t4, v.default.sources.USER), "formula" === this.root.getAttribute("data-mode") && this.quill.insertText(r2 + 1, " ", v.default.sources.USER), this.quill.setSelection(r2 + 2, v.default.sources.USER);
                    }
                }
                this.textbox.value = "", this.hide();
              } }]), e4;
            }(N.default);
            e3.BaseTooltip = R, e3.default = L;
          }, function(t2, e3, n2) {
            Object.defineProperty(e3, "__esModule", { value: true });
            var r = function() {
              function t3() {
                this.head = this.tail = null, this.length = 0;
              }
              return t3.prototype.append = function() {
                for (var t4 = [], e4 = 0; e4 < arguments.length; e4++) t4[e4] = arguments[e4];
                this.insertBefore(t4[0], null), t4.length > 1 && this.append.apply(this, t4.slice(1));
              }, t3.prototype.contains = function(t4) {
                for (var e4, n3 = this.iterator(); e4 = n3(); ) if (e4 === t4) return true;
                return false;
              }, t3.prototype.insertBefore = function(t4, e4) {
                t4 && (t4.next = e4, null != e4 ? (t4.prev = e4.prev, null != e4.prev && (e4.prev.next = t4), e4.prev = t4, e4 === this.head && (this.head = t4)) : null != this.tail ? (this.tail.next = t4, t4.prev = this.tail, this.tail = t4) : (t4.prev = null, this.head = this.tail = t4), this.length += 1);
              }, t3.prototype.offset = function(t4) {
                for (var e4 = 0, n3 = this.head; null != n3; ) {
                  if (n3 === t4) return e4;
                  e4 += n3.length(), n3 = n3.next;
                }
                return -1;
              }, t3.prototype.remove = function(t4) {
                this.contains(t4) && (null != t4.prev && (t4.prev.next = t4.next), null != t4.next && (t4.next.prev = t4.prev), t4 === this.head && (this.head = t4.next), t4 === this.tail && (this.tail = t4.prev), this.length -= 1);
              }, t3.prototype.iterator = function(t4) {
                return void 0 === t4 && (t4 = this.head), function() {
                  var e4 = t4;
                  return null != t4 && (t4 = t4.next), e4;
                };
              }, t3.prototype.find = function(t4, e4) {
                void 0 === e4 && (e4 = false);
                for (var n3, r2 = this.iterator(); n3 = r2(); ) {
                  var o = n3.length();
                  if (t4 < o || e4 && t4 === o && (null == n3.next || 0 !== n3.next.length())) return [n3, t4];
                  t4 -= o;
                }
                return [null, 0];
              }, t3.prototype.forEach = function(t4) {
                for (var e4, n3 = this.iterator(); e4 = n3(); ) t4(e4);
              }, t3.prototype.forEachAt = function(t4, e4, n3) {
                if (!(e4 <= 0)) for (var r2, o = this.find(t4), i = o[0], l = o[1], a = t4 - l, s = this.iterator(i); (r2 = s()) && a < t4 + e4; ) {
                  var u = r2.length();
                  t4 > a ? n3(r2, t4 - a, Math.min(e4, a + u - t4)) : n3(r2, 0, Math.min(u, t4 + e4 - a)), a += u;
                }
              }, t3.prototype.map = function(t4) {
                return this.reduce(function(e4, n3) {
                  return e4.push(t4(n3)), e4;
                }, []);
              }, t3.prototype.reduce = function(t4, e4) {
                for (var n3, r2 = this.iterator(); n3 = r2(); ) e4 = t4(e4, n3);
                return e4;
              }, t3;
            }();
            e3.default = r;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(17), i = n2(1), l = { attributes: true, characterData: true, characterDataOldValue: true, childList: true, subtree: true }, a = function(t3) {
              function e4(e5) {
                var n3 = t3.call(this, e5) || this;
                return n3.scroll = n3, n3.observer = new MutationObserver(function(t4) {
                  n3.update(t4);
                }), n3.observer.observe(n3.domNode, l), n3.attach(), n3;
              }
              return r(e4, t3), e4.prototype.detach = function() {
                t3.prototype.detach.call(this), this.observer.disconnect();
              }, e4.prototype.deleteAt = function(e5, n3) {
                this.update(), 0 === e5 && n3 === this.length() ? this.children.forEach(function(t4) {
                  t4.remove();
                }) : t3.prototype.deleteAt.call(this, e5, n3);
              }, e4.prototype.formatAt = function(e5, n3, r2, o2) {
                this.update(), t3.prototype.formatAt.call(this, e5, n3, r2, o2);
              }, e4.prototype.insertAt = function(e5, n3, r2) {
                this.update(), t3.prototype.insertAt.call(this, e5, n3, r2);
              }, e4.prototype.optimize = function(e5, n3) {
                var r2 = this;
                void 0 === e5 && (e5 = []), void 0 === n3 && (n3 = {}), t3.prototype.optimize.call(this, n3);
                for (var l2 = [].slice.call(this.observer.takeRecords()); l2.length > 0; ) e5.push(l2.pop());
                for (var a2 = function(t4, e6) {
                  void 0 === e6 && (e6 = true), null != t4 && t4 !== r2 && null != t4.domNode.parentNode && (null == t4.domNode[i.DATA_KEY].mutations && (t4.domNode[i.DATA_KEY].mutations = []), e6 && a2(t4.parent));
                }, s = function(t4) {
                  null != t4.domNode[i.DATA_KEY] && null != t4.domNode[i.DATA_KEY].mutations && (t4 instanceof o.default && t4.children.forEach(s), t4.optimize(n3));
                }, u = e5, c = 0; u.length > 0; c += 1) {
                  if (c >= 100) throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (u.forEach(function(t4) {
                    var e6 = i.find(t4.target, true);
                    null != e6 && (e6.domNode === t4.target && ("childList" === t4.type ? (a2(i.find(t4.previousSibling, false)), [].forEach.call(t4.addedNodes, function(t5) {
                      var e7 = i.find(t5, false);
                      a2(e7, false), e7 instanceof o.default && e7.children.forEach(function(t6) {
                        a2(t6, false);
                      });
                    })) : "attributes" === t4.type && a2(e6.prev)), a2(e6));
                  }), this.children.forEach(s), u = [].slice.call(this.observer.takeRecords()), l2 = u.slice(); l2.length > 0; ) e5.push(l2.pop());
                }
              }, e4.prototype.update = function(e5, n3) {
                var r2 = this;
                void 0 === n3 && (n3 = {}), e5 = e5 || this.observer.takeRecords(), e5.map(function(t4) {
                  var e6 = i.find(t4.target, true);
                  return null == e6 ? null : null == e6.domNode[i.DATA_KEY].mutations ? (e6.domNode[i.DATA_KEY].mutations = [t4], e6) : (e6.domNode[i.DATA_KEY].mutations.push(t4), null);
                }).forEach(function(t4) {
                  null != t4 && t4 !== r2 && null != t4.domNode[i.DATA_KEY] && t4.update(t4.domNode[i.DATA_KEY].mutations || [], n3);
                }), null != this.domNode[i.DATA_KEY].mutations && t3.prototype.update.call(this, this.domNode[i.DATA_KEY].mutations, n3), this.optimize(e5, n3);
              }, e4.blotName = "scroll", e4.defaultChild = "block", e4.scope = i.Scope.BLOCK_BLOT, e4.tagName = "DIV", e4;
            }(o.default);
            e3.default = a;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (Object.keys(t3).length !== Object.keys(e4).length) return false;
              for (var n3 in t3) if (t3[n3] !== e4[n3]) return false;
              return true;
            }
            var o = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var i = n2(18), l = n2(1), a = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return o(e4, t3), e4.formats = function(n3) {
                if (n3.tagName !== e4.tagName) return t3.formats.call(this, n3);
              }, e4.prototype.format = function(n3, r2) {
                var o2 = this;
                n3 !== this.statics.blotName || r2 ? t3.prototype.format.call(this, n3, r2) : (this.children.forEach(function(t4) {
                  t4 instanceof i.default || (t4 = t4.wrap(e4.blotName, true)), o2.attributes.copy(t4);
                }), this.unwrap());
              }, e4.prototype.formatAt = function(e5, n3, r2, o2) {
                if (null != this.formats()[r2] || l.query(r2, l.Scope.ATTRIBUTE)) {
                  this.isolate(e5, n3).format(r2, o2);
                } else t3.prototype.formatAt.call(this, e5, n3, r2, o2);
              }, e4.prototype.optimize = function(n3) {
                t3.prototype.optimize.call(this, n3);
                var o2 = this.formats();
                if (0 === Object.keys(o2).length) return this.unwrap();
                var i2 = this.next;
                i2 instanceof e4 && i2.prev === this && r(o2, i2.formats()) && (i2.moveChildren(this), i2.remove());
              }, e4.blotName = "inline", e4.scope = l.Scope.INLINE_BLOT, e4.tagName = "SPAN", e4;
            }(i.default);
            e3.default = a;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(18), i = n2(1), l = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return r(e4, t3), e4.formats = function(n3) {
                var r2 = i.query(e4.blotName).tagName;
                if (n3.tagName !== r2) return t3.formats.call(this, n3);
              }, e4.prototype.format = function(n3, r2) {
                null != i.query(n3, i.Scope.BLOCK) && (n3 !== this.statics.blotName || r2 ? t3.prototype.format.call(this, n3, r2) : this.replaceWith(e4.blotName));
              }, e4.prototype.formatAt = function(e5, n3, r2, o2) {
                null != i.query(r2, i.Scope.BLOCK) ? this.format(r2, o2) : t3.prototype.formatAt.call(this, e5, n3, r2, o2);
              }, e4.prototype.insertAt = function(e5, n3, r2) {
                if (null == r2 || null != i.query(n3, i.Scope.INLINE)) t3.prototype.insertAt.call(this, e5, n3, r2);
                else {
                  var o2 = this.split(e5), l2 = i.create(n3, r2);
                  o2.parent.insertBefore(l2, o2);
                }
              }, e4.prototype.update = function(e5, n3) {
                navigator.userAgent.match(/Trident/) ? this.build() : t3.prototype.update.call(this, e5, n3);
              }, e4.blotName = "block", e4.scope = i.Scope.BLOCK_BLOT, e4.tagName = "P", e4;
            }(o.default);
            e3.default = l;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(19), i = function(t3) {
              function e4() {
                return null !== t3 && t3.apply(this, arguments) || this;
              }
              return r(e4, t3), e4.formats = function(t4) {
              }, e4.prototype.format = function(e5, n3) {
                t3.prototype.formatAt.call(this, 0, this.length(), e5, n3);
              }, e4.prototype.formatAt = function(e5, n3, r2, o2) {
                0 === e5 && n3 === this.length() ? this.format(r2, o2) : t3.prototype.formatAt.call(this, e5, n3, r2, o2);
              }, e4.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, e4;
            }(o.default);
            e3.default = i;
          }, function(t2, e3, n2) {
            var r = this && this.__extends || function() {
              var t3 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
                t4.__proto__ = e4;
              } || function(t4, e4) {
                for (var n3 in e4) e4.hasOwnProperty(n3) && (t4[n3] = e4[n3]);
              };
              return function(e4, n3) {
                function r2() {
                  this.constructor = e4;
                }
                t3(e4, n3), e4.prototype = null === n3 ? Object.create(n3) : (r2.prototype = n3.prototype, new r2());
              };
            }();
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(19), i = n2(1), l = function(t3) {
              function e4(e5) {
                var n3 = t3.call(this, e5) || this;
                return n3.text = n3.statics.value(n3.domNode), n3;
              }
              return r(e4, t3), e4.create = function(t4) {
                return document.createTextNode(t4);
              }, e4.value = function(t4) {
                var e5 = t4.data;
                return e5.normalize && (e5 = e5.normalize()), e5;
              }, e4.prototype.deleteAt = function(t4, e5) {
                this.domNode.data = this.text = this.text.slice(0, t4) + this.text.slice(t4 + e5);
              }, e4.prototype.index = function(t4, e5) {
                return this.domNode === t4 ? e5 : -1;
              }, e4.prototype.insertAt = function(e5, n3, r2) {
                null == r2 ? (this.text = this.text.slice(0, e5) + n3 + this.text.slice(e5), this.domNode.data = this.text) : t3.prototype.insertAt.call(this, e5, n3, r2);
              }, e4.prototype.length = function() {
                return this.text.length;
              }, e4.prototype.optimize = function(n3) {
                t3.prototype.optimize.call(this, n3), this.text = this.statics.value(this.domNode), 0 === this.text.length ? this.remove() : this.next instanceof e4 && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, e4.prototype.position = function(t4, e5) {
                return [this.domNode, t4];
              }, e4.prototype.split = function(t4, e5) {
                if (void 0 === e5 && (e5 = false), !e5) {
                  if (0 === t4) return this;
                  if (t4 === this.length()) return this.next;
                }
                var n3 = i.create(this.domNode.splitText(t4));
                return this.parent.insertBefore(n3, this.next), this.text = this.statics.value(this.domNode), n3;
              }, e4.prototype.update = function(t4, e5) {
                var n3 = this;
                t4.some(function(t5) {
                  return "characterData" === t5.type && t5.target === n3.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, e4.prototype.value = function() {
                return this.text;
              }, e4.blotName = "text", e4.scope = i.Scope.INLINE_BLOT, e4;
            }(o.default);
            e3.default = l;
          }, function(t2, e3, n2) {
            var r = document.createElement("div");
            if (r.classList.toggle("test-class", false), r.classList.contains("test-class")) {
              var o = DOMTokenList.prototype.toggle;
              DOMTokenList.prototype.toggle = function(t3, e4) {
                return arguments.length > 1 && !this.contains(t3) == !e4 ? e4 : o.call(this, t3);
              };
            }
            String.prototype.startsWith || (String.prototype.startsWith = function(t3, e4) {
              return e4 = e4 || 0, this.substr(e4, t3.length) === t3;
            }), String.prototype.endsWith || (String.prototype.endsWith = function(t3, e4) {
              var n3 = this.toString();
              ("number" != typeof e4 || !isFinite(e4) || Math.floor(e4) !== e4 || e4 > n3.length) && (e4 = n3.length), e4 -= t3.length;
              var r2 = n3.indexOf(t3, e4);
              return -1 !== r2 && r2 === e4;
            }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", { value: function(t3) {
              if (null === this) throw new TypeError("Array.prototype.find called on null or undefined");
              if ("function" != typeof t3) throw new TypeError("predicate must be a function");
              for (var e4, n3 = Object(this), r2 = n3.length >>> 0, o2 = arguments[1], i = 0; i < r2; i++) if (e4 = n3[i], t3.call(o2, e4, i, n3)) return e4;
            } }), document.addEventListener("DOMContentLoaded", function() {
              document.execCommand("enableObjectResizing", false, false), document.execCommand("autoUrlDetect", false, false);
            });
          }, function(t2, e3) {
            function n2(t3, e4, n3) {
              if (t3 == e4) return t3 ? [[v, t3]] : [];
              (n3 < 0 || t3.length < n3) && (n3 = null);
              var o2 = l(t3, e4), i2 = t3.substring(0, o2);
              t3 = t3.substring(o2), e4 = e4.substring(o2), o2 = a(t3, e4);
              var s2 = t3.substring(t3.length - o2);
              t3 = t3.substring(0, t3.length - o2), e4 = e4.substring(0, e4.length - o2);
              var c2 = r(t3, e4);
              return i2 && c2.unshift([v, i2]), s2 && c2.push([v, s2]), u(c2), null != n3 && (c2 = f(c2, n3)), c2 = h(c2);
            }
            function r(t3, e4) {
              var r2;
              if (!t3) return [[y, e4]];
              if (!e4) return [[d, t3]];
              var i2 = t3.length > e4.length ? t3 : e4, l2 = t3.length > e4.length ? e4 : t3, a2 = i2.indexOf(l2);
              if (-1 != a2) return r2 = [[y, i2.substring(0, a2)], [v, l2], [y, i2.substring(a2 + l2.length)]], t3.length > e4.length && (r2[0][0] = r2[2][0] = d), r2;
              if (1 == l2.length) return [[d, t3], [y, e4]];
              var u2 = s(t3, e4);
              if (u2) {
                var c2 = u2[0], f2 = u2[1], h2 = u2[2], p2 = u2[3], b2 = u2[4], g = n2(c2, h2), m = n2(f2, p2);
                return g.concat([[v, b2]], m);
              }
              return o(t3, e4);
            }
            function o(t3, e4) {
              for (var n3 = t3.length, r2 = e4.length, o2 = Math.ceil((n3 + r2) / 2), l2 = o2, a2 = 2 * o2, s2 = new Array(a2), u2 = new Array(a2), c2 = 0; c2 < a2; c2++) s2[c2] = -1, u2[c2] = -1;
              s2[l2 + 1] = 0, u2[l2 + 1] = 0;
              for (var f2 = n3 - r2, h2 = f2 % 2 != 0, p2 = 0, v2 = 0, b2 = 0, g = 0, m = 0; m < o2; m++) {
                for (var _ = -m + p2; _ <= m - v2; _ += 2) {
                  var O, w = l2 + _;
                  O = _ == -m || _ != m && s2[w - 1] < s2[w + 1] ? s2[w + 1] : s2[w - 1] + 1;
                  for (var x = O - _; O < n3 && x < r2 && t3.charAt(O) == e4.charAt(x); ) O++, x++;
                  if (s2[w] = O, O > n3) v2 += 2;
                  else if (x > r2) p2 += 2;
                  else if (h2) {
                    var E = l2 + f2 - _;
                    if (E >= 0 && E < a2 && -1 != u2[E]) {
                      var k = n3 - u2[E];
                      if (O >= k) return i(t3, e4, O, x);
                    }
                  }
                }
                for (var A = -m + b2; A <= m - g; A += 2) {
                  var k, E = l2 + A;
                  k = A == -m || A != m && u2[E - 1] < u2[E + 1] ? u2[E + 1] : u2[E - 1] + 1;
                  for (var j = k - A; k < n3 && j < r2 && t3.charAt(n3 - k - 1) == e4.charAt(r2 - j - 1); ) k++, j++;
                  if (u2[E] = k, k > n3) g += 2;
                  else if (j > r2) b2 += 2;
                  else if (!h2) {
                    var w = l2 + f2 - A;
                    if (w >= 0 && w < a2 && -1 != s2[w]) {
                      var O = s2[w], x = l2 + O - w;
                      if (k = n3 - k, O >= k) return i(t3, e4, O, x);
                    }
                  }
                }
              }
              return [[d, t3], [y, e4]];
            }
            function i(t3, e4, r2, o2) {
              var i2 = t3.substring(0, r2), l2 = e4.substring(0, o2), a2 = t3.substring(r2), s2 = e4.substring(o2), u2 = n2(i2, l2), c2 = n2(a2, s2);
              return u2.concat(c2);
            }
            function l(t3, e4) {
              if (!t3 || !e4 || t3.charAt(0) != e4.charAt(0)) return 0;
              for (var n3 = 0, r2 = Math.min(t3.length, e4.length), o2 = r2, i2 = 0; n3 < o2; ) t3.substring(i2, o2) == e4.substring(i2, o2) ? (n3 = o2, i2 = n3) : r2 = o2, o2 = Math.floor((r2 - n3) / 2 + n3);
              return o2;
            }
            function a(t3, e4) {
              if (!t3 || !e4 || t3.charAt(t3.length - 1) != e4.charAt(e4.length - 1)) return 0;
              for (var n3 = 0, r2 = Math.min(t3.length, e4.length), o2 = r2, i2 = 0; n3 < o2; ) t3.substring(t3.length - o2, t3.length - i2) == e4.substring(e4.length - o2, e4.length - i2) ? (n3 = o2, i2 = n3) : r2 = o2, o2 = Math.floor((r2 - n3) / 2 + n3);
              return o2;
            }
            function s(t3, e4) {
              function n3(t4, e5, n4) {
                for (var r3, o3, i3, s3, u3 = t4.substring(n4, n4 + Math.floor(t4.length / 4)), c3 = -1, f3 = ""; -1 != (c3 = e5.indexOf(u3, c3 + 1)); ) {
                  var h3 = l(t4.substring(n4), e5.substring(c3)), p3 = a(t4.substring(0, n4), e5.substring(0, c3));
                  f3.length < p3 + h3 && (f3 = e5.substring(c3 - p3, c3) + e5.substring(c3, c3 + h3), r3 = t4.substring(0, n4 - p3), o3 = t4.substring(n4 + h3), i3 = e5.substring(0, c3 - p3), s3 = e5.substring(c3 + h3));
                }
                return 2 * f3.length >= t4.length ? [r3, o3, i3, s3, f3] : null;
              }
              var r2 = t3.length > e4.length ? t3 : e4, o2 = t3.length > e4.length ? e4 : t3;
              if (r2.length < 4 || 2 * o2.length < r2.length) return null;
              var i2, s2 = n3(r2, o2, Math.ceil(r2.length / 4)), u2 = n3(r2, o2, Math.ceil(r2.length / 2));
              if (!s2 && !u2) return null;
              i2 = u2 ? s2 && s2[4].length > u2[4].length ? s2 : u2 : s2;
              var c2, f2, h2, p2;
              return t3.length > e4.length ? (c2 = i2[0], f2 = i2[1], h2 = i2[2], p2 = i2[3]) : (h2 = i2[0], p2 = i2[1], c2 = i2[2], f2 = i2[3]), [c2, f2, h2, p2, i2[4]];
            }
            function u(t3) {
              t3.push([v, ""]);
              for (var e4, n3 = 0, r2 = 0, o2 = 0, i2 = "", s2 = ""; n3 < t3.length; ) switch (t3[n3][0]) {
                case y:
                  o2++, s2 += t3[n3][1], n3++;
                  break;
                case d:
                  r2++, i2 += t3[n3][1], n3++;
                  break;
                case v:
                  r2 + o2 > 1 ? (0 !== r2 && 0 !== o2 && (e4 = l(s2, i2), 0 !== e4 && (n3 - r2 - o2 > 0 && t3[n3 - r2 - o2 - 1][0] == v ? t3[n3 - r2 - o2 - 1][1] += s2.substring(0, e4) : (t3.splice(0, 0, [v, s2.substring(0, e4)]), n3++), s2 = s2.substring(e4), i2 = i2.substring(e4)), 0 !== (e4 = a(s2, i2)) && (t3[n3][1] = s2.substring(s2.length - e4) + t3[n3][1], s2 = s2.substring(0, s2.length - e4), i2 = i2.substring(0, i2.length - e4))), 0 === r2 ? t3.splice(n3 - o2, r2 + o2, [y, s2]) : 0 === o2 ? t3.splice(n3 - r2, r2 + o2, [d, i2]) : t3.splice(n3 - r2 - o2, r2 + o2, [d, i2], [y, s2]), n3 = n3 - r2 - o2 + (r2 ? 1 : 0) + (o2 ? 1 : 0) + 1) : 0 !== n3 && t3[n3 - 1][0] == v ? (t3[n3 - 1][1] += t3[n3][1], t3.splice(n3, 1)) : n3++, o2 = 0, r2 = 0, i2 = "", s2 = "";
              }
              "" === t3[t3.length - 1][1] && t3.pop();
              var c2 = false;
              for (n3 = 1; n3 < t3.length - 1; ) t3[n3 - 1][0] == v && t3[n3 + 1][0] == v && (t3[n3][1].substring(t3[n3][1].length - t3[n3 - 1][1].length) == t3[n3 - 1][1] ? (t3[n3][1] = t3[n3 - 1][1] + t3[n3][1].substring(0, t3[n3][1].length - t3[n3 - 1][1].length), t3[n3 + 1][1] = t3[n3 - 1][1] + t3[n3 + 1][1], t3.splice(n3 - 1, 1), c2 = true) : t3[n3][1].substring(0, t3[n3 + 1][1].length) == t3[n3 + 1][1] && (t3[n3 - 1][1] += t3[n3 + 1][1], t3[n3][1] = t3[n3][1].substring(t3[n3 + 1][1].length) + t3[n3 + 1][1], t3.splice(n3 + 1, 1), c2 = true)), n3++;
              c2 && u(t3);
            }
            function c(t3, e4) {
              if (0 === e4) return [v, t3];
              for (var n3 = 0, r2 = 0; r2 < t3.length; r2++) {
                var o2 = t3[r2];
                if (o2[0] === d || o2[0] === v) {
                  var i2 = n3 + o2[1].length;
                  if (e4 === i2) return [r2 + 1, t3];
                  if (e4 < i2) {
                    t3 = t3.slice();
                    var l2 = e4 - n3, a2 = [o2[0], o2[1].slice(0, l2)], s2 = [o2[0], o2[1].slice(l2)];
                    return t3.splice(r2, 1, a2, s2), [r2 + 1, t3];
                  }
                  n3 = i2;
                }
              }
              throw new Error("cursor_pos is out of bounds!");
            }
            function f(t3, e4) {
              var n3 = c(t3, e4), r2 = n3[1], o2 = n3[0], i2 = r2[o2], l2 = r2[o2 + 1];
              if (null == i2) return t3;
              if (i2[0] !== v) return t3;
              if (null != l2 && i2[1] + l2[1] === l2[1] + i2[1]) return r2.splice(o2, 2, l2, i2), p(r2, o2, 2);
              if (null != l2 && 0 === l2[1].indexOf(i2[1])) {
                r2.splice(o2, 2, [l2[0], i2[1]], [0, i2[1]]);
                var a2 = l2[1].slice(i2[1].length);
                return a2.length > 0 && r2.splice(o2 + 2, 0, [l2[0], a2]), p(r2, o2, 3);
              }
              return t3;
            }
            function h(t3) {
              for (var e4 = false, n3 = function(t4) {
                return t4.charCodeAt(0) >= 56320 && t4.charCodeAt(0) <= 57343;
              }, r2 = 2; r2 < t3.length; r2 += 1) t3[r2 - 2][0] === v && function(t4) {
                return t4.charCodeAt(t4.length - 1) >= 55296 && t4.charCodeAt(t4.length - 1) <= 56319;
              }(t3[r2 - 2][1]) && t3[r2 - 1][0] === d && n3(t3[r2 - 1][1]) && t3[r2][0] === y && n3(t3[r2][1]) && (e4 = true, t3[r2 - 1][1] = t3[r2 - 2][1].slice(-1) + t3[r2 - 1][1], t3[r2][1] = t3[r2 - 2][1].slice(-1) + t3[r2][1], t3[r2 - 2][1] = t3[r2 - 2][1].slice(0, -1));
              if (!e4) return t3;
              for (var o2 = [], r2 = 0; r2 < t3.length; r2 += 1) t3[r2][1].length > 0 && o2.push(t3[r2]);
              return o2;
            }
            function p(t3, e4, n3) {
              for (var r2 = e4 + n3 - 1; r2 >= 0 && r2 >= e4 - 1; r2--) if (r2 + 1 < t3.length) {
                var o2 = t3[r2], i2 = t3[r2 + 1];
                o2[0] === i2[1] && t3.splice(r2, 2, [o2[0], o2[1] + i2[1]]);
              }
              return t3;
            }
            var d = -1, y = 1, v = 0, b = n2;
            b.INSERT = y, b.DELETE = d, b.EQUAL = v, t2.exports = b;
          }, function(t2, e3) {
            function n2(t3) {
              var e4 = [];
              for (var n3 in t3) e4.push(n3);
              return e4;
            }
            e3 = t2.exports = "function" == typeof Object.keys ? Object.keys : n2, e3.shim = n2;
          }, function(t2, e3) {
            function n2(t3) {
              return "[object Arguments]" == Object.prototype.toString.call(t3);
            }
            function r(t3) {
              return t3 && "object" == typeof t3 && "number" == typeof t3.length && Object.prototype.hasOwnProperty.call(t3, "callee") && !Object.prototype.propertyIsEnumerable.call(t3, "callee") || false;
            }
            var o = "[object Arguments]" == function() {
              return Object.prototype.toString.call(arguments);
            }();
            e3 = t2.exports = o ? n2 : r, e3.supported = n2, e3.unsupported = r;
          }, function(t2, e3) {
            function n2() {
            }
            function r(t3, e4, n3) {
              this.fn = t3, this.context = e4, this.once = n3 || false;
            }
            function o() {
              this._events = new n2(), this._eventsCount = 0;
            }
            var i = Object.prototype.hasOwnProperty, l = "~";
            Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (l = false)), o.prototype.eventNames = function() {
              var t3, e4, n3 = [];
              if (0 === this._eventsCount) return n3;
              for (e4 in t3 = this._events) i.call(t3, e4) && n3.push(l ? e4.slice(1) : e4);
              return Object.getOwnPropertySymbols ? n3.concat(Object.getOwnPropertySymbols(t3)) : n3;
            }, o.prototype.listeners = function(t3, e4) {
              var n3 = l ? l + t3 : t3, r2 = this._events[n3];
              if (e4) return !!r2;
              if (!r2) return [];
              if (r2.fn) return [r2.fn];
              for (var o2 = 0, i2 = r2.length, a = new Array(i2); o2 < i2; o2++) a[o2] = r2[o2].fn;
              return a;
            }, o.prototype.emit = function(t3, e4, n3, r2, o2, i2) {
              var a = l ? l + t3 : t3;
              if (!this._events[a]) return false;
              var s, u, c = this._events[a], f = arguments.length;
              if (c.fn) {
                switch (c.once && this.removeListener(t3, c.fn, void 0, true), f) {
                  case 1:
                    return c.fn.call(c.context), true;
                  case 2:
                    return c.fn.call(c.context, e4), true;
                  case 3:
                    return c.fn.call(c.context, e4, n3), true;
                  case 4:
                    return c.fn.call(c.context, e4, n3, r2), true;
                  case 5:
                    return c.fn.call(c.context, e4, n3, r2, o2), true;
                  case 6:
                    return c.fn.call(c.context, e4, n3, r2, o2, i2), true;
                }
                for (u = 1, s = new Array(f - 1); u < f; u++) s[u - 1] = arguments[u];
                c.fn.apply(c.context, s);
              } else {
                var h, p = c.length;
                for (u = 0; u < p; u++) switch (c[u].once && this.removeListener(t3, c[u].fn, void 0, true), f) {
                  case 1:
                    c[u].fn.call(c[u].context);
                    break;
                  case 2:
                    c[u].fn.call(c[u].context, e4);
                    break;
                  case 3:
                    c[u].fn.call(c[u].context, e4, n3);
                    break;
                  case 4:
                    c[u].fn.call(c[u].context, e4, n3, r2);
                    break;
                  default:
                    if (!s) for (h = 1, s = new Array(f - 1); h < f; h++) s[h - 1] = arguments[h];
                    c[u].fn.apply(c[u].context, s);
                }
              }
              return true;
            }, o.prototype.on = function(t3, e4, n3) {
              var o2 = new r(e4, n3 || this), i2 = l ? l + t3 : t3;
              return this._events[i2] ? this._events[i2].fn ? this._events[i2] = [this._events[i2], o2] : this._events[i2].push(o2) : (this._events[i2] = o2, this._eventsCount++), this;
            }, o.prototype.once = function(t3, e4, n3) {
              var o2 = new r(e4, n3 || this, true), i2 = l ? l + t3 : t3;
              return this._events[i2] ? this._events[i2].fn ? this._events[i2] = [this._events[i2], o2] : this._events[i2].push(o2) : (this._events[i2] = o2, this._eventsCount++), this;
            }, o.prototype.removeListener = function(t3, e4, r2, o2) {
              var i2 = l ? l + t3 : t3;
              if (!this._events[i2]) return this;
              if (!e4) return 0 == --this._eventsCount ? this._events = new n2() : delete this._events[i2], this;
              var a = this._events[i2];
              if (a.fn) a.fn !== e4 || o2 && !a.once || r2 && a.context !== r2 || (0 == --this._eventsCount ? this._events = new n2() : delete this._events[i2]);
              else {
                for (var s = 0, u = [], c = a.length; s < c; s++) (a[s].fn !== e4 || o2 && !a[s].once || r2 && a[s].context !== r2) && u.push(a[s]);
                u.length ? this._events[i2] = 1 === u.length ? u[0] : u : 0 == --this._eventsCount ? this._events = new n2() : delete this._events[i2];
              }
              return this;
            }, o.prototype.removeAllListeners = function(t3) {
              var e4;
              return t3 ? (e4 = l ? l + t3 : t3, this._events[e4] && (0 == --this._eventsCount ? this._events = new n2() : delete this._events[e4])) : (this._events = new n2(), this._eventsCount = 0), this;
            }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prototype.setMaxListeners = function() {
              return this;
            }, o.prefixed = l, o.EventEmitter = o, void 0 !== t2 && (t2.exports = o);
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function a(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function s(t3, e4, n3) {
              return "object" === (void 0 === e4 ? "undefined" : x(e4)) ? Object.keys(e4).reduce(function(t4, n4) {
                return s(t4, n4, e4[n4]);
              }, t3) : t3.reduce(function(t4, r2) {
                return r2.attributes && r2.attributes[e4] ? t4.push(r2) : t4.insert(r2.insert, (0, j.default)({}, o({}, e4, n3), r2.attributes));
              }, new T.default());
            }
            function u(t3) {
              if (t3.nodeType !== Node.ELEMENT_NODE) return {};
              return t3["__ql-computed-style"] || (t3["__ql-computed-style"] = window.getComputedStyle(t3));
            }
            function c(t3, e4) {
              for (var n3 = "", r2 = t3.ops.length - 1; r2 >= 0 && n3.length < e4.length; --r2) {
                var o2 = t3.ops[r2];
                if ("string" != typeof o2.insert) break;
                n3 = o2.insert + n3;
              }
              return n3.slice(-1 * e4.length) === e4;
            }
            function f(t3) {
              return 0 !== t3.childNodes.length && ["block", "list-item"].indexOf(u(t3).display) > -1;
            }
            function h(t3, e4, n3) {
              return t3.nodeType === t3.TEXT_NODE ? n3.reduce(function(e5, n4) {
                return n4(t3, e5);
              }, new T.default()) : t3.nodeType === t3.ELEMENT_NODE ? [].reduce.call(t3.childNodes || [], function(r2, o2) {
                var i2 = h(o2, e4, n3);
                return o2.nodeType === t3.ELEMENT_NODE && (i2 = e4.reduce(function(t4, e5) {
                  return e5(o2, t4);
                }, i2), i2 = (o2[W] || []).reduce(function(t4, e5) {
                  return e5(o2, t4);
                }, i2)), r2.concat(i2);
              }, new T.default()) : new T.default();
            }
            function p(t3, e4, n3) {
              return s(n3, t3, true);
            }
            function d(t3, e4) {
              var n3 = P.default.Attributor.Attribute.keys(t3), r2 = P.default.Attributor.Class.keys(t3), o2 = P.default.Attributor.Style.keys(t3), i2 = {};
              return n3.concat(r2).concat(o2).forEach(function(e5) {
                var n4 = P.default.query(e5, P.default.Scope.ATTRIBUTE);
                null != n4 && (i2[n4.attrName] = n4.value(t3), i2[n4.attrName]) || (n4 = G[e5], null == n4 || n4.attrName !== e5 && n4.keyName !== e5 || (i2[n4.attrName] = n4.value(t3) || void 0), null == (n4 = X2[e5]) || n4.attrName !== e5 && n4.keyName !== e5 || (n4 = X2[e5], i2[n4.attrName] = n4.value(t3) || void 0));
              }), Object.keys(i2).length > 0 && (e4 = s(e4, i2)), e4;
            }
            function y(t3, e4) {
              var n3 = P.default.query(t3);
              if (null == n3) return e4;
              if (n3.prototype instanceof P.default.Embed) {
                var r2 = {}, o2 = n3.value(t3);
                null != o2 && (r2[n3.blotName] = o2, e4 = new T.default().insert(r2, n3.formats(t3)));
              } else "function" == typeof n3.formats && (e4 = s(e4, n3.blotName, n3.formats(t3)));
              return e4;
            }
            function v(t3, e4) {
              return c(e4, "\n") || e4.insert("\n"), e4;
            }
            function b() {
              return new T.default();
            }
            function g(t3, e4) {
              var n3 = P.default.query(t3);
              if (null == n3 || "list-item" !== n3.blotName || !c(e4, "\n")) return e4;
              for (var r2 = -1, o2 = t3.parentNode; !o2.classList.contains("ql-clipboard"); ) "list" === (P.default.query(o2) || {}).blotName && (r2 += 1), o2 = o2.parentNode;
              return r2 <= 0 ? e4 : e4.compose(new T.default().retain(e4.length() - 1).retain(1, { indent: r2 }));
            }
            function m(t3, e4) {
              return c(e4, "\n") || (f(t3) || e4.length() > 0 && t3.nextSibling && f(t3.nextSibling)) && e4.insert("\n"), e4;
            }
            function _(t3, e4) {
              if (f(t3) && null != t3.nextElementSibling && !c(e4, "\n\n")) {
                var n3 = t3.offsetHeight + parseFloat(u(t3).marginTop) + parseFloat(u(t3).marginBottom);
                t3.nextElementSibling.offsetTop > t3.offsetTop + 1.5 * n3 && e4.insert("\n");
              }
              return e4;
            }
            function O(t3, e4) {
              var n3 = {}, r2 = t3.style || {};
              return r2.fontStyle && "italic" === u(t3).fontStyle && (n3.italic = true), r2.fontWeight && (u(t3).fontWeight.startsWith("bold") || parseInt(u(t3).fontWeight) >= 700) && (n3.bold = true), Object.keys(n3).length > 0 && (e4 = s(e4, n3)), parseFloat(r2.textIndent || 0) > 0 && (e4 = new T.default().insert("	").concat(e4)), e4;
            }
            function w(t3, e4) {
              var n3 = t3.data;
              if ("O:P" === t3.parentNode.tagName) return e4.insert(n3.trim());
              if (0 === n3.trim().length && t3.parentNode.classList.contains("ql-clipboard")) return e4;
              if (!u(t3.parentNode).whiteSpace.startsWith("pre")) {
                var r2 = function(t4, e5) {
                  return e5 = e5.replace(/[^\u00a0]/g, ""), e5.length < 1 && t4 ? " " : e5;
                };
                n3 = n3.replace(/\r\n/g, " ").replace(/\n/g, " "), n3 = n3.replace(/\s\s+/g, r2.bind(r2, true)), (null == t3.previousSibling && f(t3.parentNode) || null != t3.previousSibling && f(t3.previousSibling)) && (n3 = n3.replace(/^\s+/, r2.bind(r2, false))), (null == t3.nextSibling && f(t3.parentNode) || null != t3.nextSibling && f(t3.nextSibling)) && (n3 = n3.replace(/\s+$/, r2.bind(r2, false)));
              }
              return e4.insert(n3);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.matchText = e3.matchSpacing = e3.matchNewline = e3.matchBlot = e3.matchAttributor = e3.default = void 0;
            var x = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
              return typeof t3;
            } : function(t3) {
              return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
            }, E = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), k = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), A = n2(3), j = r(A), N = n2(2), T = r(N), S = n2(0), P = r(S), q = n2(5), C = r(q), L = n2(10), R = r(L), M = n2(9), B = r(M), I = n2(36), D = n2(37), U = n2(13), F = r(U), z = n2(26), H = n2(38), K = n2(39), Y = n2(40), V = (0, R.default)("quill:clipboard"), W = "__ql-matcher", Z = [[Node.TEXT_NODE, w], [Node.TEXT_NODE, m], ["br", v], [Node.ELEMENT_NODE, m], [Node.ELEMENT_NODE, y], [Node.ELEMENT_NODE, _], [Node.ELEMENT_NODE, d], [Node.ELEMENT_NODE, O], ["li", g], ["b", p.bind(p, "bold")], ["i", p.bind(p, "italic")], ["style", b]], G = [I.AlignAttribute, H.DirectionAttribute].reduce(function(t3, e4) {
              return t3[e4.keyName] = e4, t3;
            }, {}), X2 = [I.AlignStyle, D.BackgroundStyle, z.ColorStyle, H.DirectionStyle, K.FontStyle, Y.SizeStyle].reduce(function(t3, e4) {
              return t3[e4.keyName] = e4, t3;
            }, {}), $ = function(t3) {
              function e4(t4, n3) {
                i(this, e4);
                var r2 = l(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.quill.root.addEventListener("paste", r2.onPaste.bind(r2)), r2.container = r2.quill.addContainer("ql-clipboard"), r2.container.setAttribute("contenteditable", true), r2.container.setAttribute("tabindex", -1), r2.matchers = [], Z.concat(r2.options.matchers).forEach(function(t5) {
                  var e5 = E(t5, 2), o2 = e5[0], i2 = e5[1];
                  (n3.matchVisual || i2 !== _) && r2.addMatcher(o2, i2);
                }), r2;
              }
              return a(e4, t3), k(e4, [{ key: "addMatcher", value: function(t4, e5) {
                this.matchers.push([t4, e5]);
              } }, { key: "convert", value: function(t4) {
                if ("string" == typeof t4) return this.container.innerHTML = t4.replace(/\>\r?\n +\</g, "><"), this.convert();
                var e5 = this.quill.getFormat(this.quill.selection.savedRange.index);
                if (e5[F.default.blotName]) {
                  var n3 = this.container.innerText;
                  return this.container.innerHTML = "", new T.default().insert(n3, o({}, F.default.blotName, e5[F.default.blotName]));
                }
                var r2 = this.prepareMatching(), i2 = E(r2, 2), l2 = i2[0], a2 = i2[1], s2 = h(this.container, l2, a2);
                return c(s2, "\n") && null == s2.ops[s2.ops.length - 1].attributes && (s2 = s2.compose(new T.default().retain(s2.length() - 1).delete(1))), V.log("convert", this.container.innerHTML, s2), this.container.innerHTML = "", s2;
              } }, { key: "dangerouslyPasteHTML", value: function(t4, e5) {
                var n3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : C.default.sources.API;
                if ("string" == typeof t4) this.quill.setContents(this.convert(t4), e5), this.quill.setSelection(0, C.default.sources.SILENT);
                else {
                  var r2 = this.convert(e5);
                  this.quill.updateContents(new T.default().retain(t4).concat(r2), n3), this.quill.setSelection(t4 + r2.length(), C.default.sources.SILENT);
                }
              } }, { key: "onPaste", value: function(t4) {
                var e5 = this;
                if (!t4.defaultPrevented && this.quill.isEnabled()) {
                  var n3 = this.quill.getSelection(), r2 = new T.default().retain(n3.index), o2 = this.quill.scrollingContainer.scrollTop;
                  this.container.focus(), this.quill.selection.update(C.default.sources.SILENT), setTimeout(function() {
                    r2 = r2.concat(e5.convert()).delete(n3.length), e5.quill.updateContents(r2, C.default.sources.USER), e5.quill.setSelection(r2.length() - n3.length, C.default.sources.SILENT), e5.quill.scrollingContainer.scrollTop = o2, e5.quill.focus();
                  }, 1);
                }
              } }, { key: "prepareMatching", value: function() {
                var t4 = this, e5 = [], n3 = [];
                return this.matchers.forEach(function(r2) {
                  var o2 = E(r2, 2), i2 = o2[0], l2 = o2[1];
                  switch (i2) {
                    case Node.TEXT_NODE:
                      n3.push(l2);
                      break;
                    case Node.ELEMENT_NODE:
                      e5.push(l2);
                      break;
                    default:
                      [].forEach.call(t4.container.querySelectorAll(i2), function(t5) {
                        t5[W] = t5[W] || [], t5[W].push(l2);
                      });
                  }
                }), [e5, n3];
              } }]), e4;
            }(B.default);
            $.DEFAULTS = { matchers: [], matchVisual: true }, e3.default = $, e3.matchAttributor = d, e3.matchBlot = y, e3.matchNewline = m, e3.matchSpacing = _, e3.matchText = w;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(6), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "optimize", value: function(t4) {
                a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
              } }], [{ key: "create", value: function() {
                return a(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this);
              } }, { key: "formats", value: function() {
                return true;
              } }]), e4;
            }(u.default);
            c.blotName = "bold", c.tagName = ["STRONG", "B"], e3.default = c;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function a(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            function s(t3, e4, n3) {
              var r2 = document.createElement("button");
              r2.setAttribute("type", "button"), r2.classList.add("ql-" + e4), null != n3 && (r2.value = n3), t3.appendChild(r2);
            }
            function u(t3, e4) {
              Array.isArray(e4[0]) || (e4 = [e4]), e4.forEach(function(e5) {
                var n3 = document.createElement("span");
                n3.classList.add("ql-formats"), e5.forEach(function(t4) {
                  if ("string" == typeof t4) s(n3, t4);
                  else {
                    var e6 = Object.keys(t4)[0], r2 = t4[e6];
                    Array.isArray(r2) ? c(n3, e6, r2) : s(n3, e6, r2);
                  }
                }), t3.appendChild(n3);
              });
            }
            function c(t3, e4, n3) {
              var r2 = document.createElement("select");
              r2.classList.add("ql-" + e4), n3.forEach(function(t4) {
                var e5 = document.createElement("option");
                false !== t4 ? e5.setAttribute("value", t4) : e5.setAttribute("selected", "selected"), r2.appendChild(e5);
              }), t3.appendChild(r2);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.addControls = e3.default = void 0;
            var f = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), h = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), p = n2(2), d = r(p), y = n2(0), v = r(y), b = n2(5), g = r(b), m = n2(10), _ = r(m), O = n2(9), w = r(O), x = (0, _.default)("quill:toolbar"), E = function(t3) {
              function e4(t4, n3) {
                i(this, e4);
                var r2 = l(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                if (Array.isArray(r2.options.container)) {
                  var o2 = document.createElement("div");
                  u(o2, r2.options.container), t4.container.parentNode.insertBefore(o2, t4.container), r2.container = o2;
                } else "string" == typeof r2.options.container ? r2.container = document.querySelector(r2.options.container) : r2.container = r2.options.container;
                if (!(r2.container instanceof HTMLElement)) {
                  var a2;
                  return a2 = x.error("Container required for toolbar", r2.options), l(r2, a2);
                }
                return r2.container.classList.add("ql-toolbar"), r2.controls = [], r2.handlers = {}, Object.keys(r2.options.handlers).forEach(function(t5) {
                  r2.addHandler(t5, r2.options.handlers[t5]);
                }), [].forEach.call(r2.container.querySelectorAll("button, select"), function(t5) {
                  r2.attach(t5);
                }), r2.quill.on(g.default.events.EDITOR_CHANGE, function(t5, e5) {
                  t5 === g.default.events.SELECTION_CHANGE && r2.update(e5);
                }), r2.quill.on(g.default.events.SCROLL_OPTIMIZE, function() {
                  var t5 = r2.quill.selection.getRange(), e5 = f(t5, 1), n4 = e5[0];
                  r2.update(n4);
                }), r2;
              }
              return a(e4, t3), h(e4, [{ key: "addHandler", value: function(t4, e5) {
                this.handlers[t4] = e5;
              } }, { key: "attach", value: function(t4) {
                var e5 = this, n3 = [].find.call(t4.classList, function(t5) {
                  return 0 === t5.indexOf("ql-");
                });
                if (n3) {
                  if (n3 = n3.slice("ql-".length), "BUTTON" === t4.tagName && t4.setAttribute("type", "button"), null == this.handlers[n3]) {
                    if (null != this.quill.scroll.whitelist && null == this.quill.scroll.whitelist[n3]) return void x.warn("ignoring attaching to disabled format", n3, t4);
                    if (null == v.default.query(n3)) return void x.warn("ignoring attaching to nonexistent format", n3, t4);
                  }
                  var r2 = "SELECT" === t4.tagName ? "change" : "click";
                  t4.addEventListener(r2, function(r3) {
                    var i2 = void 0;
                    if ("SELECT" === t4.tagName) {
                      if (t4.selectedIndex < 0) return;
                      var l2 = t4.options[t4.selectedIndex];
                      i2 = !l2.hasAttribute("selected") && (l2.value || false);
                    } else i2 = !t4.classList.contains("ql-active") && (t4.value || !t4.hasAttribute("value")), r3.preventDefault();
                    e5.quill.focus();
                    var a2 = e5.quill.selection.getRange(), s2 = f(a2, 1), u2 = s2[0];
                    if (null != e5.handlers[n3]) e5.handlers[n3].call(e5, i2);
                    else if (v.default.query(n3).prototype instanceof v.default.Embed) {
                      if (!(i2 = prompt("Enter " + n3))) return;
                      e5.quill.updateContents(new d.default().retain(u2.index).delete(u2.length).insert(o({}, n3, i2)), g.default.sources.USER);
                    } else e5.quill.format(n3, i2, g.default.sources.USER);
                    e5.update(u2);
                  }), this.controls.push([n3, t4]);
                }
              } }, { key: "update", value: function(t4) {
                var e5 = null == t4 ? {} : this.quill.getFormat(t4);
                this.controls.forEach(function(n3) {
                  var r2 = f(n3, 2), o2 = r2[0], i2 = r2[1];
                  if ("SELECT" === i2.tagName) {
                    var l2 = void 0;
                    if (null == t4) l2 = null;
                    else if (null == e5[o2]) l2 = i2.querySelector("option[selected]");
                    else if (!Array.isArray(e5[o2])) {
                      var a2 = e5[o2];
                      "string" == typeof a2 && (a2 = a2.replace(/\"/g, '\\"')), l2 = i2.querySelector('option[value="' + a2 + '"]');
                    }
                    null == l2 ? (i2.value = "", i2.selectedIndex = -1) : l2.selected = true;
                  } else if (null == t4) i2.classList.remove("ql-active");
                  else if (i2.hasAttribute("value")) {
                    var s2 = e5[o2] === i2.getAttribute("value") || null != e5[o2] && e5[o2].toString() === i2.getAttribute("value") || null == e5[o2] && !i2.getAttribute("value");
                    i2.classList.toggle("ql-active", s2);
                  } else i2.classList.toggle("ql-active", null != e5[o2]);
                });
              } }]), e4;
            }(w.default);
            E.DEFAULTS = {}, E.DEFAULTS = { container: null, handlers: { clean: function() {
              var t3 = this, e4 = this.quill.getSelection();
              if (null != e4) if (0 == e4.length) {
                var n3 = this.quill.getFormat();
                Object.keys(n3).forEach(function(e5) {
                  null != v.default.query(e5, v.default.Scope.INLINE) && t3.quill.format(e5, false);
                });
              } else this.quill.removeFormat(e4, g.default.sources.USER);
            }, direction: function(t3) {
              var e4 = this.quill.getFormat().align;
              "rtl" === t3 && null == e4 ? this.quill.format("align", "right", g.default.sources.USER) : t3 || "right" !== e4 || this.quill.format("align", false, g.default.sources.USER), this.quill.format("direction", t3, g.default.sources.USER);
            }, indent: function(t3) {
              var e4 = this.quill.getSelection(), n3 = this.quill.getFormat(e4), r2 = parseInt(n3.indent || 0);
              if ("+1" === t3 || "-1" === t3) {
                var o2 = "+1" === t3 ? 1 : -1;
                "rtl" === n3.direction && (o2 *= -1), this.quill.format("indent", r2 + o2, g.default.sources.USER);
              }
            }, link: function(t3) {
              true === t3 && (t3 = prompt("Enter link URL:")), this.quill.format("link", t3, g.default.sources.USER);
            }, list: function(t3) {
              var e4 = this.quill.getSelection(), n3 = this.quill.getFormat(e4);
              "check" === t3 ? "checked" === n3.list || "unchecked" === n3.list ? this.quill.format("list", false, g.default.sources.USER) : this.quill.format("list", "unchecked", g.default.sources.USER) : this.quill.format("list", t3, g.default.sources.USER);
            } } }, e3.default = E, e3.addControls = u;
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(28), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4(t4, n3) {
                r(this, e4);
                var i2 = o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return i2.label.innerHTML = n3, i2.container.classList.add("ql-color-picker"), [].slice.call(i2.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(t5) {
                  t5.classList.add("ql-primary");
                }), i2;
              }
              return i(e4, t3), l(e4, [{ key: "buildItem", value: function(t4) {
                var n3 = a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "buildItem", this).call(this, t4);
                return n3.style.backgroundColor = t4.getAttribute("value") || "", n3;
              } }, { key: "selectItem", value: function(t4, n3) {
                a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "selectItem", this).call(this, t4, n3);
                var r2 = this.label.querySelector(".ql-color-label"), o2 = t4 ? t4.getAttribute("data-value") || "" : "";
                r2 && ("line" === r2.tagName ? r2.style.stroke = o2 : r2.style.fill = o2);
              } }]), e4;
            }(u.default);
            e3.default = c;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(28), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4(t4, n3) {
                r(this, e4);
                var i2 = o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4));
                return i2.container.classList.add("ql-icon-picker"), [].forEach.call(i2.container.querySelectorAll(".ql-picker-item"), function(t5) {
                  t5.innerHTML = n3[t5.getAttribute("data-value") || ""];
                }), i2.defaultItem = i2.container.querySelector(".ql-selected"), i2.selectItem(i2.defaultItem), i2;
              }
              return i(e4, t3), l(e4, [{ key: "selectItem", value: function(t4, n3) {
                a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "selectItem", this).call(this, t4, n3), t4 = t4 || this.defaultItem, this.label.innerHTML = t4.innerHTML;
              } }]), e4;
            }(u.default);
            e3.default = c;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), i = function() {
              function t3(e4, n3) {
                var o2 = this;
                r(this, t3), this.quill = e4, this.boundsContainer = n3 || document.body, this.root = e4.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                  o2.root.style.marginTop = -1 * o2.quill.root.scrollTop + "px";
                }), this.hide();
              }
              return o(t3, [{ key: "hide", value: function() {
                this.root.classList.add("ql-hidden");
              } }, { key: "position", value: function(t4) {
                var e4 = t4.left + t4.width / 2 - this.root.offsetWidth / 2, n3 = t4.bottom + this.quill.root.scrollTop;
                this.root.style.left = e4 + "px", this.root.style.top = n3 + "px", this.root.classList.remove("ql-flip");
                var r2 = this.boundsContainer.getBoundingClientRect(), o2 = this.root.getBoundingClientRect(), i2 = 0;
                if (o2.right > r2.right && (i2 = r2.right - o2.right, this.root.style.left = e4 + i2 + "px"), o2.left < r2.left && (i2 = r2.left - o2.left, this.root.style.left = e4 + i2 + "px"), o2.bottom > r2.bottom) {
                  var l = o2.bottom - o2.top, a = t4.bottom - t4.top + l;
                  this.root.style.top = n3 - a + "px", this.root.classList.add("ql-flip");
                }
                return i2;
              } }, { key: "show", value: function() {
                this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
              } }]), t3;
            }();
            e3.default = i;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                var n3 = [], r2 = true, o2 = false, i2 = void 0;
                try {
                  for (var l2, a2 = t4[Symbol.iterator](); !(r2 = (l2 = a2.next()).done) && (n3.push(l2.value), !e4 || n3.length !== e4); r2 = true) ;
                } catch (t5) {
                  o2 = true, i2 = t5;
                } finally {
                  try {
                    !r2 && a2.return && a2.return();
                  } finally {
                    if (o2) throw i2;
                  }
                }
                return n3;
              }
              return function(e4, n3) {
                if (Array.isArray(e4)) return e4;
                if (Symbol.iterator in Object(e4)) return t3(e4, n3);
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), c = n2(3), f = r(c), h = n2(8), p = r(h), d = n2(43), y = r(d), v = n2(27), b = r(v), g = n2(15), m = n2(41), _ = r(m), O = [[{ header: ["1", "2", "3", false] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], w = function(t3) {
              function e4(t4, n3) {
                o(this, e4), null != n3.modules.toolbar && null == n3.modules.toolbar.container && (n3.modules.toolbar.container = O);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.quill.container.classList.add("ql-snow"), r2;
              }
              return l(e4, t3), u(e4, [{ key: "extendToolbar", value: function(t4) {
                t4.container.classList.add("ql-snow"), this.buildButtons([].slice.call(t4.container.querySelectorAll("button")), _.default), this.buildPickers([].slice.call(t4.container.querySelectorAll("select")), _.default), this.tooltip = new x(this.quill, this.options.bounds), t4.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: true }, function(e5, n3) {
                  t4.handlers.link.call(t4, !n3.format.link);
                });
              } }]), e4;
            }(y.default);
            w.DEFAULTS = (0, f.default)(true, {}, y.default.DEFAULTS, { modules: { toolbar: { handlers: { link: function(t3) {
              if (t3) {
                var e4 = this.quill.getSelection();
                if (null == e4 || 0 == e4.length) return;
                var n3 = this.quill.getText(e4);
                /^\S+@\S+\.\S+$/.test(n3) && 0 !== n3.indexOf("mailto:") && (n3 = "mailto:" + n3);
                this.quill.theme.tooltip.edit("link", n3);
              } else this.quill.format("link", false);
            } } } } });
            var x = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.preview = r2.root.querySelector("a.ql-preview"), r2;
              }
              return l(e4, t3), u(e4, [{ key: "listen", value: function() {
                var t4 = this;
                s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(e5) {
                  t4.root.classList.contains("ql-editing") ? t4.save() : t4.edit("link", t4.preview.textContent), e5.preventDefault();
                }), this.root.querySelector("a.ql-remove").addEventListener("click", function(e5) {
                  if (null != t4.linkRange) {
                    var n3 = t4.linkRange;
                    t4.restoreFocus(), t4.quill.formatText(n3, "link", false, p.default.sources.USER), delete t4.linkRange;
                  }
                  e5.preventDefault(), t4.hide();
                }), this.quill.on(p.default.events.SELECTION_CHANGE, function(e5, n3, r2) {
                  if (null != e5) {
                    if (0 === e5.length && r2 === p.default.sources.USER) {
                      var o2 = t4.quill.scroll.descendant(b.default, e5.index), i2 = a(o2, 2), l2 = i2[0], s2 = i2[1];
                      if (null != l2) {
                        t4.linkRange = new g.Range(e5.index - s2, l2.length());
                        var u2 = b.default.formats(l2.domNode);
                        return t4.preview.textContent = u2, t4.preview.setAttribute("href", u2), t4.show(), void t4.position(t4.quill.getBounds(t4.linkRange));
                      }
                    } else delete t4.linkRange;
                    t4.hide();
                  }
                });
              } }, { key: "show", value: function() {
                s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
              } }]), e4;
            }(d.BaseTooltip);
            x.TEMPLATE = ['<a class="ql-preview" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), e3.default = w;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var o = n2(29), i = r(o), l = n2(36), a = n2(38), s = n2(64), u = n2(65), c = r(u), f = n2(66), h = r(f), p = n2(67), d = r(p), y = n2(37), v = n2(26), b = n2(39), g = n2(40), m = n2(56), _ = r(m), O = n2(68), w = r(O), x = n2(27), E = r(x), k = n2(69), A = r(k), j = n2(70), N = r(j), T = n2(71), S = r(T), P = n2(72), q = r(P), C = n2(73), L = r(C), R = n2(13), M = r(R), B = n2(74), I = r(B), D = n2(75), U = r(D), F = n2(57), z = r(F), H = n2(41), K = r(H), Y = n2(28), V = r(Y), W = n2(59), Z = r(W), G = n2(60), X2 = r(G), $ = n2(61), Q = r($), J = n2(108), tt = r(J), et = n2(62), nt = r(et);
            i.default.register({ "attributors/attribute/direction": a.DirectionAttribute, "attributors/class/align": l.AlignClass, "attributors/class/background": y.BackgroundClass, "attributors/class/color": v.ColorClass, "attributors/class/direction": a.DirectionClass, "attributors/class/font": b.FontClass, "attributors/class/size": g.SizeClass, "attributors/style/align": l.AlignStyle, "attributors/style/background": y.BackgroundStyle, "attributors/style/color": v.ColorStyle, "attributors/style/direction": a.DirectionStyle, "attributors/style/font": b.FontStyle, "attributors/style/size": g.SizeStyle }, true), i.default.register({ "formats/align": l.AlignClass, "formats/direction": a.DirectionClass, "formats/indent": s.IndentClass, "formats/background": y.BackgroundStyle, "formats/color": v.ColorStyle, "formats/font": b.FontClass, "formats/size": g.SizeClass, "formats/blockquote": c.default, "formats/code-block": M.default, "formats/header": h.default, "formats/list": d.default, "formats/bold": _.default, "formats/code": R.Code, "formats/italic": w.default, "formats/link": E.default, "formats/script": A.default, "formats/strike": N.default, "formats/underline": S.default, "formats/image": q.default, "formats/video": L.default, "formats/list/item": p.ListItem, "modules/formula": I.default, "modules/syntax": U.default, "modules/toolbar": z.default, "themes/bubble": tt.default, "themes/snow": nt.default, "ui/icons": K.default, "ui/picker": V.default, "ui/icon-picker": X2.default, "ui/color-picker": Z.default, "ui/tooltip": Q.default }, true), e3.default = i.default;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.IndentClass = void 0;
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(0), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "add", value: function(t4, n3) {
                if ("+1" === n3 || "-1" === n3) {
                  var r2 = this.value(t4) || 0;
                  n3 = "+1" === n3 ? r2 + 1 : r2 - 1;
                }
                return 0 === n3 ? (this.remove(t4), true) : a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "add", this).call(this, t4, n3);
              } }, { key: "canAdd", value: function(t4, n3) {
                return a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "canAdd", this).call(this, t4, n3) || a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "canAdd", this).call(this, t4, parseInt(n3));
              } }, { key: "value", value: function(t4) {
                return parseInt(a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "value", this).call(this, t4)) || void 0;
              } }]), e4;
            }(u.default.Attributor.Class), f = new c("indent", "ql-indent", { scope: u.default.Scope.BLOCK, whitelist: [1, 2, 3, 4, 5, 6, 7, 8] });
            e3.IndentClass = f;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = n2(4), a = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(l), s = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), e4;
            }(a.default);
            s.blotName = "blockquote", s.tagName = "blockquote", e3.default = s;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = n2(4), s = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(a), u = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, null, [{ key: "formats", value: function(t4) {
                return this.tagName.indexOf(t4.tagName) + 1;
              } }]), e4;
            }(s.default);
            u.blotName = "header", u.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], e3.default = u;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4, n3) {
              return e4 in t3 ? Object.defineProperty(t3, e4, { value: n3, enumerable: true, configurable: true, writable: true }) : t3[e4] = n3, t3;
            }
            function i(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function l(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function a(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.ListItem = void 0;
            var s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), u = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, c = n2(0), f = r(c), h = n2(4), p = r(h), d = n2(25), y = r(d), v = function(t3) {
              function e4() {
                return i(this, e4), l(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return a(e4, t3), s(e4, [{ key: "format", value: function(t4, n3) {
                t4 !== b.blotName || n3 ? u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3) : this.replaceWith(f.default.create(this.statics.scope));
              } }, { key: "remove", value: function() {
                null == this.prev && null == this.next ? this.parent.remove() : u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "remove", this).call(this);
              } }, { key: "replaceWith", value: function(t4, n3) {
                return this.parent.isolate(this.offset(this.parent), this.length()), t4 === this.parent.statics.blotName ? (this.parent.replaceWith(t4, n3), this) : (this.parent.unwrap(), u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "replaceWith", this).call(this, t4, n3));
              } }], [{ key: "formats", value: function(t4) {
                return t4.tagName === this.tagName ? void 0 : u(e4.__proto__ || Object.getPrototypeOf(e4), "formats", this).call(this, t4);
              } }]), e4;
            }(p.default);
            v.blotName = "list-item", v.tagName = "LI";
            var b = function(t3) {
              function e4(t4) {
                i(this, e4);
                var n3 = l(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4)), r2 = function(e5) {
                  if (e5.target.parentNode === t4) {
                    var r3 = n3.statics.formats(t4), o2 = f.default.find(e5.target);
                    "checked" === r3 ? o2.format("list", "unchecked") : "unchecked" === r3 && o2.format("list", "checked");
                  }
                };
                return t4.addEventListener("touchstart", r2), t4.addEventListener("mousedown", r2), n3;
              }
              return a(e4, t3), s(e4, null, [{ key: "create", value: function(t4) {
                var n3 = "ordered" === t4 ? "OL" : "UL", r2 = u(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, n3);
                return "checked" !== t4 && "unchecked" !== t4 || r2.setAttribute("data-checked", "checked" === t4), r2;
              } }, { key: "formats", value: function(t4) {
                return "OL" === t4.tagName ? "ordered" : "UL" === t4.tagName ? t4.hasAttribute("data-checked") ? "true" === t4.getAttribute("data-checked") ? "checked" : "unchecked" : "bullet" : void 0;
              } }]), s(e4, [{ key: "format", value: function(t4, e5) {
                this.children.length > 0 && this.children.tail.format(t4, e5);
              } }, { key: "formats", value: function() {
                return o({}, this.statics.blotName, this.statics.formats(this.domNode));
              } }, { key: "insertBefore", value: function(t4, n3) {
                if (t4 instanceof v) u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "insertBefore", this).call(this, t4, n3);
                else {
                  var r2 = null == n3 ? this.length() : n3.offset(this), o2 = this.split(r2);
                  o2.parent.insertBefore(t4, o2);
                }
              } }, { key: "optimize", value: function(t4) {
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "optimize", this).call(this, t4);
                var n3 = this.next;
                null != n3 && n3.prev === this && n3.statics.blotName === this.statics.blotName && n3.domNode.tagName === this.domNode.tagName && n3.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (n3.moveChildren(this), n3.remove());
              } }, { key: "replace", value: function(t4) {
                if (t4.statics.blotName !== this.statics.blotName) {
                  var n3 = f.default.create(this.statics.defaultChild);
                  t4.moveChildren(n3), this.appendChild(n3);
                }
                u(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "replace", this).call(this, t4);
              } }]), e4;
            }(y.default);
            b.blotName = "list", b.scope = f.default.Scope.BLOCK_BLOT, b.tagName = ["OL", "UL"], b.defaultChild = "list-item", b.allowedChildren = [v], e3.ListItem = v, e3.default = b;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = n2(56), a = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(l), s = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), e4;
            }(a.default);
            s.blotName = "italic", s.tagName = ["EM", "I"], e3.default = s;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(6), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, null, [{ key: "create", value: function(t4) {
                return "super" === t4 ? document.createElement("sup") : "sub" === t4 ? document.createElement("sub") : a(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
              } }, { key: "formats", value: function(t4) {
                return "SUB" === t4.tagName ? "sub" : "SUP" === t4.tagName ? "super" : void 0;
              } }]), e4;
            }(u.default);
            c.blotName = "script", c.tagName = ["SUB", "SUP"], e3.default = c;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = n2(6), a = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(l), s = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), e4;
            }(a.default);
            s.blotName = "strike", s.tagName = "S", e3.default = s;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = n2(6), a = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(l), s = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), e4;
            }(a.default);
            s.blotName = "underline", s.tagName = "U", e3.default = s;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(0), u = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(s), c = n2(27), f = ["alt", "height", "width"], h = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "format", value: function(t4, n3) {
                f.indexOf(t4) > -1 ? n3 ? this.domNode.setAttribute(t4, n3) : this.domNode.removeAttribute(t4) : a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3);
              } }], [{ key: "create", value: function(t4) {
                var n3 = a(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
                return "string" == typeof t4 && n3.setAttribute("src", this.sanitize(t4)), n3;
              } }, { key: "formats", value: function(t4) {
                return f.reduce(function(e5, n3) {
                  return t4.hasAttribute(n3) && (e5[n3] = t4.getAttribute(n3)), e5;
                }, {});
              } }, { key: "match", value: function(t4) {
                return /\.(jpe?g|gif|png)$/.test(t4) || /^data:image\/.+;base64/.test(t4);
              } }, { key: "sanitize", value: function(t4) {
                return (0, c.sanitize)(t4, ["http", "https", "data"]) ? t4 : "//:0";
              } }, { key: "value", value: function(t4) {
                return t4.getAttribute("src");
              } }]), e4;
            }(u.default.Embed);
            h.blotName = "image", h.tagName = "IMG", e3.default = h;
          }, function(t2, e3, n2) {
            function r(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function o(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function i(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true });
            var l = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = n2(4), u = n2(27), c = function(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }(u), f = ["height", "width"], h = function(t3) {
              function e4() {
                return r(this, e4), o(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return i(e4, t3), l(e4, [{ key: "format", value: function(t4, n3) {
                f.indexOf(t4) > -1 ? n3 ? this.domNode.setAttribute(t4, n3) : this.domNode.removeAttribute(t4) : a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "format", this).call(this, t4, n3);
              } }], [{ key: "create", value: function(t4) {
                var n3 = a(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
                return n3.setAttribute("frameborder", "0"), n3.setAttribute("allowfullscreen", true), n3.setAttribute("src", this.sanitize(t4)), n3;
              } }, { key: "formats", value: function(t4) {
                return f.reduce(function(e5, n3) {
                  return t4.hasAttribute(n3) && (e5[n3] = t4.getAttribute(n3)), e5;
                }, {});
              } }, { key: "sanitize", value: function(t4) {
                return c.default.sanitize(t4);
              } }, { key: "value", value: function(t4) {
                return t4.getAttribute("src");
              } }]), e4;
            }(s.BlockEmbed);
            h.blotName = "video", h.className = "ql-video", h.tagName = "IFRAME", e3.default = h;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.FormulaBlot = void 0;
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(35), c = r(u), f = n2(5), h = r(f), p = n2(9), d = r(p), y = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), a(e4, null, [{ key: "create", value: function(t4) {
                var n3 = s(e4.__proto__ || Object.getPrototypeOf(e4), "create", this).call(this, t4);
                return "string" == typeof t4 && (window.katex.render(t4, n3, { throwOnError: false, errorColor: "#f00" }), n3.setAttribute("data-value", t4)), n3;
              } }, { key: "value", value: function(t4) {
                return t4.getAttribute("data-value");
              } }]), e4;
            }(c.default);
            y.blotName = "formula", y.className = "ql-formula", y.tagName = "SPAN";
            var v = function(t3) {
              function e4() {
                o(this, e4);
                var t4 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this));
                if (null == window.katex) throw new Error("Formula module requires KaTeX.");
                return t4;
              }
              return l(e4, t3), a(e4, null, [{ key: "register", value: function() {
                h.default.register(y, true);
              } }]), e4;
            }(d.default);
            e3.FormulaBlot = y, e3.default = v;
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.CodeToken = e3.CodeBlock = void 0;
            var a = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), s = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, u = n2(0), c = r(u), f = n2(5), h = r(f), p = n2(9), d = r(p), y = n2(13), v = r(y), b = function(t3) {
              function e4() {
                return o(this, e4), i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).apply(this, arguments));
              }
              return l(e4, t3), a(e4, [{ key: "replaceWith", value: function(t4) {
                this.domNode.textContent = this.domNode.textContent, this.attach(), s(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "replaceWith", this).call(this, t4);
              } }, { key: "highlight", value: function(t4) {
                var e5 = this.domNode.textContent;
                this.cachedText !== e5 && ((e5.trim().length > 0 || null == this.cachedText) && (this.domNode.innerHTML = t4(e5), this.domNode.normalize(), this.attach()), this.cachedText = e5);
              } }]), e4;
            }(v.default);
            b.className = "ql-syntax";
            var g = new c.default.Attributor.Class("token", "hljs", { scope: c.default.Scope.INLINE }), m = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                if ("function" != typeof r2.options.highlight) throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
                var l2 = null;
                return r2.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                  clearTimeout(l2), l2 = setTimeout(function() {
                    r2.highlight(), l2 = null;
                  }, r2.options.interval);
                }), r2.highlight(), r2;
              }
              return l(e4, t3), a(e4, null, [{ key: "register", value: function() {
                h.default.register(g, true), h.default.register(b, true);
              } }]), a(e4, [{ key: "highlight", value: function() {
                var t4 = this;
                if (!this.quill.selection.composing) {
                  this.quill.update(h.default.sources.USER);
                  var e5 = this.quill.getSelection();
                  this.quill.scroll.descendants(b).forEach(function(e6) {
                    e6.highlight(t4.options.highlight);
                  }), this.quill.update(h.default.sources.SILENT), null != e5 && this.quill.setSelection(e5, h.default.sources.SILENT);
                }
              } }]), e4;
            }(d.default);
            m.DEFAULTS = { highlight: function() {
              return null == window.hljs ? null : function(t3) {
                return window.hljs.highlightAuto(t3).value;
              };
            }(), interval: 1e3 }, e3.CodeBlock = b, e3.CodeToken = g, e3.default = m;
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
          }, function(t2, e3) {
            t2.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
          }, function(t2, e3, n2) {
            function r(t3) {
              return t3 && t3.__esModule ? t3 : { default: t3 };
            }
            function o(t3, e4) {
              if (!(t3 instanceof e4)) throw new TypeError("Cannot call a class as a function");
            }
            function i(t3, e4) {
              if (!t3) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
              return !e4 || "object" != typeof e4 && "function" != typeof e4 ? t3 : e4;
            }
            function l(t3, e4) {
              if ("function" != typeof e4 && null !== e4) throw new TypeError("Super expression must either be null or a function, not " + typeof e4);
              t3.prototype = Object.create(e4 && e4.prototype, { constructor: { value: t3, enumerable: false, writable: true, configurable: true } }), e4 && (Object.setPrototypeOf ? Object.setPrototypeOf(t3, e4) : t3.__proto__ = e4);
            }
            Object.defineProperty(e3, "__esModule", { value: true }), e3.default = e3.BubbleTooltip = void 0;
            var a = function t3(e4, n3, r2) {
              null === e4 && (e4 = Function.prototype);
              var o2 = Object.getOwnPropertyDescriptor(e4, n3);
              if (void 0 === o2) {
                var i2 = Object.getPrototypeOf(e4);
                return null === i2 ? void 0 : t3(i2, n3, r2);
              }
              if ("value" in o2) return o2.value;
              var l2 = o2.get;
              if (void 0 !== l2) return l2.call(r2);
            }, s = /* @__PURE__ */ function() {
              function t3(t4, e4) {
                for (var n3 = 0; n3 < e4.length; n3++) {
                  var r2 = e4[n3];
                  r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t4, r2.key, r2);
                }
              }
              return function(e4, n3, r2) {
                return n3 && t3(e4.prototype, n3), r2 && t3(e4, r2), e4;
              };
            }(), u = n2(3), c = r(u), f = n2(8), h = r(f), p = n2(43), d = r(p), y = n2(15), v = n2(41), b = r(v), g = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], m = function(t3) {
              function e4(t4, n3) {
                o(this, e4), null != n3.modules.toolbar && null == n3.modules.toolbar.container && (n3.modules.toolbar.container = g);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.quill.container.classList.add("ql-bubble"), r2;
              }
              return l(e4, t3), s(e4, [{ key: "extendToolbar", value: function(t4) {
                this.tooltip = new _(this.quill, this.options.bounds), this.tooltip.root.appendChild(t4.container), this.buildButtons([].slice.call(t4.container.querySelectorAll("button")), b.default), this.buildPickers([].slice.call(t4.container.querySelectorAll("select")), b.default);
              } }]), e4;
            }(d.default);
            m.DEFAULTS = (0, c.default)(true, {}, d.default.DEFAULTS, { modules: { toolbar: { handlers: { link: function(t3) {
              t3 ? this.quill.theme.tooltip.edit() : this.quill.format("link", false);
            } } } } });
            var _ = function(t3) {
              function e4(t4, n3) {
                o(this, e4);
                var r2 = i(this, (e4.__proto__ || Object.getPrototypeOf(e4)).call(this, t4, n3));
                return r2.quill.on(h.default.events.EDITOR_CHANGE, function(t5, e5, n4, o2) {
                  if (t5 === h.default.events.SELECTION_CHANGE) if (null != e5 && e5.length > 0 && o2 === h.default.sources.USER) {
                    r2.show(), r2.root.style.left = "0px", r2.root.style.width = "", r2.root.style.width = r2.root.offsetWidth + "px";
                    var i2 = r2.quill.getLines(e5.index, e5.length);
                    if (1 === i2.length) r2.position(r2.quill.getBounds(e5));
                    else {
                      var l2 = i2[i2.length - 1], a2 = r2.quill.getIndex(l2), s2 = Math.min(l2.length() - 1, e5.index + e5.length - a2), u2 = r2.quill.getBounds(new y.Range(a2, s2));
                      r2.position(u2);
                    }
                  } else document.activeElement !== r2.textbox && r2.quill.hasFocus() && r2.hide();
                }), r2;
              }
              return l(e4, t3), s(e4, [{ key: "listen", value: function() {
                var t4 = this;
                a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                  t4.root.classList.remove("ql-editing");
                }), this.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                  setTimeout(function() {
                    if (!t4.root.classList.contains("ql-hidden")) {
                      var e5 = t4.quill.getSelection();
                      null != e5 && t4.position(t4.quill.getBounds(e5));
                    }
                  }, 1);
                });
              } }, { key: "cancel", value: function() {
                this.show();
              } }, { key: "position", value: function(t4) {
                var n3 = a(e4.prototype.__proto__ || Object.getPrototypeOf(e4.prototype), "position", this).call(this, t4), r2 = this.root.querySelector(".ql-tooltip-arrow");
                if (r2.style.marginLeft = "", 0 === n3) return n3;
                r2.style.marginLeft = -1 * n3 - r2.offsetWidth / 2 + "px";
              } }]), e4;
            }(p.BaseTooltip);
            _.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), e3.BubbleTooltip = _, e3.default = m;
          }, function(t2, e3, n2) {
            t2.exports = n2(63);
          }]).default;
        });
      }).call(e, n(43).Buffer);
    }, function(t, e, n) {
      var r = n(11), o = n(1), i = r(o, "Map");
      t.exports = i;
    }, function(t, e, n) {
      var r = n(1), o = r.Symbol;
      t.exports = o;
    }, function(t, e) {
      function n(t2, e2, n2) {
        switch (n2.length) {
          case 0:
            return t2.call(e2);
          case 1:
            return t2.call(e2, n2[0]);
          case 2:
            return t2.call(e2, n2[0], n2[1]);
          case 3:
            return t2.call(e2, n2[0], n2[1], n2[2]);
        }
        return t2.apply(e2, n2);
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2, n2) {
        (void 0 === n2 || i(t2[e2], n2)) && (void 0 !== n2 || e2 in t2) || o(t2, e2, n2);
      }
      var o = n(10), i = n(8);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2, n2, f, h) {
        t2 !== e2 && l(e2, function(l2, u2) {
          if (s(l2)) h || (h = new o()), a(t2, e2, u2, n2, r, f, h);
          else {
            var p = f ? f(c(t2, u2), l2, u2 + "", t2, e2, h) : void 0;
            void 0 === p && (p = l2), i(t2, u2, p);
          }
        }, u);
      }
      var o = n(48), i = n(19), l = n(53), a = n(58), s = n(0), u = n(34), c = n(27);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        return l(i(t2, e2, o), t2 + "");
      }
      var o = n(28), i = n(96), l = n(97);
      t.exports = r;
    }, function(t, e, n) {
      var r = n(11), o = function() {
        try {
          var t2 = r(Object, "defineProperty");
          return t2({}, "", {}), t2;
        } catch (t3) {
        }
      }();
      t.exports = o;
    }, function(t, e, n) {
      (function(e2) {
        var n2 = "object" == typeof e2 && e2 && e2.Object === Object && e2;
        t.exports = n2;
      }).call(e, n(35));
    }, function(t, e, n) {
      var r = n(95), o = r(Object.getPrototypeOf, Object);
      t.exports = o;
    }, function(t, e) {
      function n(t2, e2) {
        var n2 = typeof t2;
        return !!(e2 = null == e2 ? r : e2) && ("number" == n2 || "symbol" != n2 && o.test(t2)) && t2 > -1 && t2 % 1 == 0 && t2 < e2;
      }
      var r = 9007199254740991, o = /^(?:0|[1-9]\d*)$/;
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        var e2 = t2 && t2.constructor;
        return t2 === ("function" == typeof e2 && e2.prototype || r);
      }
      var r = Object.prototype;
      t.exports = n;
    }, function(t, e) {
      function n(t2, e2) {
        return "__proto__" == e2 ? void 0 : t2[e2];
      }
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        return t2;
      }
      t.exports = n;
    }, function(t, e, n) {
      var r = n(54), o = n(2), i = Object.prototype, l = i.hasOwnProperty, a = i.propertyIsEnumerable, s = r(/* @__PURE__ */ function() {
        return arguments;
      }()) ? r : function(t2) {
        return o(t2) && l.call(t2, "callee") && !a.call(t2, "callee");
      };
      t.exports = s;
    }, function(t, e) {
      var n = Array.isArray;
      t.exports = n;
    }, function(t, e, n) {
      (function(t2) {
        var r = n(1), o = n(109), i = "object" == typeof e && e && !e.nodeType && e, l = i && "object" == typeof t2 && t2 && !t2.nodeType && t2, a = l && l.exports === i, s = a ? r.Buffer : void 0, u = s ? s.isBuffer : void 0, c = u || o;
        t2.exports = c;
      }).call(e, n(14)(t));
    }, function(t, e) {
      function n(t2) {
        return "number" == typeof t2 && t2 > -1 && t2 % 1 == 0 && t2 <= r;
      }
      var r = 9007199254740991;
      t.exports = n;
    }, function(t, e, n) {
      var r = n(56), o = n(61), i = n(93), l = i && i.isTypedArray, a = l ? o(l) : r;
      t.exports = a;
    }, function(t, e, n) {
      function r(t2) {
        return l(t2) ? o(t2, true) : i(t2);
      }
      var o = n(50), i = n(57), l = n(12);
      t.exports = r;
    }, function(t, e) {
      var n;
      n = /* @__PURE__ */ function() {
        return this;
      }();
      try {
        n = n || Function("return this")() || (0, eval)("this");
      } catch (t2) {
        "object" == typeof window && (n = window);
      }
      t.exports = n;
    }, function(t, e, n) {
      e.a = { modules: ["DisplaySize", "Toolbar", "Resize"], overlayStyles: { position: "absolute", boxSizing: "border-box", border: "1px dashed #444" }, handleStyles: { position: "absolute", height: "12px", width: "12px", backgroundColor: "white", border: "1px solid #777", boxSizing: "border-box", opacity: "0.80" }, displayStyles: { position: "absolute", font: "12px/1.0 Arial, Helvetica, sans-serif", padding: "4px 8px", textAlign: "center", backgroundColor: "white", color: "#333", border: "1px solid #777", boxSizing: "border-box", opacity: "0.80", cursor: "default" }, toolbarStyles: { position: "absolute", top: "-12px", right: "0", left: "0", height: "0", minWidth: "100px", font: "12px/1.0 Arial, Helvetica, sans-serif", textAlign: "center", color: "#333", boxSizing: "border-box", cursor: "default" }, toolbarButtonStyles: { display: "inline-block", width: "24px", height: "24px", background: "white", border: "1px solid #999", verticalAlign: "middle" }, toolbarButtonSvgStyles: { fill: "#444", stroke: "#444", strokeWidth: "2" } };
    }, function(t, e, n) {
      function r(t2, e2) {
        if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t2, e2) {
        if (!t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e2 || "object" != typeof e2 && "function" != typeof e2 ? t2 : e2;
      }
      function i(t2, e2) {
        if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
        t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
      }
      n.d(e, "a", function() {
        return a;
      });
      var l = n(9), a = function(t2) {
        function e2() {
          var t3, n2, i2, l2;
          r(this, e2);
          for (var a2 = arguments.length, s = Array(a2), u = 0; u < a2; u++) s[u] = arguments[u];
          return n2 = i2 = o(this, (t3 = e2.__proto__ || Object.getPrototypeOf(e2)).call.apply(t3, [this].concat(s))), i2.onCreate = function() {
            i2.display = document.createElement("div"), Object.assign(i2.display.style, i2.options.displayStyles), i2.overlay.appendChild(i2.display);
          }, i2.onDestroy = function() {
          }, i2.onUpdate = function() {
            if (i2.display && i2.img) {
              var t4 = i2.getCurrentSize();
              if (i2.display.innerHTML = t4.join(" &times; "), t4[0] > 120 && t4[1] > 30) Object.assign(i2.display.style, { right: "4px", bottom: "4px", left: "auto" });
              else if ("right" == i2.img.style.float) {
                var e3 = i2.display.getBoundingClientRect();
                Object.assign(i2.display.style, { right: "auto", bottom: "-" + (e3.height + 4) + "px", left: "-" + (e3.width + 4) + "px" });
              } else {
                var n3 = i2.display.getBoundingClientRect();
                Object.assign(i2.display.style, { right: "-" + (n3.width + 4) + "px", bottom: "-" + (n3.height + 4) + "px", left: "auto" });
              }
            }
          }, i2.getCurrentSize = function() {
            return [i2.img.width, Math.round(i2.img.width / i2.img.naturalWidth * i2.img.naturalHeight)];
          }, l2 = n2, o(i2, l2);
        }
        return i(e2, t2), e2;
      }(l.a);
    }, function(t, e, n) {
      function r(t2, e2) {
        if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t2, e2) {
        if (!t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e2 || "object" != typeof e2 && "function" != typeof e2 ? t2 : e2;
      }
      function i(t2, e2) {
        if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
        t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
      }
      n.d(e, "a", function() {
        return a;
      });
      var l = n(9), a = function(t2) {
        function e2() {
          var t3, n2, i2, l2;
          r(this, e2);
          for (var a2 = arguments.length, s = Array(a2), u = 0; u < a2; u++) s[u] = arguments[u];
          return n2 = i2 = o(this, (t3 = e2.__proto__ || Object.getPrototypeOf(e2)).call.apply(t3, [this].concat(s))), i2.onCreate = function() {
            i2.boxes = [], i2.addBox("nwse-resize"), i2.addBox("nesw-resize"), i2.addBox("nwse-resize"), i2.addBox("nesw-resize"), i2.positionBoxes();
          }, i2.onDestroy = function() {
            i2.setCursor("");
          }, i2.positionBoxes = function() {
            var t4 = -parseFloat(i2.options.handleStyles.width) / 2 + "px", e3 = -parseFloat(i2.options.handleStyles.height) / 2 + "px";
            [{ left: t4, top: e3 }, { right: t4, top: e3 }, { right: t4, bottom: e3 }, { left: t4, bottom: e3 }].forEach(function(t5, e4) {
              Object.assign(i2.boxes[e4].style, t5);
            });
          }, i2.addBox = function(t4) {
            var e3 = document.createElement("div");
            Object.assign(e3.style, i2.options.handleStyles), e3.style.cursor = t4, e3.style.width = i2.options.handleStyles.width + "px", e3.style.height = i2.options.handleStyles.height + "px", e3.addEventListener("mousedown", i2.handleMousedown, false), i2.overlay.appendChild(e3), i2.boxes.push(e3);
          }, i2.handleMousedown = function(t4) {
            i2.dragBox = t4.target, i2.dragStartX = t4.clientX, i2.preDragWidth = i2.img.width || i2.img.naturalWidth, i2.setCursor(i2.dragBox.style.cursor), document.addEventListener("mousemove", i2.handleDrag, false), document.addEventListener("mouseup", i2.handleMouseup, false);
          }, i2.handleMouseup = function() {
            i2.setCursor(""), document.removeEventListener("mousemove", i2.handleDrag), document.removeEventListener("mouseup", i2.handleMouseup);
          }, i2.handleDrag = function(t4) {
            if (i2.img) {
              var e3 = t4.clientX - i2.dragStartX;
              i2.dragBox === i2.boxes[0] || i2.dragBox === i2.boxes[3] ? i2.img.width = Math.round(i2.preDragWidth - e3) : i2.img.width = Math.round(i2.preDragWidth + e3), i2.requestUpdate();
            }
          }, i2.setCursor = function(t4) {
            [document.body, i2.img].forEach(function(e3) {
              e3.style.cursor = t4;
            });
          }, l2 = n2, o(i2, l2);
        }
        return i(e2, t2), e2;
      }(l.a);
    }, function(t, e, n) {
      function r(t2, e2) {
        if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
      }
      function o(t2, e2) {
        if (!t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e2 || "object" != typeof e2 && "function" != typeof e2 ? t2 : e2;
      }
      function i(t2, e2) {
        if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
        t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
      }
      n.d(e, "a", function() {
        return _;
      });
      var l = n(15), a = n.n(l), s = n(112), u = n.n(s), c = n(111), f = n.n(c), h = n(113), p = n.n(h), d = n(9), y = a.a.imports.parchment, v = new y.Attributor.Style("float", "float"), b = new y.Attributor.Style("margin", "margin"), g = new y.Attributor.Style("display", "display"), m = new y.Attributor.Attribute("nameClass", "class", { scope: y.Scope.INLINE });
      a.a.register(m);
      var _ = function(t2) {
        function e2() {
          var t3, n2, i2, l2;
          r(this, e2);
          for (var a2 = arguments.length, s2 = Array(a2), c2 = 0; c2 < a2; c2++) s2[c2] = arguments[c2];
          return n2 = i2 = o(this, (t3 = e2.__proto__ || Object.getPrototypeOf(e2)).call.apply(t3, [this].concat(s2))), i2.onCreate = function() {
            i2.toolbar = document.createElement("div"), Object.assign(i2.toolbar.style, i2.options.toolbarStyles), i2.overlay.appendChild(i2.toolbar), i2._defineAlignments(), i2._addToolbarButtons();
          }, i2.onDestroy = function() {
          }, i2.onUpdate = function() {
          }, i2._defineAlignments = function() {
            i2.alignments = [{ icon: u.a, apply: function() {
              g.add(i2.img, "inline"), v.add(i2.img, "left"), b.add(i2.img, "0 1em 1em 0"), i2.img.align = "left";
            }, isApplied: function() {
              return "left" == v.value(i2.img);
            } }, { icon: f.a, apply: function() {
              g.add(i2.img, "block"), v.remove(i2.img), b.add(i2.img, "auto"), i2.img.align = "center";
            }, isApplied: function() {
              return "auto" == b.value(i2.img);
            } }, { icon: p.a, apply: function() {
              g.add(i2.img, "inline"), v.add(i2.img, "right"), b.add(i2.img, "0 0 1em 1em"), i2.img.align = "right";
            }, isApplied: function() {
              return "right" == v.value(i2.img);
            } }];
          }, i2._addToolbarButtons = function() {
            var t4 = [];
            i2.alignments.forEach(function(e3, n3) {
              var r2 = document.createElement("span");
              t4.push(r2), r2.innerHTML = e3.icon, r2.addEventListener("click", function() {
                t4.forEach(function(t5) {
                  return t5.style.filter = "";
                }), e3.isApplied() ? (v.remove(i2.img), b.remove(i2.img), g.remove(i2.img)) : (i2._selectButton(r2), e3.apply()), i2.requestUpdate();
              }), Object.assign(r2.style, i2.options.toolbarButtonStyles), n3 > 0 && (r2.style.borderLeftWidth = "0"), Object.assign(r2.children[0].style, i2.options.toolbarButtonSvgStyles), e3.isApplied() && i2._selectButton(r2), i2.toolbar.appendChild(r2);
            });
          }, i2._selectButton = function(t4) {
            t4.style.filter = "invert(20%)";
          }, l2 = n2, o(i2, l2);
        }
        return i(e2, t2), e2;
      }(d.a);
    }, function(t, e, n) {
      var r = n(18), o = n(21), i = n(70), l = n(108), a = o(function(t2) {
        return t2.push(void 0, i), r(l, void 0, t2);
      });
      t.exports = a;
    }, function(t, e, n) {
      function r(t2, e2) {
        if (!t2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e2 || "object" != typeof e2 && "function" != typeof e2 ? t2 : e2;
      }
      function o(t2, e2) {
        if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function, not " + typeof e2);
        t2.prototype = Object.create(e2 && e2.prototype, { constructor: { value: t2, enumerable: false, writable: true, configurable: true } }), e2 && (Object.setPrototypeOf ? Object.setPrototypeOf(t2, e2) : t2.__proto__ = e2);
      }
      function i(t2, e2) {
        if (!(t2 instanceof e2)) throw new TypeError("Cannot call a class as a function");
      }
      Object.defineProperty(e, "__esModule", { value: true });
      var l = n(15), a = n.n(l), s = n(40), u = n.n(s), c = n(36), f = n(37), h = n(39), p = n(38), d = /* @__PURE__ */ function() {
        function t2(t3, e2) {
          for (var n2 = 0; n2 < e2.length; n2++) {
            var r2 = e2[n2];
            r2.enumerable = r2.enumerable || false, r2.configurable = true, "value" in r2 && (r2.writable = true), Object.defineProperty(t3, r2.key, r2);
          }
        }
        return function(e2, n2, r2) {
          return n2 && t2(e2.prototype, n2), r2 && t2(e2, r2), e2;
        };
      }(), y = function t2(e2, n2, r2) {
        null === e2 && (e2 = Function.prototype);
        var o2 = Object.getOwnPropertyDescriptor(e2, n2);
        if (void 0 === o2) {
          var i2 = Object.getPrototypeOf(e2);
          return null === i2 ? void 0 : t2(i2, n2, r2);
        }
        if ("value" in o2) return o2.value;
        var l2 = o2.get;
        if (void 0 !== l2) return l2.call(r2);
      }, v = { DisplaySize: f.a, Toolbar: h.a, Resize: p.a }, b = function t2(e2) {
        var n2 = this, r2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        i(this, t2), this.initializeModules = function() {
          n2.removeModules(), n2.modules = n2.moduleClasses.map(function(t3) {
            return new (v[t3] || t3)(n2);
          }), n2.modules.forEach(function(t3) {
            t3.onCreate();
          }), n2.onUpdate();
        }, this.onUpdate = function() {
          n2.repositionElements(), n2.modules.forEach(function(t3) {
            t3.onUpdate();
          });
        }, this.removeModules = function() {
          n2.modules.forEach(function(t3) {
            t3.onDestroy();
          }), n2.modules = [];
        }, this.handleClick = function(t3) {
          if (t3.target && t3.target.tagName && "IMG" === t3.target.tagName.toUpperCase()) {
            if (n2.img === t3.target) return;
            n2.img && n2.hide(), n2.show(t3.target), t3.preventDefault();
          } else n2.img && n2.hide();
        }, this.handleScroll = function(t3) {
          n2.hide();
        }, this.show = function(t3) {
          n2.img = t3, n2.showOverlay(), n2.initializeModules();
        }, this.showOverlay = function() {
          n2.overlay && n2.hideOverlay(), n2.quill.setSelection(null), n2.setUserSelect("none"), document.addEventListener("keyup", n2.checkImage, true), n2.quill.root.addEventListener("input", n2.checkImage, true), n2.overlay = document.createElement("div"), Object.assign(n2.overlay.style, n2.options.overlayStyles), n2.quill.root.parentNode.appendChild(n2.overlay), n2.repositionElements();
        }, this.hideOverlay = function() {
          n2.overlay && (n2.quill.root.parentNode.removeChild(n2.overlay), n2.overlay = void 0, document.removeEventListener("keyup", n2.checkImage), n2.quill.root.removeEventListener("input", n2.checkImage), n2.setUserSelect(""));
        }, this.repositionElements = function() {
          if (n2.overlay && n2.img) {
            var t3 = n2.quill.root.parentNode, e3 = n2.img.getBoundingClientRect(), r3 = t3.getBoundingClientRect();
            Object.assign(n2.overlay.style, { left: e3.left - r3.left - 1 + t3.scrollLeft + "px", top: e3.top - r3.top + t3.scrollTop + "px", width: e3.width + "px", height: e3.height + "px" });
          }
        }, this.hide = function() {
          n2.hideOverlay(), n2.removeModules(), n2.img = void 0;
        }, this.setUserSelect = function(t3) {
          ["userSelect", "mozUserSelect", "webkitUserSelect", "msUserSelect"].forEach(function(e3) {
            n2.quill.root.style[e3] = t3, document.documentElement.style[e3] = t3;
          });
        }, this.checkImage = function(t3) {
          n2.img && (46 != t3.keyCode && 8 != t3.keyCode || (window.Quill || a.a).find(n2.img).deleteAt(0), n2.hide());
        }, this.quill = e2;
        var o2 = false;
        r2.modules && (o2 = r2.modules.slice()), this.options = u()({}, r2, c.a), false !== o2 && (this.options.modules = o2), document.execCommand("enableObjectResizing", false, "false"), this.quill.root.addEventListener("click", this.handleClick, false), this.quill.root.addEventListener("mscontrolselect", this.handleClick, false), this.quill.root.addEventListener("scroll", this.handleScroll, false), this.quill.root.parentNode.style.position = this.quill.root.parentNode.style.position || "relative", this.moduleClasses = this.options.modules, this.modules = [];
      };
      if (e.default = b, window.Quill) {
        var g = ["alt", "height", "width", "style"], m = window.Quill.import("formats/image"), _ = function(t2) {
          function e2() {
            return i(this, e2), r(this, (e2.__proto__ || Object.getPrototypeOf(e2)).apply(this, arguments));
          }
          return o(e2, t2), d(e2, [{ key: "format", value: function(t3, n2) {
            g.indexOf(t3) > -1 ? n2 ? this.domNode.setAttribute(t3, n2) : this.domNode.removeAttribute(t3) : y(e2.prototype.__proto__ || Object.getPrototypeOf(e2.prototype), "format", this).call(this, t3, n2);
          } }], [{ key: "formats", value: function(t3) {
            return g.reduce(function(e3, n2) {
              return t3.hasAttribute(n2) && (e3[n2] = t3.getAttribute(n2)), e3;
            }, {});
          } }]), e2;
        }(m);
        window.Quill.register(_, true), "function" != typeof Object.assign && (Object.assign = function(t2) {
          if (null == t2) throw new TypeError("Cannot convert undefined or null to object");
          t2 = Object(t2);
          for (var e2 = 1; e2 < arguments.length; e2++) {
            var n2 = arguments[e2];
            if (null != n2) for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (t2[r2] = n2[r2]);
          }
          return t2;
        }), window.Quill.register("modules/imageResize", b);
      }
    }, function(t, e, n) {
      function r(t2) {
        var e2 = t2.length;
        if (e2 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var n2 = t2.indexOf("=");
        return -1 === n2 && (n2 = e2), [n2, n2 === e2 ? 0 : 4 - n2 % 4];
      }
      function o(t2) {
        var e2 = r(t2), n2 = e2[0], o2 = e2[1];
        return 3 * (n2 + o2) / 4 - o2;
      }
      function i(t2, e2, n2) {
        return 3 * (e2 + n2) / 4 - n2;
      }
      function l(t2) {
        for (var e2, n2 = r(t2), o2 = n2[0], l2 = n2[1], a2 = new h(i(t2, o2, l2)), s2 = 0, u2 = l2 > 0 ? o2 - 4 : o2, c2 = 0; c2 < u2; c2 += 4) e2 = f[t2.charCodeAt(c2)] << 18 | f[t2.charCodeAt(c2 + 1)] << 12 | f[t2.charCodeAt(c2 + 2)] << 6 | f[t2.charCodeAt(c2 + 3)], a2[s2++] = e2 >> 16 & 255, a2[s2++] = e2 >> 8 & 255, a2[s2++] = 255 & e2;
        return 2 === l2 && (e2 = f[t2.charCodeAt(c2)] << 2 | f[t2.charCodeAt(c2 + 1)] >> 4, a2[s2++] = 255 & e2), 1 === l2 && (e2 = f[t2.charCodeAt(c2)] << 10 | f[t2.charCodeAt(c2 + 1)] << 4 | f[t2.charCodeAt(c2 + 2)] >> 2, a2[s2++] = e2 >> 8 & 255, a2[s2++] = 255 & e2), a2;
      }
      function a(t2) {
        return c[t2 >> 18 & 63] + c[t2 >> 12 & 63] + c[t2 >> 6 & 63] + c[63 & t2];
      }
      function s(t2, e2, n2) {
        for (var r2, o2 = [], i2 = e2; i2 < n2; i2 += 3) r2 = (t2[i2] << 16 & 16711680) + (t2[i2 + 1] << 8 & 65280) + (255 & t2[i2 + 2]), o2.push(a(r2));
        return o2.join("");
      }
      function u(t2) {
        for (var e2, n2 = t2.length, r2 = n2 % 3, o2 = [], i2 = 0, l2 = n2 - r2; i2 < l2; i2 += 16383) o2.push(s(t2, i2, i2 + 16383 > l2 ? l2 : i2 + 16383));
        return 1 === r2 ? (e2 = t2[n2 - 1], o2.push(c[e2 >> 2] + c[e2 << 4 & 63] + "==")) : 2 === r2 && (e2 = (t2[n2 - 2] << 8) + t2[n2 - 1], o2.push(c[e2 >> 10] + c[e2 >> 4 & 63] + c[e2 << 2 & 63] + "=")), o2.join("");
      }
      e.byteLength = o, e.toByteArray = l, e.fromByteArray = u;
      for (var c = [], f = [], h = "undefined" != typeof Uint8Array ? Uint8Array : Array, p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = 0, y = p.length; d < y; ++d) c[d] = p[d], f[p.charCodeAt(d)] = d;
      f["-".charCodeAt(0)] = 62, f["_".charCodeAt(0)] = 63;
    }, function(t, e, n) {
      (function(t2) {
        function r() {
          return i.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function o(t3, e2) {
          if (r() < e2) throw new RangeError("Invalid typed array length");
          return i.TYPED_ARRAY_SUPPORT ? (t3 = new Uint8Array(e2), t3.__proto__ = i.prototype) : (null === t3 && (t3 = new i(e2)), t3.length = e2), t3;
        }
        function i(t3, e2, n2) {
          if (!(i.TYPED_ARRAY_SUPPORT || this instanceof i)) return new i(t3, e2, n2);
          if ("number" == typeof t3) {
            if ("string" == typeof e2) throw new Error("If encoding is specified then the first argument must be a string");
            return u(this, t3);
          }
          return l(this, t3, e2, n2);
        }
        function l(t3, e2, n2, r2) {
          if ("number" == typeof e2) throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && e2 instanceof ArrayBuffer ? h(t3, e2, n2, r2) : "string" == typeof e2 ? c(t3, e2, n2) : p(t3, e2);
        }
        function a(t3) {
          if ("number" != typeof t3) throw new TypeError('"size" argument must be a number');
          if (t3 < 0) throw new RangeError('"size" argument must not be negative');
        }
        function s(t3, e2, n2, r2) {
          return a(e2), e2 <= 0 ? o(t3, e2) : void 0 !== n2 ? "string" == typeof r2 ? o(t3, e2).fill(n2, r2) : o(t3, e2).fill(n2) : o(t3, e2);
        }
        function u(t3, e2) {
          if (a(e2), t3 = o(t3, e2 < 0 ? 0 : 0 | d(e2)), !i.TYPED_ARRAY_SUPPORT) for (var n2 = 0; n2 < e2; ++n2) t3[n2] = 0;
          return t3;
        }
        function c(t3, e2, n2) {
          if ("string" == typeof n2 && "" !== n2 || (n2 = "utf8"), !i.isEncoding(n2)) throw new TypeError('"encoding" must be a valid string encoding');
          var r2 = 0 | v(e2, n2);
          t3 = o(t3, r2);
          var l2 = t3.write(e2, n2);
          return l2 !== r2 && (t3 = t3.slice(0, l2)), t3;
        }
        function f(t3, e2) {
          var n2 = e2.length < 0 ? 0 : 0 | d(e2.length);
          t3 = o(t3, n2);
          for (var r2 = 0; r2 < n2; r2 += 1) t3[r2] = 255 & e2[r2];
          return t3;
        }
        function h(t3, e2, n2, r2) {
          if (e2.byteLength, n2 < 0 || e2.byteLength < n2) throw new RangeError("'offset' is out of bounds");
          if (e2.byteLength < n2 + (r2 || 0)) throw new RangeError("'length' is out of bounds");
          return e2 = void 0 === n2 && void 0 === r2 ? new Uint8Array(e2) : void 0 === r2 ? new Uint8Array(e2, n2) : new Uint8Array(e2, n2, r2), i.TYPED_ARRAY_SUPPORT ? (t3 = e2, t3.__proto__ = i.prototype) : t3 = f(t3, e2), t3;
        }
        function p(t3, e2) {
          if (i.isBuffer(e2)) {
            var n2 = 0 | d(e2.length);
            return t3 = o(t3, n2), 0 === t3.length ? t3 : (e2.copy(t3, 0, 0, n2), t3);
          }
          if (e2) {
            if ("undefined" != typeof ArrayBuffer && e2.buffer instanceof ArrayBuffer || "length" in e2) return "number" != typeof e2.length || G(e2.length) ? o(t3, 0) : f(t3, e2);
            if ("Buffer" === e2.type && Q(e2.data)) return f(t3, e2.data);
          }
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        function d(t3) {
          if (t3 >= r()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + r().toString(16) + " bytes");
          return 0 | t3;
        }
        function y(t3) {
          return +t3 != t3 && (t3 = 0), i.alloc(+t3);
        }
        function v(t3, e2) {
          if (i.isBuffer(t3)) return t3.length;
          if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t3) || t3 instanceof ArrayBuffer)) return t3.byteLength;
          "string" != typeof t3 && (t3 = "" + t3);
          var n2 = t3.length;
          if (0 === n2) return 0;
          for (var r2 = false; ; ) switch (e2) {
            case "ascii":
            case "latin1":
            case "binary":
              return n2;
            case "utf8":
            case "utf-8":
            case void 0:
              return K(t3).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n2;
            case "hex":
              return n2 >>> 1;
            case "base64":
              return W(t3).length;
            default:
              if (r2) return K(t3).length;
              e2 = ("" + e2).toLowerCase(), r2 = true;
          }
        }
        function b(t3, e2, n2) {
          var r2 = false;
          if ((void 0 === e2 || e2 < 0) && (e2 = 0), e2 > this.length) return "";
          if ((void 0 === n2 || n2 > this.length) && (n2 = this.length), n2 <= 0) return "";
          if (n2 >>>= 0, e2 >>>= 0, n2 <= e2) return "";
          for (t3 || (t3 = "utf8"); ; ) switch (t3) {
            case "hex":
              return q(this, e2, n2);
            case "utf8":
            case "utf-8":
              return N(this, e2, n2);
            case "ascii":
              return S(this, e2, n2);
            case "latin1":
            case "binary":
              return P(this, e2, n2);
            case "base64":
              return j(this, e2, n2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return C(this, e2, n2);
            default:
              if (r2) throw new TypeError("Unknown encoding: " + t3);
              t3 = (t3 + "").toLowerCase(), r2 = true;
          }
        }
        function g(t3, e2, n2) {
          var r2 = t3[e2];
          t3[e2] = t3[n2], t3[n2] = r2;
        }
        function m(t3, e2, n2, r2, o2) {
          if (0 === t3.length) return -1;
          if ("string" == typeof n2 ? (r2 = n2, n2 = 0) : n2 > 2147483647 ? n2 = 2147483647 : n2 < -2147483648 && (n2 = -2147483648), n2 = +n2, isNaN(n2) && (n2 = o2 ? 0 : t3.length - 1), n2 < 0 && (n2 = t3.length + n2), n2 >= t3.length) {
            if (o2) return -1;
            n2 = t3.length - 1;
          } else if (n2 < 0) {
            if (!o2) return -1;
            n2 = 0;
          }
          if ("string" == typeof e2 && (e2 = i.from(e2, r2)), i.isBuffer(e2)) return 0 === e2.length ? -1 : _(t3, e2, n2, r2, o2);
          if ("number" == typeof e2) return e2 &= 255, i.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o2 ? Uint8Array.prototype.indexOf.call(t3, e2, n2) : Uint8Array.prototype.lastIndexOf.call(t3, e2, n2) : _(t3, [e2], n2, r2, o2);
          throw new TypeError("val must be string, number or Buffer");
        }
        function _(t3, e2, n2, r2, o2) {
          function i2(t4, e3) {
            return 1 === l2 ? t4[e3] : t4.readUInt16BE(e3 * l2);
          }
          var l2 = 1, a2 = t3.length, s2 = e2.length;
          if (void 0 !== r2 && ("ucs2" === (r2 = String(r2).toLowerCase()) || "ucs-2" === r2 || "utf16le" === r2 || "utf-16le" === r2)) {
            if (t3.length < 2 || e2.length < 2) return -1;
            l2 = 2, a2 /= 2, s2 /= 2, n2 /= 2;
          }
          var u2;
          if (o2) {
            var c2 = -1;
            for (u2 = n2; u2 < a2; u2++) if (i2(t3, u2) === i2(e2, -1 === c2 ? 0 : u2 - c2)) {
              if (-1 === c2 && (c2 = u2), u2 - c2 + 1 === s2) return c2 * l2;
            } else -1 !== c2 && (u2 -= u2 - c2), c2 = -1;
          } else for (n2 + s2 > a2 && (n2 = a2 - s2), u2 = n2; u2 >= 0; u2--) {
            for (var f2 = true, h2 = 0; h2 < s2; h2++) if (i2(t3, u2 + h2) !== i2(e2, h2)) {
              f2 = false;
              break;
            }
            if (f2) return u2;
          }
          return -1;
        }
        function O(t3, e2, n2, r2) {
          n2 = Number(n2) || 0;
          var o2 = t3.length - n2;
          r2 ? (r2 = Number(r2)) > o2 && (r2 = o2) : r2 = o2;
          var i2 = e2.length;
          if (i2 % 2 != 0) throw new TypeError("Invalid hex string");
          r2 > i2 / 2 && (r2 = i2 / 2);
          for (var l2 = 0; l2 < r2; ++l2) {
            var a2 = parseInt(e2.substr(2 * l2, 2), 16);
            if (isNaN(a2)) return l2;
            t3[n2 + l2] = a2;
          }
          return l2;
        }
        function w(t3, e2, n2, r2) {
          return Z(K(e2, t3.length - n2), t3, n2, r2);
        }
        function x(t3, e2, n2, r2) {
          return Z(Y(e2), t3, n2, r2);
        }
        function E(t3, e2, n2, r2) {
          return x(t3, e2, n2, r2);
        }
        function k(t3, e2, n2, r2) {
          return Z(W(e2), t3, n2, r2);
        }
        function A(t3, e2, n2, r2) {
          return Z(V(e2, t3.length - n2), t3, n2, r2);
        }
        function j(t3, e2, n2) {
          return 0 === e2 && n2 === t3.length ? X2.fromByteArray(t3) : X2.fromByteArray(t3.slice(e2, n2));
        }
        function N(t3, e2, n2) {
          n2 = Math.min(t3.length, n2);
          for (var r2 = [], o2 = e2; o2 < n2; ) {
            var i2 = t3[o2], l2 = null, a2 = i2 > 239 ? 4 : i2 > 223 ? 3 : i2 > 191 ? 2 : 1;
            if (o2 + a2 <= n2) {
              var s2, u2, c2, f2;
              switch (a2) {
                case 1:
                  i2 < 128 && (l2 = i2);
                  break;
                case 2:
                  s2 = t3[o2 + 1], 128 == (192 & s2) && (f2 = (31 & i2) << 6 | 63 & s2) > 127 && (l2 = f2);
                  break;
                case 3:
                  s2 = t3[o2 + 1], u2 = t3[o2 + 2], 128 == (192 & s2) && 128 == (192 & u2) && (f2 = (15 & i2) << 12 | (63 & s2) << 6 | 63 & u2) > 2047 && (f2 < 55296 || f2 > 57343) && (l2 = f2);
                  break;
                case 4:
                  s2 = t3[o2 + 1], u2 = t3[o2 + 2], c2 = t3[o2 + 3], 128 == (192 & s2) && 128 == (192 & u2) && 128 == (192 & c2) && (f2 = (15 & i2) << 18 | (63 & s2) << 12 | (63 & u2) << 6 | 63 & c2) > 65535 && f2 < 1114112 && (l2 = f2);
              }
            }
            null === l2 ? (l2 = 65533, a2 = 1) : l2 > 65535 && (l2 -= 65536, r2.push(l2 >>> 10 & 1023 | 55296), l2 = 56320 | 1023 & l2), r2.push(l2), o2 += a2;
          }
          return T(r2);
        }
        function T(t3) {
          var e2 = t3.length;
          if (e2 <= J) return String.fromCharCode.apply(String, t3);
          for (var n2 = "", r2 = 0; r2 < e2; ) n2 += String.fromCharCode.apply(String, t3.slice(r2, r2 += J));
          return n2;
        }
        function S(t3, e2, n2) {
          var r2 = "";
          n2 = Math.min(t3.length, n2);
          for (var o2 = e2; o2 < n2; ++o2) r2 += String.fromCharCode(127 & t3[o2]);
          return r2;
        }
        function P(t3, e2, n2) {
          var r2 = "";
          n2 = Math.min(t3.length, n2);
          for (var o2 = e2; o2 < n2; ++o2) r2 += String.fromCharCode(t3[o2]);
          return r2;
        }
        function q(t3, e2, n2) {
          var r2 = t3.length;
          (!e2 || e2 < 0) && (e2 = 0), (!n2 || n2 < 0 || n2 > r2) && (n2 = r2);
          for (var o2 = "", i2 = e2; i2 < n2; ++i2) o2 += H(t3[i2]);
          return o2;
        }
        function C(t3, e2, n2) {
          for (var r2 = t3.slice(e2, n2), o2 = "", i2 = 0; i2 < r2.length; i2 += 2) o2 += String.fromCharCode(r2[i2] + 256 * r2[i2 + 1]);
          return o2;
        }
        function L(t3, e2, n2) {
          if (t3 % 1 != 0 || t3 < 0) throw new RangeError("offset is not uint");
          if (t3 + e2 > n2) throw new RangeError("Trying to access beyond buffer length");
        }
        function R(t3, e2, n2, r2, o2, l2) {
          if (!i.isBuffer(t3)) throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e2 > o2 || e2 < l2) throw new RangeError('"value" argument is out of bounds');
          if (n2 + r2 > t3.length) throw new RangeError("Index out of range");
        }
        function M(t3, e2, n2, r2) {
          e2 < 0 && (e2 = 65535 + e2 + 1);
          for (var o2 = 0, i2 = Math.min(t3.length - n2, 2); o2 < i2; ++o2) t3[n2 + o2] = (e2 & 255 << 8 * (r2 ? o2 : 1 - o2)) >>> 8 * (r2 ? o2 : 1 - o2);
        }
        function B(t3, e2, n2, r2) {
          e2 < 0 && (e2 = 4294967295 + e2 + 1);
          for (var o2 = 0, i2 = Math.min(t3.length - n2, 4); o2 < i2; ++o2) t3[n2 + o2] = e2 >>> 8 * (r2 ? o2 : 3 - o2) & 255;
        }
        function I(t3, e2, n2, r2, o2, i2) {
          if (n2 + r2 > t3.length) throw new RangeError("Index out of range");
          if (n2 < 0) throw new RangeError("Index out of range");
        }
        function D(t3, e2, n2, r2, o2) {
          return o2 || I(t3, e2, n2, 4), $.write(t3, e2, n2, r2, 23, 4), n2 + 4;
        }
        function U(t3, e2, n2, r2, o2) {
          return o2 || I(t3, e2, n2, 8), $.write(t3, e2, n2, r2, 52, 8), n2 + 8;
        }
        function F(t3) {
          if (t3 = z(t3).replace(tt, ""), t3.length < 2) return "";
          for (; t3.length % 4 != 0; ) t3 += "=";
          return t3;
        }
        function z(t3) {
          return t3.trim ? t3.trim() : t3.replace(/^\s+|\s+$/g, "");
        }
        function H(t3) {
          return t3 < 16 ? "0" + t3.toString(16) : t3.toString(16);
        }
        function K(t3, e2) {
          e2 = e2 || 1 / 0;
          for (var n2, r2 = t3.length, o2 = null, i2 = [], l2 = 0; l2 < r2; ++l2) {
            if ((n2 = t3.charCodeAt(l2)) > 55295 && n2 < 57344) {
              if (!o2) {
                if (n2 > 56319) {
                  (e2 -= 3) > -1 && i2.push(239, 191, 189);
                  continue;
                }
                if (l2 + 1 === r2) {
                  (e2 -= 3) > -1 && i2.push(239, 191, 189);
                  continue;
                }
                o2 = n2;
                continue;
              }
              if (n2 < 56320) {
                (e2 -= 3) > -1 && i2.push(239, 191, 189), o2 = n2;
                continue;
              }
              n2 = 65536 + (o2 - 55296 << 10 | n2 - 56320);
            } else o2 && (e2 -= 3) > -1 && i2.push(239, 191, 189);
            if (o2 = null, n2 < 128) {
              if ((e2 -= 1) < 0) break;
              i2.push(n2);
            } else if (n2 < 2048) {
              if ((e2 -= 2) < 0) break;
              i2.push(n2 >> 6 | 192, 63 & n2 | 128);
            } else if (n2 < 65536) {
              if ((e2 -= 3) < 0) break;
              i2.push(n2 >> 12 | 224, n2 >> 6 & 63 | 128, 63 & n2 | 128);
            } else {
              if (!(n2 < 1114112)) throw new Error("Invalid code point");
              if ((e2 -= 4) < 0) break;
              i2.push(n2 >> 18 | 240, n2 >> 12 & 63 | 128, n2 >> 6 & 63 | 128, 63 & n2 | 128);
            }
          }
          return i2;
        }
        function Y(t3) {
          for (var e2 = [], n2 = 0; n2 < t3.length; ++n2) e2.push(255 & t3.charCodeAt(n2));
          return e2;
        }
        function V(t3, e2) {
          for (var n2, r2, o2, i2 = [], l2 = 0; l2 < t3.length && !((e2 -= 2) < 0); ++l2) n2 = t3.charCodeAt(l2), r2 = n2 >> 8, o2 = n2 % 256, i2.push(o2), i2.push(r2);
          return i2;
        }
        function W(t3) {
          return X2.toByteArray(F(t3));
        }
        function Z(t3, e2, n2, r2) {
          for (var o2 = 0; o2 < r2 && !(o2 + n2 >= e2.length || o2 >= t3.length); ++o2) e2[o2 + n2] = t3[o2];
          return o2;
        }
        function G(t3) {
          return t3 !== t3;
        }
        /*!
        * The buffer module from node.js, for the browser.
        *
        * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
        * @license  MIT
        */
        var X2 = n(42), $ = n(44), Q = n(45);
        e.Buffer = i, e.SlowBuffer = y, e.INSPECT_MAX_BYTES = 50, i.TYPED_ARRAY_SUPPORT = void 0 !== t2.TYPED_ARRAY_SUPPORT ? t2.TYPED_ARRAY_SUPPORT : function() {
          try {
            var t3 = new Uint8Array(1);
            return t3.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
              return 42;
            } }, 42 === t3.foo() && "function" == typeof t3.subarray && 0 === t3.subarray(1, 1).byteLength;
          } catch (t4) {
            return false;
          }
        }(), e.kMaxLength = r(), i.poolSize = 8192, i._augment = function(t3) {
          return t3.__proto__ = i.prototype, t3;
        }, i.from = function(t3, e2, n2) {
          return l(null, t3, e2, n2);
        }, i.TYPED_ARRAY_SUPPORT && (i.prototype.__proto__ = Uint8Array.prototype, i.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && i[Symbol.species] === i && Object.defineProperty(i, Symbol.species, { value: null, configurable: true })), i.alloc = function(t3, e2, n2) {
          return s(null, t3, e2, n2);
        }, i.allocUnsafe = function(t3) {
          return u(null, t3);
        }, i.allocUnsafeSlow = function(t3) {
          return u(null, t3);
        }, i.isBuffer = function(t3) {
          return !(null == t3 || !t3._isBuffer);
        }, i.compare = function(t3, e2) {
          if (!i.isBuffer(t3) || !i.isBuffer(e2)) throw new TypeError("Arguments must be Buffers");
          if (t3 === e2) return 0;
          for (var n2 = t3.length, r2 = e2.length, o2 = 0, l2 = Math.min(n2, r2); o2 < l2; ++o2) if (t3[o2] !== e2[o2]) {
            n2 = t3[o2], r2 = e2[o2];
            break;
          }
          return n2 < r2 ? -1 : r2 < n2 ? 1 : 0;
        }, i.isEncoding = function(t3) {
          switch (String(t3).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        }, i.concat = function(t3, e2) {
          if (!Q(t3)) throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t3.length) return i.alloc(0);
          var n2;
          if (void 0 === e2) for (e2 = 0, n2 = 0; n2 < t3.length; ++n2) e2 += t3[n2].length;
          var r2 = i.allocUnsafe(e2), o2 = 0;
          for (n2 = 0; n2 < t3.length; ++n2) {
            var l2 = t3[n2];
            if (!i.isBuffer(l2)) throw new TypeError('"list" argument must be an Array of Buffers');
            l2.copy(r2, o2), o2 += l2.length;
          }
          return r2;
        }, i.byteLength = v, i.prototype._isBuffer = true, i.prototype.swap16 = function() {
          var t3 = this.length;
          if (t3 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var e2 = 0; e2 < t3; e2 += 2) g(this, e2, e2 + 1);
          return this;
        }, i.prototype.swap32 = function() {
          var t3 = this.length;
          if (t3 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var e2 = 0; e2 < t3; e2 += 4) g(this, e2, e2 + 3), g(this, e2 + 1, e2 + 2);
          return this;
        }, i.prototype.swap64 = function() {
          var t3 = this.length;
          if (t3 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var e2 = 0; e2 < t3; e2 += 8) g(this, e2, e2 + 7), g(this, e2 + 1, e2 + 6), g(this, e2 + 2, e2 + 5), g(this, e2 + 3, e2 + 4);
          return this;
        }, i.prototype.toString = function() {
          var t3 = 0 | this.length;
          return 0 === t3 ? "" : 0 === arguments.length ? N(this, 0, t3) : b.apply(this, arguments);
        }, i.prototype.equals = function(t3) {
          if (!i.isBuffer(t3)) throw new TypeError("Argument must be a Buffer");
          return this === t3 || 0 === i.compare(this, t3);
        }, i.prototype.inspect = function() {
          var t3 = "", n2 = e.INSPECT_MAX_BYTES;
          return this.length > 0 && (t3 = this.toString("hex", 0, n2).match(/.{2}/g).join(" "), this.length > n2 && (t3 += " ... ")), "<Buffer " + t3 + ">";
        }, i.prototype.compare = function(t3, e2, n2, r2, o2) {
          if (!i.isBuffer(t3)) throw new TypeError("Argument must be a Buffer");
          if (void 0 === e2 && (e2 = 0), void 0 === n2 && (n2 = t3 ? t3.length : 0), void 0 === r2 && (r2 = 0), void 0 === o2 && (o2 = this.length), e2 < 0 || n2 > t3.length || r2 < 0 || o2 > this.length) throw new RangeError("out of range index");
          if (r2 >= o2 && e2 >= n2) return 0;
          if (r2 >= o2) return -1;
          if (e2 >= n2) return 1;
          if (e2 >>>= 0, n2 >>>= 0, r2 >>>= 0, o2 >>>= 0, this === t3) return 0;
          for (var l2 = o2 - r2, a2 = n2 - e2, s2 = Math.min(l2, a2), u2 = this.slice(r2, o2), c2 = t3.slice(e2, n2), f2 = 0; f2 < s2; ++f2) if (u2[f2] !== c2[f2]) {
            l2 = u2[f2], a2 = c2[f2];
            break;
          }
          return l2 < a2 ? -1 : a2 < l2 ? 1 : 0;
        }, i.prototype.includes = function(t3, e2, n2) {
          return -1 !== this.indexOf(t3, e2, n2);
        }, i.prototype.indexOf = function(t3, e2, n2) {
          return m(this, t3, e2, n2, true);
        }, i.prototype.lastIndexOf = function(t3, e2, n2) {
          return m(this, t3, e2, n2, false);
        }, i.prototype.write = function(t3, e2, n2, r2) {
          if (void 0 === e2) r2 = "utf8", n2 = this.length, e2 = 0;
          else if (void 0 === n2 && "string" == typeof e2) r2 = e2, n2 = this.length, e2 = 0;
          else {
            if (!isFinite(e2)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
            e2 |= 0, isFinite(n2) ? (n2 |= 0, void 0 === r2 && (r2 = "utf8")) : (r2 = n2, n2 = void 0);
          }
          var o2 = this.length - e2;
          if ((void 0 === n2 || n2 > o2) && (n2 = o2), t3.length > 0 && (n2 < 0 || e2 < 0) || e2 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
          r2 || (r2 = "utf8");
          for (var i2 = false; ; ) switch (r2) {
            case "hex":
              return O(this, t3, e2, n2);
            case "utf8":
            case "utf-8":
              return w(this, t3, e2, n2);
            case "ascii":
              return x(this, t3, e2, n2);
            case "latin1":
            case "binary":
              return E(this, t3, e2, n2);
            case "base64":
              return k(this, t3, e2, n2);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return A(this, t3, e2, n2);
            default:
              if (i2) throw new TypeError("Unknown encoding: " + r2);
              r2 = ("" + r2).toLowerCase(), i2 = true;
          }
        }, i.prototype.toJSON = function() {
          return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
        };
        var J = 4096;
        i.prototype.slice = function(t3, e2) {
          var n2 = this.length;
          t3 = ~~t3, e2 = void 0 === e2 ? n2 : ~~e2, t3 < 0 ? (t3 += n2) < 0 && (t3 = 0) : t3 > n2 && (t3 = n2), e2 < 0 ? (e2 += n2) < 0 && (e2 = 0) : e2 > n2 && (e2 = n2), e2 < t3 && (e2 = t3);
          var r2;
          if (i.TYPED_ARRAY_SUPPORT) r2 = this.subarray(t3, e2), r2.__proto__ = i.prototype;
          else {
            var o2 = e2 - t3;
            r2 = new i(o2, void 0);
            for (var l2 = 0; l2 < o2; ++l2) r2[l2] = this[l2 + t3];
          }
          return r2;
        }, i.prototype.readUIntLE = function(t3, e2, n2) {
          t3 |= 0, e2 |= 0, n2 || L(t3, e2, this.length);
          for (var r2 = this[t3], o2 = 1, i2 = 0; ++i2 < e2 && (o2 *= 256); ) r2 += this[t3 + i2] * o2;
          return r2;
        }, i.prototype.readUIntBE = function(t3, e2, n2) {
          t3 |= 0, e2 |= 0, n2 || L(t3, e2, this.length);
          for (var r2 = this[t3 + --e2], o2 = 1; e2 > 0 && (o2 *= 256); ) r2 += this[t3 + --e2] * o2;
          return r2;
        }, i.prototype.readUInt8 = function(t3, e2) {
          return e2 || L(t3, 1, this.length), this[t3];
        }, i.prototype.readUInt16LE = function(t3, e2) {
          return e2 || L(t3, 2, this.length), this[t3] | this[t3 + 1] << 8;
        }, i.prototype.readUInt16BE = function(t3, e2) {
          return e2 || L(t3, 2, this.length), this[t3] << 8 | this[t3 + 1];
        }, i.prototype.readUInt32LE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), (this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16) + 16777216 * this[t3 + 3];
        }, i.prototype.readUInt32BE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), 16777216 * this[t3] + (this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3]);
        }, i.prototype.readIntLE = function(t3, e2, n2) {
          t3 |= 0, e2 |= 0, n2 || L(t3, e2, this.length);
          for (var r2 = this[t3], o2 = 1, i2 = 0; ++i2 < e2 && (o2 *= 256); ) r2 += this[t3 + i2] * o2;
          return o2 *= 128, r2 >= o2 && (r2 -= Math.pow(2, 8 * e2)), r2;
        }, i.prototype.readIntBE = function(t3, e2, n2) {
          t3 |= 0, e2 |= 0, n2 || L(t3, e2, this.length);
          for (var r2 = e2, o2 = 1, i2 = this[t3 + --r2]; r2 > 0 && (o2 *= 256); ) i2 += this[t3 + --r2] * o2;
          return o2 *= 128, i2 >= o2 && (i2 -= Math.pow(2, 8 * e2)), i2;
        }, i.prototype.readInt8 = function(t3, e2) {
          return e2 || L(t3, 1, this.length), 128 & this[t3] ? -1 * (255 - this[t3] + 1) : this[t3];
        }, i.prototype.readInt16LE = function(t3, e2) {
          e2 || L(t3, 2, this.length);
          var n2 = this[t3] | this[t3 + 1] << 8;
          return 32768 & n2 ? 4294901760 | n2 : n2;
        }, i.prototype.readInt16BE = function(t3, e2) {
          e2 || L(t3, 2, this.length);
          var n2 = this[t3 + 1] | this[t3] << 8;
          return 32768 & n2 ? 4294901760 | n2 : n2;
        }, i.prototype.readInt32LE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), this[t3] | this[t3 + 1] << 8 | this[t3 + 2] << 16 | this[t3 + 3] << 24;
        }, i.prototype.readInt32BE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), this[t3] << 24 | this[t3 + 1] << 16 | this[t3 + 2] << 8 | this[t3 + 3];
        }, i.prototype.readFloatLE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), $.read(this, t3, true, 23, 4);
        }, i.prototype.readFloatBE = function(t3, e2) {
          return e2 || L(t3, 4, this.length), $.read(this, t3, false, 23, 4);
        }, i.prototype.readDoubleLE = function(t3, e2) {
          return e2 || L(t3, 8, this.length), $.read(this, t3, true, 52, 8);
        }, i.prototype.readDoubleBE = function(t3, e2) {
          return e2 || L(t3, 8, this.length), $.read(this, t3, false, 52, 8);
        }, i.prototype.writeUIntLE = function(t3, e2, n2, r2) {
          if (t3 = +t3, e2 |= 0, n2 |= 0, !r2) {
            R(this, t3, e2, n2, Math.pow(2, 8 * n2) - 1, 0);
          }
          var o2 = 1, i2 = 0;
          for (this[e2] = 255 & t3; ++i2 < n2 && (o2 *= 256); ) this[e2 + i2] = t3 / o2 & 255;
          return e2 + n2;
        }, i.prototype.writeUIntBE = function(t3, e2, n2, r2) {
          if (t3 = +t3, e2 |= 0, n2 |= 0, !r2) {
            R(this, t3, e2, n2, Math.pow(2, 8 * n2) - 1, 0);
          }
          var o2 = n2 - 1, i2 = 1;
          for (this[e2 + o2] = 255 & t3; --o2 >= 0 && (i2 *= 256); ) this[e2 + o2] = t3 / i2 & 255;
          return e2 + n2;
        }, i.prototype.writeUInt8 = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 1, 255, 0), i.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), this[e2] = 255 & t3, e2 + 1;
        }, i.prototype.writeUInt16LE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : M(this, t3, e2, true), e2 + 2;
        }, i.prototype.writeUInt16BE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 2, 65535, 0), i.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : M(this, t3, e2, false), e2 + 2;
        }, i.prototype.writeUInt32LE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e2 + 3] = t3 >>> 24, this[e2 + 2] = t3 >>> 16, this[e2 + 1] = t3 >>> 8, this[e2] = 255 & t3) : B(this, t3, e2, true), e2 + 4;
        }, i.prototype.writeUInt32BE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 4, 4294967295, 0), i.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : B(this, t3, e2, false), e2 + 4;
        }, i.prototype.writeIntLE = function(t3, e2, n2, r2) {
          if (t3 = +t3, e2 |= 0, !r2) {
            var o2 = Math.pow(2, 8 * n2 - 1);
            R(this, t3, e2, n2, o2 - 1, -o2);
          }
          var i2 = 0, l2 = 1, a2 = 0;
          for (this[e2] = 255 & t3; ++i2 < n2 && (l2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e2 + i2 - 1] && (a2 = 1), this[e2 + i2] = (t3 / l2 >> 0) - a2 & 255;
          return e2 + n2;
        }, i.prototype.writeIntBE = function(t3, e2, n2, r2) {
          if (t3 = +t3, e2 |= 0, !r2) {
            var o2 = Math.pow(2, 8 * n2 - 1);
            R(this, t3, e2, n2, o2 - 1, -o2);
          }
          var i2 = n2 - 1, l2 = 1, a2 = 0;
          for (this[e2 + i2] = 255 & t3; --i2 >= 0 && (l2 *= 256); ) t3 < 0 && 0 === a2 && 0 !== this[e2 + i2 + 1] && (a2 = 1), this[e2 + i2] = (t3 / l2 >> 0) - a2 & 255;
          return e2 + n2;
        }, i.prototype.writeInt8 = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 1, 127, -128), i.TYPED_ARRAY_SUPPORT || (t3 = Math.floor(t3)), t3 < 0 && (t3 = 255 + t3 + 1), this[e2] = 255 & t3, e2 + 1;
        }, i.prototype.writeInt16LE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8) : M(this, t3, e2, true), e2 + 2;
        }, i.prototype.writeInt16BE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 2, 32767, -32768), i.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 8, this[e2 + 1] = 255 & t3) : M(this, t3, e2, false), e2 + 2;
        }, i.prototype.writeInt32LE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 4, 2147483647, -2147483648), i.TYPED_ARRAY_SUPPORT ? (this[e2] = 255 & t3, this[e2 + 1] = t3 >>> 8, this[e2 + 2] = t3 >>> 16, this[e2 + 3] = t3 >>> 24) : B(this, t3, e2, true), e2 + 4;
        }, i.prototype.writeInt32BE = function(t3, e2, n2) {
          return t3 = +t3, e2 |= 0, n2 || R(this, t3, e2, 4, 2147483647, -2147483648), t3 < 0 && (t3 = 4294967295 + t3 + 1), i.TYPED_ARRAY_SUPPORT ? (this[e2] = t3 >>> 24, this[e2 + 1] = t3 >>> 16, this[e2 + 2] = t3 >>> 8, this[e2 + 3] = 255 & t3) : B(this, t3, e2, false), e2 + 4;
        }, i.prototype.writeFloatLE = function(t3, e2, n2) {
          return D(this, t3, e2, true, n2);
        }, i.prototype.writeFloatBE = function(t3, e2, n2) {
          return D(this, t3, e2, false, n2);
        }, i.prototype.writeDoubleLE = function(t3, e2, n2) {
          return U(this, t3, e2, true, n2);
        }, i.prototype.writeDoubleBE = function(t3, e2, n2) {
          return U(this, t3, e2, false, n2);
        }, i.prototype.copy = function(t3, e2, n2, r2) {
          if (n2 || (n2 = 0), r2 || 0 === r2 || (r2 = this.length), e2 >= t3.length && (e2 = t3.length), e2 || (e2 = 0), r2 > 0 && r2 < n2 && (r2 = n2), r2 === n2) return 0;
          if (0 === t3.length || 0 === this.length) return 0;
          if (e2 < 0) throw new RangeError("targetStart out of bounds");
          if (n2 < 0 || n2 >= this.length) throw new RangeError("sourceStart out of bounds");
          if (r2 < 0) throw new RangeError("sourceEnd out of bounds");
          r2 > this.length && (r2 = this.length), t3.length - e2 < r2 - n2 && (r2 = t3.length - e2 + n2);
          var o2, l2 = r2 - n2;
          if (this === t3 && n2 < e2 && e2 < r2) for (o2 = l2 - 1; o2 >= 0; --o2) t3[o2 + e2] = this[o2 + n2];
          else if (l2 < 1e3 || !i.TYPED_ARRAY_SUPPORT) for (o2 = 0; o2 < l2; ++o2) t3[o2 + e2] = this[o2 + n2];
          else Uint8Array.prototype.set.call(t3, this.subarray(n2, n2 + l2), e2);
          return l2;
        }, i.prototype.fill = function(t3, e2, n2, r2) {
          if ("string" == typeof t3) {
            if ("string" == typeof e2 ? (r2 = e2, e2 = 0, n2 = this.length) : "string" == typeof n2 && (r2 = n2, n2 = this.length), 1 === t3.length) {
              var o2 = t3.charCodeAt(0);
              o2 < 256 && (t3 = o2);
            }
            if (void 0 !== r2 && "string" != typeof r2) throw new TypeError("encoding must be a string");
            if ("string" == typeof r2 && !i.isEncoding(r2)) throw new TypeError("Unknown encoding: " + r2);
          } else "number" == typeof t3 && (t3 &= 255);
          if (e2 < 0 || this.length < e2 || this.length < n2) throw new RangeError("Out of range index");
          if (n2 <= e2) return this;
          e2 >>>= 0, n2 = void 0 === n2 ? this.length : n2 >>> 0, t3 || (t3 = 0);
          var l2;
          if ("number" == typeof t3) for (l2 = e2; l2 < n2; ++l2) this[l2] = t3;
          else {
            var a2 = i.isBuffer(t3) ? t3 : K(new i(t3, r2).toString()), s2 = a2.length;
            for (l2 = 0; l2 < n2 - e2; ++l2) this[l2 + e2] = a2[l2 % s2];
          }
          return this;
        };
        var tt = /[^+\/0-9A-Za-z-_]/g;
      }).call(e, n(35));
    }, function(t, e) {
      e.read = function(t2, e2, n, r, o) {
        var i, l, a = 8 * o - r - 1, s = (1 << a) - 1, u = s >> 1, c = -7, f = n ? o - 1 : 0, h = n ? -1 : 1, p = t2[e2 + f];
        for (f += h, i = p & (1 << -c) - 1, p >>= -c, c += a; c > 0; i = 256 * i + t2[e2 + f], f += h, c -= 8) ;
        for (l = i & (1 << -c) - 1, i >>= -c, c += r; c > 0; l = 256 * l + t2[e2 + f], f += h, c -= 8) ;
        if (0 === i) i = 1 - u;
        else {
          if (i === s) return l ? NaN : 1 / 0 * (p ? -1 : 1);
          l += Math.pow(2, r), i -= u;
        }
        return (p ? -1 : 1) * l * Math.pow(2, i - r);
      }, e.write = function(t2, e2, n, r, o, i) {
        var l, a, s, u = 8 * i - o - 1, c = (1 << u) - 1, f = c >> 1, h = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, p = r ? 0 : i - 1, d = r ? 1 : -1, y = e2 < 0 || 0 === e2 && 1 / e2 < 0 ? 1 : 0;
        for (e2 = Math.abs(e2), isNaN(e2) || e2 === 1 / 0 ? (a = isNaN(e2) ? 1 : 0, l = c) : (l = Math.floor(Math.log(e2) / Math.LN2), e2 * (s = Math.pow(2, -l)) < 1 && (l--, s *= 2), e2 += l + f >= 1 ? h / s : h * Math.pow(2, 1 - f), e2 * s >= 2 && (l++, s /= 2), l + f >= c ? (a = 0, l = c) : l + f >= 1 ? (a = (e2 * s - 1) * Math.pow(2, o), l += f) : (a = e2 * Math.pow(2, f - 1) * Math.pow(2, o), l = 0)); o >= 8; t2[n + p] = 255 & a, p += d, a /= 256, o -= 8) ;
        for (l = l << o | a, u += o; u > 0; t2[n + p] = 255 & l, p += d, l /= 256, u -= 8) ;
        t2[n + p - d] |= 128 * y;
      };
    }, function(t, e) {
      var n = {}.toString;
      t.exports = Array.isArray || function(t2) {
        return "[object Array]" == n.call(t2);
      };
    }, function(t, e, n) {
      function r(t2) {
        var e2 = -1, n2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < n2; ) {
          var r2 = t2[e2];
          this.set(r2[0], r2[1]);
        }
      }
      var o = n(73), i = n(74), l = n(75), a = n(76), s = n(77);
      r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = l, r.prototype.has = a, r.prototype.set = s, t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = -1, n2 = null == t2 ? 0 : t2.length;
        for (this.clear(); ++e2 < n2; ) {
          var r2 = t2[e2];
          this.set(r2[0], r2[1]);
        }
      }
      var o = n(87), i = n(88), l = n(89), a = n(90), s = n(91);
      r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = l, r.prototype.has = a, r.prototype.set = s, t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = this.__data__ = new o(t2);
        this.size = e2.size;
      }
      var o = n(3), i = n(99), l = n(100), a = n(101), s = n(102), u = n(103);
      r.prototype.clear = i, r.prototype.delete = l, r.prototype.get = a, r.prototype.has = s, r.prototype.set = u, t.exports = r;
    }, function(t, e, n) {
      var r = n(1), o = r.Uint8Array;
      t.exports = o;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = l(t2), r2 = !n2 && i(t2), c2 = !n2 && !r2 && a(t2), h = !n2 && !r2 && !c2 && u(t2), p = n2 || r2 || c2 || h, d = p ? o(t2.length, String) : [], y = d.length;
        for (var v in t2) !e2 && !f.call(t2, v) || p && ("length" == v || c2 && ("offset" == v || "parent" == v) || h && ("buffer" == v || "byteLength" == v || "byteOffset" == v) || s(v, y)) || d.push(v);
        return d;
      }
      var o = n(60), i = n(29), l = n(30), a = n(31), s = n(25), u = n(33), c = Object.prototype, f = c.hasOwnProperty;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2, n2) {
        var r2 = t2[e2];
        a.call(t2, e2) && i(r2, n2) && (void 0 !== n2 || e2 in t2) || o(t2, e2, n2);
      }
      var o = n(10), i = n(8), l = Object.prototype, a = l.hasOwnProperty;
      t.exports = r;
    }, function(t, e, n) {
      var r = n(0), o = Object.create, i = /* @__PURE__ */ function() {
        function t2() {
        }
        return function(e2) {
          if (!r(e2)) return {};
          if (o) return o(e2);
          t2.prototype = e2;
          var n2 = new t2();
          return t2.prototype = void 0, n2;
        };
      }();
      t.exports = i;
    }, function(t, e, n) {
      var r = n(69), o = r();
      t.exports = o;
    }, function(t, e, n) {
      function r(t2) {
        return i(t2) && o(t2) == l;
      }
      var o = n(5), i = n(2), l = "[object Arguments]";
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return !(!l(t2) || i(t2)) && (o(t2) ? d : u).test(a(t2));
      }
      var o = n(13), i = n(81), l = n(0), a = n(104), s = /[\\^$.*+?()[\]{}|]/g, u = /^\[object .+?Constructor\]$/, c = Function.prototype, f = Object.prototype, h = c.toString, p = f.hasOwnProperty, d = RegExp("^" + h.call(p).replace(s, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return l(t2) && i(t2.length) && !!a[o(t2)];
      }
      var o = n(5), i = n(32), l = n(2), a = {};
      a["[object Float32Array]"] = a["[object Float64Array]"] = a["[object Int8Array]"] = a["[object Int16Array]"] = a["[object Int32Array]"] = a["[object Uint8Array]"] = a["[object Uint8ClampedArray]"] = a["[object Uint16Array]"] = a["[object Uint32Array]"] = true, a["[object Arguments]"] = a["[object Array]"] = a["[object ArrayBuffer]"] = a["[object Boolean]"] = a["[object DataView]"] = a["[object Date]"] = a["[object Error]"] = a["[object Function]"] = a["[object Map]"] = a["[object Number]"] = a["[object Object]"] = a["[object RegExp]"] = a["[object Set]"] = a["[object String]"] = a["[object WeakMap]"] = false, t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        if (!o(t2)) return l(t2);
        var e2 = i(t2), n2 = [];
        for (var r2 in t2) ("constructor" != r2 || !e2 && s.call(t2, r2)) && n2.push(r2);
        return n2;
      }
      var o = n(0), i = n(26), l = n(92), a = Object.prototype, s = a.hasOwnProperty;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2, n2, r2, m, _, O) {
        var w = b(t2, n2), x = b(e2, n2), E = O.get(x);
        if (E) return void o(t2, n2, E);
        var k = _ ? _(w, x, n2 + "", t2, e2, O) : void 0, A = void 0 === k;
        if (A) {
          var j = c(x), N = !j && h(x), T = !j && !N && v(x);
          k = x, j || N || T ? c(w) ? k = w : f(w) ? k = a(w) : N ? (A = false, k = i(x, true)) : T ? (A = false, k = l(x, true)) : k = [] : y(x) || u(x) ? (k = w, u(w) ? k = g(w) : (!d(w) || r2 && p(w)) && (k = s(x))) : A = false;
        }
        A && (O.set(x, k), m(k, x, r2, _, O), O.delete(x)), o(t2, n2, k);
      }
      var o = n(19), i = n(63), l = n(64), a = n(65), s = n(78), u = n(29), c = n(30), f = n(106), h = n(31), p = n(13), d = n(0), y = n(107), v = n(33), b = n(27), g = n(110);
      t.exports = r;
    }, function(t, e, n) {
      var r = n(105), o = n(22), i = n(28), l = o ? function(t2, e2) {
        return o(t2, "toString", { configurable: true, enumerable: false, value: r(e2), writable: true });
      } : i;
      t.exports = l;
    }, function(t, e) {
      function n(t2, e2) {
        for (var n2 = -1, r = Array(t2); ++n2 < t2; ) r[n2] = e2(n2);
        return r;
      }
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        return function(e2) {
          return t2(e2);
        };
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = new t2.constructor(t2.byteLength);
        return new o(e2).set(new o(t2)), e2;
      }
      var o = n(49);
      t.exports = r;
    }, function(t, e, n) {
      (function(t2) {
        function r(t3, e2) {
          if (e2) return t3.slice();
          var n2 = t3.length, r2 = u ? u(n2) : new t3.constructor(n2);
          return t3.copy(r2), r2;
        }
        var o = n(1), i = "object" == typeof e && e && !e.nodeType && e, l = i && "object" == typeof t2 && t2 && !t2.nodeType && t2, a = l && l.exports === i, s = a ? o.Buffer : void 0, u = s ? s.allocUnsafe : void 0;
        t2.exports = r;
      }).call(e, n(14)(t));
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = e2 ? o(t2.buffer) : t2.buffer;
        return new t2.constructor(n2, t2.byteOffset, t2.length);
      }
      var o = n(62);
      t.exports = r;
    }, function(t, e) {
      function n(t2, e2) {
        var n2 = -1, r = t2.length;
        for (e2 || (e2 = Array(r)); ++n2 < r; ) e2[n2] = t2[n2];
        return e2;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2, n2, r2) {
        var l = !n2;
        n2 || (n2 = {});
        for (var a = -1, s = e2.length; ++a < s; ) {
          var u = e2[a], c = r2 ? r2(n2[u], t2[u], u, n2, t2) : void 0;
          void 0 === c && (c = t2[u]), l ? i(n2, u, c) : o(n2, u, c);
        }
        return n2;
      }
      var o = n(51), i = n(10);
      t.exports = r;
    }, function(t, e, n) {
      var r = n(1), o = r["__core-js_shared__"];
      t.exports = o;
    }, function(t, e, n) {
      function r(t2) {
        return o(function(e2, n2) {
          var r2 = -1, o2 = n2.length, l = o2 > 1 ? n2[o2 - 1] : void 0, a = o2 > 2 ? n2[2] : void 0;
          for (l = t2.length > 3 && "function" == typeof l ? (o2--, l) : void 0, a && i(n2[0], n2[1], a) && (l = o2 < 3 ? void 0 : l, o2 = 1), e2 = Object(e2); ++r2 < o2; ) {
            var s = n2[r2];
            s && t2(e2, s, r2, l);
          }
          return e2;
        });
      }
      var o = n(21), i = n(79);
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        return function(e2, n2, r) {
          for (var o = -1, i = Object(e2), l = r(e2), a = l.length; a--; ) {
            var s = l[t2 ? a : ++o];
            if (false === n2(i[s], s, i)) break;
          }
          return e2;
        };
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2, n2, l, a, s) {
        return i(t2) && i(e2) && (s.set(e2, t2), o(t2, e2, void 0, r, s), s.delete(e2)), t2;
      }
      var o = n(20), i = n(0);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = l.call(t2, s), n2 = t2[s];
        try {
          t2[s] = void 0;
          var r2 = true;
        } catch (t3) {
        }
        var o2 = a.call(t2);
        return r2 && (e2 ? t2[s] = n2 : delete t2[s]), o2;
      }
      var o = n(17), i = Object.prototype, l = i.hasOwnProperty, a = i.toString, s = o ? o.toStringTag : void 0;
      t.exports = r;
    }, function(t, e) {
      function n(t2, e2) {
        return null == t2 ? void 0 : t2[e2];
      }
      t.exports = n;
    }, function(t, e, n) {
      function r() {
        this.__data__ = o ? o(null) : {}, this.size = 0;
      }
      var o = n(7);
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        var e2 = this.has(t2) && delete this.__data__[t2];
        return this.size -= e2 ? 1 : 0, e2;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = this.__data__;
        if (o) {
          var n2 = e2[t2];
          return n2 === i ? void 0 : n2;
        }
        return a.call(e2, t2) ? e2[t2] : void 0;
      }
      var o = n(7), i = "__lodash_hash_undefined__", l = Object.prototype, a = l.hasOwnProperty;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = this.__data__;
        return o ? void 0 !== e2[t2] : l.call(e2, t2);
      }
      var o = n(7), i = Object.prototype, l = i.hasOwnProperty;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = this.__data__;
        return this.size += this.has(t2) ? 0 : 1, n2[t2] = o && void 0 === e2 ? i : e2, this;
      }
      var o = n(7), i = "__lodash_hash_undefined__";
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return "function" != typeof t2.constructor || l(t2) ? {} : o(i(t2));
      }
      var o = n(52), i = n(24), l = n(26);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2, n2) {
        if (!a(n2)) return false;
        var r2 = typeof e2;
        return !!("number" == r2 ? i(n2) && l(e2, n2.length) : "string" == r2 && e2 in n2) && o(n2[e2], t2);
      }
      var o = n(8), i = n(12), l = n(25), a = n(0);
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        var e2 = typeof t2;
        return "string" == e2 || "number" == e2 || "symbol" == e2 || "boolean" == e2 ? "__proto__" !== t2 : null === t2;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        return !!i && i in t2;
      }
      var o = n(67), i = function() {
        var t2 = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "");
        return t2 ? "Symbol(src)_1." + t2 : "";
      }();
      t.exports = r;
    }, function(t, e) {
      function n() {
        this.__data__ = [], this.size = 0;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = this.__data__, n2 = o(e2, t2);
        return !(n2 < 0) && (n2 == e2.length - 1 ? e2.pop() : l.call(e2, n2, 1), --this.size, true);
      }
      var o = n(4), i = Array.prototype, l = i.splice;
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = this.__data__, n2 = o(e2, t2);
        return n2 < 0 ? void 0 : e2[n2][1];
      }
      var o = n(4);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return o(this.__data__, t2) > -1;
      }
      var o = n(4);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = this.__data__, r2 = o(n2, t2);
        return r2 < 0 ? (++this.size, n2.push([t2, e2])) : n2[r2][1] = e2, this;
      }
      var o = n(4);
      t.exports = r;
    }, function(t, e, n) {
      function r() {
        this.size = 0, this.__data__ = { hash: new o(), map: new (l || i)(), string: new o() };
      }
      var o = n(46), i = n(3), l = n(16);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        var e2 = o(this, t2).delete(t2);
        return this.size -= e2 ? 1 : 0, e2;
      }
      var o = n(6);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return o(this, t2).get(t2);
      }
      var o = n(6);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        return o(this, t2).has(t2);
      }
      var o = n(6);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = o(this, t2), r2 = n2.size;
        return n2.set(t2, e2), this.size += n2.size == r2 ? 0 : 1, this;
      }
      var o = n(6);
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        var e2 = [];
        if (null != t2) for (var n2 in Object(t2)) e2.push(n2);
        return e2;
      }
      t.exports = n;
    }, function(t, e, n) {
      (function(t2) {
        var r = n(23), o = "object" == typeof e && e && !e.nodeType && e, i = o && "object" == typeof t2 && t2 && !t2.nodeType && t2, l = i && i.exports === o, a = l && r.process, s = function() {
          try {
            var t3 = i && i.require && i.require("util").types;
            return t3 || a && a.binding && a.binding("util");
          } catch (t4) {
          }
        }();
        t2.exports = s;
      }).call(e, n(14)(t));
    }, function(t, e) {
      function n(t2) {
        return o.call(t2);
      }
      var r = Object.prototype, o = r.toString;
      t.exports = n;
    }, function(t, e) {
      function n(t2, e2) {
        return function(n2) {
          return t2(e2(n2));
        };
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2, n2) {
        return e2 = i(void 0 === e2 ? t2.length - 1 : e2, 0), function() {
          for (var r2 = arguments, l = -1, a = i(r2.length - e2, 0), s = Array(a); ++l < a; ) s[l] = r2[e2 + l];
          l = -1;
          for (var u = Array(e2 + 1); ++l < e2; ) u[l] = r2[l];
          return u[e2] = n2(s), o(t2, this, u);
        };
      }
      var o = n(18), i = Math.max;
      t.exports = r;
    }, function(t, e, n) {
      var r = n(59), o = n(98), i = o(r);
      t.exports = i;
    }, function(t, e) {
      function n(t2) {
        var e2 = 0, n2 = 0;
        return function() {
          var l = i(), a = o - (l - n2);
          if (n2 = l, a > 0) {
            if (++e2 >= r) return arguments[0];
          } else e2 = 0;
          return t2.apply(void 0, arguments);
        };
      }
      var r = 800, o = 16, i = Date.now;
      t.exports = n;
    }, function(t, e, n) {
      function r() {
        this.__data__ = new o(), this.size = 0;
      }
      var o = n(3);
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        var e2 = this.__data__, n2 = e2.delete(t2);
        return this.size = e2.size, n2;
      }
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        return this.__data__.get(t2);
      }
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        return this.__data__.has(t2);
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2, e2) {
        var n2 = this.__data__;
        if (n2 instanceof o) {
          var r2 = n2.__data__;
          if (!i || r2.length < a - 1) return r2.push([t2, e2]), this.size = ++n2.size, this;
          n2 = this.__data__ = new l(r2);
        }
        return n2.set(t2, e2), this.size = n2.size, this;
      }
      var o = n(3), i = n(16), l = n(47), a = 200;
      t.exports = r;
    }, function(t, e) {
      function n(t2) {
        if (null != t2) {
          try {
            return o.call(t2);
          } catch (t3) {
          }
          try {
            return t2 + "";
          } catch (t3) {
          }
        }
        return "";
      }
      var r = Function.prototype, o = r.toString;
      t.exports = n;
    }, function(t, e) {
      function n(t2) {
        return function() {
          return t2;
        };
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        return i(t2) && o(t2);
      }
      var o = n(12), i = n(2);
      t.exports = r;
    }, function(t, e, n) {
      function r(t2) {
        if (!l(t2) || o(t2) != a) return false;
        var e2 = i(t2);
        if (null === e2) return true;
        var n2 = f.call(e2, "constructor") && e2.constructor;
        return "function" == typeof n2 && n2 instanceof n2 && c.call(n2) == h;
      }
      var o = n(5), i = n(24), l = n(2), a = "[object Object]", s = Function.prototype, u = Object.prototype, c = s.toString, f = u.hasOwnProperty, h = c.call(Object);
      t.exports = r;
    }, function(t, e, n) {
      var r = n(20), o = n(68), i = o(function(t2, e2, n2, o2) {
        r(t2, e2, n2, o2);
      });
      t.exports = i;
    }, function(t, e) {
      function n() {
        return false;
      }
      t.exports = n;
    }, function(t, e, n) {
      function r(t2) {
        return o(t2, i(t2));
      }
      var o = n(66), i = n(34);
      t.exports = r;
    }, function(t, e) {
      t.exports = '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="14" x2="4" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="12" x2="6" y1="4" y2="4"></line>\n</svg>';
    }, function(t, e) {
      t.exports = '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="3" x2="15" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="3" x2="13" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="3" x2="9" y1="4" y2="4"></line>\n</svg>';
    }, function(t, e) {
      t.exports = '<svg viewbox="0 0 18 18">\n  <line class="ql-stroke" x1="15" x2="3" y1="9" y2="9"></line>\n  <line class="ql-stroke" x1="15" x2="5" y1="14" y2="14"></line>\n  <line class="ql-stroke" x1="15" x2="9" y1="4" y2="4"></line>\n</svg>';
    }]);
  });
})(imageResize_min);
var imageResize_minExports = imageResize_min.exports;
const ImageResize = /* @__PURE__ */ getDefaultExportFromCjs(imageResize_minExports);
Quill.register("modules/imageResize", ImageResize);
const QUILL_MODULES = {
  imageResize: { parchment: Quill.import("parchment") },
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"]
  ]
};
const QUILL_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "align",
  "list",
  "blockquote",
  "code-block",
  "link",
  "image"
];
const empty = {
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: "",
  isPremium: false,
  publishNow: false,
  coverImage: void 0
};
function ArticleForm({
  defaultValues = {},
  onSubmit,
  isSubmitting,
  submitLabel,
  backTo
}) {
  const initial = { ...empty, ...defaultValues };
  const [values, setValues] = reactExports.useState(initial);
  const [errors, setErrors] = reactExports.useState({});
  const [coverPreview, setCoverPreview] = reactExports.useState(
    initial.coverImage ? initial.coverImage.getDirectURL() : null
  );
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const quillRef = reactExports.useRef(null);
  const insertImageHandler = reactExports.useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = () => {
      var _a2;
      const file = (_a2 = input.files) == null ? void 0 : _a2[0];
      if (!file) return;
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        if (img.width < 600) {
          alert(`Image too small. Minimum width is 600px (yours is ${img.width}px).`);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          var _a3;
          const base64 = reader.result;
          const editor = (_a3 = quillRef.current) == null ? void 0 : _a3.getEditor();
          if (!editor) return;
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, "image", base64);
          editor.setSelection(range.index + 1, 0);
        };
        reader.readAsDataURL(file);
      };
      img.src = url;
    };
  }, []);
  const set = reactExports.useCallback(
    (key, val) => {
      setValues((prev) => ({ ...prev, [key]: val }));
      setErrors((prev) => ({ ...prev, [key]: void 0 }));
    },
    []
  );
  const handleImageSelect = async (file) => {
    if (!file.type.startsWith("image/")) return;
    const previewUrl = URL.createObjectURL(file);
    setCoverPreview(previewUrl);
    setUploadProgress(0);
    const bytes = new Uint8Array(await file.arrayBuffer());
    const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
      setUploadProgress(pct);
    });
    set("coverImage", blob);
    setUploadProgress(null);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageSelect(file);
  };
  const removeCover = () => {
    setCoverPreview(null);
    set("coverImage", void 0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const validate = () => {
    const errs = {};
    if (!values.title.trim()) errs.title = "Title is required";
    if (!values.content.trim() || values.content === "<p><br></p>")
      errs.content = "Content is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "space-y-6",
      "data-ocid": "article_form.form",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            asChild: true,
            className: "gap-2 text-muted-foreground hover:text-foreground -ml-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link$1, { to: backTo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
              "Back to Dashboard"
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "type-label text-[11px]", children: "Cover Image" }),
          coverPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coverPreview,
                alt: "Cover preview",
                className: "w-full h-48 object-cover"
              }
            ),
            uploadProgress !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/70 flex flex-col items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-40 h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full bg-primary transition-all duration-200",
                  style: { width: `${uploadProgress}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "type-meta", children: [
                uploadProgress,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: removeCover,
                className: "absolute top-2 right-2 h-7 w-7 p-0 bg-background/80 hover:bg-background text-foreground rounded-full",
                "aria-label": "Remove cover image",
                "data-ocid": "article_form.remove_cover_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
              }
            )
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center gap-3 cursor-pointer hover:border-primary/40 hover:bg-muted/20 transition-colors duration-200",
              onDrop: handleDrop,
              onDragOver: (e) => e.preventDefault(),
              "data-ocid": "article_form.cover_dropzone",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-full bg-muted border border-border text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image$2, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body text-foreground font-medium", children: "Drop an image or click to upload" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground mt-0.5", children: "JPG, PNG, WebP up to 5MB" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "outline",
                    size: "sm",
                    className: "gap-2 mt-1",
                    onClick: () => {
                      var _a2;
                      return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                    },
                    "data-ocid": "article_form.upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-3.5" }),
                      "Choose File"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: fileInputRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                var _a2;
                const file = (_a2 = e.target.files) == null ? void 0 : _a2[0];
                if (file) handleImageSelect(file);
              },
              "data-ocid": "article_form.file_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", className: "type-label text-[11px]", children: [
            "Title ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input$1,
            {
              id: "title",
              value: values.title,
              onChange: (e) => set("title", e.target.value),
              placeholder: "Enter article title…",
              className: "font-display text-lg h-11",
              "data-ocid": "article_form.title_input"
            }
          ),
          errors.title && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "article_form.title_field_error", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InlineError, { message: errors.title }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "excerpt", className: "type-label text-[11px]", children: "Excerpt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "excerpt",
              value: values.excerpt,
              onChange: (e) => set("excerpt", e.target.value),
              placeholder: "A brief description of the article…",
              rows: 3,
              "data-ocid": "article_form.excerpt_textarea"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "category", className: "type-label text-[11px]", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input$1,
              {
                id: "category",
                value: values.category,
                onChange: (e) => set("category", e.target.value),
                placeholder: "e.g. ICP, Web3, Tutorial",
                "data-ocid": "article_form.category_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "tags", className: "type-label text-[11px]", children: [
              "Tags",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal normal-case", children: "(comma-separated)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input$1,
              {
                id: "tags",
                value: values.tags,
                onChange: (e) => set("tags", e.target.value),
                placeholder: "e.g. defi, nft, identity",
                "data-ocid": "article_form.tags_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "type-label text-[11px]", children: [
            "Content ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-lg overflow-hidden border border-border bg-card [&_.ql-toolbar]:bg-muted/40 [&_.ql-toolbar]:border-border [&_.ql-container]:border-border [&_.ql-editor]:min-h-[320px] [&_.ql-editor]:font-body [&_.ql-editor]:text-foreground [&_.ql-editor]:text-sm [&_.ql-editor]:leading-relaxed [&_.ql-toolbar.ql-snow]:border-border [&_.ql-container.ql-snow]:border-border [&_.ql-editor.ql-blank::before]:text-muted-foreground [&_.ql-stroke]:stroke-foreground [&_.ql-fill]:fill-foreground [&_.ql-picker-label]:text-foreground",
              "data-ocid": "article_form.editor",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                ReactQuill,
                {
                  theme: "snow",
                  value: values.content,
                  onChange: (val) => set("content", val),
                  ref: quillRef,
                  modules: {
                    ...QUILL_MODULES,
                    toolbar: {
                      container: QUILL_MODULES.toolbar,
                      handlers: { image: insertImageHandler }
                    }
                  },
                  formats: QUILL_FORMATS,
                  placeholder: "Write your article here…"
                }
              )
            }
          ),
          errors.content && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "article_form.content_field_error", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InlineError, { message: errors.content }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-lg divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body font-medium text-foreground", children: "Premium Article" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground", children: "Requires HERO token payment to read" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: values.isPremium,
                onCheckedChange: (checked) => set("isPremium", checked),
                "data-ocid": "article_form.premium_toggle"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-body font-medium text-foreground", children: "Publish Immediately" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "type-meta text-muted-foreground", children: "Make this article publicly visible right away" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                checked: values.publishNow,
                onCheckedChange: (checked) => set("publishNow", checked),
                "data-ocid": "article_form.publish_toggle"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "submit",
              disabled: isSubmitting,
              className: "gap-2",
              "data-ocid": "article_form.submit_button",
              children: isSubmitting ? "Saving…" : submitLabel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              asChild: true,
              "data-ocid": "article_form.cancel_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { to: backTo, children: "Cancel" })
            }
          )
        ] })
      ]
    }
  );
}
export {
  ArticleForm as A
};
