import type { PageServerLoad } from './$types';

export const load = (async ({ locals , setHeaders}) => {
// const options = {
//   expand: ['station_details', 'lga_details']
// };
    const data = structuredClone(await locals.pb.collection('timeTable').getFullList({sort: '-created', expand: 'userID', }))
    setHeaders({
              'Cache-Control': 'public, max-age=60'
              })

    return {
        reports: data
    };
}) satisfies PageServerLoad;

