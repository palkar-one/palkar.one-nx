'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function createPostAction(formData: FormData) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  const user = await currentUser();
  if(!user) {
  throw new Error("User not authenticated");
  }

   const postInput = formData.get("postInput") as string;
   const image = formData.get("image") as File;
   let imageId: string | undefined;
   if(!postInput) {
    throw new Error("post input is required");
   }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  console.log(image)

  try {
    if(image.size > 0) {
      const formdata = new FormData();
      formdata.append('image', image);
      formdata.append('reference', 'post');
      const response = await fetch('http://localhost:3333/image', {
          method: 'POST',
          body: formdata,
          headers: {
            "Cookie": cookie ? cookie : '',
            "x-next-server-ip": ipAddress || ''

          }
      });
      const responseData = await response.json();
      console.log(responseData);
      imageId = responseData.id;
    }

    const postData = {
      type: 'post', // or 'image', 'job', 'poll'
      category: 'general', // or other relevant category
      content: postInput,
      imageId: imageId,
      isAnnonymous: false,
      visibility: {
        isPublic: true,
        connections: true,
        groups: [] 
      },
    };
    const response = await fetch('http://localhost:3333/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''
      },
      body: JSON.stringify(postData)
    });
    const responseData = await response.json();
    console.log(responseData);
  } catch (error: any) {
    console.log("Error creating post ", error);
    throw new Error("Failed to create post" + error);
  }

  revalidatePath("/");
}