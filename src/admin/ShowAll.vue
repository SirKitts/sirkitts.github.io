<template>
  <table id="customers">
    <thead>
      <tr>
          <th>In Queue ({{ getQueueList() }}) {{ isFull() }}</th>
          <th>Time</th>
          <th>
            <div class="timeswitch">
                {{ getConsultant (consultant) }}
                &nbsp;<Clock />
            </div>
          </th>
          <th>
            <button type="submit" @click.prevent="toggleTrash">
              <i class="fa fa-trash"></i> {{ trash ? 'on' : 'off'}}
            </button>
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
          <td>
            <button 
              v-show="(item.status === '0' && trash)"
              type="submit" class="btn" @click.prevent="cancelled(item._id)" >
                <i class="fa fa-trash"></i>
            </button>&nbsp;
            <span style="color: green;" v-if="item.reminder === '1'" ><i class="fa fa-envelope"></i></span>
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { api } from '@/helpers/Helpers'
import { MAX_PEOPLE_PER_DAY } from '@/helpers/constants';
import { GetIcon, GetConsultant } from '@/helpers/common';

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
    appt: '',
    trash: false
  }),
  methods: {
    getConsultant (v) { return GetConsultant(v) },
    getUserIcon (v) { return GetIcon(v) },
    getOrdinal: function (n) {
      if (n === undefined ) {return null}
      var s = ['th','st','nd','rd']
      var v = n % 100
      return n+(s[(v-20)%10]||s[v]||s[0])
    },
    getQueueList() {
      return this.appts.length
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
        this.$emit('started', this.appt.status)
    },
    async end(id) {
        this.appt = await api.getuser(id)
        const sure = window.confirm('Done. Are you sure?');
        if (!sure) return;
        await api.deleteuser(id);
        this.$emit('ended', this.appt);
    },
    async cancelled(id) {
        this.appt = await api.getuser(id)
        const sure = window.confirm('Are you sure you want this cancelled?');
        if (!sure) return;
        await api.deleteuser(id);
        this.$emit('cancelled', this.appt)
    },
    toggleTrash() {
      this.trash = !this.trash
    }
  }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
