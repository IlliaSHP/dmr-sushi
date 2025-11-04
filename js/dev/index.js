import "./blockhead.min.js";
import { g as getHash, d as dataMediaQueries, s as slideDown, a as setHash, b as slideUp, c as bodyLockToggle, e as bodyLockStatus, f as bodyUnlock, h as gotoBlock } from "./common.min.js";
function tabs() {
  const tabs2 = document.querySelectorAll("[data-fls-tabs]");
  let tabsActiveHash = [];
  if (tabs2.length > 0) {
    const hash = getHash();
    if (hash && hash.startsWith("tab-")) {
      tabsActiveHash = hash.replace("tab-", "").split("-");
    }
    tabs2.forEach((tabsBlock, index) => {
      tabsBlock.classList.add("--tab-init");
      tabsBlock.setAttribute("data-fls-tabs-index", index);
      tabsBlock.addEventListener("click", setTabsAction);
      initTabs(tabsBlock);
    });
    let mdQueriesArray = dataMediaQueries(tabs2, "flsTabs");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
  function setTitlePosition(tabsMediaArray, matchMedia) {
    tabsMediaArray.forEach((tabsMediaItem) => {
      tabsMediaItem = tabsMediaItem.item;
      let tabsTitles = tabsMediaItem.querySelector("[data-fls-tabs-titles]");
      let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-fls-tabs-title]");
      let tabsContent = tabsMediaItem.querySelector("[data-fls-tabs-body]");
      let tabsContentItems = tabsMediaItem.querySelectorAll("[data-fls-tabs-item]");
      tabsTitleItems = Array.from(tabsTitleItems).filter((item) => item.closest("[data-fls-tabs]") === tabsMediaItem);
      tabsContentItems = Array.from(tabsContentItems).filter((item) => item.closest("[data-fls-tabs]") === tabsMediaItem);
      tabsContentItems.forEach((tabsContentItem, index) => {
        if (matchMedia.matches) {
          tabsContent.append(tabsTitleItems[index]);
          tabsContent.append(tabsContentItem);
          tabsMediaItem.classList.add("--tab-spoller");
        } else {
          tabsTitles.append(tabsTitleItems[index]);
          tabsMediaItem.classList.remove("--tab-spoller");
        }
      });
    });
  }
  function initTabs(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-fls-tabs-titles]>*");
    let tabsContent = tabsBlock.querySelectorAll("[data-fls-tabs-body]>*");
    const tabsBlockIndex = tabsBlock.dataset.flsTabsIndex;
    const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
    if (tabsActiveHashBlock) {
      const tabsActiveTitle = tabsBlock.querySelector("[data-fls-tabs-titles]>.--tab-active");
      tabsActiveTitle ? tabsActiveTitle.classList.remove("--tab-active") : null;
    }
    if (tabsContent.length) {
      tabsContent.forEach((tabsContentItem, index) => {
        tabsTitles[index].setAttribute("data-fls-tabs-title", "");
        tabsContentItem.setAttribute("data-fls-tabs-item", "");
        if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
          tabsTitles[index].classList.add("--tab-active");
        }
        tabsContentItem.hidden = !tabsTitles[index].classList.contains("--tab-active");
      });
    }
  }
  function setTabsStatus(tabsBlock) {
    let tabsTitles = tabsBlock.querySelectorAll("[data-fls-tabs-title]");
    let tabsContent = tabsBlock.querySelectorAll("[data-fls-tabs-item]");
    const tabsBlockIndex = tabsBlock.dataset.flsTabsIndex;
    function isTabsAnamate(tabsBlock2) {
      if (tabsBlock2.hasAttribute("data-fls-tabs-animate")) {
        return tabsBlock2.dataset.flsTabsAnimate > 0 ? Number(tabsBlock2.dataset.flsTabsAnimate) : 500;
      }
    }
    const tabsBlockAnimate = isTabsAnamate(tabsBlock);
    if (tabsContent.length > 0) {
      const isHash = tabsBlock.hasAttribute("data-fls-tabs-hash");
      tabsContent = Array.from(tabsContent).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock);
      tabsTitles = Array.from(tabsTitles).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock);
      tabsContent.forEach((tabsContentItem, index) => {
        if (tabsTitles[index].classList.contains("--tab-active")) {
          if (tabsBlockAnimate) {
            slideDown(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = false;
          }
          if (isHash && !tabsContentItem.closest(".popup")) {
            setHash(`tab-${tabsBlockIndex}-${index}`);
          }
        } else {
          if (tabsBlockAnimate) {
            slideUp(tabsContentItem, tabsBlockAnimate);
          } else {
            tabsContentItem.hidden = true;
          }
        }
      });
    }
  }
  function setTabsAction(e) {
    const el = e.target;
    if (el.closest("[data-fls-tabs-title]")) {
      const tabTitle = el.closest("[data-fls-tabs-title]");
      const tabsBlock = tabTitle.closest("[data-fls-tabs]");
      if (!tabTitle.classList.contains("--tab-active") && !tabsBlock.querySelector(".--slide")) {
        let tabActiveTitle = tabsBlock.querySelectorAll("[data-fls-tabs-title].--tab-active");
        tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item) => item.closest("[data-fls-tabs]") === tabsBlock) : null;
        tabActiveTitle.length ? tabActiveTitle[0].classList.remove("--tab-active") : null;
        tabTitle.classList.add("--tab-active");
        setTabsStatus(tabsBlock);
      }
      e.preventDefault();
    }
  }
}
window.addEventListener("load", tabs);
function isObject$1(obj) {
  return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
}
function extend$1(target = {}, src = {}) {
  const noExtend = ["__proto__", "constructor", "prototype"];
  Object.keys(src).filter((key) => noExtend.indexOf(key) < 0).forEach((key) => {
    if (typeof target[key] === "undefined") target[key] = src[key];
    else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
      extend$1(target[key], src[key]);
    }
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const doc = typeof document !== "undefined" ? document : {};
  extend$1(doc, ssrDocument);
  return doc;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function CustomEvent() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(callback) {
    if (typeof setTimeout === "undefined") {
      callback();
      return null;
    }
    return setTimeout(callback, 0);
  },
  cancelAnimationFrame(id) {
    if (typeof setTimeout === "undefined") {
      return;
    }
    clearTimeout(id);
  }
};
function getWindow() {
  const win = typeof window !== "undefined" ? window : {};
  extend$1(win, ssrWindow);
  return win;
}
function classesToTokens(classes2 = "") {
  return classes2.trim().split(" ").filter((c) => !!c.trim());
}
function deleteProps(obj) {
  const object = obj;
  Object.keys(object).forEach((key) => {
    try {
      object[key] = null;
    } catch (e) {
    }
    try {
      delete object[key];
    } catch (e) {
    }
  });
}
function nextTick(callback, delay = 0) {
  return setTimeout(callback, delay);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(el) {
  const window2 = getWindow();
  let style;
  if (window2.getComputedStyle) {
    style = window2.getComputedStyle(el, null);
  }
  if (!style && el.currentStyle) {
    style = el.currentStyle;
  }
  if (!style) {
    style = el.style;
  }
  return style;
}
function getTranslate(el, axis = "x") {
  const window2 = getWindow();
  let matrix;
  let curTransform;
  let transformMatrix;
  const curStyle = getComputedStyle$1(el);
  if (window2.WebKitCSSMatrix) {
    curTransform = curStyle.transform || curStyle.webkitTransform;
    if (curTransform.split(",").length > 6) {
      curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
    }
    transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
  } else {
    transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
    matrix = transformMatrix.toString().split(",");
  }
  if (axis === "x") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m41;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[12]);
    else curTransform = parseFloat(matrix[4]);
  }
  if (axis === "y") {
    if (window2.WebKitCSSMatrix) curTransform = transformMatrix.m42;
    else if (matrix.length === 16) curTransform = parseFloat(matrix[13]);
    else curTransform = parseFloat(matrix[5]);
  }
  return curTransform || 0;
}
function isObject(o) {
  return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
}
function isNode(node) {
  if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
    return node instanceof HTMLElement;
  }
  return node && (node.nodeType === 1 || node.nodeType === 11);
}
function extend(...args) {
  const to = Object(args[0]);
  const noExtend = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < args.length; i += 1) {
    const nextSource = args[i];
    if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
      const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
      for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
        const nextKey = keysArray[nextIndex];
        const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== void 0 && desc.enumerable) {
          if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
            to[nextKey] = {};
            if (nextSource[nextKey].__swiper__) {
              to[nextKey] = nextSource[nextKey];
            } else {
              extend(to[nextKey], nextSource[nextKey]);
            }
          } else {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
  }
  return to;
}
function setCSSProperty(el, varName, varValue) {
  el.style.setProperty(varName, varValue);
}
function animateCSSModeScroll({
  swiper,
  targetPosition,
  side
}) {
  const window2 = getWindow();
  const startPosition = -swiper.translate;
  let startTime = null;
  let time;
  const duration = swiper.params.speed;
  swiper.wrapperEl.style.scrollSnapType = "none";
  window2.cancelAnimationFrame(swiper.cssModeFrameID);
  const dir = targetPosition > startPosition ? "next" : "prev";
  const isOutOfBound = (current, target) => {
    return dir === "next" && current >= target || dir === "prev" && current <= target;
  };
  const animate = () => {
    time = (/* @__PURE__ */ new Date()).getTime();
    if (startTime === null) {
      startTime = time;
    }
    const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
    let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
    if (isOutOfBound(currentPosition, targetPosition)) {
      currentPosition = targetPosition;
    }
    swiper.wrapperEl.scrollTo({
      [side]: currentPosition
    });
    if (isOutOfBound(currentPosition, targetPosition)) {
      swiper.wrapperEl.style.overflow = "hidden";
      swiper.wrapperEl.style.scrollSnapType = "";
      setTimeout(() => {
        swiper.wrapperEl.style.overflow = "";
        swiper.wrapperEl.scrollTo({
          [side]: currentPosition
        });
      });
      window2.cancelAnimationFrame(swiper.cssModeFrameID);
      return;
    }
    swiper.cssModeFrameID = window2.requestAnimationFrame(animate);
  };
  animate();
}
function getSlideTransformEl(slideEl) {
  return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
}
function elementChildren(element, selector = "") {
  const window2 = getWindow();
  const children = [...element.children];
  if (window2.HTMLSlotElement && element instanceof HTMLSlotElement) {
    children.push(...element.assignedElements());
  }
  if (!selector) {
    return children;
  }
  return children.filter((el) => el.matches(selector));
}
function elementIsChildOfSlot(el, slot) {
  const elementsQueue = [slot];
  while (elementsQueue.length > 0) {
    const elementToCheck = elementsQueue.shift();
    if (el === elementToCheck) {
      return true;
    }
    elementsQueue.push(...elementToCheck.children, ...elementToCheck.shadowRoot ? elementToCheck.shadowRoot.children : [], ...elementToCheck.assignedElements ? elementToCheck.assignedElements() : []);
  }
}
function elementIsChildOf(el, parent) {
  const window2 = getWindow();
  let isChild = parent.contains(el);
  if (!isChild && window2.HTMLSlotElement && parent instanceof HTMLSlotElement) {
    const children = [...parent.assignedElements()];
    isChild = children.includes(el);
    if (!isChild) {
      isChild = elementIsChildOfSlot(el, parent);
    }
  }
  return isChild;
}
function showWarning(text) {
  try {
    console.warn(text);
    return;
  } catch (err) {
  }
}
function createElement(tag, classes2 = []) {
  const el = document.createElement(tag);
  el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
  return el;
}
function elementPrevAll(el, selector) {
  const prevEls = [];
  while (el.previousElementSibling) {
    const prev = el.previousElementSibling;
    if (selector) {
      if (prev.matches(selector)) prevEls.push(prev);
    } else prevEls.push(prev);
    el = prev;
  }
  return prevEls;
}
function elementNextAll(el, selector) {
  const nextEls = [];
  while (el.nextElementSibling) {
    const next = el.nextElementSibling;
    if (selector) {
      if (next.matches(selector)) nextEls.push(next);
    } else nextEls.push(next);
    el = next;
  }
  return nextEls;
}
function elementStyle(el, prop) {
  const window2 = getWindow();
  return window2.getComputedStyle(el, null).getPropertyValue(prop);
}
function elementIndex(el) {
  let child = el;
  let i;
  if (child) {
    i = 0;
    while ((child = child.previousSibling) !== null) {
      if (child.nodeType === 1) i += 1;
    }
    return i;
  }
  return void 0;
}
function elementParents(el, selector) {
  const parents = [];
  let parent = el.parentElement;
  while (parent) {
    {
      parents.push(parent);
    }
    parent = parent.parentElement;
  }
  return parents;
}
function elementTransitionEnd(el, callback) {
  function fireCallBack(e) {
    if (e.target !== el) return;
    callback.call(el, e);
    el.removeEventListener("transitionend", fireCallBack);
  }
  if (callback) {
    el.addEventListener("transitionend", fireCallBack);
  }
}
function elementOuterSize(el, size, includeMargins) {
  const window2 = getWindow();
  {
    return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
  }
}
function makeElementsArray(el) {
  return (Array.isArray(el) ? el : [el]).filter((e) => !!e);
}
function setInnerHTML(el, html = "") {
  if (typeof trustedTypes !== "undefined") {
    el.innerHTML = trustedTypes.createPolicy("html", {
      createHTML: (s) => s
    }).createHTML(html);
  } else {
    el.innerHTML = html;
  }
}
let support;
function calcSupport() {
  const window2 = getWindow();
  const document2 = getDocument();
  return {
    smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
    touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
  };
}
function getSupport() {
  if (!support) {
    support = calcSupport();
  }
  return support;
}
let deviceCached;
function calcDevice({
  userAgent
} = {}) {
  const support2 = getSupport();
  const window2 = getWindow();
  const platform = window2.navigator.platform;
  const ua = userAgent || window2.navigator.userAgent;
  const device = {
    ios: false,
    android: false
  };
  const screenWidth = window2.screen.width;
  const screenHeight = window2.screen.height;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  let ipad = ua.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
  const windows = platform === "Win32";
  let macos = platform === "MacIntel";
  const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
    ipad = ua.match(/(Version)\/([\d.]+)/);
    if (!ipad) ipad = [0, 1, "13_0_0"];
    macos = false;
  }
  if (android && !windows) {
    device.os = "android";
    device.android = true;
  }
  if (ipad || iphone || ipod) {
    device.os = "ios";
    device.ios = true;
  }
  return device;
}
function getDevice(overrides = {}) {
  if (!deviceCached) {
    deviceCached = calcDevice(overrides);
  }
  return deviceCached;
}
let browser;
function calcBrowser() {
  const window2 = getWindow();
  const device = getDevice();
  let needPerspectiveFix = false;
  function isSafari() {
    const ua = window2.navigator.userAgent.toLowerCase();
    return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
  }
  if (isSafari()) {
    const ua = String(window2.navigator.userAgent);
    if (ua.includes("Version/")) {
      const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
      needPerspectiveFix = major < 16 || major === 16 && minor < 2;
    }
  }
  const isWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent);
  const isSafariBrowser = isSafari();
  const need3dFix = isSafariBrowser || isWebView && device.ios;
  return {
    isSafari: needPerspectiveFix || isSafariBrowser,
    needPerspectiveFix,
    need3dFix,
    isWebView
  };
}
function getBrowser() {
  if (!browser) {
    browser = calcBrowser();
  }
  return browser;
}
function Resize({
  swiper,
  on,
  emit
}) {
  const window2 = getWindow();
  let observer = null;
  let animationFrame = null;
  const resizeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("beforeResize");
    emit("resize");
  };
  const createObserver = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    observer = new ResizeObserver((entries) => {
      animationFrame = window2.requestAnimationFrame(() => {
        const {
          width,
          height
        } = swiper;
        let newWidth = width;
        let newHeight = height;
        entries.forEach(({
          contentBoxSize,
          contentRect,
          target
        }) => {
          if (target && target !== swiper.el) return;
          newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
          newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
        });
        if (newWidth !== width || newHeight !== height) {
          resizeHandler();
        }
      });
    });
    observer.observe(swiper.el);
  };
  const removeObserver = () => {
    if (animationFrame) {
      window2.cancelAnimationFrame(animationFrame);
    }
    if (observer && observer.unobserve && swiper.el) {
      observer.unobserve(swiper.el);
      observer = null;
    }
  };
  const orientationChangeHandler = () => {
    if (!swiper || swiper.destroyed || !swiper.initialized) return;
    emit("orientationchange");
  };
  on("init", () => {
    if (swiper.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
      createObserver();
      return;
    }
    window2.addEventListener("resize", resizeHandler);
    window2.addEventListener("orientationchange", orientationChangeHandler);
  });
  on("destroy", () => {
    removeObserver();
    window2.removeEventListener("resize", resizeHandler);
    window2.removeEventListener("orientationchange", orientationChangeHandler);
  });
}
function Observer({
  swiper,
  extendParams,
  on,
  emit
}) {
  const observers = [];
  const window2 = getWindow();
  const attach = (target, options = {}) => {
    const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
    const observer = new ObserverFunc((mutations) => {
      if (swiper.__preventObserver__) return;
      if (mutations.length === 1) {
        emit("observerUpdate", mutations[0]);
        return;
      }
      const observerUpdate = function observerUpdate2() {
        emit("observerUpdate", mutations[0]);
      };
      if (window2.requestAnimationFrame) {
        window2.requestAnimationFrame(observerUpdate);
      } else {
        window2.setTimeout(observerUpdate, 0);
      }
    });
    observer.observe(target, {
      attributes: typeof options.attributes === "undefined" ? true : options.attributes,
      childList: swiper.isElement || (typeof options.childList === "undefined" ? true : options).childList,
      characterData: typeof options.characterData === "undefined" ? true : options.characterData
    });
    observers.push(observer);
  };
  const init = () => {
    if (!swiper.params.observer) return;
    if (swiper.params.observeParents) {
      const containerParents = elementParents(swiper.hostEl);
      for (let i = 0; i < containerParents.length; i += 1) {
        attach(containerParents[i]);
      }
    }
    attach(swiper.hostEl, {
      childList: swiper.params.observeSlideChildren
    });
    attach(swiper.wrapperEl, {
      attributes: false
    });
  };
  const destroy = () => {
    observers.forEach((observer) => {
      observer.disconnect();
    });
    observers.splice(0, observers.length);
  };
  extendParams({
    observer: false,
    observeParents: false,
    observeSlideChildren: false
  });
  on("init", init);
  on("destroy", destroy);
}
var eventsEmitter = {
  on(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    const method = priority ? "unshift" : "push";
    events2.split(" ").forEach((event) => {
      if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
      self.eventsListeners[event][method](handler);
    });
    return self;
  },
  once(events2, handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    function onceHandler(...args) {
      self.off(events2, onceHandler);
      if (onceHandler.__emitterProxy) {
        delete onceHandler.__emitterProxy;
      }
      handler.apply(self, args);
    }
    onceHandler.__emitterProxy = handler;
    return self.on(events2, onceHandler, priority);
  },
  onAny(handler, priority) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (typeof handler !== "function") return self;
    const method = priority ? "unshift" : "push";
    if (self.eventsAnyListeners.indexOf(handler) < 0) {
      self.eventsAnyListeners[method](handler);
    }
    return self;
  },
  offAny(handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsAnyListeners) return self;
    const index = self.eventsAnyListeners.indexOf(handler);
    if (index >= 0) {
      self.eventsAnyListeners.splice(index, 1);
    }
    return self;
  },
  off(events2, handler) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    events2.split(" ").forEach((event) => {
      if (typeof handler === "undefined") {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler, index) => {
          if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  },
  emit(...args) {
    const self = this;
    if (!self.eventsListeners || self.destroyed) return self;
    if (!self.eventsListeners) return self;
    let events2;
    let data;
    let context;
    if (typeof args[0] === "string" || Array.isArray(args[0])) {
      events2 = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events2 = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    data.unshift(context);
    const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
    eventsArray.forEach((event) => {
      if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
        self.eventsAnyListeners.forEach((eventHandler) => {
          eventHandler.apply(context, [event, ...data]);
        });
      }
      if (self.eventsListeners && self.eventsListeners[event]) {
        self.eventsListeners[event].forEach((eventHandler) => {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  }
};
function updateSize() {
  const swiper = this;
  let width;
  let height;
  const el = swiper.el;
  if (typeof swiper.params.width !== "undefined" && swiper.params.width !== null) {
    width = swiper.params.width;
  } else {
    width = el.clientWidth;
  }
  if (typeof swiper.params.height !== "undefined" && swiper.params.height !== null) {
    height = swiper.params.height;
  } else {
    height = el.clientHeight;
  }
  if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
    return;
  }
  width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
  height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
  if (Number.isNaN(width)) width = 0;
  if (Number.isNaN(height)) height = 0;
  Object.assign(swiper, {
    width,
    height,
    size: swiper.isHorizontal() ? width : height
  });
}
function updateSlides() {
  const swiper = this;
  function getDirectionPropertyValue(node, label) {
    return parseFloat(node.getPropertyValue(swiper.getDirectionLabel(label)) || 0);
  }
  const params = swiper.params;
  const {
    wrapperEl,
    slidesEl,
    rtlTranslate: rtl,
    wrongRTL
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
  const slides = elementChildren(slidesEl, `.${swiper.params.slideClass}, swiper-slide`);
  const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
  let snapGrid = [];
  const slidesGrid = [];
  const slidesSizesGrid = [];
  let offsetBefore = params.slidesOffsetBefore;
  if (typeof offsetBefore === "function") {
    offsetBefore = params.slidesOffsetBefore.call(swiper);
  }
  let offsetAfter = params.slidesOffsetAfter;
  if (typeof offsetAfter === "function") {
    offsetAfter = params.slidesOffsetAfter.call(swiper);
  }
  const previousSnapGridLength = swiper.snapGrid.length;
  const previousSlidesGridLength = swiper.slidesGrid.length;
  const swiperSize = swiper.size - offsetBefore - offsetAfter;
  let spaceBetween = params.spaceBetween;
  let slidePosition = -offsetBefore;
  let prevSlideSize = 0;
  let index = 0;
  if (typeof swiperSize === "undefined") {
    return;
  }
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  swiper.virtualSize = -spaceBetween - offsetBefore - offsetAfter;
  slides.forEach((slideEl) => {
    if (rtl) {
      slideEl.style.marginLeft = "";
    } else {
      slideEl.style.marginRight = "";
    }
    slideEl.style.marginBottom = "";
    slideEl.style.marginTop = "";
  });
  if (params.centeredSlides && params.cssMode) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
  }
  const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;
  if (gridEnabled) {
    swiper.grid.initSlides(slides);
  } else if (swiper.grid) {
    swiper.grid.unsetSlides();
  }
  let slideSize;
  const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
    return typeof params.breakpoints[key].slidesPerView !== "undefined";
  }).length > 0;
  for (let i = 0; i < slidesLength; i += 1) {
    slideSize = 0;
    const slide2 = slides[i];
    if (slide2) {
      if (gridEnabled) {
        swiper.grid.updateSlide(i, slide2, slides);
      }
      if (elementStyle(slide2, "display") === "none") continue;
    }
    if (isVirtual && params.slidesPerView === "auto") {
      if (params.virtual.slidesPerViewAutoSlideSize) {
        slideSize = params.virtual.slidesPerViewAutoSlideSize;
      }
      if (slideSize && slide2) {
        if (params.roundLengths) slideSize = Math.floor(slideSize);
        slide2.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
      }
    } else if (params.slidesPerView === "auto") {
      if (shouldResetSlideSize) {
        slide2.style[swiper.getDirectionLabel("width")] = ``;
      }
      const slideStyles = getComputedStyle(slide2);
      const currentTransform = slide2.style.transform;
      const currentWebKitTransform = slide2.style.webkitTransform;
      if (currentTransform) {
        slide2.style.transform = "none";
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = "none";
      }
      if (params.roundLengths) {
        slideSize = swiper.isHorizontal() ? elementOuterSize(slide2, "width") : elementOuterSize(slide2, "height");
      } else {
        const width = getDirectionPropertyValue(slideStyles, "width");
        const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
        const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
        const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
        const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
        const boxSizing = slideStyles.getPropertyValue("box-sizing");
        if (boxSizing && boxSizing === "border-box") {
          slideSize = width + marginLeft + marginRight;
        } else {
          const {
            clientWidth,
            offsetWidth
          } = slide2;
          slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
        }
      }
      if (currentTransform) {
        slide2.style.transform = currentTransform;
      }
      if (currentWebKitTransform) {
        slide2.style.webkitTransform = currentWebKitTransform;
      }
      if (params.roundLengths) slideSize = Math.floor(slideSize);
    } else {
      slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
      if (params.roundLengths) slideSize = Math.floor(slideSize);
      if (slide2) {
        slide2.style[swiper.getDirectionLabel("width")] = `${slideSize}px`;
      }
    }
    if (slide2) {
      slide2.swiperSlideSize = slideSize;
    }
    slidesSizesGrid.push(slideSize);
    if (params.centeredSlides) {
      slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
      if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
      if (Math.abs(slidePosition) < 1 / 1e3) slidePosition = 0;
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
    } else {
      if (params.roundLengths) slidePosition = Math.floor(slidePosition);
      if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0) snapGrid.push(slidePosition);
      slidesGrid.push(slidePosition);
      slidePosition = slidePosition + slideSize + spaceBetween;
    }
    swiper.virtualSize += slideSize + spaceBetween;
    prevSlideSize = slideSize;
    index += 1;
  }
  swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
  if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
    wrapperEl.style.width = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (params.setWrapperSize) {
    wrapperEl.style[swiper.getDirectionLabel("width")] = `${swiper.virtualSize + spaceBetween}px`;
  }
  if (gridEnabled) {
    swiper.grid.updateWrapperSize(slideSize, snapGrid);
  }
  if (!params.centeredSlides) {
    const newSlidesGrid = [];
    for (let i = 0; i < snapGrid.length; i += 1) {
      let slidesGridItem = snapGrid[i];
      if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);
      if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
        newSlidesGrid.push(slidesGridItem);
      }
    }
    snapGrid = newSlidesGrid;
    if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
      snapGrid.push(swiper.virtualSize - swiperSize);
    }
  }
  if (isVirtual && params.loop) {
    const size = slidesSizesGrid[0] + spaceBetween;
    if (params.slidesPerGroup > 1) {
      const groups = Math.ceil((swiper.virtual.slidesBefore + swiper.virtual.slidesAfter) / params.slidesPerGroup);
      const groupSize = size * params.slidesPerGroup;
      for (let i = 0; i < groups; i += 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
      }
    }
    for (let i = 0; i < swiper.virtual.slidesBefore + swiper.virtual.slidesAfter; i += 1) {
      if (params.slidesPerGroup === 1) {
        snapGrid.push(snapGrid[snapGrid.length - 1] + size);
      }
      slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
      swiper.virtualSize += size;
    }
  }
  if (snapGrid.length === 0) snapGrid = [0];
  if (spaceBetween !== 0) {
    const key = swiper.isHorizontal() && rtl ? "marginLeft" : swiper.getDirectionLabel("marginRight");
    slides.filter((_, slideIndex) => {
      if (!params.cssMode || params.loop) return true;
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }).forEach((slideEl) => {
      slideEl.style[key] = `${spaceBetween}px`;
    });
  }
  if (params.centeredSlides && params.centeredSlidesBounds) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const maxSnap = allSlidesSize > swiperSize ? allSlidesSize - swiperSize : 0;
    snapGrid = snapGrid.map((snap) => {
      if (snap <= 0) return -offsetBefore;
      if (snap > maxSnap) return maxSnap + offsetAfter;
      return snap;
    });
  }
  if (params.centerInsufficientSlides) {
    let allSlidesSize = 0;
    slidesSizesGrid.forEach((slideSizeValue) => {
      allSlidesSize += slideSizeValue + (spaceBetween || 0);
    });
    allSlidesSize -= spaceBetween;
    const offsetSize = (offsetBefore || 0) + (offsetAfter || 0);
    if (allSlidesSize + offsetSize < swiperSize) {
      const allSlidesOffset = (swiperSize - allSlidesSize - offsetSize) / 2;
      snapGrid.forEach((snap, snapIndex) => {
        snapGrid[snapIndex] = snap - allSlidesOffset;
      });
      slidesGrid.forEach((snap, snapIndex) => {
        slidesGrid[snapIndex] = snap + allSlidesOffset;
      });
    }
  }
  Object.assign(swiper, {
    slides,
    snapGrid,
    slidesGrid,
    slidesSizesGrid
  });
  if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
    setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
    setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
    const addToSnapGrid = -swiper.snapGrid[0];
    const addToSlidesGrid = -swiper.slidesGrid[0];
    swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
    swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
  }
  if (slidesLength !== previousSlidesLength) {
    swiper.emit("slidesLengthChange");
  }
  if (snapGrid.length !== previousSnapGridLength) {
    if (swiper.params.watchOverflow) swiper.checkOverflow();
    swiper.emit("snapGridLengthChange");
  }
  if (slidesGrid.length !== previousSlidesGridLength) {
    swiper.emit("slidesGridLengthChange");
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  swiper.emit("slidesUpdated");
  if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
    const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
    const hasClassBackfaceClassAdded = swiper.el.classList.contains(backFaceHiddenClass);
    if (slidesLength <= params.maxBackfaceHiddenSlides) {
      if (!hasClassBackfaceClassAdded) swiper.el.classList.add(backFaceHiddenClass);
    } else if (hasClassBackfaceClassAdded) {
      swiper.el.classList.remove(backFaceHiddenClass);
    }
  }
}
function updateAutoHeight(speed) {
  const swiper = this;
  const activeSlides = [];
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  let newHeight = 0;
  let i;
  if (typeof speed === "number") {
    swiper.setTransition(speed);
  } else if (speed === true) {
    swiper.setTransition(swiper.params.speed);
  }
  const getSlideByIndex = (index) => {
    if (isVirtual) {
      return swiper.slides[swiper.getSlideIndexByData(index)];
    }
    return swiper.slides[index];
  };
  if (swiper.params.slidesPerView !== "auto" && swiper.params.slidesPerView > 1) {
    if (swiper.params.centeredSlides) {
      (swiper.visibleSlides || []).forEach((slide2) => {
        activeSlides.push(slide2);
      });
    } else {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        const index = swiper.activeIndex + i;
        if (index > swiper.slides.length && !isVirtual) break;
        activeSlides.push(getSlideByIndex(index));
      }
    }
  } else {
    activeSlides.push(getSlideByIndex(swiper.activeIndex));
  }
  for (i = 0; i < activeSlides.length; i += 1) {
    if (typeof activeSlides[i] !== "undefined") {
      const height = activeSlides[i].offsetHeight;
      newHeight = height > newHeight ? height : newHeight;
    }
  }
  if (newHeight || newHeight === 0) swiper.wrapperEl.style.height = `${newHeight}px`;
}
function updateSlidesOffset() {
  const swiper = this;
  const slides = swiper.slides;
  const minusOffset = swiper.isElement ? swiper.isHorizontal() ? swiper.wrapperEl.offsetLeft : swiper.wrapperEl.offsetTop : 0;
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].swiperSlideOffset = (swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper.cssOverflowAdjustment();
  }
}
const toggleSlideClasses$1 = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesProgress(translate2 = this && this.translate || 0) {
  const swiper = this;
  const params = swiper.params;
  const {
    slides,
    rtlTranslate: rtl,
    snapGrid
  } = swiper;
  if (slides.length === 0) return;
  if (typeof slides[0].swiperSlideOffset === "undefined") swiper.updateSlidesOffset();
  let offsetCenter = -translate2;
  if (rtl) offsetCenter = translate2;
  swiper.visibleSlidesIndexes = [];
  swiper.visibleSlides = [];
  let spaceBetween = params.spaceBetween;
  if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
    spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper.size;
  } else if (typeof spaceBetween === "string") {
    spaceBetween = parseFloat(spaceBetween);
  }
  for (let i = 0; i < slides.length; i += 1) {
    const slide2 = slides[i];
    let slideOffset = slide2.swiperSlideOffset;
    if (params.cssMode && params.centeredSlides) {
      slideOffset -= slides[0].swiperSlideOffset;
    }
    const slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
    const slideBefore = -(offsetCenter - slideOffset);
    const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
    const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper.size - swiper.slidesSizesGrid[i];
    const isVisible = slideBefore >= 0 && slideBefore < swiper.size - 1 || slideAfter > 1 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;
    if (isVisible) {
      swiper.visibleSlides.push(slide2);
      swiper.visibleSlidesIndexes.push(i);
    }
    toggleSlideClasses$1(slide2, isVisible, params.slideVisibleClass);
    toggleSlideClasses$1(slide2, isFullyVisible, params.slideFullyVisibleClass);
    slide2.progress = rtl ? -slideProgress : slideProgress;
    slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
  }
}
function updateProgress(translate2) {
  const swiper = this;
  if (typeof translate2 === "undefined") {
    const multiplier = swiper.rtlTranslate ? -1 : 1;
    translate2 = swiper && swiper.translate && swiper.translate * multiplier || 0;
  }
  const params = swiper.params;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  let {
    progress,
    isBeginning,
    isEnd,
    progressLoop
  } = swiper;
  const wasBeginning = isBeginning;
  const wasEnd = isEnd;
  if (translatesDiff === 0) {
    progress = 0;
    isBeginning = true;
    isEnd = true;
  } else {
    progress = (translate2 - swiper.minTranslate()) / translatesDiff;
    const isBeginningRounded = Math.abs(translate2 - swiper.minTranslate()) < 1;
    const isEndRounded = Math.abs(translate2 - swiper.maxTranslate()) < 1;
    isBeginning = isBeginningRounded || progress <= 0;
    isEnd = isEndRounded || progress >= 1;
    if (isBeginningRounded) progress = 0;
    if (isEndRounded) progress = 1;
  }
  if (params.loop) {
    const firstSlideIndex = swiper.getSlideIndexByData(0);
    const lastSlideIndex = swiper.getSlideIndexByData(swiper.slides.length - 1);
    const firstSlideTranslate = swiper.slidesGrid[firstSlideIndex];
    const lastSlideTranslate = swiper.slidesGrid[lastSlideIndex];
    const translateMax = swiper.slidesGrid[swiper.slidesGrid.length - 1];
    const translateAbs = Math.abs(translate2);
    if (translateAbs >= firstSlideTranslate) {
      progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
    } else {
      progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
    }
    if (progressLoop > 1) progressLoop -= 1;
  }
  Object.assign(swiper, {
    progress,
    progressLoop,
    isBeginning,
    isEnd
  });
  if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight) swiper.updateSlidesProgress(translate2);
  if (isBeginning && !wasBeginning) {
    swiper.emit("reachBeginning toEdge");
  }
  if (isEnd && !wasEnd) {
    swiper.emit("reachEnd toEdge");
  }
  if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
    swiper.emit("fromEdge");
  }
  swiper.emit("progress", progress);
}
const toggleSlideClasses = (slideEl, condition, className) => {
  if (condition && !slideEl.classList.contains(className)) {
    slideEl.classList.add(className);
  } else if (!condition && slideEl.classList.contains(className)) {
    slideEl.classList.remove(className);
  }
};
function updateSlidesClasses() {
  const swiper = this;
  const {
    slides,
    params,
    slidesEl,
    activeIndex
  } = swiper;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  const getFilteredSlide = (selector) => {
    return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
  };
  let activeSlide;
  let prevSlide;
  let nextSlide;
  if (isVirtual) {
    if (params.loop) {
      let slideIndex = activeIndex - swiper.virtual.slidesBefore;
      if (slideIndex < 0) slideIndex = swiper.virtual.slides.length + slideIndex;
      if (slideIndex >= swiper.virtual.slides.length) slideIndex -= swiper.virtual.slides.length;
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
    } else {
      activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
    }
  } else {
    if (gridEnabled) {
      activeSlide = slides.find((slideEl) => slideEl.column === activeIndex);
      nextSlide = slides.find((slideEl) => slideEl.column === activeIndex + 1);
      prevSlide = slides.find((slideEl) => slideEl.column === activeIndex - 1);
    } else {
      activeSlide = slides[activeIndex];
    }
  }
  if (activeSlide) {
    if (!gridEnabled) {
      nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !nextSlide) {
        nextSlide = slides[0];
      }
      prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
      if (params.loop && !prevSlide === 0) {
        prevSlide = slides[slides.length - 1];
      }
    }
  }
  slides.forEach((slideEl) => {
    toggleSlideClasses(slideEl, slideEl === activeSlide, params.slideActiveClass);
    toggleSlideClasses(slideEl, slideEl === nextSlide, params.slideNextClass);
    toggleSlideClasses(slideEl, slideEl === prevSlide, params.slidePrevClass);
  });
  swiper.emitSlidesClasses();
}
const processLazyPreloader = (swiper, imageEl) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  const slideSelector = () => swiper.isElement ? `swiper-slide` : `.${swiper.params.slideClass}`;
  const slideEl = imageEl.closest(slideSelector());
  if (slideEl) {
    let lazyEl = slideEl.querySelector(`.${swiper.params.lazyPreloaderClass}`);
    if (!lazyEl && swiper.isElement) {
      if (slideEl.shadowRoot) {
        lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
      } else {
        requestAnimationFrame(() => {
          if (slideEl.shadowRoot) {
            lazyEl = slideEl.shadowRoot.querySelector(`.${swiper.params.lazyPreloaderClass}`);
            if (lazyEl) lazyEl.remove();
          }
        });
      }
    }
    if (lazyEl) lazyEl.remove();
  }
};
const unlazy = (swiper, index) => {
  if (!swiper.slides[index]) return;
  const imageEl = swiper.slides[index].querySelector('[loading="lazy"]');
  if (imageEl) imageEl.removeAttribute("loading");
};
const preload = (swiper) => {
  if (!swiper || swiper.destroyed || !swiper.params) return;
  let amount = swiper.params.lazyPreloadPrevNext;
  const len = swiper.slides.length;
  if (!len || !amount || amount < 0) return;
  amount = Math.min(amount, len);
  const slidesPerView = swiper.params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(swiper.params.slidesPerView);
  const activeIndex = swiper.activeIndex;
  if (swiper.params.grid && swiper.params.grid.rows > 1) {
    const activeColumn = activeIndex;
    const preloadColumns = [activeColumn - amount];
    preloadColumns.push(...Array.from({
      length: amount
    }).map((_, i) => {
      return activeColumn + slidesPerView + i;
    }));
    swiper.slides.forEach((slideEl, i) => {
      if (preloadColumns.includes(slideEl.column)) unlazy(swiper, i);
    });
    return;
  }
  const slideIndexLastInView = activeIndex + slidesPerView - 1;
  if (swiper.params.rewind || swiper.params.loop) {
    for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
      const realIndex = (i % len + len) % len;
      if (realIndex < activeIndex || realIndex > slideIndexLastInView) unlazy(swiper, realIndex);
    }
  } else {
    for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
      if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
        unlazy(swiper, i);
      }
    }
  }
};
function getActiveIndexByTranslate(swiper) {
  const {
    slidesGrid,
    params
  } = swiper;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  let activeIndex;
  for (let i = 0; i < slidesGrid.length; i += 1) {
    if (typeof slidesGrid[i + 1] !== "undefined") {
      if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
        activeIndex = i;
      } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
        activeIndex = i + 1;
      }
    } else if (translate2 >= slidesGrid[i]) {
      activeIndex = i;
    }
  }
  if (params.normalizeSlideIndex) {
    if (activeIndex < 0 || typeof activeIndex === "undefined") activeIndex = 0;
  }
  return activeIndex;
}
function updateActiveIndex(newActiveIndex) {
  const swiper = this;
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  const {
    snapGrid,
    params,
    activeIndex: previousIndex,
    realIndex: previousRealIndex,
    snapIndex: previousSnapIndex
  } = swiper;
  let activeIndex = newActiveIndex;
  let snapIndex;
  const getVirtualRealIndex = (aIndex) => {
    let realIndex2 = aIndex - swiper.virtual.slidesBefore;
    if (realIndex2 < 0) {
      realIndex2 = swiper.virtual.slides.length + realIndex2;
    }
    if (realIndex2 >= swiper.virtual.slides.length) {
      realIndex2 -= swiper.virtual.slides.length;
    }
    return realIndex2;
  };
  if (typeof activeIndex === "undefined") {
    activeIndex = getActiveIndexByTranslate(swiper);
  }
  if (snapGrid.indexOf(translate2) >= 0) {
    snapIndex = snapGrid.indexOf(translate2);
  } else {
    const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
    snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
  }
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  if (activeIndex === previousIndex && !swiper.params.loop) {
    if (snapIndex !== previousSnapIndex) {
      swiper.snapIndex = snapIndex;
      swiper.emit("snapIndexChange");
    }
    return;
  }
  if (activeIndex === previousIndex && swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
    swiper.realIndex = getVirtualRealIndex(activeIndex);
    return;
  }
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  let realIndex;
  if (swiper.virtual && params.virtual.enabled && params.loop) {
    realIndex = getVirtualRealIndex(activeIndex);
  } else if (gridEnabled) {
    const firstSlideInColumn = swiper.slides.find((slideEl) => slideEl.column === activeIndex);
    let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
    if (Number.isNaN(activeSlideIndex)) {
      activeSlideIndex = Math.max(swiper.slides.indexOf(firstSlideInColumn), 0);
    }
    realIndex = Math.floor(activeSlideIndex / params.grid.rows);
  } else if (swiper.slides[activeIndex]) {
    const slideIndex = swiper.slides[activeIndex].getAttribute("data-swiper-slide-index");
    if (slideIndex) {
      realIndex = parseInt(slideIndex, 10);
    } else {
      realIndex = activeIndex;
    }
  } else {
    realIndex = activeIndex;
  }
  Object.assign(swiper, {
    previousSnapIndex,
    snapIndex,
    previousRealIndex,
    realIndex,
    previousIndex,
    activeIndex
  });
  if (swiper.initialized) {
    preload(swiper);
  }
  swiper.emit("activeIndexChange");
  swiper.emit("snapIndexChange");
  if (swiper.initialized || swiper.params.runCallbacksOnInit) {
    if (previousRealIndex !== realIndex) {
      swiper.emit("realIndexChange");
    }
    swiper.emit("slideChange");
  }
}
function updateClickedSlide(el, path) {
  const swiper = this;
  const params = swiper.params;
  let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
  if (!slide2 && swiper.isElement && path && path.length > 1 && path.includes(el)) {
    [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
      if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
        slide2 = pathEl;
      }
    });
  }
  let slideFound = false;
  let slideIndex;
  if (slide2) {
    for (let i = 0; i < swiper.slides.length; i += 1) {
      if (swiper.slides[i] === slide2) {
        slideFound = true;
        slideIndex = i;
        break;
      }
    }
  }
  if (slide2 && slideFound) {
    swiper.clickedSlide = slide2;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      swiper.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
    } else {
      swiper.clickedIndex = slideIndex;
    }
  } else {
    swiper.clickedSlide = void 0;
    swiper.clickedIndex = void 0;
    return;
  }
  if (params.slideToClickedSlide && swiper.clickedIndex !== void 0 && swiper.clickedIndex !== swiper.activeIndex) {
    swiper.slideToClickedSlide();
  }
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(axis = this.isHorizontal() ? "x" : "y") {
  const swiper = this;
  const {
    params,
    rtlTranslate: rtl,
    translate: translate2,
    wrapperEl
  } = swiper;
  if (params.virtualTranslate) {
    return rtl ? -translate2 : translate2;
  }
  if (params.cssMode) {
    return translate2;
  }
  let currentTranslate = getTranslate(wrapperEl, axis);
  currentTranslate += swiper.cssOverflowAdjustment();
  if (rtl) currentTranslate = -currentTranslate;
  return currentTranslate || 0;
}
function setTranslate(translate2, byController) {
  const swiper = this;
  const {
    rtlTranslate: rtl,
    params,
    wrapperEl,
    progress
  } = swiper;
  let x = 0;
  let y = 0;
  const z = 0;
  if (swiper.isHorizontal()) {
    x = rtl ? -translate2 : translate2;
  } else {
    y = translate2;
  }
  if (params.roundLengths) {
    x = Math.floor(x);
    y = Math.floor(y);
  }
  swiper.previousTranslate = swiper.translate;
  swiper.translate = swiper.isHorizontal() ? x : y;
  if (params.cssMode) {
    wrapperEl[swiper.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper.isHorizontal() ? -x : -y;
  } else if (!params.virtualTranslate) {
    if (swiper.isHorizontal()) {
      x -= swiper.cssOverflowAdjustment();
    } else {
      y -= swiper.cssOverflowAdjustment();
    }
    wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  }
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (translate2 - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== progress) {
    swiper.updateProgress(translate2);
  }
  swiper.emit("setTranslate", swiper.translate, byController);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(translate2 = 0, speed = this.params.speed, runCallbacks = true, translateBounds = true, internal) {
  const swiper = this;
  const {
    params,
    wrapperEl
  } = swiper;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  const minTranslate2 = swiper.minTranslate();
  const maxTranslate2 = swiper.maxTranslate();
  let newTranslate;
  if (translateBounds && translate2 > minTranslate2) newTranslate = minTranslate2;
  else if (translateBounds && translate2 < maxTranslate2) newTranslate = maxTranslate2;
  else newTranslate = translate2;
  swiper.updateProgress(newTranslate);
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    if (speed === 0) {
      wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: -newTranslate,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: -newTranslate,
        behavior: "smooth"
      });
    }
    return true;
  }
  if (speed === 0) {
    swiper.setTransition(0);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionEnd");
    }
  } else {
    swiper.setTransition(speed);
    swiper.setTranslate(newTranslate);
    if (runCallbacks) {
      swiper.emit("beforeTransitionStart", speed, internal);
      swiper.emit("transitionStart");
    }
    if (!swiper.animating) {
      swiper.animating = true;
      if (!swiper.onTranslateToWrapperTransitionEnd) {
        swiper.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper || swiper.destroyed) return;
          if (e.target !== this) return;
          swiper.wrapperEl.removeEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
          swiper.onTranslateToWrapperTransitionEnd = null;
          delete swiper.onTranslateToWrapperTransitionEnd;
          swiper.animating = false;
          if (runCallbacks) {
            swiper.emit("transitionEnd");
          }
        };
      }
      swiper.wrapperEl.addEventListener("transitionend", swiper.onTranslateToWrapperTransitionEnd);
    }
  }
  return true;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(duration, byController) {
  const swiper = this;
  if (!swiper.params.cssMode) {
    swiper.wrapperEl.style.transitionDuration = `${duration}ms`;
    swiper.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
  }
  swiper.emit("setTransition", duration, byController);
}
function transitionEmit({
  swiper,
  runCallbacks,
  direction,
  step
}) {
  const {
    activeIndex,
    previousIndex
  } = swiper;
  let dir = direction;
  if (!dir) {
    if (activeIndex > previousIndex) dir = "next";
    else if (activeIndex < previousIndex) dir = "prev";
    else dir = "reset";
  }
  swiper.emit(`transition${step}`);
  if (runCallbacks && dir === "reset") {
    swiper.emit(`slideResetTransition${step}`);
  } else if (runCallbacks && activeIndex !== previousIndex) {
    swiper.emit(`slideChangeTransition${step}`);
    if (dir === "next") {
      swiper.emit(`slideNextTransition${step}`);
    } else {
      swiper.emit(`slidePrevTransition${step}`);
    }
  }
}
function transitionStart(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  if (params.cssMode) return;
  if (params.autoHeight) {
    swiper.updateAutoHeight();
  }
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "Start"
  });
}
function transitionEnd(runCallbacks = true, direction) {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.animating = false;
  if (params.cssMode) return;
  swiper.setTransition(0);
  transitionEmit({
    swiper,
    runCallbacks,
    direction,
    step: "End"
  });
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(index = 0, speed, runCallbacks = true, internal, initial) {
  if (typeof index === "string") {
    index = parseInt(index, 10);
  }
  const swiper = this;
  let slideIndex = index;
  if (slideIndex < 0) slideIndex = 0;
  const {
    params,
    snapGrid,
    slidesGrid,
    previousIndex,
    activeIndex,
    rtlTranslate: rtl,
    wrapperEl,
    enabled
  } = swiper;
  if (!enabled && !internal && !initial || swiper.destroyed || swiper.animating && params.preventInteractionOnTransition) {
    return false;
  }
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
  let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
  if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;
  const translate2 = -snapGrid[snapIndex];
  if (params.normalizeSlideIndex) {
    for (let i = 0; i < slidesGrid.length; i += 1) {
      const normalizedTranslate = -Math.floor(translate2 * 100);
      const normalizedGrid = Math.floor(slidesGrid[i] * 100);
      const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
          slideIndex = i;
        } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
          slideIndex = i + 1;
        }
      } else if (normalizedTranslate >= normalizedGrid) {
        slideIndex = i;
      }
    }
  }
  if (swiper.initialized && slideIndex !== activeIndex) {
    if (!swiper.allowSlideNext && (rtl ? translate2 > swiper.translate && translate2 > swiper.minTranslate() : translate2 < swiper.translate && translate2 < swiper.minTranslate())) {
      return false;
    }
    if (!swiper.allowSlidePrev && translate2 > swiper.translate && translate2 > swiper.maxTranslate()) {
      if ((activeIndex || 0) !== slideIndex) {
        return false;
      }
    }
  }
  if (slideIndex !== (previousIndex || 0) && runCallbacks) {
    swiper.emit("beforeSlideChangeStart");
  }
  swiper.updateProgress(translate2);
  let direction;
  if (slideIndex > activeIndex) direction = "next";
  else if (slideIndex < activeIndex) direction = "prev";
  else direction = "reset";
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  const isInitialVirtual = isVirtual && initial;
  if (!isInitialVirtual && (rtl && -translate2 === swiper.translate || !rtl && translate2 === swiper.translate)) {
    swiper.updateActiveIndex(slideIndex);
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }
    swiper.updateSlidesClasses();
    if (params.effect !== "slide") {
      swiper.setTranslate(translate2);
    }
    if (direction !== "reset") {
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    }
    return false;
  }
  if (params.cssMode) {
    const isH = swiper.isHorizontal();
    const t = rtl ? translate2 : -translate2;
    if (speed === 0) {
      if (isVirtual) {
        swiper.wrapperEl.style.scrollSnapType = "none";
        swiper._immediateVirtual = true;
      }
      if (isVirtual && !swiper._cssModeVirtualInitialSet && swiper.params.initialSlide > 0) {
        swiper._cssModeVirtualInitialSet = true;
        requestAnimationFrame(() => {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        });
      } else {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
      }
      if (isVirtual) {
        requestAnimationFrame(() => {
          swiper.wrapperEl.style.scrollSnapType = "";
          swiper._immediateVirtual = false;
        });
      }
    } else {
      if (!swiper.support.smoothScroll) {
        animateCSSModeScroll({
          swiper,
          targetPosition: t,
          side: isH ? "left" : "top"
        });
        return true;
      }
      wrapperEl.scrollTo({
        [isH ? "left" : "top"]: t,
        behavior: "smooth"
      });
    }
    return true;
  }
  const browser2 = getBrowser();
  const isSafari = browser2.isSafari;
  if (isVirtual && !initial && isSafari && swiper.isElement) {
    swiper.virtual.update(false, false, slideIndex);
  }
  swiper.setTransition(speed);
  swiper.setTranslate(translate2);
  swiper.updateActiveIndex(slideIndex);
  swiper.updateSlidesClasses();
  swiper.emit("beforeTransitionStart", speed, internal);
  swiper.transitionStart(runCallbacks, direction);
  if (speed === 0) {
    swiper.transitionEnd(runCallbacks, direction);
  } else if (!swiper.animating) {
    swiper.animating = true;
    if (!swiper.onSlideToWrapperTransitionEnd) {
      swiper.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
        if (!swiper || swiper.destroyed) return;
        if (e.target !== this) return;
        swiper.wrapperEl.removeEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
        swiper.onSlideToWrapperTransitionEnd = null;
        delete swiper.onSlideToWrapperTransitionEnd;
        swiper.transitionEnd(runCallbacks, direction);
      };
    }
    swiper.wrapperEl.addEventListener("transitionend", swiper.onSlideToWrapperTransitionEnd);
  }
  return true;
}
function slideToLoop(index = 0, speed, runCallbacks = true, internal) {
  if (typeof index === "string") {
    const indexAsNumber = parseInt(index, 10);
    index = indexAsNumber;
  }
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const gridEnabled = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  let newIndex = index;
  if (swiper.params.loop) {
    if (swiper.virtual && swiper.params.virtual.enabled) {
      newIndex = newIndex + swiper.virtual.slidesBefore;
    } else {
      let targetSlideIndex;
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        targetSlideIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
      } else {
        targetSlideIndex = swiper.getSlideIndexByData(newIndex);
      }
      const cols = gridEnabled ? Math.ceil(swiper.slides.length / swiper.params.grid.rows) : swiper.slides.length;
      const {
        centeredSlides,
        slidesOffsetBefore,
        slidesOffsetAfter
      } = swiper.params;
      const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
      let slidesPerView = swiper.params.slidesPerView;
      if (slidesPerView === "auto") {
        slidesPerView = swiper.slidesPerViewDynamic();
      } else {
        slidesPerView = Math.ceil(parseFloat(swiper.params.slidesPerView, 10));
        if (bothDirections && slidesPerView % 2 === 0) {
          slidesPerView = slidesPerView + 1;
        }
      }
      let needLoopFix = cols - targetSlideIndex < slidesPerView;
      if (bothDirections) {
        needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
      }
      if (internal && bothDirections && swiper.params.slidesPerView !== "auto" && !gridEnabled) {
        needLoopFix = false;
      }
      if (needLoopFix) {
        const direction = bothDirections ? targetSlideIndex < swiper.activeIndex ? "prev" : "next" : targetSlideIndex - swiper.activeIndex - 1 < swiper.params.slidesPerView ? "next" : "prev";
        swiper.loopFix({
          direction,
          slideTo: true,
          activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
          slideRealIndex: direction === "next" ? swiper.realIndex : void 0
        });
      }
      if (gridEnabled) {
        const slideIndex = newIndex * swiper.params.grid.rows;
        newIndex = swiper.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex).column;
      } else {
        newIndex = swiper.getSlideIndexByData(newIndex);
      }
    }
  }
  requestAnimationFrame(() => {
    swiper.slideTo(newIndex, speed, runCallbacks, internal);
  });
  return swiper;
}
function slideNext(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    enabled,
    params,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let perGroup = params.slidesPerGroup;
  if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
    perGroup = Math.max(swiper.slidesPerViewDynamic("current", true), 1);
  }
  const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "next"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
    if (swiper.activeIndex === swiper.slides.length - 1 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
      });
      return true;
    }
  }
  if (params.rewind && swiper.isEnd) {
    return swiper.slideTo(0, speed, runCallbacks, internal);
  }
  return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
}
function slidePrev(speed, runCallbacks = true, internal) {
  const swiper = this;
  const {
    params,
    snapGrid,
    slidesGrid,
    rtlTranslate,
    enabled,
    animating
  } = swiper;
  if (!enabled || swiper.destroyed) return swiper;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  const isVirtual = swiper.virtual && params.virtual.enabled;
  if (params.loop) {
    if (animating && !isVirtual && params.loopPreventsSliding) return false;
    swiper.loopFix({
      direction: "prev"
    });
    swiper._clientLeft = swiper.wrapperEl.clientLeft;
  }
  const translate2 = rtlTranslate ? swiper.translate : -swiper.translate;
  function normalize(val) {
    if (val < 0) return -Math.floor(Math.abs(val));
    return Math.floor(val);
  }
  const normalizedTranslate = normalize(translate2);
  const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
  const isFreeMode = params.freeMode && params.freeMode.enabled;
  let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
  if (typeof prevSnap === "undefined" && (params.cssMode || isFreeMode)) {
    let prevSnapIndex;
    snapGrid.forEach((snap, snapIndex) => {
      if (normalizedTranslate >= snap) {
        prevSnapIndex = snapIndex;
      }
    });
    if (typeof prevSnapIndex !== "undefined") {
      prevSnap = isFreeMode ? snapGrid[prevSnapIndex] : snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
    }
  }
  let prevIndex = 0;
  if (typeof prevSnap !== "undefined") {
    prevIndex = slidesGrid.indexOf(prevSnap);
    if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      prevIndex = prevIndex - swiper.slidesPerViewDynamic("previous", true) + 1;
      prevIndex = Math.max(prevIndex, 0);
    }
  }
  if (params.rewind && swiper.isBeginning) {
    const lastIndex = swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    return swiper.slideTo(lastIndex, speed, runCallbacks, internal);
  } else if (params.loop && swiper.activeIndex === 0 && params.cssMode) {
    requestAnimationFrame(() => {
      swiper.slideTo(prevIndex, speed, runCallbacks, internal);
    });
    return true;
  }
  return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
}
function slideReset(speed, runCallbacks = true, internal) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
}
function slideToClosest(speed, runCallbacks = true, internal, threshold = 0.5) {
  const swiper = this;
  if (swiper.destroyed) return;
  if (typeof speed === "undefined") {
    speed = swiper.params.speed;
  }
  let index = swiper.activeIndex;
  const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
  const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
  const translate2 = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
  if (translate2 >= swiper.snapGrid[snapIndex]) {
    const currentSnap = swiper.snapGrid[snapIndex];
    const nextSnap = swiper.snapGrid[snapIndex + 1];
    if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
      index += swiper.params.slidesPerGroup;
    }
  } else {
    const prevSnap = swiper.snapGrid[snapIndex - 1];
    const currentSnap = swiper.snapGrid[snapIndex];
    if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
      index -= swiper.params.slidesPerGroup;
    }
  }
  index = Math.max(index, 0);
  index = Math.min(index, swiper.slidesGrid.length - 1);
  return swiper.slideTo(index, speed, runCallbacks, internal);
}
function slideToClickedSlide() {
  const swiper = this;
  if (swiper.destroyed) return;
  const {
    params,
    slidesEl
  } = swiper;
  const slidesPerView = params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : params.slidesPerView;
  let slideToIndex = swiper.getSlideIndexWhenGrid(swiper.clickedIndex);
  let realIndex;
  const slideSelector = swiper.isElement ? `swiper-slide` : `.${params.slideClass}`;
  const isGrid = swiper.grid && swiper.params.grid && swiper.params.grid.rows > 1;
  if (params.loop) {
    if (swiper.animating) return;
    realIndex = parseInt(swiper.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
    if (params.centeredSlides) {
      swiper.slideToLoop(realIndex);
    } else if (slideToIndex > (isGrid ? (swiper.slides.length - slidesPerView) / 2 - (swiper.params.grid.rows - 1) : swiper.slides.length - slidesPerView)) {
      swiper.loopFix();
      slideToIndex = swiper.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
      nextTick(() => {
        swiper.slideTo(slideToIndex);
      });
    } else {
      swiper.slideTo(slideToIndex);
    }
  } else {
    swiper.slideTo(slideToIndex);
  }
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(slideRealIndex, initial) {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || swiper.virtual && swiper.params.virtual.enabled) return;
  const initSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    slides.forEach((el, index) => {
      el.setAttribute("data-swiper-slide-index", index);
    });
  };
  const clearBlankSlides = () => {
    const slides = elementChildren(slidesEl, `.${params.slideBlankClass}`);
    slides.forEach((el) => {
      el.remove();
    });
    if (slides.length > 0) {
      swiper.recalcSlides();
      swiper.updateSlides();
    }
  };
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (params.loopAddBlankSlides && (params.slidesPerGroup > 1 || gridEnabled)) {
    clearBlankSlides();
  }
  const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
  const shouldFillGroup = swiper.slides.length % slidesPerGroup !== 0;
  const shouldFillGrid = gridEnabled && swiper.slides.length % params.grid.rows !== 0;
  const addBlankSlides = (amountOfSlides) => {
    for (let i = 0; i < amountOfSlides; i += 1) {
      const slideEl = swiper.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
      swiper.slidesEl.append(slideEl);
    }
  };
  if (shouldFillGroup) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = slidesPerGroup - swiper.slides.length % slidesPerGroup;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else if (shouldFillGrid) {
    if (params.loopAddBlankSlides) {
      const slidesToAdd = params.grid.rows - swiper.slides.length % params.grid.rows;
      addBlankSlides(slidesToAdd);
      swiper.recalcSlides();
      swiper.updateSlides();
    } else {
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    }
    initSlides();
  } else {
    initSlides();
  }
  const bothDirections = params.centeredSlides || !!params.slidesOffsetBefore || !!params.slidesOffsetAfter;
  swiper.loopFix({
    slideRealIndex,
    direction: bothDirections ? void 0 : "next",
    initial
  });
}
function loopFix({
  slideRealIndex,
  slideTo: slideTo2 = true,
  direction,
  setTranslate: setTranslate2,
  activeSlideIndex,
  initial,
  byController,
  byMousewheel
} = {}) {
  const swiper = this;
  if (!swiper.params.loop) return;
  swiper.emit("beforeLoopFix");
  const {
    slides,
    allowSlidePrev,
    allowSlideNext,
    slidesEl,
    params
  } = swiper;
  const {
    centeredSlides,
    slidesOffsetBefore,
    slidesOffsetAfter,
    initialSlide
  } = params;
  const bothDirections = centeredSlides || !!slidesOffsetBefore || !!slidesOffsetAfter;
  swiper.allowSlidePrev = true;
  swiper.allowSlideNext = true;
  if (swiper.virtual && params.virtual.enabled) {
    if (slideTo2) {
      if (!bothDirections && swiper.snapIndex === 0) {
        swiper.slideTo(swiper.virtual.slides.length, 0, false, true);
      } else if (bothDirections && swiper.snapIndex < params.slidesPerView) {
        swiper.slideTo(swiper.virtual.slides.length + swiper.snapIndex, 0, false, true);
      } else if (swiper.snapIndex === swiper.snapGrid.length - 1) {
        swiper.slideTo(swiper.virtual.slidesBefore, 0, false, true);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
    swiper.emit("loopFix");
    return;
  }
  let slidesPerView = params.slidesPerView;
  if (slidesPerView === "auto") {
    slidesPerView = swiper.slidesPerViewDynamic();
  } else {
    slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
    if (bothDirections && slidesPerView % 2 === 0) {
      slidesPerView = slidesPerView + 1;
    }
  }
  const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
  let loopedSlides = bothDirections ? Math.max(slidesPerGroup, Math.ceil(slidesPerView / 2)) : slidesPerGroup;
  if (loopedSlides % slidesPerGroup !== 0) {
    loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
  }
  loopedSlides += params.loopAdditionalSlides;
  swiper.loopedSlides = loopedSlides;
  const gridEnabled = swiper.grid && params.grid && params.grid.rows > 1;
  if (slides.length < slidesPerView + loopedSlides || swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
    showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
  } else if (gridEnabled && params.grid.fill === "row") {
    showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  }
  const prependSlidesIndexes = [];
  const appendSlidesIndexes = [];
  const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
  const isInitialOverflow = initial && cols - initialSlide < slidesPerView && !bothDirections;
  let activeIndex = isInitialOverflow ? initialSlide : swiper.activeIndex;
  if (typeof activeSlideIndex === "undefined") {
    activeSlideIndex = swiper.getSlideIndex(slides.find((el) => el.classList.contains(params.slideActiveClass)));
  } else {
    activeIndex = activeSlideIndex;
  }
  const isNext = direction === "next" || !direction;
  const isPrev = direction === "prev" || !direction;
  let slidesPrepended = 0;
  let slidesAppended = 0;
  const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
  const activeColIndexWithShift = activeColIndex + (bothDirections && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
  if (activeColIndexWithShift < loopedSlides) {
    slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
    for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        const colIndexToPrepend = cols - index - 1;
        for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
          if (slides[i2].column === colIndexToPrepend) prependSlidesIndexes.push(i2);
        }
      } else {
        prependSlidesIndexes.push(cols - index - 1);
      }
    }
  } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
    slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
    if (isInitialOverflow) {
      slidesAppended = Math.max(slidesAppended, slidesPerView - cols + initialSlide + 1);
    }
    for (let i = 0; i < slidesAppended; i += 1) {
      const index = i - Math.floor(i / cols) * cols;
      if (gridEnabled) {
        slides.forEach((slide2, slideIndex) => {
          if (slide2.column === index) appendSlidesIndexes.push(slideIndex);
        });
      } else {
        appendSlidesIndexes.push(index);
      }
    }
  }
  swiper.__preventObserver__ = true;
  requestAnimationFrame(() => {
    swiper.__preventObserver__ = false;
  });
  if (swiper.params.effect === "cards" && slides.length < slidesPerView + loopedSlides * 2) {
    if (appendSlidesIndexes.includes(activeSlideIndex)) {
      appendSlidesIndexes.splice(appendSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
    if (prependSlidesIndexes.includes(activeSlideIndex)) {
      prependSlidesIndexes.splice(prependSlidesIndexes.indexOf(activeSlideIndex), 1);
    }
  }
  if (isPrev) {
    prependSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.prepend(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  if (isNext) {
    appendSlidesIndexes.forEach((index) => {
      slides[index].swiperLoopMoveDOM = true;
      slidesEl.append(slides[index]);
      slides[index].swiperLoopMoveDOM = false;
    });
  }
  swiper.recalcSlides();
  if (params.slidesPerView === "auto") {
    swiper.updateSlides();
  } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
    swiper.slides.forEach((slide2, slideIndex) => {
      swiper.grid.updateSlide(slideIndex, slide2, swiper.slides);
    });
  }
  if (params.watchSlidesProgress) {
    swiper.updateSlidesOffset();
  }
  if (slideTo2) {
    if (prependSlidesIndexes.length > 0 && isPrev) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex + slidesPrepended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex + Math.ceil(slidesPrepended), 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        if (setTranslate2) {
          const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
          swiper.slideTo(swiper.activeIndex + shift, 0, false, true);
          swiper.touchEventsData.currentTranslate = swiper.translate;
        }
      }
    } else if (appendSlidesIndexes.length > 0 && isNext) {
      if (typeof slideRealIndex === "undefined") {
        const currentSlideTranslate = swiper.slidesGrid[activeIndex];
        const newSlideTranslate = swiper.slidesGrid[activeIndex - slidesAppended];
        const diff = newSlideTranslate - currentSlideTranslate;
        if (byMousewheel) {
          swiper.setTranslate(swiper.translate - diff);
        } else {
          swiper.slideTo(activeIndex - slidesAppended, 0, false, true);
          if (setTranslate2) {
            swiper.touchEventsData.startTranslate = swiper.touchEventsData.startTranslate - diff;
            swiper.touchEventsData.currentTranslate = swiper.touchEventsData.currentTranslate - diff;
          }
        }
      } else {
        const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
        swiper.slideTo(swiper.activeIndex - shift, 0, false, true);
      }
    }
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.controller && swiper.controller.control && !byController) {
    const loopParams = {
      slideRealIndex,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController: true
    };
    if (Array.isArray(swiper.controller.control)) {
      swiper.controller.control.forEach((c) => {
        if (!c.destroyed && c.params.loop) c.loopFix({
          ...loopParams,
          slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        });
      });
    } else if (swiper.controller.control instanceof swiper.constructor && swiper.controller.control.params.loop) {
      swiper.controller.control.loopFix({
        ...loopParams,
        slideTo: swiper.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
      });
    }
  }
  swiper.emit("loopFix");
}
function loopDestroy() {
  const swiper = this;
  const {
    params,
    slidesEl
  } = swiper;
  if (!params.loop || !slidesEl || swiper.virtual && swiper.params.virtual.enabled) return;
  swiper.recalcSlides();
  const newSlidesOrder = [];
  swiper.slides.forEach((slideEl) => {
    const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
    newSlidesOrder[index] = slideEl;
  });
  swiper.slides.forEach((slideEl) => {
    slideEl.removeAttribute("data-swiper-slide-index");
  });
  newSlidesOrder.forEach((slideEl) => {
    slidesEl.append(slideEl);
  });
  swiper.recalcSlides();
  swiper.slideTo(swiper.realIndex, 0);
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(moving) {
  const swiper = this;
  if (!swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) return;
  const el = swiper.params.touchEventsTarget === "container" ? swiper.el : swiper.wrapperEl;
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  el.style.cursor = "move";
  el.style.cursor = moving ? "grabbing" : "grab";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
function unsetGrabCursor() {
  const swiper = this;
  if (swiper.params.watchOverflow && swiper.isLocked || swiper.params.cssMode) {
    return;
  }
  if (swiper.isElement) {
    swiper.__preventObserver__ = true;
  }
  swiper[swiper.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
  if (swiper.isElement) {
    requestAnimationFrame(() => {
      swiper.__preventObserver__ = false;
    });
  }
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(selector, base = this) {
  function __closestFrom(el) {
    if (!el || el === getDocument() || el === getWindow()) return null;
    if (el.assignedSlot) el = el.assignedSlot;
    const found = el.closest(selector);
    if (!found && !el.getRootNode) {
      return null;
    }
    return found || __closestFrom(el.getRootNode().host);
  }
  return __closestFrom(base);
}
function preventEdgeSwipe(swiper, event, startX) {
  const window2 = getWindow();
  const {
    params
  } = swiper;
  const edgeSwipeDetection = params.edgeSwipeDetection;
  const edgeSwipeThreshold = params.edgeSwipeThreshold;
  if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
    if (edgeSwipeDetection === "prevent") {
      event.preventDefault();
      return true;
    }
    return false;
  }
  return true;
}
function onTouchStart(event) {
  const swiper = this;
  const document2 = getDocument();
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  const data = swiper.touchEventsData;
  if (e.type === "pointerdown") {
    if (data.pointerId !== null && data.pointerId !== e.pointerId) {
      return;
    }
    data.pointerId = e.pointerId;
  } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
    data.touchId = e.targetTouches[0].identifier;
  }
  if (e.type === "touchstart") {
    preventEdgeSwipe(swiper, e, e.targetTouches[0].pageX);
    return;
  }
  const {
    params,
    touches,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (swiper.animating && params.preventInteractionOnTransition) {
    return;
  }
  if (!swiper.animating && params.cssMode && params.loop) {
    swiper.loopFix();
  }
  let targetEl = e.target;
  if (params.touchEventsTarget === "wrapper") {
    if (!elementIsChildOf(targetEl, swiper.wrapperEl)) return;
  }
  if ("which" in e && e.which === 3) return;
  if ("button" in e && e.button > 0) return;
  if (data.isTouched && data.isMoved) return;
  const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
  const eventPath = e.composedPath ? e.composedPath() : e.path;
  if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
    targetEl = eventPath[0];
  }
  const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
  const isTargetShadow = !!(e.target && e.target.shadowRoot);
  if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
    swiper.allowClick = true;
    return;
  }
  if (params.swipeHandler) {
    if (!targetEl.closest(params.swipeHandler)) return;
  }
  touches.currentX = e.pageX;
  touches.currentY = e.pageY;
  const startX = touches.currentX;
  const startY = touches.currentY;
  if (!preventEdgeSwipe(swiper, e, startX)) {
    return;
  }
  Object.assign(data, {
    isTouched: true,
    isMoved: false,
    allowTouchCallbacks: true,
    isScrolling: void 0,
    startMoving: void 0
  });
  touches.startX = startX;
  touches.startY = startY;
  data.touchStartTime = now();
  swiper.allowClick = true;
  swiper.updateSize();
  swiper.swipeDirection = void 0;
  if (params.threshold > 0) data.allowThresholdMove = false;
  let preventDefault = true;
  if (targetEl.matches(data.focusableElements)) {
    preventDefault = false;
    if (targetEl.nodeName === "SELECT") {
      data.isTouched = false;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl && (e.pointerType === "mouse" || e.pointerType !== "mouse" && !targetEl.matches(data.focusableElements))) {
    document2.activeElement.blur();
  }
  const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
  if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
    e.preventDefault();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode && swiper.animating && !params.cssMode) {
    swiper.freeMode.onTouchStart();
  }
  swiper.emit("touchStart", e);
}
function onTouchMove(event) {
  const document2 = getDocument();
  const swiper = this;
  const data = swiper.touchEventsData;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && event.pointerType === "mouse") return;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  if (e.type === "pointermove") {
    if (data.touchId !== null) return;
    const id = e.pointerId;
    if (id !== data.pointerId) return;
  }
  let targetTouch;
  if (e.type === "touchmove") {
    targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  } else {
    targetTouch = e;
  }
  if (!data.isTouched) {
    if (data.startMoving && data.isScrolling) {
      swiper.emit("touchMoveOpposite", e);
    }
    return;
  }
  const pageX = targetTouch.pageX;
  const pageY = targetTouch.pageY;
  if (e.preventedByNestedSwiper) {
    touches.startX = pageX;
    touches.startY = pageY;
    return;
  }
  if (!swiper.allowTouchMove) {
    if (!e.target.matches(data.focusableElements)) {
      swiper.allowClick = false;
    }
    if (data.isTouched) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY
      });
      data.touchStartTime = now();
    }
    return;
  }
  if (params.touchReleaseOnEdges && !params.loop) {
    if (swiper.isVertical()) {
      if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
        data.isTouched = false;
        data.isMoved = false;
        return;
      }
    } else if (rtl && (pageX > touches.startX && -swiper.translate <= swiper.maxTranslate() || pageX < touches.startX && -swiper.translate >= swiper.minTranslate())) {
      return;
    } else if (!rtl && (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate())) {
      return;
    }
  }
  if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== e.target && e.pointerType !== "mouse") {
    document2.activeElement.blur();
  }
  if (document2.activeElement) {
    if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
      data.isMoved = true;
      swiper.allowClick = false;
      return;
    }
  }
  if (data.allowTouchCallbacks) {
    swiper.emit("touchMove", e);
  }
  touches.previousX = touches.currentX;
  touches.previousY = touches.currentY;
  touches.currentX = pageX;
  touches.currentY = pageY;
  const diffX = touches.currentX - touches.startX;
  const diffY = touches.currentY - touches.startY;
  if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;
  if (typeof data.isScrolling === "undefined") {
    let touchAngle;
    if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
      data.isScrolling = false;
    } else {
      if (diffX * diffX + diffY * diffY >= 25) {
        touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
        data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
      }
    }
  }
  if (data.isScrolling) {
    swiper.emit("touchMoveOpposite", e);
  }
  if (typeof data.startMoving === "undefined") {
    if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
      data.startMoving = true;
    }
  }
  if (data.isScrolling || e.type === "touchmove" && data.preventTouchMoveFromPointerMove) {
    data.isTouched = false;
    return;
  }
  if (!data.startMoving) {
    return;
  }
  swiper.allowClick = false;
  if (!params.cssMode && e.cancelable) {
    e.preventDefault();
  }
  if (params.touchMoveStopPropagation && !params.nested) {
    e.stopPropagation();
  }
  let diff = swiper.isHorizontal() ? diffX : diffY;
  let touchesDiff = swiper.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
  if (params.oneWayMovement) {
    diff = Math.abs(diff) * (rtl ? 1 : -1);
    touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
  }
  touches.diff = diff;
  diff *= params.touchRatio;
  if (rtl) {
    diff = -diff;
    touchesDiff = -touchesDiff;
  }
  const prevTouchesDirection = swiper.touchesDirection;
  swiper.swipeDirection = diff > 0 ? "prev" : "next";
  swiper.touchesDirection = touchesDiff > 0 ? "prev" : "next";
  const isLoop = swiper.params.loop && !params.cssMode;
  const allowLoopFix = swiper.touchesDirection === "next" && swiper.allowSlideNext || swiper.touchesDirection === "prev" && swiper.allowSlidePrev;
  if (!data.isMoved) {
    if (isLoop && allowLoopFix) {
      swiper.loopFix({
        direction: swiper.swipeDirection
      });
    }
    data.startTranslate = swiper.getTranslate();
    swiper.setTransition(0);
    if (swiper.animating) {
      const evt = new window.CustomEvent("transitionend", {
        bubbles: true,
        cancelable: true,
        detail: {
          bySwiperTouchMove: true
        }
      });
      swiper.wrapperEl.dispatchEvent(evt);
    }
    data.allowMomentumBounce = false;
    if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(true);
    }
    swiper.emit("sliderFirstMove", e);
  }
  (/* @__PURE__ */ new Date()).getTime();
  if (params._loopSwapReset !== false && data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
    Object.assign(touches, {
      startX: pageX,
      startY: pageY,
      currentX: pageX,
      currentY: pageY,
      startTranslate: data.currentTranslate
    });
    data.loopSwapReset = true;
    data.startTranslate = data.currentTranslate;
    return;
  }
  swiper.emit("sliderMove", e);
  data.isMoved = true;
  data.currentTranslate = diff + data.startTranslate;
  let disableParentSwiper = true;
  let resistanceRatio = params.resistanceRatio;
  if (params.touchReleaseOnEdges) {
    resistanceRatio = 0;
  }
  if (diff > 0) {
    if (isLoop && allowLoopFix && true && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper.minTranslate() - swiper.slidesSizesGrid[swiper.activeIndex + 1] - (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.activeIndex + 1] + swiper.params.spaceBetween : 0) - swiper.params.spaceBetween : swiper.minTranslate())) {
      swiper.loopFix({
        direction: "prev",
        setTranslate: true,
        activeSlideIndex: 0
      });
    }
    if (data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
      }
    }
  } else if (diff < 0) {
    if (isLoop && allowLoopFix && true && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper.maxTranslate() + swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween + (params.slidesPerView !== "auto" && swiper.slides.length - params.slidesPerView >= 2 ? swiper.slidesSizesGrid[swiper.slidesSizesGrid.length - 1] + swiper.params.spaceBetween : 0) : swiper.maxTranslate())) {
      swiper.loopFix({
        direction: "next",
        setTranslate: true,
        activeSlideIndex: swiper.slides.length - (params.slidesPerView === "auto" ? swiper.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
      });
    }
    if (data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
      }
    }
  }
  if (disableParentSwiper) {
    e.preventedByNestedSwiper = true;
  }
  if (!swiper.allowSlideNext && swiper.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && swiper.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
    data.currentTranslate = data.startTranslate;
  }
  if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
    data.currentTranslate = data.startTranslate;
  }
  if (params.threshold > 0) {
    if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
      if (!data.allowThresholdMove) {
        data.allowThresholdMove = true;
        touches.startX = touches.currentX;
        touches.startY = touches.currentY;
        data.currentTranslate = data.startTranslate;
        touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
        return;
      }
    } else {
      data.currentTranslate = data.startTranslate;
      return;
    }
  }
  if (!params.followFinger || params.cssMode) return;
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode || params.watchSlidesProgress) {
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  if (params.freeMode && params.freeMode.enabled && swiper.freeMode) {
    swiper.freeMode.onTouchMove();
  }
  swiper.updateProgress(data.currentTranslate);
  swiper.setTranslate(data.currentTranslate);
}
function onTouchEnd(event) {
  const swiper = this;
  const data = swiper.touchEventsData;
  let e = event;
  if (e.originalEvent) e = e.originalEvent;
  let targetTouch;
  const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
  if (!isTouchEvent) {
    if (data.touchId !== null) return;
    if (e.pointerId !== data.pointerId) return;
    targetTouch = e;
  } else {
    targetTouch = [...e.changedTouches].find((t) => t.identifier === data.touchId);
    if (!targetTouch || targetTouch.identifier !== data.touchId) return;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
    const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper.browser.isSafari || swiper.browser.isWebView);
    if (!proceed) {
      return;
    }
  }
  data.pointerId = null;
  data.touchId = null;
  const {
    params,
    touches,
    rtlTranslate: rtl,
    slidesGrid,
    enabled
  } = swiper;
  if (!enabled) return;
  if (!params.simulateTouch && e.pointerType === "mouse") return;
  if (data.allowTouchCallbacks) {
    swiper.emit("touchEnd", e);
  }
  data.allowTouchCallbacks = false;
  if (!data.isTouched) {
    if (data.isMoved && params.grabCursor) {
      swiper.setGrabCursor(false);
    }
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
    swiper.setGrabCursor(false);
  }
  const touchEndTime = now();
  const timeDiff = touchEndTime - data.touchStartTime;
  if (swiper.allowClick) {
    const pathTree = e.path || e.composedPath && e.composedPath();
    swiper.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
    swiper.emit("tap click", e);
    if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
      swiper.emit("doubleTap doubleClick", e);
    }
  }
  data.lastClickTime = now();
  nextTick(() => {
    if (!swiper.destroyed) swiper.allowClick = true;
  });
  if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    return;
  }
  data.isTouched = false;
  data.isMoved = false;
  data.startMoving = false;
  let currentPos;
  if (params.followFinger) {
    currentPos = rtl ? swiper.translate : -swiper.translate;
  } else {
    currentPos = -data.currentTranslate;
  }
  if (params.cssMode) {
    return;
  }
  if (params.freeMode && params.freeMode.enabled) {
    swiper.freeMode.onTouchEnd({
      currentPos
    });
    return;
  }
  const swipeToLast = currentPos >= -swiper.maxTranslate() && !swiper.params.loop;
  let stopIndex = 0;
  let groupSize = swiper.slidesSizesGrid[0];
  for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
    const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (typeof slidesGrid[i + increment2] !== "undefined") {
      if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
        stopIndex = i;
        groupSize = slidesGrid[i + increment2] - slidesGrid[i];
      }
    } else if (swipeToLast || currentPos >= slidesGrid[i]) {
      stopIndex = i;
      groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
    }
  }
  let rewindFirstIndex = null;
  let rewindLastIndex = null;
  if (params.rewind) {
    if (swiper.isBeginning) {
      rewindLastIndex = params.virtual && params.virtual.enabled && swiper.virtual ? swiper.virtual.slides.length - 1 : swiper.slides.length - 1;
    } else if (swiper.isEnd) {
      rewindFirstIndex = 0;
    }
  }
  const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
  const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
  if (timeDiff > params.longSwipesMs) {
    if (!params.longSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    if (swiper.swipeDirection === "next") {
      if (ratio >= params.longSwipesRatio) swiper.slideTo(params.rewind && swiper.isEnd ? rewindFirstIndex : stopIndex + increment);
      else swiper.slideTo(stopIndex);
    }
    if (swiper.swipeDirection === "prev") {
      if (ratio > 1 - params.longSwipesRatio) {
        swiper.slideTo(stopIndex + increment);
      } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
        swiper.slideTo(rewindLastIndex);
      } else {
        swiper.slideTo(stopIndex);
      }
    }
  } else {
    if (!params.shortSwipes) {
      swiper.slideTo(swiper.activeIndex);
      return;
    }
    const isNavButtonTarget = swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);
    if (!isNavButtonTarget) {
      if (swiper.swipeDirection === "next") {
        swiper.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
      }
      if (swiper.swipeDirection === "prev") {
        swiper.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
      }
    } else if (e.target === swiper.navigation.nextEl) {
      swiper.slideTo(stopIndex + increment);
    } else {
      swiper.slideTo(stopIndex);
    }
  }
}
function onResize() {
  const swiper = this;
  const {
    params,
    el
  } = swiper;
  if (el && el.offsetWidth === 0) return;
  if (params.breakpoints) {
    swiper.setBreakpoint();
  }
  const {
    allowSlideNext,
    allowSlidePrev,
    snapGrid
  } = swiper;
  const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
  swiper.allowSlideNext = true;
  swiper.allowSlidePrev = true;
  swiper.updateSize();
  swiper.updateSlides();
  swiper.updateSlidesClasses();
  const isVirtualLoop = isVirtual && params.loop;
  if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !swiper.isBeginning && !swiper.params.centeredSlides && !isVirtualLoop) {
    swiper.slideTo(swiper.slides.length - 1, 0, false, true);
  } else {
    if (swiper.params.loop && !isVirtual) {
      swiper.slideToLoop(swiper.realIndex, 0, false, true);
    } else {
      swiper.slideTo(swiper.activeIndex, 0, false, true);
    }
  }
  if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
    clearTimeout(swiper.autoplay.resizeTimeout);
    swiper.autoplay.resizeTimeout = setTimeout(() => {
      if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
        swiper.autoplay.resume();
      }
    }, 500);
  }
  swiper.allowSlidePrev = allowSlidePrev;
  swiper.allowSlideNext = allowSlideNext;
  if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
    swiper.checkOverflow();
  }
}
function onClick(e) {
  const swiper = this;
  if (!swiper.enabled) return;
  if (!swiper.allowClick) {
    if (swiper.params.preventClicks) e.preventDefault();
    if (swiper.params.preventClicksPropagation && swiper.animating) {
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  }
}
function onScroll() {
  const swiper = this;
  const {
    wrapperEl,
    rtlTranslate,
    enabled
  } = swiper;
  if (!enabled) return;
  swiper.previousTranslate = swiper.translate;
  if (swiper.isHorizontal()) {
    swiper.translate = -wrapperEl.scrollLeft;
  } else {
    swiper.translate = -wrapperEl.scrollTop;
  }
  if (swiper.translate === 0) swiper.translate = 0;
  swiper.updateActiveIndex();
  swiper.updateSlidesClasses();
  let newProgress;
  const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
  if (translatesDiff === 0) {
    newProgress = 0;
  } else {
    newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
  }
  if (newProgress !== swiper.progress) {
    swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
  }
  swiper.emit("setTranslate", swiper.translate, false);
}
function onLoad(e) {
  const swiper = this;
  processLazyPreloader(swiper, e.target);
  if (swiper.params.cssMode || swiper.params.slidesPerView !== "auto" && !swiper.params.autoHeight) {
    return;
  }
  swiper.update();
}
function onDocumentTouchStart() {
  const swiper = this;
  if (swiper.documentTouchHandlerProceeded) return;
  swiper.documentTouchHandlerProceeded = true;
  if (swiper.params.touchReleaseOnEdges) {
    swiper.el.style.touchAction = "auto";
  }
}
const events = (swiper, method) => {
  const document2 = getDocument();
  const {
    params,
    el,
    wrapperEl,
    device
  } = swiper;
  const capture = !!params.nested;
  const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
  const swiperMethod = method;
  if (!el || typeof el === "string") return;
  document2[domMethod]("touchstart", swiper.onDocumentTouchStart, {
    passive: false,
    capture
  });
  el[domMethod]("touchstart", swiper.onTouchStart, {
    passive: false
  });
  el[domMethod]("pointerdown", swiper.onTouchStart, {
    passive: false
  });
  document2[domMethod]("touchmove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("pointermove", swiper.onTouchMove, {
    passive: false,
    capture
  });
  document2[domMethod]("touchend", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerup", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointercancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("touchcancel", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerout", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("pointerleave", swiper.onTouchEnd, {
    passive: true
  });
  document2[domMethod]("contextmenu", swiper.onTouchEnd, {
    passive: true
  });
  if (params.preventClicks || params.preventClicksPropagation) {
    el[domMethod]("click", swiper.onClick, true);
  }
  if (params.cssMode) {
    wrapperEl[domMethod]("scroll", swiper.onScroll);
  }
  if (params.updateOnWindowResize) {
    swiper[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
  } else {
    swiper[swiperMethod]("observerUpdate", onResize, true);
  }
  el[domMethod]("load", swiper.onLoad, {
    capture: true
  });
};
function attachEvents() {
  const swiper = this;
  const {
    params
  } = swiper;
  swiper.onTouchStart = onTouchStart.bind(swiper);
  swiper.onTouchMove = onTouchMove.bind(swiper);
  swiper.onTouchEnd = onTouchEnd.bind(swiper);
  swiper.onDocumentTouchStart = onDocumentTouchStart.bind(swiper);
  if (params.cssMode) {
    swiper.onScroll = onScroll.bind(swiper);
  }
  swiper.onClick = onClick.bind(swiper);
  swiper.onLoad = onLoad.bind(swiper);
  events(swiper, "on");
}
function detachEvents() {
  const swiper = this;
  events(swiper, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (swiper, params) => {
  return swiper.grid && params.grid && params.grid.rows > 1;
};
function setBreakpoint() {
  const swiper = this;
  const {
    realIndex,
    initialized,
    params,
    el
  } = swiper;
  const breakpoints2 = params.breakpoints;
  if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0) return;
  const document2 = getDocument();
  const breakpointsBase = params.breakpointsBase === "window" || !params.breakpointsBase ? params.breakpointsBase : "container";
  const breakpointContainer = ["window", "container"].includes(params.breakpointsBase) || !params.breakpointsBase ? swiper.el : document2.querySelector(params.breakpointsBase);
  const breakpoint = swiper.getBreakpoint(breakpoints2, breakpointsBase, breakpointContainer);
  if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
  const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
  const breakpointParams = breakpointOnlyParams || swiper.originalParams;
  const wasMultiRow = isGridEnabled(swiper, params);
  const isMultiRow = isGridEnabled(swiper, breakpointParams);
  const wasGrabCursor = swiper.params.grabCursor;
  const isGrabCursor = breakpointParams.grabCursor;
  const wasEnabled = params.enabled;
  if (wasMultiRow && !isMultiRow) {
    el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
    swiper.emitContainerClasses();
  } else if (!wasMultiRow && isMultiRow) {
    el.classList.add(`${params.containerModifierClass}grid`);
    if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
      el.classList.add(`${params.containerModifierClass}grid-column`);
    }
    swiper.emitContainerClasses();
  }
  if (wasGrabCursor && !isGrabCursor) {
    swiper.unsetGrabCursor();
  } else if (!wasGrabCursor && isGrabCursor) {
    swiper.setGrabCursor();
  }
  ["navigation", "pagination", "scrollbar"].forEach((prop) => {
    if (typeof breakpointParams[prop] === "undefined") return;
    const wasModuleEnabled = params[prop] && params[prop].enabled;
    const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
    if (wasModuleEnabled && !isModuleEnabled) {
      swiper[prop].disable();
    }
    if (!wasModuleEnabled && isModuleEnabled) {
      swiper[prop].enable();
    }
  });
  const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
  const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
  const wasLoop = params.loop;
  if (directionChanged && initialized) {
    swiper.changeDirection();
  }
  extend(swiper.params, breakpointParams);
  const isEnabled = swiper.params.enabled;
  const hasLoop = swiper.params.loop;
  Object.assign(swiper, {
    allowTouchMove: swiper.params.allowTouchMove,
    allowSlideNext: swiper.params.allowSlideNext,
    allowSlidePrev: swiper.params.allowSlidePrev
  });
  if (wasEnabled && !isEnabled) {
    swiper.disable();
  } else if (!wasEnabled && isEnabled) {
    swiper.enable();
  }
  swiper.currentBreakpoint = breakpoint;
  swiper.emit("_beforeBreakpoint", breakpointParams);
  if (initialized) {
    if (needsReLoop) {
      swiper.loopDestroy();
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (!wasLoop && hasLoop) {
      swiper.loopCreate(realIndex);
      swiper.updateSlides();
    } else if (wasLoop && !hasLoop) {
      swiper.loopDestroy();
    }
  }
  swiper.emit("breakpoint", breakpointParams);
}
function getBreakpoint(breakpoints2, base = "window", containerEl) {
  if (!breakpoints2 || base === "container" && !containerEl) return void 0;
  let breakpoint = false;
  const window2 = getWindow();
  const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
  const points = Object.keys(breakpoints2).map((point) => {
    if (typeof point === "string" && point.indexOf("@") === 0) {
      const minRatio = parseFloat(point.substr(1));
      const value = currentHeight * minRatio;
      return {
        value,
        point
      };
    }
    return {
      value: point,
      point
    };
  });
  points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
  for (let i = 0; i < points.length; i += 1) {
    const {
      point,
      value
    } = points[i];
    if (base === "window") {
      if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
        breakpoint = point;
      }
    } else if (value <= containerEl.clientWidth) {
      breakpoint = point;
    }
  }
  return breakpoint || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(entries, prefix) {
  const resultClasses = [];
  entries.forEach((item) => {
    if (typeof item === "object") {
      Object.keys(item).forEach((classNames) => {
        if (item[classNames]) {
          resultClasses.push(prefix + classNames);
        }
      });
    } else if (typeof item === "string") {
      resultClasses.push(prefix + item);
    }
  });
  return resultClasses;
}
function addClasses() {
  const swiper = this;
  const {
    classNames,
    params,
    rtl,
    el,
    device
  } = swiper;
  const suffixes = prepareClasses(["initialized", params.direction, {
    "free-mode": swiper.params.freeMode && params.freeMode.enabled
  }, {
    "autoheight": params.autoHeight
  }, {
    "rtl": rtl
  }, {
    "grid": params.grid && params.grid.rows > 1
  }, {
    "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
  }, {
    "android": device.android
  }, {
    "ios": device.ios
  }, {
    "css-mode": params.cssMode
  }, {
    "centered": params.cssMode && params.centeredSlides
  }, {
    "watch-progress": params.watchSlidesProgress
  }], params.containerModifierClass);
  classNames.push(...suffixes);
  el.classList.add(...classNames);
  swiper.emitContainerClasses();
}
function removeClasses() {
  const swiper = this;
  const {
    el,
    classNames
  } = swiper;
  if (!el || typeof el === "string") return;
  el.classList.remove(...classNames);
  swiper.emitContainerClasses();
}
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const swiper = this;
  const {
    isLocked: wasLocked,
    params
  } = swiper;
  const {
    slidesOffsetBefore
  } = params;
  if (slidesOffsetBefore) {
    const lastSlideIndex = swiper.slides.length - 1;
    const lastSlideRightEdge = swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
    swiper.isLocked = swiper.size > lastSlideRightEdge;
  } else {
    swiper.isLocked = swiper.snapGrid.length === 1;
  }
  if (params.allowSlideNext === true) {
    swiper.allowSlideNext = !swiper.isLocked;
  }
  if (params.allowSlidePrev === true) {
    swiper.allowSlidePrev = !swiper.isLocked;
  }
  if (wasLocked && wasLocked !== swiper.isLocked) {
    swiper.isEnd = false;
  }
  if (wasLocked !== swiper.isLocked) {
    swiper.emit(swiper.isLocked ? "lock" : "unlock");
  }
}
var checkOverflow$1 = {
  checkOverflow
};
var defaults = {
  init: true,
  direction: "horizontal",
  oneWayMovement: false,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: false,
  updateOnWindowResize: true,
  resizeObserver: true,
  nested: false,
  createElements: false,
  eventsPrefix: "swiper",
  enabled: true,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: false,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: false,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: false,
  // Set wrapper width
  setWrapperSize: false,
  // Virtual Translate
  virtualTranslate: false,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: false,
  centeredSlides: false,
  centeredSlidesBounds: false,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: true,
  centerInsufficientSlides: false,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: true,
  // Round length
  roundLengths: false,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: true,
  shortSwipes: true,
  longSwipes: true,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: true,
  allowTouchMove: true,
  threshold: 5,
  touchMoveStopPropagation: false,
  touchStartPreventDefault: true,
  touchStartForcePreventDefault: false,
  touchReleaseOnEdges: false,
  // Unique Navigation Elements
  uniqueNavElements: true,
  // Resistance
  resistance: true,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: false,
  // Cursor
  grabCursor: false,
  // Clicks
  preventClicks: true,
  preventClicksPropagation: true,
  slideToClickedSlide: false,
  // loop
  loop: false,
  loopAddBlankSlides: true,
  loopAdditionalSlides: 0,
  loopPreventsSliding: true,
  // rewind
  rewind: false,
  // Swiping/no swiping
  allowSlidePrev: true,
  allowSlideNext: true,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: true,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: true,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: true,
  // Internals
  _emitClasses: false
};
function moduleExtendParams(params, allModulesParams) {
  return function extendParams(obj = {}) {
    const moduleParamName = Object.keys(obj)[0];
    const moduleParams = obj[moduleParamName];
    if (typeof moduleParams !== "object" || moduleParams === null) {
      extend(allModulesParams, obj);
      return;
    }
    if (params[moduleParamName] === true) {
      params[moduleParamName] = {
        enabled: true
      };
    }
    if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
      params[moduleParamName].auto = true;
    }
    if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
      params[moduleParamName].auto = true;
    }
    if (!(moduleParamName in params && "enabled" in moduleParams)) {
      extend(allModulesParams, obj);
      return;
    }
    if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
      params[moduleParamName].enabled = true;
    }
    if (!params[moduleParamName]) params[moduleParamName] = {
      enabled: false
    };
    extend(allModulesParams, obj);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
};
const extendedDefaults = {};
class Swiper {
  constructor(...args) {
    let el;
    let params;
    if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
      params = args[0];
    } else {
      [el, params] = args;
    }
    if (!params) params = {};
    params = extend({}, params);
    if (el && !params.el) params.el = el;
    const document2 = getDocument();
    if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
      const swipers = [];
      document2.querySelectorAll(params.el).forEach((containerEl) => {
        const newParams = extend({}, params, {
          el: containerEl
        });
        swipers.push(new Swiper(newParams));
      });
      return swipers;
    }
    const swiper = this;
    swiper.__swiper__ = true;
    swiper.support = getSupport();
    swiper.device = getDevice({
      userAgent: params.userAgent
    });
    swiper.browser = getBrowser();
    swiper.eventsListeners = {};
    swiper.eventsAnyListeners = [];
    swiper.modules = [...swiper.__modules__];
    if (params.modules && Array.isArray(params.modules)) {
      swiper.modules.push(...params.modules);
    }
    const allModulesParams = {};
    swiper.modules.forEach((mod) => {
      mod({
        params,
        swiper,
        extendParams: moduleExtendParams(params, allModulesParams),
        on: swiper.on.bind(swiper),
        once: swiper.once.bind(swiper),
        off: swiper.off.bind(swiper),
        emit: swiper.emit.bind(swiper)
      });
    });
    const swiperParams = extend({}, defaults, allModulesParams);
    swiper.params = extend({}, swiperParams, extendedDefaults, params);
    swiper.originalParams = extend({}, swiper.params);
    swiper.passedParams = extend({}, params);
    if (swiper.params && swiper.params.on) {
      Object.keys(swiper.params.on).forEach((eventName) => {
        swiper.on(eventName, swiper.params.on[eventName]);
      });
    }
    if (swiper.params && swiper.params.onAny) {
      swiper.onAny(swiper.params.onAny);
    }
    Object.assign(swiper, {
      enabled: swiper.params.enabled,
      el,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return swiper.params.direction === "horizontal";
      },
      isVertical() {
        return swiper.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: true,
      isEnd: false,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: false,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: swiper.params.allowSlideNext,
      allowSlidePrev: swiper.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: swiper.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: true,
      // Touches
      allowTouchMove: swiper.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    });
    swiper.emit("_swiper");
    if (swiper.params.init) {
      swiper.init();
    }
    return swiper;
  }
  getDirectionLabel(property) {
    if (this.isHorizontal()) {
      return property;
    }
    return {
      "width": "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      "marginRight": "marginBottom"
    }[property];
  }
  getSlideIndex(slideEl) {
    const {
      slidesEl,
      params
    } = this;
    const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    const firstSlideIndex = elementIndex(slides[0]);
    return elementIndex(slideEl) - firstSlideIndex;
  }
  getSlideIndexByData(index) {
    return this.getSlideIndex(this.slides.find((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index));
  }
  getSlideIndexWhenGrid(index) {
    if (this.grid && this.params.grid && this.params.grid.rows > 1) {
      if (this.params.grid.fill === "column") {
        index = Math.floor(index / this.params.grid.rows);
      } else if (this.params.grid.fill === "row") {
        index = index % Math.ceil(this.slides.length / this.params.grid.rows);
      }
    }
    return index;
  }
  recalcSlides() {
    const swiper = this;
    const {
      slidesEl,
      params
    } = swiper;
    swiper.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
  }
  enable() {
    const swiper = this;
    if (swiper.enabled) return;
    swiper.enabled = true;
    if (swiper.params.grabCursor) {
      swiper.setGrabCursor();
    }
    swiper.emit("enable");
  }
  disable() {
    const swiper = this;
    if (!swiper.enabled) return;
    swiper.enabled = false;
    if (swiper.params.grabCursor) {
      swiper.unsetGrabCursor();
    }
    swiper.emit("disable");
  }
  setProgress(progress, speed) {
    const swiper = this;
    progress = Math.min(Math.max(progress, 0), 1);
    const min = swiper.minTranslate();
    const max = swiper.maxTranslate();
    const current = (max - min) * progress + min;
    swiper.translateTo(current, typeof speed === "undefined" ? 0 : speed);
    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();
  }
  emitContainerClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const cls = swiper.el.className.split(" ").filter((className) => {
      return className.indexOf("swiper") === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
    });
    swiper.emit("_containerClasses", cls.join(" "));
  }
  getSlideClasses(slideEl) {
    const swiper = this;
    if (swiper.destroyed) return "";
    return slideEl.className.split(" ").filter((className) => {
      return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper.params.slideClass) === 0;
    }).join(" ");
  }
  emitSlidesClasses() {
    const swiper = this;
    if (!swiper.params._emitClasses || !swiper.el) return;
    const updates = [];
    swiper.slides.forEach((slideEl) => {
      const classNames = swiper.getSlideClasses(slideEl);
      updates.push({
        slideEl,
        classNames
      });
      swiper.emit("_slideClass", slideEl, classNames);
    });
    swiper.emit("_slideClasses", updates);
  }
  slidesPerViewDynamic(view = "current", exact = false) {
    const swiper = this;
    const {
      params,
      slides,
      slidesGrid,
      slidesSizesGrid,
      size: swiperSize,
      activeIndex
    } = swiper;
    let spv = 1;
    if (typeof params.slidesPerView === "number") return params.slidesPerView;
    if (params.centeredSlides) {
      let slideSize = slides[activeIndex] ? Math.ceil(slides[activeIndex].swiperSlideSize) : 0;
      let breakLoop;
      for (let i = activeIndex + 1; i < slides.length; i += 1) {
        if (slides[i] && !breakLoop) {
          slideSize += Math.ceil(slides[i].swiperSlideSize);
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
      for (let i = activeIndex - 1; i >= 0; i -= 1) {
        if (slides[i] && !breakLoop) {
          slideSize += slides[i].swiperSlideSize;
          spv += 1;
          if (slideSize > swiperSize) breakLoop = true;
        }
      }
    } else {
      if (view === "current") {
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      } else {
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
          if (slideInView) {
            spv += 1;
          }
        }
      }
    }
    return spv;
  }
  update() {
    const swiper = this;
    if (!swiper || swiper.destroyed) return;
    const {
      snapGrid,
      params
    } = swiper;
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }
    [...swiper.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      }
    });
    swiper.updateSize();
    swiper.updateSlides();
    swiper.updateProgress();
    swiper.updateSlidesClasses();
    function setTranslate2() {
      const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
      const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    let translated;
    if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
      setTranslate2();
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper.isEnd && !params.centeredSlides) {
        const slides = swiper.virtual && params.virtual.enabled ? swiper.virtual.slides : swiper.slides;
        translated = swiper.slideTo(slides.length - 1, 0, false, true);
      } else {
        translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
      if (!translated) {
        setTranslate2();
      }
    }
    if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
    swiper.emit("update");
  }
  changeDirection(newDirection, needUpdate = true) {
    const swiper = this;
    const currentDirection = swiper.params.direction;
    if (!newDirection) {
      newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
    }
    if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
      return swiper;
    }
    swiper.el.classList.remove(`${swiper.params.containerModifierClass}${currentDirection}`);
    swiper.el.classList.add(`${swiper.params.containerModifierClass}${newDirection}`);
    swiper.emitContainerClasses();
    swiper.params.direction = newDirection;
    swiper.slides.forEach((slideEl) => {
      if (newDirection === "vertical") {
        slideEl.style.width = "";
      } else {
        slideEl.style.height = "";
      }
    });
    swiper.emit("changeDirection");
    if (needUpdate) swiper.update();
    return swiper;
  }
  changeLanguageDirection(direction) {
    const swiper = this;
    if (swiper.rtl && direction === "rtl" || !swiper.rtl && direction === "ltr") return;
    swiper.rtl = direction === "rtl";
    swiper.rtlTranslate = swiper.params.direction === "horizontal" && swiper.rtl;
    if (swiper.rtl) {
      swiper.el.classList.add(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "rtl";
    } else {
      swiper.el.classList.remove(`${swiper.params.containerModifierClass}rtl`);
      swiper.el.dir = "ltr";
    }
    swiper.update();
  }
  mount(element) {
    const swiper = this;
    if (swiper.mounted) return true;
    let el = element || swiper.params.el;
    if (typeof el === "string") {
      el = document.querySelector(el);
    }
    if (!el) {
      return false;
    }
    el.swiper = swiper;
    if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === swiper.params.swiperElementNodeName.toUpperCase()) {
      swiper.isElement = true;
    }
    const getWrapperSelector = () => {
      return `.${(swiper.params.wrapperClass || "").trim().split(" ").join(".")}`;
    };
    const getWrapper = () => {
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        const res = el.shadowRoot.querySelector(getWrapperSelector());
        return res;
      }
      return elementChildren(el, getWrapperSelector())[0];
    };
    let wrapperEl = getWrapper();
    if (!wrapperEl && swiper.params.createElements) {
      wrapperEl = createElement("div", swiper.params.wrapperClass);
      el.append(wrapperEl);
      elementChildren(el, `.${swiper.params.slideClass}`).forEach((slideEl) => {
        wrapperEl.append(slideEl);
      });
    }
    Object.assign(swiper, {
      el,
      wrapperEl,
      slidesEl: swiper.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
      hostEl: swiper.isElement ? el.parentNode.host : el,
      mounted: true,
      // RTL
      rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
      rtlTranslate: swiper.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
      wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
    });
    return true;
  }
  init(el) {
    const swiper = this;
    if (swiper.initialized) return swiper;
    const mounted = swiper.mount(el);
    if (mounted === false) return swiper;
    swiper.emit("beforeInit");
    if (swiper.params.breakpoints) {
      swiper.setBreakpoint();
    }
    swiper.addClasses();
    swiper.updateSize();
    swiper.updateSlides();
    if (swiper.params.watchOverflow) {
      swiper.checkOverflow();
    }
    if (swiper.params.grabCursor && swiper.enabled) {
      swiper.setGrabCursor();
    }
    if (swiper.params.loop && swiper.virtual && swiper.params.virtual.enabled) {
      swiper.slideTo(swiper.params.initialSlide + swiper.virtual.slidesBefore, 0, swiper.params.runCallbacksOnInit, false, true);
    } else {
      swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
    }
    if (swiper.params.loop) {
      swiper.loopCreate(void 0, true);
    }
    swiper.attachEvents();
    const lazyElements = [...swiper.el.querySelectorAll('[loading="lazy"]')];
    if (swiper.isElement) {
      lazyElements.push(...swiper.hostEl.querySelectorAll('[loading="lazy"]'));
    }
    lazyElements.forEach((imageEl) => {
      if (imageEl.complete) {
        processLazyPreloader(swiper, imageEl);
      } else {
        imageEl.addEventListener("load", (e) => {
          processLazyPreloader(swiper, e.target);
        });
      }
    });
    preload(swiper);
    swiper.initialized = true;
    preload(swiper);
    swiper.emit("init");
    swiper.emit("afterInit");
    return swiper;
  }
  destroy(deleteInstance = true, cleanStyles = true) {
    const swiper = this;
    const {
      params,
      el,
      wrapperEl,
      slides
    } = swiper;
    if (typeof swiper.params === "undefined" || swiper.destroyed) {
      return null;
    }
    swiper.emit("beforeDestroy");
    swiper.initialized = false;
    swiper.detachEvents();
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (cleanStyles) {
      swiper.removeClasses();
      if (el && typeof el !== "string") {
        el.removeAttribute("style");
      }
      if (wrapperEl) {
        wrapperEl.removeAttribute("style");
      }
      if (slides && slides.length) {
        slides.forEach((slideEl) => {
          slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
          slideEl.removeAttribute("style");
          slideEl.removeAttribute("data-swiper-slide-index");
        });
      }
    }
    swiper.emit("destroy");
    Object.keys(swiper.eventsListeners).forEach((eventName) => {
      swiper.off(eventName);
    });
    if (deleteInstance !== false) {
      if (swiper.el && typeof swiper.el !== "string") {
        swiper.el.swiper = null;
      }
      deleteProps(swiper);
    }
    swiper.destroyed = true;
    return null;
  }
  static extendDefaults(newDefaults) {
    extend(extendedDefaults, newDefaults);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(mod) {
    if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
    const modules = Swiper.prototype.__modules__;
    if (typeof mod === "function" && modules.indexOf(mod) < 0) {
      modules.push(mod);
    }
  }
  static use(module) {
    if (Array.isArray(module)) {
      module.forEach((m) => Swiper.installModule(m));
      return Swiper;
    }
    Swiper.installModule(module);
    return Swiper;
  }
}
Object.keys(prototypes).forEach((prototypeGroup) => {
  Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
    Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
  });
});
Swiper.use([Resize, Observer]);
function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
  if (swiper.params.createElements) {
    Object.keys(checkProps).forEach((key) => {
      if (!params[key] && params.auto === true) {
        let element = elementChildren(swiper.el, `.${checkProps[key]}`)[0];
        if (!element) {
          element = createElement("div", checkProps[key]);
          element.className = checkProps[key];
          swiper.el.append(element);
        }
        params[key] = element;
        originalParams[key] = element;
      }
    });
  }
  return params;
}
const arrowSvg = `<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>`;
function Navigation({
  swiper,
  extendParams,
  on,
  emit
}) {
  extendParams({
    navigation: {
      nextEl: null,
      prevEl: null,
      addIcons: true,
      hideOnClick: false,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled"
    }
  });
  swiper.navigation = {
    nextEl: null,
    prevEl: null
  };
  function getEl(el) {
    let res;
    if (el && typeof el === "string" && swiper.isElement) {
      res = swiper.el.querySelector(el) || swiper.hostEl.querySelector(el);
      if (res) return res;
    }
    if (el) {
      if (typeof el === "string") res = [...document.querySelectorAll(el)];
      if (swiper.params.uniqueNavElements && typeof el === "string" && res && res.length > 1 && swiper.el.querySelectorAll(el).length === 1) {
        res = swiper.el.querySelector(el);
      } else if (res && res.length === 1) {
        res = res[0];
      }
    }
    if (el && !res) return el;
    return res;
  }
  function toggleEl(el, disabled) {
    const params = swiper.params.navigation;
    el = makeElementsArray(el);
    el.forEach((subEl) => {
      if (subEl) {
        subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
        if (subEl.tagName === "BUTTON") subEl.disabled = disabled;
        if (swiper.params.watchOverflow && swiper.enabled) {
          subEl.classList[swiper.isLocked ? "add" : "remove"](params.lockClass);
        }
      }
    });
  }
  function update2() {
    const {
      nextEl,
      prevEl
    } = swiper.navigation;
    if (swiper.params.loop) {
      toggleEl(prevEl, false);
      toggleEl(nextEl, false);
      return;
    }
    toggleEl(prevEl, swiper.isBeginning && !swiper.params.rewind);
    toggleEl(nextEl, swiper.isEnd && !swiper.params.rewind);
  }
  function onPrevClick(e) {
    e.preventDefault();
    if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slidePrev();
    emit("navigationPrev");
  }
  function onNextClick(e) {
    e.preventDefault();
    if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
    swiper.slideNext();
    emit("navigationNext");
  }
  function init() {
    const params = swiper.params.navigation;
    swiper.params.navigation = createElementIfNotDefined(swiper, swiper.originalParams.navigation, swiper.params.navigation, {
      nextEl: "swiper-button-next",
      prevEl: "swiper-button-prev"
    });
    if (!(params.nextEl || params.prevEl)) return;
    let nextEl = getEl(params.nextEl);
    let prevEl = getEl(params.prevEl);
    Object.assign(swiper.navigation, {
      nextEl,
      prevEl
    });
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const initButton = (el, dir) => {
      if (el) {
        if (params.addIcons && el.matches(".swiper-button-next,.swiper-button-prev") && !el.querySelector("svg")) {
          const tempEl = document.createElement("div");
          setInnerHTML(tempEl, arrowSvg);
          el.appendChild(tempEl.querySelector("svg"));
          tempEl.remove();
        }
        el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      }
      if (!swiper.enabled && el) {
        el.classList.add(...params.lockClass.split(" "));
      }
    };
    nextEl.forEach((el) => initButton(el, "next"));
    prevEl.forEach((el) => initButton(el, "prev"));
  }
  function destroy() {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const destroyButton = (el, dir) => {
      el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
      el.classList.remove(...swiper.params.navigation.disabledClass.split(" "));
    };
    nextEl.forEach((el) => destroyButton(el, "next"));
    prevEl.forEach((el) => destroyButton(el, "prev"));
  }
  on("init", () => {
    if (swiper.params.navigation.enabled === false) {
      disable();
    } else {
      init();
      update2();
    }
  });
  on("toEdge fromEdge lock unlock", () => {
    update2();
  });
  on("destroy", () => {
    destroy();
  });
  on("enable disable", () => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    if (swiper.enabled) {
      update2();
      return;
    }
    [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper.params.navigation.lockClass));
  });
  on("click", (_s, e) => {
    let {
      nextEl,
      prevEl
    } = swiper.navigation;
    nextEl = makeElementsArray(nextEl);
    prevEl = makeElementsArray(prevEl);
    const targetEl = e.target;
    let targetIsButton = prevEl.includes(targetEl) || nextEl.includes(targetEl);
    if (swiper.isElement && !targetIsButton) {
      const path = e.path || e.composedPath && e.composedPath();
      if (path) {
        targetIsButton = path.find((pathEl) => nextEl.includes(pathEl) || prevEl.includes(pathEl));
      }
    }
    if (swiper.params.navigation.hideOnClick && !targetIsButton) {
      if (swiper.pagination && swiper.params.pagination && swiper.params.pagination.clickable && (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))) return;
      let isHidden;
      if (nextEl.length) {
        isHidden = nextEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      } else if (prevEl.length) {
        isHidden = prevEl[0].classList.contains(swiper.params.navigation.hiddenClass);
      }
      if (isHidden === true) {
        emit("navigationShow");
      } else {
        emit("navigationHide");
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper.params.navigation.hiddenClass));
    }
  });
  const enable = () => {
    swiper.el.classList.remove(...swiper.params.navigation.navigationDisabledClass.split(" "));
    init();
    update2();
  };
  const disable = () => {
    swiper.el.classList.add(...swiper.params.navigation.navigationDisabledClass.split(" "));
    destroy();
  };
  Object.assign(swiper.navigation, {
    enable,
    disable,
    update: update2,
    init,
    destroy
  });
}
function Autoplay({
  swiper,
  extendParams,
  on,
  emit,
  params
}) {
  swiper.autoplay = {
    running: false,
    paused: false,
    timeLeft: 0
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3e3,
      waitForTransition: true,
      disableOnInteraction: false,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });
  let timeout;
  let raf;
  let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
  let autoplayTimeLeft;
  let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
  let wasPaused;
  let isTouched;
  let pausedByTouch;
  let touchStartTimeout;
  let slideChanged;
  let pausedByInteraction;
  let pausedByPointerEnter;
  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
    if (e.target !== swiper.wrapperEl) return;
    swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
    if (pausedByPointerEnter || e.detail && e.detail.bySwiperTouchMove) {
      return;
    }
    resume();
  }
  const calcTimeLeft = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.autoplay.paused) {
      wasPaused = true;
    } else if (wasPaused) {
      autoplayDelayCurrent = autoplayTimeLeft;
      wasPaused = false;
    }
    const timeLeft = swiper.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.timeLeft = timeLeft;
    emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
    raf = requestAnimationFrame(() => {
      calcTimeLeft();
    });
  };
  const getSlideDelay = () => {
    let activeSlideEl;
    if (swiper.virtual && swiper.params.virtual.enabled) {
      activeSlideEl = swiper.slides.find((slideEl) => slideEl.classList.contains("swiper-slide-active"));
    } else {
      activeSlideEl = swiper.slides[swiper.activeIndex];
    }
    if (!activeSlideEl) return void 0;
    const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
    return currentSlideDelay;
  };
  const run = (delayForce) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    cancelAnimationFrame(raf);
    calcTimeLeft();
    let delay = typeof delayForce === "undefined" ? swiper.params.autoplay.delay : delayForce;
    autoplayDelayTotal = swiper.params.autoplay.delay;
    autoplayDelayCurrent = swiper.params.autoplay.delay;
    const currentSlideDelay = getSlideDelay();
    if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
      delay = currentSlideDelay;
      autoplayDelayTotal = currentSlideDelay;
      autoplayDelayCurrent = currentSlideDelay;
    }
    autoplayTimeLeft = delay;
    const speed = swiper.params.speed;
    const proceed = () => {
      if (!swiper || swiper.destroyed) return;
      if (swiper.params.autoplay.reverseDirection) {
        if (!swiper.isBeginning || swiper.params.loop || swiper.params.rewind) {
          swiper.slidePrev(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(swiper.slides.length - 1, speed, true, true);
          emit("autoplay");
        }
      } else {
        if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
          swiper.slideNext(speed, true, true);
          emit("autoplay");
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, speed, true, true);
          emit("autoplay");
        }
      }
      if (swiper.params.cssMode) {
        autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
        requestAnimationFrame(() => {
          run();
        });
      }
    };
    if (delay > 0) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        proceed();
      }, delay);
    } else {
      requestAnimationFrame(() => {
        proceed();
      });
    }
    return delay;
  };
  const start = () => {
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    swiper.autoplay.running = true;
    run();
    emit("autoplayStart");
  };
  const stop = () => {
    swiper.autoplay.running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(raf);
    emit("autoplayStop");
  };
  const pause = (internal, reset) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    clearTimeout(timeout);
    if (!internal) {
      pausedByInteraction = true;
    }
    const proceed = () => {
      emit("autoplayPause");
      if (swiper.params.autoplay.waitForTransition) {
        swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
      } else {
        resume();
      }
    };
    swiper.autoplay.paused = true;
    if (reset) {
      if (slideChanged) {
        autoplayTimeLeft = swiper.params.autoplay.delay;
      }
      slideChanged = false;
      proceed();
      return;
    }
    const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
    autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
    if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
    proceed();
  };
  const resume = () => {
    if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop || swiper.destroyed || !swiper.autoplay.running) return;
    autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    if (pausedByInteraction) {
      pausedByInteraction = false;
      run(autoplayTimeLeft);
    } else {
      run();
    }
    swiper.autoplay.paused = false;
    emit("autoplayResume");
  };
  const onVisibilityChange = () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    const document2 = getDocument();
    if (document2.visibilityState === "hidden") {
      pausedByInteraction = true;
      pause(true);
    }
    if (document2.visibilityState === "visible") {
      resume();
    }
  };
  const onPointerEnter = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByInteraction = true;
    pausedByPointerEnter = true;
    if (swiper.animating || swiper.autoplay.paused) return;
    pause(true);
  };
  const onPointerLeave = (e) => {
    if (e.pointerType !== "mouse") return;
    pausedByPointerEnter = false;
    if (swiper.autoplay.paused) {
      resume();
    }
  };
  const attachMouseEvents = () => {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.el.addEventListener("pointerenter", onPointerEnter);
      swiper.el.addEventListener("pointerleave", onPointerLeave);
    }
  };
  const detachMouseEvents = () => {
    if (swiper.el && typeof swiper.el !== "string") {
      swiper.el.removeEventListener("pointerenter", onPointerEnter);
      swiper.el.removeEventListener("pointerleave", onPointerLeave);
    }
  };
  const attachDocumentEvents = () => {
    const document2 = getDocument();
    document2.addEventListener("visibilitychange", onVisibilityChange);
  };
  const detachDocumentEvents = () => {
    const document2 = getDocument();
    document2.removeEventListener("visibilitychange", onVisibilityChange);
  };
  on("init", () => {
    if (swiper.params.autoplay.enabled) {
      attachMouseEvents();
      attachDocumentEvents();
      start();
    }
  });
  on("destroy", () => {
    detachMouseEvents();
    detachDocumentEvents();
    if (swiper.autoplay.running) {
      stop();
    }
  });
  on("_freeModeStaticRelease", () => {
    if (pausedByTouch || pausedByInteraction) {
      resume();
    }
  });
  on("_freeModeNoMomentumRelease", () => {
    if (!swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("beforeTransitionStart", (_s, speed, internal) => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (internal || !swiper.params.autoplay.disableOnInteraction) {
      pause(true, true);
    } else {
      stop();
    }
  });
  on("sliderFirstMove", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
      return;
    }
    isTouched = true;
    pausedByTouch = false;
    pausedByInteraction = false;
    touchStartTimeout = setTimeout(() => {
      pausedByInteraction = true;
      pausedByTouch = true;
      pause(true);
    }, 200);
  });
  on("touchEnd", () => {
    if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
    clearTimeout(touchStartTimeout);
    clearTimeout(timeout);
    if (swiper.params.autoplay.disableOnInteraction) {
      pausedByTouch = false;
      isTouched = false;
      return;
    }
    if (pausedByTouch && swiper.params.cssMode) resume();
    pausedByTouch = false;
    isTouched = false;
  });
  on("slideChange", () => {
    if (swiper.destroyed || !swiper.autoplay.running) return;
    slideChanged = true;
  });
  Object.assign(swiper.autoplay, {
    start,
    stop,
    pause,
    resume
  });
}
function effectInit(params) {
  const {
    effect,
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams,
    perspective,
    recreateShadows,
    getEffectParams
  } = params;
  on("beforeInit", () => {
    if (swiper.params.effect !== effect) return;
    swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);
    if (perspective && perspective()) {
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
    }
    const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
    Object.assign(swiper.params, overwriteParamsResult);
    Object.assign(swiper.originalParams, overwriteParamsResult);
  });
  on("setTranslate _virtualUpdated", () => {
    if (swiper.params.effect !== effect) return;
    setTranslate2();
  });
  on("setTransition", (_s, duration) => {
    if (swiper.params.effect !== effect) return;
    setTransition2(duration);
  });
  on("transitionEnd", () => {
    if (swiper.params.effect !== effect) return;
    if (recreateShadows) {
      if (!getEffectParams || !getEffectParams().slideShadows) return;
      swiper.slides.forEach((slideEl) => {
        slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
      });
      recreateShadows();
    }
  });
  let requireUpdateOnVirtual;
  on("virtualUpdate", () => {
    if (swiper.params.effect !== effect) return;
    if (!swiper.slides.length) {
      requireUpdateOnVirtual = true;
    }
    requestAnimationFrame(() => {
      if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
        setTranslate2();
        requireUpdateOnVirtual = false;
      }
    });
  });
}
function effectTarget(effectParams, slideEl) {
  const transformEl = getSlideTransformEl(slideEl);
  if (transformEl !== slideEl) {
    transformEl.style.backfaceVisibility = "hidden";
    transformEl.style["-webkit-backface-visibility"] = "hidden";
  }
  return transformEl;
}
function effectVirtualTransitionEnd({
  swiper,
  duration,
  transformElements,
  allSlides
}) {
  const {
    activeIndex
  } = swiper;
  if (swiper.params.virtualTranslate && duration !== 0) {
    let eventTriggered = false;
    let transitionEndTarget;
    {
      transitionEndTarget = transformElements;
    }
    transitionEndTarget.forEach((el) => {
      elementTransitionEnd(el, () => {
        if (eventTriggered) return;
        if (!swiper || swiper.destroyed) return;
        eventTriggered = true;
        swiper.animating = false;
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper.wrapperEl.dispatchEvent(evt);
      });
    });
  }
}
function EffectFade({
  swiper,
  extendParams,
  on
}) {
  extendParams({
    fadeEffect: {
      crossFade: false
    }
  });
  const setTranslate2 = () => {
    const {
      slides
    } = swiper;
    const params = swiper.params.fadeEffect;
    for (let i = 0; i < slides.length; i += 1) {
      const slideEl = swiper.slides[i];
      const offset = slideEl.swiperSlideOffset;
      let tx = -offset;
      if (!swiper.params.virtualTranslate) tx -= swiper.translate;
      let ty = 0;
      if (!swiper.isHorizontal()) {
        ty = tx;
        tx = 0;
      }
      const slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
      const targetEl = effectTarget(params, slideEl);
      targetEl.style.opacity = slideOpacity;
      targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
    }
  };
  const setTransition2 = (duration) => {
    const transformElements = swiper.slides.map((slideEl) => getSlideTransformEl(slideEl));
    transformElements.forEach((el) => {
      el.style.transitionDuration = `${duration}ms`;
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides: true
    });
  };
  effectInit({
    effect: "fade",
    swiper,
    on,
    setTranslate: setTranslate2,
    setTransition: setTransition2,
    overwriteParams: () => ({
      slidesPerView: 1,
      slidesPerGroup: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
      virtualTranslate: !swiper.params.cssMode
    })
  });
}
function initSliders() {
  if (document.querySelector(".swiper")) {
    new Swiper(".swiper", {
      // <- Вказуємо склас потрібного слайдера
      // Підключаємо модулі слайдера
      // для конкретного випадку
      modules: [Navigation],
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      spaceBetween: 0,
      //autoHeight: true,
      speed: 800,
      //touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,
      /*
      // Ефекти
      effect: 'fade',
      autoplay: {
      	delay: 3000,
      	disableOnInteraction: false,
      },
      */
      // Пагінація
      /*
      pagination: {
      	el: '.swiper-pagination',
      	clickable: true,
      },
      */
      // Скроллбар
      /*
      scrollbar: {
      	el: '.swiper-scrollbar',
      	draggable: true,
      },
      */
      // Кнопки "вліво/вправо"
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
      },
      /*
      // Брейкпоінти
      breakpoints: {
      	640: {
      		slidesPerView: 1,
      		spaceBetween: 0,
      		autoHeight: true,
      	},
      	768: {
      		slidesPerView: 2,
      		spaceBetween: 20,
      	},
      	992: {
      		slidesPerView: 3,
      		spaceBetween: 20,
      	},
      	1268: {
      		slidesPerView: 4,
      		spaceBetween: 30,
      	},
      },
      */
      // Події
      on: {}
    });
  }
  if (document.querySelector(".hero-swiper-bg")) {
    new Swiper(".hero-swiper-bg", {
      modules: [EffectFade, Autoplay],
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 1e3,
      loop: true
      // autoplay: {
      // 	delay: 7000,
      // 	disableOnInteraction: false,
      // },
      // effect: 'fade',
      // fadeEffect: {
      // 	crossFade: true
      // },
    });
  }
}
document.querySelector("[data-fls-slider]") ? window.addEventListener("load", initSliders) : null;
function menuInit() {
  document.addEventListener("click", function(e) {
    if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
      bodyLockToggle();
      document.documentElement.toggleAttribute("data-fls-menu-open");
    }
  });
}
document.querySelector("[data-fls-menu]") ? window.addEventListener("load", menuInit) : null;
function headerScroll() {
  const header = document.querySelector("[data-fls-header-scroll]");
  const headerShow = header.hasAttribute("data-fls-header-scroll-show");
  const headerShowTimer = header.dataset.flsHeaderScrollShow ? header.dataset.flsHeaderScrollShow : 500;
  const startPoint = header.dataset.flsHeaderScroll ? header.dataset.flsHeaderScroll : 1;
  let scrollDirection = 0;
  let timer;
  document.addEventListener("scroll", function(e) {
    const scrollTop = window.scrollY;
    clearTimeout(timer);
    if (scrollTop >= startPoint) {
      !header.classList.contains("--header-scroll") ? header.classList.add("--header-scroll") : null;
      if (headerShow) {
        if (scrollTop > scrollDirection) {
          header.classList.contains("--header-show") ? header.classList.remove("--header-show") : null;
        } else {
          !header.classList.contains("--header-show") ? header.classList.add("--header-show") : null;
        }
        timer = setTimeout(() => {
          !header.classList.contains("--header-show") ? header.classList.add("--header-show") : null;
        }, headerShowTimer);
      }
    } else {
      header.classList.contains("--header-scroll") ? header.classList.remove("--header-scroll") : null;
      if (headerShow) {
        header.classList.contains("--header-show") ? header.classList.remove("--header-show") : null;
      }
    }
    scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
  });
}
document.querySelector("[data-fls-header-scroll]") ? window.addEventListener("load", headerScroll) : null;
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest("[data-fls-scrollto]")) {
        const gotoLink = targetElement.closest("[data-fls-scrollto]");
        const gotoLinkSelector = gotoLink.dataset.flsScrollto ? gotoLink.dataset.flsScrollto : "";
        const noHeader = gotoLink.hasAttribute("data-fls-scrollto-header") ? true : false;
        const gotoSpeed = gotoLink.dataset.flsScrolltoSpeed ? gotoLink.dataset.flsScrolltoSpeed : 500;
        const offsetTop = gotoLink.dataset.flsScrolltoTop ? parseInt(gotoLink.dataset.flsScrolltoTop) : 0;
        if (window.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fls-fullpage-section]");
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.flsFullpageId : null;
          if (fullpageSectionId !== null) {
            window.fullpage.switchingSection(fullpageSectionId);
            if (document.documentElement.hasAttribute("data-fls-menu-open")) {
              bodyUnlock();
              document.documentElement.removeAttribute("data-fls-menu-open");
            }
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.flsWatcher === "navigator") {
        document.querySelector(`[data-fls-scrollto].--navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-fls-scrollto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-fls-scrollto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add("--navigator-active") : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove("--navigator-active") : null;
        }
      }
    }
  }
  if (getHash()) {
    let goToHash;
    if (document.querySelector(`#${getHash()}`)) {
      goToHash = `#${getHash()}`;
    } else if (document.querySelector(`.${getHash()}`)) {
      goToHash = `.${getHash()}`;
    }
    goToHash ? gotoBlock(goToHash) : null;
  }
}
document.querySelector("[data-fls-scrollto]") ? window.addEventListener("load", pageNavigation) : null;
let isLogoAnimationCompleted = false;
let areImagesLoaded = false;
function preloader() {
  const preloaderImages = document.querySelectorAll("img");
  const htmlDocument = document.documentElement;
  const isPreloaded = localStorage.getItem(location.href) && document.querySelector('[data-fls-preloader="true"]');
  let imagesLoadedCount = 0;
  let counter = 0;
  let progress = 0;
  if (preloaderImages.length && !isPreloaded) {
    let imageLoaded = function() {
      imagesLoadedCount++;
      progress = Math.round(100 / preloaderImages.length * imagesLoadedCount);
      const intervalId = setInterval(() => {
        if (counter >= progress) {
          clearInterval(intervalId);
        } else {
          setValueProgress(++counter);
        }
      }, 10);
      if (imagesLoadedCount === preloaderImages.length) {
        areImagesLoaded = true;
        startSecondAnimation();
      }
    }, setValueProgress = function(progress2) {
      if (showPecentLoad) showPecentLoad.innerText = `${progress2}%`;
      if (showLineLoad) showLineLoad.style.width = `${progress2}%`;
    };
    const preloaderTemplate = `
		<div class="fls-preloader">
			<div class="fls-preloader__body">
				<div class="logo">
					<svg viewBox="0 0 69 45" fill="none" xmlns="http://www.w3.org/2000/svg">
						<mask id="mask0_427_38" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="69" height="45">
							<mask id="path-1-inside-1_427_38" fill="white">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M33.5645 0.0015454C33.6296 -0.0146761 33.7272 0.0988744 33.7923 0.244868C33.8899 0.423305 33.597 0.812621 32.7835 1.65614C32.149 2.305 31.4006 3.16474 31.1078 3.5865C30.8149 4.02448 30.5871 4.39757 30.5871 4.44624C30.5871 4.4949 30.8637 4.68956 31.1891 4.868C31.5308 5.06266 32.4093 5.80884 33.1577 6.53881C33.9062 7.26878 34.7847 8.25829 35.0938 8.74494C35.4192 9.23158 35.8097 9.81556 35.9724 10.0427C36.1351 10.2698 36.4768 10.8862 36.7371 11.4215C36.9811 11.9568 37.2903 12.7192 37.4041 13.1247C37.518 13.5303 37.7133 14.1467 37.8434 14.5036C37.9736 14.8604 38.0712 15.7202 38.0712 16.4177C38.0712 17.1639 38.1526 17.7154 38.2502 17.7803C38.3641 17.8614 38.3966 18.121 38.3315 18.4778C38.2827 18.786 38.1688 19.7756 38.0712 20.6677C37.9899 21.5599 37.8434 22.3548 37.7458 22.4521C37.6645 22.5494 37.5831 22.7441 37.5831 22.8901C37.5831 23.0523 37.3879 23.5714 37.1601 24.0256C36.9323 24.496 36.6232 25.0962 36.493 25.372C36.3466 25.6477 35.6633 26.4102 34.98 27.0752C34.2966 27.7403 33.2879 28.5676 32.7347 28.892C32.1816 29.2327 31.6121 29.5085 31.482 29.5085C31.3518 29.5085 31.2054 29.5571 31.1728 29.622C31.1403 29.7031 30.7498 29.8816 30.278 30.0276C29.8224 30.1898 29.2855 30.3195 29.074 30.3195C28.8625 30.3195 28.6022 30.4169 28.4883 30.5142C28.3582 30.6602 27.626 30.7413 26.3895 30.7737C25.332 30.8062 24.0467 30.7575 23.5098 30.644C22.9729 30.5304 22.0943 30.4169 21.5574 30.3682C21.0205 30.3358 20.5162 30.2222 20.4185 30.1411C20.3209 30.06 20.0606 29.9951 19.8003 29.9951C19.5562 29.9951 19.2308 29.9302 19.0681 29.8491C18.9217 29.768 18.6126 29.6707 18.3848 29.6382C18.157 29.6058 17.8154 29.4922 17.6039 29.3787C17.4086 29.2651 17.0995 29.184 16.9205 29.184C16.7416 29.184 16.5626 29.1191 16.5138 29.0218C16.465 28.9245 16.2372 28.8596 15.9769 28.8596C15.7328 28.8758 15.4237 28.7623 15.2936 28.6163C15.1634 28.4703 14.9031 28.3567 14.7241 28.373C14.5452 28.373 14.3011 28.2919 14.2035 28.1783C14.0408 27.9999 13.9269 28.0323 13.634 28.3243C13.4225 28.5027 12.967 28.8272 12.6091 29.0218C12.2511 29.2003 11.8444 29.4274 11.7142 29.4922C11.5841 29.5733 11.161 29.7842 10.7706 29.9789C10.3964 30.1573 9.92455 30.3195 9.71304 30.3195C9.50153 30.3195 9.24122 30.4169 9.1436 30.5142C8.99717 30.6602 8.21622 30.7251 6.42655 30.7251C4.62061 30.7251 3.85593 30.6602 3.7095 30.5142C3.59561 30.4006 3.27022 30.3195 3.0099 30.3195C2.73332 30.3195 2.32657 30.1898 2.06626 29.9951C1.82221 29.8167 1.57817 29.6707 1.49682 29.6707C1.43174 29.6707 1.18769 29.476 0.959915 29.2327C0.715869 28.9732 0.406744 28.5352 0.260316 28.2432C0.113888 27.9512 0 27.3348 0 26.8319C0 26.3453 0.065079 25.9073 0.162697 25.8586C0.244046 25.81 0.325395 25.6315 0.325395 25.4531C0.325395 25.2584 0.699599 24.788 1.22023 24.3176C1.78967 23.7985 2.26149 23.5065 2.52181 23.5065C2.74959 23.5065 2.96109 23.4416 3.0099 23.3443C3.05871 23.247 3.79085 23.1821 4.71823 23.1821C5.6456 23.1821 6.37774 23.247 6.42655 23.3443C6.47536 23.4416 6.78449 23.5065 7.10988 23.5065C7.45154 23.5065 7.87456 23.6201 8.05353 23.7498C8.23249 23.8958 8.49281 23.9932 8.62297 23.9932C8.75312 23.9932 9.92455 24.5122 13.5527 26.3453L14.659 25.2098C15.2773 24.5933 15.7817 24.0256 15.7817 23.9445C15.7817 23.8796 15.9606 23.6201 16.1884 23.3443C16.4162 23.0685 16.5951 22.7603 16.5951 22.6468C16.5951 22.5494 16.7741 22.2737 17.0019 22.0466C17.2297 21.8195 17.4086 21.5761 17.4086 21.4788C17.3924 21.3815 17.5225 21.2031 17.6689 21.0733C17.8154 20.9435 18.2872 20.0838 18.7265 19.1591C19.1658 18.2507 19.5725 17.4721 19.6376 17.4397C19.7189 17.4072 20.3697 16.1906 21.1181 14.7307C21.8665 13.2707 22.6149 11.9244 22.7776 11.7459C22.9566 11.5675 23.103 11.3242 23.103 11.2106C23.103 11.1133 23.282 10.724 23.5098 10.3671C23.7376 10.0102 23.9165 9.68578 23.9165 9.63712C23.9165 9.58846 24.0955 9.32891 24.3233 9.06937C24.551 8.7936 24.73 8.48539 24.73 8.37184C24.7137 8.27451 24.8764 8.03119 25.0554 7.85275C25.2344 7.67432 25.3808 7.44722 25.3808 7.36611C25.3808 7.26878 25.6411 6.94435 25.9502 6.63614C26.2594 6.32793 26.5197 5.98728 26.5197 5.90617C26.5197 5.80884 26.7312 5.5493 26.9752 5.30598C27.382 4.88422 27.3983 4.83555 27.1542 4.57601C26.9915 4.41379 26.5685 4.17047 26.1943 4.0407C25.8201 3.91093 25.4296 3.70005 25.3157 3.5865C25.2181 3.47295 24.9741 3.37562 24.7626 3.39184C24.5673 3.39184 24.2745 3.32695 24.1118 3.24585C23.9653 3.16474 23.5749 3.01875 23.2657 2.92142C22.9566 2.82409 22.3384 2.69432 21.8991 2.62943C21.4761 2.54832 21.0856 2.45099 21.0531 2.36989C21.0205 2.305 20.0931 2.25633 18.9868 2.25633C17.8967 2.25633 16.7741 2.32122 16.5138 2.41855C16.2372 2.49966 15.4725 2.67809 14.8055 2.82409C14.1384 2.95386 13.2924 3.14852 12.9344 3.24585C12.5765 3.34318 12.2023 3.45673 12.121 3.48917C12.0233 3.52161 11.8444 3.61894 11.7142 3.70005C11.5841 3.78116 11.096 4.00826 10.6567 4.21914C10.2011 4.43002 9.55034 4.83555 9.19241 5.12754C8.83447 5.41953 8.46027 5.66285 8.37892 5.66285C8.2813 5.66285 7.72813 6.16572 7.10988 6.76591C6.5079 7.36611 6.01981 7.95008 6.01981 8.04741C6.01981 8.16096 5.85711 8.45295 5.6456 8.69627C5.45037 8.95582 5.20632 9.32891 5.1087 9.55601C5.01108 9.78311 4.83212 10.2535 4.71823 10.6104C4.60434 10.9673 4.50672 11.6161 4.50672 12.0703C4.50672 12.5894 4.63688 13.141 4.88092 13.6114C5.07616 14.0169 5.36902 14.4711 5.51544 14.6333C5.66187 14.7956 5.98727 15.0389 6.26385 15.1687C6.52417 15.2984 6.86583 15.4282 6.99599 15.4444C7.12615 15.4769 7.40274 15.5742 7.59797 15.6877C7.80948 15.8013 8.31384 15.8824 8.73685 15.8824C9.17614 15.8824 9.8432 15.7526 10.2499 15.6066C10.673 15.4606 11.3726 14.974 11.9257 14.4387C12.4464 13.9358 12.9995 13.2545 13.1785 12.9139C13.3575 12.5894 13.5039 12.1839 13.5039 12.0217C13.4876 11.8757 13.634 11.6161 13.8293 11.4539C14.0083 11.3079 14.2198 11.2106 14.3174 11.2593C14.3987 11.3079 14.4801 11.6973 14.4801 12.1515C14.4801 12.5894 14.3987 12.995 14.3174 13.0436C14.2198 13.0923 14.1547 13.3032 14.1547 13.5303C14.1547 13.806 13.8456 14.2602 13.211 14.9253C12.7067 15.4606 11.9908 16.0446 11.6329 16.2068C11.2749 16.3853 10.8519 16.5313 10.6892 16.5313C10.5428 16.5313 10.3801 16.5961 10.3313 16.6935C10.2825 16.7908 9.58288 16.8557 8.73685 16.8557C7.92337 16.8557 6.97972 16.7746 6.6706 16.6773C6.36147 16.5799 5.98727 16.4339 5.85711 16.3528C5.72695 16.2717 5.46664 16.1419 5.28767 16.0608C5.1087 15.9797 4.65315 15.6066 4.26267 15.2498C3.88847 14.8767 3.43292 14.2602 3.25395 13.8547C3.07498 13.4492 2.84721 13.0923 2.76586 13.0436C2.66824 12.995 2.60316 12.2001 2.60316 11.1782C2.60316 9.71823 2.66824 9.28025 2.91228 8.77738C3.09125 8.45295 3.31903 7.99875 3.41665 7.77165C3.51427 7.54455 3.69323 7.18767 3.82339 6.96057C3.95355 6.73347 4.49045 6.13327 4.99481 5.61419C5.51544 5.11132 6.00354 4.68956 6.10116 4.68956C6.1825 4.70578 6.37774 4.57601 6.5079 4.43002C6.63806 4.28402 7.01226 4.02448 7.32139 3.86226C7.63051 3.68383 8.00472 3.48917 8.13487 3.40806C8.26503 3.34318 8.67178 3.14852 9.02971 2.9863C9.38764 2.84031 9.81066 2.64565 9.95709 2.56454C10.1198 2.48344 10.3638 2.41855 10.494 2.41855C10.6241 2.41855 10.917 2.305 11.1448 2.17523C11.3726 2.04546 11.5515 1.96435 11.5515 2.01301C11.5515 2.06168 11.8606 1.98057 12.2348 1.8508C12.6253 1.7048 13.1948 1.60747 13.5039 1.60747C13.8293 1.60747 14.1547 1.54259 14.236 1.46148C14.3336 1.38037 14.9519 1.26682 15.619 1.20194C16.286 1.13705 17.7178 1.07216 18.7916 1.07216C19.8654 1.08839 21.2971 1.13705 21.9642 1.20194C22.6312 1.26682 23.2495 1.38037 23.3471 1.46148C23.4284 1.54259 23.7701 1.60747 24.0792 1.60747C24.3884 1.6237 24.7951 1.72102 24.9741 1.8508C25.153 1.99679 25.4296 2.09412 25.576 2.09412C25.7387 2.09412 26.0153 2.15901 26.1943 2.25633C26.3733 2.33744 26.6661 2.48344 26.8451 2.58076C27.0241 2.66187 27.3006 2.74298 27.4471 2.74298C27.6098 2.74298 27.8863 2.85653 28.0653 2.9863C28.2443 3.1323 28.5534 3.22962 28.7486 3.22962C28.9927 3.22962 29.1554 3.11607 29.2042 2.90519C29.253 2.72676 29.6923 2.28878 30.1804 1.9319C30.6685 1.57503 31.124 1.28304 31.1891 1.28304C31.2705 1.29927 31.4657 1.13705 31.6447 0.942393C31.8236 0.763956 32.1816 0.504412 32.4581 0.390862C32.7185 0.277311 33.0601 0.131317 33.1903 0.0988744C33.3204 0.0502099 33.4831 0.0015454 33.5482 0.0015454H33.5645ZM28.7812 7.25256C28.7975 7.36611 28.651 7.64187 28.4395 7.8852C28.228 8.14474 27.9352 8.59894 27.7887 8.90715C27.626 9.21536 27.2193 9.88044 26.8614 10.3671C26.5197 10.8537 26.0479 11.6486 25.8201 12.1028C25.576 12.5732 25.3157 12.995 25.2344 13.0436C25.1368 13.0923 24.9253 13.433 24.7626 13.806C24.5999 14.1954 24.3558 14.5847 24.2419 14.682C24.1118 14.7793 23.8514 15.2173 23.6562 15.6553C23.461 16.0933 23.1519 16.5961 22.9729 16.7746C22.7776 16.953 22.615 17.1477 22.6312 17.2126C22.6312 17.2937 22.1757 18.0074 21.6062 18.8185C21.0531 19.6296 20.4836 20.5218 20.3372 20.7975C20.1908 21.0895 19.9467 21.4302 19.8003 21.5599C19.6539 21.6897 19.5237 21.8681 19.54 21.9655C19.54 22.0628 19.361 22.3061 19.1332 22.5332C18.9054 22.7603 18.7265 23.0036 18.7265 23.101C18.7265 23.1983 18.4662 23.5227 18.157 23.8309C17.8479 24.1391 17.5876 24.496 17.5876 24.5933C17.5876 24.7069 17.067 25.3071 16.4487 25.9397C15.8142 26.5562 15.3098 27.1239 15.3098 27.1888C15.3261 27.2699 15.44 27.3997 15.6027 27.5132C15.7491 27.6268 16.0094 27.7241 16.1559 27.7241C16.3186 27.7241 16.644 27.8214 16.888 27.9512C17.1483 28.0647 17.6039 28.2432 17.913 28.3567C18.2221 28.4541 18.6777 28.5352 18.9217 28.5352C19.182 28.5352 19.4098 28.6001 19.4586 28.6974C19.5074 28.7947 19.9793 28.892 20.5162 28.9407C21.0531 28.9894 21.5249 29.0867 21.5737 29.184C21.6225 29.2814 22.8427 29.3462 24.6975 29.3462C27.1542 29.3462 27.8213 29.2976 28.0816 29.1029C28.2606 28.9732 28.5371 28.8596 28.6836 28.8596C28.8463 28.8596 29.1066 28.7947 29.253 28.7136C29.4157 28.6325 29.7736 28.4703 30.0502 28.3405C30.3268 28.227 30.8312 27.9025 31.1566 27.643C31.4982 27.3672 32.1165 26.8644 32.5232 26.5075C32.9137 26.1506 33.4506 25.5666 33.6784 25.226C33.9062 24.8853 34.3129 24.2203 34.5569 23.766C34.801 23.3118 35.0938 22.6792 35.1915 22.371C35.2891 22.0628 35.4355 21.3328 35.5169 20.7489C35.5982 20.1649 35.6796 19.2565 35.6796 18.7212C35.6796 18.1859 35.5982 17.1639 35.5169 16.4502C35.4192 15.7364 35.2891 14.9091 35.2077 14.6009C35.1427 14.3089 35.0288 14.0331 34.9474 14.0007C34.8823 13.9683 34.8335 13.806 34.8335 13.6438C34.8335 13.4978 34.4593 12.6057 33.9875 11.6648C33.5157 10.724 32.8649 9.60468 32.5558 9.1667C32.2466 8.72872 31.5145 7.86898 30.9288 7.25256C30.3431 6.63614 29.8224 6.1495 29.7736 6.1495C29.7248 6.1495 29.4808 6.36038 29.2205 6.6037C28.9602 6.84702 28.7649 7.13901 28.7812 7.25256V7.25256ZM2.97736 25.8748C2.78213 26.2155 2.61943 26.767 2.61943 27.0752C2.60316 27.4321 2.73332 27.7565 2.94482 27.9674C3.12379 28.1459 3.28649 28.3892 3.27022 28.4865C3.27022 28.6001 3.44919 28.7623 3.67696 28.8596C3.90474 28.9569 4.11625 29.0867 4.16506 29.184C4.21386 29.2814 5.12497 29.3462 6.39401 29.3462C8.05353 29.33 8.63924 29.2814 8.88328 29.1029C9.06225 28.9569 9.32257 28.8596 9.45272 28.8596C9.58288 28.8596 10.1361 28.6487 10.673 28.3892C11.2099 28.1296 11.7468 27.8052 11.8444 27.6592C11.9583 27.5132 12.0233 27.3348 11.9745 27.2375C11.9257 27.1401 11.0634 26.6697 10.0547 26.1831C9.06225 25.6964 8.13487 25.2909 8.02099 25.2909C7.92337 25.2909 7.69559 25.226 7.53289 25.1449C7.38647 25.0638 6.99599 24.9178 6.68687 24.8204C6.37774 24.7231 5.71068 24.6582 5.22259 24.6582C4.70196 24.6745 4.11625 24.788 3.82339 24.9502C3.54681 25.1124 3.1726 25.518 2.97736 25.8748V25.8748ZM62.3131 12.3137C62.3619 12.3137 62.6385 12.4597 62.8988 12.6381C63.1592 12.8165 63.4683 13.1247 63.5822 13.3356C63.6961 13.5303 63.7774 14.0007 63.7937 14.3738C63.7937 14.7631 63.7286 15.1038 63.631 15.1524C63.5334 15.2011 63.4683 15.3958 63.4683 15.5904C63.4683 15.8013 63.1754 16.2555 62.7687 16.661C62.3457 17.099 62.1667 17.3586 62.3294 17.3586C62.4596 17.3748 63.5496 17.3748 66.8849 17.3423V17.829C66.8849 18.0885 66.7385 18.5752 66.5595 18.8834C66.3806 19.1916 66.2341 19.5485 66.2341 19.6458C66.2341 19.7593 65.9738 20.4082 65.6647 21.0733C65.3393 21.7384 65.0139 22.4034 64.9326 22.5332C64.8512 22.663 64.656 23.0361 64.5096 23.3443C64.3631 23.6525 64.1679 24.0905 64.054 24.3176C63.9401 24.5447 63.7611 25.0476 63.6473 25.4531C63.5334 25.8586 63.3707 26.3128 63.2893 26.4588C63.208 26.621 63.1429 26.9455 63.1429 27.1888C63.1429 27.4483 63.273 27.7728 63.4357 27.935C63.5822 28.0972 63.8262 28.2107 63.9564 28.2107C64.0865 28.2107 64.5909 27.8052 65.0465 27.3186C65.5183 26.8319 65.9087 26.329 65.9087 26.2155C65.8925 26.1182 66.0552 25.8748 66.2341 25.6964C66.4294 25.518 66.8361 24.8367 67.1453 24.1878C67.4544 23.5552 67.7635 22.9874 67.8611 22.9388C67.9587 22.8901 68.1377 22.5981 68.2679 22.2899C68.398 21.9817 68.6258 21.7221 68.756 21.7221C68.9024 21.7221 69 21.8681 69 22.079C69 22.2899 68.6746 23.1172 68.2841 23.912C67.8937 24.7069 67.4544 25.4855 67.3079 25.6153C67.1615 25.7451 67.0314 25.9235 67.0314 26.0208C67.0314 26.1182 66.8524 26.4264 66.6409 26.7021C66.4131 26.9941 66.2341 27.2861 66.2341 27.351C66.2341 27.4321 65.925 27.7728 65.5508 28.1459C65.1603 28.5027 64.6234 28.892 64.3631 29.0056C64.1028 29.1354 63.7123 29.3138 63.5008 29.4111C63.208 29.5409 63.0453 29.5409 62.8012 29.3787C62.6385 29.2814 62.3457 29.184 62.1667 29.184C61.9877 29.184 61.6135 28.9407 61.3532 28.6487C60.8814 28.1459 60.8489 28.0648 60.8651 26.7508C60.8651 25.7937 60.9465 25.2747 61.1092 25.0476C61.2556 24.8691 61.3532 24.5933 61.3532 24.4311C61.3532 24.2851 61.5322 23.8309 61.76 23.4254C61.9877 23.0199 62.1179 22.6954 62.0365 22.6954C61.9715 22.6954 62.1179 22.5008 62.3457 22.2575C62.5735 21.9979 62.9477 21.4139 63.1917 20.9435C63.4357 20.4893 63.631 19.9216 63.631 19.6945C63.631 19.4511 63.4846 19.1916 63.2568 19.0456C63.0615 18.9158 62.7361 18.8023 62.5246 18.8023C62.3294 18.8023 62.1342 18.7212 62.0854 18.6401C62.0365 18.5427 61.76 18.4778 61.4671 18.4778C61.0278 18.4778 60.8977 18.5752 60.6699 19.0943C60.5072 19.4187 60.377 19.7918 60.377 19.8891C60.377 20.0027 60.312 20.2298 60.2306 20.3758C60.1493 20.538 60.0191 20.8462 59.9215 21.0733C59.8239 21.3004 59.5473 21.9492 59.3032 22.5332C59.0592 23.1172 58.7663 23.7012 58.6687 23.8309C58.5711 23.9607 58.3759 24.3338 58.262 24.642C58.1481 24.9502 57.8715 25.3882 57.6763 25.6153C57.4647 25.8424 57.2858 26.0695 57.2858 26.1344C57.2858 26.2155 57.058 26.6048 56.7651 27.0266C56.4886 27.4646 55.9354 28.1134 55.5449 28.4865C55.1056 28.9407 54.6989 29.184 54.4386 29.184C54.2108 29.184 53.9993 29.2489 53.9505 29.3462C53.9017 29.4436 53.5925 29.5085 53.2509 29.5085C52.9255 29.5085 52.2747 29.33 51.8354 29.1191C51.3148 28.8758 50.9406 28.5676 50.8104 28.2756C50.6965 28.0161 50.5989 27.3672 50.5989 26.8319C50.5989 26.2966 50.6803 25.7937 50.7779 25.6964C50.8755 25.5991 50.9406 25.4044 50.9406 25.2422C50.9406 25.0962 51.1195 24.5771 51.3473 24.1067C51.5751 23.6525 51.9493 22.9712 52.1608 22.6143C52.3723 22.2575 52.6326 21.8195 52.7303 21.641C52.8116 21.4626 53.0394 21.0733 53.2183 20.7813C53.3973 20.5055 53.5112 20.1811 53.4624 20.1C53.4136 20.0027 53.2021 19.9378 52.9743 19.9378C52.7465 19.9378 52.4049 20.0351 52.1933 20.1324C51.9981 20.246 51.1521 20.9922 50.3223 21.8032C49.5088 22.5981 48.8255 23.3605 48.8255 23.4578C48.8255 23.5714 48.5652 23.9445 48.2561 24.2689C47.9469 24.6096 47.6866 24.9502 47.6866 25.0476C47.7029 25.1287 47.5077 25.3882 47.2799 25.6153C47.0521 25.8424 46.8731 26.0857 46.8731 26.1831C46.8731 26.2642 46.7267 26.4913 46.5477 26.6697C46.3688 26.8481 46.2224 27.1077 46.2224 27.2375C46.2386 27.3672 46.1247 27.5943 45.9783 27.7241C45.8319 27.8539 45.718 28.0972 45.7343 28.2432C45.7343 28.4054 45.6692 28.6812 45.5716 28.8596C45.4631 29.0759 45.2462 29.184 44.9208 29.184C44.5954 29.184 44.3513 29.0597 44.1886 28.8109C44.0585 28.6163 43.9446 28.0972 43.9446 27.643C43.9446 27.1888 44.091 26.3939 44.27 25.8586C44.4652 25.3233 44.7743 24.5122 44.9859 24.0743C45.1974 23.6201 45.4251 23.1496 45.4739 23.0199C45.5228 22.8901 45.718 22.5494 45.8807 22.2899C46.0597 22.0141 46.2061 21.6573 46.2061 21.4788C46.2224 21.3004 46.3362 20.9922 46.4664 20.7813C46.5966 20.5866 46.6779 20.3109 46.6291 20.1811C46.5803 20.0513 46.3851 19.9378 46.2061 19.9378C46.0108 19.9378 45.6366 20.1973 45.3438 20.5055C45.0672 20.83 44.8069 21.0733 44.7581 21.0733C44.7093 21.0733 44.4001 21.3166 44.0585 21.5924C43.7331 21.8844 43.4565 22.1926 43.4565 22.2899C43.4565 22.371 43.0172 22.8901 42.4803 23.4254C41.9434 23.9607 41.5041 24.496 41.5041 24.5933C41.5041 24.7069 41.3414 24.9989 41.1299 25.2422C40.9347 25.5018 40.6581 25.9073 40.5279 26.1831C40.3978 26.4426 40.1375 26.8806 39.9585 27.1563C39.7633 27.4159 39.5192 27.8539 39.3891 28.1296C39.2589 28.3892 39.0474 28.7461 38.901 28.9083C38.7383 29.1029 38.4291 29.2003 37.9573 29.184C37.5831 29.184 37.095 29.2976 36.8672 29.4274C36.5581 29.622 36.4442 29.622 36.3629 29.4598C36.3141 29.3625 36.4605 28.8596 36.7046 28.373C36.9323 27.8863 37.1926 27.3672 37.274 27.2375C37.3553 27.1077 38.4291 24.9664 39.6656 22.4683C40.9021 19.9864 42.041 17.829 42.2037 17.683C42.3664 17.537 42.4966 17.3423 42.4803 17.2612C42.4803 17.1639 42.6755 17.0017 42.9359 16.8881C43.1799 16.7746 43.6843 16.6935 44.0585 16.6935C44.4489 16.6935 44.937 16.7908 45.1648 16.8881C45.3926 17.0017 45.5716 17.1477 45.5716 17.2126C45.5716 17.2937 45.4577 17.3423 45.3275 17.3423C45.1811 17.3423 45.0184 17.5045 44.937 17.6992C44.8557 17.9101 44.6279 18.2183 44.4327 18.3967C44.2374 18.5752 43.8632 19.1429 43.6029 19.6458C43.3426 20.1649 43.066 20.6191 42.9684 20.6677C42.8708 20.7164 42.6755 21.0084 42.5128 21.3166C42.3664 21.641 42.2851 21.9492 42.3664 22.0141C42.4315 22.079 43.0986 21.5113 43.8632 20.7489C44.6279 19.9864 45.3438 19.3376 45.4577 19.3051C45.5553 19.2727 46.0108 18.8996 46.4664 18.4616C46.9057 18.0236 47.5727 17.5208 47.9307 17.3423C48.2886 17.1639 48.8743 17.0179 49.2323 17.0179C49.6227 17.0179 49.9969 17.1315 50.1759 17.3099C50.3386 17.4559 50.4525 17.7965 50.4525 18.0723C50.4525 18.3318 50.3386 18.7049 50.2084 18.8834C50.062 19.0618 49.9644 19.3214 49.9644 19.4511C49.9644 19.5809 49.8668 19.9053 49.7366 20.1811C49.6065 20.4406 49.3461 20.8137 49.1509 20.9922C48.9719 21.1706 48.8092 21.4464 48.8255 21.5924C48.8255 21.7546 48.7604 21.8844 48.6628 21.8844C48.5652 21.8844 48.5001 21.9979 48.5001 22.1277C48.5001 22.2575 48.5652 22.371 48.6628 22.371C48.7604 22.371 48.8743 22.2412 48.9394 22.079C49.0045 21.933 49.3461 21.495 49.7041 21.1057C50.0783 20.7326 50.4362 20.4244 50.5338 20.4244C50.6315 20.4244 50.9569 20.1649 51.266 19.8567C51.5751 19.5485 51.9005 19.2889 51.9981 19.2889C52.0957 19.3051 52.2747 19.1754 52.4049 19.0294C52.535 18.8834 52.9743 18.6076 53.381 18.4292C53.7878 18.2507 54.3084 17.9263 54.5525 17.7154C54.8128 17.5045 55.187 17.3423 55.4148 17.3423C55.6425 17.3423 55.854 17.2612 55.9029 17.1801C55.9517 17.0828 56.3421 17.0179 56.7977 17.0179C57.237 17.0179 57.6112 17.0503 57.6112 17.099C57.6112 17.1477 57.5136 17.3423 57.3997 17.537C57.3021 17.7479 57.1231 18.0236 57.0092 18.1534C56.8953 18.2832 56.1469 19.7107 55.3334 21.3166C54.5199 22.9225 53.8691 24.3338 53.8691 24.4311C53.8691 24.5447 53.7715 24.8367 53.6414 25.08C53.5112 25.3395 53.3322 25.7937 53.2346 26.1019C53.137 26.4102 53.0556 26.9617 53.0556 27.3186C53.0394 27.7728 53.137 28.0485 53.381 28.2432C53.6576 28.4865 53.7715 28.5027 54.0644 28.3405C54.2759 28.227 54.7802 27.8052 55.2195 27.3997C55.6425 26.9941 55.9842 26.6048 55.9842 26.5075C55.9842 26.4102 56.1306 26.1993 56.3096 26.0208C56.4886 25.8424 56.6513 25.6315 56.6513 25.5342C56.6513 25.4369 56.814 25.1449 57.0092 24.8853C57.2207 24.6096 57.7739 23.6363 58.2294 22.6954C58.7012 21.7546 59.0755 20.8948 59.0755 20.7813C59.0755 20.684 59.2219 20.3271 59.4009 20.0189C59.5798 19.7107 59.7262 19.2727 59.7262 19.0456C59.7262 18.8185 59.7913 18.6076 59.8889 18.5589C59.9866 18.5103 60.0516 18.3156 60.0516 18.1047C60.0516 17.9101 60.1493 17.6019 60.2794 17.4234C60.3933 17.245 60.5397 16.807 60.6048 16.4502C60.6699 16.0933 60.7512 15.5093 60.8 15.1524C60.8651 14.7956 60.9627 14.4225 61.0441 14.3414C61.1254 14.244 61.1743 14.0007 61.158 13.7736C61.1417 13.5141 61.3044 13.2059 61.6786 12.849C61.9877 12.557 62.2643 12.3137 62.3131 12.3137V12.3137ZM11.8444 32.769C12.5928 32.7528 13.2273 32.8177 13.2761 32.915C13.3249 33.0123 13.4876 33.0772 13.634 33.0772C13.7967 33.061 14.0733 33.2232 14.2523 33.4178C14.4313 33.6125 14.594 33.8883 14.6265 34.0343C14.659 34.1803 14.7404 34.6507 14.8217 35.1049C14.8868 35.5429 14.8868 35.9808 14.8055 36.0782C14.7404 36.1755 14.5614 36.1917 14.415 36.1106C14.2848 36.0457 14.171 35.8024 14.171 35.5429C14.171 35.2347 13.9269 34.8453 12.5765 33.4016H11.5027C10.5753 33.4016 10.3801 33.4503 10.1361 33.7585C9.97336 33.9694 9.76185 34.31 9.66423 34.5371C9.56661 34.7642 9.50153 35.0562 9.5178 35.186C9.53407 35.3158 9.61542 35.6078 9.6805 35.8349C9.76185 36.062 10.0872 36.5162 10.4126 36.8568C10.738 37.1812 11.0634 37.457 11.161 37.457C11.2424 37.457 11.4702 37.603 11.6491 37.7814C11.8281 37.9599 12.1047 38.1221 12.2511 38.1059C12.4138 38.1059 12.5765 38.1707 12.6253 38.2681C12.6741 38.3654 13.0158 38.5763 13.39 38.7385C13.7805 38.9007 14.3662 39.3387 14.6916 39.7118C15.2936 40.3607 15.3098 40.4093 15.3098 41.6259C15.3098 42.3235 15.2448 42.9561 15.1471 43.0534C15.0658 43.1507 14.8868 43.3941 14.7729 43.6212C14.659 43.8483 14.1547 44.2214 13.6015 44.5134C12.7718 44.9189 12.4301 44.9838 11.3237 45C10.2337 45 9.87574 44.9189 8.15114 44.1078L8.05353 43.0859C8.00472 42.5343 7.93964 41.8855 7.89083 41.6259C7.84202 41.3177 7.89083 41.1879 8.06979 41.1879C8.19995 41.1879 8.36265 41.3177 8.41146 41.4637C8.46027 41.6259 8.6067 41.9828 8.72058 42.2423C8.83447 42.5019 9.27376 43.0534 9.6805 43.459C10.2499 44.0105 10.6241 44.2214 11.1285 44.2863C11.5027 44.3511 12.1047 44.3349 12.4626 44.2538C12.8206 44.1727 13.2761 43.9456 13.4876 43.7509C13.7642 43.459 13.8456 43.1994 13.8456 42.5992C13.8456 42.1775 13.7317 41.5935 13.5852 41.3015C13.4388 41.0257 13.0971 40.5878 12.8043 40.3444C12.5277 40.0849 12.2186 39.8902 12.1372 39.8902C12.0396 39.9064 11.8606 39.7929 11.7305 39.6469C11.6003 39.5009 11.1122 39.1927 10.673 38.9656C10.2174 38.7385 9.61542 38.3492 9.32257 38.1221C9.02971 37.895 8.63924 37.3921 8.46027 37.0028C8.2813 36.6135 8.15114 35.9971 8.16741 35.5429C8.16741 35.1211 8.29757 34.5696 8.46027 34.2938C8.62297 34.018 8.91582 33.7098 9.1436 33.5963C9.35511 33.4827 9.74558 33.2556 10.0222 33.0772C10.3964 32.8501 10.8357 32.769 11.8444 32.769V32.769ZM35.6796 32.769C36.4768 32.7528 37.1438 32.8177 37.1926 32.915C37.2415 33.0123 37.4042 33.0772 37.5506 33.0772C37.7133 33.061 37.9573 33.1907 38.12 33.353C38.2664 33.5152 38.4129 34.0018 38.4617 34.456C38.5105 34.894 38.5756 35.4455 38.6081 35.6726C38.6407 35.9322 38.5756 36.0782 38.4291 36.0782C38.3153 36.0782 38.0875 35.77 37.9411 35.3969C37.7946 35.0238 37.3879 34.4236 37.0299 34.0505C36.4117 33.4341 36.3303 33.4016 35.4355 33.4016C34.5732 33.4016 34.4105 33.4665 33.9224 33.9207C33.4506 34.3749 33.3693 34.5696 33.3693 35.186C33.353 35.8511 33.4343 35.9971 34.2153 36.7757C34.7196 37.2786 35.5169 37.8463 36.1351 38.1545C36.7208 38.4303 37.3228 38.7709 37.5018 38.9169C37.6645 39.0467 37.9573 39.2251 38.1363 39.3225C38.3315 39.4198 38.5756 39.6631 38.6895 39.8902C38.8033 40.1173 38.9823 40.3607 39.0637 40.458C39.1613 40.5553 39.2264 41.1068 39.2264 41.707C39.2264 42.7939 39.2101 42.8263 38.4454 43.6374C38.0224 44.0916 37.4204 44.5782 37.1113 44.7242C36.7534 44.8865 36.0375 44.9838 35.1264 44.9838C34.1827 45 33.6458 44.9351 33.4994 44.7891C33.3855 44.6756 33.1415 44.5945 32.9625 44.5945C32.7835 44.5945 32.4744 44.4322 32.2954 44.2376C32.0677 43.9943 31.905 43.5563 31.8399 42.9723C31.7911 42.4857 31.726 41.9017 31.7097 41.6746C31.6772 41.3988 31.7423 41.2691 31.9375 41.2366C32.1165 41.2042 32.2304 41.2853 32.2304 41.4313C32.2304 41.561 32.3768 41.9504 32.5558 42.2748C32.751 42.6154 33.2391 43.1994 33.6621 43.5725C34.199 44.0592 34.6058 44.27 35.0776 44.3349C35.4355 44.3836 35.9887 44.3674 36.2978 44.3025C36.6069 44.2376 37.0788 43.9618 37.3228 43.7023C37.6645 43.3292 37.7784 43.0534 37.7784 42.5668C37.7621 42.2099 37.6645 41.6908 37.5343 41.4313C37.4041 41.1717 37.095 40.75 36.8347 40.5066C36.5907 40.2795 36.0538 39.9064 35.6633 39.6956C35.2728 39.5009 34.9311 39.2738 34.8986 39.1927C34.8661 39.1278 34.4431 38.9007 33.9712 38.6898C33.5157 38.479 32.9788 38.1221 32.7998 37.9112C32.6208 37.7165 32.3768 37.3597 32.2466 37.1326C32.1165 36.9055 31.9863 36.3053 31.9538 35.7862C31.9212 35.1049 31.9701 34.8129 32.149 34.6507C32.2955 34.5534 32.4093 34.3911 32.3931 34.2938C32.3931 34.1965 32.5558 33.9694 32.751 33.7747C32.9625 33.5801 33.3855 33.2719 33.6946 33.0934C34.1339 32.8501 34.5895 32.769 35.6796 32.769V32.769ZM19.361 33.0772C21.5086 33.0772 22.1269 33.1259 22.0943 33.2719C22.0618 33.3854 21.7038 33.5314 21.3134 33.6125C20.9229 33.6774 20.4999 33.8072 20.386 33.8883C20.2884 33.9856 20.2233 34.1154 20.2721 34.2127C20.3209 34.31 20.2721 34.4074 20.1908 34.456C20.0931 34.5047 20.0281 35.5429 20.0281 37.0839C20.0281 38.4952 20.1094 40.1173 20.207 40.7013C20.3046 41.2853 20.4511 41.8206 20.5324 41.9179C20.6138 42.0152 20.6788 42.1937 20.6788 42.3235C20.6788 42.4532 20.8415 42.729 21.0368 42.9236C21.2483 43.1183 21.7038 43.4265 22.0618 43.6212C22.4197 43.7996 22.8753 43.9456 23.0705 43.9456C23.282 43.9456 23.6399 44.0429 23.8677 44.1403C24.1931 44.3025 24.3395 44.3025 24.5999 44.1403C24.7626 44.0429 25.153 43.9456 25.4296 43.9456C25.8526 43.9456 26.1129 43.7996 26.6173 43.2643C26.9752 42.875 27.382 42.3883 27.5121 42.1612C27.6911 41.853 27.7562 40.9933 27.805 38.5114C27.8375 36.727 27.8213 34.9589 27.7725 34.5696C27.6911 34.0505 27.5935 33.8558 27.3006 33.7747C27.1054 33.7261 26.7312 33.6287 26.4709 33.5801C26.2106 33.5314 25.9665 33.3854 25.934 33.2719C25.9014 33.1259 26.4058 33.0772 28.0816 33.0772C29.7574 33.0772 30.2617 33.1259 30.2292 33.2719C30.1967 33.3854 29.9201 33.5152 29.6109 33.5638C29.2042 33.6287 28.9927 33.7747 28.8137 34.1316C28.6348 34.5047 28.5534 35.478 28.4883 38.3492C28.4233 41.2528 28.3582 42.1775 28.1629 42.4857C28.0328 42.7128 27.5935 43.2481 27.1867 43.6698C26.78 44.1078 26.1943 44.562 25.8852 44.708C25.5272 44.854 24.73 44.9513 23.7376 44.9676C22.6475 44.9838 22.0943 44.9351 21.9479 44.7891C21.834 44.6756 21.5737 44.5945 21.3622 44.5945C21.1507 44.5945 20.6463 44.2538 20.1094 43.7347C19.605 43.2805 19.1983 42.7939 19.2146 42.6803C19.2146 42.583 19.1495 42.3559 19.0681 42.1937C18.9868 42.0477 18.8404 41.6584 18.7427 41.3502C18.6451 41.0095 18.5638 39.4685 18.5801 37.457C18.5801 34.5696 18.5475 34.0991 18.3035 33.9207C18.157 33.8072 17.7503 33.6612 17.3761 33.5963C17.0182 33.5314 16.6928 33.3854 16.644 33.2719C16.5951 33.1259 17.1971 33.0772 19.361 33.0772V33.0772ZM43.489 33.1096C45.116 33.1421 46.141 33.2232 46.141 33.3205C46.141 33.4178 45.8807 33.499 45.5716 33.5314C45.2462 33.5476 44.8557 33.7261 44.6442 33.9369C44.2863 34.2776 44.27 34.4074 44.3513 38.4465H47.6378C49.46 38.4303 51.0057 38.4303 51.1033 38.4303C51.2009 38.4303 51.266 37.6517 51.266 36.435C51.266 34.4885 51.266 34.456 50.8267 34.018C50.5664 33.7909 50.1596 33.5638 49.8993 33.5314C49.639 33.499 49.395 33.3854 49.3624 33.2719C49.3299 33.1259 49.8993 33.0934 51.9493 33.1096C53.5763 33.1421 54.6013 33.2232 54.6013 33.3205C54.6013 33.4178 54.4223 33.499 54.1945 33.5314C53.9668 33.5638 53.5437 33.6449 52.7303 33.8883V38.7872C52.7303 43.2156 52.7628 43.7347 53.0231 43.9943C53.1858 44.1727 53.5275 44.2863 53.9017 44.27C54.2433 44.27 54.5199 44.3349 54.5199 44.4322C54.5199 44.5296 53.5926 44.5945 52.0795 44.5945C50.7291 44.5945 49.5902 44.6107 49.5251 44.6269C49.4763 44.6593 49.395 44.5782 49.3624 44.4647C49.3299 44.3349 49.4926 44.27 49.818 44.27C50.1596 44.27 50.4688 44.124 50.7942 43.7834C51.266 43.2967 51.266 43.2805 51.266 41.3826C51.266 40.3444 51.2009 39.4198 51.1195 39.3225C51.0219 39.2251 49.6878 39.1765 44.27 39.2414V43.7834L44.7581 44.0267C45.0184 44.1565 45.4251 44.27 45.6529 44.27C45.8807 44.27 46.0597 44.3349 46.0597 44.4322C46.0597 44.5296 45.0835 44.5945 43.4565 44.5945C41.8295 44.5945 40.8533 44.5296 40.8533 44.4322C40.8533 44.3349 41.0323 44.27 41.2601 44.27C41.4879 44.27 41.8621 44.1727 42.1061 44.0754C42.3664 43.9618 42.6105 43.7996 42.6755 43.7023C42.7406 43.6212 42.8057 41.4962 42.822 34.456L42.3664 34.0018C42.1224 33.7585 41.6994 33.5476 41.439 33.5152C41.1787 33.499 40.9347 33.3854 40.8859 33.2719C40.8371 33.1096 41.3902 33.0772 43.489 33.1096V33.1096ZM58.9616 33.1096C60.6048 33.1421 61.581 33.2232 61.5647 33.3205C61.5485 33.4178 61.2881 33.499 60.9953 33.5314C60.7024 33.5638 60.2957 33.7423 60.0842 33.9369C59.7262 34.2938 59.71 34.31 59.7262 43.459L60.1655 43.8645C60.4258 44.0916 60.8163 44.27 61.0604 44.27C61.3532 44.27 61.4996 44.3511 61.4671 44.4647C61.4346 44.5782 61.3532 44.6593 61.3044 44.6269C61.2393 44.6107 60.0842 44.5945 58.7501 44.5945C57.237 44.5945 56.3096 44.5296 56.3096 44.4322C56.3096 44.3349 56.4886 44.27 56.7163 44.27C56.9441 44.27 57.3183 44.1727 57.5624 44.0754C57.8227 43.9618 58.0667 43.7996 58.1318 43.7023C58.1969 43.6212 58.262 41.4962 58.262 34.456L57.8064 34.0018C57.4973 33.6936 57.2044 33.5638 56.8302 33.5638C56.4723 33.5638 56.3096 33.4827 56.3096 33.3205C56.3096 33.1096 56.6838 33.0772 58.9616 33.1096Z"/>
							</mask>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M33.5645 0.0015454C33.6296 -0.0146761 33.7272 0.0988744 33.7923 0.244868C33.8899 0.423305 33.597 0.812621 32.7835 1.65614C32.149 2.305 31.4006 3.16474 31.1078 3.5865C30.8149 4.02448 30.5871 4.39757 30.5871 4.44624C30.5871 4.4949 30.8637 4.68956 31.1891 4.868C31.5308 5.06266 32.4093 5.80884 33.1577 6.53881C33.9062 7.26878 34.7847 8.25829 35.0938 8.74494C35.4192 9.23158 35.8097 9.81556 35.9724 10.0427C36.1351 10.2698 36.4768 10.8862 36.7371 11.4215C36.9811 11.9568 37.2903 12.7192 37.4041 13.1247C37.518 13.5303 37.7133 14.1467 37.8434 14.5036C37.9736 14.8604 38.0712 15.7202 38.0712 16.4177C38.0712 17.1639 38.1526 17.7154 38.2502 17.7803C38.3641 17.8614 38.3966 18.121 38.3315 18.4778C38.2827 18.786 38.1688 19.7756 38.0712 20.6677C37.9899 21.5599 37.8434 22.3548 37.7458 22.4521C37.6645 22.5494 37.5831 22.7441 37.5831 22.8901C37.5831 23.0523 37.3879 23.5714 37.1601 24.0256C36.9323 24.496 36.6232 25.0962 36.493 25.372C36.3466 25.6477 35.6633 26.4102 34.98 27.0752C34.2966 27.7403 33.2879 28.5676 32.7347 28.892C32.1816 29.2327 31.6121 29.5085 31.482 29.5085C31.3518 29.5085 31.2054 29.5571 31.1728 29.622C31.1403 29.7031 30.7498 29.8816 30.278 30.0276C29.8224 30.1898 29.2855 30.3195 29.074 30.3195C28.8625 30.3195 28.6022 30.4169 28.4883 30.5142C28.3582 30.6602 27.626 30.7413 26.3895 30.7737C25.332 30.8062 24.0467 30.7575 23.5098 30.644C22.9729 30.5304 22.0943 30.4169 21.5574 30.3682C21.0205 30.3358 20.5162 30.2222 20.4185 30.1411C20.3209 30.06 20.0606 29.9951 19.8003 29.9951C19.5562 29.9951 19.2308 29.9302 19.0681 29.8491C18.9217 29.768 18.6126 29.6707 18.3848 29.6382C18.157 29.6058 17.8154 29.4922 17.6039 29.3787C17.4086 29.2651 17.0995 29.184 16.9205 29.184C16.7416 29.184 16.5626 29.1191 16.5138 29.0218C16.465 28.9245 16.2372 28.8596 15.9769 28.8596C15.7328 28.8758 15.4237 28.7623 15.2936 28.6163C15.1634 28.4703 14.9031 28.3567 14.7241 28.373C14.5452 28.373 14.3011 28.2919 14.2035 28.1783C14.0408 27.9999 13.9269 28.0323 13.634 28.3243C13.4225 28.5027 12.967 28.8272 12.6091 29.0218C12.2511 29.2003 11.8444 29.4274 11.7142 29.4922C11.5841 29.5733 11.161 29.7842 10.7706 29.9789C10.3964 30.1573 9.92455 30.3195 9.71304 30.3195C9.50153 30.3195 9.24122 30.4169 9.1436 30.5142C8.99717 30.6602 8.21622 30.7251 6.42655 30.7251C4.62061 30.7251 3.85593 30.6602 3.7095 30.5142C3.59561 30.4006 3.27022 30.3195 3.0099 30.3195C2.73332 30.3195 2.32657 30.1898 2.06626 29.9951C1.82221 29.8167 1.57817 29.6707 1.49682 29.6707C1.43174 29.6707 1.18769 29.476 0.959915 29.2327C0.715869 28.9732 0.406744 28.5352 0.260316 28.2432C0.113888 27.9512 0 27.3348 0 26.8319C0 26.3453 0.065079 25.9073 0.162697 25.8586C0.244046 25.81 0.325395 25.6315 0.325395 25.4531C0.325395 25.2584 0.699599 24.788 1.22023 24.3176C1.78967 23.7985 2.26149 23.5065 2.52181 23.5065C2.74959 23.5065 2.96109 23.4416 3.0099 23.3443C3.05871 23.247 3.79085 23.1821 4.71823 23.1821C5.6456 23.1821 6.37774 23.247 6.42655 23.3443C6.47536 23.4416 6.78449 23.5065 7.10988 23.5065C7.45154 23.5065 7.87456 23.6201 8.05353 23.7498C8.23249 23.8958 8.49281 23.9932 8.62297 23.9932C8.75312 23.9932 9.92455 24.5122 13.5527 26.3453L14.659 25.2098C15.2773 24.5933 15.7817 24.0256 15.7817 23.9445C15.7817 23.8796 15.9606 23.6201 16.1884 23.3443C16.4162 23.0685 16.5951 22.7603 16.5951 22.6468C16.5951 22.5494 16.7741 22.2737 17.0019 22.0466C17.2297 21.8195 17.4086 21.5761 17.4086 21.4788C17.3924 21.3815 17.5225 21.2031 17.6689 21.0733C17.8154 20.9435 18.2872 20.0838 18.7265 19.1591C19.1658 18.2507 19.5725 17.4721 19.6376 17.4397C19.7189 17.4072 20.3697 16.1906 21.1181 14.7307C21.8665 13.2707 22.6149 11.9244 22.7776 11.7459C22.9566 11.5675 23.103 11.3242 23.103 11.2106C23.103 11.1133 23.282 10.724 23.5098 10.3671C23.7376 10.0102 23.9165 9.68578 23.9165 9.63712C23.9165 9.58846 24.0955 9.32891 24.3233 9.06937C24.551 8.7936 24.73 8.48539 24.73 8.37184C24.7137 8.27451 24.8764 8.03119 25.0554 7.85275C25.2344 7.67432 25.3808 7.44722 25.3808 7.36611C25.3808 7.26878 25.6411 6.94435 25.9502 6.63614C26.2594 6.32793 26.5197 5.98728 26.5197 5.90617C26.5197 5.80884 26.7312 5.5493 26.9752 5.30598C27.382 4.88422 27.3983 4.83555 27.1542 4.57601C26.9915 4.41379 26.5685 4.17047 26.1943 4.0407C25.8201 3.91093 25.4296 3.70005 25.3157 3.5865C25.2181 3.47295 24.9741 3.37562 24.7626 3.39184C24.5673 3.39184 24.2745 3.32695 24.1118 3.24585C23.9653 3.16474 23.5749 3.01875 23.2657 2.92142C22.9566 2.82409 22.3384 2.69432 21.8991 2.62943C21.4761 2.54832 21.0856 2.45099 21.0531 2.36989C21.0205 2.305 20.0931 2.25633 18.9868 2.25633C17.8967 2.25633 16.7741 2.32122 16.5138 2.41855C16.2372 2.49966 15.4725 2.67809 14.8055 2.82409C14.1384 2.95386 13.2924 3.14852 12.9344 3.24585C12.5765 3.34318 12.2023 3.45673 12.121 3.48917C12.0233 3.52161 11.8444 3.61894 11.7142 3.70005C11.5841 3.78116 11.096 4.00826 10.6567 4.21914C10.2011 4.43002 9.55034 4.83555 9.19241 5.12754C8.83447 5.41953 8.46027 5.66285 8.37892 5.66285C8.2813 5.66285 7.72813 6.16572 7.10988 6.76591C6.5079 7.36611 6.01981 7.95008 6.01981 8.04741C6.01981 8.16096 5.85711 8.45295 5.6456 8.69627C5.45037 8.95582 5.20632 9.32891 5.1087 9.55601C5.01108 9.78311 4.83212 10.2535 4.71823 10.6104C4.60434 10.9673 4.50672 11.6161 4.50672 12.0703C4.50672 12.5894 4.63688 13.141 4.88092 13.6114C5.07616 14.0169 5.36902 14.4711 5.51544 14.6333C5.66187 14.7956 5.98727 15.0389 6.26385 15.1687C6.52417 15.2984 6.86583 15.4282 6.99599 15.4444C7.12615 15.4769 7.40274 15.5742 7.59797 15.6877C7.80948 15.8013 8.31384 15.8824 8.73685 15.8824C9.17614 15.8824 9.8432 15.7526 10.2499 15.6066C10.673 15.4606 11.3726 14.974 11.9257 14.4387C12.4464 13.9358 12.9995 13.2545 13.1785 12.9139C13.3575 12.5894 13.5039 12.1839 13.5039 12.0217C13.4876 11.8757 13.634 11.6161 13.8293 11.4539C14.0083 11.3079 14.2198 11.2106 14.3174 11.2593C14.3987 11.3079 14.4801 11.6973 14.4801 12.1515C14.4801 12.5894 14.3987 12.995 14.3174 13.0436C14.2198 13.0923 14.1547 13.3032 14.1547 13.5303C14.1547 13.806 13.8456 14.2602 13.211 14.9253C12.7067 15.4606 11.9908 16.0446 11.6329 16.2068C11.2749 16.3853 10.8519 16.5313 10.6892 16.5313C10.5428 16.5313 10.3801 16.5961 10.3313 16.6935C10.2825 16.7908 9.58288 16.8557 8.73685 16.8557C7.92337 16.8557 6.97972 16.7746 6.6706 16.6773C6.36147 16.5799 5.98727 16.4339 5.85711 16.3528C5.72695 16.2717 5.46664 16.1419 5.28767 16.0608C5.1087 15.9797 4.65315 15.6066 4.26267 15.2498C3.88847 14.8767 3.43292 14.2602 3.25395 13.8547C3.07498 13.4492 2.84721 13.0923 2.76586 13.0436C2.66824 12.995 2.60316 12.2001 2.60316 11.1782C2.60316 9.71823 2.66824 9.28025 2.91228 8.77738C3.09125 8.45295 3.31903 7.99875 3.41665 7.77165C3.51427 7.54455 3.69323 7.18767 3.82339 6.96057C3.95355 6.73347 4.49045 6.13327 4.99481 5.61419C5.51544 5.11132 6.00354 4.68956 6.10116 4.68956C6.1825 4.70578 6.37774 4.57601 6.5079 4.43002C6.63806 4.28402 7.01226 4.02448 7.32139 3.86226C7.63051 3.68383 8.00472 3.48917 8.13487 3.40806C8.26503 3.34318 8.67178 3.14852 9.02971 2.9863C9.38764 2.84031 9.81066 2.64565 9.95709 2.56454C10.1198 2.48344 10.3638 2.41855 10.494 2.41855C10.6241 2.41855 10.917 2.305 11.1448 2.17523C11.3726 2.04546 11.5515 1.96435 11.5515 2.01301C11.5515 2.06168 11.8606 1.98057 12.2348 1.8508C12.6253 1.7048 13.1948 1.60747 13.5039 1.60747C13.8293 1.60747 14.1547 1.54259 14.236 1.46148C14.3336 1.38037 14.9519 1.26682 15.619 1.20194C16.286 1.13705 17.7178 1.07216 18.7916 1.07216C19.8654 1.08839 21.2971 1.13705 21.9642 1.20194C22.6312 1.26682 23.2495 1.38037 23.3471 1.46148C23.4284 1.54259 23.7701 1.60747 24.0792 1.60747C24.3884 1.6237 24.7951 1.72102 24.9741 1.8508C25.153 1.99679 25.4296 2.09412 25.576 2.09412C25.7387 2.09412 26.0153 2.15901 26.1943 2.25633C26.3733 2.33744 26.6661 2.48344 26.8451 2.58076C27.0241 2.66187 27.3006 2.74298 27.4471 2.74298C27.6098 2.74298 27.8863 2.85653 28.0653 2.9863C28.2443 3.1323 28.5534 3.22962 28.7486 3.22962C28.9927 3.22962 29.1554 3.11607 29.2042 2.90519C29.253 2.72676 29.6923 2.28878 30.1804 1.9319C30.6685 1.57503 31.124 1.28304 31.1891 1.28304C31.2705 1.29927 31.4657 1.13705 31.6447 0.942393C31.8236 0.763956 32.1816 0.504412 32.4581 0.390862C32.7185 0.277311 33.0601 0.131317 33.1903 0.0988744C33.3204 0.0502099 33.4831 0.0015454 33.5482 0.0015454H33.5645ZM28.7812 7.25256C28.7975 7.36611 28.651 7.64187 28.4395 7.8852C28.228 8.14474 27.9352 8.59894 27.7887 8.90715C27.626 9.21536 27.2193 9.88044 26.8614 10.3671C26.5197 10.8537 26.0479 11.6486 25.8201 12.1028C25.576 12.5732 25.3157 12.995 25.2344 13.0436C25.1368 13.0923 24.9253 13.433 24.7626 13.806C24.5999 14.1954 24.3558 14.5847 24.2419 14.682C24.1118 14.7793 23.8514 15.2173 23.6562 15.6553C23.461 16.0933 23.1519 16.5961 22.9729 16.7746C22.7776 16.953 22.615 17.1477 22.6312 17.2126C22.6312 17.2937 22.1757 18.0074 21.6062 18.8185C21.0531 19.6296 20.4836 20.5218 20.3372 20.7975C20.1908 21.0895 19.9467 21.4302 19.8003 21.5599C19.6539 21.6897 19.5237 21.8681 19.54 21.9655C19.54 22.0628 19.361 22.3061 19.1332 22.5332C18.9054 22.7603 18.7265 23.0036 18.7265 23.101C18.7265 23.1983 18.4662 23.5227 18.157 23.8309C17.8479 24.1391 17.5876 24.496 17.5876 24.5933C17.5876 24.7069 17.067 25.3071 16.4487 25.9397C15.8142 26.5562 15.3098 27.1239 15.3098 27.1888C15.3261 27.2699 15.44 27.3997 15.6027 27.5132C15.7491 27.6268 16.0094 27.7241 16.1559 27.7241C16.3186 27.7241 16.644 27.8214 16.888 27.9512C17.1483 28.0647 17.6039 28.2432 17.913 28.3567C18.2221 28.4541 18.6777 28.5352 18.9217 28.5352C19.182 28.5352 19.4098 28.6001 19.4586 28.6974C19.5074 28.7947 19.9793 28.892 20.5162 28.9407C21.0531 28.9894 21.5249 29.0867 21.5737 29.184C21.6225 29.2814 22.8427 29.3462 24.6975 29.3462C27.1542 29.3462 27.8213 29.2976 28.0816 29.1029C28.2606 28.9732 28.5371 28.8596 28.6836 28.8596C28.8463 28.8596 29.1066 28.7947 29.253 28.7136C29.4157 28.6325 29.7736 28.4703 30.0502 28.3405C30.3268 28.227 30.8312 27.9025 31.1566 27.643C31.4982 27.3672 32.1165 26.8644 32.5232 26.5075C32.9137 26.1506 33.4506 25.5666 33.6784 25.226C33.9062 24.8853 34.3129 24.2203 34.5569 23.766C34.801 23.3118 35.0938 22.6792 35.1915 22.371C35.2891 22.0628 35.4355 21.3328 35.5169 20.7489C35.5982 20.1649 35.6796 19.2565 35.6796 18.7212C35.6796 18.1859 35.5982 17.1639 35.5169 16.4502C35.4192 15.7364 35.2891 14.9091 35.2077 14.6009C35.1427 14.3089 35.0288 14.0331 34.9474 14.0007C34.8823 13.9683 34.8335 13.806 34.8335 13.6438C34.8335 13.4978 34.4593 12.6057 33.9875 11.6648C33.5157 10.724 32.8649 9.60468 32.5558 9.1667C32.2466 8.72872 31.5145 7.86898 30.9288 7.25256C30.3431 6.63614 29.8224 6.1495 29.7736 6.1495C29.7248 6.1495 29.4808 6.36038 29.2205 6.6037C28.9602 6.84702 28.7649 7.13901 28.7812 7.25256V7.25256ZM2.97736 25.8748C2.78213 26.2155 2.61943 26.767 2.61943 27.0752C2.60316 27.4321 2.73332 27.7565 2.94482 27.9674C3.12379 28.1459 3.28649 28.3892 3.27022 28.4865C3.27022 28.6001 3.44919 28.7623 3.67696 28.8596C3.90474 28.9569 4.11625 29.0867 4.16506 29.184C4.21386 29.2814 5.12497 29.3462 6.39401 29.3462C8.05353 29.33 8.63924 29.2814 8.88328 29.1029C9.06225 28.9569 9.32257 28.8596 9.45272 28.8596C9.58288 28.8596 10.1361 28.6487 10.673 28.3892C11.2099 28.1296 11.7468 27.8052 11.8444 27.6592C11.9583 27.5132 12.0233 27.3348 11.9745 27.2375C11.9257 27.1401 11.0634 26.6697 10.0547 26.1831C9.06225 25.6964 8.13487 25.2909 8.02099 25.2909C7.92337 25.2909 7.69559 25.226 7.53289 25.1449C7.38647 25.0638 6.99599 24.9178 6.68687 24.8204C6.37774 24.7231 5.71068 24.6582 5.22259 24.6582C4.70196 24.6745 4.11625 24.788 3.82339 24.9502C3.54681 25.1124 3.1726 25.518 2.97736 25.8748V25.8748ZM62.3131 12.3137C62.3619 12.3137 62.6385 12.4597 62.8988 12.6381C63.1592 12.8165 63.4683 13.1247 63.5822 13.3356C63.6961 13.5303 63.7774 14.0007 63.7937 14.3738C63.7937 14.7631 63.7286 15.1038 63.631 15.1524C63.5334 15.2011 63.4683 15.3958 63.4683 15.5904C63.4683 15.8013 63.1754 16.2555 62.7687 16.661C62.3457 17.099 62.1667 17.3586 62.3294 17.3586C62.4596 17.3748 63.5496 17.3748 66.8849 17.3423V17.829C66.8849 18.0885 66.7385 18.5752 66.5595 18.8834C66.3806 19.1916 66.2341 19.5485 66.2341 19.6458C66.2341 19.7593 65.9738 20.4082 65.6647 21.0733C65.3393 21.7384 65.0139 22.4034 64.9326 22.5332C64.8512 22.663 64.656 23.0361 64.5096 23.3443C64.3631 23.6525 64.1679 24.0905 64.054 24.3176C63.9401 24.5447 63.7611 25.0476 63.6473 25.4531C63.5334 25.8586 63.3707 26.3128 63.2893 26.4588C63.208 26.621 63.1429 26.9455 63.1429 27.1888C63.1429 27.4483 63.273 27.7728 63.4357 27.935C63.5822 28.0972 63.8262 28.2107 63.9564 28.2107C64.0865 28.2107 64.5909 27.8052 65.0465 27.3186C65.5183 26.8319 65.9087 26.329 65.9087 26.2155C65.8925 26.1182 66.0552 25.8748 66.2341 25.6964C66.4294 25.518 66.8361 24.8367 67.1453 24.1878C67.4544 23.5552 67.7635 22.9874 67.8611 22.9388C67.9587 22.8901 68.1377 22.5981 68.2679 22.2899C68.398 21.9817 68.6258 21.7221 68.756 21.7221C68.9024 21.7221 69 21.8681 69 22.079C69 22.2899 68.6746 23.1172 68.2841 23.912C67.8937 24.7069 67.4544 25.4855 67.3079 25.6153C67.1615 25.7451 67.0314 25.9235 67.0314 26.0208C67.0314 26.1182 66.8524 26.4264 66.6409 26.7021C66.4131 26.9941 66.2341 27.2861 66.2341 27.351C66.2341 27.4321 65.925 27.7728 65.5508 28.1459C65.1603 28.5027 64.6234 28.892 64.3631 29.0056C64.1028 29.1354 63.7123 29.3138 63.5008 29.4111C63.208 29.5409 63.0453 29.5409 62.8012 29.3787C62.6385 29.2814 62.3457 29.184 62.1667 29.184C61.9877 29.184 61.6135 28.9407 61.3532 28.6487C60.8814 28.1459 60.8489 28.0648 60.8651 26.7508C60.8651 25.7937 60.9465 25.2747 61.1092 25.0476C61.2556 24.8691 61.3532 24.5933 61.3532 24.4311C61.3532 24.2851 61.5322 23.8309 61.76 23.4254C61.9877 23.0199 62.1179 22.6954 62.0365 22.6954C61.9715 22.6954 62.1179 22.5008 62.3457 22.2575C62.5735 21.9979 62.9477 21.4139 63.1917 20.9435C63.4357 20.4893 63.631 19.9216 63.631 19.6945C63.631 19.4511 63.4846 19.1916 63.2568 19.0456C63.0615 18.9158 62.7361 18.8023 62.5246 18.8023C62.3294 18.8023 62.1342 18.7212 62.0854 18.6401C62.0365 18.5427 61.76 18.4778 61.4671 18.4778C61.0278 18.4778 60.8977 18.5752 60.6699 19.0943C60.5072 19.4187 60.377 19.7918 60.377 19.8891C60.377 20.0027 60.312 20.2298 60.2306 20.3758C60.1493 20.538 60.0191 20.8462 59.9215 21.0733C59.8239 21.3004 59.5473 21.9492 59.3032 22.5332C59.0592 23.1172 58.7663 23.7012 58.6687 23.8309C58.5711 23.9607 58.3759 24.3338 58.262 24.642C58.1481 24.9502 57.8715 25.3882 57.6763 25.6153C57.4647 25.8424 57.2858 26.0695 57.2858 26.1344C57.2858 26.2155 57.058 26.6048 56.7651 27.0266C56.4886 27.4646 55.9354 28.1134 55.5449 28.4865C55.1056 28.9407 54.6989 29.184 54.4386 29.184C54.2108 29.184 53.9993 29.2489 53.9505 29.3462C53.9017 29.4436 53.5925 29.5085 53.2509 29.5085C52.9255 29.5085 52.2747 29.33 51.8354 29.1191C51.3148 28.8758 50.9406 28.5676 50.8104 28.2756C50.6965 28.0161 50.5989 27.3672 50.5989 26.8319C50.5989 26.2966 50.6803 25.7937 50.7779 25.6964C50.8755 25.5991 50.9406 25.4044 50.9406 25.2422C50.9406 25.0962 51.1195 24.5771 51.3473 24.1067C51.5751 23.6525 51.9493 22.9712 52.1608 22.6143C52.3723 22.2575 52.6326 21.8195 52.7303 21.641C52.8116 21.4626 53.0394 21.0733 53.2183 20.7813C53.3973 20.5055 53.5112 20.1811 53.4624 20.1C53.4136 20.0027 53.2021 19.9378 52.9743 19.9378C52.7465 19.9378 52.4049 20.0351 52.1933 20.1324C51.9981 20.246 51.1521 20.9922 50.3223 21.8032C49.5088 22.5981 48.8255 23.3605 48.8255 23.4578C48.8255 23.5714 48.5652 23.9445 48.2561 24.2689C47.9469 24.6096 47.6866 24.9502 47.6866 25.0476C47.7029 25.1287 47.5077 25.3882 47.2799 25.6153C47.0521 25.8424 46.8731 26.0857 46.8731 26.1831C46.8731 26.2642 46.7267 26.4913 46.5477 26.6697C46.3688 26.8481 46.2224 27.1077 46.2224 27.2375C46.2386 27.3672 46.1247 27.5943 45.9783 27.7241C45.8319 27.8539 45.718 28.0972 45.7343 28.2432C45.7343 28.4054 45.6692 28.6812 45.5716 28.8596C45.4631 29.0759 45.2462 29.184 44.9208 29.184C44.5954 29.184 44.3513 29.0597 44.1886 28.8109C44.0585 28.6163 43.9446 28.0972 43.9446 27.643C43.9446 27.1888 44.091 26.3939 44.27 25.8586C44.4652 25.3233 44.7743 24.5122 44.9859 24.0743C45.1974 23.6201 45.4251 23.1496 45.4739 23.0199C45.5228 22.8901 45.718 22.5494 45.8807 22.2899C46.0597 22.0141 46.2061 21.6573 46.2061 21.4788C46.2224 21.3004 46.3362 20.9922 46.4664 20.7813C46.5966 20.5866 46.6779 20.3109 46.6291 20.1811C46.5803 20.0513 46.3851 19.9378 46.2061 19.9378C46.0108 19.9378 45.6366 20.1973 45.3438 20.5055C45.0672 20.83 44.8069 21.0733 44.7581 21.0733C44.7093 21.0733 44.4001 21.3166 44.0585 21.5924C43.7331 21.8844 43.4565 22.1926 43.4565 22.2899C43.4565 22.371 43.0172 22.8901 42.4803 23.4254C41.9434 23.9607 41.5041 24.496 41.5041 24.5933C41.5041 24.7069 41.3414 24.9989 41.1299 25.2422C40.9347 25.5018 40.6581 25.9073 40.5279 26.1831C40.3978 26.4426 40.1375 26.8806 39.9585 27.1563C39.7633 27.4159 39.5192 27.8539 39.3891 28.1296C39.2589 28.3892 39.0474 28.7461 38.901 28.9083C38.7383 29.1029 38.4291 29.2003 37.9573 29.184C37.5831 29.184 37.095 29.2976 36.8672 29.4274C36.5581 29.622 36.4442 29.622 36.3629 29.4598C36.3141 29.3625 36.4605 28.8596 36.7046 28.373C36.9323 27.8863 37.1926 27.3672 37.274 27.2375C37.3553 27.1077 38.4291 24.9664 39.6656 22.4683C40.9021 19.9864 42.041 17.829 42.2037 17.683C42.3664 17.537 42.4966 17.3423 42.4803 17.2612C42.4803 17.1639 42.6755 17.0017 42.9359 16.8881C43.1799 16.7746 43.6843 16.6935 44.0585 16.6935C44.4489 16.6935 44.937 16.7908 45.1648 16.8881C45.3926 17.0017 45.5716 17.1477 45.5716 17.2126C45.5716 17.2937 45.4577 17.3423 45.3275 17.3423C45.1811 17.3423 45.0184 17.5045 44.937 17.6992C44.8557 17.9101 44.6279 18.2183 44.4327 18.3967C44.2374 18.5752 43.8632 19.1429 43.6029 19.6458C43.3426 20.1649 43.066 20.6191 42.9684 20.6677C42.8708 20.7164 42.6755 21.0084 42.5128 21.3166C42.3664 21.641 42.2851 21.9492 42.3664 22.0141C42.4315 22.079 43.0986 21.5113 43.8632 20.7489C44.6279 19.9864 45.3438 19.3376 45.4577 19.3051C45.5553 19.2727 46.0108 18.8996 46.4664 18.4616C46.9057 18.0236 47.5727 17.5208 47.9307 17.3423C48.2886 17.1639 48.8743 17.0179 49.2323 17.0179C49.6227 17.0179 49.9969 17.1315 50.1759 17.3099C50.3386 17.4559 50.4525 17.7965 50.4525 18.0723C50.4525 18.3318 50.3386 18.7049 50.2084 18.8834C50.062 19.0618 49.9644 19.3214 49.9644 19.4511C49.9644 19.5809 49.8668 19.9053 49.7366 20.1811C49.6065 20.4406 49.3461 20.8137 49.1509 20.9922C48.9719 21.1706 48.8092 21.4464 48.8255 21.5924C48.8255 21.7546 48.7604 21.8844 48.6628 21.8844C48.5652 21.8844 48.5001 21.9979 48.5001 22.1277C48.5001 22.2575 48.5652 22.371 48.6628 22.371C48.7604 22.371 48.8743 22.2412 48.9394 22.079C49.0045 21.933 49.3461 21.495 49.7041 21.1057C50.0783 20.7326 50.4362 20.4244 50.5338 20.4244C50.6315 20.4244 50.9569 20.1649 51.266 19.8567C51.5751 19.5485 51.9005 19.2889 51.9981 19.2889C52.0957 19.3051 52.2747 19.1754 52.4049 19.0294C52.535 18.8834 52.9743 18.6076 53.381 18.4292C53.7878 18.2507 54.3084 17.9263 54.5525 17.7154C54.8128 17.5045 55.187 17.3423 55.4148 17.3423C55.6425 17.3423 55.854 17.2612 55.9029 17.1801C55.9517 17.0828 56.3421 17.0179 56.7977 17.0179C57.237 17.0179 57.6112 17.0503 57.6112 17.099C57.6112 17.1477 57.5136 17.3423 57.3997 17.537C57.3021 17.7479 57.1231 18.0236 57.0092 18.1534C56.8953 18.2832 56.1469 19.7107 55.3334 21.3166C54.5199 22.9225 53.8691 24.3338 53.8691 24.4311C53.8691 24.5447 53.7715 24.8367 53.6414 25.08C53.5112 25.3395 53.3322 25.7937 53.2346 26.1019C53.137 26.4102 53.0556 26.9617 53.0556 27.3186C53.0394 27.7728 53.137 28.0485 53.381 28.2432C53.6576 28.4865 53.7715 28.5027 54.0644 28.3405C54.2759 28.227 54.7802 27.8052 55.2195 27.3997C55.6425 26.9941 55.9842 26.6048 55.9842 26.5075C55.9842 26.4102 56.1306 26.1993 56.3096 26.0208C56.4886 25.8424 56.6513 25.6315 56.6513 25.5342C56.6513 25.4369 56.814 25.1449 57.0092 24.8853C57.2207 24.6096 57.7739 23.6363 58.2294 22.6954C58.7012 21.7546 59.0755 20.8948 59.0755 20.7813C59.0755 20.684 59.2219 20.3271 59.4009 20.0189C59.5798 19.7107 59.7262 19.2727 59.7262 19.0456C59.7262 18.8185 59.7913 18.6076 59.8889 18.5589C59.9866 18.5103 60.0516 18.3156 60.0516 18.1047C60.0516 17.9101 60.1493 17.6019 60.2794 17.4234C60.3933 17.245 60.5397 16.807 60.6048 16.4502C60.6699 16.0933 60.7512 15.5093 60.8 15.1524C60.8651 14.7956 60.9627 14.4225 61.0441 14.3414C61.1254 14.244 61.1743 14.0007 61.158 13.7736C61.1417 13.5141 61.3044 13.2059 61.6786 12.849C61.9877 12.557 62.2643 12.3137 62.3131 12.3137V12.3137ZM11.8444 32.769C12.5928 32.7528 13.2273 32.8177 13.2761 32.915C13.3249 33.0123 13.4876 33.0772 13.634 33.0772C13.7967 33.061 14.0733 33.2232 14.2523 33.4178C14.4313 33.6125 14.594 33.8883 14.6265 34.0343C14.659 34.1803 14.7404 34.6507 14.8217 35.1049C14.8868 35.5429 14.8868 35.9808 14.8055 36.0782C14.7404 36.1755 14.5614 36.1917 14.415 36.1106C14.2848 36.0457 14.171 35.8024 14.171 35.5429C14.171 35.2347 13.9269 34.8453 12.5765 33.4016H11.5027C10.5753 33.4016 10.3801 33.4503 10.1361 33.7585C9.97336 33.9694 9.76185 34.31 9.66423 34.5371C9.56661 34.7642 9.50153 35.0562 9.5178 35.186C9.53407 35.3158 9.61542 35.6078 9.6805 35.8349C9.76185 36.062 10.0872 36.5162 10.4126 36.8568C10.738 37.1812 11.0634 37.457 11.161 37.457C11.2424 37.457 11.4702 37.603 11.6491 37.7814C11.8281 37.9599 12.1047 38.1221 12.2511 38.1059C12.4138 38.1059 12.5765 38.1707 12.6253 38.2681C12.6741 38.3654 13.0158 38.5763 13.39 38.7385C13.7805 38.9007 14.3662 39.3387 14.6916 39.7118C15.2936 40.3607 15.3098 40.4093 15.3098 41.6259C15.3098 42.3235 15.2448 42.9561 15.1471 43.0534C15.0658 43.1507 14.8868 43.3941 14.7729 43.6212C14.659 43.8483 14.1547 44.2214 13.6015 44.5134C12.7718 44.9189 12.4301 44.9838 11.3237 45C10.2337 45 9.87574 44.9189 8.15114 44.1078L8.05353 43.0859C8.00472 42.5343 7.93964 41.8855 7.89083 41.6259C7.84202 41.3177 7.89083 41.1879 8.06979 41.1879C8.19995 41.1879 8.36265 41.3177 8.41146 41.4637C8.46027 41.6259 8.6067 41.9828 8.72058 42.2423C8.83447 42.5019 9.27376 43.0534 9.6805 43.459C10.2499 44.0105 10.6241 44.2214 11.1285 44.2863C11.5027 44.3511 12.1047 44.3349 12.4626 44.2538C12.8206 44.1727 13.2761 43.9456 13.4876 43.7509C13.7642 43.459 13.8456 43.1994 13.8456 42.5992C13.8456 42.1775 13.7317 41.5935 13.5852 41.3015C13.4388 41.0257 13.0971 40.5878 12.8043 40.3444C12.5277 40.0849 12.2186 39.8902 12.1372 39.8902C12.0396 39.9064 11.8606 39.7929 11.7305 39.6469C11.6003 39.5009 11.1122 39.1927 10.673 38.9656C10.2174 38.7385 9.61542 38.3492 9.32257 38.1221C9.02971 37.895 8.63924 37.3921 8.46027 37.0028C8.2813 36.6135 8.15114 35.9971 8.16741 35.5429C8.16741 35.1211 8.29757 34.5696 8.46027 34.2938C8.62297 34.018 8.91582 33.7098 9.1436 33.5963C9.35511 33.4827 9.74558 33.2556 10.0222 33.0772C10.3964 32.8501 10.8357 32.769 11.8444 32.769V32.769ZM35.6796 32.769C36.4768 32.7528 37.1438 32.8177 37.1926 32.915C37.2415 33.0123 37.4042 33.0772 37.5506 33.0772C37.7133 33.061 37.9573 33.1907 38.12 33.353C38.2664 33.5152 38.4129 34.0018 38.4617 34.456C38.5105 34.894 38.5756 35.4455 38.6081 35.6726C38.6407 35.9322 38.5756 36.0782 38.4291 36.0782C38.3153 36.0782 38.0875 35.77 37.9411 35.3969C37.7946 35.0238 37.3879 34.4236 37.0299 34.0505C36.4117 33.4341 36.3303 33.4016 35.4355 33.4016C34.5732 33.4016 34.4105 33.4665 33.9224 33.9207C33.4506 34.3749 33.3693 34.5696 33.3693 35.186C33.353 35.8511 33.4343 35.9971 34.2153 36.7757C34.7196 37.2786 35.5169 37.8463 36.1351 38.1545C36.7208 38.4303 37.3228 38.7709 37.5018 38.9169C37.6645 39.0467 37.9573 39.2251 38.1363 39.3225C38.3315 39.4198 38.5756 39.6631 38.6895 39.8902C38.8033 40.1173 38.9823 40.3607 39.0637 40.458C39.1613 40.5553 39.2264 41.1068 39.2264 41.707C39.2264 42.7939 39.2101 42.8263 38.4454 43.6374C38.0224 44.0916 37.4204 44.5782 37.1113 44.7242C36.7534 44.8865 36.0375 44.9838 35.1264 44.9838C34.1827 45 33.6458 44.9351 33.4994 44.7891C33.3855 44.6756 33.1415 44.5945 32.9625 44.5945C32.7835 44.5945 32.4744 44.4322 32.2954 44.2376C32.0677 43.9943 31.905 43.5563 31.8399 42.9723C31.7911 42.4857 31.726 41.9017 31.7097 41.6746C31.6772 41.3988 31.7423 41.2691 31.9375 41.2366C32.1165 41.2042 32.2304 41.2853 32.2304 41.4313C32.2304 41.561 32.3768 41.9504 32.5558 42.2748C32.751 42.6154 33.2391 43.1994 33.6621 43.5725C34.199 44.0592 34.6058 44.27 35.0776 44.3349C35.4355 44.3836 35.9887 44.3674 36.2978 44.3025C36.6069 44.2376 37.0788 43.9618 37.3228 43.7023C37.6645 43.3292 37.7784 43.0534 37.7784 42.5668C37.7621 42.2099 37.6645 41.6908 37.5343 41.4313C37.4041 41.1717 37.095 40.75 36.8347 40.5066C36.5907 40.2795 36.0538 39.9064 35.6633 39.6956C35.2728 39.5009 34.9311 39.2738 34.8986 39.1927C34.8661 39.1278 34.4431 38.9007 33.9712 38.6898C33.5157 38.479 32.9788 38.1221 32.7998 37.9112C32.6208 37.7165 32.3768 37.3597 32.2466 37.1326C32.1165 36.9055 31.9863 36.3053 31.9538 35.7862C31.9212 35.1049 31.9701 34.8129 32.149 34.6507C32.2955 34.5534 32.4093 34.3911 32.3931 34.2938C32.3931 34.1965 32.5558 33.9694 32.751 33.7747C32.9625 33.5801 33.3855 33.2719 33.6946 33.0934C34.1339 32.8501 34.5895 32.769 35.6796 32.769V32.769ZM19.361 33.0772C21.5086 33.0772 22.1269 33.1259 22.0943 33.2719C22.0618 33.3854 21.7038 33.5314 21.3134 33.6125C20.9229 33.6774 20.4999 33.8072 20.386 33.8883C20.2884 33.9856 20.2233 34.1154 20.2721 34.2127C20.3209 34.31 20.2721 34.4074 20.1908 34.456C20.0931 34.5047 20.0281 35.5429 20.0281 37.0839C20.0281 38.4952 20.1094 40.1173 20.207 40.7013C20.3046 41.2853 20.4511 41.8206 20.5324 41.9179C20.6138 42.0152 20.6788 42.1937 20.6788 42.3235C20.6788 42.4532 20.8415 42.729 21.0368 42.9236C21.2483 43.1183 21.7038 43.4265 22.0618 43.6212C22.4197 43.7996 22.8753 43.9456 23.0705 43.9456C23.282 43.9456 23.6399 44.0429 23.8677 44.1403C24.1931 44.3025 24.3395 44.3025 24.5999 44.1403C24.7626 44.0429 25.153 43.9456 25.4296 43.9456C25.8526 43.9456 26.1129 43.7996 26.6173 43.2643C26.9752 42.875 27.382 42.3883 27.5121 42.1612C27.6911 41.853 27.7562 40.9933 27.805 38.5114C27.8375 36.727 27.8213 34.9589 27.7725 34.5696C27.6911 34.0505 27.5935 33.8558 27.3006 33.7747C27.1054 33.7261 26.7312 33.6287 26.4709 33.5801C26.2106 33.5314 25.9665 33.3854 25.934 33.2719C25.9014 33.1259 26.4058 33.0772 28.0816 33.0772C29.7574 33.0772 30.2617 33.1259 30.2292 33.2719C30.1967 33.3854 29.9201 33.5152 29.6109 33.5638C29.2042 33.6287 28.9927 33.7747 28.8137 34.1316C28.6348 34.5047 28.5534 35.478 28.4883 38.3492C28.4233 41.2528 28.3582 42.1775 28.1629 42.4857C28.0328 42.7128 27.5935 43.2481 27.1867 43.6698C26.78 44.1078 26.1943 44.562 25.8852 44.708C25.5272 44.854 24.73 44.9513 23.7376 44.9676C22.6475 44.9838 22.0943 44.9351 21.9479 44.7891C21.834 44.6756 21.5737 44.5945 21.3622 44.5945C21.1507 44.5945 20.6463 44.2538 20.1094 43.7347C19.605 43.2805 19.1983 42.7939 19.2146 42.6803C19.2146 42.583 19.1495 42.3559 19.0681 42.1937C18.9868 42.0477 18.8404 41.6584 18.7427 41.3502C18.6451 41.0095 18.5638 39.4685 18.5801 37.457C18.5801 34.5696 18.5475 34.0991 18.3035 33.9207C18.157 33.8072 17.7503 33.6612 17.3761 33.5963C17.0182 33.5314 16.6928 33.3854 16.644 33.2719C16.5951 33.1259 17.1971 33.0772 19.361 33.0772V33.0772ZM43.489 33.1096C45.116 33.1421 46.141 33.2232 46.141 33.3205C46.141 33.4178 45.8807 33.499 45.5716 33.5314C45.2462 33.5476 44.8557 33.7261 44.6442 33.9369C44.2863 34.2776 44.27 34.4074 44.3513 38.4465H47.6378C49.46 38.4303 51.0057 38.4303 51.1033 38.4303C51.2009 38.4303 51.266 37.6517 51.266 36.435C51.266 34.4885 51.266 34.456 50.8267 34.018C50.5664 33.7909 50.1596 33.5638 49.8993 33.5314C49.639 33.499 49.395 33.3854 49.3624 33.2719C49.3299 33.1259 49.8993 33.0934 51.9493 33.1096C53.5763 33.1421 54.6013 33.2232 54.6013 33.3205C54.6013 33.4178 54.4223 33.499 54.1945 33.5314C53.9668 33.5638 53.5437 33.6449 52.7303 33.8883V38.7872C52.7303 43.2156 52.7628 43.7347 53.0231 43.9943C53.1858 44.1727 53.5275 44.2863 53.9017 44.27C54.2433 44.27 54.5199 44.3349 54.5199 44.4322C54.5199 44.5296 53.5926 44.5945 52.0795 44.5945C50.7291 44.5945 49.5902 44.6107 49.5251 44.6269C49.4763 44.6593 49.395 44.5782 49.3624 44.4647C49.3299 44.3349 49.4926 44.27 49.818 44.27C50.1596 44.27 50.4688 44.124 50.7942 43.7834C51.266 43.2967 51.266 43.2805 51.266 41.3826C51.266 40.3444 51.2009 39.4198 51.1195 39.3225C51.0219 39.2251 49.6878 39.1765 44.27 39.2414V43.7834L44.7581 44.0267C45.0184 44.1565 45.4251 44.27 45.6529 44.27C45.8807 44.27 46.0597 44.3349 46.0597 44.4322C46.0597 44.5296 45.0835 44.5945 43.4565 44.5945C41.8295 44.5945 40.8533 44.5296 40.8533 44.4322C40.8533 44.3349 41.0323 44.27 41.2601 44.27C41.4879 44.27 41.8621 44.1727 42.1061 44.0754C42.3664 43.9618 42.6105 43.7996 42.6755 43.7023C42.7406 43.6212 42.8057 41.4962 42.822 34.456L42.3664 34.0018C42.1224 33.7585 41.6994 33.5476 41.439 33.5152C41.1787 33.499 40.9347 33.3854 40.8859 33.2719C40.8371 33.1096 41.3902 33.0772 43.489 33.1096V33.1096ZM58.9616 33.1096C60.6048 33.1421 61.581 33.2232 61.5647 33.3205C61.5485 33.4178 61.2881 33.499 60.9953 33.5314C60.7024 33.5638 60.2957 33.7423 60.0842 33.9369C59.7262 34.2938 59.71 34.31 59.7262 43.459L60.1655 43.8645C60.4258 44.0916 60.8163 44.27 61.0604 44.27C61.3532 44.27 61.4996 44.3511 61.4671 44.4647C61.4346 44.5782 61.3532 44.6593 61.3044 44.6269C61.2393 44.6107 60.0842 44.5945 58.7501 44.5945C57.237 44.5945 56.3096 44.5296 56.3096 44.4322C56.3096 44.3349 56.4886 44.27 56.7163 44.27C56.9441 44.27 57.3183 44.1727 57.5624 44.0754C57.8227 43.9618 58.0667 43.7996 58.1318 43.7023C58.1969 43.6212 58.262 41.4962 58.262 34.456L57.8064 34.0018C57.4973 33.6936 57.2044 33.5638 56.8302 33.5638C56.4723 33.5638 56.3096 33.4827 56.3096 33.3205C56.3096 33.1096 56.6838 33.0772 58.9616 33.1096Z" stroke="black" stroke-width="4" mask="url(#path-1-inside-1_427_38)"/>
						</mask>
						<g mask="url(#mask0_427_38)">
							<path class="logo-text" d="M33.8274 -0.0917969C33.7037 -0.0302311 33.4556 0.176854 33.2065 0.384249C32.9712 0.580189 32.6471 0.736542 32.3981 0.954199C32.1466 1.17397 31.8387 1.44051 31.5794 1.6591C31.2952 1.89861 31.0302 2.00144 30.7299 2.25952C30.1951 2.71899 29.932 2.95415 29.5794 3.25483C29.1418 3.62795 28.7703 3.94916 28.7178 4.24983C28.667 4.5406 28.5415 4.94291 28.4796 5.26567C28.4197 5.57827 28.2517 5.81478 28.1584 6.11546C28.0663 6.41246 27.8587 6.7675 27.6407 7.32688C27.386 7.98059 27.1124 8.2401 26.8944 8.53021C26.571 8.96076 26.2629 9.15177 25.9411 9.46333C25.7141 9.68314 25.5577 9.98136 25.3603 10.2407C25.1178 10.5592 24.9147 10.893 24.697 11.1735C24.455 11.4854 24.1697 11.9291 23.9816 12.2512C23.7473 12.6524 23.5876 12.9042 23.4427 13.1532C23.2693 13.4514 23.008 13.7338 22.8622 13.9822C22.6601 14.3266 22.5516 14.6243 22.3958 14.9564C22.2493 15.2687 22.2195 15.6193 22.116 15.9308C22.0088 16.2533 21.5155 16.3456 21.2562 16.5219C20.9585 16.7243 20.625 16.9663 20.375 17.2987C20.0344 17.7515 20.1051 18.1901 20.0324 18.5113C19.9468 18.8892 19.7743 19.1851 19.0296 19.9503C18.7027 20.2862 18.6126 20.7187 18.5296 20.9991C18.4366 21.3132 18.426 21.6104 18.3946 21.9627C18.3693 22.2474 18.1363 22.4811 18.0013 22.7507C17.7924 23.1679 17.4733 23.3728 17.1313 23.6524C16.8786 23.8589 16.7271 24.2012 16.6018 24.4714C16.4883 24.7161 16.3739 25.0096 16.2601 25.2696C16.1294 25.568 15.8353 25.7148 15.6487 25.9639C15.4272 26.2597 15.0281 26.3578 14.6233 26.462C14.3011 26.5449 14.053 26.6688 13.7421 26.8864C13.44 27.0979 13.1824 27.2907 12.9644 27.5391C12.6494 27.8981 12.5182 28.1401 12.3012 28.3171C12.0416 28.5286 11.6078 28.4934 10.9449 28.535C10.3877 28.5701 9.82426 28.8043 9.51332 28.9287C9.13984 29.0781 8.70488 29.1774 8.41446 29.3945C8.33747 29.452 8.31061 29.5493 8.24842 29.6019C7.90915 29.8885 7.27456 29.7371 5.40489 29.748C4.72041 29.752 4.35299 29.5518 3.85487 29.489C3.37914 29.429 2.94382 29.0145 2.55856 28.7536C2.29069 28.5722 2.21622 28.267 2.06044 27.8426C1.91717 27.4522 1.8431 27.1476 1.58408 26.434C1.50525 26.2168 1.48987 26.0283 1.52065 25.8109C1.56603 25.4905 2.06821 25.3653 2.50384 25.1673C2.96931 24.9556 3.45624 24.9288 3.96525 24.8871C4.38765 24.8525 5.44003 24.7211 6.42104 24.8964C7.24863 25.0444 8.4723 25.5071 9.02297 25.7154C9.29506 25.8184 9.69615 25.9636 10.2129 26.2014C10.7568 26.4518 11.3541 26.5861 12.0151 26.7512C13.6224 27.1526 14.4846 27.3528 14.9202 27.4878C15.9321 27.8013 16.8863 28.078 17.4087 28.2446C17.7081 28.3402 18.0504 28.41 18.5999 28.5761C18.9309 28.6761 19.9919 28.9473 21.5715 29.0947C22.3456 29.167 22.8389 29.2396 23.9045 29.271C24.3424 29.2839 24.7456 29.5705 25.2232 29.6855C25.548 29.7638 26.707 29.7583 27.4212 29.6964C27.7089 29.6715 28.1447 29.4274 28.5816 29.2716C28.8758 29.1667 29.2032 28.9511 29.5558 28.7328C29.9144 28.5108 30.3014 28.5357 30.6546 28.4424C31.013 28.3477 31.3797 28.2869 31.7016 28.0904C31.9528 27.937 32.0439 27.6041 32.2202 27.272C32.3966 26.9397 32.7068 26.8566 32.9559 26.722C33.2134 26.5827 33.5153 26.4835 33.8675 26.2972C34.1387 26.1538 34.468 25.9039 34.8417 25.5724C35.2716 25.1911 35.2988 24.8056 35.4745 24.4328C35.8344 23.669 35.9406 23.149 36.0659 22.7737C36.1949 22.3873 36.2528 21.9251 36.3044 21.5716C36.3796 21.0561 36.4804 20.6391 36.5531 20.2554C36.6134 19.9374 36.6259 19.6441 36.7394 19.3222C36.8312 19.062 36.9157 18.8145 36.9471 18.483C36.9869 18.0632 37.0612 16.6292 36.958 15.7567C36.9151 15.3943 36.8746 14.6927 36.8128 14.1712C36.7787 13.8839 36.5848 13.6529 36.347 13.249C36.1794 12.9644 35.9642 12.6169 35.6424 12.2434C35.4049 11.9679 35.218 11.5808 34.9683 11.1346C34.8182 10.8665 34.6371 10.6878 34.1919 10.1095C33.9098 9.74312 33.5812 9.0958 33.3822 8.67759C33.2408 8.38038 32.4046 7.44037 31.8073 6.87415C31.6065 6.68387 31.4444 6.43915 31.0825 6.10769C30.5247 5.5969 29.891 5.23644 29.2383 4.82258C29.0491 4.70258 28.71 4.49143 28.0903 4.06762C27.3466 3.55898 26.7598 3.34967 26.4299 3.19513C25.3828 2.70464 24.9371 2.56237 24.0379 2.46847C22.2915 2.2861 21.9098 2.31362 21.0538 2.20977C20.5289 2.14608 19.6051 2.02507 19.0678 1.94112C18.5305 1.85716 18.4074 1.81612 17.7078 1.77445C17.0082 1.73279 15.7358 1.69174 14.9777 1.65008C13.3696 1.56169 12.4355 1.5456 12.3115 1.59722C11.9803 1.73499 11.8963 2.22905 11.7931 2.36368C11.5954 2.62151 10.9461 2.58103 10.1069 2.95353C8.62198 3.61264 8.0631 4.15562 7.63774 4.48832C7.24985 4.79172 6.90144 4.86207 6.5905 5.17207C6.31973 5.44203 6.11414 5.69041 5.83368 6.01161C5.4938 6.40084 5.26341 6.78864 5.14899 7.06911C4.99997 7.43436 4.78706 7.88688 4.55883 8.39464C4.22703 9.13282 3.89529 9.54604 3.76034 9.82589C3.64985 10.055 3.4805 10.3539 3.38721 11.0134C3.21432 12.2357 3.37602 13.0914 3.44816 13.277C3.70836 13.9466 4.01842 14.3345 4.2765 14.6659C4.49697 14.9491 5.01093 15.184 5.71303 15.443C7.17904 15.9838 7.64396 15.2909 7.96671 15.1342C8.36188 14.9423 8.88895 14.9788 9.80871 14.9884C10.7568 14.9983 11.7272 15.3307 12.1933 15.2897C12.642 15.2502 12.7446 14.7922 12.8802 14.5854C13.0411 14.3399 13.201 13.9241 13.3155 13.5904C13.4282 13.2618 13.6364 12.8246 13.7921 12.523C13.9645 12.1893 14.1755 11.8905 14.3201 11.7559C14.6753 11.4252 15.6226 11.7438 16.7529 12.147C17.169 12.2955 17.3881 12.5111 17.6667 12.7375C18.1828 13.1568 18.8763 14.0615 19.7463 14.8177C20.0787 15.1066 20.2059 15.184 20.5566 15.4828C20.9073 15.7816 21.4819 16.2946 22.8964 17.2362C24.3109 18.1777 26.5478 19.5321 27.7822 20.3017C29.1996 21.1854 29.5141 21.4655 30.2554 22.0109C30.8413 22.442 31.8175 23.2335 32.3865 23.6661C33.3385 24.3897 33.9493 24.843 34.2615 25.2584C34.7293 25.8809 35.5625 26.7459 36.1169 27.5382C36.3654 27.8934 36.4592 28.2023 36.6355 28.4927C36.7154 28.6242 36.874 28.7005 37.0596 28.7937C37.337 28.9331 37.6203 28.7844 37.7443 28.6709C38.048 28.3931 38.1383 28.0394 38.1908 27.7176C38.2543 27.3288 38.4903 26.5494 38.6774 25.9356C38.7973 25.5425 39.0288 25.0146 39.5984 24.3501C39.847 24.0602 40.0238 23.6253 40.2113 23.1785C40.4738 22.553 40.9554 22.0097 41.1755 21.6126C41.3709 21.2603 41.6208 20.8045 41.8282 20.1839C41.9926 19.6918 42.0984 19.1466 42.2221 18.8247C42.3328 18.5371 42.7999 18.1118 43.1546 17.7983C43.4438 17.5428 43.5281 17.2592 43.6727 17.1659C43.7474 17.1177 43.8583 17.1342 43.8804 17.1752C44.0337 17.4602 43.2016 18.1242 42.3608 18.8829C41.4549 19.7004 41.2091 20.0757 40.7216 20.8521C40.4165 21.3378 40.3372 21.797 40.5412 22.8825C40.6817 23.63 41.849 23.0215 42.0141 22.9391C42.5394 22.6769 42.8434 22.4214 43.2473 22.1207C43.6006 21.8577 43.8384 21.3443 44.1801 20.857C44.5683 20.3036 44.8956 20.0383 45.0414 19.7572C45.1802 19.4898 45.5175 19.353 45.7768 19.1354C46.0365 18.9174 46.408 18.7734 46.8231 18.5651C47.193 18.3795 47.6716 18.3991 48.2736 18.3574C48.4897 18.3424 48.689 18.2536 48.8961 18.2843C49.0498 18.3072 49.0634 18.7069 49.0531 19.1522C49.0413 19.6647 48.5671 20.2199 48.3386 20.6671C48.1692 20.9984 47.7401 21.792 46.7662 23.2339C46.2061 24.063 45.9752 24.3467 45.7684 24.699C45.5228 25.1175 45.0436 25.7745 44.6804 26.5217C44.3467 27.2083 44.4827 27.8901 44.5234 28.4091C44.5318 28.5156 44.5648 28.5755 44.6164 28.5969C44.668 28.6184 44.7501 28.5978 44.8334 28.5154C45.3466 28.008 45.4142 26.7173 45.4668 25.7397C45.4926 25.2594 45.6008 24.7236 45.7771 24.3389C45.9495 23.9629 46.1393 23.7684 46.4503 23.4269C46.7328 23.1167 46.9689 22.9811 47.5992 22.4739C48.1961 21.9936 48.9776 21.7783 49.4866 21.6844C49.9347 21.6018 50.3059 21.3841 50.5034 21.1876C50.7227 20.9693 50.9079 20.7423 51.5792 19.9877C52.13 19.3684 52.7101 18.8356 53.2589 18.5035C53.7005 18.2363 53.975 18.0471 54.6572 17.7778C55.0538 17.6213 55.4053 17.6522 55.6226 17.7449C55.8524 17.8428 55.8419 18.4364 55.8213 19.0474C55.7994 19.7017 55.016 20.3232 54.558 20.6779C54.2562 20.9117 54.0397 21.1963 53.8422 21.4345C53.5603 21.7745 53.2723 22.1079 53.1476 22.3673C52.9742 22.7278 52.7748 23.0408 52.6087 23.4963C52.4594 23.9058 52.174 24.7571 52.1003 25.4241C52.063 25.7622 51.9862 27.1961 52.0481 28.0677C52.0535 28.1435 52.0895 28.2023 52.1308 28.2443C52.4122 28.5299 53.2685 28.2048 53.7775 28.1311C54.1649 28.075 54.6155 27.7707 55.0424 27.4893C55.262 27.3446 55.6727 27.0034 56.1907 26.6514C56.4595 26.4687 56.8331 25.6607 57.4031 24.5833C57.8163 23.8021 58.0383 22.9835 58.4522 21.8747C58.6695 21.2924 58.8878 20.2087 59.0647 19.6643C59.1837 19.2981 59.2821 18.7958 59.5513 18.183C59.7047 17.8339 59.8828 17.4675 60.0803 17.1354C60.3155 16.7398 60.6079 16.2038 60.7852 15.8401C61.0514 15.2936 61.292 14.9178 61.5208 14.6271C62.0099 14.0057 63.0332 13.4875 63.3345 13.351C63.4726 13.2885 63.4287 13.7742 63.4185 14.1156C63.3982 14.7905 62.6017 15.3295 62.3 15.6302C61.916 16.0131 61.44 16.531 61.1909 16.8739C60.9877 17.1538 60.8585 17.3406 60.8274 17.5368C60.8095 17.65 60.8169 17.7946 61.4736 17.9097C62.1303 18.0247 63.4437 18.1068 64.1408 18.1901C64.8919 18.2799 65.0444 18.5632 65.2726 18.7815C65.3366 18.8428 65.4785 18.8132 65.5829 18.7825C65.7826 18.7236 65.8951 18.5651 65.9573 18.5334C66.0949 18.4632 65.6706 19.2237 65.1119 19.9174C64.3749 20.8323 63.4511 21.1129 63.1293 21.4239C62.8377 21.7057 62.6626 21.9836 62.4966 22.5314C62.3657 22.9631 62.351 23.3517 62.3199 23.9384C62.2531 25.2007 62.2478 26.2117 62.1545 26.6968C62.0202 27.3955 62.1433 27.9125 62.2155 28.0677C62.4635 28.6011 64.0842 28.6998 64.7953 28.7325C65.2453 28.7531 65.5207 28.226 66.1106 27.6047C66.3849 27.3158 66.7036 27.3336 66.7657 27.1992C66.9727 26.7522 66.9734 25.7621 67.128 25.0553C67.2939 24.2967 67.6563 24.1004 67.8742 23.8309C68.1842 23.4475 68.3204 23.2292 68.3108 23.1256C68.271 22.6984 66.8988 23.1042 65.7064 23.1247C65.3348 23.1452 65.4374 23.1863 66.0444 23.2485C66.6513 23.3107 67.7595 23.3927 68.9013 23.4773" stroke="#B99090" stroke-width="4" stroke-linecap="round"/>
							<path class="logo-text" d="M7.46753 42.0907C7.46753 42.4023 7.71629 43.5707 8.13592 44.3914C8.54488 45.1913 9.13976 45.356 10.1128 45.6286C10.529 45.7452 10.8786 45.4628 11.5165 45.3369C12.4747 45.1477 13.12 44.709 13.2673 44.4684C13.4731 44.1322 13.811 43.8722 14.0104 43.5682C14.3015 43.1244 14.2934 42.6159 14.2837 41.3315C14.2806 40.9301 13.8154 40.4819 12.9711 39.6888C11.8056 38.594 10.8396 38.1545 10.6829 38.0502C10.3553 37.8322 10.0871 37.3404 9.79276 36.8365C9.48852 36.3157 8.99779 35.7058 8.82912 35.4432C8.75329 35.3252 8.64035 35.2441 8.60894 35.0566C8.55739 34.7488 8.619 34.4903 8.69187 34.3857C8.73028 34.3305 8.82693 34.3225 9.57447 34.3119C10.322 34.3012 11.7317 34.3012 12.4889 34.3219C13.3105 34.3444 13.5383 34.5927 13.8738 34.8135C14.043 34.9249 14.23 35.0336 14.4285 35.0965C14.9201 35.252 15.6528 34.8251 16.2182 34.5848C16.6062 34.4199 17.1592 34.2811 17.7783 34.0716C18.1091 33.9596 18.4382 33.82 19.7643 33.809C20.0515 33.8066 20.1343 33.8401 20.177 34.0581C20.3968 35.1796 20.074 35.5764 19.8858 36.1094C19.4298 37.4014 19.1103 37.6921 19.0786 38.0584C19.0411 38.492 18.9633 39.8192 19.0258 40.6236C19.0511 40.948 19.442 42.2678 19.7687 43.3028C19.9794 43.9705 20.2599 44.4753 20.7204 44.7806C21.1329 45.0541 22.3455 45.1676 23.1603 45.2109C23.5475 45.2315 23.9449 44.8773 24.4163 44.719C24.8832 44.5623 25.2854 44.3107 25.5584 44.1747C25.823 44.0428 26.1234 43.9338 26.4689 43.7249C26.8048 43.5219 27.2944 42.8282 27.6732 41.7911C27.766 41.5367 27.7781 41.2791 27.7994 39.99C27.8208 38.701 27.8208 36.3792 27.7793 35.1624C27.7379 33.9456 27.6549 33.9042 27.6744 33.8724C27.9174 33.4766 28.9678 33.8816 29.3903 34.0389C29.6735 34.1444 30.0596 34.1542 30.5411 34.1859C30.8802 34.2083 31.2946 34.114 31.9012 33.9456C32.751 33.7097 33.6152 34.1127 34.1849 34.1752C34.4166 34.2006 34.6253 34.2384 34.8028 34.2591C35.0091 34.2832 36.0821 34.4884 37.5998 34.6872C38.1436 34.7584 38.2261 34.7824 38.2791 34.8345C38.506 35.0573 38.3536 35.3685 38.3014 35.5042C38.2395 35.6652 37.6676 35.746 36.5092 35.6838C35.1123 35.6088 34.2503 35.3691 34.0621 35.3587C33.1671 35.3094 31.7369 35.3892 31.6637 35.5563C31.5934 35.7167 31.5899 36.1405 31.6106 36.6742C31.6333 37.2582 32.5925 37.6293 34.0028 38.0687C34.8888 38.3448 35.5249 38.6972 36.1628 39.0427C36.5196 39.236 36.7398 39.5767 37.0331 40.0783C37.4274 40.7525 37.5991 41.607 37.7248 42.2239C37.9028 43.0982 37.4546 43.4501 36.8585 44.2548C36.5382 44.6871 36.2611 44.9163 35.8735 45.1993C35.5409 45.4421 34.7974 44.9615 33.5209 44.4065C32.9688 44.1665 32.7634 43.6222 32.5017 43.191C32.4693 43.1375 32.4279 43.2202 32.4172 43.3248C32.3368 44.1128 33.0548 45.1449 33.6083 46.0762C33.8005 46.3998 34.0178 46.5502 34.3096 46.6652C35.0815 46.9692 35.462 46.7192 35.7975 46.6036C36.2079 46.4622 36.677 46.4465 36.9389 46.3627C37.0117 46.3394 37.0953 46.3209 37.1588 46.2273C37.2222 46.1337 37.2637 45.9679 37.285 45.0532C37.3064 44.1386 37.3064 42.4802 37.3375 41.4911C37.3771 40.2297 37.5985 39.7061 37.7659 39.267C38.1097 38.3653 38.5201 37.2549 38.7085 36.9512C38.916 36.6168 39.3354 36.231 39.6819 35.8308C39.8913 35.5889 40.2564 35.246 40.7284 34.8885C40.8792 34.7744 40.9706 34.6787 41.1057 34.5845C42.0577 33.9203 43.6913 35.0538 43.9539 35.3053C44.0133 35.3623 44.0481 35.4307 44.1316 35.328C44.4007 34.9972 44.4677 34.5744 44.5299 34.407C44.5609 34.3235 44.7165 34.3225 44.8117 34.3533C44.9964 34.4131 45.0331 35.0085 45.002 35.7514C44.9719 36.4711 44.3848 36.917 43.4249 37.9506C42.974 38.4363 42.793 38.7814 42.6991 38.99C42.5705 39.2756 42.4374 39.9291 42.3118 41.1698C42.2347 41.931 42.2691 42.9702 42.2794 43.5456C42.2981 44.5807 42.3733 45.2932 42.4883 45.5033C42.6272 45.7572 43.3533 45.1914 43.9843 45.0435C44.3075 44.9677 44.5921 44.7718 45.0626 44.5937C45.5387 44.4135 45.8899 43.8308 46.2775 43.1407C46.6825 42.4196 46.6036 41.5731 46.3639 41.0865C46.0385 40.4259 44.4916 40.416 44.1753 40.3114C44.1188 40.2927 44.1122 40.2074 44.1119 40.1443C44.1094 39.6437 45.4276 39.3279 45.9424 39.2014C46.1005 39.1625 46.6199 39.1382 47.5286 39.1693C48.4209 39.1999 49.0723 39.3267 49.4279 39.2852C49.8745 39.2331 50.0774 38.5967 50.3507 38.0625C51.0481 36.699 50.6039 35.3075 50.4986 35.056C50.4477 34.9341 50.4355 34.6385 50.4873 34.2827C50.6288 33.311 52.9269 34.1749 53.0208 34.3002C53.2161 34.5609 53.241 34.9897 53.138 35.7941C53.0914 36.1574 52.7648 36.6569 52.4501 37.1726C51.8121 38.218 51.1912 39.1131 50.8774 39.8346C50.6666 40.3193 50.5825 40.7483 50.5197 41.3114C50.4342 42.0774 50.519 42.6133 50.5505 43.0396C50.6715 44.6822 50.7898 45.1864 51.3649 45.9201C51.6001 46.2201 51.9833 46.2989 52.3072 46.3931C52.5998 46.4783 52.8427 46.4045 53.0098 46.3212C53.3969 46.1284 53.3666 45.6525 53.4505 45.3478C53.4934 45.1918 53.5136 44.7329 53.5551 43.9809C53.597 43.2199 53.8685 42.5336 54.0878 41.938C54.1939 41.6498 54.3277 41.4047 54.5369 40.7272C54.7461 40.0497 55.0363 38.951 55.2066 38.3332C55.4647 37.3964 55.5653 37.0665 55.722 36.6274C55.8911 36.1537 56.0879 35.7485 56.2249 35.3079C56.4494 34.5852 56.6746 33.5285 56.8527 33.2342C57.2267 32.6163 58.9751 33.1692 59.5838 33.5562C60.252 33.981 60.5267 34.4658 60.7789 34.8549C60.9832 35.1701 60.8219 35.7649 60.5713 36.2885C60.3405 36.7705 60.0065 37.2725 59.4729 37.8171C59.1729 38.1234 58.7916 38.2374 58.5825 38.2484C58.4925 38.2531 58.4562 38.1143 58.4452 38.0298C58.4041 37.7138 58.5391 37.3391 58.5912 36.8274C58.6618 36.1352 58.5605 35.5795 58.4665 35.4121C58.4262 35.3401 58.3519 35.3276 58.2577 35.3688C58.0174 35.4737 57.7865 35.7655 57.4737 36.2341C56.9572 37.0078 56.6351 38.1067 56.3945 39.0581C56.224 39.7324 56.2148 40.2664 56.1941 40.7366C56.1759 41.149 56.0892 42.3319 56.0995 43.8707C56.1048 44.6527 56.3819 45.0206 56.5908 45.2206C56.6418 45.2695 56.7161 45.2731 56.7896 45.263C57.2202 45.2042 57.5126 44.7925 57.648 44.6983C58.1711 44.3342 58.9562 44.8748 59.5734 44.8553C59.8053 44.848 59.7327 44.2919 59.7223 43.8631C59.7078 43.2656 58.4022 42.0781 57.7859 41.4635C57.7322 41.4099 57.7024 41.3381 57.6914 41.2543C57.6409 40.869 58.1182 40.4599 58.3397 40.1132C58.4549 39.6213 58.5391 38.9121 58.6434 38.3442C58.6647 38.2387 58.6647 38.1557 58.6647 38.0703" stroke="black" stroke-width="4" stroke-linecap="round"/>
						</g>
					</svg>
					<svg viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path class="logo-circle" d="M41.25 2.25C63.25 2.25 79.75 19.25 79.75 40.75C79.75 62.25 63.25 79.25 41.25 79.25C19.25 79.25 2.25 61.25 2.25 40.75C2.25 20.25 19.25 2.25 41.25 2.25Z"/>
					</svg>
				</div>
			</div>
		</div>`;
    document.body.insertAdjacentHTML("beforeend", preloaderTemplate);
    document.querySelector(".fls-preloader");
    const showPecentLoad = document.querySelector(".fls-preloader__counter");
    const showLineLoad = document.querySelector(".fls-preloader__line span");
    htmlDocument.setAttribute("data-fls-preloader-loading", "");
    htmlDocument.setAttribute("data-fls-scrolllock", "");
    preloaderImages.forEach((preloaderImage) => {
      const imgClone = document.createElement("img");
      imgClone.onload = imageLoaded;
      imgClone.onerror = imageLoaded;
      imgClone.src = preloaderImage.dataset.src || preloaderImage.src;
    });
    addLoadedClass();
    const preloaderOnce = () => localStorage.setItem(location.href, "preloaded");
    if (document.querySelector('[data-fls-preloader="true"]')) {
      preloaderOnce();
    }
  } else {
    areImagesLoaded = true;
    addLoadedClass();
  }
  function addLoadedClass() {
    const logo = document.querySelector(".logo");
    if (!logo) return;
    logo.addEventListener("animationend", function() {
      if (!isLogoAnimationCompleted) {
        isLogoAnimationCompleted = true;
        startSecondAnimation();
      }
    }, { once: true });
  }
  function startSecondAnimation() {
    if (isLogoAnimationCompleted && areImagesLoaded) {
      htmlDocument.setAttribute("data-fls-preloader-loaded", "");
      htmlDocument.removeAttribute("data-fls-preloader-loading");
      setTimeout(() => {
        htmlDocument.setAttribute("intro-hide", "");
        htmlDocument.removeAttribute("data-fls-scrolllock");
      }, 700);
    } else {
      console.log("Очікуємо:", {
        isLogoAnimationCompleted,
        areImagesLoaded
      });
    }
  }
}
document.addEventListener("DOMContentLoaded", preloader);
class Parallax {
  constructor(elements) {
    if (elements.length) {
      this.elements = Array.from(elements).map((el) => new Parallax.Each(el, this.options));
    }
  }
  destroyEvents() {
    this.elements.forEach((el) => {
      el.destroyEvents();
    });
  }
  setEvents() {
    this.elements.forEach((el) => {
      el.setEvents();
    });
  }
}
Parallax.Each = class {
  constructor(parent) {
    this.parent = parent;
    this.elements = this.parent.querySelectorAll("[data-fls-parallax]");
    this.animation = this.animationFrame.bind(this);
    this.offset = 0;
    this.value = 0;
    this.smooth = parent.dataset.flsParallaxSmooth ? Number(parent.dataset.flsParallaxSmooth) : 15;
    this.minWidth = parent.dataset.minWidth ? Number(parent.dataset.minWidth) : null;
    this.isActive = true;
    this.checkMediaQuery();
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener("resize", this.handleResize);
    this.setEvents();
  }
  checkMediaQuery() {
    if (this.minWidth === null) {
      this.isActive = true;
      return;
    }
    this.isActive = window.innerWidth >= this.minWidth;
  }
  handleResize() {
    this.checkMediaQuery();
  }
  setEvents() {
    this.animationID = window.requestAnimationFrame(this.animation);
  }
  destroyEvents() {
    window.cancelAnimationFrame(this.animationID);
    window.removeEventListener("resize", this.handleResize);
  }
  animationFrame() {
    if (!this.isActive) {
      this.animationID = window.requestAnimationFrame(this.animation);
      return;
    }
    const topToWindow = this.parent.getBoundingClientRect().top;
    const heightParent = this.parent.offsetHeight;
    const heightWindow = window.innerHeight;
    const positionParent = {
      top: topToWindow - heightWindow,
      bottom: topToWindow + heightParent
    };
    const centerPoint = this.parent.dataset.flsParallaxCenter ? this.parent.dataset.flsParallaxCenter : "center";
    if (positionParent.top < 30 && positionParent.bottom > -30) {
      switch (centerPoint) {
        // верхній точці (початок батька стикається верхнього краю екрану)
        case "top":
          this.offset = -1 * topToWindow;
          break;
        // центрі екрана (середина батька у середині екрана)
        case "center":
          this.offset = heightWindow / 2 - (topToWindow + heightParent / 2);
          break;
        // Початок: нижня частина екрана = верхня частина батька
        case "bottom":
          this.offset = heightWindow - (topToWindow + heightParent);
          break;
      }
    }
    this.value += (this.offset - this.value) / this.smooth;
    this.animationID = window.requestAnimationFrame(this.animation);
    this.elements.forEach((el) => {
      const parameters = {
        axis: el.dataset.axis ? el.dataset.axis : "v",
        direction: el.dataset.flsParallaxDirection ? el.dataset.flsParallaxDirection + "1" : "-1",
        coefficient: el.dataset.flsParallaxCoefficient ? Number(el.dataset.flsParallaxCoefficient) : 5,
        additionalProperties: el.dataset.flsParallaxProperties ? el.dataset.flsParallaxProperties : ""
      };
      this.parameters(el, parameters);
    });
  }
  parameters(el, parameters) {
    if (parameters.axis == "v") {
      el.style.transform = `translate3D(0, ${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0) ${parameters.additionalProperties}`;
    } else if (parameters.axis == "h") {
      el.style.transform = `translate3D(${(parameters.direction * (this.value / parameters.coefficient)).toFixed(2)}px,0,0) ${parameters.additionalProperties}`;
    }
  }
};
if (document.querySelector("[data-fls-parallax-parent]")) {
  new Parallax(document.querySelectorAll("[data-fls-parallax-parent]"));
}
class MousePRLX {
  constructor(props, data = null) {
    let defaultConfig = {
      init: true
    };
    this.config = Object.assign(defaultConfig, props);
    if (this.config.init) {
      const paralaxMouse = document.querySelectorAll("[data-fls-mouse]");
      if (paralaxMouse.length) {
        this.paralaxMouseInit(paralaxMouse);
      }
    }
  }
  paralaxMouseInit(paralaxMouse) {
    paralaxMouse.forEach((el) => {
      const paralaxMouseWrapper = el.closest("[data-fls-mouse-wrapper]");
      const paramСoefficientX = +el.dataset.flsMouseCx || 100;
      const paramСoefficientY = +el.dataset.flsMouseCy || 100;
      const directionX = el.hasAttribute("data-fls-mouse-dxr") ? -1 : 1;
      const directionY = el.hasAttribute("data-fls-mouse-dyr") ? -1 : 1;
      const paramAnimation = el.dataset.prlxA ? +el.dataset.prlxA : 50;
      let positionX = 0, positionY = 0;
      let coordXprocent = 0, coordYprocent = 0;
      setMouseParallaxStyle();
      if (paralaxMouseWrapper) {
        mouseMoveParalax(paralaxMouseWrapper);
      } else {
        mouseMoveParalax();
      }
      function setMouseParallaxStyle() {
        const distX = coordXprocent - positionX;
        const distY = coordYprocent - positionY;
        positionX = positionX + distX * paramAnimation / 1e3;
        positionY = positionY + distY * paramAnimation / 1e3;
        el.style.cssText = `transform: translate3D(${directionX * positionX / (paramСoefficientX / 10)}%,${directionY * positionY / (paramСoefficientY / 10)}%,0) rotate(0.02deg);`;
        requestAnimationFrame(setMouseParallaxStyle);
      }
      function mouseMoveParalax(wrapper = window) {
        wrapper.addEventListener("mousemove", function(e) {
          const offsetTop = el.getBoundingClientRect().top + window.scrollY;
          if (offsetTop >= window.scrollY || offsetTop + el.offsetHeight >= window.scrollY) {
            const parallaxWidth = window.innerWidth;
            const parallaxHeight = window.innerHeight;
            const coordX = e.clientX - parallaxWidth / 2;
            const coordY = e.clientY - parallaxHeight / 2;
            coordXprocent = coordX / parallaxWidth * 100;
            coordYprocent = coordY / parallaxHeight * 100;
          }
        });
      }
    });
  }
}
document.querySelector("[data-fls-mouse]") ? window.addEventListener("load", new MousePRLX({})) : null;
window.addEventListener("resize", applyStyles);
window.addEventListener("DOMContentLoaded", function() {
  applyStyles();
});
function applyStyles() {
  const viewportWidth = window.innerWidth;
  const items = document.querySelectorAll("section.special div.items-special__item");
  if (items.length < 3 && viewportWidth >= 1100) {
    items.forEach((item) => {
      item.style.maxWidth = "440px";
    });
  }
  if (viewportWidth < 1100 && items.length < 3) {
    items.forEach((item) => {
      item.style.maxWidth = "";
    });
  }
}
