import { ShowCalendar } from "../components/Calendar/Show-calendar";
import { useParams } from "react-router-dom";

export const ShowEvents = () => {
  const { id } = useParams();

  return <>{id && <ShowCalendar planId={id} />}</>;
};
