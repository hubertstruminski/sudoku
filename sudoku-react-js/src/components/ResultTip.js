import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ResultTip extends React.Component {

    render() {
        const { result } = this.props;
        let time = result[0];
        let userName = result[1];
        return (
            <div className="alert alert-danger sizeDivWarning">
                { userName }, you were stuck in { time }.
                <br />
                <br />
                You used the tip so you will not get to the rankings.
                <br />
                Try again...
            </div>
        );
    }
}

ResultTip.propTypes = {
    result: PropTypes.array
}

const mapStateToProps = state => ({
    result: state.result
})

export default connect(mapStateToProps, {  })(ResultTip);