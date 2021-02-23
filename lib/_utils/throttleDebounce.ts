function throttle (delay: number, noTrailing: any, callback?: any, debounceMode?: any) {
  let timeoutID: NodeJS.Timeout | undefined;
  let cancelled = false;

  let lastExec = 0;

  function clearExistingTimeout() {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
  }

  function cancel() {
    clearExistingTimeout();
    cancelled = true;
  }

  if (typeof noTrailing !== 'boolean') {
    debounceMode = callback;
    callback = noTrailing;
    noTrailing = undefined;
  }

  function wrapper() {
    const _len = arguments.length;
    const arguments_ = new Array(_len);
    for (let _key = 0; _key < _len; _key++) {
      arguments_[_key] = arguments[_key];
    }

    // @ts-ignore
    let self = this;
    let elapsed = Date.now() - lastExec;

    if (cancelled) {
      return;
    }

    function exec() {
      lastExec = Date.now();
      callback.apply(self, arguments_);
    }

    function clear() {
      timeoutID = undefined;
    }

    if (debounceMode && !timeoutID) {

      exec();
    }

    clearExistingTimeout();

    if (debounceMode === undefined && elapsed > delay) {

      exec();
    } else if (noTrailing !== true) {

      timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
    }
  }

  wrapper.cancel = cancel;

  return wrapper;
}

function debounce (delay: any, atBegin: boolean, callback: undefined) {
  return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}

export { debounce, throttle };
