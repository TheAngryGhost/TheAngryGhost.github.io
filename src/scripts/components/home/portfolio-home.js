import { a, div, h2, h3, main, p, section, span, strong, tag } from 'ellipsi';
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
            { class: 'row' },
            div(
                { class: 'col-lg-6' },
                h2('Technical Skills', { class: 'fw-bold mb-4' }),
                skillGroup('Languages', [
                    'JavaScript (ES6+)',
                    'Java',
                    'Python',
                    'C',
                    'SQL',
                    'HTML5/CSS3',
                ]),
                skillGroup('Tools & Frameworks', [
                    'Bootstrap 5',
                    'Ellipsi (Custom GUI)',
                    'Git / GitHub',
                    'Webpack',
                    'Minecraft Modding (Mixins)',
                ]),
            ),
            div(
                { class: 'col-lg-6' },
                h2('About Me', { class: 'fw-bold mb-4' }),
                p(
                    'I am a freshman Robotics major with a passion for bridging the gap between hardware logic and software creativity. My journey began with independent projects like ',
                    tag('em', 'Province of Music'),
                    ', where I learned to architect complex systems alone. Today, I apply those skills collaboratively at ',
                    strong('PROTO Robotics'),
                    ', helping to build the next generation of STEM education tools.',
                    { class: 'text-muted' },
                ),
                p(
                    'I am currently looking for internships in Computer Science, Robotics, or Software Engineering where I can contribute to large-scale systems and continue learning.',
                    { class: 'text-muted' },
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
        h2("Let's Connect", { class: 'fw-bold mb-4' }),
        p('Interested in my work or want to discuss robotics and software?', {
            class: 'lead text-muted mb-4',
        }),
        div(
            { class: 'd-flex justify-content-center gap-4' },
            a('Email Me', {
                href: 'mailto:casperturek37@gmail.com',
                class: 'btn btn-primary btn-lg',
            }),
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
