import React,{useEffect,useState} from 'react'
import {  useNavigate } from "react-router-dom";
import axios  from 'axios'
import Spinner from "./Spinner";

function FollowPost() {
  let navigate = useNavigate();
  const [userid,setUserid] = useState([]);
  const [posts,setPosts] = useState([]);
  const [loding,setLoding] = useState(true);
  const Fetchpost = async () =>{
     let token = localStorage.getItem("devroom");
     if(!token) 
     {
       navigate("/users/login");  
     }
    let data = await axios.get("/api/users/followpt",{
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("devroom")}`,
          }
    })
    setUserid(data.data.user);
    setPosts(data.data.post);
    setLoding(false);
  }
  useEffect(()=>{
    Fetchpost();
  },[]);
  return (
    <>
      { loding ? (<Spinner /> ) : (posts.map((post) =>{
        return (
          <>
             {userid.includes(post.user) ? <div className="card my-2" key={post._id}>
                            <div className="card-body bg-light-grey">
                              <div className="row">
                                <div className="col-md-2">
                                  <img
                                    src={post.user.avatar}
                                    alt=""
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                  />
                                  <br />
                                  <small>{post.name}</small>
                                </div>
                                <div className="col-md-8">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <img
                                        src={post.image}
                                        alt=""
                                        className="img-fluid d-block m-auto"
                                      />
                                    </div>
                                  </div>
                                  <p style={{ fontWeight: "bold" }}>
                                    {post.text}
                                  </p>
                                  <br />
                                </div>
                              </div>
                            </div>
                          </div> : ""}
          </>
        )  
      }) )}
    </>
  )
}

export default FollowPost