import { useQuery } from "wagmi";

import { usePromptHunt } from "@hooks/use-prompt-hunt";

interface TopUser {
  address: `0x${string}`;
  upvotes: number;
}

export const useTopUsers = () => {
  const promptHunt = usePromptHunt();

  return useQuery<TopUser[]>(["top-users"], async () => {
    if (!promptHunt) return [];

    /* Get prompt examples */
    const upvotesByUser: Record<string, TopUser> = {};
    const eventFilter = promptHunt.filters.UserUpvotesUpdated();
    const events = await promptHunt.queryFilter(eventFilter);

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
