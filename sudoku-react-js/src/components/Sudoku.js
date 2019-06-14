import React from 'react';
import { generateBoard } from '../actions/boardActions';
import { getTip } from '../actions/tipActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Sudoku extends React.Component {
    constructor() {
        super();

        this.state = {
            boardTip: [],
            isVisibleStart: false,
            isVisibleTip: false,
            isBlackFont: false,
            isRedFont: true
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
        let { isBlackFont, isRedFont } = this.state;

        for(let i=0; i<table.length; i++) {
            for(let j=0; j<table[i].length; j++) {
                let children = [];
                for(let k=0; k<table[i][j].length; k++) {
                    if(table[i][j][k] === 0) {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                    .filter(e => !!e).join(' ')}
                                        contentEditable="true"
                                        onKeyDown={this.onKey}
                                        > 
                                    </div>);
                    } else {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                    .filter(e => !!e).join(' ')}
                                        onKeyUp={this.onKey}
                                        >
                                         { table[i][j][k] }
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
        this.setState({ 
            isVisibleTip: true,
            isVisibleStart: false,
            isBlackFont: true,
            isRedFont: false
        })
        getTip(board, this.state.history);   
    }

    render() {
        const { board } = this.props;
        const { boardTip } = this.props;
        let { isVisibleStart, isVisibleTip } = this.state;

        return (
            <div className="container">
                <div className="left" ref={(el) => this.divLeft = el}>
                <h4>Game time: <Timer /></h4>
                <br />
                    { isVisibleStart && this.createBoard(board).slice()}
                    {isVisibleTip && this.createBoard(boardTip).slice()}
                    <br />
                    
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