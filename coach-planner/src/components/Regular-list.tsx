import React from 'react';

export const RegularList = ({
  items,
  resourceName,
  itemComponent: ItemComponent,
}: {
  items: any[];
  resourceName: string;
  itemComponent: React.ComponentType<any>;
}) => {
  return (
    <>
      {items.map((item, i) => (
        <ItemComponent {...{ [resourceName]: item }} key={i} />
      ))}
    </>
  );
};
