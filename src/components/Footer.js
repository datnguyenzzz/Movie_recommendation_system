import React from 'react';

const Footer = () => {
    return (
        <div className="container">
            <div className="row my-3 justify-content-center">
                <div className="col-auto">
                    <a href="#">
                        <i className="fa fa-facebook icon-footer"></i>
                    </a>
                </div>
                <div className="col-auto">
                    <a href="#">
                        <i class="fa fa-github icon-footer"></i>
                    </a> 
                </div>
                <div className="col-auto">
                    <a href="#">
                        <i class="fa fa-instagram icon-footer"></i>
                    </a> 
                </div>
                <div className="col-auto">
                    <a href="#">
                        <i class="fa fa-twitter icon-footer"></i>
                    </a> 
                </div>
                <div className="col-auto">
                    <a href="#">
                        <i class="fa fa-envelope icon-footer"></i>
                    </a> 
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-auto">
                    <p className="footer-font-credits">Credits: Special thanks to prof. <em>Sinyavin Anatoly Vladimirovich</em> from BMSTU Moscow Russia - who is supporting a lot of ideas to help to develop project, <a href="https://www.imdb.com/?ref_=nv_home" style={{color:"white"}}><em>IMDb Inc.</em></a> for providing amazing dataset, and high quality movie trailers from <a href="https://www.youtube.com/user/movieclipsTRAILERS" style={{color:"white"}}><em>#movieclipsTRAILERS</em></a> youtube channel.  </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-auto">
                    <p className="footer-font-last"> The project is for credits from university only, it wasn't for any commercial purpose. </p>
                </div>
            </div>

            <div className="row justify-content-center">
                <div className="col-auto">
                    <p className="footer-font-last"> 2021 academic coursework, BMSTU </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;