import React, { useEffect, useState } from 'react';
import TaskView from './TaskView';
import { Task } from '../../types';

interface TaskListProps {
    tasks: Task [],
    archive?: boolean;
    updateTask: Function;
    archiveTask?: Function;
}

interface CombinedTaskList {
    pending: Task[];
    inProgress: Task[];
    complete: Task[];
}

function TaskList(props: TaskListProps) {
    const { tasks, updateTask, archive, archiveTask } = props;
    const [pendingList, setPendingList] = useState<Task[]>([]);
    const [inProgressList, setInProgressList] = useState<Task[]>([]);
    const [completeList, setCompleteList] = useState<Task[]>([]);

    const parseTaskList = (taskList : Task[]) : void => {
        let obj : CombinedTaskList = {
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

    const renderStatusList = (list: Task[]) => (list.map((t : Task) => <TaskView key={t.id} {...t} updateTask={updateTask} archived={archive} archiveTask={archiveTask} />));

    return (
        <div className="task-list">
            <div className="task-list-column">
                <div className="task-list-column-content">{renderStatusList(pendingList)}</div>
            </div>
            <div className="task-list-column">
                <div className="task-list-column-content">{renderStatusList(inProgressList)}</div>
            </div>
            <div className="task-list-column">
                <div className="task-list-column-content">{renderStatusList(completeList)}</div>
            </div>
        </div>
    )
}

export default TaskList
