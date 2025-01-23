import Post from "./Post";

async function PostFeed({posts}: {posts:any}) {
    return <div className="space-y-2 pb-20">
        {posts?.map((post: any) => ( 
            <Post key={post._id} post={post}/>
        ))}
    </div>
}

export default PostFeed;