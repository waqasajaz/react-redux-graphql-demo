import React, { Component } from 'react'
import Home from './Home'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { LINKS_PER_PAGE } from '../constants'

class HomesList extends Component {
  componentDidMount() {
    this._subscribeToHomesUpdates();
  }

  render() {
    if (this.props.homesQuery && this.props.homesQuery.loading) {
      return <div>Loading</div>
    }

    if (this.props.homesQuery && this.props.homesQuery.error) {
      return <div>Error</div>
    }
    const isAdmin = this.props.location.pathname.includes('admin')
    const homes = this.props.homesQuery.topHomes || []
    const page = parseInt(this.props.match.params.page, 10)

    return (
      <div>
        <div>
          {homes.map((home, index) => (
            <Home
              key={home.id}
              index={page ? (page - 1) * LINKS_PER_PAGE + index : index}
              home={home}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      </div>
    )
  }

  _subscribeToHomesUpdates = () => {
    this.props.homesQuery.subscribeToMore({
      document: gql`
        subscription {
          home {
            mutation
            updatedFields
            node {
              id
              name
            }
            previousValues {
              id
              name
            }
          }
        }`,
      updateQuery: (previous, { subscriptionData }) => {
        console.log(previous);
        console.log(subscriptionData);
        const newAllLinks = [
          subscriptionData.data.home.node,
          ...previous.topHomes.filter(e => e.id !== subscriptionData.data.home.node.id),
        ]
        const result = {
          topHomes: newAllLinks
        }
        return result
      },
    })
  }

}


export const HOMES_QUERY = gql`
  query HomesSearchQuery {
    topHomes {
      id
      name
    }
  }
`

export default graphql(HOMES_QUERY, {
  name: 'homesQuery'
})(HomesList)
