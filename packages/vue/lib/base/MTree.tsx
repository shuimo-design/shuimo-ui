import { defineComponent, h, resolveComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/base/tree/api';
import {useTree} from "@shuimo-design/core/lib/base/tree/useTree";
import {TreeNodeData} from "@shuimo-design/core/lib/base/tree";

export default defineComponent({
  name: 'MTree',
  props,
  setup: (props, { slots }) => {
    const { getTreeNodeData, getTree, handleToggleExpand} = useTree(props)

    return () => {
      const data= getTreeNodeData()
      const { key, label, value, children } = props.config
      return <div>
        {
          data.map((d, id) => {
            const childData: TreeNodeData[] = Reflect.get(d, children) ?? []
            const MTree = resolveComponent('MTree')
            return <div onClick={(e) => handleToggleExpand(d, e)}>
              <div>{ d[label]}={d.expand.toString()}</div>
              {
                (childData.length > 0 && d?.expand === true) && h(MTree, {
                  data: childData,
                  config: props.config,
                  style: {
                    marginLeft: `${id + 30}px`,
                  }
                })
              }
            </div>
          })
        }
      </div>;
    };
  }
});
