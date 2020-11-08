# Pattern Generator
A pattern generator coded in C and used in a webpage using WebAssembly.

## Tools
The following tools would be required:
- The Emscripten SDK (with `emcc`) and GCC : To compile the C source code to WASM and generate the JavaScript glue.
- The Node Package Manager (`npm`) : To install the dependencies and start the server.

## Development
### Compiling to WebAssembly
When inside the `src` directory, use GNU Make to compile the Pattern generator source code in C to WebAssembly by executing:
``` bash
make
```

This simply executes the following, exporting the `pattern` function to `data/pattern.wasm` and its glue-code to `data/pattern.js`:
``` bash
emcc -o ../data/pattern.js pattern.c -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -s EXPORTED_FUNCTIONS='["_pattern"]'
```

`cwrap` is preferred over `ccall` because it lets us create a JavaScript wrapper around the C function, which we can call like any normal JavaScript function to receive the output.

Optionally, one may test the `pattern` function by compiling `pattern.c` to an executable binary using GCC. The main function's job is only to run the user-defined test, and hence is not exported while building `pattern.wasm`. It can be done by executing:
``` bash
make test
```

### Starting the Server
Install the dependencies via `package.json` using:
``` bash
npm install
```

Start the local server at port 3000 using:
``` bash
npm start
```

The application will be running at http://localhost:3000/.  
\
\
Made with ❤ by Param.