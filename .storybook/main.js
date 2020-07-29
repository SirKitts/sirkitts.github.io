module.exports = {
    stories: ['../src/**/*.stories.[tj]s'],
    addons: [
        '@storybook/addon-docs',
        '@storybook/addon-storysource',
        '@storybook/addon-actions',
        '@storybook/addon-knobs',
        //'@storybook/addon-controls',
        '@storybook/addon-a11y',
        '@storybook/addon-viewport',
        '@storybook/addon-links',
        '@storybook/addon-cssresources',
        '@storybook/preset-scss',
    ],
};