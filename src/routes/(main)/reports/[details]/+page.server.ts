import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

// export const load = ({ locals, params }) => {

//     const getData = async (details) => {
// 		try {
// 			const userDetails = structuredClone(await locals.pb.collection('timeTable').getOne(details));
// 			// setHeaders({
// 			// 	'Cache-Control': 'public, max-age=60'
// 			// 	})
// 			return userDetails;
// 		} catch (err) {
// 			throw error(err.status, err.message);
// 		}
// 	};
	
// 	return {
// 		userDetails: getData(params.details)
// 	};
// }) satisfies PageServerLoad;

export const load = ({ locals, params ,setHeaders}) => {
	const getProject = async (details) => {
		try {
			const userDetails = structuredClone(await locals.pb.collection('timeTable').getOne(details));
			return userDetails;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	
	return {
		userDetails: getProject(params.details)
	};
};