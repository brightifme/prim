<template>
	<div class="">
		<h3 class="text-dark mb-3 font-weight-bold px-3">My Projects</h3>
		<div class="row mx-0">
			<div v-for="summary in genSummary" :key="summary.name" class=" col-auto card px-0 my-3 mb-5 mx-2" style="background: #97979733">
				<div class="card-body p-2">
					<div class="row align-items-center">
						<div class="col-auto ">
							<!-- Avatar -->
							<button
								type="button"
								class="btn btn-sm btn-lg shadow-none" :class="summary.color"
								style="width: 50px; height: 50px"
							>
								<i class="fa fa-2x" :class="summary.icon"></i>
							</button>
						</div>
						<div class="col ml--2">
							<h3 class=" mb-0">{{summary.name}}</h3>
						</div>
						<div class="col-auto mr-3">
							<h3 class=" mb-0">{{ summary.value }}</h3>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="card mb-3">
		<div class="card-header border-0">
			<div class="row align-items-center">
				<div class="col">
					<h3 class="mb-0" style="font-size: 18px">Project Overview</h3>
				</div>
				<div class="col text-right">
					<p class="mb-0 small">{{ new Date().toDateString() }}</p>
				</div>
			</div>
		</div>

		<div class="card-body">
			<div class="row align-items-center">
				<div class="col-md">
					<div class="row mx-0">
						<div
							class="m-2 col-4 col-md px-0"
							v-for="data in genTableData"
							:key="data.name"
						>
							<p class="lead my-0 font-weight-600">{{ data.value }}</p>
							<p class="mb-0 my--1" style="font-size: 13px">
								<small>{{ data.name }}</small>
							</p>
						</div>
					</div>
				</div>
				<div class="col-md-auto text-right py-3">
					<base-button
						type="transparent"
						class="mx-1 shadow-none"
						size="sm"
						icon="fas fa-bars text-default"
					></base-button>
					<base-button
						type="transparent"
						class="mx-1 shadow-none"
						size="sm"
						icon="fas fa-th-large text-default"
					></base-button>
				</div>
			</div>
		</div>
	</div> -->
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import { projectStatus } from "../../../services/utils.service";
export default {
	name: "project-overview",
	data() {
		return {};
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
			];
			return summary;
		},
	},
	methods: {},
};
</script>
<style>
</style>
