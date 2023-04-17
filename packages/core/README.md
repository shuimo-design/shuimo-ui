# Shuimo-design/core

## API

### slot

#### named slots

```tsx
// in hook
const slotName = 'xxxx';
const getSlot = () => {
  return children && children[slotName] ? children[slotName] : <slot name="xxxx"/>;
}
```
