import React from 'react';
import Textarea from './Textarea';
import { generateBoard } from '../actions/boardActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Sudoku extends React.Component {
    constructor() {
        super();

        this.state = {
            text: '',
            isClickedDiv: false,
            content: '',
            object: {}
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.setButtonProperties = this.setButtonProperties.bind(this);
    }

    componentDidMount() {
        this.props.generateBoard(this.props.history);
    }

    changeContent = newContent => {
        this.setState({ content: newContent });
    }

    setButtonProperties() {
        this.setState({ isClickedDiv: false });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ isClickedDiv: true })
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
                                        onClick={(e) => {this.onSubmit(e)}}
                                        className="square"
                                        contentEditable="true"
                                        id={++x}
                                        > 
                                            {/* { this.state.isClickedDiv && <Textarea replace={this.changeContent} setButtonProperties={this.setButtonProperties}/>}
                                            { } */}
                                    </div>);
                    } else {
                        children.push(<div 
                                        key={table[0][j][k]} 
                                        ref={(el) => this.divRef = el} 
                                        onClick={(e) => {this.onSubmit(e)}}
                                        className="square"
                                        contentEditable="true"
                                        id={++x}
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