
import { getTopCoins } from "../services/coinservice";
import Loading from "../components/layout/Loading";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


export const Dashboard = ()=>{

    const previousDataRef = useRef<any>(null);
    const [listChangeIds , setListChangeIds] = useState([])
    const [updateInfos , setUpdateInfos] = useState<string[]>([])

    const { data, isLoading, error } = useQuery({
        queryKey: ["coins"],
        queryFn: getTopCoins,
        refetchInterval: 15000, // auto refresh every 15s
        refetchIntervalInBackground: true,
    });

    useEffect(()=>{

        const infos = new Set<string>();

        if(!data) return;

        if(previousDataRef.current){

            data.map((coin:any)=>{

                //find in the previews data the coin
                const previousCoinValue = previousDataRef.current.find((c:any)=> c.id == coin.id);

                //compare the price of the previous and the new coin
                if(previousCoinValue && previousCoinValue.current_price > coin.current_price){

                    //add to the list of changed Ids
                    infos.add(`${coin.id} has decreased 🔴⬇ from ${previousCoinValue.current_price} to ${coin.current_price}` )
                }
                if(previousCoinValue && previousCoinValue.current_price < coin.current_price){

                    //add to the list of changed Ids
                    infos.add(`${coin.id} has increased 🟢⬆ from ${previousCoinValue.current_price} to ${coin.current_price}` )
                }
            })
        }

        setUpdateInfos(prev => [...prev , ...Array.from(infos)] )

        previousDataRef.current = data
    }, [data])

    //this useEffect clear the update updatedInfos array every 10 seconds
    useEffect(()=>{

        if(updateInfos.length===0) return;

        const timeout = setTimeout(() => {
            setUpdateInfos([]);
        }, 10000);

        return () => clearTimeout(timeout); //clear the timeout to avoir memory leak

    },[updateInfos])

    if(isLoading) return <Loading />
    if(error) return <p className="text-red-500">Une erreur est survenue !!</p>

    return(
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Top 10 Cryptocurrencies</h1>

            <div className="mb-5">
                <h4 className="text-xl font-bold underlined">Last updates </h4>
                <div className="border rounded-lg mb-5 pl-4">
                {updateInfos.map((info , index) =>(
                    <p className="text-lg" key={index}>{info}</p>
                ))}
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data.map((coin:any) => (
                    
                        <div key={coin.id} className="border rounded-lg p-4 hover:shadow-md transition flex flex-col items-center">

                            <img src={coin.image} alt={coin.name} className="w-12 h-12 mb-2" />
                            <h2 className="font-semibold">{coin.name}</h2>
                            <p>Price: ${coin.current_price.toLocaleString()}</p>
                            <p
                            className={
                                coin.price_change_percentage_24h >= 0
                                ? "text-green-500"
                                : "text-red-500"
                            }
                            >
                            24h: {coin.price_change_percentage_24h.toFixed(2)}%
                            </p>
                            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-3 py-1 px-4 rounded">
                                <Link to={`/coin/${coin.id}`}>Open detail</Link>
                            </button>
                        </div>
                    
                ))}
            </div>
        </div>
    )
}