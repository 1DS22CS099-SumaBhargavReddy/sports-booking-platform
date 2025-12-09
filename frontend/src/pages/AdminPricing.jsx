import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminPricing() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/pricing").then(res => setRules(res.data));
  }, []);

  const toggleRule = async (id) => {
    const res = await axios.patch(`http://localhost:5000/api/pricing/${id}/toggle`);
    setRules(rules.map(r => r._id === id ? res.data : r));
  };

  return (
    <div>
      <h1>Admin Pricing Configuration</h1>
      {rules.map(r => (
        <div key={r._id} style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
          <h3>{r.name}</h3>
          <p>Type: {r.type}</p>
          {r.multiplier && <p>Multiplier: {r.multiplier}</p>}
          {r.surcharge && <p>Surcharge: {r.surcharge}</p>}
          <p>Status: {r.enabled ? "Enabled" : "Disabled"}</p>
          <button onClick={() => toggleRule(r._id)}>
            {r.enabled ? "Disable" : "Enable"}
          </button>
        </div>
      ))}
    </div>
  );
}
