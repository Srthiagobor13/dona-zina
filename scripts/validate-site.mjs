import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.join(rootDir, 'novo');
const pages = ['index.html', 'produtos.html', 'galeria.html'];
const errors = [];

for (const page of pages) {
  const pagePath = path.join(siteDir, page);
  const html = fs.readFileSync(pagePath, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);

  if (duplicateIds.length) {
    errors.push(`${page}: IDs duplicados: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const reference = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/.test(reference)) continue;

    const cleanReference = reference.split('#')[0].split('?')[0];
    if (!cleanReference) continue;

    const target = path.resolve(siteDir, cleanReference);
    if (!fs.existsSync(target)) errors.push(`${page}: referência ausente: ${reference}`);
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${page}: JSON-LD inválido: ${error.message}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Validação concluída: links locais, assets, IDs e JSON-LD estão consistentes.');
