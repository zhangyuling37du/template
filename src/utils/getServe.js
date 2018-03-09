import axios from 'axios'
import store from 'store'
import fetch from 'utils/fetch'

export default function getConfig() {
  return new Promise((resolve, reject) => {
    
    axios.get('static/config.json').then(res => {
      // let URL = (process.env.NODE_ENV == "production") ? (res.data.production.BASE_API + res.data.production.MODULE_URL) : (res.data.development.BASE_API + res.data.development.MODULE_URL)
     let URL = (process.env.NODE_ENV == "production") ? (res.data.production.BASE_API  ) : (res.data.development.BASE_API )
     fetch.defaults.baseURL = URL;
      if (store.getters.baseUrl === URL) return resolve(store.getters.baseUrl);
      store.commit('SET_BASEURL', URL);
      resolve(res);
    }).catch(err => {
      reject(err);
    })
  })
}

