import { Equipment } from '@/store/slices/constants';
import { Path, Rect } from 'react-konva';
import { WrapperEquipment } from './Wrapper-equipment';

const fill = 'black';
const stroke = '#ff180a';
const emptyColor = 'white';

const goal = `M456,0H40C17.944,0,0,17.944,0,40v160h16v-56h64v40h16v-40h64v24h16v-24h144v24h16v-24h64v40h16v-40h64v56h16v-56v-16V40
C496,17.944,478.056,0,456,0z M80,128H16v-24h64V128z M80,88H16V40c0-12.208,9.192-22.2,20.992-23.696L80,59.312V88z M91.312,48
l-32-32h57.376l32,32H91.312z M160,128H96v-24h64V128z M160,88H96V64h64V88z M240,128h-64v-24h64V128z M240,88h-64V64h64V88z
 M240,48h-68.688l-32-32H240V48z M320,128h-64v-24h64V128z M320,88h-64V64h64V88z M324.688,48H256V16h100.688L324.688,48z
 M400,128h-64v-24h64V128z M400,88h-64V64h64V88z M404.688,48h-57.376l32-32h57.376L404.688,48z M480,128h-64v-24h64V128z
 M480,88h-64V59.312l43.008-43.008C470.808,17.8,480,27.792,480,40V88z`;

const empty = `M456,0H40C17.944,0,0,17.944,0,40v160h16v-56h64v40h16v-40h64v24h16v-24h144v24h16v-24h64v40h16v-40h64v56h16v-56v-16V40
C496,17.944,478.056,0,456,0z M80,40V88z`;
export const Goal = ({ equipment }: { equipment: Equipment }) => {
  const scale = 0.08;
  return (
    <WrapperEquipment equipment={equipment}>
      <Path data={empty} fill={emptyColor} scaleX={scale} scaleY={scale} />
      <Path data={goal} fill={fill} stroke={stroke} strokeWidth={10} scaleX={scale} scaleY={scale} />
    </WrapperEquipment>
  );
};
