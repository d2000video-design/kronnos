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
if (/^\d{8,15}$/.test(config.whatsapp || '')) addContact('Hablar por WhatsApp ↗', `https://wa.me/${config.whatsapp}`, true);
if (/^https:\/\/(www\.)?instagram\.com\//.test(config.instagram || '')) addContact('Instagram ↗', config.instagram, true);
const projectList = document.querySelector('#project-list');
const projects = Array.isArray(config.projects) ? config.projects : [];
if (projects.length) document.querySelector('#portfolio-empty').hidden = true;
projects.forEach(project => { const article = document.createElement('article'); article.className = 'project'; const img = document.createElement('img'); img.src = project.image; img.alt = project.alt || project.title; img.loading = 'lazy'; const category = document.createElement('p'); category.className = 'eyebrow'; category.textContent = [project.category, project.location].filter(Boolean).join(' · '); const h3 = document.createElement('h3'); h3.textContent = project.title; const description = document.createElement('p'); description.textContent = project.description; article.append(img, category, h3, description); projectList.append(article); });
document.querySelector('#contact-form').addEventListener('submit', e => { e.preventDefault(); const status = document.querySelector('#form-status'); if (!emailValid) { status.textContent = 'El canal de contacto todavía no está disponible. Vuelve a visitarnos próximamente.'; return; } const data = new FormData(e.currentTarget); const body = `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nServicio: ${data.get('service')}\nLocalidad: ${data.get('location')}\n\n${data.get('message')}`; const subject = `Consulta KRONNOS · ${data.get('service')}`; window.location.href = `mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; status.textContent = 'Tu consulta está preparada. Completa el envío desde tu aplicación de correo.'; });
const dialog = document.querySelector('#legal-dialog');
document.querySelector('#legal-button').addEventListener('click', () => dialog.showModal());
dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { const box = dialog.getBoundingClientRect(); if (e.clientX < box.left || e.clientX > box.right || e.clientY < box.top || e.clientY > box.bottom) dialog.close(); });
