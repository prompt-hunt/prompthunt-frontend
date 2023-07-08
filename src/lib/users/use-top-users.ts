import { useQuery } from "@tanstack/react-query";
import { useChainId } from "wagmi";

import { DEPLOYMENT_BLOCK } from "@constants/addresses";
import { usePromptHunt } from "@hooks/use-prompt-hunt";

interface TopUser {
  address: `0x${string}`;
  upvotes: number;
}

export const useTopUsers = () => {
  const chainId = useChainId();
  const promptHunt = usePromptHunt();

  return useQuery<TopUser[]>(["top-users", chainId], async () => {
    if (!promptHunt) return [];

    /* Get prompt examples */
    const upvotesByUser: Record<string, TopUser> = {};
    const eventFilter = promptHunt.filters.UserUpvotesUpdated();
    const events = await promptHunt.queryFilter(
      eventFilter,
      DEPLOYMENT_BLOCK[chainId],
    );

    for (const event of events) {
      if (!event.args) continue;
      const { user, totalUpvotes } = event.args;

      upvotesByUser[user] = {
        address: user as `0x${string}`,
        upvotes: totalUpvotes.toNumber(),
      };
    }

    // Sort users by upvotes
    const sortedUsers = Object.entries(upvotesByUser).sort((a, b) =>
      upvotesByUser[a[0]].upvotes - upvotesByUser[b[0]].upvotes > 0 ? -1 : 1,
    );

    return sortedUsers.map(([, user]) => user);
  });
};
