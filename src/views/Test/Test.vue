<template>
  <div class="test-container">
    <header>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="listening" name="first">
          <Listening />
        </el-tab-pane>
        <el-tab-pane label="Writing" name="second">
          <Writing />
        </el-tab-pane>
        <el-tab-pane label="Sort" name="third">
          <Sort v-model="list" />
          <!-- <SortTwo/> -->
        </el-tab-pane>
        <el-tab-pane label="Task" name="fourth">
          <Select> </Select>
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="Gap" name="five">
          <Gap />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="SingleSelect" name="six">
          <SingleSelect />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="DropDown" name="seven">
          <DropDown />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="ImageAndGap" name="eight">
          <ImageAndGap />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="ImageAndDropdown" name="nine">
          <ImageAndDropdown />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="Reading" name="ten">
          <Reading />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="ListeningTest" name="eleven">
          <ListeningTest />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="SingleLetter" name="twelve">
          <SingleLetter />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="WritingTest" name="thirteen">
          <WritingTest />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="Quiz" name="fourteen">
          <Quiz />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="line" name="fifteen">
          <Online />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
        <el-tab-pane label="CustomGroupItem" name="sixteen">
          <CustomGroupItem />
          <!-- <div v-for="item in list" :key="item.id">{{item.name}}</div> -->
        </el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import Listening from './Listening/Listening.vue'
import Writing from './Writing/Writing.vue';
import Sort from './Sort/Sort.vue';
import SortTwo from './Sort/SortTwo.vue';
import Select from './Select/Select.vue';
import Gap from './Gap/Gap.vue';
import SingleSelect from './SingleSelect/SingleSelect.vue';
import DropDown from './DropDown/DropDown.vue';
import ImageAndGap from './ImageAndGap/ImageAndGap.vue';

import ImageAndDropdown from './ImageAndDropdown/ImageAndDropdown.vue';
import CustomGroupItem from './CustomGroupItem/CustomgroupItem.vue';

import Reading from './Reading/Reading.vue';
import ListeningTest from './ListeningTest/ListeningTest.vue'
import SingleLetter from './SingleLetter/SingleLetter.vue'
import WritingTest from './WritingTest//WritingTest.vue'
import Quiz from './Quiz/Quiz.vue'

import Online from './TestOnLine.vue'

const activeName = ref('sixteen')
const handleClick = (tab, event) => {
    console.log(tab, event)
}
const list = ref([
      {
        name: 'Joao1',
        id: 1
      },
      {
        name: 'Jean2',
        id: 2
      },
      {
        name: 'Johanna3',
        id: 3
      },
      {
        name: 'Juan4',
        id: 4
      },
      {
        name: 'Jorge5',
        id: 5
      },
      {
        name: 'Jorge6',
        id: 6
      },
      {
        name: 'Jorge7',
        id: 7
      },
      {
        name: 'Jorge8',
        id: 8
      },
      {
        name: 'Jorge9',
        id: 9
      },
      {
        name: 'Jorge10',
        id: 10
      },
    ])
</script>

<style lang="less" scoped></style>
