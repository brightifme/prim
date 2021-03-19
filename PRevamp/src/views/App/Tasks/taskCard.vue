<template>
	<div class="card mb-3">
		<div class="card-header border-0">
			<div class="row align-items-center">
				<div class="col d-flex">
					<p class="text-xs text-warning">High Priority</p>
					<p class="text-xs ml-auto text-right">
						<i class="pti-time-o text-danger"></i> Due in 4 days
					</p>
				</div>
				<div class="col-12">
					<h6 class="text-sm mb-1">Development of a Native App (iOS Standard)</h6>
					<base-progress
						show-label
						type="success"
						:height="3"
						:value="70"
						label="Completed"
						class="pt-0 my-2"
						:showLabel="false"
					></base-progress>
				</div>
				<div class="col d-flex mt-2">
					<p class="text-xs">
						<span class="mr-1"> <i class="far fa-comment"></i> 5 </span>
						<span> <i class="fa fa-paperclip"></i> 25 </span>
					</p>
					<p class="text-xs ml-auto text-right">
						<span class="mr-1 text-uppercase"> Task Timer</span>
                        <span class="mr-1 text-uppercase text-primary"> 
                           2:45:50
                        </span>
                        <span class="mr-1 text-uppercase text-primary"> 
                       <i class="far fa-play-circle "></i>
                        </span>
                          <span class="mr-1 text-uppercase text-danger"> 
                       <i class="far fa-pause-circle"></i>
                        </span>
					</p>
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