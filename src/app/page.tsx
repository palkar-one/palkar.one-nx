import PostFeed from "@/components/PostFeed";
import PostForm from "@/components/PostForm";
import UserInformation from "@/components/UserInformation";
import { SignedIn } from "@clerk/nextjs";
import getPostAction from "../../actions/getPostAction";
import Widget from "@/components/Widget";
export const revalidate = 0;

export default async function Home() {
  const posts = await getPostAction();
  // console.log(posts)
  return (
    <div className="grid grid-cols-1 md:grid-cols-8 mt-5 sm:px-5">
      <section className="hidden md:inline md:col-span-2">
      {/* {User Information}   */}
      <UserInformation posts={posts}/>
      </section>
      <section className="col-span-full md:col-span-6 xl:col-span-4 xl:max-w-xl mx-auto">
        <SignedIn>
         <PostForm />
        </SignedIn>
        <PostFeed posts={posts} />
      </section>
      <section className="hidden xl:inline justify-center col-span-2">
        <Widget />
      </section>
    </div>
  );
}
