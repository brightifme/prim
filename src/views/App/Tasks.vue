<template>
	<div class="container-fluid pb-8 pt-5">
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-5 mb-xl-0 h-100">
					<h3 class="text-dark mb-3 font-weight-bold px-3">My Tasks</h3>
        <workspac-card></workspac-card>
			</div>
			<div class="col-xl-4 col-md-4">
				<h3 class="text-dark mb-3 font-weight-bold px-3">On Hold</h3>
				<on-hold :data="[1, 2]"></on-hold>
			</div>
			<div class="col-xl-4 col-md-4">
				<h3 class="text-dark mb-3 font-weight-bold px-3">In Progress</h3>
				<in-progress :data="[]"></in-progress>
			</div>
			<div class="col-xl-4 col-md-4">
				<h3 class="text-dark mb-3 font-weight-bold px-3">Completed</h3>
				<completed :data="[1,2,3,4]"></completed>
			</div>
		</div>
	</div>
</template>

<script>
import Completed from './Tasks/completed.vue'
import InProgress from './Tasks/inProgress.vue'
import OnHold from './Tasks/onHold.vue'
import workspacCard from './Tasks/workspacCard.vue'
export default {
	components: { workspacCard, OnHold, Completed, InProgress },

	computed: {
		name() {
			return this.data 
		}
	},

}
</script>

<style>

</style>