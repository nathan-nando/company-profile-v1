# Load variables from .env
include .env
export $(shell sed 's/=.*//' .env)

# GitHub Container Registry image info
IMAGE_NAME = ghcr.io/andreejait/company-profile
TAG = development

# Build image for production
build:
	docker build -t $(IMAGE_NAME):$(TAG) .

# Push image to GHCR
push:
	echo "$(REGISTRY_TOKEN)" | docker login ghcr.io -u "$(REGISTRY_USERNAME)" --password-stdin
	docker push $(IMAGE_NAME):$(TAG)

# Build & Push in one command
deploy: build push

# Run image locally
run:
	docker run --env-file .env -p 3000:3000 $(IMAGE_NAME):$(TAG)

# Clean local image
clean:
	docker rmi $(IMAGE_NAME):$(TAG) || true