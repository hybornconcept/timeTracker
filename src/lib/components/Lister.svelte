<script lang="ts">
	export let value;
	export let label;
	export let color='transparent';
	export let bg ='';
</script>


	<li class={`inline-flex items-center gap-x-2 py-3 px-4 text-sm border text-gray-800 -mt-px ${bg} first:rounded-t-lg first:mt-0 last:rounded-b-lg dark:border-gray-700 dark:text-gray-200`}>
		<div class="flex items-center justify-between w-full">
		<span>{label}</span>
			<div>
			{#if value}
			<i class="fas fa-circle text-xs text-{color} text mr-2" />
			<span class="text-lg font-medium">{value}</span>
			{:else}
			<span class="text-lg font-medium">-- : --</span>
			{/if}
			</div>
	</div>
</li>

<style>
</style>

