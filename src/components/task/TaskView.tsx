import React, { useState } from 'react';
import { Status } from '../../types';
import './_component.task.scss';

interface TaskViewProps {
    id: number;
    task: string;
    comments?: string;
    status: Status;
    updateTask: Function;
    archived?: boolean;
    archiveTask?: Function;
}

function TaskView(props: TaskViewProps) {
    const { id, task, comments, status, updateTask, archived, archiveTask } = props;
    const [currentStatus, setCurrentStatus] = useState(status);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showArchive, setShowArchive] = useState(false);
    const statusIcon = {
        "pending": "redo",
        "inProgress": 'spinner',
        "complete": "check-circle"
    };
    const getIcon = (obj : any, status: string) : string => obj[status];
    const dateString = new Date(id).toLocaleDateString('en-us', { month: 'long', year: 'numeric', day: '2-digit'});
    const renderStatusUpdate = () => (
        <div className="task-alert">
            <div className="alert alert-info">                
                <form className="form-group form-check">
                    <strong>Update Task Status!</strong>
                    <div className="cb-group">
                        {
                            Object.keys(Status).map(key => (
                                <div className="cb-row text-left">
                                    <input className="form-check-input" type="checkbox" name={key} value={key} id={key} onClick={handleStatusUpdate}/>
                                    <label htmlFor={key} className="form-check-label">{key}</label>
                                </div>
                            )) 
                        }
                    </div>
                    <div className="button-group">
                        <button className="btn btn-danger" onClick={e => {e.preventDefault(); setShowUpdate(false)}}>Close</button>
                        <button className="btn btn-primary" onClick={e => {e.preventDefault(); updateTaskStatus()}}>Update</button>
                    </div>
                </form>            
            </div>
        </div>
    );

    const handleStatusUpdate = (e : any) => {
        let value = e.target.value;
        let stat : Status;
        if (value === 'INPROGRESS') {
            stat = Status.INPROGRESS;
        } else if(value === 'COMPLETE') {
            stat = Status.COMPLETE;
        } else {
           stat = Status.PENDING;
        }
        setCurrentStatus(stat);
    };

    const updateTaskStatus = () => {
        let updatedTask = { id, task, comments, status: currentStatus };
        updateTask(updatedTask);
        setShowUpdate(false);
    }

    const renderComments = () => {
        let commentsArray = comments?.split('\n');
        return (
            <ul>
                {commentsArray?.map((com, i) => <li key={i} className="text-left">{com}</li>)}
            </ul>
        );
    }

    const archiveThisTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const retiredTask = {
            id,
            task,
            comments,
            status
        };
        if (archiveTask) archiveTask(retiredTask);
        setShowArchive(false);
    }

    const showArchiveDialog = () => {
        return (
            <div className="task-alert">
                <div className="alert alert-info">      
                <h5>Archive this task at its current status?</h5>              
                    <form className="form-group">
                        <div className="button-group">
                            <button className="btn btn-danger" onClick={e => {e.preventDefault(); setShowArchive(false)}}>Close</button>
                            <button className="btn btn-primary" onClick={e => {archiveThisTask(e)}}>Archive</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const renderArchiveButton = () => <i className="fas fa-archive" onClick={e => setShowArchive(true)} />;

    return (
        <div className={`task task-${status}${archived ? ' task-archived': ''}`}>
            {comments 
            ? <h3 className="task-heading">{task}</h3>
            : <h2 className="task-heading">{task}</h2>
            }
            {comments && <div className="task-body">{renderComments()}</div>}
            <div className="task-footer">
                <div className="task-footer-date">{dateString}</div>
                <div className="task-footer-status">
                    <span className="task-footer-status-text" onClick={() => setShowUpdate(true)}>{status}</span>
                    <i className={`fas fa-${getIcon(statusIcon, status)}`}/>
                </div>
            </div>
            {showUpdate && renderStatusUpdate() }
            {!archived && renderArchiveButton()}
            {showArchive && showArchiveDialog()}
        </div>

    );
}

export default TaskView;
