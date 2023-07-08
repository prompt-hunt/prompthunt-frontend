import React from "react";

import { Address } from "@components/address";
import { AddressAvatar } from "@components/address-avatar";
import UpvoteIcon from "@icons/upvote.svg";
import { useTopUsers } from "@lib/users/use-top-users";

import type { NextPage } from "next";

const TopUsersPage: NextPage = () => {
  const { data: topUsers } = useTopUsers();

  console.log("Top users: ", topUsers);

  return (
    <div>
      <h1 className="text-3xl font-bold leading-[3.4rem]">
        Top prompt engineers
      </h1>
      <p className="mb-4 mt-1">
        Find the best prompt engineers trusted by the community
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {topUsers?.map((user) => (
          <div
            key={user.address}
            className="rounded-box flex justify-between bg-base-200 px-4 py-2"
          >
            <div className="mt-1 flex items-center gap-2">
              <AddressAvatar address={user.address} size={30} />
              <Address address={user.address} className="text-lg" />
            </div>
            <div className="hover rounded-btn flex w-12 flex-col items-center border border-base-content p-2">
              <UpvoteIcon className="h-4 w-4" />
              <span className="font-bold">{user.upvotes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopUsersPage;
