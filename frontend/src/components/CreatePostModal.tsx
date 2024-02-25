import React, { Dispatch, FC, SetStateAction, useState } from "react";
import usePosts from "@/hooks/usePosts";

interface IModal {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const CreatePostModal: FC<IModal> = ({ openModal, setOpenModal }) => {
  const [postInput, setPostInput] = useState("");

  const { createPost } = usePosts();

  const handleCreatePost = async () => {
    const hash = await createPost(postInput);
    setPostInput("");
    setOpenModal(false);
    console.log(hash);
  };

  return (
    <div
      className={`${
        openModal ? "fixed" : "hidden"
      } top-0 left-0 bg-opacity-0 backdrop-blur-sm w-screen h-screen grid place-content-center`}
      onClick={() => setOpenModal(false)}
    >
      <form
        className={"px-4 py-6 grid gap-2 bg-gray-800 rounded-xl"}
        onSubmit={(e) => {
          e.preventDefault();
          handleCreatePost().then((r) => r);
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <label htmlFor="text" className={"text-xl font-bold"}>
          Rex it down
        </label>
        <textarea
          name="text"
          id="text"
          value={postInput}
          required={postInput.length < 3}
          className={
            "w-96 p-2 text-black focus-visible:outline-gray-700 focus-visible:outline-1 rounded"
          }
          onChange={(e) => setPostInput(e.target.value)}
        />
        <button
          type="submit"
          className="border-gray-100 border rounded p-2 text-lg font-black bg-gray-500 bg-opacity-20"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostModal;
