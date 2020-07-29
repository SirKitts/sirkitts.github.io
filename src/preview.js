import { configure } from '@storybook/vue';

import Vue from 'vue';
import VueRouter from 'vue-router'

// Import your global css
// import './components/common/_css/style.scss';

// Import your global components.
// import MyButton from './components/MyButton.vue';

// Install Vue plugins.
Vue.use(VueRouter)

// Register global components.
// Vue.component('my-button', MyButton);

configure(require.context('../src', true, /\.stories\.js$/), module);
