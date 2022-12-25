# moelement

A simple way to create web components.


## Example

```typescript
@createMElement({
  name: 'm-button',
  template: {
    type: 'button',
    props: { class: 'm-button' },
    slots: ['default']
  },
  props: {
    type: { type: String, default: 'primary' }
  },
  style: ``
})
class MButton extends MElement {
  public type: string = 'default';

  constructor() {
    super();
    console.log(this.getAttribute('type'));
  }

  afterInit() {
    console.log('%c button after init', 'color:#861717');
  }

  afterMount() {
    console.log('%c button after mount', 'color:#E8B004');
  }

  beforeUpdate() {
    console.log('%c button before update', 'color:#4A9992');
  }

  afterUpdate() {
    console.log(this.getAttribute('type'));
  }

}

```
