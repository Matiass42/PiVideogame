import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

export default function LandingPage () {
    return(
      <div className={style.container1}>
          <div className={style.text}>
              <h1>Welcome</h1>
              <h2>PI VIDEOGAMES</h2>
            <Link to='/home'>
              <button className={style.button}>Go</button>
            </Link>
          </div>  
      </div>
    )
}