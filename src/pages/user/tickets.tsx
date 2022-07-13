import withLayout from "../../components/Layout";
import { Ticket } from "../../components/Ticket";

function Tickets() {
  // TODO: Fetch all users tickets and display
  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center my-0 mx-auto">
      <h1>Tickets</h1>
      <Ticket />
    </div>
  );
}

export default withLayout(Tickets);
