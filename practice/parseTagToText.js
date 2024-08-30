function parseTagToText({tag, config, type, staticConfigs}) {
  
  // console.log(tag, 'tag');
  // 1. 根据p标签进行分行
  const lineArr = splitByPTag(tag)
  // console.log(lineArr, 'lineArr');
  
  // 2. 对每一行的数据 移除html 通用标签 【不使用v-html的情况下，这些标签是多余文本】
  const cleanedInputArr = removeHtmlTag(lineArr)
  // console.log(cleanedInputArr, 'cleanedInputArr');

  // 3. 根据类型决定解析方式
  const parseTypeRegex = getParseTypeRegex(type)

  // 4. 对每一行进行解析, 生成带类型的数据格式
  const canUseTextArr = getParseText(cleanedInputArr, parseTypeRegex, type)

  // 5. 对不同类型进行决定是否读取config里面的数据

  const containConfig = getContainConfig(canUseTextArr, config, type, staticConfigs)

  return containConfig
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

function getParseTypeRegex (type) {
  switch (type) {
    case 'gap': 
      return /<gap id="gap_(\d+)"><\/gap>/g
    case 'single-choice':
      return /<multiple-choice id="single-choice_(\d+)"><\/multiple-choice>/g
    case 'dropdown':
      return /<dropdown id="dropdown_(\d+)"><\/dropdown>/g
    case 'custom-dropdown':
      return /<dropdown id="dropdown_(\d+)"><\/dropdown>/g
    case 'custom-group-item':
      return /<custom-group-item id="custom-group-item_(\d+)"><\/custom-group-item>/g
    case 'reading-text':
      return /<custom-image id="custom-image_(\d+)"><\/custom-image>/g
    case 'listening':
      return /<audio-player id="audio-player_(\d+)"><\/audio-player>/g
    case 'single-letter':
      return /<single-letter id="single-letter_(\d+)"><\/single-letter>/g
    case 'quiz':
      return /<quiz id="quiz_(\d+)"><\/quiz>/g
      case 'span':
      return /<\/?span[^>]*>/g
    default: 
      return /<\/?[p|span][^>]*>/g
  } 
}

function getParseText (cleanedInputArr, parseRegex , type) {
  // console.log('type1', type, cleanedInputArr, parseRegex);
  const canUseTextArr = cleanedInputArr.map(tag => {
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
  })
  
  return canUseTextArr
}

function getContainConfig(arr, config, type, staticConfigs) {

  if (type === 'single-choice') {
    arr = arr.map(item => {
      return item.map(item2 => {
        const option = config[item2.index].additionalAnswers.map(item3 => {
          return {type: 'text', content: removeTextContainHtmlTag(item3.answer)}
        })
        return {...item2, option}
      })  
    })    
  }

  if (type === 'dropdown') {
      
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'dropdown') {
                  const option = config[text.index].additionalAnswers.map(item => {
                      return {type: 'text', content: item.answer}
                  })
                  return {...text, option}
              } else {
                  return text
              }
          })      
      })
  }

  if (type === 'custom-dropdown') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'custom-dropdown') {
                  const option = config[0].additionalAnswers.map(item => {
                      return {type: 'text', content: item.answer}
                  })
                  return {...text, option}
              } else {
                  return text
              }
          })      
      })
  }

  if (type === 'custom-group-item') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'custom-group-item') {
                  const temp =  config[text.index]
                  if(temp.dropdowns.length <= 0) {
                    return {...text, content: parseTagToText({tag: temp.quillContent, config: temp.gaps, type: 'gap'}), img: temp.imageConfig}
                  } else {
                    return {...text, content: parseTagToText({tag: temp.quillContent, config: temp.dropdowns, type: 'custom-dropdown'}), img: temp.imageConfig}
                  }
              } else {
                  return text
              }
          })      
      })
  }

  if (type === 'reading-text') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'reading-text') {
                  const temp =  config[text.index]
                  return {...text, img: temp, type: 'reading-text-img'}
              } else {
                  return text
              }
          })      
      })
  }

  if (type === 'listening') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'listening') {
                  const temp =  staticConfigs[text.index]
                  return {...text, audio: temp, type: 'listening'}
              } else {
                  // console.log('text', text.content);
                  
                  return {...text, content: parseTagToText({tag: text.content, config: config, type: 'dropdown'})}
              }
          })      
      })
  }

  if (type === 'single-letter') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'text') {
                  return forwardParseCustomImageTag(text, config)
              } else {
                  return text
              }
          })      
      })
  }
  if (type === 'writing') {
      arr = arr.map(line => {
          return line.map(text => {
              if (text.type === 'text') {
                  // console.log('text', text.content);
                  return forwardParseCustomImageTag(text, config)
              } else {
                  return text
              }
          })      
      })
  }
  if (type === 'quiz') {
      arr = arr.map(line => {
          return line.map(part => {
              if (part.type === 'quiz') {
                  const temp =  config[part.index]
                  const answer = temp.additionalAnswers.map(text => removeTextContainHtmlTag(text.answer))
                  // console.log('text', text.content);
                  return {...part, question: removeTextContainHtmlTag(temp.question), answerOption: answer}
              } else {
                  return part
              }
          })      
      })
  }
  if (type === 'custom') {
      arr = arr.map(line => {
          return line.map(part => {
              return forwardParseCustomImageTag(part, config)
          })      
      })
  }
  return arr
}

