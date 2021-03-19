<template>
	<div>
		<h3 class="text-dark mb-3 font-weight-bold px-3">Recent Projcts</h3>
		<hr class="mt-0 mb-2" />
		<div class="row">
			<div class="col-xl-4 col-md-4">
				<button
					class="btn shadow-none text-white mx-0 rounded-0 font-weight-light text-sm btn-danger py-1 my-2"
				>
					On Hold
				</button>
				<div v-if="onhold.length > 0">
						<project-card v-for="project in onHold" :key="project.name" :data="project" :name="project.name" :startDate="project.startDate" :comments="project.comments.length" :files="project.files.length" :collaborators="project.collaborators"></project-card>
				</div><div v-else>
					<p class="text-sm">
						No projects on hold!
					</p>
				</div>
				
			</div>
			<div class="col-xl-4 col-md-4">
				<button
					class="btn shadow-none text-white mx-0 rounded-0 font-weight-light text-sm btn-warning py-1 my-2"
				>
					In Progress
				</button>
					<div v-if="inProgress.length > 0">
						<project-card v-for="project in inProgress" :key="project.name"  :data="project" :name="project.name" :startDate="project.startDate" :comments="project.comments.length" :files="project.files.length" :collaborators="project.collaborators"></project-card>
				</div><div v-else>
					<p class="text-sm">
						No projects in progress!
					</p>
				</div>
			</div>
			<div class="col-xl-4 col-md-4">
				<button
					class="btn shadow-none text-white mx-0 rounded-0 font-weight-light text-sm btn-success py-1 my-2"
				>
				Completed
				</button>
					<div v-if="completed.length > 0">
						<project-card v-for="project in onHold" :key="project.name"  :data="project" :name="project.name" :startDate="project.startDate" :comments="project.comments.length" :files="project.files.length" :collaborators="project.collaborators"></project-card>
				</div><div v-else>
					<p class="text-sm">
						No projects completed!
					</p>
				</div>
			</div>
		</div>
		<!-- <div class="card mb-3">
		<div class="card-header border-0">
			<div class="row align-items-center">
				<div class="col-auto py-2">
					<h3 class="mb-0">Recent Projects</h3>
				</div>
				<div class="col-auto py-2 ml-lg-auto d-flex">
					<div class="mr-2">
						<base-input class="mb-0">
							<select
								class="form-control text-primary bg-transparent border border-dark text-xs"
								v-model="project_filter"
							>
								<option
									v-for="filter in vSelectOption"
									:key="filter.code"
									:value="filter"
									:selected="filter.code == project_filter.code"
								>
									{{ filter.label }}
								</option>
							</select>
						</base-input>
					</div>
					<base-button size="sm" type="success" class="font-weight-normal ml-2"
						><i class="fas fa-plus"></i>
						<span class="btn-inner--text">Add new project</span></base-button
					>
				</div>
			</div>
		</div>

		<div
			class="table-responsive align-middle overflow-auto"
			style="min-height: 500px"
		>
			<base-table
				v-if="parsedProjects.length > 0"
				thead-classes=" text-capitalize"
				:data="parsedProjects"
			>
				<template slot="columns">
					<th class="col-2">Project Name</th>
					<th class="col-2">Status</th>
					<th class="col-2">Assigned to</th>
					<th class="col-1">Priority</th>
					<th class="col-2">Start Date</th>
					<th class="col-2">Tasks</th>
					<th class="col-1">Comments</th>
				</template>

				<template slot-scope="{ row }">
					<th scope="row" class="">
						{{ row.name }}
					</th>

					<td>
						<base-progress
							:label="status(row.status)[1]"
							class="py-2"
							:type="status(row.status)[0]"
							:height="3"
							:value="100"
							:show-percentage="false"
						></base-progress>
					</td>
					<td>
						<div class="avatar-group">
							<a
								v-for="assign in row.collaborators"
								:key="assign.toString()"
								class="avatar avatar-xs rounded-circle"
							>
								<img
									alt="Image placeholder"
									src="/img/theme/default-avatar.jpg"
								/>
							</a>
						</div>
					</td>
					<td>
						<base-button
							:type="priority(row.priority)"
							size="sm"
							block
							class="btn-footer text-xs font-weight-light shadow-none"
							>Priority</base-button
						>
					</td>
					<td>
						{{ new Date(row.startDate).toDateString() }}
					</td>
					<td class="text-muted text-center">
						<i class="far fa-comment-dots"></i> {{ row.tasks.length }}
					</td>
					<td class="text-muted text-center">
						<i class="far fa-comment-dots"></i> {{ row.comments.length }}
					</td>
				</template>
			</base-table>
			<div v-else class="px-4 py-3">
				<p>No projects found.</p>
			</div>
		</div>
	</div> -->
	</div>
</template>
<script>
import { taskStatus, projectStatus } from "../../../services/utils.service";
import { mapGetters } from "vuex";
import ProjectCard from "./ProjectCard.vue";
export default {
	components: { ProjectCard },
	name: "recent-projects",
	data() {
		return {
			vSelectOption: [
				{ label: "All Projects", code: "all" },
				{ label: "On Hold", code: projectStatus.onHold },
				{ label: "In Progress", code: projectStatus.inProgress },
				{ label: "Completed", code: projectStatus.completed },
			],
			details: null,
			project_filter: { label: "All Projects", code: "all" },
			dates: [
				{ start: new Date(2019, 5, 2), end: new Date(2019, 5, 18) },
				// { start: new Date(2018, 0, 15), span: 5 }, // # of days
			],

			columns: ["name", "tasks", "completed", "in_progress", "on_hold"],
			options: {
				sortable: [],
				perPage: 10,
				pagination: {
					chunk: 5,
				},
				texts: {
					filter: "",
					filterPlaceholder: "Search...",
					noResults: "No matching registrants",
					count:
						"Showing {from} to {to} of {count} registrants|{count} registrants|One registrant",
				},
				headings: {
					name: "Name",
					tasks: "All Tasks",
					completed: "Completed",
					in_progress: "In Progress",
					on_hold: "On Hold",
				},
			},
		};
	},

	methods: {
		handleRowClick(event) {
			this.details = this.parsedProjects.find((v) => v.id === event.row.id);
		},
		// eslint-disable-next-line no-unused-vars
		handleSectionClick(section, event) {
			console.log(`${section.label} clicked.`);
		},
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
	},
	computed: {
		...mapGetters("projects", ["projects"]),
		parsedProjects() {
			return this.projects
				.map((p) => ({
					id: p._id,
					name: p.name,
					description: p.description,
					status: p.status,
					collaborators: p.collaborators,
					files: p.files,
					tasks: p.tasks,
					teamLead: p.team_lead,
					startDate: new Date(p.start_date).toDateString(),
					comments: p.comments,
					creationDate: p.created_at,

					completed: p.tasks.filter((v) => v.status === taskStatus.completed)
						.length,
					in_progress: p.tasks.filter((v) => v.status === taskStatus.inProgress)
						.length,
					on_hold: p.tasks.filter((v) => v.status === taskStatus.onHold).length,
					data: p,
				}));
		},

		onhold(){
			return this.parsedProjects.filter((p) => p.status == 'ON_HOLD')
		},
		inProgress(){
			return this.parsedProjects.filter((p) => p.status == 'IN_PROGRESS')
		},completed(){
			return this.parsedProjects.filter((p) => p.status == 'COMPLETED')
		}

	},
	mounted() {
		console.log(this.parsedProjects);
	},
};
</script>
<style>
</style>
