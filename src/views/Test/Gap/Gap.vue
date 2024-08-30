<template>
  <div>
    <div class="item"  v-for="(item, index) in arr" :key="index">
      <div  v-for="(item2, index2) in item" :key="index2">
        <span class='text'  v-if="item2.type === 'text'">
          <br v-if="compare(item2.content)">
          <span v-else>{{ item2.content }} </span>
        </span>
        <input class='input' v-if="item2.type === 'gap'" :value="item2.content" @input="(e) => data[item2.index] = e.target.value" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import data1 from '../../../../practice/gab.json'
const fn = require('../../../../practice/parseTagToText')

const arr1 = [
[
    { type: 'text', content: 'A Jamie,' },
    { type: 'gap', index: 0 },
    { type: 'text', content: ' you ' },
    { type: 'gap', index: 1 },
    { type: 'text', content: ' a cat?' }
  ],
  [
    { type: 'text', content: 'B  No, I ' },
    { type: 'gap', index: 2 },
    { type: 'text', content: ' a cat. I ' },
    { type: 'gap', index: 3 },
    { type: 'text', content: ' a dog.' }
  ],
  [
    { type: 'text', content: 'I' },
    { type: 'gap', index: 0 },
    { type: 'text', content: ' sad. I’m happy.' }
  ],
  [
    { type: 'text', content: 'My friend Thomas ' },
    { type: 'gap', index: 1 },
    { type: 'text', content: ' 11. He’s 12.' }
  ],
  [
    { type: 'text', content: 'My pencil case ' },
    { type: 'gap', index: 2 },
    { type: 'text', content: ' green. It’s orange.' }
  ],
  [
    { type: 'text', content: 'My books are on my desk. They ' },
    { type: 'gap', index: 3 },
    { type: 'text', content: ' in my school bag.' }
  ],
  [
    { type: 'text', content: 'My friends and I are at school. We ' },
    { type: 'gap', index: 4 },
    { type: 'text', content: ' at home.' }
  ],
  [
    { type: 'text', content: 'Carla is my friend. She ' },
    { type: 'gap', index: 5 },
    { type: 'text', content: ' my ' },
    { type: 'gap', index: 6 },
    { type: 'text', content: 'teacher.' }
  ],
]
const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'gap'
})
const data = ref([])

const compare = (text1) => {
  return text1 === '&nbsp;'
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
  white-space: pre-line;
}
.text {
  white-space: nowrap;
}
.input {
  width: 50px;
  margin: 0 4px;
}
</style>