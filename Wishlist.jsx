import {useAuth} from "../../context/auth";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { AiTwotoneLike } from "react-icons/ai";
import { AiTwotoneDislike } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Wishlist = ({ad}) => {
  /* context */
  const [auth, setAuth] = useAuth();

  /* navigate hook */
  const navigate = useNavigate();

  const handleLike = async () => {
    try {
      if (auth.user === null){
        navigate("/login", {
          state: `/ad/${ad.slug}`,
       });
        return;
      }
      const {data} = await axios.post("/wishlist", {adId: ad._id });
      setAuth({...auth, user: data});
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth",JSON.stringify(fromLS));
      toast.success("Added to wishlist");
    } catch(err) {
        console.log(err);
    }
  } 
  const handleUnlike = async () => {
    try {
      if (auth.user === null){
        navigate("/login", {
           state: `/ad/${ad.slug}`,
        });
        return;
      }
      const {data} = await axios.delete(`/wishlist/${ad._id}`);
      setAuth({...auth, user: data});
      const fromLS = JSON.parse(localStorage.getItem("auth"));
      fromLS.user = data;
      localStorage.setItem("auth",JSON.stringify(fromLS));
      toast.error("Removed from wishlist");
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <div> 
        {auth.user?.wishList?.includes(ad?._id) ? 
            <span onClick={handleUnlike}> <FcLike className="h2 mt-2 pointer" /> (<AiTwotoneLike className="h2 mt-2 pointer" />) </span> : 
            <span onClick={handleLike}> <FcLikePlaceholder className="h2 mt-2 pointer" /> (<AiTwotoneDislike className="h2 mt-2 pointer" />) </span> }
    </div>
  )
}

export default Wishlist
