<script lang="ts">
    import type { PageData } from './$types';
    import Details from '$lib/components/Details.svelte';
    import {filterObjectBySubstring} from '$lib/repo';
    export let data: PageData;
    let { userDetails} = data;
    const [obj1, obj2, obj3] = filterObjectBySubstring(userDetails, 'In', 'Out');
</script>

<section class="flex p-6 max-w-6xl mx-auto space-x-5">
    <div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 mx-auto w-1/3 ">
        <div class="flex flex-col mb-10 py-2 border-b border-1 border-slate-300">
            <h3 class="font-semibold tracking-tight text-3xl">User Details</h3>
            <p class="text-sm text-slate-500">Enter your email below to create your account</p>
        </div>
        <div class="flex flex-col  justify-between space-y-6 lg:space-y-0">
        {#each Object.entries(obj3) as [key, value]}
            <Details key={key} value={value} />
          {/each}
        </div>
    </div>

<div class="flex flex-col rounded-xl border bg-card text-card-foreground shadow p-6 mx-auto w-2/3 ">
    <div class="flex flex-col mb-10 py-2 border-b border-1 border-slate-300">
        <h3 class="font-semibold tracking-tight text-3xl">Activity Log</h3>
        <p class="text-sm text-slate-500">Enter your email below to create your account</p>
    </div>
 

    <div class="grid max-w-screen-lg  space-y-6 lg:grid-cols-2 lg:space-y-0 lg:divide-x ">
        <div class="space-y-6 sm:px-16">
            {#each Object.entries(obj2) as [key, value]}
            <Details key={key} value={value} />
            {/each}
        </div>
        <div class="space-y-6 sm:px-16">
            {#each Object.entries(obj1) as [key, value]}
            <Details key={key} value={value} />
            {/each}
    </div>
</div>
</section>