import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, IconButton, Input, List, ListItem, Text } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTask = { id: Date.now(), text: input, isCompleted: false };
      setTasks([...tasks, newTask]);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isCompleted: !task.isCompleted } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex as="nav" justify="space-between" align="center" mb={8}>
        <Heading size="lg">Todo App</Heading>
      </Flex>
      <Box as="section" mb={6}>
        <Flex>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <Button onClick={handleAddTask} ml={2}>Add</Button>
        </Flex>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} display="flex" justifyContent="space-between" alignItems="center">
            <Text as={task.isCompleted ? 's' : 'span'}>{task.text}</Text>
            <Flex>
              <IconButton
                icon={<FaCheckCircle />}
                onClick={() => handleToggleComplete(task.id)}
                aria-label="Complete task"
                colorScheme={task.isCompleted ? 'green' : 'gray'}
              />
              <IconButton
                icon={<FaTrash />}
                onClick={() => handleDeleteTask(task.id)}
                aria-label="Delete task"
                ml={2}
                colorScheme="red"
              />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;