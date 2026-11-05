import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = path.join(rootDir, 'novo');
const homePath = path.join(siteDir, 'index.html');
const productsPath = path.join(siteDir, 'produtos.html');
const galleryPath = path.join(siteDir, 'galeria.html');

const read = file => fs.readFileSync(file, 'utf8');

function extractElement(html, marker, tagName) {
  const start = html.indexOf(marker);
  if (start === -1) throw new Error(`Marcador não encontrado: ${marker}`);

  const tagPattern = new RegExp(`<\\/?${tagName}\\b[^>]*>`, 'gi');
  tagPattern.lastIndex = start;
  let depth = 0;
  let match;

  while ((match = tagPattern.exec(html))) {
    if (match[0].startsWith('</')) depth -= 1;
    else depth += 1;

    if (depth === 0) return html.slice(start, tagPattern.lastIndex);
  }

  throw new Error(`Elemento não foi fechado: ${marker}`);
}

function replaceElement(html, marker, tagName, replacement) {
  const element = extractElement(html, marker, tagName);
  return html.replace(element, replacement);
}

function rewriteNavigation(html) {
  const replacements = new Map([
    ['href="#" class="brand-link"', 'href="index.html" class="brand-link"'],
    ['href="#historia"', 'href="index.html#historia"'],
    ['href="#produtos"', 'href="produtos.html"'],
    ['href="#tradicao"', 'href="index.html#tradicao"'],
    ['href="#portfolio"', 'href="galeria.html"'],
    ['href="#encomendar"', 'href="produtos.html#encomendar"'],
    ['href="#visitar"', 'href="index.html#visitar"']
  ]);

  for (const [from, to] of replacements) html = html.replaceAll(from, to);
  return html;
}

function setBodyClass(html, className) {
  return html.replace(/<body(?: class="[^"]*")?>/, `<body class="${className}">`);
}

function setPageMetadata(html, metadata) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${metadata.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${metadata.description}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${metadata.url}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${metadata.ogTitle}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${metadata.description}">`);
  html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${metadata.image}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${metadata.url}">`);
  return html;
}

const faqStructuredData = {
  '@type': 'FAQPage',
  '@id': 'https://donazinacipov.com.br/produtos.html#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Como funciona a compra pelo WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ao clicar em qualquer peça, você fala direto com a Dona Zina, recebe fotos e vídeos do estoque, confirma medidas e valores e calcula o frete para o seu CEP.'
      }
    },
    {
      '@type': 'Question',
      name: 'Como as louças e cerâmicas são protegidas no envio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'As peças são embaladas individualmente com plástico bolha duplo, divisórias firmes e caixa reforçada. Em caso de avaria, é feita a reposição ou o reembolso.'
      }
    },
    {
      '@type': 'Question',
      name: 'Quais são as formas de pagamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'São aceitos Pix, link de pagamento no cartão e, presencialmente, cartões de crédito, débito e dinheiro.'
      }
    },
    {
      '@type': 'Question',
      name: 'Posso encomendar colchas ou lembrancinhas em quantidade?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. A Dona Zina aceita encomendas de colchas por tamanho e kits para pousadas, festas e presentes.'
      }
    }
  ]
};

function configureStructuredData(html, { includeFaq, faqId }) {
  const pattern = /<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/;
  const match = html.match(pattern);
  if (!match) return html;

  const data = JSON.parse(match[1]);
  if (Array.isArray(data['@graph'])) {
    data['@graph'] = data['@graph'].filter(item => includeFaq || item['@type'] !== 'FAQPage');
    if (includeFaq && !data['@graph'].some(item => item['@type'] === 'FAQPage')) {
      data['@graph'].push(structuredClone(faqStructuredData));
    }
    const faq = data['@graph'].find(item => item['@type'] === 'FAQPage');
    if (faq && faqId) faq['@id'] = faqId;
  }

  html = html.replace(pattern, `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n  </script>`);
  return html.replace(
    /<!-- Schema\.org Dados Estruturados \(HomeGoodsStore(?: \+ FAQPage)?\) -->/,
    includeFaq
      ? '<!-- Schema.org Dados Estruturados (HomeGoodsStore + FAQPage) -->'
      : '<!-- Schema.org Dados Estruturados (HomeGoodsStore) -->'
  );
}

