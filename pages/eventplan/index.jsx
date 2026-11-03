
import CapsulePlans from "../../components/Capsuleplans";

export default function CapsulePlansPage() {
  return (
    <>
      <main className="overflow-x-hidden bg-white min-h-screen">
       <CapsulePlans onSelect={(plan) => console.log(plan)}  />
      </main>
    </>
  );
}