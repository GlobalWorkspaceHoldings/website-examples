/**
 * Global Header & Footer Components
 *
 * Usage:
 *   Header: <div id="site-header" data-variant="home|subpage" data-back-text="Home"></div>
 *   Footer: <div id="site-footer" data-variant="full|simple"></div>
 *
 * Header variants:
 *   "home"    – Logo + Founding Phase badge (default)
 *   "main"    – Logo + nav links (Principles · Glossary · Examples)
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
        banner.textContent = 'New: explore the Five Principles of beautiful web design \u2014 typography, color, layout, whitespace, and motion \u2192';

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
        } else if (variant === 'main') {
            rightContent = '<div class="nav-right nav-links"><a href="/principles.html" class="back-link">Principles</a><a href="/glossary.html" class="back-link">Glossary</a><a href="/examples/" class="back-link">Examples</a></div>';
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
                            '<img src="/assets/images/logo.png" alt="Beautiful Web Design" width="178" height="40" style="height: 40px; width: auto; display: block; margin: 0 0 20px 0;" loading="lazy">' +
                            '<p class="footer-seo-text">' +
                                'A field guide to the craft of <strong>beautiful web design</strong> \u2014 covering typography, color, layout, whitespace, and motion.' +
                            '</p>' +
                        '</div>' +
                        '<div>' +
                            '<span class="footer-header">Explore</span>' +
                            '<ul class="footer-contact">' +
                                '<li><a href="/principles.html">Five Principles</a></li>' +
                                '<li><a href="/glossary.html">Design Glossary</a></li>' +
                                '<li><a href="/examples/">UI Examples</a></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +
                    '<div class="footer-bottom">' +
                    '\u00A9 2026 Beautiful Web Design' +
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
