<template>
  <div class="grid-layout">
    <div class="scale">
      <div class="child">child</div>
    </div>
    <span>scale</span>
    <div class="zoom">
      <div class="child">child</div>
    </div>
    <span>zoom</span>
    <!-- 布局容器 -->
    <div class="grid-container">
      <!-- 布局项 -->
      <div class="item-1">
        <div class="content">12</div>
      </div>
      <div class="item-2">2</div>
      <div class="item-3">3</div>
      <div class="item-4">4</div>
      <div class="item-5">5</div>
      <div class="item-6">6</div>
      <div class="item-7">7</div>
      <div class="item-8">8</div>
      <div class="item-9">9</div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.grid-layout {
  .grid-container {
    width: 120px;
    height: 120px;
    border: 1px solid black;
    display: grid;

    // grid-template-columns: repeat(
    //   auto-fill,
    //   33.3%
    // ); // 控制多少列，每列的尺寸，可以折行
    // grid-template-columns: 30px 30px 30px;
    // grid-template-rows: 30px 30px 30px;

    // grid-column-gap: 10px;
    // grid-row-gap: 20px; // gap间隙的大小
    // grid-column-gap: 20px;

    grid-template-areas:
      'a b c '
      'd . f'
      'g h i';
    // 默认是先填充行，然后再扩展列 设置排列顺序，先行后列 还是 先列后行
    // grid-auto-flow: column;

    // 内部内容的排列位置 一个item的内容的排布
    // justify-items: start;
    // align-items: center;
    // 两种的综合写法
    // place-items: start start;

    // 水平垂直居中
    justify-content: center; // 设置内容整体区域在容器的位置
    align-content: center;
    // place-content: center center;
    div {
      line-height: 30px;
      text-align: center;
    }
    .item {
      &-1 {
        background-color: #dc4636;
        .content {
          width: 10px;
          height: 10px;
          background-color: #b67aac;
        }
      }
      &-2 {
        background-color: #e89441;
      }
      &-3 {
        background-color: #64a652;
      }
      &-4 {
        background-color: #3374bc;
      }
      &-5 {
        background-color: #b67aac;
      }
      &-6 {
        background-color: #f2d3a4;
      }
      &-7 {
        background-color: #b2a884;
      }
      &-8 {
        background-color: #d4e3ae;
      }
      &-9 {
        background-color: #70c4e8;
      }
    }
  }
  .scale {
    width: 100px;
    height: 100px;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(0.5);
  }
  .zoom {
    width: 100px;
    height: 100px;
    background: green;
    display: flex;
    justify-content: center;
    align-items: center;
    zoom: 0.5;
  }
  .child {
    background-color: rgb(132, 76, 76);
    width: 30px;
    height: 30px;
  }
}
</style>
