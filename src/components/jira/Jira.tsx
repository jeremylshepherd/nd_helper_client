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
        setTimeout(() => setAlert(false), 10000);
    }

    const copyToClipboard = () => {
        inputRef?.current?.select();
        document.execCommand('copy');
        flashMessage();
    }

    return (
        <div className="jira">
            <a href={url} target="_blank" rel="noreferrer">{title}</a>
            <div className="form-group">
                <input type="text" className="form-control" ref={inputRef} value={branch}/>
                <button className="btn btn-primary" onClick={copyToClipboard}>Copy</button>
            </div>
            {alert && <span className="jira-alert">{alert && `{branch} copied to clipboard!`}</span> }
        </div>
    );
};
