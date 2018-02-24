const
  fs = require('fs'),
  { promisify } = require('util')

const mkdir = promisify(fs.mkdir)
const dirExists = promisify(fs.exists)

const tester = async (dir) => {
  try {
    let val = await dirExists(dir)
    if (!val) {
      let success = await mkdir(dir)
      console.log('created')
    } else {
      console.log('exists')
    }
  }
  catch (err) {
    console.log(err)
  }
}
const foo = async () => {

  await tester('butts')
  await tester('butts')
}
foo()


