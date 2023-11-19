<script>

 export let myObject;
 export let color;
 export let clock;
 export let period;


</script>

<div class="bg-white bg-card text-card-foreground h-fit shadow-md rounded-md overflow-hidden min-w-full mx-auto mt-10">
  <div class="{color} py-2 px-4">
      <h2 class="text-xl font-semibold text-gray-800">{clock}</h2>
  </div> 
  <ul class="bg-white rounded-lg shadow divide-y divide-gray-200 max-w-sm">
        {#each Object.entries(myObject) as [key, value]}
      <li class="px-6 py-4">
        <div class="flex justify-between">
            <span class="font-semibold text-lg">{key}</span>
            <span class="text-gray-500 text-xs">{period}</span>
        </div>
        <p class="text-gray-700">{value}</p>
      </li>
      {/each}
  </ul> 
</div>