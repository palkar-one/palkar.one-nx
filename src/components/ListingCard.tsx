'use client'
import { useUser } from "@clerk/nextjs";
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { CircleCheckBig, MapPin, Pencil, Phone, Star, Trash2, TrendingUp } from "lucide-react";
import deletePostAction from "../../actions/deletePostAction";
import Image from 'next/image';
import PostOptions from "./PostOptions";
import { toast } from "sonner";
import { useState } from "react";
import { categories } from "@/lib/constants";
import BusinessForm from "./BusinessForm";

function ListingCard({listing}: {listing:any}) {
   const { user } = useUser();

   const [showNumber, setShowNumber] = useState(false);
   const [showBusinessModal, setShowBusinessModal] = useState(false);

   const category = categories.find(item => item.name === listing?.category);
   const handleBusinessModal = () => {
        setShowBusinessModal(!showBusinessModal);
    }   

    return (
    <div className="col-span-full my-4 bg-white rounded-md border shadow-sm p-4 grid grid-cols-1 md:grid-cols-8 gap-1">
      {/* Business Image */} 
        <div className="md:col-span-3 sm:col-span-4 justify-center items-center">
            <Image
            alt="Business Image"
            src={listing?.imagePath || "/image-na.jpg"}
            width={350}
            height={350}
            className="rounded-md object-cover"
            />
        </div>

        {/* Business Details */}
        <div className="md:col-span-5 sm:col-span-4 space-y-2 grid">
            <div className="flex justify-between">
                <p className="text-xl font-semibold">{listing.businessName}</p>
                {/* <div className="flex space-x-2">
                    <Button variant={"outline"} onClick={handleBusinessModal}>
                        <Pencil />
                    </Button>
                    <Button variant={"destructive"}>
                        <Trash2 />
                    </Button>
                    
                </div> */}
            </div>
            {/* Badges */}
            <div className="flex flex-wrap md:space-y-0 justify-left">
                <Button
                    variant="outline"
                    className="postButton mx-1"
                >
                    <Star className="text-yellow-500 fill-current" />
                    <span>{listing?.ratings?.value || 0} / 0 Ratings</span>
                </Button>
                {/* <Button
                    variant="outline"
                    className="postButton mx-1"
                >
                    <TrendingUp className="text-orange-500" />
                    Trending
                </Button> */}
                <Button
                    variant="outline"
                    className="postButton mx-1"
                >
                    <CircleCheckBig className="text-green-500" />
                    Verified
                </Button>
            </div>
            
            <div className="flex items-center  space-x-2">
            <p>{category?.display || ''}</p>

            <MapPin className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-600">{listing.city}</p>
            </div>
            <p className="text-sm text-gray-600">
            <span className="font-medium">{listing.yourName}</span> 
            </p>
            {listing.googleMapLocation && (
            <a
                href={listing.googleMapLocation}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 text-sm underline"
            >
                View on Google Maps
            </a>
            
            )}
            {listing.email && (
                <p className="font-medium">{listing.email}</p> 
            )}
            <div>
                <p>{listing?.whatYouDo 
                || "No Other Details"}</p>
            </div>
            <div className="flex flex-wrap self-end md:space-x-4">
            {/* Show Number */}
            <a className = "postButton pb-2" href={`tel:${listing.phone}`}>
            <Button
                variant="outline"
                className="postButton mx-1"
                onClick={() => {
                    setShowNumber(!showNumber)
                }}
            >
            <Phone />
            {showNumber ? listing.phone : "Show/Call Number"}
            </Button>
            </a>
            {/* WhatsApp */}
            <a className = "postButton" href={`https://wa.me/${listing.phone}`} target="_blank" rel="noopener noreferrer">
            <Button
                variant="outline"
                className="postButton bg-green-100 hover:bg-green-200"
            >
                <Phone className="text-green-600" />
                WhatsApp
            </Button>
            </a>
        </div>
        </div>
        <div>
            <BusinessForm showBusinessModal={showBusinessModal} setShowBusinessModal={setShowBusinessModal}/>
        </div>
    </div>
    )
    
}

export default ListingCard;