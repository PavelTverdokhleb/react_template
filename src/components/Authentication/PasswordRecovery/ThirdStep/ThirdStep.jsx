import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {
    TextField
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import {
    passwordRecoveryThird
} from '../../../../actions/userActions';


class ThirdStep extends Component {
    state={
        loader: false
    };
    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        let {passwordRecoveryThird} = this.props;
        this.props.main.error=[];
        passwordRecoveryThird(data).then((res)=>{
            this.setState({
                loader: false
            });
              if(res.payload && res.payload.status == 200 || res.payload && res.payload.status == 201){
                  sessionStorage.clear();
                  this.context.router.history.push('/authentication');
              }
        })
    };
    componentWillUnmount(){
        sessionStorage.clear();
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
                                        <h2 className="auth-header">Recovery password</h2>
                                        <div className="inner-div_text">
                                            <Field name="password" type="password" className="phone-input" component={TextField} placeholder="Password" autoComplete='off'/>
                                        </div>
                                        <div className="inner-div_text">
                                            <Field name="confirm_password" type="password" className="phone-input" component={TextField} placeholder="Confirm password" autoComplete='off'/>
                                        </div>
                                        {!loader ?
                                            <RaisedButton type='submit' className={'btn btn_sign_in'} labelStyle={{height: '40px'}} label="Save" disabled={submitting}/>
                                            :
                                            <div className="btn_loader"><img src="../../../assets/img/loader.svg" alt="loader"/></div>
                                        }
                                    </div>
                                </form>
                                <div className="global-error">{error.length !=0 ? this.getError(error) : ''}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
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

ThirdStep.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};
ThirdStep = reduxForm({
    form: 'ThirdStep',
    enableReinitialize: true,
    validate
})(ThirdStep);

function mapStateToProps(state, props) {
    return{
        main: state.main,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        passwordRecoveryThird
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep);