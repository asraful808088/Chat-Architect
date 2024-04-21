"use client";
import { MidPartType } from "@/app/page";
import Conditions from "../midParts/conditions/conditions";
import IntentMid from "../midParts/intent/intent";
import Response from "../midParts/response/response";
import MidPartOfScripts from "../midParts/scripts/sctipts";
import Synonyms from "../midParts/synonyms/synonyms";
interface MidpartProps {
  type: MidPartType;
}
export default function Midpart(props: MidpartProps) {
  return (
    <div className="w-[850px] relative m-auto font-extrabold "  style={{
      height:"calc(100% - 120px)"
    }}>
      {props.type == MidPartType.INTENT ? (
        <IntentMid />
      ) : props.type == MidPartType.SCRIPTS ? (
        <MidPartOfScripts />
      ) : props.type == MidPartType.CONDITION ? (
        <Conditions />
      ) : props.type == MidPartType.RESPONSE ? (
        <Response />
      ) : props.type == MidPartType.SYNONYMS ? (
        <Synonyms />
      ) : null}
    </div>
  );
}
