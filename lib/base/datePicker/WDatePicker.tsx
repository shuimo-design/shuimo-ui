/**
 * @description 日期选择组件
 * @author youus
 * @date 2022/1/22 9:23 PM
 * @version v1.0.1
 *
 * Hello, humor
 * v1.0.1 边框样式改为使用边框组件
 */
import { defineComponent, watch, Teleport, onMounted, Transition } from 'vue';
import { valueFormatByType } from '../../dependents/_utils/dateUtil';
import { useDatePicker } from './uesDatePicker';
import WBorder from '../../other/border/WBorder';
import { props } from "./api";
import CalendarDropdown from "./basic/CalendarDropdown";

export default defineComponent({
  name: 'WDatePicker',
  props,
  emits: ['change', 'update:modelValue'],
  setup(props, { emit }) {
    const datePickHook = useDatePicker(props, emit);
    const {
      defaultValue,
      date,
      currentView,
      selectRef,
      showCalendar
    } = datePickHook;
    watch(() => props.modelValue, () => setDefaultValue());

    const setDefaultValue = () => {
      defaultValue.value = valueFormatByType(props.modelValue, props.type);
      date.value = (props.modelValue && new Date(props.modelValue)) || new Date();
      if (props.type === 'month') {
        currentView.value = 'month';
      }
    };

    onMounted(() => {
      setDefaultValue();
    });


    return () => (
      <WBorder class="w-date-picker">
        <div class="w-date-picker-div w-cursor-pointer w-input-inner" ref={selectRef} onClick={showCalendar}>
          <span>{defaultValue.value || props.placeholder}</span>
          <div class="calendar-icon w-cursor-pointer"/>
          <Teleport to="body">
            <Transition name="w-opacity">
              <CalendarDropdown datePickHook={datePickHook}/>
            </Transition>
          </Teleport>
        </div>
      </WBorder>
    )
  }
})
