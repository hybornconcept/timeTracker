<script lang="ts">
	import { NavBrand, Navbar, NavLi, NavHamburger, NavUl, Button, Dropdown,Avatar,DropdownItem} from 'flowbite-svelte';

	import Icon from '@iconify/svelte';
	import {sections} from '$lib/repo';

</script>

<section class="flex max-w-7xl mx-auto">
	<Navbar>
		<NavBrand href="/">
			<div class="flex gap-2">
				<div class="bg-primary-700 rounded-full p-2">
					<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
				</div>
				<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
					>StaffTracker</span
				>
			</div>
		</NavBrand>
			<div id="avatar_with_name" class="p-2">
				<Avatar
					src="https://i.pravatar.cc/300"
					id="avatar-menu"
					border
					class="ring-teal-400 dark:ring-teal-300 mr-2 block"
					>
					<!-- {$page.data.user.email.charAt(0).toUpperCase()} -->
					AC
				</Avatar>

				<!-- <span class="hidden md:block">{data.email}</span> -->
			</div>
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
	</Navbar>
</section>

<!-- hero section  -->
<section class="flex text-gray-600 body-font max-w-7xl mx-auto">
	<div class="container mx-auto flex px-5 py-20 items-center justify-center flex-col">
		<div class="text-center lg:w-2/3 w-full">
			<div class="mb-3">
				<p
					role="alert"
					class="inline-flex items-center justify-between px-2 py-1 text-sm bg-slate-500 rounded-full text-white gap-3"
				>
					<Icon icon="clarity:beta-solid" />
					<span class="text-sm font-medium">Beta version 0.0.1</span>
					<Icon icon="fluent:chevron-right-32-regular" />
				</p>
			</div>
			<h1 class="title-font text-4xl md:text-5xl mb-4 font-bold text-gray-900">
				Making Punctuality everything.
			</h1>
			<p class="mb-8 leading-relaxed max-w-2xl mx-auto">
				Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing tousled. Chambray
				dreamcatcher trust fund, kitsch vice godard disrupt ramps hexagon mustache umami snackwave
				tilde chillwave ugh.
			</p>
			<div class="flex justify-center">
				<Button color="primary" class="px-12 py-4 hover:bg-slate-800 text-xl"
				href="/app"
				 pill>Launch</Button>
			</div>
		</div>
		<div class="flex flex-wrap max-w-7xl mx-auto">
			<img src='/timer.jpg' alt="My Image" aria-hidden="true" />
		</div>
	</div>
</section>

<!-- About section  -->

<section class="text-gray-600 body-font flex flex-col">
	<h1 class="text-3xl md:text-6xl font-medium title-font my-16 text-gray-900 mx-auto">Features</h1>
	<div class="flex mx-auto max-w-7xl">
		<div class="mx-auto flex flex-col lg:w-3/4 w-full px-10">
			{#each sections as section, index}
				<div class="flex relative pt-5 pb-10 sm:items-center md:w-2/3 mx-auto">
					<div class="h-full w-6 absolute inset-0 flex items-center justify-center">
						<div class="h-full w-1 bg-gray-200 pointer-events-none" />
					</div>
					<div
						class="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-primary-500 text-white relative z-10 title-font font-medium text-sm"
					>
						{index + 1}
					</div>
					<div class="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
						<div
							class="flex-shrink-0 w-24 h-24 bg-primary-200 text-primary-500 rounded-full inline-flex items-center justify-center"
						>
							<Icon icon={section.icon} class="text-5xl text-primary-500" />
						</div>
						<div class="flex-grow sm:pl-6 mt-6 sm:mt-0">
							<h2 class="font-medium title-font text-gray-900 mb-1 text-xl">{section.title}</h2>
							<p class="leading-relaxed">
								{section.desc}
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
		<div class="hidden lg:flex md:w-1/3">
			
			<img src='/lamp.jpg' alt="My Image"  aria-hidden="true"/>
		</div>
	</div>
</section>

<!-- Testimonial -->
<section class="text-gray-600 body-font flex flex-col">
	<h1 class="text-3xl md:text-5xl font-medium title-font mt-20 text-gray-900 mx-auto">
		Testimonials
	</h1>
	<div class="container px-5 my-10 mx-auto">
		<div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="inline-block w-8 h-8 text-gray-400 mb-8"
				viewBox="0 0 975.036 975.036"
			>
				<path
					d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
				/>
			</svg>
			<p class="leading-relaxed text-lg">
				Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut
				+1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar
				cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard
				four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they
				sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb
				next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic
				drinking vinegar.
			</p>
			<span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6" />
			<h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">HOLDEN CAULFIELD</h2>
			<p class="text-gray-500">Senior Product Designer</p>
		</div>
	</div>
</section>


<style>
</style>
