import React from 'react';
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
    const statusIcon = {
        "pending": "redo",
        "inProgress": 'spinner',
        "complete": "check-circle"
    };
    const getIcon = (obj : any, status: string) : string => obj[status];
    const dateString = new Date(id).toLocaleDateString('en-us', { month: 'long', year: 'numeric', day: '2-digit'});

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
                    <span className="task-footer-status-text">{status}</span>
                    <i className={`fas fa-${getIcon(statusIcon, status)}`}/>
                </div>
            </div>
        </div>

    );
}

export default TaskView;
