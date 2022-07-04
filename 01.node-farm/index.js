const http = require('http')
const url = require('url')

const server = http.createServer((req, res) => {
  const pathName = req.url

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview page')
  }
  else if (pathName === '/product') {
    res.end('This is the product page')
  } else {
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
