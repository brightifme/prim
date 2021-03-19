<template>
  <div class="row justify-content-center">
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
            <img src="img/theme/verify-email.svg"/>
			<h3 class=""> We sent you a mail,</h3>
			<h4 class="">please verify your email to continue.</h4>

            
            <h5 class="mt-2 text-gray-dark">
                Proceed to
        <router-link to="/login" class="text-primary font-weight-bold">login <i class="fa fa-chevron-right"></i></router-link>
      </h5>
		
		</div>
	</div>
</template>

<script>
export default {

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

}
</script>
<style lang="scss" scoped>
h3 {
	font-weight: 700;
	letter-spacing: -0.5px;
	margin: 5px 0;
	line-height: 1.4;
	color: #1c1464;
	@media (min-width: 1024px) {
		font-size: 3rem;
	}
	@media (max-width: 1024px) {
		font-size: 1.98rem;
	}
}

h4 {
	font-weight: 700;
	letter-spacing: -0.5px;
	margin: 5px 0;
	line-height: 1.4;
	color: rgba(10, 46, 101, 0.3) !important;
	@media (min-width: 1024px) {
		font-size: 2rem;
	}
	@media (max-width: 1024px) {
		font-size: 1.65rem;
	}
}
</style>