import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, removeTodo } from '../Redux/Reducer/todoSlice';
import {
    Text,
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';

const Todo = () => {
    const [todoValue, setTodoValue] = useState('');
    const dispatch = useDispatch();
    const data = useSelector(state => state);
    const todos = data.todos.todoList;

    const addTodoList = () => {
        if (todoValue) {
            dispatch(addTodo(todoValue));
            setTodoValue('');
        } else if (todoValue === '') {
            alert('please add todo');
        } else {
            alert(`${todoValue} already added in Todo List`);
        }
    };

    const removeTodoFromList = item => {
        const todoIndex = todos.indexOf(item);
        if (todoIndex > -1) {
            dispatch(removeTodo(item));
        } else {
            alert(`${todoValue} is not in the Todo List`);
        }
    };

    const renderTodoList = () => {
        return (
            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <View style={styles.todoView}>
                        <View style={styles.todoList}>
                            <Text numberOfLines={3} style={styles.todosContent}>{item}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.removeTodo}
                            onPress={() => removeTodoFromList(item)}>
                            <Text style={styles.delICon}> X </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        )
    }   

    return (
        <View style={styles.main}>
            <TextInput
            testID='todo'
                style={styles.mainInput}
                onChangeText={setTodoValue}
                placeholder={'Add your todo here'}
                value={todoValue}
            />
            <TouchableOpacity style={styles.addTodoBtn} name="increase" title="Add Todo" onPress={addTodoList} >
                <Text style={styles.addTodoText}>Add Todo</Text>
            </TouchableOpacity>
            <Text style={{ alignSelf: 'stretch', paddingLeft: 39, fontWeight: 'bold' }}>
                Todo's list :
            </Text>
            {renderTodoList()}
        </View>
    );
};

let width = Dimensions.get('window').width; // screen width

const styles = StyleSheet.create({
    main: {
        alignItems: 'center',
        flex: 1
    },
    mainInput: {
        borderWidth: 1,
        borderColor: '#34eb83',
        height: 55,
        width: width * 0.9,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        borderRadius: 9,
    },
    todoList: {
        borderWidth: 1,
        borderColor: '#34eb83',
        borderRadius: 10,
        width: width * 0.8,
        justifyContent: 'center',
        height: 40,
    },
    todoView: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        padding: 5,
    },
    removeTodo: {
        backgroundColor: '#34eb83',
        borderRadius: 4,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 4,
    },
    todosContent: {
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
        marginLeft: 10
    },
    delICon: {
        fontSize: 13,
        fontWeight: '500',
        color: 'white',
    },
    addTodoBtn: {
        height: 30,
        width: '40%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34eb83'
    },
    addTodoText: {
        color: 'white',
    }
})

export default Todo;

