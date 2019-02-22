import React, {Component} from 'react'

class AddTodo extends Component {
    state = {
        content: ''
    }
    handleChange = (e) =>{
        this.setState({
            content: e.target.value
        })
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.addTodo(this.state);
        //risetto lo stato a vuoto dopo aver submittato
        this.setState({
            content:''
        })
    }
    
    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Add new todo</label>
                    <input type="text" value={this.state.content} onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}

export default AddTodo