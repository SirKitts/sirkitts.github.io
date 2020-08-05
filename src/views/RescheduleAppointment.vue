<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Reschedule appointment" />

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input v-model="user.store.name" class="input-field" type="text" placeholder="Name" disabled>
      <button @click="$router.push(`/my-appointment/${appt._id}`)">My Appointment</button>
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
          <input type="radio" v-model="user.store.avatar" :checked="true" :value="index">
        </div>
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :checked="true" :value="index">
        </div>
      </div>
    </div>

    <FirstInFirstOut :appts="appts" @isfull="handleQueueFull" />

    <button type="submit" class="btn" @click="myAppointment" :hidden="isFull">Confirm Appointment</button>

    <Footer />
  </section>
</template>

<script>
import axios from 'axios';
import store from '@/assets/js/store'
import { api } from '@/helpers/Helpers'
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
  name: 'rescheduleappointment',
  components: {
    FirstInFirstOut,
    Header,
    Footer
  },
  data: () => ({
    currentId: '',
    datepicker: '',
    timepicker: '',
    consultant: '',
    avatars: AVATARS,
    consultants: CONSULTANTS,
    isFull: false,
    appt: '',
    appts: [],
    user: store,
    form: {
      name: '',
      email: '',
      subject: 'Rescheduled Appointment',
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
    checkStatus() {
      if (this.appt.status === '1' ) {
        this.$router.push(`/my-appointment/${this.appt._id}`);
      }
    },
    dbUpdateAppointment: async function(user) {
      await this.getCurrentList()
      this.appt.avatar = user.avatar
      this.appt.consultant = user.consultant
      this.appt.apptdate = user.apptdate
      this.appt.appttime = user.appttime
      this.appt.apptdatetime = user.apptdatetime
      this.appt.apptnumber = this.appts.length
      await api.updateuser(this.appt);
      await this.onSubmit()
      this.$router.push(`/my-appointment/${this.appt._id}`)
    },
    getCurrentList: async function() {
      this.appts = await api.getusersbyconsultantbydate(
        this.consultant,
        this.datepicker
      )
    },
    getConsultant (v) { return CONSULTANTS[v].name },
    logout () {
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    },
    handleQueueFull (full) {
      this.isFull = full
    },
    myAppointment: async function() {
      const [hour, minute] = ( new Date() ).toLocaleTimeString().slice(0,5).split(":")
      this.timepicker = hour + ':' + minute
      this.user.store.consultant = this.consultant
      this.user.store.apptdate = this.datepicker
      this.user.store.appttime = this.timepicker
      this.user.store.apptdatetime = [this.user.store.apptdate, this.user.store.appttime].join(" ")
      await this.dbUpdateAppointment(this.user.store)
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
  async mounted() {
    this.appt = await api.getuser(this.$route.params.id)
    if (!this.appt) {
      this.logout();
    }

    this.user.store.status = this.appt.status
    this.checkStatus()    
    this.datepicker = this.user.store.apptdate
    this.consultant = this.user.store.consultant
    await this.getCurrentList(); 
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
