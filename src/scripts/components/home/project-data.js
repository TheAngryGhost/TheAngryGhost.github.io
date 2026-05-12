import { strong } from 'ellipsi';

export const projectData = [
    {
        title: 'PROTO Robotics Web IDE',
        label: 'Team Project',
        labelClass: 'badge bg-success',
        description:
            'A production browser IDE for classroom robotics, with Blockly workflows, generated code, CodeMirror editing, and project save/load behavior.',
        stack: ['JavaScript', 'Blockly', 'CodeMirror', 'Jenga'],
        body: [
            'Contributed editor UX, syntax feedback, autocomplete, Blockly integration, and a JSON-driven block generator that keeps block definitions, toolbox data, code output, and editor metadata closer together.',
        ],
        buttonClass: 'btn btn-outline-primary stretched-link',
        href: 'src/pages/proto-robotics.html',
    },
    {
        title: 'Province of Music Engine',
        label: 'Solo Project',
        labelClass: 'badge bg-warning text-dark',
        description:
            'A released custom audio engine for user-managed sample packs, recording tools, MIDI export, and higher-fidelity generated playback.',
        stack: ['Java', 'Mixins', 'Multi-threading', 'Audio Processing'],
        body: [
            'Designed, documented, released, and maintained as open-source software. Reached ',
            strong('6.6k+ Modrinth downloads'),
            ' through launch content, search, community recommendations, and third-party modpacks.',
        ],
        buttonClass: 'btn btn-outline-warning stretched-link',
        href: 'src/pages/province-of-music.html',
    },
];
