export * from './components';

import * as components from './components';
import * as blocs from './blocs';

// This does nothing for build output, but it does ensure that there is no overlap between the keys of the components and blocs objects.
// This is a TypeScript feature called "type widening" that allows us to ensure that the keys of the components and blocs objects do not overlap.
// If they do overlap, TypeScript will throw an error.
// This is a way to ensure that we don't accidentally overwrite a component with a bloc or vice versa.
type ComponentKeys = keyof typeof components;
type BlocKeys = keyof typeof blocs;

type ConflictingKeys = ComponentKeys & BlocKeys;

type EnsureNoConflicts<T extends never> = T;
type _ErrorIfConflicts = EnsureNoConflicts<ConflictingKeys>;
// End of TypeScript feature

export const LameduseUI = {
  ...components,
  ...blocs,
};