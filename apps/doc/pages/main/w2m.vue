<template>
  <div class="w2m docs">

    <h1>从wash-painting-ui升级到shuimo-ui</h1>
    <m-divider/>
    <h2>为什么改名？</h2>
    <m-divider/>
    <article>
      <p>经过我们团队多次讨论、深思熟虑（大概）后，我们决定将组件更名为<code>shuimo-ui</code>。</p>

      <p>其实最早建这个项目的时候有想过这个名字，但是思来想去觉得<code>shuimo</code>这种拼音叫法不太好，</p>
    </article>

    <blockquote>"是得有个英文名吧？"</blockquote>

    <article>
      <p>于是经过一番冲浪后，犹犹豫豫得定下了<code>wash-painting</code>这个名字，可越读这玩意越觉得奇怪。</p>

      <p>也没有地道的原装英语使用者能给出好的建议。</p>

      <p>后来想改名的想法愈发强烈，但是拖延症发作一直拖到之前发现有人在使用我们的组件。</p>

      <p>于是不能再拖了。</p>

      <p>也许会不小心丢掉这些用户，但是还是想把名字给改了。</p>

      <p>占一个<code>水墨ui</code>名头也是舒服的呀。</p>
    </article>

    <h2>组件开头字母为什么是M</h2>
    <m-divider/>

    <p>我想了很多的借口，例如<code>水墨的本质还是墨</code>之类的。</p>

    <p>但是还是比不上我们讨论的时候我随手打出了<code>SButton</code>这几个字符来地刺激。</p>

    <p>加上我觉得<code>s</code>打头没有曾经的<code>w</code>或者是现在的<code>m</code>那么稳重。</p>

    <p>所以还是<code>m</code>吧，墨组件听起来也挺酷的。</p>

    <p>至于类似于饿了么的<code>SM</code>开头？🤫</p>

    <h2>快速升级</h2>
    <m-divider/>

    <p>要切换到新版本，会影响到本来地组件命名，</p>

    <p>这边我提供一个小工具，目前已经经过我们内部项目的测试，大抵上是没有问题的。</p>

    <p>可以直接阅读
      <a href="https://www.npmjs.com/package/@janghood/wash-painting-to-shuimo" target="_blank">
        wash-painting-to-shuimo的npm文档
      </a>。
    </p>

    <br/>
    <m-divider/>

    <blockquote>
      <strong>给您带来地麻烦我们深表歉意🙇</strong>
    </blockquote>

    <p>老版本的源码拉了一个单独的分支，不过大概率这个分支不再更新了，也许发现没人在用后会删除掉。</p>

  </div>
</template>

<script setup>
definePageMeta({ alias: '/w2m' });
</script>

<style scoped>

.w2m {
  line-height: 30px;
}

.m-divider, article, blockquote {
  margin-bottom: 10px;
}

code {
  color: var(--m-color-error);
  font-size: 16px;
  padding: 2px 10px;
  background: var(--m-color-background);
  border-radius: 5px;
}

blockquote {
  color: var(--m-color-text);
  background: var(--m-color-background);
  border-radius: 5px;
  padding: 0 10px;
}


</style>
