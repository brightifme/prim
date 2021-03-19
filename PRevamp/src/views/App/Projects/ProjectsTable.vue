<template>
	<div class="card mb-3" style="height: calc(100vh - 150px); overflow: scroll">
		<div class="card-header border-0">
			<div class="d-flex align-items-center">
				<div class="col-auto py-2">
					<base-button
						type="transparent"
						size="sm"
						class="shadow-none font-weight-light rounded-0"
						@click="changeFilter(filter)"
						:class="{ filter: project_filter.code == filter.code }"
						v-for="filter in vSelectOption"
						:key="filter.value"
						>{{ filter.label }}</base-button
					>
				</div>
				<!-- <div class="col mx-auto">
					<div class="col-md-6">
						<base-input
							class="form-control-sm"
							placeholder="Search"
						></base-input>
					</div>
				</div> -->
				<div class="col-auto py-2 ml-lg-auto d-flex">
					<base-button
						@click="openModal('createProject')"
						size="sm"
						type="success"
						class="font-weight-normal ml-2"
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
				:action="viewProject"
			>
				<template slot="columns">
					<th class="col">Project Name</th>
					<th class="col">Team Lead</th>
					<th class="col">Collaborators</th>
					<th class="col">Status</th>
					<th class="col">Start Date</th>
					<th class="col">Due Date</th>
					<th class="col">Files</th>
					<th class="col">Comments</th>
					<th class="col">Task</th>
					<th class="col options"></th>
				</template>

				<template slot-scope="{ row }">
					<th scope="row" class="">
						{{ row.name }}
					</th>
					<td>
						{{ row.teamLead }}
					</td>
					<td>
						<div class="avatar-group">
							<a
								v-for="{ collaborator, index } in row.collaborators"
								:key="index"
								class="avatar avatar-xs rounded-circle"
							>
								<img
									alt="Image placeholder"
									:src="
										collaborator
											? collaborator.profile_img
											: '/img/theme/default-avatar.jpg'
									"
								/>
							</a>
						</div>
					</td>
					<td>
						<base-progress
							:label="row.status"
							class="py-2"
							:type="status(row.status)"
							:height="3"
							:value="100"
							:show-percentage="false"
						></base-progress>
					</td>
					<td>
						{{ new Date(row.startDate).toDateString() }}
					</td>
					<td>
						{{ new Date(row.dueDate).toDateString() }}
					</td>
					<td><i class="far fa-paperclip"></i> {{ row.files.length }}</td>

					<td class="">
						<i class="far fa-comment-dots"></i> {{ row.comments.length }}
					</td>
					<td>
						{{ row.tasks.length }}
					</td>
					<td class="options">
						<base-dropdown
							class="my-auto"
							menuClasses=" dropdown-menu-right mx-3 text-xs"
						>
							<base-button
								slot="title"
								type="transparent"
								size="md"
								block
								class="btn-icon-only font-weight-light shadow-none"
								><i class="fa fa-ellipsis-v"></i
							></base-button>
							<a class="dropdown-item" @click="[viewProject(row)]"
								><i class="fas fa-copy text-primary"></i>Open Project</a
							>
							<a class="dropdown-item" href=""
								><i class="fas fa-copy text-primary"></i>Copy Link</a
							>
							<a class="dropdown-item" href=""
								><i class="fas fa-copy text-primary"></i>Rename</a
							>
							<a class="dropdown-item" @click="openModal('createTask', row.id)"
								><i class="fas fa-copy text-primary"></i>Add Task</a
							>
							<a class="dropdown-item text-danger" href=""
								><i class="fas fa-trash-alt"></i>Delete Project</a
							>
						</base-dropdown>
					</td>
				</template>
			</base-table>
			<div v-else class="px-4 py-3">
				<p>No projects found.</p>
			</div>
		</div>
		<modal
			:modalClasses="'modal-lg'"
			:modalContentClasses="'px-4 h-100vh-100 '"
			:bodyClasses="'overflow-scroll'"
			:show.sync="modals.viewProject"
		>
			<template slot="header">
				<h1
					class="modal-title display-4 text-dark my-auto"
					id="exampleModalLabel"
				>
					{{ selected.name }}
				</h1>
			</template>
			<template class="" slot="close-button">
				<div class="d-flex">
					<p class="my-auto text-uppercase text-default text-sm">
						Project Timer
					</p>
					<base-button
						size="md"
						type="success"
						class="font-weight-normal ml-2 shadow-none"
					>
						<span class="btn-inner--text p-1">Start</span></base-button
					>
					<base-button
						size="md"
						type="light"
						class="font-weight-normal ml-2 shadow-none"
					>
						<span class="btn-inner--text p-1 text-primary">2:45:50</span>
						<span class="p-1"
							><i class="fa fa-play-circle text-primary"></i
						></span>
						<span class="p-1"
							><i class="fa fa-stop-circle text-danger"></i
						></span>
					</base-button>
				</div>
			</template>
			<div class="mb-6">
				<h6 class="text-sm text-uppercase">Collaborators</h6>
				<div class="d-flex">
					<a
						v-for="{ assign, index } in selected.collaborators"
						:key="index"
						href="#"
						class="avatar avatar-sm mx-1 rounded-circle"
						data-toggle="tooltip"
						:data-original-title="assign"
					>
						<img
							alt="Image placeholder"
							:src="
								assign ? assign.profile_img : '/img/theme/default-avatar.jpg'
							"
						/>
					</a>
					<a href="#" class="avatar avatar-sm mx-1 rounded-circle">
						<i class="fa fa-plus"></i>
					</a>
				</div>
				<div class="align-content-center d-flex my-4">
					<div class="col-auto px-auto">
						<p class="text-xs mb-0 text-uppercase">Status</p>
						<base-button
							class="px-2 py-1 font-weight-light text-sm text-capitalize rounded-0"
							:type="status(selected.status)"
						>
							<i class="ni ni-bag-17 mr-2"></i>{{ selected.status }}
						</base-button>
					</div>
					<div class="col-auto px-auto">
						<p class="text-xs mb-0 text-uppercase">Due date</p>
						<base-button
							class="px-0 py-1 font-weight-light text-sm rounded-0"
							type="transparent"
						>
							<i class="text-danger far fa-calendar-alt mr-2"></i>15 Mar at
							17:00
						</base-button>
					</div>

					<div class="col-auto px-auto">
						<p class="text-xs mb-0 text-uppercase">Project Time</p>
						<base-button
							class="px-0 py-1 font-weight-light text-sm rounded-0"
							type="transparent"
						>
							<i class="text-danger far fa-clock mr-2"></i>20hrs 40mins
						</base-button>
					</div>
					<div class="col-auto px-auto">
						<p class="text-xs mb-0 text-uppercase">Collaborator's Time</p>
						<base-button
							class="px-0 py-1 font-weight-light text-sm rounded-0"
							type="transparent"
						>
							<i class="text-danger far fa-clock mr-2"></i>2hrs 15mins
						</base-button>
					</div>
				</div>
			</div>
			<div class="mb-6">
				<h6 class="text-sm text-uppercase">
					Description
					<base-button
						class="px-2 py-1 mx-3 font-weight-light text-xs rounded-0"
						type="light"
					>
						Edit <i class="fa fa-pen mr-2"></i>
					</base-button>
				</h6>
				<base-input>
					<textarea
						class="form-control"
						id="description"
						:value="selected.description"
						rows="3"
					></textarea>
				</base-input>
			</div>
			<div class="mb-6 d-flex">
				<h6 class="text-sm text-uppercase">
					Attachment(S)
					<base-button
						class="px-2 py-1 mx-3 font-weight-light text-xs rounded-0"
						type="light"
					>
						<i class="fa fa-paperclip mr-2"> </i>
						{{ selected.files ? selected.files.length : 0 }}
					</base-button>
				</h6>
				<h6 class="text-sm text-uppercase d-flex">
					Comment(S)
					<base-button
						class="px-2 py-1 mx-3 font-weight-light text-xs rounded-0"
						type="light"
					>
						<i class="far fa-comment my-auto mx-2"></i>
						{{ selected.comments ? selected.comments.length : 0 }}
					</base-button>
				</h6>
			</div>
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
				<div v-if="selected.tasks ? selected.tasks.length > 0 : false">
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
						v-for="{ task, index } in selected.tasks"
						:key="task"
						class="mb-3"
						v-model="selected.tasks[index]"
					>
						Create a landing for the course launch {{ index }}
					</base-checkbox>
				</div>
				<div v-else>
					<p class="text-primary">No Current tasks</p>
				</div>
			</div>

			<div class="mb-6 d-flex">
				<button
					class="btn btn-primary ml-auto"
					@click="getProject(selected.id)"
				>
					View Project Details
				</button>
			</div>
		</modal>
		<modal
			:modalClasses="'modal-lg'"
			:modalContentClasses="'px-4 h-100vh-100 '"
			:bodyClasses="'overflow-scroll'"
			:footerClasses="'justify-content-between'"
			:show.sync="modals.createProject"
		>
			<template slot="header">
				<h3 class="modal-title my-auto" id="exampleModalLabel">
					Create New Project
				</h3>
			</template>

			<div class="row">
				<div class="col-md-8">
					<base-input
						label="Project Name"
						placeholder="Enter a name..."
						inputClasses="text-xs"
						:input="newProj.name"
					/>
					<base-input label="Description">
						<textarea
							class="form-control"
							id="exampleFormControlTextarea3"
							rows="3"
							placeholder="Add a more detailed description..."
							:input="newProj.description"
						></textarea>
					</base-input>
					<base-input
						label="Client’s name"
						placeholder=""
						inputClasses="text-xs"
						:input="newProj.client_name"
					/>
					<div class="mb-2">
						<p class="text-sm">Who can edit this project details</p>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							value="WORKSPACE_OWNER"
							v-model="newProject.project_editors"
						>
							Admin
						</base-checkbox>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							v-model="newProject.editRights.teamLeader"
						>
							Team Leader
						</base-checkbox>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							v-model="newProject.editRights.everyone"
						>
							Everyone
						</base-checkbox>
					</div>
					<div class="mb-2">
						<p class="text-sm">Choose who can add task to this project</p>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							v-model="newProject.taskRights.admin"
						>
							Admin
						</base-checkbox>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							v-model="newProject.taskRights.teamLeader"
						>
							Team Leader
						</base-checkbox>
						<base-checkbox
							class="text-sm form-control-light form-control-sm"
							v-model="newProject.taskRights.everyone"
						>
							Everyone
						</base-checkbox>
					</div>
				</div>
				<div class="col">
					<p class="text-uppercase mb-0">Add to this Project</p>

					<base-dropdown class="btn-block" menuClasses="w-100 p-2">
						<base-button
							slot="title"
							type="light"
							class="shadow-none p-2 border border-dark text-left font-weight-400"
							block
							><i class="fa fa-users mx-3"></i>Collaborators</base-button
						>

						<base-input
							alternative
							placeholder="Search members"
							append-icon="fa fa-search"
						></base-input>
						<div class="d-flex align-items-center my-1">
							<a href="#" class="avatar avatar-sm rounded-circle">
								<img
									alt="Image placeholder"
									src="/img/theme/team-2-800x800.jpg"
								/>
							</a>

							<h4 class="mb-0 ml-1">
								<a>@Primus aghna</a>
								<p class="text-xs text-muted mb-0">Primus aghna</p>
							</h4>

							<button
								type="button"
								class="btn btn-sm btn-icon-only btn-transparent ml-auto"
							>
								<i class="fa fa-times text-danger"></i>
							</button>
						</div>
					</base-dropdown>
					<base-dropdown class="btn-block" menuClasses="w-100 p-2">
						<base-button
							slot="title"
							type="light"
							class="shadow-none p-2 border border-dark text-left font-weight-400"
							block
							><i class="fa fa-users mx-3"></i>Team leader</base-button
						>

						<base-input
							alternative
							placeholder="Search members"
							append-icon="fa fa-search"
						></base-input>
						<div class="d-flex align-items-center">
							<a href="#" class="avatar avatar-sm rounded-circle">
								<img
									alt="Image placeholder"
									src="/img/theme/team-2-800x800.jpg"
								/>
							</a>

							<h4 class="mb-0 ml-1">
								<a>@Primus aghna</a>
								<p class="text-xs text-muted mb-0">Primus aghna</p>
							</h4>

							<button
								type="button"
								class="btn btn-sm btn-icon-only btn-transparent ml-auto"
							>
								<i class="fa fa-times text-danger"></i>
							</button>
						</div>
					</base-dropdown>

					<base-dropdown class="btn-block" menuClasses="w-100 p-2">
						<base-button
							slot="title"
							type="light"
							class="shadow-none p-2 border border-dark text-left font-weight-400"
							block
							><i class="far fa-clock mx-3"></i
							>{{ newProject.startDate || "Start Date" }}</base-button
						>
						<base-input addon-left-icon="ni ni-calendar-grid-58">
							<flat-picker
								slot-scope="{ focus, blur }"
								@on-open="focus"
								@on-close="blur"
								:config="{ allowInput: true }"
								class="form-control datepicker"
								v-model="newProject.startDate"
							>
							</flat-picker>
						</base-input>
					</base-dropdown>
					<base-dropdown class="btn-block" menuClasses="w-100 p-2">
						<base-button
							slot="title"
							type="light"
							class="shadow-none p-2 border border-dark text-left font-weight-400"
							block
							><i class="far fa-clock mx-3"></i>
							{{ newProject.dueDate || "Due Date" }}</base-button
						>
						<base-input addon-left-icon="ni ni-calendar-grid-58">
							<flat-picker
								slot-scope="{ focus, blur }"
								@on-open="focus"
								@on-close="blur"
								:config="{ allowInput: true }"
								class="form-control datepicker"
								v-model="newProject.dueDate"
							>
							</flat-picker>
						</base-input>
					</base-dropdown>
					<base-button
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="fa fa-paperclip mx-3"></i>Attachment</base-button
					>
					<base-button
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="fa fa-stopwatch mx-3"></i>Set Project Time</base-button
					>
					<base-button
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="fa fa-tasks mx-3"></i>Add Task</base-button
					>
				</div>
			</div>
			<template slot="footer">
				<base-checkbox
					class="text-xs form-control-light form-control-sm"
					v-model="newProject.notify"
				>
					Notify collaborators
				</base-checkbox>
				<base-button
					@click="
						[
							(modals.createProject = false),
							$notify({
								type: 'success',
								message: 'Successfully created',
								icon: 'fa fa-check-circle',
							}),
						]
					"
					type="success"
					>Create Project</base-button
				>
			</template>
		</modal>
		<modal
			:modalClasses="'modal-md'"
			:modalContentClasses="'px-4  '"
			:bodyClasses="''"
			:footerClasses="'justify-content-between'"
			:show.sync="modals.createTask"
		>
			<template slot="header">
				<h3 class="modal-title my-auto" id="exampleModalLabel">
					Create New Task
				</h3>
			</template>

			<new-task :id="newTask.project"></new-task>
		</modal>
	</div>
