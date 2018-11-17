import React, {Component} from 'react';
import moment from 'moment';

class Header extends Component {
    state = {
        time: new Date()
    };

    componentDidMount(){
        this.interval = setInterval(this.setTime, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    setTime = () => {
      this.setState({time: new Date()});
    };

    render(){
        const {time} = this.state;
        return (
            <div className='Header'>
                <div className="logo">
                    <span>Title project</span>
                </div>
                <div className="user_select">
                    {moment(time).format('HH:mm:ss')}
                </div>
            </div>
        );
    }
}

export default Header;

