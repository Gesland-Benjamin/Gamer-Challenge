document.addEventListener('click', function (e) {
    const btn = e.target.closest('.pw-toggle');
    if (!btn) return;

    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';

    // Accessibilité : aria-pressed et libellé
    btn.setAttribute('aria-pressed', String(isHidden));
    btn.setAttribute('aria-label', isHidden ? 'Masquer le mot de passe' : 'Afficher le mot de passe');

    // Optionnel : changer l'icône
    btn.textContent = isHidden ? '🙈' : '👁';
  });
