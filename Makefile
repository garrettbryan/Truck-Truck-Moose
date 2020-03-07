define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

NAME   := garrettbryan/truck-truck-moose-ui
TAG    := $$(git log -1 --pretty=%h)
IMG    := ${NAME}:${TAG}
LATEST := ${NAME}:latest
VERSION := $$(git describe --tags --abbrev=0)
LAST_VERSION := $(call GetFromPkg,version)
 
build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}
 
push:
	@docker push ${NAME}
 
login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}

echo:
	@echo "TAG ${TAG}"

default: build 
