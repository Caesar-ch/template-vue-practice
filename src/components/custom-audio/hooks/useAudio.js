import { ref, onBeforeUnmount, reactive } from "vue";

const useAudio = (options) => {
  const currentTime = ref(0);
  const totalDuration = ref(0);

  const end = ref(false)

  // 动态创建音频元素
  let audioPlayer = new Audio(options.url);
  // 设置循环播放
  // audioPlayer.loop = true
  // 播放音频
  function playAudio() {
      audioPlayer.play();
  }

  // 暂停音频
  function pauseAudio() {
      audioPlayer.pause();
  }

  // 切换循环播放
  function toggleLoop() {
      audioPlayer.loop = !audioPlayer.loop;
  }


  // 拖动进度条，播放指定位置
  function playAppointLocation(timestamp) {
      audioPlayer.currentTime = timestamp;
  }


  audioPlayer.addEventListener("canplaythrough", (event) => {
    
    // 音频可以播放；如果权限允许则播放
    // 需要首先交互了才能进行播放，否则会报错
    // audioPlayer.play();
  });

  // 获取当前时间和总时长
  audioPlayer.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    if(!audioPlayer) return // 销毁的瞬间会触发，所以需要判断，防止报错
    currentTime.value = Math.floor(audioPlayer.currentTime);
  });


  audioPlayer.addEventListener('loadedmetadata', () => {
    if(!audioPlayer) return
    totalDuration.value = Math.floor(audioPlayer.duration);
  });


  // 监听播放状态，需要切换控件状态
  audioPlayer.addEventListener("ended", (event) => {
    // 播放结束
    console.log('watch ended');
    // TODO需要切换控件状态
    end.value = true
  });


  audioPlayer.addEventListener("play", (event) => {
    
    console.log('watch play');
    
    end.value = false
  });


  onBeforeUnmount(() => {
    console.log('beforeUnmount, 销毁音频播放器实例');
    audioPlayer.pause();
    audioPlayer = null
  })
  return reactive({
    audioPlayer,
    currentTime,
    totalDuration,
    end,
    playAudio,
    pauseAudio,
    toggleLoop,
    playAppointLocation
  })
}
export default useAudio;