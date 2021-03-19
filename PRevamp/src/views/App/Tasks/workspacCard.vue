<template>
	<div class="card mb-3">
		<div class="card-header border-0">
			<div class="row align-items-center">
				<div class="col">
					<h1 class="mb-0">
						Project Title <a class="text-xs ml-3">view project details</a>
					</h1>
				</div>
				<div class="col text-right d-flex">
					<base-button type="success" size="md" class="shadow-none ml-auto"
						>Create a Task</base-button
					>
					<base-dropdown
						class="my-auto"
						menuClasses=" dropdown-menu-right dropdown-menu-sm text-xs text-right"
					>
						<base-button
							slot="title"
							type="transparent"
							size="md"
							class="font-weight-light border-default dropdown-toggle shadow-none"
							>Sort by Project</base-button
						>
						<a class="dropdown-item" href="">Sort by Project</a>
						<a class="dropdown-item" href="">Sort by Date</a>
					</base-dropdown>
				</div>
			</div>
		</div>

		<div class="card-body py-0">
			<div class="row">
				<div class="mx-auto d-md-flex py-3">
					<div class="mt-auto">
						<div class="avatar-group">
							<a class="avatar avatar-xs rounded-circle">
								<img
									alt="Image placeholder"
									src="/img/theme/default-avatar.jpg"
								/>
							</a>
							<a class="avatar avatar-xs rounded-circle">
								<img
									alt="Image placeholder"
									src="/img/theme/default-avatar.jpg"
								/>
							</a>
							<a class="avatar avatar-xs rounded-circle">
								<img
									alt="Image placeholder"
									src="/img/theme/default-avatar.jpg"
								/>
							</a>
						</div>
					</div>
					<div class="mt-auto">
						<base-button
							type="light"
							class="mx-1 shadow-none"
							size="sm"
							icon="pti-profile text-default"
							>Invite</base-button
						>
					</div>
					<div class="mt-auto">
						<base-button
							type="light"
							class="mx-1 shadow-none"
							size="sm"
							icon="fa fa-paperclip text-default"
							>25 Attachment</base-button
						>
					</div>

					<div class="mt-auto">
						<base-button
							type="light"
							class="mx-1 shadow-none"
							size="sm"
							icon="far fa-comment text-default"
							>25 Comments</base-button
						>
					</div>

					<div class="">
						<p class="dropdown-toggle text-xs text-uppercase mb-1 mx-1">
							Status
						</p>
						<base-button
							type="warning"
							class="mx-1 shadow-none"
							size="sm"
							icon="pti-in-progress-o"
							>In progress</base-button
						>
					</div>
					<div class="">
						<p class="text-xs text-uppercase mb-1 mx-1">Due date</p>
						<base-button
							type="transparent"
							class="mx-1 shadow-none"
							size="sm"
							icon="pti-calendar-time-o text-danger"
							>15 Mar at 17:00</base-button
						>
					</div>
					<div class="">
						<p class="text-xs text-uppercase mb-1 mx-1">Priority</p>
						<base-button type="warning" class="mx-1 shadow-none" size="sm"
							>15 Mar at 17:00</base-button
						>
					</div>
					<div class="">
						<p class="text-xs text-uppercase mb-1 mx-1">Project Time</p>
						<base-button
							type="transparent"
							class="mx-1 shadow-none"
							size="sm"
							icon="pti-time-o text-danger"
							>20hrs 40mins</base-button
						>
					</div>
					<div class="">
						<p class="dropdown-toggle text-xs text-uppercase mb-1 mx-1">
							Collaborator’s Time
						</p>
						<base-button
							type="transparent"
							class="mx-1 shadow-none"
							size="sm"
							icon="pti-time-o text-danger"
							>2hrs 15mins</base-button
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>