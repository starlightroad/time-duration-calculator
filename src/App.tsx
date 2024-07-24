import Container from '@/src/ui/container';
import Background from '@/src/ui/background';
import Calculator from './ui/calculator';
import Title from '@/src/ui/title';
import StoreProvider from '@/src/providers/store-provider';

export default function App() {
  return (
    <StoreProvider>
      <Background>
        <Container>
          <div className="pt-4">
            <main>
              <Title>Time Duration Calculator</Title>
              <Calculator />
            </main>
          </div>
        </Container>
      </Background>
    </StoreProvider>
  );
}
