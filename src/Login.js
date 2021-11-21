import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs'
// import Spinner from '../../components/UI/Spinner/Spinner';
import Spinner from '@material-ui/core/CircularProgress'
import Input from './Input';
// import Button from '../../components/UI/Button/Button';
import Button from '@material-ui/core/Button';
import classes from './Auth.module.css';
import * as actions from './store/index';
import doctor from './images/doctors.jpg'
import Axios from 'axios';

class Auth extends Component {
    state = {
        error:false,
        isSignUp:true,
        submit:false,
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updatedControls });
    }
 
    render() {

        const switchAuthModeHandler = () => {
            this.setState(prevState => {
                return {
                    isSignUp: !prevState.isSignUp
                }
            })
        }

        const submitHandler = (event) => {
            this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value)
            this.props.history.push('/homepage')
        }
    
        
        const signInHandler = (event) => {
          
            Axios({
                method: 'post', url: 'https://guarded-thicket-72736.herokuapp.com/api/signin', data: qs.stringify({
                    username: this.state.controls.email.value,
                    password: this.state.controls.password.value
                })
            }).then(response => {
                if (response.data === 'Incorrect login credentials,please try again or sign up') {
                    
                    this.setState({ error: true })
                }
                else {
                    this.setState({error:false,submit:true },()=>{                   
            submitHandler();})
                }
            })
        }
        const signUpHandler = () => {
           
            Axios({
                method: 'post', url: 'https://guarded-thicket-72736.herokuapp.com/api/signup', data: qs.stringify({
                    username: this.state.controls.email.value,
                    password: this.state.controls.password.value
                })
            }).then(response => {       
                if(response.data==='Username already Exists'){
                   
                    this.setState({error:true})
                }
                else{
                    submitHandler();
                    this.setState({error:false},()=>{
                      
                    })
                }
            }
            )
        }
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }
        
        let button1 = <Button color="primary" variant="contained" onClick={() => signInHandler()}>SIGN IN</Button>
        if (this.state.isSignUp) {
            button1 = <Button color="primary" variant="contained" onClick={() => signUpHandler()}>SIGN UP</Button>
        }
        return (

            <div className={classes.Appheader}>
                <div>
                <h1 className={classes.content}>VIRTUAL CARETAKER</h1>
                </div>
                <div className={classes.flex}>
                    <div className={classes.Auth}>
                    {this.state.error && !this.state.isSignUp ?<p>Incorrect Credentials, try Again or Sign Up</p> : null}
                    {this.state.error && this.state.isSignUp ?<p>Username already exists</p> : null}
                        <form onSubmit={()=>submitHandler}>
                            {form}
                            {button1}
                        </form>
                        <Button onClick={()=>switchAuthModeHandler()} btnType='Danger'>SWITCH TO {this.state.isSignUp ? ' SIGN-IN' : 'SIGN-UP'}</Button>
                    </div>
                    <div>
                        <img alt=''src={doctor} />
                    </div>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password)=>dispatch(actions.cred_update(email, password))
    };
};

export default connect(null, mapDispatchToProps)(Auth);