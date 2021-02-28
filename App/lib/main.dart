import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:life_circle/screens/DashBoard.dart';
import 'package:life_circle/screens/authScreen.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:life_circle/screens/chatBot.dart';
import 'package:life_circle/widget/bottomNavigation.dart';
Future<void> main() async{
 WidgetsFlutterBinding.ensureInitialized();
 await Firebase.initializeApp();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Life Circle',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      routes: {
        '/dashboard':(context)=>DashBoard(),
        '/chatBot':(context)=>ChatBot(),
        '/navigator':(context)=>Navigation(),
      },
      home:AuthScreen(),
    );
  }
}

