import React, { useState } from 'react';
import axios from 'axios';


export const Form = () => {
    const scriptURL = "https://sheet.best/api/sheets/8fbefe28-bc9c-4a22-9632-c7d143b8e8a7";

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

        e.preventDefault();
        try {
            for(let ind in filteredQuestions){
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

            axios.post(scriptURL,data).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })

            alert('Your Doubts collected successfully....  We will send the Resoluations on your Email soon.....');
            setDouet1('')
            setDouet2('')
            setDouet3('')
            setDouet4('')
            setDouet5('')
            setName('')
            setEmail('')
        }
        catch (error) {
            console.log(error);
        }
    
    }
      

    return (
        <>
            <form  onSubmit={generateAnswer}>
                <h1>Douets Collection Form</h1>
                <label htmlFor='name'>Name:</label>
                <input type="text" id="name" name="Name" value={name} onChange={(e)=>setName(e.target.value)} required/>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>

                <label htmlFor="douet1">Douet1: </label>
                <input type="text" id="douet1" name="Douet1" value={douet1} onChange={(e)=>setDouet1(e.target.value)} required />


                <label htmlFor="douet2">Douet2: </label>
                <input type="text" id="douet2" name="Douet2" value={douet2} onChange={(e)=>setDouet2(e.target.value)}  required />


                <label htmlFor="douet3">Douet3: </label>
                <input type="text" id="douet3" name="Douet3" value={douet3} onChange={(e)=>setDouet3(e.target.value)} required />


                <label htmlFor="douet4">Douet4: </label>
                <input type="text" id="douet4" name="Douet4" value={douet4} onChange={(e)=>setDouet4(e.target.value)} />


                <label htmlFor="douet5">Douet5: </label>
                <input type="text" id="douet5" name="Douet5" value={douet5} onChange={(e)=>setDouet5(e.target.value)} />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}
