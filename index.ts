import express from 'express'
import router from "./router/api"
import cors from 'cors'

const app = express()
const port = 8089

app.use(express.json())
app.use(cors()) // 允许cors跨域
app.use('/api',router)

app.listen(port, () => {
  console.log('express listen on:', `http://127.0.0.1:${port}`)
})


