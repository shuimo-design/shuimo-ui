<template>
  <div class="template">
    <div v-if="false">
      <m-form @submit="submitEvent">
        <m-form-item label="在下乃输入框：" prop="input">
          <m-input/>
        </m-form-item>
        <m-form-item label="在下乃按钮：" prop="hello">
          <m-button text="点击按钮"/>
        </m-form-item>
      </m-form>


      <span>current:{{ current }}</span>
      <m-pagination :total="225" v-model="current"></m-pagination>

      <m-border v-if="false">
        <m-grid :gap="20" direction="column" class="screen">
          <m-grid :gap="5" :h="245">
            <m-cell :w="245">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell>
              <img src="../assets/right.png" alt="">
            </m-cell>
          </m-grid>
          <m-grid :gap="5" :h="162" :gapRotate="[10, 20]">
            <m-cell :w="162">
              <img src="../assets/1.png" alt="">
            </m-cell>
            <m-cell>
              <img src="../assets/3.png" alt="">
            </m-cell>
            <m-cell>
              <img src="../assets/2.png" alt="">
            </m-cell>
          </m-grid>
        </m-grid>
      </m-border>

      <div class="cell">
        <div class="buttons">
          <div class="button">
            <m-button @click="subA">-</m-button>
            <span>角A：{{ A }}</span>
            <m-button @click="addA">+</m-button>
          </div>
          <div class="button">
            <m-button @click="subB">-</m-button>
            <span>角B：{{ B }}</span>
            <m-button @click="addB">+</m-button>
          </div>
          <div class="button">
            <m-button @click="subC">-</m-button>
            <span>角C：{{ C }}</span>
            <m-button @click="addC">+</m-button>
          </div>
          <div class="button">
            <m-button @click="subD">-</m-button>
            <span>角D：{{ D }}</span>
            <m-button @click="addD">+</m-button>
          </div>

        </div>

        <div v-if="true">
          <div>
            <m-cell :a="-A" :b="B" :c="C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="-B" :c="C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="-B" :c="-C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
          </div>
          <div>
            <m-cell :a="A" :b="B" :c="C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="B" :c="C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="-B" :c="C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
          </div>
          <div>
            <m-cell :a="A" :b="-B" :c="C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="A" :b="-B" :c="-C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
          </div>
          <div>
            <m-cell :a="A" :b="B" :c="-C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="A" :b="B" :c="-C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="B" :c="-C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
          </div>
          <div>
            <m-cell :a="A" :b="-B" :c="C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="B" :c="-C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="A" :b="B" :c="C" :d="D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="-A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
            <m-cell :a="45" :b="45" :c="45" :d="45" :h="100" :w="100">
              <img src="../assets/left.png" alt="">
            </m-cell>
          </div>
        </div>

        <m-cell :a="A" :b="B" :c="C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>

      </div>
    </div>

  </div>
  <div class="cell">
    <div class="buttons">
      <div class="button">
        <m-button @click="subA">-</m-button>
        <span>角A：{{ A }}</span>
        <m-button @click="addA">+</m-button>
      </div>
      <div class="button">
        <m-button @click="subB">-</m-button>
        <span>角B：{{ B }}</span>
        <m-button @click="addB">+</m-button>
      </div>
      <div class="button">
        <m-button @click="subC">-</m-button>
        <span>角C：{{ C }}</span>
        <m-button @click="addC">+</m-button>
      </div>
      <div class="button">
        <m-button @click="subD">-</m-button>
        <span>角D：{{ D }}</span>
        <m-button @click="addD">+</m-button>
      </div>

    </div>

    <div v-if="true">
      <div>
        <m-cell :a="-A" :b="B" :c="C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="-B" :c="C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="-B" :c="-C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
      </div>
      <div>
        <m-cell :a="A" :b="B" :c="C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="B" :c="C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="-B" :c="C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
      </div>
      <div>
        <m-cell :a="A" :b="-B" :c="C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="A" :b="-B" :c="-C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
      </div>
      <div>
        <m-cell :a="A" :b="B" :c="-C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="A" :b="B" :c="-C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="B" :c="-C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
      </div>
      <div>
        <m-cell :a="A" :b="-B" :c="C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="B" :c="-C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="-A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
        <m-cell :a="A" :b="B" :c="C" :d="D" :h="100" :w="100">
          <img src="../assets/left.png" alt="">
        </m-cell>
<!--        <m-cell :a="-A" :b="-B" :c="-C" :d="-D" :h="100" :w="100">-->
<!--          <img src="../assets/left.png" alt="">-->
<!--        </m-cell>-->
<!--        <m-cell :a="45" :b="45" :c="45" :d="45" :h="100" :w="100">-->
<!--          <img src="../assets/left.png" alt="">-->
<!--        </m-cell>-->
      </div>
    </div>

    <m-cell :a="A" :b="B" :c="C" :d="-D" :h="100" :w="100" v-if="false">
      <img src="../assets/left.png" alt="">
    </m-cell>


    <m-border v-if="false">
      <m-grid :gap="20" direction="column" class="screen">
        <m-grid :gap="5" :h="245">
          <m-cell :w="245">
            <img src="../assets/left.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/right.png" alt="">
          </m-cell>
        </m-grid>
        <m-grid :gap="5" :h="162" :gapRotate="[-10, 20]">
          <m-cell :w="162">
            <img src="../assets/1.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/3.png" alt="">
          </m-cell>
          <m-cell>
            <img src="../assets/2.png" alt="">
          </m-cell>
        </m-grid>
      </m-grid>
    </m-border>

  </div>

</template>

<script setup lang="ts">
/**
 * @description
 * @author 阿怪
 * @date 2023/4/24 17:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import { ref } from 'vue';


const submitEvent = () => {
  console.log('submitEvent');
};

const current = ref(1);


const init = (base = 0) => {
  const deg = ref(base);
  const add = () => deg.value++;
  const sub = () => deg.value--;

  return [deg, add, sub];
};


const [A, addA, subA] = init(0);
const [B, addB, subB] = init(0);
const [C, addC, subC] = init(2);
const [D, addD, subD] = init(10);


</script>

<style scoped>

.template {
}

.cell-wrapper {
  height: 600px;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.screen {
  width: 500px;
  height: 728px;
}

.template-cell {
  margin-left: -58px;
}

.buttons {
  height: 150px;
}

.button .m-button {
  margin: 0 4px;
}

.button span {
  display: inline-block;
  width: 100px;
  text-align: center;
}

</style>
