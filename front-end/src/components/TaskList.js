import React from 'react';
import Table from 'react-bootstrap/Table'

import TaskItem from "./TaskItem";

class TaskList extends React.Component {

    render() {
        return(
                <Table striped bordered hover>
                    <thead>
                        <tr key="header">
                            <th>ID #</th>
                            <th>Task Name</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                    {
                        (
                            () => {

                                if(this.props.tasks.length === 0) {
                                   return(
                                       <tr>
                                           <td colSpan={3}>There are no active tasks.</td>
                                       </tr>
                                   );
                                }
                        }
                    )()}

                    {this.props.tasks.map((task) => {
                        return <TaskItem task={task} key={task.id} deleteTask={this.props.deleteTask} completeTask={this.props.completeTask} editTask={this.props.editTask} />
                    })}
                    </tbody>
                </Table>
        );
    }
}

export default TaskList;