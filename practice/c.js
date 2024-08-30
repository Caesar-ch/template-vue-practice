const json = {
  "instruction": {
    "german": null,
    "english": ""
  },
  "configs": [
    {
      "imageConfig": {
        "id": "",
        "type": "gap",
        "url": "",
        "name": "three.png",
        "width": 280,
        "margin": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "float": "none",
        "style": ""
      },
      "quillContent": "<p>t<span class=\"gap-embed\"><gap id=\"gap_0\"></gap></span>ee</p>",
      "gaps": [
        {
          "correctAnswer": "hr",
          "additionalAnswers": [],
          "id": "gap_0",
          "type": "gap",
          "exerciseUrl": "https://exercise-editor.helbling.com/files/options_1/options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_grammar_01_ch_01/"
        }
      ],
      "dropdowns": [],
      "quizzes": [],
      "id": "custom-group-item_0",
      "type": "custom-group-item"
    },
    {
      "imageConfig": {
        "id": "",
        "type": "gap",
        "url": "",
        "name": "five.png",
        "width": 280,
        "margin": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "float": "none",
        "style": ""
      },
      "quillContent": "<p>f<span class=\"gap-embed\"><gap id=\"gap_1\"></gap></span>e</p>",
      "gaps": [
        {
          "correctAnswer": "iv",
          "additionalAnswers": [],
          "id": "gap_1",
          "type": "gap",
          "exerciseUrl": "https://exercise-editor.helbling.com/files/options_1/options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_grammar_01_ch_01/"
        }
      ],
      "dropdowns": [],
      "quizzes": [],
      "id": "custom-group-item_1",
      "type": "custom-group-item"
    },
    {
      "imageConfig": {
        "id": "",
        "type": "gap",
        "url": "",
        "name": "eight.png",
        "width": 280,
        "margin": {
          "top": 0,
          "right": 0,
          "bottom": 0,
          "left": 0
        },
        "float": "none",
        "style": ""
      },
      "quillContent": "<p>ei<span class=\"gap-embed\"><gap id=\"gap_2\"></gap></span>t</p>",
      "gaps": [
        {
          "correctAnswer": "gh",
          "additionalAnswers": [],
          "id": "gap_2",
          "type": "gap",
          "exerciseUrl": "https://exercise-editor.helbling.com/files/options_1/options_1_2023_cyber_homework/unit_welcome_CH_01/unit_welcome_grammar_01_ch_01/"
        }
      ],
      "dropdowns": [],
      "quizzes": [],
      "id": "custom-group-item_2",
      "type": "custom-group-item"
    }
  ],
  "staticConfigs": [],
  "parts": [
    "<p><custom-group-item id=\"custom-group-item_0\"></custom-group-item><custom-group-item id=\"custom-group-item_1\"></custom-group-item><custom-group-item id=\"custom-group-item_2\"></custom-group-item></p>"
  ],
  "globalTypesConfigs": [
    {
      "type": "dropdown",
      "shuffle": true,
      "widthMode": "adaptToContent"
    },
    {
      "type": "gap",
      "widthMode": "asLongestWord",
      "longestAlternativeSolutions": false,
      "ignoreCaseSensitivity": false
    }
  ]
}

// const data = JSON.parse(json)
console.log();
const tag = json.parts[0].replace(/<\/?[p|span][^>]*>/g, "")
function parseTagToText(Tag) {
  const text = [];
  const gapRegex = /<custom-group-item id="custom-group-item_(\d+)"><\/custom-group-item>/g;
  let lastIndex = 0;
  let match;

  while ((match = gapRegex.exec(Tag)) !== null) {
    // console.log(match);
    
    // 添加前面的文本段
    if (match.index > lastIndex) {
      text.push({ type: 'text', content: Tag.slice(lastIndex, match.index) });
    }
    // 添加占位符对象
    text.push({ type: 'gap', index: parseInt(match[1], 10) });
    lastIndex = match.index + match[0].length;
  }

  // 添加最后的文本段
  if (lastIndex < Tag.length) {
    text.push({ type: 'text', content: Tag.slice(lastIndex) });
  }

  return text;
}
// parseTagToText(tag)
console.log(parseTagToText(tag));
function handleConfig (text) {
  text.forEach((val) => {
    json[val.index]
  })
}
