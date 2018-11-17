import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';


class Users extends Component {
    render(){
        const { handleSubmit, submitting } = this.props;
        return (
            <div>
                Users
            </div>
        );
    }
}

Users.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

Users = reduxForm({
    form: 'Record',
    enableReinitialize: true,
    //validate
})(Users);

function mapStateToProps(state, props) {
    return{
        //name: state.name,
        //initialValues: {
        //    name_wallet:  props.match.params.id && state.main.wallet_one.name || '',
        //    address_wallet:  props.match.params.id && state.main.wallet_one.address || ''
        //}
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        //login
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);