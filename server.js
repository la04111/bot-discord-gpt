require('dotenv').config()
 const { Configuration, OpenAIApi } = require("openai");
 const configuration = new Configuration({
  apiKey: process.env.API,
});

 const openai = new OpenAIApi(configuration);
 const getImage = async (text) => {
  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    });

    return response.data.data[0].url;
  } catch (error) {
 
  }
};
const getChat = async (text) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: text }
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
 
  }
};
const { Client, Intents,MessageEmbed  } = require('discord.js');
const client = new Client({
    intents: 131071,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER']
})



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', async function(msg){
    // Bỏ qua tin nhắn từ bot
   // if (msg.author.bot) return;
  
    try {
        // Kiểm tra nếu có kí tự '!'
      if(msg.channel.name =='gpt'){
        // if (msg.content.includes('!')) {
        //     const result = await getImage(msg.content);
        //     console.log(result)
           
        //     const embed = new MessageEmbed().setImage(result);
        //     // Gửi ảnh
        //     msg.reply({ embeds: [embed] })
        
        // } else {
       
            // msg.reply(await getChat(msg.content));
            msg.reply(msg.content);
          // }
           }
    } catch (e) {
        // In ra thông báo lỗi
    }
    
});


//
client.login(process.env.dis);

// const express = require('express')
// const bodyParser = require('body-parser');

// const app = express()
// app.use(bodyParser.json());
// const port = 3000

// const configuration = new Configuration({
//     apiKey: process.env.API,
//   });
//   const openai = new OpenAIApi(configuration);
//   module.exports = openai;
// app.post('/', async (req, res) => {
//    const text = req.body.cauhoi
//     if (text) {
//         const resgetChat = await getChat(text);
//         if (resgetChat) {
//           try {
//             console.log(resgetChat)
//            res.send(resgetChat)
//           } catch (error) {
//             // ignore the error
//           }
//         }
//       } else {
//         try {
//             res.send(
//             "Vui lòng hỏi bất kỳ điều gì sau /hoi"
//           );
//         } catch (error) {
//           // ignore the error
//         }
//       }
// })

// app.post('/anh', async (req, res) => {
//    const text = req.body.cauhoi
//     if (text) {
//         const resgetChat = await getImage(text);
//         if (resgetChat) {
//           try {
//             console.log(resgetChat)
//            res.send(resgetChat)
//           } catch (error) {
//             // ignore the error
//           }
//         }
//       } else {
//         try {
//             res.send(
//             "Vui lòng hỏi bất kỳ điều gì sau /hoi"
//           );
//         } catch (error) {
//           // ignore the error
//         }
//       }
// })



// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`)
// })