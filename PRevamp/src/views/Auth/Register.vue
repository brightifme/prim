<template>
	<div class="row justify-content-center">
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<h3 class="">Create an account</h3>
			<h4 class="">Let's get started</h4>
			<img
				style="height: 50vh"
				class="position-absolute p-5"
				src="img/theme/asset-1.svg"
			/>
		</div>
		<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12 no-gutters">
			<div class="card bg-white shadow border-0 mt-3 mt-lg-0">
				<div class="card-body p-lg-5">
					<form role="form" @submit.prevent="handleRegister">
						<base-input
							label="Full Name"
							input-classes="form-control-lg text-dark"
							id="full-name"
							name="full-name"
							required
							:inputClasses="{
								'border-danger text-danger': $v.register.full_name.$error,
							}"
							v-model.lazy="$v.register.full_name.$model"
							placeholder=""
							labelClasses="auth"
						>
						</base-input>
						<base-input
							label="Email Address"
							input-classes="form-control-lg text-dark"
							id="email"
							name="email"
							type="email"
							required
							placeholder=""
							labelClasses="auth"
							:inputClasses="{
								'border-danger text-danger': $v.register.email.$error,
							}"
							:readonly="lockEmail"
							v-model.trim="$v.register.email.$model"
						>
						</base-input>
						<base-input
							label="Password"
							input-classes="form-control-lg text-dark"
							type="password"
							id="password"
							name="password"
							required
							placeholder=""
							labelClasses="auth"
							v-model.lazy="$v.register.password.$model"
							:inputClasses="{
								'border-danger text-danger': $v.register.password.$error,
							}"
						>
						</base-input>

						<div class="row mt-3">
							<div class="col-md-6">
								<small class="text-gray-dark"
									>Got an account?<router-link
										to="/login"
										class="text-primary font-weight-bold"
									>
										Sign In</router-link
									></small
								>
							</div>
							<div class="col-md-6 text-md-right">
								<base-button
									nativeType="submit"
									type="primary"
									class="my-3 my-md-0"
									:disabled="submitting"
									>Continue</base-button
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
// eslint-disable-next-line no-unused-vars
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
// import Nprogress from "nprogress";
import AuthService from '../../services/auth.service';

export default {
	name: "register",
	data() {
		return {
			lockEmail: false,
			errorsExist: false,
			register: {
				full_name: "",
				email: "",
				password: "",
			},
			confirm_password: "",
			submitting: false,
		};
	},
	validations: {
		register: {
			full_name: {
				required,
			},
			email: {
				required,
				email,
			},
			password: {
				required,
				minLength: 8,
			},
		},
		confirm_password: {
			required,
			sameAsPassword: sameAs("password"),
		},
	},
	computed: {
		loggedIn() {
			return this.$store.state.auth.loggedIn;
		},
	},
	mounted() {
		if (this.loggedIn) {
			this.$router.push("/account/dashboard");
		}
		if (this.$route.query.email && this.$route.query.invited) {
			this.lockEmail = true;
			this.$v.register.email.$model = this.$route.query.email;
			this.checkUserExist(this.$route.query.user_id);
		}
	},
	methods: {
		checkUserExist(user) {
			AuthService.checkUser(user).then((data) => {
				console.log(data);
				console.log(this.$route, window.location);
				if (data.data.data.status !== "INVITED") {
					this.$router.push("/accept-invite" + window.location.search);
				}
			});
		},
		handleRegister() {
			this.submitting = true;
			this.$v.register.$touch();
			if (this.$v.register.$invalid) {
				this.Nprogress.done();
				this.submitting = false;
				return;
			}
			console.log("start");
			this.$store.dispatch("auth/register", this.register).then(
				() => {
					this.$notify({
						type: "success",
						message: "Account Registration Successful",
						icon: "fa fa-check",
					});
					this.$router.push("/verify-email");
				},
				(error) => {
					this.Nprogress.done();
					this.$notify({
						type: "danger",
						message: error.response.data.message,
						icon: "fa fa-times",
					});
					this.submitting = false;
					this.Nprogress.done();
				}
			);
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
