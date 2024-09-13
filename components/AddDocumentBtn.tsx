"use client";
import { createDocument } from "@/lib/actions/room.action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const AddDocumentBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const router = useRouter();

  const addDocumentHandler = async () => {
    try {
      const room = await createDocument(userId, email);
      if (room) router.push(`/document/${room.id}`);
    } catch (error) {
      console.log("addDocumentBtn:", error);
    }
  };
  return (
    <Button
      className="gradient-blue flex gap-1 shadow-md"
      type="submit"
      onClick={addDocumentHandler}
    >
      <Image
        src={"./assets/icons/add.svg"}
        alt="add doc"
        width={24}
        height={24}
      />
      <span className="hidden sm:block">Start a blank document</span>
    </Button>
  );
};

export default AddDocumentBtn;
