// Initialisation EmailJS avec ta Public Key
  emailjs.init("CG6FK3jA7MCh__qUR"); 

  const form = document.getElementById("contact-form");
  const statusMessage = document.getElementById("status-message");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // --- Validation côté front ---
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const privacy = document.getElementById("privacy").checked;

    // Vérif basique du nom
    if (name.length < 2 || name.length > 100) {
      statusMessage.textContent = "⚠️ Le nom doit contenir entre 2 et 100 caractères.";
      statusMessage.style.color = "red";
      return;
    }

    // Vérif email avec regex simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length > 255) {
      statusMessage.textContent = "⚠️ Email invalide.";
      statusMessage.style.color = "red";
      return;
    }

    // Vérif du message
    if (message.length < 5 || message.length > 1000) {
      statusMessage.textContent = "⚠️ Le message doit contenir entre 5 et 1000 caractères.";
      statusMessage.style.color = "red";
      return;
    }

    // Vérif de la checkbox privacy
    if (!privacy) {
      statusMessage.textContent = "⚠️ Vous devez accepter la politique de confidentialité.";
      statusMessage.style.color = "red";
      return;
    }

    // --- Envoi du formulaire si tout est valide ---
    emailjs.sendForm("service_9plrbor", "template_4aowbu4", this)
      .then(function() {
        statusMessage.textContent = "Message envoyé avec succès ! 🎉";
        statusMessage.style.color = "#9754EF";
        form.reset();
      }, function(error) {
        statusMessage.textContent = "Erreur, le message n'a pas pu être envoyé.";
        statusMessage.style.color = "red";
        console.log(error);
      });
  });