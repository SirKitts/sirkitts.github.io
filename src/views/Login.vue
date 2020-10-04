<template>
  <section style="max-width:500px;margin:auto">
    <Header title="My Reservation" />

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input v-model="name" class="input-field" type="text" placeholder="Name">
      <span v-if="msg.name" style="color: red; padding: 5px 5px;">&#x274C;</span>
    </div>

    <div class="input-container">
      <i class="fa fa-envelope icon"></i>
      <input v-model="email" class="input-field" type="text" placeholder="Email">
      <span v-if="msg.email" style="color: red; padding: 5px 5px;">&#x274C;</span>
    </div>

    <button type="submit" class="btn" @click.prevent="ShowMyReservation" :disabled="isDisabled">Show My Reservation</button>

    <Footer />

  </section>
</template>

<script>
import store from '@/assets/js/store'
import { api } from '@/helpers/api';
import { AVATARS } from '@/helpers/constants';

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'login',
  components: {
    Header,
    Footer
  },
  data: () => ({
    avatar: '0',
    name: '',
    email: '',
    mobile: '',
    datepicker: new Date().toISOString().substr(0, 10),
    timepicker: '',
    numpax: 1,
    avatars: AVATARS,
    appt: '',
    user: store,
    memory: [],
    hasErrors: true,
    errorMessage: '',
    message: '',
    msg: []
  }),
  computed: {
    isDisabled: function(){
      return (this.hasErrors || !this.name)
    }
  },
  watch: {
    name (value) {
      this.errorMessage = ''
      this.name = value;
      this.validateName (value);
    },
    email (value) {
      this.errorMessage = ''
      this.email = value;
      this.validateEmail (value);
    },
    mobile (value) {
      this.errorMessage = ''
      this.mobile = value;
      this.validateMobile (value);
    }
  },
  methods: {
    async ShowMyReservation () {
      this.appt = await api.getcustomersbynameandemail(this.name, this.email);
      if (this.appt.length) {
        const id = this.appt[0]._id
        this.$router.push(`/my-reservation/${id}`)
      } else {
        this.$router.push('/make-reservation')
      }
    },
    validateEmail(value){
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(value) ) {
        this.msg['email'] = ''
        this.hasErrors = false
      } else {
        this.msg['email'] = 'invalid email address'
        this.hasErrors = true
      }
    },
    validateMobile(value){
      if (value) {
        this.msg['mobile'] = ''
      } else {
        this.msg['mobile'] = 'phone should not be blank';
      }
    },
    validateName(value){
      if (value) {
        this.msg['name'] = ''
      } else {
        this.msg['name'] = 'name should not be blank';
      }
    }
  },
  mounted () {
    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    const [hours, minutes] = ( new Date() ).toLocaleTimeString().split(":")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.timepicker = (hours + ':' + minutes).substr(0, 5)
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
