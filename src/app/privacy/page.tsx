'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default async function AboutUs() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNumber, setShowNumber] = useState(false);


 return <div>
      <Card className={cn('w-full')}>
      <CardHeader className="flex flex-col items-center justify-center gap-2">
        <h3 className="text-2xl font-bold text-left">PalkarOne: Privacy Policy</h3>
      </CardHeader>
      <CardContent>
        <p className="font-extrabold">1. Information We Collect</p>
        <p className="pt-1 text-sm">We collect the following types of information:</p>
        <p className="pt-3 font-semibold">a. Personal Information You Provide:</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li> Name, email address, phone number, and contact details.</li>
          <li> Business information, such as business names, categories, and descriptions.</li>
          <li> Photos or other media you upload.</li>
          <li> Social media links or profiles you choose to share.</li>
          <li> Other information you voluntarily provide, such as feedback or survey responses.</li>
        </ul>
        <p className="font-semibold">b. Automatically Collected Information</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li> IP address and browser type.</li>
          <li> Device information, including operating system and unique device identifiers.</li>
          <li> Usage data, such as pages visited, clicks, and time spent on the platform.</li>
          <li> Location data, if enabled and approved on your device.</li>
          <li> Other information you voluntarily provide, such as feedback or survey responses.</li>
        </ul>
        <p className="font-semibold">c. Third-Party Data</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li> Authentication providers (e.g., Google, Facebook) for login purposes.</li>
          <li> Analytics tools to enhance user experience.</li>
          <li> Publicly available business data for listing verification.</li>
        </ul>
        <p className="font-semibold">d. Community Interactions</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-10">
          <li> Comments, likes, and other interactions.</li>
          <li> User reviews and ratings.</li>
          <li> Communication data between users (e.g., messages).</li>
        </ul>
        <p className="font-extrabold">2.How We Use Your Information</p>
        <p className="pt-1 text-sm">We use your information to:</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li> Provide, operate, and improve our Services.</li>
          <li> Facilitate business listings and community interactions.</li>
          <li> Communicate with you about updates, promotions, and customer support.</li>
          <li> Ensure the security and integrity of our platform.</li>
          <li> Verify business details for accuracy and authenticity.</li>
        </ul>
        <p className="font-extrabold">3. Sharing Your Information</p>
        <p className="pt-1 text-sm font-extrabold">We do not sell your personal information. However, we may share your data with</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li><span className="font-bold text-gray-700">Service Providers:</span>Third-party vendors that help us operate our Services, such as payment processors, cloud hosting, and analytics providers.</li>
          <li><span className="font-bold text-gray-700">Community Visibility:</span>Certain information, such as your business listings, reviews, and ratings, may be publicly visible to other users.</li>
          <li><span className="font-bold text-gray-700">Legal Requirements:</span>Authorities, if required by law or to protect our rights.</li>
          <li><span className="font-bold text-gray-700">Business Transfers:</span>In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
        </ul>
        <p className="font-extrabold">4. Data Security</p>
        <p className="pt-1 text-sm font-extrabold">We implement industry-standard security measures to protect your information. However, no system is completely secure. Please use caution when sharing sensitive information online.</p>
        <p className="font-extrabold pt-4">5. Deleting User Data</p>
        <p className="pt-1 text-sm font-extrabold">You can submit a request to palkar.one as a email request and we will be able to delete your collected data from our systems. </p>

        <p className="font-extrabold pt-4">* Other Items</p>
        <ul className="text-sm text-gray-500 list-disc px-4 pb-4">
          <li><span className="font-bold text-gray-700">Access and Correction:</span>You can update or correct your information by accessing your account settings.</li>
          <li><span className="font-bold text-gray-700">Opt-Out:</span>You can opt out of marketing communications by following the instructions in the emails.</li>
          <li><span className="font-bold text-gray-700">Privacy Settings:</span>You can manage the visibility of your profile and business listings through account settings.</li>
          <li><span className="font-bold text-gray-700">Children's Privacy:</span>Our Services are not intended for individuals under the age of 13. We do not knowingly collect personal information from children. However there can be some educational content for kids which can be accessed with Adult's governance.</li>
        </ul>
       
        <p className="font-extrabold">Changes to This Privacy Policy</p>
        <p className="pt-1 text-sm font-semibold">We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Your continued use of our Services signifies your acceptance of the revised policy.</p>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
      <p className="font-extrabold">Contact Us</p>
      <p className="pt-1 text-sm font-semibold">If you have questions or concerns about this Privacy Policy, please contact us:</p>
      <p className="pt-1 text-sm font-semibold">Email: palkar.one@gmail.com Phone: +919962061030</p>

      </CardFooter>
    </Card>
    </div>
}