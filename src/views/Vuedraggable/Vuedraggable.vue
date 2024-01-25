<template>
    <div class="vue-draggable">
        <draggable>
            <div class="box"></div>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

</script>

<style scoped lang="less">
    .vue-draggable {
        border: 1px solid red;
        width: 500px;
        height: 500px;
        .box {
            background: red;
            width: 50px;
            height: 50px;
        }
    }
</style>