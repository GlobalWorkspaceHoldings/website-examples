/**
 * Global Header & Footer Components
 *
 * Usage:
 *   Header: <div id="site-header" data-variant="home|subpage" data-back-text="Home"></div>
 *   Footer: <div id="site-footer" data-variant="full|simple"></div>
 *
 * Header variants:
 *   "home"    – Logo + Founding Phase badge (default)
 *   "subpage" – Logo + back link (text set via data-back-text, defaults to "Home")
 *
 * Footer variants:
 *   "full"   – Brand description, contact info, and copyright (default)
 *   "simple" – Logo and copyright only
 */
if (window.trustedTypes && trustedTypes.createPolicy) {
    try {
        trustedTypes.createPolicy('default', {
            createHTML: function(string) { return string; },
            createScript: function(string) { return string; },
            createScriptURL: function(string) { return string; }
        });
    } catch (e) {}
}

(function () {
    function renderAnnouncement() {
        if (document.querySelector('.announcement-banner')) return;

        var banner = document.createElement('div');
        banner.className = 'announcement-banner';
        banner.setAttribute('role', 'region');
        banner.setAttribute('aria-label', 'Announcement');
        banner.textContent = 'Hot desk memberships include a free MacBook rental every month \u2014 come see the space';

        document.body.insertBefore(banner, document.body.firstChild);
    }

    function renderHeader() {
        var el = document.getElementById('site-header');
        if (!el) return;

        var variant = el.getAttribute('data-variant') || 'home';
        var backText = el.getAttribute('data-back-text') || 'Home';
        var backHref = el.getAttribute('data-back-href') || '/index.html';
        var rightContent = '';

        if (variant === 'home') {
            rightContent = '<div class="nav-right"><span class="phase-badge">Now Open</span></div>';
        } else if (variant === 'subpage') {
            rightContent = '<div class="nav-right"><a href="' + backHref + '" class="back-link"><span aria-hidden="true">\u2190</span> ' + backText + '</a></div>';
        }

        el.outerHTML =
            '<a class="skip-link" href="#main-content">Skip to main content</a>' +
            '<nav aria-label="Main navigation">' +
                '<a href="/index.html" class="logo-link">' +
                    '<img src="/.netlify/images?url=/assets/images/logo.png&w=600" width="289" height="65" alt="SGF.work home" class="logo">' +
                '</a>' +
                rightContent +
            '</nav>';
    }

    function renderFooter() {
        var el = document.getElementById('site-footer');
        if (!el) return;

        var variant = el.getAttribute('data-variant') || 'full';

        if (variant === 'full') {
            el.outerHTML =
                '<footer class="main-footer">' +
                    '<div class="footer-grid">' +
                        '<div class="footer-brand">' +
                            '<img src="/.netlify/images?url=/assets/images/logo.png&w=400" alt="SGF.work" width="178" height="40" style="height: 40px; width: auto; display: block; margin: 0 0 20px 0;" loading="lazy">' +
                            '<p class="footer-seo-text">' +
                                'SGF.work is establishing a modern <strong>coworking space in Springfield, MO</strong>. We are currently in our pre-launch phase, raising capital and finalizing our physical location.' +
                            '</p>' +
                        '</div>' +
                        '<div>' +
                            '<span class="footer-header">Contact</span>' +
                            '<ul class="footer-contact">' +
                                '<li><a href="mailto:hello@sgf.work">hello@sgf.work</a></li>' +
                                '<li>' +
                                    '<span class="mailing-only-label">Mailing Address Only</span>' +
                                    '<address style="font-style: normal; font-size: 0.95rem;">513 US-60 Unit #784<br>Republic, MO 65738</address>' +
                                '</li>' +
                            '</ul>' +
                            '<span class="footer-header">Legal</span>' +
                            '<ul class="footer-contact">' +
                                '<li><a href="/terms.html">Terms &amp; Conditions</a></li>' +
                                '<li><a href="/privacy.html">Privacy Policy</a></li>' +
                            '</ul>' +
                            '<span class="footer-header">Company</span>' +
                            '<ul class="footer-contact">' +
                                '<li><a href="/partnership.html">Partnership</a></li>' +
                                '<li><a href="/climate.html">Climate Plan</a></li>' +
                                '<li><a href="/sitemap.xml">Sitemap</a></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer-bottom">' +
                    '<div class="footer-social">' +
                        '<a href="https://www.facebook.com/sgfcowork" target="_blank" rel="noopener" class="footer-social-link" aria-label="Facebook">' +
                            '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>' +
                        '</a>' +
                        '<a href="https://x.com/sgfcowork" target="_blank" rel="noopener" class="footer-social-link" aria-label="X (Twitter)">' +
                            '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.988l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>' +
                        '</a>' +
                        '<a href="https://github.com/GlobalWorkspaceHoldings" target="_blank" rel="noopener" class="footer-social-link" aria-label="GitHub">' +
                            '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>' +
                        '</a>' +
                    '</div>' +
                    'SGF.work IS NOT AFFILIATED WITH ANY OTHER SPRINGFIELD BUSINESSES <BR> \u00A9 2026 SGF.work \u2022 SPRINGFIELD, MO' +
                    '<div class="footer-logos-divider">' +
                        '<img src="/.netlify/images?url=/assets/images/logo.png&w=300" alt="SGF.work" width="124" height="28" style="height: 28px; width: auto;" loading="lazy">' +
                        '<hr class="footer-divider-line">' +
                        '<img src="/.netlify/images?url=/assets/images/gwh-logo.png&w=600" alt="Global Workspace Holdings, LLC" width="270" height="28" style="height: 28px; width: auto;" loading="lazy">' +
                    '</div>' +
                    '</div>' +
                '</footer>';
        } else if (variant === 'simple') {
            el.outerHTML =
                '<footer class="simple-footer">' +
                    '<div class="footer-logos-divider" style="margin-top: 16px;">' +
                        '<img src="/.netlify/images?url=/assets/images/logo.png&w=200" alt="SGF.work" width="89" height="20" style="height: 20px; width: auto;" loading="lazy">' +
                        '<hr class="footer-divider-line">' +
                        '<img src="/.netlify/images?url=/assets/images/gwh-logo.png&w=400" alt="Global Workspace Holdings, LLC" width="193" height="20" style="height: 20px; width: auto;" loading="lazy">' +
                    '</div>' +
                '</footer>';
        }
    }

    function initNavScroll() {
        var nav = document.querySelector('nav');
        if (!nav) return;
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    document.addEventListener('DOMContentLoaded', function () {
        renderAnnouncement();
        renderHeader();
        renderFooter();
        initNavScroll();
    });
})();
