/**
 * @description this is a common component hook
 * @author 阿怪
 * @date 2023/2/10 11:35
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */

export function useBaseComponent() {
  const getTemplate = () => {
    return <div class="m-component"></div>;
  };


  return {
    options: { props: {}, style: '' },
    getTemplate
  };
}

export function useValuePropComponent() {
  const getTemplate = (options: { props: { id: string } }) => {
    const props = options.props;
    return <div id={props.id} class="m-component"></div>;
  };
  return {
    options: { props: {}, style: '' },
    getTemplate
  };
}


export function useEventPropComponent() {
  const getTemplate = (options: {
    events: {
      onClick: (e: MouseEvent) => void
    }
  }) => {
    const event = options.events;
    return <div onClick={event?.onClick}></div>;
  };
  return {
    options: { props: {}, style: '' },
    getTemplate
  };
}


export function useChildrenComponent(){
  const getTemplate = () => {
    return <div><slot></slot></div>;
  };
  return {
    options: { props: {}, style: '' },
    getTemplate
  };
}
