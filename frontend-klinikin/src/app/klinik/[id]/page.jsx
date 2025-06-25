import KlinikClient from "@/components/KlinikClient";

export default function KlinikPage({ params }) {
  const { id } = params;

  return (
    <div className="flex justify-center min-h-screen bg-white px-40">
      <KlinikClient id={id} />
    </div>
  );
}
