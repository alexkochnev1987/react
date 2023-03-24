import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { Hashtag } from './components/hashtag';
import { appName, ButtonNames, placeholder } from './constants';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Form from 'react-bootstrap/esm/Form';
import { AddNoteModal } from './components/add-note-modal';
import { Note } from './components/note';
import data from './data.json';
export interface Task {
  id: string;
  task: string;
  hashtag: string[];
}

function App() {
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>();
  const [task, setTask] = useState<Task>();
  const [search, setSearch] = useState('');
  const [json, setJson] = useState<string>();
  const [addNoteShow, setAddNoteShow] = useState(false);
  const [editNoteShow, setEditNoteShow] = useState(false);

  const editTask = (task: Task) => {
    if (tasks) {
      const newTask = tasks.map((x) => (x.id === task.id ? task : x));
      const newHashtags = new Set<string>();
      newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
      const newJson = { tasks: newTask };
      setJson(JSON.stringify(newJson));
    }
  };

  const openEditTaskModal = (task: Task) => {
    setTask(task);
    setEditNoteShow(true);
  };

  const deleteTask = (id: string) => {
    if (tasks) {
      const newTask = tasks.filter((x) => x.id !== id);
      const newHashtags = new Set<string>();
      newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
      const newJson = { tasks: newTask, hashtags: newHashtags };
      setJson(JSON.stringify(newJson));
    }
  };

  const addTask = (task: Task) => {
    if (tasks) {
      const newTask = [...tasks, task];
      const newHashtags = new Set<string>();
      newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
      const newJson = { tasks: newTask, hashtags: newHashtags };
      setJson(JSON.stringify(newJson));
    } else {
      const newTask = [task];
      const newHashtags = new Set<string>();
      newTask.forEach((x) => x.hashtag.forEach((elem) => newHashtags.add(elem)));
      const newJson = { tasks: newTask, hashtags: newHashtags };
      setJson(JSON.stringify(newJson));
    }
  };

  const deleteHashTag = (hashtag: string) => {
    if (tasks) {
      const newTasks = tasks.map((task) => {
        const hashTags = task.hashtag.filter((x) => x !== hashtag);
        return { ...task, hashtag: hashTags };
      });
      const newJson = { tasks: newTasks };
      setJson(JSON.stringify(newJson));
    }
  };

  const searchTaskByHash = (task: Task) =>
    search ? task.hashtag.some((hash) => hash.toLowerCase().includes(search.toLowerCase())) : true;

  useEffect(() => {
    if (!json) {
      console.log(json);
      const newTasks = data;
      const newHashtags = new Set<string>();
      if (newTasks.length > 0)
        newTasks.forEach((x) =>
          x.hashtag.length > 0 ? x.hashtag.forEach((elem) => newHashtags.add(elem)) : '',
        );
      setTasks(newTasks);
      setHashtags([...newHashtags]);
    } else {
      const { tasks }: { tasks: Task[] } = JSON.parse(json);
      console.log(tasks);

      const newHashtags = new Set<string>();
      if (tasks.length > 0)
        tasks.forEach((x) =>
          x.hashtag.length > 0 ? x.hashtag.forEach((elem) => newHashtags.add(elem)) : '',
        );
      setTasks(tasks);
      setHashtags([...newHashtags]);
    }
  }, [json]);

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
              <p key={x}>
                <Hashtag hashtag={x} deleteHashtag={deleteHashTag} />
              </p>
            ))}
        </div>
        <div className='col-9'>
          {tasks &&
            tasks.length > 0 &&
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
