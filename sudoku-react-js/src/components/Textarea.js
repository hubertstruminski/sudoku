import React from 'react';

class Textarea extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        }
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onBlur(e) {
        this.props.replace(this.state.content);
        this.props.setButtonProperties(); 
    }

    onChange(e) {
        this.setState({ content: e.target.value })
    }

    render() {
        return (
            <textarea cols="200" rows="200" className="txtArea" onBlur={this.onBlur} onChange={this.onChange}>
                {this.state.content}
            </textarea>
        );
    }
}

export default Textarea;