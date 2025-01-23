'use client'
import { SignedIn, useUser } from "@clerk/nextjs";
import { AvatarImage, AvatarFallback, Avatar } from "./ui/avatar";
import { Badge } from "./ui/badge";
import ReactTimeago from "react-timeago";
import { Button } from "./ui/button";
import { MessageCircle, Repeat2, Send, ThumbsUpIcon, Trash2 } from "lucide-react";
import deletePostAction from "../../actions/deletePostAction";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import likeUnlikePostAction from "../../actions/likeUnlikePostAction";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

function PostOptions({post}: {post:any}) {
    const { user } = useUser();
    const [isCommentsOpen, setIsCommentsOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(post.likes);

    useEffect(() => {
        if(user?.id && post.likes?.includes(user?.id)) {
            setLiked(true);
            setLikes(post.likes);
        }
    }, [post,user]);

    const likeOrUnlikePost = async (id:string) => {
        if(!user?.id) {
            throw new Error("User not authenticated");
        }
        console.log(likes)
        const originalLiked = liked;
        const index = likes?.findIndex((like: string) => like === user?.id);
        let newLikes: any[] = [], likePost;
        if(index === -1 || index === undefined) {
          likePost = true;
          newLikes = [...likes ?? [], user?.id];
        } else {
          likePost = false;
          newLikes = likes?.filter((like:string) => like !== user?.id);
        }

        console.log(liked, newLikes)
        setLiked(!liked);
        setLikes(newLikes);

        const response = await likeUnlikePostAction(id, likePost);
       
        if(response?.status !== 200) {
            setLikes(response?.likes);
            setLiked(originalLiked);
        }
    }
    return (
    <div className="flex flex-col">
        <div className="flex justify-between p-4">
            <div>
                {likes && likes?.length > 0 && (
                    <p className="text-xs text-gray-500 cursor-pointer hover:underline">
                        {likes?.length} Likes
                    </p>
                )}
            </div>
            <div>
                {post?.comments && post.comments?.length > 0 && (
                    <p
                        onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                        className="text-xs text-gray-500 cursor-pointer hover:underline"
                    >
                        {post.comments?.length} Comments
                    </p>
                )}
            </div>
        </div>
        <div className="flex p-2 flex-wrap px-2 border-t">
            <Button
                variant="ghost"
                className="postButton"
                onClick={() => likeOrUnlikePost(post?._id)}
            >
                <ThumbsUpIcon
                    className={cn("mr-1", liked && "text-[#4881c2] fill-[#4881c2]")}
                />
                <p>Like</p>
            </Button>

            <Button
                variant="ghost"
                className="postButton"
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            >
                <MessageCircle
                    className={cn("mr-1", isCommentsOpen && "text-gray-600 fill-gray-600")}
                />
               <p>Comment</p>
            </Button>
            {/* <Button
                variant="ghost"
                className="postButton"
            >
                <Repeat2
                    className="mr-1"
                />
               <p>Repost</p>
            </Button>
            <Button
                variant="ghost"
                className="postButton"
            >
                <Send
                    className="mr-1"
                />
                <p>Send</p>
            </Button> */}
        </div>
        {isCommentsOpen && (
            <div className="p-4">
                <SignedIn>
                    <CommentForm post={post} />
                </SignedIn>
                <CommentFeed post={post} />
            </div>
        )}
    </div>
    );
}

export default PostOptions;