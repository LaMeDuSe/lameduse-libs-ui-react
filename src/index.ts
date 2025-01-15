export * from './components';
export * from './context';

import * as components from './components';
import * as context from './context';

const LameduseUI = {
  ...components,
  ...context
};
export default LameduseUI;