const productsPreview = `    <section id="produtos" class="section-home-categories" aria-labelledby="home-categories-heading">
      <div class="container">
        <div class="section-link-header">
          <div>
            <span class="internal-kicker">Um gostinho do nosso acervo</span>
            <h2 id="home-categories-heading" class="h2">Escolha o seu <em>cantinho favorito</em>.</h2>
            <p>Veja algumas das categorias mais queridas e entre no catálogo completo para explorar todas as peças.</p>
          </div>
          <a href="produtos.html" class="btn btn-coffee">Ver todos os produtos</a>
        </div>

        <div class="category-preview-grid">
          <a href="produtos.html?categoria=quitutes#produtos" class="category-preview-card">
            <img src="assets/img/novas/cesta-biscoitos-coisa-de-vo.webp" alt="Cesta de biscoitos caseiros da Dona Zina" width="640" height="520" loading="lazy">
            <span>Sabores da roça</span>
            <h3>Quitutes, geleias e doces</h3>
            <p>Receitas afetivas, ingredientes do quintal e aquele sabor de casa de vó.</p>
          </a>
          <a href="produtos.html?categoria=mesa#produtos" class="category-preview-card">
            <img src="assets/img/loucas-coloridas-mesa.webp" alt="Louças coloridas para mesa posta" width="640" height="520" loading="lazy">
            <span>Mesa posta & café</span>
            <h3>Louças que contam histórias</h3>
            <p>Canecas, pratos, jarras e conjuntos para transformar encontros em memórias.</p>
          </a>
          <a href="produtos.html?categoria=bolsas#produtos" class="category-preview-card">
            <img src="assets/img/novas/bolsa-artesanal-abelha-colorida.webp" alt="Bolsa artesanal com abelha colorida" width="640" height="520" loading="lazy">
            <span>Feitas à mão</span>
            <h3>Bolsas artesanais forradas</h3>
            <p>Peças autorais, coloridas e cuidadosamente acabadas por dentro e por fora.</p>
          </a>
          <a href="produtos.html?categoria=decor#produtos" class="category-preview-card">
            <img src="assets/img/vitrine-artesanal-rustica.webp" alt="Vitrine de decoração artesanal e rústica" width="640" height="520" loading="lazy">
            <span>Garimpo afetivo</span>
            <h3>Cerâmicas e decoração</h3>
            <p>Peças com personalidade para levar o aconchego da Serra para dentro de casa.</p>
          </a>
        </div>
      </div>
    </section>`;

const galleryPreview = `    <section id="portfolio" class="section-gallery-preview" aria-labelledby="gallery-preview-heading">
      <div class="container">
        <div class="section-link-header">
          <div>
            <span class="internal-kicker">Retratos reais do galpão</span>
            <h2 id="gallery-preview-heading" class="h2">Um passeio em <em>cores, detalhes e afeto</em>.</h2>
            <p>Uma pequena amostra do que espera por você na Serra do Cipó.</p>
          </div>
          <a href="galeria.html" class="btn btn-outline">Abrir galeria completa</a>
        </div>

        <div class="gallery-preview-grid">
          <a href="galeria.html" class="gallery-preview-item gallery-preview-featured"><img src="assets/img/espaco-loja-3.webp" alt="Mesa posta e cantinho do café no galpão Dona Zina" width="720" height="900" loading="lazy"></a>
          <a href="galeria.html" class="gallery-preview-item"><img src="assets/img/novas/cantinho-rustico-cafe-xicaras-amarelas.webp" alt="Cantinho rústico do café com xícaras amarelas" width="520" height="520" loading="lazy"></a>
          <a href="galeria.html" class="gallery-preview-item"><img src="assets/img/novas/doces-artesanais-galinha-madeira.webp" alt="Doces artesanais e galinha de madeira" width="520" height="520" loading="lazy"></a>
          <a href="galeria.html" class="gallery-preview-item"><img src="assets/img/mesa-posta-ceramicas-decor.webp" alt="Mesa posta com cerâmicas decorativas" width="520" height="520" loading="lazy"></a>
          <a href="galeria.html" class="gallery-preview-item"><img src="assets/img/colcha-retalhos-singer-destaque.webp" alt="Colcha de retalhos confeccionada na Singer" width="520" height="520" loading="lazy"></a>
        </div>
      </div>
    </section>`;

const homeOrderCta = `    <section id="encomendar" class="section-home-order" aria-labelledby="home-order-heading">
      <div class="container home-order-card">
        <div>
          <span class="internal-kicker">Atendimento direto e carinhoso</span>
          <h2 id="home-order-heading" class="h2">Conte o que procura e a Dona Zina <em>mostra as opções em vídeo</em>.</h2>
          <p>Veja o catálogo completo, monte sua lista e calcule o frete para qualquer lugar do Brasil.</p>
        </div>
        <div class="home-order-actions">
          <a href="produtos.html#encomendar" class="btn btn-coffee">Montar meu pedido</a>
          <a href="https://wa.me/5531998480011?text=Ol%C3%A1%2C%20Dona%20Zina!%20Quero%20ver%20as%20pe%C3%A7as%20dispon%C3%ADveis%20hoje." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">Chamar no WhatsApp</a>
        </div>
      </div>
    </section>`;

