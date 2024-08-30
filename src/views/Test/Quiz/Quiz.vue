<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div  v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'quiz'">
          <p class='text'>
              <br v-if="compare(part.question)">
              <p v-else>{{ part.question }} </p>
          </p>
          <p>
            <van-radio-group v-model="data[part.index]" direction="horizontal">
              <van-radio v-for="option in part.answerOption" :name="option">{{ option }}</van-radio>
            </van-radio-group>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Writing from '../Writing/Writing.vue'

import data1 from '../../../../practice/quiz.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
  tag: data1.sequences[0].parts[0],
  config: data1.sequences[0].configs,
  staticConfigs: data1.sequences[0].staticConfigs,
  type: 'quiz'
})
const data = ref([])

const compare = (text1) => {
  return text1 === '&nbsp;'
}
</script>

<style lang="less" scoped>
.item {
  display: flex;
}
.gap-line {
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
.listening-container {
  position: fixed;
  left: 0;
  bottom: 10px;
  width: 100%;
}
</style>