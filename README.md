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
