# workflow

MAP_ID=Westlake-axmMcoSMReOEa2ngZ8FS9CA
CONTENT_DEST=src/content/data.json

install:
	npm ci

update:
	mkdir -p $(dir $(CONTENT_DEST))
	./scripts/felt.js $(MAP_ID) > $(CONTENT_DEST)

build:
	MODE=demo npm run build
	npm run build
	touch dist/.nojekyll

preview:
	npm run preview

publish:
	git push

clean:
	rm -r dist
