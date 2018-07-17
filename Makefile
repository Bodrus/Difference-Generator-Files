install: 
	install-deps

install-deps:
	npm install

run : 
	npm run babel-node -- 'src/bin/gendiff.js' 10

test:
	npm test

build:
	rm -rf dist
	npm run build

publish:
	npm publish

lint:
	npm run eslint .

.PHONY: test