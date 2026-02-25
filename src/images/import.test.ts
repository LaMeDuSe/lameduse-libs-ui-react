import fs from 'fs';
import path from 'path';
import { describe, it, expect } from 'vitest';
import * as exportedModules from './index'; // Adjust path if needed

const SRC_DIR = __dirname;

describe('index.ts exports all subdirectories correctly', () => {
  it('should export all subdirectories that have an index.ts or index.js', () => {
    const subdirs = fs.readdirSync(SRC_DIR, { withFileTypes: true })
      .filter(dirent =>
        dirent.isDirectory() &&
        (fs.existsSync(path.join(SRC_DIR, dirent.name, 'index.ts')) ||
          fs.existsSync(path.join(SRC_DIR, dirent.name, 'index.js')))
      )
      .map(dirent => dirent.name);

    const exportedKeys = Object.keys(exportedModules);

    subdirs.forEach(dir => {
      if (dir === 'Template') return; // Skip the Template directory as it is not a component
      expect(exportedKeys).toContain(dir);
    });
  });
});

describe('all sub components have a test file', () => {
  it('should have a test file for each sub component', () => {
    const subdirs = fs.readdirSync(SRC_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    subdirs.forEach(dir => {
      const testFilePath = path.join(SRC_DIR, dir, `${dir}.test.tsx`);
      try {
        expect(fs.existsSync(testFilePath)).toBe(true);
      } catch (error) {
        console.error(`Test file not found for ${dir}:`, error);
        throw error; // Re-throw the error to fail the test
      }
    });
  });
});

describe('all sub components have a file of their name', () => {
  it('should have a file named for each sub component', () => {
    const subdirs = fs.readdirSync(SRC_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    subdirs.forEach(dir => {
      const testFilePath = path.join(SRC_DIR, dir, `${dir}.tsx`);
      try {
        expect(fs.existsSync(testFilePath)).toBe(true);
      } catch (error) {
        console.error(`File not found for ${dir}:`, error);
        throw error; // Re-throw the error to fail the test
      }
    });
  });
});