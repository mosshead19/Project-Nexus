(function () {
  if (typeof events === 'undefined') return;

  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  // highest id first
  const ids = Object.keys(events).map(Number).sort(function (a, b) { return b - a; });

  ids.forEach(function (id, index) {
    const ev        = events[id];
    const category  = ev.type.toLowerCase().includes('attend') ? 'attended' : 'conducted';
    const delay     = (index % 3 + 1) * 100;
    const galleryId = 'event-' + id;

    // Render the card
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 event-item';
    col.setAttribute('data-category', category);
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', delay);
    col.innerHTML =
      '<div class="portfolio-content h-100">' +
        '<div class="portfolio-img-wrapper">' +
          '<img src="' + ev.image + '" class="img-fluid" alt="' + ev.title + '">' +
          '<div class="portfolio-overlay">' +
            '<a href="' + ev.image + '" title="' + ev.title + '" data-gallery="' + galleryId + '" class="glightbox preview-link"><i class="bi bi-zoom-in"></i></a>' +
            '<a href="event-details.html?id=' + id + '" title="More Details" class="details-link"><i class="bi bi-link-45deg"></i></a>' +
          '</div>' +
        '</div>' +
        '<div class="portfolio-info">' +
          '<h4><a href="event-details.html?id=' + id + '" title="' + ev.title + '">' + ev.title + '</a></h4>' +
          '<div class="event-meta">' +
            '<span class="date">' + ev.date + '</span>' +
            '<span class="separator">|</span>' +
            '<span class="participants">' + ev.participants + '</span>' +
            '<span class="separator">|</span>' +
            '<span class="status">' + ev.type + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    grid.appendChild(col);

    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.display = 'none';
    hiddenContainer.setAttribute('data-event-gallery', id);
    ev.images.forEach(function (image, index) {
      if (index > 0) {
        const link = document.createElement('a');
        link.href  = image;
        link.className = 'glightbox';
        link.setAttribute('data-gallery', galleryId);
        link.setAttribute('title', ev.title);
        hiddenContainer.appendChild(link);
      }
    });
    document.body.appendChild(hiddenContainer);
  });
})();


document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.event-filters .nav-link');
  const eventItems    = document.querySelectorAll('.event-item');


  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (btn) { btn.classList.remove('active'); });
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');

      eventItems.forEach(function (item) {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
          setTimeout(function () { item.style.opacity = '1'; }, 10);
        } else {
          item.style.opacity = '0';
          setTimeout(function () { item.style.display = 'none'; }, 300);
        }
      });
    });
  });

  // Search bar
  const searchInput = document.getElementById('searchEvents');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();

      eventItems.forEach(function (item) {
        const title = item.querySelector('h3') ? item.querySelector('h3').textContent.toLowerCase() : '';
        const description = item.querySelector('p') ? item.querySelector('p').textContent.toLowerCase() : '';
        const tags  = Array.from(item.querySelectorAll('.badge')).map(function (b) { return b.textContent.toLowerCase(); }).join(' ');

        if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
});


document.addEventListener('DOMContentLoaded', function () {
  if (typeof upcomingEvents === 'undefined' || typeof NexusCountdown === 'undefined') return;

  const grid = document.getElementById('eventsGrid');
  if (!grid) return;


  function parseDurationMs(duration) {
    const match = String(duration).match(/([\d.]+)\s*(hour|hours|hr|day|days|minute|minutes|min)/i);
    if (!match) return 0;
    const val  = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith('day'))  return val * 86400000;
    if (unit.startsWith('hour') || unit === 'hr') return val * 3600000;
    if (unit.startsWith('min'))  return val * 60000;
    return 0;
  }

  const now = Date.now();

  const firstExisting = grid.firstElementChild || null;

  const sorted = upcomingEvents.slice().sort(function (a, b) {
    return new Date(a.startTime) - new Date(b.startTime);
  });

  sorted.forEach(function (ev, index) {
    const startMs  = new Date(ev.startTime).getTime();
    const endMs    = startMs + parseDurationMs(ev.duration);

    // Skip events that have already ended
    if (now >= endMs) return;

    const uid      = 'upcoming-' + ev.id;
    const category = ev.type.toLowerCase().includes('attend') ? 'attended' : 'conducted';
    const delay    = (index % 3 + 1) * 100;

    const initialLabel = now >= startMs ? 'Event In Progress' : 'Event Starting In';

    const endTimeString = new Date(endMs).toString();

    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 event-item';
    col.setAttribute('data-category', category);
    col.setAttribute('data-aos', 'fade-up');
    col.setAttribute('data-aos-delay', delay);
    col.innerHTML =
      '<div class="portfolio-content h-100">' +
        '<div class="portfolio-img-wrapper position-relative">' +
          '<div class="countdown-timer-box" id="' + uid + '">' +
            '<div class="countdown-title">' + initialLabel + '</div>' +
            '<div class="d-flex justify-content-center">' +
              '<div class="time-block"><span class="time-val" id="days-'    + uid + '">00</span><span class="time-label">Days</span></div>' +
              '<div class="time-val">:</div>' +
              '<div class="time-block"><span class="time-val" id="hours-'   + uid + '">00</span><span class="time-label">Hours</span></div>' +
              '<div class="time-val">:</div>' +
              '<div class="time-block"><span class="time-val" id="minutes-' + uid + '">00</span><span class="time-label">Mins</span></div>' +
              '<div class="time-val">:</div>' +
              '<div class="time-block"><span class="time-val" id="seconds-' + uid + '">00</span><span class="time-label">Secs</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="portfolio-info">' +
          '<h4>' + ev.title + '</h4>' +
          '<div class="event-meta">' +
            '<span class="date">Upcoming</span>' +
            '<span class="separator">|</span>' +
            '<span class="participants">' + ev.participants + '</span>' +
            '<span class="separator">|</span>' +
            '<span class="status">' + ev.type + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';

    grid.insertBefore(col, firstExisting);

    NexusCountdown.init(ev.startTime, endTimeString, uid, {
      days:    'days-'    + uid,
      hours:   'hours-'   + uid,
      minutes: 'minutes-' + uid,
      seconds: 'seconds-' + uid
    });
  });
});
