import {
    Chart,
    Colors,
    BarController,
    BarElement,
    LinearScale,
    CategoryScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { DateTime } from 'luxon'
//import Annotation from 'chartjs-plugin-annotation'
import 'chartjs-adapter-luxon'

import { useEffect, useState } from 'react'

import { collection, getDocs, limit, getFirestore, orderBy, query, QuerySnapshot, where, onSnapshot } from 'firebase/firestore'
import createFirebaseApp from '../utils/firebaseClient'

import { Spinner } from 'flowbite-react'

import { perc2color, scale } from '../utils/scale'

const MIN_Y = 0;
const MAX_Y = 40;

Chart.register(
    Colors,
    BarController,
    BarElement,
    CategoryScale,
    LinearScale,
)

function registerChart(dataset) {
    const options = {
        scales: {
            x: {
                type: 'category',
                ticks: {
                    maxRotation: 0,
                    minRotation: 0,
                    color: '#fbfbfe',
                }
            },
            y: {
                type: 'linear',
                min: MIN_Y,
                max: MAX_Y,
                display: false,
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            annotation: {
                annotations: {
                    box1: {
                        type: "box",
                        yMin: 48,
                    }
                }
            }
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
                data: [],
                backgroundColor: [],
            }
        ]
    };

    dataSnapshot.docs.reverse().forEach((doc) => {
        data.labels.push(DateTime.fromJSDate(doc.get('time').toDate()).toFormat('T'));
        data.datasets[0].data.push(doc.get('counts'));
        data.datasets[0].backgroundColor.push(perc2color(scale(doc.get('counts'), MAX_Y, MIN_Y, 0, 100)))
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

    if (isLoading || data === undefined) return (<Spinner size="xl"></Spinner>)
    else if (data === null) return (<p>Error!</p>)



    return (
        registerChart(data)
    )
}

