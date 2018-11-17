import React, {Component} from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import NoMatch from '../NoMatch/NoMatch';
import SignIn from '../../components/Authentication/SignIn/SignIn';
import Confirm from '../../components/Authentication/Confirm/Confirm';
import Activation from '../../components/Authentication/Activation/Activation';
import SignUp from '../../components/Authentication/SignUp/SignUp';
import FirstStep from '../../components/Authentication/PasswordRecovery/FirstStep/FirstStep';
import SecondStep from '../../components/Authentication/PasswordRecovery/SecondStep/SecondStep';
import ThirdStep from '../../components/Authentication/PasswordRecovery/ThirdStep/ThirdStep';


class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        const { match } = this.props;
        this.baseUrl = match.url[match.url.length - 1] == '/' ? match.url : match.url + '/';
    }

    render(){
        const { match } = this.props;
        return (
            <div className='Dashboard'>
                {sessionStorage.token ?
                    <Redirect to="/" push />
                    :
                    <div>
                        <Switch>
                            <Route path={ this.baseUrl } exact component={SignIn}/>
                            <Route exact path={`${match.url}/confirm`} component={Confirm}/>
                            <Route exact path={`${match.url}/sign-up`} component={SignUp}/>
                            <Route exact path={`${match.url}/activation`} component={Activation}/>
                            <Route exact path={`${match.url}/password-recovery/first-step`} component={FirstStep}/>
                            <Route exact path={`${match.url}/password-recovery/second-step`} component={SecondStep}/>
                            <Route exact path={`${match.url}/password-recovery/third-step`} component={ThirdStep}/>
                            <Route component={NoMatch}/>
                        </Switch>
                    </div>
                }
            </div>
        );
    }
}

export default Authentication;