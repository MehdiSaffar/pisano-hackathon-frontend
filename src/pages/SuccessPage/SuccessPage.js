import React, { Component } from 'react'
import classes from './SuccessPage.css'
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { withRouter } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

@observer
class SuccessPage extends Component {

  @observable timeLeft = 3;

  componentDidMount() {
    const i = setInterval(() => {
      this.timeLeft--;
        if(this.timeLeft <= 0) {
          clearInterval(i)
          // this.props.history.push('/a')
        }
    }, 1000);
  }

  render() {
    return (
      <div className={classes.SuccessSection}>
      <div className={classes.SuccessCheck}>
        <FontAwesomeIcon icon="check"/>
      </div>
        <h1>
          Your document has been successfully saved!
        </h1>
        <p>You will be redirected in {this.timeLeft} seconds...</p>
      </div>
    )
  }
}

export default withRouter(SuccessPage)
