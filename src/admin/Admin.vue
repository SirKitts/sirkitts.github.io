<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Admin: Reservations" />

    <div class="input-container">
      <i class="fa fa-clock-o icon"></i>
      <div class="current-date">{{ showDate(datepicker) }}</div>
    </div>

    <div class="input-container">
      <i class="fa fa-clock-o  icon"></i>
      <input v-model="datepicker" class="input-field" type="date">
      <button type="submit" @click="refresh"><i class="fa fa-refresh"></i></button>
    </div>

    <ShowAll :appts="appts" :apptDate="datepicker" @ended="ended" @cancelled="cancelled" />

    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import { api } from '@/helpers/api'
import { ShowDate, ShowTime } from '@/helpers/common';
import { SENDMAIL_URL } from '@/helpers/constants';

const ShowAll = () => import(
  /* webpackChunkName: "showall-component" */ '@/admin/ShowAll.vue'
);

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'admin',
  components: {
    ShowAll,
    Header,
    Footer
  },
  data: () => ({
    datepicker: '',
    appts: [],
    form: {
      name: '',
      email: '',
      subject: '',
      date: '',
      numpax: '',
      urllink: '',
    }
  }),
  watch: {
    datepicker: function() {
      this.getApptsByCustomersByDate()
    }
  },
  methods: {
    cancelled: async function(data) {
      await this.sendMail('Cancelled Reservation', data)
      this.refresh()
    },
    ended: async function(data) {
      await this.sendMail('Thank you', data)
      this.refresh()
    },
    refresh() {
      location.reload()
    },
    getApptsByCustomersByDate: async function() {
      this.appts = await api.getcustomersbydate(
        this.datepicker
      )
    },
    sendMail: async function(msg, user) {
      this.form.name = user.name
      this.form.email = user.email
      this.form.subject = msg
      this.form.date = ShowDate(user.apptdate) + ' ' + ShowTime(user.appttime)
      this.form.numpax = user.numpax
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
  mounted () {
    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.getApptsByCustomersByDate()
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
