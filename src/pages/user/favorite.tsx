import { useRouter } from "next/router";
import { EventCard } from "../../components/Event";
import withLayout from "../../components/Layout";

function Favorite() {
  const router = useRouter();

  return (
    <div className="desktop:max-w-screen-desktop mobile:p-4 w-full h-full flex flex-col items-center justify-center my-0 mx-auto">
      {new Array(5).fill("event name").map((item, idx) => (
        <EventCard
          key={item + idx.toString()}
          onClick={(e) => {
            router.push(`/user/favorite/${item + idx.toString()}`);
          }}
        />
      ))}
    </div>
  );
}

export default withLayout(Favorite);
