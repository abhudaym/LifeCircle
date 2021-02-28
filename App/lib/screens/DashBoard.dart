import 'dart:convert';
import 'dart:ui';

import 'package:flutter_icons/flutter_icons.dart';
import 'package:http/http.dart';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:life_circle/models/data.dart';


class DashBoard extends StatefulWidget {
  @override
  _DashBoardState createState() => _DashBoardState();
}

class _DashBoardState extends State<DashBoard> {
  List<Data> Fields=[Data(
    name:"Abhuday Mishra",
    location:"Gurgaon",),
  Data(name: "Kusum grandhi",
  location:"Gurgaon"),
    Data(name: "Aniket KhanWalker",
    location:"Ahmedabad")
  ]
  ;
  @override
  Widget build(BuildContext context) {
    var h=MediaQuery.of(context).size.height;
    var w=MediaQuery.of(context).size.width;
    return Scaffold(
      body: SingleChildScrollView(
          child: SafeArea(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  decoration:BoxDecoration(
                      image: DecorationImage(
                          image: AssetImage('assets/bg.png'),
                          fit:BoxFit.cover
                      )
                  ),
                  child: Padding(
                    //padding: const EdgeInsets.only(top: 40.0),
                    padding: const EdgeInsets.fromLTRB(8,48,8,8),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisSize: MainAxisSize.max,
                      verticalDirection: VerticalDirection.down,
                      children: <Widget>[
                        Padding(
                          padding: const EdgeInsets.only(left: 10),
                          child: Icon(FlutterIcons.three_bars_oct),
                        ),
                        Container(
                          margin: EdgeInsets.all(40.0),
                          child:Center(child: Text("Hi Chakravarthi")),

                        ),
                        Row(
                            children:<Widget>[
                              Center(child: Icon(Icons.notification_important)),
                              ClipRRect(
                                  borderRadius: BorderRadius.circular(18),
                                  child: Image.asset('assets/profile.jpg',height: 100.0,width: 120.0,)),
                            ]
                        )
                      ],
                    ),
                  ),
                ),
                Container(
                    padding: EdgeInsets.fromLTRB(20,10,20,5),
                    child:Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[

                        Text("Circle",style: TextStyle(fontSize: 19.0,fontStyle:FontStyle.normal,fontWeight: FontWeight.bold),),

                      ],
                    )
                ),
                Container(
                  height: h/5,
                  child: ListView.builder(
                    itemCount: Fields.length,
                    shrinkWrap: false,
                    scrollDirection: Axis.horizontal,
                    physics: BouncingScrollPhysics(),
                    itemBuilder: (context, index) {
                      return  Padding(
                        padding: const EdgeInsets.all(5),
                        child:Container(
                          height: h/7,
                          width: w/1.6,
                          child: Card(
                            color: Colors.lightBlue,
                            shape: RoundedRectangleBorder(borderRadius:BorderRadius.circular(22)),
                            elevation: 8,
                            child: Container(
                                margin: EdgeInsets.all(15),
                                child:Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                  children: <Widget>[
                                    Column(
                                      mainAxisAlignment: MainAxisAlignment.start,
                                      children: [
                                        Container(
                                            height:40,
                                            width: 100,
                                            child: Center(
                                              child: Text(Fields[index].name,style: TextStyle(
                                                  fontWeight: FontWeight.w700,fontSize: 16,color:Colors.blueGrey

                                              ),),
                                            )),
                                        Container(
                                            height:40,
                                            width: 100,
                                            child: Text(Fields[index].location,)),

                                      ],
                                    ),
                                    Image.asset('assets/img.png',height: 80,width: 90.0,)
                                  ],
                                )
                            ),
                          ),
                        ),
                        
                      );
                    },),
                ),
                SizedBox(height: 10,),
                Container(
                  padding: EdgeInsets.fromLTRB(10,0,0,0),
                  child: Text("Maps",style: TextStyle(fontSize: 19.0,fontStyle:FontStyle.normal,fontWeight: FontWeight.bold),)),
               SizedBox(height: 5,),
                Container(
                  //height: 300,
                  padding: EdgeInsets.all(10),
                  child: ClipRRect(
                      borderRadius: BorderRadius.only(topLeft: Radius.circular(40.0),topRight: Radius.circular(30.0)),
                      child: Image.asset("assets/maps.jpg",)),),
              ],
            ),
            
          ),
        ),
    );
  }
}
