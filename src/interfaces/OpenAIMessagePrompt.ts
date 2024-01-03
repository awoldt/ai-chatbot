export default interface OpenAIMessagePrompt {
  model: string;
  messages: [{ role: string; content: string }];
}
