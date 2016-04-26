component = ./node_modules/.bin/component

run: node_modules client/components
	@mkdir -p tmp
	node server.js

node_modules:
	@npm install

client/components:
	@$(MAKE) --no-print-directory -C client -B

.PHONY: run
