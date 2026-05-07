import { a, div, h1, header, img, p, span, strong, tag } from 'ellipsi';
import { projectHeroData } from './project-hero-data';

export class SiteHero extends HTMLElement {
    /**
     * Chooses between the home hero and a project hero based on the element's variant attribute.
     */
    connectedCallback() {
        const heroVariant = this.getAttribute('variant') || 'home';

        this.replaceChildren(
            heroVariant === 'home'
                ? homeHero()
                : projectHero(projectHeroData[heroVariant]),
        );
    }
}

/**
 * Builds the index-page hero with the binary rain backdrop and primary profile calls to action.
 */
function homeHero() {
    return header(
        { class: 'hero-section' },
        tag('binary-rain-backdrop', { class: 'hero-binary-rain' }),
        div(
            { class: 'container hero-section-content' },
            div(
                { class: 'row align-items-center' },
                div(
                    { class: 'col-lg-8' },
                    h1(
                        'Building Robotics Software & Custom Audio Engines',
                        { class: 'display-4 fw-bold mb-3' },
                    ),
                    p(
                        'I am a Robotics Undergraduate specializing in full-stack web development and low-level systems. Currently contributing to the ',
                        strong('Proto Robotics'),
                        ' Web IDE and developing high-performance audio architectures.',
                        { class: 'lead mb-4' },
                    ),
                    div(
                        { class: 'd-flex gap-3' },
                        a('View My Work', { href: '#projects', class: 'btn btn-primary btn-lg' }),
                        a('GitHub', {
                            href: 'https://github.com/TheAngryGhost',
                            target: '_blank',
                            rel: 'noreferrer',
                            class: 'btn btn-outline-light btn-lg',
                        }),
                    ),
                ),
                div(
                    { class: 'col-lg-4 text-center d-none d-lg-block' },
                    div(
                        { class: 'profile-photo-frame position-relative d-inline-block' },
                        img({
                            src: 'assets/selfie.jpg',
                            alt: 'Casper Turek',
                            class: 'profile-photo',
                        }),
                    ),
                ),
            ),
        ),
    );
}

/**
 * Builds the shared project-page hero from the project metadata table.
 */
function projectHero(heroData) {
    if (!heroData) {
        return header({ class: 'project-detail-hero container' });
    }

    return header(
        { class: `project-detail-hero project-detail-hero-banner ${heroData.className}` },
        div(
            { class: 'container project-detail-hero-content' },
            a('Back to Projects', {
                href: '../../index.html#projects',
                class: 'btn btn-outline-light btn-sm mb-4',
            }),
            div(
                { class: 'row align-items-end g-4' },
                div(
                    { class: 'col-lg-8' },
                    div(
                        { class: heroData.headingClass },
                        img({
                            src: heroData.logoSrc,
                            alt: heroData.logoAlt,
                            class: heroData.logoClass,
                        }),
                        div(
                            { class: 'project-heading-text' },
                            span(heroData.label, { class: heroData.labelClass }),
                            h1(heroData.title, { class: 'display-5 fw-bold mb-0' }),
                        ),
                    ),
                    p(heroData.lead, { class: 'lead mb-0' }),
                ),
                div(
                    { class: 'col-lg-4' },
                    div(
                        { class: 'project-detail-panel' },
                        heroData.meta.map(([label, value], metaIndex) =>
                            p(
                                strong(`${label}:`),
                                ` ${value}`,
                                {
                                    class: `project-meta mb-${metaIndex === heroData.meta.length - 1 ? '0' : '2'}`,
                                },
                            ),
                        ),
                    ),
                ),
            ),
        ),
    );
}
