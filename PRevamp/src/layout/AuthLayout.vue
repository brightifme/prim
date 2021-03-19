<template>
	<div
		class="main-content container px-lg-5 pt-lg-7 px-4 pt-5"
		:showToggleButton="0"
	>
		<div class="pb-5">
			<div class="mb-lg-6 mb-4">
				<router-link slot="brand" class="navbar-brand" to="/">
					<img src="/img/brand/primus-logo.svg" />
				</router-link>
			</div>
			<slide-y-up-transition mode="out-in" origin="center top">
				<router-view></router-view>
			</slide-y-up-transition>
		</div>
	</div>
</template>
<script>
import { SlideYUpTransition } from "vue2-transitions";

export default {
	name: "auth-layout",
	components: {
		SlideYUpTransition,
	},
	data() {
		return {
			year: new Date().getFullYear(),
			showMenu: false,
		};
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.loggedIn;
		},
	},
	created() {
		if (this.loggedIn) {
			this.$router.push("/account/dashboard");
		}
	},
};
</script>
<style lang="scss" scoped>
.container {
	margin: 0 auto;
	max-width: 1300px;
	padding: 0 60px;
	width: 100%;
}
</style>
