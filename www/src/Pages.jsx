import React from "react";
import Hero from "./components/Hero";
import Snapshot from "./components/Snapshot";
import Process from "./components/Process";
import Levels from "./components/Levels";
import Contact from "./components/Contact";
import ContactCard from "./components/ContactCard";

const Home = (props) => {
  return (
    <>
      <Hero setDoc={props.setDoc} />
      <Snapshot />
      <Process />
      <Levels />
      <Contact />
      <ContactCard />
    </>
  );
};

export { Home };