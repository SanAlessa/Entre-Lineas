import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <div className="footerLeft">
      <Link to="/"><div className="prueba"></div></Link>{/* <Link to="/"><img src={'../assets/Logo-EntreLineas-Pluma-inclinada.png'} className="logo" alt='logo Entre Líneas'></img></Link> */}
      </div>
      <div className="footerRight">
        <p>© 2020 Entre Líneas.</p>
        <div className="socialNetworks">
          <a href="https://www.facebook.com/">
            <i className="fab fa-facebook-f" style={{ color: "#3b5998" }}></i>
          </a>
          <a href="https://twitter.com/">
            <i className="fab fa-twitter" style={{ color: "#00acee" }}></i>
          </a>
          <a href="https://www.instagram.com/">
            <i className="fab fa-instagram" style={{ color: "black" }}></i>
          </a>
          <a href="https://www.youtube.com/">
            <i className="fab fa-youtube" style={{ color: "#c4302b" }}></i>
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer