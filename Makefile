.PHONY: build prod dev stage lint deps

prod: production
production:
	yarn build --mode=production
	$(MAKE) -C server build

dev:
	yarn build --mode=dev
	$(MAKE) -C server build

stage: staging
staging:
	yarn build --mode=staging
	$(MAKE) -C server build

lint:
	yarn lint
	$(MAKE) -C server lint

deps:
	yarn
	$(MAKE) -C server deps

dev_deps:
	yarn
	$(MAKE) -C server dev_deps

terraform:
	terraform -chdir=./terraform init

deploy:
	terraform -chdir=./terraform apply -auto-approve
