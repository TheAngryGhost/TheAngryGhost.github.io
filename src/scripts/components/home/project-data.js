import { strong } from 'ellipsi';

export const projectData = [
    {
        title: 'PROTO Robotics Web IDE',
        label: 'Team Project',
        labelClass: 'badge bg-success',
        description:
            'A browser-based robotics programming IDE where students build Blockly programs, inspect generated code, and move toward text-based development.',
        stack: ['JavaScript', 'Blockly', 'CodeMirror', 'Jenga'],
        body: [
            'My work improved the bridge from block coding to text coding, including generated-code workflows, editor tooling, and custom Blockly rendering for student robotics projects.',
        ],
        buttonClass: 'btn btn-outline-primary stretched-link',
        href: 'src/pages/proto-robotics.html',
    },
    {
        title: 'Province of Music Engine',
        label: 'Solo Project',
        labelClass: 'badge bg-warning text-dark',
        description:
            'A custom audio engine that replaces simple generated playback with high-fidelity user sample packs, recording tools, and MIDI export workflows.',
        stack: ['Java', 'Mixins', 'Multi-threading', 'Audio Processing'],
        body: [
            'Designed from scratch to solve a specific user pain point. Reached ',
            strong('6.6k+ Modrinth downloads'),
            ' through launch content, search, community recommendations, and third-party modpacks.',
        ],
        buttonClass: 'btn btn-outline-warning stretched-link',
        href: 'src/pages/province-of-music.html',
    },
];
