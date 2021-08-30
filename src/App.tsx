import React, { useEffect, useState } from 'react';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootswatch/dist/darkly/bootstrap.min.css';
import './App.css';
import './components/jira/_component.jira.scss';
import SideBar from './components/sidebar/SideBar';
import TaskList from './components/task/TaskList';
import TaskForm from './components/task/TaskForm';
import JiraForm from './components/jira/JiraForm';
import { Task, Jira } from './types';

const SERVER_PATH = 'http://localhost:8080'
const tasksAPI = `${SERVER_PATH}/api/tasks`;
const jirasAPI = `${SERVER_PATH}/api/jiras`;

async function getItems(api : string, setItems : Function) {
  const response = await fetch(api);
  const json = await response.json();
  setItems(json);
}

async function updateItemList(api : string, listToUpdate : any[], setter : Function, item : any) {
  const updatedList : any[] = [...listToUpdate, item];
  let data = JSON.stringify(updatedList, null, 4);
  const response = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  const status = response.status;
  if (status === 200) {
    getItems(api, setter);
  }
}

function App() {

  const [taskList, setTaskList] = useState<Task[]>([]);
  const [jiraList, setJiraList] = useState<Jira[]>([]);
  const [newJira, setNewJira] = useState<Boolean>(false);
  const [newTask, setNewTask] = useState<Boolean>(false);

  async function updateTask(task:Task) {
    const idx = taskList.findIndex(t => t.id === task.id);
    const tasksCopy = [...taskList];
    tasksCopy.splice(idx, 1);
    updateItemList(tasksAPI, tasksCopy, setTaskList, task);
}

  useEffect(() => {
    getItems(jirasAPI, setJiraList);
    getItems(tasksAPI, setTaskList);
  }, []);

  const closeJira = () => setNewJira(false);
  const closeTask = () => setNewTask(false);

  return (
    <div className="App">
      <h1 className="text-center">Jeremy's Newsdesk Helper</h1>
      <h3 className="text-center">Tasks</h3>
      <SideBar jiras={jiraList} />
      <TaskList tasks={taskList} updateTask={updateTask} />
      {newJira && <JiraForm jiras={jiraList} closeForm={closeJira}  setJiras={setJiraList} api={jirasAPI} update={updateItemList} />}
      {newTask && <TaskForm tasks={taskList} closeForm={closeTask}  setTaskList={setTaskList} api={tasksAPI} update={updateItemList} /> }
      <div className="form-btn-group">
        <button className="btn btn-info" onClick={() => setNewJira(true)}><i className="fab fa-jira" /></button>
        <button className="btn btn-info" onClick={() => setNewTask(true)}><i className="fas fa-tasks" /></button>
      </div>
    </div>
  );
}

export default App;
