import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:flutter/material.dart';
import 'package:sleep_aid/constants/app_colors.dart';
import 'package:sleep_aid/constants/sound_type.dart';

import '../constants/paths.dart';
import '../constants/recorder_constants.dart';
import '../controllers/audio_player_controller.dart';

class ReportListPage extends StatefulWidget {
  const ReportListPage({super.key});

  @override
  ReportListPageState createState() => ReportListPageState();
}

class ReportListPageState extends State<ReportListPage> {
  final _reports = <int, DateTime>{};
  var _currentReportId = DateTime.now().millisecondsSinceEpoch;

  @override
  void initState() {
    super.initState();
    final files = Directory(Paths.reports).listSync();
    final reportIds = files
        .map((file) => file.path.split('/').last)
        .map((fileName) => fileName.split('.').first)
        .map((fileName) => int.parse(fileName))
        .toList()
      ..sort();
    for (final reportId in reportIds) {
      final date = DateTime.fromMillisecondsSinceEpoch(reportId).toLocal();
      _reports[reportId] = date;
    }
    _currentReportId = _reports.keys.last;
  }

  void _playRecording(String fileName) {
    final filePath = '${Paths.recordings}/$fileName';
    final controller = AudioPlayerController();
    controller.setPath(filePath: filePath);
    controller.play();
  }

