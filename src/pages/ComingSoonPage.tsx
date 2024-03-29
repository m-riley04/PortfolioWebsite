import {motion} from "framer-motion";
import { useState, useEffect } from "react";
import workingGifSrc from "../../assets/working.gif";
import sadCatSrc from "../../assets/crying-cat.jpg";
import loadingSrc from "../../assets/loading.gif";

/** 
 * The page that is displayed on the pages that are still being worked on.
*/
function ComingSoonPage() {
    // Hooks
    const [catSrc, setCatSrc] = useState(loadingSrc);

    // Fetch the random cat image from TheCatApi
    const fetchRandomCatImage = () => {
        const apiUrl = "https://api.thecatapi.com/v1/images/search";
        fetch( apiUrl )
            .then((response) => response.json())
            .then((data) => {
                console.log(`Cat Url: ${data["0"]["url"]}`)
                setCatSrc(data["0"]["url"])
            })
            .catch((error) => {
                setCatSrc(sadCatSrc)
                console.error(error);
            });
    }

    // Fetch a random image on page-load
    useEffect(() =>{
        fetchRandomCatImage();
    }, []);

    return (
        <motion.div 
            className="coming-soon"
            
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <div id="coming-soon">
                <h1>Coming soon...</h1>
                <a href="https://giphy.com/stickers/work-5240-5240work-ZuorNU99NFvIrh8V10" target="_blank" rel="noreferrer"><img src={workingGifSrc}></img></a>
                <p>This page is currently under construction. I am working hard to keep this site maintained and fresh. I apologize for any inconvenience.</p>
                <br></br>
                <br></br>
                <p>In the meantime, here is a randomly generated cat using <a href="https://thecatapi.com/" target="_blank" rel="noreferrer">TheCatAPI</a>.</p>
                <br></br>

                <div id="cat-container">
                    <img src={catSrc}></img>
                    <button className="clickable" onClick={() => {
                        fetchRandomCatImage();
                        setCatSrc(loadingSrc);
                    }}>Generate a new cat.</button>
                </div>

            </div>
        </motion.div>
    );
}

export default ComingSoonPage;