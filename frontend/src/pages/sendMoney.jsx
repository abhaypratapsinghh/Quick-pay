import Heading from "../UI components/heading";
import InputArea from "../UI components/input";
import SubmitButton from "../UI components/submitButton";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function SendMoney() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const firstName = queryParams.get("name");
  const id = queryParams.get("id");


  const [amount, setAmount] = useState(0);


  return (
    <div className="flex justify-center p-10 bg-slate-300 h-screen">
      <div className="border w-1/3 p-4 text-center bg-slate-100 rounded-lg">
        <Heading label={"Send"} />
        <div className="flex items-center">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mr-2">
            <div className="flex flex-col justify-center h-full text-xl">{firstName[0].toUpperCase()}</div>
                  </div>
            <div className="font-semibold text-lg">{firstName.toUpperCase()}</div>
        </div>

        <InputArea onChange={(e)=>setAmount(e.target.value) } label={"Amount(in Rs.)"} placeholder={"Enter Amount"} />

        <SubmitButton onClick={async () => {
          if (amount > 0) {
            const data = await axios({
              method: "POST",
              url: "http://localhost:3000/api/v1/account/transfer",
              data: {
                amount: amount,
                to: id
              },
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
          
            })
            alert(data.data.message+" you will be redirected back to dashboard after 2 seconds");
            setTimeout(() => {
              navigate("/dashboard");
            },2000)
          }
          else {
            alert("please enter amount");
          }
        }} label={"Inititate Transfer"} />
      </div>
    </div>
  );
}
