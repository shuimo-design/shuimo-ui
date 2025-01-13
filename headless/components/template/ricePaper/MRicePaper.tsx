/**
 * @description
 * @author 阿怪
 * @date 2024/10/9 00:44
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { defineComponent } from 'vue';
import './ricePaper.css';


export default defineComponent((_,{slots})=>{
  return ()=>{


    return <div class="m-rice-paper">
      {slots.default?.()}
    </div>

  }
},{
  name: 'MRicePaper',
})
