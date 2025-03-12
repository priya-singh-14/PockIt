import AuthContainer from "./components/auth-container";

export default function Home() {
  return (
    <div className="h-screen w-full flex bg-primary">
      <div className="w-1/2 flex flex-col justify-center items-center relative">
        <h1 className="text-starYellow text-h2 font-pixel absolute top-6 left-6">
          starred
        </h1>
        <div className="z-10 relative mx-auto">
          <h4 className="ml-80 mt-10 text-whitePrimary text-h4 font-inconsolata transform rotate-12">
            save your interests
          </h4>
          <img
            src="star.svg"
            alt="star"
            className="transform animate-spin transition-transform ease-in-out"
          ></img>
          <h4 className="pl-10 ml-30 text-whitePrimary text-h4 font-inconsolata">
            build your wish lists
          </h4>
        </div>
        <div className="z-0 absolute bottom-0 left-0">
          <img src="blur.svg" alt="star" className=""></img>
        </div>
        <p className="text-starYellow font-inconsolata text-md absolute left-10 bottom-6">
          Download Our Chrome Extension
        </p>
      </div>
      <div className="w-1/2 justify-end">
        <AuthContainer />
      </div>
    </div>
  );
}
