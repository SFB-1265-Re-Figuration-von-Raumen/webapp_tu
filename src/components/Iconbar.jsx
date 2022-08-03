import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import {
  AktiBusfahren,
  AktiChattenn,
  AktiFahrradfahren,
  AktiLesen,
  AtmoAngespannt,
  AtmoKonzentriert,
  AtmoLustig,
  AtmosSchoen,
  OrteArzt,
  OrteBeiFreundIn,
  OrteSchule,
  OrteZuHause,
  PersonenEltern,
  PersonenFreunde,
  PersonenLehrerin,
  PersonenSchwester,
} from "../assets/svgr_output/index";

export default function Iconbar() {
  const svgConvaEvent = (i) => {
    console.log(`hii ${i}`);
  };

  return (
    <div className="iconBarContainer">
      <ScrollContainer className="scroll-container iconToolbarRow spaces" id="xDragToolbar" >
        <OrteArzt />
        <OrteBeiFreundIn />
        <OrteSchule />
        <OrteZuHause />
      </ScrollContainer>
      {/* <ScrollContainer
        className="scroll-container iconToolbarRow transport"
        id="xDragToolbar"
      ></ScrollContainer>  */}
      <ScrollContainer
        className="scroll-container iconToolbarRow people"
        id="xDragToolbar" horizontal="true" vertical="false"
      >
      <PersonenEltern />
      <PersonenFreunde />
      <PersonenLehrerin />
      <PersonenSchwester />
      </ScrollContainer>
      <ScrollContainer
        className="scroll-container iconToolbarRow actvities"
        id="xDragToolbar" horizontal="true" vertical="false"
      >
      <AktiBusfahren />
      <AktiChattenn />
      <AktiFahrradfahren />
      <AktiLesen />
      </ScrollContainer>
      <ScrollContainer
        className="scroll-container iconToolbarRow atmosphere"
        id="xDragToolbar" horizontal="true" vertical="false"
      >
        <AtmoAngespannt />
        <AtmoKonzentriert />
        <AtmoLustig />
        <AtmosSchoen />
  </ScrollContainer>
    </div>
  );
}
