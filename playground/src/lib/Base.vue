<template>
  <div class="flex">
    <ComponentsWrap name="Avatar">
      <div class="avatar">
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4"/>
        <m-avatar
          img="https://avatars.githubusercontent.com/u/9988024?v=4"
          variant="square"
        />
        <m-avatar
          img="https://avatars.githubusercontent.com/u/9988024?v=4"
          size="large"
        />
        <m-avatar
          img="https://avatars.githubusercontent.com/u/9988024?v=4"
          variant="square"
          size="large"
        />
        <m-avatar
          img="https://avatars.githubusercontent.com/u/9988024?v=4"
          size="small"
        />
        <m-avatar
          img="https://avatars.githubusercontent.com/u/9988024?v=4"
          variant="square"
          size="small"
        />
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="List">
      <div class="list">
        <m-list :data="stringList"/>
        <m-list :data="dataList">
          <template #default="{ data }">
            <span>title:{{ data.title }}</span>
          </template>
        </m-list>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Li">
      <div class="li">
        <m-li>hi</m-li>
        <m-li active>active li</m-li>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Tag">
      <div class="tag">
        <m-tag>你好你好你好你好你好</m-tag>

        <m-tag type="primary">primary</m-tag>
        <m-tag type="primary" size="small">small</m-tag>
        <m-tag type="primary" size="large">large</m-tag>
        <m-tag type="error">error</m-tag>
        <m-tag type="confirm">confirm</m-tag>
        <m-tag type="warning">warning</m-tag>
        <m-tag style="--m-tag-bg: #42d392">vue2 color</m-tag>
        <m-tag style="--m-tag-bg: #646cff">vite color</m-tag>
        <m-tag class="large" style="--m-tag-bg: #646cff">large</m-tag>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Switch">
      <div class="switch">
        <span>参数值为：{{ switchValue }}</span>
        <m-switch v-model="switchValue"/>
        <m-switch v-model="switchValue" loading/>
        <m-switch v-model="switchValue" disabled/>
        <m-switch active-info="激活" inactive-info="关闭"/>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Radio">
      <div class="radio">
        <span>radio:{{ radioVal }}</span>
        <br/>
        <m-radio v-model="radioVal" :label="radioLabel" name="hi" :value="radioLabel"/>
        <m-radio label="2" name="hi" value="2"/>
        <m-radio label="3" name="hi" value="2"/>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Checkbox">
      <div class="checkbox">
        <br/>
        <m-checkbox/>
        <m-checkbox disabled></m-checkbox>
        <span>{{ checkboxVal }}</span>
        <m-checkbox v-model="checkboxVal"></m-checkbox>
        <m-checkbox>slot</m-checkbox>
        <m-checkbox label="label"></m-checkbox>
        <m-checkbox label="label">replace by label</m-checkbox>
        <m-checkbox :checked="true">default checked</m-checkbox>
        <br/>
        <span>checkboxValNumber:{{ checkboxValNumber }}</span>
        <br/>
        <m-checkbox v-model="checkboxValNumber" :value="1">number value 1</m-checkbox>
        <br/>
        <m-checkbox v-model="checkboxValNumber" :value="2">number value 2</m-checkbox>
        <br/>
        <span>{{ checkboxObjectValue }}</span>
        <br/>
        <m-checkbox v-model="checkboxObjectValue" :value="checkboxObject">obj value</m-checkbox>

        <div>
          disabled: {{checkboxVal}}
          <m-checkbox v-model="checkboxVal" disabled/>
          <br/>
          indeterminate: {{checkboxVal}}
          <m-checkbox v-model="checkboxVal" :indeterminate="indeterminate"/>
          <br/>
          <m-checkbox v-model="indeterminate">控制indeterminate的值:{{indeterminate}}</m-checkbox>
        </div>

<!--        <div>已选中：{{ checkboxGroupData.join('，') }}</div>-->
<!--        <m-checkbox-group v-model="checkboxGroupData">-->
<!--          <m-checkbox label="极客江湖" value="极客江湖"/>-->
<!--          <m-checkbox label="水墨组件" value="水墨组件"/>-->
<!--        </m-checkbox-group>-->

      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Input">
      <div class="input">
        <span>{{ inputValue }}</span>
        <br/>
        <m-input v-model="inputValue"></m-input>
        <m-input readonly v-model="inputValue"></m-input>
        <m-input disabled v-model="inputValue"></m-input>
        <m-input type="textarea"></m-input>
        <span>{{ inputNumberRef }}</span>
        <m-input-number v-model="inputNumberRef"/>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Button">
      <div class="button">
        <m-button @click="buttonClick" class="button-event">你好</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="confirm">confirm</m-button>
        <m-button type="warning">warning</m-button>
        <m-button link>link</m-button>
        <m-button @click="buttonClick" class="button-event" disabled>disabled</m-button>
        <m-button text="text!"></m-button>
        <m-button style="--m-button-bg-color:green;--m-button-bg-hover-color:#0a620a;">custom color</m-button>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Select">
      <div class="select">
        <div>{{ value }}</div>
        <div>{{ emitValue }}</div>
        <div>{{ value2 }}</div>
        <div>值为：{{ valueRef }}</div>
