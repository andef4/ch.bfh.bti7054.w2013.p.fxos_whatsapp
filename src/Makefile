help:
	@echo Available commands:
	@echo make node
	@echo make browse
	@echo make watch_node
	@echo make watch_browser

node:
	mkdir -p out_node/
	tsc -m commonjs --outDir out_node/ ts/*.ts ts/*/*.ts	

watch_node:
	mkdir -p out_node/
	tsc -m commonjs --outDir out_node/ ts/*.ts ts/*/*.ts -w

fxos:
	mkdir -p out_fxos/
	tsc -m amd  --outDir out_fxos/ --sourcemap ts/*.ts ts/*/*.ts	

watch_fxos:
	mkdir -p fxos_js/
	tsc -m amd --outDir out_fxos/ --sourcemap ts/*.ts ts/*/*.ts -w	

