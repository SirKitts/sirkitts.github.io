<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Send Email Notification" />

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="datepicker" class="input-field" type="date" id="date" name="apptdate" readonly>
      <button @click="$router.push(`/admin/appointments`)">Admin</button>
    </div>
    
    <div class="input-container">
      <div class="input-container">
        
      </div>

      <div class="input-container">
        <div style="padding-right: 8px;">Consultant<br/>to visit</div>
        <div v-for="(item, index) in consultants" :key="index">
          <img :src="item.avatar" width="32" height="32"/>
          <input type="radio" v-model="consultant" :value="index">
        </div>
      </div>
    </div>

    <ShowEmailList :appts="appts" :consultant="consultant" 
      @reminder="reminder"/>

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
  /* webpackChunkName: "showemaillist-component" */ '@/admin/ShowEmailList.vue'
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
    consultant: '0',
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
    reminder: async function(data) {
      await this.getApptsByConsultantByDate()
      this.appts.map(function (appt) {
        appt.reminder = data.toString()
        return appt
      }).map(newuser => {
        api.updateuser(newuser)
      })
    },
  },
  mounted () {
    const tomorrow = new Date(new Date().getTime() + (24 * 60 * 60 * 1000))
    const [day, month, year] = tomorrow.toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
    this.consultant = '0'
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
