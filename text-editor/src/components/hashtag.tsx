import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

export const Hashtag = ({
  deleteHashtag,
  hashtag,
}: {
  deleteHashtag: (hashtag: string) => void;
  hashtag: string;
}) => {
  return (
    <span>
      {hashtag}
      <AiOutlineDelete onClick={() => deleteHashtag(hashtag)} />
    </span>
  );
};
