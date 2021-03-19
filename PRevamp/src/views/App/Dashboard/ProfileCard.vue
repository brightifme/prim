<template>
	<div class="card mb-3">
		<div class="card-header border-0">
			<div class="row align-items-center">
				<div class="col">
					<h3 class="mb-0" style="font-size: 18px">My Portfolio</h3>
				</div>
			</div>
		</div>

		<div class="card-body">
			<div class="align-items-center mb-3">
				<h4 class="mx-1">
					<i class="fa fa-paper-plane"></i> Project Statistics
				</h4>
				<base-progress
					show-label
					type="success"
					:height="3"
					:value="70"
					label="Completed"
					class="pt-0 my-4"
					:showLabel="false"
				></base-progress>
			</div>

			<div class="d-flex align-items-center mb-3">
				<h4 class="mx-1 col">
					<span class="text-xs font-weight-200 text-uppercase"
						>project time</span
					>
					<h1 class="lead font-weight-600 my-0">02:45:32</h1>
				</h4>

				<div class="col-auto">
					<div class="d-flex">
						<i class="fa fa-2x mx-1 fa-play-circle text-success"></i>
						<i class="fa fa-2x mx-1 fa-pause-circle text-danger"></i>
					</div>
				</div>
			</div>

			<div class="d-flex align-items-center mb-3">
				<h4 class="col-auto my-auto">
					<span class="text-xs font-weight-200 text-uppercase">Completed</span>
					<h1 class="lead font-weight-600 my-0">{{ completed }}</h1>
				</h4>

				<h4 class="col-auto my-auto">
					<span class="text-xs font-weight-200 text-uppercase">Ongoing</span>
					<h1 class="lead font-weight-600 my-0">{{ inProgress }}</h1>
				</h4>

				<h4 class="col-auto my-auto">
					<span class="text-xs font-weight-200 text-uppercase">On Hold</span>
					<h1 class="lead font-weight-600 my-0">{{ onHold }}</h1>
				</h4>
			</div>

			<div class="align-items-center mb-3">
				<div class="card">
					<div class="card-body">
						<div class="d-flex">
							<div class="">
								<!-- Avatar -->
								<a href="#" class="avatar avatar-xl rounded-circle">
									<img
										alt="Image placeholder"
										:src="
											user.profile_img
												? user.profile_img
												: '/img/theme/default-avatar.jpg'
										"
									/>
								</a>
							</div>
						</div>
						<h1 class="mb-0">{{ user.full_name }}</h1>
						<!-- <p class="text-sm mb-0">Lagos, Nigeria</p> -->
						<h5><i class="fa fa-envelope mr-1"></i>{{ user.email }}</h5>
					</div>
				</div>

				<div class="d-flex my-4">
					<base-button type="primary" class="shadow-none mx-auto"
						>View full Profile <i class="fa fa-chevron-right"></i
					></base-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import {
	projectStatus,
	taskStatus,
	userRoles,
} from "../../../services/utils.service";
export default {
	name: "profile-card",
	data() {
		return {
			dates: [],
		};
	},
	computed: {
		...mapGetters("auth", ["user"]),
		currentWorkspace() {
			return this.user.workspaces?.find((v) => v.is_default) ?? {};
		},
		currentRole() {
			return userRoles[this.currentWorkspace.role];
		},
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
		tasksCompleted() {
			// console.log(this.project.reduce((acc,cur) => [...acc, ...cur.tasks], []))
			return this.projects
				.reduce((acc, cur) => [...acc, ...cur.tasks], [])
				.filter((p) => p.status === taskStatus.completed).length;
		},
	},
	created() {},
	mounted() {
		console.log(this.projects);
		console.log(this.user);
	},
};
</script>

<style>
</style>
<style lang="scss" scoped>
.lead {
	font-size: 1rem;
}
</style>