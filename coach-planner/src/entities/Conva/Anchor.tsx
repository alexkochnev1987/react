import { KonvaEventObject } from 'konva/lib/Node';
import { Circle } from 'react-konva';
import { Shape, ShapeConfig } from 'konva/lib/Shape';

export type ShapeConfigType = Shape<ShapeConfig>;

export const Anchor = ({
  x,
  y,
  dragFunction,
  deleteAnchor,
}: {
  x: number;
  y: number;
  dragFunction: (e: KonvaEventObject<DragEvent>) => void;
  deleteAnchor: () => void;
}) => {
  const props = {
    x: x,
    y: y,
    radius: 10,
    stroke: '#666',
    fill: '#ddd',
    strokeWidth: 2,
    draggable: true,
    onMouseOver: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      e.currentTarget._setAttr('strokeWidth', 4);
    },
    onMouseOut: function (e: KonvaEventObject<MouseEvent>) {
      document.body.style.cursor = 'pointer';
      e.currentTarget._setAttr('strokeWidth', 2);
    },
    onDragMove: function (e: KonvaEventObject<DragEvent>) {
      dragFunction(e);
    },
    onDblClick: () => {
      deleteAnchor();
    },
    onDblTap: () => {
      deleteAnchor();
    },
  };
  return <Circle {...props} />;
};
