
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


function App() {



  const [currentValue, setCurrentValue] = useState("??");
  const [isVisible, setVisible] = useState(true);


  const getPrice = async() => {


    setTimeout(() => { setVisible(true); }, 1000)

   

    setTimeout(async () => {
      var data = await fetch("https://api.coinbase.com/v2/prices/spot?currency=USD");
      data = await data.json()
      console.log(data["data"]["amount"]);
      
      if(data["data"]["amount"].toString()===currentValue.toString()){

      }
      else{
        setVisible(false);
        setTimeout(()=>{setCurrentValue(data["data"]["amount"])},800);
      }
      
      getPrice();

    }, 10000);

  }


  useEffect(async () => {
    var data = await fetch("https://api.coinbase.com/v2/prices/spot?currency=USD");
    data = await data.json()
    console.log(data["data"]["amount"]);
    setCurrentValue(data["data"]["amount"])
    getPrice();
  }, []);





  return (
    <div style={{fontFamily:"Work Sans"}} className="flex flex-col bg-cover bg-center justify-center items-center h-screen w-screen bg-[url('https://media2.giphy.com/media/hK61m7SawMkqUcyLg1/giphy.gif?cid=790b7611e2877a159a4defbe33d0966d8da624c9afbfed86&rid=giphy.gif&ct=g')] ">


      <div className="flex flex-col justify-center items-center bg-[#1C658C]/80 backdrop-blur-md  h-full w-full">
        <div className="text-4xl md:text-6xl font-bold text-[#FFD32D]/90">
          Bitcoin is now at
        </div>

        <div style={{fontFamily:"Work Sans"}} className="h-48 md:h-96 w-full flex justify-center items-center">
          <AnimatePresence>

          
          {
            (currentValue+"$").toString().split('').map((char,index)=>{
              return(
                <div>
                  {isVisible && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 0, y: 20+(index*10) }}
                    animate={{ opacity: 1, x: 0, y: 0}}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5,repeat:0}}

                    
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
      </div>

    </div>
  );
}

export default App;