</template>
<script>

import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
// eslint-disable-next-line no-unused-vars
import { taskStatus, projectStatus } from "../../../services/utils.service";
import { mapGetters } from "vuex";
import NewTask from './newTask.vue';
export default {
	name: "recent-projects",
	components: {
		flatPicker,
NewTask,

	},
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
			modals: {
				viewProject: false,
				createProject: false,
				createTask: false,
			},
			selected: {},
			newProj: {
				name: "Apple Glass Test Phase",
				workspace: "7w4rsacdsdaeszdwedszxcas",
				client_name: "Apple Inc.",
				description: "Prelaunch Test for apple virtual reality glasses",
				collaborators: ["asadewerx43ecdfr43fcxzde23s"],
				project_lead: "asadewerx43ecdfr43fcxzde23s",
				end_date: "2020-12-12T12:30:12.000Z",
				project_editors: ["WORKSPACE_OWNER", "PROJECT_MANAGER"],
				task_creators: ["WORKSPACE_OWNER", "PROJECT_MANAGER"],
			},
			newProject: {
				name: "",
				description: "",
				clientName: "",
				editRights: {
					admin: false,
					teamLeader: false,
					everyone: false,
				},
				taskRights: {
					admin: false,
					teamLeader: false,
					everyone: false,
				},
				collaborators: [],
				teamLead: "",
				duration: "",
				startDate: "",
				dueDate: "",
				projectTime: "",
				notify: false,
			},
			newTask: {
				project: "",
			},
		};
	},
	methods: {
		getProject(id) {
			this.$store.dispatch("projects/getProject", id);
			this.$router.push(`/account/project/${id}`);
		},
		openModal(e, f) {
			this.modals[e] = true;
			this.newTask.project = f;
		},
		viewProject(e) {
			this.selected = e;
			this.openModal("viewProject");
		},
		status(e) {
			switch (e) {
				case "IN_PROGRESS":
					return "warning";
				case "ON_HOLD":
					return "danger";
				case "COMPLETED":
					return "success";
				case "ACTIVE":
					return "success";
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
		changeFilter(e) {
			this.project_filter = e;
		},
		createTask(){
			console.log(this.newTask)
		}
	},
	computed: {
		...mapGetters("projects", ["projects"]),
		parsedProjects() {
			return this.projects
				.filter((p) => {
					if (this.project_filter.code === "all") {
						return true;
					} else {
						return p.status === this.project_filter.code;
					}
				})
				.map((p) => ({
					id: p._id,
					name: p.name,
					description: p.description,
					status: p.status,
					collaborators: p.collaborators,
					files: p.files,
					tasks: p.tasks,
					teamLead: p.project_lead.full_name,
					dueDate: p.end_date,
					startDate: p.start_date,
					comments: p.comments,
					creationDate: p.created_at,
					projectEditors: p.project_editors,
					taskCreators: p.task_creators,
					clientName: p.client_name,

					data: p,
				}));
		},
		sections() {
			const data = [
				{
					label: "Completed",
					value: (this.details.completed / (this.details.tasks || 1)) * 100,
					color: "#00BF58",
				},
				{
					label: "In Progress",
					value: (this.details.in_progress / (this.details.tasks || 1)) * 100,
					color: "#FFD035",
				},
				{
					label: "On Hold",
					value: (this.details.on_hold / (this.details.tasks || 1)) * 100,
					color: "#FF5353",
				},
			];
			return data;
		},
	},
};
</script>
<style lang="scss" scoped>
.table td.options,
.table th.options {
	background: white;
	padding: 0;
}
.table thead th {
	text-transform: uppercase;
}
.filter {
	border-bottom: 2px solid #0062c4;
}

// .table thead th {
// 	text-transform: capitalize;
// 	font-weight: 400;
// 	letter-spacing: 0px;
// }

// .table td,
// .table th {
// 	vertical-align: middle !important ;
// }

// .card .table tbody tr {
// 	background: #f5f5f5;
// 	border: 4px solid white;
// }
// .card .table td,
// .card .table th {
// 	padding: 0.5rem 1rem;
// 	font-size: 0.65rem;
// 	font-weight: 300;
// }
</style>
