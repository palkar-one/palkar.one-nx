'use client'
import { useUser } from "@clerk/nextjs";
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import deletePostAction from "../../actions/deletePostAction";
import Image from 'next/image';
import PostOptions from "./PostOptions";
import { toast } from "sonner";

function Post({post}: {post:any}) {
   const { user } = useUser();

   const isAuthor = user?.id === post?.user?.userId;

    return <div className="bg-white rounded-md border">
        <div className="p-4 flex space-x-2">
            <div>
                <Avatar>
                    <AvatarImage src={post?.user?.userImage} />
                    <AvatarFallback>
                        {post?.user?.firstName?.charAt(0)}
                        {post?.user?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="flex justify-between flex-1">
                <div>
                    <span className="font-semibold">
                        {post?.user?.firstName} {post?.user?.lastName}{" "}
                        {isAuthor && 
                            <Badge className="ml-2" variant="secondary">
                                Author
                            </Badge>}
                    </span>
                    <p className="text-xs text-gray-400">
                        @{post?.user?.firstName}
                        {post?.user?.firstName}-{post?.user?.userId.toString().slice(-4)}
                    </p>

                    <p className="text-xs text-gray-400">
                        <ReactTimeago date={new Date(post?.createdAt)} />
                    </p>
                </div>
                {isAuthor && (
                    <Button variant={'outline'} onClick={() => {
                        const promise = deletePostAction(post?._id);
                        // toast
                        toast.promise(promise, {
                            loading: "Deleting Post...",
                            success: "Post Deleted",
                            error: "Error deleting post"
                        })
                    }}>
                        <Trash2 />
                    </Button>
                )}
            </div>
        </div>
        <div>
            <p className="px-4 pb-2 mt-2">
                {post?.content}
            </p>
            {post?.imagePath && (
                <Image alt="Post Image" src={post?.imagePath} width={500} height={500} />
            )}
        </div>
        <div>
            <PostOptions
                post={post}
            />
        </div>
        
    </div>
}

export default Post;