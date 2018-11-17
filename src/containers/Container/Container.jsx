import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Users from '../../components/Users/Users'
import Header from '../../components/Header/Header'


class Container extends Component {
    constructor(props) {
        super(props);
        const { match } = this.props;
        this.baseUrl = match.url[match.url.length - 1] == '/' ? match.url : match.url + '/';
    }
    render(){
        const { match } = this.props;
        return (
            <div>
                {/*{!sessionStorage.token ? <Redirect to={'/authentication'}/> : null}*/}
                <Header/>
                <Switch>
                    <Route
                        path={this.baseUrl}
                        exact
                        component={Users}
                    />
                    {/*<Route path={`${match.url}/profile`} component={OwnerProfile}/>*/}
                </Switch>
            </div>
        );
    }
}

Container.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired,
    }),
};

Container = reduxForm({
    form: 'Record',
    enableReinitialize: true,
    //validate
})(Container);

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

export default connect(mapStateToProps, mapDispatchToProps)(Container);