import 'package:flutter/material.dart';
import 'package:sleep_aid/pages/home.dart';
import 'package:sleep_aid/pages/report_list.dart';

import 'constants/app_colors.dart';

void main() => runApp(const App());

class App extends StatefulWidget {
  const App({super.key});

  @override
  AppState createState() => AppState();
}

class AppState extends State<App> {
  final GlobalKey<ScaffoldState> _key = GlobalKey();

  Widget homePage = const HomePage();

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '睡眠质量助手',
      theme: ThemeData.dark(),
      home: Scaffold(
        key: _key,
        extendBodyBehindAppBar: true,
        appBar: AppBar(
          elevation: 0,
          centerTitle: true,
          backgroundColor: AppColors.appBarColor,
        ),
        drawer: Drawer(
          child: ListView(
            padding: EdgeInsets.zero,
            children: [
              const UserAccountsDrawerHeader(
                decoration: BoxDecoration(color: AppColors.mainColor),
                accountName: Text(
                  'Snowflyt',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                accountEmail: Text(
                  'gaoge011022@163.com',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                currentAccountPicture: FlutterLogo(),
              ),
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('主页面'),
                onTap: () {
                  _key.currentState!.closeDrawer();
                  setState(() => (homePage = const HomePage()));
                },
              ),
              ListTile(
                leading: const Icon(Icons.bed),
                title: const Text('睡眠报告'),
                onTap: () {
                  _key.currentState!.closeDrawer();
                  setState(() => (homePage = const ReportListPage()));
                },
              ),
              const AboutListTile(
                icon: Icon(Icons.info),
                applicationIcon: Icon(Icons.local_play),
                applicationName: '睡眠质量助手',
                applicationVersion: '1.0.0',
                applicationLegalese: '© 2022 Snowflyt',
                child: Text('关于应用'),
              ),
            ],
          ),
        ),
        body: homePage,
      ),
    );
  }
}
