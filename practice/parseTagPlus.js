let question_type 

function parseTagToText({tag, config, type, staticConfigs}) {
  
  // console.log(tag, 'tag');
  // 1. 根据p标签进行分行
  const lineArr = splitByPTag(tag)
  // console.log(lineArr, 'lineArr');
  
  // 2. 对每一行的数据 移除html 通用标签 【不使用v-html的情况下，这些标签是多余文本】
  // 2.1 进行自定义标签进行解析，并写入行类型
  const cleanedInputArr = removeHtmlTag(lineArr)
  // console.log(cleanedInputArr, 'cleanedInputArr');

  const arr = cleanedInputArr.map(part => {
    // 处理每一行的标签
    return getParseTypeRegex(part, config, staticConfigs)
  })
  // console.log(arr, 'arr');
  return arr
}

function splitByPTag (parts) {
  const lineArr =  parts.split('</p>').map(parts_str => parts_str.replace(/<p>/g, '').replace(/↠/g,'    ')) // 以p标签分行，并把特殊字符转换为实际意义
  if(lineArr.length >1) {
    lineArr.pop() // 移除最后一个空字符串
  }
  return lineArr
}
// 移除数组的文本的html标签
function removeHtmlTag(lineArr) {
  const htmlTagRegex = /<\/?(p|span|b)[^>]*>/g
  const cleanedInputArr = lineArr.map(tag => {
    return tag.replace(htmlTagRegex, '')
  })
  return cleanedInputArr
}

function getParseTypeRegex (tag, config, staticConfigs) {
  const RegexArr = {
    gap: /<gap id="gap_(\d+)"><\/gap>/g,
    'single-choice': /<multiple-choice id="single-choice_(\d+)"><\/multiple-choice>/g,
    dropdown: /<dropdown id="dropdown_(\d+)"><\/dropdown>/g,
    // 'reading-text-image': /<custom-image id="custom-image_(\d+)"><\/custom-image>/g,
    'custom-dropdown': /<dropdown id="dropdown_(\d+)"><\/dropdown>/g,
    'custom-image': /<custom-image id="custom-image_(\d+)"><\/custom-image>/g,
    'custom-group-item': /<custom-group-item id="custom-group-item_(\d+)"><\/custom-group-item>/g,
    'audio-player': /<audio-player id="audio-player_(\d+)"><\/audio-player>/g,
    'single-letter': /<single-letter id="single-letter_(\d+)"><\/single-letter>/g,
    quiz: /<quiz id="quiz_(\d+)"><\/quiz>/g,
    'free-write': /<freewrite id="freewrite_(\d+)"><\/freewrite>/g,
  }
  
  for(let key of Object.keys(RegexArr)) {
    const Regex = RegexArr[key]
    if((match = Regex.exec(tag)) !== null) {
      question_type = key
      // 两种情况
      // 1.  'A    Jamie, <gap id="gap_0"></gap> you <gap id="gap_1"></gap> a cat?',
      // 思路：这种包含文本的需要 在进行 分块的概念拆成 文本块 和 标签块
      // 2. '<quiz id="quiz_0"></quiz>'
      // 思路：这种直接就是标签块，其实不需要拆分只需要加上类型，将配置项填充进去
      // console.log(tag, Regex, key, match, 'tag');
      const partArr = getParseText(tag, new RegExp(Regex), key)
      // console.log(partArr, 'partArr');
      

      const one_line = partArr.map(part => {
        if(part.type === 'text') {
          return part
        } else {
          return {...part, ...getConfigParam(key, part.index)}
        }
      })
      // console.log(one_line, 'one_line');
      
      return one_line
    }
  }
  return [{type: 'text', content: tag}]
  function getConfigParam(type, id) {
    switch (type) {
      case 'custom-image':
          if(!staticConfigs || staticConfigs?.length === 0){
            const reading_img = config.find(item => item.id === `${type}_${id}`)
            return {img: reading_img, id: `${type}_${id}`}
          } else {
            // 行概念的图片是从 staticConfigs里匹配数据
            const temp1 = staticConfigs.find(item => item.id === `${type}_${id}`)
            return {img: temp1, index: `x#x#_${id}`}            
          }
      case 'quiz':
          const temp2 = config.find(item => item.id === `${type}_${id}`)
          const answer = temp2.additionalAnswers.map(text => removeTextContainHtmlTag(text.answer))
          return {question: removeTextContainHtmlTag(temp2.question), answerOption: answer}
      case 'single-choice':
        const temp3 = config.find(item => item.id === `${type}_${id}`)
        const option = temp3.additionalAnswers.map(item3 => {
          return {type: 'text', content: removeTextContainHtmlTag(item3.answer)}
        })
        return {option}
      case 'custom-group-item':
        const temp4 = config.find(item => item.id === `${type}_${id}`)
        // 组合题属于是分块之后，还需要继续分行的概念, content里的内容就是一行一行的内容
        // 1.首先找到图片配置
        let img = [{type: 'image', content: [temp4.imageConfig]}]
        let gaps
        let dropdown
        if(temp4.gaps.length > 0) {
          gaps = temp4.gaps.map(item => {
            return {type: item.type, id: item.id,}
          })
        }
        if(temp4.dropdowns.length > 0) {
          dropdown = temp4.dropdowns.map(item => {
            const option = item.additionalAnswers.map(option => {
              return option.answer
            })
            return {type: item.type, id: item.id, option}
          })
        }
      
        return {content: [img, gaps, dropdown]}
      case 'reading-text-image':
        return {type: 'reading-text-image', content: [...config]}
      case 'dropdown':
        const dropdown_config = config.find(item => item.id === `${type}_${id}`)
        const dropdown_option = dropdown_config.additionalAnswers.map(item => {
          return item.answer
        })
        return {type: 'dropdown', options: dropdown_option,}
      case 'audio-player':
        const audio_config = staticConfigs.find(item => item.id === `${type}_${id}`)
         return {audio_config}
      case 'single-letter':
        return {id: `${type}_${id}` }
      case 'free-write':
        return {}
      default:
        return {}
    }
  }
}

