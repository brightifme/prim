/* eslint-disable no-unused-vars */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import Vuelidate from "vuelidate";
import vSelect from "vue-select";
import VueMoment from "vue-moment";

import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import './registerServiceWorker';
import ArgonDashboard from './plugins/argon-dashboard';



Vue.prototype.Nprogress = Nprogress;


Vue.config.productionTip = false


Vue.use(Vuelidate);
Vue.use(VueMoment);
Vue.use(ArgonDashboard);


router.beforeEach((to, from, next) => {
  Nprogress.start();

  // update title and meta tag
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  // const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));
  next();
});

router.afterEach((routeTo, routeFrom, next) => {
  Nprogress.done();
});




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
