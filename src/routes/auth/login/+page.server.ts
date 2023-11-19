import type { Actions } from './$types'
import { redirect, fail } from "@sveltejs/kit"
import { z } from 'zod';
import {message, superValidate } from 'sveltekit-superforms/server';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});



export const load = async () => {
  // Different schemas, so no id required.
  const loginForm = await superValidate(loginSchema);
  // Return them both
  return { loginForm };
};

export const actions = {
  default: async ({ locals, request }) => {
    const loginForm = await superValidate(request, loginSchema);
    if (!loginForm.valid) {
      return fail(400, { loginForm })
      // return message(loginForm, 'Invalid Login Details');
    }
    // process login
    else{
    try {
      await locals.pb.collection("users").authWithPassword(loginForm.data.email.toString(), loginForm.data.password.toString())
   
      } catch (e) {
        // console.log('Error:', e)
        return message(loginForm, 'Invalid Login Details');
        // return fail(e.status, { error: e.message })
      }
      
      throw redirect(303, "/app")
      // return message(loginForm, 'Login form submitted');

    } 
  }
}


// export const actions: Actions = {
//   default: async ({ locals, request }) => {
//     const data = Object.fromEntries ((await request.formData()).entries())


//     try {
//     //  const user =  await locals.pb.collection("users").authWithPassword(data.email.toString(), data.password.toString())
//     await locals.pb.collection("users").authWithPassword(data.email.toString(), data.password.toString())
//     //   await locals.pb.collection("users").requestVerification(data.email.toString())
    
 
//     } catch (e) {
//       console.log('Error:', e)
//       return fail(e.status, { error: e.message })
//     }
//     throw redirect(303, "/app")
//   },
// }