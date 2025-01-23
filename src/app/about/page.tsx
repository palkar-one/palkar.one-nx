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
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={400}
          height={400}
          className="rounded-full"
        />
        <h3 className="text-2xl font-bold text-left">PalkarOne: A Community Initiative</h3>
      </CardHeader>
      <CardContent>
        <p>Namaskar,</p>
        <p className="text-sm text-gray-500">
          Palkar.One goes beyond a directory. It's a platform that connects Sourashtra people fostering a collaborative space for mutual success. It's the one-stop shop for everything Sourashtra!
			  </p>
        <p className="pt-3">Let's explore what Palkar.One offers:</p>
        <ul className="text-sm text-gray-500 list-disc px-4">
          <li><span className="font-bold text-gray-700">Business Directory:</span> Discover a vast network of talented Sourashtra professionals offering a wide range of services. Find everything you need, from caterers in Madurai to prohitars in Chennai, all conveniently located in one place.</li>
          <li><span className="font-bold text-gray-700">Community Hub:</span> Connect with fellow Sourashtrians, share experiences, and build lasting relationships. Palkar.One fosters a vibrant online space to celebrate your heritage and connect with your community.</li>
          <li><span className="font-bold text-gray-700">Future Features: </span> We're constantly innovating to bring even more value to your life. Stay tuned for exciting new features like event listings, classifieds, and forums, all designed to empower and connect the Sourashtra community.</li>
        </ul>
        <div className={isExpanded? "" : "hidden"}>
          <p className="pt-3">Meet the Developers:</p>
          <ul className="text-sm text-gray-500 list-disc px-4">
            <li>Palkar.One is a passion project, currently being built by a dedicated team. We believe in the power of collaboration and are always eager to welcome new contributors.</li>
            <li>Are you a college student looking to gain real-world experience? Interested in contributing to a meaningful project that supports the Sourashtra community? We invite you to join us!</li>
            <li>Contact us if you're interested in contributing to the development of Palkar.One. Let's build something amazing together!</li>
            <div className="pt-3 flex flex-wrap md:space-x-4">
            {/* Show Number */}
              <a className = "postButton pt-2" href={`tel:9962061030`}>
              <Button
                  variant="outline"
                  className="postButton mx-1"
                  onClick={() => {
                      setShowNumber(!showNumber)
                  }}
              >
              <Phone />
              {showNumber ? '+919962061030' : "Show/Call Number"}
              </Button>
              </a>
              {/* WhatsApp */}
              <a className = "postButton pt-2" href={`https://wa.me/9962061030`} target="_blank" rel="noopener noreferrer">
              <Button
                  variant="outline"
                  className="postButton bg-green-100 hover:bg-green-200"
              >
                  <Phone className="text-green-600" />
                  WhatsApp
              </Button>
              </a>
            </div>
          </ul>
        </div>
        
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <Button variant="secondary" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
        </Button>
      </CardFooter>
    </Card>
    </div>
}