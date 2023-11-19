<script lang="ts">

	import { FloatingLabelInput, Helper } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import Inputer from '$lib/components/Inputer.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from "./$types"

	export let data: PageData;


	// export let data;
	const { form, errors, enhance, message } = superForm(data.form, {
		taintedMessage: "Are you sure you want leave?",
	})
</script>

<!-- source:https://codepen.io/owaiswiz/pen/jOPvEPB -->
<div class="font-[sans-serif] text-[#333]">
	<div class="min-h-screen flex flex-col items-center justify-center lg:p-0 p-10">
		<div
			class="grid md:grid-cols-2 items-center gap-4 md:max-w-7xl md:p-20 p-5 w-full m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md"
		>
			<div
				class="md:max-w-md w-full sm:px-6 p-12 md:shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] md:p-10"
			>
				<form  
				method="POST"
				enctype="multipart/form-data"
				use:enhance
				>
					<div class="flex gap-2">
						<div class="bg-primary-700 rounded-full p-2">
							<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
						</div>
						<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
							>StaffTracker</span
						>
					</div>
					<div class="mb-12">
						<p class="leading-normal text-sm pl-12">Sign into your account.</p>
					</div>
					<div class="flex flex-wrap gap-y-10">

						{#if $message}<h3>{$message}</h3>{/if}
						<Inputer
							id="email"
							name="email"
							type="text"
							label="E-mail"
							bind:value={$form.email}
							errors={$errors.email}
							/>
							<Inputer
								id="password"
								name="password"
								type="password"
								label="Password"
								bind:value={$form.password}
								errors={$errors.password}
							/>
					</div>
					<div class="flex items-center justify-between gap-2 mt-5">
						<div class="flex items-center">
							<input
								id="remember-me"
								name="remember-me"
								type="checkbox"
								class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
							/>
							<label for="remember-me" class="ml-3 block text-sm"> Remember me </label>
						</div>
						<div>
							<a
								href="jajvascript:void(0);"
								class="text-slate-600 font-semibold text-sm hover:underline"
							>
								Forgot Password?
							</a>
						</div>
					</div>
					<div class="mt-12">
						<button type="submit" class="relative inline-flex w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-slate-600 hover:bg-primary-700 focus:outline-none items-center justify-center p-4  overflow-hidden 
						  transition duration-300 ease-out border-2 border-black  group">
							<span class="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-slate-200 group-hover:translate-x-0 ease">
							<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
							</span>
							<span class="absolute flex items-center justify-center w-full h-full text-slate-100 transition-all duration-300 transform group-hover:translate-x-full ease">Log in</span>
							<span class="relative invisible">Log in</span>
						</button>
					</div>
				</form>
			</div>
			<div class="md:h-full max-md:mt-10 hidden md:block">
				<img src='/login.png' class="w-full h-full object-cover" alt="login-image" aria-hidden="true" />
			</div>
		</div>
	</div>
</div>
