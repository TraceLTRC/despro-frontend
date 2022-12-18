import { collection, getDocs, getFirestore, limitToLast, onSnapshot, orderBy, query, QuerySnapshot } from "firebase/firestore";
import { Progress, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { scale } from "../utils/scale";

import createFirebaseApp from "../utils/firebaseClient"

const BAT_MIN = 3.5;
const BAT_MAX = 4.2;

function getBatteryColor(batValue) {
    if (batValue >= 3.9) {
        return 'green';
    } else if (batValue > 3.7) {
        return 'yellow';
    } else {
        return 'red';
    }
}

/**
 * 
 * @param {QuerySnapshot<import("@firebase/firestore").DocumentData>} dataSnapshot 
 * @returns 
 */
function getBatteryFromDoc(dataSnapshot) {

    let doc = dataSnapshot.docs[0];
    if (!doc.exists()) return 0;

    const bat = doc.get('bat') ?? BAT_MIN;
    const color = getBatteryColor(bat);

    return [scale(bat, BAT_MAX, BAT_MIN, 100, 0), color];
}

export default function KantekBattery() {
    const [progColor, setProgColor] = useState('red');
    const [batValue, setBatValue] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function run() {
            setLoading(true);
            
            const db = getFirestore(createFirebaseApp());
            const col = collection(db, 'counts');
            const q = query(col, limitToLast(1), orderBy('time', 'asc'));

            onSnapshot(q, (docs) => {
                const [bat, color] = getBatteryFromDoc(docs);
                setBatValue(bat);
                setProgColor(color);
            })

            setLoading(false);
        }
        run();
    }, []);

    if (isLoading || batValue === null) {
        return <Spinner size="xl"/>;
    }

    return (
        <div className="px-6 md:px-16 lg:px-32 xl:px-56 mt-2">
            <div className="text-center text-xl tracking-tight font-light mb-2">
                Status Baterai
            </div>
            <Progress progress={batValue} color={progColor}/>
        </div>
    )
}