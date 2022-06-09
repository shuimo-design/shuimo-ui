import {h, defineComponent} from "vue";
import { props } from "./api";

export default defineComponent({
  name: 'MPagination',
  data() {
    return {
      disPrev: true,
      disNext: false
    }
  },
  props,
  computed: {
    pagers() {
      // @ts-ignore
      const {total, pageSize} = this;
      const pages = Math.ceil(total / pageSize);
      const arr = [];
      for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
      }
      if (arr.length === 1 || !arr.length) {
        this.disPrev = true;
        this.disNext = true;
      }
      return arr
    }
  },
  methods: {
    getIconsProps() {
      const {prevPage, nextPage, quickPrevPage, quickNextPage} = this;
      const {disPrev, disNext} = this;
      const prev = (
        <button class={['m-cursor page-prev', {'page-prev-disabled': disPrev}]} onClick={prevPage} disabled={disPrev}/>
      );
      const next = (
        <button class={['m-cursor page-next', {'page-next-disabled': disNext}]} onClick={nextPage} disabled={disNext}/>
      );
      const quickPrev = (
        <button class="m-cursor page-quick-prev" title={'向前5页'} onClick={quickPrevPage}/>
      );
      const quickNext = (
        <button class="m-cursor page-quick-prev" title={'向后5页'} onClick={quickNextPage}/>
      );
      return {
        prev,
        next,
        quickPrev,
        quickNext
      }
    },
    prevPage() {
      // @ts-ignore
      const {current} = this;
      this.disNext = false;
      let newPage = this.pagers.includes(current - 1) ? current - 1 : current;
      if (newPage === 1) {
        this.disPrev = true;
      }
      this.emitChange(newPage);
    },
    nextPage() {
      // @ts-ignore
      const {current} = this;
      this.disPrev = false;
      let newPage =  this.pagers.includes(current + 1) ? current + 1 : current;
      if (this.pagers.indexOf(newPage) === this.pagers.length - 1) {
        this.disNext = true;
      }
      this.emitChange(newPage);
    },
    quickPrevPage() {
      // todo 快速翻页后期迭代
      const {current} = this;
      let newPage = this.pagers.includes(current - 5) ? current - 5 : 1;
      this.emitChange(newPage);
    },
    quickNextPage() {
      // todo 快速翻页后期迭代
      const {current} = this;
      let newPage = this.pagers.includes(current + 5)
        ? current + 5
        : this.pagers[this.pagers.length - 1];
      this.emitChange(newPage);
    },
    pageSelected(event: any) {
      const target = event.target;
      if (target.tagName === 'UL') {
        return;
      }
      if (this.pagers.length <= 1) {
        return;
      }
      let newPage = Number(event.target.textContent);
      if (newPage === 1) {
        this.disPrev = true;
        this.disNext = false;
      }
      if (this.pagers.indexOf(newPage) === this.pagers.length - 1) {
        this.disPrev = false;
        this.disNext = true;
      }
      this.emitChange(newPage)
    },
    emitChange(current: number) {
      this.$emit('update:current', current);
      this.$emit('change', current);
    }
  },
  render() {
    // @ts-ignore
    const {pagers, current} = this;
    const {pageSelected} = this;
    const iconsProps = {
      ...this.getIconsProps()
    };
    return (
      <div class={'m-pagination'}>
        {iconsProps.prev}
        <ul onClick={pageSelected} class={'pages'}>
          {pagers.map(item => (
            <li class={['pager m-cursor', {'current-page': item === current}]} key={item}>{item}</li>
          ))}
        </ul>
        {iconsProps.next}
      </div>
    )
  }
})
