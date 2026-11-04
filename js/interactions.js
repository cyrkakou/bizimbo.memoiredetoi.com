(function() {
  'use strict';

  var toast = document.querySelector('.toast');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function() {
      toast.classList.remove('show');
    }, 3200);
  }

  function openModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('is-open');
    var firstInput = modal.querySelector('input, textarea');
    if (firstInput) {
      setTimeout(function() {
        firstInput.focus();
      }, 50);
    }
  }

  function closeModals() {
    document.querySelectorAll('.modal-backdrop.is-open').forEach(function(modal) {
      modal.classList.remove('is-open');
    });
  }

  /* Délégation d'événements pour résister au cycle DOM des pages Turn.js */
  document.addEventListener('click', function(event) {
    var modalBtn = event.target.closest('[data-modal]');
    if (modalBtn) {
      event.preventDefault();
      event.stopPropagation();
      openModal(modalBtn.dataset.modal);
      return;
    }

    var closeBtn = event.target.closest('.modal-close');
    if (closeBtn) {
      event.preventDefault();
      closeModals();
      return;
    }

    if (event.target.classList && event.target.classList.contains('modal-backdrop')) {
      closeModals();
      return;
    }

    var ritualBtn = event.target.closest('[data-ritual]');
    if (ritualBtn) {
      event.preventDefault();
      event.stopPropagation();
      var isCandle = ritualBtn.dataset.ritual === 'candle';
      var countEl = document.getElementById(isCandle ? 'candle-count' : 'flower-count');
      if (countEl) {
        countEl.textContent = String(Number(countEl.textContent) + 1);
      }
      showToast(isCandle ? 'Votre bougie a été allumée.' : 'Votre fleur a été déposée.');
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModals();
    }
  });

  document.querySelectorAll('form[data-form]').forEach(function(form) {
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var type = form.dataset.form;
      closeModals();
      showToast(
        type === 'message'
          ? 'Votre message a été envoyé à la famille pour validation.'
          : 'Un lien d’invitation sera envoyé à votre adresse email.'
      );
      form.reset();
    });
  });
})();
