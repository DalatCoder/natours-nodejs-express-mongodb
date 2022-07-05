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
  } else if (pathName === '/api') {
    res.end('This is the API');
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

### 2.6. Building a very simple API

Web API basically a service from which we can request some data

Let's define a very simple API

In Node, the `dot` in `fs.readFile('./dev-data/data.json')` actually refers to the
directory from which we run the node command in the terminal.

If we move the `index.js` to another place and then executed it. The `.` will point
to the wrong location. So, to fix that, we use the variable called `__dirname`

The best practice is to use the variable `__dirname`

```js
else if (pathName === '/api') {
  res.writeHead(200, { 'Content-type': 'application/json' })
  res.end(jsonData)
}
```

## 3. Node Package Manager (NPM)

- `npm init -y`
- `package.json` a configuration file for our projects

### 3.1. Types of packages and Installs

Types of packages

- Dependencies: package that we will include in our own code. Our project depends our those code to work correctly.
- Development dependencies: package that we will use to develop our applications.

Installs

- Dependencies: `npm install express`
- Development dependencies: `npm install nodemon --save-dev`

Types of installs

- Local: only availabe in our project folder
- Global: availabe anywhere in our machine

To use `command` from local dependencies, we have to specify some `npm script` in `package.json`

```json
"scripts": {
    "start": "nodemon index.js"
}
```

To start the server now, run: `npm run start`

### 3.2. Package versioning and updating

Most packages on npm follows the _Semantic version notation_, which means that
their version numbers is always expressed with these three numbers.

- The first number is called the `major version`: huge new release which can have breaking changes
- The second numer is called the `minor version`: introduces new features into the package, but it does not include breaking changes
- The third number is called the `patch version`: bugs fixed

Updating the package

- Check outdate package: `npm outdated`
- Install package with a certain version number: `npm install slugify@1.0.0`
- Run `npm update <package_name>`
- The `^` means we accept `patch` and `minor` updates
- The `~` means we accept `patch` updates
- The `*` means we accept all of the version updates

## 4. Introduction to Back-end Development

### 4.1. An overview of how the web works?

- What does actually happens each time that we type a URL into our browser in order to
  open up a new webpage?
- Or each time that we request data from some API?

Well, the most simpler answer is that our browser which is also called a client sends
a request to the server where the webpage is hosted. And the server will then send back
a response, which is gonna contain the webpage that we just requested.

This process is called the `request-response model` or also the `client-server architecture`

![Image](assets/clientserver.png)

Structure of an URL: `https://www.google.com/maps`

- Protocol: `HTTP` or `HTTPS` talk later
- Domain name: `www.google.com`
- Resource: `/maps` the resource that we want to access

The domain name is not actually the address of the server, but just the nice name
that is easy for us to memorize.

`DNS` is a way of converting the domain name to the real address of the server.
This happens through your internet service provider (ISP)

![Image](assets/clientserver1.png)

And this is how the real IP address looks like: `https://216.58.211.206:443`

![Image](assets/clientserver2.png)

- Protocol
- IP Address: `216.58.211.206`
- Port number: `443`, to identify a specific service running on a server and
  so you can think of it like a sub-address

When we have the real web address, a TCP socket connection is established
between the browser and the server, which are now finally connected. And this
connection is typically kept alive for the entire time it takes to transfer all
the files of the website.

- TCP is the Tranmission Control Protocol
- IP is the Internet Protocol

Together, they are communication protocols that define exactly how data
travels across the web.

Then, client makes an `HTTP request`, where `HTTP` stands for `HyperText Transfer Protocol`.
So after `TCP/IP`, `HTTP` is yet another communication protocol. And by the way, the
communication protocol is simply a system of rules that allows two or more
parties to communicate.

`HTTP` is just a protocol that allows clients and web servers to communicate by
sending requests and response messages from client to server and back.

An `HTTP` request to the server is not only for `getting data`, but we can
also `send data`.

An `HTTP` response message also looks quite similar to the request.

This is a single `request-response` cycle

![Image](assets/clientserver3.png)

When we do the first request, all we get back is just the initial HTML file.
That file will then gets scanned for all the assets that it needs to build the
entire website like Javascript, CSS files, images files or other assets. And for
each of different files, the browser will then make a new `HTTP request` to the
server.

There can be multiple requests and responses happening at the same time. But the
amount is actually limited because the connection would start to slow down.

And then, when all the files have arrived, the website is rendered in the browser.

![Image](assets/clientserver4.png)

Some more words about TPC/IP

- The job of TCP is to break out the requests and responses into thousands of
  small chunks called `packets` before they are sent.
- Then, once they get to their destination, it will reassemble all the packets into
  the original request or response. So that the message arrives at the destination
  as quick as possible, which would not be possible if we sent the website as one
  big chunk.
- The job of IP is to actually send and route all these packets through the internet.
  It ensures that all of them arrive at the destination that they should go using IP
  addresses on each packet.

### 4.2. Frontend vs. Backend Development

In order to distinguish between the frontend and the backend of a website, we still
consider the same client-server architecture

In general terms

- Frontend development is about everything that happens in the web browser.

  - Designing & Building the final website that gonna be visible to the user
  - Basic techs: HTML, CSS, JS
  - Modern tools: React, Angular, Redux, GraphQL,...

- Backend development is about everything that happens on the web server. So everything
  that is invisible to the final user.

- A server is really just a computer that is connected to the internet, which:

  - First, stores a website's files like HTML, CSS and images,...
  - Second, runs an HTTP server that is capable of understanding URLs, requests, and also
    delivering responses.

- A simple web server like the image below is called a static server. Because all is can really
  do is to serve static files to the client via HTTP. If you just need to host a simple website,
  then this is really all you need.

![Image](assets/frontendbackend.png)

- If you want to create dynamic web applications that talk to databases and all
  that good stuff, we use a server that is also capable of running our dynamic application.
  This is then called a `dynamic server`, where we have our app running, an HTTP server, and
  of course, the files all talking to each other.

- Some usual stuffs that is handled on the backend or the server side are:

  - create user profiles
  - perform login
  - send emails
  - handle payment
  - retrieve and send request data from a database to the client
  - manipulate data in the databse
  - fill up website templates

![Image](assets/frontendbackend1.png)

### 4.3. Static vs Dynamic vs API

![Image](assets/staticvsdynamicvsapi.png)

![Image](assets/dynamicvsapi.png)

![Image](assets/api.png)

## 5. How NodeJS Look behind the scene

### 5.1. Node, V8, Libuv and C++

Node dependencies:

- V8 Javascript engine: understanding Javascript code, convert JS code into machine code
- Libuv: focus on asynchronous IO, this layer give Node access to the underlying computer
  operating system, file system, networking, and more. Besides that, `libuv` also
  implements two extremely important features of NodeJS

  - Event loop: responsible for handling easy tasks like executing call backs and network IO
  - Thread pool: responsible for more heavy work like file access or compressionor something like that

Libuv is completely written in C++ and not in Javascript. And V8 itself, also uses C++
code besides Javascript. So therefore, Node itself is a program written in C++ and Javascript.

The beauty of this is that NodeJS ties all these library together, no matter if written in C++
or Javascript and then gives us developers access to their functions in pure Javascript. So it
really provides us with a very nice layer of abstraction.

So again, this architecture allows us to write 100% pure JS code running in NodeJS
and still access functions like for file reading, which behind the scenes are
actually implemented in `libuv` or other libraries in the `C++` language.

Other libraries that `NodeJS` depends on:

- `http-parser`: parse HTTP
- `c-ares`: DNS requests stuff
- `OpenSSL`: cryptography
- `zlib`: compression

![Image](assets/nodearchitecture.png)
