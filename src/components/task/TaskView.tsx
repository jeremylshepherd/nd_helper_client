import { spawn } from 'child_process';
import React, { useState } from 'react';
import { Status } from '../../types';
import './_component.task.scss';

interface TaskViewProps {
    id: number,
    task: string,
    comments?: string,
    status: Status
}

function TaskView(props: TaskViewProps) {
    const { id, task, comments, status } = props;
    const [currentStatus, setCurrentStatus] = useState(status);
    const [showUpdate, setShowUpdate] = useState(false);
    const statusIcon = {
        "pending": "redo",
        "inProgress": 'spinner',
        "complete": "check-circle"
    };
    const getIcon = (obj : any, status: string) : string => obj[status];
    const dateString = new Date(id).toLocaleDateString('en-us', { month: 'long', year: 'numeric', day: '2-digit'});
    const renderStatusUpdate = () => (
        <div className="task-alert">
            <div className="alert alert-success">
                <strong>Update Task Status!</strong>
                <form className="form-group">
                    <div className="cb-group">
                        {
                            Object.keys(Status).map(key => (
                                <div className="cb-row text-left">
                                    <input type="checkbox" name={key} value={key} />
                                    <div className="text-left">{key}</div>
                                </div>
                            )) 
                        }
                    </div>
                    <button className="btn btn-danger" onClick={e => {e.preventDefault(); setShowUpdate(false)}}>Close</button>
                </form>            
            </div>
        </div>
    );

    return (
        <div className={`task task-${status}`}>
            {comments ? 
            <h3 className="task-heading">{task}</h3>
            : <h2 className="task-heading">{task}</h2>
            }
            {comments && <p className="task-body">{comments}</p>}
            <div className="task-footer">
                <div className="task-footer-date">{dateString}</div>
                <div className="task-footer-status">
                    <span className="task-footer-status-text" onClick={() => setShowUpdate(true)}>{status}</span>
                    <i className={`fas fa-${getIcon(statusIcon, status)}`}/>
                </div>
            </div>
            {showUpdate && renderStatusUpdate() }
        </div>

    );
}

export default TaskView;
