import DashboardLayout from '../components/DashboardLayout';
import SimuladorInteresCompuesto from '../components/SimuladorInteresCompuesto';

export default function SimuladorPage() {
  return (
    <DashboardLayout hideSearch={true}>
      <SimuladorInteresCompuesto />
    </DashboardLayout>
  );
}
