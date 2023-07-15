import { Path } from 'react-konva';
import { Equipment } from '../../../store/slices/constants';
import { WrapperEquipment } from './Wrapper-equipment';

const shape = `M425.712,465.099l-160-458.667c-3.008-8.576-17.152-8.576-20.139,0l-160,458.667c-0.405,1.131-0.597,2.304-0.597,3.52
c0,41.472,153.195,42.667,170.667,42.667s170.667-1.195,170.667-42.667C426.309,467.424,426.117,466.229,425.712,465.099z`;
const top = `M217.579,149.294h98.044c5.648,0,10.394-2.296,13.019-6.3c2.625-4.003,2.841-9.27,0.59-14.45L277.163,8.683
C273.882,1.128,269.137,0,266.601,0c-2.536,0-7.281,1.128-10.562,8.683L203.97,128.544c-2.251,5.181-2.035,10.447,0.59,14.45
C207.186,146.998,211.931,149.294,217.579,149.294z`;
const middle = `M141.508,324.406h250.185c5.648,0,10.394-2.296,13.019-6.299c2.625-4.003,2.841-9.27,0.59-14.451l-40.232-92.612
c-4.084-9.401-15.312-16.766-25.562-16.766H193.693c-10.25,0-21.479,7.364-25.562,16.766l-40.232,92.612
c-2.25,5.181-2.035,10.448,0.59,14.451C131.114,322.11,135.859,324.406,141.508,324.406z`;
const base = `M478.889,445.883c0,0-2.712,0-3.616,0c-8.333,0-11.647-7.97-11.647-7.97l-22.483-51.757
c-4.085-9.401-15.312-16.766-25.562-16.766H117.622c-10.25,0-21.478,7.364-25.562,16.766l-22.557,51.927c0,0-2.729,7.8-9.396,7.8
c-1.449,0-5.794,0-5.794,0c-18.75,0-34.003,19.585-34.003,43.658c0,24.074,15.254,43.659,34.003,43.659h424.576
c18.749,0,34.002-19.585,34.002-43.659C512.891,465.468,497.638,445.883,478.889,445.883z`;

export const Cone = ({ equipment }: { equipment: Equipment }) => {
  return (
    <WrapperEquipment equipment={equipment}>
      <Path data={top} fill={equipment.color} scaleX={0.055} scaleY={0.055} />
      <Path data={middle} fill={equipment.color} scaleX={0.055} scaleY={0.055} />
      <Path data={base} fill={equipment.color} scaleX={0.055} scaleY={0.055} />
      <Path data={shape} scaleX={0.058} scaleY={0.055} stroke={'black'} strokeWidth={4} />
    </WrapperEquipment>
  );
};