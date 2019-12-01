import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: require("@/components/LandingPage").default
    },
    {
      path: "/base",
      name: "base",
      component: require("@/pages/base/index").default
    },
    {
      path: "/wheel",
      name: "wheel",
      component: require("@/pages/wheel/index").default
    },
    {
      path: "/temperature",
      name: "temperature",
      component: require("@/pages/temperature/index").default
    },
    {
      path: "/temperatureUp",
      name: "temperatureUp",
      component: require("@/pages/temperatureUp/index").default
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
