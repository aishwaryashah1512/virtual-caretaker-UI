import 'react-notifications/lib/notifications.css';
import React from 'react';
import { connect } from 'react-redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';


class Example extends React.Component {

  state = {
    curr: new Date().getHours(),
    change : true,
    not : 0
  }
  componentDidMount() {
    var today = new Date();
    setInterval(() => this.change(), 1000 * 60 * 60)
  }

  change() {
    this.setState({ curr: new Date().getMinutes(), not : 1})
  }


  componentDidUpdate() {
      NotificationManager.info("It's time to hydrate")
  }

  render() {
 
    return (
      <div>
        <NotificationContainer />
      </div>
    );
  }
  
}


const mapStateToProps = state => {
  return {
    not: state.not,
    loading: state.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Notify: () => dispatch({ type: 'UPDATE_NOT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
