import { create } from "ipfs-http-client";

export const getIpfsUrl = (fileHash: string) => {
  return `${process.env.NEXT_PUBLIC_IPFS_BASE_URL}/${fileHash}`;
};

export const fetchFromIpfs = async <T extends Record<string, any>>(
  fileHash: string,
) => {
  const url = getIpfsUrl(fileHash);
  const res = await fetch(url);
  const data = await res.json();
  return data as T;
};

const ipfsUrl = process.env.NEXT_PUBLIC_IPFS_URL;

export const uploadToIPFS = async (data: Record<string, unknown>) => {
  const url = ipfsUrl || "https://ipfs.infura.io:5001";

  try {
    const ipfs = create({
      url,
      headers: {
        authorization: ipfsUrl
          ? ""
          : "Basic " +
            btoa(
              process.env.NEXT_PUBLIC_INFURA_ID +
                ":" +
                process.env.NEXT_PUBLIC_INFURA_SECRET,
            ),
      },
    });

    const result = await ipfs.add(JSON.stringify(data));
    return result.path;
  } catch (error) {
    console.error("IPFS error ", error);
  }
};
