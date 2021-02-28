import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/widgets.dart';

class MessageBubble extends StatelessWidget {
  MessageBubble(this.message,this.isMe);
  final String message;
  final bool isMe;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Row(
          mainAxisAlignment: isMe?MainAxisAlignment.end:MainAxisAlignment.start,
          children: [
            Container(
                decoration: BoxDecoration(
                    color:isMe?Colors.grey[300]:Theme.of(context).accentColor,
                    borderRadius: BorderRadius.only(
                      topLeft: Radius.circular(12),
                      topRight: Radius.circular(12),
                      bottomLeft:!isMe?Radius.circular(0):Radius.circular(12),
                      bottomRight: isMe?Radius.circular(0):Radius.circular(12),
                    )),
                width: 140,
                padding: EdgeInsets.symmetric(vertical: 10,horizontal: 16),
                margin: EdgeInsets.symmetric(vertical: 14,horizontal: 16),
                child: Column(crossAxisAlignment: isMe?CrossAxisAlignment.end:CrossAxisAlignment.start,
                  children: [
                    Text(message,textAlign: isMe?TextAlign.end:TextAlign.start,
                      style: TextStyle(
                          color:isMe?Colors.black:Theme.of(context).accentTextTheme.title.color),),],)
            ),
          ],
        ),
      ],
      overflow: Overflow.visible,
    );
  }
}