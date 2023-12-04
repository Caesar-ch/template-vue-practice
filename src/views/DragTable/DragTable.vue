<template>
    <div class="drag-table">
        <el-table ref="elTableRef" row-key="name" :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template #default="scope">
                    <div class="btn">
                        <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                        <el-button type="text" size="small">编辑</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="js" setup>
import { ref, onMounted } from 'vue';
import Sortable from 'sortablejs'
const tableData = ref([
    {
        date: '2016-05-04',
        name: 'Tom1',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-03',
        name: 'Tom2',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom3',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom4',
        address: 'No. 189, Grove St, Los Angeles',
    },
])
const elTableRef = ref(null);
const setSort = () => {
  const el = elTableRef?.value?.$el.querySelector('tbody')
  new Sortable(el, {
    animation: 180,
    delay: 0,
    onEnd: (e) => {
    //   const targetRow = tableData.value.splice(e.oldIndex, 1)
    //   tableData.value.splice(e.newIndex, 0, targetRow[0]);
    },
  })
}
const handleDelete = (e) => {
    console.log(e.date);
    let target = tableData.value.findIndex(item => {
        return  item.date === e.date
    })
    tableData.value.splice(target, 1)
    console.log(target, 'target');
}
onMounted(() =>{
    setSort()
})
</script>

<style lang="less" scoped>

.btn {
    display: flex;
}
</style>