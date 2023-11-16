<script lang="ts">

	import Icon from '@iconify/svelte';
		import Digit from '$lib/components/Digit.svelte';
		import Lister from '$lib/components/Lister.svelte';
		import Modal from '$lib/components/Modal.svelte';
		import InputArea from '$lib/components/InputArea.svelte';
		import { splitter, getHoursWorked , getUserData, calculateDistance, isWeekend,replaceSpace, modifyObject, isValidString, convertUtcToWat} from '$lib/repo';
		import  { LGA , facility_location} from '$lib/db';
		import { Avatar, Button, Textarea, Select,P } from 'flowbite-svelte';
		import { onMount } from 'svelte';
		import {enhance} from "$app/forms";
		import type { PageData } from './$types';
	
	
	export let data: PageData;
	// const {record, user} = data;
	const { record, user} = data;
	console.log(record)

const timeIn = record?.created ? convertUtcToWat(record?.created).split(',')[1].trim() :  ''
let hoursworked = record?.work_duration ||  ''
const record_id = record?.id ||  ''
const timeOut = record?.updated ? convertUtcToWat(record?.updated).split(',')[1].trim() :  ''

	
	const {  id: userID, name, position, station } = user;
	let stationdropdown = LGA[replaceSpace(station)]
	let userData={}
	let userDataIn: object
	let userDataOut: object
	let showModal = false;
	let location: string
	
	let time = new Date();
	let excuse : string
	$: excuse =''
	$: location =''
	let timer =''
	let duration =''
    $: duration =''
	let isButtonDisabled = false

	console.log(hoursworked)
	// function for digital clock
	function updateTime() {
		time = new Date();
	}
	setInterval(updateTime, 1000);
	
	// function for modal 
	function toggleModal() {
		showModal = !showModal;
	}


	onMount(async () => {
		const sourceObject = await getUserData();
		userData = { ...sourceObject };
		isButtonDisabled= hoursworked.length > 0 
		
	});
	function getUserDetails(){
		isButtonDisabled = true;
		let obj={}
		timer =  new Date().toLocaleTimeString();
		if (location === LGA.explain[0].value){
			obj = { ...userData, userID , excuse, };
			obj['status'] = 'Excused'
		}
		else{
			const { geolocation } = userData;
			const {  distance , status } = calculateDistance(geolocation, facility_location[location]);
			obj = { ...userData, userID, distance, status, location };

		}
		if (!timeIn ){
			userDataIn = modifyObject(obj, '_In')
		}
		else{
			userDataOut =  modifyObject(obj, '_Out');
			hoursworked = hoursworked || splitter(getHoursWorked( timeIn, timer)) 
			userDataOut['work_duration'] = hoursworked
			userDataOut['id'] = record_id
		} 
		toggleModal()
      setTimeout(() => {
        isButtonDisabled = false;
      }, 3600);
	}


	</script>
	
	<Modal popupModal={showModal} >
		<div class="flex flex-col items-center">
		<Icon icon="uiw:information-o" class='text-4xl' />
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
			<div class="flex items-center">
		<Button color="red" class="mr-2">Yes, I'm sure</Button>
		<Button color="alternative">No, cancel</Button>
	</div>
	</div>
	</Modal>
	
	
	<section class="pt-16 bg-blueGray-50">
		<div class="w-full lg:w-4/12 px-4 mx-auto">
			<div
				class="relative flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg mt-16"
			>
				<div class="px-6">
					<div class="flex flex-wrap justify-center">
						<div class="w-full px-4 flex justify-center">
							<div class="relative">
								<img
									alt="..."
									src="https://picsum.photos/800/800"
									class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
								/>
							</div>
						</div>
						<div class="text-center mt-28 w-full">
							<h3 class="text-2xl font-bold leading-normal text-blueGray-700">{name}</h3>
	
							<div class="mb-2 text-blueGray-600 mt-2">
								<i class="fas fa-briefcase mr-2 text-md text-blueGray-400" />
								{position}
							</div>
							<div class="mb-2 text-blueGray-600">
								<i class="fas fa-university mr-2 text-md text-blueGray-400" />
								{station} - ECEWS ACE5 CRS
							</div>
						</div>
	
						<div class="flex justify-center py-4 lg:pt-4 pt-8">
							<Digit
								value={time.toLocaleTimeString(undefined, { hour: '2-digit', hour12: true }).split(' ')[0]}
								type="hour"
							/>
							<p class="flex self-center text-3xl">:</p>
							<Digit value={time.toLocaleTimeString(undefined, { minute: '2-digit' })} type="min" />
							<p class="flex self-center text-3xl">:</p>
							<Digit value={time.toLocaleTimeString(undefined, { second: '2-digit' })} type="sec" />
							<Digit value={time.toLocaleTimeString(undefined, { hour12: true }).slice(-2)} />
						</div>
					</div>
					<div class=" flex flex-col space-y-5 border-t border-blueGray-200 text-center">
	
						<Select
							class="mt-2"
							items={[...stationdropdown, LGA.explain[0]]}
							bind:value={location}
							placeholder="Select your Station"
						/>
						{#if location === 'Not Currently in my Station'}
							<InputArea
							placeholder="Detailed Explanation"
							name="excuse"
							id={'excuse'}
							bind:value={excuse}
						/>
					
						{/if}
				 <!-- form for create  -->
				 <!-- enctype="multipart/form-data" -->
						<form
						method="POST"
						action="?/create"
						use:enhance
						class="w-full flex flex-col space-y-3 divide-y"
						
						>
						<!-- <input type="hidden" name="someObj" value={JSON.stringify(userDataIn)} /> -->
						<input type="hidden" name="someObj" value={JSON.stringify(userDataIn)} />
						<!-- {#if (!isWeekend() && location && time.getHours() >= 8 && time.getHours() <= 11) } -->
						{#if location && time.getHours() >= 22 && time.getHours() <= 23}
						{#if ( location !== 'Not Currently in my Station') || (location === 'Not Currently in my Station' && isValidString(excuse)) }
						<Button
								type="submit"
								on:click={getUserDetails}
								class={`flex rounded-full px-12 py-4 bg-green-400 text-3xl self-center  ${
								isButtonDisabled ? '' : 'transition duration-200 ease-in hover:scale-110'}`}
								>
								<!-- disabled={isButtonDisabled || timeIn} -->
									{isButtonDisabled ? 'Clocked In' : 'Clock In'}
								</Button>
							{/if}
						{/if}
					
					</form>
					<!-- form section end ------------------------------- -->

					<!-- form for update  -->
					<form
					method="POST"
					action="?/update"
					use:enhance
					class="w-full flex flex-col space-y-3 divide-y"
					
					>
					<!-- <input type="hidden" name="someObj" value={JSON.stringify(userDataIn)} /> -->
					<input type="hidden" name="someObj" value={JSON.stringify(userDataOut)} />
					<!-- {#if (!isWeekend() && location && time.getHours() >= 8 && time.getHours() <= 11) } -->
					<!-- {#if ( !timeIn)}
					<P color="text-red-700 dark:text-red-500 " class="font-semibold" align="center">You cant Clock-Out because you didnt Clock-In today</P>
					{:else} -->
					{#if location && time.getHours() >= 0 && time.getHours() <= 2}
					{#if ( location !== 'Not Currently in my Station') || (location === 'Not Currently in my Station' && isValidString(excuse,10)) }
				
					<Button
								type="submit"
								on:click={getUserDetails}
								class={`flex rounded-full px-12 py-4 bg-red-400 text-3xl self-center   ${
								isButtonDisabled ? '' : 'transition duration-200 ease-in hover:scale-110'}`}
								disabled={isButtonDisabled }
								>
								{isButtonDisabled ? 'Clocked Out' : 'Clock Out'}
						</Button>
					<!-- {/if} -->
					{/if}
					{/if}
				
				</form>
				
					</div>
					<div class=" py-10 mt-5 border-t border-blueGray-200 text-center">
						<div class="flex flex-wrap justify-center">
							<div class="w-full lg:w-11/12">
								<p
									class="text-sm text-center font-semibold bg-slate-700 rounded-full text-white py-1 w-2/12 dark:text-gray-200"
								>
									Statistics
								</p>
								<ul class="mt-3 flex flex-col">
									<Lister label="Time Clocked-In" value={timeIn || timer} color="green-500" />
									<Lister label="Time Clocked-Out" value={hoursworked ? timer : '' } color="red-500" />
									<Lister
										label="Hours worked"
										value={hoursworked || ''}
										bg="bg-gray-100"
									/>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<!-- <pre>{JSON.stringify(userData, null, 2)}</pre>
		<pre>{JSON.stringify(userDataOut, null, 2)}</pre> -->
		
		<!-- <pre>{JSON.stringify(getterr, null, 2)}</pre> -->
	</section>
	
	<style>
	</style>