const productsHero = `    <section class="internal-hero internal-hero-products" aria-labelledby="products-page-title">
      <div class="container internal-hero-grid">
        <div class="internal-hero-copy">
          <nav class="breadcrumb" aria-label="Navegação estrutural"><a href="index.html">Início</a><span>/</span><span>Produtos</span></nav>
          <span class="internal-kicker">Catálogo completo Dona Zina</span>
          <h1 id="products-page-title" class="h1">Peças com alma, <em>sabores da roça</em> e memórias de vó.</h1>
          <p>Explore o acervo por categoria, salve seus favoritos e fale diretamente com a Dona Zina para receber fotos, vídeos, valores e o cálculo do frete.</p>
          <div class="internal-hero-actions">
            <a href="#produtos" class="btn btn-coffee">Explorar o catálogo</a>
            <a href="#encomendar" class="btn btn-outline">Montar meu pedido</a>
          </div>
        </div>
        <div class="internal-hero-visual" aria-hidden="true">
          <img class="internal-hero-main-img" src="assets/img/novas/cesta-artesanal-doces-caseiros.webp" alt="" width="720" height="900">
          <img class="internal-hero-small-img" src="assets/img/mesa-posta-ceramicas-decor.webp" alt="" width="480" height="520">
        </div>
      </div>
    </section>`;

const galleryHero = `    <section class="internal-hero internal-hero-gallery" aria-labelledby="gallery-page-title">
      <div class="container internal-hero-grid">
        <div class="internal-hero-copy">
          <nav class="breadcrumb" aria-label="Navegação estrutural"><a href="index.html">Início</a><span>/</span><span>Galeria</span></nav>
          <span class="internal-kicker">Um passeio pelo nosso galpão</span>
          <h1 id="gallery-page-title" class="h1">Retratos reais de um lugar feito de <em>cor, afeto e histórias</em>.</h1>
          <p>Conheça os cantinhos, os detalhes e as peças que fazem da Dona Zina uma parada especial na Serra do Cipó.</p>
          <div class="internal-hero-actions">
            <a href="#portfolio" class="btn btn-coffee">Ver todas as fotos</a>
            <a href="index.html#visitar" class="btn btn-outline">Planejar minha visita</a>
          </div>
        </div>
        <div class="internal-hero-visual" aria-hidden="true">
          <img class="internal-hero-main-img" src="assets/img/espaco-loja-3.webp" alt="" width="720" height="900">
          <img class="internal-hero-small-img" src="assets/img/janela-florida-cipo.webp" alt="" width="480" height="520">
        </div>
      </div>
    </section>`;

const galleryCta = `    <section class="section-home-order" aria-labelledby="gallery-cta-heading">
      <div class="container home-order-card">
        <div>
          <span class="internal-kicker">Gostou de alguma peça?</span>
          <h2 id="gallery-cta-heading" class="h2">Leve um pedacinho da Serra <em>para dentro da sua casa</em>.</h2>
          <p>Visite o catálogo ou envie uma mensagem para receber as opções disponíveis hoje no galpão.</p>
        </div>
        <div class="home-order-actions">
          <a href="produtos.html" class="btn btn-coffee">Ver produtos</a>
          <a href="https://wa.me/5531998480011?text=Ol%C3%A1%2C%20Dona%20Zina!%20Vi%20a%20galeria%20e%20quero%20conhecer%20as%20pe%C3%A7as%20dispon%C3%ADveis." target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">Perguntar no WhatsApp</a>
        </div>
      </div>
    </section>`;

const currentHome = read(homePath);
const productsSource = fs.existsSync(productsPath) ? read(productsPath) : currentHome;
const gallerySource = fs.existsSync(galleryPath) ? read(galleryPath) : currentHome;

const productsSection = extractElement(productsSource, '<section id="produtos"', 'section');
const conciergeSection = extractElement(productsSource, '<section id="encomendar"', 'section');
const faqWrap = extractElement(productsSource, '<div class="faq-wrap">', 'div');
const portfolioSection = extractElement(gallerySource, '<section id="portfolio"', 'section');

const mainMarker = '<main id="conteudo-principal">';
const mainStart = currentHome.indexOf(mainMarker);
const mainEnd = currentHome.indexOf('</main>', mainStart);
if (mainStart === -1 || mainEnd === -1) throw new Error('Estrutura principal da home não encontrada.');

