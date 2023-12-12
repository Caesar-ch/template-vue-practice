import less from 'less';

export let changeVar = (themeOption) => {
    less.modifyVars({  // 调用 `less.modifyVars` 方法来改变变量值
        ...themeOption,
    }).then((res) => {
        console.log('修改成功', res);
    })
}