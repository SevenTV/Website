all: production

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

deps:
	yarn
