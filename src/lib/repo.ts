import { getDistance } from 'geolib';


// Home data
export const socials = ['circum:facebook', 'iconoir:twitter', 'circum:linkedin'];

export 	const sections = [
	{
		icon: 'arcticons:simple-time-tracker',
		title: 'Time Tracker',
		desc: 'is a placeholder text commonly used in the printing and typesetting industry. It is used to demonstrate the visual form of a document'
	},
	{
		icon: 'ph:calendar-thin',
		title: 'Attendance',
		desc: 'is a placeholder text commonly used in the printing and typesetting industry. It is used to demonstrate the visual form of a document'
	},
	{
		icon: 'iwwa:dashboard',
		title: 'Dashboard',
		desc: 'is a placeholder text commonly used in the printing and typesetting industry. It is used to demonstrate the visual form of a document'
	},
	{
		icon: 'system-uicons:location',
		title: 'Location',
		desc: 'is a placeholder text commonly used in the printing and typesetting industry. It is used to demonstrate the visual form of a document'
	}
];


//app layout data

//navigation data

export const navigation = [
		{
			title: 'Timer',
			href: '/app',
			icon: "arcticons:clock"
		},
		{
			title: 'Reports',
			href: '/reports',
			icon: 'arcticons:google-sheets'
		},
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: 'iwwa:dashboard'
		}
	];

// app functions
// functions that concat hours and Mins to the display
export function splitter(timestring: string){
		return  (`${timestring.split(':')[0].concat(' hours')} ${timestring.split(':')[1] .concat(' mins')}`)
	 }

export function getHoursWorked (time1: string,time2: string){


// Calculate the time difference in milliseconds
let  timeDifferenceMs =0 
timeDifferenceMs = Number(new Date(`1970-01-01 ${time2}`)) - Number(new Date(`1970-01-01 ${time1}`));

// Calculate the total hours and minutes spent
const totalMinutes = Math.floor(timeDifferenceMs / (1000 * 60)); // Convert milliseconds to minutes
const totalHours = Math.floor(totalMinutes / 60); // Convert minutes to hours
const remainingMinutes = totalMinutes % 60; // Remaining minutes
return `${totalHours}:${remainingMinutes}`
}


export function calculateDistance (argFac, argPer) {
	const result =  Math.abs(getDistance(argFac, argPer));
	const distance = result.toLocaleString()
	const status =   result <= 50 ? 'Present': 'Absent';
	return { distance: distance, status: status };
	
  }
// function to check if the day is weekend 
export function isWeekend() {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  
  return dayOfWeek === 0 || dayOfWeek === 6 
}

export function objectToFormData(obj) {
    let formData = new FormData();
    const someObj = JSON.parse(obj);
     formData = {...someObj}
  
    return formData;
  }

//   function to disable button 
export function disableButtonForDuration(button, duration) {
	
  button.disabled = true; // Disable the button

  setTimeout(() => {
    button.disabled = false; // Enable the button after the specified duration
  }, duration);
}
export function isValidString(str,num) {
	// Use a regular expression to check if the string contains any non-space characters
	const hasCharacters = /\S/.test(str);
  
	// Check if the string is up to 10 characters long
	const isUpTo10Characters = str.length <= num;
  
	// Return true if the string has characters and is up to 10 characters long
	return hasCharacters && isUpTo10Characters;
  }
export const getUserData = () => new Promise((resolve, reject) => {
	let userData = {};
	// Get user agent
	userData.deviceName = navigator.userAgent;

	// Get geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
		
		
			userData.geolocation = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			};
			// Get IP
			fetch('https://api.ipify.org?format=json')
				.then(response => response.json())
				.then(ipData => {
					userData.ip = ipData.ip;
					resolve(userData);
				})
				.catch(error => {
					console.log('Error:', error);
					reject(error);
				});
		});
	} else {
		console.log("Geolocation is not supported by this browser.");
		reject("Geolocation is not supported by this browser.");
	}
});


  export function modifyObject(newObj, appendix) {
	const myArray = [ 'userID', 'station', 'work_duration', 'id']
	const { geolocation: { latitude, longitude }, ...rest } = newObj;
	const obj ={...rest, latitude,longitude  };
	const renamedObj = {};
	for (const key in obj) {
	  if (obj.hasOwnProperty(key)) {
		renamedObj[myArray.indexOf(key) !== -1 ? key :  key + appendix] = obj[key];
	  }
	}
  
	return renamedObj;
  }


export function convertUtcToWat(utcDateString) {
	const utcDate = new Date(utcDateString);
	const watOptions = { timeZone: 'Africa/Lagos', hour12: true, hourCycle: 'h12' };
	return  utcDate.toLocaleString(undefined, watOptions) ;
  }

