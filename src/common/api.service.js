import Vue from "vue";
import axios from "@/common/interceptors.service";
import VueAxios from "vue-axios";
import JwtService from "@/common/jwt.service";

const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_BACKEND_URL;
  },

  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  },

  query(resource, params) {
    return Vue.axios.get(resource, { params }).catch(error => {
      throw error.response;
    });
  },

  get(resource, slug = "", params) {
    return Vue.axios.get(`${resource}/${slug}`, { params }).catch(error => {
      throw error.response;
    });
  },

  post(resource, params, config) {
    return Vue.axios.post(`${resource}`, params, config).catch(error => {
      throw error.response;
    });
  },

  update(resource, slug, params) {
    return Vue.axios.patch(`${resource}/${slug}`, params).catch(error => {
      throw error.response;
    });
  },

  put(resource, params, slug = "") {
    return Vue.axios.put(`${resource}/${slug}`, params).catch(error => {
      throw error.response;
    });
  },

  patch(resource, params, slug = "") {
    return Vue.axios.patch(`${resource}/${slug}`, params).catch(error => {
      throw error.response;
    });
  },

  delete(resource, params, slug = "") {
    return Vue.axios
      .delete(`${resource}/${slug}`, { data: params })
      .catch(error => {
        throw error.response;
      });
  }
};

export default ApiService;
