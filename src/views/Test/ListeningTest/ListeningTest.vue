<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div  v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'listening'">
          <div class="listening-container"> 
            <Listening />
          </div>
          <!-- {{ part }} -->
          <!-- <img :style="{width: '100px', height: '100px'}" src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_vocabulary_01_ch_01/five.png" alt="" srcset=""> -->
        </template>
        <template v-if="part.type === 'text'">
          <div v-for="small_line in part.content">
            <template v-for="small_part in small_line">
              <span class='text'  v-if="small_part.type === 'text'">
                <br v-if="compare(small_part.content)">
                <span v-else>{{ small_part.content }} </span>
              </span>
              <template v-if="small_part.type === 'dropdown'">
                  <el-select
                    v-model="data[small_part.index]"
                    placeholder=""
                    style="width: 100px"
                  >
                    <el-option
                      v-for="option in small_part.option"
                      :key="option.content"
                      :label="option.content"
                      :value="option.content"
                    />
                  </el-select>
              </template>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Listening from '../Listening/Listening.vue'

import data1 from '../../../../practice/Listening.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
  tag: data1.sequences[0].parts[0],
  config: data1.sequences[0].configs,
  staticConfigs: data1.sequences[0].staticConfigs,
  type: 'listening'
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