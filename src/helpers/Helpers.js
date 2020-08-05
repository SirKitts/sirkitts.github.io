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
// const baseURL = 'http://localhost:5000/users/';
const baseURL = 'https://nameless-woodland-38449.herokuapp.com/users/';

const handleError = fn => (...params) =>
  fn(...params).catch(error => {
    vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
  });

export const api = {
  getuser: handleError(async id => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),
  getusers: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),
  deleteuser: handleError(async id => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),
  createuser: handleError(async payload => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),
  updateuser: handleError(async payload => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  }),
  getusername: handleError(async id => {
    const res = await axios.get(baseURL + 'name/' + id);
    return res.data;
  }),
  getusernamebynameandemail: handleError(async (id, email) => {
    const res = await axios.get(baseURL + 'name/' + id +  '/email/' + email);
    return res.data;
  }),
  getusersbydate: handleError(async id => {
    const res = await axios.get(baseURL + 'apptdate/' + id);
    return res.data;
  }),
  getusersbyconsultant: handleError(async id => {
    const res = await axios.get(baseURL + 'consultant/' + id);
    return res.data;
  }),
  getusersbyconsultantbydate: handleError(async (id, date) => {
    const res = await axios.get(baseURL + 'consultant/' + id +  '/apptdate/' + date);
    return res.data;
  })
};