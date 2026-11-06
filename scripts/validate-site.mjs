import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.join(rootDir, 'novo');
const pages = ['index.html', 'produtos.html', 'galeria.html'];
const publicOrigin = 'https://donazinacoisadivo.vercel.app';
const verificationFile = 'google5eae93b57f7080cb.html';
const verificationToken = `google-site-verification: ${verificationFile}`;
const errors = [];

for (const page of pages) {
  const pagePath = path.join(siteDir, page);
  const html = fs.readFileSync(pagePath, 'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)">/)?.[1];

  if (duplicateIds.length) {
    errors.push(`${page}: IDs duplicados: ${[...new Set(duplicateIds)].join(', ')}`);
  }

  if (!canonical?.startsWith(`${publicOrigin}/novo/`)) {
    errors.push(`${page}: URL canônica ausente ou fora do domínio público`);
  }
  if (!html.includes('<meta name="robots" content="index, follow')) {
    errors.push(`${page}: meta robots index/follow ausente`);
  }
  if (!html.includes('<meta name="twitter:card" content="summary_large_image">')) {
    errors.push(`${page}: Twitter Card ausente`);
  }
  if (!html.includes('"@type": "WebSite"') || !html.includes('"@type": "HomeGoodsStore"')) {
    errors.push(`${page}: dados estruturados de site ou negócio local ausentes`);
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

for (const requiredFile of ['robots.txt', 'sitemap.xml']) {
  if (!fs.existsSync(path.join(rootDir, requiredFile))) errors.push(`raiz: ${requiredFile} ausente`);
  if (!fs.existsSync(path.join(siteDir, requiredFile))) errors.push(`novo: ${requiredFile} ausente`);
}

for (const directory of [rootDir, siteDir]) {
  const verificationPath = path.join(directory, verificationFile);
  const label = directory === rootDir ? 'raiz' : 'novo';

  if (!fs.existsSync(verificationPath)) {
    errors.push(`${label}: arquivo de verificação do Google ausente`);
    continue;
  }

  if (fs.readFileSync(verificationPath, 'utf8').trim() !== verificationToken) {
    errors.push(`${label}: token de verificação do Google inválido`);
  }
}

const sitemap = fs.existsSync(path.join(rootDir, 'sitemap.xml'))
  ? fs.readFileSync(path.join(rootDir, 'sitemap.xml'), 'utf8')
  : '';
for (const page of pages) {
  const expectedUrl = page === 'index.html'
    ? `${publicOrigin}/novo/`
    : `${publicOrigin}/novo/${page}`;
  if (!sitemap.includes(`<loc>${expectedUrl}</loc>`)) errors.push(`sitemap: URL ausente: ${expectedUrl}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Validação concluída: links, assets, IDs, JSON-LD, metadados, robots, sitemap e verificação do Google estão consistentes.');
