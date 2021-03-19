<template>
	<div class="row justify-content-center">
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<h3 class="">Thanks for verifying your email address,</h3>
			<h4 class="">
				you can now proceed wiith your
				<router-link to="/onboarding" class="text-blue"
					>account setup</router-link
				>
			</h4>

			<h5 class="mt-2 text-gray-dark">
				You will be automatically redirected to proceed with your
				<router-link to="/onboarding" class="text-blue"
					>account setup</router-link
				>
			</h5>
		</div>
	</div>
</template>

<script>
import Nprogress from "nprogress";
export default {
	created() {
		if (this.loggedIn) {
			this.$router.push("/account/dashboard");
		}
		this.verifyEmail();
	},
	methods: {
		verifyEmail() {
			console.log(this.$route);
			Nprogress.start();
			if (this.$route.params.verification_token) {
				this.$store
					.dispatch("auth/verify", this.$route.params.verification_token)
					.then(
						() => {
							this.$notify({
								type: "success",
								message: "Email has been verified successfully!",
								icon: "fa fa-check",
							});
							this.$router.push("/onboarding");
							this.Nprogress.done();
							this.submitting = false;
						},
						(error) => {
							this.$notify({
								type: "danger",
								message: error.response.data.message,
								icon: "fa fa-times",
							});
							this.Nprogress.done();
							this.submitting = false;
                            this.$router.push("/verify-email");
						}
					);
			} else {
				this.$notify({
					type: "danger",
					message: "Invalid verification Link.",
					icon: "fa fa-times",
				});
				this.$router.push("/verify-email");
			}
		},
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.loggedIn;
		},
	},

};
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