/**
 * Animated Network Background
 * Particles spawn from edges with pulsing alpha and mouse interaction
 * Using Project Nexus color theme: turquoise and cyan
 */

(function() {
  'use strict';
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedNetwork);
  } else {
    initAnimatedNetwork();
  }
  
  function initAnimatedNetwork() {
    // Only run on pages with hero section
    const heroSection = document.getElementById('hero');
    if (!heroSection) {
      console.log('Hero section not found, skipping animated network');
      return;
    }
    
    const canvas = document.createElement('canvas');
    canvas.id = 'animatedNetworkCanvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    // Insert canvas into hero section
    heroSection.style.position = 'relative';
    heroSection.insertBefore(canvas, heroSection.firstChild);
    
    const ctx = canvas.getContext('2d');
    let canvasWidth, canvasHeight;

    // Configuration
    let BALL_NUM = 30;
    const R = 3.5; // Particle radius
    const balls = [];
    const alpha_f = 0.015; // Slower pulsing
    const link_line_width = 1.7;
    let dis_limit = 280;
    
    // If width change
    function updateConfig() {
      if (canvasWidth < 576) {
        BALL_NUM = 10;
        dis_limit = 150;
      } else if (canvasWidth < 768) {
        BALL_NUM = 15;
        dis_limit = 200;
      } else if (canvasWidth < 992) {
        BALL_NUM = 20;
        dis_limit = 240;
      } else {
        BALL_NUM = 30;
        dis_limit = 280;
      }
    }

    function resizeCanvas() {
      canvas.width = heroSection.offsetWidth;
      canvas.height = heroSection.offsetHeight;
      canvasWidth = canvas.width;
      canvasHeight = canvas.height;
      updateConfig();
    }
    resizeCanvas();
    window.addEventListener('resize', () => {
      resizeCanvas();
    });
    
    // YOUR COLOR THEME - turquoise/cyan instead of yellow-green
    const ball_colors = [
      { r: 0, g: 163, b: 169 },      // Primary turquoise
      { r: 64, g: 224, b: 208 },     // Light turquoise
      { r: 56, g: 189, b: 248 }      // Accent blue
    ];
    
    const mouse_ball = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: R,
      type: 'mouse'
    };
    
    let mouse_in = false;

    // Utility functions
    function randomNumFrom(min, max) {
      return Math.random() * (max - min) + min;
    }

    function randomArrayItem(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomSidePos(length) {
      return Math.ceil(Math.random() * length);
    }

    function getRandomSpeed(pos) {
      const min = -0.4; 
      const max = 0.4;  
      switch(pos) {
        case 'top':
          return [randomNumFrom(min, max), randomNumFrom(0.05, max)];
        case 'right':
          return [randomNumFrom(min, -0.05), randomNumFrom(min, max)];
        case 'bottom':
          return [randomNumFrom(min, max), randomNumFrom(min, -0.05)];
        case 'left':
          return [randomNumFrom(0.05, max), randomNumFrom(min, max)];
        default:
          return [0, 0];
      }
    }

    function getRandomBall() {
      const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
      const speed = getRandomSpeed(pos);
      const color = randomArrayItem(ball_colors);
      
      let x, y;
      switch(pos) {
        case 'top':
          x = randomSidePos(canvasWidth);
          y = -R;
          break;
        case 'right':
          x = canvasWidth + R;
          y = randomSidePos(canvasHeight);
          break;
        case 'bottom':
          x = randomSidePos(canvasWidth);
          y = canvasHeight + R;
          break;
        case 'left':
          x = -R;
          y = randomSidePos(canvasHeight);
          break;
      }
      
      return {
        x: x,
        y: y,
        vx: speed[0],
        vy: speed[1],
        r: R,
        alpha: 1,
        phase: randomNumFrom(0, 10),
        color: color
      };
    }

    // Draw balls
    function renderBalls() {
      balls.forEach(b => {
        if (!b.hasOwnProperty('type')) {
          ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    }

    // Update balls
    function updateBalls() {
      const new_balls = [];
      balls.forEach(b => {
        b.x += b.vx;
        b.y += b.vy;
        
        // Keep balls that are still on screen (with margin)
        if (b.x > -50 && b.x < canvasWidth + 50 && 
            b.y > -50 && b.y < canvasHeight + 50) {
          new_balls.push(b);
        }
        
        // Pulsing alpha effect
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
      });
      
      balls.length = 0;
      balls.push(...new_balls);
    }

    // Draw connecting lines
    function renderLines() {
      for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          const distance = getDisOf(balls[i], balls[j]);
          const fraction = distance / dis_limit;
          
          if (fraction < 1) {
            const alpha = (1 - fraction).toString();
            // Check width and adjust opacity
            const opacityMultiplier = canvasWidth < 768 ? 0.3 : 0.5;
            ctx.strokeStyle = `rgba(0, 163, 169, ${alpha * opacityMultiplier})`;
            ctx.lineWidth = link_line_width;
            
            ctx.beginPath();
            ctx.moveTo(balls[i].x, balls[i].y);
            ctx.lineTo(balls[j].x, balls[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    // Calculate distance
    function getDisOf(b1, b2) {
      const delta_x = Math.abs(b1.x - b2.x);
      const delta_y = Math.abs(b1.y - b2.y);
      return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
    }

    // Manage balls count
    function manageBalls() {
      // Count current non-mouse balls
      let nonMouseCount = 0;
      for(let i=0; i<balls.length; i++){
        if(!balls[i].hasOwnProperty('type')) nonMouseCount++;
      }
      
      if (nonMouseCount < BALL_NUM) {
        balls.push(getRandomBall());
      } else if (nonMouseCount > BALL_NUM) {
        // Remove excess balls gradually
        const index = balls.findIndex(b => !b.hasOwnProperty('type'));
        if (index > -1) {
          balls.splice(index, 1);
        }
      }
    }

    // Animation loop
    function render() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      
      renderBalls();
      renderLines();
      updateBalls();
      manageBalls();
      
      window.requestAnimationFrame(render);
    }

    // Initialize balls
    function initBalls(num) {
      for (let i = 0; i < num; i++) {
        const color = randomArrayItem(ball_colors);
        balls.push({
          x: randomSidePos(canvasWidth),
          y: randomSidePos(canvasHeight),
          vx: getRandomSpeed('top')[0],
          vy: getRandomSpeed('top')[1],
          r: R,
          alpha: 1,
          phase: randomNumFrom(0, 10),
          color: color
        });
      }
    }

    // Start animation
    function goMovie() {
      initBalls(BALL_NUM);
      window.requestAnimationFrame(render);
    }

    // Mouse interaction on hero section
    heroSection.addEventListener('mouseenter', function() {
      console.log('Mouse entered hero');
      mouse_in = true;
      balls.push(mouse_ball);
    });
    
    heroSection.addEventListener('mouseleave', function() {
      console.log('Mouse left hero');
      mouse_in = false;
      const new_balls = [];
      balls.forEach(b => {
        if (!b.hasOwnProperty('type')) {
          new_balls.push(b);
        }
      });
      balls.length = 0;
      balls.push(...new_balls);
    });
    
    heroSection.addEventListener('mousemove', function(e) {
      const rect = heroSection.getBoundingClientRect();
      mouse_ball.x = e.clientX - rect.left;
      mouse_ball.y = e.clientY - rect.top;
    });

    goMovie();
    console.log('Animated network in hero section initialized');
  }
})();