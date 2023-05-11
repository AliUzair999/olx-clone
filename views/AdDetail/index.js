import { useParams } from "react-router-dom"
import { db } from "../../config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"

import { useState } from "react"


export default function AdDetail(props) {
    const params = useParams()
    // console.log(params)
    const [data, setData] = useState(null)
    const navigate = useNavigate()


    const getAd = async () => {
        const docRef = doc(db, "ads", params.adId)
        const docData = await getDoc(docRef)
        setData(docData.data())
        // console.log(data)
    }

    useEffect(() => {
        getAd()
    }, [])

    if (!data) {
        return <><p>Loading</p></>
    }

    else {
        return <>
            <div>
                <h3>{data.title} </h3>
                <p>
                    {data.description}
                    <br /> price: USD.{data.price}
                    {/* {console.log(data.imagesURL)} */}
                    <br /> 
                    {data.imagesURL.map((val, ind) => {
                        return <>
                        <img key={ind} alt={"img" + (ind + 1)} src={val} width={200} height={200}  id={"img" + (ind + 1)} />
                        <br /> 
                        </>
                    })}

                </p>
                <button onClick={() => navigate('/dashboard', {replace:true}) }>Back to Dashboard</button>
            </div>

        </>
    }
}

