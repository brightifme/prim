<template>
	<div class="card mb-3" style="height: calc(100vh - 150px); overflow: scroll">
		<card type="light" bodyClasses="py-3">
			<span>{{ parsedCollaborators.length }} of 15 Members Invited. </span>
			<span class="text-primary">Upgrade for more power and control.</span>
		</card>
		<div class="card-header border-0">
			<div class="d-flex align-items-center">
				<div class="col-auto py-2">
					<span>Team list</span>
				</div>
			</div>
		</div>

		<div
			class="table-responsive align-middle overflow-auto"
			style="min-height: 500px"
		>
			<base-table
				v-if="parsedCollaborators.length > 0"
				thead-classes=" text-capitalize bg-light"
				tbody-classes="bg-white"
				:data="parsedCollaborators"
			>
				<template slot="columns">
					<th class="col">Name</th>
					<th class="col">Email</th>
					<th class="col">Phone Number</th>
					<th class="col">Position</th>
					<th class="col">Status</th>
					<th class="col">Join Date</th>
					<th class="col">Projects</th>
				</template>

				<template slot-scope="{ row }">
					<td scope="row" class="">
						<div class="d-flex">
							<a href="#!" class="avatar avatar-sm my-auto">
								<img class="rounded" alt="Image placeholder" :src="row.img" />
							</a>
							<span class="my-auto ml-4">{{ row.name }}</span>
						</div>
					</td>
					<td class="">
			
							<span class="">{{ row.email }}</span>

					</td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</template>
			</base-table>
			<div v-else class="px-4 py-3">
				<p>No Collaborators found.</p>
			</div>
		</div>
	</div>
</template>
<script>

import { mapGetters } from "vuex";
export default {
	name: "recent-projects",
	methods: {
		onlyUnique(value, index, self) {
			return self.indexOf(value) === index;
		},
	},
	computed: {
		...mapGetters("projects", ["projects"]),
		parsedCollaborators() {
			let collaborators = [];

			for (const i in this.projects) {
				let projectCollaborators = this.projects[i].collaborators;
				console.log(projectCollaborators);
				for (const j in projectCollaborators) {
					collaborators.push(projectCollaborators[j]);
				}
			}
			return collaborators.filter(this.onlyUnique).map((c) => ({
				id: c._id,
				name: c.full_name,
				email: c.email,
				img: c.profile_img,
			}));
		},
		
	},
};
</script>
<style lang="scss" scoped>

.table thead th {
	text-transform: uppercase;
}
.filter {
	border-bottom: 2px solid #0062c4;
}
</style>
