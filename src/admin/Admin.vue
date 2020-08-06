<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Admin" />

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="datepicker" class="input-field" type="date" id="date" name="apptdate">
      <button @click="$router.push(`/admin`)">Logout</button>
    </div>
    
    <div class="input-container">
      <div class="input-container">
        <button type="submit" @click="refresh"><i class="fa fa-refresh"></i></button>
        <button type="submit" @click="updateEstimatedTime"><i class="fa fa-clock-o"></i> Readjust Time</button>
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :value="index">
        </div>
      </div>
    </div>

    <ShowAll :appts="appts" :consultant="consultant" 
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
  watch: {
    datepicker: function() {
      this.getApptsByConsultantByDate()
    },
    consultant: function() {
      this.getApptsByConsultantByDate()
    }
  },
  data: () => ({
    datepicker: '',
    consultant: '',
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
    }
  }),
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
    refresh() {
      location.reload()
    },
    reNumber: async function() {
      await this.getApptsByConsultantByDate()
      this.appts.map(function (appt, idx) {
        appt.apptnumber = idx.toString()
        return appt
      }).map(newuser => {
        api.updateuser(newuser);
      });
    },
    sendMail: async function(msg, user) {
      this.form.name = user.name
      this.form.email = user.email
      this.form.subject = msg
      this.form.date = user.apptdatetime 
      this.form.consultant = this.getConsultant (user.consultant)
      await axios.post(SENDMAIL_URL, JSON.stringify(this.form))
        .then(function () {})
        .catch(function () {})
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
        api.updateuser(newuser);
      });
    }
  },
  async mounted () {
    /*
    if (this.password.store.name !== this.admin.store.name &&
      this.password.store.pass !== this.admin.store.pass) {
        this.$router.push(`/admin`)
    }
    */
    
    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.consultant = '0'
    await this.reNumber()
    this.poll = setInterval(this.reNumber, POLLING_TIME)
  },
  beforeDestroy () {
    clearInterval(this.poll);
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
