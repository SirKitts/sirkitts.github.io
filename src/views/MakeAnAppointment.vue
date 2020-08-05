<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Book an appointment" />

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input v-model="name" class="input-field" type="text" placeholder="Name" disabled>
      <button @click="logout">Disregard</button>
    </div>

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="datepicker" class="input-field" type="date">
    </div>
    
    <div class="input-container">
      <div class="input-container">
        <div style="padding-right: 8px;">Choose<br/>Avatar</div>
        <div v-for="(item, index) in avatars" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="avatar" :value="index">
        </div>
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :value="index">
        </div>
      </div>
    </div>

    <FirstInFirstOut :appts="appts" @isfull="handleQueueFull" />
    
    <button type="submit" class="btn" @click="confirmAppointment" :hidden="isFull">Confirm Appointment</button>

    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import store from '@/assets/js/store'
import { api } from '@/helpers/Helpers';
import { GetIcon, GetConsultant } from '@/helpers/common';
import { AVATARS, CONSULTANTS } from '@/helpers/constants';

const FirstInFirstOut = () => import(
  /* webpackChunkName: "firstinfirstout-component" */ '@/components/FirstInFirstOut.vue'
);

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'makeanappointment',
  components: {
    FirstInFirstOut,
    Header,
    Footer
  },
  data: () => ({
    avatar: '',
    name: '',
    consultant: '',
    datepicker: '',
    timepicker: '',
    avatars: AVATARS,
    consultants: CONSULTANTS,
    isFull: false,
    memory: [],
    appts: [],
    user: store,
    form: {
      name: '',
      email: '',
      subject: 'Your New Appointment',
      consultant: '',
      date: ''
    }
  }),
  watch: {
    consultant: async function() {
      await this.getCurrentList();
    },
    datepicker: async function() {
      await this.getCurrentList();
    }
  },
  methods: {
    confirmAppointment: async function() {
      this.user.store.apptnumber = this.appts.length.toString()
      const estimatedTime = new Date(new Date().getTime() + (this.user.store.apptnumber * 30 * 60 * 1000))
      const [hour, minute] = ( estimatedTime ).toLocaleTimeString().slice(0,5).split(":")
      this.timepicker = hour + ':' + minute 
      this.user.store.apptdate = this.datepicker
      this.user.store.appttime = this.timepicker
      this.user.store.apptdatetime = [this.user.store.apptdate, this.user.store.appttime].join(" ")
      this.user.store.status = '0'
      await this.dbCreateAppointment(this.user.store)
    },
    dbCreateAppointment: async function(user) {
      const res = await api.createuser(user)
      await this.onSubmit()
      this.$router.push(`/my-appointment/${res._id}`)
    },
    getCurrentList: async function() {
      this.appts = await api.getusersbyconsultantbydate(
        this.consultant,
        this.datepicker
      )
    },
    getConsultant (v) { return GetConsultant(v) },
    getIcon (v) { return GetIcon(v) },
    handleQueueFull (full) {
      this.isFull = full
    },
    logout() {
      window.localStorage.removeItem('user')
      this.$router.push('/login');
    },
    onSubmit: async function() {
      this.form.name = this.user.store.name
      this.form.email = this.user.store.email
      this.form.consultant = this.getConsultant (this.user.store.consultant)
      this.form.date = this.user.store.apptdate 
      await axios.post('http://hexsoftstudio.com/php/sendMail.php', JSON.stringify(this.form))
        .then(function () {})
        .catch(function () {})
    }
  },
  async mounted () {
    this.memory = JSON.parse(window.localStorage.getItem('user'))
    if (this.memory) {
      this.user.store.name = this.memory[0].user.name
      this.user.store.email = this.memory[0].user.email

      const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
      this.name = this.user.store.name
      this.datepicker = this.user.store.apptdate || (year + '-' + month + '-' + day).substr(0, 10)
      this.avatar = this.user.store.avatar
      this.consultant = this.user.store.consultant
      await this.getCurrentList();
    } else {
      this.logout()
    }
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
