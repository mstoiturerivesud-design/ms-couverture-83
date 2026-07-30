(() => {
  const form = document.querySelector(".form");
  const photos = document.querySelector("#photos-toiture");
  const error = document.querySelector("#file-error");

  if (!form || !photos || !error) {
    return;
  }

  const validatePhotos = () => {
    const files = Array.from(photos.files || []);
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    let message = "";

    if (files.length > 3) {
      message = "Sélectionnez 3 photos maximum.";
    } else if (totalSize > 10 * 1024 * 1024) {
      message = "Le poids total des photos doit rester inférieur à 10 Mo.";
    }

    photos.setCustomValidity(message);
    error.textContent = message;
    error.hidden = !message;
    return !message;
  };

  photos.addEventListener("change", validatePhotos);
  form.addEventListener("submit", (event) => {
    if (!validatePhotos()) {
      event.preventDefault();
      photos.focus();
      return;
    }

    const button = form.querySelector(".submit-button");
    if (button) {
      button.textContent = "Envoi en cours...";
      button.disabled = true;
    }
  });
})();
