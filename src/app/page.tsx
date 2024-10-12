import Banner from "./components/banner";
import BlogSection from "./components/blogsection";
// import Navbar from "./components/navbar";
// import Tabs from "./components/tabs";

const Home: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* <Navbar /> */}
      <Banner />
      {/* <Tabs />*/}
      <BlogSection /> 
    </div>
  );
};

export default Home;