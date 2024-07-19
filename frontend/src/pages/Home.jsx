import { useCookies } from "react-cookie";
function Home() {
  const [cookies, setCookie] = useCookies(["user"]);
  console.log(cookies.token);
  console.log(cookies.issuperuser);
  // const token = Cookies.get("token");
  // const issuperuser = Cookies.get("issuperuser");
  // console.log(token);
  // console.log(issuperuser);
  return <div>HOME</div>;
}

export default Home;
