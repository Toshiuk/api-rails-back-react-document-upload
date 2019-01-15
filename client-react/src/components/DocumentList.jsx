import React, { Component } from 'react';


class DocumentList extends Component {
    constructor(){
        super();
        this.state = {
            documentList: null,
            documentListLoaded: false,
        }
    }


    componentDidMount(){
        fetch('https://dry-harbor-76275.herokuapp.com/documents')
        .then(res => res.json())
        .then(res =>{
            this.setState({
                documentList: res.documents,
                documentListLoaded: true,
            })
        }).catch(err => console.log(err));
    }

    renderDocuments(){
        return this.state.documentList.map( document => { 
            return(
                <div className="document" key={document.id}>
                    <h2>{document.file}</h2>
                    <p>{document.notes}</p>
                    <p>User: {document.user_id}</p>
                    <p>{(document.confidential) ? "Confidential" : ""}</p>
                </div>
            )
        })

    }

    render(){
        return(
            <div className="document-list">
                {(this.state.documentListLoaded)
                ? this.renderDocuments()
                : <p>Loading...</p>
                }
            </div>
        )
    }
}

export default DocumentList;