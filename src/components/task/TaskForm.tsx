import React, { useState } from 'react';
import { Status, Task } from '../../types';

interface TaskFormProps {
    api: string,
    tasks: Task [],
    setTaskList: Function,
    closeForm: Function,
    update: Function
}

function TaskForm(props: TaskFormProps) {
    const { api, tasks, setTaskList, closeForm, update } = props;
    const [id, setId] = useState(Date.now());
    const [task, setTask] = useState('');
    const [comments, setComments] = useState('');
    const [status, setStatus] = useState<Status>(Status.PENDING);    

    const submitTask = () => {
        let newTask : Task = { id, task, comments, status };
        update(api, tasks, setTaskList, newTask);
        resetForm();
        closeForm();
    }

    const resetForm = () => {
        setTask('');
        setComments('');
        setStatus(Status.PENDING);
    }

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
        setStatus(stat);
    };

    return (
        <div className="jira-form-container">            
            <div className="jira-form form-group">
            <h3 className="text-center">Add New Task</h3>
                <input name="task" placeholder="Task" type="text" className="form-control mt-4" value={task} onChange={e => setTask(e.target.value)} />
                <textarea name="comments" placeholder="Comments (320 characters max)" maxLength={320} className="form-control mt-4" rows={3} value={comments}  onChange={e => setComments(e.target.value)} />
                <select className="form-control mt-4" onChange={e => handleStatusUpdate(e)}>
                    { Object.keys(Status).map(key => <option key={key} value={key}>{key}</option>) }
                </select>
                <div className="jira-form-btn-group">
                    <button className="btn btn-info" onClick={submitTask}>Submit</button>
                    <button className="btn btn-danger" onClick={() => closeForm()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm;
