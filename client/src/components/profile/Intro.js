import React, { Component } from 'react';
import {  BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

const Intro = (props) => {
    return (
        <div className='profile-form'>
            <div className='profile-segment'>
                <h1>About the Peace Letter Program</h1>
                <p>We Make Peace offers a Peace Letter exchange program for students between age 10-12 years. This is an exciting chance for students to befriend a student from another country through letter exchanges.</p>

                <p>It is our aim to promote friendships across borders, enhance literacy and acceptance of diversity, to activate empathy and increase awareness of peace as a strong ideal for young people to aspire to.</p>

                <p>Over the years we have developed this program where students from different countries write letters with each other. Each student shares life experiences, art and learn from another student through three letters, all in the name of promoting friendship and non-violent communication. The Peace Letter program provides the participating students with a platform where they can express themselves freely while also learning about the life of a student from a different culture.</p>
            </div>
        </div>
    )

}

export default Intro;
