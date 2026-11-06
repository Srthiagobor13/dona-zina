import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.join(rootDir, 'novo');
const publicOrigin = 'https://donazinacoisadivo.vercel.app';
const siteUrl = `${publicOrigin}/novo/`;
const storeId = `${siteUrl}#loja`;
const websiteId = `${siteUrl}#website`;
const lastModified = '2026-11-06';

const commonKeywords = [
  'Dona Zina Coisas di Vó',
  'Dona Zina Coisa de Vó',
  'Coisa de Vó Serra do Cipó',
  'loja na Serra do Cipó',
  'artesanato mineiro',
  'decoração afetiva',
  'mesa posta',
  'quitutes mineiros',
  'gengibre artesanal',
  'Santana do Riacho MG'
];

const pages = [
  {
    file: 'index.html',
    url: siteUrl,
    title: 'Dona Zina Coisas di Vó | Loja Coisa de Vó na Serra do Cipó',
    description: 'Visite a Dona Zina Coisas di Vó, a loja Coisa de Vó da Serra do Cipó: artesanato mineiro, quitutes, mesa posta, colchas e presentes com envio nacional.',
    ogTitle: 'Dona Zina Coisas di Vó — Artesanato e Sabores da Serra do Cipó',
    image: 'assets/img/novas/sorriso-gengibre-serra.webp',
    imageWidth: 1025,
    imageHeight: 1534,
    imageAlt: 'Dona Zina Coisas di Vó com o Gengibre da Serra artesanal',
    pageType: 'WebPage',
    pageName: 'Dona Zina Coisas di Vó na Serra do Cipó',
    about: 'Loja de artesanato, decoração afetiva, mesa posta e quitutes mineiros na Serra do Cipó'
  },
  {
    file: 'produtos.html',
    url: `${siteUrl}produtos.html`,
    title: 'Produtos Dona Zina Coisas di Vó | Artesanato e Quitutes Mineiros',
    description: 'Conheça os produtos da Dona Zina Coisas di Vó: artesanato mineiro, louças, colchas, bolsas, biscoitos, geleias e gengibre da Serra do Cipó.',
    ogTitle: 'Produtos Dona Zina — Artesanato, Quitutes e Coisas de Vó',
    image: 'assets/img/novas/cesta-artesanal-doces-caseiros.webp',
    imageWidth: 1024,
    imageHeight: 1536,
    imageAlt: 'Cesta artesanal com doces caseiros da Dona Zina Coisas di Vó',
    pageType: 'CollectionPage',
    pageName: 'Produtos Dona Zina Coisas di Vó',
    about: 'Catálogo de artesanato, decoração, mesa posta, têxteis e quitutes mineiros',
    breadcrumb: 'Produtos'
  },
  {
    file: 'galeria.html',
    url: `${siteUrl}galeria.html`,
    title: 'Galeria Dona Zina Coisas di Vó | Loja na Serra do Cipó',
    description: 'Veja fotos reais da Dona Zina Coisas di Vó, dos produtos artesanais e do galpão localizado no centrinho da Serra do Cipó, em Minas Gerais.',
    ogTitle: 'Galeria Dona Zina Coisas di Vó — Fotos Reais do Galpão',
    image: 'assets/img/espaco-loja-3.webp',
    imageWidth: 768,
    imageHeight: 1024,
    imageAlt: 'Interior do galpão Dona Zina Coisas di Vó na Serra do Cipó',
    pageType: 'ImageGallery',
    pageName: 'Galeria da Dona Zina Coisas di Vó',
    about: 'Fotos do galpão, do artesanato e dos produtos da Dona Zina na Serra do Cipó',
    breadcrumb: 'Galeria'
  }
];

const store = {
  '@type': 'HomeGoodsStore',
  '@id': storeId,
  name: 'Dona Zina Coisas di Vó',
  alternateName: [
    'Dona Zina Coisa de Vó',
    'Dona Zina Coisas de Vó',
    'Coisa de Vó Serra do Cipó'
  ],
  description: 'Loja de artesanato mineiro, decoração afetiva, mesa posta, colchas, bolsas e quitutes artesanais no centrinho da Serra do Cipó.',
  url: siteUrl,
  logo: `${siteUrl}assets/img/logo-clean.png`,
  image: [
    `${siteUrl}assets/img/novas/sorriso-gengibre-serra.webp`,
    `${siteUrl}assets/img/espaco-loja-3.webp`,
    `${siteUrl}assets/img/dona-zina-coracoes-renda.webp`
  ],
  telephone: '+55-31-99848-0011',
  priceRange: '$$',
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Pix, cartões de crédito, cartões de débito e dinheiro',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Flor de Maio, 59',
    addressLocality: 'Santana do Riacho',
    addressRegion: 'MG',
    addressCountry: 'BR'
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -19.3333,
    longitude: -43.6167
  },
  hasMap: 'https://maps.google.com/?q=Rua+Flor+de+Maio+59+Serra+do+Cipo+Santana+do+Riacho+MG',
  areaServed: [
    { '@type': 'Place', name: 'Serra do Cipó' },
    { '@type': 'AdministrativeArea', name: 'Minas Gerais' },
    { '@type': 'Country', name: 'Brasil' }
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-31-99848-0011',
    contactType: 'vendas e atendimento',
    availableLanguage: 'Portuguese',
    areaServed: 'BR'
  },
  sameAs: ['https://www.instagram.com/donazinacoisa_di_vo/'],
  knowsAbout: [
    'artesanato mineiro',
    'decoração afetiva',
    'mesa posta',
    'colchas de retalho',
    'quitutes mineiros',
    'gengibre artesanal da Serra do Cipó'
  ]
};

