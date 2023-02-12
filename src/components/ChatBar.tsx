import { FormControl, Row } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import Message from "@/interfaces/Message";

export default function ChatBar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentClientMessage, setCurrentClientMessage] = useState<string>("");
  const [firstMessageSent, setFirstMessageSent] = useState<boolean>(false);

  const chatBarRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatMessagesRef.current!.scrollTop = chatMessagesRef.current!.scrollHeight;
    chatBarRef.current!.focus();
  }, []);

  return (
    <>
      <div id="chat_messages_div" ref={chatMessagesRef}>
        <div
          className="mx-auto mb-5"
          style={{
            backgroundColor: "rgb(128, 128, 128, 0.1)",
            width: "fit-content",
            borderRadius: "13px",
            padding: "5px",
            fontSize: "13px",
          }}
        >
          <img src="/icons/lock.svg" alt="lock icon" /> This chat is end to end
          encrypted
        </div>
        {messages.length === 0 && (
          <div className="text-center">
            <code className="text-muted">
              No messages yet. Send your first one to the bot! Remember to press
              enter when you want to send your chat.
            </code>
          </div>
        )}
        {messages.length > 0 && (
          <>
            {messages.map((msg: Message, index: number) => {
              if (msg.user === "client") {
                return (
                  <Row className="justify-content-end" key={index}>
                    <div className="client-msg" style={{ width: "auto" }}>
                      <p style={{ margin: "0px" }}>{msg.text}</p>
                    </div>
                  </Row>
                );
              } else {
                return (
                  <Row key={index}>
                    <div
                      className="bot-msg"
                      style={{ width: "auto", marginLeft: "10px" }}
                    >
                      <p style={{ margin: "0px" }}>{msg.text}</p>
                    </div>
                  </Row>
                );
              }
            })}
          </>
        )}
      </div>
      <Row
        style={{
          backgroundColor: "rgb(128, 128, 128, 0.1)",
          height: "10vh",
          marginRight: "-1px",
          padding: "0px 5vw 25px 5vw",
        }}
      >
        <FormControl
          ref={chatBarRef}
          placeholder="Ask any question or just have a normal converation"
          id="user_message_input"
          onChange={(e) => {
            if (e.target.value !== "") {
              setCurrentClientMessage(e.target.value);
            }
          }}
          onKeyDown={async (e) => {
            //SEND CHAT
            if (e.key === "Enter" && currentClientMessage !== "") {
              try {
                chatBarRef.current!.disabled = true;
                const newMessage: Message = {
                  user: "client",
                  text: currentClientMessage,
                };
                const data = await fetch("/api/new_message", {
                  method: "POST",
                  body: JSON.stringify(newMessage),
                });

                const returnData = await data.json();

                setMessages([
                  ...messages,
                  {
                    user: "client",
                    text: returnData.data[0].text,
                  },
                  {
                    user: "bot",
                    text: returnData.data[1].text,
                  },
                ]);

                setCurrentClientMessage("");
                if (!firstMessageSent) {
                  chatBarRef.current!.placeholder = "";
                  setFirstMessageSent(true);
                }
                chatMessagesRef.current!.scrollTop =
                  chatMessagesRef.current!.scrollHeight;
                chatBarRef.current!.value = "";
                chatBarRef.current!.disabled = false;
                chatBarRef.current!.focus();
              } catch (e) {
                alert("There was an error sending this chat :(");
              }
            }
          }}
        />{" "}
      </Row>
    </>
  );
}
