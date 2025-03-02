import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

interface Item {
  id: string;
  name: string;
}

const initialData: Item[] = [
  {id: '1', name: 'Item 1'},
  {id: '2', name: 'Item 2'},
  {id: '3', name: 'Item 3'},
];

const SwipeableList: React.FC = () => {
  const [data, setData] = useState(initialData);

  const handleEdit = (item: Item) => {
    console.log('Edit', item);
  };

  const handleDelete = (id: string) => {
    setData(prevData => prevData.filter(item => item.id !== id));
  };

  const renderItem = ({item}: {item: Item}) => (
    <View style={styles.listItem}>
      <Text style={styles.listText}>{item.name}</Text>
    </View>
  );

  const renderHiddenItem = ({item}: {item: Item}) => (
    <View style={styles.hiddenContainer}>
      <TouchableOpacity
        style={[styles.actionButton, styles.editButton]}
        onPress={() => handleEdit(item)}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, styles.deleteButton]}
        onPress={() => handleDelete(item.id)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-160} // Controls how far the swipe opens
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listText: {
    fontSize: 16,
  },
  hiddenContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  editButton: {
    backgroundColor: 'blue',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SwipeableList;
