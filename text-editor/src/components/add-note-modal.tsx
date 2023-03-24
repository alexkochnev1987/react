import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/esm/Modal';
import { Task } from '~/App';
import { ButtonNames, Tips } from '../constants';
import { useState } from 'react';
import { Hashtag } from './hashtag';

export const AddNoteModal = ({
  saveTask,
  deleteHashtag,
  myTask,
  show,
  onHide,
}: {
  saveTask: (task: Task) => void;
  deleteHashtag: (tag: string) => void;
  myTask: Task;
  show: boolean;
  onHide: () => void;
}) => {
  const [task, setTask] = useState<string>(myTask.task);
  const [hashtag, setHashtag] = useState<string[]>(myTask.hashtag);

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

  const highLighter = (string: string) => {
    const splitedString = string.split(' ');
    if (splitedString.length > 0) {
      return splitedString.map((word, index) =>
        word[0] === '#' ? (
          index === 0 ? (
            <strong style={{ color: 'red' }}>{word}</strong>
          ) : (
            <span>
              {' '}
              <strong style={{ color: 'red' }}>{word}</strong>
            </span>
          )
        ) : index === 0 ? (
          word
        ) : (
          <span> {word}</span>
        ),
      );
    }
  };

  return (
    <Modal size='lg' centered show={show} onHide={() => onHide()}>
      <Modal.Header closeButton />
      <Modal.Title className='p-3'>Заметка:{highLighter(task)}</Modal.Title>
      <Modal.Body>
        <div>
          Хэштэг:
          {hashtag.length > 0 &&
            hashtag.map((x) => <Hashtag key={x} hashtag={x} deleteHashtag={deleteTag} />)}
        </div>
        <Form.Control
          id='text'
          as='textarea'
          placeholder={Tips.enterNote}
          value={task}
          onChange={(e) => onChangeTask(e.currentTarget.value)}
          style={{ height: '100px' }}
        >
          {hashtag[0]}
        </Form.Control>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='primary'
          onClick={() => {
            saveTask({ id: myTask.id, task: task, hashtag: hashtag });
            onHide();
            setTask('');
            setHashtag([]);
          }}
        >
          {ButtonNames.save}
        </Button>
        <Button variant='danger' onClick={() => onHide()}>
          {ButtonNames.cancel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
