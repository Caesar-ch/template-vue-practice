<template>
    <div class="mobile-adaptation">
        <!-- 移动端适配 -->
        <div class="box">
            自动根据基准值计算为vw单位
            <textarea class="explain" name="story" rows="50" cols="33">
                {{ value }}
            </textarea>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let text = `
    第一步： npm install postcss-px-to-viewport --save-dev 

    第二步： 在项目根目录下创建postcss.config.js文件 【详见参考配置】

    自动将尺寸单位 px 转成 vw，基准 375px ===> 100vw 

    对于不需要单位转换的标签，增加css选择器 '.ignore', '.hairlines' 
    
    链接：https://juejin.cn/post/7018433228591595550 
`
const value = ref(text);
</script>

<style lang="less" scoped>
.box {
    width: 200px;
    height: 200px;
    text-align: center;
    line-height: 200px;
    background: linear-gradient(45deg, #000, #fff);
    // position: absolute;
    // left: 0px;
    // right: 0px;
    // top: 0px;
    // bottom: 0px;
    // margin: auto;

    .explain {
        width: 100%;
        height: 100%;
        font-size: 10px;
        overflow: scroll;
    }
}
</style>