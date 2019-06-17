import React from 'react';
import { generateBoard } from '../actions/boardActions';
import { getTip } from '../actions/tipActions';
import { checkResult, checkResultTip } from '../actions/resultActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from './Timer';

class Sudoku extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            boardTip: [],
            isVisibleStart: false,
            isVisibleTip: false,
            isBlackFont: false,
            isRedFont: true,
            time: [],
            username: '',
            invalidUserName: false
        }
        this.timerRef = React.createRef();

        this.divs = [];

        this.giveTip = this.giveTip.bind(this);
        this.onKey = this.onKey.bind(this);
        this.checkBoard = this.checkBoard.bind(this);
        this.passTime = this.passTime.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ isVisibleStart: true });
        this.props.generateBoard(this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onKey(e) {
        e.target.innerText = "";

        let keycode = e.keyCode;
        if((keycode > 64 && keycode < 91) || (keycode > 185 && keycode < 193) ||
            (keycode > 218 && keycode < 223) || keycode === 48) {
            e.preventDefault();
            e.target.innerText = "";
        }
        if(keycode === 32 || keycode === 13) {
            e.preventDefault();
            e.target.innerText = "";
        }
        if(e.target.innerText.length === 1) {
            e.preventDefault();
        }
    }

    passTime(newTime) {
        this.state.time.push(newTime)
    }

    createBoard = (...table) => {
        let result = [];
        let { isBlackFont, isRedFont } = this.state;
        let x = 0;

        for(let i=0; i<table.length; i++) {
            for(let j=0; j<table[i].length; j++) {
                let children = [];
                for(let k=0; k<table[i][j].length; k++) {
                    if(table[i][j][k] === 0) {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => {this.divs[x++] = el}} 
                                        className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                    .filter(e => !!e).join(' ')}
                                        contentEditable="true"
                                        onKeyDown={this.onKey}
                                        > 
                                    </div>);
                    } else {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => {this.divs[x++] = el}} 
                                        className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                    .filter(e => !!e).join(' ')}
                                        onKeyDown={this.onKey}
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

    checkBoard(e) {
        e.preventDefault();

        if(this.state.username.length === 0) {
            this.setState({ invalidUserName: true });
            e.preventDefault();
        }

        let isTip = this.state.isVisibleTip;
        this.timerRef.current.stopTime();

        let time = this.state.time[0];
        let userName = this.state.username;

        if(isTip) {
            this.props.checkResultTip(time, userName, this.props.history);
        } else {
            let fullFilledBoard = this.divs;
            let processedBoard = this.processBoard(fullFilledBoard);

            this.props.checkResult(processedBoard, time, userName, this.props.history);
        }
    }

    create2DArray(rows) {
        var array = [];   
        for (var i=0;i<rows;i++) {
           array[i] = [];
        }
        return array;
      }

    processBoard(...table) {
        let result = this.create2DArray(9);
        let rows = 0;
        let columns = 0;
        for(let i=0; i<81; i++) {
            if(columns === 9) {
                columns = 0;
                rows++;
            }
            result[rows][columns] = table[0][i].innerText;
            columns++;
        }
        return result;
    }

    render() {
        const { board } = this.props;
        const { boardTip } = this.props;
        let { isVisibleStart, isVisibleTip } = this.state;

        return (
            <div className="container">
                <div className="left" ref={(el) => this.divLeft = el}>
                <h4 className="sizeh4">Game time: <Timer ref={this.timerRef} onPassTime={this.passTime} /></h4>
                <br />
                    { isVisibleStart && this.createBoard(board).slice()}
                    {isVisibleTip && this.createBoard(boardTip).slice()}
                </div>
                <div className="right">
                    <div className="keyboard-control">
                        <h3 className="sizeh3">If you feel that you're stuck for too long check solution</h3>
                        
                        <form onSubmit={this.giveTip}>
                            <input type="submit" value="Tip" className="btnTip" />
                        </form>

                        <form onSubmit={this.checkBoard} >
                            <h5 className="redFont">Remember, input user name before send solution</h5>
                            <input 
                                type="text" 
                                name="username" 
                                id="username" 
                                className="inputUser" 
                                maxLength="22"
                                ref={(el) => this.userNameRef = el}
                                onChange={this.onChange}
                                value={this.state.username}
                            />
                            <br />
                            <label htmlFor="username">Username</label>
                            <br />
                            <input 
                                type="submit" 
                                value="Check board" 
                                className="btnTip" 
                            />
                        </form>
                    </div>
                </div>
                <div className="clear"></div> 
                <ShowInvalidUserName invalidUserName={this.state.invalidUserName} />
            </div>
        );
    }
}

function ShowInvalidUserName(props) {
    if(props.invalidUserName) {
        return (
            <div className="alert alert-danger invalidUser">You forgot input your user name. Try again...</div>
        );
    }
    return null;
}

Sudoku.propTypes = {
    board: PropTypes.array.isRequired,
    boardTip: PropTypes.array,
    result: PropTypes.array
}

const mapStateToProps = state => ({
    board: state.board,
    boardTip: state.boardTip,
    result: state.result
})

export default connect(mapStateToProps, { generateBoard, 
    getTip, checkResult, checkResultTip })(Sudoku);