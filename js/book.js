(function($) {
  'use strict';

  var $book = $('#memory-book');
  var $prevBtn = $('#prev-page');
  var $nextBtn = $('#next-page');
  var $brandLink = $('.reader-brand');
  var $sidebar = $('#chapter-sidebar');
  var $sidebarBtns = $sidebar.find('button[data-page-target]');
  var totalPages = 5;

  var pageSlugs = {
    1: 'couverture',
    2: 'origines',
    3: 'traces',
    4: 'voix',
    5: 'proches'
  };

  var slugToPage = {
    'couverture': 1,
    'cover': 1,
    'origines': 2,
    'chapitre-1': 2,
    'traces': 3,
    'chapitre-2': 3,
    'voix': 4,
    'chapitre-3': 4,
    'proches': 5,
    'chapitre-4': 5
  };

  function getInitialPage() {
    /* 1. Vérification dans l'URL (hash) */
    var hash = (window.location.hash || '').replace(/^#/, '').toLowerCase().trim();
    if (hash) {
      if (slugToPage[hash]) {
        return slugToPage[hash];
      }
      var numMatch = hash.match(/^(?:page-)?([1-5])$/);
      if (numMatch) {
        var p = parseInt(numMatch[1], 10);
        if (p >= 1 && p <= totalPages) return p;
      }
    }

    /* 2. Persistance locale en cas de simple rafraîchissement (F5 / Ctrl+R) */
    try {
      var saved = sessionStorage.getItem('memoiredetoi_current_page');
      if (saved) {
        var savedPage = parseInt(saved, 10);
        if (savedPage >= 1 && savedPage <= totalPages) {
          return savedPage;
        }
      }
    } catch (e) {}

    return 1;
  }

  function persistActivePage(page) {
    try {
      sessionStorage.setItem('memoiredetoi_current_page', String(page));
    } catch (e) {}

    var slug = pageSlugs[page] || ('page-' + page);
    var newHash = '#' + slug;
    if (window.location.hash !== newHash) {
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, '', newHash);
      } else {
        window.location.hash = newHash;
      }
    }
  }

  function syncReaderState(turnPage) {
    var isCover = turnPage === 1;
    var isLast = turnPage === totalPages;

    document.body.classList.toggle('reading-page', !isCover);
    $sidebar.toggleClass('is-visible', !isCover);

    /* Aucun bouton retour sur la couverture ; pas de bouton suivant sur la couverture ni sur la dernière page */
    $prevBtn.toggleClass('is-hidden', isCover).prop('disabled', isCover);
    var hideNext = isCover || isLast;
    $nextBtn.toggleClass('is-hidden', hideNext).prop('disabled', hideNext);

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

    persistActivePage(turnPage);
  }

  function initBook() {
    var initialPage = getInitialPage();

    $book.turn({
      display: 'single',
      width: window.innerWidth,
      height: window.innerHeight,
      page: initialPage,
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

    syncReaderState(initialPage);
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

  /* Synchronisation en cas de changement manuel de hash ou retour arrière navigateur */
  $(window).on('hashchange', function() {
    var targetPage = getInitialPage();
    if ($book.data().done && $book.turn('page') !== targetPage) {
      $book.turn('page', targetPage);
    }
  });

  $(initBook);
})(jQuery);
