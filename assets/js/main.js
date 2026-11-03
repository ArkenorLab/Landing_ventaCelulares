/**
 * TECHSTORE BARRANQUILLA - LÓGICA PRINCIPAL (main.js)
 * Cotizador interactivo a WhatsApp, catálogo rápido, menú móvil y acordeones.
 */

const TECHSTORE_CONFIG = {
  name: "TechStore",
  whatsappNumber: "573009876543", // Número oficial con código de Colombia (57)
  whatsappDefaultMsg: "Hola TechStore, quiero consultar sobre un celular / servicio técnico",
  phoneDisplay: "+57 300 987 6543",
  phoneTel: "+573009876543",
  email: "ventas@techstorebaq.com",
  schedule: "Lunes a Sábado: 9:00 AM - 7:00 PM",
  address: "Centro Comercial Portal del Prado / Calle 72, Barranquilla, Colombia"
};

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initWhatsAppLinks();
  initQuoteCalculator();
   initCatalogInquiry();
   initFaqAccordion();
   initDeliveryOrderModal();
   initSmoothScroll();
   initLoadMoreCards();
});

/**
 * 1. Inicialización de Enlaces de WhatsApp
 */
function initWhatsAppLinks() {
  const waUrl = `https://wa.me/${TECHSTORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(TECHSTORE_CONFIG.whatsappDefaultMsg)}`;
  document.querySelectorAll('.js-whatsapp-btn').forEach(btn => {
    btn.href = waUrl;
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
  });
}

/**
 * 2. Cotizador Interactivo Rápido de Celulares y Servicio Técnico (CRO)
 */
function initQuoteCalculator() {
  const form = document.getElementById('quick-quote-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const brand = document.getElementById('quote-brand')?.value || 'No especificada';
    const model = document.getElementById('quote-model')?.value.trim() || 'Modelo no especificado';
    const service = document.getElementById('quote-service')?.value || 'Consulta general';
    const name = document.getElementById('quote-name')?.value.trim() || 'Cliente';
    const location = document.getElementById('quote-location')?.value.trim() || 'Barranquilla';

    if (!model || model === 'Modelo no especificado') {
      showToast('Por favor escribe el modelo de tu celular (Ej: iPhone 13, Galaxy S23, Redmi Note 12)', 'error');
      return;
    }

    const waText = `⚡ *COTIZACIÓN EXPRESS - ZONATEC BARRANQUILLA*\n` +
      `----------------------------------------\n` +
      `👤 *Cliente:* ${name}\n` +
      `📍 *Ubicación / Barrio:* ${location}\n` +
      `📱 *Marca:* ${brand}\n` +
      `📲 *Modelo:* ${model}\n` +
      `🛠️ *Servicio Requerido:* ${service}\n` +
      `----------------------------------------\n` +
      `¡Hola ZONATEC! Quiero conocer precio y disponibilidad para domicilio o atención en local.`;

    showToast('¡Listo! Abriendo WhatsApp con los datos de tu cotización...', 'success');

    setTimeout(() => {
      window.open(`https://wa.me/${ZONATEC_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`, '_blank');
      form.reset();
    }, 800);
  });
}

/**
 * 3. Botones de Consulta Inmediata en Catálogo de Equipos
 */
function initCatalogInquiry() {
  document.querySelectorAll('.js-ask-device').forEach(btn => {
    btn.addEventListener('click', () => {
      const deviceName = btn.getAttribute('data-device') || 'Celular';
      const devicePrice = btn.getAttribute('data-price') || 'Precio en tienda';

      const waText = `📱 *CONSULTA DE COMPRA DE EQUIPO*\n\n` +
        `¡Hola ZONATEC! Me interesa comprar el *${deviceName}* (${devicePrice}).\n` +
        `¿Tienen disponibilidad en tienda y servicio de domicilio contraentrega en Barranquilla?`;

      window.open(`https://wa.me/${ZONATEC_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`, '_blank');
    });
  });
}

/**
 * 4. Menú Móvil
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !menu) return;

  const open = () => {
    menu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  };

  const close = () => {
    menu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };

  toggleBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  links.forEach(l => l.addEventListener('click', close));
}

/**
 * 5. Acordeón de Preguntas Frecuentes
 */
function initFaqAccordion() {
  const buttons = document.querySelectorAll('.faq-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Cerrar otros
      buttons.forEach(b => {
        if (b !== btn) {
          b.setAttribute('aria-expanded', 'false');
          if (b.nextElementSibling) b.nextElementSibling.classList.add('hidden');
          const otherIcon = b.querySelector('.faq-icon');
          if (otherIcon) otherIcon.classList.remove('rotate-180');
        }
      });

      btn.setAttribute('aria-expanded', !isExpanded);
      if (content) content.classList.toggle('hidden');
      if (icon) icon.classList.toggle('rotate-180');
    });
  });
}

/**
 * 6. Modal y Botón de Domicilio Rápido
 */
function initDeliveryOrderModal() {
  const btn = document.getElementById('btn-order-delivery');
  if (btn) {
    btn.addEventListener('click', () => {
      const waText = `🛵 *SOLICITUD DE DOMICILIO - ZONATEC BARRANQUILLA*\n\n` +
        `¡Hola ZONATEC! Deseo solicitar un domicilio para la ciudad de Barranquilla / Soledad.\n` +
        `¿Podrían indicarme el tiempo estimado de entrega y métodos de pago contraentrega?`;
      window.open(`https://wa.me/${ZONATEC_CONFIG.whatsappNumber}?text=${encodeURIComponent(waText)}`, '_blank');
    });
  }

  // Copiar dirección
  const copyAddressBtn = document.getElementById('btn-copy-address');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(ZONATEC_CONFIG.address).then(() => {
        showToast('¡Dirección copiada al portapapeles!', 'success');
      }).catch(() => {
        showToast(ZONATEC_CONFIG.address, 'info');
      });
    });
  }
}

/**
 * 7. Desplazamiento Suave
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 8. Botón "Ver más" para catálogo de celulares
 */
function initLoadMoreCards() {
  const btn = document.getElementById('verMasCelulares');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.js-extra-card.hidden').forEach(el => el.classList.remove('hidden'));
    btn.style.display = 'none';
  });
}

/**
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('role', 'status');
    container.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none px-4 w-full max-w-sm';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const isSuccess = type === 'success';

  toast.className = `p-4 rounded-xl shadow-2xl border text-sm font-semibold flex items-center gap-3 toast-slide-up pointer-events-auto backdrop-blur-md ${
    isSuccess 
      ? 'bg-[#121212] text-white border-[#E50914]/50 shadow-[#E50914]/15' 
      : 'bg-rose-900 text-white border-rose-500/50 shadow-rose-950/20'
  }`;

  toast.innerHTML = `
    <span class="text-lg shrink-0">${isSuccess ? '⚡' : '⚠️'}</span>
    <div class="flex-1 text-xs sm:text-sm">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}
