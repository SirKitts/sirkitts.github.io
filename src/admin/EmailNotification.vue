<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Send Email Notification" />

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="datepicker" class="input-field" type="date" id="date" name="apptdate">
      <button @click="$router.push(`/admin/appointments`)">Admin</button>
    </div>
    
    <div class="input-container">
      <div class="input-container">
        <!--button type="submit" @click="sendEmailNow"><i class="fa fa-envelope"></i> Send Now ?</button-->
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :value="index">
        </div>
      </div>
    </div>

    <ShowEmailList :appts="appts" :consultant="consultant" />

    <Footer />
  </section>
</template>

<script>
import store from '@/admin/js/store'
import pass from '@/admin/js/pass'
import { api } from '@/helpers/Helpers'
import { GetConsultant } from '@/helpers/common';
import { CONSULTANTS } from '@/helpers/constants';

const ShowEmailList = () => import(
  /* webpackChunkName: "showall-component" */ '@/admin/ShowEmailList.vue'
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
    ShowEmailList,
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
    sendNow: false,
  }),
  methods: {
    getApptsByConsultantByDate: async function() {
      this.appts = await api.getusersbyconsultantbydate(
          this.consultant,
          this.datepicker
      )
    },
    getConsultant (v) { return GetConsultant(v) },
    sendEmailNow() {
      this.sendNow = !this.sendNow
    },
  },
  async mounted () {
    this.memory = JSON.parse(window.localStorage.getItem('login'))

    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.consultant = '0'
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
