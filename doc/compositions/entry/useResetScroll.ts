export function useResetScroll(domRef: Ref<HTMLElement | null>) {
  const route = useRoute();
  watch(() => route.path, async () => {
    await nextTick();
    domRef.value?.scroll(0, 0);
  });
}
