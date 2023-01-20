import 'package:just_audio/just_audio.dart';

class AudioPlayerController {
  final _audioPlayer = AudioPlayer();

  Future<Duration?> setPath({required String filePath}) async =>
      await _audioPlayer.setFilePath(filePath);

  Future<void> play() async => await _audioPlayer.play();

  Future<void> stop() async => await _audioPlayer.stop();

  Stream<PlayerState> get playerState => _audioPlayer.playerStateStream;

  Future<void> dispose() async => await _audioPlayer.dispose();
}
