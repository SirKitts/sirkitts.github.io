<template>
  <section>
    <div class="clock"><Clock /></div>
    <table id="customers">
      <thead>
        <tr>
            <th>Reservation ({{ getQueueList() }}) {{ isFull() }}</th>
            <th>Time</th>
            <th>
              <div class="timeswitch">
                  Guests
              </div>
            </th>
            <th>
              <div class="timeswitch">
                  Contact Details
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
              <img :src="getUserIcon(item.avatar || 0)" width="32" height="32" />
              {{ item.name }}
            </td>
            <td>{{ showTime(item.appttime) }}</td>
            <td style="text-align: right;">
              {{ item.numpax }}
            </td>
            <td>
              {{ item.mobile }}<br/>{{ item.email }}
            </td>
            <td>
              <button type="submit" class="btn" @click.prevent="end(item._id)">end</button>
              <button
                v-show="trash"
                type="submit" class="btn" @click.prevent="cancelled(item._id)" >
                  <span style="color: red;"><i class="fa fa-trash"></i></span>
              </button>&nbsp;
            </td>
        </tr>
        <tr>
            <td colspan="2">Total:</td>
            <td style="text-align: right;">
              {{ computeNumberOfGuests() }}
            </td>
            <td></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { api } from '@/helpers/api'
import { ShowTime } from '@/helpers/common';
import { MAX_PEOPLE_PER_DAY } from '@/helpers/constants';
import { GetIcon } from '@/helpers/common';

const Clock = () => import(
  /* webpackChunkName: "clock-component" */ '@/components/Clock.vue'
);

export default {
  name: 'showall',
  props: {
      appts: Array,
      apptDate: [Date, String],
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
    async cancelled(id) {
        this.appt = await api.getcustomer(id)
        const sure = window.confirm('Are you sure you want this cancelled?');
        if (!sure) return;
        await api.deletecustomer(id);
        this.$emit('cancelled', this.appt)
    },
    async end(id) {
        this.appt = await api.getcustomer(id)
        const sure = window.confirm('Lunch/Dinner Done. Are you sure?');
        if (!sure) return;
        await api.deletecustomer(id);
        this.$emit('ended', this.appt);
    },
    computeNumberOfGuests() {
      let total = 0
      this.appts.map(item => { 
        total += parseInt(item.numpax)
      })
      return total
    },
    getUserIcon (v) { return GetIcon(v) },
    getQueueList() {
      return this.appts.length
    },
    isFull () {
      let checkFull = (this.appts.length >= MAX_PEOPLE_PER_DAY)
      this.$emit('isfull', checkFull);
      return checkFull ? 'Full' : ''
    },
    showTime(t) {
      return ShowTime(t)
    },
    toggleTrash() {
      this.trash = !this.trash
    }
  }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
