import withLayout from "../../components/Layout";
import { Ticket } from "../../components/Ticket";
import { trpc } from "../../utils/trpc";

function Tickets() {
  // TODO: Fetch all users tickets and display

  const { data, isLoading, error } = trpc.useQuery([
    "ticket.getAllUserTickets",
  ]);
  console.log(data, isLoading, error, "Get tickets data");
  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center my-0 mx-auto">
      <Ticket />
    </div>
  );
}

export default withLayout(Tickets);
