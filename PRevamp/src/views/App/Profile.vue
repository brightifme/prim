<template>
	<div class="container-fluid pb-8 pt-5">
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-5 mb-xl-0 h-100">
				<div class="card bg-primary">
					<div class="card-body">
						<div class="row">
							<div class="col-md-6 text-center">
								<img
									alt="Image placeholder"
									src="/img/theme/default-avatar.jpg"
									style="width: 132px"
									class="rounded-circle"
								/>
								<p class="text-white my-3">Upload Picture</p>
							</div>
							<div class="col-md-6 d-flex">
								<div class="my-auto">
									<h1 class="mb-0 text-white">Babtunde Fatai</h1>
									<h3 class="text-sm text-white mb-2">Status: Employee</h3>
									<base-button
										size="sm"
										type="white"
										class="rounded-0 text-success"
										>Total Projects: 345</base-button
									>
								</div>
							</div>
						</div>
					</div>
				</div>
				<card shadow type="light">
					<template>
						<form @submit.prevent>
							<div class="row">
								<div class="col-6">
									<div class="pl-lg-4">
										<h3 class="text-dark mb-4">Profile</h3>

										<base-input
											alternative=""
											label="First name"
											placeholder="Babatunde"
											input-classes="form-control-alternative bg-lighter text-dark"
											v-model="model.firstName"
										/>

										<base-input
											alternative=""
											label="Last name"
											placeholder="Fatai"
											input-classes="form-control-alternative bg-lighter text-dark"
											v-model="model.lastName"
										/>

										<base-input
											alternative=""
											label="Phone Number"
											placeholder="08103674006"
											input-classes="form-control-alternative bg-lighter text-dark"
											v-model="model.phoneNumber"
										/>

										<base-input
											alternative=""
											label="Email address"
											placeholder="jesse@example.com"
											input-classes="form-control-alternative bg-lighter text-dark"
											v-model="model.email"
										/>
										<base-input
											alternative=""
											label="Location"
											placeholder="Location"
											input-classes="form-control-alternative bg-lighter text-dark"
											v-model="model.address"
										/>
									</div>
								</div>
								<div class="col-6">
									<div class="pl-lg-4">
										<h3 class="text-dark mb-4">Task Track</h3>
										<div
											v-for="summary in genSummary"
											:key="summary.name"
											class="col-auto card px-0 my-3"
											style="background: #97979733"
										>
											<div class="card-body p-2">
												<div class="row align-items-center">
													<div class="col-auto">
														<!-- Avatar -->
														<button
															type="button"
															class="btn btn-sm btn-lg shadow-none"
															:class="summary.color"
															style="width: 50px; height: 50px"
														>
															<i class="fa fa-2x" :class="summary.icon"></i>
														</button>
													</div>
													<div class="col ml--2">
														<h3 class="mb-0">{{ summary.name }}</h3>
													</div>
													<div class="col-auto mr-3">
														<h3 class="mb-0 text-dark">{{ summary.value }}</h3>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="pl-lg-4 mt-5">
										<h3 class="text-dark mb-4">Payment Option</h3>
										<div class="card bg-success text-white my-2">
											<div class="card-body">
												<div class="d-flex">
													<base-dropdown
														class="my-auto ml-auto"
														menuClasses=" dropdown-menu-right mx-3 text-xs"
													>
														<p class="ml-auto" slot="title">
															Options <i class="fa fa-ellipsis-v"></i>
														</p>

														<a class="dropdown-item" href=""
															>Set as default</a
														>
														<a class="dropdown-item" href=""
															>Edit</a
														>
														<a class="dropdown-item text-danger" href="">Delete</a
														>
													</base-dropdown>
												
												</div>
												<div class="d-flex">
													<div>
														<h2 class="mb-1 text-white">Babatunde Fatai</h2>
														<p class="">02/22</p>
													</div>
													<div class="ml-auto d-flex">
														<img
															src="/img/theme/mscard.svg"
															class="mt-auto"
															style="height: 60px"
														/>
													</div>
												</div>
											</div>
										</div>
                                        <div class="card bg-secondary text-white my-2">
											<div class="card-body">
												<div class="d-flex">
													<base-dropdown
														class="my-auto ml-auto"
														menuClasses=" dropdown-menu-right mx-3 text-xs"
													>
														<p class="ml-auto" slot="title">
															Options <i class="fa fa-ellipsis-v"></i>
														</p>

														<a class="dropdown-item" href=""
															>Set as default</a
														>
														<a class="dropdown-item" href=""
															>Edit</a
														>
														<a class="dropdown-item text-danger" href="">Delete</a
														>
													</base-dropdown>
												
												</div>
												<div class="d-flex">
													<div>
														<h2 class="mb-1 text-white">Babatunde Fatai</h2>
														<p class="">02/22</p>
													</div>
													<div class="ml-auto d-flex">
														<img
															src="/img/theme/mscard.svg"
															class="mt-auto"
															style="height: 60px"
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</template>
				</card>
			</div>
			<div class="col-xl-12 col-md-12 mb-5 mb-xl-0 h-100"></div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { projectStatus } from "../../services/utils.service";
export default {
	data() {
		return {
			model: {
				phoneNumber: "",
				email: "",
				firstName: "",
				lastName: "",
				address: "",
				city: "",
				country: "",
				zipCode: "",
				about: "",
			},
		};
	},
	computed: {
		...mapGetters("projects", ["projects"]),
		total() {
			return this.projects.length;
		},
		completed() {
			return this.projects.filter((p) => p.status === projectStatus.completed)
				.length;
		},
		inProgress() {
			return this.projects.filter((p) => p.status === projectStatus.inProgress)
				.length;
		},
		onHold() {
			return this.projects.filter((p) => p.status === projectStatus.onHold)
				.length;
		},
		tasks() {
			return this.projects.reduce((acc, cur) => acc + cur.tasks.length, 0);
		},
		genTableData() {
			let data = [
				{
					name: "Total Projects",
					value: this.total || 0,
				},
				{
					name: "In Progress",
					value: this.inProgress || 0,
				},
				{
					name: "On Hold",
					value: this.onHold || 0,
				},
				{
					name: "Completed",
					value: this.completed || 0,
				},
				{
					name: "Total Tasks",
					value: this.tasks || 0,
				},
			];

			return data;
		},
		genSummary() {
			let summary = [
				{
					name: "Completed Projects",
					icon: "fa-check-circle",
					color: "btn-success",
					value: this.completed,
				},
				{
					name: "Ongoing Projects",
					icon: "fa-arrow-circle-up",
					color: "btn-warning",
					value: this.inProgress,
				},
				{
					name: "On Hold",
					icon: "fa-hourglass-end",
					color: "btn-danger",
					value: this.onHold,
				},
			];
			return summary;
		},
	},
};
</script>

<style>
</style>