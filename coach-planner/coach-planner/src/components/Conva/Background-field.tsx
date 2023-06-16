import { Image as ImageComponent, Layer } from "react-konva";
import field from "./../../assets/field.png";

export const BackgroundField = () => {
  const backgroundImage = new Image();
  backgroundImage.src = field;
  return (
    <Layer>
      <ImageComponent
        image={backgroundImage}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </Layer>
  );
};
