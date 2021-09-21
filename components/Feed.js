import { useEffect, useState } from "react";
import Post from "./Post/Post";
import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Feed = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
      }),
    });
    const { posts } = await res.json();
    console.log(posts)
    setPosts(posts);
    setLoading(false);
  };

  useEffect(() => {
    console.time("posts");
    fetchPosts();
    console.timeEnd("posts");
  }, []);

  return (
    <div className="flex flex-col overflow-y-auto" style={{ margin: "52px 0" }}>
      {loading ? (
        <>
          {[0, , 1].map((skel, i) => (
            <div key={i} className="flex flex-col mb-3">
              <div className="flex items-center px-2">
                <SkeletonCircle size="10" />
                <SkeletonText className="ml-2" noOfLines={1} width={"50px"} />
              </div>
              <Skeleton className="my-2" height="240px" />
              <div className="px-2">
                <div className="flex items-center space-x-2">
                  <SkeletonCircle size="7" />
                </div>
                <div className="flex items-center my-2">
                  <SkeletonText className="" noOfLines={1} width={"8px"} />
                  <SkeletonText className="ml-1" noOfLines={1} width={"24px"} />
                </div>
                <div className="flex items-center">
                  <SkeletonText className="" noOfLines={1} width={"50px"} />
                  <SkeletonText
                    className="ml-2"
                    noOfLines={1}
                    width={"120px"}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : posts.length === 0 && !loading ? (
        <p>Go follow someone</p>
      ) : (
        <>
          {posts.map((post) => {
            return (
              <Post
                key={post._id}
                postId={post._id}
                username={post.username}
                avatarSrc={post.avatarSrc}
                imageSrc={post.imageSrc}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                date={post.dateCreated}
                myUsername={user.username}
              />
            );
          })}
        </>
      )}
    </div>
  );
};

export default Feed;
