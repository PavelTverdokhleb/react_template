import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {
    TextField
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import {signUp} from '../../../actions/userActions';


class SignUp extends Component {
    state={
        error: null,
        loader: false
    };
    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        let {signUp} = this.props;
        this.props.main.error=[];
        let obj = {
            confirm_password: data.confirm_password,
            phone: data.phone.indexOf('+') === 0 ? data.phone : '+'+data.phone,
            email: data.email,
            password: data.password,
            name: data.name
        };
        signUp(obj).then((res)=>{
            this.setState({
                loader: false
            });
              if(res.payload && res.payload.status == 200 || res.payload && res.payload.status == 201){
                  this.context.router.history.push('/authentication/activation');
              }
        })
    };
    componentWillUnmount(){
        this.props.main.error=[];
    }
    getError=(error)=>{
        let message = [];
        for (let key in error) {
            message.push(error[key]);
        }
        return(
            message.map((el, i)=>{
                return (
                    <p key={i}>{el}</p>
                )
            })
        )
    };
    render(){
        const { handleSubmit, submitting, main:{error}} = this.props;
        const { loader } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="sign-up-block">
                        <div className="authentication__box">
                            <div className="inner__block">
                                <form onSubmit={handleSubmit((data)=>{this.SubmitForm(data)})}>
                                    <div className="form-wrapper">
                                        <h2 className="auth-header">Create a new account</h2>
                                        <div className="inner-div_text">
                                            <Field name="name"  className="phone-input" component={TextField} placeholder="First name and last name" autoComplete='off'/>
                                        </div>
                                        <div className="inner-div_text">
                                            <Field name="phone"  className="phone-input" type="text" component={TextField} placeholder="Phone" autoComplete='off'/>
                                        </div>
                                        <div className="inner-div_text">
                                            <Field name="email"  className="phone-input" component={TextField} placeholder="Email" autoComplete='off'/>
                                        </div>
                                        <div className="inner-div_text">
                                            <Field name="password" type="password" className="phone-input" component={TextField} placeholder="Password" autoComplete='off'/>
                                        </div>
                                        <div className="inner-div_text">
                                            <Field name="confirm_password" type="password" className="phone-input" component={TextField} placeholder="Confirm password" autoComplete='off'/>
                                        </div>
                                        {!loader ?
                                            <RaisedButton type='submit' className={'btn btn_sign_in'} labelStyle={{height: '40px'}} label="Create" disabled={submitting}/>
                                            :
                                            <div className="btn_loader"><img src="../../../../assets/img/loader.svg" alt="loader"/></div>
                                        }
                                    </div>
                                </form>
                                <div className="global-error">{error.length !=0 ? this.getError(error) : ''}</div>
                            </div>
                        </div>
                        <Link to="/authentication" className="option-link">I already have an account</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    } else if (values.name.length < 2) {
        errors.name = 'The field must be less than 2 characters'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Enter an email'
    }
    if (!values.phone) {
        errors.phone = 'Required'
    } else if (!/^((8|\+7|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,13}$/.test(values.phone)) {
        errors.phone = 'Enter phone number'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'The field can not be less than 8 characters'
    }
    if (!values.confirm_password) {
        errors.confirm_password = 'Confirm password'
    } else if (values.confirm_password.length < 8) {
        errors.confirm_password = 'The field can not be less than 8 characters'
    } else if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Passwords do not match'
    }
    return errors
};

SignUp.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};
SignUp = reduxForm({
    form: 'SignUp',
    enableReinitialize: true,
    validate
})(SignUp);

function mapStateToProps(state, props) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        signUp
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);