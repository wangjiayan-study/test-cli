#!/usr/bin/env node 
const lib = require('@wangjiayan-study/test-cli-lib')
const { argv } = require('node:process')

const command = argv[2]
const options = argv.slice(3)
let [option, param] = options
// 去掉--
option = option.replace('--',"")
if (lib[command]){
    lib[command]({option, param})
}else{
    console.log('无效命令')
}

// 注册一个命令 test
// 实现一个参数解析