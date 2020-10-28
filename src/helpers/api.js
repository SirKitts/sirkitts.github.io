import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();
const baseURL = 'http://localhost:5000/customers/';
// const baseURL = 'https://pacific-harbor-72432.herokuapp.com/customers/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  getcustomer: handleError(async id => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getcustomers: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deletecustomer: handleError(async id => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createcustomer: handleError(async payload => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  getcustomersbynameandemail: handleError(async (id, email) => {
    const res = await axios.get(baseURL + 'name/' + id +  '/email/' + email);
    return res.data;
  }),
  getcustomersbyemail: handleError(async id => {
    const res = await axios.get(baseURL + 'email/' + id);
    return res.data;
  }),
  getcustomersbydate: handleError(async (date) => {
    const res = await axios.get(baseURL + 'apptdate/' + date);
    return res.data;
  })
};