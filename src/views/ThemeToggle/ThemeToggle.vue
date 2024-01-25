<template>
    <!-- <div class="theme-toggle" :class="{ dark: theme === 'dark' }"> -->
    <div class="theme-toggle">
        <button class="btn" @click="toggleTheme">切换主题</button>
        <div class="bg">
            bg
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
// 1. 使用切换class来实现，在首评会加载全部css文件，会牺牲首评渲染效率
// 2. 使用动态改变link来实现按需加载，会提升首评渲染效率，但若文件很大，在js切换过程中会造成不平滑的体验
//     const theme = ref('light')
//     const toggleTheme = () => { 
//         theme.value = theme.value === 'light' ? 'dark' : 'light'
//     }
//     const activeTheme = computed(()=> {
//         return theme.value
//     })
// 3. 使用：root{--primary-color: red;} 可以直接使用css变量 var(--primary-color)
import { changeVar } from './Utils/index'
const theme = ref('light')
const normalTheme = {
    '@btn-color': 'white',
    '@bg-color': 'gray',
}
const darkTheme = {
    '@btn-color': 'black',
    '@bg-color': 'red',
}
const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    changeVar(theme.value === 'light' ? normalTheme : darkTheme)
}

// 2.使用less切换主题，不能将样式引入到vue文件，只能在index.html文件引入，作用到这个组件上，在组件内部引用的，在改变之后没有起作用,因为原理是用js来选择link的文件然后遍历拿到对象，正则匹配，然后进行替换
</script>

<style lang="less">
</style>
