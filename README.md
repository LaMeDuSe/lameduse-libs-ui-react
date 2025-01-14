# LaMeDuSe Libs UI React

Contains the React components for the LaMeDuSe Libs UI.

## Note for external users

This package designed to work with / in LaMeDuSe Environment is not as today designed to be generic and used in other projects.

BUT, if you want to use it you can and this is how.

## Using the package

If you want to use it first you will need to create a fork.

Doing so, you will need to :

- rename the package.
- change the build pipeline to match your environment.
- change the tailwind configuration to match your brand.
- change the font to match your brand. (Fonts are in /src/assets/fonts and imported in /src/styles/base.css)
  - Note : The font are exported with the library.

## Usage

You can use the library in multiples ways.

### Specific import

```jsx
import { Button } from 'lameduse-libs-ui-react';

const App = () => {
  return (
    <Button>Click me</Button>
  );
};
```

### Global import

```jsx
import LameduseUI from 'lameduse-libs-ui-react';

const App = () => {
  return (
    <LameduseUI.Button>Click me</LameduseUI.Button>
  );
};
```

### Importing styles

You can import the styles in your project by importing the css file.

```css

@import 'lameduse-libs-ui-react/dist/styles/index.css';

```

## Development

You will find a makefile in the root of the project. He is your friend for the development.

Browse the makefile to see all the commands available.

## Copyright

This package is owned by LaMeDuSe, all rights reserved.

You can use it in your project but you can't sell it or use it in a commercial project without the agreement of LaMeDuSe.
