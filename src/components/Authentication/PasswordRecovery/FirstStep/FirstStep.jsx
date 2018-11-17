import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router-dom';
import {
    TextField
} from 'redux-form-material-ui';
import {
    passwordRecoveryFirst
} from '../../../../actions/userActions';

class FirstStep extends Component {
    state={
        loader: false
    };
    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        let {passwordRecoveryFirst} = this.props;
        this.props.main.error=[];
        let obj = {
            phone: data.phone.indexOf('+') === 0 ? data.phone : '+'+data.phone
        };
        passwordRecoveryFirst(obj).then((res)=>{
            this.setState({
                loader: false
            });
            if(res.payload && res.payload.status == 200 || res.payload && res.payload.status == 201){
                this.context.router.history.push('/authentication/password-recovery/second-step');
            }
        });
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
                                        <h2 className="auth-header">Password recovery</h2>
                                        <div className="inner-div_text">
                                            <Field name="phone"  className="phone-input" type="number" component={TextField} placeholder="Phone" autoComplete='off'/>
                                        </div>
                                        {!loader ?
                                            <RaisedButton type='submit' className={'btn btn_sign_in'}
                                                          labelStyle={{height: '40px'}} label="Recover"
                                                          disabled={submitting}/>
                                            :
                                            <div className="btn_loader"><img src="../../../assets/img/loader.svg" alt="loader"/></div>
                                        }
                                    </div>
                                </form>
                                <div className="global-error">{error.length !=0 ? this.getError(error) : ''}</div>
                            </div>
                        </div>
                        <Link to="/authentication" className="option-link">Sign in</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.phone) {
        errors.phone = 'Required'
    } else if (!/^((8|\+7|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,13}$/.test(values.phone)) {
        errors.phone = 'Enter phone number'
    }
    return errors
};

FirstStep.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};
FirstStep = reduxForm({
    form: 'FirstStep',
    enableReinitialize: true,
    validate
})(FirstStep);

function mapStateToProps(state, props) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        passwordRecoveryFirst
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep);