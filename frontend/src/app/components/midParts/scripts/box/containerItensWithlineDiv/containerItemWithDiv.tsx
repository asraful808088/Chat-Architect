import ContainerItens from "../containerItems";
import LineForDiv from "../line/line";

export default function ContainerwithlineDiv(props) {
  return (
    <div className={`flex`}>
      {props.lineDiv ? <LineForDiv /> : null}
      <ContainerItens
        no={props.no}
        onAlternative={(value) => {
          if (props.onAlternative) {
            props.onAlternative(value);
          }
        }}
        onCross={props.onCross}
        onDefaultAlternative={props.onDefaultAlternative}
        onNext={props.onNext}
        intence={props.intence}
        hideClose={props.hideClose}
        hideNext={props.hideNext}
        hideAlt={props.hideAlt}
        hideDefalut={props.hideDefalut}
        onNewintence={props.onNewintence}
        onNextIntence={props.onNextIntence}
        convIndex={props.convIndex}
        onConvIndex={props.onConvIndex}
        id={props.id}
        parentsProperty={props.parentsProperty}
        underOfBrackTopic={props.underOfBrackTopic}
        underOfPrivateTopic={props.underOfPrivateTopic}
      />
    </div>
  );
}
