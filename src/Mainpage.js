import React, { Component } from "react";
import './Mainpage.css';
import { Button } from 'semantic-ui-react';
import Header from './Header/Header';
import hospitaldata from './data/hospitals';
import qs from 'qs'
import { connect } from "react-redux";
import axios from "axios";
import diet from './data/diet'
import BackDrop from './Modal';

class Mainpage extends Component {
   state = {
      age: 0,
      gender: 'not selected',
      sbp: 0,
      sugar: 0,
      dbp: 0,
      bpresult: '',
      sugarresult: '',
      preg: false,
      bloodSugarType: '1',
      userlatitude: '',
      userlongitude: '',
      hosplist: [],
      bpabnormality: false,
      sugarabnormality: false,
      diet_Reccomendations: []
   }

   render() {

      const agehandler = (e) => {
         if (e.target.value === '') {
            e.target.value = 0
         }
         this.setState({ age: parseInt(e.target.value) }, () => { })
      }

      const genHandler = (e) => {
         this.setState({ gender: e.target.id }, () => {})
      }

      const sbpHandler = (e) => {
         if (e.target.value === '') {
            e.target.value = 0
         }
         this.setState({ sbp: parseInt(e.target.value) })
      }

      const dbpHandler = (e) => {
         if (e.target.value === '') {
            e.target.value = 0
         }
         this.setState({ dbp: parseInt(e.target.value) }, () => {  })
      }

      const sugarHandler = (e) => {
         if (e.target.value === '') {
            e.target.value = 0
         }
         this.setState({ sugar: parseInt(e.target.value) }, () => {  })
      }

      const pregHandler = (e) => {
         this.setState({ preg: !this.state.preg })
      }

      const sugartypeHandler = (e) => {
         this.setState({ bloodSugarType: e.target.value })
      }


      let pregnancydetails = ''
      if (this.state.gender === 'women' && this.state.age >= 13) {
         pregnancydetails = (
            <div>Are you Pregnant
               <input type='checkbox' onChange={(e) => pregHandler(e)}></input>
            </div>)
      }

      let bpans = false
      let sugarans = false

      const diagnoseBPHandler = (e) => {
         e.preventDefault();
         if (this.state.sbp === 0 && this.state.dbp === 0) {
            this.setState({ bpresult: 'Please enter your diastolic Blood Pressure readings and systolic Blood Pressure' })
         }
         else if (this.state.sbp !== 0 && this.state.dbp === 0) {
            this.setState({ bpresult: 'Please enter your diastolic Blood Pressure readings' })

         }
         else if (this.state.sbp === 0 && this.state.dbp !== 0) {
            this.setState({ bpresult: 'Please enter your systolic Blood Pressure readings' })
         }
         else {
            let bpreport
            const sys = this.state.sbp;
            const dia = this.state.dbp;
            if (sys !== 0 && dia !== 0) {
               if (sys < 90 && dia < 60) {
                  bpreport = 'Your blood Pressure is low'
                  bpans = true
               }
               else if (sys < 120 && dia < 80) {
                  bpreport = 'You are perfectly Healthy'
                  bpans = false
               }
               else if (sys >= 120 && sys <= 129 && dia < 80) {
                  bpreport = 'Your blood Pressure is slighlty Elevated and needs care'
                  bpans = true
               }
               else if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) {
                  bpreport = 'Your blood Pressure is high.You are at Stage 1 Hypertension'
                  bpans = true
               }
               else if (sys >= 140 || dia >= 90) {
                  bpreport = 'Your blood Pressure is high.You are at Stage 2 Hypertension'
                  bpans = true
               }
               else {
                  bpreport = 'Your have Hypertensive crisis and requires immediate medical care'
                  bpans = true
               }
            }
            this.setState({ bpresult: bpreport, bpabnormality: bpans }, () => {
               axios({
                  method: 'post',
                  url: 'https://guarded-thicket-72736.herokuapp.com/api/bpresult',
                  data: qs.stringify({
                     username: this.props.username,
                     diastolic: this.state.dbp,
                     systolic: this.state.sbp,
                     bpresult: this.state.bpresult
                  })
               }).then(response => { }).catch(error => { })
            })
         }
      }

