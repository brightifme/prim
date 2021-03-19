<template>
	<div class="card mb-3">
		<div v-if="data.length < 1" class="card-header">
			<h6 class="text-sm mb-1">No Tasks in progress.</h6>
		</div>
		<div v-if="data.length" class="card-body">
			<task-card v-for="{ item, index } in data" :key="index"></task-card>
		</div>
	</div>
</template>

<script>
import taskCard from "./taskCard.vue";
export default {
	components: { taskCard },
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