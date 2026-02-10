/**
 * Network Animation for Hero Section
 * Interactive particle network with mouse interaction
 */

(function() {
  'use strict';
  
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNetworkAnimation);
  } else {
    initNetworkAnimation();
  }
  
  function initNetworkAnimation() {
    const canvas = document.getElementById('networkCanvas');
    if (!canvas) {
      console.warn('Network canvas not found');
      return;
    }
    
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle configuration
    const particleCount = 40;
    const particles = [];
    const mouse = { 
      x: null, 
      y: null, 
      radius: 200  // Increased for better interaction
    };
    const connectionDistance = 180;

    // Color palette matching website theme
    const colors = {
      primary: 'rgba(0, 163, 169, 0.7)',
      secondary: 'rgba(64, 224, 208, 0.65)',
      accent: 'rgba(56, 189, 248, 0.65)',
      line: 'rgba(0, 163, 169, 0.25)'
    };

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 1.5;
        this.baseSpeedX = (Math.random() - 0.5) * 0.6;  // Increased base speed
        this.baseSpeedY = (Math.random() - 0.5) * 0.6;  // Increased base speed
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
        
        const colorKeys = Object.keys(colors).filter(k => k !== 'line');
        this.color = colors[colorKeys[Math.floor(Math.random() * colorKeys.length)]];
      }

      update() {
        // Mouse interaction - repel particles with stronger force
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius && distance > 0) {
            // Much stronger repulsion force
            const force = ((mouse.radius - distance) / mouse.radius) * 8;
            const angle = Math.atan2(dy, dx);
            
            // Apply strong repulsion
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
            
            // Add to velocity for sustained movement
            this.speedX += Math.cos(angle) * force * 0.5;
            this.speedY += Math.sin(angle) * force * 0.5;
            
            // Limit max speed to prevent particles flying off
            const maxSpeed = 8;
            const currentSpeed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
            if (currentSpeed > maxSpeed) {
              this.speedX = (this.speedX / currentSpeed) * maxSpeed;
              this.speedY = (this.speedY / currentSpeed) * maxSpeed;
            }
          } else {
            // Gradually return to base speed
            this.speedX += (this.baseSpeedX - this.speedX) * 0.08;
            this.speedY += (this.baseSpeedY - this.speedY) * 0.08;
          }
        } else {
          // Return to base speed when mouse is not present
          this.speedX += (this.baseSpeedX - this.speedX) * 0.05;
          this.speedY += (this.baseSpeedY - this.speedY) * 0.05;
        }

        // Update position
        this.x += this.speedX;
        this.y += this.speedY;

        // Improved edge handling - wrap around instead of bounce
        const margin = 10;
        if (this.x > canvas.width + margin) {
          this.x = -margin;
        } else if (this.x < -margin) {
          this.x = canvas.width + margin;
        }
        
        if (this.y > canvas.height + margin) {
          this.y = -margin;
        } else if (this.y < -margin) {
          this.y = canvas.height + margin;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    function init() {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    // Connect particles with lines
    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - (distance / connectionDistance)) * 0.6;  // Increased from 0.25 to 0.6
            ctx.strokeStyle = `rgba(0, 163, 169, ${opacity})`;
            ctx.lineWidth = 2;  // Increased from 0.8 to 2
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    // Mouse/Touch events
    function updateMousePosition(x, y) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = x - rect.left;
      mouse.y = y - rect.top;
    }

    function clearMousePosition() {
      mouse.x = null;
      mouse.y = null;
    }

    // Mouse events
    canvas.addEventListener('mousemove', function(e) {
      updateMousePosition(e.clientX, e.clientY);
    });

    canvas.addEventListener('mouseleave', clearMousePosition);

    // Touch events for mobile
    canvas.addEventListener('touchmove', function(e) {
      e.preventDefault();
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    canvas.addEventListener('touchstart', function(e) {
      if (e.touches.length > 0) {
        updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    });

    canvas.addEventListener('touchend', clearMousePosition);

    // Start animation
    init();
    animate();

    console.log('Network animation initialized successfully');
  }
})();
