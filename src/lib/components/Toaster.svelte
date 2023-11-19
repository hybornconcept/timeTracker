<script lang="ts">
    import {PapperPlaneOutline} from 'flowbite-svelte-icons';
	import { Toast } from 'flowbite-svelte';
	import { slide } from 'svelte/transition';
    export let popup = false;
</script>

<Toast dismissable={false} transition={slide} bind:open={popup} class="mx-auto"  contentClass="flex justify-self-center  space-x-4 divide-x divide-gray-200 dark:divide-gray-700">
    <PapperPlaneOutline class="w-5 h-5 text-green-600 dark:text-green-500 rotate-45" />
<slot/>
</Toast>
