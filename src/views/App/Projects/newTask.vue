<template>
	<div class="row">
		<div class="col-md-12">
			<base-input
				label="Task Title"
				placeholder="Enter a name..."
				inputClasses=""
				v-model="newTask.name"
			/>
			<base-input label="Description">
				<textarea
					class="form-control"
					id="exampleFormControlTextarea3"
					rows="3"
					placeholder="Add a more detailed description..."
					v-model="newTask.description"
				></textarea>
			</base-input>
			<base-input
				label="Client’s name"
				placeholder=""
				inputClasses=""
				v-model="newTask.clientName"
			/>
			<p class="text-uppercase mb-0">Add to this Project</p>
			<div class="row">
				<base-dropdown class="col-md-6 pr-1 py-1" menuClasses="w-100 p-2">
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

				<base-dropdown class="col-md-6 pl-1 py-1" menuClasses="w-100 p-2">
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

				<base-dropdown class="col-md-6 pr-1 py-1" menuClasses="w-100 p-2">
					<base-button
						slot="title"
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="far fa-clock mx-3"></i
						>{{ newTask.startDate || "Start Date" }}</base-button
					>
					<base-input addon-left-icon="ni ni-calendar-grid-58">
						<flat-picker
							slot-scope="{ focus, blur }"
							@on-open="focus"
							@on-close="blur"
							:config="{ allowInput: true }"
							class="form-control datepicker"
							v-model="newTask.startDate"
						>
						</flat-picker>
					</base-input>
				</base-dropdown>
				<base-dropdown class="col-md-6 pl-1 py-1" menuClasses="w-100 p-2">
					<base-button
						slot="title"
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="far fa-clock mx-3"></i>
						{{ newTask.dueDate || "Due Date" }}</base-button
					>
					<base-input addon-left-icon="ni ni-calendar-grid-58">
						<flat-picker
							slot-scope="{ focus, blur }"
							@on-open="focus"
							@on-close="blur"
							:config="{ allowInput: true }"
							class="form-control datepicker"
							v-model="newTask.dueDate"
						>
						</flat-picker>
					</base-input>
				</base-dropdown>
				<base-dropdown class="col-md-6 pr-1 py-1" menuClasses="w-100 p-2">
					<base-button
						slot="title"
						type="light"
						class="shadow-none p-2 border border-dark text-left font-weight-400"
						block
						><i class="fa fa-paperclip mx-3"></i>Attachment</base-button
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
			</div>
			<div class="d-flex">
				<base-checkbox
					class="text-xs form-control-light form-control-sm"
					v-model="newTask.notify"
				>
					Notify collaborators
				</base-checkbox>
				<base-button
					class="ml-auto"
					@click="
						[
							createTask(),
							$notify({
								type: 'success',
								message: 'Successfully created',
								icon: 'fa fa-check-circle',
							}),
						]
					"
					type="success"
					>Create Task</base-button
				>
			</div>
		</div>
	</div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
export default {
	components: {
		flatPicker,
	},
	data() {
		return {
			newTask: {
				name: "",
				priority: "",
				description: "",
				assigned_to: [""],
				project: "",
				end_date: "",
				status: "IN_PROGRESS",
			},
		};
	},
	methods: {
		createTask() {
			this.newTask.project = this.id;
			console.log(this.newTask);
		},
		props: {
			id: {
				type: String,
			},
		},
	},
	created() {
		console.log(this.id);
	},
};
</script>

<style>
</style>