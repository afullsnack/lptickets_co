export const Carousel = ({ children, itemLen }: any) => {
  return (
    <div className="carousel relative w-full h-full carousel-center max-w-md px-5 py-0 space-x-3 rounded-none">
      {children}
      {/* <div className="flex justify-center w-full py-2 gap-2 absolute bottom-2 right-0 left-0">
        {new Array(itemLen).fill("slide").map((s, idx) => (
          <a
            href={`#${idx + 1}`}
            className="w-2 h-2 rounded-full bg-gray-600"
          ></a>
        ))}
      </div> */}
    </div>
  );
};
