<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      backgroundColor="primary"
      short-title="Argon"
      title="Primus Track Team"
      logo="/img/brand/primus-logo-white.svg"
      logoAlt="/img/brand/primus-logo.svg"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'pti-home',
            path: '/account/dashboard'
          }"
        />

        <sidebar-item :link="{name: 'Projects', icon: 'pti-chart', path: '/account/projects'}"/>
        <sidebar-item :link="{name: 'Task Order', icon: 'pti-activity', path: '/account/tasks'}"/>
        <sidebar-item :link="{name: 'Team', icon: 'pti-user', path: '/account/team'}"/>
        <sidebar-item :link="{name: 'Calendar', icon: 'pti-calendar', path: '/account/calendar'}"/>
        <sidebar-item :link="{name: 'Profile', icon: 'pti-profile', path: '/account/profile'}"/>
        <sidebar-item :link="{name: 'Settings', icon: 'pti-setting', path: '/register'}"/>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'primary', //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    },
    computed: {
		loggedIn() {
			return this.$store.state.auth.loggedIn;
		},
	},
	created() {
		if (!this.loggedIn) {
			this.$router.push("/login");
		}
    else {
  
      // this.$store.dispatch("workspace/fetchWorkspaces");	
    }
	},
  };
</script>
<style lang="scss">
</style>
