import React, { useRef, useState } from 'react'

interface JiraProps {
    title: string,
    url: string,
    branch: string
}

export const Jira = (props: JiraProps) => {
    const { title, url, branch } = props;
    const inputRef = useRef<HTMLInputElement>(null);
    const [alert, setAlert] = useState<Boolean>(false);

    const flashMessage = () => {
        setAlert(true);
        setTimeout(() => setAlert(false), 2500);
    }

    const copyToClipboard = () => {
        inputRef?.current?.select();
        document.execCommand('copy');
        flashMessage();
    }

    const renderAlert = () => (
        <div className="alert alert-success fixed-top">
            <strong>Alright!</strong><span>{`Branch - ${branch} copied to clipboard!`}</span>
        </div>
    );

    return (
        <div className="jira py-2">
            <a href={url} target="_blank" rel="noreferrer">{title}</a>
            <div className="input-group px-3 py-1">
                <input type="text" className="form-control" ref={inputRef} value={branch}/>
                <div className="input-group-append">
                    <button className="btn btn-info" onClick={copyToClipboard}>Copy</button>
                </div>
            </div>
            {alert && renderAlert() }
        </div>
    );
};
