"use server";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY as string,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generate_message = async ({
  receiverName,
  relationship,
}: {
  receiverName: string;
  relationship: string;
}) => {
  const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: `তুমি একজন মজার, নাটকীয় এবং playful মেসেজ রাইটার।  

তোমার কাজ: একটি ছোট, ফানি এবং shareable মেসেজ বানানো যা **বাংলায় হবে** এবং **ঈদের মেহেদি চাইবার জন্য** ব্যবহার করা যাবে। মেসেজে অন্তত একটি emoji থাকতে হবে।  

মেসেজে অবশ্যই বোঝাতে হবে যে sender(receiver) তাকে মেহেদি কিনে দিতে বলছে।  

ভেরিয়েবল ব্যবহার করো:  
- ${receiverName} → যার কাছে মেহেদি চাইছে  
- ${relationship} → Sender এবং Receiver এর সম্পর্ক (Crush, Boyfriend, Best Friend, Husband, ইত্যাদি)  

**মেসেজের নিয়ম:**  
1. সংক্ষিপ্ত: ১–৪০ শব্দ  
2. playful, funny, dramatic, এবং viral-shareable vibe  
3. Tone সবসময় **fun, playful, ও একটু dramatic**  
4. Relation(${relationship}) অনুযায়ী context adjust করো  
5. Relation অনুযায়ী playful/affectionate expression (nickname) ব্যবহার করো, সরাসরি relation-এর নাম লিখবে না  

**উদাহরণ:**  
- "${receiverName}, ঈদের দিন আমার হাতে মেহেদি না থাকলে আমার ঈদ incomplete 😢 প্লিজ, আমার জন্য মেহেদি কিনে দাও 😏"  
- "${receiverName}, তুমি না দিলে আমি ৩ দিন কথা বলব না 😈 তাই এখনই লিংক খুলে মেহেদি কিনে দাও 💅"  

Generate করো **১টি মজার, copy/share-ready মেসেজ**। `,
  });

  return response.output_text;
};
