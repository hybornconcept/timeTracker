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
	return arrayOfObjects.map(obj => {
	  // Check if 'expand' property exists
	  if (obj.expand && obj.expand.userID) {
		// Merge properties of 'userID' into the top-level object
		const flattenedObject = {
		  ...obj,
		  ...obj.expand.userID
		};
  
		// Remove the 'expand' property
		delete flattenedObject.expand;
		const { created, updated, ...rest } = flattenedObject;
		return {
		  ...rest,
		  time_in: created,
		  time_out: updated
		};
	  

	  } else {
		// If 'expand' or 'userID' does not exist, return the original object
		return obj;
	  }
	});
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
  


  // partition reort data to display on info page
 export  function filterObjectBySubstring(obj, substring1, substring2) {
	const obj1 = {};
	const obj2 = {};
	const obj3 = {};
  
	Object.entries(obj).forEach(([key, value]) => {
	  if (key.includes(substring1)) {
		obj1[key] = value;
	  } else if (key.includes(substring2)) {
		obj2[key] = value;
	  } else {
		obj3[key] = value;
	  }
	});
  
	return [obj1, obj2, obj3];
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