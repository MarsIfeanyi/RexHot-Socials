import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import CreatePostModal from "@/components/CreatePostModal";

const CreatePost = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div
        className="fixed bottom-10 right-10 flex items-center gap-2 group bg-gray-400 bg-opacity-20 rounded-full cursor-pointer transition-all border border-gray-500"
        onClick={() => setOpenModal(true)}
      >
        <button>
          <IoMdAddCircle className={"w-14 h-14 "} />
        </button>
        <p className={"text-lg font-bold hidden group-hover:block pr-4"}>
          Create Post
        </p>
      </div>

      <CreatePostModal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default CreatePost;
