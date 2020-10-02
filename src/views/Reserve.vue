<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Reservation" />

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
      <input v-model="datepicker" class="input-field" type="date">
      <input v-model="timepicker" class="input-field" type="time">
    </div>

    <div class="input-container">
      <i class="fa fa-users icon"></i>
      <input class="input-field"  placeholder="Number of People" type="number" readonly>
      <input class="input-field"  type="number" v-model="numpax" size=10 min="1" max="1000">
    </div>

    <div class="input-container" style="justify-content: center;">
      <span style="color: red; font-family: Arial, Helvetica, sans-serif;">{{ errorMessage }}</span>
    </div>

    <button type="submit" class="btn" @click.prevent="reserve" :disabled="isDisabled">Confirm Reservation</button>

    <Footer />

  </section>
</template>

<script>
import axios from 'axios';
import store from '@/assets/js/store'
import { api } from '@/helpers/api';
import { ShowDate, ShowTime } from '@/helpers/common';
import { AVATARS, RESERVATION_LINK, SENDMAIL_URL } from '@/helpers/constants';

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'reserve',
  components: {
    Header,
    Footer
  },
  data: () => ({
    avatar: '0',
    name: '',
    email: '',
    datepicker: new Date().toISOString().substr(0, 10),
    timepicker: '',
    numpax: 1,
    form: {
      name: '',
      email: '',
      subject: '',
      date: '',
      numpax: '',
      urllink: '',
    },
    avatars: AVATARS,
    appt: '',
    user: store,
    memory: [],
    hasErrors: true,
    errorMessage: '',
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
    }
  },
  methods: {
    async reserve () {
      this.appt = await api.getcustomersbynameandemail(this.name, this.email);
      if (this.appt.length) {
        const id = this.appt[0]._id
        this.$router.push(`/my-reservation/${id}`)
      } else {
        const users = await api.getcustomersbyemail(this.email);
        if (users.length) {
          this.errorMessage = 'email address already used'
        } else {
          // new reservation
          this.user.store.avatar = this.avatar
          this.user.store.name = this.name
          this.user.store.email = this.email
          this.user.store.apptdate  = this.datepicker
          this.user.store.appttime  = this.timepicker
          this.user.store.numpax  = this.numpax
          await this.dbCreateReservation(this.user.store)
        }
      }
    },
    dbCreateReservation: async function(user) {
      const res = await api.createcustomer(user)
      await this.sendEmail('Reservation Confirmation', res._id)
      this.$router.push(`/my-reservation/${res._id}`)
    },
    sendEmail: async function(msg, id) {
      this.form.name = this.user.store.name
      this.form.email = this.user.store.email
      this.form.subject = msg
      this.form.date = ShowDate(this.user.store.apptdate) + ' ' + ShowTime(this.user.store.appttime)
      this.form.numpax = this.user.store.numpax
      this.form.urllink = RESERVATION_LINK + id
      await axios.post(SENDMAIL_URL, JSON.stringify(this.form))
        .then(function () {})
        .catch(function () {})
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
    const [hours, minutes] = ( new Date() ).toLocaleTimeString().split(":")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.timepicker = (hours + ':' + minutes).substr(0, 5)
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
