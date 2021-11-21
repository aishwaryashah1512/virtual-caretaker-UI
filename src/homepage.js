import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from './Header/Header';
import { Button } from 'semantic-ui-react';
import doctors from './images/doctors.jpg';
import './homepage.css';
class Homepage extends Component {
    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className='home'>
                    {/* <h1><strong>VIRTUAL CARETAKER</strong></h1> */}
                    <div className="image">
                        <img src={doctors} />
                    </div>
                    <div className="rowele">
                        <button className="ui semantic primary button">
                            <Link to="/bmi">
                               <p className="font">BMI Calculator</p>
                            </Link>
                        </button>
                        <button className="ui semantic primary button">
                            <Link to="/cal">
                            <p className="font">Calorie Predictor</p>
                            </Link>
                        </button>
                        <button className="ui semantic primary button">
                            <Link to="/mainpage">
                            <p className="font">Blood Pressure and Sugar Levels</p>
                            </Link>
                        </button>

                    </div>
                    {/* <div className="rowele">
                        <div className="btn">
                            <Link to='/bmi'>
                                <p className="button">BMI Calculator</p>
                                <Button as="div" color="blue">BMI Calculator</Button>
                            </Link>
                        </div>

                        <div className="btn">
                            <Link to='/cal'>
                                <Button color="blue">Calorie Predictor</Button>
                            </Link>
                        </div>

                        <div className="btn">
                            <Link to='/mainpage'>
                                <Button as="div" color="blue">Mainpage</Button>
                            </Link>
                        </div>

                    </div> */}
                </div>
            </div>

        )
    }
}
export default Homepage