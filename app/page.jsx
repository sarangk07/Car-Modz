import Start from "./components/Start";
import ImageGallery from "./components/ImgGallary";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
    <Toaster position="top-center" />
    <ImageGallery/>
    </>
  );
}
