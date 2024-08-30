<template>
  <div>
    <div class="item"  v-for="(line, index) in arr" :key="index">
      <div  v-for="(part, index2) in line" :key="index2">
        <span class='text'  v-if="part.type === 'text'">
          <br v-if="compare(part.content)">
          <span v-else>{{ part.content }} </span>
        </span>
        <template v-if="part.type === 'dropdown'">
            <el-select
              v-model="data[part.index]"
              placeholder=""
              style="width: 100px"
            >
              <el-option
                v-for="option in part.option"
                :key="option.content"
                :label="option.content"
                :value="option.content"
              />
            </el-select>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import data1 from '../../../../practice/dropdown.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'dropdown'
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