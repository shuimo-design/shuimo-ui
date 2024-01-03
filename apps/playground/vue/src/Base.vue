<template>
  <div class="flex">

    <div class="hidden" v-if="false">
      <div class="avatar">
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4"/>
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4" variant="square"/>
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4" size="large"/>
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4" variant="square" size="large"/>
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4" size="small"/>
        <m-avatar img="https://avatars.githubusercontent.com/u/9988024?v=4" variant="square" size="small"/>
      </div>
      <div class="list">
        <m-list :data="stringList"/>
        <m-list :data="dataList">
          <template #default="{data}">
            <span>title:{{ data.title }}</span>
          </template>
        </m-list>
      </div>
      <div class="li">
        <m-li>hi</m-li>
        <m-li active>active li</m-li>
      </div>
      <div class="tag">
        <m-tag>hi</m-tag>
        <m-tag>primary</m-tag>
        <m-tag type="primary">primary</m-tag>
        <m-tag type="error">error</m-tag>
        <m-tag type="confirm">confirm</m-tag>
        <m-tag type="warning">warning</m-tag>
      </div>
      <div class="switch">
        <span>参数值为：{{ switchValue }}</span>
        <m-switch v-model="switchValue"/>
        <m-switch v-model="switchValue" loading/>
        <m-switch v-model="switchValue" disabled/>
      </div>
      <div class="radio">
        <span>radio:{{ radioVal }}</span>
        <br/>

        <m-radio v-model="radioVal" :label="radioLabel" name="hi" :value="radioLabel"/>
        <m-radio label="2" name="hi" value="2"/>
        <m-radio label="3" name="hi" value="2"/>
      </div>
      <div class="checkbox">
        <m-progress :value="20"/>
        <m-progress :value="44" show-info/>
        <m-progress :value="44" show-info>44</m-progress>

        <span>{{ checkboxVal }}</span>
        <br/>
        <m-checkbox/>
        <m-checkbox disabled></m-checkbox>
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
      </div>
      <div class="input">
        <span>{{ inputValue }}</span>
        <br/>
        <m-input v-model="inputValue"></m-input>
        <m-input readonly v-model="inputValue"></m-input>
        <m-input disabled v-model="inputValue"></m-input>
        <m-input type="textarea"></m-input>
      </div>
      <div class="button">
        <m-button @click="buttonClick" class="button-event">你好</m-button>
        <m-button type="error">error</m-button>
        <m-button type="primary">primary</m-button>
        <m-button type="confirm">confirm</m-button>
        <m-button type="warning">warning</m-button>
        <m-button link>link</m-button>
        <m-button @click="buttonClick" class="button-event" disabled>disabled</m-button>
        <m-button text="text！"></m-button>
      </div>
      <div class="select">
        <div>{{ value }}</div>
        <div>{{ emitValue }}</div>
        <div>{{ value2 }}</div>
        <m-select v-model="value" :options="['子', '丑', '寅', '卯']" :readonly="false" :filter="customFilter2"/>
        <m-select v-model="emitValue" :options="emitOptions" input-param="inputParam" value-param="value"/>
        <m-select v-model="value2" :options="options2" multiple :readonly="false"/>
        <m-select multiple :readonly="false" :options="testOptions" v-model="testValue" :filter="customFilter"/>

      </div>

      <div class="date-picker">
        <m-date-picker/>
        <span>{{ date }}</span>
        <m-date-picker v-model="date"/>
        <m-date-picker v-model="date" type="month"/>
      </div>

      <div class="checkbox-group">
        <span>{{ checkboxGroup }}</span>
        <m-checkbox-group v-model="checkboxGroup">
          <m-checkbox label="1" :value="1"/>
          <m-checkbox label="2" :value="2"/>
          <m-checkbox label="3" :value="3"/>
          <m-checkbox label="4" :value="4"/>
        </m-checkbox-group>
      </div>
      <MTree/>

    </div>

    <div>
      <div class="select">
        <m-tag>你好你好你好你好你好</m-tag>

        <m-tag type="primary">primary</m-tag>
        <m-tag type="error">error</m-tag>
        <m-tag type="confirm">confirm</m-tag>
        <m-tag type="warning">warning</m-tag>

        <m-tag style="--m-tag-bg:#42d392">vue2 color</m-tag>
        <m-tag style="--m-tag-bg:#646cff">vite color</m-tag>
        <m-tag class="large" style="--m-tag-bg:#646cff">large</m-tag>
      </div>
    </div>

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
import MTree from './MTree.vue';


const widthRef = ref(200);
const heightRef = ref(200);

const buttonClick = () => {
  console.log('button click');
};

const inputValue = ref('input value');

const checkboxVal = ref(true);
const checkboxValNumber = ref(1);
const checkboxObject = ref({ label: 'label', value: 'value' });
const checkboxObjectValue = ref();

const radioVal = ref('');
const radioLabel = ref('radio label');

const switchValue = ref(false);

const dataList = [
  { title: '轩辕剑', active: true },
  { title: '湛卢' },
  { title: '赤霄' }
];

const stringList = ['轩辕剑', '湛卢', '赤霄'];

const value = ref('子');

const emitValue = ref();
const emitOptions = [
  { title: 'option1', value: 1, inputParam: 'input1', value2: 4 },
  { title: 'option2', value: 2, inputParam: 'input2', value2: 5 },
  { title: 'option3', value: 3, inputParam: 'input3', value2: 6 },
  { title: 'option4', value: 4, inputParam: 'input4', value2: 7 }
];

const options2 = ['子', '丑', '寅', '卯'];
const value2 = ref(['寅', '丑']);

const optionsMore = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const optionsMoreRef = ref([...optionsMore]);

let count = 1;
const needFetch = ref(true);
const fetchSelect = async () => {
  return new Promise(resolve => {

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

const checkboxGroup = ref([1, 3]);

const inputNumberRef = ref(1);

const progressValueRef = ref(0);
setInterval(() => {
  progressValueRef.value += 1;
  if (progressValueRef.value > 100) {
    progressValueRef.value = 0;
  }
}, 100);


const sliderRef = ref(0);
const slider2Ref = ref(0);


</script>

<style scoped>

.hidden {
  display: none;
}

.avatar {
  display: flex;
}

.large{
  --m-tag-h: 200px;
  --m-tag-w-min: 400px;
}
</style>