const website = {
  '@type': 'WebSite',
  '@id': websiteId,
  url: siteUrl,
  name: 'Dona Zina Coisas di Vó',
  alternateName: ['Dona Zina Coisa de Vó', 'Coisa de Vó Serra do Cipó'],
  description: 'Site oficial da Dona Zina Coisas di Vó na Serra do Cipó.',
  inLanguage: 'pt-BR',
  publisher: { '@id': storeId }
};

function absoluteAsset(relativePath) {
  return new URL(relativePath, siteUrl).href;
}

function buildMetadata(meta) {
  const imageUrl = absoluteAsset(meta.image);
  const keywords = [...commonKeywords];
  if (meta.file === 'produtos.html') keywords.push('presentes artesanais', 'louças artesanais', 'biscoitos caseiros');
  if (meta.file === 'galeria.html') keywords.push('fotos Serra do Cipó', 'galpão de artesanato');

  return `  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}">
  <meta name="keywords" content="${keywords.join(', ')}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <meta name="author" content="Dona Zina Coisas di Vó">
  <meta name="theme-color" content="#2D3B24">
  <meta name="geo.region" content="BR-MG">
  <meta name="geo.placename" content="Serra do Cipó, Santana do Riacho">
  <meta name="ICBM" content="-19.3333, -43.6167">
  <link rel="canonical" href="${meta.url}">

  <!-- Open Graph / Compartilhamento no WhatsApp -->
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="Dona Zina Coisas di Vó">
  <meta property="og:title" content="${meta.ogTitle}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:secure_url" content="${imageUrl}">
  <meta property="og:image:type" content="image/webp">
  <meta property="og:image:width" content="${meta.imageWidth}">
  <meta property="og:image:height" content="${meta.imageHeight}">
  <meta property="og:image:alt" content="${meta.imageAlt}">
  <meta property="og:url" content="${meta.url}">

  <!-- Twitter / X -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${meta.ogTitle}">
  <meta name="twitter:description" content="${meta.description}">
  <meta name="twitter:image" content="${imageUrl}">
  <meta name="twitter:image:alt" content="${meta.imageAlt}">`;
}

function buildStructuredData(meta, existingHtml) {
  const oldMatch = existingHtml.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
  let faq;
  if (oldMatch) {
    try {
      const oldData = JSON.parse(oldMatch[1]);
      faq = oldData['@graph']?.find(item => item['@type'] === 'FAQPage');
    } catch {
      faq = undefined;
    }
  }

  if (faq) faq['@id'] = `${meta.url}#faq`;

  const imageId = `${meta.url}#imagem-principal`;
  const pageId = `${meta.url}#pagina`;
  const page = {
    '@type': meta.pageType,
    '@id': pageId,
    url: meta.url,
    name: meta.pageName,
    description: meta.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': websiteId },
    about: { '@id': storeId },
    primaryImageOfPage: { '@id': imageId },
    dateModified: lastModified
  };

  if (meta.file === 'index.html') page.mainEntity = { '@id': storeId };

  const graph = [
    store,
    website,
    {
      '@type': 'ImageObject',
      '@id': imageId,
      url: absoluteAsset(meta.image),
      contentUrl: absoluteAsset(meta.image),
      width: meta.imageWidth,
      height: meta.imageHeight,
      caption: meta.imageAlt,
      inLanguage: 'pt-BR'
    },
    page
  ];

  if (meta.breadcrumb) {
    const breadcrumbId = `${meta.url}#breadcrumb`;
    page.breadcrumb = { '@id': breadcrumbId };
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: meta.breadcrumb, item: meta.url }
      ]
    });
  }

  if (meta.file === 'produtos.html') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${meta.url}#categorias`,
      name: 'Categorias de produtos Dona Zina Coisas di Vó',
      itemListElement: [
        ['Quitutes, geleias e doces', 'quitutes'],
        ['Mesa posta e café', 'mesa'],
        ['Bolsas artesanais', 'bolsas'],
        ['Decoração afetiva', 'decor'],
        ['Colchas e têxteis', 'texteis']
      ].map(([name, category], index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name,
        url: `${meta.url}?categoria=${category}#produtos`
      }))
    });
  }

  if (faq) graph.push(faq);
  return { '@context': 'https://schema.org', '@graph': graph };
}

