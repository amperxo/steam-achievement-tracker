(function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let W, H;
    const mouse = { x: -9999, y: -9999 };

    const COLORS = ['217,119,6', '14,165,233', '245,158,11', '251,191,36', '56,189,248'];
    const COUNT = 130;
    const CONNECT = 160;
    const REPEL  = 120;

    let particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function make() {
        return {
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r:  Math.random() * 2 + 0.6,
            c:  COLORS[Math.floor(Math.random() * COLORS.length)],
            a:  Math.random() * 0.55 + 0.2,
        };
    }

    function init() {
        resize();
        particles = Array.from({ length: COUNT }, make);
    }

    function frame() {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < COUNT; i++) {
            const p = particles[i];

            // mouse repulsion
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < REPEL && d > 0) {
                const f = (REPEL - d) / REPEL;
                p.vx += (dx / d) * f * 0.25;
                p.vy += (dy / d) * f * 0.25;
            }

            // dampen + clamp speed
            p.vx *= 0.99;
            p.vy *= 0.99;
            const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (spd > 1.4) { p.vx = p.vx / spd * 1.4; p.vy = p.vy / spd * 1.4; }

            p.x += p.vx;
            p.y += p.vy;

            // wrap edges
            if (p.x < 0) p.x = W; else if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H; else if (p.y > H) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.c},${p.a})`;
            ctx.fill();
        }

        // connections
        for (let i = 0; i < COUNT; i++) {
            for (let j = i + 1; j < COUNT; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d  = Math.sqrt(dx * dx + dy * dy);
                if (d < CONNECT) {
                    const alpha = (1 - d / CONNECT) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(217,119,6,${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(frame);
    }

    window.addEventListener('resize', () => { resize(); });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

    init();
    frame();
})();
