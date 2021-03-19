<template>
	<div class="container-fluid pb-8 pt-5">
		<div class="card mb-3">
			<div class="card-body px-5">
				<div class="mt-4 mb-4">
					<h1 class="display-3 font-weight-800 text-dark my-auto">
						{{ parsedProject ? parsedProject.name : "Null Null Null" }}
					</h1>
				</div>

				<div class="row">
					<div class="col-md-8">
						<div class="mb-4">
							<h6 class="text-sm text-uppercase">Collaborators</h6>
							<div class="d-flex">
								<a
									v-for="{ assign, index } in collaborators"
									:key="index"
									href="#"
									class="avatar avatar-sm mx-1 rounded-circle"
									data-toggle="tooltip"
									:data-original-title="assign"
								>
									<img
										alt="Image placeholder"
										src="/img/theme/default-avatar.jpg"
									/>
								</a>
								<a href="#" class="avatar avatar-sm mx-1 rounded-circle">
									<i class="fa fa-plus"></i>
								</a>
							</div>

							<div class="d-md-flex py-3">
								<div class="">
									<p class="dropdown-toggle text-xs text-uppercase mb-1 mx-1">
										Status
									</p>
									<base-button
										:type="
											parsedProject
												? status(parsedProject.status)[0]
												: 'transparent'
										"
										class="mx-1 shadow-none"
										size="sm"
										icon="pti-in-progress-o pti-lg"
									>
										{{
											parsedProject
												? status(parsedProject.status)[1]
												: "No Status"
										}}</base-button
									>
								</div>
								<div class="">
									<p class="text-xs text-uppercase mb-1 mx-1">Due date</p>
									<base-button
										type="transparent"
										class="mx-1 shadow-none"
										size="sm"
										icon="pti-calendar-time-o pti-lg text-danger"
										>{{
											parsedProject
												? dueDate(parsedProject.end_date)
												: dueDate(new Date().toUTCString())
										}}</base-button
									>
								</div>
								<div class="">
									<p class="text-xs text-uppercase mb-1 mx-1">Project Time</p>
									<base-button
										type="transparent"
										class="mx-1 shadow-none"
										size="sm"
										icon="pti-time-o pti-lg text-danger"
										>20hrs 40mins</base-button
									>
								</div>
								<div class="">
									<p class="dropdown-toggle text-xs text-uppercase mb-1 mx-1">
										Collaborator’s Time
									</p>
									<base-button
										type="transparent"
										class="mx-1 shadow-none"
										size="sm"
										icon="pti-time-o pti-lg text-danger"
										>2hrs 15mins</base-button
									>
								</div>
							</div>
						</div>
						<div class="mb-4">
							<h6 class="text-sm text-uppercase">
								Description
								<base-button
									class="px-2 py-1 mx-3 font-weight-light text-xs rounded-0"
									type="light"
								>
									Edit <i class="fa fa-pen mr-2"></i>
								</base-button>
							</h6>
							<base-input style="max-width: 450px">
								<textarea
									class="form-control bg-light"
									id="description"
									:value="parsedProject.description"
									rows="3"
								></textarea>
							</base-input>
						</div>
						<div class="mb-4">
							<h6 class="text-sm text-uppercase">
								Attachment(S)
								<base-button
									class="px-2 py-1 mx-3 font-weight-light shadow-none text-xs rounded-0"
									type="light"
								>
									<i class="fa fa-paperclip mr-2"> </i> 3
								</base-button>
							</h6>
						</div>
					</div>
					<div class="col-md-4">
						<div class="mb-6">
							<h6 class="text-sm text-uppercase d-flex">
								TASK(S) <i class="fa fa-check-square my-auto mx-3"></i>
								<div class="ml-auto">
									<base-button
										class="px-2 py-1 mx-1 font-weight-light text-xs rounded-0"
										type="light"
									>
										Add a Task
									</base-button>
									<base-button
										class="px-2 py-1 mx-1 font-weight-light text-xs rounded-0"
										type="light"
									>
										Delete
									</base-button>
								</div>
							</h6>
							<div v-if="parsedProject.tasks.length > 0">
								<base-progress
									show-label
									type="primary"
									:height="5"
									:value="0"
									percentage
									class="pt-0"
								>
								</base-progress>
								<base-checkbox
									v-for="{ task, index } in parsedProject.tasks"
									:key="task"
									class="mb-3"
									v-model="parsedProject.tasks[index]"
								>
									Create a landing for the course launch {{ index }}
								</base-checkbox>
							</div>
							<div v-else>
								<p class="text-primary">No Current tasks</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { taskStatus, projectStatus } from "../../services/utils.service";
import { mapGetters } from "vuex";
export default {
	methods: {
		status(e) {
			switch (e) {
				case "IN_PROGRESS":
					return ["warning", "In Progress"];
				case "ON_HOLD":
					return ["danger", "On Hold"];
				case "COMPLETED":
					return ["success", "Completed"];
				case "ACTIVE":
					return ["success", "Active"];
			}
		},
		priority(e) {
			switch (e) {
				case "High":
					return "warning";
				case "Medium":
					return "info";
				case "Low":
					return "success";
			}
		},
		dueDate(e) {
			// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
			const monthNamesAbb = [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Aug",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			];
			let date = new Date(e);
			let result =
				date.getDate() +
				" " +
				monthNamesAbb[date.getMonth()] +
				" at " +
				date.getUTCHours() +
				":" +
				(date.getMinutes() < 10 ? "0" : "") +
				date.getMinutes();

			return result;
		},
	},
	computed: {
		...mapGetters("projects", ["currentproject"]),
		parsedProject() {
			return this.currentproject;

			// map((p) => ({
			// 	id: p._id,
			// 	name: p.name,
			// 	description: p.description,
			// 	status: p.status,
			// 	collaborators: p.collaborators,
			// 	files: p.files,
			// 	tasks: p.tasks,
			// 	teamLead: p.project_lead.full_name,
			// 	dueDate: p.end_date,
			// 	startDate: p.start_date,
			// 	comments: p.comments,
			// 	creationDate: p.created_at,
			// 	projectEditors: p.project_editors,
			// 	taskCreators: p.task_creators,
			// 	clientName: p.client_name,

			// 	data: p,
			// }));
		},
		exists() {
			return this.$store.state.project.currentproject;
		},
		collaborators() {
			return this.parsedProject ? this.parsedProject.collaborators : [];
		},
	},
	created() {
		console.log(this.currentproject);
		this.$store.dispatch("projects/getProject", this.$route.params.id);
	},
};
</script>


<style>
</style>