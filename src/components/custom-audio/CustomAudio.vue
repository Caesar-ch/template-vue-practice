<template>
  <div class="custom-audio-wrapper">
      <!-- 进度条 -->
      <header class="custom-audio-progress">
        <van-slider v-model="progress" @change="onSliderChange" active-color="#3a9cff" :disabled="disabledSlider"/>
      </header>
      <!-- 进度文本 -->
      <div class="custom-audio-text">
        <span class="current-progress-text">{{ current_progress_text }}</span>
        <span class="total-progress-text">{{ total_progress_text }}</span>
      </div>
      <!-- 控制按钮 -->
      <main class="custom-audio-controls">
        <van-icon class="backup-icon text" @click="onBackup" name="replay" size="50"/>
        <van-icon :name="showControlsIcon" @click="onSwitchControlsStatus" size="50" />
        <van-icon class="forward-icon text" @click="onForward" name="replay"  size="50"/>
      </main>
  </div>
</template>

<script lang="js" setup>
import { computed, ref, watch } from 'vue';
import useAudio from './hooks/useAudio'
import { formatTime } from './utils/utils'

const props = defineProps({
  audioSrc: {
    type: String,
    default: ''
  },
  disabledSlider: {
    type: Boolean,
    default: false
  }
})
const AudioInstance = useAudio({url: props.audioSrc})
const progress = ref(0)

// 想要使用computed进行监听响应式，需要将该变量放到ui中，否则可能造成，这个变量的变化滞后，即会在下一次tick执行
// const onProgressing = computed(() => {
//   progress.value = AudioInstance.currentTime / AudioInstance.totalDuration * 100
//   console.log('progress', progress.value);
//   return progress.value
// })
// watch会执行更加顺利，且在一次ui更新的操作中，在一次tick中 watch会执行一次，但是computed可能不会执行，甚至放到下一次tick中执行
const onProgressing = watch(()=> AudioInstance.currentTime, (newVal, oldVal) => {
  progress.value = newVal / AudioInstance.totalDuration * 100
  console.log('progress', progress.value);
})
const current_progress_text = computed(() => {
  return formatTime(AudioInstance.currentTime)
})
const total_progress_text = computed(() => {
  return formatTime(AudioInstance.totalDuration)
})
const controls_status = ref('pause') // play pause
// 播放暂停图标切换
const showControlsIcon = computed(() => {
    if(controls_status.value === 'play') {
        return 'pause-circle-o'
    } else {
        return 'play-circle-o'
    }
})
// 播放暂停状态切换函数 //TODO 改成watch，切第一次不触发的watchEffect
const onSwitchControlsStatus = () => {
    if(controls_status.value === 'play') {
        controls_status.value = 'pause'
        AudioInstance.pauseAudio()
    } else {
        controls_status.value = 'play'
        AudioInstance.playAudio()
    }
}

// 进度条滑动事件 自带防抖 只执行最后一次
const onSliderChange = (value) => {
  console.log('当前值：' + value);
  const timestamp = AudioInstance.totalDuration * value / 100
  AudioInstance.playAppointLocation(timestamp)
}

// 前进后退事件
const onBackup = () => {
  AudioInstance.playAppointLocation(AudioInstance.currentTime - 10)
}
const onForward = () => {
  AudioInstance.playAppointLocation(AudioInstance.currentTime + 10)
}

// 监听音频播放结束，更改控件状态
const onPlayEnd = watch(() => AudioInstance.end,(newVal, oldVal) => {
  if(newVal) {
    controls_status.value = 'pause'
  }
  console.log('end?', newVal, oldVal);
})
</script>

<style lang="less" scoped>
.custom-audio {
  &-wrapper {
    margin-top: 100px;
    // border: 1px solid red;
    height: 200px;
  }
  &-text {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px 0;
  }
  &-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    .backup-icon {
      font-size: 50px;
      rotate: 180deg;
      transform: scaleY(-1); // 镜像反转
    }
    i {
      position: relative;
      margin: 0 20px;
    }
    .text::after {
      content: '10';
      font-size: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .backup-icon::after {
        transform: translate(-50%, -50%) scaleX(-1);; // 镜像反转
    }
  }

}
</style>