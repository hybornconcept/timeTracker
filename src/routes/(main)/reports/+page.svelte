<script lang="ts">
    import type { PageData } from './$types';
  import { SearchOutline } from 'flowbite-svelte-icons';
  import Icon from '@iconify/svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, Select, TableHeadCell , Button, Dropdown, DropdownItem, Checkbox,Input} from 'flowbite-svelte';
  import {filterArrayOfObjects, flattenObjects, convertUtcToWat, transformObject, transformArray} from '$lib/repo';
  import  { LGA } from '$lib/db';
  import Badge from '$lib/components/Badge.svelte';

  let selected;
  let periods = [ ];
  let uniqueValuesSet = new Set();
  let LGAkeys = Object.keys(LGA);
  export let data: PageData;
let { reports} = data;
// console.log(new Date(reports[0].created).toLocaleDateString())
const cleanedData = flattenObjects(reports);
// console.log(cleanedData)
  // Apply ransformations to the original array
  // const transformedArray = transformArray(originalArray);

const filterArray =['name', 'location_In','location_Out', 'status_In', 'status_Out','time_in','time_out', 'work_duration', 'id']
const tableData = filterArrayOfObjects(cleanedData,filterArray)
const tableHeaders = Object.keys(tableData[0])


const convertedData = tableData.map(entry => {
  const timeInParts = entry.time_in ? convertUtcToWat(entry.time_in).split(',') :'';
  const timeOutParts = entry.time_out ? convertUtcToWat(entry.time_out).split(',') :'';

  if (timeInParts[0] && !uniqueValuesSet.has(timeInParts[0])) {
    periods.push({
    value: timeInParts[0],
    name: timeInParts[0]
  });
  uniqueValuesSet.add(timeInParts[0]);
}
  const newData = {
    ...entry,
    time_in: timeInParts[1],
    date: timeInParts[0],
    time_out: timeOutParts[1] === timeInParts[1] ? '' : timeOutParts[1],

  };
  return newData;
});


let searchTerm = '';
let dropTerm = '';
$: filteredItems = convertedData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  $: filteredItems = convertedData.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(dropTerm.toLowerCase())
    )
  );
// let obj = {
//   searchTerm: '',
//   dropTerm: ''
// };
// $: searchTerm = obj.searchTerm
// $: dropTerm = obj.dropTerm






</script>

<!-- component -->
<div class="antialiased  h-screen">
	<div class="container mx-auto py-6 px-4" >
		<h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">Staff Reports</h1>
        <p class="max-w-md  mt-3 text-lg text-slate-500 sm:text-md">Here is the current status of staff Attendance across ECEWS CRS</p>

		<div class="flex h-16 items-center px-2">
      <div class="w-1/4  flex">
        <Input type="text" placeholder="Search"  class="w-full" bind:value={searchTerm}>
        <SearchOutline slot="left" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </Input> 
      </div>
		  <div class="ml-auto flex items-center space-x-4 ">
        <div class="w-64">
          <Select  items={periods} bind:value={dropTerm} placeholder="Select Period"/>
        </div>
		    <div>
          <div class=" w-32">
            <Button class="gap-x-3 text-md">Status<Icon icon="fluent:chevron-down-20-regular" class="text-2xl"/>
            </Button>
              <Dropdown class="w-full p-3 space-y-3 text-sm">
             
                {#each LGAkeys as key}
                <li>
                  <Checkbox bind:value={searchTerm}> {key}</Checkbox>
                 
                </li>
                <!-- <li>
                  <Radio name="searchTerm" bind:group={searchTerm} value={1}>{key}</Radio>
                </li> -->
              
              {/each}
              </Dropdown>
          </div>
		  </div>
		</div>
		</div>

  <div class="overflow-hidden rounded-[0.5rem] border bg-background shadow">
    <Table >
      <!-- table headers -->
      <TableHead class="bg-gray-100">
        {#each tableHeaders as header}
       {#if header !=='id'}
        <TableHeadCell class="px-3">{header}</TableHeadCell>
        {/if}
      {/each}
      </TableHead>
      <TableBody class="divide-y">
        {#each filteredItems as data} 
    
        <TableBodyRow>

              <TableBodyCell>{data.name}</TableBodyCell>
              <TableBodyCell class="px-3">{data.location_In.length > 25 ? data.location_In.substring(0, 25) + "..." : data.location_In}</TableBodyCell>
              <TableBodyCell class="px-3">{data.location_Out.length > 25 ? data.location_Out.substring(0, 25) + "..." : data.location_Out}</TableBodyCell>
              <TableBodyCell class="px-3"><Badge status= {data.status_In || 'nil'}/></TableBodyCell>
              <TableBodyCell class="px-3"><Badge status= {data.status_Out || 'nil'}/></TableBodyCell>
              <TableBodyCell class="px-3">{data.time_in}</TableBodyCell>
              <TableBodyCell class="px-3">{data.time_out}</TableBodyCell>
              <TableBodyCell class="px-3 hidden">{data.date}</TableBodyCell>
              <TableBodyCell class="px-3">{data.work_duration}</TableBodyCell>
              <TableBodyCell class="px-3">
                <a href="/reports/{data.id}" class="font-medium text-blue-600 hover:underline dark:text-primary-500">VIEW</a>
            </TableBodyCell>
            </TableBodyRow>
            
         
          {/each} 
         
      </TableBody>
    </Table>
  </div>
	
	</div>


</div>

<!-- {#each arrayOfObjects as obj}
<tr>
  <td>{obj.id}</td>
  <td>{obj.name}</td>
  <td>{obj.age}</td>
</tr>
{/each} -->