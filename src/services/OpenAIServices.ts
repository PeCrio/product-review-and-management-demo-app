import axios from "axios";

import { QueryI } from "utils/types";
import { Configuration, OpenAIApi } from "openai";
import { getAllReviews } from "services/ReviewServices";



export const callOpenAI = async (values: QueryI) => {
  const apiKey = process.env.AZURE_OPENAI_API_KEY;
  const base_url = process.env.AZURE_OPENAI_API_URL;
  const deploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  let url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`;

  try {
    
    const httpHeaders = new Headers();
    httpHeaders.append('Content-Type', 'application/json');
    httpHeaders.append('api-key', apiKey!);
    
    var body = generatePrompt(await getAllReviews(), values.query);
    console.log("Body : " + JSON.stringify(body));
    const response = await fetch(url, {
        method: 'POST',
        headers: httpHeaders,  
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        console.log(`HTTP Code: ${response.status} - ${response.statusText}`);
    } else {
        const completion = await response.json();
        return completion;
    }
  } catch(e) {
    console.error(e);
  }
};

 function generatePrompt(reviews: any, query: string) {
  var prompt = "";
  reviews.data.forEach((review: any) => {
    //prompt += review.firstname + " a mis une revue de " + review.rating + " étoiles : "  + review.comment + " \n ";
    prompt += "Revue " + review.rating + " étoiles : "  + review.comment + " \n ";
  });
 
  prompt += query
 
  return {
       'prompt': prompt,
       "temperature": 1,
       "top_p": 0.5,
       "frequency_penalty": 0,
       "presence_penalty": 0,
       "best_of": 1,
       "max_tokens": 100,
       "stop": null
       // other options here
   };
  }

// const response = await openAI.createCompletion({
//   model: "pierlag-davinci-03",
//   prompt: "Revue 4 étoiles : Découvrir qui a consulté mon profil est si facile avec cette application incroyable !!!!! \n Revue 5 étoiles : Dommage qu'ils n'affichent que quelques personnes ; jaimerais voir toute la liste des personnes, ainsi le nombre de visites :D \n Revue 3 étoiles : J'utilise cette application depuis longtemps et cela m'aide tous les jours merci. \n Revue 5 étoiles : Très simple d'utilisation et facile à utiliser et très pratique. \n Revue 1 étoile : Cette application n'est pas faite pour moi. Je l'ai désinstallé. \n Résume moi les revues de mon application : ",
//   temperature: 0,
//   max_tokens: 200,
//   top_p: 1.0,
//   frequency_penalty: 0.2,
//   presence_penalty: 0.0,
//   stop: ["\n"],
// });
// console.log(response.data.choices[0].text);

// return response;
