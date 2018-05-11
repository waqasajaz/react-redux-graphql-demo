import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Header extends Component {
  render() {
    return (
      <div className="flex pa1 justify-between nowrap light-blue">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Available Homes</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
