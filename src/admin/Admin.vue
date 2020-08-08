<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Admin" />

    <div class="input-container">
      <i class="fa fa-clock-o icon"></i>
      <div class="current-date">{{ showDate(datepicker) }}</div>
    </div>

    <div class="input-container">
      <i class="fa fa-clock-o  icon"></i>
      <input v-model="datepicker" class="input-field" type="date">
      <button @click="$router.push(`/admin`)">Logout</button>
    </div>
    
    <div class="input-container">
      <div class="input-container">
        <button type="submit" @click="refresh"><i class="fa fa-refresh"></i></button>
        <button type="submit" @click="updateEstimatedTime"><i class="fa fa-clock-o"></i> Readjust Time</button>
        <button type="submit" @click="$router.push('/admin/email-notification')"><i class="fa fa-envelope"></i></button>
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :value="index">
        </div>
      </div>
    </div>

    <ShowAll :appts="appts" :consultant="consultant" :isToday="isToday" :apptDate="datepicker"
      @started="updateEstimatedTime"
      @ended="ended"
      @cancelled="cancelled" />

    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import store from '@/admin/js/store'
import pass from '@/admin/js/pass'
import { api } from '@/helpers/Helpers'
import { GetConsultant } from '@/helpers/common';
import { CONSULTANTS, POLLING_TIME, SENDMAIL_URL } from '@/helpers/constants';

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
    consultant: '0',
    consultants: CONSULTANTS,
    appts: [],
    poll: '',
    admin: store,
    password: pass,
    form: {
      name: '',
      email: '',
      subject: '',
      date: '',
      consultant: ''
    },
    hasAccess: false,
    dateToday: '',
    isToday: true,
  }),
  watch: {
    datepicker: function() {
      this.isToday = (this.dateToday === this.datepicker)
      this.getApptsByConsultantByDate()
    },
    consultant: function() {
      this.getApptsByConsultantByDate()
    }
  },
  methods: {
    cancelled: async function(data) {
      await this.sendMail('Cancelled Appointment', data)
      await this.updateEstimatedTime()
    },
    ended: async function(data) {
      await this.sendMail('Appointment Done', data)
      await this.updateEstimatedTime()
    },
    getApptsByConsultantByDate: async function() {
      this.appts = await api.getusersbyconsultantbydate(
          this.consultant,
          this.datepicker
      )
    },
    getConsultant (v) { return GetConsultant(v) },
    logout() {
      window.localStorage.removeItem('login')
      this.$router.push('/admin')
    },
    refresh() {
      location.reload()
    },
    reNumber: async function() {
      await this.getApptsByConsultantByDate()
      this.appts.map(function (appt, idx) {
        appt.apptnumber = idx.toString()
        return appt
      }).map(newuser => {
        api.updateuser(newuser)
      });
    },
    sendMail: async function(msg, user) {
      this.form.name = user.name
      this.form.email = user.email
      this.form.subject = msg
      this.form.date = user.apptdatetime 
      this.form.consultant = this.getConsultant(user.consultant)
      await axios.post(SENDMAIL_URL, JSON.stringify(this.form))
        .then(function () {})
        .catch(function () {})
    },
    showDate(d) {
      return (new Date(new Date(d)).toString().substr(0, 15))
    },
    updateEstimatedTime: async function() {
      await this.getApptsByConsultantByDate()
      this.appts.map(function (appt, idx) {
        const estimatedTime = new Date(new Date().getTime() + (idx * 30 * 60 * 1000))
        const [day, month, year] = ( estimatedTime ).toLocaleDateString().slice(0,10).split("/")
        const [hour, minute] = ( estimatedTime ).toLocaleTimeString().slice(0,5).split(":")
        appt.apptdate = year + '-' + month + '-' + day 
        appt.appttime = hour + ':' + minute 
        appt.apptdatetime = [appt.apptdate, appt.appttime].join(" ")
        appt.apptnumber = idx.toString()
        return appt
      }).map(newuser => {
        api.updateuser(newuser)
      });
    }
  },
  async mounted () {
    this.memory = JSON.parse(window.localStorage.getItem('login'))
    if (this.memory) {
      this.admin.store.name = this.memory[0].login.name
      this.admin.store.pass = this.memory[0].login.pass
      this.hasAccess = (this.password.store.name === this.admin.store.name && 
        this.password.store.pass === this.admin.store.pass) ? true : false
    } 

    if (!this.hasAccess) { this.logout() }

    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.consultant = '0'
    this.dateToday = this.datepicker
    this.isToday = (this.dateToday === this.datepicker)
    await this.reNumber()
    this.poll = setInterval(this.reNumber, POLLING_TIME)
  },
  beforeDestroy () {
    clearInterval(this.poll);
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
