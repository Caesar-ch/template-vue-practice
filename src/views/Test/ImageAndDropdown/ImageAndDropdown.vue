<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'custom-group-item'">
          <img :style="{width: '100px', height: '100px'}" src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_vocabulary_02_ch_01/black.png" alt="" srcset="">
          <div class="dropdown-line" v-for="small_line in part.content">
            <div v-for="small_part in small_line">

              <el-select
                v-model="data[part.index]"
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
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import data1 from '../../../../practice/customGroupImageDropdown.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'custom-group-item'
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
  white-space: nowrap;
}
.input {
  width: 50px;
  margin: 0 4px;
}
</style>