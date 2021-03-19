<template>
	<div data-toggle="buttons" class="btn-group-toggle">
		<label v-for="{option, index} in options" :key="option" class="btn btn-secondary"
			><input
				type="radio"
				:id="'option'+(index+1)"
				autocomplete="off"
				checked="checked"
				:value="'All'"
			/>
			All </label
		>
	</div>
</template>

<script>
export default {
  name: "button-radio-group",
  props: {
    options: {
      type: Array,
      description: "Button tag (default -> button)"
    },
    },
    created () {
        console.log(this.$props.options);
    },
};
</script>

<style>
</style>