.PHONY: build prod dev stage lint deps

build:
	yarn build

prod: production
production:
	yarn build --mode=production

dev:
	yarn build --mode=dev

stage: staging
staging:
	yarn build --mode=staging

lint:
	yarn lint
	$(MAKE) -C server lint

deps:
	yarn
	$(MAKE) -C server deps

dev_deps:
	yarn
	$(MAKE) -C server dev_deps