// report functions 
// filtering report coming from database to display on report table 
export function filterArrayOfObjects(arrayOfObjects, filterArray) {
	return arrayOfObjects.map(obj => {
	  const filteredObj = {};
	  filterArray.forEach(key => {
		if (obj.hasOwnProperty(key)) {
		  filteredObj[key] = obj[key];
		}
	  });
	  return filteredObj;
	});
  }
	export  function flattenObjects(arrayOfObjects) {
		const processedArray = [];
	  
		for (let i = 0; i < arrayOfObjects.length; i++) {
		  const obj = arrayOfObjects[i];
		  const { id, expand: { userID, ...restExpand }, created, updated, ...rest } = obj;
	  
		  // Check if 'id' property exists in the array
		  const existingIdIndex = processedArray.findIndex(item => item.id === id);
	  
		  // If 'id' property exists, delete the first occurrence
		  if (existingIdIndex !== -1) {
			processedArray.splice(existingIdIndex, 1);
		  }
	  
		  // Create a single object by merging all sub-objects and keeping the 'id' property
		  const mergedObject = {
			...rest,
			...userID,
			...restExpand,
			id,
			time_in: created,
			time_out: updated,
		  };
	  
		  processedArray.push(mergedObject);
		}
	  
		return processedArray;
	  }
  
export function getTimeAgo(dateString) {
	const givenDate = new Date(dateString);
	const currentDate = new Date();
  
	const differenceInMilliseconds = currentDate - givenDate;
	const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
	if (differenceInDays < 7) {
	  return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
	} else if (differenceInDays < 30) {
	  const weeks = Math.floor(differenceInDays / 7);
	  return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
	} else {
	  const months = Math.floor(differenceInDays / 30);
	  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
	}
  }

  
 export function transformObject(obj) {
	const newObj = {};
	for (const key in obj) {
	  let newKey = key.replace('_In', '_clock_in').replace('_Out', '_clock_out');
	  newObj[newKey] = obj[key];
	}
  
	const { created, updated, ...rest } = newObj;
	return {
	  ...rest,
	  time_in: created,
	  time_out: updated
	};
  }
  
  // Function to apply transformations to each object in an array
	export  function transformArray(array) {
	return array.map(transformObject);
  }
  
  export function flattenUserDetails(obj) {
	const {
	  expand: { userID: { created: expandCreated, updated: expandUpdated, ...expandRest } },
	  ...restDetails
	} = obj;
  
	const flattenedDetails = { expandCreated, expandUpdated, ...expandRest, ...restDetails };
  
	return flattenedDetails;
  }

  // partition reort data to display on info page
  export function filterObjectBySubstring(keysToKeep, yourObject, substring1, substring2) {
  
	const obj1 = {};
	const obj2 = {};
	const obj3 = {};
	const filteredObj = {};
	
	const { created,updated, ...rest } = yourObject;
	const renamedObject = {
		time_In: convertUtcToWat(created).split(',')[1], 
		time_Out: convertUtcToWat(updated) === convertUtcToWat(created) ? '' :convertUtcToWat(updated).split(',')[1] , 
		...rest
	};

	Object.entries(renamedObject).forEach(([key, value]) => {
	  if (key.includes(substring1)) {
		obj1[key] = value;
	  } else if (key.includes(substring2)) {
		obj2[key] = value;
	  } else {
		obj3[key] = value;
	  }
	});
	keysToKeep.forEach(key => {
		if (obj3.hasOwnProperty(key)) {
		  filteredObj[key] = obj3[key];
		}
	  });
	
	return [obj1, obj2, filteredObj];
  }
	export function removeSuffixFromKeys(obj, suffix ='') {
		const modifiedObject = {};
	  
		Object.keys(obj).forEach(key => {
		  // Remove the specified suffix from each key
		  const modifiedKey = key.replace(new RegExp(`${suffix}$`), '')
		  .replace(/_/g, ' ')
		  .replace(/\b\w/g, match => match.toUpperCase());
	  
		  // Capitalize the first letter of the modified key
		  const capitalizedKey = modifiedKey.charAt(0).toUpperCase() + modifiedKey.slice(1);
	  
		  // Assign the value to the modified key in the new object
		  modifiedObject[capitalizedKey] = obj[key];
		});
	  
		return modifiedObject;
	  }



// remove empty space fromdata from database 
export function replaceSpace(str) {
    return str.replace(/\s/g, "_");
}
// export interface Obj {
// userAgent: string;
// geolocation: object;
// ip: string;
// status: string;
// timeIn?: string;
// timeOut?: string;
// timeWorked?: string;

// }
let showModal = false;
// <!-- <Modal popupModal={showModal} >
// 		<div class="flex flex-col items-center">
// 		<Icon icon="uiw:information-o" class='text-4xl' />
// 			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
// 			<div class="flex items-center">
// 		<Button color="red" class="mr-2">Yes, I'm sure</Button>
// 		<Button color="alternative">No, cancel</Button>
// 	</div>
// 	</div>
// 	</Modal> -->

// // function for modal 
// function toggleModal() {
// 	showModal = !showModal;
// }

// toggleModal()