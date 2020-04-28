import React, { Component } from 'react';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = { data:{ }, filter: "" };
    }

    handleChange = (event) => {
        var searchQuery = event.target.value.toLowerCase();
        this.props.onHandleFilter(searchQuery);
        this.setState({
            filter: event.target.value
        })
    }

    render() {
        
            return (
                <div>

                    <input  onChange={this.handleChange} />
                
                    </div>
            )
        };
}
export default Filter;