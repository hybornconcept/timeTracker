<script lang="ts">

	import { FloatingLabelInput, Helper } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
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
				<form  method="POST">
					<div class="flex gap-2">
						<div class="bg-primary-700 rounded-full p-2">
							<Icon icon="eos-icons:hourglass" class="text-2xl text-white" />
						</div>
						<span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
							>StaffTracker</span
						>
					</div>
					<div class="mb-12">
						<p class="leading-normal text-lg pl-12">Sign into your account.</p>
					</div>
					<div class="flex flex-wrap gap-y-10">
						<div class="w-full">
							<FloatingLabelInput
								style="outlined"
								id="email"
								name="email"
								type="text"
								label="E-mail"
							/>
						</div>
						<div class="w-full">
							<FloatingLabelInput
								style="outlined"
								id="password"
								name="password"
								type="password"
								label="Password"
							/>
						</div>
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
						<button
						type="submit"
							class="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-slate-600 hover:bg-primary-700 focus:outline-none"
						>
							Sign in
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
