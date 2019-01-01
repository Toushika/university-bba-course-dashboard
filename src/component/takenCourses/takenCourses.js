import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import './takenCourses.css';
import SearchField from "react-search-field";
import Spinner from '../../image/spinner.gif';

class takenCourses extends React.Component {
    constructor(props) {
        super(props);
        this.getTakenCoursesInfo1 = this.getTakenCoursesInfo1.bind(this);
        // this.searchResult = this.searchResult.bind(this);
    }
    state = {
        loading: true,
        takenCourses: [],
        tentativeCourses: [],
        studentId: '',
        studentName: ''
    };
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);
    }

    getTakenCoursesInfo1(id,name) {
        $("#studentDetails").show();
        var id = id;
        var name = name;
        var takenCourses = ["BBA101", "BBA102", "BBA105", "CSE101", "MAT110", "HUM103", "CHEM101", "PHY111"];
        var tentativeCourses = ["Sta101", "BBA310", "ACT215"];
        this.setState({ studentId: id });
        this.setState({ studentName: name });
        this.setState({ takenCourses: takenCourses });
        this.setState({ tentativeCourses: tentativeCourses });

    }
    getTakenCoursesInfo2() {
        alert("No Data Found");

    }

    getTakenCoursesInfo3() {
        alert("No Data Found");
    }

    searchResult(e){
        console.log(e);
      
    }


    render() {
        const { loading } = this.state;
        if (loading) {
            return <img className="spinner" src={Spinner} />;
        }
        return (
            <div>
                <div className="containerFluid" style={{ marginTop: '7%' }}>
                    <div className="row"  style={{ padding: 0, margin: 0 }}>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8" style={{marginTop:'1%'}}>
                            <SearchField
                                placeholder="Search..."
                                classNames="test-class"
                                onChange={(e) => this.searchResult(e)}
                            />
                        </div>
                        <div className="col-sm-4"></div>

                    </div>

                    <div className="row" style={{ padding: 0, margin: 0 }}>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-3">
                            <h5 className="mainHeading">Student Information</h5>
                            <Table className="table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>11101002</td>
                                        <td>Toushika Islam</td>
                                        <td style={{ textAlign: 'center' }}><Button color="info" onClick={() => this.getTakenCoursesInfo1("11101002", "Toushika Islam")}>Show</Button>{' '}</td>

                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>11101003</td>
                                        <td>Swapna Paul</td>
                                        <td style={{ textAlign: 'center' }}><Button color="info" onClick={() => this.getTakenCoursesInfo2()}>Show</Button>{' '}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>11101004</td>
                                        <td>Rushad Khan</td>
                                        <td style={{ textAlign: 'center' }}><Button color="info" onClick={() => this.getTakenCoursesInfo3()}>Show</Button>{' '}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="col-sm-1"></div>
                        <div className="col-sm-6 showDetails" id="studentDetails">
                            <h5 className="mainHeading">Courses Information</h5>
                            <Table className="table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Student</th>
                                        <th>Taken Courses</th>
                                        <th>Tentative Courses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.studentId}-{this.state.studentName}</td>
                                        <td>
                                            <p style={{ color: 'green' }}>Semester-191</p>
                                            {this.state.takenCourses.map(function (item, key) {
                                                return (
                                                    <span>{item}{" , "}</span>

                                                );
                                            })}

                                            <hr/>

                                            <p style={{ color: 'green' }}>Semester-192</p>
                                            {this.state.takenCourses.map(function (item, key) {
                                                return (
                                                    <span>{item}{" , "}</span>

                                                );
                                            })}

                                            <hr/>

                                            <p style={{ color: 'green' }}>Semester-193</p>
                                            {this.state.takenCourses.map(function (item, key) {
                                                return (
                                                    <span>{item}{" , "}</span>

                                                );
                                            })}

                                        </td>
                                        <td>
                                            {this.state.tentativeCourses.map(function (item, key) {
                                                return (

                                                    <span>{item}{" , "}</span>

                                                );
                                            })}
                                        </td>

                                    </tr>

                                </tbody>
                            </Table>

                        </div>

                        <div className="col-sm-1"></div>

                    </div>

                </div>
                <p style={{ textAlign: 'center', paddingTop: '2%', fontSize: 12 }}>© 2010-2018 Green University. Powered by IT Department</p>
                <p style={{ textAlign: 'center', fontSize: 10 }}></p>

            </div>

        );
    }
}
export default takenCourses;