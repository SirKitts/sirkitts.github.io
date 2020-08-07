<template>
  <section style="max-width:500px;margin:auto">
    <Header title="Login" />

    <div class="input-container">
      <i class="fa fa-user icon"></i>
      <input v-model="name" class="input-field" type="text" placeholder="Name">
      <span v-if="msg.name" style="color: red; padding: 5px 5px;">&#x274C;</span>
    </div>

    <div class="input-container">
      <i class="fa fa-key icon"></i>
      <input v-model="pass" class="input-field" type="password" placeholder="Password">
      <span v-if="msg.pass" style="color: red; padding: 5px 5px;">&#x274C;</span>
    </div>

    <div class="input-container">
      <i class="fa fa-adjust icon"></i>
      <input v-model="datepicker" class="input-field" type="date" readonly>
      <button type="submit" @click.prevent="viewAppointment" :disabled="isDisabled">View Appointments</button>
    </div>

    <div v-show="incorrect" class="input-container" style="justify-content: center;">
      <span style="color: red; font-family: Arial, Helvetica, sans-serif;">name or password incorrect !</span>
    </div>

    <Footer />

  </section>
</template>

<script>
import store from '@/admin/js/store'
import pass from '@/admin/js/pass'

const Header = () => import(
  /* webpackChunkName: "header-component" */ '@/components/Header.vue'
);

const Footer = () => import(
  /* webpackChunkName: "footer-component" */ '@/components/Footer.vue'
);

export default {
  name: 'login',
  components: {
    Header,
    Footer
  },
  data: () => ({
    name: '',
    pass: '',
    datepicker: new Date().toISOString().substr(0, 10),
    admin: store,
    password: pass,
    hasErrors: true,
    incorrect: false,
    msg: [],
    memory: []
  }),
  computed: {
    isDisabled: function(){
      return (this.hasErrors || !this.name)
    }
  },
  watch: {
    name (value) {
      this.incorrect = false
      this.name = value;
      this.validateName (value);
    },
    pass (value) {
      this.incorrect = false
      this.pass = value;
      this.validatePass (value);
    }
  },
  methods: {
    saveInMemory () {
      var d = new Date()
      this.memory.push({
        date: d.toUTCString(), 
        login: this.admin.store
      })
      const data = JSON.stringify(this.memory)
      window.localStorage.setItem('login', data);
    },
    viewAppointment () {
      if (this.password.store.name === this.name &&
        this.password.store.pass === this.pass) {
        this.admin.store.name = this.name
        this.admin.store.pass = this.pass
        this.incorrect = false
        this.saveInMemory()
        this.$router.push(`/admin/appointments`)
      } else {
        this.incorrect = true
      }
    },
    validateName(value){
      if (value) {
        this.msg['name'] = ''
      } else {
        this.msg['name'] = 'password should not be blank';
      }
    },
    validatePass(value){
      if (value) {
        this.msg['pass'] = ''
        this.hasErrors = false
      } else {
        this.msg['pass'] = 'password should not be blank';
        this.hasErrors = true
      }
    }
  },
  mounted () {
    const [day, month, year] = ( new Date() ).toLocaleDateString().split("/")
    this.datepicker = (year + '-' + month + '-' + day).substr(0, 10)
  }
}
</script>

<style src="@/assets/css/style.css" scoped></style>
