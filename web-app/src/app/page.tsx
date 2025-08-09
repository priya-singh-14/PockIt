import AuthContainer from "./components/auth-container";

export default function Home() {
  return (
    <div className="h-screen w-full flex bg-primary">
      <div className="w-1/2 h-full">
        <AuthContainer />
      </div>
      <img src="/gradient.png" className="w-1/2 bg-blackPrimary object-cover"></img>
    </div>
  );
}
