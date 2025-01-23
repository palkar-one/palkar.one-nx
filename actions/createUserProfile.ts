'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function createUserProfile(formData: FormData) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  const user = await currentUser();

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    const userData = {
      ghernav: 'post', // or 'image', 'job', 'poll'
      iyngernav: 'general', // or other relevant category
      profession: 'postInput',
      shortBio: 'imageId',
      linkedInProfile: 'false',
      interests:'',
      pincode:''
    };
    const response = await fetch('http://localhost:3333/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''
      },
      body: JSON.stringify(userData)
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error: any) {
    console.log("Error creating post ", error);
    throw new Error("Failed to create post" + error);
  }

  revalidatePath("/");
}