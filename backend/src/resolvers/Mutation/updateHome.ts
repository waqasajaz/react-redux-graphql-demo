import { Context } from '../../utils'

export async function updateHome(parent, args, ctx: Context, info) {
  await ctx.db.mutation.updatePlace({
    data: {
      name: args.name
    },
    where : { id: args.placeId }
  })

  // TODO: send email to user
  return { success: true }
}
