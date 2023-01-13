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
import MBorder from '../../other/border/MBorder';
import { props } from './api';
import CalendarDropdown from './basic/CalendarDropdown';

export default defineComponent({
  name: 'MDatePicker',
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
      <MBorder class="m-date-picker">
        <div class="m-date-picker-div m-cursor-pointer m-input-inner" ref={selectRef} onClick={showCalendar}>
          <span>{defaultValue.value || props.placeholder}</span>
          <div class="calendar-icon m-cursor-pointer"/>
          <Teleport to="body">
            <Transition name="m-opacity">
              <CalendarDropdown datePickHook={datePickHook}/>
            </Transition>
          </Teleport>
        </div>
      </MBorder>
    );
  }
});
