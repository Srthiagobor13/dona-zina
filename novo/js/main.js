/**
 * DONA ZINA COISAS DI VÓ — JAVASCRIPT INTERATIVO & CONVERSÃO WHATSAPP
 * Scroll Nativo Fluido, Filtro de Categorias, Sacola de Desejos, Lightbox e GSAP ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {
  const FONE_DONA_ZINA = '5531998480011';
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. NAVEGAÇÃO SUAVE EM LINKS ÂNCORA (SEM SEQUESTRAR SCROLL NATIVO)
  // ==========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================================================
  // 2. CABEÇALHO FIXO COM TRANSIÇÃO SUAVE AO ROLAR
  // ==========================================================================
  const header = document.querySelector('.site-header');
  if (header) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 36) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 3. MENU MOBILE ACOLHEDOR
  // ==========================================================================
  const menuBtn = document.querySelector('.menu-btn');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileOverlay) {
    const toggleMenu = () => {
      const isOpen = mobileOverlay.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuBtn.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileOverlay.classList.contains('open')) {
          toggleMenu();
        }
      });
    });
  }

  // ==========================================================================
  // 4. FILTRO INTERATIVO DA VITRINE DE PRODUTOS
  // ==========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');
  const prodCards = document.querySelectorAll('.prod-card');

  const aplicarFiltroCatalogo = (filterValue, animate = true) => {
    const selectedPill = Array.from(filterPills).find(pill => pill.getAttribute('data-filter') === filterValue);
    if (!selectedPill) return;

    filterPills.forEach(pill => {
      const isSelected = pill === selectedPill;
      pill.classList.toggle('active', isSelected);
      pill.setAttribute('aria-selected', String(isSelected));
    });

    prodCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if (filterValue === 'todos' || category === filterValue) {
        card.classList.remove('hidden');
        if (animate && !isReducedMotion && typeof gsap !== 'undefined') {
          gsap.fromTo(card, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      } else {
        card.classList.add('hidden');
      }
    });
  };

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => aplicarFiltroCatalogo(pill.getAttribute('data-filter')));
  });

  const requestedCategory = new URLSearchParams(window.location.search).get('categoria');
  if (requestedCategory) aplicarFiltroCatalogo(requestedCategory, false);

  // ==========================================================================
  // 5. PEDIDO DIRETO DE PEÇA E SACOLA DE DESEJOS ("MINHA LISTA")
  // ==========================================================================
  const listaDesejos = new Set();
  const floatingBag = document.getElementById('floating-bag');
  const bagCountEl = document.getElementById('bag-count');

  const atualizarBarraLista = () => {
    if (!floatingBag || !bagCountEl) return;
    const total = listaDesejos.size;
    bagCountEl.textContent = String(total);
    if (total > 0) {
      floatingBag.classList.add('visible');
    } else {
      floatingBag.classList.remove('visible');
    }
  };

  window.pedirPecaWhatsApp = function (nomePeca) {
    const msg = `Olá, Dona Zina! Vi no site a peça "${nomePeca}" e gostaria de ver fotos disponíveis no galpão, saber o valor e calcular o frete (Cupom: SERRADOCIPO).`;
    const url = `https://wa.me/${FONE_DONA_ZINA}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  window.alternarNaLista = function (btnEl, nomePeca) {
    if (listaDesejos.has(nomePeca)) {
      listaDesejos.delete(nomePeca);
      btnEl.classList.remove('added');
      btnEl.innerHTML = '<span>+ Na lista</span>';
    } else {
      listaDesejos.add(nomePeca);
      btnEl.classList.add('added');
      btnEl.innerHTML = '<span>Na sua lista</span>';
    }
    atualizarBarraLista();
  };

  window.enviarListaWhatsApp = function () {
    if (listaDesejos.size === 0) return;
    const itensFormatados = Array.from(listaDesejos).map(item => `• ${item}`).join('\n');
    const msg = `Olá, Dona Zina! Passeando pelo site, separei estas peças na minha lista de desejos:\n\n${itensFormatados}\n\nPoderia me mandar fotos/vídeos delas e calcular o frete com o cupom SERRADOCIPO?`;
    const url = `https://wa.me/${FONE_DONA_ZINA}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // ==========================================================================
  // 6. LIGHTBOX (ZOOM EM TELA CHEIA NAS FOTOS REAIS DA GALERIA)
  // ==========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxZapBtn = document.getElementById('lightbox-zap-btn');

  window.abrirLightbox = function (imgSrc, titulo) {
    if (!lightboxModal || !lightboxImg || !lightboxTitle) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = titulo;
    lightboxTitle.textContent = titulo;

    if (lightboxZapBtn) {
      lightboxZapBtn.onclick = () => window.pedirPecaWhatsApp(titulo);
    }

    lightboxModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.fecharLightbox = function () {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        window.fecharLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        window.fecharLightbox();
      }
    });
  }

  // ==========================================================================
  // 7. FORMULÁRIO CONCIERGE DE PEDIDO DIRETO PARA O WHATSAPP (REGRA C6)
  // ==========================================================================
  const conciergeForm = document.getElementById('zap-concierge-form');
  const inputNome = document.getElementById('cliente-nome');
  const erroNome = document.getElementById('erro-nome');

  if (conciergeForm && inputNome) {
    inputNome.addEventListener('input', () => {
      if (erroNome) erroNome.classList.remove('visible');
    });

    conciergeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = inputNome.value.trim();

      if (!nome) {
        if (erroNome) erroNome.classList.add('visible');
        inputNome.focus();
        return;
      }

      const interesse = document.getElementById('cliente-interesse')?.value || 'Peças do Galpão';
      const cidade = document.getElementById('cliente-cidade')?.value.trim() || 'Não informada';
      const obs = document.getElementById('cliente-obs')?.value.trim();

      let texto = `Olá, Dona Zina! Meu nome é *${nome}*.\n`;
      texto += `Vim pelo site e gostaria de ver: *${interesse}*.\n`;
      texto += `Minha cidade/UF para frete: *${cidade}*.\n`;
      if (obs) {
        texto += `Detalhes do que procuro: "${obs}"\n`;
      }
      texto += `Cupom ativado pelo site: *SERRADOCIPO*`;

      const url = `https://wa.me/${FONE_DONA_ZINA}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // 8. ACORDEÃO DE PERGUNTAS FREQUENTES (FAQ)
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-trigger');
            const otherContent = other.querySelector('.faq-content');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        if (!isOpen) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          content.style.maxHeight = null;
        }
      });
    }
  });

  // ==========================================================================
  // 9. ANIMAÇÕES GSAP + SCROLLTRIGGER (FRASE REVELADA B7 & PARALLAX)
  // ==========================================================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Frase Revelada Palavra por Palavra (Efeito B7)
    const revealQuotes = document.querySelectorAll('[data-reveal-words]');
    revealQuotes.forEach(el => {
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(' ');

      if (!isReducedMotion) {
        gsap.fromTo(
          el.querySelectorAll('.w'),
          { opacity: 0.22 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.08,
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              end: 'bottom 45%',
              scrub: 0.5
            }
          }
        );
      } else {
        el.querySelectorAll('.w').forEach(w => (w.style.opacity = '1'));
      }
    });

    // Parallax Suave na Foto em Arco do Hero
    const heroArchImg = document.querySelector('.arch-frame img');
    if (heroArchImg && !isReducedMotion) {
      gsap.fromTo(
        heroArchImg,
        { yPercent: -3 },
        {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-three-cols',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }
  }

});
