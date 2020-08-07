<template>
  <table id="customers">
    <thead>
      <tr>
          <th>In Queue ({{ getQueueList() }})</th>
          <th>Time</th>
          <th>
            <div class="timeswitch">
                {{ getConsultant (consultant) }}&nbsp;
                <button v-if="appts.length > 0" type="submit" @click="sendAll(appts)">
                  <i class="fa fa-envelope"></i> Send All
                </button>
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
            <button v-if="item.reminder === '0'" type="submit" @click="sendEmailNotification(item)">
              <i class="fa fa-envelope"></i> Send
            </button>
            <span v-else style="color: green;"><i class="fa fa-envelope"></i></span>
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';
import { api } from '@/helpers/Helpers'
import { SENDMAILREMINDER_URL } from '@/helpers/constants';
import { GetIcon, GetConsultant } from '@/helpers/common';

export default {
    name: 'showemaillist',
    props: {
        appts: Array,
        consultant: [Number, String],
        sendNow: Boolean
    },
    components: {},
    data: () => ({
      form: {
        name: '',
        email: '',
        subject: '',
        date: '',
        consultant: ''
      }
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
        sendAll(appts) {
          appts.forEach(
            element => {
              this.sendEmailNotification(element)
            });
        },
        sendEmailNotification: async function(user) {
          this.form.name = user.name
          this.form.email = user.email
          this.form.subject = 'Appointment Reminder'
          this.form.date = user.apptdatetime 
          this.form.consultant = this.getConsultant(user.consultant)
          await axios.post(SENDMAILREMINDER_URL, JSON.stringify(this.form))
            .then(function () {})
            .catch(function () {})
          await this.updateUserRemiderFlag(user)
        },
        updateUserRemiderFlag: async function(user) {
          user.reminder = '1'
          await api.updateuser(user)
        }
    }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
