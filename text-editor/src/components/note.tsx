import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { ButtonNames } from '../constants';
import { Task } from '../App';
import { Hashtag } from './hashtag';

export const Note = ({
  editTask,
  deleteTask,
  deleteHashtag,
  task,
}: {
  editTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  deleteHashtag: (tag: string) => void;
  task: Task;
}) => {
  return (
    <Card style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Text>{task.task}</Card.Text>
        {task.hashtag.length > 0 &&
          task.hashtag.map((x) => <Hashtag key={x} hashtag={x} deleteHashtag={deleteHashtag} />)}
        <div className='d-flex' style={{ height: '40px' }}>
          <Button variant='primary' onClick={() => editTask(task)}>
            {ButtonNames.edit}
          </Button>
          <Button variant='danger' onClick={() => deleteTask(task.id)}>
            {ButtonNames.delete}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
