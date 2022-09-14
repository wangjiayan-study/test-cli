function stepRead (callback) {
    const input = process.stdin
    const output = process.stdout
    let line = ''
    // 3、把输入的字符串一个个输出
    function onkeypress(s){
        output.write(s)
        line += s
        switch (s){
            case '\r':
                input.pause()
                callback(line)
                break
        }
    }
    emitKeypressEvents(input)
    input.on('keypress',onkeypress)
    input.on('end', ontermend);
    input.setRawMode(true)
    input.resume()
}

function emitKeypressEvents(stream){
    const g = emitKey(stream)
    const onData = function(chunk){
        //当 next 传入参数的时候，该参数会作为上一步yield的返回值。
        g.next(chunk.toString())
    }
    // 1、先执行第一次，在yield语句之前执行
    g.next()
    // 1、监听输入流，在输入流里面再执行一次
    stream.on('data',onData)
}

function* emitKey (stream) {
    // 这里是一个while循环，相当于有无限个yield语句
    while (true){
        let ch = yield
        // 2、触发了keypress的监听函数，把刚才中断前的值emit出去
        stream.emit('keypress',ch)
    }
}


function ontermend(){
    console.log('ontermend',ontermend)
}

stepRead(fn)

function fn ( data){
    console.log('我是回调',data)
}