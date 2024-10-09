import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
} from "@tabler/icons-react";
import { useRef, useState } from "react";
import thisIsHalloween from "../assets/this-is-halloween.wav";

export default function PlayAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef<HTMLAudioElement>(new Audio());

  const handleClick = async () => {
    setIsPlaying((prev) => !prev);

    if (isPlaying) {
      sound?.current?.pause();
    } else {
      await sound?.current?.play();
    }
  };
  return (
    <button
      onClick={handleClick}
      className="bg-gradient-to-br from-black/90 to-black p-2 h-10 w-10 rounded-full flex overflow-hidden fixed top-6 right-6 z-30 shadow-sm shadow-red-400 transition hover:scale-[1.03]"
      title={isPlaying ? "Pausa el sonido" : "Reproduce el sonido"}
    >
      <div
        className="transition text-red-700 flex flex-col"
        style={{
          transform: `translateY(${isPlaying ? -50 : 0}%)`,
        }}
      >
        <IconPlayerPlayFilled className="w-full h-auto mb-2" />

        <IconPlayerPauseFilled className="w-full h-auto mb-2" />
      </div>


      <audio src={thisIsHalloween} ref={sound}></audio>
    </button>
  );
}
