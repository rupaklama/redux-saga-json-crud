import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { loadUsersStart } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsersStart());
  }, [dispatch]);

  return <div>Home</div>;
};

export default Home;
