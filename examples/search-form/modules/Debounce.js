export default function debounce(fn, delay = 400) {
  let timer = null;
  let resolver = null;

  function resolveFn(args) {
    resolver(fn(...args));
    timer = null;
    resolver = null;
  }

  return function(...args) {
    return new Promise(resolve => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
        resolver = null;
      }

      timer = setTimeout(resolveFn, delay, args);
      resolver = resolve;
    });
  };
}
