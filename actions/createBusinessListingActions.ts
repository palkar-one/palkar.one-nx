'use server'

import { currentUser, getAuth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache";
import { headers } from 'next/headers'

export default async function createBusinessListingAction(formData: FormData) {
  const requestHeaders = await headers();
  const cookie = requestHeaders.get('Cookie');
  const ipAddress = requestHeaders.get('x-forwarded-for');  
  const user = await currentUser();
  if(!user) {
    throw new Error("User not authenticated");
  }

//    const postInput = formData.get("postInput") as string;
   const image = formData.get("listingImage") as File;

   let imageId: string | undefined;
   if(!formData) {
    throw new Error("form input is required");
   }

  if (!user?.id) {
    throw new Error("User not authenticated");
  }

  try {
    if(image.size > 0) {
      const formdata = new FormData();
      formdata.append('image', image);
      formdata.append('reference', 'listing');
      const response = await fetch('http://localhost:3333/image', {
          method: 'POST',
          body: formdata,
          headers: {
            "Cookie": cookie ? cookie : '',
             "x-next-server-ip": ipAddress || ''
          }
      });
      const responseData = await response.json();
      imageId = responseData.id;
    }
    const postData = {
        ...Object.fromEntries(formData),
    };

    delete postData['listingImage'];
    if(imageId){
        postData['imageId'] = imageId;
    }
    Object.keys(postData).forEach(key => {
      if (postData[key] === undefined || postData[key] === "undefined" ) {
        delete postData[key];
      }
    });

    const response = await fetch('http://localhost:3333/listing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Cookie": cookie ? cookie : '',
        "x-next-server-ip": ipAddress || ''
      },
      body: JSON.stringify(postData)
    });
    if(response?.status == 200){
      await response.json();
    } else {
      throw new Error("Failed to create post");
    }
  } catch (error: any) {
    console.log("Error creating post ", error);
    throw new Error("Failed to create post" + error);
  }

//   revalidatePath("/");
}