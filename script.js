'use strict';
const config = window.KRONNOS || {};
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir menú'); nav.classList.remove('open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú'); nav.classList.toggle('open', open); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const contactLinks = document.querySelector('#contact-links');
function addContact(text, href, external = false) { const a = document.createElement('a'); a.textContent = text; a.href = href; if (external) { a.target = '_blank'; a.rel = 'noopener noreferrer'; } contactLinks.append(a); }
const emailValid = typeof config.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email);
if (emailValid) addContact(config.email, `mailto:${config.email}`);
if (config.phone) addContact(config.phone, `tel:${config.phone.replace(/[^+\d]/g, '')}`);
const whatsappValid = /^\d{8,15}$/.test(config.whatsapp || '');
if (whatsappValid) addContact('Hablar por WhatsApp ↗', `https://wa.me/${config.whatsapp}`, true);
if (/^https:\/\/(www\.)?instagram\.com\//.test(config.instagram || '')) addContact('Instagram ↗', config.instagram, true);
const projectList = document.querySelector('#project-list');
const projects = Array.isArray(config.projects) ? config.projects : [];
if (projects.length) document.querySelector('#portfolio-empty').hidden = true;
const photoDialog = document.querySelector('#photo-dialog');
const gallery = projects.flatMap(project => (project.photos || [{image: project.image, alt: project.alt, label: ''}]).map(photo => ({...photo, title: project.title})));
let activePhoto = 0;
let lastPhotoTrigger;
function showPhoto(index) {
  activePhoto = (index + gallery.length) % gallery.length;
  const photo = gallery[activePhoto];
  document.querySelector('#photo-image').src = photo.image;
  document.querySelector('#photo-image').alt = photo.alt;
  document.querySelector('#photo-title').textContent = photo.title;
  document.querySelector('#photo-counter').textContent = `${photo.label} · ${activePhoto + 1} / ${gallery.length}`;
}
let photoOffset = 0;
projects.forEach(project => {
  const article = document.createElement('article'); article.className = 'project';
  const photos = document.createElement('div'); photos.className = 'project-photos';
  (project.photos || [{image:project.image,alt:project.alt,label:''}]).forEach(photo => {
    const index = photoOffset++;
    const figure = document.createElement('figure');
    const button = document.createElement('button'); button.className = 'photo-trigger'; button.type = 'button'; button.setAttribute('aria-label', `Ampliar: ${project.title}, ${photo.label}`);
    const img = document.createElement('img'); img.src = photo.image; img.alt = photo.alt || project.title; img.loading = 'lazy'; img.width = 1448; img.height = 1086;
    const zoom = document.createElement('span'); zoom.className = 'zoom-hint'; zoom.textContent = 'Ampliar ↗'; zoom.setAttribute('aria-hidden','true');
    button.append(img,zoom); button.addEventListener('click',()=> {lastPhotoTrigger=button;showPhoto(index);photoDialog.showModal();});
    const caption = document.createElement('figcaption'); caption.textContent = photo.label;
    figure.append(button,caption);photos.append(figure);
  });
  const category = document.createElement('p'); category.className = 'eyebrow'; category.textContent = project.category;
  const h3 = document.createElement('h3'); h3.textContent = project.title;
  const description = document.createElement('p'); description.textContent = project.description;
  article.append(photos,category,h3,description); projectList.append(article);
});
photoDialog.querySelector('.photo-close').addEventListener('click',()=>photoDialog.close());
photoDialog.addEventListener('close',()=>lastPhotoTrigger?.focus());
photoDialog.addEventListener('click',e=>{if(e.target===photoDialog)photoDialog.close();});
document.querySelector('#photo-prev').addEventListener('click',()=>showPhoto(activePhoto-1));
document.querySelector('#photo-next').addEventListener('click',()=>showPhoto(activePhoto+1));
document.addEventListener('keydown',e=>{if(!photoDialog.open)return;if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(activePhoto-1);}if(e.key==='ArrowRight'){e.preventDefault();showPhoto(activePhoto+1);}});
const dialog = document.querySelector('#legal-dialog');
document.querySelector('#legal-button').addEventListener('click', () => dialog.showModal());
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { const box = dialog.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close(); });
