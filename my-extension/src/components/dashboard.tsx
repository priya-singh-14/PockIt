import LogOutButton from "../components/logout";

interface DashboardProps {
  logout: () => void;
}

function Dashboard({ logout }: DashboardProps) {
  return (
    <div className="w-[320px] p-4 flex flex-col justify-center">
      <h2
        className="text-center my-4 font-[var(--font-noto)] text-[var(--text-h2--size)]"
        style={{ color: "var(--color-blue-dark)", fontWeight: "400" }}
      >
        logged in
      </h2>
      <LogOutButton logout={logout} />
    </div>
  );
}

export default Dashboard;
