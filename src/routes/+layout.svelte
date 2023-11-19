<script>
	import '../app.postcss';
	import Icon from '@iconify/svelte';
	import { socials} from '$lib/repo';

	
</script>

<slot/>
<footer class="text-gray-600 body-font border border-black-100 ">
	<div class="bg-slate-100">
		<div class="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
			<div class="flex gap-2">
				<div class="bg-primary-700 rounded-full p-2">
					<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
				</div>
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>StaffTracker</span
				>
			</div>
			<p class="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">
				© 2020 Tailblocks —
				<a
					href="https://twitter.com/knyttneve"
					rel="noopener noreferrer"
					class="text-gray-600 ml-1"
					target="_blank">@knyttneve</a
				>
			</p>
			<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
				{#each socials as social}
					<a href="javascript:void(0)" class="text-gray-500">
						<Icon icon={social} class="text-3xl mx-2" />
					</a>
				{/each}
			</span>
		</div>
	</div>
</footer>
