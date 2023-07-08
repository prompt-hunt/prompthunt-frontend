import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";

import type { NextPage } from "next";

interface DonateFields {
  amount: number;
}

const DonatePage: NextPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm<DonateFields>();

  return (
    <div className="mx-auto max-w-[30rem]">
      <h1 className="text-3xl font-bold">Donate</h1>
      <p className="mb-4 mt-2">
        Support the best prompt engineers by donating to the community
      </p>
      <form className="flex flex-col gap-2">
        <Input
          block
          type="number"
          label="Amount"
          step={0.01}
          {...register("amount", { required: "Amount is required" })}
          error={errors.amount?.message}
        />
        <Button className="mt-1">Donate</Button>
      </form>
    </div>
  );
};

export default DonatePage;
