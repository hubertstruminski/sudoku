import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Result extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { result } = this.props;

        let isSuccess = result[0];
        let userName = result[1];
        let time = result[2];

        return (
            <div>
                <ShowResultMessage 
                    isSuccess={isSuccess} 
                    userName={userName} 
                    time={time} 
                />
            </div>
        );
    }
}

function ShowResultMessage(props) {
    if(props.isSuccess) {
        return (
            <div className="alert alert-success sizeDivWarning">
                Sudoku has been resolved successfully by {props.userName}.
                <br />
                Task completed in {props.time}.
                <br />
                Your result goes to the world rankings.
                <br />
                <br />
                See you again...
            </div>
        );
    } else {
        return (
            <div  className="alert alert-danger sizeDivWarning">
                Sudoku has not been resolved successfully by {props.userName}.
                <br />
                Task not completed. Your were stuck in {props.time}.
                <br /><br />
                Try again...
            </div>
        );
    }
}

Result.propTypes = {
    result: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    result: state.result
})

export default connect(mapStateToProps, {  })(Result);