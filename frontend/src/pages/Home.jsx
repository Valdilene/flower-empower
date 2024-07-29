import Background from "../assets/img/flowerEmpowerBackground.jpg";
import {NavLink} from "react-router-dom";

function Home() {

  return (<div>

    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
          alt=""
          src={Background}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center filter blur-sm opacity-90 "
      />
      <div
          aria-hidden="true"
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
            style={{
              clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
          aria-hidden="true"
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
            style={{
              clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto  px-6 lg:px-8">
        <div className="mx-auto  lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-pink-700 sm:text-6xl">Flower Empower</h2>
          <p className="mt-6 text-lg leading-8 text-white w-100 font-semibold">
            Flower Empower is a program by Dream Foundation. Its a volunteer-run organization with the mission of
            brightening peoples lives through flowers that
            local growers donate.Every Saturday, we take the donated flowers, turning them into beautiful
            bouquets, paired with a homemade card and treat, to be delivered to recipients from Goleta to
            Carpinteria.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div
              className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <NavLink to={"/login"}>
              {} <span aria-hidden="true">Contribute Now&rarr;</span>
            </NavLink>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            <div key={""} className="flex flex-col-reverse">
              <dt className="text-base leading-15 font-semibold">Total Volunteers till contribute</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">50</dd>

            </div>
            <div key={""} className="flex flex-col-reverse">
              <dt className="text-base leading-15 font-semibold">Total Bouquet till deliver</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">50</dd>

            </div>
            <div key={""} className="flex flex-col-reverse">
              <dt className="text-base leading-15 font-semibold">Our Happy Recipients</dt>
              <dd className="text-4xl font-bold leading-9 tracking-tight text-white">50</dd>

            </div>
          </dl>
        </div>
      </div>
    </div>

    <footer
        className="bg-zinc-50 text-center text-surface/75 dark:bg-neutral-700 dark:text-white/75 lg:text-left mt-28">
      <div
          className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-white/10 lg:justify-between">
        <div className="me-12 hidden lg:block">
          <span>Get connected with us on social networks</span>
        </div>

        <div className="flex justify-center">
          <a href="https://www.facebook.com/Dreamfoundation" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 320 512">

              <path
                  d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>
            </svg>
          </a>
          <a href="https://x.com/i/flow/login?redirect_after_login=%2Fdreamfound"
             className="me-6 [&>svg]:h-4 [&>svg]:w-4 ">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 512 512">

              <path
                  d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/dream_foundation/" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 448 512">
              <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/channel/UCM1KWec41wSxw6mW5jTxggA" className="me-6 [&>svg]:h-4 [&>svg]:w-4">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 576 512">
              <path
                  d="M549.655 124.083C534.741 82.265 499.897 51.197 457.674 41.99 407.51 31.253 288 31.253 288 31.253s-119.51 0-169.674 10.737C76.103 51.197 41.259 82.265 26.345 124.083 16.99 158.593 16.99 256 16.99 256s0 97.407 9.355 131.917c14.914 41.818 49.758 72.886 92.981 82.093 50.164 10.737 169.674 10.737 169.674 10.737s119.51 0 169.674-10.737c43.223-9.207 78.067-40.275 92.981-82.093 9.355-34.51 9.355-131.917 9.355-131.917s0-97.407-9.355-131.917zM232 336.052V175.948L392 256l-160 80.052z"/>
            </svg>
          </a>

        </div>
      </div>


      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">


          <div>
            <h6
                className="mb-4 flex justify-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <p className="mb-4 flex items-center justify-center md:justify-start">
          <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
              <path
                  d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
              <path
                  d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
            </svg>
          </span>
              1528 Chapala Street, Suite 304, Santa Barbara, CA 93101
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
          <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
              <path
                  d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
              <path
                  d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
            </svg>
          </span>
              flowerempower@dreamfoundation.org
            </p>
            <p className="mb-4 flex items-center justify-center md:justify-start">
          <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor">
              <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                  clipRule="evenodd"/>
            </svg>
          </span>
              888-437-3267
            </p>

          </div>
        </div>
      </div>

      <div className="bg-black/5 p-6 text-center">
        <span>Proudly built and maintained by Flower Empower Team © 2024 | All Rights Reserved</span>
      </div>
    </footer>
  </div>);
}

export default Home;
