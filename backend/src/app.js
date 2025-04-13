import express from 'express'
const app = express()
const port = 7777

app.use((req, res) => { 
  res.send("Hello from the server")
 })
app.listen(port, () => console.log(`Server is successfully listening on port ${port}!`))