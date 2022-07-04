const http = require('http')
const url = require('url')
const fs = require('fs')

const jsonData = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const products = JSON.parse(jsonData)

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview page')
  }
  else if (pathName === '/product') {
    res.end('This is the product page')
  }
  else if (pathName === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(jsonData)
  }
  else {
    const header = {
      'Content-type': 'text/html',
      'my-own-header': 'Hello World'
    }
    res.writeHead(404, header)

    res.end('<h1>Page not found</h1>')
  }

})

const port = 8000
const host = '127.0.0.1'

server.listen(port, host, () => {
  console.log(`Listening to requests on ${host}:${port}`)
})
