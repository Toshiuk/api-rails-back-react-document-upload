import React, { Component } from 'react';
import Auth from '../modules/Auth';
import AddDocumentForm from './AddDocumentForm';

class Dashboard extends Component{
    constructor(){
        super();
        this.state = {
            myDocuments: null,
            documentsLoaded: false,
        }
    }

    componentDidMount(){
        this.getUsersDocument();
    }

    getUsersDocument(){
        fetch('https://dry-harbor-76275.herokuapp.com/profile',{
            method: 'GET',
            headers: {
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            }

        }).then(res => res.json())
        .then(res => {
            this.setState({
                myDocuments: res.documents,
                documentsLoaded: true ,
            })
        }).catch(err => console.log(err));
    }

    addDocument(e, data){
        console.log(data);
        fetch('https://dry-harbor-76275.herokuapp.com/documents',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                token: Auth.getToken(),
                'Authorization': `Token ${Auth.getToken()}`,
            },
            body: JSON.stringify({
                document: data,
            }),
        }).then(res => res.json())
        .then(res => {
           console.log(res);
            this.getUsersDocument();
        }).catch(err => console.log(err));
    }

    render(){
        return(
            <div className="dash">
            <AddDocumentForm addDocument={this.addDocument} />
            <h2>My documents</h2>
            {(this.state.documentsLoaded)
            ? this.state.myDocuments.map(document => {
                return (
                <div className="document" key={document.id}>
                    <h1 > {document.file}</h1>
                    <p>{document.notes}</p>
                    <p>User: {document.user_id}</p>
                    <p>{(document.confidential) ? "Confidential" : ""}</p>
                </div>
                )
            })
            : <p>Loading...</p>
            }
            </div>
        )
    }

}

export default Dashboard;