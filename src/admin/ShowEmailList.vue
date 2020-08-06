<template>
  <table id="customers">
    <thead>
      <tr>
          <th>In Queue ({{ getQueueList() }}) {{ isFull() }}</th>
          <th>Time</th>
          <th>
            <div class="timeswitch">
                {{ getConsultant (consultant) }}
                <button type="submit" @click="sendEmailNotification"><i class="fa fa-envelope"></i> Send Now ?</button>
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
            <span v-if="sending" style="color: green;"> sending... </span>
            <span v-if="sendingDone" style="color: green;"><i class="fa fa-envelope"></i></span>
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { AVATARS, CONSULTANTS, MAX_PEOPLE_PER_DAY } from '@/helpers/constants';

export default {
    name: 'showall',
    props: {
        appts: Array,
        consultant: [Number, String],
        sendNow: Boolean
    },
    components: {},
    data: () => ({
        eMessage: '',
        sending: false,
        sendingDone: false,
    }),
    methods: {
        getConsultant (v) {
            if (v === undefined) { v = this.getRandomInt(2) } 
            return CONSULTANTS[v].name
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
            return checkFull ? 'Full' : ''
        },
        async sendEmailNotification() {
          console.log('hey there!')
        },
        sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
    }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
