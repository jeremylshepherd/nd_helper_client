import React, { useEffect, useState } from 'react';
import TaskView from './TaskView';
import { Task } from '../../types';

interface TaskListProps {
    tasks: Task []
}

function TaskList(props: TaskListProps) {
    const { tasks } = props;
    const [pendingList, setPendingList] = useState<Task[]>([]);
    const [inProgressList, setInProgressList] = useState<Task[]>([]);
    const [completeList, setCompleteList] = useState<Task[]>([]);

    const parseTaskList = (taskList : Task[]) : void => {
        let obj : any = {
            pending: [],
            inProgress: [],
            complete: []
        };
        taskList.forEach((t : Task) => obj[t.status].push(t));
        setPendingList(obj.pending);
        setInProgressList(obj.inProgress);
        setCompleteList(obj.complete);
    }
    useEffect(() => {
        parseTaskList(tasks);
    }, [tasks]);

    return (
        <div className="task-list">
            <div className="task-list-column">
                {pendingList.map((t : Task) => <TaskView key={t.id} {...t} />)}
            </div>
            <div className="task-list-column">
                {inProgressList.map((t : Task) => <TaskView key={t.id} {...t} />)}
            </div>
            <div className="task-list-column">
                {completeList.map((t : Task) => <TaskView key={t.id} {...t} />)}
            </div>
        </div>
    )
}

export default TaskList