function getParseText (tag, parseRegex , type) {
  // console.log('type1', type, cleanedInputArr, parseRegex);
  // const canUseTextArr = cleanedInputArr.map(tag => {
    const text = [];
    let lastIndex = 0;
    let match;
    //TODO 加入符号识别为具体的含义
    while ((match = parseRegex.exec(tag)) !== null) {
      
      // 添加前面的文本段
      if (match.index > lastIndex) {
        text.push({ type: 'text', content: tag.slice(lastIndex, match.index) });
      }
      // 添加占位符对象
      
      text.push({ type: type || 'gap', index: parseInt(match[1], 10) });
      lastIndex = match.index + match[0].length;
    }
    
    // 添加最后的文本段
    if (lastIndex < tag?.length) {
      text.push({ type: 'text', content: tag.slice(lastIndex) });
    }
  
    return text;
  // })
  
  // return canUseTextArr
}

// 移除文本的html标签
function removeTextContainHtmlTag(tag) {
  const htmlTagRegex = /<\/?[p|span|b][^>]*>/g
  return tag.replace(htmlTagRegex, '')
}


const gap = require('./gab.json')
const singleChoice = require('./single-choice.json')
const dropdown = require('./dropdown.json')
const customGroupImageGap = require('./customGroupImageGap.json')
const customGroupImageDropdown = require('./customGroupImageDropdown.json')
const Reading = require('./Reading.json')
const Listening = require('./Listening.json')
const SingleLetter = require('./singleLetter.json')
const Writing = require('./writing.json')
const Quiz = require('./quiz.json')
const ImageAndQuiz = require('./imageAndQuiz.json')
const PassageGap = require('./passageGap.json')

const question = [

]

// console.log(gap);

const result1 = parseTagToText({
  tag: gap.sequences[0].parts[0],
  config: gap.sequences[0].config,
  type: 'gap'
})
// console.log(result1);
// console.log(JSON.stringify(result1));
question.push({
  type: 'gap',
  content: result1
})

const result2 = parseTagToText({
  tag: singleChoice.sequences[0].parts[0],
  config: singleChoice.sequences[0].configs,
  type: 'single-choice',
  staticConfigs: []
})
// console.log(JSON.stringify(result2));
question.push({
  type: 'single-choice',
  content: result2
})

const result3 = parseTagToText({
  tag: dropdown.sequences[0].parts[0],
  config: dropdown.sequences[0].configs,
  type: 'dropdown'
})
// console.log(result3);
question.push({
  type: 'dropdown',
  content: result3
})
const result4 = parseTagToText({
  tag: customGroupImageGap.sequences[0].parts[0],
  config: customGroupImageGap.sequences[0].configs,
  type: 'custom-group-item'
})
question.push({
  type: 'custom-group-item',
  content: result4
})
// console.log(result4);
const result5 = parseTagToText({
  tag: customGroupImageDropdown.sequences[0].parts[0],
  config: customGroupImageDropdown.sequences[0].configs,
  type: 'custom-group-item'
})
question.push({
  type: 'custom-group-item',
  content: result5
})
console.log(JSON.stringify(result5));
const result6 = parseTagToText({
  tag: Reading.readingText.content,
  config: Reading.readingText.configs,
  // type: 'reading-text',
})
// console.log(JSON.stringify(result6));
// console.log(result6);
question.push({
  type: 'reading-text',
  content: result6
})
const result7 = parseTagToText({
  tag: Listening.sequences[0].parts[0],
  config: Listening.sequences[0].configs,
  staticConfigs: Listening.sequences[0].staticConfigs,
  type: 'listening'
})
question.push({
  type: 'listening',
  content: result7
})
// console.log(JSON.stringify(result7));

const result8 = parseTagToText({
  tag: SingleLetter.sequences[0].parts[0],
  config: SingleLetter.sequences[0].configs,
  staticConfigs: SingleLetter.sequences[0].staticConfigs,
  type: 'single-letter'
})
// console.log(result8);

question.push({
  type: 'single-letter',
  content: result8
})

const result9 = parseTagToText({
  tag: Writing.sequences[0].parts[0],
  config: Writing.sequences[0].configs,
  staticConfigs: Writing.sequences[0].staticConfigs,
  type: 'writing'
})
question.push({
  type: 'writing',
  content: result9
})
// console.log(result9);

const result10 = parseTagToText({
  tag: Quiz.sequences[0].parts[0],
  config: Quiz.sequences[0].configs,
  staticConfigs: Quiz.sequences[0].staticConfigs,
  type: 'quiz'
})
question.push({
  type: 'quiz',
  content: result10
})
// console.log(result10);
const result11 = parseTagToText({
  tag: ImageAndQuiz.sequences[0].parts[0],
  config: ImageAndQuiz.sequences[0].configs,
  staticConfigs: ImageAndQuiz.sequences[0].staticConfigs,
  type: 'custom'
})
question.push({
  type: 'custom',
  content: result11
})
// console.log(JSON.stringify(question));
const result12 = parseTagToText({
  tag: PassageGap.sequences[0].parts[0],
  config: PassageGap.sequences[0].configs,
  staticConfigs: PassageGap.sequences[0].staticConfigs,
})
console.log('\n');

console.log(JSON.stringify(result12));


module.exports = {
  parseTagToText,
}