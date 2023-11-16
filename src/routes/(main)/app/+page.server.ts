
// import {superValidate } from 'sveltekit-superforms/server';
import { error, fail, redirect } from '@sveltejs/kit';
import { objectToFormData} from '$lib/repo';
import type { PageServerLoad } from './$types';
import {Actions} from '@sveltejs/kit';

export const load = (async({ locals }) => {
	if (!locals) {
		throw redirect(303, '/auth/login');
	}
    const today = new Date().toISOString().split('T')[0]
    let record 
		try {
			 record = (await locals.pb.collection('timeTable').getFirstListItem(`userID = "${locals?.user?.id}" && created >= "${today} 00:00:00"`)) ||  null
			
		} catch (err) {
			if (err) 
    record = null

    }
// console.log(record)

    return {
		user: locals.user,
    record: record
	};
})satisfies PageServerLoad;


export const actions: Actions = {
  create: async ({ locals, request }) => {
    const form = Object.fromEntries(await request.formData())
    const data = objectToFormData(form.someObj)
    console.log(data)
      try {
        // await locals.pb.collection('backup').create(data);
        await locals.pb.collection('timeTable').create(data);
          } catch (err) {
              console.log('Error: ', err);
              throw error(err.status, err.message);
          }
          console.log( data)
          // throw redirect(303, '/reports');
      },

  update: async ({request, locals}) =>{
      const data = Object.fromEntries(await request.formData())
      // console.log("Form data", data.someObj)
      // const idValue = data.get('id');
    const result = JSON.parse(data.someObj)
        //  console.log(result.id);
         try {
            await locals.pb.collection('timeTable').update(result.id, result);
              } catch (err) {
                    console.log('Error: ', err);
                    throw error(err.status, err.message);
                }
  }
};

  //   update: async ({ locals, request }) => {
  //      const form = Object.fromEntries(await request.formData())

  //      console.log(request)
  //      const data = objectToFormData(form.someObj)
  //       const idValue = data.get('id');
  //        console.log(idValue)
  //          try {
  //         await locals.pb.collection('timeTable').update(idValue, data);
  //          } catch (err) {
  //                console.log('Error: ', err);
  //                 throw error(err.status, err.message);
  //            }
  //              console.log( data)
  //             //  throw redirect(303, '/app');
  //          }
  // }
  // export const actions: Actions = {
    // update: async ({request}) =>{
    //     const data = Object.fromEntries(await request.formData())
    //     console.log("Form data", data)
    // }



// export const load = (async ({ locals}) => {
  
// 	if (!locals) {
// 		throw redirect(303, '/login');
// 	}else{
//   //   const getProject = async () => {
//   //   const today = new Date().toISOString().split('T')[0]
//   //   let record 
// 	// 	try {
// 	// 		record = await locals.pb.collection('timeTable').getFirstListItem(`userID = "${locals?.user?.id}" && created >= "${today} 00:00:00"`)
// 	// 		return record
// 	// 	} catch (err) {
// 	// 		console.log('Error: ', err);
// 	// 		return null
     
// 	// 	}
// 	// };
//   // console.log(record.created.split(' ')[0])
//   return {
// 		user: locals.user,
//     // record: getProject() 
// 	};
// }
// }) satisfies PageServerLoad;

// ve80455e