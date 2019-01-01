import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import './takenCourses.css';
import SearchField from "react-search-field";
import Spinner from '../../image/spinner.gif';

class takenCoursesFinal extends React.Component {
    constructor(props) {
        super(props);
        this.getCoursesDetail = this.getCoursesDetail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    state = {
        loading: true,
        allStudentId: [],
        allCoursesDetail: [],
        studentIndividualId: '',
        courseListForComapare: [],
        allBBACourse: [],
        searchString: "",
        bbaCoursesCompare: [],
        tentativeCourses: []
    };

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);

        var allUniqueId = [];
        var allBBACourse = [];
        axios.get('http://localhost:5000/getUniqueStudent')
            .then(response => {
                var tempData = response.data;
                for (var i = 0; i < tempData.length; i++) {
                    allUniqueId.push(tempData[i]);
                }

                this.setState({ allStudentId: allUniqueId });
            }).catch(function (error) {
                console.log(error);
            });

        axios.post('http://localhost:5000/getAllBbaCourse')
            .then(response => {
                var tempData1 = response.data;
                var bbaCoursesCompare = [];
                for (var i = 0; i < tempData1.length; i++) {
                    var semesterCourses = {};
                    var semester = tempData1[i].semester;
                    semesterCourses.semester = semester;
                    var allCourseList = [];
                    var courseList = tempData1[i].courseList;
                    for (var j = 0; j < courseList.length; j++) {
                        if (courseList[j].course != '') {
                            allCourseList.push(<li>{courseList[j].course}</li>);
                            bbaCoursesCompare.push(courseList[j].course);
                        }
                    }
                    semesterCourses.courseList = allCourseList;
                    allBBACourse.push(semesterCourses);
                }
                this.setState({ allBBACourse: allBBACourse });
                this.setState({ bbaCoursesCompare: bbaCoursesCompare });
            }).catch(function (error) {
                console.log(error);
            });

    }
    //searching Function//

    handleChange() {
        this.setState({
            searchString: this.refs.search.value
        });
    }
    //searching Function//

    getCoursesDetail = (itemStudent) => () => {
        $("#viewResult1").show();
        $("#viewResult2").show();

        var allCoursesDetail = [];
        var courseListForComapare = [];

        var studentId = {
            Id: itemStudent
        }

        this.setState({ studentIndividualId: itemStudent });
        axios.post('http://localhost:5000/getIndividual', studentId)
            .then(response => {
                var allCourses = response.data;
                for (var i = 0; i < allCourses.length; i++) {
                    var semesterCourses = {};
                    var semester = allCourses[i].semester;
                    semesterCourses.semester = semester;
                    var allCourseList = [];
                    var courseList = allCourses[i].courseList;
                    for (var j = 0; j < courseList.length; j++) {
                        if (courseList[j].course != '') {
                            allCourseList.push(<li>{courseList[j].course}</li>);
                            courseListForComapare.push(courseList[j].course);
                        }
                    }
                    this.setState({ courseListForComapare: courseListForComapare });
                    semesterCourses.courseList = allCourseList;
                    allCoursesDetail.push(semesterCourses);
                }

                var tentativeCourses = this.state.bbaCoursesCompare.filter((bba) => !this.state.courseListForComapare.includes(bba));
                // console.log("All Courses:: " + this.state.courseListForComapare);
                // console.log("All BBA Courses:: " + this.state.bbaCoursesCompare);
                console.log("Tentative Courses:: " + tentativeCourses);
                this.setState({ allCoursesDetail: allCoursesDetail });
                this.setState({ tentativeCourses: tentativeCourses });

            }).catch(function (error) {
                console.log(error);

            })
    }


    render() {
        //Loading Spinner

        const { loading } = this.state;
        if (loading) {
            return <img className="spinner" src={Spinner} />;
        }
        // End of Loading Spinner


        // searching Code
        let allStudent = this.state.allStudentId;
        let search = this.state.searchString.trim().toLowerCase();

        if (search.length > 0) {
            allStudent = allStudent.filter(function (user) {
                return user.toLowerCase().match(search);
            });

        }
        //Searching Code 

        return (
            <div>
                <div className="containerFluid" style={{ marginTop: '7%' }}>

                    <div className="row" style={{ padding: 0, margin: 0 }}>

                        <div className="col-sm-1"></div>

                        <div className="col-sm-2">
                            <h5 className="mainHeading">All BBA Courses</h5>
                            <Table className="table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Semester & Courses</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.allBBACourse.map((item, index) => (
                                        <tr>
                                            <td>
                                                <p><b style={{ color: 'green' }}>Semester: </b>{item.semester}</p>
                                                <p style={{ paddingLeft: '5%' }}>{item.courseList}</p>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>

                            </Table>
                        </div>

                        <div className="col-sm-3 showDetails">
                            <h5 className="mainHeading">All Student</h5>

                            <div style={{ textAlign: 'center', background: '#404e60', padding: '2%' }}>
                                <input
                                    type="text"
                                    value={this.state.searchString}
                                    ref="search"
                                    onChange={this.handleChange}
                                    placeholder="Type Student Id &#128270;"

                                />
                            </div>


                            <Table className="table-bordered table-hover allStudentId" style={{ marginTop: '3%' }}>
                                <thead>
                                    <tr>
                                        <th>sl#</th>
                                        <th>Id</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allStudent.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item}</td>
                                            <td style={{ textAlign: 'center' }}><Button color="success" onClick={this.getCoursesDetail(item)}>Show</Button></td>
                                        </tr>

                                    ))}

                                </tbody>
                            </Table>
                        </div>

                        <div className="col-sm-3" style={{ paddingTop: '3%', paddingBottom: '2%' }} id="viewResult1" >

                            <tr>
                                <th style={{ textAlign: 'center' }}><h5>Id -</h5> </th>
                                <th><h5 className="mainHeading">{this.state.studentIndividualId}<span style={{ color: 'black' }}>{": Taken Courses"}</span></h5></th>

                            </tr>

                            <Table className="table-bordered table-hover takenCourses">
                                <thead>
                                    <tr>
                                        <th>sl#</th>
                                        <th>Taken Courses</th>

                                    </tr>
                                </thead>

                                <tbody>

                                    {this.state.allCoursesDetail.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p><b style={{ color: 'green' }}>Semester: </b>{item.semester}</p>
                                                <p style={{ paddingLeft: '5%' }}>{item.courseList}</p>
                                            </td>
                                        </tr>

                                    ))}

                                </tbody>

                            </Table>

                        </div>

                        <div className="col-sm-2" id="viewResult2" style={{ paddingTop: '3%', paddingBottom: '2%' }}>

                            <tr>
                                <th><h5 className="mainHeading"><span style={{color:'black'}}>Available Courses</span></h5></th>

                            </tr>

                            <Table className="table-bordered table-hover tentativeCourses">
                                <thead>
                                    <tr>
                                        <th>Tentative Courses</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.tentativeCourses.map((item, index) => (
                                        <tr>
                                            <td>
                                                <p style={{ paddingLeft: '5%' }}>{item}</p>
                                            </td>
                                        </tr>

                                    ))}


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
export default takenCoursesFinal;