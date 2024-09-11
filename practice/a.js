// // 将长文本转数组
// console.time("parseTagToText");
// const Tag = "<p>I <dropdown id=\"dropdown_0\"></dropdown> sad. I’m happy.</p><p>My friend Thomas <dropdown id=\"dropdown_1\"></dropdown> 11. He’s 12.</p><p>My pencil case <dropdown id=\"dropdown_2\"></dropdown> green. It’s orange.</p><p>My books are on my desk. They <dropdown id=\"dropdown_3\"></dropdown> in my school bag.</p><p>My friends and I are at school. We <dropdown id=\"dropdown_4\"></dropdown> at home.</p><p>Carla is my friend. She <dropdown id=\"dropdown_5\"></dropdown> my <dropdown id=\"dropdown_6\"></dropdown>teacher.</p>"
// function parseTagToText(Tag) {
//   const text = [];
//   const gapRegex = /<dropdown id="dropdown_(\d+)"><\/dropdown>/g;
//   let lastIndex = 0;
//   let match;

//   while ((match = gapRegex.exec(Tag)) !== null) {
//     // 添加前面的文本段
//     if (match.index > lastIndex) {
//       text.push({ type: 'text', content: Tag.slice(lastIndex, match.index) });
//     }
//     // 添加占位符对象
//     text.push({ type: 'gap', index: parseInt(match[1], 10) });
//     lastIndex = match.index + match[0].length;
//   }

//   // 添加最后的文本段
//   if (lastIndex < Tag.length) {
//     text.push({ type: 'text', content: Tag.slice(lastIndex) });
//   }

//   return text;
// }
// // text.split('</p>').map(str => str.replace(/<p>/g, '')).map(item => parseTextToSegments(item))
// // 1. 首先根据</p>，分成段
// // 2. 然后移除首位置标签
// // 3. 将整个文本段分成文本数组
// console.log(Tag.split('</p>').map(str => str.replace(/<p>/g, '')).map(item => parseTagToText(item)));
// console.timeEnd("parseTagToText");


let e = e => {
  console.log(e);
  for(let e of [1,2])
    console.log(e);
}
e('a1')