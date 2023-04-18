import Button from '@mui/material/Button';
import { observer } from 'mobx-react-lite';
import counter from '../store/mob-x/counter';

export const Counter = observer(() => {
  return (
    <div>
      <h2>Counter = {counter.count}</h2>
      <Button onClick={() => counter.increment()}>Increment</Button>
      <Button onClick={() => counter.decrement()}>Decrement</Button>
    </div>
  );
});
