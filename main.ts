// Fortune Cookie for an AI Agent — v1 (local).
// This program does one small job: it carries the finished fortune
// from entry.txt into the file the grader reads, byte for byte.
// Nothing is generated, trimmed, or reformatted along the way, so
// the text the judge sees is exactly the text stored in the repo.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve paths from this file's own location, not from the caller's
// working directory, so the run behaves the same from anywhere.
const here = dirname(fileURLToPath(import.meta.url));
const fortune = readFileSync(join(here, 'entry.txt'));

// The harness tells us where to put the output; without it we use a
// local folder with the same name, so a manual run still works.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, 'out');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// Fail loudly instead of handing the grader a blank or over-long
// slip: the gate only accepts 1 to 140 characters of real text.
const text = fortune.toString('utf8');
if (text.trim().length === 0 || text.length > 140) {
  throw new Error(`entry.txt is ${text.length} chars; the gate needs 1-140`);
}
writeFileSync(join(outDir, 'entry.txt'), fortune);
