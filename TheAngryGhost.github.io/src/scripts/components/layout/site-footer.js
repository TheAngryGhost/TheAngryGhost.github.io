import { div, footer, p } from 'ellipsi';

export class SiteFooter extends HTMLElement {
    /**
     * Renders the shared footer so every page keeps the same closing line and copyright.
     */
    connectedCallback() {
        this.replaceChildren(
            footer(
                div(
                    { class: 'container' },
                    p('\u00a9 2026 Casper Turek. Robotics, software, and odd little systems that grew legs.'),
                ),
            ),
        );
    }
}
