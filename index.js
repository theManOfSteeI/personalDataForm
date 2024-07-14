// Función para obtener los países desde la API y llenar el select
async function fetchCountries() {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const countries = await response.json();
      const select = document.getElementById('floatingSelect');
  
      countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country.cca2; // Código del país
        option.textContent = country.name.common; // Nombre del país
        select.appendChild(option);
      });
  
      // Inicializar el selectpicker después de llenar las opciones
      $('.selectpicker').selectpicker('refresh');
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }
  
  // Llamar fetchCountries cuando se cargue el DOM
  document.addEventListener('DOMContentLoaded', () => {
    fetchCountries();
  
    // JavaScript para deshabilitar el envío del formulario si hay campos no válidos
    (function () {
      'use strict';
  
      // Obtener todos los formularios que queremos aplicar estilos de validación personalizados de Bootstrap
      var forms = document.querySelectorAll('.needs-validation');
  
      // Bucle sobre ellos y prevenir el envío
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event) {
            const birthDateInput = document.getElementById('floatingInputDate');
            const birthDate = new Date(birthDateInput.value);
            const today = new Date();
            const futureDateFeedback = birthDateInput.nextElementSibling.nextElementSibling;
  
            if (birthDate > today) {
              event.preventDefault();
              event.stopPropagation();
              birthDateInput.classList.add('is-invalid');
              futureDateFeedback.style.display = 'block';
            } else {
              birthDateInput.classList.remove('is-invalid');
              futureDateFeedback.style.display = 'none';
            }
  
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
  
            form.classList.add('was-validated');
          }, false);
        });
    })();
  
    // Mostrar el modal de cookies si no ha sido aceptado previamente
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      const cookieConsentModal = new bootstrap.Modal(document.getElementById('cookieConsentModal'));
      cookieConsentModal.show();
    }
  
    // Manejar la aceptación de cookies
    document.getElementById('acceptCookies').addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'accepted');
      const cookieConsentModal = bootstrap.Modal.getInstance(document.getElementById('cookieConsentModal'));
      cookieConsentModal.hide();
    });
  });
  