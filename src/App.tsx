import React, { useEffect, useState } from 'react';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootswatch/dist/cyborg/bootstrap.min.css';
import './App.css';
import SideBar from './components/sidebar/SideBar';
import TaskList from './components/task/TaskList';
import { Task, Jira } from './types';

const SERVER_PATH = 'http://localhost:8080'
const tasksAPI = `${SERVER_PATH}/api/tasks`;
const jirasAPI = `${SERVER_PATH}/api/jiras`;

async function getItems(api : string, setItems : Function) {
  const response = await fetch(api);
  const json = await response.json();
  setItems(json);
}

function App() {

  const [tasklist, setTaskList] = useState<Task[]>([]);
  const [jiraList, setJiraList] = useState<Jira[]>([]);

  useEffect(() => {
    getItems(jirasAPI, setJiraList);
    getItems(tasksAPI, setTaskList);
  }, []);

  return (
    <div className="App">
      <h1 className="text-center">Jeremy's Newsdesk Helper</h1>
      <h3 className="text-center">Tasks</h3>\
      <SideBar jiras={jiraList} />
      <TaskList tasks={tasklist} />
    </div>
  );
}

export default App;
