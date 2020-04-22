import React, { Component } from 'react';

{/*const propTypes = {
    buttonClickHandler: PropTypes.func
};*/}
class Button extends Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave(e) {
        e.preventDefault();
        this.props.buttonClickHandler();
    }

    render() {

        return(

            <div className='container-fluid'>
                <a className='btn btn-raised btn-warning btn_icon-action btn_icon-action_save' href='#' role='button'
                    onClick={this.handleSave}
                >
                    Сохранить
                    </a>
            </div>
            )
    }
}

export default Button;