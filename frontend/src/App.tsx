import Button from '@mui/material/Button';
import './App.css'
import { Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { api } from './lib/axios';

function App() {
  return <>
    <img src="src/assets/logo.gif" />
    <p>Una colección de mis libros favoritos :)</p>
    <p>Por favor no hackear</p>
    <Grid container spacing={0.5}>
      <BotonLibro libro="1" />
      <BotonLibro libro="2" />
      <BotonLibro libro="3" />
      <BotonLibro libro="4" />
      <BotonLibro libro="5" />
      <BotonLibro libro="6" />
    </Grid>
  </>
}

export default App


const BotonLibro = ({ libro }: { libro: string }) => {
  const { refetch } = useQuery({
    queryKey: ['pdf', libro],
    queryFn: async () => {
      const response = await api.get(`/libro?libro=${libro}.pdf`, {
        responseType: 'blob'
      });
      return response.data;
    },
    enabled: false,
  });

  const handleDownload = async () => {
    try {
      const pdfData = await refetch();
      if (pdfData.data) {
        const blob = new Blob([pdfData.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${libro}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error descargando PDF:', error);
    }
  };

  return <Grid size={4}>
    <Button onClick={handleDownload} sx={{ width: '70%' }}>
      <img src={`src/assets/${libro}.png`} style={{ width: '70%' }} />
    </Button>
  </Grid>
}