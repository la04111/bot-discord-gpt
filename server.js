require('dotenv').config()
const { Client, Intents,MessageEmbed  } = require('discord.js');
const client = new Client({
    intents: 131071,
    partials: ['CHANNEL', 'GUILD_MEMBER', 'GUILD_SCHEDULED_EVENT', 'MESSAGE', 'REACTION', 'USER']
})
const { getImage, getChat } = require("./Helper/functions");
  



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on('messageCreate', async msg =>{
    // Bỏ qua tin nhắn từ bot
   // if (msg.author.bot) return;
  
    try {
        // Kiểm tra nếu có kí tự '!'
      if(msg.channel.name =='gpt' && msg.author.username != 'GPTWibuu'){
        if (msg.content.includes('!')) {
            const result = await getImage(msg.content);
            if(result.length != 0){
            const embed = new MessageEmbed().setImage(result);
            // Gửi ảnh
            msg.reply({ embeds: [embed] })
          }
        
        } else {
          const result = await getChat(msg.content);
          if(result.length != 0)
          msg.reply(result)
           }
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