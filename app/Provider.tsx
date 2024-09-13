"use client";

import Loader from "@/components/Loader";
import { getClerkUsers, getDocumentsUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import {
  ClientSideSuspense,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";

//j'ai retiré le provier romm car il va y avoir plusieurs rooms

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { user: clerkUser } = useUser();
  return (
    <LiveblocksProvider
      authEndpoint={"/api/liveblocks-auth"}
      //ici on setup le travail collaboratif
      //userIds provient de liveblocks
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      //ici on veut savoir quel user est dans quelle room
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentsUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        });

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
