<template>
  <div>
    <div class="item"  v-for="(item, index) in arr" :key="index">
      <div  v-for="(item2, index2) in item" :key="index2">
        <van-radio-group v-model="data[item2.index]">
          <van-radio v-for="(item3, index3) in item2.option" :name="index3">
            <span class='text'  v-if="item3.type === 'text'">
              <br v-if="compare(item3.content)">
              <span v-else>{{ item3.content }} </span>
            </span>
          </van-radio>
        </van-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import data1 from '../../../../practice/single-choice.json'
const fn = require('../../../../practice/parseTagToText')

const arr = fn.parseTagToText({
    tag: data1.sequences[0].parts[0],
    config: data1.sequences[0].configs,
    type: 'single-choice'
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