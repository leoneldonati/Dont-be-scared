import { IconCamera, IconReload } from "@tabler/icons-react";
import { useRef, useEffect, useState } from "react";

const UserCamVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const startWebcam = async () => {
    try {
      // si el navegador no soporta la webcam
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error al intentar acceder a la webcam:", error);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;

        // dibujar la imagen del video en el canvas
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        // obtener la imagen del canvas como un data URL
        const dataUrl = canvasRef.current.toDataURL("image/png");

        setPhoto(dataUrl);

        const randomMessages = [
          "¡Te ves espectacular!",
          "¡Qué buena foto!",
          "¡Brillas!",
          "¡Eres pura elegancia!",
          "¡Tu estilo es único!",
          "¡Increíble!",
          "¡Me encanta esta foto!",
          "¡Tienes una vibra increíble!",
          "¡Fotaza!",
          "¡Impresionante look!",
        ];

        const randomMessage =
          randomMessages[Math.floor(Math.random() * randomMessages.length)];
        setMessage(randomMessage);
      }
    }
  };

  const unmount = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    startWebcam();

    // limpiar desmonte de componente
    return () => unmount();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-between pb-8 rounded-xl h-auto w-[400px] mx-auto mt-6 bg-black/30 aspect-square object-cover overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        hidden={photo !== null}
        className="transform scale-x-[-1]"
      />

      <img
        src={photo ?? ""}
        alt="Foto de el/la valiente que se atrevió a navegar esta historia 🎃"
        style={{ display: photo !== null ? "inline-block" : "none" }}
        className="transform scale-x-[-1]"
      />
      <button
        onClick={takePhoto}
        className="mt-2 p-2 bg-black text-red-500 rounded flex"
        title="Tomar foto"
        style={{
          opacity: photo !== null ? 0 : 1,
          pointerEvents: photo !== null ? "none" : "auto",
        }}
      >
        <IconCamera />
      </button>

      <button
        className="absolute top-4 right-4"
        hidden={photo == null}
        onClick={() => {
          setMessage("");
          setPhoto(null);
        }}
        title="¿No te gustó? Cámbiala."
      >
        <IconReload />
      </button>

      {message && <span className="font-bold absolute bottom-10">{message}</span>}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default UserCamVideo;