for (const meta of pages) {
  const pagePath = path.join(siteDir, meta.file);
  let html = fs.readFileSync(pagePath, 'utf8');

  const metadataPattern = /  <title>[\s\S]*?(?=\n  <!-- Favicon com a logo oficial -->)/;
  if (!metadataPattern.test(html)) throw new Error(`Bloco de metadados não encontrado em ${meta.file}`);
  html = html.replace(metadataPattern, buildMetadata(meta));

  const structuredData = buildStructuredData(meta, html);
  const structuredPattern = /<script type="application\/ld\+json">\s*[\s\S]*?\s*<\/script>/;
  html = html.replace(
    structuredPattern,
    `<script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n  </script>`
  );

  if (meta.file === 'index.html') {
    html = html.replace(
      /<h1 id="hero-title" class="h1">[\s\S]*?<\/h1>/,
      `<h1 id="hero-title" class="h1">\n            Dona Zina Coisas di Vó: <em>artesanato, sabores e afeto</em> na Serra do Cipó.\n          </h1>`
    );
    html = html.replace(
      /<p class="hero-lead">[\s\S]*?<\/p>/,
      `<p class="hero-lead">\n            A <strong>Dona Zina Coisas di Vó</strong> — a loja Coisa de Vó da Serra do Cipó — reúne o legítimo sabor e acolhimento mineiro: <strong>biscoitos caseiros</strong>, <strong>geleias artesanais</strong> e <strong>doces da roça</strong> preparados com produtos do quintal, além de bolsas feitas à mão, colchas na Singer, louças de mesa posta e presentes cheios de memória.\n          </p>`
    );
  }

  if (meta.file === 'produtos.html') {
    html = html.replace(
      /<h1 id="products-page-title" class="h1">[\s\S]*?<\/h1>/,
      `<h1 id="products-page-title" class="h1">Produtos Dona Zina Coisas di Vó: <em>artesanato e sabores da Serra</em>.</h1>`
    );
  }

  if (meta.file === 'galeria.html') {
    html = html.replace(
      /<h1 id="gallery-page-title" class="h1">[\s\S]*?<\/h1>/,
      `<h1 id="gallery-page-title" class="h1">Galeria Dona Zina Coisas di Vó: <em>o galpão da Serra do Cipó</em>.</h1>`
    );
  }

  fs.writeFileSync(pagePath, html.replace(/[ \t]+$/gm, ''), 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}</loc>
    <lastmod>${lastModified}</lastmod>
    <image:image>
      <image:loc>${siteUrl}assets/img/novas/sorriso-gengibre-serra.webp</image:loc>
      <image:title>Dona Zina Coisas di Vó na Serra do Cipó</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}produtos.html</loc>
    <lastmod>${lastModified}</lastmod>
    <image:image>
      <image:loc>${siteUrl}assets/img/novas/cesta-artesanal-doces-caseiros.webp</image:loc>
      <image:title>Produtos artesanais Dona Zina Coisas di Vó</image:title>
    </image:image>
  </url>
  <url>
    <loc>${siteUrl}galeria.html</loc>
    <lastmod>${lastModified}</lastmod>
    <image:image>
      <image:loc>${siteUrl}assets/img/espaco-loja-3.webp</image:loc>
      <image:title>Galeria do galpão Dona Zina na Serra do Cipó</image:title>
    </image:image>
  </url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${publicOrigin}/sitemap.xml
`;

for (const target of [path.join(rootDir, 'sitemap.xml'), path.join(siteDir, 'sitemap.xml')]) {
  fs.writeFileSync(target, sitemap, 'utf8');
}
for (const target of [path.join(rootDir, 'robots.txt'), path.join(siteDir, 'robots.txt')]) {
  fs.writeFileSync(target, robots, 'utf8');
}

const rootIndexPath = path.join(rootDir, 'index.html');
let rootIndex = fs.readFileSync(rootIndexPath, 'utf8');
rootIndex = rootIndex.replace(
  /<head>[\s\S]*?<\/head>/,
  `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dona Zina Coisas di Vó — Serra do Cipó</title>
  <meta name="robots" content="noindex, follow">
  <link rel="canonical" href="${siteUrl}">
  <meta http-equiv="refresh" content="0; url=novo/">
  <script>window.location.replace("novo/");</script>
</head>`
);
fs.writeFileSync(rootIndexPath, rootIndex, 'utf8');

console.log('SEO atualizado: metadados, dados estruturados, conteúdo, robots e sitemap.');
