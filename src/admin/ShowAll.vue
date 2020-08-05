<template>
  <table id="customers">
    <thead>
      <tr>
          <th>In Queue ({{ getQueueList() }}) {{ isFull() }}</th>
          <th>Time</th>
          <th>
            <div class="timeswitch">
                {{ getConsultant (consultant) }}
                <Clock />
            </div>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in appts" :key="index">
          <td>
            <img :src="getUserIcon(item.avatar)" width="32" height="32" /> 
            {{ item.name }} 
          </td>
          <td>{{ item.appttime }}</td>
          <td>
            {{ getOrdinal(parseInt(item.apptnumber) + 1) }}
            <span style="color: green;" v-if="item.status === '1'"> in progress... </span>
            <button type="submit" class="btn" @click.prevent="start(item._id)" 
              v-show="index === 0 && item.status === '0'">start</button>
            <button type="submit" class="btn" @click.prevent="end(item._id)" v-show="index === 0">end</button>
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { api } from '@/helpers/Helpers'
import { AVATARS, CONSULTANTS, MAX_PEOPLE_PER_DAY } from '@/helpers/constants';

const Clock = () => import(
  /* webpackChunkName: "clock-component" */ '@/components/Clock.vue'
);

export default {
  name: 'showall',
  props: {
      appts: Array,
      consultant: [Number, String]
  },
  components: {
    Clock
  },
  data: () => ({
    apptlist: 0,
    appt: ''
  }),
  methods: {
    getConsultant (v) {
      if (v === undefined) { v = this.getRandomInt(2) } 
      return CONSULTANTS[v].name
    },
    getConsultantIcon (v) {
      if (v === undefined) { v = this.getRandomInt(2) } 
      return CONSULTANTS[v].avatar
    },
    getUserIcon (v) {
      if (v === undefined || v >= 2) { v = this.getRandomInt(2) }
      return AVATARS[v].avatar
    },
    getOrdinal: function (n) {
      if (n === undefined ) {return null}
      var s = ['th','st','nd','rd']
      var v = n % 100
      return n+(s[(v-20)%10]||s[v]||s[0])
    },
    getQueueList() {
      return this.appts.length
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    isFull () {
      let checkFull = (this.appts.length >= MAX_PEOPLE_PER_DAY)
      this.$emit('isfull', checkFull);
      return checkFull ? 'Full' : ''
    },
    async start(id) {
        this.appt = await api.getuser(id)
        this.appt.status = '1'
        await api.updateuser(this.appt)
        this.$emit('started', this.appt.status);
    },
    async end(id) {
        this.appt = await api.getuser(id)
        const sure = window.confirm('Are you sure?');
        if (!sure) return;
        await api.deleteuser(id);
        this.$emit('ended', this.appt.status);
    }
  }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
