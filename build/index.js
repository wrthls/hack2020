import SimpleBotDesktop from "./simplebotdesktop";
import SimpleBotMobile from "./simplebotmobile";
import React, {Component} from "react";
import FiveG_logo from './img/logo.png';
import VirusHack_logo from './img/logovirushack.svg';
import withAdaptiveSizes from 'react-adaptive-size';
import "./style.css"

class MainPage extends Component {

    render() {
        if (window.innerHeight > window.innerWidth){
        return (
            <body>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                <div>
                <SimpleBotMobile/>
                </div>
                </body>)
        } else {
            return (
                <body>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
                <div>
                <SimpleBotDesktop/>
                </div>
                </body>
        )}
    }

}
export default withAdaptiveSizes(MainPage);



// class MainPage extends Component {
//
//     render() {
//         if (window.innerHeight > window.innerWidth){
//             return (
//                 <div className="hide_overflow">
//                 <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
//                 // <div className="hide_overflow">
//                 //     <nav className="navbar navbar-light zoomed color_nav">
//                 //         <a className="navbar-brand mr-0" href="https://virushack.ru/">
//                 //                 <img src={FiveG_logo} width="" height="78"
//                 //                      className="image_opt d-inline-block align-top" alt=""/>
//                 //         </a>
//                 //         <a className="navbar-brand mr-0" href="https://virushack.ru/">
//                 //             <img src={VirusHack_logo} width="" height="68"
//                 //                 className="image_opt d-inline-block align-top" alt=""/>
//                 //         </a>
//                 //     </nav>
//                 // </div>
//                 <div className="d-flex justify-content-center mt-0 row">
//                 <SimpleBotMobile/>
//                 </div>
//                 <div>
//
//                 </div>
//                 </div> )
//         } else {
//             return (
//                 <div className="hide_overflow">
//                 // <div className="hide_overflow">
//                 //     <nav className="navbar navbar-light color_nav">
//                 //         <a className="navbar-brand mr-0" href="https://virushack.ru/">
//                 //             <img src={FiveG_logo} width="" height="78"
//                 //         className="d-inline-block align-top" alt=""/>
//                 //         </a>
//                 //         <a className="navbar-brand mr-0" href="https://virushack.ru/">
//                 //             <img src={VirusHack_logo} width="" height="68"
//                 //         className="d-inline-block align-top" alt=""/>
//                 //         </a>
//                 //     </nav>
//                 // </div>
//                 <div className="d-flex justify-content-center mt-3 row">
//                 <SimpleBotDesktop/>
//                 </div>
//                 // <div className="footer-copyright text-center py-3">
//                 // </div>
//                 </div>
//         )}
//     }
//
// }