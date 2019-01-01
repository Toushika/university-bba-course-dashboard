import React from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import $ from 'jquery';
import './takenCourses.css';
import SearchField from "react-search-field";
import Spinner from '../../image/spinner.gif';

class takenCoursesDemo extends React.Component {
    constructor(props) {
        super(props);
        this.getCoursesDetail = this.getCoursesDetail.bind(this);
    }
    state = {
        loading: true,
        bbaStudentCourse: [],
        studenCoursetDetail: []
    };




    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 2000);
        var bbaStudentCourse = [];
        var data = [
            {
                "student_id": "11101002",
                "student_name": "Ria Islam",
                "semesters_courses": [
                    {
                        "semester": "161",
                        "courses": ["BBA101", "BBA102", "MAT101", "MAT102"]
                    },
                    {
                        "semester": "162",
                        "courses": ["BBA310", "BBA311", "MAT121", "MAT122"]
                    },
                    {
                        "semester": "163",
                        "courses": ["Hum104", "BBA419", "MAT123", "ENG102"]
                    }
                ]
            },
            {
                "student_id": "11101003",
                "student_name": "Maria Islam",
                "semesters_courses": [
                    {
                        "semester": "171",
                        "courses": ["BBA101", "BBA102", "MAT101", "MAT102"]
                    },
                    {
                        "semester": "172",
                        "courses": ["BBA310", "BBA311", "MAT121", "MAT122"]
                    },
                    {
                        "semester": "173",
                        "courses": ["Hum104", "BBA419", "MAT123", "ENG102"]
                    }
                ]
            }

        ];

        var stRecordList = [];
        for (var i = 0; i < data.length; i++) {
    
            var studentRecord = {};

            var student_id = data[i].student_id;
            var student_name = data[i].student_name;
            studentRecord.studentId = student_id;
            studentRecord.studentName = student_name;

            var semesterCoures = data[i].semesters_courses;

            var scList = [];
            for (var j = 0; j < semesterCoures.length; j++) {
                var semester = semesterCoures[j].semester;
                var coursesName = "";
                var courseList = semesterCoures[j].courses;

                for (var k = 0; k < courseList.length; k++) {
                    coursesName =coursesName+" "+courseList[k];                 
                }

                var scHead = semester;
                scList.push(<p><b style={{color:'green'}}>Semester: </b><span>{scHead}</span></p>);
                var scData = coursesName;
                scList.push(<p>{scData}<hr/></p>);

              
            }
            studentRecord.semesterCourseList = scList;
            stRecordList.push(studentRecord); 
            this.setState({ bbaStudentCourse: stRecordList });
            console.log(JSON.stringify(stRecordList));

        }

    }


    getCoursesDetail = (itemStudent) => () => {
        var studentDetailInfo = {};
        var studenCoursetDetail = [];
        studenCoursetDetail.push(
            <tr>
                <th>Student</th>
                <th>Taken Courses</th>
                <th>Tentative Courses</th>
            </tr>

        );

        {
            this.state.bbaStudentCourse.map((item, index) => (
                itemStudent.studentId === item.studentId &&
                studenCoursetDetail.push(
                    <tr>
                        <td key={item.studentId} value={item.studentId}>{item.studentId}{" - "}{item.studentName}<br/></td>
                        <td key={item.studentId+item.semesterCourseList} value={item.studentId+item.semesterCourseList}>{item.semesterCourseList}<br/>   
                        </td>
                    </tr>

                )
            ))
        }

        this.setState({ studenCoursetDetail: studenCoursetDetail });
    }


    render() {
        const { loading } = this.state;
        if (loading) {
            return <img className="spinner" src={Spinner} />;
        }
        return (
            <div>
                <div className="containerFluid" style={{ marginTop: '7%' }}>
                    <div className="row" style={{ padding: 0, margin: 0 }}>

                        <div className="col-sm-1"></div>

                        <div className="col-sm-3 showDetails">
                            <h5 className="mainHeading">Courses Information</h5>
                            <Table className="table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>sl#</th>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.bbaStudentCourse.map((item, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.studentId}</td>
                                            <td>{item.studentName}</td>
                                            <td><button type="button" onClick={this.getCoursesDetail(item)} className="small">Show</button></td>
                                        </tr>

                                    ))}
                                </tbody>
                            </Table>
                        </div>

                        <div className="col-sm-1"></div>

                        <div className="col-sm-6">
                            <Table className="table-bordered table-hover">{this.state.studenCoursetDetail}</Table>

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
export default takenCoursesDemo;