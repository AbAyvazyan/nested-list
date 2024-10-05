import React from 'react';
import styled from 'styled-components';
import { ListItem as ListItemType } from '@utils/types';

const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px 0;
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const ItemActions = styled.div`
    display: flex;
    gap: 10px;
    margin-left: 20px;
`;

const ItemButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

interface ListItemProps {
  item: ListItemType;
  addItem: (parentId: string | null) => void;
  deleteItem: (itemId: string) => void;
  canDelete: boolean; // Boolean flag to determine if deletion is allowed
}

const ListItem: React.FC<ListItemProps> = ({ item, addItem, deleteItem, canDelete }) => {
  return (
    <ItemContainer>
      <ItemHeader>
        <div>{item.name}</div>
        <ItemActions>
          <ItemButton onClick={() => addItem(item.id)}>Add Child</ItemButton>
          {canDelete && (
            <ItemButton onClick={() => deleteItem(item.id)}>Delete</ItemButton>
          )}
        </ItemActions>
      </ItemHeader>
      {item.children && item.children.length > 0 && (
        <div style={{ paddingLeft: '20px' }}>
          {item.children.map(child => (
            <ListItem
              key={child.id}
              item={child}
              addItem={addItem}
              deleteItem={deleteItem}
              canDelete={true}
            />
          ))}
        </div>
      )}
    </ItemContainer>
  );
};

export default ListItem;
