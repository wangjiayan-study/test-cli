const { fromEvent } = require('rxjs')
const {EventEmitter} = require('node:events')
var MuteStream = require('mute-stream')
const readline = require('readline');
const ansiEscapes = require('ansi-escapes');

const options = {
    name:'name',
    message:'请输入你的名字',
    type:'list',
    choices:['佳燕','佳新','建秋']
}

function prompt(options){
    return new Promise((resolve, reject)=>{
        const list = new List(options)
        list.render();
        list.on('exist',(answer)=>{
            resolve(answer)
        })
    })
}

class List extends EventEmitter {
    constructor (opts) { 
      super()
      this.name = opts.name
      this.message = opts.message
      this.choices = opts.choices
      this.input = process.stdin
      const ms = new MuteStream();
      ms.pipe(process.stdout)
      this.output = ms
      this.height = 0
      this.rl = readline.createInterface({
        input:this.input ,
        output:this.output 
    })
    this.finished = false
    this.choice = 0
    this.result = ''
    // fromEvent帮我们监听this.rl.input事件,事件回调是this.onKeypress
    fromEvent(this.rl.input,'keypress').forEach(this.onKeypress)
    }
    /**
     * 这里一定要用箭头函数，不然获取不到this
     * 处理键盘输入的事件
     * @param {*} keymap 
     */
    onKeypress=(keymap)=>{
        const key = keymap[1];
        if (key.name === 'down') {
            this.choice++;
          if (this.choice> this.choices.length - 1) {
            this.choice = 0;
          }
          this.render();
        } else if (key.name === 'up') {
            this.choice--;
          if (this.choice < 0) {
            this.choice= this.choices.length - 1;
          }
          this.render();
        } else if (key.name === 'return') {
          this.haveSelected = true;
          this.render();
          this.close();
          this.emit('exit', this.choices[this.choice]);
        }
    }
    render=()=>{
        this.output.unmute();
       
        this.clean();
        const content = this.getContent()
        this.output.write(content);
        // this.output.mute();
    }
    getContent = ()=>{
        if (!this.haveSelected) {
            let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[0m\x1B[2m(Use arrow keys)\x1B[22m\n';
            this.choices.forEach((choice, index) => {
              if (index === this.choice) {
                // 判断是否为最后一个元素，如果是，则不加\n
                if (index === this.choices.length - 1) {
                  title += '\x1B[36m❯ ' + choice + '\x1B[39m ';
                } else {
                  title += '\x1B[36m❯ ' + choice + '\x1B[39m \n';
                }
              } else {
                if (index === this.choices.length - 1) {
                  title += '  ' + choice;
                } else {
                  title += '  ' + choice + '\n';
                }
              }
            });
            this.height = this.choices.length + 1;
            return title;
          } else {
            // 输入结束后的逻辑
            const name = this.choices[this.choice];
            let title = '\x1B[32m?\x1B[39m \x1B[1m' + this.message + '\x1B[22m\x1B[0m \x1B[36m' + name + '\x1B[39m\x1B[0m \n';
            return title;
          }
    }
    clean =()=>{
        const emptyLines = ansiEscapes.eraseLines(this.height);
        this.output.write(emptyLines);
    }
    close=()=>{
        this.height = 0;
        this.output.unmute();
        this.rl.output.end();
        this.rl.pause()
        this.rl.close();
    }
}
prompt(options).then((ans)=>{
    console.log('ans',ans)
})
