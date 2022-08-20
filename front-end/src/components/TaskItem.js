import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";


class TaskItem extends React.Component {

    constructor() {
        super();

        this.state = {
            showDeleteModal: false,
            showEditModal: false,
            editTaskName: ''
        };

        // For controlled input editTaskName
        this.handleEditTaskNameChange = this.handleEditTaskNameChange.bind(this);
    }

    // Control the input for editTaskName
    handleEditTaskNameChange(event) {
        this.setState({editTaskName: event.target.value});
    }

    // Show the Delete Task Modal
    showDeleteModal() {
        this.setState({showDeleteModal: true});
    }

    // Show the Edit Task Modal
    showEditModal() {
        this.setState({showEditModal: true});
    }

    // Close the Delete Task Modal
    closeDeleteModal() {
        this.setState({showDeleteModal: false});
    }

    // Close the Edit Task Modal
    closeEditModal() {
        this.setState({showEditModal: false});
    }

    // Delete a task
    deleteTask(task_id) {
        this.closeDeleteModal();
        this.props.deleteTask(task_id);
    }

    // Edit a task
    editTask(task_id) {
        this.closeEditModal();
        this.props.editTask(task_id, this.state.editTaskName);
    }

    // Complete a task
    completeTask(task_id) {
        this.props.completeTask(task_id);
    }

    render() {
        return(
                <tr>
                    <td>{this.props.task.id}</td>
                    <td>{this.props.task.task_name}</td>
                    <td>
                        <Button variant="success" className="task-action-button" onClick={()=>{this.completeTask(this.props.task.id)}}>Complete</Button>
                        <Button variant="secondary" className="task-action-button" onClick={()=>{this.showEditModal()}}>Edit</Button>
                        <Button variant="danger" className="task-action-button" onClick={()=>{this.showDeleteModal()}}>Delete</Button>
                        <Modal show={this.state.showDeleteModal}>
                            <Modal.Header><strong>Confirm Delete Task</strong></Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete this task?
                                <br/><br/>
                                <strong>Task:</strong>
                                <br/>
                                {this.props.task.task_name}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={()=>{this.deleteTask(this.props.task.id)}}>Delete</Button>
                                <Button variant="secondary" onClick={()=>{this.closeDeleteModal()}}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                        <Modal show={this.state.showEditModal}>
                            <Modal.Header><strong>Edit Task</strong></Modal.Header>
                            <Modal.Body>
                                <Form autoComplete="off" onSubmit={()=>{this.editTask(this.props.task.id)}}>
                                    <Form.Group>
                                        <Form.Label>Edit Task Name:</Form.Label>
                                        <Form.Control type="text" name="editTaskName" value={this.state.editTaskName} onChange={this.handleEditTaskNameChange} placeholder={this.props.task.task_name} autoFocus />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={()=>{this.editTask(this.props.task.id)}}>Save Changes</Button>
                                <Button variant="secondary" onClick={()=>{this.closeEditModal()}}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </td>
                </tr>
        );
    }
}

export default TaskItem;