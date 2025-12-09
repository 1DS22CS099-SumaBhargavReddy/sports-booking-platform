import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminResources() {
  const [coaches, setCoaches] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/coaches").then(res => setCoaches(res.data));
    axios.get("http://localhost:5000/api/equipment").then(res => setEquipment(res.data));
    axios.get("http://localhost:5000/api/courts").then(res => setCourts(res.data));
  }, []);

  const toggleCourt = async (id) => {
    const res = await axios.patch(`http://localhost:5000/api/courts/${id}/toggle`);
    setCourts(courts.map(c => (c._id === id ? res.data : c)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Resource Management</h2>

      <h3>Courts</h3>
      {courts.map(c => (
        <div key={c._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <p>{c.name} ({c.type})</p>
          <p>Status: {c.disabled ? "Disabled" : "Active"}</p>
          <button onClick={() => toggleCourt(c._id)}>
            {c.disabled ? "Enable" : "Disable"}
          </button>
        </div>
      ))}

      <h3>Coaches</h3>
      {coaches.map(co => (
        <div key={co._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <p>{co.name}</p>
          <p>Price: ₹{co.price}</p>
        </div>
      ))}

      <h3>Equipment</h3>
      {equipment.map(e => (
        <div key={e._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
          <p>Rackets: {e.rackets}</p>
          <p>Shoes: {e.shoes}</p>
        </div>
      ))}
    </div>
  );
}
