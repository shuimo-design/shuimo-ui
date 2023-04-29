<template>
  <div class="flex">
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
      <span>radio:{{radioVal}}</span>
      <br/>

      <m-radio v-model="radioVal" :label="radioLabel" name="hi" :value="radioLabel"/>
      <m-radio label="2" name="hi" value="2"/>
      <m-radio label="3" name="hi" value="2"/>
    </div>
    <div class="checkbox">
      <m-progress :value="20"/>
      <m-progress :value="44" show-info/>
      <m-progress :value="44" show-info>44</m-progress>

      <span>{{checkboxVal}}</span>
      <br/>
      <m-checkbox/>
      <m-checkbox disabled></m-checkbox>
      <m-checkbox v-model="checkboxVal"></m-checkbox>
      <m-checkbox>slot</m-checkbox>
      <m-checkbox label="label"></m-checkbox>
      <m-checkbox label="label">replace by label</m-checkbox>
      <m-checkbox :checked="true">default checked</m-checkbox>
      <br/>
      <span>checkboxValNumber:{{checkboxValNumber}}</span>
      <br/>
      <m-checkbox v-model="checkboxValNumber" :value="1">number value 1</m-checkbox>
      <br/>
      <m-checkbox v-model="checkboxValNumber" :value="2">number value 2</m-checkbox>
      <br/>
      <span>{{checkboxObjectValue}}</span>
      <br/>
      <m-checkbox v-model="checkboxObjectValue" :value="checkboxObject">obj value</m-checkbox>
    </div>
    <div class="input">
      <span>{{inputValue}}</span>
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

const buttonClick = () => {console.log('button click');};

const inputValue = ref('input value');

const checkboxVal = ref(true);
const checkboxValNumber =ref(1);
const checkboxObject = ref({label: 'label', value: 'value'});
const checkboxObjectValue = ref();

const radioVal = ref('');
const radioLabel= ref('radio label');

const switchValue = ref(false);


</script>

<style lang="scss" scoped>

</style>
