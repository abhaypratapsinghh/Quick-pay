import AppBar from "../UI components/appBar"
import BalanceBar from "../UI components/balanceBar"
import Users from "../UI components/users"
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => async () => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
      location.reload();
      }
      const data = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/account/balance",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      console.log(data);
      if (!data.data.signedIn) {
        navigate("/signup");
      }
        setAmount(data.data.balance);
        
    });
    return (
        <div className="bg-slate-100 p-5">
            <AppBar />
            <hr/>
            <BalanceBar value={amount} />
            <Users/>
        </div>
    )
}