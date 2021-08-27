import React, { useState } from 'react';
import { Jira } from '../../types';

interface JiraFormProps {
    api: string,
    jiras: Jira [],
    setJiras: Function,
    closeForm: Function,
    update: Function
}

function JiraForm(props: JiraFormProps) {   
    const { api, jiras, setJiras, closeForm, update } = props;
    const [title, setTitle] = useState('');
    const [url, setUrl] = useState('');
    const [branch, setBranch] = useState('');    

    const submitJira = () => {
        let newJira : Jira = { title, url, branch };
        update(api, jiras, setJiras, newJira);
        resetForm();
        closeForm();
    }

    const resetForm = () => {
        setTitle('');
        setUrl('');
        setBranch('');
    }

    return (
        <div className="jira-form-container">            
            <div className="jira-form form-group">
            <h3 className="text-center">Add New Jira</h3>
                <input name="title" placeholder="Title" type="text" className="form-control mt-4" value={title} onChange={e => setTitle(e.target.value)} />
                <input name="url" placeholder="URL" type="text" className="form-control mt-4" value={url}  onChange={e => setUrl(e.target.value)} />
                <input name="branch" placeholder="Branch Name" type="text" className="form-control mt-4" value={branch} onChange={e => setBranch(e.target.value)} />                
                <div className="jira-form-btn-group">
                    <button className="btn btn-info" onClick={submitJira}>Submit</button>
                    <button className="btn btn-danger" onClick={() => closeForm()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default JiraForm
