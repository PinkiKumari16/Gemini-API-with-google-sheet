import React, { useRef, useState } from 'react';
import axios from 'axios';
export const Form = () => {
    const formRef = useRef(null);
    // const scriptURL = "https://script.google.com/macros/s/AKfycbwL2YsOVbpEhQLS5pE8R3EDWhMbcJOV5fgUb6nBGSBrMy1yLp8ktIKuqO-umyz__6IgGA/exec";
    const scriptURL = "https://sheet.best/api/sheets/8fbefe28-bc9c-4a22-9632-c7d143b8e8a7"
    const [answer, setAnswer] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    const [douet1, setDouet1] = useState('');
    const [douet2, setDouet2] = useState('');
    const [douet3, setDouet3] = useState('');
    const [douet4, setDouet4] = useState('');
    const [douet5, setDouet5] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const GEMINI_API_KEY = "AIzaSyCsuZn39V72kEmGx6494MHe5HFCG7gp-do";

    async function generateAnswer(e) {
        console.log("**************************")
        const data={
            name: name,
            email:email
        }

        const question=[douet1,douet2, douet3, douet4, douet5];
        const filteredQuestions = question.filter(elem => elem.trim() !== "");

        setGeneratingAnswer(true);
        e.preventDefault();
        setAnswer("Loading your answer... \n It might take upto 10 seconds");
        try {
            for(let ind in filteredQuestions){
                console.log(filteredQuestions[ind]);
                const response = await axios({
                    url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                    method: "post",
                    data: {
                        contents: [{ parts: [{ text: filteredQuestions[ind] }] }],
                    },
                });

                data['question'+ind] = filteredQuestions[ind];
                data['douet'+ind] = await response["data"]["candidates"][0]["content"]["parts"][0]["text"];
                
            } 
            
            setGeneratingAnswer(false);
            console.log(data);

            axios.post(scriptURL,data).then((res) => {
                console.log(res, 'kkkkk');
            }).catch((err) => {
                console.log(err, "ggggg");
            })

        }
        catch (error) {
            console.log(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        }
    
    }
       

    return (
        <>
            <form onSubmit={generateAnswer}>
                <h1>Douets Collection Form</h1>
                <label htmlFor="name">Name <span class="required">*</span></label>
                <input type="text" id="name" name="Name" onChange={(e)=>setName(e.target.value)} required/>

                <label htmlFor="email">Email <span class="required">*</span></label>
                <input type="email" id="email" name="Email" onChange={(e)=>setEmail(e.target.value)} required/>

                <label htmlFor="douet1">Douet1 <span class="required">*</span></label>
                <input type="text" id="douet1" name="Douet1" value={douet1} onChange={(e)=>setDouet1(e.target.value)} required />


                <label htmlFor="douet2">Douet2: </label>
                <input type="text" id="douet2" name="Douet2" value={douet2} onChange={(e)=>setDouet2(e.target.value)} />


                <label htmlFor="douet3">Douet3: </label>
                <input type="text" id="douet3" name="Douet3" value={douet3} onChange={(e)=>setDouet3(e.target.value)}  />


                <label htmlFor="douet4">Douet4: </label>
                <input type="text" id="douet4" name="Douet4" value={douet4} onChange={(e)=>setDouet4(e.target.value)} />


                <label htmlFor="douet5">Douet5: </label>
                <input type="text" id="douet5" name="Douet5" value={douet5} onChange={(e)=>setDouet5(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}
