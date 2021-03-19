<template>

		<div class="container-fluid pb-8 pt-5">
			<div class="row">
				<div class="col-xl-8 col-md-8 mb-5 mb-xl-0 h-100">
					<overview></overview>
					<recent-projects></recent-projects>
				</div>

				<div class="col-xl-4 col-lg-4 col-md-12 col-12 h-100">
					<profile-card></profile-card>
				</div>
			</div>
		</div>

</template>
<script>


// Tables
import RecentProjects from "./Dashboard/RecentProjects";
import Overview from "./Dashboard/Overview";
import ProfileCard from "./Dashboard/ProfileCard.vue";

export default {
	components: {
		RecentProjects,
		Overview,
		ProfileCard,
	},

};
</script>
<style></style>
