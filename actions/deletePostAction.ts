'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function deletePostAction(postId: string) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  const user = await currentUser();
 
  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    await fetch('http://localhost:3333/post/'+ postId, {
      method: 'DELETE',
      headers: {
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''
      },
    });
  } catch (error: any) {
    console.log("Error deleting post ", error);
    throw new Error("Failed to delete post" + error);
  }

  revalidatePath("/");
}