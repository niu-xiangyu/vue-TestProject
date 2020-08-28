<template>
	<comments :id="$route.params.id"></comments>
</template>

<script>
	import comments from "../others/comments.vue"
	export default {
		components:{
			comments
		}
	}
	
</script>

<style>
</style>
