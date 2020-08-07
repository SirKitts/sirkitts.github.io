<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Book an appointment" />

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

    <div class="input-container">
      <i class="fa fa-clock-o icon"></i>
      &nbsp;
      <div class="current-date">{{ currentDate }}</div>
    </div>

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input class="input-field" type="text" disabled>
      <button type="submit" @click.prevent="newAppointment" :disabled="isDisabled">New Appointment</button>
      <button type="submit" @click.prevent="myAppointment" :disabled="isDisabled">My Appointment</button>
    </div>

    <div class="input-container" style="justify-content: center;">
      <span style="color: red; font-family: Arial, Helvetica, sans-serif;">{{ errorMessage }}</span>
    </div>

    <Footer />

  </section>
</template>

<script>
import store from '@/assets/js/store'
import { api } from '@/helpers/Helpers';
import { LOGO } from '@/helpers/constants';

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
    name: '',
    email: '',
    pass: '',
    datepicker: new Date().toISOString().substr(0, 10),
    appt: '',
    user: store,
    memory: [],
    hasErrors: true,
    errorMessage: '',
    msg: [],
    logo: LOGO,
    currentDate: (new Date()).toString().substr(0, 24)
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
    }
  },
  methods: {
    async myAppointment () {
      this.appt = await api.getusernamebynameandemail(this.name, this.email);
      if (this.appt.length) {
        const id = this.appt[0]._id
        this.$router.push(`/my-appointment/${id}`)
      } else {
        this.errorMessage = 'not found! please select New Appointment.'
      }
    },
    async newAppointment () {
      this.appt = await api.getusernamebynameandemail(this.name, this.email);
      if (this.appt.length) {
        this.errorMessage = 'already exist! please select My Appointment'
      } else {
        this.user.store.name = this.name
        this.user.store.email = this.email
        this.saveInMemory()
        this.$router.push(`/make-an-appointment`)
      }
    },
    saveInMemory () {
      var d = new Date()
      this.memory.push({
        date: d.toUTCString(), 
        user: this.user.store
      })
      const data = JSON.stringify(this.memory)
      window.localStorage.setItem('user', data);
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
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
