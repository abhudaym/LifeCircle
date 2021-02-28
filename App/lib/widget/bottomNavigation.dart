import 'package:flutter/material.dart';
import 'package:life_circle/screens/DashBoard.dart';
import 'package:life_circle/screens/chatBot.dart';
import 'package:flutter_icons/flutter_icons.dart';
class Navigation extends StatefulWidget {
  @override
  _NavigationState createState() => _NavigationState();
}

class _NavigationState extends State<Navigation> {
  final List<Widget> _pages=[
    ChatBot(),
    DashBoard(),

  ];
  int _selectedPageIndex=1;

  void _selectpage(int index){
    setState(() {
      _selectedPageIndex=index;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: (){},
        child: Text("SOS",style: TextStyle(color: Colors.white),),
        elevation: 2.0,
        backgroundColor: Colors.red,
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.lightBlueAccent,
        selectedItemColor: Colors.white,
        unselectedItemColor: Colors.grey,
        currentIndex: _selectedPageIndex,
        onTap:_selectpage,
          items: [
        BottomNavigationBarItem(icon: Icon(Icons.textsms),title: Text("chatBot")),
        BottomNavigationBarItem(icon: Icon(Icons.dashboard),title: Text("DashBoard")),
          ]
      ),
      body: _pages[_selectedPageIndex],
    );
  }
}
