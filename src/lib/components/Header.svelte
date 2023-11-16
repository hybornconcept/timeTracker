<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader, DropdownItem, Button } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { applyAction, enhance } from '$app/forms';
	import pb from '$lib/pocketbase';
	import Icon from '@iconify/svelte';
	export const data

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
	<div class="text-3xl flex gap-x-3 items-center">
		<Icon icon="clarity:notification-line" />
		<!-- {#if data} -->
			<div class="border-l-2 px-2">
				<Button pill color="light" id="avatar_with_name" size="sm" class="p-2">
					<Avatar
						src="https://i.pravatar.cc/300"
						id="avatar-menu"
						border
						class="ring-teal-400 dark:ring-teal-300 mr-2 block"
						>{$page.data.user.email.charAt(0).toUpperCase()}
					</Avatar>

					<!-- <span class="hidden md:block">{data.email}</span> -->
				</Button>
				<Dropdown triggeredBy="#avatar_with_name">
					<div slot="header" class="px-4 py-2">
						<span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
						<span class="block truncate text-sm font-medium">name@flowbite.com</span>
					</div>
					<DropdownItem>Dashboard</DropdownItem>
					<DropdownItem>Settings</DropdownItem>
					<DropdownItem>Earnings</DropdownItem>
					<DropdownItem slot="footer">Sign out</DropdownItem>
				</Dropdown>
			</div>
		<!-- {/if} -->
	</div>
</header>



