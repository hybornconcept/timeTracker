import type { Actions } from './$types'
import { redirect, fail } from "@sveltejs/kit"

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const data = Object.fromEntries ((await request.formData()).entries())


    try {
    //  const user =  await locals.pb.collection("users").authWithPassword(data.email.toString(), data.password.toString())
    await locals.pb.collection("users").authWithPassword(data.email.toString(), data.password.toString())
    //   await locals.pb.collection("users").requestVerification(data.email.toString())
    
 
    } catch (e) {
      console.log('Error:', e)
      return fail(e.status, { error: e.message })
    }
    throw redirect(303, "/app")
  },
}