const beforeMain = currentHome.slice(0, mainStart);
const afterMain = currentHome.slice(mainEnd + '</main>'.length);

let home = currentHome;
home = replaceElement(home, '<section id="produtos"', 'section', productsPreview);
home = replaceElement(home, '<section id="portfolio"', 'section', galleryPreview);
home = replaceElement(home, '<section id="encomendar"', 'section', homeOrderCta);
if (home.includes('<div class="faq-wrap">')) {
  home = replaceElement(home, '<div class="faq-wrap">', 'div', '');
}
home = home.replace('<section id="faq" class="section-reviews-faq"', '<section id="avaliacoes" class="section-reviews-faq"');
home = rewriteNavigation(home);
home = setBodyClass(home, 'page-home');
home = configureStructuredData(home, { includeFaq: false });
home = setPageMetadata(home, {
  title: 'Dona Zina Coisas di Vó | Artesanato e Afeto na Serra do Cipó',
  description: 'Conheça a Dona Zina Coisas di Vó na Serra do Cipó: artesanato, louças, quitutes, colchas e decoração afetiva com envio para todo o Brasil.',
  url: 'https://donazinacipov.com.br/',
  ogTitle: 'Dona Zina Coisas di Vó — O Aconchego de Minas no Seu Lar',
  image: 'assets/img/espaco-loja-2.webp'
});

let productsPage = `${beforeMain}${mainMarker}\n${productsHero}\n\n${productsSection}\n\n${conciergeSection}\n\n    <section id="faq" class="section-page-faq" aria-label="Dúvidas frequentes sobre compras">\n      <div class="container">\n${faqWrap}\n      </div>\n    </section>\n\n</main>${afterMain}`;
productsPage = rewriteNavigation(productsPage);
productsPage = productsPage.replace('<a href="produtos.html" class="btn btn-coffee">Explorar o catálogo</a>', '<a href="#produtos" class="btn btn-coffee">Explorar o catálogo</a>');
productsPage = productsPage.replace('<a href="produtos.html#encomendar" class="btn btn-outline">Montar meu pedido</a>', '<a href="#encomendar" class="btn btn-outline">Montar meu pedido</a>');
productsPage = setBodyClass(productsPage, 'page-products');
productsPage = setPageMetadata(productsPage, {
  title: 'Produtos Dona Zina | Artesanato, Louças e Quitutes da Serra do Cipó',
  description: 'Explore o catálogo da Dona Zina: bolsas artesanais, biscoitos, geleias, louças, cerâmicas, colchas e decoração. Peça pelo WhatsApp com envio nacional.',
  url: 'https://donazinacipov.com.br/produtos.html',
  ogTitle: 'Produtos Dona Zina — Artesanato, Quitutes e Decoração Afetiva',
  image: 'assets/img/novas/cesta-artesanal-doces-caseiros.webp'
});
productsPage = configureStructuredData(productsPage, {
  includeFaq: true,
  faqId: 'https://donazinacipov.com.br/produtos.html#faq'
});

let galleryPage = `${beforeMain}${mainMarker}\n${galleryHero}\n\n${portfolioSection}\n\n${galleryCta}\n\n</main>${afterMain}`;
galleryPage = rewriteNavigation(galleryPage);
galleryPage = galleryPage.replace('<a href="galeria.html" class="btn btn-coffee">Ver todas as fotos</a>', '<a href="#portfolio" class="btn btn-coffee">Ver todas as fotos</a>');
galleryPage = setBodyClass(galleryPage, 'page-gallery');
galleryPage = setPageMetadata(galleryPage, {
  title: 'Galeria Dona Zina | Fotos Reais do Galpão na Serra do Cipó',
  description: 'Veja fotos reais dos ambientes, produtos e detalhes do galpão Dona Zina Coisas di Vó na Serra do Cipó, Minas Gerais.',
  url: 'https://donazinacipov.com.br/galeria.html',
  ogTitle: 'Galeria Dona Zina — Um Passeio pelo Galpão na Serra do Cipó',
  image: 'assets/img/espaco-loja-3.webp'
});
galleryPage = configureStructuredData(galleryPage, { includeFaq: false });

const tidy = html => html.replace(/[ \t]+$/gm, '').replace(/\n{4,}/g, '\n\n\n');

fs.writeFileSync(homePath, tidy(home), 'utf8');
fs.writeFileSync(productsPath, tidy(productsPage), 'utf8');
fs.writeFileSync(galleryPath, tidy(galleryPage), 'utf8');

console.log('Home, catálogo e galeria reorganizados com sucesso.');
