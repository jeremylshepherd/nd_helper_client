import React, { useEffect, useState } from 'react';
import { Jira } from '../../types';
import { Jira as JiraView } from '../jira/Jira';
import './_component.sidebar.scss';

interface SideBarProps {
    jiras: Jira[]
 }

function SideBar(props: SideBarProps) {
    const { jiras } = props;
    const [open, setOpen] = useState(false);
    const [asc, setAsc] = useState(false);
    const [data, setData] = useState<Jira[]>([]);

    useEffect(() => {
        if (asc) {
            setData(() => jiras);
        } else {
            setData(() => [...jiras].reverse());
        }
    }, [asc, jiras]);

    return (
        <div className={`sidebar${open ? '' : ' closed'}`}>
            <h3 className="text-center">{`Jiras and Branches  ${jiras.length} `}<i className={`fas fa-arrow-alt-circle-${asc ? 'down': 'up'}`} onClick={ () => setAsc(!asc) } /></h3>
            <span className="nub" onClick={() => setOpen(!open)} >
                <i className={`fas fa-chevron-${open ? 'right' : 'left'}`} />
            </span>
            <div className="sidebar-content">
                {data.map((jira : Jira) => <JiraView key={jira.branch} {...jira} />)}
            </div>
        </div>
    );
}

export default SideBar;
