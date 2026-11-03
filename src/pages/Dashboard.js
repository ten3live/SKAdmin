import React,{useState,useEffect,useCallback} from "react";
import theme, { WEB } from "../theme";
import {
  BarChart,
  Bar,
  Pie,
  PieChart,
  Sector,
  XAxis,
  YAxis,
  Cell,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList
} from "recharts";
import CustomNavbar from "./Navbar";


export default function App() {
  const [user, setUser] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [count, setCount] = useState(0);
  const [totalMatchmakers, setTotalMatchmakers] = useState(0);

  const [clientCount, setClientCount] = useState(0);
  const [totalMale, setTotalMale] = useState(0);
  const [totalFemale, setTotalFemale] = useState(0);
 

  const calculateCounts = (data) => {
    const usersCount = data.filter((client) => client.role !== "matchmaker").length;
    const matchmakersCount = data.filter((client) => client.role === "matchmaker").length;
  
    setTotalUsers(usersCount);
    setTotalMatchmakers(matchmakersCount);
  };
  const calculateCountsClients = (data) => {
    const maleCount = data.filter((client) => client.gender !== "female").length;
    const femaleCount = data.filter((client) => client.gender === "female").length;
  
    setTotalMale(maleCount);
    setTotalFemale(femaleCount);
  };
  const GetUser = () => {
    const users = localStorage.getItem("user");
    const data = JSON.parse(users);
    if (data) {
      setUser(data);
      fetch(`${WEB.Backend}getusers`)
        .then((response) => response.json())
        .then((data2) => {
          setCount(data2.data.length);
          calculateCounts(data2.data); // Calculate the counts here
        })
        .catch((error) => console.log(error));
      fetch(`${WEB.Backend}clients/search`)
        .then((response) => response.json())
        .then((data1) => {
          setClientCount(data1.data.length);
          calculateCountsClients(data1.data); // Calculate the counts here
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    GetUser();
  }, []);

  const data = [
    {
      name: "App Users",
      Candidates: totalUsers,
      Matchmakers: totalMatchmakers,
      amt: count
    }
  ];
  const data2 = [
    {
      name: "App Profiles",
      Male: totalMale,
      Female: totalFemale,
      amt: clientCount
    }
  ];
  
  const piedata = [
   
      { name: "Candidates", value: totalUsers },
      { name: "Matchmakers", value: totalMatchmakers },
      { name: "Female Clients", value: totalFemale },
      { name: "Male Clients", value: totalMale }
   
  ];
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );  
 
  
  const COLORS = ["#22c55e", "#a855f7",  "#ec4899","#eab308"];



  return (<><CustomNavbar/>
      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
  <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
    Welcome, Admin {user && user.name}
  </h2>
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Total Users</p>
      <p className="text-3xl font-bold">{count}</p>
    </div>
    <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Candidates</p>
      <p className="text-3xl font-bold">{totalUsers}</p>
    </div>
    <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Matchmakers</p>
      <p className="text-3xl font-bold">{totalMatchmakers}</p>
    </div>
    <div className="bg-indigo-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Total Profiles</p>
      <p className="text-3xl font-bold">{clientCount}</p>
    </div>
    <div className="bg-yellow-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Male Clients</p>
      <p className="text-3xl font-bold">{totalMale}</p>
    </div>
    <div className="bg-pink-500 text-white p-4 rounded-lg shadow-md">
      <p className="text-sm uppercase font-semibold">Female Clients</p>
      <p className="text-3xl font-bold">{totalFemale}</p>
    </div>
  </div>

</div>
<div style={{display:'flex'}}>
    <BarChart
      width={200}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="amt" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Candidates" fill="#22c55e" minPointSize={5}/>
        
      <Bar dataKey="Matchmakers" fill="#a855f7" minPointSize={10} />
    </BarChart>
    <BarChart
      width={200}
      height={300}
      data={data2}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis dataKey="amt" />
      <Tooltip />
      <Legend />
      <Bar dataKey="Male" fill="#eab308" minPointSize={5}/>
       
      
      <Bar dataKey="Female" fill="#ec4899" minPointSize={10} />
    </BarChart>
    

    </div>
  

    
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={piedata}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {piedata.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
      </Pie>
    </PieChart>
   
    </>
  );
}
