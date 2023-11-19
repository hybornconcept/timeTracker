<script lang="ts">
	import { Avatar, Dropdown, DropdownItem } from 'flowbite-svelte';

	import Icon from '@iconify/svelte';
	export let name
	export let email

	//TO EXPORT A FUNCTION
	export let opener;
	// export let opener = () => {
	// 	hidden = false;
	// };
</script>

<header class="flex z-50 bg-white text-sm dark:bg-gray-800 py-4 justify-between px-10 items-center ">
	<div class="flex  gap-x-5 items-center w-48">
		<button
			on:click={opener}
			class="focus:outline-none focus:bg-gray-600 hover:bg-gray-600 rounded-md hover:bg-transparent"
		>
        <Icon icon="healthicons:ui-menu" width="30" />
			
		</button>

		<div class="flex items-center ">
            <div class="flex gap-2">
				<div class="bg-primary-700 rounded-full p-2">
					<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
				</div>
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>StaffTracker</span
				>
			</div>
		</div>
	</div>

	<div>
		<!-- <h1 class="font-poppins text-lg md:text-3xl">EID Tracker (Pre-Natal Data Collection)</h1> -->
	</div>
	<div class="text-3xl flex items-center divide-x-2 space-x-3 pr-6 divide-primary-200 " >
		<Icon icon="clarity:notification-line" />
			<div id="avatar_with_name" class="p-2 cursor-pointer">
						
				<Avatar 
					class="ring-primary-700 dark:ring-primary-300 ml-2  block text-xl border-primary-700 border-2"
					
					>
					{name.split(' ').map(word => word.charAt(0)).join('').slice(-2)}
				</Avatar>
	
					<!-- <span class="hidden md:block">{data.email}</span> -->
				</div>
				<Dropdown triggeredBy="#avatar_with_name">
					<div slot="header" class="px-4 py-2">
						<span class="block text-sm text-gray-900 dark:text-white">{name}</span>
						<span class="block truncate text-sm font-medium">{email}</span>
					</div>
					<DropdownItem>App</DropdownItem>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem slot="footer">Log out</DropdownItem>
				</Dropdown>
	
	</div>
</header>