<!--        <m-select-->
<!--          v-model="valueRef"-->
<!--          input-param="after"-->
<!--          option-param="before"-->
<!--          value-param="number"-->
<!--          :options="options"-->
<!--        />-->

<!--        <m-select v-model="baseValueRef" :options="['子', '丑', '寅', '卯']"/>-->
<!--        <m-select-->
<!--          v-model="value"-->
<!--          :options="['子', '丑', '寅', '卯']"-->
<!--          :readonly="false"-->
<!--          :filter="customFilter2"-->
<!--        />-->
<!--        <m-select-->
<!--          v-model="emitValue"-->
<!--          :options="emitOptions"-->
<!--          option-param="inputParam"-->
<!--          input-param="inputParam"-->
<!--          value-param="value"-->
<!--        />-->
        <m-select
          v-model="emitValue"
          disabled
          :options="c"
          option-param="name"
          input-param="name"
          value-param="name"
        />
        <m-select
          v-model="emitValue"
          :options="c"
          option-param="name"
          input-param="name"
          value-param="name"
        />
<!--        <m-select v-model="value2" :options="options2" multiple :readonly="false"/>-->
<!--        <m-select-->
<!--          multiple-->
<!--          :readonly="false"-->
<!--          :options="testOptions"-->
<!--          v-model="testValue"-->
<!--          :filter="customFilter"-->
<!--        />-->
<!--        <div>值为：{{ valueRef }}</div>-->
<!--        <m-select-->
<!--          v-model="valueRef"-->
<!--          input-param="after"-->
<!--          option-param="before"-->
<!--          value-param="number"-->
<!--          :options="options"-->
<!--        />-->
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Slider">
      <div class="slider">
        <span>{{ sliderRef }}</span>
        <m-slider v-model="sliderRef" :min="-50" :max="50"/>

        <span>小数{{ sliderRef2 }}</span>
        <m-slider v-model="sliderRef2" :min="0" :max="1" :step="0.1"/>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="DatePicker">
      <div class="date-picker">
        <m-date-picker/>
        <span>{{ date }}</span>
        <m-date-picker v-model="date"/>
        <m-date-picker v-model="date" type="month"/>
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Collapse">
      <div class="collapse">
        <span>折叠状态：{{ collapseValue }}</span>

        <m-collapse v-model="collapseValue" @change="handleCollapseChange">
          基础折叠
          <template #content>
            <div>这是折叠的内容</div>
          </template>
        </m-collapse>
        <m-collapse v-model="collapseValue" :line="false" render-context @change="handleCollapseChange">
          基础折叠无横线，始终渲染折叠内容
          <template #content>
            <div>这是折叠的内容</div>
          </template>
        </m-collapse>
        <m-collapse v-model="collapseValue2" disabled>
          禁用的折叠
          <template #content>
            <div>这是禁用状态的折叠内容</div>
          </template>
        </m-collapse>


        <m-collapse>
          嵌套折叠1
          <template #content>
            <m-collapse>
              嵌套折叠2
              <template #content>
                <div>这是嵌套折叠的内容</div>
              </template>
            </m-collapse>
          </template>
        </m-collapse>

      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Progress">
      <div class="progress">
        <m-progress :value="20" :max="200"/>
        <m-progress :value="44" show-info/>
        <m-progress :value="progressValueRef" show-info/>

<!--        <m-progress :value="progressValueRef" show-info>-->
<!--          {{progressValueRef}}-->
<!--        </m-progress>-->
      </div>
    </ComponentsWrap>
    <ComponentsWrap name="Tree">
      <MTree/>
    </ComponentsWrap>
  </div>
</template>

