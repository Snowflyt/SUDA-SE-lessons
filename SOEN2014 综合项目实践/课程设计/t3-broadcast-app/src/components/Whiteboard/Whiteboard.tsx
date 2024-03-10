import {
  Box,
  Button,
  IconButton,
  HStack,
  Input,
  Slider,
  VStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {
  FaPen as PenIcon,
  FaEraser as EraserIcon,
  FaRedoAlt as RedoIcon,
  FaUndoAlt as UndoIcon,
} from 'react-icons/fa';
import { LuEraser as EraseAllIcon } from 'react-icons/lu';
import { useReactiveUndo, useReactiveValue } from 'react-reactive-hooks';

import type { BoxProps } from '@chakra-ui/react';

export type WhiteboardProps = BoxProps;

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  color: string;
  penWidth: number;
  points: Point[];
}

const Whiteboard: React.FC<WhiteboardProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { redo, state, undo } = useReactiveUndo({
    strokes: [] as Stroke[],
    color: '#000000',
    penWidth: 5,
    mode: 'pen' as 'pen' | 'eraser',
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    const { offsetX, offsetY } = event.nativeEvent;
    const stroke: Stroke = {
      color: state.color,
      penWidth: state.penWidth,
      points: [{ x: offsetX, y: offsetY }],
    };

    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.penWidth;
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(offsetX, offsetY);

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      stroke.points.push({ x: offsetX, y: offsetY });
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const handleMouseUp = () => {
      state.strokes.push(stroke);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);
  };

  const handleEraseAll = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    state.strokes = [];
  };

  const handleUndo = () => {
    undo();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (state.mode === 'pen') {
      context.globalCompositeOperation = 'source-over';
    } else {
      context.globalCompositeOperation = 'destination-out';
    }
    state.strokes.forEach((stroke) => {
      context.strokeStyle = stroke.color;
      context.lineWidth = stroke.penWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(stroke.points[0]!.x, stroke.points[0]!.y);
      stroke.points.forEach((point) => {
        context.lineTo(point.x, point.y);
        context.stroke();
      });
    });
  };

  const handleRedo = () => {
    redo();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (state.mode === 'pen') {
      context.globalCompositeOperation = 'source-over';
    } else {
      context.globalCompositeOperation = 'destination-out';
    }
    state.strokes.forEach((stroke) => {
      context.strokeStyle = stroke.color;
      context.lineWidth = stroke.penWidth;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(stroke.points[0]!.x, stroke.points[0]!.y);
      stroke.points.forEach((point) => {
        context.lineTo(point.x, point.y);
        context.stroke();
      });
    });
  };

  const handleSelectPen = () => {
    state.mode = 'pen';
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.globalCompositeOperation = 'source-over';
  };

  const handleSelectEraser = () => {
    state.mode = 'eraser';
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.globalCompositeOperation = 'destination-out';
  };

  return (
    <Box bg="white" position="relative" {...props}>
      <canvas
        className="h-full w-full"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        width={canvasRef.current?.clientWidth ?? 0 * 2}
        height={canvasRef.current?.clientHeight ?? 0 * 2}
      />
      <Box className="left-0 top-0" position="absolute">
        <VStack className="p-4">
          <Input
            w="full"
            type="color"
            p="0"
            onChange={(e) => {
              state.color = e.target.value;
            }}
          />
          <IconButton
            variant="ghost"
            bg={state.mode === 'pen' ? 'gray.200' : 'transparent'}
            aria-label="Select Pen"
            onClick={handleSelectPen}
            icon={<PenIcon />}
          />
          <IconButton
            variant="ghost"
            bg={state.mode === 'eraser' ? 'gray.200' : 'transparent'}
            aria-label="Select Eraser"
            onClick={handleSelectEraser}
            icon={<EraserIcon />}
          />
          <IconButton
            variant="ghost"
            aria-label="Erase All"
            onClick={handleEraseAll}
            icon={<EraseAllIcon />}
          />
          <IconButton
            variant="ghost"
            aria-label="Undo"
            onClick={handleUndo}
            icon={<UndoIcon />}
          />
          +
          <IconButton
            variant="ghost"
            aria-label="Redo"
            onClick={handleRedo}
            icon={<RedoIcon />}
          />
          <Stack w="8" h="16" justifyContent="center" alignItems="center">
            <Box
              rounded="50%"
              bg="gray.300"
              w={state.penWidth / 2}
              h={state.penWidth / 2}
            />
          </Stack>
          <Slider
            aria-label="slider-ex-3"
            defaultValue={4}
            orientation="vertical"
            isReversed
            onChange={(value) => {
              state.penWidth = value;
            }}
            min={1}
            max={32}
            minH="32">
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
    </Box>
  );
};

export default Whiteboard;
