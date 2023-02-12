import Head from "next/head";
import ChatBar from "@/components/ChatBar";
import Description from "@/components/SiteDescription";
import { Col, Container, Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat App</title>
        <meta name="description" content="Chat with a bot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/chat-dots-fill.svg" />
      </Head>
      <Container fluid>
        <Row>
          <Col xl={9} style={{ padding: "0px" }}>
            <ChatBar />
          </Col>
          <Col xl={3} style={{ paddingTop: "25px" }}>
            <Description />
          </Col>
        </Row>
      </Container>
    </>
  );
}
