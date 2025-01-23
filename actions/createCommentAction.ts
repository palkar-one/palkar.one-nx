'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function createCommentAction(postId: string, formData: FormData) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const user = await currentUser();
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  const commentInput = formData.get("commentInput") as string;
  if(!user) {
  throw new Error("User not authenticated");
  }
  if(!postId) {
    throw new Error("Post id is required");
  }
  if(!commentInput) {
    throw new Error("Comment input is required");
  }

  const userDB = {
    userId: user.id,
    userImage: user.imageUrl,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  }

  const postData = {
    content: commentInput,
    user: userDB,
  }

  try {
  const url = 'http://localhost:3333/post/'+ postId +'/comment';
  const response = await fetch(url, {
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
    console.log("Error creating post comment", error);
    throw new Error("Failed to create post" + error);
  }

  revalidatePath("/");
}