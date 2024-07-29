import { useCookies } from "react-cookie";
import Footer from "./Footer";
import Stats from "./Stats";

function Home() {
  const [cookies] = useCookies(["user"]);

  return (
    <>
      <div className="bg-white flex items-start justify-center">
        <div>
          <div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <div className="hidden sm:mt-2 sm:flex lg:mt-4"></div>
              <h1 className="lg:mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:mt-4 sm:text-6xl">
                Flower Empower
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Flower Empower is a program by Dream Foundation. Its a
                volunteer-run organization with the mission of brightening
                peoples lives through flowers that local growers donate.Every
                Saturday, we take the donated flowers, turning them into
                beautiful bouquets, paired with a homemade card and treat, to be
                delivered to recipients from Goleta to Carpinteria.
              </p>
              {!cookies.token ? (
                <div className="lg:mt-32 md:mt-20 mt-16  gap-x-6 text-center">
                  <a
                    href="/login"
                    className="rounded-md bg-pink-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-600"
                  >
                    Start Volunteering now
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Stats />
      <Footer />
    </>
  );
}

export default Home;
