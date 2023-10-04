import fs from 'node:fs';
import path from 'node:path';
import {test, expect} from 'vitest';

test('bin file existence', () => {
  const binPath = path.resolve('./dist/esm/bin.js');
  expect(fs.existsSync(binPath)).toBe(true);
});
