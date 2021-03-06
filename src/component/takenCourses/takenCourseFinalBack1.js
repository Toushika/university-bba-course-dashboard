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
        this.handleClick = this.handleClick.bind(this);
    }
    state = {
        loading: true,
        allStudentId: [],
        allCoursesDetail: [],
        studentIndividualId: '',
        courseListForComapare: [],
        allBBACourse: [],
        searchString: "",
        currentPage: 1,
        todosPerPage:100

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
                for (var i = 0; i < tempData1.length; i++) {
                    var semesterCourses = {};
                    var semester = tempData1[i].semester;
                    semesterCourses.semester = semester;
                    var allCourseList = [];
                    var courseList = tempData1[i].courseList;
                    for (var j = 0; j < courseList.length; j++) {
                        allCourseList.push(<li>{courseList[j].course}</li>);
                    }
                    semesterCourses.courseList = allCourseList;
                    allBBACourse.push(semesterCourses);
                }
                this.setState({ allBBACourse: allBBACourse });
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

    //page Number//

    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    //page Number

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
                        allCourseList.push(<li>{courseList[j].course}</li>);
                        courseListForComapare.push(courseList[j].course);
                    }
                    this.setState({ courseListForComapare: courseListForComapare });
                    semesterCourses.courseList = allCourseList;
                    allCoursesDetail.push(semesterCourses);

                }
                this.setState({ allCoursesDetail: allCoursesDetail });

            }).catch(function (error) {

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


        const { todos, currentPage, todosPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = allStudent.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
            return <tr><td>{index + 1}</td><td key={index}>{todo}</td><td><Button color="success" onClick={this.getCoursesDetail(todo)}>Show</Button></td></tr>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(allStudent.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            return (
              <td
                    key={number}
                    id={number}
                    onClick={this.handleClick}
                    style={{cursor:'pointer'}}
                   
                >
                    {number}
                </td>
            );
        });


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

                            <div>
                                <Table className="table-bordered table-hover allStudentId" style={{ marginTop: '3%' }}>
                                    <thead>
                                        <tr>
                                            <th>sl#</th>
                                            <th>Id</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {renderTodos}

                                    </tbody>

                                </Table>
                            </div>

                            <div>
                                <Table className="table-bordered table-hover allStudentId" style={{ marginTop: '3%' }}>

                                  
                                        {renderPageNumbers}
                                 
                                </Table>
                            </div>






                            {/* <Table className="table-bordered table-hover allStudentId" style={{ marginTop: '3%' }}>
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
                            </Table> */}
                        </div>

                        <div className="col-sm-3" style={{ paddingTop: '3%', paddingBottom: '2%' }} id="viewResult1" >

                            <tr>
                                <th style={{ textAlign: 'center' }}>Id - </th>
                                <th><b className="mainHeading">{this.state.studentIndividualId}</b>{": Taken Courses"}</th>

                            </tr>

                            <Table className="table-bordered table-hover">
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

                        <div className="col-sm-2" style={{ paddingTop: '5%', paddingBottom: '1%' }} id="viewResult2">


                            <Table className="table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Tentative Courses</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {this.state.courseListForComapare.map((item, index) => (
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