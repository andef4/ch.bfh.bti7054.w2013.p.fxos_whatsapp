help:
	@echo Available commands:
	@echo make node
	@echo make browse
	@echo make watch_node
	@echo make watch_browser

node:
	mkdir -p out_node/
	tsc -m commonjs --outDir out_node/ ts/*.ts	

watch_node:
	mkdir -p out_node/
	tsc -m commonjs --outDir out_node/ ts/*.ts -w

browser:
	mkdir -p out_browser/
	tsc -m amd  --outDir out_browser/ --sourcemap ts/*.ts	

watch_browser:
	mkdir -p out_browser/
	tsc -m amd --outDir out_browser/ --sourcemap ts/*.ts -w	

