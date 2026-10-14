export function setupNavigationMenu(button: HTMLButtonElement | null, links: HTMLElement | null) {
  if (!button || !links) return;

  const updateLabel = () => {
    const language = document.documentElement.dataset.language;
    const labels = language === 'zh-hans'
      ? ['打开导航', '关闭导航']
      : language === 'zh-hant'
        ? ['開啟導航', '關閉導航']
        : ['Open navigation', 'Close navigation'];
    button.setAttribute('aria-label', labels[links.classList.contains('is-open') ? 1 : 0]);
  };

  const setOpen = (open: boolean) => {
    links.classList.toggle('is-open', open);
    button.setAttribute('aria-expanded', String(open));
    updateLabel();
  };

  button.addEventListener('click', () => setOpen(!links.classList.contains('is-open')));
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  button.closest('nav')?.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !links.classList.contains('is-open')) return;
    event.preventDefault();
    setOpen(false);
    button.focus({ preventScroll: true });
  });
  document.addEventListener('noah:language-change', updateLabel);
  setOpen(links.classList.contains('is-open'));
}
