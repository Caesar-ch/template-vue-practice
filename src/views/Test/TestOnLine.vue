<template>
  <div class="line">
    <section>
      <!-- 根据题型渲染不同的题目组件 -->
      <component
        :is="currentQuestionComponent"
        :question="currentQuestion"
        @answer="handleAnswer"
      />
    </section>
    <footer>
      <!-- 下一题的提交按钮 -->
      <van-button @click="handleNextQuestion" type="primary">下一题</van-button>
      <van-button>交卷</van-button>
    </footer>
    <div>
      {{ JSON.stringify(currentQuestion) }}
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'

import { questions as data } from './data'
import Listening from './Listening/Listening.vue'
import Writing from './Writing/Writing.vue'
import Sort from './Sort/Sort.vue'
import SortTwo from './Sort/SortTwo.vue'
import Select from './Select/Select.vue'
import Gap from './Gap/Gap.vue'
import SingleSelect from './SingleSelect/SingleSelect.vue'
import DropDown from './DropDown/DropDown.vue'
import ImageAndGap from './ImageAndGap/ImageAndGap.vue'

import ImageAndDropdown from './ImageAndDropdown/ImageAndDropdown.vue'

import Reading from './Reading/Reading.vue'
import ListeningTest from './ListeningTest/ListeningTest.vue'
import SingleLetter from './SingleLetter/SingleLetter.vue'
import WritingTest from './WritingTest//WritingTest.vue'
import Quiz from './Quiz/Quiz.vue'

const currentQuestion = ref({})

const handleAnswer = (answer) => {
  console.log('answer', answer)
}

const currentIndex = ref(1)
currentQuestion.value = data[currentIndex.value]
const currentQuestionComponent = computed(() => {
  switch (currentQuestion.value.type) {
    case 'listening':
      return Listening
    case 'writing':
      return Writing
    case 'sort':
      return Sort
    case 'sort-two':
      return SortTwo
    case 'select':
      return Select
    case 'gap':
      return Gap
    case 'single-choice':
      return SingleSelect
    case 'dropdown':
      return DropDown
    case 'image-and-gap':
      return ImageAndGap
    case 'image-and-dropdown':
      return ImageAndDropdown
    case 'reading':
      return Reading
    case 'listening-test':
  }
})
// 1、处理数据的函数，根据处理的结果computed计算出类型

// 2、根据类型渲染不同的组件
const handleNextQuestion = () => {
  currentIndex.value++
  currentQuestion.value = data[currentIndex.value]
}
</script>
