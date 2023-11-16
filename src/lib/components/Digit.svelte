<script lang="ts">
	export let value = '';
	export let type = '';
</script>

<div class="p-3 text-center flex">
	<p class="text-4xl font-bold uppercase tracking-wide text-blueGray-600">
		{value.length <2 ? '0'+value :value}
	</p>
	<h2 class="text-md text-blueGray-400 self-end">{type}</h2>
</div>

<style>
</style>
