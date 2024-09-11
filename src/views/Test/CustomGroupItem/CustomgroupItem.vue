<template>
  <div>
    <div class="item" v-for="(line, index2) in arr" :key="index2">
      <div v-for="(part, index2) in line" :key="index2">
        <template v-if="part.type === 'custom-group-item'">
          <template v-for="small_line in part.content">
            <template v-if="small_line">
              <template v-for="small_part in small_line">
                <div v-if="small_part.type === 'image'">
                  <img
                    :style="{ width: '100px', height: '100px' }"
                    src="https://helbling-ezone.com/exercises/options/level_1/options_1-options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_vocabulary_02_ch_01/black.png"
                    alt=""
                    srcset=""
                  />
                </div>
                <span class="text" v-if="small_part.type === 'text'">
                  <br v-if="compare(small_part.content)" />
                  <span v-else>{{ small_part.content }} </span>
                </span>
                <input
                  class="input"
                  v-if="small_part.type === 'gap'"
                  @input="(e) => (data[part.index] = e.target.value)"
                />
                <template v-if="small_part.type === 'dropdown'">
                  <el-select
                    v-model="data[part.index]"
                    placeholder=""
                    style="width: 100px"
                  >
                    <el-option
                      v-for="option in small_part.option"
                      :key="option"
                      :label="option"
                      :value="option"
                    />
                  </el-select>
                </template>
              </template>
            </template>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import data1 from '../../../../practice/customGroupImageDropdown.json'
import data2 from '../../../../practice/customGroupImageGap.json'

const props = defineProps({
  questions: {
    type: Array,
    require: true,
    default: () => []
  },
  initData: {
    type: Object,
    require: true,
    default: () => {}
  }
})

const fn = require('../../../../practice/parseTagPlus.js')
const arr = fn.parseTagToText({
  tag: data2.sequences[0].parts[0],
  config: data2.sequences[0].configs
})

const compare = (text1) => {
  return text1 === '&nbsp;'
}
const data = ref({ ...props.initData })

const getValue = () => {
  return { ...data.value }
}

defineExpose({
  getValue
})
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
  border-radius: 4px;
  border-color: rgb(36, 36, 36);
  box-sizing: border-box;
  &:hover {
    border-bottom: 2px solid #03787c;
  }
}
</style>
