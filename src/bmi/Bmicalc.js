import React, { Component } from "react";
import Button from '@material-ui/core/Button'
import './bmi.css';
import Aimlogo from '../images/AimLogo.gif';
import Header from '../Header/Header';
import axios from "axios";
import qs from 'qs';
import { connect } from "react-redux";

class BMICalculater extends Component {
    state = {
        wval: '',
        hval: '',
        res: '',
        bmi: 0,
        errorMessage: ''
    }
    render() {
        
        const heighthandler = (e) => {
            this.setState({ hval: e.target.value })
        }

        const weighthandler = (e) => {
            this.setState({ wval: e.target.value })
        }
        const reshandler = (event) => {
            event.preventDefault();
            if (this.state.hval == '' || this.state.wval == '') {
                this.setState({ errorMessage: 'Please make sure the values you entered are correct' })
            }
            else {
                let bmi = (this.state.wval*10000 / (this.state.hval * this.state.hval)).toFixed(2);
                this.setState({ bmi: bmi },()=>{
                    axios({method:'POST',url:'https://guarded-thicket-72736.herokuapp.com/api/bmi',
                  data:qs.stringify({
                       username:this.props.username,
                       height:this.state.hval,
                       weight:this.state.wval,
                       bmi:this.state.bmi
                  }) 
                })
                })
            }
        }
        let answer = ''
        let result = ''
        if (this.state.bmi > 0) {
            if (this.state.bmi < 18.6) {
                result = 'You are Underweight'
            }

            else if (this.state.bmi >= 18.6 && this.state.bmi < 24.9) {
                result = 'You are Healthy'
            }

            else {
                result = 'You are Overweight'
            }
            answer = (<div id="result">{result} : <span>{this.state.bmi}</span></div>)
        }
        return (
            <div>
                <Header />
                <div class="container">

                    <div class="content content1">
                        Body mass index (BMI) is a value derived from the mass (weight) and height of a person.
                        <br />
                        <h2>What is BMI?</h2>
                        BMI Categories: <br />
                        Underweight : Less than 18.5 <br />
                        Normal weight : 18.5–24.9 <br />
                        Overweight : 25–29.9 <br />
                        Obesity : BMI of 30 or greater <br />
                    </div>
                    <img src={Aimlogo} height="100px" />
                    <div class="content2">
                        <h1 class="heading">BMI Calculator</h1>
                        <strong>Enter your height and weight using standard measures</strong><br />
                        <p class="content">Height (in cm)
                            <input class="ip" type="text" id="height" onChange={(e) =>heighthandler(e)} value={this.state.hval}></input>
                        </p>
                        <p class="content">Weight (in kg)
                            <input class="ip" type="text" id="weight" onChange={(e) => weighthandler(e)} value={this.state.wval}></input>
                        </p>
                        <br />
                        {/* <button id="btn" onClick={(e)=>reshandler(e)}>Calculate</button> */}
                        <div id="btn">
                            <Button variant="contained" onClick={(e) => reshandler(e)}>Calculate</Button>
                        </div>
                        {answer}
                        <div className='error'>{this.state.errorMessage}</div>
                    </div>

                </div>
            </div>

        )
    }
}
const mapStateToProps=state=>{
    return{
        username:state.username
}
}
export default connect(mapStateToProps)(BMICalculater)