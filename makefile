
all: build

build: build_library build_storybook
build_library:
	@echo "Building..."
	@yarn run rollup

build_storybook:
	@echo "Building story..."
	@yarn run build-storybook

install_deps:
	@yarn install --frozen-lockfile

test:
	@echo "Running tests..."
	@yarn run test

run: story
story:
	@echo "Building storybook..."
	@yarn run storybook