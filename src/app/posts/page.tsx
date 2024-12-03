"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type PostItem = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

type Post = {
  posts: PostItem[];
  success: boolean;
};

const PostsPage = () => {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchPosts = async () => {
        const res = await fetch("/api/posts");
        const data: Post = await res.json();
        setPosts(data);
      };

      fetchPosts();
    }
  }, [status]);

  const handleDelete = async (postId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmed) return;

    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setPosts((prevPosts) =>
        prevPosts
          ? {
              ...prevPosts,
              posts: prevPosts.posts.filter((post) => post.id !== postId),
            }
          : null
      );
      alert("Post deleted successfully");
    } else {
      alert("Failed to delete post");
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You must be logged in to view this page.</p>;
  }

  return (
    <div>
      <h1>Posts</h1>
      {posts?.posts.length ? (
        posts.posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            {String(post.authorId) === session?.user?.id && (
              <>
                <button onClick={() => handleDelete(post.id)}>Delete</button>
                <a href={`/posts/${post.id}/edit`}>Edit</a>
              </>
            )}
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default PostsPage;
