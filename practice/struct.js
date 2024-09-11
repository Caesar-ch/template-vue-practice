const test = {
  id: 1, // 试卷id
  total: 10, // 试题总数
  time: '1000s', // 花费时常

  current_index: 1, // 进度索引

  score: '', // 得分

  questions: [ // 试题列表
      {
        id: 1, // 试题id
        type: 'gap', // 试题类型 选择，填空，听力，阅读，组合
        instruction: '看图选择正确的选项', // 试题描述
        content: [ // 试题内容
            [  // 行概念 第一行
                {
                  type: 'image',
                  config: {
                    name: '小猪佩奇.png',
                    url: 'https://xxx.com/xxx.png'
                  }
                },
                
            ],

            [  // 行概念 第二行
                {
                  type: 'text', // 块概念，类型
                  content: "I' am" // 内容
                },
                {
                  type: 'dropdown',
                  id: 'dropdown_1'
                  options: [
                      { answer: 'red' },
                      { answer: 'green' },
                      { answer: 'yellow' },
                      { answer: 'blue' },
                      { answer: 'pink' },
                      { answer: 'purple' },
                  ]
                },
                {
                  type: 'image',
                  config: {
                    name: '小猪佩奇.png',
                    url: 'https://xxx.com/xxx.png'
                  }
                }
            ],
        ]
      },
  ]

}