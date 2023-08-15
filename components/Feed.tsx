"use client";
import { useState, useEffect, useRef } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@types";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleEdit={() => {}}
          handleDelete={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const [searchedResults, setSearchedResults] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return posts.filter(
      (post) =>
        regex.test(post.creator.username) ||
        regex.test(post.tag) ||
        regex.test(post.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(timerRef.current);
    setSearchText(e.target.value);

    timerRef.current = setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {/* All  Prompts */}

      <PromptCardList
        data={searchText ? searchedResults : posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
