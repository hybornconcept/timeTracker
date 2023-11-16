<script lang="ts">
	import { Textarea, Label, Helper } from 'flowbite-svelte';
	export let inputProps = {};
	export let id = '';
	export let name = '';
	export let value = '';
	$: ({ name, id, ...inputProps } = $$props);
</script>

<div>
	<Textarea
	class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
		type="text"
		{name}
		bind:value
		{...inputProps}
		rows="4"
	/>


</div>

<style>
</style>
