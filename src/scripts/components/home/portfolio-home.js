import { a, div, h2, h3, li, main, p, section, span, strong, tag, ul } from 'ellipsi';
import { projectData } from './project-data';

export class PortfolioHome extends HTMLElement {
    /**
     * Renders the home page body sections and wires up same-page navigation.
     */
    connectedCallback() {
        this.replaceChildren(
            main(projectsSection(), aboutSection(), contactSection()),
        );

        enableSmoothScrolling(this);
    }
}

/**
 * Builds the featured project card grid shown on the index page.
 */
function projectsSection() {
    return section(
        { id: 'projects', class: 'container py-5' },
        h2('Featured Projects', { class: 'mb-5 fw-bold' }),
        div(
            { class: 'row g-4' },
            projectData.map((featuredProject) =>
                div({ class: 'col-md-6' }, projectCard(featuredProject)),
            ),
        ),
    );
}

/**
 * Builds one featured project card from the project data object.
 */
function projectCard(featuredProject) {
    return div(
        { class: 'card project-card p-4' },
        div(
            { class: 'd-flex justify-content-between align-items-start mb-3' },
            h3(featuredProject.title, { class: 'h4 mb-0' }),
            span(featuredProject.label, { class: featuredProject.labelClass }),
        ),
        p(featuredProject.description, { class: 'text-muted' }),
        p(
            strong('Stack:'),
            ' ',
            featuredProject.stack.map((stackItem, stackIndex) =>
                stackIndex === featuredProject.stack.length - 1 ? stackItem : `${stackItem}, `,
            ),
            { class: 'small text-info mb-3' },
        ),
        p(featuredProject.body, { class: 'mb-4' }),
        a('View Project', { href: featuredProject.href, class: featuredProject.buttonClass }),
    );
}

/**
 * Builds the technical skills and short bio section.
 */
function aboutSection() {
    return section(
        { id: 'about', class: 'container py-5' },
        div(
            { class: 'row g-5' },
            div(
                { class: 'col-lg-6' },
                h2('What I Build With', { class: 'fw-bold mb-4' }),
                skillGroup('Languages', [
                    'Java',
                    'JavaScript',
                    'Python',
                    'SQL',
                    'HTML/CSS',
                ]),
                skillGroup('Tools & Frameworks', [
                    'Blockly',
                    'CodeMirror',
                    'Bootstrap',
                    'Ellipsi',
                    'Git / GitHub',
                    'Webpack',
                    'Minecraft mixins',
                ]),
                skillGroup('Technical Themes', [
                    'Code generation',
                    'Data-driven architecture',
                    'Robotics programming workflows',
                    'Audio tooling',
                    'Unfamiliar codebases',
                ]),
            ),
            div(
                { class: 'col-lg-6' },
                h2('About', { class: 'fw-bold mb-4' }),
                p(
                    'I am a Robotics Engineering student at the University of Nebraska-Lincoln who likes building tools with real users and enough internal structure to keep growing. My work so far has centered on robotics programming interfaces, generated code, editor behavior, and custom audio systems.',
                    { class: 'text-muted' },
                ),
                p(
                    'The projects below show the pattern better than a slogan can: at ',
                    strong('PROTO Robotics'),
                    ' I work inside a team codebase on the browser IDE students use to program robots; in ',
                    tag('em', 'Province of Music'),
                    ' I took a solo Java audio project from an idea to a documented release with thousands of downloads.',
                    { class: 'text-muted' },
                ),
                div(
                    { class: 'project-detail-panel mt-4' },
                    h3('Signals in the Work', { class: 'h5 fw-bold mb-3' }),
                    ul(
                        { class: 'text-muted mb-0' },
                        li('Production JavaScript contributions in a robotics education IDE.'),
                        li('A JSON-driven block generator that reduces duplicated Blockly/editor configuration.'),
                        li('A released Java audio tool with sample-pack management, recording, and MIDI export workflows.'),
                        li('Open-source project pages and repositories linked from each case study.'),
                    ),
                ),
            ),
        ),
    );
}

/**
 * Builds a titled group of skill tags.
 */
function skillGroup(title, skills) {
    return div(
        { class: 'mb-4' },
        tag('h5', title, { class: 'text-white' }),
        div(
            { class: 'd-flex flex-wrap gap-2' },
            skills.map((skillName) => span(skillName, { class: 'tech-tag' })),
        ),
    );
}

/**
 * Builds the contact section with external profile links.
 */
function contactSection() {
    return section(
        { id: 'contact', class: 'container py-5 text-center' },
        h2('Get in Touch', { class: 'fw-bold mb-4' }),
        p('I am always glad to talk about robotics software, creative tools, and strange useful systems.', {
            class: 'lead text-muted mb-4',
        }),
        div(
            { class: 'd-flex justify-content-center gap-4 mb-3' },
            div(
                { class: 'd-flex flex-column align-items-center gap-2' },
                a('Email Me', {
                    href: 'mailto:casperturek37@gmail.com',
                    class: 'btn btn-primary btn-lg',
                }),
                a('casperturek37@gmail.com', {
                    href: 'mailto:casperturek37@gmail.com',
                    class: 'text-info',
                }),
            ),
            a('GitHub', {
                href: 'https://www.github.com/TheAngryGhost',
                target: '_blank',
                rel: 'noreferrer',
                class: 'btn btn-outline-light btn-lg',
            }),
            a('LinkedIn', {
                href: 'https://www.linkedin.com/in/casper-turek-b4791a3a6/',
                target: '_blank',
                rel: 'noreferrer',
                class: 'btn btn-outline-light btn-lg',
            }),
        ),
    );
}

/**
 * Makes local hash links animate to their targets instead of jumping instantly.
 */
function enableSmoothScrolling(root) {
    root.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetSelector = anchor.getAttribute('href');

            if (!targetSelector || targetSelector.length === 1) {
                return;
            }

            const scrollTarget = document.querySelector(targetSelector);

            if (!scrollTarget) {
                return;
            }

            event.preventDefault();

            scrollTarget.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
}
