const Countdown = {
  /**
   * @param {string} startTimeString - "Month DD, YYYY HH:MM:SS"
   * @param {string} endTimeString   - "Month DD, YYYY HH:MM:SS"  (can equal startTimeString if duration unknown)
   * @param {string} containerId     - ID of the countdown-timer-box element
   * @param {Object} elementIds      - { days, hours, minutes, seconds } — IDs of the display spans
   */
  init: function(startTimeString, endTimeString, containerId, elementIds) {
    elementIds = elementIds || {};
    const ids = {
      days:    elementIds.days    || 'days',
      hours:   elementIds.hours   || 'hours',
      minutes: elementIds.minutes || 'minutes',
      seconds: elementIds.seconds || 'seconds',
      status:  elementIds.status  || null
    };

    const startMs = new Date(startTimeString).getTime();
    const endMs   = new Date(endTimeString).getTime();
    const container = document.getElementById(containerId);
    if (!container) return;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function setTime(ms) {
      const abs  = Math.abs(ms);
      const d    = Math.floor(abs / 86400000);
      const h    = Math.floor((abs % 86400000) / 3600000);
      const m    = Math.floor((abs % 3600000)  / 60000);
      const s    = Math.floor((abs % 60000)    / 1000);
      const elD  = document.getElementById(ids.days);
      const elH  = document.getElementById(ids.hours);
      const elM  = document.getElementById(ids.minutes);
      const elS  = document.getElementById(ids.seconds);
      if (elD) elD.innerText = pad(d);
      if (elH) elH.innerText = pad(h);
      if (elM) elM.innerText = pad(m);
      if (elS) elS.innerText = pad(s);
    }

    function setStatus(text) {
      const el = ids.status ? document.getElementById(ids.status) : container.querySelector('.countdown-title');
      if (el) el.innerText = text;
    }

    const x = setInterval(function () {
      const now = Date.now();

      if (now >= endMs) {
        // Phase 3 — event over
        clearInterval(x);
        container.innerHTML = "<div class='display-6 fw-bold text-uppercase'>Event Ended</div>";

      } else if (now >= startMs) {
        // Phase 2 — event in progress, count down to end
        setStatus('Event In Progress');
        setTime(endMs - now);

      } else {
        // Phase 1 — event not yet started, count down to start
        setStatus('Event Starting In');
        setTime(startMs - now);
      }
    }, 1000);
  }
};

window.NexusCountdown = Countdown;