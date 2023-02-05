import { useSession } from 'next-auth/react';
import React from 'react';
import Image from 'next/image';

type Props = {
  seed?: string;
  large?: boolean;
};

const Avatar = ({ seed, large }: Props) => {
  const { data: session } = useSession();
  return (
    <div
      className={`relative overflow-hidden h-10 w-10 rounded-full border-gray-300 bg-white ${
        large && 'h-20 w-20'
      }`}
    >
      <Image
        alt="Avatar"
        fill
        src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${
          seed || session?.user?.name || 'placeholder'
        }`}
      />
    </div>
  );
};

export default Avatar;
