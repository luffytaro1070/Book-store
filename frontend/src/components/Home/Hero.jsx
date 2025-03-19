import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-16">
      {/* Left Side - Text Content */}
      <div className="text-left max-w-2xl text-top">
        <h1 className="lg:text-[52px] text-[40px] font-semibold text-yellow-100 mb-2">
          Discover your next read
        </h1>
        <p className="mt-2 md:mt-3 text-[21px] md:text-[23px] text-zinc-300 leading-relaxed">
          Uncover exciting stories, enriching knowledge, and inspiring experiences in our
          vast collection of books.
        </p>
        <div className="mt-6">
          <Link 
            to="/all-books" 
            className="text-yellow-100 font-semibold text-[20px] lg:text-[22px] border border-yellow-100 px-8 py-3
            rounded-full hover:bg-yellow-100 hover:text-black transition duration-300 ease-in-out"
          >
            Discover Books
          </Link>
        </div>
      </div>


      <div className="mt-10 ">
        <img 
          src="https://cdn.dribbble.com/userupload/4488163/file/original-10106973d919ba6b19473d47fc07bb7c.png?resize=1024x768&vertical=center" 
          alt="Books and Reading" 
          className="max-w-full h-auto rounded-2xl opacity-80"
        />
      </div>
    </section>
  );
};

export default HeroSection;
