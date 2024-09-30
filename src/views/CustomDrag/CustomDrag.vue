<template>
  <div class="custom-drag">
    <div
      class="draggable"
      @mousedown="startDrag"
      :style="{ left: position.x + 'px', top: position.y + 'px' }"
    >
      可拖拽元素
    </div>
    <div class="debug-info">
      <p>位置: x: {{ position.x }}, y: {{ position.y }}</p>
      <p>正在拖拽: {{ isDragging }}</p>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'CustomDrag',
  setup() {
    const position = reactive({ x: 0, y: 0 })
    const isDragging = ref(false)
    const offset = reactive({ x: 0, y: 0 })

    const startDrag = (event) => {
      console.log('开始拖拽')
      event.preventDefault()
      isDragging.value = true
      offset.x = event.clientX - position.x
      offset.y = event.clientY - position.y
      window.addEventListener('mousemove', drag)
      window.addEventListener('mouseup', stopDrag)
    }

    const drag = (event) => {
      if (isDragging.value) {
        console.log('正在拖拽')
        position.x = event.clientX - offset.x
        position.y = event.clientY - offset.y
      }
    }

    const stopDrag = () => {
      console.log('停止拖拽')
      isDragging.value = false
      window.removeEventListener('mousemove', drag)
      window.removeEventListener('mouseup', stopDrag)
    }

    return {
      position,
      isDragging,
      startDrag,
      drag,
      stopDrag
    }
  }
}
</script>

<style scoped>
.custom-drag {
  width: 100%;
  height: 400px;
  position: relative;
  border: 1px solid #ccc;
}

.draggable {
  position: absolute;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  cursor: move;
  user-select: none;
}

.debug-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>