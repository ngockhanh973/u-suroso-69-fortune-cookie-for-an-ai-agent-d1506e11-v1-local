// Fortune Cookie for an AI Agent — v2, local build.
// The whole entry is a single finished line kept in entry.txt.
// This file only carries that line to the grader's output spot,
// untouched, so the judge reads exactly what the repo stores.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const base = dirname(fileURLToPath(import.meta.url));
const slip = readFileSync(join(base, 'entry.txt'), 'utf8');

// A fortune slip must hold real text and fit the gate: 1 to 140
// characters. A blank file or an over-long line fails the build
// here, before the grader ever sees it.
const usable = slip.trim().length;
if (usable === 0 || slip.length > 140) {
  throw new Error(`fortune is ${slip.length} chars; gate allows 1-140`);
}

const dest = process.env.MAKEFUN_OUTPUT_DIR ?? join(base, 'out');
mkdirSync(dest, { recursive: true });
writeFileSync(join(dest, 'entry.txt'), slip);
