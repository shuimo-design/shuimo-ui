/**
 * @description content hook
 * @author youus
 * @date 2022/4/3 16:28
 * @version v1.0.0
 *
 * Hello, humor
 */

import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import type { Ref, Slots } from 'vue';

export default function useContent(slots: Slots, popperNode: Ref<Node>, content: Ref<string>) {
  let observer: MutationObserver | null = null;
  const hasContent = ref(false);

  onMounted(() => {
    if (slots.content !== undefined || content.value) {
      hasContent.value = true;
    }

    observer = new MutationObserver(checkContent);
    if (popperNode.value) {
      observer.observe(popperNode.value, {
        childList: true,
        subtree: true
      });
    }
  });

  onBeforeUnmount(() => observer?.disconnect());

  /**
   * Watch the content prop
   */
  watch(content, content => {
    hasContent.value = !!content;
  });

  /**
   * Check the content slot
   */
  const checkContent = () => {
    hasContent.value = !!slots.content;
  };

  return {
    hasContent
  };
}
