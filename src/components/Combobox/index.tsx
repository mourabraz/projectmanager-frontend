import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronUp, FiChevronDown, FiCheck } from 'react-icons/fi';

import Loading from '../Loading';

import { Container, Header, List, ScrollList, ListItem } from './styles';

interface IListItem {
  key: string;
  title: string;
  selected: boolean;
}

interface IComboboxProps {
  title: string;
  list: IListItem[];
  loading: boolean;
  onSelected(title: string): void;
}

const Combobox: React.FC<IComboboxProps> = ({
  title,
  list,
  loading,
  onSelected,
}) => {
  const [open, setOpen] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('');
  const [items, setItems] = useState<IListItem[]>([]);

  useEffect(() => {
    setItems(list);
  }, [list]);

  useEffect(() => {
    setHeaderTitle(title);
  }, [title]);

  const toggle = useCallback((): void => {
    setOpen((state) => !state);
  }, []);

  const selectItem = useCallback(
    (itemTitle: string): void => {
      setItems(
        items.map((item) => ({
          ...item,
          selected: item.title === itemTitle,
        })),
      );

      setHeaderTitle(itemTitle);
      onSelected(itemTitle);
    },

    [items, onSelected],
  );

  return (
    <Container>
      <Header
        type="button"
        onClick={toggle}
        isEmpty={!!headerTitle}
        disabled={!list.length}
      >
        {loading ? (
          <div style={{ alignSelf: 'center', width: '100%' }}>
            <Loading />
          </div>
        ) : (
          <div>
            {list.length ? headerTitle || 'Select one' : 'This list is empty'}
          </div>
        )}

        {open ? <FiChevronUp size="20" /> : <FiChevronDown size="20" />}
      </Header>

      {open && (
        <List>
          <ScrollList onMouseLeave={(): void => setOpen(false)}>
            {items.length &&
              items.map((item) => (
                <ListItem
                  key={item.key}
                  onClick={(): void => selectItem(item.title)}
                >
                  {item.title}
                  {item.selected && <FiCheck size={14} />}
                </ListItem>
              ))}
          </ScrollList>
        </List>
      )}
    </Container>
  );
};

export default Combobox;
