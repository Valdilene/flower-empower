import { useCookies } from "react-cookie";
import Footer from "./Footer";
import Stats from "./Stats";
import Illustration from "../assets/img/reshot-illustration-isometric-customer-feedback-illustration-FPM25ZD89U.png";
import Contact from "../components/Contact";

function Home() {
  const [cookies] = useCookies(["user"]);

  return (
    <>
      <div className="relative bg-white">
        <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
          <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:mr-7">
              <h1 className="mt-8  text-4xl font-bold tracking-tight text-gray-900 sm:mt-10 sm:text-6xl">
                Flower Empower
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Flower Empower is a program by Dream Foundation. Its a
                volunteer-run organization with the mission of brightening
                peoples lives through flowers that local growers donate. Every
                Saturday, we take the donated flowers, turning them into
                beautiful bouquets, paired with a homemade card and treat, to be
                delivered to recipients from Goleta to Carpinteria.
              </p>
              {!cookies.token ? (
                <div className="lg:mt-32 md:mt-20 mt-16  gap-x-6 text-center">
                  <a
                    href="/login"
                    className="rounded-md bg-purple-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500"
                  >
                    Start Volunteering now
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
            <img
              alt=""
              src={Illustration}
              className="aspect-[3/2] w-full blur-  bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            />
          </div>
        </div>
      </div>
      <Stats />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
