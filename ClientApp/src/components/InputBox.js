import React, { Component } from 'react';
import './css/Form.css';
import authService from '..//components/api-authorization/AuthorizeService';

class InputBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { routeName: '', dateTime: '', routeComment: '',userId:''}

        }

            this.handleNameChange = this.handleNameChange.bind(this);
            this.handleDateChange = this.handleDateChange.bind(this);
            this.handleCommentChange = this.handleCommentChange.bind(this);
        }
     
    handleNameChange(event) {
        let data = this.state.data
        let newItem = Object.assign(data, { routeName: event.target.value })
        this.setState({ data: newItem });
        this.props.setNewData(this.state.data);
        }
    handleDateChange(event) {
        let data = this.state.data
            let newItem = Object.assign(data, { dateTime: event.target.value })
        this.setState({ data: newItem });
        this.props.setNewData(this.state.data);
        }

    handleCommentChange(event) {
        let data = this.state.data
            let newItem = Object.assign(data, { routeComment: event.target.value })
        this.setState({ data: newItem });
        this.props.setNewData(this.state.data);
        }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    async populateState() {
        const [user] = await Promise.all([authService.getUser()])
        let data = this.state.data
        let newItem = Object.assign(data, { userId:user && user.sub })
        this.setState({ data: newItem });
        this.props.setNewData(this.state.data);

    }

    render() {
     
        return (

                    <div className="base-containter">
                <form className="form">
                    <div className="form-group">
                            <label>Введите название маршрута:</label>
                            <input type="text" required value={this.state.name}
                            onChange={this.handleNameChange} />
                    </div>
                    <div className="form-group">
                            <label>Дата маршрута:</label>
                            <input type="datetime-local" required value={this.state.date}
                            onChange={this.handleDateChange} />
                    </div>
                    <div className="form-group">
                            <label>Примечания:</label>
                            <input type="text" required value={this.state.comment}
                            onChange={this.handleCommentChange} />
                    </div>
                           
                </form>
                
                    </div>



                )
    }
}

export default InputBox;

