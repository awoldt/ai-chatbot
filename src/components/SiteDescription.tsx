import React from "react";
export default function RecentChats() {
  return (
    <>
      <h1 style={{ marginBottom: "25px" }} className="text-center">
        Chat AI
      </h1>
      <p className="text-center">
        Welcome! You can chat with a AI-powered virtual assistant and have
        normal conversations with it like it was another human. This AI is
        designed to engage in conversations with you and assist you with various
        tasks, such as answering questions, providing recommendations, and
        offering personalized suggestions based on your preferences. The AI is
        always learning and improving, so you can expect more accurate and
        helpful responses over time. Whether you&apos;re looking for quick assistance
        or just want to have a friendly chat, this chat bot is here to help you
        24/7. Start chatting today and experience the future of virtual
        assistance.
      </p>
      <p className="mt-5 text-muted text-center"><img src="/icons/openai.svg"/> Powered by OpenAI</p>
    </>
  );
}
