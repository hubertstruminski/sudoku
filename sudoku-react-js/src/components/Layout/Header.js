import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark margin">
                    <Link to="/sudoku" className="navbar-brand">Sudoku Puzzles</Link>
                    <ul className="navbar-nav">
                        <li>
                            <Link to="/guide" className="nav-link">Guide</Link>
                        </li>
                    </ul>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            <li>
                                <Link to="/statistics" className="nav-link">Statistics</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;