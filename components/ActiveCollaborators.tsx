import { useOthers } from "@liveblocks/react/suspense";
import Image from "next/image";

const ActiveCollaborators = () => {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);

  return (
    <ul>
      {collaborators.map(({ name, id, avatar, color }) => (
        <li key={id}>
          <Image
            src={avatar}
            width={100}
            height={100}
            alt={name}
            className="rounded-full inline-block size-8 ring-2 ring-dark-100"
            style={{ border: `3px solid ${color}` }}
          />
        </li>
      ))}
    </ul>
  );
};

export default ActiveCollaborators;
