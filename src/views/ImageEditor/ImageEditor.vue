<template>
  <div class="drawing-container">
    <div id="tui-image-editor"></div>
  </div>
</template>
<script>
import "tui-image-editor/dist/tui-image-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import ImageEditor from "tui-image-editor";
export default {
  data() {
    return {
      instance: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.instance = new ImageEditor(
        document.querySelector("#tui-image-editor"),
        {
          includeUI: {
            loadImage: {
              path: "../../assets/logo.png",
              name: "image",
            },
            initMenu: "draw", // 默认打开的菜单项
            menuBarPosition: "right", // 菜单所在的位置
          },
          cssMaxWidth: 300, // canvas 最大宽度
          cssMaxHeight: 100, // canvas 最大高度
          usageStatistics: false // 关闭统计
        }
      );
      document.getElementsByClassName("tui-image-editor-main")[0].style.top = "45px"; // 图片距顶部工具栏的距离
    },
  },
};
</script>

<style lang="less" scoped>
.drawing-container {
  height: 900px;
}
</style>