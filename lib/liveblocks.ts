//le code qui va nous servir a nous connecter a l'api liveblocks partout

import { Liveblocks } from "@liveblocks/node";

export const liveblocks = new Liveblocks({
  secret: process.env.SECRET_LIVEBLOCKS as string,
});