  @override
  Widget build(BuildContext context) {
    final reportContent =
        File('${Paths.reports}/$_currentReportId.json').readAsStringSync();
    final report = Map<String, dynamic>.from(jsonDecode(reportContent));
    final sleepStart = _reports[_currentReportId]!;
    final sleepEnd = DateTime.fromMillisecondsSinceEpoch(
            _currentReportId + (report['duration'] as int) * 1000)
        .toLocal();

    final snorings = report['snorings'] as List;
    final speeches = report['speeches'] as List;
    // 从Paths.recording中读取文件
    final snoringInfos = snorings.map((snoring) {
      final snoringFile = File('${Paths.recordings}/$_currentReportId-'
          '${SoundType.snoring}-$snoring${RecorderConstants.fileExtension}');
      // 读取wav文件的时长
      final snoringDuration =
          snoringFile.lengthSync() / (RecorderConstants.bitRate / 8);
      return {
        'id': snoring,
        'fileName': snoringFile.path.split('/').last,
        'duration': snoringDuration,
        'start': DateTime.fromMillisecondsSinceEpoch(snoring as int)
            .toLocal()
            .toString()
            .split(' ')
            .last
            .split('.')
            .first,
        'end': DateTime.fromMillisecondsSinceEpoch(
                snoring + (snoringDuration * 1000).toInt())
            .toLocal()
            .toString()
            .split(' ')
            .last
            .split('.')
            .first,
      };
    }).toList();
    final speechInfos = speeches.map((speech) {
      final speechFile = File('${Paths.recordings}/$_currentReportId-'
          '${SoundType.speech}-$speech${RecorderConstants.fileExtension}');
      final speechDuration =
          speechFile.lengthSync() / (RecorderConstants.bitRate / 8);
      return {
        'id': speech,
        'fileName': speechFile.path.split('/').last,
        'duration': speechDuration,
        'start': DateTime.fromMillisecondsSinceEpoch(speech as int)
            .toLocal()
            .toString()
            .split(' ')
            .last
            .split('.')
            .first,
        'end': DateTime.fromMillisecondsSinceEpoch(
                speech + (speechDuration * 1000).toInt())
            .toLocal()
            .toString()
            .split(' ')
            .last
            .split('.')
            .first,
      };
    }).toList();

    return Container(
      alignment: Alignment.center,
      color: AppColors.mainColor,
      child: Column(
        children: [
          Container(
            height: 85,
          ),
          Center(
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back),
                  onPressed: () {
                    if (_currentReportId == _reports.keys.first) {
                      return;
                    }
                    setState(() => (_currentReportId = _reports.keys
                        .firstWhere((id) => id < _currentReportId)));
                  },
                ),
                Text(
                  _reports[_currentReportId]!.toString(),
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.arrow_forward),
                  onPressed: () {
                    if (_currentReportId == _reports.keys.last) {
                      return;
                    }
                    setState(() => (_currentReportId = _reports.keys
                        .firstWhere((id) => id > _currentReportId)));
                  },
                ),
              ],
            ),
          ),
          Container(
            height: 50,
          ),
          SizedBox(
            height: 200,
            width: 200,
            child: CustomPaint(
              painter: _ReportPainter(
                sleepStart: sleepStart,
                sleepEnd: sleepEnd,
              ),
            ),
          ),
          // 显示平均噪声
          Container(
            height: 50,
          ),
          Text(
            '平均背景噪声: ${(report['aveBgAmplitudeDb'] as double).toStringAsFixed(2)} dB',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
          // 显示打鼾情况
          Container(
            height: 10,
          ),
          Text(
            '共检测到鼾声: ${snoringInfos.length} 次',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
          Container(
            height: 10,
          ),
          // 显示随机三次打鼾的情况（列表），点击可以播放
          // 列表居中显示
          SizedBox(
            height: 100,
            // 滚动列表
            child: ListView.builder(
              scrollDirection: Axis.vertical,
              itemCount: snoringInfos.length,
              itemBuilder: (context, index) {
                final snoringInfo = snoringInfos[index];
                return SizedBox(
                  width: 200,
                  child: Column(
                    children: [
                      Text(
                        '${snoringInfo['start']} - ${snoringInfo['end']}',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                        ),
                      ),
                      Container(
                        height: 10,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // 播放录音
                          _playRecording(snoringInfo['fileName']);
                        },
                        child: const Text('播放'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
          // 显示随机三次说话的情况（列表），点击可以播放
          // 列表居中显示
          Container(
            height: 10,
          ),
          Text(
            '共检测到说话: ${speechInfos.length} 次',
            style: const TextStyle(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
          Container(
            height: 10,
          ),
          SizedBox(
            height: 100,
            // 滚动列表
            child: ListView.builder(
              scrollDirection: Axis.vertical,
              itemCount: speechInfos.length,
              itemBuilder: (context, index) {
                final speechInfo = speechInfos[index];
                return SizedBox(
                  width: 200,
                  child: Column(
                    children: [
                      Text(
                        '${speechInfo['start']} - ${speechInfo['end']}',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                        ),
                      ),
                      Container(
                        height: 10,
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // 播放录音
                          _playRecording(speechInfo['fileName']);
                        },
                        child: const Text('播放'),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _ReportPainter extends CustomPainter {
  _ReportPainter({
    required this.sleepStart,
    required this.sleepEnd,
  });

  final DateTime sleepStart;
  final DateTime sleepEnd;

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.red
      ..strokeWidth = 10
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final rect = Rect.fromCircle(
      center: Offset(size.width / 2, size.height / 2),
      radius: size.width / 2 - 10,
    );
    canvas.drawArc(rect, -pi / 2, pi * 2, false, paint);

    final paint2 = Paint()
      ..color = Colors.green
      ..strokeWidth = 10
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;
    final startAngle = -pi / 2 +
        pi * 2 * (sleepStart.hour * 60 + sleepStart.minute) / (24 * 60);
    final endAngle =
        -pi / 2 + pi * 2 * (sleepEnd.hour * 60 + sleepEnd.minute) / (24 * 60);
    canvas.drawArc(rect, startAngle, endAngle - startAngle, false, paint2);

    // 在startAngle边上标上sleepStart
    final textPainterStart = TextPainter(
      text: TextSpan(
        text: '${sleepStart.hour < 10 ? '0' : ''}${sleepStart.hour}:'
            '${sleepStart.minute < 10 ? '0' : ''}${sleepStart.minute}',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainterStart.paint(
      canvas,
      Offset(
        size.width / 2 +
            (size.width / 2 - 10) * cos(startAngle) -
            textPainterStart.width / 2,
        size.height / 2 +
            (size.height / 2 - 10) * sin(startAngle) -
            textPainterStart.height / 2,
      ),
    );

    // 在endAngle边上标上sleepEnd
    final textPainterEnd = TextPainter(
      text: TextSpan(
        text: '${sleepEnd.hour < 10 ? '0' : ''}${sleepEnd.hour}:'
            '${sleepEnd.minute < 10 ? '0' : ''}${sleepEnd.minute}',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 10,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainterEnd.paint(
      canvas,
      Offset(
        size.width / 2 +
            (size.width / 2 - 10) * cos(endAngle) -
            textPainterEnd.width / 2,
        size.height / 2 +
            (size.height / 2 - 10) * sin(endAngle) -
            textPainterEnd.height / 2,
      ),
    );

    final textPainter = TextPainter(
      text: TextSpan(
        text: '${sleepEnd.difference(sleepStart).inHours}小时'
            '${sleepEnd.difference(sleepStart).inMinutes % 60}分钟',
        style: const TextStyle(
          color: Colors.white,
          fontSize: 20,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainter.paint(
      canvas,
      Offset(
        size.width / 2 - textPainter.width / 2,
        size.height / 2 - textPainter.height / 2,
      ),
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) {
    return false;
  }
}
