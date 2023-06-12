import { useDocument } from "react-firebase-hooks/firestore";
import { ShowCalendar } from "../components/Calendar/Show-calendar";
import { useParams } from "react-router-dom";
import { getPlanDocRef, updatePlan } from "../db/plans";
import { Box, Card, CardHeader } from "@mui/material";
import { EditContent } from "../components/Exercise/Edit-content";

export const ShowEvents = () => {
  const { id } = useParams();

  if (id) {
    const [calendar] = useDocument(getPlanDocRef(id));
    const editPlanName = (name: string | undefined) => {
      if (name) updatePlan(id, name);
    };

    return (
      <Card>
        {calendar && (
          <CardHeader
            title={
              <EditContent
                label={"Plan name"}
                callback={editPlanName}
                value={(calendar?.data() as { name: string }).name}
              />
            }
          />
        )}
        <div style={{ height: "100vh" }}>
          <ShowCalendar planId={id} />
        </div>
      </Card>
    );
  }
  return null;
};
