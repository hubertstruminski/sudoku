import React from 'react';
import { getStatistics } from '../actions/statisticActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Stat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEmpty: []
        }
    }
 
    componentDidMount() {
        this.state.isEmpty.push(false);

        if(!this.state.isEmpty[0]) {
            this.props.getStatistics();
        }
    }

    render() {
        const { statistics } = this.props.statistic;
        let isEmpty = this.state.isEmpty[0];
        let x = 0;

        return (
            <div>
                <div className="title">
                    The fastest solution - TOP 5 Players
                </div>
                <div className="table-responsive-sm table-size flex">
                    <table className="table table-striped table-dark table-radius table-hover">
                        <tbody>
                        {   !isEmpty &&
                            statistics.map(statistic => (
                                <tr>
                                    <td>{++x}</td>
                                    <td>{statistic.userName}</td>
                                    <td>{statistic.time}</td>
                                    <td>{statistic.date}</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Stat.propTypes = {
    statistic: PropTypes.object.isRequired,
    getStatistics: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    statistic: state.statistic
})

export default connect(mapStateToProps, { getStatistics })(Stat);