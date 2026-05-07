import { a, button, div, li, span, tag, ul } from 'ellipsi';

const navigationItems = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
];

export class SiteNav extends HTMLElement {
    /**
     * Builds the responsive Bootstrap navbar and rewrites hash links correctly on project pages.
     */
    connectedCallback() {
        const basePath = this.getAttribute('base-path') || '';
        const homeHref = `${basePath}index.html`;
        const usesCurrentPageLinks = !basePath;

        this.replaceChildren(
            tag(
                'nav',
                { class: 'navbar navbar-expand-lg navbar-dark bg-transparent py-3' },
                div(
                    { class: 'container' },
                    a('Casper Turek', {
                        class: 'navbar-brand fw-bold',
                        href: usesCurrentPageLinks ? '#' : homeHref,
                    }),
                    button(
                        span({ class: 'navbar-toggler-icon' }),
                        {
                            class: 'navbar-toggler',
                            type: 'button',
                            'data-bs-toggle': 'collapse',
                            'data-bs-target': '#navbarNav',
                            'aria-controls': 'navbarNav',
                            'aria-expanded': 'false',
                            'aria-label': 'Toggle navigation',
                        },
                    ),
                    div(
                        { class: 'collapse navbar-collapse justify-content-end', id: 'navbarNav' },
                        ul(
                            { class: 'navbar-nav' },
                            navigationItems.map((navigationItem) =>
                                li(
                                    { class: 'nav-item' },
                                    a(navigationItem.label, {
                                        class: 'nav-link',
                                        href: usesCurrentPageLinks
                                            ? navigationItem.href
                                            : `${homeHref}${navigationItem.href}`,
                                    }),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        );
    }
}
