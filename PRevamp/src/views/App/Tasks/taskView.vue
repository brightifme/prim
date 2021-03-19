<template>
	<div>
		<div class="mb-5">
			<h6 class="text-sm text-uppercase font-weight-700 mb-3">Collaborators</h6>
			<div class="d-flex mb-3">
				<a class="avatar avatar-sm mx-1 rounded-circle">
					<img alt="Image placeholder" src="/img/theme/default-avatar.jpg" />
				</a>
				<a class="avatar avatar-sm mx-1 rounded-circle">
					<img alt="Image placeholder" src="/img/theme/default-avatar.jpg" />
				</a>
				<a class="avatar avatar-sm mx-1 rounded-circle">
					<img alt="Image placeholder" src="/img/theme/default-avatar.jpg" />
				</a>
				<a class="avatar avatar-sm mx-1 rounded-circle">
					<i class="fa fa-plus text-white"></i>
				</a>
			</div>
			<div class="d-flex mb-3">
				<div class="col-md-auto px-2">
					<p class="dropdown-toggle text-xs text-uppercase mb-1 mx-1">Status</p>
					<base-button
						type="warning"
						class="mx-1 px-1 shadow-none rounded-0"
						size="sm"
						icon="pti-in-progress-o"
						>In progress</base-button
					>
				</div>
				<div class="col-md-auto px-2">
					<p class="text-xs text-uppercase mb-1 mx-1">Due date</p>
					<base-button
						type="transparent"
						class="mx-1 shadow-none "
						size="sm"
						icon="pti-calendar-time-o pti-lg text-danger"
						>15 Mar at 17:00</base-button
					>
				</div>
				<div class="col-md-auto px-2">
					<p class="text-xs text-uppercase mb-1 mx-1">Priority</p>
					<base-button type="warning" class="mx-1 shadow-none rounded-0" size="sm"
						>High</base-button
					>
				</div>
				<div class="col-md-auto px-2">
					<p class="text-xs text-uppercase mb-1 mx-1">Project Time</p>
					<base-button
						type="transparent"
						class="mx-1 shadow-none"
						size="sm"
						icon="pti-time-o pti-lg text-danger"
						>20hrs 40mins</base-button
					>
				</div>
				<div class="col-md-auto px-2">
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

		<div class="mb-5">
			<h6 class="text-sm text-uppercase font-weight-700 mb-3">
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
					class="form-control bg-light"
					id="description"
					rows="3"
				></textarea>
			</base-input>
		</div>
		<div class="mb-5">
			<h6 class="text-sm text-uppercase font-weight-700 mb-3">
				Attachment(S)
				<span>
					<i class="fa fa-paperclip ml-2"> </i>
					{{ selected ? selected.files.length : 0 }}
				</span>
			</h6>
		</div>
		<div class="mb-5">
			<h6 class="text-sm text-uppercase d-flex font-weight-700 mb-3">
				Comment(S)
				<span>
					<i class="far fa-comment my-auto ml-2"></i>
					{{ selected ? selected.comments.length : 0 }}</span
				>
			</h6>

			<div v-if="comments.length < 1">
				<h6 class="text-sm mb-1">No Comments</h6>
			</div>
			<div v-if="comments.length">
				<task-comment
					v-for="{ item, index } in comments"
					:key="index"
				></task-comment>
					<base-input style="max-width: 450px">
				<textarea
					class="form-control bg-light text-xs text-default"
					id="description"
					placeholder="Write a comment..."
					rows="2"
				></textarea>
			</base-input>
			</div>
		</div>
	</div>
</template>

<script>
import taskComment from "./taskComment.vue";
export default {
	components: { taskComment },
	data() {
		return {
			comments: [1, 2, 3],
		};
	},
	props: {
		task: {
			type: Object,
		},
	},
};
</script>

<style>
</style>