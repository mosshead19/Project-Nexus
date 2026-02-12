const Countdown = {
  /**
   * Initialize a countdown timer
   * @param {string} dateString - "Feb 13, 2026 08:00:00"
   * @param {string} containerId - ID of the container element
   * @param {Object} elementIds - Optional mapping for day/hour/min/sec element IDs
   */
  init: function(dateString, containerId, elementIds = {}) {
    const ids = {
      days: elementIds.days || "days",
      hours: elementIds.hours || "hours",
      minutes: elementIds.minutes || "minutes",
      seconds: elementIds.seconds || "seconds"
    };

    const countDownDate = new Date(dateString).getTime();
    
    const container = document.getElementById(containerId);
    if (!container) return; // Exit if container doesn't exist

    const x = setInterval(function() {

      // Get today's date and time
      const now = new Date().getTime();

      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result
      const elDays = document.getElementById(ids.days);
      const elHours = document.getElementById(ids.hours);
      const elMinutes = document.getElementById(ids.minutes);
      const elSeconds = document.getElementById(ids.seconds);

      if (elDays) elDays.innerText = days < 10 ? "0" + days : days;
      if (elHours) elHours.innerText = hours < 10 ? "0" + hours : hours;
      if (elMinutes) elMinutes.innerText = minutes < 10 ? "0" + minutes : minutes;
      if (elSeconds) elSeconds.innerText = seconds < 10 ? "0" + seconds : seconds;

      // If the count down is finished
      if (distance < 0) {
        clearInterval(x);
        if (container) {
           container.innerHTML = "<div class='display-6 fw-bold text-uppercase'>Event Started</div>";
        }
      }
    }, 1000);
  }
};

window.NexusCountdown = Countdown;
