import React from 'react';
import { generateBoard } from '../actions/boardActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sudoku extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.generateBoard(this.props.history);
    }

    createBoard = (...table) => {
        let result = [];
        let x = 0;
        for(let i=0; i<table.length; i++) {
            for(let j=0; j<table[i].length; j++) {
                let children = [];
                for(let k=0; k<table[i][j].length; k++) {
                    if(table[i][j][k] === 0) {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        className="square"
                                        contentEditable="true"
                                        > 
                                    </div>);
                    } else {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        className="square"
                                        >
                                            <span className="field">{ table[i][j][k] }</span>
                                    </div>);
                    }
                }
                result.push(children);
                result.push(<div className="clear"></div>);
            }  
        }
        return result;
    }

    render() {
        const { board } = this.props;
        return (
            <div>
                {this.createBoard(board).slice()}
            </div>
        );
    }
}

Sudoku.propTypes = {
    board: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    board: state.board
})

export default connect(mapStateToProps, { generateBoard })(Sudoku);