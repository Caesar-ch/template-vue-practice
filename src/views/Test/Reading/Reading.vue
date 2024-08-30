<template>
    <!-- 阅读材料 -->
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div v-for="(part, index2) in line" :key="index2">
          <span class='text'  v-if="part.type === 'text'">
              <br v-if="compare(part.content)">
              <p v-else>{{ part.content }} </p>
          </span>
          <div v-if="part.type === 'reading-text-img'">
            <img :title="part.img.name " src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_04_reading_ch_01/reading.png?1724929742215" alt="" srcset="">
          </div>
      </div>
    </div>
    <!-- 题目部分 -->
</template>

<script setup>
import { ref, computed } from 'vue';
import data1 from '../../../../practice/Reading.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
  tag: data1.readingText.content,
  config: data1.readingText.configs,
  type: 'reading-text'
})

const compare = (text1) => {
  return text1 === '&nbsp;'
}
const data = ref({})
</script>

<style lang="less" scoped>
.item {
  display: flex;
  white-space: pre-line;
}
.text {
  p {
    white-space: break-spaces;
    word-break: auto-phrase;
    text-align: left;
    text-indent: 20px;
    margin-bottom: 0;
  }
}
.input {
  width: 50px;
  margin: 0 4px;
}
img {
  width: 100px;
  height: 100px;
}
</style>