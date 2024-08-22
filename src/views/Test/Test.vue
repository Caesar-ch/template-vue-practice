<template>
  <div class="test-container">
    <header>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="User" name="first">
            <Listening />
          </el-tab-pane>
          <el-tab-pane label="Config" name="second">Config</el-tab-pane>
          <el-tab-pane label="Role" name="third">Role</el-tab-pane>
          <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </header>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import Listening from './Listening/Listening.vue'
const activeName = ref('first')
const handleClick = (tab, event) => {
    console.log(tab, event)
}
</script>

<style lang="less" scoped>

</style>