//This is an Express server

import type { NextApiRequest, NextApiResponse } from "next";
import SendMessage from "@/functions/SendMessage";
import Message from "@/interfaces/Message";

type Data = {
  status: number;
  data?: Message[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const postData = JSON.parse(req.body);
    const x: Message[] | null = await SendMessage(postData.text);

    res.status(200).json({ status: 200, data: x });
  } catch (e) {
    res.status(500).json({ status: 500 });
  }
}
