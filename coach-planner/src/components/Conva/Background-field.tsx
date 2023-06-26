import { Layer } from 'react-konva';
import field from '../../assets/field.png';
import { ImageComponent } from './Image-component';

export const BackgroundField = () => {
  return (
    <Layer>
      <ImageComponent src={field} width={window.innerWidth} height={window.innerHeight} />
    </Layer>
  );
};
