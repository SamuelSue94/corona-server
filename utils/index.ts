import fs from 'fs'
import path from 'path'


function readJson() {
  const filePath = path.resolve(__dirname, "../resource/area.json")
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err)
      resolve(JSON.parse(data))
    })
  })
}

export {readJson}
