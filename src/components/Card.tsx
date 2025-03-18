import Image from "next/image";

type CardProps = {
  image: string;
  id: number;
  handleFlip: (id: number) => void;
  isFlipped: boolean;
  alt: string;
};

export const Card = ({ image, id, handleFlip, isFlipped, alt }: CardProps) => {
  return (
    <div
      onClick={() => handleFlip(id)}
      className={`border border-purple-700 md:w-[200px] md:h-[200px] rounded-2xl md:rounded-3xl cursor-pointer
        transition-all duration-400 ease-in-out ${
          isFlipped ? "rotate-y-180" : ""
        }`}
    >
      <Image
        src={isFlipped ? image : "/neon_triangle.jpg"}
        width={500}
        height={500}
        alt={alt}
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
};
