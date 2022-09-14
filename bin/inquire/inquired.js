const inquirer = require('inquirer')

inquirer
  .prompt([
    {
        name:'name',
        message:'请输入你的名字',
        type:'list',
        choices:['佳燕','佳新','建秋']

    },{
        name:'address',
        message:'请输入你的地址',
        type:'input',
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log('answers',answers)

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });