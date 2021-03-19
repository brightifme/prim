<template>
	<div class="container-fluid pb-8 pt-5">
		<div class="row">
			<div class="col-xl-12 col-md-12 mb-5 mb-xl-0 h-100">
				<projects-table></projects-table>
			</div>
		</div>
	</div>
</template>
<script>
import ProjectsTable from "./Projects/ProjectsTable.vue";

// Tables

export default {
	components: {
		ProjectsTable,
	},
};
</script>
<style></style>
