import axios from "axios";
import router from "@/router";
import store from "@/store";
import i18n from "@/i18n";
import JwtService from "@/common/jwt.service";
import { Message, Loading } from "element-ui";

const interceptor = axios.create();

let loadingInstance;

interceptor.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (localStorage.id_token) {
      config.headers.Authorization = "Bearer " + localStorage.id_token;
    }

    config.headers["Accept-Language"] = i18n.locale;

    loadingInstance = Loading.service({
      lock: true,
      text: "loading"
    });

    return config;
  },
  function(error) {
    // Do something with request error
    loadingInstance.close();
    return Promise.reject(error);
  }
);

interceptor.interceptors.response.use(
  function(response) {
    loadingInstance.close();

    return response.data;
  },
  function(error) {
    if (error.response.status === 400) {
      Message.error(error.response.data.message);
    }

    if (error.response.status === 401) {
      JwtService.destroyToken();

      store.dispatch("user/resetToken");

      Message.error(error.response.data.message);

      router.push({
        name: "Login"
      });
    }

    if (error.response.status === 404) {
      router.push({
        name: "LandingPage"
      });
    }

    if (error.response.status === 422) {
      Message.error(error.response.data.message);
    }

    loadingInstance.close();

    return Promise.reject(error);
  }
);

export default interceptor;
