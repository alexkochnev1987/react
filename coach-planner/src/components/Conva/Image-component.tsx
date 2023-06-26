import useImage from 'use-image';
import { Image } from 'react-konva';

export const ImageComponent = ({
  src,
  width,
  height,
  x,
  y,
}: {
  src: string;
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}) => {
  const [image] = useImage(src);
  return <Image image={image} width={width} height={height} x={x} y={y} />;
};
