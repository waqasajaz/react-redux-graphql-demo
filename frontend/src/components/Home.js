import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Home extends Component {
  state = {
    editable: false,
    homeName: this.props.home.name
  }
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="ml1">
          <div>
            {!this.state.editable && (<span>{this.props.home.name}</span>)}
            { this.props.isAdmin && this.state.editable && (
              <input 
                type="text" value={this.state.homeName}
                onChange={e => this.setState({ homeName: e.target.value })}
              />
            )}
            { this.props.isAdmin &&  !this.state.editable && (<span className="pointer button"  onClick={() => this.setState({ editable: true })}>edit</span>)}
            { this.props.isAdmin &&  this.state.editable && (<span className="pointer button"  onClick={() => this._saveHome()}>save</span>)}
          </div>
        </div>
      </div>
    )
  }

  _saveHome = async () => {
    const homeId = this.props.home.id
    const homeName = this.state.homeName

    await this.props.homeMutation({
      variables: {
        homeId,
        homeName
      },
      update: (store, { data: { response } }) => {
        console.log(response);
        this.setState({ editable: false })
      },
    })
  }
}

const HOME_MUTATION = gql`
  mutation HomeMutation($homeId: ID!, $homeName: String!) {
    updateHome(placeId: $homeId, name: $homeName) {
      success
    }
  }
`

export default graphql(HOME_MUTATION, {
  name: 'homeMutation',
})(Home)