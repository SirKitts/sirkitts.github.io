<template>
  <div class="work-container">
    <div class="arrow">
      <router-link to="/samples">
        <i class="fas fa-arrow-circle-left fa-1x" style="color: black; padding-top: 1rem" />
      </router-link>
    </div>
    <h1 class="title">
      Multi-Form Sample
    </h1>
    <div class="work__achievements">
        <MultiForm :achievements="achievements" />
    </div>
  </div>
</template>

<script>
const MultiForm = () => import(
  /* webpackChunkName: "work-multiform-component" */ '@/components/MultiForm'
);

export default {
  name: 'MultiFormSample',
  components: {
    MultiForm
  },
  data () {
    return {
      achievements: [
        {
          achievement: 'Contact Details',
          description: 'contact form details to be place here',
          fields: {
            contact1: '',
            contact2: ''
          }
        },
        {
          achievement: 'Address Details',
          description: 'address form details to be place here',
          fields: {
            address1: '',
            address2: ''
          }
        },
        {
          achievement: 'Finance Details',
          description: 'finance form details can be place here',
          fields: {
            finance1: '',
            finance2: ''
          }
        },
        {
          achievement: 'Other Details',
          description: 'Other details can be place here',
          fields: {
            other1: '',
            other2: ''
          }
        },
        {
          achievement: 'Emergency Details',
          description: 'emergency form details to be place here',
          fields: {
            emergency1: '',
            emergency2: ''
          }
        },
        {
          achievement: 'Card Details',
          description: 'card details to be place here',
          fields: {
            card1: '',
            card2: ''
          }
        },
        {
          achievement: 'Confirm',
          description: 'save button can be place here. it can be placed per step as well',
        }
      ]
    }
  }
}
</script>

<style>
.multiform-container {
  width: 80vw;
}
/*
.multiform-images__btn {
  color: #000;
}
*/
</style>
