import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const leaderboardRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    // Any queries or mutations after this middleware will
    // raise an error unless there is a current session
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("getLeaderboard", {
    async resolve({ ctx }) {
      return await ctx.prisma.leaderboard.findMany();
    },
  });
