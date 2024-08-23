<template>
  <div class="writing-container">
      <van-floating-panel :height="height" :content-draggable="true" :anchors="anchors">
          <van-field
              v-model="message"
              rows="5"
              autosize
              type="textarea"
              placeholder="请输入留言"
              :border="false"
          />
      </van-floating-panel>
      <div class="bottom-btn">
          <van-button class="btn"  hairline round type="success">Submit</van-button>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const anchors = [
      100,
      Math.round(0.4 * window.innerHeight),
      Math.round(0.5 * window.innerHeight),
      Math.round(0.6 * window.innerHeight),
      Math.round(0.7 * window.innerHeight),
      Math.round(0.9 * window.innerHeight),
];
const height = ref('30%')

const message = ref('This includes being punctual, completing tasks to the best of my ability, and treating others with respect. In addition, I strive to be a good role model for those around me by demonstrating honesty, integrity, and kindness in all that I do.')


</script>

<style lang="less" scoped>
.writing-container {
  position: relative;
  max-height: 80%;
  .bottom-btn {
    position: fixed;
    background-color: white;
    width: 100%;
    display: flex;
    z-index: 9999;
    bottom: 0px;
    padding-bottom: 10px;
    left: 0;
    .btn {
      flex: 1;
      margin: 0 10px;
    }
  }
}
.van-floating-panel {
  border-top: 1px solid red;
  // padding-bottom: 180px;
  // position: relative;
  :deep(.van-floating-panel__content) {
    padding-bottom: 180px;
  }
}
</style>