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
      @ended="updateEstimatedTime" />

    <Footer />
  </section>
</template>

<script>
import store from '@/admin/js/store'
import pass from '@/admin/js/pass'
import { api } from '@/helpers/Helpers'
import { CONSULTANTS } from '@/helpers/constants';
// import { CONSULTANTS, POLLING_TIME } from '@/helpers/constants';

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
  }),
  methods: {
    getApptsByConsultantByDate: async function() {
      this.appts = await api.getusersbyconsultantbydate(
          this.consultant,
          this.datepicker
      )
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
    updateEstimatedTime: async function() {
      await this.getApptsByConsultantByDate()
      this.appts.map(function (appt, idx) {
        // console.log('idx', idx)
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
    // this.poll = setInterval(this.reNumber, POLLING_TIME)
  },
  beforeDestroy () {
    // clearInterval(this.poll);
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
