import type { PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';



export const load = ({ locals, params ,setHeaders}) => {
	const getProject = async (details) => {
		try {
			const userDetails = structuredClone(await locals.pb.collection('timeTable').getOne(details,{ expand: 'userID', }));
			// const data = structuredClone(await locals.pb.collection('timeTable').getFullList({sort: '-created', expand: 'userID', }))
			setHeaders({
				'Cache-Control': 'public, max-age=60'
				})
			
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