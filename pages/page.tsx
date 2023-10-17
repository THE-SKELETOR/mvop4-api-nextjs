import { useState } from "react";
import { ipThings } from ".";

function Loading() {
    return (
    <div>
      Data is Loading...
    </div>
    )
  }  

export default function IpInputForm() {
    const [input, setInput] = useState('');
    const [data, setData] = useState<ipThings|null>(null)
    const [isLoading, setLoading] = useState<boolean>(false)

  const handleSubmit = () => {
        setLoading(true)
        if (input) {
          fetch(`https://ipapi.co/${input}/json`)
            .then((res) => {
              if (!res.ok) {
                throw new Error('Network response was not ok');
              }
              return res.json();
            })
            .then((data) => {
              setData(data);
              console.log(data)
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching data:', error);
              setLoading(false);
            });
        }

  };

    return (
        <div>
            <a href="/">take me away</a>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter an IP address"
          />
          <button type="submit" onClick={handleSubmit}>Submit</button>
          {isLoading === true ? <Loading/> : null}
          {data != null ? <div>
            {Object.entries(data).map(([key, value]) => (
                <div key={key}>
                <strong>{key}:</strong> {typeof value === 'boolean' ? value.toString() : value}
                </div>
                ))}
            </div>: null}
        </div>
      );
}
