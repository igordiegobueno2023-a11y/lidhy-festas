'use strict';
const galleryToggle = document.querySelector('[data-gallery-toggle]');
const cards = Array.from(document.querySelectorAll('#catalogo-temas .theme-card'));
const search = document.getElementById('theme-search');
const count = document.getElementById('catalog-count');
const controls = document.querySelector('.catalog-controls');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
let expanded = false;
const updateGallery = () => {
  const query = normalize(search.value);
  const matching = cards.filter(card => normalize(card.querySelector('h3').textContent).includes(query));
  const visible = query || expanded ? matching : matching.slice(0, 12);
  cards.forEach(card => { card.hidden = !visible.includes(card); });
  count.textContent = matching.length === 0 ? 'Nenhum tema encontrado. Tente outro nome ou consulte pelo WhatsApp.' : `${visible.length} de ${matching.length} temas`;
  galleryToggle.hidden = Boolean(query) || matching.length <= 12;
  galleryToggle.setAttribute('aria-expanded', String(expanded));
  galleryToggle.textContent = expanded ? 'Ver menos temas' : `Ver todos os ${matching.length} temas`;
};
if (search && galleryToggle && controls) {
  cards.forEach(card => card.classList.remove('hidden-theme'));
  controls.hidden = false;
  galleryToggle.addEventListener('click', () => { expanded = !expanded; updateGallery(); });
  search.addEventListener('input', updateGallery);
  updateGallery();
}
const topbar = document.querySelector('.topbar');
const updateTopbar = () => topbar?.classList.toggle('scrolled', window.scrollY > 32);
window.addEventListener('scroll', updateTopbar, { passive: true });
updateTopbar();