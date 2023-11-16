import type { PageServerLoad } from './$types';

export const load = (async ({ locals , setHeaders}) => {

    const data = structuredClone(	await locals.pb.collection('timeTable').getFullList({sort: '-created'}))
    setHeaders({
              'Cache-Control': 'public, max-age=60'
              })

    return {
        reports: data
    };
}) satisfies PageServerLoad;

