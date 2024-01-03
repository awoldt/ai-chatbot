import Message from "@/interfaces/Message";
import OpenAIMessagePrompt from "@/interfaces/OpenAIMessagePrompt";

export default async function SendMessage(
  message: string
): Promise<Message[] | null> {
  try {
    const newMessage: Message = {
      user: "client",
      text: message,
    };
    const newBotPrompt: OpenAIMessagePrompt = {
      model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: message }],
    };

    //get back response from openai based on users message
    const botResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        body: JSON.stringify(newBotPrompt),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.OPENAI_KEY,
        },
      }
    );
    const b = await botResponse.json();

    const botResponseMessage: Message = {
      user: "bot",
      text: b.choices[0].message.content,
    };

    return [newMessage, botResponseMessage];
  } catch (e) {
    console.log(e);
    return null;
  }
}
