<template>
    <div class="key-important">
        <div id="root">
            <h3>没有Key的情况</h3>
            <ul>
                <li v-for="list in lists">
                    <input type="checkbox" :checked="list.flag"/>
                    {{ list.title }}
                    <button @click="deleteList(list.id)">删除</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const lists = ref([
        {
          title: '我是第一个标签（',
          id: 1000,
          flag: true,
        },
        {
          title: '如果没出意外我应该是在第二行（嗯',
          id: 2000,
          flag: false,
        },
        {
          title: '排在第三！那肯定是第三个啦！（',
          id: 3000,
          flag: true,
        },
        {
          title: '正常情况下我都是在最后的。',
          id: 4000,
          flag: false,
        },
      ])
      // key 的意义在于：当会更新了新响应式数据，生成新的虚拟节点，然后进行心就虚拟节点的对比时，是否要删除旧的节点，
      // 在删除第二个li之后，新生成的基于其他三个的数组的新虚拟节点，于旧虚拟节点比较时，旧的第二个节点和新的第三个节
      // 点会属于同层比较，因为没有唯一标识，所以判定两个为SameNode，则不会删除旧的第二个li的dom，进行向下继续pach
      // 子节点，因为子节点更没有标识，所以通过比较input class一样 key一样，所以input会复用旧的第二个li的dom的状态
      // 【未勾选】状态，第二个文本节点比较不一致，则进行了替换，
      // key：的核心就是告诉diff算法，旧节点是否要删除或复用，新节点是否要生成
    const deleteList = (id) =>  {
      lists.value.splice(
        lists.value.findIndex((list) => list.id === id),
        1
      );
    }
    // 当点击删除按钮之后，我们的预期是删除第二个虚拟dom，然后后面的直接复用就OK
    // 但是要删除第二个节点，只能交个diff算法来删除，而diff算法要删除节点，则需要
    // 在同层比较时不能与新虚拟节点判定为一样，则就是tag和key，但是v-for循环出来
    // 的tag肯定一样，所以只能key不一样，如果不写，或者写成index，其实在新虚拟节
    // 点里是能找到一样的index，所以还是不会删除旧节点。

    // 总结：不加key，会导致没有正常的按照预期 删除(第二个li) 和 复用(第三个li)dom
    // 其结果是，将第二个li的dom复用给了第三个li，第三个的dom复用给了第四个li，第四个li的dom删除了
    const handleFlag = (list) => {
        list.flag = !list.flag
    }
</script>

<style lang="less" scoped></style>