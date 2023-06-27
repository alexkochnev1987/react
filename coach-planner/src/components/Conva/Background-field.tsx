import { Layer } from 'react-konva';
import field from '../../assets/field.png';
import { ImageComponent } from './Image-component';

export const BackgroundField = () => {
  return (
    <Layer>
      <ImageComponent src={field} width={640} height={320} />
    </Layer>
  );
};
