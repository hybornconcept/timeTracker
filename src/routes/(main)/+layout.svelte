<script lang="ts">
	import {
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper,
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		DropdownDivider,
		Button,
		Drawer,
		CloseButton,
		Modal,
		A
	} from 'flowbite-svelte';
	import { page } from '$app/stores';

	import 'iconify-icon';
	import { sineIn } from 'svelte/easing';
	import Header from '$lib/components/Header.svelte';
	import { applyAction, enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { navigation} from '$lib/repo';



	let spanClass = 'flex-1  whitespace-nowrap';
	let hidden = true;
	let activateClickOutside = false;
	let backdrop = false;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	let data = $page.data.user;
	$: activeUrl = $page.url.pathname;
	//TO RECIEVE A FUNCTION
	export let opener = () => {
		hidden = false;
	};
</script>

<section class="flex w-full bg-slate-50">
	<!-- Sidebar  -->
	<Drawer
		{activateClickOutside}
		{backdrop}
		transitionType="fly"
		{transitionParams}
		bind:hidden
		class="absolute inset-0 transform lg:transform-none border bg-card text-card-foreground shadow overflow-hidden lg:opacity-100 lg:relative z-10  h-screen "
	>
		 <div class="flex items-center py-3  ">
		
            <div class="flex gap-2 mb-5">
				<div class="bg-primary-700 rounded-full p-2">
					<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
				</div>
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>StaffTracker</span
				>
			</div>
			<CloseButton
				on:click={() => (hidden = true)}
				class="mb-4  -mt-6 dark:text-white  bg-black rounded-full text-white hover:bg-black"
				size="xs"
			/>
		</div>

		<Sidebar class="pr-5">
			<SidebarWrapper divClass=" py-4  rounded dark:bg-gray-800  ">
				<SidebarGroup>
					{#each navigation as navItem}
						<SidebarItem
							label={navItem.title}
							{spanClass}
							divClass="w-full"
							href={navItem.href}
							active={activeUrl === navItem.href}
						>
							<svelte:fragment slot="icon">
								<Icon icon={navItem.icon} width="25" class="mr-2" />
							</svelte:fragment>
						</SidebarItem>
					{/each}
				</SidebarGroup>

				<SidebarGroup border>
					<form
						action="/auth/logout"
						method="POST"
						use:enhance={() => {
							return async ({ result }) => {
								await applyAction(result);
							};
						}}
					>
						<SidebarItem type="submit" label="Log Out" class="relative group">
							<svelte:fragment slot="icon">
								<Icon icon="iwwa:logout" width="25" />
							</svelte:fragment>
						</SidebarItem>
					</form>
				</SidebarGroup>
			</SidebarWrapper>
		</Sidebar>
	</Drawer>
	<div class="flex flex-col w-full min-h-full">
		<Header {data} {opener} />
		<div class="container mx-auto">
			<!-- Header  -->
			<!-- Main  -->
			<slot />
		</div>
	</div>
</section>
