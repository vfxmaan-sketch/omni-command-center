import { SmartHomeDashboard } from '@/components/SmartHomeDashboard';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Omnia - Smart Home Dashboard</title>
        <meta name="description" content="Futuristic smart home control dashboard with external playback triggers" />
      </Helmet>
      <SmartHomeDashboard />
    </>
  );
};

export default Index;
