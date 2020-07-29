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

import Button from '../components/common/Button.vue';

const btnText = 'Save'

const btnConfig = {
  "blue": true
}

const btnStyle = {
  "width": "auto"
}

export default {
  title: 'Component/Button',
  component: Button,
  decorators: [withKnobs],
};

export const Default = () => ({
  components: { Button },
  template: '<Button />'
});

export const ChangeText = () => ({
  components: { Button },
  props: {
    btnText: {
      default: text('Text', btnText)
    }
  },
  template: `<Button>{{ btnText }}</Button>`
});

export const ButtonDisabled = () => ({
  components: { Button },
  props: {
    btnDisabled: {
      default: boolean('Button Disabled', true)
    }
  },
  template: `<Button :btnDisabled="btnDisabled">Test</Button>`
});

export const OnClick = () => ({
  components: { Button },
  template: `<Button @click="btnClicked">Click Me</Button>`,
  methods: {
    btnClicked: action('clicked'),
  }
});

export const CustomClass = () => ({
  components: { Button },
  props: {
    customClass: {
      default: object('customClass', btnConfig) 
    }
  },
  template: `<Button :customClass="customClass">Custom Class</Button>`
});

export const CustomStyle = () => ({
  components: { Button },
  props: {
    customStyle: {
      default: object('customStyle', btnStyle) 
    }
  },
  template: `<Button :customStyle="customStyle">Custom Style</Button>`
});

export const Full = () => ({
  components: { Button },
  props: {
    btnText: {
      default: text('Text', btnText)
    },
    btnDisabled: {
      default: boolean('Button Disabled', false)
    },
    customClass: {
      default: object('customClass', btnConfig) 
    },
    customStyle: {
      default: object('customStyle', btnStyle) 
    }
  },
  template: `
    <Button 
      :customClass="customClass" 
      :customStyle="customStyle" 
      @click="btnClicked"
      :btnDisabled="btnDisabled">
        {{ btnText }}
    </Button>
  `,

  methods: {
    btnClicked: action('clicked'),
  }
});

