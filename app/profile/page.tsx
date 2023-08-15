"use client";

import { useState, useEffect, useInsertionEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { Prompt } from "@types";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Prompt[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      // @ts-ignore
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };
    // @ts-ignore
    if (session?.user?.id) fetchPosts();
    // @ts-ignore
  }, [session?.user?.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete prompt?");
    if (hasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts?.filter((p) => p._id !== post._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }

    router.push(`/update-prompt?id=${post._id}`);
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
