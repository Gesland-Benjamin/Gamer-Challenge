  document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const challengeId = button.dataset.id;

      const res = await fetch(`/api/like/${challengeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (data.success) {
        document.querySelector(`#votes-${challengeId}`).textContent = data.votes;
      } else {
        alert(data.error || "Erreur lors du vote");
      }
    });
  });
