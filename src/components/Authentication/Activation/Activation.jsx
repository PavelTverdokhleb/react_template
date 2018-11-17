import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
    activation
} from '../../../actions/userActions';
import {
    TextField
} from 'redux-form-material-ui'
import {reset} from 'redux-form';

class Activation extends Component {
    state={
        loader: false
    };
    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        const {activation} = this.props;
        activation(data).then((res)=>{
            this.setState({
                loader: false
            });
              if(res.payload && res.payload.status == 200 || res.payload && res.payload.status == 201){
                  this.context.router.history.push('/authentication');
              }
        });
    };

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
        const { handleSubmit, submitting, main:{error} } = this.props;
        const { loader } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="sign-up-block">
                        <div className="authentication__box">
                            <div className="inner__block">
                                <form onSubmit={handleSubmit((data)=>{this.SubmitForm(data)})}>
                                    <div className="form-wrapper">
                                        <h2 className="auth-header">Activate account <br/><span className="auth-header-span">You have received an SMS with an activation code</span></h2>
                                        <div className="inner-div_text">
                                            <Field name="activate_code" type="text" component={TextField} placeholder="SMS code" autoComplete='off'/>
                                        </div>
                                        {!loader ?
                                            <RaisedButton type='submit' className={'btn btn_sign_in'} labelStyle={{height: '40px'}} label="Activate" disabled={submitting}/>
                                            :
                                            <div className="btn_loader"><img src="../../../assets/img/loader.svg" alt="loader"/></div>
                                        }
                                        <div className="global-error">{error.length !=0 ? this.getError(error) : ''}</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="bottom-nav">
                            <p className="center">
                                <span className="gray">Did not receive SMS? </span><span className="like-btn">Send again</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.activate_code) {
        errors.activate_code = 'Required'
    }
    return errors
};

Activation.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

Activation = reduxForm({
    form: 'Activation',
    validate
})(Activation);

function mapStateToProps(state) {
    return{
        main: state.main
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        activation
    }, dispatch);
}

export default  connect(mapStateToProps, mapDispatchToProps)(Activation);