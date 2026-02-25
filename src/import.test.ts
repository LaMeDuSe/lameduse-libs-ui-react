import LameduseUI from ".";

import * as components from "./components";
import * as blocs from "./blocs";
import * as images from "./images";

import { describe, it, expect } from 'vitest';

describe("LameduseUI", () => {
  it("should export all components and blocs", () => {
    const componentKeys = Object.keys(components);
    const blocKeys = Object.keys(blocs);
    const imageKeys = Object.keys(images);


    // Check if all components are exported
    componentKeys.forEach((key) => {
      expect(LameduseUI).toHaveProperty(key);
    });

    // Check if all blocs are exported
    blocKeys.forEach((key) => {
      expect(LameduseUI).toHaveProperty(key);
    });

    // Check if all images are exported
    imageKeys.forEach((key) => {
      expect(LameduseUI).toHaveProperty(key);
    });
  });
});

describe("LameduseUI components and blocs", () => {
  it("should not have conflicting keys between components and blocs", () => {
    const componentKeys = Object.keys(components);
    const blocKeys = Object.keys(blocs);

    const conflictingKeys = componentKeys.filter((key) => blocKeys.includes(key));

    expect(conflictingKeys).toEqual([]);
  });
});

