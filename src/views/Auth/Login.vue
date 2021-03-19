
<template>
	<div class="row justify-content-center">
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<h3 class="">Welcome back,</h3>
			<h4 class="">Sign in to your workspace</h4>
			<img
				style="height: 50vh"
				class="position-absolute p-5"
				src="img/theme/asset-1.svg"
			/>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<div class="card bg-white shadow border-0 mt-3 mt-lg-0">
				<div class="card-body p-lg-5">
					<form role="form" @submit.prevent="handleLogin">
						<base-input
							label="Email Address"
							name="email"
							v-model.trim="$v.loginDetails.email.$model"
							input-classes="form-control-lg text-dark"
							labelClasses="auth"
							:inputClasses="{
								'border-danger text-danger': $v.loginDetails.email.$error,
							}"
						>
						</base-input>
						<base-input
							label="Password"
							name="password"
							type="password"
							v-model.lazy="$v.loginDetails.password.$model"
							input-classes="form-control-lg text-dark mb-0"
							labelClasses="auth"
							:inputClasses="{
								'border-danger text-danger': $v.loginDetails.password.$error,
							}"
						>
						</base-input>
						<router-link to="/forgot-password" class="text-primary"
							><small class="font-weight-bold"
								>Forgot password?</small
							></router-link
						>

						<div class="row mt-3">
							<div class="col-md-6">
								<small class="text-gray-dark"
									>New here?<router-link
										to="/register"
										class="text-primary font-weight-bold"
									>
										Create a workspace</router-link
									></small
								>
							</div>
							<div class="col-md-6 text-md-right">
								<base-button
									type="primary"
									nativeType="submit"
									class="my-3 my-md-0"
									:disabled="submitting"
									>Sign in</base-button
								>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import loginDetails from "../../models/loginDetails";
import { required, email } from "vuelidate/lib/validators";
export default {
	name: "login",
	data() {
		return {
			loginDetails: new loginDetails("", ""),
			errorsExist: false,
			submitting: false,
			showPassword: false,
		};
	},
	validations: {
		loginDetails: {
			email: {
				required,
				email,
			},
			password: {
				required,
			},
		},
	},
	methods: {

		handleLogin() {
		this.Nprogress.start();
			this.submitting = true;
			this.$v.loginDetails.$touch();
			if (this.$v.loginDetails.$invalid) {
				this.Nprogress.done();
				this.submitting = false;
				return;
			}
			
				this.$store.dispatch("auth/loginUser", this.loginDetails).then(
					() => {
						this.$notify({
							type: "success",
							message: "Login Successful",
							icon: "fa fa-check",
						});
						this.$store.dispatch("workspace/fetchWorkspaces");	
						this.$store.dispatch("projects/getProjects");
						this.$router.push("/account/dashboard");
					},
					(error) => {
						this.Nprogress.done();
							this.submitting = false;

						if (
							error.message === "Please verify your account before you login"
						) {
							this.$router.push(
								`/resend-verification?email=` + this.login.email
							);
						} else {
							this.error = ["Invalid details. Please try again", true];
							this.$notify({
								type: "danger",
								message: "Invalid details. Please try again",
								icon: "fa fa-times",
							});
						}
					}
				);

		},
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
