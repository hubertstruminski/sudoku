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
            isVisibleStart: false,
            isBlackFont: false,
            isRedFont: true,
            time: [],
            username: '',
            invalidUserName: false,
            isEmptyCellsArray: [],
            isEmptyCell: false
        }
        this.timerRef = React.createRef();

        this.divs = [];
        this.numberOfTips = 0;
        this.isTip = false;
        this.isEmpty = false;

        this.giveTip = this.giveTip.bind(this);
        this.onKey = this.onKey.bind(this);
        this.checkBoard = this.checkBoard.bind(this);
        this.passTime = this.passTime.bind(this);
        this.onChange = this.onChange.bind(this);

        this.isEmptyDivArray = [];
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
        for(let a=0; a<table.length; a++) {
            for(let i=0; i<table[a].length; i++) {
                if(i === 0) {
                    for(let j=0; j<table[a][i].length; j++) {
                        let children = [];
        
                        for(let k=0; k<table[a][i][j].length; k++) {
                            let divsRef = React.createRef();
                            this.divs.push(divsRef);

                            if(table[a][i][j][k] === 0) {
                                children.push(<div 
                                                key={table[a][0][j][k]} 
                                                ref={divsRef} 
                                                className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                            .filter(e => !!e).join(' ')}
                                                contentEditable="true"
                                                onKeyDown={this.onKey}
                                                > 
                                            </div>);
                                this.isEmptyDivArray.push(new coordinatesForEmptyCell(j, k));
                            } else {
                                children.push(<div 
                                                key={table[a][0][j][k]} 
                                                ref={divsRef} 
                                                className={[isBlackFont && 'square-black', isRedFont && 'square']
                                                            .filter(e => !!e).join(' ')}
                                                onKeyDown={this.onKey}
                                                >
                                                 { table[a][i][j][k] }
                                            </div>);
                            }
                        }
                        result.push(children);
                        result.push(<div className="clear"></div>);
                    }
                }             
            }
        }
        return result;
    }

    giveTip(e) {
        e.preventDefault();

        const { board } = this.props;
        let solvedBoard = board[1];

        this.isTip = true;

        if(this.isEmptyDivArray.length !== 0) {
            let index = Math.floor(Math.random() * this.isEmptyDivArray.length);
            let x = this.isEmptyDivArray[index].x;
            let y = this.isEmptyDivArray[index].y;
        
            this.isEmptyDivArray.splice(index, 1);

            let result = solvedBoard[x][y];  
            let numberOfDiv = x * 9 + y;

            this.divs[numberOfDiv].current.innerText = result;

            ++this.numberOfTips;
        } 
    }

    checkBoard(e) {
        e.preventDefault();

        if(this.state.username.length === 0) {
            this.setState({ invalidUserName: true });
            e.preventDefault();
        }

        console.log(this.isTip);
        this.timerRef.current.stopTime();

        let time = this.state.time[0];
        let userName = this.state.username;

        if(this.isTip) {
            this.props.checkResultTip(time, userName, this.numberOfTips, this.props.history);
        } else {
            let fullFilledBoard = this.divs;
            let processedBoard = this.processBoard(fullFilledBoard);

            if(this.isEmpty) {
                this.setState({ isEmptyCell: this.isEmpty });
                return false;
            } else {
                this.props.checkResult(processedBoard, time, userName, this.props.history);
            }
            
        }
    }

    create2DArray(rows) {
        var array = new Array(rows); 
        for (var i=0;i<rows;i++) {
           array[i] = new Array(9);
        }
        return array;
      }

    processBoard(...table) {
        let result = []
        for(let i=0; i<table[0].length; i++) {
            if(table[0][i].current !== null) {
                if(table[0][i].current.innerHTML === "") {
                    this.isEmpty = true;
                    break;
                }
                result.push(table[0][i].current.innerHTML);
            }
        }
        return result;
    }

    render() {
        const { board } = this.props;
        let { isVisibleStart } = this.state;

        return (
            <div className="container">
                <div className="left" ref={(el) => this.divLeft = el}>
                <h4 className="sizeh4">Game time: <Timer ref={this.timerRef} onPassTime={this.passTime} /></h4>
                <br />
                    { isVisibleStart && this.createBoard(board).slice()}
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
                <ShowWarningEmptyCell isEmptyCell={this.state.isEmptyCell} />
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

function ShowWarningEmptyCell(props) {
    if(props.isEmptyCell) {
        return (
            <div className="alert alert-danger invalidUser">Your Sudoku board can have empty cells. Check it!</div>
        );
    }
    return null;
}

function coordinatesForEmptyCell(x, y) {
    this.x = x;
    this.y = y;
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