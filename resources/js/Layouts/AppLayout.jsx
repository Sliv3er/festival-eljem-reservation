import Header from '../Components/Header';
import Footer from '../Components/Footer';
import FloatingHelpButton from '../Components/FloatingHelpButton';

export default function AppLayout({ children, transparentHeader = false }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header transparent={transparentHeader} />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingHelpButton />
    </div>
  );
}
