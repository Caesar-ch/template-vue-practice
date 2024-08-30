<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div  v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'custom-image'">
          <img :style="{width: '100px', height: '100px'}" src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_01_CH_04/unit_01_vocabulary_01_ch_04/kitchen.png?1724987012745" alt="" srcset="">
        </template>
        <template v-if="part.type === 'text'">
          <br v-if="compare(part.content)">
          <span v-else>{{ part.content }} </span>
        </template>
        <template v-if="part.type === 'single-letter'">
          <el-input v-model="data[part.index]" style="width: 80px" placeholder="" :maxlength="1"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import data1 from '../../../../practice/singleLetter.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'single-letter'
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
</style>