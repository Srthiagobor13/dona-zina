# 🌻 Dona Zina Coisas di Vó — Landing Page & Vitrine Afetiva

> **Site de apresentação, curadoria e vendas pelo WhatsApp do galpão mais acolhedor da Serra do Cipó (MG).**  
> Desenvolvido com HTML5 semântico, CSS3 moderno, JavaScript Vanilla e animações GSAP ScrollTrigger — zero templates genéricos, zero cara de IA, e 100% focado no aconchego de Minas Gerais.

---

## 📍 Sobre o Projeto

A **Dona Zina Coisas di Vó** é um galpão charmoso localizado no coração da **Serra do Cipó (Santana do Riacho/MG)**, na Rua Flor de Maio, 59 (em frente ao Supermercados BH). O espaço reúne louças de mesa posta, cerâmicas artesanais caipiras, colchas de retalho feitas na máquina Singer, peças com acabamento em bambu natural e cristais de gengibre colhidos no próprio quintal.

Este site foi concebido para transmitir a sensação de entrar na casa de vó: o cheiro de café passado, a mesa farta e a hospitalidade mineira, conectando visitantes presenciais e clientes de todo o Brasil diretamente ao **WhatsApp comercial `(31) 99848-0011`**.

---

## 🎨 Psicologia das Cores & Identidade Visual

A paleta de cores foi extraída diretamente das peças reais do galpão e da logo oficial:
- **Creme Nata (`#FAF5EC`):** Fundo acolhedor, quente e luminoso que evita o branco estéril de IA.
- **Café Torrado (`#2B1610` / `#1D0E0A`):** Tipografia sólida, contraste nobre e cabeçalhos editoriais.
- **Amarelo Girassol & Limão Siciliano (`#F6ECD9` / `#D99B26`):** Energia solar, acolhimento e destaque das louças festivas.
- **Verde Folha da Serra (`#2D3B24`):** Seção escura imersiva destacando a tradição artesanal das colchas e do gengibre.
- **Terracota Barro (`#943721`):** A terra mineira, cerâmica crua e destaque da citação manifesto.
- **Verde WhatsApp Oficial (`#25D366`):** Botões de conversão e ícones oficiais Simple Icons / FontAwesome.

---

## 🚀 Principais Funcionalidades

1. **Hero Assimétrico em 3 Colunas:**
   - Promessa de valor e prova social no texto.
   - Moldura central em arco destacando o Cantinho do Café real.
   - Janela colonial verde florida e aviso de frete para todo o Brasil.
2. **Vitrine Bento Grid com Filtro Dinâmico:**
   - Filtros instantâneos: *Todas as Peças*, *Mesa Posta & Café*, *Vasos, Bambu & Garimpo* e *Colchas & Crochê*.
   - Botão direto **"Pedir no WhatsApp"** em cada peça.
   - Botão **"+ Na lista"** para montar sacola personalizada.
3. **Sacola Flutuante de Desejos ("Minha Lista"):**
   - Contador de itens selecionados e barra inferior que envia a seleção completa para o WhatsApp de uma só vez.
4. **Galeria de Fotos Reais com Lightbox:**
   - 20 fotos do galpão físico e das peças recém-chegadas.
   - Zoom em tela cheia com botão de pedido direto no WhatsApp.
5. **Formulário Concierge de Frete:**
   - Seleção do que procura, cidade/UF e observações, gerando mensagem pronta com o cupom `SERRADOCIPO`.
6. **SEO Completo & Dados Estruturados:**
   - Schema.org JSON-LD para `HomeGoodsStore` e `FAQPage`.
   - Open Graph tags com imagem de compartilhamento.
7. **Scroll Nativo Otimizado:**
   - Navegação suave e fluida a 60fps sem sequestro de rolagem do mouse/touch.

---

## 📂 Estrutura de Pastas

```
dona-zina/
├── novo/                          # Site em produção
│   ├── index.html                 # Página principal completa
│   ├── css/
│   │   └── style.css              # Estilos responsivos, variáveis e tipografia
│   ├── js/
│   │   └── main.js                # Interações, Lightbox, Sacola e ScrollTrigger
│   └── assets/
│       └── img/                   # Fotografias reais otimizadas em .webp
├── original/                      # Documentação de pesquisa e análise de dados
│   ├── analise.md                 # Auditoria visual e mapa da persona
│   ├── dados.json                 # Dados comerciais e pontos de contato
│   ├── avaliacoes.json            # Depoimentos reais de clientes
│   └── conteudo.md                # Estrutura textual original
├── .gitignore                     # Ignora arquivos de mídia pesada (*.mp4, etc.)
└── README.md                      # Documentação do repositório
```

---

## 💻 Como Rodar Localmente

Clone o repositório e inicie um servidor local:

```bash
# Clone o repositório
git clone https://github.com/Srthiagobor13/dona-zina.git

# Acesse a pasta
cd dona-zina

# Inicie o servidor local (Python)
python -m http.server 8080 --directory novo
```

Abra no navegador em: `http://localhost:8080`

## 🔎 SEO e Indexação

- URL pública atual: `https://donazinacoisadivo.vercel.app/novo/`
- Sitemap: `https://donazinacoisadivo.vercel.app/sitemap.xml`
- Robots: `https://donazinacoisadivo.vercel.app/robots.txt`
- Metadados, dados estruturados e sitemap são atualizados com:

```bash
node scripts/seo-site.mjs
node scripts/validate-site.mjs
```

O script `restructure-site.mjs` também executa a atualização de SEO automaticamente. Depois da publicação, envie o sitemap pelo Google Search Console para acompanhar descoberta, indexação e eventuais erros.

---

## 📦 Publicação no HostGator / Vercel / Netlify

- **HostGator cPanel:** Envie o conteúdo da pasta `novo/` para a raiz `public_html/`.
- **Vercel / Netlify:** Configure o diretório raiz (*Root Directory*) como `novo`.
- **GitHub Pages:** Ative o GitHub Pages apontando para a branch `main` e diretório `/novo` ou raiz.

---

© 2026 **Dona Zina Coisas di Vó** · Serra do Cipó, Minas Gerais.
