import { Container } from "./styles";

import MainLayout from "../../layouts/MainLayout";

import PatientsSection from "./PatientsSection";
import AppointmentsSection from "./AppointmentsSection";

export default function Home() {
  return (
    <MainLayout>
      <Container>
        <PatientsSection />
        <AppointmentsSection />
      </Container>
    </MainLayout>
  );
}
