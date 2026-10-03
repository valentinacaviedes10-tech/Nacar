(function () {
  const root = document.documentElement;

  // Modo oscuro / claro
  const themeBtn = document.querySelector('.theme-toggle');
  const paintIcon = () => {
    const dark = root.classList.contains('dark-mode');
    themeBtn.textContent = dark ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
  };
  paintIcon();
  themeBtn.addEventListener('click', () => {
    root.classList.toggle('dark-mode');
    try { localStorage.setItem('theme', root.classList.contains('dark-mode') ? 'dark' : 'light'); } catch (e) {}
    paintIcon();
  });

  // Menú móvil
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 820) setMenu(false); });

  // Validación del formulario de contacto
  const form = document.getElementById('contact-form');
  if (!form) return;
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const rules = {
    nombre: v => v.trim().length >= 2 || 'Escribe tu nombre.',
    email: v => emailRe.test(v.trim()) || 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
    asunto: v => v.trim().length >= 3 || 'Escribe un asunto.',
    mensaje: v => v.trim().length >= 10 || 'El mensaje debe tener al menos 10 caracteres.'
  };
  const check = input => {
    const result = rules[input.name](input.value);
    const field = input.closest('.field');
    field.classList.toggle('invalid', result !== true);
    field.querySelector('.error').textContent = result === true ? '' : result;
    return result === true;
  };
  form.querySelectorAll('input,textarea').forEach(i => i.addEventListener('blur', () => check(i)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [...form.querySelectorAll('input,textarea')].map(check).every(Boolean);
    const msg = document.getElementById('success');
    if (ok) {
      msg.textContent = '¡Mensaje enviado con éxito! Te responderemos en menos de 24 horas.';
      msg.classList.add('show');
      form.reset();
      setTimeout(() => msg.classList.remove('show'), 6000);
    } else {
      msg.classList.remove('show');
      form.querySelector('.invalid input, .invalid textarea').focus();
    }
  });
})();
