import {
    Chart,
    Colors,
    BarController,
    BarElement,
    LinearScale,
    Title,
    CategoryScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { DateTime } from 'luxon'
import 'chartjs-adapter-luxon'

import { useEffect, useState } from 'react'

import { collection, getDocs, limit, getFirestore, orderBy, query, QuerySnapshot, where, onSnapshot } from 'firebase/firestore'
import createFirebaseApp from '../utils/firebaseClient'

//const MAX_LOOKUP_DATE = DateTime.now().minus({'hours':12});

Chart.register(
    Colors,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
    Title
)

function registerChart(dataset) {
    const options = {
        scales: {
            x: {
                type: 'category'
            },
            y: {
                type: 'linear',
                min: 11,
                max: 53,
                display: false,
            }
        },
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Keramaian Kantek',
                color: '#D7D6D6'
            },
        },
    }

    return (
        <Bar options={options} data={dataset}/>
    )
}
/**
 * Turns a querysnapshot into a compatible dataset for Chart.js
 * @param {QuerySnapshot.<import('firebase/firestore').DocumentData>} dataSnapshot
 * 
 */
function formatData(dataSnapshot) {
    let data = {
        labels: [],
        datasets: [
            {
                label: 'Keramaian',
                data: []
            }
        ]
    };

    dataSnapshot.forEach((doc) => {
        data.labels.push(DateTime.fromJSDate(doc.get('time').toDate()).toFormat('T'));
        data.datasets[0].data.push(doc.get('counts'));
    })

    return data;
}

export default function KantekChart() {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState(undefined);

    useEffect(() => {
        async function run() {
            setLoading(true);
            const db = getFirestore(createFirebaseApp());
            const countColl = collection(db, 'counts');
            const q = query(countColl, orderBy("time", "desc"), where('id', '==', 'kantek'), limit(25));

            onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.empty) setData(null);
                else {
                    setData(formatData(querySnapshot));
                }
            })
            setLoading(false);
        }
        run();
    }, []);

    if (isLoading || data === undefined) return (<p>Loading...</p>)
    else if (data === null) return (<p>Error!</p>)



    return (
        registerChart(data)
    )
}

