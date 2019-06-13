import React from 'react';
import { generateBoard } from '../actions/boardActions';
import { getTip } from '../actions/tipActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sudoku extends React.Component {
    constructor() {
        super();

        this.state = {
            boardTip: [],
            isVisibleStart: false,
            isVisibleTip: false
        }
        this.giveTip = this.giveTip.bind(this);
    }

    componentDidMount() {
        this.setState({ isVisibleStart: true });
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

    giveTip() {
        const { board } = this.props;
        const tip = this.createBoard(board).slice();
        this.setState({ boardTip: tip });

        console.log("TIP array");
        console.log(tip);
        console.log("STATE");
        console.log(this.state.boardTip);

        this.setState({ isVisibleStart: false });
        this.setState({ isVisibleTip: true });

        this.props.getTip(board, this.state.history);


        

        // this.divLeft.innerHTML = "";
        // this.divLeft.innerHTML = this.createBoard(solvedArray).slice();
    }

    render() {
        const { board } = this.props;
        const { boardTip } = this.props;
        
        let isVisibleStart = this.state.isVisibleStart;
        let isVisibleTip = this.state.isVisibleTip;
        return (
            <div className="container">
                <div className="left" ref={(el) => this.divLeft = el}>
                    { isVisibleStart && this.createBoard(board).slice()}
                    {isVisibleTip && this.createBoard(boardTip).slice()}
                </div>
                <div className="right">
                    <form onSubmit={this.giveTip}>
                        <input type="submit" value="Tip" className="btnTip" />
                    </form>
                </div>
                <div className="clear"></div>       
            </div>
        );
    }
}

Sudoku.propTypes = {
    board: PropTypes.array.isRequired,
    boardTip: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    board: state.board,
    boardTip: state.boardTip
})

export default connect(mapStateToProps, { generateBoard, getTip })(Sudoku);