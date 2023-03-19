/*
    dependecias
*/
const express = require('express')

/*
    config - express
*/
const app = express()
/*
    endpoint
*/

app.get('/', (request, response) => {
    response.send('Eu consegui!')
  })
/*
    listen
*/
const port = 3000



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})