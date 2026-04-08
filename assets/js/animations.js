/**
 * Interactive Animations
 * - Scroll reveal with IntersectionObserver
 * - Button reflective shine (follows mouse)
 * - Card tilt on mouse move
 * - Magnetic button effect
 * - Hero letter animation
 * - Stat counter animation
 */
(function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Scroll Reveal ──
    function initScrollReveal() {
        var els = document.querySelectorAll('.reveal, .reveal-stagger');
        if (!els.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        els.forEach(function (el) { observer.observe(el); });
    }

    // ── Button Reflective Shine ──
    function initButtonShine() {
        var buttons = document.querySelectorAll('.btn-shine, .btn-shine-dark');
        buttons.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                btn.style.setProperty('--shine-x', (e.clientX - rect.left) + 'px');
                btn.style.setProperty('--shine-y', (e.clientY - rect.top) + 'px');
            });
        });
    }

    // ── Card Tilt Effect ──
    function initCardTilt() {
        var cards = document.querySelectorAll('.card-tilt');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left;
                var y = e.clientY - rect.top;
                var centerX = rect.width / 2;
                var centerY = rect.height / 2;
                var rotateX = ((y - centerY) / centerY) * -3;
                var rotateY = ((x - centerX) / centerX) * 3;
                card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale(1.01)';
            });

            card.addEventListener('mouseleave', function () {
                card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    // ── Offer Card Glow ──
    function initCardGlow() {
        var cards = document.querySelectorAll('.offer-card');
        cards.forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--glow-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--glow-y', (e.clientY - rect.top) + 'px');
            });
        });
    }

    // ── Magnetic Buttons ──
    function initMagneticButtons() {
        var btns = document.querySelectorAll('.btn-magnetic');
        btns.forEach(function (btn) {
            btn.addEventListener('mousemove', function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
            });

            btn.addEventListener('mouseleave', function () {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ── Hero Letter Animation ──
    function initHeroLetters() {
        var h1 = document.querySelector('.hero h1') || document.querySelector('.page-hero h1');
        if (!h1) return;

        // Skip letter animation on blog pages (page-hero--wide)
        if (h1.closest('.page-hero--wide')) return;

        var html = h1.innerHTML;
        var result = '';
        var delay = 0;

        // Split into HTML tags and text segments, preserving all tags
        var tokens = html.split(/(<[^>]+>)/);

        tokens.forEach(function (token) {
            if (token.match(/^<br\s*\/?>$/i)) {
                result += '<br>';
                delay += 80;
            } else if (token.match(/^</)) {
                // Preserve any HTML tag as-is (e.g. <span class="brand-sub">, </span>)
                result += token;
            } else {
                // Text segment — wrap each character
                for (var i = 0; i < token.length; i++) {
                    var ch = token[i];
                    if (ch === ' ') {
                        result += ' ';
                    } else {
                        result += '<span class="letter" style="animation-delay:' + delay + 'ms">' + ch + '</span>';
                        delay += 50;
                    }
                }
            }
        });

        h1.innerHTML = result;
    }

    // ── Stat Counter Animation ──
    function initCounterAnimation() {
        var stats = document.querySelectorAll('.stat-number');
        if (!stats.length) return;

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(function (stat) { observer.observe(stat); });
    }

    function animateCounter(el) {
        var text = el.textContent.trim();
        var prefix = '';
        var suffix = '';
        var num = 0;

        // Extract number and any prefix/suffix like $ or +
        var match = text.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
        if (!match) return;

        prefix = match[1];
        num = parseInt(match[2], 10);
        suffix = match[3];

        var duration = 1200;
        var start = performance.now();

        function step(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.round(eased * num);
            el.textContent = prefix + current + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }

        requestAnimationFrame(step);
    }

    // ── Auto-apply animation classes to page elements ──
    function autoApplyClasses() {
        // Scroll reveal sections (homepage)
        var revealSelectors = [
            '.why-highlights',
            '.stats-row',
            '.offer-section',
            '.or-divider',
            '.signup-section',
            '.trust-section',
            '.blog-section',
            '.sponsors-section',
            // why.html sections
            '.why-section',
            '.why-cta',
            '.signature'
        ];
        revealSelectors.forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                el.classList.add('reveal');
            });
        });

        // Stagger children
        var staggerSelectors = [
            '.trust-badges', '.why-points', '.perks', '.blog-grid',
            // why.html grids
            '.pillars', '.compare-grid', '.solution-grid',
            '.options-grid', '.phase-grid'
        ];
        staggerSelectors.forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                el.classList.add('reveal-stagger');
            });
        });

        // FAQ items stagger
        var faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(function (item, i) {
            item.classList.add('reveal');
            item.style.transitionDelay = (i * 0.06) + 's';
        });

        // Card tilt
        var tiltSelectors = ['.offer-card', '.why-highlights-inner', '.highlight-card', '.blog-card'];
        tiltSelectors.forEach(function (sel) {
            document.querySelectorAll(sel).forEach(function (el) {
                el.classList.add('card-tilt');
            });
        });

        // Button shine (white buttons on dark bg)
        var shineButtons = document.querySelectorAll('.btn-founding');
        shineButtons.forEach(function (btn) {
            btn.classList.add('btn-shine');
        });

        // Button shine dark (light bg buttons)
        var shineDarkButtons = document.querySelectorAll('.btn-why, .btn-sponsor, #mc-embedded-subscribe');
        shineDarkButtons.forEach(function (btn) {
            btn.classList.add('btn-shine-dark');
        });

        // CTA button shine (dark bg)
        var ctaButtons = document.querySelectorAll('.btn-cta');
        ctaButtons.forEach(function (btn) {
            btn.classList.add('btn-shine');
        });

        // Magnetic effect on CTA buttons
        var magneticBtns = document.querySelectorAll('.btn-sponsor, .btn-why, .btn-cta');
        magneticBtns.forEach(function (btn) {
            btn.classList.add('btn-magnetic');
        });

        // Option cards and solution items hover lift
        document.querySelectorAll('.option-card, .solution-item, .phase-card, .compare-card').forEach(function (card) {
            card.classList.add('card-hover-lift');
        });
    }

    // ── Init ──
    function init() {
        if (prefersReducedMotion) {
            // Still apply classes so elements are visible, but skip JS-driven animations
            autoApplyClasses();
            document.querySelectorAll('.reveal').forEach(function (el) {
                el.classList.add('revealed');
            });
            document.querySelectorAll('.reveal-stagger').forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        autoApplyClasses();
        initScrollReveal();
        initButtonShine();
        initCardTilt();
        initCardGlow();
        initMagneticButtons();
        initHeroLetters();
        initCounterAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
