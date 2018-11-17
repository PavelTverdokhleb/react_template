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
    passwordRecoverySecond
} from '../../../../actions/userActions';

class SecondStep extends Component {
    state={
        loader: false
    };
    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        let {passwordRecoverySecond} = this.props;
        this.props.main.error=[];
        passwordRecoverySecond(data).then((res)=>{
            this.setState({
                loader: false
            });
              if(res.payload && res.payload.status == 200 || res.payload && res.payload.status == 201){
                  sessionStorage.token_res = res.payload.data.token;
                  this.context.router.history.push('/authentication/password-recovery/third-step');
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
                                        <h2 className="auth-header">Password recovery <br/><span className="auth-header-span">You have sent a text message with a code</span></h2>
                                        <div className="inner-div_text">
                                            <Field name="recovery_code"  className="phone-input" type="number" component={TextField} placeholder="SMS code" autoComplete='off'/>
                                        </div>
                                        {!loader ?
                                            <RaisedButton type='submit' className={'btn btn_sign_in'} labelStyle={{height: '40px'}} label="Recover" disabled={submitting}/>
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
    if (!values.recovery_code) {
        errors.recovery_code = 'Required'
    }
    return errors
};

SecondStep.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};
SecondStep = reduxForm({
    form: 'SecondStep',
    enableReinitialize: true,
    validate
})(SecondStep);

function mapStateToProps(state, props) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        passwordRecoverySecond
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep);