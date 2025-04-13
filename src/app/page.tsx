import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Timeline from "../../components/Timeline";

export default function Home() {
  return (
      <>
        <Header />
          <main className="flex-grow">
            <Timeline />
          </main>
        <Footer />
      </>
  );
}
