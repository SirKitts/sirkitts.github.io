<template>
  <table id="customers">
    <thead>
      <tr>
          <th>In Queue ({{ getQueueList() }}) {{ isFull() }}</th>
          <th>
            <div class="timeswitch">Consultant / Position <Clock /></div>
          </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in appts" :key="index">
          <td v-if="item.name === user.store.name || index < 3 || index >= appts.length - 1">
            <img :src="getUserIcon(item.avatar)" width="32" height="32" /> 
            {{ item.name === user.store.name ? item.name : '******' }} 
          </td>
          <td v-if="item.name === user.store.name || index < 3 || index >= appts.length - 1">
            <img 
                :src="getConsultantIcon(item.consultant)" width="32" height="32"
                v-show="item.name === user.store.name || index === 0 || (index === appts.length - 1)"/>
            {{ (item.name === user.store.name || index === 0 || (index === appts.length - 1)) ? getConsultant (item.consultant) : '' }}
            {{ (item.name === user.store.name || index === 0 || (index === appts.length - 1)) ? getOrdinal(index + 1) : '' }}
            <button v-show="item.name === user.store.name">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </button>
            {{ item.status === '1' ? ' - In progress' : '' }}
          </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import store from '@/assets/js/store'
import { GetIcon, GetConsultant, GetConsultantIcon, GetOrdinal } from '@/helpers/common';
import { MAX_PEOPLE_PER_DAY } from '@/helpers/constants';

const Clock = () => import(
  /* webpackChunkName: "clock-component" */ '@/components/Clock.vue'
);

export default {
  name: 'firstinfirstout',
  props: {
      appts: Array
  },
  components: {
    Clock
  },
  data: () => ({
    user: store,
  }),
  methods: {
    getConsultant (v) { return GetConsultant(v) },
    getConsultantIcon (v) { return GetConsultantIcon(v) },
    getUserIcon (v) { return GetIcon(v) },
    getOrdinal(n) {
      const ordinal = GetOrdinal(n)
      this.user.store.apptnumber = n.toString()
      return ordinal
    },
    getQueueList() {
      return (this.appts) ? this.appts.length : 0
    },
    isFull () {
      let checkFull = (this.getQueueList >= MAX_PEOPLE_PER_DAY)
      this.$emit('isfull', checkFull);
      return checkFull ? 'Full' : ''
    }
  }
}
</script>

<style src="@/components/css/style-table.css" scoped></style>
