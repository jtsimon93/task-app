import React from 'react';
import taskApi from "../api/task-api";
import TaskList from "./TaskList";
import {Button, Container, Form, Modal} from "react-bootstrap";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            showAddModal: false,
            newTaskName: '',
        }

        // To create a controlled input
        this.handleNewTaskNameChange = this.handleNewTaskNameChange.bind(this);

    }

    // Show the Add Task Modal
    showAddModal() {
        this.setState({showAddModal: true});
    }

    // Closes the Add Task Modal
    closeAddModal() {
        this.setState({ showAddModal: false });
    }

    // Controlled input for newTaskName
    handleNewTaskNameChange(event) {
        this.setState({ newTaskName: event.target.value })
    }

    // API call to add a task
    addTask() {
        this.setState({ showAddModal: false })
        taskApi.post('/tasks', {
            task_name: this.state.newTaskName,
        }).then(()=>{
                taskApi.get('/tasks').then(
                    res => {
                        const tasks = res.data.data;
                        this.setState({tasks})
                    }
                );
            }
        );
    }

    // API call to delete a task
    deleteTask = (task_id) => {
        taskApi.delete('/task/' + task_id).then(()=>{
                taskApi.get('/tasks').then(
                    res => {
                        const tasks = res.data.data;
                        this.setState({tasks})
                    }
                );
            }
        );
    }

    // API call to complete a task
    completeTask = (task_id) => {
        taskApi.patch('/task/' + task_id, {
            "status": false
        }).then(()=>{
                taskApi.get('/tasks').then(
                    res => {
                        const tasks = res.data.data;
                        this.setState({tasks})
                    }
                );
            }
        );
    }

    // API call to edit a task
    editTask = (task_id, newTaskName) => {
        taskApi.patch('/task/' + task_id, {
            "task_name": newTaskName
        }).then(()=>{
                taskApi.get('/tasks').then(
                    res => {
                        const tasks = res.data.data;
                        this.setState({tasks})
                    }
                );
            }
        );
    }

    // Get all the active tasks from the API when the page loads
    componentDidMount() {
        taskApi.get('/tasks').then(
            res => {
                const tasks = res.data.data;
                this.setState({tasks})
            }
        );

    }


    render() {
        return(
            <Container>
                <h1>Task Manager</h1>
                <Button variant="primary" size="lg" className="add-task-button" onClick={()=>{this.showAddModal()}}>Add Task</Button>
                <TaskList tasks={this.state.tasks} deleteTask={this.deleteTask} completeTask={this.completeTask} editTask={this.editTask} />

                <Modal show={this.state.showAddModal}>
                    <Modal.Header><strong>Add New Task</strong></Modal.Header>
                    <Modal.Body>
                        <Form autoComplete="off" onSubmit={()=>{this.addTask()}}>
                            <Form.Group>
                                <Form.Label>Task Name:</Form.Label>
                                <Form.Control type="text" name="newTaskTitle" value={this.state.newTaskName} onChange={this.handleNewTaskNameChange} autoFocus />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={()=>{this.addTask()}}>Add</Button>
                        <Button variant="secondary" onClick={()=>{this.closeAddModal()}}>Cancel</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        );
    }
}

export default App;