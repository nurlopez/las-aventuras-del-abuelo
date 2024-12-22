import React from "react";
import { Link } from "react-router-dom";

import "./HomePage.css";
import cover_bekit_selidang from "../assets/cover_Sarawak.png";
import cover_wall_china from "../assets/cover_Wall.png";
import cover_syria from "../assets/cover_Syria.png";

function HomePage() {
    return (
        <div className="home-container">
            <h1>Las aventuras del abuelo</h1>
            <br/>

            <div className="journals-container">

                <div className="journal-item">
                    <Link to="/bukit-selidang">
                        <img
                            src={cover_bekit_selidang}
                            alt="Bukit Selidang Journal Cover"
                            className="journal-cover"
                        />
                    </Link>
                    <p className="journal-title">Meseta del Usun Apau <br /> Sarawak, Borneo, 1992.</p>
                </div>

                <div className="journal-item">
                    <img
                        src={cover_wall_china}
                        alt="Another Journal Cover"
                        className="journal-cover"
                    />
                    <p className="journal-title">Gran Muralla China <br /> Jinshanling a Simatai, 2000.</p>
                </div>

                <div className="journal-item">
                    <img
                        src={cover_syria}
                        alt="Future Journal Cover"
                        className="journal-cover"
                    />
                    <p className="journal-title">El desierto de Siria<br />Palmira a Damasco, 2003.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
