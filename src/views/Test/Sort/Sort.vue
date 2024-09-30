<template>
  <div class="sort-container">
    <VueDraggable v-model="list" ghostClass="ghost" target=".sort-target">
      <TransitionGroup
        type="transition"
        tag="ul"
        name="fade"
        class="draggable-container sort-target"
        :style="{ color: 'red' }"
      >
        <li v-for="item in list" :key="item.id">
          {{ item.name }}
        </li>
      </TransitionGroup>
    </VueDraggable>
    <preview-list :list="list" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [
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
      }
    ]
  },
  style: {
    type: Object,
    default: () => {
      display: 'flex'
    }
  }
})
const emit = defineEmits(['update:modelValue'])
const list = ref(props.modelValue)
watch(
  () => list.value,
  (val) => {
    console.log('双向通信')
    emit('update:modelValue', val)
  }
)
</script>

<style lang="less" scoped>
.draggable-container {
  // display: flex;
  flex-wrap: wrap;

  li {
    // border: 1px solid red;
    background-color: #6b72800d;
    margin: 0 10px;
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
