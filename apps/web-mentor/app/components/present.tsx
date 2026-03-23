import { SlideState } from "@shared/types";

const Present = ({ slide }: { slide: SlideState }) => {
  if (!slide) return <div>No Slide</div>;

  /* AT_HERE: Design the presentation slides view */
  return (
    <div className="mt-auto flex items-center justify-center">
      {slide.type === "multiple_choice" ? (
        <div>
          <h1 className="text-4xl text-black">
            {slide.question ? slide.question : "No question"}
          </h1>
          {slide.options.map((option) => (
            <div key={option.id}>
              <p>{option.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>{slide.type}</div>
      )}
    </div>
  );
};

export default Present;
