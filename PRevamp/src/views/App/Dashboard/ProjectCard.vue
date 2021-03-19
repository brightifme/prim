<template>
	<div class="bg-white border-lighter border rounded mx-auto px-3 py-2 my-2">
		<h4 class="card-text text-dark my-2">
			{{ name }}
		</h4>

		<div class="d-flex">
			<div class="avatar-group col-auto pl-0">
				<a
					v-for="{collaborator, index} in collaborators"
					:key="index"
					href="#"
					class="avatar avatar-xs rounded-circle"
					data-toggle="tooltip"
					data-original-title="Ryan Tompson"
				>
					<img alt="Image placeholder" src="/img/theme/default-avatar.jpg" />
				</a>
			</div>

			<p class="text-xs text-default my-auto mx-2">
				<i class="far fa-comment"></i> {{ comments }}
			</p>
			<p class="text-xs text-default my-auto mx-2">
				<i class="fa fa-paperclip"></i> {{ files }}
			</p>
		</div>
		<div class="mt-2">
		<p class="text-xs text-dark my-auto"><span><i class="pti-calendar-time-o text-danger mr-2 pti-lg"></i></span>started on: {{ startDate }}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
		},
		name: {
			type: String,
			default: "Test Project",
		},
		collaborators: {
			type: Array,
			default: () => [1, 2],
		},
		comments: {
			type: Number,
			default: 0,
		},
		files: {
			type: Number,
			default: 0,
		},
		startDate: {
			type: String,
			default: new Date().toLocaleString(),
		},
	},
	created () {
		console.log(this.data);
	},
};
</script>

<style>
</style>