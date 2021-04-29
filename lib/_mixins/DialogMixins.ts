/**
 * @Description dialog混入
 * @Author: 南歌子
 * @Date 2021/4/1 17:46
 * @version V1.0.0
 *
 * Hello, humor
 */
import { CLOSE_EVENT, CONFIRM_EVENT } from "../_utils/constants";

const DialogMixins = {
    data() {
        return {
            pes: 1
        }
    },
    emits: [CLOSE_EVENT, CONFIRM_EVENT],
    props: {
        mask: { type: Object, default: { show: true, clickClose: false } },
        visible: { type: Boolean, default: false },
        confirmText: { type: String, default: '我知道了' }
    },
    methods: {
        getClasses() {
            return {
                maskClass: ['mask', this.mask.show ? 'mask-bg' : '']
            }
        },
        maskClick(e) {
            // click mask
            if (e.path[0].classList.contains('mask')) {
                this.closeDialog();
            }
        },
        closeDialog() {
            this.$emit('close');
        },
        confirmDialog() {
            this.$emit('confirm');
        },
        resetSize(baseH, baseW) {
            const slotDom = this.$slots.default();
            if (slotDom) {
                const slotDomDefault = slotDom[0];
                let dom = slotDomDefault.el;
                if (!dom) {
                    const className = slotDomDefault.props.class;
                    const doms = document.getElementsByClassName(className)
                    if (doms && doms.length === 1) {
                        dom = doms[0]
                    }
                }
                if (dom) {
                    const h = Number(getComputedStyle(dom, null).height.replace('px', ''));
                    const w = Number(getComputedStyle(dom, null).width.replace('px', ''));
                    // 为了修复不知道为什么第二次打开getComputedStyle没值的问题
                    if (h !== 0 || w !== 0) {
                        this.pes = Math.max(h / baseH, w / baseW, 1);
                    }
                }
            }
        }
    }
}

export default DialogMixins;
