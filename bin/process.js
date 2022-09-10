// /bin/process/index.js
const { execFile, exec } = require('node:child_process');
const path = require('path')

const cp = exec('ls -al|grep node_modules ',function(err,stdout,stderr){
    console.log(err)
    console.log(stdout)
    console.log(stderr)
})

const shellPath = path.resolve(__dirname,'test.shell')
console.log('shellPath',shellPath)
const child =execFile(path.resolve(__dirname,'test.shell'), function(err,stdout,stderr){
    err && console.log(err)
    stdout && console.log(stdout)
    stderr && console.log(stderr)
})

cp.stdout.on('data',function(chunk){
    console.log('stdout',chunk.toString())
  })
cp.on('exit',function(code){
    console.log('exit',exit)
  })