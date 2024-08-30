<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div  v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'custom-group-item'">
          <img :style="{width: '100px', height: '100px'}" src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_vocabulary_01_ch_01/five.png" alt="" srcset="">
          <div class="gap-line" v-for="small_line in part.content">
            <div v-for="small_part in small_line">
              <span class='text'  v-if="small_part.type === 'text'">
                <br v-if="compare(small_part.content)">
                <span v-else>{{ small_part.content }} </span>
              </span>
              <input class='input' v-if="small_part.type === 'gap'" @input="(e) => data[part.index] = e.target.value" />
            </div>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import data1 from '../../../../practice/customGroupImageGap.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'custom-group-item'
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