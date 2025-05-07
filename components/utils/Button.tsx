import React from 'react';

export default function Button({ classname, onClickFunc }: { classname: string, onClickFunc?: () => void }) {

    return <button className={classname} onClick={onClickFunc}>Download As PDF</button>;
}
