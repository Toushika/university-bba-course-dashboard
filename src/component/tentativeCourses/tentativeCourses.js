import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import './tentativeCourses.css';
import Spinner from '../../image/spinner.gif';

class tentativeCourses extends React.Component {
    constructor(props) {
        super(props);
    }

 
    state = {
        loading: true
   
    };
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);
    }

    render() {
        const { loading } = this.state;
        if (loading) {
            return <img className="spinner" src={Spinner}/>;
        }
        return (
            <div>
                <h4 className="mainHeading">Tentative Courses</h4>
            </div>
          
        );
    }
}
export default tentativeCourses;