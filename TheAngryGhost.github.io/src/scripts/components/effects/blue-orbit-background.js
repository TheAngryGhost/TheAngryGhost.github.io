import { div, span } from 'ellipsi';

export class BlueOrbitBackground extends HTMLElement {
    /**
     * Renders the layered ambient orbit spans used by the shared page background.
     */
    connectedCallback() {
        this.setAttribute('aria-hidden', 'true');
        this.replaceChildren(
            div(
                { class: 'blue-orbit-background' },
                Array.from({ length: 7 }, (_, orbitIndex) =>
                    span({ class: `blue-orbit orb-${orbitIndex + 1}` }),
                ),
            ),
        );
    }
}
