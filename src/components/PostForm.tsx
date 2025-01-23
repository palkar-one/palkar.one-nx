'use client'

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Building2, ChartColumnBig, ImageIcon, SendHorizontal, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import createPostAction from "../../actions/createPostAction";
import { Button } from "./ui/button";

import { toast } from "sonner";
import BusinessForm from "./BusinessForm";
import PollForm from "./PollForm";

function PostForm() {
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { user } = useUser();
    const [preview, setPreview] = useState<string | null>(null);
    const [showBusinessModal, setShowBusinessModal] = useState(false);
    const [showPollModal, setShowPollModal] = useState(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event?.target.files?.[0];
        if(file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleBusinessModal = () => {
        setShowBusinessModal(!showBusinessModal);
    }

    const handlePollModal = () => {
        setShowPollModal(!showPollModal);
    }

    const handlePostAction = async (formData: FormData) => {
        const formDataCopy = formData;
        ref.current?.reset();

        const text = formDataCopy.get('postInput') as string;

        if(!text.trim()){
            throw new Error("You must provide a post input")
        }

        setPreview(null);

        try {
            await createPostAction(formDataCopy);
        } catch(error){
            console.log("Error creating post ", error);
        }
    } 

    return (
        <div className="mb-2">
            <form ref={ref} action={formData => {
                // handle form submission
                const promise = handlePostAction(formData);
                toast.promise(promise, {
                    loading: "Posting...",
                    success: "Post created",
                    error: "Error creating post"
                })
                // toast notification
            }} className="p-3 bg-white rounded-lg border">
                <div className="flex items-center space-x-2">
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>
                            {user?.firstName?.charAt(0)} 
                            {user?.lastName?.charCodeAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <input 
                        type="text"
                        name="postInput"
                        placeholder="Likatho harmam keruvo..."
                        className="flex-1 outline-none rounded-full py-3 px-4 border" 
                    />

                    <input 
                        ref={fileInputRef}
                        type="file"
                        name="image" 
                        accept="image/*" 
                        hidden
                        onChange={handleImageChange}
                    />
                    <button type="submit">
                        <SendHorizontal />
                        
                    </button>
                </div>
                {preview && (
                    <div className = "mt-3">
                        <img src={preview} alt="Preview" className="w-full object-cover" />
                    </div>
                )}
                <div className="flex justify-between mt-2 space-x-2">
                    {/* <Button className="border-none" type="button" variant={preview ? "secondary":"outline"} onClick={handlePollModal}>
                        <ChartColumnBig className="mr-2" size={16} color="currentColor"/>
                        Poll
                    </Button> */}
                    <Button className="border-none" type="button" variant={preview ? "secondary":"outline"} onClick={handleBusinessModal}>
                        <Building2 className="mr-2" size={16} color="currentColor"/>
                        Listing
                    </Button>
                    <Button className="border-none" type="button" variant={preview ? "secondary":"outline"} onClick={()=> fileInputRef.current?.click()}>
                        <ImageIcon className="mr-2" size={16} color="currentColor" />
                        {preview? "Change" : "Add"} image
                    </Button>
                    {preview && (
                    <Button type="button" variant="outline" onClick={() => setPreview(null)}>
                        <XIcon className="mr-2" size={16} color="currentColor" />
                        Remove Image
                    </Button>
                )}
                </div>
            </form>
            <hr className="mt-2 border-gray-300" />
            <div>
                <BusinessForm showBusinessModal={showBusinessModal} setShowBusinessModal={setShowBusinessModal}/>
            </div>
            {/* <div>
                <PollForm showPollModal={showPollModal} setShowPollModal={setShowPollModal}/>
            </div> */}
        </div>
    )

}

export default PostForm
