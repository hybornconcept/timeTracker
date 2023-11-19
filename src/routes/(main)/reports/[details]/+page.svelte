<script lang="ts">
    import type { PageData } from './$types';
    import Details from '$lib/components/Details.svelte';
    import {filterObjectBySubstring , removeSuffixFromKeys, flattenUserDetails, getTimeAgo} from '$lib/repo';

    // setContext('myObjectContext', myObject);
    export let data: PageData;
    let { userDetails} = data;
    
   
    // console.log(userDetails)
    const cleanedData = flattenUserDetails(userDetails);
    const keysToKeep = ['name', 'position', 'station','work_duration'];
    const [obj1, obj2, obj3] = filterObjectBySubstring(keysToKeep, cleanedData, 'In', 'Out');

const obj_one = removeSuffixFromKeys(obj1,'_In')
const obj_two =  removeSuffixFromKeys(obj2,'_Out')
const obj_three =  removeSuffixFromKeys(obj3,)
let period = getTimeAgo(cleanedData.expandCreated.split(' ')[0])
</script>

<section class="flex p-6 max-w-7xl mx-auto flex-col">
        <div class="flex flex-col border-slate-300 px-8">
            <h3 class="font-semibold tracking-tight text-3xl">Staff Log Details </h3>
            <p class="text-sm text-slate-500">here is the log details for </p>
        </div>

        <div class="grid grid-cols-3 gap-4 mx-auto ">
            <Details myObject={obj_three} color={'bg-gray-200'} clock={'User Details'} {period}/>
            <Details myObject={obj_one} color={'bg-teal-200'} clock={'Clock In Log'} {period}/>
            <Details myObject={obj_two} color={'bg-rose-200'} clock={'Clock Out Log'} {period}/>
        </div>
</section>
