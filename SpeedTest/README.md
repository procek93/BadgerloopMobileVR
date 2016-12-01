# Relative Time Difference
TODO: Think of a name for this

## Getting the repo
  - click the green "clone or download" button 
    - download the zip and extract it
    - or clone it 
        - `git clone https://github.com/sjfricke/ThreeJS_demo.git` 

## Running the server and testing your code
- Need [Node.JS](http://nodejs.org/en/download/) to run
- Check by type `node -v` in terminal/command prompt
- `cd` to the directory where you are holding the files
- run `npm install` in the parent directory
    - this installs the library for running the server into a folder called `node_modules`
    - You need to run this as a server to prevent Cross Origin issues
- To run server: `node server`
- Open a new tab and type `localhost:8000` in your browser
- Just refresh the webpage when you make changes

## What are these files?!?!?!
from looking at the top parent directory here is what each folder/file is for

- `server.js`
    - Node.js server script code  
- `public/index.html`
    - The HTML page loaded 
- `public/main.js`
    - Javscript file running the code
    - Called from in the HTML file
- `public/three.min.js`
    - Javacript file containing THREE.js
- `package.json`
    - why npm install worked
- `node_modules`
    - holds the library for node