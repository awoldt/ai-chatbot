import Head from "next/head";
import ChatBar from "@/components/ChatBar";
import Description from "@/components/SiteDescription";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Home() {
  const [hideSiteDescription, setHideSiteDescription] =
    useState<boolean>(false);
  const [chatbarWidth, setChatbarWidth] = useState<number>();

  useEffect(() => {
    if (!hideSiteDescription) {
      setChatbarWidth(9);
    } else {
      setChatbarWidth(12);
    }
  }, [hideSiteDescription]);

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
          <Col xl={chatbarWidth} style={{ padding: "0px" }}>
            <ChatBar />
          </Col>
          {!hideSiteDescription && (
            <Col xl={3} style={{ paddingTop: "25px" }}>
              <Description hide={setHideSiteDescription} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
}
