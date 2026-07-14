import DashboardLayout from '../components/DashboardLayout';
import ComparadorActivos from '../components/ComparadorActivos';

export default function ComparadorPage() {
  return (
    <DashboardLayout hideSearch={true}>
      <ComparadorActivos />
    </DashboardLayout>
  );
}
