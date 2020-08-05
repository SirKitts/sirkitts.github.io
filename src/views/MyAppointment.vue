<template>
  <section style="max-width:500px;margin:auto">
    <Header title="My appointment" />

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input v-model="user.store.name" class="input-field" type="text" placeholder="Name" disabled>
      <!--button v-if="user.store.status === '0'" @click="$router.push(`/reschedule-appointment/${appt._id}`)">Reschedule Appointment</button-->
      <button v-if="user.store.status === '0'" @click="cancelAppt">Cancel Appointment</button>
    </div>

    <div v-if="user.store.status === '1'" class="input-container">
      <i class="fa fa-info icon"></i>
      <input class="input-field" type="text" placeholder="You're currently in progress. Click Done when finished." disabled>
      <button @click="done">Done</button>
    </div>

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="user.store.apptdate" class="input-field" type="date" disabled>
    </div>

    <center>
      <p><img class="img-round" :src="getUserIcon(user.store.avatar)" width="50%" height="50%"/></p>
      <Notification :badge="getPosition()" />
      <p>Consultant Name: {{ getConsultant (user.store.consultant) }}</p>
      <EstimatedTime 
         v-if="user.store.status === '0'"
        :apptdatetime="user.store.apptdatetime" :status="user.store.status"/>
    </center>

    <button type="submit" class="btn" @click="logout">Logout</button>

    <Footer />
  </section>
</template>

<script>
import store from '@/assets/js/store'
import { api } from '@/helpers/Helpers'
import { GetIcon, GetConsultant, GetOrdinal } from '@/helpers/common';
import { AVATARS, CONSULTANTS, POLLING_TIME } from '@/helpers/constants';

const EstimatedTime = () => import(
  /* webpackChunkName: "estimatedtime-component" */ '@/components/EstimatedTime.vue'
);

const Notification = () => import(
  /* webpackChunkName: "notification-component" */ '@/components/Notification.vue'
);

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'myappointment',
  components: {
    EstimatedTime,
    Notification,
    Header,
    Footer
  },
  data: () => ({
    avatars: AVATARS,
    consultants: CONSULTANTS,
    appt: '',
    appts: [],
    user: store,
    poll: '',
  }),
  methods: {
    cancelAppt: async function() {
      const id = this.$route.params.id
      const sure = window.confirm('Are you sure to cancel this appointment?');
      if (!sure) return;
      await api.deleteuser(id);
      this.logout()
    },
    done: async function() {
      const id = this.$route.params.id
      const sure = window.confirm('Thank you. See you again next time.');
      if (!sure) return;
      await api.deleteuser(id);
      await this.reNumber;
      this.logout()
    },
    getCurrentList: async function() {
      this.appts = await api.getusersbyconsultantbydate(
        this.consultant,
        this.datepicker
      )
    },
    getConsultant (v) { return GetConsultant(v) },
    getUserIcon (v) { return GetIcon(v) },
    getOrdinal(n) { return GetOrdinal(n) },
    getPosition() {
      return this.getOrdinal(parseInt(this.user.store.apptnumber) + 1) || ''
    },
    logout () {
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    },
    reNumber: async function() {
      await this.getCurrentList()
      this.appts.map(function (appt, idx) {
        appt.apptnumber = idx.toString()
        return appt
      }).map(newuser => {
        api.updateuser(newuser);
      });
    },
    whatIsMyNumber: async function() {
      this.appt = await api.getuser(this.$route.params.id)
      if (!this.appt) {
        this.logout()
      }
      this.user.store.avatar = this.appt.avatar
      this.user.store.name = this.appt.name
      this.user.store.email = this.appt.email
      this.user.store.pass = this.appt.pass
      this.user.store.consultant = this.appt.consultant
      this.user.store.status = this.appt.status
      this.user.store.apptnumber = this.appt.apptnumber
      this.user.store.apptdate = this.appt.apptdate
      this.user.store.appttime = this.appt.appttime
      this.user.store.apptdatetime = this.appt.apptdatetime
    }
  },
  async mounted () {
    this.whatIsMyNumber()
    this.poll = setInterval(this.whatIsMyNumber, POLLING_TIME)
  },
  beforeDestroy () {
    clearInterval(this.poll);
  }
}
</script>

<style src="@/assets/css/style.css" scoped>
</style>
