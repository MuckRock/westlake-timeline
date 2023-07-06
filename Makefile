# workflow

MAP_ID=Westlake-axmMcoSMReOEa2ngZ8FS9CA
CONTENT_DEST=src/content/data.json

install:
	npm ci

update:
	mkdir -p $(dir $(CONTENT_DEST))
	./scripts/felt.sh $(MAP_ID) > $(CONTENT_DEST)

build:
	npm run build

preview:
	npm run preview

publish:
