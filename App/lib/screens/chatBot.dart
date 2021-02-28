import 'package:flutter/material.dart';
import 'package:life_circle/models/messageStructure.dart';
import 'package:http/http.dart';
import 'dart:convert';

import 'package:life_circle/widget/chat/chatBubble.dart';


class ChatBot extends StatefulWidget {
  @override
  _ChatBotState createState() => _ChatBotState();
}

class _ChatBotState extends State<ChatBot> {
  List<Message> messages=[

  ];
  final _controller=new TextEditingController();
  String _enteredMessage='';
  addToList(String text,bool isMe) async{
    setState(() {
      messages.add(Message(text: text,isMe: isMe));

    });
    String docApi='https://82cc2f6d2d89.ngrok.io/rbot/${text}';

    Response response=await get(docApi);
    Map<String,dynamic> answer=json.decode(response.body);
    String ans=answer['answer'];
    setState(() {
      messages.add(Message(text:ans,isMe:false));
    });
    print(ans);

    //print(json.decode(response.body));

  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(children: <Widget>[
          Expanded(child:ListView.builder(itemCount: messages.length,
            reverse: true,
            itemBuilder:(context, index) {
              return MessageBubble(messages[messages.length-index-1].text,messages[messages.length-index-1].isMe);
            },) ,),
          Container(
            margin: EdgeInsets.only(top: 8),
            padding: EdgeInsets.all(8),
            child: Row(children: [
              Expanded(child:
                TextField(decoration: InputDecoration(labelText: 'message...'),
                  controller: _controller,
                  onChanged: (value) {
                    setState(() {
                      _enteredMessage=value;
                    });
                  },)),
              IconButton(color: Theme.of(context).primaryColor,
                  icon: Icon(Icons.send),
                  onPressed:(){
                    setState(() {
                      _enteredMessage.trim().isEmpty?null:addToList(_enteredMessage,true);
                    });
                    _controller.clear();
                  })
            ],),
          ),
        ],),
      )
    );
  }
  // Future<Map> doctorApi() async{
  //   String docApi='https://836783ac3f38.ngrok.io/rbot/hello';
  //   Response response=await get(docApi);
  //   print(json.decode(response.body));
  //   return null;
  // }
}
