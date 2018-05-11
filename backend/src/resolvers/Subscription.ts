import { Context } from '../utils'
// import { WrapQuery } from 'graphql-tools'
// import { SelectionSetNode, Kind } from 'graphql'

export const Subscription = {
  city: {
    subscribe: async (parent, args, ctx: Context, info) => {
      return ctx.db.subscription.city({}, info, {})
    },
  },
  home: {
    subscribe: async (parent, args, ctx: Context, info) => {
      return ctx.db.subscription.place({}, info, {})
    },
  },
}
