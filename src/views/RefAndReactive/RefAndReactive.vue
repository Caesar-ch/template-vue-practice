<template>
    <div class="ref-and-reactive">
        <el-table row-key="id" :data="data1" style="width: 100%">
            <el-table-column prop="val" label="VAl" width="180" />
            <el-table-column prop="id" label="ID" width="180" />
        </el-table>
        <el-button @click="handClick1">Ref</el-button>
        <hr>
        <el-table row-key="id" :data="data2" style="width: 100%">
            <el-table-column prop="val" label="VAl" width="180" />
            <el-table-column prop="id" label="ID" width="180" />
        </el-table>
        <el-button @click="handClick2">Reactive</el-button>
    </div>
</template>

<script lang="js"  setup>
import {ref, reactive} from 'vue'
    const data1 = ref([
    {
        val: 1,
        id: 1,
        },
        {
        val: 2,
        id: 2,
        },
    ])
    let data2 = reactive([
    {
        val: 1,
        id: 1,
        },
        {
        val: 2,
        id: 2,
        },
    ])
    let temp = [
        {
        val: 3,
        id: 3,
        },
        {
        val: 4,
        id: 4,
        },
    ]
    const handClick1 = () => {
        data1.value = [...temp]
    }
    const handClick2 = () => {
        // reactive 声明的数组对象 是会被proxy劫持，并返回劫持的对象，
        // 若重新赋值，则新对象并不是相应式的，则丢失相应式
        // 解决：用proxy可以监听到的方法进行操作splice和push，因为数组的length变化会触发响应式
        // 
        data2.splice(0,data2.length)
        data2.push(...temp)
        console.log(data2);
    }
</script>

<style lang="less" scoped>

</style>