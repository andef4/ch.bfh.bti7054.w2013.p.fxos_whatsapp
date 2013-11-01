mkdir -p js
tsc -w -m amd --noImplicitAny --outDir js --sourcemap ts/*.ts
