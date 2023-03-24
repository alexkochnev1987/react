import { useState } from 'react';
import styles from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { Hashtag } from './components/hashtag';
import { appName, ButtonNames, CustomNotes, placeholder } from './constants';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/esm/Form';
import { AddNoteModal } from './components/add-note-modal';
import { Note } from './components/note';
export interface Task {
  id: string;
  task: string;
  hashtag: string[];
}

function App() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>(CustomNotes);
  const [task, setTask] = useState<Task>();
  const [search, setSearch] = useState('');
  const [json, setJson] = useState(JSON.stringify(CustomNotes));
  const [addNoteShow, setAddNoteShow] = useState(false);
  const [editNoteShow, setEditNoteShow] = useState(false);

  const editTask = (task: Task) => {
    const newTask = tasks.map((x) => (x.id === task.id ? task : x));
    const newHashtags = new Set<string>();
    newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
    setTasks(newTask);
    setHashtags([...newHashtags]);
    const newJson = { tasks: newTask, hashtags: newHashtags };
    setJson(JSON.stringify(newJson));
  };

  const openEditTaskModal = (task: Task) => {
    setTask(task);
    setEditNoteShow(true);
  };

  const deleteTask = (id: string) => {
    const newTask = tasks.filter((x) => x.id !== id);
    const newHashtags = new Set<string>();
    newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
    setTasks(newTask);
    setHashtags([...newHashtags]);
    const newJson = { tasks: newTask, hashtags: newHashtags };
    setJson(JSON.stringify(newJson));
  };

  const addTask = (task: Task) => {
    const newTask = [...tasks, task];
    const newHashtags = new Set<string>();
    newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
    setHashtags([...newHashtags]);
    setTasks(newTask);
    const newJson = { tasks: newTask, hashtags: newHashtags };
    setJson(JSON.stringify(newJson));
  };

  const deleteHashTag = (hashtag: string) => {
    const newHashtags = hashtags.filter((x) => x !== hashtag);
    setHashtags(newHashtags);
  };

  const searchTaskByHash = (task: Task) =>
    search ? task.hashtag.some((hash) => hash.toLowerCase().includes(search.toLowerCase())) : true;

  return (
    <div className={styles.container}>
      <h1>{appName}</h1>
      <div className='d-flex w-75 p-2'>
        <InputGroup size='sm'>
          <InputGroup.Text id='inputGroup-sizing-sm'>{placeholder}</InputGroup.Text>
          <Form.Control
            type='search'
            aria-label={placeholder}
            aria-describedby='inputGroup-sizing-sm'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
        </InputGroup>
        <Button variant='primary' onClick={() => setAddNoteShow(true)} className='text-nowrap'>
          {ButtonNames.create}
        </Button>
      </div>
      <AddNoteModal
        myTask={{ id: uuidv4(), task: '', hashtag: [] }}
        saveTask={addTask}
        deleteHashtag={deleteHashTag}
        show={addNoteShow}
        onHide={() => setAddNoteShow(false)}
      />

      {task && (
        <AddNoteModal
          myTask={task}
          saveTask={editTask}
          deleteHashtag={deleteHashTag}
          show={editNoteShow}
          onHide={() => {
            setEditNoteShow(false);
            setTask(undefined);
          }}
        />
      )}

      <div className='row w-100 p-3'>
        <div className='col-3'>
          {hashtags.length > 0 &&
            hashtags.map((x) => (
              <p>
                <Hashtag key={x} hashtag={x} deleteHashtag={deleteHashTag} />
              </p>
            ))}
        </div>
        <div className='col-9'>
          {tasks.length > 0 &&
            tasks
              .filter(searchTaskByHash)
              .map((x) => (
                <Note
                  key={x.id}
                  task={x}
                  editTask={openEditTaskModal}
                  deleteTask={deleteTask}
                  deleteHashtag={deleteHashTag}
                />
              ))}
        </div>
      </div>
    </div>
  );
}

export default App;
