import { Path } from 'react-konva';
import { Equipment } from '../../../store/slices/constants';
import { DraggableWrapper } from './Draggable-wrapper';

const shape = `M0 160c0-53 114.6-96 256-96s256 43 256 96-114.6 96-256 96S0 213 0 160zm0 82.2V352c0 53 114.6 96 256 96s256-43 256-96V242.2c-113.4 82.3-398.5 82.4-512 0z`;

export const Puck = ({ equipment }: { equipment: Equipment }) => {
  return (
    <DraggableWrapper equipment={equipment}>
      <Path data={shape} fill={'black'} scaleX={0.025} scaleY={0.025} />
    </DraggableWrapper>
  );
};
