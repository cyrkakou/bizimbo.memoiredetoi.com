(function($) {
  'use strict';

  var $book = $('#memory-book');
  var $prevBtn = $('#prev-page');
  var $nextBtn = $('#next-page');
  var $brandLink = $('.reader-brand');
  var $sidebar = $('#chapter-sidebar');
  var $sidebarBtns = $sidebar.find('button[data-page-target]');
  var totalPages = 5;

  function syncReaderState(turnPage) {
    var isCover = turnPage === 1;
    var isLast = turnPage === totalPages;

    document.body.classList.toggle('reading-page', !isCover);
    $sidebar.toggleClass('is-visible', !isCover);

    /* Aucun bouton retour sur la couverture ; pas de bouton suivant sur la dernière page */
    $prevBtn.toggleClass('is-hidden', isCover).prop('disabled', isCover);
    $nextBtn.toggleClass('is-hidden', isLast).prop('disabled', isLast);

    /* Chapitre actif dans la sidebar (data-page-target="1..4" correspond à turnPage 2..5) */
    var chapterIndex = turnPage - 1;
    $sidebarBtns.each(function() {
      var target = parseInt($(this).attr('data-page-target'), 10);
      var active = target === chapterIndex;
      $(this).toggleClass('is-active', active);
      if (active) {
        $(this).attr('aria-current', 'page');
      } else {
        $(this).removeAttr('aria-current');
      }
    });
  }

  function initBook() {
    $book.turn({
      display: 'single',
      width: window.innerWidth,
      height: window.innerHeight,
      page: 1,
      gradients: true,
      acceleration: true,
      duration: 850,
      elevation: 24,
      when: {
        turning: function(event, page) {
          syncReaderState(page);
        },
        turned: function(event, page) {
          syncReaderState(page);
        }
      }
    });

    syncReaderState(1);
  }

  /* Navigation par boutons (délégation sur document pour résister au cycle DOM de Turn.js) */
  $(document).on('click', '#open-book', function(event) {
    event.preventDefault();
    event.stopPropagation();
    $book.turn('page', 2);
  });

  $prevBtn.on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if ($book.turn('page') > 1) {
      $book.turn('previous');
    }
  });

  $nextBtn.on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if ($book.turn('page') < totalPages) {
      $book.turn('next');
    }
  });

  $brandLink.on('click', function(event) {
    event.preventDefault();
    if ($book.turn('page') !== 1) {
      $book.turn('page', 1);
    }
  });

  $sidebarBtns.on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    var chapter = parseInt($(this).attr('data-page-target'), 10);
    var targetTurnPage = chapter + 1;
    if (targetTurnPage >= 2 && targetTurnPage <= totalPages) {
      $book.turn('page', targetTurnPage);
    }
  });

  /* Navigation au clavier (flèches gauche / droite) hors saisie formulaire / modale ouverte */
  $(document).on('keydown', function(event) {
    if (document.querySelector('.modal-backdrop.is-open')) return;
    var tag = event.target && event.target.tagName ? event.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      if ($book.turn('page') < totalPages) {
        $book.turn('next');
      }
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      if ($book.turn('page') > 1) {
        $book.turn('previous');
      }
    }
  });

  /* Glissement tactile (swipe horizontal) sur mobile / tablette */
  var touchStartX = null;
  var touchStartY = null;

  $book.on('touchstart', function(event) {
    var touches = event.originalEvent && event.originalEvent.touches;
    if (!touches || touches.length !== 1) return;
    touchStartX = touches[0].clientX;
    touchStartY = touches[0].clientY;
  });

  $book.on('touchend', function(event) {
    if (touchStartX === null || touchStartY === null) return;
    var changed = event.originalEvent && event.originalEvent.changedTouches;
    if (!changed || !changed.length) return;

    var dx = changed[0].clientX - touchStartX;
    var dy = changed[0].clientY - touchStartY;
    touchStartX = null;
    touchStartY = null;

    if (Math.abs(dx) > 56 && Math.abs(dx) > Math.abs(dy) * 1.4 && !$book.turn('animating')) {
      if (dx < 0 && $book.turn('page') < totalPages) {
        $book.turn('next');
      } else if (dx > 0 && $book.turn('page') > 1) {
        $book.turn('previous');
      }
    }
  });

  /* Gestion robuste du redimensionnement de fenêtre */
  var resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      $book.turn('size', window.innerWidth, window.innerHeight);
      $book.turn('resize');
    }, 60);
  });

  $(initBook);
})(jQuery);
