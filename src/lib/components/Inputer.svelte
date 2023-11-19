<script lang="ts">
	import { FloatingLabelInput, Helper } from 'flowbite-svelte';
	export let inputProps = {};

	export let label = '';
	export let type = '';
	export let value;
	export let name = '';
	export let id = '';
	export let errors;
	$: ({ label, name, id, value,type, ...inputProps } = $$props);
</script>


<div class="w-full">
    <FloatingLabelInput
        style="outlined"
        bind:value
        {id}
        {name}
        {type}
        {label}
    />

	<!-- <Label for={id} class="block mb-2">{label.toUpperCase()}</Label>
	<Input
		type="text"
		{name}
		class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
		bind:value
		{...inputProps}
	/> -->

	{#if errors}
		{#each errors as error}
			<Helper class="mt-2" color="red">
				<span class="font-normal text-sm">{error}</span>
			</Helper>
		{/each}
	{/if}

</div>

<style>
</style>
