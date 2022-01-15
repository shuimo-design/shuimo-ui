export default {
  mounted(el: HTMLElement) {
    el.classList.add('scroll');
    const s = document.styleSheets[0];
    el.classList.add('panda2');
    let isInsert = false;
    el.addEventListener('scroll', () => {
      if (el) {
        const { scrollTop, offsetHeight, scrollHeight } = el;
        // eslint-disable-next-line no-mixed-operators
        if ((scrollTop % 80 - 40) > 0) {
          el.classList.replace('panda2', 'panda1');
        } else {
          el.classList.replace('panda1', 'panda2');
        }
        const h = scrollTop / (scrollHeight - offsetHeight);
        if (isInsert) {
          s.deleteRule(0);
        }
        s.insertRule(`.scroll::-webkit-scrollbar-thumb{background-position:50% ${h * 100}% !important}`, 0);
        isInsert = true;
      }
    });
  },
  unmounted() {
    const s = document.styleSheets[0];
    s.deleteRule(0);
  }
};
