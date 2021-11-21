import React, { Component } from "react";
import Header from '../Header/Header';
import './cal.css'; 
import { Button } from 'semantic-ui-react'

class Caloriecounter extends Component {

  state = {
    wval: '',
    hval: '',
    res: '',
    bmi: 0,
    gender: '',
    age: '',
    activity: '',
    totalCalories: 0,
    errorMessage: ''
  }

  render() {

    const weighthandler = (e) => {
      this.setState({ wval: e.target.value })
    }

    const heighthandler = (e) => {
      this.setState({ hval: e.target.value })
    }

    const agehandler = (e) => {
      this.setState({ age: e.target.value })
    }

    const activityhandler = (e) => {
      this.setState({ activity: e.target.value })
    }

    const genHandler = (e) => {
      this.setState({ gender: e.target.id })
    }

    const reshandler = (e) => {
      e.preventDefault()
      if (this.state.age === '' || this.state.wval === '' || this.state.hval === '' || this.state.age === '') {
        this.setState({ errorMessage: 'Please make sure the values you entered are correct' })
      }
      else if (this.state.gender === 'men' && this.state.activity === "1") {
        this.setState({ totalCalories: 1.2 * (66.5 + (13.75 * parseFloat(this.state.wval)) + (5.003 * parseFloat(this.state.hval)) - (6.755 * parseFloat(this.state.age))) })

      } else if (this.state.gender === 'men' && this.state.activity === "2") {
        this.setState({ totalCalories: 1.375 * (66.5 + (13.75 * parseFloat(this.state.wval)) + (5.003 * parseFloat(this.state.hval)) - (6.755 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'men' && this.state.activity === "3") {
        this.setState({ totalCalories: 1.55 * (66.5 + (13.75 * parseFloat(this.state.wval)) + (5.003 * parseFloat(this.state.hval)) - (6.755 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'men' && this.state.activity === "4") {
        this.setState({ totalCalories: 1.725 * (66.5 + (13.75 * parseFloat(this.state.wval)) + (5.003 * parseFloat(this.state.hval)) - (6.755 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'men' && this.state.activity === "5") {
        this.setState({ totalCalories: 1.9 * (66.5 + (13.75 * parseFloat(this.state.wval)) + (5.003 * parseFloat(this.state.hval)) - (6.755 * parseFloat(this.state.age))) })

      } else if (this.state.gender === 'women' && this.state.activity === "1") {
        this.setState({ totalCalories: 1.2 * (655 + (9.563 * parseFloat(this.state.wval)) + (1.850 * parseFloat(this.state.hval)) - (4.676 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'women' && this.state.activity === "2") {
        this.setState({ totalCalories: 1.375 * (655 + (9.563 * parseFloat(this.state.wval)) + (1.850 * parseFloat(this.state.hval)) - (4.676 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'women' && this.state.activity === "3") {
        this.setState({ totalCalories: 1.55 * (655 + (9.563 * parseFloat(this.state.wval)) + (1.850 * parseFloat(this.state.hval)) - (4.676 * parseFloat(this.state.age))) });
      } else if (this.state.gender === 'women' && this.state.activity === "4") {
        this.setState({ totalCalories: 1.725 * (655 + (9.563 * parseFloat(this.state.wval)) + (1.850 * parseFloat(this.state.hval)) - (4.676 * parseFloat(this.state.age))) });
      } else {
        this.setState({ totalCalories: 1.9 * (655 + (9.563 * parseFloat(this.state.wval)) + (1.850 * parseFloat(this.state.hval)) - (4.676 * parseFloat(this.state.age))) });
      }

    }



    return (
      <div class="com">
        <Header />
        <div class="calorie">
          <h1 class="heading">Calorie Predictor</h1>
          <div class="con">
            <div class="con1">
              <p >Age</p>
              <input class="ip" type="text" id="age" onChange={(e) => agehandler(e)} value={this.state.age}></input>
            </div>
            <div class="con1">
              <p >Height (in cm)</p>
              <input class="ip" type="text" id="height" onChange={(e) => weighthandler(e)} value={this.state.wval}></input>
            </div >
            <div class="con1">
              <p >Weight (in kg)</p>
              <input class="ip" type="text" id="weight" onChange={(e) => heighthandler(e)} value={this.state.hval}></input>
            </div>
          </div>
          <div class="con">
            <label class="content">Gender</label>
            <input class="radio" type="radio" id='men' name="gender" value="Male" onChange={(e) => genHandler(e)}></input>
            <label class="content" for="men">Male</label><br></br>
            <input class="radio" type="radio" id='women' name="gender" value="Female" onChange={(e) => genHandler(e)}></input>
            <label class="content" for="women">Female</label><br></br>
          </div>
          {/* <legend class="content" >Activity</legend> */}
          <strong>Select Activity</strong>
          <select id="list" onChange={(e) => activityhandler(e)}>
            <option selected value="1">Sedentary (little or no exercise)</option>
            <option value="2">Lightly active (light exercise/sports 1-3 days/week)</option>
            <option value="3">Moderately active (moderate exercise/sports 3-5 days/week)</option>
            <option value="4">Very active (hard exercise/sports 6-7 days a week)</option>
            <option value="5">Extra active (very hard exercise/sports & physical job or 2x training)</option>
          </select>
          <br/>
          <Button id="btn" onClick={(e) => reshandler(e)}>Calculate</Button>
          {/* <button >Calculate</button> */}
          <div class='error last'>{this.state.errorMessage}</div>
          <div class="last">You may intake {this.state.totalCalories.toFixed(2)} Calories per day</div>
        </div>
      </div>

    )
  }
}
export default Caloriecounter