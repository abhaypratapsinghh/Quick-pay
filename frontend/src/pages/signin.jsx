import Description from "../UI components/description";
import Heading from "../UI components/heading";
import InputArea from "../UI components/input";
import SubmitButton from "../UI components/submitButton";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios"

export default function Signin() {
    const navigate = useNavigate();

    useEffect(() => async() => {
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
        },[])

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex justify-center p-10 bg-slate-300 h-screen">
            <div className="border w-1/3 p-4 text-center bg-slate-100 rounded-lg">
                <Heading label={"Sign In"} />
                <Description label={"Enter your log in credentials"} />
                <InputArea onChange={(e)=>setUserName(e.target.value)} label={"Email"} placeholder={"email"} />
                <InputArea onChange={(e)=>setPassword(e.target.value)} label={"Password"} placeholder={"password"} />

                <SubmitButton onClick={Sign_in} label={"Sign in"} />

            </div>
        </div>
    );



    async function Sign_in() {
        const data = await axios({
          method: "POST",
            url: "http://localhost:3000/api/v1/user/signin",
            data: {
                username,
                password
          }
        });

        localStorage.setItem("token", data.data.token);

        location.reload();
    }
}