<template>
  <div>
    <audio controls :src="url"></audio>
    <!-- <div class="reading" v-html="reading">

    </div> -->
    <!-- <audio controls src="https://m802.music.126.net/20240821191907/035a83a57faf9ef503d7430907c105de/jd-musicrep-ts/2a24/4c4b/ef55/c7e689d425ea76a906fa38c2c70f7bdc.mp3"></audio> -->
    <CustomAudio :audio-src="url"/>
    <p></p>
    <p></p>
  </div>
</template>

<script setup>
import CustomAudio from '@/components/custom-audio/CustomAudio.vue';

const url = "https://m801.music.126.net/20240822180035/958be1b83aa4ba22c0452dd0660cf38a/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/25648475621/fc64/2c38/7541/235b88205bc9d155907a1815eb6c382f.mp3?authSecret=000001917971052f0e560a3b20181cc5"
const reading = '<p><b>Young people who have made the world a better place<\/b><\/p><p><b>&nbsp;<\/b><\/p><p><b>Malala Yousafzai<\/b><\/p><p><custom-image id=\"custom-image_0\"><\/custom-image>Malala was born in Pakistan in 1997. As a child, she went to the school where her father was a teacher and she loved learning there. But in 2008, the Taliban government took control of the country, and life became difficult. Girls and women lost their right to education, so Malala had to stop going to school and stay at home.<\/p><p>Malala wasn\u2019t happy about this. She started speaking in public to young girls and women. She wanted them to remember their rights. Because of this, one day a man attacked Malala.<\/p><p>Luckily, Malala recovered from the attack. She and her family moved to the UK. There, she started a charity with her father\u2019s help. The charity is called Malala Fund, and it helps give young girls opportunities for education.<\/p><p>In 2014, Malala won the Nobel Peace Prize for her work. She was only 17.<\/p><p><br><\/p><p><b>Orion Jean<\/b><\/p><p><custom-image id=\"custom-image_1\"><\/custom-image>Orion Jean was born in the US in 2010. At a very young age, he became interested in helping people. When he was 9, Orion took part in the National Kindness Speech Contest, a competition in which young people have to present an idea for how to help their community. Orion won the contest, and later used the prize money to start an organisation called Race to Kindness. He was only 11!<\/p><p>Race to Kindness organises different events to help people in need and has helped thousands of people. In 2020, children in a hospital in the city of Dallas in the US received over 600 toys. A year later, Race to Kindness delivered 100,000 meals to different families, and gave 500,000 books to children across the country.<\/p><p>In 2021, Orion became Time Magazine\u2019s Kid of the Year for his work. He believes that with a little effort, we can all make the world a kinder place.<\/p><p><br><\/p>'
</script>

<style lang="less" scoped>
.reading {
  text-align: left;
}
</style>
<style>
.controls progress {
  display: block;
  width: 100%;
  height: 81%;
  margin-top: 0.125rem;
  border: none;
  color: #0095dd;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
}

</style>