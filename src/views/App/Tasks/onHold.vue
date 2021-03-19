<template>
	<div>
		<div class="card mb-3">
			<div v-if="data.length < 1" class="card-header">
				<h6 class="text-sm mb-1">No Tasks in progress.</h6>
			</div>
			<div v-if="data.length" class="card-body">
				<task-card
					v-for="{ item, index } in data"
					:key="index"
					@click.native="showTask(item)"
				></task-card>
			</div>
		</div>

		<modal
			:modalClasses="'modal-lg modal-dialog-scrollable modal-footer'"
			:modalContentClasses="'px-4  '"
			:bodyClasses="''"
			:footerClasses="'justify-content-between'"
			:show.sync="modals.show"
		>
			<template slot="header">
				<h3 class="modal-title my-auto">
					Development of a Native App (iOS standard)
				</h3>
			</template>
			<task-view></task-view>
		</modal>
	</div>
</template>

<script>
import taskCard from "./taskCard.vue";
import TaskView from "./taskView.vue";

export default {
	components: { taskCard, TaskView },
	data() {
		return {
			selectedTask: {},
			modals: {
				show: false,
			},
		};
	},
	methods: {
		showTask(e) {
			this.selectedTask = { name: e };
			this.openModal("show");
		},
		openModal(e) {
			this.modals[e] = true;
		},
	},
	props: {
		data: {
			type: Array,
			default: () => [1, 2, 3],
		},
	},
};
</script>

<style>
</style>