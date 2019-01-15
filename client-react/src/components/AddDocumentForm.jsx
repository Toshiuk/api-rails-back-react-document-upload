import React, { Component } from 'react';
import Auth from '../modules/Auth';

class AddDocumentForm extends Component{
    constructor(){
        super();
        this.state = {
            file: '',
            notes: '',
            confidential: false,
        };
        
    this.handleChange = this.handleChange.bind(this);
    this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange = () => {
        this.setState({
          confidential: !this.state.confidential,
        });
      }

    handleChange(e){
        const name = e.target.name;
        const val = e.target.value;
        this.setState({
            [name]: val,
        })
    }


    render(){
        return(
            <div className="form">
            <form onSubmit={(e) => this.props.addDocument(e,this.state)}>
                <input type="text" name="file" placeholder="file" value={this.state.file} onChange={this.handleChange}/>
                <input type="text" name="notes" placeholder="notes" value={this.state.notes} onChange={this.handleChange}/>
                <label> Confidential</label>
                <input type="checkbox" name="confidential" placeholder="confidential" checked={this.state.confidential} onChange={this.toggleChange}/>
                <input type="submit" onSubmit="e.preventDefault();" value="Document Register!"/>
            </form>
            </div>
        )
    }
}


export default AddDocumentForm;