      const diagnoseSugarHandler = (e) => {
         e.preventDefault()
         let error = ''
         if (this.state.age === 0 || this.state.gender === 'not selected' || this.state.sugar === 0) {

            if (this.state.age === 0) {
               error = "Please enter your age. "
            }
            if (this.state.gender === 'not selected') {
               error += "Please select appropriate gender option. "
            }
            if (this.state.sugar === 0) {
               error += "Please add blood glucose level readings. "
            }
            this.setState({ sugarresult: error })
         }
         else {

            let report = ''
            if (this.state.preg && this.state.age >= 13) {
               if (this.state.bloodSugarType === '1') {
                  if (this.state.sugar > 70 && this.state.sugar < 89) {
                     report = "Your sugar levels are normal"
                     sugarans = false
                  }
                  else if (this.state.sugar <= 70) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar >= 89) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

               if (this.state.bloodSugarType === '2') {
                  if (this.state.sugar === 89) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 89) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 89) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

               if (this.state.bloodSugarType === '3') {
                  if (this.state.sugar < 120) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }

                  else if (this.state.sugar >= 120) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

               if (this.state.bloodSugarType === '4') {
                  if (this.state.sugar >= 100 && this.state.sugar <= 140) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 100) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 140) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
            }
            else if (this.state.age === 6) {
               if (this.state.bloodSugarType === '1') {
                  if (this.state.sugar > 80 && this.state.sugar <= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar <= 80) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '2') {
                  if (this.state.sugar >= 100 && this.state.sugar <= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 100) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '3') {
                  if (this.state.sugar >= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 180) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '4') {
                  if (this.state.sugar >= 110 && this.state.sugar <= 200) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 110) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 200) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

            }

            else if (this.state.age > 6 && this.state.age <= 12) {
               if (this.state.bloodSugarType === '1') {
                  if (this.state.sugar > 80 && this.state.sugar <= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar <= 80) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

               if (this.state.bloodSugarType === '2') {
                  if (this.state.sugar >= 90 && this.state.sugar <= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 90) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '3') {
                  if (this.state.sugar <= 140) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar > 140) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '4') {
                  if (this.state.sugar >= 100 && this.state.sugar <= 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 100) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
            }
            else if (this.state.age >= 13 && this.state.age <= 19) {
               if (this.state.bloodSugarType === '1') {

                  if (this.state.sugar > 70 && this.state.sugar <= 150) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar <= 70) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 150) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '2') {
                  if (this.state.sugar >= 90 && this.state.sugar <= 130) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 90) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 130) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '3') {
                  if (this.state.sugar >= 140) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }

                  else if (this.state.sugar > 140) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '4') {
                  if (this.state.sugar >= 90 && this.state.sugar <= 150) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 90) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 150) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }

            }


            else if (this.state.age >= 20) {
               if (this.state.bloodSugarType === '1') {
                  if (this.state.sugar >= 70 && this.state.sugar <= 110) {

                     report = 'Your sugar levels are normal'
                     sugarans = false

                  }
                  else if (this.state.sugar < 70) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 110) {
                     report = 'You are hyperglycemic'
                     sugarans = true

                  }
               }
               if (this.state.bloodSugarType === '2') {
                  if (this.state.sugar >= 70 && this.state.sugar <= 130) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 70) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 130) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '3') {
                  if (this.state.sugar < 180) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }

                  else if (this.state.sugar > 180) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
               if (this.state.bloodSugarType === '4') {
                  if (this.state.sugar >= 100 && this.state.sugar <= 140) {
                     report = 'Your sugar levels are normal'
                     sugarans = false
                  }
                  else if (this.state.sugar < 100) {
                     report = 'You are hypoglycemic'
                     sugarans = true
                  }
                  else if (this.state.sugar > 140) {
                     report = 'You are hyperglycemic'
                     sugarans = true
                  }
               }
            }
            this.setState({ sugarresult: report, sugarabnormality: sugarans }, () => {
               axios({
                  method: 'post',
                  url: 'https://guarded-thicket-72736.herokuapp.com/api/sugarresult',
                  data: qs.stringify({
                     username: this.props.username,
                     bloodsugar: this.state.sugar,
                     sugarresult: this.state.sugarresult,
                     age: this.state.age,
                     gender: this.state.gender,
                  })
               })
            }
            )
         }
      }
      let dietlist = []
      const diethandler = () => {
         if (this.state.sugarabnormality && this.state.sugarresult === 'You are hyperglycemic') {
            dietlist.push(diet[0].hyperglycemia)
         }
         if (this.state.sugarabnormality && this.state.sugarresult === 'You are hypoglycemic') {
            dietlist.push(diet[1].hyperglycemia)
         }
         if (this.state.bpabnormality && this.state.bpresult !== 'You are perfectly Healthy' && this.state.bpresult !== 'Your blood Pressure is low') {
            dietlist.push(diet[3].hyperbp)
         }
         if (this.state.bpabnormality && this.state.bpresult === 'Your blood Pressure is low') {
            dietlist.push(diet[2].hypobp)
         }

         this.setState({ diet_Reccomendations: dietlist }, () => {  })
      }


      let dietReccomendations = null
      dietReccomendations = this.state.diet_Reccomendations.map((i, ind) => {
         return (
            <p key={ind}>{i}</p>
         )
      })

      const distance = (lat1, lon1, lat2, lon2, unit) => {
         var radlat1 = Math.PI * lat1 / 180
         var radlat2 = Math.PI * lat2 / 180
         var theta = lon1 - lon2
         var radtheta = Math.PI * theta / 180
         var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
         if (dist > 1) {
            dist = 1;
         }
         dist = Math.acos(dist)
         dist = dist * 180 / Math.PI
         dist = dist * 60 * 1.1515
         if (unit === "K") { dist = dist * 1.609344 }
         return dist * 1609.344
      }

      let hospitalbuttonbp = null
      let hospitalbuttonsu = null
      
      if (this.state.bpabnormality ) {
         // hospitalbutton = <Button color="blue" className="btn" onClick={(e) => hospitalhandler(e)}>Hospitals near me</Button>
         hospitalbuttonbp = <Button color="blue" className="btn" onClick={(e) => hospitalhandler(e)}>
            <BackDrop name="hospitals" hosp={this.state.hosplist} />
         </Button>
      }
      if (this.state.sugarabnormality ) {
         // hospitalbutton = <Button color="blue" className="btn" onClick={(e) => hospitalhandler(e)}>Hospitals near me</Button>
         hospitalbuttonsu = <Button color="blue" className="btn" onClick={(e) => hospitalhandler(e)}>
            <BackDrop name="hospitals" hosp={this.state.hosplist} />
         </Button>
      }
      let dietbuttonbp = null
      let dietbuttonsu = null
      if (this.state.bpabnormality ) {
         dietbuttonbp = <Button color="blue" className="btn" onClick={(e) => diethandler(e)}>
            <BackDrop diet={dietReccomendations} name="diet" />
         </Button>
      }
      if (this.state.sugarabnormality ) {
         dietbuttonsu = <Button color="blue" className="btn" onClick={(e) => diethandler(e)}>
            <BackDrop diet={dietReccomendations} name="diet" />
         </Button>
      }

      let hosp = []
      const hospitalhandler = (e) => {
         e.preventDefault()
         navigator.geolocation.getCurrentPosition(position => {
            this.setState({ userlatitude: position.coords.latitude, userlongitude: position.coords.longitude },
               () => {
                  for (var i = 0; i < hospitaldata.length; i++) {
                     let x = distance(this.state.userlatitude, this.state.userlongitude, hospitaldata[i].lat, hospitaldata[i].long)
                     if (x <= 5000) {
                        hosp.push(hospitaldata[i])
                     }
                  }
                  this.setState({ hosplist: hosp }, () => {
                  })
               })
         })
      }
     /* let hospitallist = null
      if (this.state.hosplist !== []) {
         hospitallist = this.state.hosplist.map((i, ind) => { return (<div><li key={ind}>{i.name}</li></div>) })
         hospitallist = <BackDrop hosp={this.state.hosplist} />
      }*/

      return (
         <div className="main">
            <div>
               <Header />
            </div>
            <h1><strong> <u>  Check your health  </u> </strong> </h1>
            <div className="co">
               <strong>
                  <p>Blood Pressure</p>
                  <br />
               </strong>


               <p>Systolic(Top) Blood Pressure</p>
               <input type="text" id="bp" onChange={(e) => sbpHandler(e)} placeholder={this.state.sbp}></input>
               <p>Diastolic(Bottom) Blood Pressure</p>
               <input type="text" id="bp" onChange={(e) => dbpHandler(e)} placeholder={this.state.dbp}></input>
               
               <div>
                  <p>{this.state.bpresult}</p>
               </div>
               <Button color="blue" className="btn" onClick={(e) => diagnoseBPHandler(e)}>Diagnose</Button>
               {hospitalbuttonbp}
               {dietbuttonbp}
            </div>
            <div className="co">
               <p> <strong>Sugar</strong> </p>
               <p className="top1">
                  <p className="top">Age
                     <input type="text" required id="age" onChange={(e) => agehandler(e)} placeholder={this.state.age}></input>
                  </p>
                  {/* </p> */}
                  {/* <p className="top1"> */}
                  <p className="gender">
                     Gender
                     <input className="radio" type="radio" required id='men' name="gender" value="Male" onChange={(e) => genHandler(e)}></input>
                     <label for="men">Male</label>
                     <input className="radio" type="radio" id='women' required name="gender" value="Female" onChange={(e) => genHandler(e)}></input>
                     <label for="women">Female</label><br></br>
                  </p>
               </p>
               <div className="prega">
                  {pregnancydetails}
               </div>
               <input type="text" id="bp" onChange={(e) => sugarHandler(e)} placeholder={this.state.sugar}></input>
               {/* <legend></legend> */}
               <p>Please select appropriate option from the dropdown list</p>
               <div>
                  <select id="list" onChange={(e) => sugartypeHandler(e)}>
                     <option selected value='1'>Blood Sugar levels after Fasting</option>
                     <option value='2'>Blood Sugar Levels Before Meal</option>
                     <option value='3'>Blood Sugar Levels After 1 to 2 Hours of Eating</option>
                     <option value='4'>Blood Sugar Levels at Bedtime</option>
                  </select>
               </div>
               <p>{this.state.sugarresult}</p>
               <Button color="blue" className="btn" onClick={(e) => diagnoseSugarHandler(e)}>Diagnose</Button>
               {/* {dietReccomendations} */}
               {hospitalbuttonsu}
               {dietbuttonsu}
            </div>
            <br />
            <br />
         </div>
      )
   }
}
const mapStateToProps = state => {
   return {
      username: state.username
   }
}
export default connect(mapStateToProps)(Mainpage)