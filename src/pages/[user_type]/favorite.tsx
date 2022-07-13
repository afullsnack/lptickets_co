import { useRouter } from "next/router";
import withLayout from "../../components/Layout";

function Favorite() {
  const router = useRouter();

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center my-0 mx-auto">
      <h1>Favorites</h1>
      {/* {new Array(5).fill("event name").map((item, idx) => (
        <EventCard
          key={item + idx.toString()}
          onClick={(e: any) => {
            console.log("EventCard clicked", e);
            router.push(`/user/favorite/${item + idx.toString()}`);
          }}
          item={{
            id: "",
            title: "",
            description: "",
            location: "",
            dateTime: new Date(),
            totalTickets: null,
            likeCount: null,
            userId: null,
          }}
        />
      ))} */}
    </div>
  );
}

export default withLayout(Favorite);
