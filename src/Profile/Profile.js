import React, { Component } from "react";
import "./Profile.css";
import Header from '../Header/Header';
import dummy from '../images/dummy.jpg';
import axios from "axios";
import qs from 'qs'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

class Profile extends Component {
    state = {
        username: '',
        age: '',
        gender: '',
        sys: "",
        dia: '',
        sugar: '',
        bmi: '',
        calorie: '',
        sugarresult: '',
        bpresult: '',
        height:'',
        weight:''
    }
    componentDidMount=()=>{
        axios({method:'post',
        url:'https://guarded-thicket-72736.herokuapp.com/api/getprofile',
        data:qs.stringify({
            username:this.props.username
        })
    }).then(response=>{
            response=response.data
           
            let a='',g='',s='',d='',sug='',bm='',sr='',br='',h='',w='';
            if(response.age){
                a=response.age
            }
            if (response.gender) {
                g = response.gender
            }
            if (response.bloodsugar) {
                sug = response.bloodsugar
            }
            if (response.diastolic) {
                d = response.diastolic
            }
            if (response.systolic) {
                s = response.systolic
            }
            if (response.bmi) {
                bm = response.bmi
            }
            if (response.sugarresult) {
                sr = response.sugarresult
            }
            if (response.bpresult) {
                br = response.bpresult
            }
            if(response.weight){
                w=response.weight
            }
            if(response.height){
                h=response.height
            }
            this.setState({
                username:response.username,
                age:a,
                gender:g,
                sys:s,
                dia:d,
                sugar:sug,
                bmi:bm,
                sugarresult:sr,
                bpresult:br,
                weight:w,
                height:h
            })
        })
    }
    
    render() {

        if (this.state.username == '') {
            return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className='container'>
                        <div className='row1'>
                            <div>
                                <img className="picture" src={dummy} />
                            </div>
                            <div> {this.state.username} </div>
                            <div className="information">
                                <div className="info">
                                    <div className="label">Age  </div>
                                    <input disabled placeholder={this.state.age}></input>
                        
                                </div>

                                <div className="info">
                                    <div className="label">Gender    </div>
                                    <input disabled placeholder={this.state.gender}></input>
                                </div>

                                <div className="info">
                                    <div className="label">BMI   </div>
                                    <input disabled placeholder={this.state.bmi}></input>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <div className="error1">Not logged in.Please sign in/up before</div>
                            <Link to="/"><button className="ui primary semantic button"> Login </button></Link>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        <Header />
                    </div>
                    <div className='container'>
                        <div className='row1'>
                            <div>
                                <img className="picture" src={dummy} />
                            </div>
                            <div> {this.state.username} </div>
                            <div className="information">
                                <div className="info">
                                    <div className="label">Age  </div>
                                    <input disabled placeholder={this.state.age}></input>
                                    
                                   
                                </div>

                                <div className="info">
                                    <div className="label">Gender    </div>
                                    <input disabled placeholder={this.state.gender}></input>
                                </div>

                                <div className="info">
                                    <div className="label">BMI   </div>
                                    <input disabled placeholder={this.state.bmi}></input>
                                </div>
                            </div>
                        </div>
                        <div className='row2'>
                            <h1><strong>Your Previous Report</strong></h1>
                            <div className="information">
                                <div className="information1">
                                    <p><strong>UserName : </strong>{this.state.username}</p>

                                    <p><strong>Age : </strong>{this.state.age}</p>
                                    <p><strong>Height (cm) </strong>{this.state.height}</p>
                                    <p><strong>Weight (kg) </strong>{this.state.weight}</p>
                                    
                                    <p> <strong>Blood Pressure </strong> </p>
                                    <p> Diastolic bp :{this.state.dia}</p>
                                    <p>Systolic bp : {this.state.sys}</p>
                                    <p><strong>Blood Pressure Result: </strong>{this.state.bpresult}</p>
                                    <p><strong>Sugar</strong></p>
                                    <p> Sugar level : {this.state.sugar}</p>
                                    <p><strong>Sugar Result  : </strong>{this.state.sugarresult}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}

const mapStateToProps = state => {
    return {
        username: state.username
    }
}

export default connect(mapStateToProps)(Profile);