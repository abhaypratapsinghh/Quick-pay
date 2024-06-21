import { BottomWarning } from "../UI components/bottomWarning";
import Description from "../UI components/description";
import Heading from "../UI components/heading";
import InputArea from "../UI components/input";
import SubmitButton from "../UI components/submitButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  useEffect(
    () => async () => {
      const data = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/check",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (data.data.signedIn) {
        navigate("/dashboard");
      }
    },
    []
  );

  async function Sign_up() {
   const data= await axios({
      method: "post",
      url: "http://localhost:3000/api/v1/user/signup",
      data: {
        firstName,
        lastName,
        password,
        username,
      },
   });
    localStorage.setItem("token", data.data.token);
    console.log(data.data);
    if (data.data.signedIn) {
      navigate("/");
    }
    else {
      alert("enter valid details");
    }
   

    
  }

  return (
    <div className="flex justify-center p-10 bg-slate-300 h-screen">
      <div className="border w-1/3 p-4 text-center bg-slate-100 rounded-lg">
        <Heading label={"Sign Up"} />
        <Description
          label={"Enter your details to create your Paytm account"}
        ></Description>
        <InputArea
          onChange={(e) => setFirstName(e.target.value)}
          label={"First name"}
          placeholder={"first name"}
        />
        <InputArea
          onChange={(e) => setLastName(e.target.value)}
          label={"Last name"}
          placeholder={"last name"}
        />
        <InputArea
          onChange={(e) => setUserName(e.target.value)}
          label={"Email"}
          placeholder={"email"}
        />
        <InputArea
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={"password"}
          type={"password"}
        />

        <SubmitButton onClick={Sign_up} label={"Sign up"} />

        <BottomWarning
          label={"Already have an account ?"}
          buttonText={"Sign in"}
          to="/signin"
        />
      </div>
    </div>
  );
}



