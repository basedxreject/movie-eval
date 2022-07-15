# json-server

### Creat your own json-server

> **1st**: Clone this repository.

> **2nd**: Under this repo, run: npm install

> **3rd**: Start this json-server, run: npm start

### Run your json-server: npm start
Check the server port (default port should be 4232).

On browser, check json-server main page(http://localhost:4232 ) for our json-server.

Click “/posts”, check our posts data. (http://localhost:4232/posts)

# Try it:

```javascript
fetch('http://localhost:4232/posts/1')
  .then(response => response.json())
  .then(json => console.log(json))
