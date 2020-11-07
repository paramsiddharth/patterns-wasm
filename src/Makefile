test:
	gcc pattern.c -o pattern.out

build:
	emcc -o ../data/pattern.js pattern.c -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -s EXPORTED_FUNCTIONS='["_pattern"]'