define GetFromPkg
$(shell node -p "require('./package.json').$(1)")
endef

NAME         := $(call GetFromPkg,name)
DOCKERREPO   := $(call GetFromPkg,dockerRepo)
DESCRIPTION  := $(call GetFromPkg,description)
PROJECT_URL  := $(call GetFromPkg,repository)
LAST_VERSION := $(call GetFromPkg,version)

COMMIT       := $$(git log -1 --pretty=%h)
IMG          := ${DOCKERREPO}/${NAME}:${COMMIT}
RELEASE      := ${DOCKERREPO}/${NAME}:${VERSION }
LATEST       := ${DOCKERREPO}/${NAME}:latest
VERSION      := $$(git describe --tags --abbrev=0)

build:
	@docker build -t ${IMG} .
	@docker tag ${IMG} ${LATEST}
 
push:
	@docker push ${DOCKERREPO}/${NAME}
 
login:
	@docker log -u ${DOCKER_USER} -p ${DOCKER_PASS}

echo:
	@echo "LAST_VERSION ${LAST_VERSION}"

default: build 
