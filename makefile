
all: build

build: build_library build_storybook
build_library:
	@echo "Building..."
	@npm run rollup

build_storybook:
	@echo "Building story..."
	@npm run build-storybook

install_deps:
	@npm ci

test:
	@echo "Running tests..."
	@npm run test

run: story
story:
	@echo "Building storybook..."
	@npm run storybook