function forwardParseCustomImageTag (tag, config) {
  let match
  const RegexArr = {
    'custom-image': /<custom-image id="custom-image_(\d+)"><\/custom-image>/g,
    'free-write': /<freewrite id="freewrite_(\d+)"><\/freewrite>/g,
    'quiz': /<quiz id="quiz_(\d+)"><\/quiz>/g,
  }

  for(let key of Object.keys(RegexArr)) {
    const Regex = RegexArr[key]
    if((match = Regex.exec(tag.content)) !== null) {
      return {type: key, index: match[1], ...getConfigParam(key, match)}
    }
  }
  return tag

  function getConfigParam(type, match) {
    switch (type) {
      case 'custom-image':
        return {img: config[match[1]]}
      case 'quiz':
          const temp = config[match[1]]
          const answer = temp.additionalAnswers.map(text => removeTextContainHtmlTag(text.answer))
          return {question: removeTextContainHtmlTag(temp.question), answerOption: answer}
      case 'free-write':
        return {}
      default:
        return {}
    }
  }
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



// console.log(gap);

// const result1 = parseTagToText({
//   tag: gap.sequences[0].parts[0],
//   config: gap.sequences[0].config,
//   type: 'gap'
// })
// console.log(result1);
// const result2 = parseTagToText({
//   tag: singleChoice.sequences[0].parts[0],
//   config: singleChoice.sequences[0].configs,
//   type: 'single-choice'
// })
// console.log(JSON.stringify(result2));

// const result3 = parseTagToText({
//   tag: dropdown.sequences[0].parts[0],
//   config: dropdown.sequences[0].configs,
//   type: 'dropdown'
// })
// console.log(result3);
// const result4 = parseTagToText({
//   tag: customGroupImageGap.sequences[0].parts[0],
//   config: customGroupImageGap.sequences[0].configs,
//   type: 'custom-group-item'
// })
// console.log(JSON.stringify(result4));
// const result5 = parseTagToText({
//   tag: customGroupImageDropdown.sequences[0].parts[0],
//   config: customGroupImageDropdown.sequences[0].configs,
//   type: 'custom-group-item'
// })
// console.log(JSON.stringify(result5));
// const result6 = parseTagToText({
//   tag: Reading.readingText.content,
//   config: Reading.readingText.configs,
//   type: 'reading-text'
// })
// console.log(JSON.stringify(result6));
// console.log(result6);
// const result7 = parseTagToText({
//   tag: Listening.sequences[0].parts[0],
//   config: Listening.sequences[0].configs,
//   staticConfigs: Listening.sequences[0].staticConfigs,
//   type: 'listening'
// })
// console.log(JSON.stringify(result7));

// const result8 = parseTagToText({
//   tag: SingleLetter.sequences[0].parts[0],
//   config: SingleLetter.sequences[0].configs,
//   staticConfigs: SingleLetter.sequences[0].staticConfigs,
//   type: 'single-letter'
// })
// // console.log(JSON.stringify(result7));
// console.log(result8);

// const result9 = parseTagToText({
//   tag: Writing.sequences[0].parts[0],
//   config: Writing.sequences[0].configs,
//   staticConfigs: Writing.sequences[0].staticConfigs,
//   type: 'writing'
// })
// // console.log(JSON.stringify(result7));
// console.log(result9);

// const result10 = parseTagToText({
//   tag: Quiz.sequences[0].parts[0],
//   config: Quiz.sequences[0].configs,
//   staticConfigs: Quiz.sequences[0].staticConfigs,
//   type: 'quiz'
// })
// // console.log(JSON.stringify(result7));
// console.log(result10);
const result10 = parseTagToText({
  tag: ImageAndQuiz.sequences[0].parts[0],
  config: ImageAndQuiz.sequences[0].configs,
  staticConfigs: ImageAndQuiz.sequences[0].staticConfigs,
  type: 'custom'
})
// console.log(JSON.stringify(result7));
console.log(result10);

// {
//   content:[
//     [
//       { type:"text", content:"t" },
//       { type:"gap", index:0 },
//       { type:"text", content: "ee" }
//     ]
//   ],
// }
module.exports = {
  parseTagToText,
}