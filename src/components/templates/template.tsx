import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import Form from 'react-jsonschema-form';
import {ipcRenderer} from 'electron';
import {fetchFactory} from '../../fetch';
import {asyncReactor} from 'async-reactor';

import * as uuid from 'uuid/v4';
const fetch = fetchFactory(ipcRenderer);

function Loader() {

  return (<h2>Loading template ...</h2>);

}
async function AsyncTemplate (props: any){

    const onSubmit = ({formData}) => {
        formData.id = uuid();
        formData.template = props.id;
        console.log('Data submitted: ',  formData);
        fetch('/offerings/', {method: 'post', body: formData}).then(res => {
            ReactDOM.unmountComponentAtNode(document.getElementById('template'));
            document.getElementById('template').innerHTML = 'offer saved!!!';
        });
    };

    const onClick = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('template'));
    };
    if(props.src){
        if(props.kind === 'access'){
            Object.keys(props.src.uiSchema).forEach(key => props.src.uiSchema[key]['ui:readonly'] = true);
        }
        return <Form schema={props.src.schema} uiSchema={props.src.uiSchema} onSubmit={onSubmit}>
            <div>
             {props.kind === 'offer' ? <button type='submit'>Save Service Offering</button> : ''}
              <button type='button' onClick={onClick}>Cancel</button>
            </div>
        </Form>;
    }else{
        const templates = await fetch(`/templates?id=${props.match.params.id}`, {});
        console.log(templates);
        const template = JSON.parse(atob(templates[0].raw));
        if(templates[0].kind === 'access'){
            Object.keys(template.uiSchema).forEach(key => template.uiSchema[key]['ui:readonly'] = true);
        }
        return <Form schema={template.schema} uiSchema={template.uiSchema} onSubmit={onSubmit}>
            <div>
             {templates[0].kind === 'offer' ? <button type='submit'>Save Service Offering</button> : ''}
              <Link to={'/'}>Cancel</Link>
            </div>
        </Form>;
    }
}

export default asyncReactor(AsyncTemplate, Loader);
