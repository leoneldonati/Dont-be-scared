import { useRef, useEffect } from "react";

const UserCamVideo = () => {
  const videoRef = useRef<any>(null);

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

  const unmount = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track: any) => track.stop());
    }
  }
  useEffect(() => {
    startWebcam();

    // limpiar desmonte de componente
    return unmount();
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        muted
        className="rounded-xl h-auto w-[400px] aspect-square object-cover transform scale-x-[-1] "
      />
    </div>
  );
};

export default UserCamVideo;
