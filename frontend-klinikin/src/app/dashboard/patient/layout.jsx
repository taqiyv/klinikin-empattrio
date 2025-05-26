import Footer from "@/components/Footer";
import NavbarPasien from "@/components/NavbarPasien";

export default function PatientLayout({ children }) {
  return (
    <div>
      <NavbarPasien />
      <main>{children}</main>
      <Footer />
    </div>
  );
}