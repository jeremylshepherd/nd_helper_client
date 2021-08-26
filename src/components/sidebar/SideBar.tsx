import React, { useState } from 'react';
import { Jira } from '../../types';
import { Jira as JiraView } from '../jira/Jira';
import './_component.sidebar.scss';

interface SideBarProps {
    jiras: Jira[]
 }

function SideBar(props: SideBarProps) {
    const { jiras } = props;
    const [open, setOpen] = useState(true);
    const jiraList = jiras.map((jira : Jira) => <JiraView key={jira.branch} {...jira} />);
    
    return (
        <div className={`sidebar${open ? '' : ' closed'}`}>
            <h3 className="text-center">Jiras and Branches</h3>
            <span className="nub" onClick={() => setOpen(!open)} >
                <i className={`fas fa-chevron-${open ? 'right' : 'left'}`} />
            </span>
            <div className="sidebar-content">
                {jiraList}
            </div>
        </div>
    );
}

export default SideBar;
