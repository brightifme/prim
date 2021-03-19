<template>
	<div class="row justify-content-center">
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<h3 class="">Reset Password</h3>
			<img
				style="height: 50vh"
				class="position-absolute p-5"
				src="/img/theme/asset-1.svg"
			/>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<div class="card bg-white shadow border-0 mt-3 mt-lg-0">
				<div class="card-body p-lg-5">
					<form role="form" @submit.prevent="resetPassword">
						<base-input
							id="email"
							name="email"
							label="Email Address"
							input-classes="form-control-lg text-dark"
							v-model.trim="$v.email.$model"
							placeholder=""
							labelClasses="auth"
							:inputClasses="{
								'border-danger text-danger': $v.email.$error,
							}"
						>
						</base-input>

						<div class="row mt-3">
							<div class="col-md-6 text-md-left">
								<base-button
									type="primary"
									nativeType="submit"
									class="my-3 my-md-0"
									block
									:disabled="$v.email.$error || email.length == 0"
									>Send Reset Password</base-button
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
import { required, email } from "vuelidate/lib/validators";
import authService from '../../services/auth.service';
// import { apiClient } from "@/services/api";

export default {
	data() {
		return {
			email: "",
			errorsExist: false,
		};
	},
	validations: {
		email: {
			required,
			email,
			minLength: 1,
		},
	},
	methods: {
		createPassword() {
			this.$router.push("/create-password");
		},
		resetPassword() {
			this.Nprogress.start();
			this.submitting = true;
			this.$v.email.$touch();
			if (this.$v.email.$invalid) {
				this.Nprogress.done();
				this.submitting = false;
				return;
			}
			
			authService.forgotPassword(this.email).then(
				() => {
					this.$notify({
						type: "success",
						message: "Verification email has been sent successfully!",
						icon: "fa fa-check",
					});
					this.$router.push("/login");
				},
				(error) => {
					console.log(error.response)
					this.Nprogress.done();
						this.$notify({
							type: "danger",
							message: error.response.data.message,
							icon: "fa fa-times",
						});
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
</style>