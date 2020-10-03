<template>
  <section style="max-width:500px;margin:auto">
    <Header title="My Reservation" />

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <div class="field">{{ showDate(user.store.apptdate) }}</div>
      <div class="field">{{ showTime(user.store.appttime) }}</div>
    </div>

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <div class="field">Guest name</div>
      <div class="field">{{ user.store.name }}</div>
    </div>

    <div class="input-container">
      <i class="fa fa-users icon"></i>
      <div class="field">Number of people/guests:</div>
      <div class="field">{{ user.store.numpax }}</div>
    </div>

    <div class="input-container">
      <button type="submit" class="btncancel" @click="cancelAppt">Cancel Reservation</button>
    </div>

    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import store from '@/assets/js/store'
import { api } from '@/helpers/api'
import { GetIcon, ShowDate, ShowTime } from '@/helpers/common';
import { AVATARS, SENDMAIL_URL } from '@/helpers/constants';

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'myreservation',
  components: {
    Header,
    Footer
  },
  data: () => ({
    avatars: AVATARS,
    appt: '',
    appts: [],
    user: store,
    form: {
      name: '',
      email: '',
      subject: '',
      date: '',
      numpax: '',
      urllink: '',
    }
  }),
  methods: {
    cancelAppt: async function() {
      const id = this.$route.params.id
      const sure = window.confirm('Are you sure to cancel this reservation?');
      if (!sure) return;
      await api.deletecustomer(id)
      await this.sendMail('Cancelled Reservation')
      this.$router.push('/')
    },
    getUserIcon (v) { return GetIcon(v) },
    sendMail: async function(msg) {
      this.form.name = this.user.store.name
      this.form.email = this.user.store.email
      this.form.subject = msg
      this.form.date = ShowDate(this.user.store.apptdate) + ' ' + ShowTime(this.user.store.appttime)
      this.form.numpax = this.user.store.numpax
      this.form.urllink = ''
      await axios.post(SENDMAIL_URL, JSON.stringify(this.form))
        .then(function () {})
        .catch(function () {})
    },
    showDate(d) {
      return ShowDate(d)
    },
    showTime(t) {
      return ShowTime(t)
    }
  },
  async mounted() {
    this.appt = await api.getcustomer(this.$route.params.id)
    if (this.appt) {
      this.user.store.avatar = this.appt.avatar
      this.user.store.name = this.appt.name
      this.user.store.email = this.appt.email
      this.user.store.mobile = this.appt.mobile
      this.user.store.apptdate = this.appt.apptdate
      this.user.store.appttime = this.appt.appttime
      this.user.store.numpax = this.appt.numpax
    }
  }
}
</script>

<style src="@/assets/css/style.css" scoped>
</style>
