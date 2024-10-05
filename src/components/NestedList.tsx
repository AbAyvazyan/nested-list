import { useState } from 'react';
import styled from 'styled-components';
import { ListItem } from '@utils/types';
import ListItemComponent from './ListItem';

const Root = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const Button = styled.button`
    width: 250px;
    height: 50px;
    cursor: pointer;
    border-radius: 7px;
`

const NestedList= () => {
  const [data, setData] = useState<ListItem[]>([]);

  const addItem = (parentId: string | null) => {
    const newItem = {
      id: `${Date.now()}`,
      name: `New Item ${Date.now()}`,
      children: []
    };

    // If parentId is null, it means we are adding a new main-level item
    if (parentId === null) {
      setData([...data, newItem]);
    } else {
      const recursiveAdd = (items: ListItem[]): ListItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...(item.children || []), newItem]
            };
          }

          return {
            ...item,
            children: item.children ? recursiveAdd(item.children) : []
          };
        });
      };

      setData(recursiveAdd(data));
    }
  };

  const deleteItem = (itemId: string) => {
    const recursiveDelete = (items: ListItem[]): ListItem[] => {
      return items
        .filter(item => item.id !== itemId)  // Remove the item only if it doesn't match itemId
        .map(item => ({
          ...item,
          children: item.children ? recursiveDelete(item.children) : []
        }));
    };

    setData(recursiveDelete(data));
  };

  return (
    <Root>
      <Button onClick={() => addItem(null)}>Add Main Element</Button>
      {data.map((item) => (
        <ListItemComponent
          key={item.id}
          item={item}
          addItem={addItem}
          deleteItem={deleteItem}
          canDelete={false} // The first item (main parent) cannot be deleted
        />
      ))}
    </Root>
  );
};

export default NestedList;
