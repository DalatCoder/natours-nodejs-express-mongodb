# NodeJS, Express, MongoDB & More 2022

## 1. Course structure

![Image](assets/structure.png)

## 2. Intro

### 2.1. What is NodeJS & Why?

> NodeJS is a JavaScript runtime built on Google's open-source V8 Javascript engine

NodeJS just like a conainer, like an environment, in which a program written in JS
can be executed, but outside of any browser whatsoever

![Image](assets/nodejs.png)

![Image](assets/nodejs1.png)

![Image](assets/nodejs2.png)

### 2.2. Using modules

Read NodeJS docs for modules

```js
const fs = require('fs');

const textIn = fs.readFileSync('text.txt', 'utf-8');
console.log(textIn);

const textOut = 'Text out';
fs.writeFileSync('out.txt', textOut);
```

### 2.3. Blocking and Non-blocking: Asynchronous Nature of NodeJS

- **Synchronous** way: each statement is basically processed one after another, line by line
- **Asynchronous** non-blocking code: we upload heavy work to basically be worked on in the background. And then,
  when that work is done, a callback function that we register before is called to handle the result. And during all
  that time, the rest of the code can still be executing without being blocked by the heavy task, which is now running
  in the background

![Image](assets/async1.png)

What problem with blocking code execution in NodeJS?

- In NodeJS process: this is where our NodeJS app runs
- There's only one single thread

  - The thread is just like a set of instructions that is run in the computer's CPU
  - The thread is where our code is actually executed in a machine's processor

NodeJS is basically single-threaded. For each application, there's only one thread.
That's just the way NodeJS was designed.

So in the picture, all users will be executed all in the same thread at the same place in
the computer running the application.

And that is true no matter if you have 5 users, like in this picture, or 5.000 or 5.000.000 users.
Now, what this also means is that when one user locks the single thread with synchronous code, then all
other users will have to wait for that execution to finish.

Synchronous way

![Image](assets/async2.png)

Asynchronous way, non-block I/O model. Non-blocking input, output such as reading a file, call an api with request,...

![Image](assets/async3.png)

NodeJS uses callback so often

![Image](assets/async4.png)

Callback hell

![Image](assets/async5.png)

### 2.4. Create a simple web server

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
```

- `createServer` accepts a callback function, which will be fired off each time
  a new request hits our server.

- `listen` listens for incomming requests from the client

- run the application: `node index.js`

- the app keeps running, that's because of something called the event loop. It is
  obvious that the app cannot really exit right away, because then we could not
  receive any new requests.

- to exit the application, press `Ctrl C`

### 2.5. Routing

Routing basically means implementing different actions for different URLs.

Routing can actually become very very complicated in a big, real world application,
and so in that case we use a tool for that like `Express`

For analyzing the url, we use another module called `url`.

Basic routing bases on some `if-else` statements

```js
const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is the overview page');
  } else if (pathName === '/product') {
    res.end('This is the product page');
  } else {
    const header = {
      'Content-type': 'text/html',
      'my-own-header': 'Hello World',
    };
    res.writeHead(404, header);

    res.end('<h1>Page not found</h1>');
  }
});
```
