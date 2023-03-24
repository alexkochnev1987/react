import React, { useState } from 'react';
import { Task } from '~/App';
import Button from 'react-bootstrap/Button';
import styles from './editor.module.scss';
import { Hashtag } from './hashtag';
import { ButtonNames } from '../constants';

export const Editor = ({
  saveTask,
  deleteTask,
  deleteHashtag,
  myTask,
}: {
  saveTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  deleteHashtag: (tag: string) => void;
  myTask: Task | undefined;
}) => {
  const [task, setTask] = useState<string>(myTask?.task ? myTask?.task : '');
  const [hashtag, setHashtag] = useState<string[]>([]);

  const onChangeTask = (string: string) => {
    const myHashTag = string
      .split('\n')
      .join(' ')
      .split('\r')
      .join(' ')
      .split(' ')
      .filter((x) => x[0] === '#');
    const arr = new Set([...myHashTag]);
    setHashtag([...arr]);
    setTask(string);
  };

  const deleteTag = (tag: string) => {
    const newHashtags = hashtag.filter((x) => x !== tag);
    setHashtag(newHashtags);
    deleteHashtag(tag);
  };

  return (
    <div>
      {hashtag.length > 0 &&
        hashtag.map((x) => <Hashtag key={x} hashtag={x} deleteHashtag={deleteTag} />)}
      <textarea
        className={styles.textarea}
        cols={30}
        rows={10}
        value={task}
        onChange={(e) => onChangeTask(e.currentTarget.value)}
      ></textarea>
      <div>
        <Button variant='danger' onClick={() => (myTask ? deleteTask(myTask.id) : '')}>
          {ButtonNames.delete}
        </Button>
        <Button
          variant='primary'
          onClick={() => {
            if (myTask) saveTask({ id: myTask.id, task: task, hashtag: hashtag });
          }}
        >
          {ButtonNames.save}
        </Button>
      </div>
    </div>
  );
};
