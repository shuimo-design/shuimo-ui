import { defineComponent, h, resolveComponent } from 'vue';
import { props } from '@shuimo-design/core/lib/base/tree/api';
import {useTree} from "@shuimo-design/core/lib/base/tree/useTree";
import {TreeNodeData} from "@shuimo-design/core/lib/base/tree";
import MCheckbox from "./checkbox/MCheckbox";

export default defineComponent({
  name: 'MTree',
  props,
  components: {
    MCheckbox
  },
  setup: (props, { slots }) => {
    const { getTreeNodeData, handleToggleExpand} = useTree(props)

    const handleCheckbox = (...args: any[]) => {
      console.log(args)
    }

    return () => {
      const data= getTreeNodeData()
      const { key, label, value, children } = props.config
      return <div>
        {
          data.map((d, id) => {
            const childData: TreeNodeData[] = Reflect.get(d, children) ?? []
            const MTree = resolveComponent('MTree')
            return <div onClick={(e) => handleToggleExpand(d, e)}>
              <div>
                <MCheckbox v-model={d.checked} onClick={(e) => e.stopPropagation()} />
                { d[label]}={d.expand.toString()}</div>
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
