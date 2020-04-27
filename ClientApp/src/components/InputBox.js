import React, { Component } from 'react';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            data: { RouteName: '', DateTime: '', RouteComment: '' }
        }

            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleCommentChange = this.handleCommentChange.bind(this);
        }
     
        handleNameChange(event) {
            let data = this.state.data
            let newItem = Object.assign(data, { RouteName: event.target.value })
            this.setState({ data: newItem });
            this.props.setNewData(this.state.data);
        }
        handleDateChange(event){
            let data = this.state.data
            let newItem = Object.assign(data, { DateTime: event.target.value })
            this.setState({ data: newItem });
            this.props.setNewData(this.state.data);
        }

        handleCommentChange(event) {
            let data = this.state.data
            let newItem = Object.assign(data, { RouteComment: event.target.value })
            this.setState({ data: newItem });
            this.props.setNewData(this.state.data);
        }
    render() {

        return (

                    <div className="base-containter">
                        <form className="form">
                            <label>Введите название маршрута:</label>
                            <input type="text" required value={this.state.name}
                                onChange={this.handleNameChange} />
                            <label>Дата маршрута:</label>
                            <input type="text" required value={this.state.date}
                                onChange={this.handleDateChange} />
                            <label>Примечания:</label>
                            <input type="text" required value={this.state.comment}
                                onChange={this.handleCommentChange} />
                           
                        </form>
                    </div>


                )
    }
}

export default InputBox;

