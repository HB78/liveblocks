"use client";

import { updateDocument } from "@/lib/actions/room.action";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClientSideSuspense, RoomProvider } from "@liveblocks/react/suspense";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ActiveCollaborators from "./ActiveCollaborators";
import { Editor } from "./editor/Editor";
import Header from "./Header";
import Loader from "./Loader";
import ShareModal from "./ShareModal";
import { Input } from "./ui/input";

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  users,
  currentUserType,
}: CollaborativeRoomProps) => {
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //Cette fonction est appelé pour enregistrer le titre quand l'utilisateur appuie sur la touche entrée
    if (e.key === "Enter") {
      setLoading(true);
      try {
        if (documentTitle !== roomMetadata.title) {
          const updateDoc = await updateDocument(roomId, documentTitle);

          if (updateDoc) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.log(
          "erreur dans updateTitleHandler dans collaborativeRoom",
          error
        );
      }
      setLoading(false);
    }
  };

  //ce useEffect permet de détecter quand l'utilisateur clique sur le document
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Si l'événement n'est pas un clic de souris, ou si le clic a été effectué sur un élément qui n'est pas contenu dans le container, on ne fait rien.
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };
    // document.addEventListener('mousedown', handleClickOutside) attache la fonction handleClickOutside à tous les clics de souris sur la page. Donc, chaque fois que je cliques quelque part, cette fonction est exécutée.
    document.addEventListener("mousedown", handleClickOutside);

    // Le code dans return est une fonction de nettoyage. Il s'assure que, lorsque le composant n'est plus affiché ou si useEffect doit être exécuté de nouveau, l'événement mousedown est correctement retiré. Cela évite les erreurs et les fuites de mémoire.
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roomId, documentTitle]);

  useEffect(() => {
    //quand l'utilisateur clique sur le document, on centre le curseur sur le champ de saisie

    // La raison pour laquelle on vérifie inputRef.current est de s'assurer que l'élément DOM existe avant d'essayer de faire quelque chose avec, comme déplacer le curseur dans ce cas.

    // Sécurité : Il est possible que inputRef.current soit null si l'élément DOM n'est pas encore monté ou si la référence n'a pas été correctement assignée. Si tu essaies d'appeler .focus() sur null, cela provoquerait une erreur. La condition inputRef.current évite cela en s'assurant que l'élément existe avant de tenter d'interagir avec lui.

    // => toujours vérifier que l'élément existe avant de l'utiliser surtout qd on utilise un event

    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);
  return (
    //chaque room aura son id qui sera dynamique
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !loading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !editing && (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => setEditing(true)}
                  className="pointer"
                />
              )}

              {currentUserType !== "editor" && !editing && (
                <p className="view-only-tag">View only</p>
              )}

              {loading && <p className="text-sm text-gray-400">saving...</p>}
            </div>

            <div className="flex w-full gap-2 flex-1 justify-end sm:gap-3">
              <ActiveCollaborators />
              <ShareModal
                roomId={roomId}
                collaborators={users}
                creatorId={roomMetadata.creatorId}
                currentUserType={currentUserType}
              />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor roomId={roomId} currentUserType={currentUserType} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
