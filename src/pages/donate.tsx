/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  approveErc20,
  hasErc20Approval,
  hasSufficientFunds,
  payRequest,
} from "@requestnetwork/payment-processor";
import {
  RequestNetwork,
  Types,
  Utils,
} from "@requestnetwork/request-client.js";
import { Web3SignatureProvider } from "@requestnetwork/web3-signature";
import { parseUnits } from "ethers/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { currencies } from "@lib/config/currency";

import type { NextPage } from "next";
interface DonateFields {
  amount: number;
}

const zeroAddress = "0x0000000000000000000000000000000000000000";

enum APP_STATUS {
  AWAITING_INPUT = "awaiting input",
  SUBMITTING = "submitting",
  PERSISTING_TO_IPFS = "persisting to ipfs",
  PERSISTING_ON_CHAIN = "persisting on-chain",
  REQUEST_CONFIRMED = "request confirmed",
  ERROR_OCCURRED = "error occurred",
}

// const SC_ADDRESS = '0xb6F2F8e60cE94fcFacB569DE16eC59f7Cae5DF62'
const SC_ADDRESS = "0x1AC58B79a4d888a298296E0e0b17629e48f6c555";
const baseURL = "https://goerli.gateway.request.network/";
const curr = "5_0xBA62BCfcAaFc6622853cca2BE6Ac7d845BC0f2Dc";
// const curr = '5_0xdD69DB25F6D620A7baD3023c5d32761D353D3De9'

const DonatePage: NextPage = () => {
  const [expectedAmount, setExpectedAmount] = useState("");
  const [currency] = useState(curr);
  const [dueDate] = useState("");
  const [reason] = useState("");
  const [status, setStatus] = useState(APP_STATUS.AWAITING_INPUT);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [request, setRequest] = useState<Types.IRequestDataWithEvents>();

  const [isLoading, setIsLoading] = useState(false);
  const [isPayLoading, setIsPayLoading] = useState(false);

  const payTheRequest = async (reqID: string) => {
    setIsPayLoading(true);
    const signatureProvider = new Web3SignatureProvider(window.ethereum);
    const requestNetwork = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL,
      },
      signatureProvider,
    });

    const request = await requestNetwork.fromRequestId(reqID);
    const requestData = request.getData();

    if (!(await hasSufficientFunds(requestData, address as string))) {
      throw new Error("You do not have enough funds to pay this request");
    }

    if (!(await hasErc20Approval(requestData, address as string))) {
      const approvalTx = await approveErc20(requestData);
      await approvalTx.wait(1);
    }
    const tx = await payRequest(requestData);
    await tx.wait(1);
    setIsPayLoading(true);
  };

  function createRequest() {
    setIsLoading(true);
    const signatureProvider = new Web3SignatureProvider(window.ethereum);
    const requestClient = new RequestNetwork({
      nodeConnectionConfig: {
        baseURL,
      },
      signatureProvider,
    });

    const requestCreateParameters: Types.ICreateRequestParameters = {
      requestInfo: {
        currency: {
          type: currencies.get(currency)!.type,
          value: currencies.get(currency)!.value,
          network: currencies.get(currency)!.network,
        },
        expectedAmount: parseUnits(
          expectedAmount as `${number}`,
          currencies.get(currency)!.decimals,
        ).toString(),
        timestamp: Utils.getCurrentTimestampInSecond(),
        payee: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: SC_ADDRESS,
        },
        payer: {
          type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
          value: address as string,
        },
      },
      paymentNetwork: {
        id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
        // id: Types.Extension.PAYMENT_NETWORK_ID.ETH_INPUT_DATA,
        parameters: {
          paymentNetworkName: currencies.get(currency)!.network,
          paymentAddress: SC_ADDRESS,
          feeAddress: zeroAddress,
          feeAmount: "0",
        },
      },
      contentData: { reason, dueDate },
      signer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: address as string,
      },
    };

    setStatus(APP_STATUS.PERSISTING_TO_IPFS);
    requestClient
      .createRequest(requestCreateParameters)
      .then((request) => {
        setStatus(APP_STATUS.PERSISTING_ON_CHAIN);
        setRequest(request.getData());
        return request.waitForConfirmation();
      })
      .then((requestData) => {
        setStatus(APP_STATUS.REQUEST_CONFIRMED);
        payTheRequest(requestData.requestId);
        return setRequest(requestData);
      })
      .catch((err) => {
        setStatus(APP_STATUS.ERROR_OCCURRED);
        alert(err);
      })
      .finally(() => setIsLoading(false));
  }

  const canSubmit = () =>
    status !== APP_STATUS.SUBMITTING &&
    !isDisconnected &&
    !isConnecting &&
    // !isError &&
    // !isLoading &&
    expectedAmount.length > 0;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!canSubmit()) {
      return;
    }
    setRequest(undefined);
    setStatus(APP_STATUS.SUBMITTING);
    createRequest();
  }

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
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <Input
          block
          type="number"
          label="Amount"
          step={0.01}
          onValueChange={setExpectedAmount}
          {...register("amount", { required: "Amount is required" })}
          error={errors.amount?.message}
        />
        <Button
          className="mt-1"
          loading={isLoading || isPayLoading}
          disabled={isLoading || isPayLoading}
        >
          Donate
        </Button>
      </form>
    </div>
  );
};

export default DonatePage;
