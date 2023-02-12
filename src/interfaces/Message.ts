export default interface Message {
  user: "client" | "bot"; //either a clients chat msg or a bots (openai)
  text: string;
}
