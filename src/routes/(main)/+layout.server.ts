

import { error, redirect } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.user) {
		return {
			user: locals.user
		};
	}else
    throw redirect(303, '/auth/login');
	
};


