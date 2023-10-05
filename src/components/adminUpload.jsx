import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";


export default function Upload({name,email}) {

    console.log(name,email);

    const [title, settitle] = useState("");
    const [desc,setdesc] = useState("");
    const [background, setbackground] = useState("");
    const [price, setprice] = useState(0);
    const [category, setcategory] = useState("");
    const [videolink, setvideolink] = useState("");
    const [certificate,setcertificate] = useState(0);
    const [language , setlanguage] = useState("");
    const [coursefor , setcoursefor] = useState("");
    const [learnthis, setlearnthis] = useState("");
    const [prerequisites, setprerequisites] = useState("");
    const [count,setcount] = useState(0);

    function getContent(){

        var res = [];

        for(let i = 0; i < count; i++){
            const section = document.querySelector(`#add${i}`);
            const videos = section.querySelectorAll('.video');
            const sectiontitle = section.querySelector('#sectiontitle');

            var inputobj = {title : "",video:[]}
            inputobj.title = sectiontitle.value;
            videos.forEach((video) =>{
                const inputs = video.querySelectorAll('input');
                const videoobj = {videotitle :"",videolink :"",videodesc :""};
                inputs.forEach((input) =>{
                    videoobj[input.name] = input.value;
                })
                inputobj.video.push(videoobj);
            })

            res.push(inputobj);
        }

        return res;
    }

    const addvideo = (target) =>{
        console.log(`#add${target}`);
        const section = document.getElementById(`add${target}`);
        const videodiv = document.createElement("div");
        videodiv.classList.add("video");
        videodiv.innerHTML = `
            <div>
                <label>Video Title:</label>
                <input name="videotitle" type="text" className="textinput"/>
            </div>
            <div>
                <label>Video link:</label>
                <input name="videolink" type="text" className="textinput"/>
            </div>
            <div>
                <label>Video description:</label>
                <input name="videodesc" type="text" className="textinput"/>
            </div>
        `;
        section.appendChild(videodiv);
    }

    const addvideobtns = document.querySelectorAll(".addvideo");
    addvideobtns.forEach((addvideobtn , index) =>{
        addvideobtn.onclick = () => addvideo(index);
    })

    const addsection = (e) =>{
        e.preventDefault();
        const sectionWrapper = document.querySelector('.section-wrapper');
        const addContentDiv = document.createElement('div');
        addContentDiv.classList.add(`add-content`);
        addContentDiv.id = `add${count}`;
        addContentDiv.innerHTML = `
        <div id="section">
          <label >Section title:</label>
          <input name="title" type="text" id="sectiontitle" className="textinput"/>
        </div>
        <p class="addvideo">+ video</p>
        `;
        sectionWrapper.appendChild(addContentDiv);
        setcount(count + 1);
        getContent();
    }

    const handleCourse = () => {

        if (title === "" || background === "" || price === 0 || category === "") {
            toast.error("enter all the values");
        }

        const content = getContent();

        const upload = axios.post("https://eduvi.up.railway.app/uploadcourse", {
            title,
            desc,
            background,
            price,
            category,
            video : videolink,
            creator : name,
            email,
            certificate,
            language,
            content,
            coursefor,
            prerequisites,
            learnthis
        })

        toast.promise(upload, {
            success: "Uploaded",
            loading: "uploading...",
            error: "Failed"
        })
    }


    return (
        <form onSubmit="return false;">
            <fieldset>
                <legend>
                    <span className="number">1</span> <h4>Basic Info</h4>
                </legend>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" className="textinput" onChange={(e) => { settitle(e.target.value) }} name="title" />
                <p className="warnings">*limited to 100 characters</p>
                <label htmlFor="background">Background:</label>
                <input type="url" id="background" onChange={(e) => { setbackground(e.target.value) }} name="background" />
                <label>Description:</label>
                <textarea onChange={(e) => setdesc(e.target.value)} cols="30" rows="5"></textarea>
                <label htmlFor="price">Price:</label>
                <input type="number" id="price" onChange={(e) => { setprice(e.target.value) }} name="price" />
                <p className="warnings">*enter only numbers</p>
                <label htmlFor="category">Category:</label>
                <input type="text" className="textinput" id="category" onChange={(e) => { setcategory(e.target.value) }} name="category" />
                <label>Certificate:</label>
                <div className="certificate">
                <input type="radio" id="certificate" onClick={(e) =>{setcertificate(e.target.value)}} name="certificate" value={1}/><span>Yes</span>
                </div>
                <div className="certificate">
                <input type="radio" id="certificate" name="certificate" onClick={(e) =>{setcertificate(e.target.value)}} value={0}/><span>No</span>
                </div>
                <label>Language:</label>
                <input type="text" onChange={(e) =>{setlanguage(e.target.value)}} className="textinput"/>
            <legend>
                <span className="number">2</span> <h4>Content</h4>
            </legend>
            <div className="section-wrapper"></div>
            <button onClick={(e) => addsection(e)} style={{padding:"5px 0px",border : "2px solid", margin: "20px auto", width : "60%", backgroundColor : "black", color : "white"}}>+ section</button>
            <legend>
                    <span className="number">3</span> <h4>More Info</h4>
            </legend>
            <label>What will students learn in course?</label>
            <textarea cols="30" rows="3" onChange={(e) => setlearnthis(e.target.value)}></textarea>
            <label>Who is this course for?</label>
            <textarea cols="30" rows="3" onChange={(e) => setcoursefor(e.target.value)}></textarea>
            <label>What are the Prerequisites?</label>
            <textarea cols="30" rows="3" onChange={(e) => setprerequisites(e.target.value)}></textarea>
            <button className="upload" type="button" onClick={() => { handleCourse(); }}>Upload</button>
            </fieldset>
        </form>
    )
}