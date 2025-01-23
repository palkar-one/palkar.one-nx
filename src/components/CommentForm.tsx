'use client';
import { useUser } from "@clerk/nextjs";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import createCommentAction from "../../actions/createCommentAction";
import { toast } from "sonner";

function CommentForm({post}: {post:any}) {
    const { user } = useUser();
    const ref = useRef<HTMLFormElement>(null);

    const createCommentActionWithPostId = createCommentAction.bind(null, post._id);
    
    const handleCommentAction = async (formData: FormData): Promise<void> => {
        if(!user?.id) {
            throw new Error("User not authenticated");
        }

        const formDataCopy = formData;
        ref.current?.reset();

        try {
            await createCommentActionWithPostId(formDataCopy);
        } catch(error) {
            console.log("Error creating comment ", error);
        }
    }
    return (
    <form 
        ref={ref}
        action={(formData) => {
            const promise = handleCommentAction(formData);
            // toast
            toast.promise(promise, {
                loading: "Commenting...",
                success: "Comment created",
                error: "Error creating comment"
            })
        }
            
        }
        className="flex items-center space-x-1"
    >
        <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
            </AvatarFallback>
        </Avatar>

        <div className="flex flex-1 bg-white border rounded-full px-3 py-2">

            <input 
                type="text"
                name="commentInput"
                placeholder="Add a Comment..."
                className="outline-none flex-1 text-sm bg-transparent"
            />
            <button 
                type="submit"
                hidden
            >
                Comment
            </button>
        </div>

    </form>)
}

export default CommentForm;