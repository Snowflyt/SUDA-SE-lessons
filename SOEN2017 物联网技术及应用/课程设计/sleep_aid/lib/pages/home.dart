import 'dart:io';
import 'dart:math';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:record/record.dart';
import 'package:tflite_audio/tflite_audio.dart';

import '../constants/paths.dart';
import '../constants/recorder_constants.dart';
import '../constants/sound_type.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  HomePageState createState() => HomePageState();
}

class HomePageState extends State<HomePage> {
  static const _soundTextInitial = '点击按钮开始记录';
  var _soundText = _soundTextInitial;
  var _recording = false;
  var _elapsedSeconds = 0;
  var _currentReportId = DateTime.now().millisecondsSinceEpoch;
  var _aveBgAmplitudeDb = 0.0;
  final _snorings = <int>[];
  final _speeches = <int>[];
  final _audioRecorder = Record();

  @override
  void initState() {
    super.initState();
    TfliteAudio.loadModel(
      model: 'assets/snoring_classifier.tflite',
      label: 'assets/labels.txt',
      numThreads: 1,
      isAsset: true,
      inputType: 'rawAudio',
    );
  }

  void _createDataFolderIfNotExists() async {
    final appFolders = [Directory(Paths.reports), Directory(Paths.recordings)];
    for (final folder in appFolders) {
      final folderExists = await folder.exists();
      if (!folderExists) {
        await folder.create(recursive: true);
      }
    }
  }

  void _startRecording(SoundType soundType) async {
    final soundId = DateTime.now().millisecondsSinceEpoch;
    if (soundType == SoundType.snoring) {
      _snorings.add(soundId);
    } else {
      _speeches.add(soundId);
    }
    final filepath = '${Paths.recordings}/$_currentReportId-'
        '$soundType-$soundId${RecorderConstants.fileExtension}';
    await _audioRecorder.start(
      path: filepath,
      bitRate: RecorderConstants.bitRate,
      samplingRate: RecorderConstants.sampleRate,
    );
  }

  void _generateReport() async {
    // 创建文件
    final reportFile = File('${Paths.reports}/$_currentReportId.json');
    // 为文件创建一个写入器
    final reportFileWriter = reportFile.openWrite();
    // 写入本次记录持续的时间、平均背景噪音强度、打鼾数组、说话数组
    // 按照JSON格式写入
    reportFileWriter.write('{"duration": $_elapsedSeconds, '
        '"aveBgAmplitudeDb": $_aveBgAmplitudeDb, '
        '"snorings": $_snorings, '
        '"speeches": $_speeches}');
    // 关闭写入器
    await reportFileWriter.close();
    await reportFile.create(recursive: true);
  }

  void _onRecordButtonPressed() async {
    if (!_recording) {
      Map<Permission, PermissionStatus> permissions = await [
        Permission.storage,
        Permission.microphone,
      ].request();

      final permissionsGranted = permissions[Permission.storage]!.isGranted &&
          permissions[Permission.microphone]!.isGranted;

      if (permissionsGranted) {
        _createDataFolderIfNotExists();
        setState(() => (_recording = true));
        _currentReportId = DateTime.now().millisecondsSinceEpoch;
        _recognize();

        // increment elapsed seconds every second
        void incrementElapsedSeconds() {
          Future.delayed(const Duration(seconds: 1), () {
            setState(() => _elapsedSeconds++);
            if (_recording) {
              incrementElapsedSeconds();
            }
          });
        }

        incrementElapsedSeconds();
      } else {
        if (kDebugMode) {
          print('Permissions not granted');
        }
      }
    } else {
      await _audioRecorder.stop();
      _generateReport();
      setState(() {
        _recording = false;
        _elapsedSeconds = 0;
        _soundText = _soundTextInitial;
        _aveBgAmplitudeDb = 0.0;
        _snorings.clear();
        _speeches.clear();
      });
    }
  }

  SoundType _parseSoundType(String soundType) {
    switch (soundType) {
      case '鼾声':
        return SoundType.snoring;
      case '背景噪音':
        return SoundType.background;
      case '梦话':
        return SoundType.speech;
      default:
        throw Exception('Unknown sound type: $soundType');
    }
  }

  void _updateBgAmplitudeDb() {
    _audioRecorder.getAmplitude().then((amplitude) => setState(() {
          if (amplitude.current != -(1.0 / 0.0)) {
            final db = 20 * (log10e * log(-amplitude.current));
            _aveBgAmplitudeDb = (db + _aveBgAmplitudeDb * _elapsedSeconds) /
                (_elapsedSeconds + 1);
          }
        }));

    if (_recording) {
      Future.delayed(const Duration(seconds: 1), _updateBgAmplitudeDb);
    }
  }

  void _recognize() async {
    final recognition = TfliteAudio.startAudioRecognition(
      numOfInferences: 1,
      sampleRate: 44100,
      bufferSize: 22016,
    );

    var recognitionResult = '';
    recognition
        .listen((event) => (recognitionResult = event['recognitionResult']))
        .onDone(() async {
      if (_recording) {
        if (recognitionResult != _soundText) {
          final soundTypeRecognition = _parseSoundType(recognitionResult);
          await _audioRecorder.stop();
          if (soundTypeRecognition == SoundType.background) {
            await _audioRecorder.start(
              samplingRate: RecorderConstants.sampleRate,
              bitRate: RecorderConstants.bitRate,
            );
            _updateBgAmplitudeDb();
          } else {
            _startRecording(soundTypeRecognition);
          }
        }
        setState(() => (_soundText = recognitionResult));
      } else {
        setState(() => (_soundText = _soundTextInitial));
      }
    });

    if (_recording) {
      Future.delayed(const Duration(milliseconds: 1000), _recognize);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/background.jpg'),
          alignment: Alignment.topLeft,
          fit: BoxFit.cover,
        ),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[
            Container(
              padding: const EdgeInsets.all(20),
              child: Text(
                // parse _elapsedSeconds to a string with minutes and seconds
                _recording
                    ? '睡眠记录中……\n'
                        '${_elapsedSeconds ~/ 60}分${_elapsedSeconds % 60}秒'
                    : '在枕边放下手机，开始记录睡眠',
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 40,
                  fontWeight: FontWeight.w200,
                ),
              ),
            ),
            MaterialButton(
              onPressed: _onRecordButtonPressed,
              color: _recording ? Colors.grey : Colors.blueGrey,
              textColor: Colors.white,
              shape: const CircleBorder(),
              padding: const EdgeInsets.all(50),
              child: Column(
                children: [
                  Icon(
                    _recording ? Icons.stop : Icons.mic,
                    size: 100,
                  ),
                  Text(
                    _recording ? '结束记录' : '开始记录',
                    style: const TextStyle(fontSize: 20),
                  ),
                ],
              ),
            ),
            Text(
              _soundText,
              style: Theme.of(context).textTheme.headline5,
            ),
          ],
        ),
      ),
    );
  }
}
