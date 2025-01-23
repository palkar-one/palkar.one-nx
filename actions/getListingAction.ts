'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function getListingAction(search:any) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie'); 
  const ipAddress = requestHeaders.get('x-forwarded-for'); 
  try {
    const response = await fetch('http://localhost:3333/listing'+ '?query='+ search, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''

      },
    });
    const responseData = await response.json();
    if(responseData?.data.length){
        return responseData;
    }
    return [];
  } catch (error: any) {
    throw new Error("Failed to fetch posts", error);
  }

}