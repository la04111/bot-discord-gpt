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
    if (msg.author.bot) return;

    try {
        // Kiểm tra nếu có kí tự '!'
      if(msg.channel.name =='gpt' && msg.author.username != 'GPTWibuu'){
        if (msg.content.startsWith('?')) {
          const voiceChannel = msg.member.voice.channel;
           if (!voiceChannel) {
              return msg.reply('Hãy vào kênh thoại trước khi chạy lệnh ?');
          }
          const permissions = voiceChannel.permissionsFor(msg.client.user);
          if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
              return msg.reply('Bot không có quyền truy cập vào kênh thoại của bạn');
           }
            const videoURL = msg.content.split(' ')[1];
            const connection = await voiceChannel.join();
            const stream = ytdl(videoURL, { filter: 'audioonly' });
            const dispatcher = connection.play(stream);
             dispatcher.on('finish', () => {
              voiceChannel.leave();
            });
       
        }
        //GPT
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


//adsd
client.login(process.env.dis);

const express = require('express')
const bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
const port = 443

app.get('/', function(req, res) {
  res.send('ok');
});
app.post('/', async (req, res) => {
   const text = req.body.cauhoi
    if (text) {
        const resgetChat = await getChat(text);
        if (resgetChat) {
          try {
            
           res.send(resgetChat)
          } catch (error) {
            // ignore the error
          }
        }
      } else {
        try {
            res.send(
            "Vui lòng hỏi bất kỳ điều gì sau /hoi"
          );
        } catch (error) {
          // ignore the error
        }
      }
})

app.post('/anh', async (req, res) => {
   const text = req.body.cauhoi
    if (text) {
        const resgetChat = await getImage(text);
        if (resgetChat) {
          try {
         
           res.send(resgetChat)
          } catch (error) {
            // ignore the error
          }
        }
      } else {
        try {
            res.send(
            "Vui lòng hỏi bất kỳ điều gì sau /hoi"
          );
        } catch (error) {
          // ignore the error
        }
      }
})
const cors = require('cors');

app.use(cors());
const os = require('os');

const interfaces = os.networkInterfaces();

Object.keys(interfaces).forEach((ifaceName) => {
  const iface = interfaces[ifaceName];
  iface.forEach((alias) => {
    if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
      console.log(`Your IP address is: ${alias.address}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
