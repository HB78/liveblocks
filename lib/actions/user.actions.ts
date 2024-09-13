"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { liveblocks } from "../liveblocks";
import { parseStringify } from "../utils";

export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    const { data } = await clerkClient().users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) =>
      users.find((user) => user.email === email)
    );
    return parseStringify(sortedUsers);
  } catch (error) {
    console.log("erreur dans user actions lib:", error);
  }
};

export const getDocumentsUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string;
  currentUser: string;
  text: string;
}) => {
  try {
    //on va chercher la room en uestion
    const room = await liveblocks.getRoom(roomId);

    //on va chercher les users qui ont acces a la room sauf le currentUser
    const users = Object.keys(room.usersAccesses).filter(
      (email) => email !== currentUser
    );

    //si on essaie de mentionner une personne
    if (text.length) {
      //le user que l'on cherche
      const lowerCaseText = text.toLowerCase();

      //on chercher le user pour voir si il existe dans la room
      const filteredUsers = users.filter((email: string) =>
        email.toLowerCase().includes(lowerCaseText)
      );

      //on renvoit le user si il existe
      return parseStringify(filteredUsers);
    }

    //on renvoit tous les users si le user n'existe pas dans la room
    return parseStringify(users);
  } catch (error) {
    console.log("error:dans getDocumentsUsers du server action", error);
  }
};
