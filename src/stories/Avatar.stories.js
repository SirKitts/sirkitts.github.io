//import Vuex from 'vuex';
import { action } from '@storybook/addon-actions';
import {
    withKnobs,
    text,
    number,
    boolean,
    array,
    select,
    color,
    date,
    button,
    object,
} from '@storybook/addon-knobs';

import Avatar from '../components/common/Avatar.vue';

const srcAvatar = 'https://www.w3schools.com/w3images/avatar2.png'
const sampleAvatar = 'male1'

export default {
    title: 'Component/Avatar',
    component: Avatar,
    decorators: [withKnobs],
};

export const Default = () => ({
    components: { Avatar },
    template: '<Avatar />',
    argTypes: {
        color: { control: { type: 'color' } },
    },
});

export const WithShadow = () => ({
    components: { Avatar },
    props: {
        shadow: {
            default: boolean('With Shadow', true)
        }
    },
    template: `<Avatar :shadow="shadow" />`
});

export const SampleAvatar = () => ({
    components: { Avatar },
    props: {
        sample: {
            default: text('Sample Avatar', sampleAvatar)
        }
    },
    template: `<Avatar :sample="sample" />`
});

export const OnClick = () => ({
    components: { Avatar },
    props: {
        shadow: {
            default: boolean('Shadow', false)
        },
    },
    template: `<Avatar :shadow="shadow" @click="btnClicked" />`,
    methods: {
      btnClicked: action('clicked'),
    }
});

export const IconSource = () => ({
    components: { Avatar },
    props: {
        src: {
            default: text('Source', srcAvatar)
        },
        shadow: {
            default: boolean('Shadow', false)
        },
    },
    template: `
      <Avatar 
        :src="src"
        :shadow="shadow" 
        @click="btnClicked"
        />
    `,
    methods: {
      btnClicked: action('clicked'),
    }
  });

  