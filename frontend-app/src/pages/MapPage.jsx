import React, { useState, useEffect } from 'react'
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl'
import axios from "axios"
import 'mapbox-gl/dist/mapbox-gl.css'
import { format } from 'timeago.js'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import './mappage.css'


const MapPage = () => {
    const [showPopup, setShowPopup] = useState(true)
    const [pins, setPins] = useState([])

    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get("http://localhost:8800/api/pins");
                setPins(allPins.data);
            } catch (err) {
                console.log(err);
            }
        }
        getPins()
    }, [])

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <Map
                mapboxAccessToken={process.env.REACT_APP_MAPBOX}
                initialViewState={{
                    longitude: 79.861244,
                    latitude: 6.927079,
                    zoom: 2
                }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <NavigationControl position='top-right' />

                {pins.map(p => (

                    <>
                        <Marker latitude={p.lat} longitude={p.long} anchor="bottom" >
                            <LocationOnIcon style={{ fontSize: visualViewport.zoom * 10, color: 'slateblue' }} />
                        </Marker>

                        {showPopup && (
                            <Popup latitude={p.lat} longitude={p.long} key={p._id}
                                anchor="left"
                                onClose={() => setShowPopup(false)}>
                                <div className="card">
                                    <label>Place</label>
                                    <h4 className="place">{p.title}</h4>
                                    <label>Review</label>
                                    <p className="desc">{p.desc}</p>
                                    <label>Rating</label>
                                    <div className="stars">
                                        {Array(p.rating).fill(<StarIcon className="star" />)}
                                    </div>
                                    <label>Information</label>
                                    <span className="username">
                                        Created by <b>{p.username}</b>
                                    </span>
                                    <span className="date">{format(p.createdAt)}</span>
                                </div>
                            </Popup>)}
                    </>
                ))}

            </Map>
        </div>
    )
}
export default MapPage
