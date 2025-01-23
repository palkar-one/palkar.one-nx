'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function likeUnlikePostAction(id:string, likePost: boolean) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  try {
    let url;
    if(likePost) {
      url = 'http://localhost:3333/post/'+ id +'/like';
    } else {
      url = 'http://localhost:3333/post/'+ id +'/unlike';
    }
    const response:Response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''

      },
    });
    const responseData = await response.json();
    console.log(responseData);
    if(response?.status === 200) {
      return { status: 200, likes: responseData?.likes };
    }
  } catch (error: any) {
    console.log(error);
    throw new Error("Failed to like or unlike posts", error);
  }

}