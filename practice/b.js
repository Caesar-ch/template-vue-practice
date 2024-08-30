const text = "<p>I <dropdown id=\"dropdown_0\"></dropdown> sad. I’m happy.</p><p>My friend Thomas <dropdown id=\"dropdown_1\"></dropdown> 11. He’s 12.</p><p>My pencil case <dropdown id=\"dropdown_2\"></dropdown> green. It’s orange.</p><p>My books are on my desk. They <dropdown id=\"dropdown_3\"></dropdown> in my school bag.</p><p>My friends and I are at school. We <dropdown id=\"dropdown_4\"></dropdown> at home.</p><p>Carla is my friend. She <dropdown id=\"dropdown_5\"></dropdown> my teacher.</p>"

// console.log(text.split('</p>').map(str => str.replace(/<p>/g, '')));
const tag = '<p>I <b>A</b>↠ <gap id=\"gap_0\"></gap> Joe in the bathroom?</p>'
const gapRegex = /<gap id="gap_(\d+)"><\/gap>/g;
match = gapRegex.exec(tag)
// console.log(match, tag[15]);


// 原始文本
const originalText = "<p>t<span class=\"gap-embed\"><gap id=\"gap_0\"></gap></span>ee</p>";

// 使用正则表达式移除特定的HTML标签
const plainText = originalText.replace(/<\/?[p|span][^>]*>/g, "");

// 输出结果
console.log(plainText);  // 输出: "t<gap id="gap_0"></gap>ee"
