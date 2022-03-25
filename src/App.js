
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";


function App() {



  const [currentValue, setCurrentValue] = useState("??");
  const [graphData, setGraphData] = useState([
  ]);

  const [isVisible, setVisible] = useState(true);


  const getPrice = async () => {


    setTimeout(() => { setVisible(true); }, 1000)



    setTimeout(async () => {
      var data = await fetch("https://api.coinbase.com/v2/prices/spot?currency=USD");
      data = await data.json()
      console.log(data["data"]["amount"]);

      if (data["data"]["amount"].toString() === currentValue.toString()) {

      }
      else {
        setVisible(false);
        setTimeout(() => { setCurrentValue(data["data"]["amount"]) }, 800);
        var tempData = graphData;
        tempData.push(
          {
            name: Math.random().toString(),
            uv: parseInt(data["data"]["amount"]),
            pv: parseInt(data["data"]["amount"]),
            amt: parseInt(data["data"]["amount"]),
          },
        );
    
        setGraphData([...tempData]);
      }

      getPrice();

    }, 10000);

  }


  useEffect(async () => {
    var data = await fetch("https://api.coinbase.com/v2/prices/spot?currency=USD");
    data = await data.json()
    console.log(data["data"]["amount"]);
    setCurrentValue(data["data"]["amount"])

    var tempData = graphData;
    tempData.push(
      {
        name: Math.random().toString(),
        uv: parseInt(data["data"]["amount"]),
        pv: parseInt(data["data"]["amount"]),
        amt: parseInt(data["data"]["amount"]),
      },
    );

    setGraphData([...tempData]);

    getPrice();
  }, []);





  return (
    <div style={{ fontFamily: "Work Sans" }} className="flex flex-col bg-cover bg-center justify-center items-center h-screen w-screen bg-[url('https://media2.giphy.com/media/hK61m7SawMkqUcyLg1/giphy.gif?cid=790b7611e2877a159a4defbe33d0966d8da624c9afbfed86&rid=giphy.gif&ct=g')] ">


      <div className="flex flex-col justify-center items-center bg-[#1C658C]/80 backdrop-blur-md  h-full w-full">
        <div className="text-4xl md:text-6xl font-bold text-[#FFD32D]/90">
          Bitcoin is now at
        </div>


        <div className="flex flex-col">
          <div style={{ fontFamily: "Work Sans" }} className="h-48 md:h-48 w-full flex justify-center items-center">
            <AnimatePresence>


              {
                (currentValue + "$").toString().split('').map((char, index) => {
                  return (
                    <div>
                      {isVisible && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 0, y: 20 + (index * 10) }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, repeat: 0 }}


                          className="text-6xl md:text-[150px] font-bold text-[#FFD32D]/90 text-center">
                          {char}
                        </motion.div>

                      )}
                    </div>
                  )


                })
              }



            </AnimatePresence>

          </div>

          <div className="h-96 w-screen p-10">
            <ResponsiveContainer width={"100%"} height={"100%"}  >
              <LineChart width={200} height={100} data={graphData}>
              <CartesianGrid strokeDasharray="9 9" />

              <XAxis tick={false} dataKey="name" />
              <YAxis tick={false} stroke="white" domain={[graphData[0], graphData[graphData.length-1]]+10000} />
                <Line type="monotone" dataKey="pv" stroke="#FFD32D" strokeWidth={4} />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>

    </div>
  );
}

export default App;
