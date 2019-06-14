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
        this.onKey = this.onKey.bind(this);
    }

    componentDidMount() {
        this.setState({ isVisibleStart: true });
        this.props.generateBoard(this.props.history);
    }

    onKey(e) {
        e.target.innerText = "";

        let keycode = e.keyCode;
        if(keycode > 64 && keycode < 91 || keycode > 185 && keycode < 193 ||
            keycode > 218 && keycode < 223 || keycode == 48) {
            e.preventDefault();
            e.target.innerText = "";
        }
        if(keycode == 32 || keycode == 13) {
            e.preventDefault();
            e.target.innerText = "";
        }
        if(e.target.innerText.length === 1) {
            e.preventDefault();
        }
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
                                        onKeyDown={this.onKey}
                                        // onKeyUp={this.onKey}
                                        > 
                                    </div>);
                    } else {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        className="square"
                                        // onKeyDown={this.onKey}
                                        onKeyUp={this.onKey}
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

    giveTip(e) {
        e.preventDefault();
        const { board, getTip } = this.props;
        this.setState({ isVisibleTip: true })
        this.setState({ isVisibleStart: false }); 
        getTip(board, this.state.history);   
    }

    render() {
        const { board } = this.props;
        
        let isVisibleStart = this.state.isVisibleStart;
        let isVisibleTip = this.state.isVisibleTip;

        // if(isVisibleTip) {
            
        // }
        const { boardTip } = this.props;
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
    boardTip: PropTypes.array
}

const mapStateToProps = state => ({
    board: state.board,
    boardTip: state.boardTip
})

export default connect(mapStateToProps, { generateBoard, getTip })(Sudoku);