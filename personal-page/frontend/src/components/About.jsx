import my_image from "../assets/my-image.jpg";

export default function About() {
  return (
    <div className="flex flex-col basis-11/12 sm:mx-40 mt-16">
      <div className="basis-1/3 flex flex-wrap justify-center gap-x-16">
        <img
          src={my_image}
          className="aspect-square max-w-60 max-h-60 rounded-full"
        />
        <p className="max-sm:text-5xl max-md:text-6xl max-lg:text-7xl text-9xl font-serif my-auto text-emerald-950">
          Andrew Hsieh
        </p>
      </div>
      <div className="mt-6 mx-12 sm:text-lg leading-8 text-gray-600">
        Currently pursuing my master's degree in deep learning at National
        Taiwan University, I'm deeply passionate about computer science, with
        special interests in deep learning and web development. Alongside my
        academic pursuits, I make time for regular workouts, believing in the
        importance of a balanced lifestyle. I also enjoy keeping small animals,
        which adds a touch of warmth to my tech-focused life. This blend of
        interests showcases my journey through the exciting world of technology
        while staying grounded with simple joys.
      </div>
    </div>
  );
}
