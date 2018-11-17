import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import { postLogin } from '../../../actions/userActions';
import RenderField from '../../HelpersBlocks/RenderField/RenderField';

class SignIn extends Component {
    state={
        loader: false
    };

    componentWillMount() {
        sessionStorage.clear();
    }

    SubmitForm=(data)=>{
        this.setState({
            loader: true
        });
        let obj = {
            phone: data.phone.indexOf('+') === 0 ? data.phone : '+'+data.phone,
            password: data.password
        };
        this.props.postLogin(obj).then((res)=>{
            this.setState({
                loader: false
            });
            if(res.payload && res.payload.status && res.payload.status == 200 || res.payload && res.payload.status && res.payload.status == 201){
                sessionStorage.id = res.payload.data.user_id;
                this.context.router.history.push('/authentication/confirm/');
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
    componentWillUnmount(){
        this.props.user.error = [];
    }
    render(){
        const { handleSubmit, submitting, user:{error} } = this.props;
        const { loader } = this.state;
        return (
            <div>
                <form onSubmit={handleSubmit((data)=>{this.SubmitForm(data)})}>
                    <div className="form-wrapper">
                        <h2 className="auth-header">Sign in</h2>
                        <div className="inner-div_text">
                            <Field name="phone" type="number" component={RenderField} placeholder="Phone" autoComplete='off'/>
                        </div>
                        <div className="inner-div_text">
                            <Field name="password" type="password" component={RenderField} placeholder="Password" autoComplete='off'/>
                        </div>
                        {!loader ?
                            <Button type='submit' variant="contained" color="primary">
                                Sign in
                            </Button>
                            :
                            <div className="btn_loader">
                                <img src="../../../../assets/img/loader.svg" alt=""/>
                            </div>
                        }
                        <div className="global-error">{error.length !=0 ? this.getError(error) : ''}</div>
                    </div>
                </form>
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
    if (!values.phone) {
        errors.phone = 'Required'
    } else if (!/^((8|\+7|\+3)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,13}$/.test(values.phone)) {
        errors.phone = 'Enter phone number'
    }
    return errors
};

SignIn.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

SignIn = reduxForm({
    form: 'SignIn',
    validate
})(SignIn);

function  mapStateToProps(state) {
    return{
        user: state.user,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        postLogin
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);