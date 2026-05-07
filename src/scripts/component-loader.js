import { SiteFooter } from './components/layout/site-footer';
import { SiteNav } from './components/layout/site-nav';
import { BinaryRainBackdrop } from './components/effects/binary-rain-backdrop';
import { BlueOrbitBackground } from './components/effects/blue-orbit-background';
import { SiteHero } from './components/hero/site-hero';
import { PortfolioHome } from './components/home/portfolio-home';

/**
 * Registers every custom element used by the static pages.
 */
export function defineSiteElements() {
    defineElement('blue-orbit-background', BlueOrbitBackground);
    defineElement('binary-rain-backdrop', BinaryRainBackdrop);
    defineElement('site-hero', SiteHero);
    defineElement('site-nav', SiteNav);
    defineElement('site-footer', SiteFooter);
    defineElement('portfolio-home', PortfolioHome);
}

/**
 * Defines a custom element once so repeated bundle execution does not throw.
 */
function defineElement(tagName, customElementClass) {
    if (!customElements.get(tagName)) {
        customElements.define(tagName, customElementClass);
    }
}
