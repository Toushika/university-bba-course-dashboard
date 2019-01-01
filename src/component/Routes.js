import React from 'react';
import { Switch, Route } from 'react-router-dom';
import tentativeCourses from './tentativeCourses/tentativeCourses.js';
import takenCourses from './takenCourses/takenCourses.js';
import takenCoursesDemo from './takenCourses/takenCoursesDemo.js';
import allCoursesUpload  from './allCoursesUpload/allCoursesUpload';
import allTakenCoursesUpload  from './allTakenCoursesUpload/allTakenCoursesUpload';
import takenCoursesFinal from './takenCourses/takenCoursesFinal';

const Routes = () => (
  <div >
    <Switch>
      <Route exact path='/' />
      <Route path='/tentative-courses' component={tentativeCourses} />
      <Route path='/taken-courses' component={takenCourses} />
      {/* <Route path='/taken-coursesDemo' component={takenCoursesDemo} /> */}
      <Route path='/all-CoursesUpload' component={allCoursesUpload} />
      <Route path='/all-TakenCoursesUpload' component={allTakenCoursesUpload} />
      <Route path='/taken-CoursesFinal' component={takenCoursesFinal} />
      <Route />
    </Switch>
  </div>
)

export default Routes