<script setup lang="ts">
/**
 * @description vue playground base
 * @author 阿怪
 * @date 2023/4/21 11:19
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';
// import MTree from './components/MTree.vue';
import ComponentsWrap from '../components/ComponentsWrap.vue';

const valueRef = ref('1');
const options = [
  { before: 'b1', after: 'a1', number: '1' },
  { before: 'b2', after: 'a2', number: '2' },
  { before: 'b3', after: 'a3', number: '3' },
  { before: 'b4', after: 'a4', number: '4' },
];

const baseValueRef = ref('1');

const liActiveRef = ref(false);
const mouseEnterActive = () => {
  liActiveRef.value = true;
};
const mouseLeaveActive = () => {
  liActiveRef.value = false;
};

const widthRef = ref(200);
const heightRef = ref(200);

const buttonClick = () => {
  console.log('button click');
};

const inputValue = ref('input value');

const checkboxVal = ref(true);
const indeterminate = ref(false);
const checkboxValNumber = ref(1);
const checkboxObject = ref({ label: 'label', value: 'value' });
const checkboxObjectValue = ref();

const radioVal = ref('');
const radioLabel = ref('radio label');

const radioGroupValue = ref('bye');

const switchValue = ref(false);

const dataList = [
  { title: '轩辕剑', active: true },
  { title: '湛卢' },
  { title: '赤霄' },
];

const stringList = ['轩辕剑', '湛卢', '赤霄'];

const value = ref('子');

const emitValue = ref();
const emitOptions = [
  { title: 'option1', value: 1, inputParam: 'input1', value2: 4 },
  { title: 'option2', value: 2, inputParam: 'input2', value2: 5 },
  { title: 'option3', value: 3, inputParam: 'input3', value2: 6 },
  { title: 'option4', value: 4, inputParam: 'input4', value2: 7 },
];

const c = [
  {
    name: 'Base',
    component: [
      'Avatar',
      'Button',
      'Checkbox',
      'DatePicker',
      'Input',
      'Li',
      'List',
      'Progress',
      'Radio',
      'Select',
      'Slider',
      'Switch',
      'Tag',
      'Tree',
    ],
  },
  {
    name: 'Message',
    component: ['Confirm', 'Dialog', 'Drawer', 'Message', 'Popover', 'Tooltip'],
  },
  {
    name: 'Other',
    component: ['DarkMode', 'Divider', 'Loading'],
  },
  {
    name: 'Template',
    component: [
      'Border',
      'Breadcrumb',
      'Form',
      'Menu',
      'Pagination',
      'RicePaper',
      'Table',
      'VirtualList',
      'Layout',
    ],
  },
];

const options2 = ['子', '丑', '寅', '卯'];
const value2 = ref(['寅', '丑']);

const optionsMore = [
  '子',
  '丑',
  '寅',
  '卯',
  '辰',
  '巳',
  '午',
  '未',
  '申',
  '酉',
  '戌',
  '亥',
];
const optionsMoreRef = ref([...optionsMore]);

let count = 1;
const needFetch = ref(true);
const fetchSelect = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      optionsMoreRef.value.push(...optionsMore);
      count++;
      if (count > 2) {
        needFetch.value = false;
        console.log(needFetch.value);
      }
      resolve();
    }, 1000);
  });
};

const customFilter = (options: any, inputValue: any) => {
  return String(options) === String(inputValue);
};
const testValue = ref([1, 3]);
// const testValue = ref(undefined);
const testOptions = [1, 2, 3, 4];

const customFilter2 = (options: any, inputValue: any) => {
  return options === inputValue;
};

const date = ref(new Date());

const checkboxGroupData = ref(['极客江湖', '水墨组件']);

const inputNumberRef = ref(1);

const progressValueRef = ref(0);
setInterval(() => {
  progressValueRef.value += 1;
  if (progressValueRef.value > 100) {
    progressValueRef.value = 0;
  }
}, 100);

const sliderRef = ref(4);
const slider2Ref = ref(0);
const sliderRef2 = ref(0.1);

const collapseValue = ref(false);
const collapseValue2 = ref(false);
const handleCollapseChange = (value: boolean) => {
  console.log('折叠状态改变:', value);
};
</script>

<style scoped>
.hidden {
  display: none;
}

.avatar {
  display: flex;
}

.large {
  --m-tag-h: 200px;
  --m-tag-w-min: 400px;
}

.progress {
  display: flex;
  flex-direction: column;
}

.test-box {
  width: 300px;
  height: 200px;
  border: 1px solid black;
}

.avatar-size {
  --m-avatar-default: 200px;
}

.m-progress {
  margin: 4px 0
}

.collapse{
  width: 400px;
  border: 1px solid black;
}
</style>
